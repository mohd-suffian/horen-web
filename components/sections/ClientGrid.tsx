import type { Client } from '@/lib/clients'

export function ClientCard({ client }: { client: Client }) {
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

export default function ClientGrid({ clients, columns }: { clients: Client[]; columns: 4 | 5 }) {
  const gridClass = columns === 5
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'

  return (
    <div className={gridClass}>
      {clients.map(client => <ClientCard key={client.name} client={client} />)}
    </div>
  )
}
