const trainers = [
  { name: 'Coleman Chin',       spec: 'Leadership & Coaching, Communication, Team Building',          photo: 'coleman-chin.jpg' },
  { name: 'Marcus Tioh',        spec: 'Leadership & Coaching, Sales & Marketing, Team Building',       photo: 'marcus-tioh.jpg' },
  { name: 'Felicia Phuah',      spec: 'Workplace Wellness & EQ, Leadership & Coaching',                photo: 'felicia.jpg' },
  { name: 'Crystal Lim',        spec: 'Personal Branding & LinkedIn for Hospitality',                  photo: 'crystal-lim.jpg' },
  { name: 'Cherrise Tan',       spec: 'Brand Image, Communication Skills',                             photo: 'cherrise-tan.jpg' },
  { name: 'Rose Mohamed',       spec: 'Professional Image, Grooming & Etiquette',                      photo: 'rose-mohamed.jpg' },
  { name: 'Eugene Ng',          spec: 'AI, Excel & Productivity Tools',                                photo: 'eugene-ng.jpg' },
  { name: 'Dave Leong',         spec: 'AI for Hotel Operations',                                       photo: 'dave-leong.jpg' },
  { name: 'Joanne Leow',        spec: 'Service Excellence, F&B, Business Dining Etiquette',             photo: 'joanne-leow.jpg' },
  { name: 'Henny Ong',          spec: 'Service Excellence, Team Building',                             photo: 'henny-ong.jpg' },
  { name: 'Mimi Renati',        spec: 'Housekeeping Excellence, Guest Service',                        photo: 'mimi-renati.jpg' },
  { name: 'Kelvin Lai',         spec: 'Service Recovery, F&B Finance & Operations',                    photo: 'kelvin-lai.jpg' },
  { name: 'Fakitah Kasa',       spec: 'Business English, Writing & Presentation Skills',               photo: 'fakitah-kasa.jpg' },
  { name: 'Kat Han Teng',       spec: 'HR & Hiring for Hospitality',                                   photo: 'kat-han-teng.jpg' },
  { name: 'Ernest Balansingam', spec: 'PDPA, Cybersecurity & Data Protection',                         photo: 'ernest-balansingam.jpg' },
  { name: "Dato' Shahril",      spec: 'Kaizen Leadership & Operations',                                photo: 'dato-shahril.jpg' },
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
              <div className="w-20 h-20 rounded-full bg-[#1A8C8C]/15 flex items-center justify-center mb-5 overflow-hidden">
                {t.photo ? (
                  <img src={`/horen/v2/images/team/${t.photo}`} alt={t.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="font-serif text-2xl text-[#1A8C8C]">{initials(t.name)}</span>
                )}
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
