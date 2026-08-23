import Link from 'next/link'

export default function Hero() {
  return (
    <section
      className="relative min-h-[560px] flex items-center bg-cover bg-center py-24"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80')" }}
    >
      <div className="absolute inset-0 bg-[#0A3333]/72" />
      <div className="relative px-10 w-[60%] min-w-[680px]">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-6 h-px bg-[#C9A84C]" />
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#C9A84C]">
            Malaysia's Hospitality Training Specialist
          </p>
        </div>
        <h1 className="font-serif font-light text-white leading-[1.2] mb-5 text-[57px]">
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
    </section>
  )
}
