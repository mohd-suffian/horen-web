import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ICON_MAP = Icons as unknown as Record<string, LucideIcon>

export default function CategoryBanner({
  icon,
  count,
  image,
  size = 'card',
}: {
  icon: string
  count: number
  image?: string
  size?: 'card' | 'page'
}) {
  const Icon = ICON_MAP[icon] ?? Icons.BookOpen
  const heightClass = size === 'page' ? 'h-32' : 'h-24'
  const iconSize = size === 'page' ? 110 : 80

  return (
    <div className={`relative ${heightClass} overflow-hidden bg-gradient-to-br from-[#1A8C8C] to-[#0A3333]`}>
      {image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element -- plain img for basePath, same as rest of site */}
          <img
            src={`/horen/v2/images/programmes/${image}`}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A8C8C]/85 to-[#0A3333]/90" />
        </>
      )}
      <Icon
        className="absolute -right-3 -bottom-3 text-white/15"
        size={iconSize}
        strokeWidth={1.25}
        aria-hidden="true"
      />
      <span className="absolute top-3 right-3 text-[11px] font-bold uppercase tracking-wide text-white bg-white/20 rounded-full px-2.5 py-1 backdrop-blur-sm">
        {count}
      </span>
    </div>
  )
}
