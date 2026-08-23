import Link from 'next/link'
import Image from 'next/image'

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
  { label: 'LinkedIn',   initial: 'in' },
  { label: 'Facebook',   initial: 'f' },
  { label: 'Instagram',  initial: 'ig' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A3333] text-white pt-14 pb-8 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1 — Brand */}
          <div>
            <Image
              src="/images/horen-logo5.png"
              alt="HOREN Training"
              width={140}
              height={48}
              className="h-12 w-auto"
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

          {/* Column 4 — Get in touch mini CTA */}
          <div>
            <p className="font-serif text-xl text-white mb-2">Ready to train your team?</p>
            <p className="text-sm text-white/55 mb-5">Proposals within 48 hours.</p>
            <Link
              href="/contact"
              className="inline-block bg-[#1A8C8C] text-white text-sm font-semibold px-5 py-2 rounded-md hover:bg-[#1A8C8C]/90 transition-colors mb-7"
            >
              Enquire Now
            </Link>
            <div className="flex items-center gap-3">
              {socials.map(s => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-[#1A8C8C] text-[#1A8C8C] text-xs font-semibold flex items-center justify-center hover:bg-[#1A8C8C] hover:text-white transition-colors"
                >
                  {s.initial}
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
