import Link from 'next/link'
import { FaLinkedinIn, FaFacebookF, FaInstagram } from 'react-icons/fa'

const quickLinks = [
  { label: 'Home',       href: '/' },
  { label: 'About',      href: '/about' },
  { label: 'Programmes', href: '/programmes' },
  { label: 'Clientele',  href: '/clientele' },
  { label: 'Gallery',    href: '/gallery' },
  { label: 'Blog',       href: '/blog' },
]

const legalLinks = [
  { label: 'Trainer Recruitment', href: '/careers/trainers' },
  { label: 'Privacy Policy',      href: '/privacy' },
]

const socials = [
  { label: 'LinkedIn',  Icon: FaLinkedinIn },
  { label: 'Facebook',  Icon: FaFacebookF },
  { label: 'Instagram', Icon: FaInstagram },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A3333] text-white pt-14 pb-8 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1 — Brand */}
          <div>
            <img
              src="/horen/v2/images/horen-logo5.png"
              alt="HOREN Training"
              style={{ height: '48px', width: 'auto', display: 'block' }}
            />
            <p className="text-sm text-white/55 mt-3">Excel With Knowledge</p>
            <p className="text-xs text-white/35 leading-relaxed mt-4">
              No 8, Unit A-21-03, Tower A,<br />
              Vertical Business Suite, Jalan Kerinchi,<br />
              Bangsar South, 59200 Kuala Lumpur
            </p>
            <a href="tel:0124305054" className="block text-sm text-white/55 hover:text-white/90 mt-3">012 430 5054</a>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/30 mb-4">Quick Links</p>
            <div className="flex flex-col gap-3">
              {quickLinks.map(l => (
                <Link key={l.href} href={l.href} className="text-sm text-white/55 hover:text-white/90 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3 — Join Us & Legal + Contact */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/30 mb-4">Join Us &amp; Legal</p>
            <div className="flex flex-col gap-3 mb-6">
              {legalLinks.map(l => (
                <Link key={l.href} href={l.href} className="text-sm text-white/55 hover:text-white/90 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/30 mb-4">Contact</p>
            <div className="flex flex-col gap-3 items-start">
              <a href="tel:0124305054" className="text-sm text-white/55 hover:text-white/90">012 430 5054</a>
              <a href="https://www.horen.com.my" className="text-sm text-white/55 hover:text-white/90">www.horen.com.my</a>
            </div>
          </div>

          {/* Column 4 — HRD Corp info + social media */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5DC6C6]">HRD Corp Approved</p>
            <div className="border border-teal-600 rounded-lg p-4 mt-3">
              <p className="text-white font-semibold text-sm">SBL-Khas Certified</p>
              <p className="text-gray-400 text-xs mt-1">
                All 60+ programmes are HRD Corp claimable — we handle the grant paperwork.
              </p>
            </div>
            <Link href="/programmes" className="block text-teal-400 text-sm hover:text-white mt-3">
              View all programmes →
            </Link>
            <p className="text-xs text-gray-500 mt-4 mb-2">Follow us</p>
            <div className="flex flex-row gap-2">
              {socials.map(s => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full border border-teal-700 flex items-center justify-center text-teal-400 hover:border-teal-400 transition-colors"
                >
                  <s.Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/28">© 2026 HOREN Training Sdn Bhd. All rights reserved.</p>
          <p className="text-xs text-white/28">Kuala Lumpur, Malaysia</p>
        </div>
      </div>
    </footer>
  )
}
