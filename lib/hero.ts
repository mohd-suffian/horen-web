// Where each hero photo is anchored when cropped. Add a line when you add a new hero-N file.
export const heroFocus: Record<string, string> = {
  'hero-1.jpg': 'center 55%',
  'hero-2.jpg': 'center 68%',
  'hero-3.jpg': 'center 30%',
}

export function focusFor(file: string): string {
  return heroFocus[file] ?? 'center'
}

export interface HeroSlide {
  src: string
  focus: string
}
