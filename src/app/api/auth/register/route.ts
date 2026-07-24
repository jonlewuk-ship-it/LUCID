import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { hashPassword, createToken, setAuthCookie } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json()

    if (!email || !name || password?.length < 8) {
      return NextResponse.json({ error: 'Email, name, and password (8+ chars) required' }, { status: 400 })
    }

    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      return NextResponse.json({ error: 'Password must include uppercase and number' }, { status: 400 })
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
        email: email.toLowerCase(),
        password_hash: passwordHash,
        essence_name: name,
      })
      .select('id, email, essence_name, tier, essence_points')
      .single()

    if (error) {
      return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
    }

    const token = createToken(user.id, user.email)
    setAuthCookie(token)

    // Create first journey milestone
    await supabase.from('journey_milestones').insert({
      user_id: user.id,
      milestone: 'Joined LUCID — the journey begins',
      type: 'start',
      emotion: 'Curiosity',
    })

    return NextResponse.json({ user, token })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
