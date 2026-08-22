import fs   from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR  = path.join(process.cwd(), 'content/blog')
const PAGES_DIR = path.join(process.cwd(), 'content/pages')

export interface BlogPost {
  slug:        string
  title:       string
  excerpt:     string
  date:        string
  category:    string
  author:      string
  published:   boolean
  content:     string
}

export interface Page {
  slug:      string
  title:     string
  metaDesc:  string
  content:   string
  published: boolean
}

// ── Blog ──────────────────────────────────────────────

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md') || f.endsWith('.mdx'))

  return files
    .map(file => {
      const slug    = file.replace(/\.mdx?$/, '')
      const raw     = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug,
        title:     data.title     ?? 'Untitled',
        excerpt:   data.excerpt   ?? '',
        date:      data.date      ?? '',
        category:  data.category  ?? 'General',
        author:    data.author    ?? 'HOREN Team',
        published: data.published ?? false,
        content,
      } as BlogPost
    })
    .filter(p => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPost(slug: string): BlogPost | null {
  const mdPath  = path.join(BLOG_DIR, `${slug}.md`)
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`)
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null
  if (!filePath) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    title:     data.title     ?? 'Untitled',
    excerpt:   data.excerpt   ?? '',
    date:      data.date      ?? '',
    category:  data.category  ?? 'General',
    author:    data.author    ?? 'HOREN Team',
    published: data.published ?? false,
    content,
  }
}

export function saveBlogPost(slug: string, frontmatter: Partial<BlogPost>, content: string) {
  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true })
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  const fm = Object.entries(frontmatter)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join('\n')
  fs.writeFileSync(filePath, `---\n${fm}\n---\n\n${content}`)
}

export function deleteBlogPost(slug: string) {
  const md  = path.join(BLOG_DIR, `${slug}.md`)
  const mdx = path.join(BLOG_DIR, `${slug}.mdx`)
  if (fs.existsSync(md))  fs.unlinkSync(md)
  if (fs.existsSync(mdx)) fs.unlinkSync(mdx)
}

// ── Pages ─────────────────────────────────────────────

export function getAllPages(): Page[] {
  if (!fs.existsSync(PAGES_DIR)) return []
  const files = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.md') || f.endsWith('.mdx'))

  return files.map(file => {
    const slug = file.replace(/\.mdx?$/, '')
    const raw  = fs.readFileSync(path.join(PAGES_DIR, file), 'utf-8')
    const { data, content } = matter(raw)
    return {
      slug,
      title:     data.title     ?? slug,
      metaDesc:  data.metaDesc  ?? '',
      published: data.published ?? false,
      content,
    } as Page
  })
}

export function getPage(slug: string): Page | null {
  const mdPath  = path.join(PAGES_DIR, `${slug}.md`)
  const mdxPath = path.join(PAGES_DIR, `${slug}.mdx`)
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null
  if (!filePath) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { slug, title: data.title ?? slug, metaDesc: data.metaDesc ?? '', published: data.published ?? false, content }
}
