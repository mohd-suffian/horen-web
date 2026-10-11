import { clients } from '@/lib/clients'
import ClienteleTabs from '@/components/sections/ClienteleTabs'
import ClientGrid from '@/components/sections/ClientGrid'

export const metadata = {
  title: 'Non-Hotel Clients | HOREN Training',
  description: 'Corporate and institutional clients across Malaysia that train with HOREN, from aviation to banking and public agencies.',
}

const corporate = clients.filter(c => c.group === 'corporate')

export default function NonHotelClientsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#1A8C8C] py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Our Clients</h1>
          <p className="text-white/70 text-base max-w-2xl leading-relaxed">
            Corporate and institutional partners across Malaysia.
          </p>
          <ClienteleTabs active="non-hotel" />
        </div>
      </div>

      {/* Non-hospitality clients */}
      <div className="bg-[#F7F8FA] py-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A8C8C] mb-3">Non-Hospitality Industry</p>
          <h2 className="font-serif text-3xl text-dark mb-10">Corporate partners</h2>
          <ClientGrid clients={corporate} columns={5} />
        </div>
      </div>
    </div>
  )
}
