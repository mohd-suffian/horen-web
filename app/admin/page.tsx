import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import Link from 'next/link'
import {
  MdGridView,
  MdGroup,
  MdArticle,
  MdPhoto,
  MdInbox,
  MdPersonSearch,
  MdBarChart,
  MdAdminPanelSettings,
  MdSettings,
  MdLogout,
} from 'react-icons/md'
import type { IconType } from 'react-icons'

interface DashboardCard {
  label: string
  desc: string
  Icon: IconType
  badge: string
  badgeClassName: string
  href?: string
}

const contentCards: DashboardCard[] = [
  {
    label: 'Programmes',
    desc:  'Manage training categories, programme listings and descriptions',
    Icon:  MdGridView,
    badge: 'Phase 2',
    badgeClassName: 'bg-[#1A8C8C]/10 text-[#1A8C8C]',
  },
  {
    label: 'Trainers',
    desc:  'Update trainer profiles, bios and headshots',
    Icon:  MdGroup,
    badge: 'Phase 2',
    badgeClassName: 'bg-[#1A8C8C]/10 text-[#1A8C8C]',
  },
  {
    label: 'Blog',
    desc:  'Publish and manage articles, announcements and promotions',
    Icon:  MdArticle,
    badge: 'Phase 2',
    badgeClassName: 'bg-[#1A8C8C]/10 text-[#1A8C8C]',
    href:  '/admin/blog',
  },
  {
    label: 'Gallery',
    desc:  'Upload and organise training event photos',
    Icon:  MdPhoto,
    badge: 'Phase 2',
    badgeClassName: 'bg-[#1A8C8C]/10 text-[#1A8C8C]',
  },
]

const crmCards: DashboardCard[] = [
  {
    label: 'Enquiries',
    desc:  'View and manage contact form submissions and training requests',
    Icon:  MdInbox,
    badge: 'Phase 3',
    badgeClassName: 'bg-purple-100 text-purple-600',
  },
  {
    label: 'Trainer applications',
    desc:  'Review recruitment form submissions from trainer candidates',
    Icon:  MdPersonSearch,
    badge: 'Phase 3',
    badgeClassName: 'bg-purple-100 text-purple-600',
  },
  {
    label: 'Analytics',
    desc:  'Track page views, enquiry trends and top-performing programmes',
    Icon:  MdBarChart,
    badge: 'Phase 3',
    badgeClassName: 'bg-purple-100 text-purple-600',
  },
]

const systemCards: DashboardCard[] = [
  {
    label: 'User management',
    desc:  'Add and manage admin accounts and roles',
    Icon:  MdAdminPanelSettings,
    badge: 'Coming soon',
    badgeClassName: 'bg-amber-50 text-amber-600',
  },
  {
    label: 'Settings',
    desc:  'Manage site config, nav structure, HRD Corp info and contact details',
    Icon:  MdSettings,
    badge: 'Live',
    badgeClassName: 'bg-green-50 text-green-600',
    href:  '/admin/settings',
  },
]

function Card({ label, desc, Icon, badge, badgeClassName, href }: DashboardCard) {
  const content = (
    <>
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#0A3333]/5 text-[#0A3333] group-hover:bg-[#1A8C8C]/10 group-hover:text-[#1A8C8C] transition-colors">
          <Icon size={18} />
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${badgeClassName}`}>
          {badge}
        </span>
      </div>
      <p className="font-semibold text-[#0A3333] text-sm mt-4 mb-1">{label}</p>
      <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_1px_8px_rgba(0,0,0,0.06)] hover:border-[#1A8C8C]/40 hover:shadow-[0_2px_16px_rgba(26,140,140,0.1)] transition-all group flex flex-col"
      >
        {content}
      </Link>
    )
  }

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 opacity-60 cursor-not-allowed flex flex-col">
      {content}
    </div>
  )
}

function CardSection({ label, cards }: { label: string; cards: DashboardCard[] }) {
  return (
    <div className="mb-12">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400 mb-4">{label}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map(c => <Card key={c.label} {...c} />)}
      </div>
    </div>
  )
}

export default async function AdminDashboard() {
  const authed = await isAuthenticated()
  if (!authed) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-soft">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="font-medium text-[#0A3333] text-sm">HOREN</p>
          <span className="text-gray-300">/</span>
          <p className="text-sm text-gray-400">Admin Portal</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#1A8C8C] text-white text-xs font-semibold flex items-center justify-center">
              MS
            </div>
            <p className="text-sm text-[#0A3333] font-medium">Suffian</p>
          </div>
          <form action="/api/admin/logout" method="POST">
            <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#0A3333] transition-colors">
              <MdLogout size={15} /> Logout
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-[18px] font-semibold text-[#0A3333] mb-1">Good morning, Suffian</h1>
          <p className="text-sm text-gray-400">Here&apos;s an overview of your admin workspace.</p>
        </div>

        <CardSection label="Phase 2 — Content Management" cards={contentCards} />
        <CardSection label="Phase 3 — CRM" cards={crmCards} />
        <CardSection label="System" cards={systemCards} />
      </div>
    </div>
  )
}
