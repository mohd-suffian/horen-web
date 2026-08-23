import { Award, ShieldCheck, BadgeCheck } from 'lucide-react'

export default function AwardsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#1A8C8C] py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Awards and Recognition</h1>
          <p className="text-white/70 text-base max-w-2xl leading-relaxed">
            Recognised for our contribution to hospitality training in Malaysia.
          </p>
        </div>
      </div>

      {/* Training Partner Recognition Award */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-16">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A8C8C] mb-3">Recognition</p>
        <h2 className="font-serif text-3xl text-dark mb-8">Training Partner Recognition Award</h2>
        <div className="aspect-video rounded-xl bg-[#F7F8FA] border border-gray-100 flex flex-col items-center justify-center gap-3">
          <Award size={40} className="text-[#1A8C8C]" />
          <p className="text-sm text-gray-500">Award image placeholder</p>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-[#F7F8FA] py-16 px-6 md:px-10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-7 flex flex-col items-center text-center">
            <ShieldCheck size={36} className="text-[#1A8C8C] mb-4" />
            <h3 className="font-serif text-xl text-dark mb-2">HRD Corp Registered Training Provider</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Officially registered with HRD Corp to deliver accredited training programmes.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-7 flex flex-col items-center text-center">
            <BadgeCheck size={36} className="text-[#1A8C8C] mb-4" />
            <h3 className="font-serif text-xl text-dark mb-2">HRD Corp Claimable</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              All HOREN programmes qualify for HRD Corp claims under the SBL-Khas scheme.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
