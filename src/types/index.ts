// ═══════════════════════════════════════════
// LUCID — Type Definitions
// ═══════════════════════════════════════════

export interface User {
  id: string
  email: string
  essence_name: string
  bio: string
  evolved_bio: string
  photo_url: string | null
  profile_bg_url: string | null
  values_list: string[]
  essence_points: number
  tier: TierName
  torchbearer: boolean
  torch_reason: string | null
  language: string
  location_lat: number | null
  location_lng: number | null
  location_city: string | null
  humanity_index: HumanityIndex
  rewards: RewardCounts
  spectrum: ConnectionSpectrum
  created_at: string
  last_active: string
}

export type TierName = 'Ember' | 'Flame' | 'Beacon' | 'Luminary' | 'Aurora'

export interface HumanityIndex {
  depth: number
  empathy: number
  critical_thinking: number
  impact: number
  consistency: number
}

export interface RewardCounts {
  witnessed: number
  stirred: number
  illuminated: number
  rippled: number
}

export interface ConnectionSpectrum {
  intelligence: number
  understanding: number
  communication: number
  appreciation: number
}

export type SpectrumKey = keyof ConnectionSpectrum

export interface Spark {
  id: string
  creator_id: string
  creator?: User
  prompt: string
  prompt_translations: Record<string, string>
  category: SparkCategory
  difficulty: 1 | 2 | 3
  estimated_time: string
  points: number
  accepted_count: number
  returned_count: number
  avg_depth_score: number
  is_active: boolean
  created_at: string
}

export type SparkCategory =
  | 'Mindfulness' | 'Empathy' | 'Courage'
  | 'Creativity' | 'Connection' | 'Reflection' | 'Challenge'

export interface SparkResponse {
  id: string
  spark_id: string
  user_id: string
  user?: User
  text_content: string
  perspective_text: string
  photo_url: string | null
  emotions: string[]
  depth_score: number
  verified: boolean
  creator_review: string | null
  verified_at: string | null
  submitted_at: string | null
  created_at: string
}

export interface Reflection {
  id: string
  author_id: string
  author?: User
  spark_id: string | null
  text_content: string
  photo_url: string | null
  emotions: string[]
  depth_score: number
  rewards: RewardCounts
  created_at: string
}

export interface Illumination {
  id: string
  reflection_id: string
  user_id: string
  user?: User
  spectrum: SpectrumKey
  text_content: string
  created_at: string
}

export interface Thread {
  id: string
  user_a_id: string
  user_b_id: string
  topic: string
  other_user?: User
  last_message?: ThreadMessage
  message_count: number
  created_at: string
}

export interface ThreadMessage {
  id: string
  thread_id: string
  sender_id: string
  text_content: string
  available_at: string
  created_at: string
}

export interface Circle {
  id: string
  name: string
  description: string
  challenge: string
  max_members: number
  total_days: number
  start_date: string
  current_day: number
  members: User[]
  member_count: number
  created_by: string
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  text_content: string
  reference_id: string | null
  reference_type: string | null
  read: boolean
  created_at: string
}

export type NotificationType =
  | 'illuminated' | 'stirred' | 'rippled' | 'spark_accepted'
  | 'spark_responded' | 'thread_message' | 'circle_reflection'
  | 'torchbearer_nominated' | 'humanity_increase' | 'tier_upgrade'

export interface JourneyMilestone {
  id: string
  user_id: string
  milestone: string
  type: 'start' | 'growth' | 'breakthrough' | 'connection' | 'impact' | 'tier' | 'torchbearer'
  emotion: string | null
  connected_user_id: string | null
  created_at: string
}

export interface QualityScore {
  key: string
  label: string
  level: number  // 0-1
  color: string
}
