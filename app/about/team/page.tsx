import TrainerGrid from '@/components/sections/TrainerGrid'

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
        <TrainerGrid />
      </div>
    </div>
  )
}
