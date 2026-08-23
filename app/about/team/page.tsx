const trainers = [
  { name: 'Coleman Chin',       spec: 'Strategic Change Leadership for Hotel Executives' },
  { name: 'Cherrise Tan',       spec: 'Level Up Your Brand Image, Elevating Guest Experiences' },
  { name: 'Henny Ong',          spec: 'Excellent Customer Service, Supervisory Skills' },
  { name: 'Eugene Ng',          spec: 'Leveraging Productivity Tools, Generative AI, Excel, Canva' },
  { name: 'Sally Yap',          spec: 'Effective Team Building, Authentic Leadership' },
  { name: 'Zaiyani Abd Malik',  spec: 'Accounting for Hotel Executives, Finance for Non-Finance, E-invoicing' },
  { name: 'Dr Prabha Peter',    spec: 'Cross Collaboration Management, Forging Positive Relationships' },
  { name: 'Fakitah Kasa',       spec: 'Business Writing Skills, Excellence in Spoken Communications, English for Hoteliers' },
]

function initials(name: string) {
  return name
    .replace(/^Dr\s+/, '')
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
}

export default function TeamPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#1A8C8C] py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Meet Our Training Experts</h1>
          <p className="text-white/70 text-base max-w-2xl leading-relaxed">
            Our trainers bring real hospitality industry experience into every programme.
          </p>
        </div>
      </div>

      {/* Trainer grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map(t => (
            <div
              key={t.name}
              className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-full bg-[#1A8C8C]/15 flex items-center justify-center mb-5">
                <span className="font-serif text-2xl text-[#1A8C8C]">{initials(t.name)}</span>
              </div>
              <h3 className="font-serif text-lg text-dark mb-2">{t.name}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{t.spec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
