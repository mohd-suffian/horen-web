import { Fragment } from 'react'

export default function StatsBar() {
  const stats = [
    { num: '2019', label: 'Established' },
    { num: '8+',   label: 'Expert Trainers' },
    { num: '12+',  label: 'Hotel Partners' },
    { num: '8',    label: 'Training Categories' },
    { num: '100%', label: 'HRD Corp Claimable' },
  ]
  return (
    <div className="bg-[#1A8C8C] flex justify-around items-center py-9 px-10 gap-4">
      {stats.map((s, i) => (
        <Fragment key={s.label}>
          <div className="text-center">
            <div className="font-serif text-[44px] text-white leading-none">{s.num}</div>
            <div className="text-[11px] text-white/65 uppercase tracking-widest mt-1.5">{s.label}</div>
          </div>
          {i < stats.length - 1 && <div className="w-px h-12 bg-white/18" />}
        </Fragment>
      ))}
    </div>
  )
}