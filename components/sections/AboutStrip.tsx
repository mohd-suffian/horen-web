const trainers = [
  {
    initials: 'AS',
    name:     'Amir Shamodin',
    role:     'Managing Director',
    quote:    '"Learning should change behaviour — not just tick a training box."',
  },
  {
    initials: 'FP',
    name:     'Felicia Phuah',
    role:     'Head of Training',
    quote:    '"Empathy is at the core of impactful training — we don\'t just teach; we transform."',
  },
]

export default function AboutStrip() {
  return (
    <section className="bg-soft py-20 px-6 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-16">
        {/* Text */}
        <div className="flex-1">
          <p className="eyebrow">Who we are</p>
          <h2 className="font-serif text-3xl md:text-4xl text-dark leading-snug mb-5">
            Trainers who&apos;ve worked in the industry they teach
          </h2>
          <p className="text-base text-gray-500 leading-[1.78] mb-4">
            Our trainers aren&apos;t academics or generalists — they&apos;ve managed hotel floors, led
            F&amp;B teams, and handled real guest escalations. That operational experience is what
            makes HOREN programmes land differently from off-the-shelf corporate training.
          </p>
          <p className="text-base text-gray-500 leading-[1.78]">
            That depth is why properties across Malaysia — from international chains to
            independent boutique hotels — return to HOREN year after year.
          </p>
        </div>

        {/* Trainer cards */}
        <div className="flex gap-5 flex-shrink-0">
          {trainers.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_14px_rgba(0,0,0,0.06)] w-44">
              {/* Photo placeholder */}
              <div className="h-40 bg-teal-pale flex items-center justify-center">
                <span className="font-serif text-3xl text-teal">{t.initials}</span>
              </div>
              <div className="p-4">
                <p className="font-semibold text-sm text-dark">{t.name}</p>
                <p className="text-[10px] uppercase tracking-wide text-teal font-semibold mt-0.5 mb-2">{t.role}</p>
                <p className="text-xs text-gray-500 leading-relaxed italic">{t.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
