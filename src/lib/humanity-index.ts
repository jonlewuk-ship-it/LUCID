import { createServerClient } from './supabase'
import type { HumanityIndex } from '@/types'

export const TIERS = [
  { name: 'Ember',    min: 0,    color: '#E87840' },
  { name: 'Flame',    min: 100,  color: '#F0A830' },
  { name: 'Beacon',   min: 350,  color: '#5B8DEF' },
  { name: 'Luminary', min: 700,  color: '#C45EDB' },
  { name: 'Aurora',   min: 1200, color: '#4AE8C4' },
] as const

export function getTier(points: number) {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (points >= TIERS[i].min) return TIERS[i]
  }
  return TIERS[0]
}

export async function calculateHumanityIndex(userId: string): Promise<HumanityIndex> {
  const supabase = createServerClient()

  // Depth: average depth score of user's reflections
  const { data: reflections } = await supabase
    .from('reflections')
    .select('depth_score')
    .eq('author_id', userId)

  const avgDepth = reflections && reflections.length > 0
    ? Math.round(reflections.reduce((s, r) => s + r.depth_score, 0) / reflections.length)
    : 50

  // Empathy: illuminations given through "understanding" spectrum
  const { count: empathyIlls } = await supabase
    .from('illuminations')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('spectrum', 'understanding')

  const empathy = Math.min(99, 50 + (empathyIlls || 0) * 2)

  // Critical Thinking: perspective challenges completed
  const { data: responses } = await supabase
    .from('spark_responses')
    .select('perspective_text')
    .eq('user_id', userId)
    .not('perspective_text', 'eq', '')

  const criticalThinking = Math.min(99, 50 + (responses?.length || 0) * 3)

  // Impact: total illuminated + rippled received
  const { data: userRefls } = await supabase
    .from('reflections')
    .select('illuminated_count, rippled_count')
    .eq('author_id', userId)

  const totalImpact = userRefls?.reduce((s, r) => s + r.illuminated_count + r.rippled_count * 3, 0) || 0
  const impact = Math.min(99, 50 + totalImpact)

  // Consistency: days active in last 30 days
  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString()
  const { data: activeDays } = await supabase
    .from('reflections')
    .select('created_at')
    .eq('author_id', userId)
    .gte('created_at', thirtyDaysAgo)

  const uniqueDays = new Set(activeDays?.map(r => r.created_at.split('T')[0])).size
  const consistency = Math.min(99, Math.round((uniqueDays / 30) * 100))

  return { depth: avgDepth, empathy, critical_thinking: criticalThinking, impact, consistency }
}
