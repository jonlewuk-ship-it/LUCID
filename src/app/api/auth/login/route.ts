export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { verifyPassword, createToken } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }
    const supabase = createServerClient()
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single()
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    const valid = await verifyPassword(password, user.password_hash)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    const token = createToken(user.id, user.email)
    return NextResponse.json({ user, token })
  } catch (err) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
