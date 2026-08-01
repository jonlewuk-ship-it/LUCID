import './globals.css'

export const metadata = {
  title: 'LUCID — The Digital Human Social Platform',
  description: 'Expressing True Emotions. Created by Tony De Palma.',
  openGraph: {
    title: 'LUCID — The Digital Human Social Platform',
    description: 'Expressing True Emotions. No scroll. No likes. Real connection.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>)
}
