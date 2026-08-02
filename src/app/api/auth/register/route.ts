export const dynamic = "force-dynamic"
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
        essence_name: name,
        email: email.toLowerCase(),
        password_hash: passwordHash,
        essence_points: 0,
        values_list: [],
        hi_depth: 50, hi_empathy: 50, hi_critical_thinking: 50, hi_impact: 50, hi_consistency: 50,
        spectrum_intelligence: 50, spectrum_understanding: 50, spectrum_communication: 50, spectrum_appreciation: 50,
        total_witnessed: 0, total_stirred: 0, total_illuminated: 0, total_rippled: 0,
      })
      .select()
      .single()
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    const token = createToken(user.id, user.email)
    // Map DB columns to frontend shape
    return NextResponse.json({ 
      user: {
        id: user.id, name: user.essence_name, email: user.email,
        essencePoints: user.essence_points, bio: user.bio || '',
        values: user.values_list || [],
        photo: user.photo_url, profileBg: user.profile_bg_url,
        spectrum: { intelligence: user.spectrum_intelligence, understanding: user.spectrum_understanding, communication: user.spectrum_communication, appreciation: user.spectrum_appreciation },
        rewards: { witnessed: user.total_witnessed, stirred: user.total_stirred, illuminated: user.total_illuminated, rippled: user.total_rippled },
        humanityIndex: { depth: user.hi_depth, empathy: user.hi_empathy, criticalThinking: user.hi_critical_thinking, impact: user.hi_impact, consistency: user.hi_consistency },
      }, 
      token 
    })
  } catch (err) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
