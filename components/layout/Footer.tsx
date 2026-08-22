import Link from 'next/link'

const programmes = [
  { label: 'Microsoft Azure & M365', href: '/programmes/azure' },
  { label: 'AWS Cloud',              href: '/programmes/aws' },
  { label: 'Red Hat Linux',          href: '/programmes/redhat' },
  { label: 'Soft Skills',            href: '/programmes/soft-skills' },
]

const company = [
  { label: 'About',    href: '/about' },
  { label: 'Trainers', href: '/trainers' },
  { label: 'Clients',  href: '/clients' },
  { label: 'Blog',     href: '/blog' },
]

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-14 pb-8 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1.4fr] gap-10 mb-12">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl text-teal-light">HOREN Training</p>
            <p className="text-sm text-white/35 mt-3 leading-relaxed">
              Malaysia&apos;s trusted IT and soft skills training provider since 2006.
            </p>
          </div>

          {/* Company */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/30 mb-4">Company</p>
            <div className="flex flex-col gap-3">
              {company.map(l => (
                <Link key={l.href} href={l.href} className="text-sm text-white/55 hover:text-white/90 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Programmes */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/30 mb-4">Programmes</p>
            <div className="flex flex-col gap-3">
              {programmes.map(l => (
                <Link key={l.href} href={l.href} className="text-sm text-white/55 hover:text-white/90 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/30 mb-4">Contact</p>
            <div className="flex flex-col gap-3">
              <a href="tel:0124305054" className="text-sm text-white/55 hover:text-white/90">012 430 5054</a>
              <a href="mailto:hello@horen.com.my" className="text-sm text-white/55 hover:text-white/90">hello@horen.com.my</a>
              <a href="https://www.horen.com.my" className="text-sm text-white/55 hover:text-white/90">www.horen.com.my</a>
              <p className="text-xs text-white/35 leading-relaxed mt-1">
                No 8, Unit A-21-03, Tower A,<br />
                Vertical Business Suite, Jalan Kerinchi,<br />
                Bangsar South, 59200 Kuala Lumpur
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/28">© {new Date().getFullYear()} Horen Training Sdn Bhd. All rights reserved.</p>
          <p className="text-xs text-white/28">Kuala Lumpur, Malaysia</p>
        </div>
      </div>
    </footer>
  )
}
