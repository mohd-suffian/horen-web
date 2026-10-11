import fs from 'fs'
import path from 'path'
import { DEFAULT_HIGHLIGHT, type HighlightConfig } from './highlights'

// Live highlight config + uploaded posters live outside public/, same pattern as lib/submissions.ts.
// - public/ is only served as it existed at build time, so uploads can't live there.
// - /data is gitignored, so a git pull never touches live admin data.
const DATA_DIR = path.join(process.cwd(), 'data', 'highlight')
const CONFIG_PATH = path.join(DATA_DIR, 'config.json')
const BUNDLED_DIR = path.join(process.cwd(), 'public', 'images', 'highlights')

const UPLOAD_NAME_RE = /^upload-[a-z0-9-]+\.(jpg|png|webp)$/

const MAGIC_BYTES: { ext: 'jpg' | 'png' | 'webp'; check: (b: Buffer) => boolean }[] = [
  { ext: 'jpg', check: b => b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  {
    ext: 'png',
    check: b =>
      b.length >= 8 &&
      b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 &&
      b[4] === 0x0d && b[5] === 0x0a && b[6] === 0x1a && b[7] === 0x0a,
  },
  {
    ext: 'webp',
    check: b =>
      b.length >= 12 &&
      b.toString('ascii', 0, 4) === 'RIFF' &&
      b.toString('ascii', 8, 12) === 'WEBP',
  },
]

function isBundledImage(name: string) {
  return /^[a-z0-9-]+\.(jpg|jpeg|png|webp)$/i.test(name) && fs.existsSync(path.join(BUNDLED_DIR, name))
}

function isUploadImage(name: string) {
  return UPLOAD_NAME_RE.test(name) && fs.existsSync(path.join(DATA_DIR, name))
}

export function readHighlight(): HighlightConfig {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf-8')
    const saved = JSON.parse(raw)
    return { ...DEFAULT_HIGHLIGHT, ...saved }
  } catch {
    return DEFAULT_HIGHLIGHT
  }
}

export function writeHighlight(config: HighlightConfig) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  const tmpPath = `${CONFIG_PATH}.tmp`
  fs.writeFileSync(tmpPath, JSON.stringify(config, null, 2))
  fs.renameSync(tmpPath, CONFIG_PATH)
}

function trimTo(v: unknown, maxLen: number): string {
  return typeof v === 'string' ? v.trim().slice(0, maxLen) : ''
}

function isValidDate(v: string) {
  return v === '' || /^\d{4}-\d{2}-\d{2}$/.test(v)
}

export type ValidateResult =
  | { ok: true; config: HighlightConfig }
  | { ok: false; error: string }

export function validateHighlight(body: unknown): ValidateResult {
  const src = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>
  const current = readHighlight()

  const label = trimTo(src.label, 60)
  const title = trimTo(src.title, 200)
  const image = trimTo(src.image, 120)
  const imageAlt = trimTo(src.imageAlt, 500)
  const startsOn = trimTo(src.startsOn, 10)
  const endsOn = trimTo(src.endsOn, 10)
  const linkLabel = trimTo(src.linkLabel, 40)
  const linkUrl = trimTo(src.linkUrl, 300)

  if (!label) return { ok: false, error: 'Floating button text is required.' }
  if (!title) return { ok: false, error: 'Title is required.' }

  if (!isValidDate(startsOn) || !isValidDate(endsOn)) {
    return { ok: false, error: 'Dates must be in YYYY-MM-DD format.' }
  }
  if (startsOn && endsOn && startsOn > endsOn) {
    return { ok: false, error: 'Start date must be on or before the end date.' }
  }

  if ((linkLabel && !linkUrl) || (linkUrl && !linkLabel)) {
    return { ok: false, error: 'Extra button text and link must both be set, or both left blank.' }
  }
  if (linkUrl && !(linkUrl.startsWith('https://') || linkUrl.startsWith('/'))) {
    return { ok: false, error: 'Extra button link must start with https:// or /.' }
  }

  if (!image || !(isBundledImage(image) || isUploadImage(image))) {
    return { ok: false, error: 'Poster image not found. Upload a new image first.' }
  }

  const rawDelay = Number(src.autoOpenDelaySec)
  const autoOpenDelaySec = Number.isFinite(rawDelay) ? Math.min(60, Math.max(0, Math.round(rawDelay))) : current.autoOpenDelaySec

  const config: HighlightConfig = {
    enabled: Boolean(src.enabled),
    version: src.showAgain ? `v${Date.now()}` : current.version,
    label,
    title,
    image,
    imageAlt,
    startsOn,
    endsOn,
    autoOpen: Boolean(src.autoOpen),
    autoOpenDelaySec,
    linkLabel,
    linkUrl,
    updatedAt: new Date().toISOString(),
  }

  return { ok: true, config }
}

export interface SavedUpload {
  filename: string
}

const MAX_UPLOAD_BYTES = 3 * 1024 * 1024

export function saveUpload(buffer: Buffer): SavedUpload {
  if (buffer.length > MAX_UPLOAD_BYTES) {
    throw new Error('Image must be 3 MB or smaller.')
  }

  const match = MAGIC_BYTES.find(m => m.check(buffer))
  if (!match) {
    throw new Error('Unsupported image type. Upload a JPG, PNG or WebP file.')
  }

  fs.mkdirSync(DATA_DIR, { recursive: true })

  const filename = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${match.ext}`
  fs.writeFileSync(path.join(DATA_DIR, filename), buffer)

  cleanupOldUploads(filename)

  return { filename }
}

/** Deletes upload- files that are not the current (pre-save) image or the just-saved one, and are older than 1 day. */
function cleanupOldUploads(justSaved: string) {
  const current = readHighlight()
  const keep = new Set([current.image, justSaved])
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000

  let entries: string[] = []
  try {
    entries = fs.readdirSync(DATA_DIR)
  } catch {
    return
  }

  for (const name of entries) {
    if (!UPLOAD_NAME_RE.test(name) || keep.has(name)) continue
    try {
      const stat = fs.statSync(path.join(DATA_DIR, name))
      if (stat.mtimeMs < oneDayAgo) fs.unlinkSync(path.join(DATA_DIR, name))
    } catch {
      // ignore: file may have been removed concurrently
    }
  }
}

export interface ReadUploadResult {
  buffer: Buffer
  ext: 'jpg' | 'png' | 'webp'
}

export function readUpload(name: string): ReadUploadResult | null {
  if (!UPLOAD_NAME_RE.test(name)) return null
  const filePath = path.join(DATA_DIR, name)
  if (!fs.existsSync(filePath)) return null

  const ext = name.slice(name.lastIndexOf('.') + 1) as 'jpg' | 'png' | 'webp'
  return { buffer: fs.readFileSync(filePath), ext }
}
