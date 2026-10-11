import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import HeroCarousel from './HeroCarousel'
import { focusFor, type HeroSlide } from '@/lib/hero'

const HERO_DIR = path.join(process.cwd(), 'public', 'images', 'hero')
const HERO_FILE_RE = /^hero-.+\.(jpe?g|png)$/i

function naturalCompare(a: string, b: string) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
}

function getHeroSlides(): HeroSlide[] {
  let files: string[] = []
  try {
    files = fs.readdirSync(HERO_DIR).filter(f => HERO_FILE_RE.test(f)).sort(naturalCompare)
  } catch {
    files = []
  }
  return files.map(f => ({ src: `/horen/v2/images/hero/${f}`, focus: focusFor(f) }))
}

export default function Hero() {
  const slides = getHeroSlides()

  return (
    <HeroCarousel slides={slides}>
      <div className="relative px-6 sm:px-10 w-full md:w-[60%] md:min-w-[680px]">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-6 h-px bg-[#C9A84C]" />
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#C9A84C]">
            Malaysia&apos;s Hospitality Training Specialist
          </p>
        </div>
        <h1 className="font-serif font-light text-white leading-[1.2] mb-5 text-4xl sm:text-5xl lg:text-6xl break-words">
          Where service becomes{' '}
          <em className="not-italic italic font-bold text-[#C9A84C]">revenue</em> and staff
          become{' '}
          <em className="not-italic italic font-bold text-[#C9A84C]">assets</em>
        </h1>
        <p className="text-sm text-white/70 leading-relaxed mb-8 max-w-[420px]">
          The only HRD Corp-claimable training partner dedicated entirely to hospitality.
        </p>
        <div className="flex flex-wrap gap-3 mb-4">
          <Link
            href="/programmes"
            className="bg-[#1A8C8C] text-white font-bold px-6 py-2.5 rounded-md text-sm"
          >
            View 2026/27 Programs
          </Link>
          <Link
            href="/contact"
            className="border border-white/45 text-white px-5 py-2.5 rounded-md text-sm font-semibold"
          >
            Get a free proposal
          </Link>
        </div>
      </div>
    </HeroCarousel>
  )
}
