import { notFound }         from 'next/navigation'
import { getBlogPost, getAllBlogPosts } from '@/lib/cms'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllBlogPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return { title: `${post.title} | HOREN Blog`, description: post.excerpt }
}

// Very simple markdown renderer (no external deps needed for basic content)
function renderMarkdown(content: string) {
  const lines = content.split('\n')
  const html: string[] = []
  let inList = false

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (inList) { html.push('</ul>'); inList = false }
      html.push(`<h2>${line.slice(3)}</h2>`)
    } else if (line.startsWith('### ')) {
      html.push(`<h3>${line.slice(4)}</h3>`)
    } else if (line.startsWith('- ')) {
      if (!inList) { html.push('<ul>'); inList = true }
      html.push(`<li>${line.slice(2)}</li>`)
    } else if (line.startsWith('**') && line.endsWith('**')) {
      if (inList) { html.push('</ul>'); inList = false }
      html.push(`<p><strong>${line.slice(2, -2)}</strong></p>`)
    } else if (line.trim() === '') {
      if (inList) { html.push('</ul>'); inList = false }
    } else {
      if (inList) { html.push('</ul>'); inList = false }
      // inline bold
      const processed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      html.push(`<p>${processed}</p>`)
    }
  }
  if (inList) html.push('</ul>')
  return html.join('\n')
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post || !post.published) notFound()

  const htmlContent = renderMarkdown(post.content)

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-soft py-14 px-6 md:px-10 border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-xs font-semibold text-teal uppercase tracking-widest hover:underline">
            ← Back to blog
          </Link>
          <p className="text-xs font-semibold uppercase tracking-widest text-teal mt-4 mb-3">{post.category}</p>
          <h1 className="font-serif text-3xl md:text-4xl text-dark leading-snug mb-4">{post.title}</h1>
          <p className="text-sm text-gray-400">
            {post.author} · {new Date(post.date).toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 md:px-10 py-12">
        <div
          className="prose prose-lg max-w-none
            prose-headings:font-serif prose-headings:font-normal prose-headings:text-dark
            prose-p:text-gray-500 prose-p:leading-relaxed
            prose-li:text-gray-500
            prose-strong:text-dark prose-strong:font-semibold
            prose-a:text-teal prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>

      {/* CTA */}
      <div className="border-t border-gray-100 py-12 px-6 md:px-10 text-center">
        <p className="font-serif text-2xl text-dark mb-2">Interested in this programme?</p>
        <p className="text-gray-500 text-sm mb-6">Get a proposal tailored to your team in 48 hours.</p>
        <Link href="/contact" className="bg-teal text-white font-semibold px-7 py-3 rounded-[7px] hover:bg-teal/90 transition-colors">
          Get in touch
        </Link>
      </div>
    </div>
  )
}
