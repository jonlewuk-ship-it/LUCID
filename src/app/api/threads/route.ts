import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { getSession } from '@/lib/auth'
import { moderateContent } from '@/lib/moderation'

// GET /api/threads — list user's threads
export async function GET() {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServerClient()

  const { data } = await supabase
    .from('threads')
    .select(`
      *,
      user_a:users!threads_user_a_id_fkey(id, essence_name, photo_url, essence_points),
      user_b:users!threads_user_b_id_fkey(id, essence_name, photo_url, essence_points)
    `)
    .or(`user_a_id.eq.${session.id},user_b_id.eq.${session.id}`)
    .order('created_at', { ascending: false })

  return NextResponse.json(data)
}

// POST /api/threads — send a message (with 2-hour delay)
export async function POST(req: Request) {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { thread_id, text } = await req.json()

    // Content moderation
    const modResult = moderateContent(text)
    if (!modResult.safe) {
      return NextResponse.json({ error: modResult.message }, { status: 422 })
    }

    if (!text || text.length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters' }, { status: 400 })
    }

    const supabase = createServerClient()

    // Enforce 2-hour delay between messages from same sender
    const { data: lastMsg } = await supabase
      .from('thread_messages')
      .select('created_at')
      .eq('thread_id', thread_id)
      .eq('sender_id', session.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (lastMsg) {
      const hoursSince = (Date.now() - new Date(lastMsg.created_at).getTime()) / 3600000
      if (hoursSince < 2) {
        const remaining = Math.ceil((2 - hoursSince) * 60)
        return NextResponse.json({
          error: `Think before you write. Next message available in ${remaining} minutes.`,
        }, { status: 429 })
      }
    }

    // Message is available to recipient after 2 hours
    const availableAt = new Date(Date.now() + 2 * 3600000).toISOString()

    const { data, error } = await supabase
      .from('thread_messages')
      .insert({
        thread_id,
        sender_id: session.id,
        text_content: text,
        available_at: availableAt,
      })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Send notification to other participant
    const { data: thread } = await supabase
      .from('threads')
      .select('user_a_id, user_b_id')
      .eq('id', thread_id)
      .single()

    if (thread) {
      const recipientId = thread.user_a_id === session.id ? thread.user_b_id : thread.user_a_id
      await supabase.from('notifications').insert({
        user_id: recipientId,
        type: 'thread_message',
        text_content: `${session.essence_name} sent you a thoughtful message`,
        reference_id: thread_id,
        reference_type: 'thread',
      })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
