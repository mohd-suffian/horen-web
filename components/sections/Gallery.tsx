import Link from 'next/link'

export default function Gallery() {
  const slots = [
    { label: 'Featured photo', hint: 'Upload hero shot', large: true },
    { label: 'Training session' },
    { label: 'Team building' },
    { label: 'Award night' },
    { label: 'Workshop' },
    { label: 'Group session' },
  ]
  return (
    <section className="bg-[#F7F9FC] py-18 px-10">
      <div className="max-w-[1100px] mx-auto">
        <p className="eyebrow">Training Gallery</p>
        <h2 className="font-serif text-3xl font-bold text-dark mb-3">In the room with our clients</h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xl">
          Live sessions, team building days, and award nights across Malaysia's leading hotel properties.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {slots.map((s) => (
            <div
              key={s.label}
              className={`${s.large ? 'md:col-span-2 md:row-span-2 md:min-h-[260px]' : ''}
                aspect-square md:aspect-[4/3] bg-gradient-to-br from-[#E8F5F5] to-[#D4EAF0]
                border-[1.5px] border-dashed border-[#90C5C5] rounded-xl
                flex flex-col items-center justify-center gap-2 cursor-pointer`}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A8C8C" strokeWidth="1.5" opacity="0.6">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <span className="text-[11px] text-[#1A8C8C] font-medium opacity-70">{s.label}</span>
              {s.hint && <span className="text-[10px] text-[#1A8C8C] opacity-40">{s.hint}</span>}
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/gallery" className="text-sm text-teal font-semibold">View full gallery →</Link>
        </div>
      </div>
    </section>
  )
}