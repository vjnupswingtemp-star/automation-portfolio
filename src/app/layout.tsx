import type { Metadata } from 'next'
import { Inter, Bricolage_Grotesque } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  weight: ['400', '500', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'We Automate. You Grow. — AI Automation Services',
  description: 'We build n8n workflows and custom AI agents that eliminate manual work for growing businesses. Asia-based team, global clients.',
  icons: {
    icon: '/favicon.svg',
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
    <html lang="en" className={`${inter.variable} ${bricolage.variable} scroll-smooth`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
