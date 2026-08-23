const beliefs = [
  { title: 'Client-centric', desc: 'Every programme is built around the property\'s real operational goals, not a generic syllabus.' },
  { title: 'Communication',  desc: 'Clear, honest dialogue with clients and trainers before, during and after every engagement.' },
  { title: 'Empathy',        desc: 'Understanding the pressures of frontline hospitality work shapes how we teach.' },
  { title: 'Effectiveness',  desc: 'We measure success in guest scores, staff retention and RevPAR — not attendance sheets.' },
  { title: 'Trust',          desc: 'Long-term partnerships built on consistency and follow-through, cohort after cohort.' },
]

const leaders = [
  {
    name:  'Amir Shamsudin',
    role:  'Managing Director',
    quote: 'Listening Skill is an opportunity that Horen is taking full advantage of.',
  },
  {
    name:  'Felicia Phuoh',
    role:  'Head of Training & Marketing',
    quote: 'Empathy is at the core of impactful training.',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#1A8C8C] py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">About HOREN</h1>
          <p className="text-white/70 text-base max-w-2xl leading-relaxed">
            Malaysia&apos;s hospitality training specialist since 2019.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-16">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A8C8C] mb-3">Our Story</p>
        <h2 className="font-serif text-3xl text-dark mb-5">Built for hotels, by hoteliers</h2>
        <p className="text-gray-500 leading-relaxed mb-4">
          HOREN Training was founded in 2019 with a single focus: hospitality. While most training
          providers in Malaysia spread themselves across every industry, we chose to go deep instead of
          wide — building a catalogue of 60+ programmes designed specifically for hotel operations,
          from the front desk to the executive floor.
        </p>
        <p className="text-gray-500 leading-relaxed">
          Every programme is HRD Corp claimable under SBL-Khas, and every trainer in our network has
          real hospitality industry experience — not just a training certification.
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="bg-[#F7F8FA] py-16 px-6 md:px-10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A8C8C] mb-3">Vision</p>
            <p className="text-gray-600 leading-relaxed">
              To be Malaysia&apos;s most trusted hospitality training partner, recognised for measurable
              impact on service quality and business performance.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A8C8C] mb-3">Mission</p>
            <p className="text-gray-600 leading-relaxed">
              To equip hotel teams — from supervisors to executives — with practical, industry-specific
              skills that translate directly into guest satisfaction and revenue.
            </p>
          </div>
        </div>
      </div>

      {/* Our Beliefs */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A8C8C] mb-3">Our Beliefs</p>
        <h2 className="font-serif text-3xl text-dark mb-10">What guides how we work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {beliefs.map(b => (
            <div key={b.title} className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6">
              <div className="h-1 w-10 bg-[#1A8C8C] rounded-full mb-5" />
              <h3 className="font-serif text-lg text-dark mb-2">{b.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership */}
      <div className="bg-[#F7F8FA] py-16 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A8C8C] mb-3">Leadership</p>
          <h2 className="font-serif text-3xl text-dark mb-10">The people behind HOREN</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {leaders.map(l => (
              <div key={l.name} className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-7">
                <div className="w-16 h-16 rounded-full bg-[#1A8C8C]/15 flex items-center justify-center mb-5">
                  <span className="font-serif text-xl text-[#1A8C8C]">
                    {l.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <p className="font-serif text-xl text-dark mb-0.5">{l.name}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1A8C8C] mb-4">{l.role}</p>
                <p className="text-sm text-gray-500 italic leading-relaxed">&ldquo;{l.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
