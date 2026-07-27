'use client'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const LucidApp = dynamic(() => import('@/components/LucidApp'), { 
  ssr: false,
  loading: () => (
    <div style={{ minHeight: '100vh', background: '#06060E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 32, color: '#EDE6D6', fontFamily: 'serif', letterSpacing: 4 }}>LUCID</div>
        <div style={{ fontSize: 12, color: '#5E587A', marginTop: 8 }}>Loading...</div>
      </div>
    </div>
  )
})

export default function Home() { 
  return (
    <Suspense fallback={<div style={{ background: '#06060E', minHeight: '100vh' }} />}>
      <LucidApp />
    </Suspense>
  )
}
