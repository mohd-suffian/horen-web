const stats = [
  { num: '200+',  label: 'Corporate Clients' },
  { num: '18+',   label: 'Years in Malaysia' },
  { num: '5,000+',label: 'Participants Trained' },
  { num: '4',     label: 'Certified Partners' },
]

export default function StatsBar() {
  return (
    <div className="bg-teal px-6 md:px-10 py-11">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-around items-center gap-6">
        {stats.map((s, i) => (
          <div key={i} className="flex items-center gap-6">
            <div className="text-center">
              <p className="font-serif text-4xl md:text-5xl text-white leading-none tracking-tight">{s.num}</p>
              <p className="text-xs text-white/68 mt-2 uppercase tracking-[0.1em] font-medium">{s.label}</p>
            </div>
            {i < stats.length - 1 && (
              <div className="hidden md:block w-px h-12 bg-white/20" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
