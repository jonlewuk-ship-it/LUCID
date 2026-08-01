import './globals.css'

export const metadata = {
  title: 'LUCID — The Digital Human Social Platform',
  description: 'Expressing True Emotions. Created by Tony De Palma.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'LUCID',
  },
  openGraph: {
    title: 'LUCID — The Digital Human Social Platform',
    description: 'Expressing True Emotions. No scroll. No likes. Real connection.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#06060E"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
      </head>
      <body>{children}</body>
    </html>
  )
}
