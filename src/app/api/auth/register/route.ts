import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { hashPassword, createToken } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    }
    const supabase = createServerClient()
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }
    const passwordHash = await hashPassword(password)
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        name,
        email: email.toLowerCase(),
        password_hash: passwordHash,
        essence_points: 0,
        values: [],
        humanity_index: { depth: 50, empathy: 50, criticalThinking: 50, impact: 50, consistency: 50 },
        spectrum: { intelligence: 50, understanding: 50, communication: 50, appreciation: 50 },
      })
      .select()
      .single()
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    const token = createToken(user.id, user.email)
    return NextResponse.json({ user, token })
  } catch (err) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
