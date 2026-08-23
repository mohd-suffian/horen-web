<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HOREN Training Website

Next.js app for HOREN Training, a Malaysian hospitality training company.

- **Local path**: `C:\dev\horen-v2`
- **GitHub repo**: github.com/mohd-suffian/horen-web (`master` branch)
- **Live site**: https://app.dn-lab.my/horen/v2
- **Server**: Hetzner VPS, SSH alias `dn-lab` (user: `suffian`, host: `app.dn-lab.my`)
- **Server path**: `/home/suffian/horen-v2`
- **Port**: 3007, managed via PM2 (process name: `horen-v2`)
- **basePath**: `/horen/v2` (set in `next.config.ts`)

## Deploy workflow

Edit locally → `git push origin master` → SSH into `dn-lab` → `git pull` → `pnpm build` → `pm2 reload horen-v2`.

## Git

Do not add Co-Authored-By lines to commit messages. Keep commit messages clean and concise.
