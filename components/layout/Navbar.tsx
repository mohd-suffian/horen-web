'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Search, ChevronDown } from 'lucide-react'

const navItems = [
  {
    label: 'About',
    items: [
      { label: 'Our Story',        href: '/about' },
      { label: 'Training Experts', href: '/about/team' },
      { label: 'Awards & Recognition', href: '/awards' },
    ],
  },
  { label: 'Programmes', href: '/programmes' },
  {
    label: 'Clientele',
    items: [
      { label: 'Our Clients',   href: '/clientele' },
      { label: 'Testimonials',  href: '/testimonials' },
    ],
  },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog',    href: '/blog' },
]

const mobileLinks = [
  { label: 'Our Story',            href: '/about' },
  { label: 'Training Experts',     href: '/about/team' },
  { label: 'Awards & Recognition', href: '/awards' },
  { label: 'Programmes',           href: '/programmes' },
  { label: 'Our Clients',          href: '/clientele' },
  { label: 'Testimonials',         href: '/testimonials' },
  { label: 'Gallery',              href: '/gallery' },
  { label: 'Blog',                 href: '/blog' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 h-[68px] flex items-center px-6 md:px-10">
      <div className="w-full flex items-center justify-between">
        {/* Logo — far left */}
        <Link href="/" className="flex items-center">
          <img
            src="/horen/v2/images/horen-logo5.png"
            alt="HOREN Training"
            className="h-16 w-auto"
          />
        </Link>

        {/* Nav links — center */}
        <div className="hidden md:flex items-center gap-7">
          {navItems.map(item => (
            item.items ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="nav-link font-medium text-gray-500 px-0.5 flex items-center gap-1">
                  {item.label}
                  <ChevronDown size={14} />
                </button>
                {activeMenu === item.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-56">
                    <div className="bg-white rounded-lg border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.1)] py-2">
                      {item.items.map(sub => (
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
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link font-medium text-gray-500 px-0.5"
              >
                {item.label}
              </Link>
            )
          ))}
        </div>

        {/* Search + CTA — far right */}
        <div className="hidden md:flex items-center gap-5">
          <div className="relative w-[220px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search programmes..."
              className="w-full h-9 pl-9 pr-3 rounded-full border border-gray-200 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:border-teal/50"
            />
          </div>
          <Link
            href="/contact"
            className="bg-[#1A8C8C] text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-[#1A8C8C]/90 transition-colors"
          >
            Enquire Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="absolute top-[68px] left-0 right-0 bg-white border-b border-gray-100 px-6 pb-6 md:hidden flex flex-col gap-4 max-h-[calc(100vh-68px)] overflow-y-auto">
          {mobileLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-600 hover:text-teal"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-[#1A8C8C] text-white text-sm font-semibold px-5 py-2.5 rounded-md text-center"
            onClick={() => setOpen(false)}
          >
            Enquire Now
          </Link>
        </div>
      )}
    </nav>
  )
}
