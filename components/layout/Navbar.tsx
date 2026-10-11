'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, ChevronDown } from 'lucide-react'
import navConfig from '@/public/data/nav-config.json'

interface NavLink {
  label: string
  href: string
  visible?: boolean
}

interface ProgrammeLink extends NavLink {
  column: string
}

const aboutItems: NavLink[] = (navConfig.about as NavLink[]).filter(i => i.visible !== false)
const clienteleItems: NavLink[] = (navConfig.clientele as NavLink[]).filter(i => i.visible !== false)
const programmeItems: ProgrammeLink[] = (navConfig.programmes.featured as ProgrammeLink[]).filter(i => i.visible !== false)
const joinUsItem: NavLink | null = (navConfig.joinUs as NavLink)?.visible !== false ? (navConfig.joinUs as NavLink) : null

const columnOrder = ['Hospitality Core', 'People & Culture', 'Compliance & Tech']
const programmeColumns = columnOrder
  .map(col => ({ col, items: programmeItems.filter(i => i.column === col) }))
  .filter(c => c.items.length > 0)

/** True if pathname is exactly base, or a sub-path of it. */
function isSection(pathname: string, base: string) {
  return pathname === base || pathname.startsWith(`${base}/`)
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()

  const isHome = pathname === '/'
  const isAbout = isSection(pathname, '/about')
  const isProgrammes = isSection(pathname, '/programmes')
  const isClientele = isSection(pathname, '/clientele')
  const isGallery = isSection(pathname, '/gallery')
  const isBlog = isSection(pathname, '/blog')
  const isJoinUs = joinUsItem ? isSection(pathname, '/careers') : false

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 h-[68px] flex items-center px-6 md:px-10">
      <div className="w-full flex items-center">
        {/* Logo — far left */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/horen/v2/images/horen-logo5.png"
            alt="HOREN Training"
            className="h-16 w-auto"
          />
        </Link>

        {/* Nav links — left-aligned, right after the logo */}
        <div className="hidden md:flex items-center gap-4 lg:gap-7 ml-6 lg:ml-10">
          <Link
            href="/"
            aria-current={isHome ? 'page' : undefined}
            className={`nav-link font-medium text-gray-500 px-0.5 ${isHome ? 'nav-link-active' : ''}`}
          >
            Home
          </Link>

          {/* About dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu('About')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className={`nav-link font-medium text-gray-500 px-0.5 flex items-center gap-1 ${isAbout ? 'nav-link-active' : ''}`}>
              About
              <ChevronDown size={14} />
            </button>
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 w-56 transition-all duration-200 ${
                activeMenu === 'About' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
              }`}
            >
              <div className="bg-white rounded-lg border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.1)] py-2">
                {aboutItems.map(sub => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#1A8C8C] hover:bg-gray-50 transition-colors"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Programmes — mega menu */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu('Programmes')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <Link
              href="/programmes"
              aria-current={isProgrammes ? 'page' : undefined}
              className={`nav-link font-medium text-gray-500 px-0.5 flex items-center gap-1 ${isProgrammes ? 'nav-link-active' : ''}`}
            >
              Programmes
              <ChevronDown size={14} />
            </Link>
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                activeMenu === 'Programmes' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
              }`}
            >
              <div className="bg-white rounded-lg border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.1)] p-6 min-w-[640px]">
                <div className="grid grid-cols-3 gap-8">
                  {programmeColumns.map(({ col, items }) => (
                    <div key={col}>
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1A8C8C] mb-3">{col}</p>
                      <div className="flex flex-col gap-2.5">
                        {items.map(item => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="text-sm text-gray-600 hover:text-[#1A8C8C] transition-colors leading-snug"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/programmes"
                  className="block mt-6 pt-4 border-t border-gray-100 text-sm font-semibold text-[#1A8C8C] hover:opacity-80 text-center"
                >
                  View all 60+ programmes →
                </Link>
              </div>
            </div>
          </div>

          {/* Clientele dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu('Clientele')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className={`nav-link font-medium text-gray-500 px-0.5 flex items-center gap-1 ${isClientele ? 'nav-link-active' : ''}`}>
              Clientele
              <ChevronDown size={14} />
            </button>
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 w-56 transition-all duration-200 ${
                activeMenu === 'Clientele' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
              }`}
            >
              <div className="bg-white rounded-lg border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.1)] py-2">
                {clienteleItems.map(sub => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#1A8C8C] hover:bg-gray-50 transition-colors"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/gallery"
            aria-current={isGallery ? 'page' : undefined}
            className={`nav-link font-medium text-gray-500 px-0.5 ${isGallery ? 'nav-link-active' : ''}`}
          >
            Gallery
          </Link>
          <Link
            href="/blog"
            aria-current={isBlog ? 'page' : undefined}
            className={`nav-link font-medium text-gray-500 px-0.5 ${isBlog ? 'nav-link-active' : ''}`}
          >
            Blog
          </Link>
          {joinUsItem && (
            <Link
              href={joinUsItem.href}
              aria-current={isJoinUs ? 'page' : undefined}
              className={`nav-link font-medium text-gray-500 px-0.5 ${isJoinUs ? 'nav-link-active' : ''}`}
            >
              {joinUsItem.label}
            </Link>
          )}
        </div>

        {/* Search + CTA — far right */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          {searchOpen ? (
            <div className="relative w-[220px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search programmes..."
                onBlur={() => setSearchOpen(false)}
                className="w-full h-9 pl-9 pr-3 rounded-full border border-gray-200 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:border-teal/50"
              />
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <Search size={17} />
            </button>
          )}
          <Link
            href="/contact"
            className="bg-[#1A8C8C] text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-[#1A8C8C]/90 transition-colors"
          >
            Enquire Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden ml-auto text-gray-600"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 top-[68px] bg-white md:hidden flex flex-col overflow-y-auto">
          <div className="px-6 py-5 flex flex-col gap-1 flex-1">
            {/* Search */}
            <div className="relative mb-4">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search programmes..."
                className="w-full h-10 pl-9 pr-3 rounded-full border border-gray-200 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:border-teal/50"
              />
            </div>

            <Link
              href="/"
              onClick={() => setOpen(false)}
              aria-current={isHome ? 'page' : undefined}
              className={`py-3.5 text-sm border-b border-gray-100 ${isHome ? 'text-[#0A3333] font-semibold' : 'text-gray-700 font-medium'}`}
            >
              Home
            </Link>

            {/* About accordion */}
            <MobileAccordion
              label="About"
              expanded={mobileExpanded === 'About'}
              onToggle={() => setMobileExpanded(mobileExpanded === 'About' ? null : 'About')}
              items={aboutItems}
              onNavigate={() => setOpen(false)}
              active={isAbout}
            />

            {/* Programmes accordion */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === 'Programmes' ? null : 'Programmes')}
                className={`w-full flex items-center justify-between py-3.5 text-sm ${isProgrammes ? 'text-[#0A3333] font-semibold' : 'text-gray-700 font-medium'}`}
              >
                Programmes
                <ChevronDown
                  size={16}
                  className={`transition-transform ${mobileExpanded === 'Programmes' ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileExpanded === 'Programmes' && (
                <div className="pb-3 flex flex-col gap-4">
                  {programmeColumns.map(({ col, items }) => (
                    <div key={col}>
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1A8C8C] mb-2">{col}</p>
                      <div className="flex flex-col gap-2 pl-1">
                        {items.map(item => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="text-sm text-gray-600"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Link
                    href="/programmes"
                    onClick={() => setOpen(false)}
                    className="text-sm font-semibold text-[#1A8C8C]"
                  >
                    View all 60+ programmes →
                  </Link>
                </div>
              )}
            </div>

            {/* Clientele accordion */}
            <MobileAccordion
              label="Clientele"
              expanded={mobileExpanded === 'Clientele'}
              onToggle={() => setMobileExpanded(mobileExpanded === 'Clientele' ? null : 'Clientele')}
              items={clienteleItems}
              onNavigate={() => setOpen(false)}
              active={isClientele}
            />

            <Link
              href="/gallery"
              onClick={() => setOpen(false)}
              aria-current={isGallery ? 'page' : undefined}
              className={`py-3.5 text-sm border-b border-gray-100 ${isGallery ? 'text-[#0A3333] font-semibold' : 'text-gray-700 font-medium'}`}
            >
              Gallery
            </Link>
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              aria-current={isBlog ? 'page' : undefined}
              className={`py-3.5 text-sm border-b border-gray-100 ${isBlog ? 'text-[#0A3333] font-semibold' : 'text-gray-700 font-medium'}`}
            >
              Blog
            </Link>
            {joinUsItem && (
              <Link
                href={joinUsItem.href}
                onClick={() => setOpen(false)}
                aria-current={isJoinUs ? 'page' : undefined}
                className={`py-3.5 text-sm border-b border-gray-100 ${isJoinUs ? 'text-[#0A3333] font-semibold' : 'text-gray-700 font-medium'}`}
              >
                {joinUsItem.label}
              </Link>
            )}
          </div>

          {/* Enquire Now — bottom of drawer */}
          <div className="px-6 py-5 border-t border-gray-100">
            <Link
              href="/contact"
              className="block bg-[#1A8C8C] text-white text-sm font-semibold px-5 py-3 rounded-md text-center"
              onClick={() => setOpen(false)}
            >
              Enquire Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

function MobileAccordion({
  label,
  expanded,
  onToggle,
  items,
  onNavigate,
  active,
}: {
  label: string
  expanded: boolean
  onToggle: () => void
  items: NavLink[]
  onNavigate: () => void
  active?: boolean
}) {
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between py-3.5 text-sm ${active ? 'text-[#0A3333] font-semibold' : 'text-gray-700 font-medium'}`}
      >
        {label}
        <ChevronDown size={16} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
      {expanded && (
        <div className="pb-3 flex flex-col gap-2.5 pl-1">
          {items.map(item => (
            <Link key={item.href} href={item.href} onClick={onNavigate} className="text-sm text-gray-600">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
