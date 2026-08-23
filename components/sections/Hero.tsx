import Link from 'next/link'

const categories = [
  { name: 'Leadership and Supervisory Skills', count: 6 },
  { name: 'Communication Skills', count: 6 },
  { name: 'Team Building', count: 7 },
  { name: 'AI, Excel and Productivity Tools', count: 12 },
  { name: 'Workplace Wellness and EQ', count: 7 },
  { name: 'PDPA, Cybersecurity and Labour Law', count: 3 },
  { name: 'Service Excellence, F&B and Housekeeping', count: 10 },
  { name: 'Sales, Marketing and Brand Image', count: 11 },
]

const stats = [
  { value: '60+', label: 'Programmes' },
  { value: '12+', label: 'Hotel brands' },
  { value: '8', label: 'Expert trainers' },
  { value: '100%', label: 'HRD Corp claimable' },
]

export default function Hero() {
  return (
    <section className="grid grid-cols-[1.1fr_0.9fr] min-h-[420px]">
      {/* Left — headline */}
      <div className="bg-[#0A1E30] px-10 py-14 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-6 h-px bg-[#C9A84C]" />
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#C9A84C]">
            Malaysia's Hospitality Training Specialist
          </p>
        </div>
        <h1 className="font-serif font-light text-[36px] text-white leading-[1.2] mb-5">
          Where service becomes{' '}
          <em className="not-italic italic text-[#C9A84C]">revenue</em> and staff
          become{' '}
          <em className="not-italic italic text-[#C9A84C]">assets</em>
        </h1>
        <p className="text-sm text-white/65 leading-relaxed mb-8 max-w-[400px]">
          The only HRD Corp-claimable training partner dedicated entirely to hospitality —
          with measurable outcomes on guest scores, retention, and RevPAR.
        </p>
        <div className="flex flex-wrap gap-3 mb-10">
          <Link
            href="/programmes"
            className="bg-[#C9A84C] text-[#0A1E30] font-bold px-6 py-2.5 rounded-md text-sm"
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
        <div className="flex items-center gap-6 pt-6 border-t border-white/10">
          {stats.map((s, i) => (
            <div key={s.label} className="flex items-center gap-6">
              <div>
                <div className="font-serif text-xl text-white">{s.value}</div>
                <div className="text-[11px] text-white/50">{s.label}</div>
              </div>
              {i < stats.length - 1 && <span className="w-px h-8 bg-white/15" />}
            </div>
          ))}
        </div>
      </div>

      {/* Right — 2026/27 programme categories */}
      <div className="bg-[#0F2A45] border-l border-[#C9A84C]/40 px-10 py-14 flex items-center justify-center">
        <div className="w-full">
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#C9A84C] mb-5">
            2026/27 Programme Categories
          </p>
          <div className="flex flex-col divide-y divide-white/10 mb-6">
            {categories.map(c => (
              <div key={c.name} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] shrink-0" />
                  <span className="text-sm text-white/80">{c.name}</span>
                </div>
                <span className="text-sm font-semibold text-[#C9A84C] shrink-0 ml-4">
                  {c.count}
                </span>
              </div>
            ))}
          </div>
          <div className="border border-[#C9A84C]/40 rounded-xl p-5">
            <span className="inline-block bg-[#C9A84C] text-[#0A1E30] text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full mb-2">
              HRD Corp Claimable
            </span>
            <p className="text-[13px] text-white/70 leading-relaxed">
              All programmes registered under SBL-Khas. We handle the paperwork — your
              team just trains.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
