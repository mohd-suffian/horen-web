import Link from 'next/link'
import { Monitor, Cloud, Users } from 'lucide-react'

const programmes = [
  {
    tag:   'Cloud',
    title: 'Microsoft Azure & M365',
    desc:  'From AZ-900 fundamentals to advanced architect certifications. Get your teams cloud-ready on the world\'s leading enterprise platform.',
    href:  '/programmes/azure',
    Icon:  Monitor,
  },
  {
    tag:   'Infrastructure',
    title: 'AWS & Red Hat Linux',
    desc:  'Amazon Web Services and Red Hat Enterprise Linux — from practitioner essentials to RHCSA system administration certifications.',
    href:  '/programmes/aws',
    Icon:  Cloud,
  },
  {
    tag:   'Leadership',
    title: 'Soft Skills & Leadership',
    desc:  'Presentation, technical writing, project management, and team building — the human skills that make technical organisations thrive.',
    href:  '/programmes/soft-skills',
    Icon:  Users,
  },
]

export default function Programmes() {
  return (
    <section className="bg-white py-20 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow">What we offer</p>
        <h2 className="font-serif text-4xl text-dark mb-11">Our programmes</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programmes.map((p) => (
            <div key={p.href} className="bg-white rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.07)] overflow-hidden group">
              <div className="h-1 bg-teal" />
              <div className="p-7">
                <div className="w-11 h-11 bg-teal-pale rounded-[10px] flex items-center justify-center mb-5">
                  <p.Icon size={20} className="text-teal" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-teal-light mb-2">{p.tag}</p>
                <h3 className="font-serif text-[21px] text-dark mb-2.5 leading-snug">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">{p.desc}</p>
                <Link href={p.href} className="text-sm font-semibold text-teal hover:underline">
                  Explore programme →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/programmes"
            className="text-sm font-semibold text-teal border-b-[1.5px] border-teal pb-0.5 hover:opacity-80"
          >
            View all programmes →
          </Link>
        </div>
      </div>
    </section>
  )
}
