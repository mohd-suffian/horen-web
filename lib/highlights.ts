// Shared types and pure helpers for the homepage "Latest highlight" popup.
// No fs import here — this file is imported by client components.

export interface HighlightConfig {
  enabled: boolean
  version: string
  label: string          // floating button text
  title: string           // used for the dialog's accessible name
  image: string            // filename only — bundled name or upload-<...> name
  imageAlt: string
  startsOn: string         // '' or YYYY-MM-DD
  endsOn: string            // '' or YYYY-MM-DD
  autoOpen: boolean
  autoOpenDelaySec: number
  linkLabel: string        // '' if no extra button
  linkUrl: string           // '' if no extra button
  updatedAt: string
}

export const DEFAULT_HIGHLIGHT: HighlightConfig = {
  enabled: true,
  version: 'mental-health-oct-2026',
  label: 'Latest highlight',
  title: 'Invest in a mentally healthy workplace: October is Mental Health Awareness Month',
  image: 'mental-health-oct-2026.jpg',
  imageAlt:
    'HOREN mental wellness training programmes for October 2026: Spot, Support, Refer mental health first aid; ' +
    'Emotional Intelligence at the Workplace; Eat Well, Stay Productive corporate wellness workshop; ' +
    'Stress Management and Mind Relaxation. All HRD Corp claimable. Call 019-582 5007 or email info@horen.com.my.',
  startsOn: '',
  endsOn: '2026-10-31',
  autoOpen: true,
  autoOpenDelaySec: 8,
  linkLabel: '',
  linkUrl: '',
  updatedAt: '',
}

export type HighlightStatus = 'disabled' | 'scheduled' | 'live' | 'ended'

/** Compares calendar dates in Malaysia time so the cut-off is midnight local, not UTC. Start and end are inclusive. */
export function highlightStatus(config: HighlightConfig, now = new Date()): HighlightStatus {
  if (!config.enabled) return 'disabled'

  const today = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kuala_Lumpur' })
  if (config.startsOn && today < config.startsOn) return 'scheduled'
  if (config.endsOn && today > config.endsOn) return 'ended'
  return 'live'
}

/** Bundled images ship in public/images/highlights/; uploads are served through an API route. */
export function imageUrlFor(image: string) {
  if (image.startsWith('upload-')) return `/horen/v2/api/highlight/image/${image}`
  return `/horen/v2/images/highlights/${image}`
}
