import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { getSession } from '@/lib/auth'

// GET /api/circles — list circles
export async function GET() {
  const supabase = createServerClient()

  const { data } = await supabase
    .from('circles')
    .select(`
      *,
      circle_members(user_id, users(id, essence_name, photo_url, essence_points))
    `)
    .order('created_at', { ascending: false })

  return NextResponse.json(data)
}

// POST /api/circles — create or join
export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { action, circle_id, name, description, challenge, total_days } = await req.json()

  const supabase = createServerClient()

  if (action === 'join') {
    // Check max members
    const { count } = await supabase
      .from('circle_members')
      .select('*', { count: 'exact', head: true })
      .eq('circle_id', circle_id)

    const { data: circle } = await supabase
      .from('circles')
      .select('max_members')
      .eq('id', circle_id)
      .single()

    if (count && circle && count >= circle.max_members) {
      return NextResponse.json({ error: 'Circle is full' }, { status: 400 })
    }

    const { error } = await supabase
      .from('circle_members')
      .insert({ circle_id, user_id: session.id })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  }

  // Create new circle
  const { data, error } = await supabase
    .from('circles')
    .insert({
      name,
      description,
      challenge,
      total_days: total_days || 30,
      start_date: new Date().toISOString().split('T')[0],
      created_by: session.id,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Auto-join creator
  await supabase.from('circle_members').insert({ circle_id: data.id, user_id: session.id })

  return NextResponse.json(data, { status: 201 })
}
