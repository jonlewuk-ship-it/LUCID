'use client'
import dynamic from 'next/dynamic'

const LucidApp = dynamic(() => import('@/components/LucidApp'), { ssr: false })

export default function Home() { return <LucidApp /> }
