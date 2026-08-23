const testimonials = [
  {
    quote:  'The service excellence programme transformed how our front desk team handles guest interactions. Guest satisfaction scores improved within the first month.',
    name:   'Hotel Manager',
    org:    '5-star property, Kuala Lumpur',
    accent: 'border-teal',
  },
  {
    quote:  'HOREN understood our property\'s culture from day one. The training felt custom-built, not off-the-shelf. Our F&B team still references the techniques today.',
    name:   'Director of Human Resources',
    org:    'International hotel chain, Malaysia',
    accent: 'border-teal-light',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-white py-20 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow">What clients say</p>
        <h2 className="font-serif text-4xl text-dark mb-11">In their own words</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-soft rounded-2xl p-9 md:p-11">
              <div className="font-serif text-7xl text-teal-light leading-[0.6] mb-5">&ldquo;</div>
              <p className="font-serif text-lg font-light leading-[1.65] text-dark italic mb-6">{t.quote}</p>
              <div className={`border-l-[3px] ${t.accent} pl-3`}>
                <p className="font-semibold text-sm text-dark">{t.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.org}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
