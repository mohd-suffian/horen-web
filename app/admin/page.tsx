import { redirect }       from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { getAllBlogPosts, getAllPages } from '@/lib/cms'
import Link from 'next/link'
import { FileText, BookOpen, Settings, LogOut } from 'lucide-react'

export default async function AdminDashboard() {
  const authed = await isAuthenticated()
  if (!authed) redirect('/admin/login')

  const posts = getAllBlogPosts()
  const pages = getAllPages()

  const cards = [
    {
      label: 'Blog posts',
      count: posts.length,
      href:  '/admin/blog',
      Icon:  BookOpen,
      desc:  'Create, edit, and publish articles',
    },
    {
      label: 'Pages',
      count: pages.length,
      href:  '/admin/pages',
      Icon:  FileText,
      desc:  'Manage static content pages',
    },
    {
      label: 'Settings',
      count: null,
      href:  '/admin/settings',
      Icon:  Settings,
      desc:  'Site config, nav, footer links',
    },
  ]

  return (
    <div className="min-h-screen bg-soft">
      {/* Admin nav */}
      <div className="bg-dark text-white px-8 py-4 flex items-center justify-between">
        <p className="font-serif text-lg text-teal-light">HOREN Admin</p>
        <form action="/api/admin/logout" method="POST">
          <button className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors">
            <LogOut size={14} /> Sign out
          </button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-serif text-3xl text-dark mb-2">Dashboard</h1>
        <p className="text-sm text-gray-400 mb-10">Manage your website content.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map(c => (
            <Link
              key={c.href}
              href={c.href}
              className="bg-white rounded-xl p-6 shadow-[0_1px_8px_rgba(0,0,0,0.06)] border border-gray-100 hover:border-teal/40 hover:shadow-[0_2px_16px_rgba(26,140,140,0.1)] transition-all group"
            >
              <div className="w-10 h-10 bg-teal-pale rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal/10 transition-colors">
                <c.Icon size={18} className="text-teal" />
              </div>
              <p className="font-semibold text-dark text-sm mb-0.5">{c.label}</p>
              {c.count !== null && (
                <p className="font-serif text-2xl text-teal mb-1">{c.count}</p>
              )}
              <p className="text-xs text-gray-400">{c.desc}</p>
            </Link>
          ))}
        </div>

        {/* Recent posts */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-dark text-sm">Recent blog posts</h2>
            <Link href="/admin/blog/new" className="text-xs font-semibold text-teal hover:underline">+ New post</Link>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            {posts.slice(0, 5).map((p, i) => (
              <div key={p.slug} className={`flex items-center justify-between px-5 py-3.5 ${i < posts.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <div>
                  <p className="text-sm font-medium text-dark">{p.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{p.category} · {p.date}</p>
                </div>
                <Link href={`/admin/blog/${p.slug}`} className="text-xs font-semibold text-teal hover:underline ml-4 flex-shrink-0">
                  Edit
                </Link>
              </div>
            ))}
            {posts.length === 0 && (
              <p className="text-sm text-gray-400 px-5 py-6">No posts yet. <Link href="/admin/blog/new" className="text-teal hover:underline">Create your first post →</Link></p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
