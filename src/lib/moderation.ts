// ═══════════════════════════════════════════
// LUCID — Content Moderation
// Pure soul interactions only.
// ═══════════════════════════════════════════

const BLOCKED_PATTERNS = /\b(fuck|shit|damn|ass|bitch|bastard|crap|dick|pussy|cock|slut|whore|kill|murder|hate\s+you|die|suicide|nude|naked|sex|porn|drug|racist|nazi)\b/gi

const GUIDELINES = [
  'Express emotions with depth and authenticity',
  'No profanity, offensive language, or harmful content',
  'Respect every person\'s experience and perspective',
  'No nudity, violence, or sexually suggestive content',
  'Share from the soul — genuine human connection only',
]

export interface ModerationResult {
  safe: boolean
  message?: string
  flagged?: string[]
}

export function moderateContent(text: string): ModerationResult {
  if (!text || text.trim().length === 0) {
    return { safe: true }
  }

  const found = text.match(BLOCKED_PATTERNS)
  if (found) {
    return {
      safe: false,
      flagged: [...new Set(found.map(w => w.toLowerCase()))],
      message: "This contains language that doesn't align with LUCID's soul-centered community. Please express your feelings with depth, not friction.",
    }
  }

  return { safe: true }
}

export function getGuidelines(): string[] {
  return GUIDELINES
}

// Calculate depth score from text content
export function calculateDepthScore(text: string, emotions: string[], hasPerspective: boolean): number {
  let score = 30 // base

  const wordCount = text.trim().split(/\s+/).length

  // Word count contribution (max 25 points)
  score += Math.min(25, wordCount * 0.3)

  // Emotion tagging (max 10 points)
  score += Math.min(10, emotions.length * 3)

  // Perspective challenge bonus (15 points)
  if (hasPerspective) score += 15

  // Sentence variety (max 10 points)
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const avgSentenceLen = wordCount / Math.max(1, sentences.length)
  if (avgSentenceLen > 8 && avgSentenceLen < 25) score += 10

  // Emotional vocabulary (max 10 points)
  const emotionWords = /\b(felt|feeling|realized|noticed|surprised|moved|touched|understood|connected|afraid|grateful|vulnerable|honest|genuine|deep|profound)\b/gi
  const emotionMatches = text.match(emotionWords)
  score += Math.min(10, (emotionMatches?.length || 0) * 2)

  return Math.min(99, Math.round(score))
}
