import { Star } from 'lucide-react'

const testimonials = [
  {
    client: 'The Ruma Hotel & Residences',
    rating: 5,
    quote: 'Horen always has a good trainer...thank you! Very good training and I would like to join next time again.',
  },
  {
    client: 'Sunway Putra Hotel',
    rating: 5,
    quote: 'We are not just learning here, we are sharing experiences.',
  },
  {
    client: 'Melia Hotel',
    rating: 5,
    quote: "Everything was excellent... simply the best! The trainer's teaching method is easy to understand.",
  },
  {
    client: 'Holiday Villa',
    rating: 5,
    quote: 'The content sharing today is related to the scenario in the hotel industry and the learning environment was so fun!',
  },
  {
    client: 'SKS Hospitality',
    rating: 5,
    quote: 'The trainer is able to keep us focused in the training and carry out the session very well.',
  },
]

export default function TestimonialsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#1A8C8C] py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">What Our Clients Say</h1>
          <p className="text-white/70 text-base max-w-2xl leading-relaxed">
            Real feedback from hotel teams we&apos;ve trained.
          </p>
        </div>
      </div>

      {/* Testimonial grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div
              key={t.client}
              className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-7 flex flex-col"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-[#C9A84C] text-[#C9A84C]" />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed italic mb-6 flex-1">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-sm font-semibold text-dark">{t.client}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
