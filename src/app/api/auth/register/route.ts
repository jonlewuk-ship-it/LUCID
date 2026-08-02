export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    }

    // Dynamic imports to avoid serverless bundling issues
    const { createClient } = await import('@supabase/supabase-js')
    const bcrypt = (await import('bcryptjs')).default
    const jwt = (await import('jsonwebtoken')).default

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const jwtSecret = process.env.JWT_SECRET || 'lucid-dev-secret'

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Server config missing', detail: 'SUPABASE vars not set' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check existing
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()

    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 12)

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
      return NextResponse.json({ error: 'DB error: ' + error.message }, { status: 500 })
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, { expiresIn: '30d' })

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
  } catch (err: any) {
    return NextResponse.json({ error: 'Registration failed', detail: err.message || String(err) }, { status: 500 })
  }
}
