import type { Metadata } from 'next'
import { Inter, Bricolage_Grotesque, Playfair_Display } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/react'
import { ChatWidget, CalProvider } from '@/components/ui'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  weight: ['400', '500', '700', '800'],
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const bitroad = localFont({
  src: '../../public/fonts/Bitroad-Regular.ttf',
  variable: '--font-bitroad',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? 'https://autobeets.vercel.app'),
  title: 'We Automate. You Grow. — AI Automation Services',
  description: 'We build n8n workflows and custom AI agents that eliminate manual work for growing businesses. Asia-based team, global clients.',
  icons: {
    icon: '/logos/autologo.svg',
  },
  openGraph: {
    title: 'We Automate. You Grow. — AI Automation Services',
    description: 'We build n8n workflows and custom AI agents that eliminate manual work for growing businesses.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable} ${playfair.variable} ${bitroad.variable} scroll-smooth`}>
      <body>
        {children}
        <ChatWidget />
        <CalProvider />
        <Analytics />
      </body>
    </html>
  )
}
