import { clients } from '@/lib/clients'
import ClienteleTabs from '@/components/sections/ClienteleTabs'
import ClientGrid from '@/components/sections/ClientGrid'

export const metadata = {
  title: 'Hotel Clients | HOREN Training',
  description: 'Hotel and resort brands across Malaysia that train with HOREN, from international chains to independent boutique properties.',
}

const hospitality = clients.filter(c => c.group === 'hospitality')

export default function HotelClientsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#1A8C8C] py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Our Clients</h1>
          <p className="text-white/70 text-base max-w-2xl leading-relaxed">
            Hotel and resort partners across Malaysia.
          </p>
          <ClienteleTabs active="hotels" />
        </div>
      </div>

      {/* Hospitality clients */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A8C8C] mb-3">Hospitality Industry</p>
        <h2 className="font-serif text-3xl text-dark mb-10">Hotel &amp; resort partners</h2>
        <ClientGrid clients={hospitality} columns={4} />
      </div>
    </div>
  )
}
