const hospitality = [
  'The Ruma Hotel & Residences',
  'Sunway Hotel Putra KL',
  'St. Giles Hotels',
  'Meliá Kuala Lumpur',
  'Holiday Villa Hotels & Resorts',
  'SKS Hospitality',
  'Starwood Hotels & Resorts',
  'Sunway Hotel Big Box',
]

const nonHospitality = [
  'Weststar Aviation Services',
  'Marrybrown',
  'RHB Bank',
  'MIDA',
  'F-Secure',
]

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
        </div>
      </div>

      {/* Hospitality clients */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A8C8C] mb-3">Hospitality Industry</p>
        <h2 className="font-serif text-3xl text-dark mb-10">Hotel &amp; resort partners</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hospitality.map(name => (
            <div
              key={name}
              className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6 flex items-center justify-center text-center min-h-[110px]"
            >
              <p className="font-serif text-lg text-dark leading-snug">{name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Non-hospitality clients */}
      <div className="bg-[#F7F8FA] py-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A8C8C] mb-3">Non-Hospitality Industry</p>
          <h2 className="font-serif text-3xl text-dark mb-10">Corporate partners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {nonHospitality.map(name => (
              <div
                key={name}
                className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6 flex items-center justify-center text-center min-h-[110px]"
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
