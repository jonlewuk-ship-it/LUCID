'use client'
import React from 'react'

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: string }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: '' }
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', background: '#06060E', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ textAlign: 'center', maxWidth: 400 }}>
            <div style={{ fontSize: 28, color: '#EDE6D6', fontFamily: 'serif' }}>LUCID</div>
            <div style={{ fontSize: 13, color: '#E85D75', marginTop: 16 }}>Something went wrong</div>
            <div style={{ fontSize: 11, color: '#5E587A', marginTop: 8, wordBreak: 'break-all' }}>{this.state.error}</div>
            <button onClick={() => { localStorage.clear(); window.location.reload(); }}
              style={{ marginTop: 20, padding: '10px 24px', borderRadius: 10, background: '#F0A830', color: '#06060E', border: 'none', fontSize: 13, cursor: 'pointer' }}>
              Reset & Reload
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
