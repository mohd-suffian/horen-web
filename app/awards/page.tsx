import { Trophy } from 'lucide-react'

const awards = [
  {
    name:  'Best Hospitality Training Provider',
    body:  'Malaysia Tourism Awards',
    year:  '2024',
    desc:  'Recognised for outstanding contribution to hospitality workforce development.',
  },
  {
    name:  'HRD Corp Approved Training Provider',
    body:  'Human Resources Development Corporation',
    year:  '2023',
    desc:  'Certified SBL-Khas training provider for all HOREN programmes.',
  },
  {
    name:  'Excellence in Soft Skills Training',
    body:  'Malaysian Association of Hotels',
    year:  '2023',
    desc:  'Awarded for measurable impact on hotel staff performance and guest satisfaction.',
  },
  {
    name:  'Top Corporate Training Partner',
    body:  'Ministry of Tourism, Arts and Culture Malaysia',
    year:  '2022',
    desc:  'Acknowledged for consistent delivery of high-quality hospitality training.',
  },
]

const affiliations = ['HRD Corp', 'Malaysian Association of Hotels', 'Ministry of Tourism']

export default function AwardsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#0A3333] py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Awards &amp; Recognition</h1>
          <p className="text-white/70 text-base max-w-2xl leading-relaxed">
            Recognised for excellence in corporate training across Malaysia.
          </p>
        </div>
      </div>

      {/* Awards grid */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {awards.map(a => (
            <div
              key={a.name}
              className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-7 flex flex-col"
            >
              <div className="w-12 h-12 rounded-lg bg-[#1A8C8C]/10 flex items-center justify-center mb-5">
                <Trophy size={22} className="text-[#1A8C8C]" />
              </div>
              <h3 className="font-serif text-xl text-dark mb-2 leading-snug">{a.name}</h3>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1A8C8C] mb-1">{a.body}</p>
              <p className="text-xs text-gray-400 mb-4">{a.year}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications & Affiliations */}
      <div className="bg-[#F7F8FA] py-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A8C8C] mb-3">Certifications &amp; Affiliations</p>
          <h2 className="font-serif text-3xl text-dark mb-10">Trusted and accredited</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {affiliations.map(name => (
              <div
                key={name}
                className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-8 flex items-center justify-center text-center min-h-[110px]"
              >
                <p className="font-serif text-lg text-dark leading-snug">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
