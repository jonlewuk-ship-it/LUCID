import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LUCID — See clearly. Feel deeply. Connect truly.',
  description: 'The social platform that rewards you for becoming a better human. No scroll. No likes. Real connection.',
  keywords: ['social media', 'mindfulness', 'connection', 'humanity', 'critical thinking'],
  openGraph: {
    title: 'LUCID',
    description: 'See clearly. Feel deeply. Connect truly.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
