import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title:       'HOREN Training | Malaysia IT & Soft Skills Training',
  description: "Malaysia's most established IT and soft skills training provider. HRD Corp claimable, Microsoft, AWS and Red Hat certified. Trusted since 2006.",
  keywords:    'IT training Malaysia, HRD Corp, Azure training, AWS training, soft skills, corporate training KL',
  openGraph: {
    title:       'HOREN Training | Excel With Knowledge',
    description: 'Corporate IT & soft skills training in Malaysia since 2006.',
    url:         'https://horen.com.my',
    siteName:    'HOREN Training',
    locale:      'en_MY',
    type:        'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&family=Outfit:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
