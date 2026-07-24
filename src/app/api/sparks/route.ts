import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { getSession } from '@/lib/auth'
import { moderateContent, calculateDepthScore } from '@/lib/moderation'

// GET /api/sparks — list community sparks
export async function GET(req: Request) {
  const supabase = createServerClient()
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const limit = parseInt(searchParams.get('limit') || '20')

  let query = supabase
    .from('sparks')
    .select('*, creator:users(id, essence_name, photo_url, essence_points, torchbearer)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (category) query = query.eq('category', category)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data)
}

// POST /api/sparks — create a new spark
export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { prompt, category, difficulty, estimated_time, points } = await req.json()

    if (!prompt || prompt.length < 30) {
      return NextResponse.json({ error: 'Spark prompt must be at least 30 characters' }, { status: 400 })
    }

    const moderation = moderateContent(prompt)
    if (!moderation.safe) {
      return NextResponse.json({ error: moderation.message }, { status: 422 })
    }

    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('sparks')
      .insert({
        creator_id: session.id,
        prompt,
        category: category || 'Reflection',
        difficulty: difficulty || 2,
        estimated_time: estimated_time || '30 min',
        points: points || 40,
      })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Create journey milestone
    await supabase.from('journey_milestones').insert({
      user_id: session.id,
      milestone: `Created spark: "${prompt.substring(0, 50)}..."`,
      type: 'growth',
    })

    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
