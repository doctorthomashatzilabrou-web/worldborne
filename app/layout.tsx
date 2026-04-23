import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Worldborne Medical — Physician-Led Clinical Content Review',
  description: 'Board-certified physician oversight for health publishers, legal content teams, and SEO agencies operating in YMYL verticals.',
  keywords: 'medical content review, physician review, clinical accuracy, YMYL, E-E-A-T, health content',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
