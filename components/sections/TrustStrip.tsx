import { stripOrder } from '@/lib/clients'

function ClientItem({ name, logo, hidden }: { name: string; logo?: string; hidden?: boolean }) {
  if (logo) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element -- plain img for basePath, same as rest of site */
      <img
        src={`/horen/v2/images/clients/${logo}`}
        alt={hidden ? '' : name}
        loading="lazy"
        decoding="async"
        className="h-14 w-auto mx-4 md:mx-6 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
      />
    )
  }

  return (
    <div className="border border-gray-200 rounded-full px-5 py-2 text-xs font-semibold text-gray-500 whitespace-nowrap mx-4 md:mx-6">
      {name}
    </div>
  )
}

export default function TrustStrip() {
  return (
    <div className="bg-white border-b border-gray-100 py-7">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-300 text-center mb-5">
        Trusted by
      </p>
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="marquee-track flex items-center w-max">
          <div className="marquee-group flex items-center">
            {stripOrder.map(client => (
              <ClientItem key={client.name} name={client.name} logo={client.logo} />
            ))}
          </div>
          <div className="marquee-group flex items-center" aria-hidden="true">
            {stripOrder.map(client => (
              <ClientItem key={`${client.name}-dup`} name={client.name} logo={client.logo} hidden />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
