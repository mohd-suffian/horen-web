// Homepage "Latest highlight" popup.
// To run a new campaign: change id (so returning visitors see it once again),
// swap the image in public/images/highlights/, and update the text and end date.
// Set currentHighlight to null to switch the popup and floating button off.

export interface Highlight {
  id: string
  label: string        // floating button text
  title: string        // used for the dialog's accessible name
  image: string        // file in public/images/highlights/
  imageAlt: string
  endsOn: string       // last day shown, YYYY-MM-DD (Malaysia time)
}

export const currentHighlight: Highlight | null = {
  id: 'mental-health-oct-2026',
  label: 'Latest highlight',
  title: 'Invest in a mentally healthy workplace: October is Mental Health Awareness Month',
  image: 'mental-health-oct-2026.jpg',
  imageAlt:
    'HOREN mental wellness training programmes for October 2026: Spot, Support, Refer mental health first aid; ' +
    'Emotional Intelligence at the Workplace; Eat Well, Stay Productive corporate wellness workshop; ' +
    'Stress Management and Mind Relaxation. All HRD Corp claimable. Call 019-582 5007 or email info@horen.com.my.',
  endsOn: '2026-10-31',
}

export function isHighlightActive(h: Highlight | null, now = new Date()): h is Highlight {
  if (!h) return false
  // Compare calendar dates in Malaysia time so the cut-off is midnight local, not UTC
  const today = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kuala_Lumpur' })
  return today <= h.endsOn
}
