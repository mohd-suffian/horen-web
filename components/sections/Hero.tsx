import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0f3737] min-h-[420px]">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d2a3d] to-[#0EA5D8] opacity-90" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-24 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left: Copy */}
        <div className="flex-1 max-w-xl">
          <p className="eyebrow text-teal-light mb-5">Excel With Knowledge</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white leading-[1.1] mb-5">
            Build teams that<br />
            <span className="text-teal-light">perform with purpose.</span>
          </h1>
          <p className="text-white/80 text-base leading-[1.75] max-w-md mb-9">
            Malaysia&apos;s most established IT and soft skills training provider —
            HRD Corp claimable, certified by Microsoft, AWS and Red Hat,
            trusted by Fortune 500s and GLCs since 2006.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/programmes"
              className="bg-teal text-white font-semibold text-sm px-6 py-3 rounded-[7px] hover:bg-teal/90 transition-colors"
            >
              View programmes
            </Link>
            <Link
              href="/about"
              className="border border-white/60 text-white font-semibold text-sm px-6 py-3 rounded-[7px] hover:bg-white/10 transition-colors"
            >
              Meet our trainers
            </Link>
          </div>
        </div>

        {/* Right: Stat card */}
        <div className="flex-shrink-0 w-full md:w-72">
          <div className="bg-white/[0.07] border border-white/15 rounded-2xl p-8">
            <p className="font-serif text-5xl text-teal-light leading-none mb-2">18+</p>
            <p className="text-sm text-white/72 leading-snug">years as Malaysia&apos;s trusted IT training partner</p>
            <hr className="border-white/10 my-5" />
            <p className="font-serif text-5xl text-teal-light leading-none mb-2">5,000+</p>
            <p className="text-sm text-white/72 leading-snug">professionals trained across corporate Malaysia</p>
            <p className="text-[11px] text-white/30 italic mt-4">Based on client-reported results</p>
          </div>
        </div>
      </div>
    </section>
  )
}
