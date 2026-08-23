export default function StatsBar() {
  const stats = [
    { num: '2019', label: 'Established' },
    { num: '8+',   label: 'Expert Trainers' },
    { num: '12+',  label: 'Hotel Partners' },
    { num: '8',    label: 'Training Categories' },
    { num: '100%', label: 'HRD Corp Claimable' },
  ]
  return (
    <div className="bg-[#1A8C8C] grid grid-cols-3 md:grid-cols-5 items-center gap-y-6 py-9 px-6 md:px-10">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`text-center ${i === 3 ? 'col-start-2 md:col-start-auto' : ''}`}
        >
          <div className="font-serif text-2xl sm:text-3xl md:text-[44px] text-white leading-none">{s.num}</div>
          <div className="text-xs md:text-[11px] text-white/65 uppercase tracking-widest mt-1.5">{s.label}</div>
        </div>
      ))}
    </div>
  )
}