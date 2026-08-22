import { Star, TrendingUp, CheckCircle, Building } from 'lucide-react'

const reasons = [
  {
    Icon:  Star,
    title: 'Certified expertise',
    desc:  'Microsoft, AWS, and Red Hat certified trainers who have worked in the environments they teach.',
  },
  {
    Icon:  TrendingUp,
    title: 'HRD Corp claimable',
    desc:  'SBL-Khas approved. All programmes are HRD Corp claimable — we assist with the paperwork.',
  },
  {
    Icon:  CheckCircle,
    title: 'Fully customisable',
    desc:  'Private cohorts, on-site or virtual, paced or accelerated — built around your schedule.',
  },
  {
    Icon:  Building,
    title: 'Fortune 500 track record',
    desc:  'Trusted by GLCs, top-100 Bursa companies, and major corporates across Malaysia since 2006.',
  },
]

export default function WhyHoren() {
  return (
    <section className="bg-white py-20 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow">Why HOREN</p>
        <h2 className="font-serif text-4xl text-dark mb-11 max-w-xl">
          The training partner that delivers measurable results
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="bg-white rounded-xl p-7 shadow-[0_2px_14px_rgba(0,0,0,0.06)] border-t-[3px] border-teal"
            >
              <div className="w-10 h-10 bg-teal-pale rounded-lg flex items-center justify-center mb-4">
                <r.Icon size={18} className="text-teal" />
              </div>
              <h3 className="font-serif text-[18px] text-dark mb-2">{r.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
