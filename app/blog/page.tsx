import Link from 'next/link'
import { ImageOff } from 'lucide-react'
import { getAllBlogPosts } from '@/lib/cms'
import { categoryIcons, DefaultCategoryIcon } from '@/components/ui/blog-category-icon'
import { colorsFor } from '@/lib/blog-colors'

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
            {posts.map(post => {
              const CategoryIcon = categoryIcons[post.category] ?? DefaultCategoryIcon
              const colors = colorsFor(post.category)
              const formattedDate = new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col hover:shadow-[0_4px_24px_rgba(0,0,0,0.1)] transition-shadow scroll-mt-20"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {post.image ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element -- plain img for basePath, same as rest of site */}
                        <img
                          src={post.image}
                          alt=""
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      </>
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
                      >
                        <CategoryIcon
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20"
                          size={56}
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </div>
                    )}

                    <span className="absolute bottom-3 left-3 text-[11px] font-semibold uppercase tracking-widest text-white bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      {post.category}
                    </span>
                    <span className="absolute top-3 right-3 text-xs text-white/80">
                      {formattedDate}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="font-serif text-xl text-dark mb-2 leading-snug">{post.title}</h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                    <span className="mt-auto text-sm font-semibold text-[#1A8C8C]">Read more →</span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
