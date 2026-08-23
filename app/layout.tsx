import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title:       'HOREN Training | Malaysia Hospitality & Soft Skills Training',
  description: "Malaysia's only hospitality-dedicated, HRD Corp-claimable training partner. Measurable results on guest scores, staff retention and RevPAR.",
  keywords:    'hospitality training Malaysia, HRD Corp claimable, hotel training, service excellence, soft skills, corporate training KL',
  icons: {
    icon:     '/horen/v2/images/favicons/favicon3.ico',
    shortcut: '/horen/v2/images/favicons/favicon3.ico',
    apple:    '/horen/v2/images/favicons/favicon3.ico',
  },
  openGraph: {
    title:       'HOREN Training | Excel With Knowledge',
    description: "Malaysia's only hospitality-dedicated, HRD Corp-claimable training partner.",
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
