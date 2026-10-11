export interface HomeGalleryItem {
  label: string
  hint?: string
  large?: boolean
  src?: string
}

export const homeGallery: HomeGalleryItem[] = [
  { label: 'Featured photo', hint: 'Upload hero shot', large: true, src: '' },
  { label: 'Training session', src: '' },
  { label: 'Team building', src: '' },
  { label: 'Award night', src: '' },
  { label: 'Workshop', src: '' },
  { label: 'Group session', src: '' },
]

export const categories = ['All', 'Training Sessions', 'Team Building', 'Award Nights', 'Workshops'] as const
export type Category = typeof categories[number]

export interface FullGalleryItem {
  label: string
  category: Exclude<Category, 'All'>
  src?: string
}

export const fullGallery: FullGalleryItem[] = [
  { label: 'Featured Session',   category: 'Training Sessions', src: '' },
  { label: 'Hotel Visit',        category: 'Training Sessions', src: '' },
  { label: 'F&B Training',       category: 'Training Sessions', src: '' },
  { label: 'Sunway Hotel',       category: 'Training Sessions', src: '' },
  { label: 'Team Building',      category: 'Team Building',     src: '' },
  { label: 'Group Training',     category: 'Team Building',     src: '' },
  { label: 'SKS Session',        category: 'Team Building',     src: '' },
  { label: 'Award Night',        category: 'Award Nights',      src: '' },
  { label: 'MIDA Event',         category: 'Award Nights',      src: '' },
  { label: 'Workshop',           category: 'Workshops',         src: '' },
  { label: 'Leadership Session', category: 'Workshops',         src: '' },
  { label: 'Holiday Villa',      category: 'Workshops',         src: '' },
]
