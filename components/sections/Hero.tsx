import Link from 'next/link'

export default function Hero() {
  return (
    <section className="grid grid-cols-[1.1fr_0.9fr] min-h-[420px]">
      {/* Left — headline */}
      <div className="bg-[#0F2A45] px-10 py-14 flex flex-col justify-center">
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#7AAFDC] mb-4">
          Malaysia's Hospitality Training Specialist
        </p>
        <h1 className="font-serif text-[34px] font-bold text-white leading-[1.2] mb-5">
          Turn service into{' '}
          <em className="not-italic text-[#C9A84C]">revenue</em> —<br />
          people into stayers
        </h1>
        <p className="text-sm text-white/65 leading-relaxed mb-6 max-w-[380px]">
          Malaysia's only hospitality-dedicated, HRD Corp-claimable training partner.
          We deliver measurable results on guest scores, staff retention and RevPAR.
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {['HRD Corp Claimable','SBL-Khas Ready','Hospitality Only','Trusted Since 2019'].map(t => (
            <span key={t} className="bg-white/8 border border-white/15 px-3 py-1 rounded-full text-[11px] text-white/70">{t}</span>
          ))}
        </div>
        <div className="flex gap-3">
          <Link href="/programmes" className="bg-[#C9A84C] text-[#0F2A45] font-bold px-6 py-2.5 rounded-md text-sm">Explore Programs</Link>
          <Link href="/contact" className="border border-white/45 text-white px-5 py-2.5 rounded-md text-sm font-semibold">Download Brochure</Link>
        </div>
      </div>
      {/* Right — brand positioning card */}
      <div className="bg-[#1A3A5C] px-10 py-14 flex items-center justify-center">
        <div className="bg-white/6 border border-white/14 rounded-2xl p-7 w-full">
          <p className="font-serif font-normal italic text-white/85 text-[15px] leading-relaxed mb-5 border-l-[3px] border-[#C9A84C] pl-4">
            "Malaysia's only hospitality-dedicated, HRD Corp-claimable training partner that turns service into revenue and people into stayers — with measurable results."
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: 'Specialise', sub: 'Hospitality only — never generalist' },
              { title: 'Prove ROI', sub: 'Turnover, guest scores, RevPAR' },
              { title: 'Effortless Claims', sub: 'SBL-Khas default, IndSF-aligned' },
              { title: 'AI for Hotels', sub: 'The future skill no rival claims' },
            ].map(p => (
              <div key={p.title} className="bg-white/5 border border-white/15 rounded-xl p-3">
                <div className="text-[12px] font-semibold text-[#C9A84C] mb-1">{p.title}</div>
                <div className="text-[11px] text-white/55 leading-snug">{p.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}