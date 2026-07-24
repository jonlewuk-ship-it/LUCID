// ═══════════════════════════════════════════
// LUCID — Internationalization
// ═══════════════════════════════════════════

export const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
] as const

export type LangCode = typeof LANGUAGES[number]['code']

const translations: Record<string, Record<string, string>> = {
  en: {
    tagline: 'See clearly. Feel deeply. Connect truly.',
    begin: 'BEGIN YOUR JOURNEY',
    signIn: 'Already have an essence? Sign in',
    todaySpark: "Today's Spark",
    acceptSpark: 'Accept this Spark',
    sparkAccepted: 'Spark accepted — go live it',
    imBack: "I'm back — share my experience",
    whatExperience: 'What did you experience?',
    dontDescribe: "Don't describe what happened — describe what it felt like.",
    whatEmotions: 'What emotions surfaced?',
    addPhoto: 'Add a photo from this experience',
    shareReflection: 'Share this reflection',
    perspectiveChallenge: 'Perspective Challenge',
    perspectivePrompt: 'Consider the opposite. What would someone with a completely different perspective say?',
    yourEssenceBloom: 'Your essence bloom',
    humanityIndex: 'Your Humanity Index',
    humanityMirror: "Not points — a mirror of who you're becoming",
    torchbearer: 'Torchbearer',
    createEssence: 'Create your essence',
    welcomeBack: 'Welcome back',
    antiScroll: 'Your most interesting thought today is still waiting outside this screen.',
  },
  es: {
    tagline: 'Ve con claridad. Siente profundamente. Conéctate de verdad.',
    begin: 'COMIENZA TU VIAJE',
    signIn: '¿Ya tienes una esencia? Inicia sesión',
    todaySpark: 'Chispa de hoy',
    acceptSpark: 'Aceptar esta Chispa',
    sparkAccepted: 'Chispa aceptada — ve a vivirla',
    imBack: 'Volví — compartir mi experiencia',
    whatExperience: '¿Qué experimentaste?',
    dontDescribe: 'No describas lo que pasó — describe cómo se sintió.',
    perspectiveChallenge: 'Desafío de Perspectiva',
    humanityIndex: 'Tu Índice de Humanidad',
    torchbearer: 'Portador de la Antorcha',
    antiScroll: 'Tu pensamiento más interesante de hoy todavía te espera fuera de esta pantalla.',
  },
  it: {
    tagline: 'Vedi con chiarezza. Senti profondamente. Connettiti davvero.',
    begin: 'INIZIA IL TUO VIAGGIO',
    signIn: "Hai già un'essenza? Accedi",
    todaySpark: 'Scintilla di oggi',
    acceptSpark: 'Accetta questa Scintilla',
    sparkAccepted: 'Scintilla accettata — vai a viverla',
    imBack: 'Sono tornato — condividi la mia esperienza',
    whatExperience: 'Cosa hai vissuto?',
    dontDescribe: 'Non descrivere cosa è successo — descrivi come ti ha fatto sentire.',
    perspectiveChallenge: 'Sfida di Prospettiva',
    humanityIndex: "Il tuo Indice di Umanità",
    torchbearer: 'Portatore di Luce',
    antiScroll: 'Il tuo pensiero più interessante di oggi ti sta ancora aspettando fuori da questo schermo.',
  },
  fr: {
    tagline: 'Voir clairement. Ressentir profondément. Se connecter vraiment.',
    begin: 'COMMENCEZ VOTRE VOYAGE',
    signIn: 'Vous avez déjà une essence? Connectez-vous',
    todaySpark: 'Étincelle du jour',
    perspectiveChallenge: 'Défi de Perspective',
    humanityIndex: "Votre Indice d'Humanité",
    torchbearer: 'Porteur de Flamme',
    antiScroll: 'Votre pensée la plus intéressante vous attend encore dehors.',
  },
}

export function t(key: string, lang: string = 'en'): string {
  return (translations[lang] || {})[key]
    || translations.en[key]
    || key
}

export function detectLanguage(): LangCode {
  if (typeof navigator === 'undefined') return 'en'
  const raw = (navigator.language || 'en').split('-')[0].toLowerCase()
  const supported = LANGUAGES.map(l => l.code) as string[]
  return (supported.includes(raw) ? raw : 'en') as LangCode
}
