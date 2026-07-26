export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { getSession } from '@/lib/auth'
import { moderateContent, calculateDepthScore } from '@/lib/moderation'

// GET /api/reflections — list reflections (depth view)
export async function GET(req: Request) {
  const supabase = createServerClient()
  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get('limit') || '10')

  const { data } = await supabase
    .from('reflections')
    .select(`
      *,
      author:users(id, essence_name, photo_url, essence_points, torchbearer),
      illuminations(id, user_id, spectrum, text_content, users(id, essence_name, photo_url))
    `)
    .order('created_at', { ascending: false })
    .limit(limit)

  return NextResponse.json(data)
}

// POST /api/reflections — create a reflection
export async function POST(req: Request) {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { text, emotions, photo_url, spark_id, perspective_text } = await req.json()

    if (!text || text.trim().split(/\s+/).length < 20) {
      return NextResponse.json({ error: 'Minimum 20 words required' }, { status: 400 })
    }

    const modResult = moderateContent(text)
    if (!modResult.safe) return NextResponse.json({ error: modResult.message }, { status: 422 })

    if (perspective_text) {
      const perspMod = moderateContent(perspective_text)
      if (!perspMod.safe) return NextResponse.json({ error: perspMod.message }, { status: 422 })
    }

    const depthScore = calculateDepthScore(text, emotions || [], !!perspective_text)

    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('reflections')
      .insert({
        author_id: session.id,
        spark_id: spark_id || null,
        text_content: text,
        photo_url: photo_url || null,
        emotions: emotions || [],
        depth_score: depthScore,
      })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Award essence points
    let points = 20 + (perspective_text ? 20 : 0)
    await supabase
      .from('users')
      .update({ essence_points: session.essence_points + points })
      .eq('id', session.id)

    return NextResponse.json({ ...data, points_earned: points }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
