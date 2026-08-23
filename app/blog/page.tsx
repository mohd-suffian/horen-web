import Link from 'next/link'
import { ImageOff } from 'lucide-react'
import { getAllBlogPosts } from '@/lib/cms'

export const metadata = {
  title: 'Blog | HOREN Training',
  description: 'Training news, programme launches and industry insights from HOREN.',
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#1A8C8C] py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Announcements &amp; Updates</h1>
          <p className="text-white/70 text-base max-w-2xl leading-relaxed">
            Training news, programme launches and industry insights from HOREN.
          </p>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="w-20 h-20 rounded-full bg-[#1A8C8C]/10 flex items-center justify-center mb-5">
              <ImageOff size={28} className="text-[#1A8C8C]" />
            </div>
            <p className="text-gray-400 text-sm">No announcements yet — check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col hover:shadow-[0_4px_24px_rgba(0,0,0,0.1)] transition-shadow scroll-mt-20"
              >
                <div className="aspect-[16/9] bg-[#1A8C8C] flex items-center justify-center">
                  <span className="font-serif text-white/40 text-3xl">HOREN</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#1A8C8C] mb-2">{post.category}</p>
                  <h2 className="font-serif text-xl text-dark mb-2 leading-snug">{post.title}</h2>
                  <p className="text-xs text-gray-400 mb-3">
                    {new Date(post.date).toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                  <span className="mt-auto text-sm font-semibold text-[#1A8C8C]">Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
