# HOREN Training Website

Next.js 14 + Tailwind CSS + file-based CMS.

## Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + custom CSS variables
- **CMS**: File-based (Markdown files in `/content`)
- **Admin**: Password-protected `/admin` portal
- **Forms**: API route → email stub (swap in Resend / Mailchimp)
- **Hosting**: Hetzner Cloud VPS (CX23) — same server as Lexara
- **OS**: Ubuntu 24.04 LTS
- **Process manager**: PM2
- **Reverse proxy**: Nginx
- **Package manager**: pnpm

---

## Local development

> **Local dev path (Windows):** `C:\dev\horen-website`

```bash
pnpm install
cp .env.local.example .env.local   # edit password + domain
pnpm dev                            # http://localhost:3000
```

---

## Project structure

```
app/
  page.tsx              # Homepage (assembles sections)
  blog/                 # Blog listing + post pages
  contact/              # Contact form page
  admin/                # CMS admin portal (password protected)
  api/
    admin/              # Auth + content CRUD endpoints
    contact/            # Form handler (add email here)

components/
  layout/               # Navbar, Footer
  sections/             # Hero, StatsBar, TrustStrip, Programmes,
                        # WhyHoren, AboutStrip, Testimonials, CtaBlock

content/
  blog/                 # .md files — one per post
  pages/                # .md files — one per static page

lib/
  cms.ts                # Read/write markdown content
  auth.ts               # Admin session management
```

---

## CMS: adding a blog post

Create a new file in `content/blog/my-post-slug.md`:

```md
---
title: "My post title"
excerpt: "One line summary shown on listing page"
date: "2026-08-22"
category: "Cloud"
author: "HOREN Team"
published: true
---

Your post content here in Markdown.
```

Or use the admin portal at `/admin/blog/new`.

---

## Admin portal

Visit `/admin` → password is set in `.env.local` as `ADMIN_PASSWORD`.

Default dev password: `horen2026`
**Change this before deploying.**

---

## Deployment — Hetzner VPS (via SSH)

The site runs on the same Hetzner CX23 VPS as Lexara, managed by PM2 under Nginx.

### SSH access

```bash
ssh dn-lab
# expands to: ssh suffian@app.dn-lab.my -i ~/.ssh/id_ed25519
```

Ensure `~/.ssh/config` has:

```
Host dn-lab
  HostName app.dn-lab.my
  User suffian
  IdentityFile ~/.ssh/id_ed25519
  ServerAliveInterval 15
```

> Key is `ed25519`, stored at `C:\Users\mohds\.ssh\id_ed25519` on the home Windows laptop.

### URL structure

| URL | What |
|-----|------|
| `https://app.dn-lab.my/horen/v1/` | Archived mockup HTML (static, already live) |
| `https://app.dn-lab.my/horen/v2/` | This Next.js CMS app (current) |
| `https://horen.com.my/` | Future — when domain is pointed at the server |

### Deployment workflow (mandatory — no direct server edits)

1. Make changes locally in VS Code (`C:\dev\horen-web`)
2. Commit and push to GitHub (`github.com/mohd-suffian/horen-web`)
3. SSH into server: `ssh dn-lab`
4. `cd /var/www/horen-v2 && git pull`
5. `pnpm install && pnpm build`
6. `pm2 reload horen-v2`

> ⚠️ **Never edit files directly on the server** (no `sed`, `nano`, `vim` in place).
> All changes go through VS Code → GitHub → SSH pull.

### PM2 process setup (first deploy only)

```bash
# On the server, from /var/www/horen-v2:
pm2 start pnpm --name horen-v2 -- start -p 3002
pm2 save
```

### PM2 quick reference

```bash
pm2 status              # view all processes
pm2 logs horen-v2       # tail logs
pm2 reload horen-v2     # graceful reload after deploy
```

### Nginx config (add to `/etc/nginx/sites-available/default`)

```nginx
# v1 — archived mockup (static file already in /var/www/html/horen/v1/)
location /horen/v1/ {
    alias /var/www/html/horen/v1/;
    index index.html;
    try_files $uri $uri/ =404;
}

# v2 — Next.js CMS app
location /horen/v2/ {
    proxy_pass http://localhost:3002/horen/v2/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

```bash
sudo nginx -t && sudo systemctl reload nginx
```

### When moving to horen.com.my (future)

1. Point DNS A record → Hetzner VPS IP
2. Remove `basePath` and `assetPrefix` from `next.config.ts`
3. Add a dedicated Nginx server block for `horen.com.my`
4. Run: `sudo certbot --nginx -d horen.com.my -d www.horen.com.my`
5. Update `NEXT_PUBLIC_BASE_URL` in `.env.local` → `https://horen.com.my`

### Build notes

- TypeScript `noUnusedLocals` is enforced — **clean up unused imports** before pushing or the build fails
- `pip install` on server (if ever needed): always use `--break-system-packages`

---

## Adding email to the contact form

See `app/api/contact/route.ts` — stub with three options:
- **Resend** (recommended): `pnpm add resend`
- **Nodemailer** (SMTP): any email provider
- **HubSpot / Mailchimp**: drop in API call for CRM integration

---

## Environment variables (`.env.local`)

```env
ADMIN_PASSWORD=horen2026          # change before deploying
NEXT_PUBLIC_BASE_URL=https://horen.com.my
PORT=3001                         # must not conflict with Lexara (3006)

# Add when ready:
# RESEND_API_KEY=re_...
# HUBSPOT_API_KEY=...
# MAILCHIMP_API_KEY=...
```

---

## Future roadmap
- [ ] Image carousel component (homepage / programmes)
- [ ] Rich text editor in admin (TipTap or Quill)
- [ ] Sitemap generation (`app/sitemap.ts`)
- [ ] HubSpot / Mailchimp CRM hook in contact API
- [ ] Programme detail pages
- [ ] Trainers page
- [ ] Clients / case studies page
- [ ] Point `horen.com.my` DNS → Hetzner VPS IP
