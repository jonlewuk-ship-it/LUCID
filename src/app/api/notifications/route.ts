export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { getSession } from '@/lib/auth'

// GET /api/notifications — list user's notifications
export async function GET() {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServerClient()

  const { data } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', session.id)
    .order('created_at', { ascending: false })
    .limit(30)

  return NextResponse.json(data)
}

// PATCH /api/notifications — mark as read
export async function PATCH(req: Request) {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { ids } = await req.json()
  const supabase = createServerClient()

  await supabase
    .from('notifications')
    .update({ read: true })
    .eq('user_id', session.id)
    .in('id', ids || [])

  return NextResponse.json({ success: true })
}
