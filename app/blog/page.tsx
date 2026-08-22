import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/cms'

export const metadata = {
  title: 'Blog | HOREN Training',
  description: 'Insights on IT training, cloud certifications, and workforce development in Malaysia.',
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-soft py-16 px-6 md:px-10 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="eyebrow">Insights</p>
          <h1 className="font-serif text-4xl text-dark">From the HOREN team</h1>
          <p className="text-gray-500 mt-3 text-base">
            Practical perspectives on IT trends, certifications, and corporate learning in Malaysia.
          </p>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-14">
        {posts.length === 0 ? (
          <p className="text-gray-400 text-sm">No posts yet.</p>
        ) : (
          <div className="flex flex-col gap-10">
            {posts.map(post => (
              <article key={post.slug} className="border-b border-gray-100 pb-10 last:border-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-teal mb-2">{post.category}</p>
                <h2 className="font-serif text-2xl text-dark mb-3 leading-snug">
                  <Link href={`/blog/${post.slug}`} className="hover:text-teal transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>{post.author}</span>
                  <span>·</span>
                  <span>{new Date(post.date).toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
