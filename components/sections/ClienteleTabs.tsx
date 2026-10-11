import Link from 'next/link'
import { clients } from '@/lib/clients'

const hospitalityCount = clients.filter(c => c.group === 'hospitality').length
const corporateCount = clients.filter(c => c.group === 'corporate').length

const ACTIVE_CLASS = 'bg-white text-[#1A8C8C] text-sm font-semibold px-4 py-2 rounded-full cursor-pointer'
const INACTIVE_CLASS = 'border border-white/40 text-white text-sm font-semibold px-4 py-2 rounded-full cursor-pointer hover:bg-white/10 transition-colors'

export default function ClienteleTabs({ active }: { active: 'hotels' | 'non-hotel' }) {
  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <Link
        href="/clientele/hotels"
        aria-current={active === 'hotels' ? 'page' : undefined}
        className={active === 'hotels' ? ACTIVE_CLASS : INACTIVE_CLASS}
      >
        Hotel clients ({hospitalityCount})
      </Link>
      <Link
        href="/clientele/non-hotel"
        aria-current={active === 'non-hotel' ? 'page' : undefined}
        className={active === 'non-hotel' ? ACTIVE_CLASS : INACTIVE_CLASS}
      >
        Non-hotel clients ({corporateCount})
      </Link>
    </div>
  )
}
