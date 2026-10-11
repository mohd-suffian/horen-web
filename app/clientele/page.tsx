import Link from 'next/link'
import { clients, type Client } from '@/lib/clients'

const hospitality = clients.filter(c => c.group === 'hospitality')
const corporate = clients.filter(c => c.group === 'corporate')

function ClientCard({ client }: { client: Client }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6 flex flex-col items-center justify-center text-center min-h-[110px] gap-2">
      {client.logo ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element -- plain img for basePath, same as rest of site */}
          <img
            src={`/horen/v2/images/clients/${client.logo}`}
            alt=""
            className="h-16 w-auto object-contain"
          />
          <p className="text-sm text-gray-500 leading-snug">{client.name}</p>
        </>
      ) : (
        <p className="font-serif text-lg text-dark leading-snug">{client.name}</p>
      )}
    </div>
  )
}

export default function ClientelePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#1A8C8C] py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Our Clients</h1>
          <p className="text-white/70 text-base max-w-2xl leading-relaxed">
            Trusted by leading hotel brands and organisations across Malaysia.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="#hotels"
              className="border border-white/40 text-white text-sm font-semibold px-4 py-2 rounded-full cursor-pointer hover:bg-white/10 focus:text-[#1A8C8C] focus:bg-white transition-colors"
            >
              Hotel clients ({hospitality.length})
            </Link>
            <Link
              href="#non-hotel"
              className="border border-white/40 text-white text-sm font-semibold px-4 py-2 rounded-full cursor-pointer hover:bg-white/10 focus:text-[#1A8C8C] focus:bg-white transition-colors"
            >
              Non-hotel clients ({corporate.length})
            </Link>
          </div>
        </div>
      </div>

      {/* Hospitality clients */}
      <div id="hotels" className="max-w-6xl mx-auto px-6 md:px-10 py-16 scroll-mt-24">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A8C8C] mb-3">Hospitality Industry</p>
        <h2 className="font-serif text-3xl text-dark mb-10">Hotel &amp; resort partners</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hospitality.map(client => <ClientCard key={client.name} client={client} />)}
        </div>
      </div>

      {/* Non-hospitality clients */}
      <div id="non-hotel" className="bg-[#F7F8FA] py-16 px-6 md:px-10 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A8C8C] mb-3">Non-Hospitality Industry</p>
          <h2 className="font-serif text-3xl text-dark mb-10">Corporate partners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {corporate.map(client => <ClientCard key={client.name} client={client} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
