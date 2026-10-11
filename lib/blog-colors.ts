// Colour per blog category, matches the programme palette. Unknown categories use the default teal.

export interface CategoryGradient {
  from: string
  to: string
}

export const categoryColors: Record<string, CategoryGradient> = {
  'Leadership':          { from: '#1E2D3D', to: '#34506B' },
  'Wellness':            { from: '#3E8E6B', to: '#1F5440' },
  'Compliance':          { from: '#2B5C8A', to: '#12304F' },
  'Productivity':        { from: '#4338A0', to: '#1E1B5E' },
  'Service Excellence':  { from: '#B5543A', to: '#6E2C1B' },
  'Certification':       { from: '#A8832A', to: '#6E5516' },
  'Communication':       { from: '#1A8C8C', to: '#0A3333' },
  'Team Building':       { from: '#7A4A8A', to: '#43245A' },
}

export const defaultCategoryColors: CategoryGradient = { from: '#1A8C8C', to: '#0A3333' }

export function colorsFor(category: string): CategoryGradient {
  return categoryColors[category] ?? defaultCategoryColors
}
