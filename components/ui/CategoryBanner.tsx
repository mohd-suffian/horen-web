import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ICON_MAP = Icons as unknown as Record<string, LucideIcon>

export default function CategoryBanner({
  icon,
  count,
  image,
  colors,
  title,
  titleAs = 'h3',
  size = 'card',
}: {
  icon: string
  count: number
  image?: string
  colors: { from: string; to: string }
  title: string
  titleAs?: 'h2' | 'h3'
  size?: 'card' | 'page'
}) {
  const Icon = ICON_MAP[icon] ?? Icons.BookOpen
  const minHeightClass = size === 'page' ? 'min-h-[11rem]' : 'min-h-[9rem]'
  const titleSizeClass = size === 'page' ? 'text-2xl' : 'text-xl'
  const TitleTag = titleAs

  return (
    <div
      className={`relative ${minHeightClass} overflow-hidden flex flex-col justify-end`}
      style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
    >
      {image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element -- plain img for basePath, same as rest of site */}
          <img
            src={`/horen/v2/images/programmes/${image}`}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ backgroundColor: colors.to, opacity: 0.7 }} />
        </>
      )}

      <Icon
        className="absolute right-3 bottom-3 z-0 text-white/[0.18]"
        size={64}
        strokeWidth={1.25}
        aria-hidden="true"
      />

      <span className="absolute top-3 right-3 z-10 text-[11px] font-bold uppercase tracking-wide text-white bg-white/20 rounded-full px-2.5 py-1 backdrop-blur-sm">
        {count}
      </span>

      <TitleTag className={`relative z-10 p-5 pr-16 font-serif ${titleSizeClass} leading-snug text-white`}>
        {title}
      </TitleTag>
    </div>
  )
}
