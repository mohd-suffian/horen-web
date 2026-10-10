import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

// Form submissions are stored as JSON Lines (one JSON object per line) in a
// directory outside public/, so they are never served to visitors.
// Override the location with SUBMISSIONS_DIR in .env.local if needed.
const SUBMISSIONS_DIR = process.env.SUBMISSIONS_DIR ?? path.join(process.cwd(), 'data', 'submissions')

export type SubmissionKind = 'enquiries' | 'trainer-applications'

export interface Submission {
  id: string
  receivedAt: string
  fields: Record<string, string>
}

const LABELS: Record<SubmissionKind, string> = {
  'enquiries': 'Training enquiry',
  'trainer-applications': 'Trainer application',
}

function fileFor(kind: SubmissionKind) {
  return path.join(SUBMISSIONS_DIR, `${kind}.jsonl`)
}

/** Trim every value and cap its length so one request can't fill the disk. */
export function clean(input: unknown, keys: string[], maxLen = 5000): Record<string, string> {
  const src = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>
  const out: Record<string, string> = {}
  for (const k of keys) {
    const v = src[k]
    out[k] = typeof v === 'string' ? v.trim().slice(0, maxLen) : ''
  }
  return out
}

export function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export function saveSubmission(kind: SubmissionKind, fields: Record<string, string>): Submission {
  const submission: Submission = {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    fields,
  }
  fs.mkdirSync(SUBMISSIONS_DIR, { recursive: true })
  fs.appendFileSync(fileFor(kind), JSON.stringify(submission) + '\n', 'utf-8')
  return submission
}

/** Newest first. Skips any corrupt line instead of failing the whole list. */
export function listSubmissions(kind: SubmissionKind): Submission[] {
  const file = fileFor(kind)
  if (!fs.existsSync(file)) return []
  const rows: Submission[] = []
  for (const line of fs.readFileSync(file, 'utf-8').split('\n')) {
    if (!line.trim()) continue
    try {
      rows.push(JSON.parse(line))
    } catch {
      // ignore a malformed line
    }
  }
  return rows.reverse()
}

/**
 * Email a notification if SMTP is configured. Never throws: the submission is
 * already saved, so a mail failure must not show the visitor an error.
 *
 * Required env vars: SMTP_HOST, SMTP_USER, SMTP_PASS, NOTIFY_TO
 * Optional: SMTP_PORT (default 465), NOTIFY_FROM (default SMTP_USER)
 */
export async function notify(kind: SubmissionKind, submission: Submission, replyTo?: string) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_TO, NOTIFY_FROM } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !NOTIFY_TO) return

  const port = Number(SMTP_PORT ?? 465)
  const label = LABELS[kind]
  const who = submission.fields.name || 'Website visitor'
  const body = Object.entries(submission.fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}:\n${v}`)
    .join('\n\n')

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
    await transporter.sendMail({
      from: NOTIFY_FROM ?? SMTP_USER,
      to: NOTIFY_TO,
      replyTo,
      subject: `[HOREN website] ${label} from ${who}`,
      text: `${label} received ${submission.receivedAt}\n\n${body}\n\nAlso saved in the admin portal.`,
    })
  } catch (err) {
    console.error(`Failed to send ${kind} notification email:`, err)
  }
}
