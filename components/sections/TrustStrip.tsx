const clients = [
  'Petronas', 'RHB Bank', 'Maybank', 'Weststar Aviation',
  'MIDA', 'Sunway Group', 'Telekom Malaysia', 'Axiata',
  'Marrybrown', 'TNB', 'CIMB', 'Shell Malaysia',
]

export default function TrustStrip() {
  const doubled = [...clients, ...clients]

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
          {doubled.map((client, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-full px-5 py-2 text-xs font-semibold text-gray-500 whitespace-nowrap mx-1.5"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
