export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    const { createClient } = await import('@supabase/supabase-js')
    const bcrypt = (await import('bcryptjs')).default
    const jwt = (await import('jsonwebtoken')).default

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const jwtSecret = process.env.JWT_SECRET || 'lucid-dev-secret'

    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single()

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
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
    return NextResponse.json({ error: 'Login failed', detail: err.message || String(err) }, { status: 500 })
  }
}
