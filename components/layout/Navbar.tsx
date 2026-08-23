'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Search } from 'lucide-react'

const links = [
  { label: 'About',       href: '/about' },
  { label: 'Programmes',  href: '/programmes' },
  { label: 'Trainers',    href: '/trainers' },
  { label: 'Clients',     href: '/clients' },
  { label: 'Blog',        href: '/blog' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 h-[68px] flex items-center px-6 md:px-10">
      <div className="w-full flex items-center justify-between">
        {/* Logo + nav links, left-aligned */}
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center">
            <img
              src="/horen/v2/images/horen-logo5.png"
              alt="HOREN Training"
              className="h-16 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-gray-500 hover:text-teal transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Search + CTA, right-aligned */}
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
            className="bg-teal text-white text-sm font-semibold px-5 py-2 rounded-md hover:bg-teal/90 transition-colors"
          >
            Inquire now
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
        <div className="absolute top-[68px] left-0 right-0 bg-white border-b border-gray-100 px-6 pb-6 md:hidden flex flex-col gap-4">
          {links.map(l => (
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
            className="bg-teal text-white text-sm font-semibold px-5 py-2.5 rounded-md text-center"
            onClick={() => setOpen(false)}
          >
            Inquire now
          </Link>
        </div>
      )}
    </nav>
  )
}
