import React from "react";
import { translate as i18t, SUPPORTED_LANGUAGES, SUPPORTED_CODES } from "../i18n/index.js";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Eye, Flame, Brain, Heart, Users, BookOpen, ArrowRight, ArrowLeft,
  Sparkles, Lock, MessageCircle, Star, Zap, Sun, Moon, Mountain,
  Compass, Shield, X, Check, ChevronRight, Target, Feather,
  Lightbulb, Globe, Pen, TrendingUp, Award, Layers, Orbit, Send, Scale,
  Camera, Mail, KeyRound, User, CircleDot, Fingerprint, Waves,
  Search, Edit3, Plus, AlertTriangle, Bell
} from "lucide-react";

// Aliases for icons not in lucide-react@0.383.0
const Glasses = Eye;
const HandHeart = Heart;
const MessageSquareHeart = MessageCircle;
const Flower2 = Sparkles;
const Ripple = Waves;

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════════════ */
const C = {
  void:"#06060E", deep:"#0A0A16", abyss:"#0E0E1E", surface:"#141428",
  panel:"#1A1A34", hover:"#20203E", ghost:"#2A2A4A",
  intelligence:"#5B8DEF", understanding:"#4AE8C4", communication:"#E8A838",
  appreciation:"#C45EDB",
  ember:"#F0A830", kindle:"#E87840", warmth:"#E85D75", glow:"#F0A83033",
  light:"#EDE6D6", mid:"#9A95AE", dim:"#5E587A",
  witnessed:"#6B7DB3", stirred:"#E8A838", illuminated:"#4AE8C4", rippled:"#C45EDB",
};

/* ═══════════════════════════════════════════════════════════════
   i18n — MULTI-LANGUAGE SYSTEM
   ═══════════════════════════════════════════════════════════════ */
const LANGUAGES = SUPPORTED_LANGUAGES;

const TRANSLATIONS = {
  en: {
    tagline:"The Digital Human Social Platform // Expressing True Emotions",
    landingBody:"No scroll. You go deeper — into experiences, emotions, and the people who feel what you feel.",
    begin:"BEGIN YOUR JOURNEY",
    signIn:"Already have an essence? Sign in",
    todaySpark:"Today's Spark",
    acceptSpark:"Accept this Spark",
    sparkAccepted:"Spark accepted — go live it",
    imBack:"I'm back — share my experience",
    whatExperience:"What did you experience?",
    dontDescribe:"Don't describe what happened — describe what it felt like.",
    whatEmotions:"What emotions surfaced?",
    addPhoto:"Add a photo from this experience",
    tapPhoto:"Tap to add a photo",
    shareReflection:"Share this reflection",
    moreWords:"more words for depth",
    chooseEmotion:"Choose at least one emotion",
    reflectionShared:"Reflection shared",
    reflectionSharedBody:"Your experience is now part of the tapestry. Others with similar feelings will find their way to your words.",
    nextSpark:"See next spark",
    perspectiveChallenge:"Perspective Challenge",
    perspectivePrompt:"Consider the opposite. What would someone with a completely different perspective say? What might they be right about?",
    perspectivePlaceholder:"Someone else might see this differently because...",
    goDeeper:"Go deeper — genuine critical thinking requires sitting with discomfort",
    buildsCritical:"This builds your Critical Thinking in your Humanity Index",
    yourEssenceBloom:"Your essence bloom",
    tapQuality:"Tap any quality to explore its depth",
    qualitiesWithin:"The qualities within you",
    humanityIndex:"Your Humanity Index",
    humanityMirror:"Not points — a mirror of who you're becoming",
    yourJourney:"Your journey so far",
    theirEssence:"Their essence",
    howTheyConnect:"How they connect",
    connectionPaths:"Connection paths",
    goDeep:"Go deeper",
    back:"Back",
    surface:"Surface",
    current:"Current",
    connections:"Connections",
    essence:"Essence",
    spark:"Spark",
    depth:"Depth",
    dna:"DNA",
    witnessed:"Witnessed",
    stirred:"Stirred",
    illuminated:"Illuminated",
    rippled:"Rippled",
    illuminate:"Illuminate — go deeper than stirred",
    choosePathPrompt:"Choose the path of connection and tell them why.",
    stirredMe:"This stirred me",
    othersWhoSaw:"Others who saw this clearly",
    connectionDNA:"Connection DNA",
    dnaDesc:"Your bright helix at center. Others weave through you. Glowing nodes mark where your experiences align.",
    emerging:"Emerging",
    growing:"Growing",
    flourishing:"Flourishing",
    whatShaped:"What shaped this",
    torchbearer:"Torchbearer",
    gentle:"Gentle",
    stretch:"Stretch",
    deepReach:"Deep reach",
    createEssence:"Create your essence",
    welcomeBack:"Welcome back",
    essenceName:"Essence name",
    community:"Community soul contract",
    enterLucid:"Enter LUCID",
    presence:"Your presence",
    whatMatters:"What matters to you?",
    openingLine:"Your opening line",
    antiScroll:"Your most interesting thought today is still waiting outside this screen.",
  },
  es: {
    tagline:"La Plataforma Social Humana Digital // Expresando Emociones Reales",
    landingBody:"Sin scroll. Vas más profundo — en experiencias, emociones y las personas que sienten lo que tú sientes.",
    begin:"COMIENZA TU VIAJE",
    signIn:"¿Ya tienes una esencia? Inicia sesión",
    todaySpark:"Chispa de hoy",
    acceptSpark:"Aceptar esta Chispa",
    sparkAccepted:"Chispa aceptada — ve a vivirla",
    imBack:"Volví — compartir mi experiencia",
    whatExperience:"¿Qué experimentaste?",
    dontDescribe:"No describas lo que pasó — describe cómo se sintió.",
    whatEmotions:"¿Qué emociones surgieron?",
    addPhoto:"Agrega una foto de esta experiencia",
    tapPhoto:"Toca para agregar una foto",
    shareReflection:"Compartir esta reflexión",
    moreWords:"palabras más para profundidad",
    chooseEmotion:"Elige al menos una emoción",
    reflectionShared:"Reflexión compartida",
    reflectionSharedBody:"Tu experiencia ahora es parte del tapiz. Otros con sentimientos similares encontrarán tu camino.",
    nextSpark:"Ver siguiente chispa",
    perspectiveChallenge:"Desafío de Perspectiva",
    perspectivePrompt:"Considera lo opuesto. ¿Qué diría alguien con una perspectiva completamente diferente?",
    perspectivePlaceholder:"Alguien más podría ver esto diferente porque...",
    yourEssenceBloom:"Tu flor de esencia",
    tapQuality:"Toca cualquier cualidad para explorar",
    qualitiesWithin:"Las cualidades dentro de ti",
    humanityIndex:"Tu Índice de Humanidad",
    humanityMirror:"No son puntos — es un espejo de quien te estás convirtiendo",
    yourJourney:"Tu viaje hasta ahora",
    theirEssence:"Su esencia",
    howTheyConnect:"Cómo se conectan",
    connectionPaths:"Caminos de conexión",
    goDeep:"Ir más profundo",
    back:"Atrás",
    surface:"Superficie", current:"Corriente", connections:"Conexiones", essence:"Esencia",
    spark:"Chispa", depth:"Profundidad", dna:"ADN",
    witnessed:"Presenciado", stirred:"Conmovido", illuminated:"Iluminado", rippled:"Expandido",
    illuminate:"Ilumina — ve más profundo",
    stirredMe:"Esto me conmovió",
    othersWhoSaw:"Otros que vieron claramente",
    emerging:"Emergiendo", growing:"Creciendo", flourishing:"Floreciendo",
    torchbearer:"Portador de la Antorcha",
    createEssence:"Crea tu esencia", welcomeBack:"Bienvenido de vuelta",
    antiScroll:"Tu pensamiento más interesante de hoy todavía te espera fuera de esta pantalla.",
  },
  it: {
    tagline:"La Piattaforma Social Umana Digitale // Esprimere Emozioni Vere",
    landingBody:"Nessuno scroll. Vai in profondità — nelle esperienze, nelle emozioni e nelle persone che sentono ciò che senti tu.",
    begin:"INIZIA IL TUO VIAGGIO",
    signIn:"Hai già un'essenza? Accedi",
    todaySpark:"Scintilla di oggi",
    acceptSpark:"Accetta questa Scintilla",
    sparkAccepted:"Scintilla accettata — vai a viverla",
    imBack:"Sono tornato — condividi la mia esperienza",
    whatExperience:"Cosa hai vissuto?",
    dontDescribe:"Non descrivere cosa è successo — descrivi come ti ha fatto sentire.",
    whatEmotions:"Quali emozioni sono emerse?",
    addPhoto:"Aggiungi una foto di questa esperienza",
    tapPhoto:"Tocca per aggiungere una foto",
    shareReflection:"Condividi questa riflessione",
    moreWords:"parole in più per la profondità",
    chooseEmotion:"Scegli almeno un'emozione",
    reflectionShared:"Riflessione condivisa",
    reflectionSharedBody:"La tua esperienza fa ora parte dell'arazzo. Altri con sentimenti simili troveranno le tue parole.",
    nextSpark:"Vedi prossima scintilla",
    perspectiveChallenge:"Sfida di Prospettiva",
    perspectivePrompt:"Considera l'opposto. Cosa direbbe qualcuno con una prospettiva completamente diversa?",
    perspectivePlaceholder:"Qualcun altro potrebbe vedere questo diversamente perché...",
    yourEssenceBloom:"Il tuo fiore dell'essenza",
    tapQuality:"Tocca qualsiasi qualità per esplorarne la profondità",
    qualitiesWithin:"Le qualità dentro di te",
    humanityIndex:"Il tuo Indice di Umanità",
    humanityMirror:"Non sono punti — è uno specchio di chi stai diventando",
    yourJourney:"Il tuo viaggio finora",
    theirEssence:"La loro essenza",
    howTheyConnect:"Come si connettono",
    connectionPaths:"Percorsi di connessione",
    goDeep:"Vai più in profondità",
    back:"Indietro",
    surface:"Superficie", current:"Corrente", connections:"Connessioni", essence:"Essenza",
    spark:"Scintilla", depth:"Profondità", dna:"DNA",
    witnessed:"Testimoniato", stirred:"Commosso", illuminated:"Illuminato", rippled:"Espanso",
    illuminate:"Illumina — vai più in profondità",
    stirredMe:"Questo mi ha commosso",
    othersWhoSaw:"Altri che hanno visto chiaramente",
    emerging:"Emergente", growing:"In crescita", flourishing:"In fiore",
    torchbearer:"Portatore di Luce",
    createEssence:"Crea la tua essenza", welcomeBack:"Bentornato",
    goDeeper:"Vai più a fondo",
    buildsCritical:"Costruisce il pensiero critico",
    choosePathPrompt:"Scegli un percorso da esplorare",
    connectionDNA:"DNA di Connessione",
    dnaDesc:"Trascina per ruotare · Tocca i nodi per esplorare",
    whatShaped:"Cosa ti ha formato",
    gentle:"Gentile",
    stretch:"Sfida",
    deepReach:"Portata profonda",
    essenceName:"Nome essenza",
    community:"Comunità",
    enterLucid:"Entra in LUCID",
    presence:"La tua presenza",
    whatMatters:"Cosa conta per te?",
    openingLine:"La tua prima riga",
        antiScroll:"Il tuo pensiero più interessante di oggi ti sta ancora aspettando fuori da questo schermo.",
  },
  fr: {
    tagline:"La Plateforme Sociale Humaine Digitale // Exprimer des Émotions Vraies",
    landingBody:"Pas de scroll. Vous allez plus profond — dans les expériences, les émotions et les personnes qui ressentent ce que vous ressentez.",
    begin:"COMMENCEZ VOTRE VOYAGE",
    signIn:"Vous avez déjà une essence? Connectez-vous",
    todaySpark:"Étincelle du jour",
    acceptSpark:"Accepter cette Étincelle",
    sparkAccepted:"Étincelle acceptée — allez la vivre",
    imBack:"Je suis de retour — partager mon expérience",
    whatExperience:"Qu'avez-vous vécu?",
    dontDescribe:"Ne décrivez pas ce qui s'est passé — décrivez ce que vous avez ressenti.",
    whatEmotions:"Quelles émotions ont émergé?",
    addPhoto:"Ajoutez une photo de cette expérience",
    tapPhoto:"Touchez pour ajouter une photo",
    shareReflection:"Partager cette réflexion",
    moreWords:"mots de plus pour la profondeur",
    perspectiveChallenge:"Défi de Perspective",
    yourEssenceBloom:"Votre fleur d'essence",
    humanityIndex:"Votre Indice d'Humanité",
    humanityMirror:"Pas des points — un miroir de qui vous devenez",
    yourJourney:"Votre parcours jusqu'ici",
    theirEssence:"Leur essence",
    goDeep:"Aller plus profond", back:"Retour",
    surface:"Surface", current:"Courant", connections:"Connexions", essence:"Essence",
    spark:"Étincelle", depth:"Profondeur", dna:"ADN",
    torchbearer:"Porteur de Flamme",
    createEssence:"Créez votre essence", welcomeBack:"Bienvenue",
    antiScroll:"Votre pensée la plus intéressante vous attend encore dehors.",
  },
  pt:{tagline:"A Plataforma Social Humana Digital // Expressando Emoções Reais",begin:"COMECE SUA JORNADA",todaySpark:"Fagulha de hoje",spark:"Fagulha",depth:"Profundidade",dna:"DNA",essence:"Essência",back:"Voltar",goDeep:"Ir mais fundo",humanityIndex:"Seu Índice de Humanidade",torchbearer:"Portador da Tocha",createEssence:"Crie sua essência",antiScroll:"Seu pensamento mais interessante ainda está te esperando lá fora."},
  de:{tagline:"Die Digitale Menschliche Soziale Plattform // Wahre Emotionen Ausdrücken",begin:"BEGINNE DEINE REISE",todaySpark:"Heutiger Funke",spark:"Funke",depth:"Tiefe",dna:"DNS",essence:"Essenz",back:"Zurück",goDeep:"Tiefer gehen",humanityIndex:"Dein Menschlichkeitsindex",torchbearer:"Fackelträger",createEssence:"Erstelle deine Essenz",antiScroll:"Dein interessantester Gedanke wartet noch draußen."},
  ar:{tagline:"المنصة الاجتماعية الإنسانية الرقمية // التعبير عن المشاعر الحقيقية",begin:"ابدأ رحلتك",todaySpark:"شرارة اليوم",spark:"شرارة",depth:"عمق",essence:"جوهر",back:"رجوع",goDeep:"اذهب أعمق",humanityIndex:"مؤشر إنسانيتك",torchbearer:"حامل المشعل",createEssence:"أنشئ جوهرك"},
  zh:{tagline:"数字化人类社交平台 // 表达真实情感",begin:"开始你的旅程",todaySpark:"今日火花",spark:"火花",depth:"深度",essence:"本质",back:"返回",goDeep:"深入探索",humanityIndex:"你的人性指数",torchbearer:"火炬手",createEssence:"创建你的本质"},
  ja:{tagline:"デジタル・ヒューマン・ソーシャルプラットフォーム // 本当の感情を表現する",begin:"旅を始める",todaySpark:"今日のスパーク",spark:"スパーク",depth:"深さ",essence:"本質",back:"戻る",goDeep:"より深く",humanityIndex:"ヒューマニティインデックス",torchbearer:"トーチベアラー",createEssence:"エッセンスを作成"},
};

// Translation helper — falls back to English
const t = (key, lang) => i18t(key, lang) || (TRANSLATIONS[lang]||{})[key] || TRANSLATIONS.en[key] || key;

/* Profile photo generator — gives each person a unique, consistent visual identity */
const PROFILE_PHOTOS = {
  meridian: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  solace: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  kindling: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
  northlight: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
};

const SPECTRUMS = [
  { key:"intelligence",  label:"Intelligence",  color:C.intelligence, icon:Glasses,           desc:"Made me think differently" },
  { key:"understanding", label:"Understanding", color:C.understanding,icon:HandHeart,         desc:"Made me feel understood" },
  { key:"communication", label:"Communication", color:C.communication,icon:MessageSquareHeart,desc:"Expressed what I couldn't" },
  { key:"appreciation",  label:"Appreciation",  color:C.appreciation, icon:Flower2,           desc:"Opened my eyes to simplicity" },
];

// ── Reward tiers (pyramid: many witness, few ripple) ──
const REWARDS = [
  { key:"witnessed",   label:"Witnessed",   icon:Eye,       color:C.witnessed,   lp:1,  desc:"Someone read your reflection fully" },
  { key:"stirred",     label:"Stirred",     icon:Ripple,    color:C.stirred,     lp:5,  desc:"It moved something in them" },
  { key:"illuminated", label:"Illuminated", icon:Sparkles,  color:C.illuminated, lp:15, desc:"They wrote why it resonated" },
  { key:"rippled",     label:"Rippled",     icon:Orbit,     color:C.rippled,     lp:30, desc:"It inspired a new reflection" },
];

const TIERS = [
  { name:"Ember",min:0,color:C.kindle,desc:"Every flame starts with a spark." },
  { name:"Flame",min:100,color:C.ember,desc:"Your reflections are catching light." },
  { name:"Beacon",min:350,color:C.intelligence,desc:"Others find their way by your light." },
  { name:"Luminary",min:700,color:C.appreciation,desc:"Touching hearts, shifting perspectives." },
  { name:"Aurora",min:1200,color:C.understanding,desc:"A transformative presence." },
];
const getTier=(p)=>{for(let i=TIERS.length-1;i>=0;i--)if(p>=TIERS[i].min)return TIERS[i];return TIERS[0]};

/* ── Content moderation + Safety + Ban system ─────────────── */
const BLOCKED_PATTERNS = /\b(fuck|shit|damn|ass|bitch|bastard|crap|dick|pussy|cock|slut|whore|kill|murder|hate\s+you|die|suicide|nude|naked|sex|porn|rape|drug|racist|nazi|terrorist|bomb|weapon|gun|knife|send\s+nudes|onlyfans)\b/gi;
const DANGEROUS_SPARK_PATTERNS = /\b(jump\s+off|cliff|pills|overdose|starve|hold\s+breath|bleach|choke|suffocate|steal|shoplift|break\s+in|hack|stalk|follow\s+home|fight\s+someone|dare\s+to\s+die)\b/gi;
const NUDITY_PATTERNS = /\b(nude|naked|topless|strip|undress|body\s+pic|send\s+pic|intimate\s+photo|sexual|underwear\s+pic|lingerie|onlyfans|xxx)\b/gi;

const GUIDELINES = [
  "Express emotions with depth and authenticity",
  "No profanity, offensive language, or harmful content",
  "No nudity, violence, or sexually suggestive content",
  "No dangerous or harmful challenges in Sparks",
  "Respect every person's experience and perspective",
  "Nudity or sexual content = permanent ban",
  "Share from the soul — genuine human connection only",
];

function moderateContent(text) {
  if (!text) return { safe:true, text:text };
  // Nudity/sexual → ban
  const nudityFound = text.match(NUDITY_PATTERNS);
  if (nudityFound) return { safe:false, text:text, severity:"ban",
    message:"Account violation. Sharing nudity or sexual content results in permanent ban. LUCID is a space for soul-level connection." };
  // Dangerous → restrict
  const dangerFound = text.match(DANGEROUS_SPARK_PATTERNS);
  if (dangerFound) return { safe:false, text:text, severity:"restrict",
    message:"Dangerous content blocked. Sparks must be safe, constructive challenges — never put anyone at risk." };
  // Profanity → warn
  const found = text.match(BLOCKED_PATTERNS);
  if (found) return { safe:false, text:text, severity:"warn",
    message:"This language doesn't align with LUCID's community. Express your feelings with depth, not friction." };
  return { safe:true, text:text };
}

/* ── People data ───────────────────────────────────────────── */
const PEOPLE = {
  meridian: {
    id:"meridian",name:"Meridian",photo:PROFILE_PHOTOS.meridian,
    bio:"I chase the edge of what I know.",
    evolvedBio:"Three months ago I could barely sit still. LUCID taught me discomfort is a compass. I've talked to 47 strangers and every one changed me. I'm becoming someone I couldn't have designed but somehow always was.",
    values:["Curiosity","Courage","Authenticity"],essencePoints:520,
    topEmotions:["Wonder","Courage","Clarity"],reflCount:34,connections:18,depthReach:89,
    soulprint:[72,85,45,90,60,78,55,88],
    spectrum:{intelligence:72,understanding:65,communication:88,appreciation:80},
    rewards:{witnessed:892,stirred:234,illuminated:47,rippled:12},
    torchbearer:false,
    humanityIndex:{depth:72,empathy:65,criticalThinking:78,impact:60,consistency:82},
    journey:[
      {month:"Feb",milestone:"First reflection",type:"start",emotion:"Curiosity"},
      {month:"Mar",milestone:"Completed 10 silence sparks",type:"growth",emotion:"Clarity"},
      {month:"Apr",milestone:"First deep disagreement conversation",type:"breakthrough",emotion:"Courage"},
      {month:"May",milestone:"Connected with Solace through shared vulnerability",type:"connection",personId:"solace"},
      {month:"Jun",milestone:"Reflection on grief and gardens rippled 8 times",type:"impact",emotion:"Wonder"},
      {month:"Jul",milestone:"Reached Beacon tier",type:"tier",emotion:"Gratitude"},
    ],
  },
  solace: {
    id:"solace",name:"Solace",photo:PROFILE_PHOTOS.solace,
    bio:"Recovering overthinker. Learning to feel before I analyze.",
    evolvedBio:"I used to live entirely in my head. This platform introduced me to my own heartbeat during my first silence challenge. The connection here isn't social media — it's the kind you feel when a stranger's words make you cry because they described something you couldn't.",
    values:["Presence","Vulnerability","Growth"],essencePoints:780,
    topEmotions:["Vulnerability","Clarity","Serenity"],reflCount:52,connections:31,depthReach:94,
    soulprint:[45,92,88,60,75,95,82,70],
    spectrum:{intelligence:85,understanding:92,communication:68,appreciation:78},
    rewards:{witnessed:1420,stirred:389,illuminated:63,rippled:19},
    torchbearer:false,
    humanityIndex:{depth:88,empathy:92,criticalThinking:75,impact:70,consistency:85},
    journey:[
      {month:"Jan",milestone:"Joined LUCID — couldn't sit still for 5 minutes",type:"start",emotion:"Tension"},
      {month:"Feb",milestone:"First silence spark — heard own heartbeat",type:"breakthrough",emotion:"Clarity"},
      {month:"Mar",milestone:"Wrote 'performing busyness as a costume' — 63 illuminations",type:"impact",emotion:"Vulnerability"},
      {month:"Apr",milestone:"Formed Kindred bond with Kindling",type:"connection",personId:"kindling"},
      {month:"May",milestone:"Started reflecting on feelings before thoughts",type:"growth",emotion:"Serenity"},
      {month:"Jun",milestone:"Reached Luminary tier",type:"tier",emotion:"Gratitude"},
      {month:"Jul",milestone:"3 people said Solace changed how they process grief",type:"impact",emotion:"Empathy"},
    ],
  },
  kindling: {
    id:"kindling",name:"Kindling",photo:PROFILE_PHOTOS.kindling,
    bio:"Builder, listener, occasional poet. I believe in bridges.",
    evolvedBio:"Every hard conversation built a bridge I didn't know I needed. I talked to my neighbor about politics — terrifying. Found fear underneath his positions, same fear I carry, aimed differently. Connection doesn't require agreement. It requires seeing.",
    values:["Empathy","Justice","Connection"],essencePoints:920,
    topEmotions:["Empathy","Hope","Determination"],reflCount:61,connections:42,depthReach:97,
    soulprint:[88,70,55,95,82,65,90,78],
    spectrum:{intelligence:78,understanding:95,communication:82,appreciation:70},
    rewards:{witnessed:2180,stirred:567,illuminated:82,rippled:28},
    torchbearer:true, torchReason:"12 independent people said Kindling changed how they approach disagreement.",
    humanityIndex:{depth:85,empathy:97,criticalThinking:90,impact:88,consistency:92},
    journey:[
      {month:"Dec",milestone:"Joined after quitting all social media",type:"start",emotion:"Hope"},
      {month:"Jan",milestone:"First disagreement spark — terrified",type:"growth",emotion:"Courage"},
      {month:"Feb",milestone:"Discovered fear underneath neighbor's political views",type:"breakthrough",emotion:"Empathy"},
      {month:"Mar",milestone:"Reflection on bridges became most-resonated that week",type:"impact",emotion:"Hope"},
      {month:"Apr",milestone:"Deep connection with Northlight through shared authenticity",type:"connection",personId:"northlight"},
      {month:"May",milestone:"Led first Witness Circle of 8 strangers",type:"growth",emotion:"Determination"},
      {month:"Jun",milestone:"12 people independently nominated Torchbearer",type:"torchbearer",emotion:"Humility"},
      {month:"Jul",milestone:"Reached Luminary — approaching Aurora",type:"tier",emotion:"Gratitude"},
    ],
  },
  northlight: {
    id:"northlight",name:"Northlight",photo:PROFILE_PHOTOS.northlight,
    bio:"Silence is my favorite language.",
    evolvedBio:"I joined LUCID because I was lonely but couldn't stand social media. What I found was people who write what they actually feel. My connections here are deeper than decade-long friendships. Not because we talk more, but because when we do, it's real.",
    values:["Authenticity","Wisdom","Presence"],essencePoints:1350,
    topEmotions:["Serenity","Awe","Reverence"],reflCount:89,connections:57,depthReach:99,
    soulprint:[90,88,92,78,95,85,80,93],
    spectrum:{intelligence:90,understanding:88,communication:75,appreciation:95},
    rewards:{witnessed:3540,stirred:890,illuminated:127,rippled:41},
    torchbearer:true, torchReason:"23 people said Northlight's reflections felt like reading their own unwritten thoughts.",
    humanityIndex:{depth:97,empathy:88,criticalThinking:92,impact:95,consistency:98},
    journey:[
      {month:"Sep",milestone:"Joined from loneliness — first honest words in years",type:"start",emotion:"Longing"},
      {month:"Oct",milestone:"10 straight days of reflection — found rhythm",type:"growth",emotion:"Peace"},
      {month:"Nov",milestone:"First Kindred bond — Meridian understood silence",type:"connection",personId:"meridian"},
      {month:"Dec",milestone:"Wrote about loneliness vs solitude — 41 ripples",type:"impact",emotion:"Clarity"},
      {month:"Jan",milestone:"Won Thought Arena on individualism and community",type:"breakthrough",emotion:"Wisdom"},
      {month:"Mar",milestone:"Reached Aurora — rarest tier",type:"tier",emotion:"Serenity"},
      {month:"May",milestone:"23 independent Torchbearer nominations",type:"torchbearer",emotion:"Awe"},
      {month:"Jul",milestone:"Most impactful voice in LUCID community",type:"impact",emotion:"Reverence"},
    ],
  },
  emberglow: {
    id:"emberglow",name:"Emberglow",photo:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    bio:"Former doom-scroller. Now I watch sunsets on purpose.",
    evolvedBio:"I deleted Instagram, TikTok, and Twitter on the same day. The silence was deafening for two weeks. Then I started hearing my own thoughts again. LUCID gave me a place to put them where they'd grow instead of drown in noise.",
    values:["Mindfulness","Gratitude","Simplicity"],essencePoints:380,
    topEmotions:["Serenity","Gratitude","Wonder"],reflCount:28,connections:15,depthReach:78,
    soulprint:[65,70,58,82,45,88,72,60],
    spectrum:{intelligence:65,understanding:78,communication:72,appreciation:88},
    rewards:{witnessed:640,stirred:178,illuminated:32,rippled:6},
    torchbearer:false,
    humanityIndex:{depth:68,empathy:78,criticalThinking:62,impact:55,consistency:75},
    journey:[
      {month:"Mar",milestone:"Deleted all social media in one afternoon",type:"start",emotion:"Courage"},
      {month:"Apr",milestone:"First sunset watched fully without phone",type:"breakthrough",emotion:"Serenity"},
      {month:"May",milestone:"Reached Beacon tier",type:"tier",emotion:"Gratitude"},
    ],
  },
  atlas: {
    id:"atlas",name:"Atlas",photo:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    bio:"17. Trying to figure out who I am before the algorithm decides for me.",
    evolvedBio:"Everyone my age performs a version of themselves online. LUCID is the first place I have written what I actually think instead of what gets likes. It is terrifying and addictive in the best way.",
    values:["Authenticity","Freedom","Courage"],essencePoints:210,
    topEmotions:["Courage","Curiosity","Tension"],reflCount:19,connections:12,depthReach:72,
    soulprint:[55,60,70,45,78,50,65,42],
    spectrum:{intelligence:70,understanding:55,communication:65,appreciation:60},
    rewards:{witnessed:380,stirred:95,illuminated:18,rippled:3},
    torchbearer:false,
    humanityIndex:{depth:55,empathy:60,criticalThinking:70,impact:42,consistency:58},
    journey:[
      {month:"May",milestone:"Joined after a friend showed me a reflection",type:"start",emotion:"Curiosity"},
      {month:"Jun",milestone:"Wrote about performative identity online",type:"breakthrough",emotion:"Courage"},
    ],
  },
  wren: {
    id:"wren",name:"Wren",photo:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    bio:"Nurse. I hold other people's pain all day. Here I set mine down.",
    evolvedBio:"Twelve-hour shifts, other peoples emergencies, going home empty. LUCID became the place I finally processed my own feelings instead of just managing everyone elses.",
    values:["Compassion","Resilience","Honesty"],essencePoints:650,
    topEmotions:["Empathy","Exhaustion","Hope"],reflCount:43,connections:27,depthReach:91,
    soulprint:[58,95,48,72,85,92,78,55],
    spectrum:{intelligence:68,understanding:95,communication:78,appreciation:72},
    rewards:{witnessed:1180,stirred:312,illuminated:55,rippled:15},
    torchbearer:false,
    humanityIndex:{depth:78,empathy:95,criticalThinking:65,impact:72,consistency:88},
    journey:[
      {month:"Feb",milestone:"Joined after a particularly hard shift",type:"start",emotion:"Exhaustion"},
      {month:"Mar",milestone:"First reflection about compassion fatigue",type:"impact",emotion:"Vulnerability"},
      {month:"Jul",milestone:"Approaching Luminary tier",type:"tier",emotion:"Hope"},
    ],
  },
  quietstorm: {
    id:"quietstorm",name:"Quietstorm",photo:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    bio:"Ex-Marine. Learning that strength includes softness.",
    evolvedBio:"Twenty years of being told emotions are weakness. LUCID is where I practice being human without armor. Every reflection here costs me something and gives me something better back.",
    values:["Courage","Honesty","Growth"],essencePoints:440,
    topEmotions:["Courage","Vulnerability","Determination"],reflCount:31,connections:20,depthReach:85,
    soulprint:[82,55,75,60,95,48,88,65],
    spectrum:{intelligence:75,understanding:68,communication:60,appreciation:82},
    rewards:{witnessed:820,stirred:215,illuminated:38,rippled:9},
    torchbearer:false,
    humanityIndex:{depth:75,empathy:62,criticalThinking:78,impact:68,consistency:80},
    journey:[
      {month:"Jan",milestone:"Joined anonymously at first",type:"start",emotion:"Tension"},
      {month:"Mar",milestone:"Wrote about crying for the first time in 15 years",type:"breakthrough",emotion:"Vulnerability"},
      {month:"Jul",milestone:"Stopped hiding behind anonymity",type:"growth",emotion:"Courage"},
    ],
  },
};

const REFLECTIONS = [
  {
    id:"r1",authorId:"meridian",spark:"Walk somewhere new within 1km",
    photo:"https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=300&fit=crop",
    text:"I found a tiny garden between two buildings I've walked past a thousand times. An old man watering roses. We talked for ten minutes about grief and gardens. He said grief needs somewhere to grow into something beautiful. I've been sitting with that sentence like a lit match I'm afraid to put down.",
    emotions:["Wonder","Gratitude","Melancholy"],depthScore:94,
    rewards:{witnessed:342,stirred:89,illuminated:47,rippled:8},
    connections:[
      {toId:"r2",sharedPhrase:"sitting with what we cannot answer",spectrum:"understanding",strength:82},
      {toId:"r3",sharedPhrase:"seeing humanity in unfamiliar faces",spectrum:"appreciation",strength:91},
    ],
    illuminations:[
      {userId:"solace",spectrum:"appreciation",text:"The image of grief growing into roses broke something open in me. I've been treating my grief like something to fix, not something to plant."},
      {userId:"northlight",spectrum:"communication",text:"That sentence about the lit match — that's exactly how the best truths feel. Too bright to hold, too important to drop."},
    ],
  },
  {
    id:"r2",authorId:"solace",spark:"15 minutes of complete silence",
    photo:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop",
    text:"My brain kept reaching for my phone like a phantom limb. Around minute eight, something shifted. I noticed my own heartbeat. Then rain I hadn't registered. Then a thought that surprised me: I've been performing busyness as a costume for avoiding the question of what I actually want. I still don't have the answer. But I think the question itself is the garden.",
    emotions:["Vulnerability","Clarity","Courage"],depthScore:91,
    rewards:{witnessed:518,stirred:142,illuminated:63,rippled:14},
    connections:[
      {toId:"r1",sharedPhrase:"allowing questions without forcing answers",spectrum:"intelligence",strength:82},
      {toId:"r3",sharedPhrase:"discovering what hides beneath performance",spectrum:"understanding",strength:76},
    ],
    illuminations:[
      {userId:"kindling",spectrum:"intelligence",text:"'Performing busyness as a costume' — I've never seen my own avoidance described so precisely. This is a mirror I didn't ask for but needed."},
      {userId:"meridian",spectrum:"communication",text:"The phantom limb metaphor for phone addiction is devastating because it's true. We've amputated presence and feel the ghost constantly."},
    ],
  },
  {
    id:"r3",authorId:"kindling",spark:"Genuine conversation with someone you disagree with",
    photo:"https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=300&fit=crop",
    text:"My neighbor and I disagree about everything political. But I listened the way the Spark asked — more than I spoke. Underneath his positions I heard fear. Not ignorance. Not malice. Fear for his children, same fear I carry, channeled through a different lens. We didn't change each other's minds. We changed how we see each other. I think that matters more.",
    emotions:["Empathy","Humility","Hope"],depthScore:97,
    rewards:{witnessed:784,stirred:231,illuminated:82,rippled:22},
    connections:[
      {toId:"r1",sharedPhrase:"finding beauty where you expected nothing",spectrum:"appreciation",strength:91},
      {toId:"r2",sharedPhrase:"listening past the performance",spectrum:"understanding",strength:86},
    ],
    illuminations:[
      {userId:"northlight",spectrum:"understanding",text:"'We changed how we see each other' — this is the actual work of peace. Not agreement but recognition."},
      {userId:"solace",spectrum:"intelligence",text:"The insight that fear, not malice, drives most division is something I needed today. I've been angry at people I should be understanding."},
    ],
  },
  {
    id:"r4",authorId:"wren",spark:"Tell someone what they mean to you",
    photo:"https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600&h=300&fit=crop",
    text:"I told my patient\'s daughter she was the bravest person I had seen all year. She was just sitting there, holding her mother\'s hand through chemo, singing softly. She started crying. I started crying. Two strangers sharing something social media will never understand because it cannot be performed.",
    emotions:["Empathy","Gratitude","Vulnerability"],depthScore:96,
    rewards:{witnessed:623,stirred:198,illuminated:52,rippled:11},
    connections:[
      {toId:"r1",sharedPhrase:"beauty found in unexpected moments",spectrum:"appreciation",strength:88},
      {toId:"r3",sharedPhrase:"connection beyond words",spectrum:"understanding",strength:85},
    ],
    illuminations:[
      {userId:"kindling",spectrum:"appreciation",text:"This is what connection actually looks like. Not curated, not performed. Just two humans seeing each other."},
      {userId:"solace",spectrum:"understanding",text:"Social media cannot understand because it cannot be performed. That sentence changed how I think about what is real."},
    ],
  },
  {
    id:"r5",authorId:"quietstorm",spark:"Write down what you are afraid of",
    photo:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=300&fit=crop",
    text:"I am afraid of silence because in silence I hear the version of myself I buried under twenty years of discipline. He is softer than I expected. He writes poetry. He cries at movies. He has been waiting patiently for me to stop running. Today I sat with him for fifteen minutes. Tomorrow maybe twenty.",
    emotions:["Courage","Vulnerability","Hope"],depthScore:95,
    rewards:{witnessed:547,stirred:176,illuminated:41,rippled:8},
    connections:[
      {toId:"r2",sharedPhrase:"what we discover in stillness",spectrum:"intelligence",strength:80},
      {toId:"r3",sharedPhrase:"fear as a door not a wall",spectrum:"understanding",strength:87},
    ],
    illuminations:[
      {userId:"northlight",spectrum:"understanding",text:"He has been waiting patiently. That line undid me. We all have a buried self waiting."},
      {userId:"meridian",spectrum:"appreciation",text:"An ex-Marine writing about softness underneath strength. This is what courage actually looks like."},
    ],
  },
  {
    id:"r6",authorId:"emberglow",spark:"Watch a sunrise or sunset with full attention",
    photo:"https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=600&h=300&fit=crop",
    text:"I watched a sunset for 47 minutes without touching my phone. At minute twelve I wanted to photograph it. At minute twenty I wanted to tweet something clever. At minute thirty I stopped wanting to share it and just had it. By minute forty I was crying and I still do not fully understand why. Maybe that is the point.",
    emotions:["Wonder","Serenity","Gratitude"],depthScore:90,
    rewards:{witnessed:412,stirred:134,illuminated:28,rippled:5},
    connections:[
      {toId:"r2",sharedPhrase:"what happens when we stop reaching for the phone",spectrum:"intelligence",strength:92},
      {toId:"r1",sharedPhrase:"beauty that does not need to be captured",spectrum:"appreciation",strength:79},
    ],
    illuminations:[
      {userId:"atlas",spectrum:"communication",text:"Stopped wanting to share it and just had it. I have never experienced that. I want to."},
      {userId:"wren",spectrum:"understanding",text:"Maybe not understanding is the whole gift. I needed this today."},
    ],
  },
  {
    id:"r7",authorId:"atlas",spark:"Write one honest thing you have never said online",
    photo:"https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=300&fit=crop",
    text:"I have 2,400 followers and zero people who know I cry myself to sleep sometimes. Every post is a performance. Every story is a highlight reel. I am seventeen and already exhausted by my own brand. This is the first thing I have written online that I did not calculate first. It feels like jumping off a cliff and finding wings.",
    emotions:["Courage","Vulnerability","Relief"],depthScore:93,
    rewards:{witnessed:489,stirred:156,illuminated:35,rippled:7},
    connections:[
      {toId:"r5",sharedPhrase:"the cost of wearing armor",spectrum:"understanding",strength:84},
      {toId:"r2",sharedPhrase:"performing vs being",spectrum:"intelligence",strength:90},
    ],
    illuminations:[
      {userId:"emberglow",spectrum:"understanding",text:"Seventeen and already exhausted by your own brand. This generation deserves better than what we built for them."},
      {userId:"quietstorm",spectrum:"appreciation",text:"Finding wings. From someone who jumped off his own cliff at 40. You are braver at 17 than I was for decades."},
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   GLOBAL STYLES
   ═══════════════════════════════════════════════════════════════ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}body{background:${C.void};overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}
textarea::placeholder,input::placeholder{color:${C.dim}}input:focus,textarea:focus{outline:none}
button{font-family:inherit;border:none;background:none;cursor:pointer}
select{font-family:inherit}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${C.ghost};border-radius:2px}
@keyframes breathe{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.04)}}
@keyframes pulseGlow{0%,100%{box-shadow:0 0 20px ${C.glow}}50%{box-shadow:0 0 50px ${C.glow}}}
@keyframes depthIn{from{opacity:0;transform:scale(.93) translateY(16px);filter:blur(4px)}to{opacity:1;transform:scale(1) translateY(0);filter:blur(0)}}
@keyframes riseUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes rippleOut{0%{transform:scale(.8);opacity:.8}100%{transform:scale(2.5);opacity:0}}
@keyframes connPulse{0%,100%{opacity:.3}50%{opacity:.8}}
@keyframes helixSpin{0%{transform:rotateY(0deg)}100%{transform:rotateY(360deg)}}
@keyframes traitGlow{0%,100%{filter:brightness(1) drop-shadow(0 0 2px currentColor)}50%{filter:brightness(1.3) drop-shadow(0 0 8px currentColor)}}
@keyframes nodeFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
.di{animation:depthIn .55s cubic-bezier(.16,1,.3,1) forwards}
.ri{animation:riseUp .5s cubic-bezier(.16,1,.3,1) forwards}
@keyframes dnaRotate{0%{transform:rotateY(0deg)}100%{transform:rotateY(360deg)}}
@keyframes dnaPulse{0%,100%{filter:brightness(1) drop-shadow(0 0 4px rgba(240,168,48,0.2))}50%{filter:brightness(1.2) drop-shadow(0 0 12px rgba(240,168,48,0.4))}}
@keyframes nodeFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
.ri1{animation-delay:.08s;opacity:0}.ri2{animation-delay:.16s;opacity:0}
.ri3{animation-delay:.24s;opacity:0}.ri4{animation-delay:.32s;opacity:0}
.trait-pulse{animation:traitGlow 3s ease-in-out infinite}
.dna-container{perspective:800px;transform-style:preserve-3d}
.dna-helix{transform-style:preserve-3d;transition:transform .3s ease}
`;

/* ═══════════════════════════════════════════════════════════════
   ENGAGEMENT UTILITIES
   ═══════════════════════════════════════════════════════════════ */

function haptic(style) {
  try {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      if (style === "light") navigator.vibrate(10);
      else if (style === "medium") navigator.vibrate(25);
      else if (style === "heavy") navigator.vibrate([30,20,30]);
      else navigator.vibrate(15);
    }
  } catch(e) {}
}

var DAILY_SPARKS = [
  { prompt: "Tell someone what they mean to you — without any occasion.", category: "Connection", creator: "Kindling" },
  { prompt: "Sit in silence for 10 minutes. Write what surfaces.", category: "Mindfulness", creator: "Northlight" },
  { prompt: "Find beauty in something you walk past every day.", category: "Wonder", creator: "Meridian" },
  { prompt: "Ask someone older what they wish they had known at your age.", category: "Wisdom", creator: "Solace" },
  { prompt: "Do something kind for a stranger without them knowing.", category: "Empathy", creator: "Wren" },
  { prompt: "Write a letter to your future self. Be honest.", category: "Growth", creator: "Atlas" },
  { prompt: "Put your phone away for one hour. Notice what happens.", category: "Presence", creator: "Emberglow" },
  { prompt: "Thank someone for something they did months ago. Watch their face.", category: "Gratitude", creator: "Wren" },
  { prompt: "Walk a route you know by heart. Notice 3 things you have never seen.", category: "Wonder", creator: "Meridian" },
  { prompt: "Write one sentence that is true. Not clever. Not deep. Just true.", category: "Authenticity", creator: "Atlas" },
  { prompt: "Give someone your full attention for 5 minutes. No phone. No planning what to say next.", category: "Presence", creator: "Quietstorm" },
  { prompt: "Do something you used to love but stopped doing. Notice why you stopped.", category: "Growth", creator: "Emberglow" },
  { prompt: "Find a stranger who looks like they need kindness. Offer it without explanation.", category: "Kindness", creator: "Kindling" },
];

var ACTIVITY_FEED = [
  { user: "Wren", action: "illuminated", target: "Quietstorm", detail: "reflection on vulnerability", time: "2m" },
  { user: "Atlas", action: "accepted", target: null, detail: "a new Spark from Emberglow", time: "5m" },
  { user: "Meridian", action: "witnessed", target: "Northlight", detail: "reflection on solitude", time: "8m" },
  { user: "Kindling", action: "completed", target: null, detail: "Stranger Conversations challenge", time: "12m" },
  { user: "Emberglow", action: "joined", target: null, detail: "Digital Sunset circle", time: "15m" },
  { user: "Solace", action: "stirred by", target: "Wren", detail: "reflection on compassion fatigue", time: "18m" },
  { user: "Quietstorm", action: "rippled", target: "Atlas", detail: "reflection on identity", time: "23m" },
  { user: "Northlight", action: "created", target: null, detail: "a new Spark: Listen to rain without music", time: "31m" },
  { user: "Wren", action: "reached", target: null, detail: "Luminary tier", time: "45m" },
  { user: "Atlas", action: "witnessed", target: "Emberglow", detail: "sunset reflection", time: "1h" },
];

var ACTION_COLORS = {
  illuminated: "#4AE8C4",
  witnessed: "#6B7DB3",
  stirred: "#E8A838",
  "stirred by": "#E8A838",
  rippled: "#C45EDB",
  accepted: "#5B8DEF",
  completed: "#4AE8C4",
  joined: "#E87840",
  created: "#F0A830",
  reached: "#FFD700",
};

function ActivityTicker() {
  var _idx = useState(0); var idx = _idx[0]; var setIdx = _idx[1];
  var _vis = useState(true); var vis = _vis[0]; var setVis = _vis[1];

  useEffect(function() {
    var interval = setInterval(function() {
      setVis(false);
      setTimeout(function() {
        setIdx(function(i) { return (i + 1) % ACTIVITY_FEED.length; });
        setVis(true);
      }, 400);
    }, 4000);
    return function() { clearInterval(interval); };
  }, []);

  var item = ACTIVITY_FEED[idx];
  var color = ACTION_COLORS[item.action] || C.mid;

  return React.createElement("div", {
    style: {
      padding: "8px 16px",
      background: C.abyss,
      borderBottom: "1px solid " + C.ghost + "15",
      display: "flex", alignItems: "center", gap: 6,
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(-8px)",
      transition: "all 0.4s ease",
      minHeight: 32,
    }
  },
    React.createElement("div", { style: { width: 4, height: 4, borderRadius: 2, background: color, flexShrink: 0, animation: "breathe 2s ease-in-out infinite" } }),
    React.createElement("span", { style: { fontSize: 10, color: C.mid, fontFamily: "'DM Sans',sans-serif", lineHeight: 1.4 } },
      React.createElement("span", { style: { color: C.ember } }, item.user),
      " " + item.action + " ",
      item.target ? React.createElement("span", { style: { color: color } }, item.target + "'s ") : "",
      item.detail
    ),
    React.createElement("span", { style: { fontSize: 9, color: C.ghost, fontFamily: "'JetBrains Mono',monospace", marginLeft: "auto", flexShrink: 0 } }, item.time)
  );
}

function SparkOfTheDay({ onAccept }) {
  var today = new Date().getDay();
  var spark = DAILY_SPARKS[today % DAILY_SPARKS.length];
  var _acc = useState(false); var accepted = _acc[0]; var setAccepted = _acc[1];
  var _show = useState(true); var show = _show[0]; var setShow = _show[1];

  if (!show) return null;

  return React.createElement("div", {
    className: "di",
    style: {
      margin: "0 16px 12px",
      padding: "16px 18px",
      borderRadius: 16,
      background: "linear-gradient(135deg, " + C.ember + "08, " + C.kindle + "05)",
      border: "1px solid " + C.ember + "20",
      position: "relative",
    }
  },
    React.createElement("button", {
      onClick: function() { setShow(false); },
      style: { position: "absolute", top: 8, right: 10, color: C.dim, padding: 4 }
    }, React.createElement(X, { size: 14 })),
    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 8 } },
      React.createElement(Flame, { size: 14, color: C.ember }),
      React.createElement("span", { style: { fontSize: 10, color: C.ember, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" } }, "Spark of the day")
    ),
    React.createElement("p", { style: { fontFamily: "'Cormorant Garamond',serif", fontSize: 15, color: C.light, lineHeight: 1.7, marginBottom: 10 } },
      '"' + spark.prompt + '"'
    ),
    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
      React.createElement("span", { style: { fontSize: 10, color: C.dim, fontFamily: "'DM Sans',sans-serif" } },
        "by " + spark.creator + " · " + spark.category
      ),
      accepted
        ? React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4, padding: "6px 14px", borderRadius: 10, background: C.ember + "15", border: "1px solid " + C.ember + "30" } },
            React.createElement(Check, { size: 12, color: C.ember }),
            React.createElement("span", { style: { fontSize: 11, color: C.ember, fontFamily: "'DM Sans',sans-serif", fontWeight: 500 } }, "Accepted")
          )
        : React.createElement("button", {
            onClick: function() { haptic("medium"); setAccepted(true); if (onAccept) onAccept(spark); },
            style: { padding: "6px 16px", borderRadius: 10, background: C.ember, color: C.void, fontSize: 11, fontFamily: "'DM Sans',sans-serif", fontWeight: 600 }
          }, "Accept Spark")
    )
  );
}

function AchievementToast({ message, onDone }) {
  var _v = useState(false); var visible = _v[0]; var setVisible = _v[1];
  useEffect(function() {
    setTimeout(function() { setVisible(true); }, 50);
    setTimeout(function() { setVisible(false); }, 3000);
    setTimeout(function() { if (onDone) onDone(); }, 3500);
  }, []);

  return React.createElement("div", {
    style: {
      position: "fixed", top: 60, left: "50%", transform: "translateX(-50%) " + (visible ? "translateY(0)" : "translateY(-20px)"),
      opacity: visible ? 1 : 0, transition: "all 0.5s cubic-bezier(.16,1,.3,1)",
      padding: "10px 20px", borderRadius: 14,
      background: "linear-gradient(135deg, " + C.ember + "20, " + C.kindle + "15)",
      border: "1px solid " + C.ember + "30",
      backdropFilter: "blur(12px)", zIndex: 9999,
      display: "flex", alignItems: "center", gap: 8,
      boxShadow: "0 8px 32px " + C.ember + "15",
    }
  },
    React.createElement(Sparkles, { size: 16, color: C.ember }),
    React.createElement("span", { style: { fontSize: 12, color: C.light, fontFamily: "'DM Sans',sans-serif", fontWeight: 500 } }, message)
  );
}


function useSwipeBack(onBack) {
  var touchStart = useRef(null);
  var touchDelta = useRef(0);
  var _offset = useState(0); var offset = _offset[0]; var setOffset = _offset[1];
  var _swiping = useState(false); var swiping = _swiping[0]; var setSwiping = _swiping[1];

  var handlers = {
    onTouchStart: function(e) { touchStart.current = e.touches[0].clientX; touchDelta.current = 0; setSwiping(false); },
    onTouchMove: function(e) {
      if (touchStart.current === null) return;
      var dx = e.touches[0].clientX - touchStart.current;
      if (dx > 10) { setSwiping(true); setOffset(Math.min(dx, 300)); touchDelta.current = dx; }
    },
    onTouchEnd: function() {
      if (touchDelta.current > 80 && onBack) { setOffset(400); setTimeout(function(){ onBack(); setOffset(0); setSwiping(false); }, 200); }
      else { setOffset(0); setSwiping(false); }
      touchStart.current = null; touchDelta.current = 0;
    },
  };

  var style = { transform: "translateX(" + offset + "px)", opacity: swiping ? Math.max(0.3, 1 - offset/400) : 1, transition: swiping ? "none" : "all 0.3s ease" };
  var indicator = offset > 20 ? React.createElement("div", {style:{position:"fixed",left:0,top:"50%",transform:"translateY(-50%)",width:4,height:60,borderRadius:"0 4px 4px 0",background:C.ember,opacity:Math.min(1,offset/80),transition:swiping?"none":"opacity 0.3s",zIndex:9999}}) : null;

  return { handlers: handlers, style: style, indicator: indicator };
}



/* ═══════════════════════════════════════════════════════════════
   API — Real backend calls to Supabase
   ═══════════════════════════════════════════════════════════════ */

async function apiRegister(name, email, password) {
  try {
    var res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, email: email, password: password }),
    });
    var data = await res.json();
    if (!res.ok) return { error: data.error || "Registration failed" };
    if (data.token) {
      try { localStorage.setItem("lucid_token", data.token); } catch(e) {}
    }
    return { user: data.user };
  } catch (e) {
    return { error: "Network error — using offline mode" };
  }
}

async function apiLogin(email, password) {
  try {
    var res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });
    var data = await res.json();
    if (!res.ok) return { error: data.error || "Login failed" };
    if (data.token) {
      try { localStorage.setItem("lucid_token", data.token); } catch(e) {}
    }
    return { user: data.user };
  } catch (e) {
    return { error: "Network error — using offline mode" };
  }
}



/* ═══════════════════════════════════════════════════════════════
   EMBERS — Earned moments, not performances
   ═══════════════════════════════════════════════════════════════ */

var EMBERS_DATA = [
  {
    id:"e1", userId:"atlas", sparkTitle:"Write one honest thing you have never said online",
    photo:"https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=1200&fit=crop",
    caption:"2,400 followers. Zero people who know the real me. Until now.",
    timeAgo:"3h", warmth:87, warming:true,
    emotions:["Courage","Vulnerability"],
  },
  {
    id:"e2", userId:"emberglow", sparkTitle:"Watch a sunset with full attention",
    photo:"https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&h=1200&fit=crop",
    caption:"47 minutes. No phone. At minute 30 I stopped wanting to share it and just had it.",
    timeAgo:"5h", warmth:92, warming:false,
    emotions:["Wonder","Serenity"],
  },
  {
    id:"e3", userId:"wren", sparkTitle:"Tell someone what they mean to you",
    photo:"https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&h=1200&fit=crop",
    caption:"Told a stranger's daughter she was brave. We both cried. Social media will never get this.",
    timeAgo:"8h", warmth:96, warming:true,
    emotions:["Empathy","Gratitude"],
  },
  {
    id:"e4", userId:"quietstorm", sparkTitle:"Write down what you are afraid of",
    photo:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=1200&fit=crop",
    caption:"Found the softer version of me I buried under 20 years of armor. He writes poetry.",
    timeAgo:"12h", warmth:89, warming:false,
    emotions:["Courage","Hope"],
  },
  {
    id:"e5", userId:"meridian", sparkTitle:"Walk somewhere new within 1km",
    photo:"https://images.unsplash.com/photo-1510270929535-95beaf534379?w=800&h=1200&fit=crop",
    caption:"A hidden garden between buildings. An old man watering roses. We talked about grief.",
    timeAgo:"1d", warmth:78, warming:false, fading:true,
    emotions:["Wonder","Gratitude"],
  },
  {
    id:"e6", userId:"kindling", sparkTitle:"Talk to one stranger per week",
    photo:"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1200&fit=crop",
    caption:"Week 6. The bus driver is named Marcus. Nobody ever asked. That broke my heart.",
    timeAgo:"2d", warmth:65, warming:false, fading:true,
    emotions:["Connection","Vulnerability"],
  },
];

function EmbersReel({ onOpenEmber }) {
  var scrollRef = useRef(null);

  return React.createElement("div", {
    style: {
      margin: "8px 12px 4px",
      padding: "12px 14px 10px",
      borderRadius: 16,
      background: C.abyss,
      border: "1px solid " + C.ghost + "25",
    }
  },
    React.createElement("div", {
      style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }
    },
      React.createElement("div", { style: { width: 6, height: 6, borderRadius: 3, background: C.ember, animation: "breathe 2s ease-in-out infinite" } }),
      React.createElement("span", { style: { fontSize: 10, color: C.ember, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" } }, "EMBERS"),
      React.createElement("span", { style: { fontSize: 9, color: C.dim, fontFamily: "'DM Sans',sans-serif", marginLeft: 4 } }, "moments earned, not performed")
    ),
    React.createElement("div", {
      ref: scrollRef,
      style: {
        display: "flex", gap: 12, overflowX: "auto", padding: "0 16px 4px",
        scrollbarWidth: "none", msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch",
      }
    },
      EMBERS_DATA.map(function(ember, i) {
        var person = PEOPLE[ember.userId] || {};
        var glowIntensity = ember.warmth / 100;
        var ringColor = ember.warming ? C.ember : (ember.fading ? C.ghost : C.kindle);
        var pulseAnim = ember.warming ? "breathe 2s ease-in-out infinite" : "none";

        return React.createElement("div", {
          key: ember.id,
          onClick: function() { haptic("light"); if (onOpenEmber) onOpenEmber(ember, i); },
          style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", flexShrink: 0, scrollSnapAlign: "start" }
        },
          React.createElement("div", {
            style: {
              position: "relative", width: 62, height: 62,
            }
          },
            React.createElement("div", {
              style: {
                position: "absolute", inset: -3,
                borderRadius: "50%",
                background: "conic-gradient(from 0deg, " + ringColor + " 0%, " + ringColor + Math.round(glowIntensity * 60) + " " + Math.round(ember.warmth) + "%, transparent " + Math.round(ember.warmth) + "%)",
                animation: pulseAnim,
                opacity: 0.4 + glowIntensity * 0.6,
              }
            }),
            React.createElement("div", {
              style: {
                position: "absolute", inset: -6,
                borderRadius: "50%",
                boxShadow: "0 0 " + Math.round(12 * glowIntensity) + "px " + Math.round(4 * glowIntensity) + "px " + ringColor + Math.round(glowIntensity * 40),
                animation: pulseAnim,
              }
            }),
            React.createElement("div", {
              style: {
                width: 62, height: 62, borderRadius: "50%", overflow: "hidden",
                border: "2px solid " + C.void,
                position: "relative", zIndex: 1,
              }
            },
              person.photo
                ? React.createElement("img", { src: person.photo, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } })
                : React.createElement("div", { style: { width: "100%", height: "100%", background: "linear-gradient(135deg," + C.ember + "30," + C.ember + "10)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: C.ember, fontFamily: "'Cormorant Garamond',serif" } }, (person.name || "?")[0])
            )
          ),
          React.createElement("span", {
            style: { fontSize: 9, color: ember.fading ? C.ghost : C.mid, fontFamily: "'DM Sans',sans-serif", maxWidth: 62, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
          }, person.name || "?")
        );
      })
    )
  );
}

function EmberViewer({ embers, startIndex, onClose }) {
  var _idx = useState(startIndex || 0); var idx = _idx[0]; var setIdx = _idx[1];
  var _paused = useState(true); var paused = _paused[0]; var setPaused = _paused[1];
  var _timer = useState(3); var timer = _timer[0]; var setTimer = _timer[1];
  var _warmed = useState({}); var warmed = _warmed[0]; var setWarmed = _warmed[1];
  var _showPrompt = useState(false); var showPrompt = _showPrompt[0]; var setShowPrompt = _showPrompt[1];

  var ember = embers[idx];
  var person = PEOPLE[ember.userId] || {};

  // 3 second forced pause then auto-advance after 8s
  useEffect(function() {
    setPaused(true);
    setTimer(3);
    setShowPrompt(false);
    var countdown = setInterval(function() {
      setTimer(function(t) {
        if (t <= 1) { setPaused(false); clearInterval(countdown); return 0; }
        return t - 1;
      });
    }, 1000);
    return function() { clearInterval(countdown); };
  }, [idx]);

  // Auto-advance after pause ends (8 seconds to read)
  useEffect(function() {
    if (paused) return;
    var advance = setTimeout(function() {
      if (idx < embers.length - 1) setIdx(idx + 1);
      else onClose();
    }, 8000);
    return function() { clearTimeout(advance); };
  }, [paused, idx]);

  var goNext = function() { if (idx < embers.length - 1) { setIdx(idx + 1); } else { onClose(); } };
  var goPrev = function() { if (idx > 0) setIdx(idx - 1); };

  var handleWarm = function() {
    haptic("heavy");
    var n = {};
    Object.keys(warmed).forEach(function(k) { n[k] = warmed[k]; });
    n[ember.id] = true;
    setWarmed(n);
    setShowPrompt(true);
  };

  return React.createElement("div", {
    style: {
      position: "fixed", inset: 0, zIndex: 10000, background: C.void,
      display: "flex", flexDirection: "column",
    }
  },
    // Progress bars
    React.createElement("div", { style: { display: "flex", gap: 3, padding: "8px 12px 0", zIndex: 2 } },
      embers.map(function(e, i) {
        return React.createElement("div", { key: e.id, style: { flex: 1, height: 2, borderRadius: 1, background: C.ghost + "40", overflow: "hidden" } },
          React.createElement("div", { style: {
            height: "100%", borderRadius: 1,
            background: i < idx ? C.ember : (i === idx ? C.ember : "transparent"),
            width: i < idx ? "100%" : (i === idx && !paused ? "100%" : (i === idx ? "0%" : "0%")),
            transition: i === idx && !paused ? "width 8s linear" : "none",
          }})
        );
      })
    ),

    // Header
    React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", zIndex: 2 } },
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
        React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", overflow: "hidden", border: "2px solid " + C.ember + "40" } },
          person.photo
            ? React.createElement("img", { src: person.photo, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } })
            : React.createElement("div", { style: { width: "100%", height: "100%", background: C.ember + "20", display: "flex", alignItems: "center", justifyContent: "center", color: C.ember, fontSize: 14 } }, (person.name || "?")[0])
        ),
        React.createElement("div", null,
          React.createElement("div", { style: { fontSize: 13, color: C.light, fontFamily: "'DM Sans',sans-serif", fontWeight: 500 } }, person.name),
          React.createElement("div", { style: { fontSize: 10, color: C.dim, fontFamily: "'DM Sans',sans-serif" } }, ember.timeAgo + " ago")
        )
      ),
      React.createElement("button", { onClick: onClose, style: { color: C.light, padding: 8 } },
        React.createElement(X, { size: 22 })
      )
    ),

    // Photo
    React.createElement("div", {
      style: { flex: 1, position: "relative", overflow: "hidden" }
    },
      React.createElement("img", {
        src: ember.photo, alt: "",
        style: { width: "100%", height: "100%", objectFit: "cover", filter: paused ? "brightness(0.4)" : "brightness(0.7)" , transition: "filter 1s ease" }
      }),

      // Forced pause overlay
      paused && React.createElement("div", {
        style: {
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", zIndex: 3,
        }
      },
        React.createElement("div", { style: {
          width: 64, height: 64, borderRadius: "50%",
          border: "2px solid " + C.ember + "60", display: "flex", alignItems: "center", justifyContent: "center",
          animation: "breathe 1s ease-in-out infinite",
        }},
          React.createElement("span", { style: { fontSize: 28, color: C.ember, fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 } }, timer)
        ),
        React.createElement("p", { style: { fontSize: 11, color: C.mid, fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", marginTop: 12 } }, "pause. breathe. arrive.")
      ),

      // Tap zones for prev/next
      !paused && React.createElement("div", { onClick: goPrev, style: { position: "absolute", left: 0, top: 0, width: "30%", height: "100%", zIndex: 2 } }),
      !paused && React.createElement("div", { onClick: goNext, style: { position: "absolute", right: 0, top: 0, width: "30%", height: "100%", zIndex: 2 } }),

      // Bottom content overlay
      React.createElement("div", {
        style: {
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3,
          padding: "60px 20px 24px",
          background: "linear-gradient(transparent, " + C.void + "dd 40%, " + C.void + ")",
        }
      },
        // Spark that earned this
        React.createElement("div", { style: { display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 8, background: C.ember + "12", border: "1px solid " + C.ember + "20", marginBottom: 10 } },
          React.createElement(Flame, { size: 10, color: C.ember }),
          React.createElement("span", { style: { fontSize: 9, color: C.ember, fontFamily: "'DM Sans',sans-serif" } }, ember.sparkTitle)
        ),

        // Caption
        React.createElement("p", { style: { fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: C.light, lineHeight: 1.6, marginBottom: 12 } }, ember.caption),

        // Emotions
        React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 16 } },
          ember.emotions.map(function(em) {
            return React.createElement("span", { key: em, style: { fontSize: 10, padding: "3px 10px", borderRadius: 12, background: C.ghost + "30", border: "1px solid " + C.ghost + "20", color: C.mid, fontFamily: "'DM Sans',sans-serif" } }, em);
          })
        ),

        // Warmth bar + warm button
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
          React.createElement("div", { style: { flex: 1 } },
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 4 } },
              React.createElement("span", { style: { fontSize: 9, color: C.dim, fontFamily: "'DM Sans',sans-serif", letterSpacing: 1, textTransform: "uppercase" } }, "warmth"),
              React.createElement("span", { style: { fontSize: 11, color: C.ember, fontFamily: "'JetBrains Mono',monospace" } }, ember.warmth + (warmed[ember.id] ? 1 : 0))
            ),
            React.createElement("div", { style: { height: 3, borderRadius: 2, background: C.ghost + "30", overflow: "hidden" } },
              React.createElement("div", { style: {
                height: "100%", borderRadius: 2, width: (ember.warmth + (warmed[ember.id] ? 1 : 0)) + "%",
                background: "linear-gradient(90deg, " + C.kindle + ", " + C.ember + ")",
                boxShadow: "0 0 8px " + C.ember + "40",
                transition: "width 0.6s ease",
              }})
            )
          ),
          warmed[ember.id]
            ? React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4, padding: "8px 14px", borderRadius: 12, background: C.ember + "15" } },
                React.createElement(Flame, { size: 14, color: C.ember }),
                React.createElement("span", { style: { fontSize: 11, color: C.ember, fontFamily: "'DM Sans',sans-serif" } }, "warmed")
              )
            : React.createElement("button", {
                onClick: handleWarm,
                style: { display: "flex", alignItems: "center", gap: 5, padding: "8px 16px", borderRadius: 12, background: "linear-gradient(135deg," + C.ember + "," + C.kindle + ")", color: C.void }
              },
                React.createElement(Flame, { size: 14 }),
                React.createElement("span", { style: { fontSize: 11, fontFamily: "'DM Sans',sans-serif", fontWeight: 600 } }, "warm")
              )
        ),

        // Reflection prompt (shows after warming)
        showPrompt && React.createElement("div", {
          className: "di",
          style: { marginTop: 14, padding: "12px 14px", borderRadius: 12, background: C.abyss, border: "1px solid " + C.ember + "15" }
        },
          React.createElement("p", { style: { fontSize: 12, color: C.mid, fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", lineHeight: 1.6 } },
            "This ember stirred something in you. Tomorrow it becomes a reflection prompt: ",
            React.createElement("span", { style: { color: C.light } }, "What did " + person.name + " make you feel?")
          )
        )
      )
    )
  );
}





/* ═══════════════════════════════════════════════════════════════
   EXPERIENCE PHOTO — Users attach their own photo to reflections
   Real moments > generated art. Your photo, your experience.
   ═══════════════════════════════════════════════════════════════ */

function SoulCard({ author, photo, emotions, height, borderRadiusTop }) {
  var h = height || 160;
  var tier = getTier((author || {}).essencePoints || 0);
  var emColors = {
    Wonder:"#E8A838", Gratitude:"#4AE8C4", Joy:"#F0A830", Peace:"#4AE8C4",
    Curiosity:"#5B8DEF", Awe:"#C45EDB", Clarity:"#E8A838", Vulnerability:"#E85D75",
    Courage:"#E87840", Empathy:"#4AE8C4", Humility:"#5B8DEF", Hope:"#F0A830",
    Melancholy:"#5B8DEF", Serenity:"#4AE8C4", Determination:"#E87840",
  };
  var c1 = emColors[(emotions || [])[0]] || tier.color;
  var c2 = emColors[(emotions || [])[1]] || C.abyss;
  var c3 = emColors[(emotions || [])[2]] || C.deep;

  return (
    <div style={{
      width:"100%", height:h, overflow:"hidden", position:"relative",
      borderRadius: borderRadiusTop ? "16px 16px 0 0" : 12,
      background: photo ? "none" : "linear-gradient(135deg, "+c1+"25, "+C.abyss+" 40%, "+c2+"15, "+c3+"20)",
    }}>
      {photo ? (
        <img src={photo} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.8) saturate(1.1)" }}
          onError={function(e) { e.target.style.display="none"; }}/>
      ) : null}

      {/* Soul signature overlay — always visible */}
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"flex-end", padding:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, width:"100%" }}>
          {author && (
            <Avatar name={author.name || (author.essence_name)} size={36} color={tier.color} photo={author.photo_url || author.photo}/>
          )}
          <div style={{ flex:1 }}>
            {author && (
              <div style={{ fontSize:14, color:C.light, fontFamily:"'DM Sans',sans-serif", fontWeight:600, textShadow:"0 1px 8px rgba(0,0,0,0.6)" }}>
                {author.name || author.essence_name}
              </div>
            )}
            <div style={{ display:"flex", gap:4, marginTop:3 }}>
              {(emotions || []).slice(0,3).map(function(em) {
                return <span key={em} style={{ fontSize:9, color:emColors[em]||C.mid, padding:"2px 7px", borderRadius:8, background:"rgba(0,0,0,0.4)", fontFamily:"'DM Sans',sans-serif" }}>{em}</span>;
              })}
            </div>
          </div>
          {author && (
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:10, color:tier.color, fontFamily:"'JetBrains Mono',monospace", textShadow:"0 1px 6px rgba(0,0,0,0.6)" }}>{tier.name}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DNA HELIX MAP — The humanising connection visualization
   Owner's helix is bright and central. Connected people's
   strands weave through it, faded. Where they cross,
   glowing intersection nodes reveal shared experiences.
   The helix GROWS as connections deepen.
   ═══════════════════════════════════════════════════════════════ */



function DNAHelixMap({ ownerId, userName, userPhoto, onSelectPerson }) {
  const [activeNode, setActiveNode] = useState(null);
  const [rotY, setRotY] = useState(0);
  const [rotX, setRotX] = useState(10);
  const [autoSpin, setAutoSpin] = useState(true);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef({ x:0, y:0, ry:0, rx:0 });

  // Auto rotation
  useEffect(function() {
    if (!autoSpin) return;
    var id = setInterval(function() { setRotY(function(r) { return r + 0.3; }); }, 30);
    return function() { clearInterval(id); };
  }, [autoSpin]);

  var handleDown = function(e) {
    setDragging(true); setAutoSpin(false);
    dragRef.current = { x:e.clientX||((e.touches||[])[0]||{}).clientX||0, y:e.clientY||((e.touches||[])[0]||{}).clientY||0, ry:rotY, rx:rotX };
  };
  var handleMove = function(e) {
    if (!dragging) return;
    var cx = e.clientX||((e.touches||[])[0]||{}).clientX||0;
    var cy = e.clientY||((e.touches||[])[0]||{}).clientY||0;
    setRotY(dragRef.current.ry + (cx - dragRef.current.x) * 0.5);
    setRotX(Math.max(-40, Math.min(40, dragRef.current.rx - (cy - dragRef.current.y) * 0.3)));
  };
  var handleUp = function() { setDragging(false); };

  var owner = PEOPLE[ownerId] || PEOPLE[Object.keys(PEOPLE)[0]];
  var ownerTier = getTier(owner.essencePoints);
  var connectedIds = Object.keys(PEOPLE).filter(function(id) { return id !== ownerId; });

  // Build 3D cylinder nodes
  var CYLINDER_R = 100;   // radius of cylinder
  var CYLINDER_H = 400;   // height
  var HELIX_TURNS = 3;    // number of full rotations
  var TOTAL_NODES = 24;   // nodes along the helix

  // Generate helix points in 3D space
  var helixNodes = [];
  for (var i = 0; i < TOTAL_NODES; i++) {
    var t = i / (TOTAL_NODES - 1);
    var angle = t * HELIX_TURNS * 2 * Math.PI;
    var y = -CYLINDER_H/2 + t * CYLINDER_H;
    var x = CYLINDER_R * Math.cos(angle);
    var z = CYLINDER_R * Math.sin(angle);

    // Assign to people/connections
    var personIdx = i % (connectedIds.length + 1);
    var isOwner = personIdx === 0;
    var personId = isOwner ? ownerId : connectedIds[(personIdx - 1) % connectedIds.length];
    var person = PEOPLE[personId] || owner;
    var tier = getTier(person.essencePoints);

    // Check for connection intersection
    var isIntersection = !isOwner && (i % 3 === 0);
    var spectrum = isIntersection ? SPECTRUMS[i % SPECTRUMS.length] : null;

    helixNodes.push({
      x:x, y:y, z:z, angle:angle,
      isOwner:isOwner, personId:personId, person:person, tier:tier,
      isIntersection:isIntersection, spectrum:spectrum,
      strength: 55 + Math.floor((i * 7 + 13) % 40),
      phrase: isIntersection ? (
        ["shared vulnerability","finding beauty in ordinary moments","listening past words",
         "sitting with uncertainty","seeing fear beneath anger","choosing presence over performance",
         "discovering kindness in strangers","embracing discomfort as growth"][i % 8]
      ) : "",
    });
  }

  // Second helix strand (offset by PI)
  var helix2Nodes = [];
  for (var j = 0; j < TOTAL_NODES; j++) {
    var t2 = j / (TOTAL_NODES - 1);
    var angle2 = t2 * HELIX_TURNS * 2 * Math.PI + Math.PI;
    var y2 = -CYLINDER_H/2 + t2 * CYLINDER_H;
    helix2Nodes.push({
      x: CYLINDER_R * Math.cos(angle2),
      y: y2,
      z: CYLINDER_R * Math.sin(angle2),
    });
  }

  // Project 3D to 2D with perspective
  var PROJECT = function(px, py, pz) {
    var cosY = Math.cos(rotY * Math.PI/180);
    var sinY = Math.sin(rotY * Math.PI/180);
    var cosX = Math.cos(rotX * Math.PI/180);
    var sinX = Math.sin(rotX * Math.PI/180);
    // Rotate Y
    var rx = px * cosY - pz * sinY;
    var rz = px * sinY + pz * cosY;
    // Rotate X
    var ry = py * cosX - rz * sinX;
    var rz2 = py * sinX + rz * cosX;
    // Perspective
    var perspective = 600;
    var scale = perspective / (perspective + rz2 + 200);
    return { x: 170 + rx * scale, y: 220 + ry * scale, scale: scale, z: rz2 };
  };

  return (
    <div style={{ position:"relative" }}>
      <div style={{ textAlign:"center", marginBottom:12, padding:"0 16px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:4 }}>
          <Fingerprint size={16} color={ownerTier.color}/>
          <span style={{ fontSize:15, color:C.light, fontFamily:"'Cormorant Garamond',serif", fontWeight:500 }}>{userName||owner.name}'s Connection DNA</span>
        </div>
        <p style={{ fontSize:11, color:C.mid, fontFamily:"'DM Sans',sans-serif" }}>
          {dragging ? "Rotating..." : "Drag to rotate · Tap nodes to explore"}
        </p>
      </div>

      {/* 3D Canvas */}
      <div
        onMouseDown={handleDown} onMouseMove={handleMove} onMouseUp={handleUp} onMouseLeave={handleUp}
        onTouchStart={handleDown} onTouchMove={handleMove} onTouchEnd={handleUp}
        style={{
          width:"100%", height:440, borderRadius:18,
          background:"linear-gradient(180deg, "+C.abyss+", "+C.deep+" 50%, "+C.abyss+")",
          border:"1px solid "+C.ghost,
          cursor: dragging ? "grabbing" : "grab",
          touchAction:"none", overflow:"hidden", position:"relative",
        }}
      >
        <svg width="340" height="440" viewBox="0 0 340 440" style={{ display:"block", margin:"0 auto" }}>
          <defs>
            <filter id="glow3d"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="glow3dL" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>

          {/* Cylinder wireframe rings */}
          {[0.15, 0.35, 0.5, 0.65, 0.85].map(function(t, ri) {
            var ringPts = [];
            for (var a = 0; a < 32; a++) {
              var ang = (a/32) * Math.PI * 2;
              var p = PROJECT(CYLINDER_R * 0.85 * Math.cos(ang), -CYLINDER_H/2 + t*CYLINDER_H, CYLINDER_R * 0.85 * Math.sin(ang));
              ringPts.push((a===0?"M":"L") + p.x + "," + p.y);
            }
            return <path key={ri} d={ringPts.join(" ")+" Z"} fill="none" stroke={C.ghost} strokeWidth="0.4" opacity="0.15"/>;
          })}

          {/* Helix strand 2 (behind, dimmer) */}
          {helix2Nodes.map(function(node, i) {
            if (i === 0) return null;
            var p1 = PROJECT(helix2Nodes[i-1].x, helix2Nodes[i-1].y, helix2Nodes[i-1].z);
            var p2 = PROJECT(node.x, node.y, node.z);
            var opacity = Math.max(0.05, Math.min(0.25, (p2.z + 200) / 400 * 0.3));
            return <line key={"h2-"+i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={ownerTier.color} strokeWidth={1 + p2.scale} opacity={opacity}/>;
          })}

          {/* Rungs between helices */}
          {helixNodes.map(function(node, i) {
            if (i >= helix2Nodes.length || i % 2 !== 0) return null;
            var p1 = PROJECT(node.x, node.y, node.z);
            var p2 = PROJECT(helix2Nodes[i].x, helix2Nodes[i].y, helix2Nodes[i].z);
            var opacity = Math.max(0.03, (p1.scale - 0.5) * 0.2);
            return <line key={"rung-"+i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={ownerTier.color} strokeWidth="0.6" opacity={opacity} strokeLinecap="round"/>;
          })}

          {/* Main helix strand 1 */}
          {helixNodes.map(function(node, i) {
            if (i === 0) return null;
            var p1 = PROJECT(helixNodes[i-1].x, helixNodes[i-1].y, helixNodes[i-1].z);
            var p2 = PROJECT(node.x, node.y, node.z);
            var col = node.isOwner ? ownerTier.color : node.tier.color; var strandOpacity = node.isOwner ? 1.0 : 0.4;
            var opacity = Math.max(0.1, Math.min(0.9, (p2.z + 200) / 300));
            var w = 1 + p2.scale * 2.5;
            return (
              <g key={"s1-"+i}>
                {opacity > 0.4 && <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={col} strokeWidth={w+3} opacity={opacity*0.1}/>}
                <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={col} strokeWidth={w} opacity={opacity} strokeLinecap="round"/>
              </g>
            );
          })}

          {/* Nodes — sorted by z for proper depth rendering */}
          {helixNodes
            .map(function(node, i) { var p = PROJECT(node.x, node.y, node.z); return { node:node, p:p, i:i }; })
            .sort(function(a, b) { return a.p.z - b.p.z; })
            .map(function(item) {
              var node = item.node, p = item.p, i = item.i;
              var isActive = activeNode === i;
              var r = node.isIntersection ? 6 + p.scale * 8 : node.isOwner ? 4 + p.scale * 5 : 3 + p.scale * 3;
              var col = node.isIntersection && node.spectrum ? node.spectrum.color : node.isOwner ? ownerTier.color : node.tier.color;
              var opacity = Math.max(0.15, Math.min(1, (p.z + 200) / 300)) * (node.isOwner ? 1.0 : 0.5);

              if (opacity < 0.2 && !isActive) return null;

              return (
                <g key={"n-"+i}
                  onClick={function(e) { e.stopPropagation(); if(node.isIntersection) setActiveNode(isActive ? null : i); }}
                  style={{ cursor: node.isIntersection ? "pointer" : "default" }}>
                  {/* Glow for intersection nodes */}
                  {node.isIntersection && (
                    <circle cx={p.x} cy={p.y} r={r+6} fill={col} opacity={isActive ? 0.2 : 0.08} filter="url(#glow3dL)"
                      style={{ animation:"dnaPulse 3s ease-in-out infinite "+(i*0.3)+"s" }}/>
                  )}
                  {/* Node body */}
                  <circle cx={p.x} cy={p.y} r={r} fill={col} opacity={opacity * (node.isIntersection ? 0.7 : 0.5)} filter={node.isIntersection ? "url(#glow3d)" : undefined}/>
                  <circle cx={p.x} cy={p.y} r={r*0.4} fill={node.isIntersection ? C.light : col} opacity={opacity * 0.9}/>
                  {/* Label on active */}
                  {isActive && (
                    <text x={p.x} y={p.y - r - 8} textAnchor="middle" fill={col} style={{ fontSize:"10px", fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>
                      {node.person.name}
                    </text>
                  )}
                </g>
              );
            })
          }

          {/* Center label */}
          <text x="170" y="20" textAnchor="middle" fill={ownerTier.color} style={{ fontSize:"11px", fontFamily:"'DM Sans',sans-serif", fontWeight:500, letterSpacing:1 }}>
            {userName||owner.name}
          </text>
        </svg>

        {/* Auto-spin toggle */}
        <button onClick={function() { setAutoSpin(!autoSpin); }} style={{
          position:"absolute", bottom:10, right:10, padding:"4px 10px", borderRadius:8,
          background:C.surface, border:"1px solid "+C.ghost, fontSize:10, color:autoSpin ? C.ember : C.dim,
          fontFamily:"'DM Sans',sans-serif",
        }}>
          {autoSpin ? "Auto ●" : "Auto ○"}
        </button>
      </div>

      {/* Active node panel */}
      {activeNode !== null && helixNodes[activeNode] && helixNodes[activeNode].isIntersection && (function() {
        var node = helixNodes[activeNode];
        var col = node.spectrum ? node.spectrum.color : C.ember;
        return (
          <div className="di" style={{
            marginTop:10, padding:"14px 16px", borderRadius:14,
            background:C.abyss, border:"1px solid "+col+"25",
            position:"relative",
          }}>
            <div style={{ position:"absolute", top:0, left:16, right:16, height:2, borderRadius:1, background:col, opacity:0.5 }}/>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <Avatar name={owner.name} size={24} color={ownerTier.color} photo={owner.photo}/>
                <div style={{ width:14, height:1, background:col }}/>
                {node.spectrum && React.createElement(node.spectrum.icon, {size:13,color:col})}
                <div style={{ width:14, height:1, background:col }}/>
                <Avatar name={node.person.name} size={24} color={node.tier.color} photo={node.person.photo}/>
              </div>
              <span style={{ fontSize:11, color:col, fontFamily:"'JetBrains Mono',monospace" }}>{node.strength}%</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:6 }}>
              {node.spectrum && <span style={{ fontSize:10, color:col, fontFamily:"'DM Sans',sans-serif", padding:"2px 8px", borderRadius:6, background:col+"12" }}>{node.spectrum.label}</span>}
              <span style={{ fontSize:10, color:C.mid, fontFamily:"'DM Sans',sans-serif" }}>{owner.name} ↔ {node.person.name}</span>
            </div>
            <p style={{ fontSize:12, color:C.light, fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", lineHeight:1.6, marginBottom:8 }}>"{node.phrase}"</p>
            <button onClick={function(){onSelectPerson && onSelectPerson(node.personId)}} style={{
              width:"100%", padding:"8px 12px", borderRadius:8,
              border:"1px solid "+node.tier.color+"25", background:node.tier.color+"06",
              color:node.tier.color, fontSize:11, fontFamily:"'DM Sans',sans-serif",
              display:"flex", alignItems:"center", justifyContent:"center", gap:5,
            }}>See {node.person.name}'s essence <ChevronRight size={12}/></button>
          </div>
        );
      })()}

      {/* Spectrum legend */}
      <div style={{ display:"flex", justifyContent:"center", gap:10, marginTop:10 }}>
        {SPECTRUMS.map(function(s) { return (
          <div key={s.key} style={{ display:"flex", alignItems:"center", gap:3 }}>
            <div style={{ width:6, height:6, borderRadius:3, background:s.color, boxShadow:"0 0 6px "+s.color+"44" }}/>
            <span style={{ fontSize:8, color:C.dim, fontFamily:"'DM Sans',sans-serif" }}>{s.label}</span>
          </div>
        ); })}
      </div>
    </div>
  );
}

function DNAView({ user }) {
  const [viewPerson, setViewPerson] = useState(null);

  if (viewPerson) {
    const p = PEOPLE[viewPerson];
    if (!p) { setViewPerson(null); return null; }
    const tier = getTier(p.essencePoints);
    return (
      <div style={{ padding:20, paddingBottom:100, overflowY:"auto", maxHeight:"calc(100vh - 70px)" }}>
        <button onClick={() => setViewPerson(null)} style={{ color:C.mid, display:"flex", alignItems:"center", gap:4, fontSize:12, fontFamily:"'DM Sans',sans-serif", marginBottom:16 }}>
          <ArrowLeft size={16}/> Back to DNA
        </button>
        <div className="ri" style={{ textAlign:"center", marginBottom:16, padding:"24px 16px", background:`linear-gradient(180deg,${tier.color}06,transparent)`, borderRadius:18, border:`1px solid ${tier.color}10` }}>
          <Avatar name={p.name} size={60} color={tier.color}/>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:C.light, fontWeight:400, marginTop:12 }}>{p.name}</h2>
          <span style={{ fontSize:10, color:tier.color, fontFamily:"'JetBrains Mono',monospace", padding:"3px 10px", borderRadius:10, background:`${tier.color}10` }}>{tier.name} · {p.essencePoints} LP</span>
        </div>
        <div className="ri ri1" style={{ background:C.abyss, borderRadius:14, padding:16, marginBottom:12, border:`1px solid ${C.ghost}` }}>
          <div style={{ fontSize:10, color:C.ember, fontFamily:"'DM Sans',sans-serif", letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>Their essence</div>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:C.light, lineHeight:1.8 }}>{p.evolvedBio}</p>
        </div>
        <div className="ri ri2"><RewardDashboard rewards={p.rewards}/></div>
        <div className="ri ri3" style={{ background:C.abyss, borderRadius:14, padding:16, marginTop:12, border:`1px solid ${C.ghost}` }}>
          <div style={{ fontSize:10, color:C.mid, fontFamily:"'DM Sans',sans-serif", letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>How they connect</div>
          {SPECTRUMS.map(s => (
            <div key={s.key} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <s.icon size={13} color={s.color} style={{ flexShrink:0 }}/>
              <div style={{ flex:1, height:4, borderRadius:2, background:`${C.ghost}33` }}>
                <div style={{ width:`${p.spectrum[s.key]}%`, height:"100%", borderRadius:2, background:s.color }}/>
              </div>
              <span style={{ fontSize:10, color:s.color, fontFamily:"'JetBrains Mono',monospace", width:24, textAlign:"right" }}>{p.spectrum[s.key]}</span>
            </div>
          ))}
        </div>
        <div className="ri ri4" style={{ background:C.abyss, borderRadius:14, padding:16, marginTop:12, border:`1px solid ${C.ghost}`, textAlign:"center" }}>
          <Soulprint data={p.soulprint} size={120} color={tier.color}/>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding:20, paddingBottom:100, overflowY:"auto", maxHeight:"calc(100vh - 70px)" }}>
      <DNAHelixMap ownerId="solace" userName={user.name} userPhoto={user.photo} onSelectPerson={setViewPerson}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HUMANITY INDEX — The real measure of a person
   Five axes: Depth, Empathy, Critical Thinking, Impact, Consistency
   Not gamified points — a mirror of who you're becoming.
   ═══════════════════════════════════════════════════════════════ */

const HI_AXES = [
  { key:"depth", label:"Depth", color:"#E8A838", icon:Pen, desc:"Quality and honesty of your reflections" },
  { key:"empathy", label:"Empathy", color:"#4AE8C4", icon:Heart, desc:"How genuinely you engage with others' experiences" },
  { key:"criticalThinking", label:"Critical\nThinking", color:"#5B8DEF", icon:Brain, desc:"Willingness to hold and examine opposing views" },
  { key:"impact", label:"Impact", color:"#C45EDB", icon:Sparkles, desc:"How many people you've genuinely moved" },
  { key:"consistency", label:"Consistency", color:"#E87840", icon:Flame, desc:"Showing up authentically, not performing" },
];

function HumanityIndexViz({ data, size=340 }) {
  const n = HI_AXES.length, step = (2*Math.PI)/n;
  const cx=size/2, cy=size/2, maxR=size/2-50;
  const avg = HI_AXES.reduce(function(s,ax){return s + ((data||{})[ax.key]||50)},0) / n;

  // Generate organic aura blobs for each axis
  var auraPaths = HI_AXES.map(function(ax,i) {
    var val = ((data||{})[ax.key] || 50) / 100;
    var baseR = 30 + val * maxR * 0.65;
    var pts = [];
    for (var j = 0; j < 60; j++) {
      var a = (j/60) * 2 * Math.PI;
      // Bulge toward this axis direction
      var axAngle = i * step - Math.PI/2;
      var angleDiff = Math.abs(a - axAngle);
      if (angleDiff > Math.PI) angleDiff = 2*Math.PI - angleDiff;
      var bulge = Math.max(0, 1 - angleDiff/1.2);
      var r = baseR * (0.4 + bulge * 0.6) + Math.sin(a*3+i*2)*4;
      pts.push((cx + Math.cos(a)*r) + "," + (cy + Math.sin(a)*r));
    }
    return "M" + pts.join("L") + "Z";
  });

  // Composite soul shape
  var soulPts = [];
  for (var j = 0; j < 120; j++) {
    var a = (j/120) * 2 * Math.PI;
    var r = 0;
    HI_AXES.forEach(function(ax,i) {
      var val = ((data||{})[ax.key] || 50) / 100;
      var axAngle = i * step - Math.PI/2;
      var angleDiff = Math.abs(a - axAngle);
      if (angleDiff > Math.PI) angleDiff = 2*Math.PI - angleDiff;
      var influence = Math.max(0, 1 - angleDiff/1.3);
      r += val * maxR * 0.8 * influence;
    });
    r = Math.max(r, 25);
    soulPts.push((cx + Math.cos(a)*r) + "," + (cy + Math.sin(a)*r));
  }
  var soulPath = "M" + soulPts.join("L") + "Z";

  return (
    <div style={{ textAlign:"center", position:"relative" }}>
      <svg width={size} height={size} viewBox={"0 0 "+size+" "+size}>
        <defs>
          <filter id="soulGlow"><feGaussianBlur stdDeviation="12" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="auraGlow"><feGaussianBlur stdDeviation="18" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <radialGradient id="soulCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={C.ember} stopOpacity="0.15"/>
            <stop offset="70%" stopColor={C.ember} stopOpacity="0.03"/>
            <stop offset="100%" stopColor={C.ember} stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Background pulse rings */}
        {[0.3, 0.5, 0.7, 0.9].map(function(s,i) {
          return <circle key={"ring"+i} cx={cx} cy={cy} r={maxR*s} fill="none" stroke={C.ghost} strokeWidth="0.3" opacity="0.12"
            style={{ animation: "breathe "+(5+i)+"s ease-in-out infinite", animationDelay: i*0.5+"s" }}/>;
        })}

        {/* Aura layers per axis - breathing blobs */}
        {auraPaths.map(function(d,i) {
          return <path key={"aura"+i} d={d} fill={HI_AXES[i].color+"08"} stroke={HI_AXES[i].color} strokeWidth="0.8" opacity="0.3"
            filter="url(#auraGlow)"
            style={{ animation: "breathe "+(4+i*0.7)+"s ease-in-out infinite", animationDelay: i*0.3+"s" }}/>;
        })}

        {/* Main soul shape */}
        <path d={soulPath} fill={"url(#soulCore)"} stroke={C.ember} strokeWidth="1.5" opacity="0.7"
          filter="url(#soulGlow)"
          style={{ animation: "breathe 6s ease-in-out infinite" }}/>

        {/* Axis energy nodes - placed at soul edge */}
        {HI_AXES.map(function(ax,i) {
          var val = ((data||{})[ax.key] || 50) / 100;
          var angle = i * step - Math.PI/2;
          var r = 25 + val * maxR * 0.75;
          var px = cx + Math.cos(angle) * r;
          var py = cy + Math.sin(angle) * r;
          var lx = cx + Math.cos(angle) * (maxR + 28);
          var ly = cy + Math.sin(angle) * (maxR + 28);
          var nodeR = 3 + val * 6;
          return (
            <g key={"node"+i}>
              <circle cx={px} cy={py} r={nodeR+10} fill={ax.color} opacity="0.06"
                style={{ animation: "breathe "+(3+i*0.5)+"s ease-in-out infinite" }}/>
              <circle cx={px} cy={py} r={nodeR+4} fill={ax.color} opacity="0.12"/>
              <circle cx={px} cy={py} r={nodeR} fill={ax.color} opacity="0.9"/>
              <line x1={cx} y1={cy} x2={px} y2={py} stroke={ax.color} strokeWidth="0.4" opacity="0.15" strokeDasharray="3,6"/>
              <text x={lx} y={ly} textAnchor="middle" fill={ax.color} opacity="0.85"
                style={{ fontSize:"10px", fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>
                {ax.label.replace("\n"," ")}
              </text>
              <text x={lx} y={ly+14} textAnchor="middle" fill={ax.color}
                style={{ fontSize:"14px", fontFamily:"'JetBrains Mono',monospace", fontWeight:700 }}>
                {(data||{})[ax.key] || 50}
              </text>
            </g>
          );
        })}

        {/* Center soul score */}
        <circle cx={cx} cy={cy} r={28} fill={C.void} opacity="0.7"/>
        <circle cx={cx} cy={cy} r={28} fill="none" stroke={C.ember} strokeWidth="1" opacity="0.3"
          style={{ animation: "breathe 4s ease-in-out infinite" }}/>
        <text x={cx} y={cy-2} textAnchor="middle" fill={C.light}
          style={{ fontSize:"26px", fontFamily:"'Cormorant Garamond',serif", fontWeight:600 }}>
          {Math.round(avg)}
        </text>
        <text x={cx} y={cy+14} textAnchor="middle" fill={C.dim}
          style={{ fontSize:"7px", fontFamily:"'DM Sans',sans-serif", letterSpacing:3, textTransform:"uppercase" }}>
          HUMANITY
        </text>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   JOURNEY MAP — Visual path of a person's growth
   Not a timeline. A landscape they've traversed.
   Each milestone is a node, connections branch off,
   breakthroughs glow, torchbearer moments shine.
   ═══════════════════════════════════════════════════════════════ */

const JOURNEY_COLORS = {
  start: C.dim,
  growth: "#5B8DEF",
  breakthrough: "#E8A838",
  connection: "#4AE8C4",
  impact: "#C45EDB",
  tier: "#E87840",
  torchbearer: "#FFD700",
};

const JOURNEY_ICONS = {
  start: CircleDot,
  growth: TrendingUp,
  breakthrough: Star,
  connection: Heart,
  impact: Sparkles,
  tier: Award,
  torchbearer: Sun,
};

function JourneyMap({ person, compact }) {
  const [activeNode, setActiveNode] = useState(null);
  const journey = (person||{}).journey || [];
  const tier = getTier((person||{}).essencePoints || 0);

  if (!journey.length) return null;

  const W = compact ? 300 : 340;
  const nodeSpacing = compact ? 55 : 65;
  const H = Math.max(200, journey.length * nodeSpacing + 60);
  const cx = W / 2;

  return (
    <div>
      <div style={{
        overflowY:"auto", maxHeight: compact ? 280 : 380, borderRadius:16,
        background:C.abyss, border:`1px solid ${C.ghost}`, padding:"16px 0",
      }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display:"block", margin:"0 auto" }}>
          {/* Connecting path — winding trail */}
          {journey.map((node, i) => {
            if (i === 0) return null;
            const y0 = 30 + (i-1) * nodeSpacing;
            const y1 = 30 + i * nodeSpacing;
            const x0 = cx + (i % 2 === 0 ? -30 : 30) * (i > 0 ? 1 : 0);
            const x1 = cx + ((i+1) % 2 === 0 ? -30 : 30);
            const col = JOURNEY_COLORS[node.type] || C.dim;
            return (
              <path key={`p${i}`}
                d={`M${x0},${y0} C${cx},${(y0+y1)/2} ${cx},${(y0+y1)/2} ${x1},${y1}`}
                fill="none" stroke={col} strokeWidth="1.5" opacity="0.3"
                strokeDasharray={node.type === "connection" ? "4,4" : "none"}
              />
            );
          })}

          {/* Journey nodes */}
          {journey.map((node, i) => {
            const y = 30 + i * nodeSpacing;
            const x = cx + ((i+1) % 2 === 0 ? -30 : 30);
            const col = JOURNEY_COLORS[node.type] || C.dim;
            const Icon = JOURNEY_ICONS[node.type] || CircleDot;
            const isActive = activeNode === i;
            const isTorch = node.type === "torchbearer";
            const r = isActive ? 16 : isTorch ? 14 : 11;

            return (
              <g key={i} onClick={() => setActiveNode(isActive ? null : i)} style={{ cursor:"pointer" }}>
                {/* Glow */}
                {(isTorch || isActive) && (
                  <circle cx={x} cy={y} r={r+8} fill={col} opacity={isTorch ? 0.12 : 0.08}
                    style={{ animation:`breathe 3s ease-in-out infinite ${i*0.3}s` }}/>
                )}
                {/* Node circle */}
                <circle cx={x} cy={y} r={r} fill={C.abyss} stroke={col}
                  strokeWidth={isActive ? 2 : isTorch ? 2 : 1.2} opacity={0.9}/>
                {/* Month label */}
                <text x={i % 2 === 0 ? x + r + 10 : x - r - 10} y={y - 6}
                  textAnchor={i % 2 === 0 ? "start" : "end"} fill={C.dim}
                  style={{ fontSize:"9px", fontFamily:"'JetBrains Mono',monospace" }}>
                  {node.month}
                </text>
                {/* Milestone text */}
                <text x={i % 2 === 0 ? x + r + 10 : x - r - 10} y={y + 6}
                  textAnchor={i % 2 === 0 ? "start" : "end"} fill={isActive ? C.light : C.mid}
                  style={{ fontSize:"9px", fontFamily:"'DM Sans',sans-serif" }}>
                  {compact ? node.milestone.substring(0,30) + (node.milestone.length > 30 ? "…" : "") : node.milestone.substring(0,38) + (node.milestone.length > 38 ? "…" : "")}
                </text>
                {/* Connection branch to person */}
                {node.personId && PEOPLE[node.personId] && (() => {
                  const connPerson = PEOPLE[node.personId];
                  const cTier = getTier(connPerson.essencePoints);
                  const bx = i % 2 === 0 ? x - 50 : x + 50;
                  return (
                    <g>
                      <line x1={x} y1={y} x2={bx} y2={y} stroke={C.understanding} strokeWidth="0.8" opacity="0.3" strokeDasharray="3,3"/>
                      <circle cx={bx} cy={y} r={8} fill={C.abyss} stroke={cTier.color} strokeWidth="1"/>
                      <text x={bx} y={y+3} textAnchor="middle" fill={cTier.color}
                        style={{ fontSize:"7px", fontFamily:"'Cormorant Garamond',serif", fontWeight:600 }}>
                        {connPerson.name[0]}
                      </text>
                    </g>
                  );
                })()}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Active node detail */}
      {activeNode !== null && journey[activeNode] && (() => {
        const node = journey[activeNode];
        const col = JOURNEY_COLORS[node.type] || C.dim;
        const Icon = JOURNEY_ICONS[node.type] || CircleDot;
        return (
          <div className="di" style={{
            marginTop:10, padding:"14px 16px", borderRadius:12,
            background:C.abyss, border:`1px solid ${col}20`,
            borderLeft:`3px solid ${col}55`,
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
              <Icon size={14} color={col}/>
              <span style={{ fontSize:12, color:col, fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>
                {node.type === "torchbearer" ? "Torchbearer Moment" : node.type.charAt(0).toUpperCase() + node.type.slice(1)}
              </span>
              <span style={{ fontSize:10, color:C.dim, fontFamily:"'JetBrains Mono',monospace", marginLeft:"auto" }}>{node.month}</span>
            </div>
            <p style={{ fontSize:14, color:C.light, fontFamily:"'Cormorant Garamond',serif", lineHeight:1.6 }}>
              {node.milestone}
            </p>
            {node.emotion && (
              <div style={{ marginTop:8 }}><EmChip emotion={node.emotion} active small/></div>
            )}
          </div>
        );
      })()}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TORCHBEARER BADGE — Community-granted recognition
   Not earned by volume. Earned when multiple independent people
   say "this person changed how I see the world."
   ═══════════════════════════════════════════════════════════════ */

function TorchbearerBadge({ person, large }) {
  if (!(person||{}).torchbearer) return null;
  return (
    <div style={{
      padding: large ? "16px 18px" : "10px 14px",
      borderRadius: large ? 16 : 12,
      background:"linear-gradient(135deg, #FFD70008, #E8A83808)",
      border:"1px solid #FFD70020",
      display:"flex", alignItems:"flex-start", gap: large ? 12 : 8,
    }}>
      <div style={{
        width: large ? 36 : 24, height: large ? 36 : 24, borderRadius:"50%", flexShrink:0,
        background:"linear-gradient(135deg, #FFD70025, #E8A83815)",
        border:"1px solid #FFD70030",
        display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:"0 0 16px #FFD70015",
      }}>
        <Sun size={large ? 18 : 12} color="#FFD700"/>
      </div>
      <div>
        <div style={{ fontSize: large ? 13 : 11, color:"#FFD700", fontFamily:"'DM Sans',sans-serif", fontWeight:600, marginBottom: large ? 4 : 2 }}>
          Torchbearer
        </div>
        {large && person.torchReason && (
          <p style={{ fontSize:12, color:C.mid, fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", lineHeight:1.5 }}>
            {person.torchReason}
          </p>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   REWARD METRICS DISPLAY
   ═══════════════════════════════════════════════════════════════ */

function RewardBar({ rewards, compact }) {
  return (
    <div style={{ display:"flex", gap: compact ? 10 : 14, alignItems:"center" }}>
      {REWARDS.map(r => {
        const val = (rewards||{})[r.key] || 0;
        if (compact && val === 0) return null;
        return (
          <div key={r.key} style={{ display:"flex", alignItems:"center", gap:3 }} title={r.desc}>
            <r.icon size={compact?11:13} color={r.color} strokeWidth={1.5}/>
            <span style={{ fontSize:compact?10:11, color:r.color, fontFamily:"'JetBrains Mono',monospace" }}>
              {val >= 1000 ? `${(val/1000).toFixed(1)}k` : val}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function RewardDashboard({ rewards }) {
  const totalLP = REWARDS.reduce((sum,r) => sum + ((rewards||{})[r.key]||0) * r.lp, 0);
  return (
    <div style={{ background:C.abyss, borderRadius:16, padding:20, border:`1px solid ${C.ghost}` }}>
      <div style={{ fontSize:10, color:C.mid, fontFamily:"'DM Sans',sans-serif", letterSpacing:1, textTransform:"uppercase", marginBottom:14 }}>
        Your impact
      </div>
      {REWARDS.map((r,i) => {
        const val = (rewards||{})[r.key] || 0;
        const maxVal = Math.max(...REWARDS.map(x => (rewards||{})[x.key]||1));
        return (
          <div key={r.key} style={{ marginBottom:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
              <r.icon size={15} color={r.color}/>
              <span style={{ fontSize:12, color:C.light, fontFamily:"'DM Sans',sans-serif", flex:1 }}>{r.label}</span>
              <span style={{ fontSize:12, color:r.color, fontFamily:"'JetBrains Mono',monospace" }}>{val}</span>
              <span style={{ fontSize:9, color:C.dim, fontFamily:"'JetBrains Mono',monospace" }}>×{r.lp} LP</span>
            </div>
            <div style={{ width:"100%", height:4, borderRadius:2, background:`${C.ghost}33` }}>
              <div style={{ width:`${(val/maxVal)*100}%`, height:"100%", borderRadius:2, background:r.color, transition:"width 1s ease" }}/>
            </div>
            <div style={{ fontSize:10, color:C.dim, fontFamily:"'DM Sans',sans-serif", marginTop:3 }}>{r.desc}</div>
          </div>
        );
      })}
      <div style={{ borderTop:`1px solid ${C.ghost}`, paddingTop:12, marginTop:8, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:11, color:C.mid, fontFamily:"'DM Sans',sans-serif" }}>Total impact</span>
        <span style={{ fontSize:18, color:C.ember, fontFamily:"'Cormorant Garamond',serif", fontWeight:600 }}>{totalLP.toLocaleString()} LP</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function Avatar({ name,size=40,color,photo }) {
  const c=color||C.ember;
  return photo?(
    <div style={{ width:size,height:size,borderRadius:"50%",overflow:"hidden",border:`2px solid ${c}40`,flexShrink:0 }}>
      <img src={photo} alt="" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
    </div>
  ):(
    <div style={{ width:size,height:size,borderRadius:"50%",flexShrink:0,background:`linear-gradient(135deg,${c}30,${c}10)`,border:`1.5px solid ${c}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.36,color:c,fontFamily:"'Cormorant Garamond',serif",fontWeight:600 }}>
      {(name||"?")[0].toUpperCase()}
    </div>
  );
}

function EmChip({emotion,active,onClick,small}) {
  const colors={Wonder:C.ember,Gratitude:C.understanding,Joy:C.ember,Peace:C.understanding,Curiosity:C.intelligence,Awe:C.appreciation,Clarity:C.communication,Vulnerability:C.warmth,Courage:C.kindle,Empathy:C.understanding,Humility:C.intelligence,Hope:C.ember,Melancholy:C.intelligence,Tension:C.warmth,Longing:C.appreciation,Reverence:C.understanding,Determination:C.kindle,Serenity:C.understanding};
  const c=colors[emotion]||C.mid;
  return (<button onClick={onClick} style={{ padding:small?"3px 9px":"5px 13px",borderRadius:20,border:`1px solid ${active?c:C.ghost}`,background:active?`${c}15`:"transparent",color:active?c:C.dim,fontSize:small?"10px":"12px",fontFamily:"'DM Sans',sans-serif",transition:"all .2s" }}>{emotion}</button>);
}

function SpectrumBar({data,height=6,showLabels}) {
  const total=Object.values(data).reduce((a,b)=>a+b,0)||1;
  return (<div>
    <div style={{ display:"flex",borderRadius:height/2,overflow:"hidden",height,background:`${C.ghost}33` }}>
      {SPECTRUMS.map(s=>{const p=(data[s.key]||0)/total*100;return p>0?<div key={s.key} style={{ width:`${p}%`,background:s.color,transition:"width .8s" }}/>:null;})}
    </div>
    {showLabels&&<div style={{ display:"flex",justifyContent:"space-between",marginTop:6 }}>
      {SPECTRUMS.map(s=>(<div key={s.key} style={{ display:"flex",alignItems:"center",gap:3 }}>
        <div style={{ width:5,height:5,borderRadius:3,background:s.color }}/><span style={{ fontSize:9,color:C.mid,fontFamily:"'DM Sans'" }}>{s.label.slice(0,4)}</span><span style={{ fontSize:9,color:s.color,fontFamily:"'JetBrains Mono',monospace" }}>{data[s.key]||0}</span>
      </div>))}
    </div>}
  </div>);
}

function DepthNav({depth,labels}) {
  return (<div style={{ display:"flex",alignItems:"center",gap:5 }}>
    {labels.map((l,i)=>(<div key={i} style={{ display:"flex",alignItems:"center",gap:5 }}>
      <div style={{ width:i<=depth?7:5,height:i<=depth?7:5,borderRadius:"50%",background:i<=depth?C.ember:C.ghost,transition:"all .4s",boxShadow:i===depth?`0 0 10px ${C.glow}`:"none" }}/>
      {i===depth&&<span style={{ fontSize:9,color:C.ember,fontFamily:"'JetBrains Mono',monospace",letterSpacing:1,textTransform:"uppercase" }}>{l}</span>}
      {i<labels.length-1&&<div style={{ width:10,height:1,background:i<depth?C.ember:C.ghost }}/>}
    </div>))}
  </div>);
}

function Soulprint({data,size=130,color=C.ember}) {
  const n=data.length,step=(2*Math.PI)/n,r=size/2-10,cx=size/2,cy=size/2;
  const path=data.map((v,i)=>{const a=i*step-Math.PI/2,d=(v/100)*r;return `${i===0?"M":"L"}${cx+Math.cos(a)*d},${cy+Math.sin(a)*d}`;}).join(" ")+" Z";
  const grids=[.3,.6,.9].map(s=>data.map((_,i)=>{const a=i*step-Math.PI/2,d=s*r;return `${i===0?"M":"L"}${cx+Math.cos(a)*d},${cy+Math.sin(a)*d}`;}).join(" ")+" Z");
  return (<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
    {grids.map((d,i)=><path key={i} d={d} fill="none" stroke={C.ghost} strokeWidth=".5" opacity=".3"/>)}
    <path d={path} fill={`${color}15`} stroke={color} strokeWidth="1.5" style={{ animation:"breathe 5s ease-in-out infinite" }}/>
    {data.map((v,i)=>{const a=i*step-Math.PI/2,d=(v/100)*r;return <circle key={i} cx={cx+Math.cos(a)*d} cy={cy+Math.sin(a)*d} r="2" fill={color} opacity=".8"/>;})}
  </svg>);
}

/* Constellation Map */
function ConstellationMap({focusId,onSelectPerson}) {
  const [hov,setHov]=useState(null);
  const W=320,H=300,cx=W/2,cy=H/2;
  const allIds=Object.keys(PEOPLE),otherIds=allIds.filter(id=>id!==focusId),fp=PEOPLE[focusId]||PEOPLE[allIds[0]];
  const nodes={};
  nodes[fp.id]={x:cx,y:cy,person:fp};
  otherIds.forEach((id,i)=>{const a=(i/otherIds.length)*2*Math.PI-Math.PI/2,r=105+(i%2)*20;nodes[id]={x:cx+Math.cos(a)*r,y:cy+Math.sin(a)*r,person:PEOPLE[id]};});
  const conns=[];
  REFLECTIONS.forEach(ref=>{ref.illuminations.forEach(il=>{
    const ex=conns.find(c=>(c.from===ref.authorId&&c.to===il.userId)||(c.from===il.userId&&c.to===ref.authorId));
    if(ex){ex.spectrums[il.spectrum]=(ex.spectrums[il.spectrum]||0)+25;ex.strength=Math.min(99,ex.strength+10);}
    else conns.push({from:ref.authorId,to:il.userId,spectrums:{[il.spectrum]:50},strength:60+Math.floor(Math.random()*30)});
  });});
  const getCol=(sp)=>{let mk="communication",mv=0;Object.entries(sp).forEach(([k,v])=>{if(v>mv){mv=v;mk=k;}});return (SPECTRUMS.find(s => s.key===mk) || {}).color || C.ember;};

  return (<div style={{ position:"relative" }}>
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display:"block",margin:"0 auto" }}>
      {conns.map((c,i)=>{const f=nodes[c.from],t=nodes[c.to];if(!f||!t)return null;const col=getCol(c.spectrums),ih=hov===i,mx=(f.x+t.x)/2,my=(f.y+t.y)/2-12;return(
        <g key={i} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{cursor:"pointer"}}>
          <path d={`M${f.x},${f.y} Q${mx},${my} ${t.x},${t.y}`} fill="none" stroke={col} strokeWidth={ih?2.5:1.5} opacity={ih ? 0.9 : 0.35} style={{transition:"all .3s"}}/>
          {ih&&<path d={`M${f.x},${f.y} Q${mx},${my} ${t.x},${t.y}`} fill="none" stroke={col} strokeWidth="6" opacity=".12" filter="blur(4px)"/>}
        </g>);})}
      {Object.entries(nodes).map(([id,n])=>{const t=getTier(n.person.essencePoints),iF=id===fp.id,sz=iF?22:16;return(
        <g key={id} onClick={()=>onSelectPerson(id)} style={{cursor:"pointer"}}>
          <circle cx={n.x} cy={n.y} r={sz+3} fill={`${t.color}06`}/>
          <circle cx={n.x} cy={n.y} r={sz} fill={C.abyss} stroke={t.color} strokeWidth={iF?2:1.5}/>
          <text x={n.x} y={n.y+4} textAnchor="middle" fill={t.color} style={{fontSize:iF?"12px":"10px",fontFamily:"'Cormorant Garamond',serif",fontWeight:600}}>{n.person.name[0]}</text>
          <text x={n.x} y={n.y+sz+13} textAnchor="middle" fill={C.mid} style={{fontSize:"8px",fontFamily:"'DM Sans',sans-serif"}}>{n.person.name}</text>
        </g>);})}
    </svg>
    {hov!==null&&conns[hov]&&(()=>{const c=conns[hov],fP=PEOPLE[c.from],tP=PEOPLE[c.to];return(
      <div style={{ position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:"88%",padding:"10px 14px",borderRadius:10,background:`${C.abyss}ee`,border:`1px solid ${getCol(c.spectrums)}22`,backdropFilter:"blur(12px)" }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6 }}>
          <span style={{ fontSize:11,color:C.light,fontFamily:"'DM Sans'" }}>{(fP||{}).name} ↔ {(tP||{}).name}</span>
          <span style={{ fontSize:10,color:getCol(c.spectrums),fontFamily:"'JetBrains Mono',monospace" }}>{c.strength}%</span>
        </div>
        <SpectrumBar data={c.spectrums} height={3} showLabels/>
      </div>);})()}
    <div style={{ display:"flex",justifyContent:"center",gap:12,marginTop:6 }}>
      {SPECTRUMS.map(s=>(<div key={s.key} style={{ display:"flex",alignItems:"center",gap:3 }}><div style={{ width:7,height:2,borderRadius:1,background:s.color }}/><span style={{ fontSize:8,color:C.dim,fontFamily:"'DM Sans'" }}>{s.label}</span></div>))}
    </div>
  </div>);
}


/* ═══════════════════════════════════════════════════════════════
   STIRRED BUTTON — The "found interesting" action
   Single tap. A ripple animation. Meaningful but effortless.
   ═══════════════════════════════════════════════════════════════ */

function StirredButton({ refId, count, onStir }) {
  const [isStirred, setIsStirred] = useState(false);
  const [ripple, setRipple] = useState(false);

  const handleStir = () => {
    if (isStirred) return;
    setIsStirred(true);
    setRipple(true);
    setTimeout(() => setRipple(false), 600);
    onStir && onStir(refId);
  };

  return (
    <button onClick={handleStir} style={{
      display:"flex", alignItems:"center", gap:6, padding:"8px 16px",
      borderRadius:12, position:"relative", overflow:"hidden",
      border:`1px solid ${isStirred ? C.stirred : C.ghost}`,
      background: isStirred ? `${C.stirred}12` : "transparent",
      color: isStirred ? C.stirred : C.mid,
      fontSize:12, fontFamily:"'DM Sans',sans-serif",
      transition:"all .3s ease",
    }}>
      {ripple && (
        <div style={{
          position:"absolute", left:"50%", top:"50%",
          width:20, height:20, borderRadius:"50%",
          background:C.stirred, transform:"translate(-50%,-50%)",
          animation:"rippleOut .6s ease-out forwards", pointerEvents:"none",
        }}/>
      )}
      <Ripple size={14}/>
      <span>{isStirred ? "Stirred" : "This stirred me"}</span>
      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10 }}>{count + (isStirred?1:0)}</span>
    </button>
  );
}


/* ═══════════════════════════════════════════════════════════════
   AUTH SYSTEM
   ═══════════════════════════════════════════════════════════════ */

function AuthScreen({ onAuth, lang, setLang }) {
  const [mode,setMode]=useState("landing");
  const [form,setForm]=useState({email:"",name:"",password:"",confirmPw:""});
  const [errors,setErrors]=useState({});
  const [step,setStep]=useState(0);
  const [values,setValues]=useState([]);
  const [bio,setBio]=useState("");
  const [photo,setPhoto]=useState(null);
  const [bgPhoto,setBgPhoto]=useState(null);
  const [showPw,setShowPw]=useState(false);
  const [phase,setPhase]=useState(0);
  const fileRef=useRef(null);

  useEffect(()=>{if(mode==="landing"){const t=[];[400,900,1400,2000].forEach((d,i)=>t.push(setTimeout(()=>setPhase(i+1),d)));return()=>t.forEach(clearTimeout);}
  },[mode]);

  const validate=()=>{const e={};if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))e.email="Valid email required";if(mode==="register"){if(form.name.length<2)e.name="Essence name required";if(form.password.length<8)e.password="Min 8 chars, uppercase & number";else if(!/[A-Z]/.test(form.password)||!/[0-9]/.test(form.password))e.password="Include uppercase and number";if(form.password!==form.confirmPw)e.confirmPw="Passwords don't match";}else if(!form.password)e.password="Required";setErrors(e);return !Object.keys(e).length;};

  const handleAuth=()=>{if(!validate())return;if(mode==="register")setMode("setup");else{setAuthLoading(true);apiLogin(form.email,form.password).then(function(res){setAuthLoading(false);if(res.error){setErrors({auth:res.error});onAuth({name:"You",email:form.email,bio:"",values:[],essencePoints:0,photo:null,profileBg:null,soulprint:[50,50,50,50,50,50,50,50],spectrum:{intelligence:50,understanding:50,communication:50,appreciation:50},rewards:{witnessed:0,stirred:0,illuminated:0,rippled:0},humanityIndex:{depth:50,empathy:50,criticalThinking:50,impact:50,consistency:50}})}else{onAuth(res.user)}})};};

  const finishSetup=()=>{
    var offlineUser={name:form.name,email:form.email,bio:bio,values:values,essencePoints:0,photo:photo,profileBg:bgPhoto,soulprint:[50,50,50,50,50,50,50,50],spectrum:{intelligence:50,understanding:50,communication:50,appreciation:50},rewards:{witnessed:0,stirred:0,illuminated:0,rippled:0},humanityIndex:{depth:50,empathy:50,criticalThinking:50,impact:50,consistency:50}};
    apiRegister(form.name,form.email,form.password).then(function(res){
      if(res.user){var u=res.user;u.bio=bio;u.values=values;u.photo=photo;u.profileBg=bgPhoto;onAuth(u);}
      else{onAuth(offlineUser);}
    });
  };

  const handlePhoto=(e)=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=(ev)=>setPhoto(ev.target.result);r.readAsDataURL(f);};

  const inp=(field)=>({width:"100%",padding:"14px 16px 14px 44px",borderRadius:12,background:C.surface,border:`1px solid ${errors[field]?C.warmth:C.ghost}`,color:C.light,fontSize:14,fontFamily:"'DM Sans',sans-serif"});

  if(mode==="landing")return(
    <div style={{ minHeight:"100vh",background:C.void,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 24px",position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",top:"12%",left:"25%",width:280,height:280,borderRadius:"50%",background:`radial-gradient(circle,${C.glow} 0%,transparent 70%)`,filter:"blur(80px)",pointerEvents:"none",animation:"breathe 7s ease-in-out infinite" }}/>
      <div style={{ position:"absolute",bottom:"18%",right:"20%",width:180,height:180,borderRadius:"50%",background:`radial-gradient(circle,${C.appreciation}15 0%,transparent 70%)`,filter:"blur(60px)",pointerEvents:"none",animation:"breathe 9s ease-in-out infinite 2s" }}/>
      <div style={{ opacity:phase>=1?1:0,transform:phase>=1?"none":"translateY(30px)",transition:"all 1.2s cubic-bezier(.16,1,.3,1)" }}>
        <div style={{ width:56,height:56,margin:"0 auto 24px",borderRadius:"50%",border:`2px solid ${C.ember}`,display:"flex",alignItems:"center",justifyContent:"center",animation:"pulseGlow 4s ease-in-out infinite" }}><Eye size={24} color={C.ember}/></div>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:52,fontWeight:300,color:C.light,letterSpacing:8,textAlign:"center",textTransform:"uppercase" }}>Lucid</h1>
        <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:C.mid,textAlign:"center",letterSpacing:3,marginTop:4,fontStyle:"italic" }}>{t("tagline",lang)}</p>
      </div>
      <div style={{ opacity:phase>=2?1:0,transform:phase>=2?"none":"translateY(20px)",transition:"all 1s cubic-bezier(.16,1,.3,1) .2s",marginTop:40,maxWidth:340,textAlign:"center" }}>
        <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:C.mid,lineHeight:1.8 }}>
          No scroll. You go <span style={{color:C.ember}}>deeper</span> — into experiences, emotions, and the people who feel what you feel. Every reflection generates its own visual aura. Every connection reveals itself through <span style={{color:C.intelligence}}>intelligence</span>, <span style={{color:C.understanding}}>understanding</span>, <span style={{color:C.communication}}>communication</span>, and <span style={{color:C.appreciation}}>appreciation</span>.
        </p>
      </div>
      <div style={{ opacity:phase>=3?1:0,transition:"all 1s ease .6s",marginTop:28,display:"flex",gap:16 }}>
        {SPECTRUMS.map(s=>(<div key={s.key} style={{ textAlign:"center" }}>
          <div style={{ width:38,height:38,borderRadius:"50%",background:`${s.color}10`,border:`1px solid ${s.color}22`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 4px" }}><s.icon size={16} color={s.color}/></div>
          <span style={{ fontSize:8,color:s.color,fontFamily:"'DM Sans'" }}>{s.label}</span>
        </div>))}
      </div>
      <div style={{ opacity:phase>=4?1:0,transform:phase>=4?"none":"translateY(20px)",transition:"all 1s cubic-bezier(.16,1,.3,1) .4s",marginTop:36,display:"flex",flexDirection:"column",gap:12,width:"100%",maxWidth:320 }}>
        <button onClick={()=>setMode("register")} style={{ padding:16,borderRadius:14,background:`linear-gradient(135deg,${C.ember},${C.kindle})`,color:C.void,fontSize:14,fontFamily:"'DM Sans',sans-serif",fontWeight:600,letterSpacing:1,boxShadow:`0 8px 32px ${C.glow}` }}>{t("begin",lang)}</button>
        <button onClick={()=>setMode("login")} style={{ padding:14,borderRadius:14,border:`1px solid ${C.ghost}`,color:C.mid,fontSize:13,fontFamily:"'DM Sans'" }}>{t("signIn",lang)}</button>
        {/* Language selector */}
        <div style={{ display:"flex",flexWrap:"wrap",justifyContent:"center",gap:6,marginTop:8 }}>
          {LANGUAGES.map(l=>(
            <button key={l.code} onClick={()=>setLang && setLang(l.code)} style={{
              padding:"4px 10px",borderRadius:8,fontSize:12,
              background:lang===l.code?`${C.ember}15`:`${C.surface}`,
              border:`1px solid ${lang===l.code?C.ember:C.ghost}33`,
              color:lang===l.code?C.ember:C.dim,
              fontFamily:"'DM Sans',sans-serif",
            }}>
              {l.flag} {l.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginTop:40, paddingTop:20, borderTop:"1px solid "+C.ghost+"15", width:"100%", maxWidth:320, textAlign:"center" }}>
        <p style={{ fontSize:10, color:C.ghost, fontFamily:"'DM Sans',sans-serif", lineHeight:1.6 }}>
          Created by <span style={{ color:C.ember, fontWeight:500 }}>Tony De Palma</span>
        </p>
        <p style={{ fontSize:9, color:C.ghost, fontFamily:"'DM Sans',sans-serif", marginTop:4, letterSpacing:0.5 }}>
          The Digital Human Social Platform
        </p>
      </div>
    </div>
  );

  if(mode==="setup"){
    const VALUES_OPTIONS=["Authenticity","Empathy","Courage","Curiosity","Gratitude","Justice","Creativity","Resilience","Kindness","Wisdom","Freedom","Integrity","Compassion","Growth","Presence","Humility","Connection","Purpose"];
    const steps=[
      <div key="p" className="di" style={{textAlign:"center"}}>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,color:C.light,fontWeight:400,marginBottom:6}}>Your presence</h2>
        <p style={{fontSize:13,color:C.mid,fontFamily:"'DM Sans'",marginBottom:28}}>A face behind the words.</p>
        <div onClick={()=>fileRef.current && fileRef.current.click()} style={{width:110,height:110,borderRadius:"50%",margin:"0 auto 20px",cursor:"pointer",border:`2px dashed ${photo?C.ember:C.ghost}`,background:photo?"none":C.surface,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
          {photo?<img src={photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<Camera size={26} color={C.dim}/>}
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{display:"none"}}/>
        <button onClick={()=>setStep(1)} style={{padding:"12px 40px",borderRadius:12,background:C.ember,color:C.void,fontSize:13,fontFamily:"'DM Sans'",fontWeight:600}}>{photo?"Continue":"Skip for now"}</button>
      </div>,
      <div key="v" className="di">
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,color:C.light,fontWeight:400,marginBottom:6,textAlign:"center"}}>What matters to you?</h2>
        <p style={{fontSize:13,color:C.mid,fontFamily:"'DM Sans'",marginBottom:20,textAlign:"center"}}>Choose up to 5.</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:7,justifyContent:"center",marginBottom:24}}>
          {VALUES_OPTIONS.map(v=>(<button key={v} onClick={()=>setValues(p=>p.includes(v)?p.filter(x=>x!==v):p.length<5?[...p,v]:p)} style={{padding:"7px 16px",borderRadius:22,border:`1px solid ${values.includes(v)?C.ember:C.ghost}`,background:values.includes(v)?`${C.ember}12`:"transparent",color:values.includes(v)?C.ember:C.dim,fontSize:13,fontFamily:"'DM Sans'"}}>{v}</button>))}
        </div>
        <button onClick={()=>values.length>=2&&setStep(2)} style={{width:"100%",padding:14,borderRadius:12,background:values.length>=2?C.ember:C.ghost,color:values.length>=2?C.void:C.dim,fontSize:13,fontFamily:"'DM Sans'",fontWeight:600}}>{values.length<2?`Choose at least 2 (${values.length}/5)`:"Continue"}</button>
      </div>,
      <div key="b" className="di">
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,color:C.light,fontWeight:400,marginBottom:6,textAlign:"center"}}>Your essence</h2>
        <textarea value={bio} onChange={e=>setBio(e.target.value)} rows={3} placeholder="I'm someone who..."
          style={{width:"100%",padding:16,borderRadius:12,background:C.surface,border:`1px solid ${C.ghost}`,color:C.light,fontSize:14,fontFamily:"'Cormorant Garamond',serif",lineHeight:1.7,resize:"none",marginBottom:12}}/>
        {/* Background photo */}
        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,color:C.light,fontFamily:"'DM Sans'",marginBottom:6}}>Profile background <span style={{color:C.dim}}>(optional)</span></div>
          <div onClick={function(){var el=document.getElementById("bg-setup-input");if(el)el.click()}} style={{
            width:"100%",height:bgPhoto?80:50,borderRadius:12,overflow:"hidden",cursor:"pointer",
            border:"1px dashed "+(bgPhoto?C.ember:C.ghost),
            background:bgPhoto?"none":C.surface,
            display:"flex",alignItems:"center",justifyContent:"center",
          }}>
            {bgPhoto ? (
              <img src={bgPhoto} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            ) : (
              <span style={{fontSize:11,color:C.dim,fontFamily:"'DM Sans'"}}>Tap to add a cover photo</span>
            )}
          </div>
          <input id="bg-setup-input" type="file" accept="image/*" onChange={function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(ev){setBgPhoto(ev.target.result)};r.readAsDataURL(f)}} style={{display:"none"}}/>
        </div>
        {/* Community guidelines */}
        <div style={{padding:"12px 14px",borderRadius:10,background:`${C.understanding}06`,border:`1px solid ${C.understanding}12`,marginBottom:16}}>
          <div style={{fontSize:11,color:C.understanding,fontFamily:"'DM Sans'",fontWeight:500,marginBottom:8,display:"flex",alignItems:"center",gap:6}}><Shield size={12}/>Community soul contract</div>
          {GUIDELINES.map((g,i)=>(<div key={i} style={{fontSize:10,color:C.mid,fontFamily:"'DM Sans'",lineHeight:1.5,paddingLeft:12,marginBottom:3,position:"relative"}}><span style={{position:"absolute",left:0,color:C.understanding}}>·</span>{g}</div>))}
        </div>
        <button onClick={finishSetup} style={{width:"100%",padding:16,borderRadius:14,background:`linear-gradient(135deg,${C.ember},${C.kindle})`,color:C.void,fontSize:14,fontFamily:"'DM Sans'",fontWeight:600,boxShadow:`0 8px 24px ${C.glow}`}}>Enter LUCID</button>
      </div>,
    ];
    return(<div style={{minHeight:"100vh",background:C.void,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 24px"}}>
      <DepthNav depth={step} labels={["Presence","Values","Essence"]}/><div style={{width:"100%",maxWidth:380,marginTop:28}}>{steps[step]}</div>
    </div>);
  }

  return(
    <div style={{minHeight:"100vh",background:C.void,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 24px"}}>
      <button onClick={()=>setMode("landing")} style={{position:"absolute",top:24,left:24,color:C.mid,display:"flex",alignItems:"center",gap:6,fontSize:13,fontFamily:"'DM Sans'"}}><ArrowLeft size={16}/>Back</button>
      <Eye size={28} color={C.ember} style={{marginBottom:16}}/>
      <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,color:C.light,fontWeight:400,marginBottom:4}}>{mode==="register"?"Create your essence":"Welcome back"}</h2>
      <p style={{fontSize:13,color:C.mid,fontFamily:"'DM Sans'",marginBottom:28}}>{mode==="register"?"Your journey to depth":"Your reflections are waiting"}</p>
      <div style={{width:"100%",maxWidth:340,display:"flex",flexDirection:"column",gap:12}}>
        {mode==="register"&&<div style={{position:"relative"}}><User size={16} color={C.dim} style={{position:"absolute",left:14,top:15}}/><input placeholder="Essence name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={inp("name")}/>{errors.name&&<span style={{fontSize:11,color:C.warmth,display:"block",marginTop:3,fontFamily:"'DM Sans'"}}>{errors.name}</span>}</div>}
        <div style={{position:"relative"}}><Mail size={16} color={C.dim} style={{position:"absolute",left:14,top:15}}/><input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={inp("email")}/>{errors.email&&<span style={{fontSize:11,color:C.warmth,display:"block",marginTop:3,fontFamily:"'DM Sans'"}}>{errors.email}</span>}</div>
        <div style={{position:"relative"}}><KeyRound size={16} color={C.dim} style={{position:"absolute",left:14,top:15}}/><input type={showPw?"text":"password"} placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} style={inp("password")}/><button onClick={()=>setShowPw(!showPw)} style={{position:"absolute",right:14,top:14,color:C.dim}}><Eye size={16}/></button>{errors.password&&<span style={{fontSize:11,color:C.warmth,display:"block",marginTop:3,fontFamily:"'DM Sans'"}}>{errors.password}</span>}</div>
        {mode==="register"&&<div style={{position:"relative"}}><Shield size={16} color={C.dim} style={{position:"absolute",left:14,top:15}}/><input type="password" placeholder="Confirm password" value={form.confirmPw} onChange={e=>setForm({...form,confirmPw:e.target.value})} style={inp("confirmPw")}/>{errors.confirmPw&&<span style={{fontSize:11,color:C.warmth,display:"block",marginTop:3,fontFamily:"'DM Sans'"}}>{errors.confirmPw}</span>}</div>}
        {mode==="register"&&<div style={{fontSize:11,color:C.dim,fontFamily:"'DM Sans'",padding:"0 4px"}}><Lock size={10} style={{marginRight:4,verticalAlign:"middle"}}/>256-bit encrypted · Never shared · You own your data</div>}
        <button onClick={handleAuth} style={{padding:16,borderRadius:14,background:`linear-gradient(135deg,${C.ember},${C.kindle})`,color:C.void,fontSize:14,fontFamily:"'DM Sans'",fontWeight:600,marginTop:8,boxShadow:`0 8px 24px ${C.glow}`}}>{mode==="register"?"Create Essence":"Enter"}</button>
        <button onClick={()=>setMode(mode==="register"?"login":"register")} style={{color:C.mid,fontSize:13,fontFamily:"'DM Sans'",marginTop:4}}>{mode==="register"?"Already have an essence? Sign in":"New here? Create your essence"}</button>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   DEPTH EXPERIENCE
   ═══════════════════════════════════════════════════════════════ */

function DepthExperience({ user }) {
  const [depth,setDepth]=useState(0);
  const [selRef,setSelRef]=useState(null);
  const [selPerson,setSelPerson]=useState(null);
  const [illText,setIllText]=useState("");
  const [illSpectrum,setIllSpectrum]=useState(null);
  const [illuminated,setIlluminated]=useState({});
  const [modWarn,setModWarn]=useState(null);

  const goDeep=(ref)=>{setSelRef(ref);setDepth(1);};
  const goConns=()=>setDepth(2);
  const goEssence=(pid)=>{setSelPerson(PEOPLE[pid]);setDepth(3);};
  const goBack=()=>{if(depth===3){setSelPerson(null);setDepth(2);}else if(depth===2)setDepth(1);else if(depth===1){setSelRef(null);setDepth(0);}};

  const handleIlluminate=(refId)=>{
    const check=moderateContent(illText);
    if(!check.safe){setModWarn(check.message);return;}
    if(illText.length>=10&&illSpectrum){
      setIlluminated({...illuminated,[refId]:{text:illText,spectrum:illSpectrum}});
      setIllText("");setIllSpectrum(null);setModWarn(null);
    }
  };

  const labels=["Surface","Current","Connections","Essence"];

  // ── Surface ──
  const L0=()=>(
    <div className="di" style={{padding:"0 20px",paddingBottom:100,overflowY:"auto",maxHeight:"calc(100vh - 140px)"}}>
      <div className="ri" style={{marginBottom:24}}>
        <p style={{fontSize:14,color:C.mid,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",lineHeight:1.6}}>Three chapters today. Each holds a human experience and its own visual aura — born from the emotions within.</p>
      </div>
      {REFLECTIONS.map((ref,i)=>{
        const au=PEOPLE[ref.authorId],tier=getTier(au.essencePoints);
        return(
          <div key={ref.id} className={`ri ri${i+1}`} onClick={()=>goDeep(ref)} style={{background:C.abyss,borderRadius:18,marginBottom:16,cursor:"pointer",border:`1px solid ${C.ghost}`,overflow:"hidden"}}>
            {/* User's experience photo */}
            <SoulCard author={au} photo={ref.photo} emotions={ref.emotions} height={140} borderRadiusTop/>
            <div style={{padding:"18px 18px 20px"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                <Avatar name={au.name} size={32} color={tier.color} photo={au.photo}/>
                <div style={{flex:1}}>
                  <span style={{fontSize:13,color:C.light,fontFamily:"'DM Sans'",fontWeight:500}}>{au.name}</span>
                  <span style={{fontSize:9,color:tier.color,fontFamily:"'JetBrains Mono',monospace",marginLeft:8,padding:"2px 6px",borderRadius:6,background:`${tier.color}10`}}>{tier.name}</span>
                </div>
              </div>
              <div style={{fontSize:10,color:C.ember,fontFamily:"'DM Sans'",padding:"3px 9px",borderRadius:7,background:`${C.ember}08`,display:"inline-block",marginBottom:10}}>
                <Flame size={9} style={{marginRight:3,verticalAlign:"middle"}}/>{ref.spark}
              </div>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:C.light,lineHeight:1.7,display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden",marginBottom:12}}>{ref.text}</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
                {ref.emotions.map(em=><EmChip key={em} emotion={em} active small/>)}
              </div>
              {/* Reward metrics */}
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",borderRadius:10,background:`${C.surface}66`}}>
                <RewardBar rewards={ref.rewards} compact/>
                <span style={{fontSize:11,color:C.ember,fontFamily:"'DM Sans'",display:"flex",alignItems:"center",gap:4}}>Deeper <ArrowRight size={13}/></span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // ── Current ──
  const L1=()=>{
    if(!selRef)return null;
    const r=selRef,au=PEOPLE[r.authorId],tier=getTier(au.essencePoints);
    const ill=illuminated[r.id];
    return(
      <div className="di" style={{padding:"0 20px",paddingBottom:100,overflowY:"auto",maxHeight:"calc(100vh - 140px)"}}>
        <div className="ri" onClick={()=>goEssence(r.authorId)} style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,padding:14,borderRadius:14,background:C.abyss,border:`1px solid ${tier.color}15`,cursor:"pointer"}}>
          <Avatar name={au.name} size={42} color={tier.color} photo={au.photo}/>
          <div style={{flex:1}}>
            <div style={{fontSize:14,color:C.light,fontFamily:"'DM Sans'",fontWeight:500}}>{au.name}</div>
            <div style={{fontSize:12,color:C.mid,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic"}}>{au.bio}</div>
          </div>
          <ChevronRight size={16} color={C.dim}/>
        </div>

        <div className="ri ri1" style={{borderRadius:18,overflow:"hidden",marginBottom:16,border:`1px solid ${C.ghost}`}}>
          <SoulCard author={au} photo={r.photo} emotions={r.emotions} height={180} borderRadiusTop/>
          <div style={{padding:"20px 20px 22px",background:C.abyss}}>
            <div style={{fontSize:11,color:C.ember,fontFamily:"'DM Sans'",padding:"3px 10px",borderRadius:8,background:`${C.ember}08`,display:"inline-block",marginBottom:14}}>
              <Flame size={10} style={{marginRight:4,verticalAlign:"middle"}}/>{r.spark}
            </div>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:C.light,lineHeight:1.85}}>{r.text}</p>
          </div>
        </div>

        <div className="ri ri2" style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:14}}>
          {r.emotions.map(em=><EmChip key={em} emotion={em} active/>)}
        </div>

        {/* Reward metrics full */}
        <div className="ri ri2" style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
          {REWARDS.map(rw=>(
            <div key={rw.key} style={{display:"flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:10,background:`${rw.color}08`,border:`1px solid ${rw.color}15`}}>
              <rw.icon size={13} color={rw.color}/>
              <span style={{fontSize:11,color:rw.color,fontFamily:"'JetBrains Mono',monospace"}}>{r.rewards[rw.key]}</span>
              <span style={{fontSize:9,color:C.dim,fontFamily:"'DM Sans'"}}>{rw.label}</span>
            </div>
          ))}
        </div>

        {/* Stirred button + Illuminate */}
        <div className="ri ri3" style={{display:"flex",gap:8,marginBottom:16}}>
          <StirredButton refId={r.id} count={r.rewards.stirred}/>
        </div>

        {/* Illuminate */}
        <div className="ri ri3" style={{background:C.abyss,borderRadius:16,padding:18,border:`1px solid ${ill?C.understanding:C.ghost}18`,marginBottom:16}}>
          {ill?(
            <div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <Sparkles size={15} color={(SPECTRUMS.find(s => s.key===ill.spectrum) || {}).color}/>
                <span style={{fontSize:13,color:C.light,fontFamily:"'DM Sans'",fontWeight:500}}>You illuminated this</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                {(()=>{const s=SPECTRUMS.find(x=>x.key===ill.spectrum);return s?<span style={{fontSize:10,color:s.color,fontFamily:"'DM Sans'",padding:"3px 9px",borderRadius:8,background:`${s.color}10`}}><s.icon size={10} style={{marginRight:3,verticalAlign:"middle"}}/>{s.label}</span>:null;})()}
              </div>
              <p style={{fontSize:13,color:C.mid,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",lineHeight:1.6}}>"{ill.text}"</p>
            </div>
          ):(
            <div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <Sparkles size={15} color={C.ember}/>
                <span style={{fontSize:13,color:C.light,fontFamily:"'DM Sans'",fontWeight:500}}>Illuminate — go deeper than stirred</span>
              </div>
              <p style={{fontSize:12,color:C.mid,fontFamily:"'DM Sans'",lineHeight:1.5,marginBottom:12}}>Choose the path of connection and tell them why.</p>
              <div style={{display:"flex",gap:5,marginBottom:12,flexWrap:"wrap"}}>
                {SPECTRUMS.map(s=>(<button key={s.key} onClick={()=>setIllSpectrum(s.key)} style={{flex:"1 1 45%",padding:"9px 6px",borderRadius:10,border:`1px solid ${illSpectrum===s.key?s.color:C.ghost}`,background:illSpectrum===s.key?`${s.color}10`:"transparent",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                  <s.icon size={14} color={illSpectrum===s.key?s.color:C.dim}/><span style={{fontSize:10,color:illSpectrum===s.key?s.color:C.dim,fontFamily:"'DM Sans'",fontWeight:500}}>{s.label}</span><span style={{fontSize:8,color:C.dim,fontFamily:"'DM Sans'"}}>{s.desc}</span>
                </button>))}
              </div>
              <textarea value={illText} onChange={e=>{setIllText(e.target.value);setModWarn(null);}} placeholder="Why did this resonate..."
                style={{width:"100%",minHeight:60,padding:12,borderRadius:10,background:C.surface,border:`1px solid ${modWarn?C.warmth:C.ghost}`,color:C.light,fontSize:13,fontFamily:"'Cormorant Garamond',serif",lineHeight:1.6,resize:"none"}}/>
              {modWarn&&<div style={{display:"flex",alignItems:"flex-start",gap:6,marginTop:8,padding:"8px 12px",borderRadius:8,background:`${C.warmth}08`,border:`1px solid ${C.warmth}20`}}>
                <AlertTriangle size={13} color={C.warmth} style={{flexShrink:0,marginTop:1}}/>
                <span style={{fontSize:11,color:C.warmth,fontFamily:"'DM Sans'",lineHeight:1.4}}>{modWarn}</span>
              </div>}
              <button onClick={()=>handleIlluminate(r.id)} disabled={illText.length<10||!illSpectrum} style={{width:"100%",padding:12,borderRadius:10,marginTop:10,background:illText.length>=10&&illSpectrum?C.ember:C.ghost,color:illText.length>=10&&illSpectrum?C.void:C.dim,fontSize:13,fontFamily:"'DM Sans'",fontWeight:600}}>
                {!illSpectrum?"Choose a path":illText.length<10?"Write why...":"Illuminate"}
              </button>
            </div>
          )}
        </div>

        {/* Others who illuminated */}
        <div className="ri ri4" style={{marginBottom:16}}>
          <div style={{fontSize:11,color:C.mid,fontFamily:"'DM Sans'",marginBottom:10}}>Others who saw this clearly</div>
          {r.illuminations.map((il,i)=>{const p=PEOPLE[il.userId],t=getTier(p.essencePoints),s=SPECTRUMS.find(x=>x.key===il.spectrum);return(
            <div key={i} onClick={()=>goEssence(il.userId)} style={{display:"flex",gap:10,padding:12,borderRadius:12,background:C.abyss,border:`1px solid ${C.ghost}`,marginBottom:6,cursor:"pointer",borderLeft:`3px solid ${(s||{}).color||C.ember}`}}>
              <Avatar name={p.name} size={28} color={t.color} photo={p.photo}/>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:3}}>
                  <span style={{fontSize:12,color:C.light,fontFamily:"'DM Sans'"}}>{p.name}</span>
                  {s&&<span style={{fontSize:8,color:s.color,fontFamily:"'DM Sans'",padding:"2px 6px",borderRadius:5,background:`${s.color}10`}}>{s.label}</span>}
                </div>
                <p style={{fontSize:11,color:C.mid,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",lineHeight:1.5}}>"{il.text}"</p>
              </div>
            </div>
          );})}
        </div>

        <button onClick={goConns} style={{width:"100%",padding:14,borderRadius:14,border:`1px solid ${C.appreciation}22`,background:`${C.appreciation}06`,display:"flex",alignItems:"center",justifyContent:"center",gap:8,color:C.appreciation,fontSize:13,fontFamily:"'DM Sans'",fontWeight:500}}>
          <Orbit size={16}/> See the connection paths beneath
        </button>
      </div>
    );
  };

  // ── Connections ──
  const L2=()=>{
    if(!selRef)return null;const r=selRef,au=PEOPLE[r.authorId];
    return(
      <div className="di" style={{padding:"0 20px",paddingBottom:100,overflowY:"auto",maxHeight:"calc(100vh - 140px)"}}>
        <div className="ri" style={{textAlign:"center",marginBottom:20}}>
          <Orbit size={20} color={C.appreciation} style={{margin:"0 auto 8px"}}/>
          <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:C.light,fontWeight:400}}>Connection paths</h3>
          <p style={{fontSize:12,color:C.mid,fontFamily:"'DM Sans'",marginTop:4}}>How {au.name}'s experience connects through spectrum paths</p>
        </div>
        <div className="ri ri1" style={{background:C.abyss,borderRadius:16,padding:14,border:`1px solid ${C.ghost}`,marginBottom:16}}>
          <ConstellationMap focusId={r.authorId} onSelectPerson={goEssence}/>
        </div>
        {r.connections.map((conn,i)=>{
          const target=REFLECTIONS.find(x=>x.id===conn.toId);if(!target)return null;
          const tAuth=PEOPLE[target.authorId],tTier=getTier(tAuth.essencePoints),spec=SPECTRUMS.find(s=>s.key===conn.spectrum);
          return(
            <div key={i} className={`ri ri${i+2}`} style={{marginBottom:16}}>
              <div style={{textAlign:"center",marginBottom:10}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"7px 16px",borderRadius:20,background:`${(spec||{}).color}08`,border:`1px solid ${(spec||{}).color}18`}}>
                  {spec&&<spec.icon size={13} color={spec.color}/>}
                  <span style={{fontSize:12,color:(spec||{}).color,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic"}}>"{conn.sharedPhrase}"</span>
                </div>
                <div style={{margin:"5px auto",width:1,height:14,background:`${(spec||{}).color}30`}}/>
                <span style={{fontSize:10,color:(spec||{}).color,fontFamily:"'JetBrains Mono',monospace"}}>{(spec||{}).label} · {conn.strength}%</span>
              </div>
              <div onClick={()=>{setSelRef(target);setDepth(1);}} style={{background:C.abyss,borderRadius:14,padding:14,border:`1px solid ${(spec||{}).color}12`,cursor:"pointer",borderLeft:`3px solid ${(spec||{}).color}35`}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                  <Avatar name={tAuth.name} size={28} color={tTier.color} photo={tAuth.photo}/>
                  <span style={{fontSize:12,color:C.light,fontFamily:"'DM Sans'"}}>{tAuth.name}</span>
                  <button onClick={e=>{e.stopPropagation();goEssence(target.authorId);}} style={{marginLeft:"auto",fontSize:10,color:C.mid,fontFamily:"'DM Sans'",display:"flex",alignItems:"center",gap:3}}>Essence <ChevronRight size={11}/></button>
                </div>
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:C.light,lineHeight:1.7,display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{target.text}</p>
                <div style={{marginTop:8}}><RewardBar rewards={target.rewards} compact/></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ── Essence ──
  const L3=()=>{
    if(!selPerson)return null;const p=selPerson,tier=getTier(p.essencePoints);
    return(
      <div className="di" style={{padding:"0 20px",paddingBottom:100,overflowY:"auto",maxHeight:"calc(100vh - 140px)"}}>
        {/* Profile header — large, centered */}
        <div className="ri" style={{textAlign:"center",marginBottom:18,padding:"28px 18px 24px",background:`linear-gradient(180deg,${tier.color}06,transparent)`,borderRadius:20,border:`1px solid ${tier.color}12`,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:"30%",left:"50%",transform:"translate(-50%,-50%)",width:160,height:160,borderRadius:"50%",background:`radial-gradient(circle,${tier.color}08 0%,transparent 70%)`,filter:"blur(30px)",pointerEvents:"none"}}/>
          <div style={{width:80,height:80,borderRadius:"50%",margin:"0 auto 14px",overflow:"hidden",border:`3px solid ${tier.color}25`,boxShadow:`0 0 20px ${tier.color}12`,background:`linear-gradient(135deg,${tier.color}20,${tier.color}08)`,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:30,color:tier.color,fontFamily:"'Cormorant Garamond',serif",fontWeight:600}}>{p.name[0]}</span>
          </div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,color:C.light,fontWeight:400,marginBottom:6}}>{p.name}</h2>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 14px",borderRadius:14,background:`${tier.color}10`,border:`1px solid ${tier.color}18`}}>
            <div style={{width:5,height:5,borderRadius:3,background:tier.color,boxShadow:`0 0 6px ${tier.color}44`}}/>
            <span style={{fontSize:11,color:tier.color,fontFamily:"'JetBrains Mono',monospace"}}>{tier.name} · {p.essencePoints} LP</span>
          </div>
        </div>

        {/* Torchbearer badge — prominent if earned */}
        {p.torchbearer && <div className="ri ri1" style={{marginBottom:14}}><TorchbearerBadge person={p} large/></div>}

        {/* Their essence — evolved bio */}
        <div className="ri ri1" style={{background:C.abyss,borderRadius:16,padding:18,marginBottom:14,border:`1px solid ${C.ghost}`}}>
          <div style={{fontSize:10,color:C.ember,fontFamily:"'DM Sans'",letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Their essence</div>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:C.light,lineHeight:1.8}}>{p.evolvedBio}</p>
        </div>



        {/* Journey Map — their growth path */}
        <div className="ri ri3" style={{marginBottom:14}}>
          <div style={{fontSize:10,color:C.mid,fontFamily:"'DM Sans'",letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>
            {p.name}'s journey
          </div>
          <JourneyMap person={p} compact/>
        </div>

        {/* Connection spectrum */}
        <div className="ri ri4" style={{background:C.abyss,borderRadius:14,padding:16,marginBottom:12,border:`1px solid ${C.ghost}`}}>
          <div style={{fontSize:10,color:C.mid,fontFamily:"'DM Sans'",letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>How they connect</div>
          {SPECTRUMS.map(s=>(<div key={s.key} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <s.icon size={13} color={s.color} style={{flexShrink:0}}/>
            <div style={{flex:1,height:4,borderRadius:2,background:`${C.ghost}33`}}><div style={{width:`${p.spectrum[s.key]}%`,height:"100%",borderRadius:2,background:s.color}}/></div>
            <span style={{fontSize:10,color:s.color,fontFamily:"'JetBrains Mono',monospace",width:24,textAlign:"right"}}>{p.spectrum[s.key]}</span>
          </div>))}
        </div>

        {/* Stats */}
        <div style={{display:"flex",gap:8}}>
          {[{v:p.reflCount,l:"Reflections",c:C.ember},{v:p.connections,l:"Connections",c:C.understanding},{v:p.depthReach,l:"Depth",c:C.appreciation}].map((s,i)=>(<div key={i} style={{flex:1,textAlign:"center",padding:14,borderRadius:12,background:C.abyss,border:`1px solid ${C.ghost}`}}>
            <div style={{fontSize:18,color:s.c,fontFamily:"'Cormorant Garamond',serif",fontWeight:600}}>{s.v}</div>
            <div style={{fontSize:8,color:C.dim,fontFamily:"'DM Sans'",letterSpacing:.5,textTransform:"uppercase",marginTop:2}}>{s.l}</div>
          </div>))}
        </div>
      </div>
    );
  };

  const layers=[L0,L1,L2,L3];
  return(<div style={{height:"100%",display:"flex",flexDirection:"column",overflow:"hidden"}}>
    <div style={{padding:"10px 20px",display:"flex",alignItems:"center",gap:12}}>
      {depth>0&&<button onClick={goBack} style={{color:C.mid,display:"flex",alignItems:"center",gap:4,fontSize:12,fontFamily:"'DM Sans'"}}><ArrowLeft size={16}/>Back</button>}
      <div style={{marginLeft:depth>0?"auto":0}}><DepthNav depth={depth} labels={labels}/></div>
    </div>
    <div style={{flex:1,overflowY:"auto"}} key={`d${depth}-${(selRef||{}).id}-${(selPerson||{}).id}`}>{layers[depth]()}</div>
  </div>);
}


/* ═══════════════════════════════════════════════════════════════
   MY ESSENCE (profile with rewards)
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   ESSENCE BLOOM — A living visual profile
   No dashboard. No data bars. A blooming organism that grows
   with mindfulness, morality, empathy, kindness, courage, wisdom.
   Each quality is a visual petal you can expand.
   ═══════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════
   THE DIGITAL SOUL — Unified Profile Experience
   Created by Tony De Palma
   
   Not two charts. Not a dashboard. A living, breathing
   representation of a human being — explored by moving
   FORWARD through depth layers, not scrolling.
   
   Layer 0: Soul Surface — photo + unified trait ring
   Layer 1: Active Soul — recent emotions, growth pulse
   Layer 2: Connection Web — who shapes them
   Layer 3: Life Reel — reflections and experiences
   Layer 4: Core Essence — values, deepest insights
   ═══════════════════════════════════════════════════════════════ */

const SOUL_TRAITS = [
  { key:"depth",     label:"Depth",     color:"#E8A838", angle:0 },
  { key:"empathy",   label:"Empathy",   color:"#4AE8C4", angle:1 },
  { key:"critical",  label:"Critical Thinking", color:"#5B8DEF", angle:2 },
  { key:"mindfulness",label:"Mindfulness",color:"#5BB8EF", angle:3 },
  { key:"courage",   label:"Courage",   color:"#E85B8D", angle:4 },
  { key:"kindness",  label:"Kindness",  color:"#E88A5B", angle:5 },
  { key:"morality",  label:"Morality",  color:"#E8C84A", angle:6 },
  { key:"wisdom",    label:"Wisdom",    color:"#A86BDB", angle:7 },
];

function DigitalSoulViz({ user, size, traitData }) {
  var cx = size/2, cy = size/2, maxR = size/2 - 50;
  var n = SOUL_TRAITS.length;
  var step = (2 * Math.PI) / n;
  var tier = getTier(user.essencePoints || 0);

  // Build the unified soul shape
  var pathPoints = SOUL_TRAITS.map(function(trait, i) {
    var angle = i * step - Math.PI/2;
    var val = ((traitData || {})[trait.key] || 40) / 100;
    var r = 0.3 * maxR + val * maxR * 0.7;
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, val: val };
  });

  var pathD = pathPoints.map(function(p, i) { return (i===0?"M":"L") + p.x + "," + p.y; }).join(" ") + " Z";

  // Smooth path using bezier curves
  var smoothD = "M" + pathPoints[0].x + "," + pathPoints[0].y;
  for (var i = 0; i < pathPoints.length; i++) {
    var curr = pathPoints[i];
    var next = pathPoints[(i + 1) % pathPoints.length];
    var cpx = (curr.x + next.x) / 2;
    var cpy = (curr.y + next.y) / 2;
    smoothD += " Q" + curr.x + "," + curr.y + " " + cpx + "," + cpy;
  }
  smoothD += " Z";

  var photoR = size * 0.13;

  return (
    <div style={{ position:"relative", width:size, height:size, margin:"0 auto" }}>
      <svg width={size} height={size} viewBox={"0 0 "+size+" "+size} style={{ position:"absolute", inset:0 }}>
        <defs>
          <filter id="soulGlow"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="soulGlowL"><feGaussianBlur stdDeviation="12" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <radialGradient id="soulCenter">
            <stop offset="0%" stopColor={tier.color} stopOpacity="0.15"/>
            <stop offset="100%" stopColor={tier.color} stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Ambient glow */}
        <circle cx={cx} cy={cy} r={maxR * 0.7} fill="url(#soulCenter)" filter="url(#soulGlowL)"/>

        {/* Guide rings */}
        {[0.33, 0.66, 1].map(function(s, ri) {
          var ring = SOUL_TRAITS.map(function(_, j) {
            var a = j * step - Math.PI/2;
            return (j===0?"M":"L") + (cx+Math.cos(a)*maxR*s) + "," + (cy+Math.sin(a)*maxR*s);
          }).join(" ") + " Z";
          return <path key={ri} d={ring} fill="none" stroke={C.ghost} strokeWidth="0.5" opacity="0.15"/>;
        })}

        {/* Axis lines */}
        {SOUL_TRAITS.map(function(trait, i) {
          var a = i * step - Math.PI/2;
          return <line key={i} x1={cx} y1={cy} x2={cx+Math.cos(a)*maxR} y2={cy+Math.sin(a)*maxR} stroke={C.ghost} strokeWidth="0.3" opacity="0.12"/>;
        })}

        {/* Soul shape — the unified form */}
        <path d={smoothD} fill={tier.color+"0D"} stroke={tier.color} strokeWidth="2" opacity="0.85"
          filter="url(#soulGlow)" style={{ animation:"breathe 6s ease-in-out infinite" }}/>

        {/* Trait nodes + labels */}
        {SOUL_TRAITS.map(function(trait, i) {
          var angle = i * step - Math.PI/2;
          var val = ((traitData || {})[trait.key] || 40) / 100;
          var r = 0.3 * maxR + val * maxR * 0.7;
          var px = cx + Math.cos(angle) * r;
          var py = cy + Math.sin(angle) * r;
          var lx = cx + Math.cos(angle) * (maxR + 28);
          var ly = cy + Math.sin(angle) * (maxR + 28);
          var nodeR = 4 + val * 6;

          return (
            <g key={trait.key}>
              {/* Glow */}
              <circle cx={px} cy={py} r={nodeR + 5} fill={trait.color} opacity={0.1}
                style={{ animation:"breathe "+(4+i*0.3)+"s ease-in-out infinite "+(i*0.2)+"s" }}/>
              {/* Node */}
              <circle cx={px} cy={py} r={nodeR} fill={trait.color} opacity={0.8}/>
              <circle cx={px} cy={py} r={nodeR * 0.35} fill={C.light} opacity={0.7}/>
              {/* Label */}
              <text x={lx} y={ly} textAnchor="middle" fill={trait.color} opacity="0.85"
                style={{ fontSize:"10px", fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>
                {trait.label}
              </text>
              {/* Value */}
              <text x={lx} y={ly + 13} textAnchor="middle" fill={trait.color}
                style={{ fontSize:"12px", fontFamily:"'JetBrains Mono',monospace", fontWeight:600 }}>
                {(traitData || {})[trait.key] || 40}
              </text>
            </g>
          );
        })}

        {/* Photo ring */}
        <circle cx={cx} cy={cy} r={photoR + 4} fill="none" stroke={tier.color} strokeWidth="2.5" opacity="0.5"/>
        <circle cx={cx} cy={cy} r={photoR + 10} fill="none" stroke={tier.color} strokeWidth="0.5" opacity="0.15"
          style={{ animation:"breathe 5s ease-in-out infinite" }}/>
      </svg>

      {/* Photo overlay */}
      <div style={{
        position:"absolute",
        left: cx - photoR, top: cy - photoR,
        width: photoR*2, height: photoR*2,
        borderRadius:"50%", overflow:"hidden",
        border:"2.5px solid "+tier.color+"55",
        boxShadow:"0 0 24px "+tier.color+"18",
      }}>
        {user.photo ? (
          <img src={user.photo} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
        ) : (
          <div style={{
            width:"100%", height:"100%",
            background:"linear-gradient(135deg, "+tier.color+"25, "+tier.color+"08)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize: photoR * 0.7, color:tier.color,
            fontFamily:"'Cormorant Garamond',serif", fontWeight:600,
          }}>
            {(user.name || "?")[0].toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SOUL REEL — Forward-moving exploration of a person
   Each depth layer reveals more. Not scrolling — advancing.
   ═══════════════════════════════════════════════════════════════ */

function MyEssence({user, lang}) {
  var tier = getTier(user.essencePoints || 0);
  var currentLang = lang || "en";
  var _depth = useState(0); var soulDepth = _depth[0]; var setSoulDepth = _depth[1];
  var _loc = useState(null); var userLocation = _loc[0]; var setUserLocation = _loc[1];
  var _bg = useState(user.profileBg || null); var profileBg = _bg[0]; var setProfileBg = _bg[1];
  var bgRef = useRef(null);

  var handleBgUpload = function(e) {
    var f = e.target.files[0]; if (!f) return;
    var r = new FileReader(); r.onload = function(ev) { setProfileBg(ev.target.result); }; r.readAsDataURL(f);
  };

  useEffect(function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(pos) { setUserLocation({ display:pos.coords.latitude.toFixed(1)+"°, "+pos.coords.longitude.toFixed(1)+"°" }); },
        function() { setUserLocation({ display:"Location not shared" }); },
        { timeout:5000 }
      );
    }
  }, []);

  // Unified trait data — merges humanity index + qualities
  var traitData = {
    depth: (user.humanityIndex || {}).depth || 50,
    empathy: (user.humanityIndex || {}).empathy || 50,
    critical: (user.humanityIndex || {}).critical_thinking || 50,
    mindfulness: 40 + Math.min(50, (user.essencePoints || 0) / 25),
    courage: 35 + Math.min(55, (user.essencePoints || 0) / 20),
    kindness: 45 + Math.min(45, (user.essencePoints || 0) / 22),
    morality: 50 + Math.min(40, (user.essencePoints || 0) / 30),
    wisdom: 30 + Math.min(60, (user.essencePoints || 0) / 18),
  };

  var avg = SOUL_TRAITS.reduce(function(s, t) { return s + (traitData[t.key] || 40); }, 0) / SOUL_TRAITS.length;

  var SOUL_LAYERS = ["Soul", "Growth", "Connections", "Experiences", "Core"];

  // Dynamic activity
  var ACTIVITY = [
    { text:"Your spark was accepted by 3 people", time:"2h", color:C.ember },
    { text:"Solace illuminated your reflection", time:"4h", color:C.illuminated },
    { text:"12 people were stirred today", time:"6h", color:C.stirred },
    { text:"Empathy score increased +3", time:"1d", color:C.understanding },
    { text:"Courage growing from recent sparks", time:"2d", color:C.warmth },
  ];

  // ── Layer renderers ──
  var renderLayer0 = function() {
    return (
      <div className="di" style={{ textAlign:"center" }}>
        {/* Background upload */}
        <div onClick={function(){bgRef.current && bgRef.current.click()}} style={{
          width:"100%", height:profileBg ? 100 : 40, cursor:"pointer",
          background:profileBg ? "none" : C.abyss,
          borderRadius:"16px 16px 0 0", overflow:"hidden", marginBottom:profileBg ? -30 : 0,
          border:"1px solid "+C.ghost, borderBottom:"none",
        }}>
          {profileBg ? (
            <img src={profileBg} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.5)" }}/>
          ) : (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100%", gap:6 }}>
              <Camera size={12} color={C.dim}/><span style={{ fontSize:9, color:C.dim, fontFamily:"'DM Sans',sans-serif" }}>Add background</span>
            </div>
          )}
        </div>
        <input ref={bgRef} type="file" accept="image/*" onChange={handleBgUpload} style={{ display:"none" }}/>

        {/* The Digital Soul — unified visualization */}
        <div style={{
          background:C.abyss, borderRadius:profileBg?"0 0 20px 20px":20,
          border:"1px solid "+C.ghost, padding:"12px 0 16px", marginBottom:16,
          borderTop:profileBg?"none":"1px solid "+C.ghost,
        }}>
          <DigitalSoulViz user={user} size={340} traitData={traitData}/>

          {/* Name + badges */}
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, color:C.light, fontWeight:400, marginTop:4 }}>{user.name}</h2>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:6 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"4px 14px", borderRadius:14, background:tier.color+"10", border:"1px solid "+tier.color+"20" }}>
              <div style={{ width:5, height:5, borderRadius:3, background:tier.color, boxShadow:"0 0 6px "+tier.color+"44" }}/>
              <span style={{ fontSize:11, color:tier.color, fontFamily:"'JetBrains Mono',monospace" }}>{tier.name}</span>
            </div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"4px 14px", borderRadius:14, background:C.ember+"08", border:"1px solid "+C.ember+"15" }}>
              <span style={{ fontSize:12, color:C.ember, fontFamily:"'JetBrains Mono',monospace", fontWeight:600 }}>{Math.round(avg)}</span>
              <span style={{ fontSize:9, color:C.dim, fontFamily:"'DM Sans',sans-serif" }}>soul</span>
            </div>
          </div>

          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:C.mid, lineHeight:1.7, maxWidth:300, margin:"12px auto 0" }}>
            {user.bio || "Your essence emerges through reflection..."}
          </p>

          {userLocation && (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:4, marginTop:8 }}>
              <Compass size={10} color={C.dim}/><span style={{ fontSize:10, color:C.dim, fontFamily:"'DM Sans',sans-serif" }}>{userLocation.display}</span>
            </div>
          )}

          {(user.values || []).length > 0 && (
            <div style={{ display:"flex", flexWrap:"wrap", gap:5, justifyContent:"center", marginTop:10, padding:"0 16px" }}>
              {user.values.map(function(v) { return (
                <span key={v} style={{ fontSize:10, color:C.ember, padding:"4px 10px", borderRadius:8, background:C.ember+"08", border:"1px solid "+C.ember+"12", fontFamily:"'DM Sans',sans-serif" }}>{v}</span>
              ); })}
            </div>
          )}

          {/* Reward stats */}
          <div style={{ display:"flex", justifyContent:"center", gap:16, marginTop:14, paddingTop:12, borderTop:"1px solid "+C.ghost+"15" }}>
            {[
              { val:(user.rewards||{}).witnessed||0, label:"Witnessed", color:C.witnessed },
              { val:(user.rewards||{}).stirred||0, label:"Stirred", color:C.stirred },
              { val:(user.rewards||{}).illuminated||0, label:"Illuminated", color:C.illuminated },
              { val:(user.rewards||{}).rippled||0, label:"Rippled", color:C.rippled },
            ].map(function(s, i) { return (
              <div key={i} style={{ textAlign:"center" }}>
                <div style={{ fontSize:15, color:s.color, fontFamily:"'Cormorant Garamond',serif", fontWeight:600 }}>{s.val}</div>
                <div style={{ fontSize:7, color:C.dim, fontFamily:"'DM Sans',sans-serif", textTransform:"uppercase", letterSpacing:0.5 }}>{s.label}</div>
              </div>
            ); })}
          </div>
        </div>

        {/* Advance deeper */}
        <button onClick={function(){setSoulDepth(1)}} style={{
          width:"100%", padding:14, borderRadius:14, border:"1px solid "+C.ember+"25",
          background:C.ember+"08", color:C.ember, fontSize:13,
          fontFamily:"'DM Sans',sans-serif", fontWeight:500,
          display:"flex", alignItems:"center", justifyContent:"center", gap:8,
        }}>
          <Layers size={16}/> Go deeper into your soul
        </button>
      </div>
    );
  };

  var renderLayer1 = function() {
    return (
      <div className="di">
        <div style={{ fontSize:10, color:C.mid, fontFamily:"'DM Sans',sans-serif", letterSpacing:1.5, textTransform:"uppercase", marginBottom:14, textAlign:"center" }}>
          Growth Pulse — What's Alive Now
        </div>

        {/* Dynamic activity reel */}
        <div style={{ background:C.abyss, borderRadius:16, padding:"14px 14px", border:"1px solid "+C.ghost, marginBottom:16 }}>
          {ACTIVITY.map(function(a, i) { return (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 0", borderBottom:i<ACTIVITY.length-1?"1px solid "+C.ghost+"15":"none" }}>
              <div style={{ width:7, height:7, borderRadius:4, background:a.color, boxShadow:"0 0 8px "+a.color+"33", flexShrink:0 }}/>
              <span style={{ fontSize:12, color:C.light, fontFamily:"'DM Sans',sans-serif", flex:1 }}>{a.text}</span>
              <span style={{ fontSize:9, color:C.dim, fontFamily:"'JetBrains Mono',monospace" }}>{a.time}</span>
            </div>
          ); })}
        </div>

        {/* Trait breakdown — expandable cards */}
        <div style={{ fontSize:10, color:C.mid, fontFamily:"'DM Sans',sans-serif", letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>
          Your soul traits
        </div>
        {SOUL_TRAITS.map(function(trait, i) {
          var val = traitData[trait.key] || 40;
          var levelLabel = val > 70 ? "Flourishing" : val > 45 ? "Growing" : "Emerging";
          return (
            <div key={trait.key} className={"ri ri"+Math.min(i+1,4)} style={{
              background:C.abyss, borderRadius:14, padding:"14px 14px", marginBottom:8,
              border:"1px solid "+C.ghost, borderLeft:"3px solid "+trait.color+"55",
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                <div style={{ width:8, height:8, borderRadius:4, background:trait.color, boxShadow:"0 0 8px "+trait.color+"33" }}/>
                <span style={{ fontSize:13, color:C.light, fontFamily:"'DM Sans',sans-serif", fontWeight:500, flex:1 }}>{trait.label}</span>
                <span style={{ fontSize:10, color:trait.color, fontFamily:"'JetBrains Mono',monospace", fontWeight:600 }}>{val}</span>
                <span style={{ fontSize:9, color:trait.color, fontFamily:"'DM Sans',sans-serif", padding:"2px 8px", borderRadius:6, background:trait.color+"10" }}>{levelLabel}</span>
              </div>
              <div style={{ width:"100%", height:4, borderRadius:2, background:C.ghost+"33" }}>
                <div style={{ width:val+"%", height:"100%", borderRadius:2, background:"linear-gradient(90deg, "+trait.color+"55, "+trait.color+")", boxShadow:"0 0 8px "+trait.color+"22" }}/>
              </div>
            </div>
          );
        })}

        <button onClick={function(){setSoulDepth(2)}} style={{
          width:"100%", padding:14, borderRadius:14, border:"1px solid "+C.appreciation+"25",
          background:C.appreciation+"08", color:C.appreciation, fontSize:13, marginTop:8,
          fontFamily:"'DM Sans',sans-serif", fontWeight:500,
          display:"flex", alignItems:"center", justifyContent:"center", gap:8,
        }}>
          <Orbit size={16}/> See your connections
        </button>
      </div>
    );
  };

  var renderLayer2 = function() {
    return (
      <div className="di">
        <div style={{ fontSize:10, color:C.mid, fontFamily:"'DM Sans',sans-serif", letterSpacing:1.5, textTransform:"uppercase", marginBottom:14, textAlign:"center" }}>
          Your Connection Web
        </div>

        {/* Connection spectrum */}
        <div style={{ background:C.abyss, borderRadius:16, padding:18, border:"1px solid "+C.ghost, marginBottom:16 }}>
          <div style={{ fontSize:10, color:C.mid, fontFamily:"'DM Sans',sans-serif", letterSpacing:1, textTransform:"uppercase", marginBottom:12 }}>How you connect</div>
          {SPECTRUMS.map(function(s) { return (
            <div key={s.key} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
              <s.icon size={14} color={s.color} style={{ flexShrink:0 }}/>
              <span style={{ fontSize:11, color:C.light, fontFamily:"'DM Sans',sans-serif", width:80 }}>{s.label}</span>
              <div style={{ flex:1, height:5, borderRadius:3, background:C.ghost+"33" }}>
                <div style={{ width:((user.spectrum||{})[s.key]||50)+"%", height:"100%", borderRadius:3, background:s.color }}/>
              </div>
              <span style={{ fontSize:11, color:s.color, fontFamily:"'JetBrains Mono',monospace", width:26, textAlign:"right" }}>{(user.spectrum||{})[s.key]||50}</span>
            </div>
          ); })}
        </div>

        {/* Connected people */}
        <div style={{ fontSize:10, color:C.mid, fontFamily:"'DM Sans',sans-serif", letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>People in your constellation</div>
        {Object.keys(PEOPLE).slice(0,4).map(function(id) {
          var p = PEOPLE[id]; var pTier = getTier(p.essencePoints);
          return (
            <div key={id} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:C.abyss, borderRadius:12, border:"1px solid "+C.ghost, marginBottom:8 }}>
              <Avatar name={p.name} size={36} color={pTier.color} photo={p.photo}/>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, color:C.light, fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>{p.name}</div>
                <div style={{ fontSize:10, color:C.dim, fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic" }}>{p.bio}</div>
              </div>
              {p.torchbearer && <Sun size={14} color="#FFD700"/>}
            </div>
          );
        })}

        <button onClick={function(){setSoulDepth(3)}} style={{
          width:"100%", padding:14, borderRadius:14, border:"1px solid "+C.understanding+"25",
          background:C.understanding+"08", color:C.understanding, fontSize:13, marginTop:8,
          fontFamily:"'DM Sans',sans-serif", fontWeight:500,
          display:"flex", alignItems:"center", justifyContent:"center", gap:8,
        }}>
          <BookOpen size={16}/> Your life experiences
        </button>
      </div>
    );
  };

  var renderLayer3 = function() {
    return (
      <div className="di">
        <div style={{ fontSize:10, color:C.mid, fontFamily:"'DM Sans',sans-serif", letterSpacing:1.5, textTransform:"uppercase", marginBottom:14, textAlign:"center" }}>
          Your Soul Reel — Life Experiences
        </div>

        {/* Journey map */}
        {user.journey && user.journey.length > 0 && (
          <div style={{ marginBottom:16 }}>
            <JourneyMap person={user}/>
          </div>
        )}

        {/* Recent reflections summary */}
        <div style={{ background:C.abyss, borderRadius:16, padding:18, border:"1px solid "+C.ghost, marginBottom:16 }}>
          <div style={{ fontSize:10, color:C.ember, fontFamily:"'DM Sans',sans-serif", letterSpacing:1, textTransform:"uppercase", marginBottom:12 }}>Your reflections</div>
          <div style={{ display:"flex", justifyContent:"space-around" }}>
            {[
              { val:"0", label:"Written", color:C.ember },
              { val:"0", label:"Sparks lit", color:C.kindle },
              { val:"0", label:"Perspectives", color:C.intelligence },
            ].map(function(s, i) { return (
              <div key={i} style={{ textAlign:"center" }}>
                <div style={{ fontSize:22, color:s.color, fontFamily:"'Cormorant Garamond',serif", fontWeight:600 }}>{s.val}</div>
                <div style={{ fontSize:8, color:C.dim, fontFamily:"'DM Sans',sans-serif", textTransform:"uppercase" }}>{s.label}</div>
              </div>
            ); })}
          </div>
        </div>

        <button onClick={function(){setSoulDepth(4)}} style={{
          width:"100%", padding:14, borderRadius:14, border:"1px solid "+C.appreciation+"25",
          background:C.appreciation+"08", color:C.appreciation, fontSize:13,
          fontFamily:"'DM Sans',sans-serif", fontWeight:500,
          display:"flex", alignItems:"center", justifyContent:"center", gap:8,
        }}>
          <Eye size={16}/> Your core essence
        </button>
      </div>
    );
  };

  var renderLayer4 = function() {
    return (
      <div className="di" style={{ textAlign:"center" }}>
        <div style={{ fontSize:10, color:C.appreciation, fontFamily:"'DM Sans',sans-serif", letterSpacing:2, textTransform:"uppercase", marginBottom:20 }}>
          Core Essence
        </div>

        <div style={{
          background:C.abyss, borderRadius:20, padding:"28px 20px", border:"1px solid "+C.ghost,
          position:"relative", overflow:"hidden", marginBottom:16,
        }}>
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:200, height:200, borderRadius:"50%", background:"radial-gradient(circle, "+tier.color+"08 0%, transparent 70%)", filter:"blur(30px)", pointerEvents:"none" }}/>

          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, color:C.light, lineHeight:1.9, fontStyle:"italic", position:"relative" }}>
            {user.bio || "Every reflection you write, every spark you light, every connection you make — it all converges here. Your digital soul is forming. Keep going."}
          </p>
        </div>

        {/* Essence tiers */}
        <div style={{ background:C.abyss, borderRadius:16, padding:"16px 14px", border:"1px solid "+C.ghost, textAlign:"left" }}>
          {TIERS.map(function(t, i) {
            var reached = (user.essencePoints||0) >= t.min;
            var current = tier.name === t.name;
            return (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10, opacity:reached?1:0.3 }}>
                <div style={{ width:8, height:8, borderRadius:4, background:current?t.color:reached?t.color+"55":C.ghost, boxShadow:current?"0 0 10px "+t.color+"40":"none" }}/>
                <span style={{ fontSize:12, color:reached?t.color:C.dim, fontFamily:"'DM Sans',sans-serif", fontWeight:current?600:400, flex:1 }}>{t.name}</span>
                {current && <span style={{ fontSize:9, color:t.color, fontFamily:"'JetBrains Mono',monospace" }}>YOU</span>}
              </div>
            );
          })}
        </div>


      </div>
    );
  };

  var layers = [renderLayer0, renderLayer1, renderLayer2, renderLayer3, renderLayer4];

  return (
    <div style={{ padding:16, paddingBottom:100, overflowY:"auto", maxHeight:"calc(100vh - 70px)" }}>
      {/* Depth navigation */}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
        {soulDepth > 0 && (
          <button onClick={function(){setSoulDepth(soulDepth - 1)}} style={{ color:C.mid, display:"flex", alignItems:"center", gap:4, fontSize:12, fontFamily:"'DM Sans',sans-serif" }}>
            <ArrowLeft size={16}/> Back
          </button>
        )}
        <div style={{ display:"flex", alignItems:"center", gap:4, marginLeft:soulDepth>0?"auto":0 }}>
          {SOUL_LAYERS.map(function(label, i) { return (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:4 }}>
              <div style={{
                width:i<=soulDepth?7:4, height:i<=soulDepth?7:4, borderRadius:"50%",
                background:i<=soulDepth?C.ember:C.ghost,
                boxShadow:i===soulDepth?"0 0 8px "+C.ember+"44":"none",
              }}/>
              {i===soulDepth && <span style={{ fontSize:8, color:C.ember, fontFamily:"'JetBrains Mono',monospace", letterSpacing:1, textTransform:"uppercase" }}>{label}</span>}
              {i<SOUL_LAYERS.length-1 && <div style={{ width:8, height:1, background:i<soulDepth?C.ember:C.ghost }}/>}
            </div>
          ); })}
        </div>
      </div>

      {/* Current depth layer */}
      <div key={"soul-"+soulDepth}>
        {layers[soulDepth]()}
      </div>
    </div>
  );
}

function SparkView({ user, lang }) {
  const [tab, setTab] = useState("browse");       // browse | create | mySparks | respond
  const [selectedSpark, setSelectedSpark] = useState(null);
  const [phase, setPhase] = useState("view");      // view → accepted → reflect → submitted
  var sparkGoBack = function(){ if(phase==="reflect"){setPhase("accepted")} else if(phase==="echoes"){setPhase("view");setSelectedSpark(null)} else {setPhase("view");setSelectedSpark(null);setReflectText("");setEmotions([])} };
  var swipe = useSwipeBack(sparkGoBack);
  const [reflectText, setReflectText] = useState("");
  const [emotions, setEmotions] = useState([]);
  const [modWarn, setModWarn] = useState(null);
  const [reflectPhoto, setReflectPhoto] = useState(null);
  const [perspectiveText, setPerspectiveText] = useState("");
  const photoRef = useRef(null);

  // Create spark state
  const [newSparkPrompt, setNewSparkPrompt] = useState("");
  const [newSparkCategory, setNewSparkCategory] = useState("Mindfulness");
  const [newSparkDifficulty, setNewSparkDifficulty] = useState(2);
  const [newSparkTime, setNewSparkTime] = useState("30 min");
  const [sparkCreated, setSparkCreated] = useState(false);
  const [myCreatedSparks, setMyCreatedSparks] = useState([]);

  // Creator review state
  const [reviewingResponse, setReviewingResponse] = useState(null);

  const handleReflectPhoto = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader(); r.onload = (ev) => setReflectPhoto(ev.target.result); r.readAsDataURL(f);
  };

  const CATEGORIES = ["Mindfulness","Empathy","Courage","Creativity","Connection","Reflection","Challenge"];
  const EMOTION_OPTIONS = ["Wonder","Gratitude","Joy","Peace","Curiosity","Awe","Clarity","Vulnerability","Courage","Empathy","Humility","Hope","Melancholy","Serenity","Determination"];
  const wordCount = reflectText.trim().split(/\s+/).filter(Boolean).length;

  // Community sparks — created by other users
  const SPARK_TRANSLATIONS = {
    cs1: { en:"Find someone older than you and ask them what they wish they'd known at your age. Don't give advice back — just listen and sit with what they said.",
           es:"Encuentra a alguien mayor que tú y pregúntale qué hubiera querido saber a tu edad. No des consejos — solo escucha.",
           it:"Trova qualcuno più grande di te e chiedigli cosa avrebbe voluto sapere alla tua età. Non dare consigli — ascolta e basta.",
           fr:"Trouvez quelqu'un de plus âgé et demandez-lui ce qu'il aurait aimé savoir à votre âge. Ne donnez pas de conseils — écoutez simplement." },
    cs2: { en:"Spend one hour in a public place without your phone. Don't read. Don't listen to anything. Just watch people. Then come back and tell me what you saw that no one else noticed.",
           es:"Pasa una hora en un lugar público sin tu teléfono. No leas. No escuches nada. Solo observa a la gente. Luego vuelve y cuéntame qué viste que nadie más notó.",
           it:"Passa un'ora in un luogo pubblico senza il telefono. Non leggere. Non ascoltare nulla. Osserva le persone. Poi torna e dimmi cosa hai visto che nessun altro ha notato.",
           fr:"Passez une heure dans un lieu public sans téléphone. Ne lisez pas. N'écoutez rien. Observez les gens. Puis revenez me dire ce que vous avez vu que personne d'autre n'a remarqué." },
    cs3: { en:"Cook a meal for someone without telling them why. Not for a birthday. Not because they're sad. Just because they exist and you're grateful for that. Notice how it feels to give without occasion.",
           es:"Cocina una comida para alguien sin decirle por qué. No por un cumpleaños. No porque esté triste. Solo porque existe y estás agradecido por eso.",
           it:"Cucina un pasto per qualcuno senza dirgli perché. Non per un compleanno. Non perché è triste. Solo perché esiste e ne sei grato. Nota come ci si sente a dare senza occasione.",
           fr:"Cuisinez un repas pour quelqu'un sans lui dire pourquoi. Pas pour un anniversaire. Pas parce qu'il est triste. Juste parce qu'il existe et que vous en êtes reconnaissant." },
  };

  const getSparkPrompt = (sparkId, fallback) => (SPARK_TRANSLATIONS[sparkId]||{})[lang] || (SPARK_TRANSLATIONS[sparkId]||{}).en || fallback;

  const COMMUNITY_SPARKS = [
    {
      id:"cs1", creatorId:"kindling", prompt: getSparkPrompt("cs1", ""),
      category:"Connection", difficulty:3, time:"30 min", points:60,
      accepted:34, returned:28, avgDepth:89,
      responses:[
        { userId:"solace", text:"I asked my 73-year-old neighbor. She said 'I wish I'd known that the things I was rushing toward were less important than the things I was rushing past.' I wrote it on a sticky note. It's on my mirror now.", depthScore:94, emotions:["Wonder","Gratitude"], photo:null,
          creatorReview:"This is exactly the kind of listening I hoped this spark would create. The sticky note detail tells me you didn't just hear her — you received her.", verified:true },
        { userId:"meridian", text:"My barber. 62 years old. He said 'worry is a rocking chair — gives you something to do but gets you nowhere.' Then he laughed and said he still worries every day. The honesty in that laugh stayed with me more than the quote.", depthScore:91, emotions:["Humility","Joy"], photo:null,
          creatorReview:"The laugh. You noticed the laugh. Most people would've just taken the quote and moved on. You heard the human behind it.", verified:true },
      ],
    },
    {
      id:"cs2", creatorId:"northlight", prompt: getSparkPrompt("cs2", ""),
      category:"Mindfulness", difficulty:2, time:"90 min", points:50,
      accepted:56, returned:41, avgDepth:85,
      responses:[
        { userId:"kindling", text:"I sat in a park. A father was teaching his daughter to ride a bike. Every time she fell, he didn't rush to pick her up — he waited. Watched her decide whether to cry or get back on. She always got back on. I think that patience is the hardest kind of love.", depthScore:96, emotions:["Awe","Empathy"], photo:null,
          creatorReview:"'He waited.' Two words that captured an entire philosophy of parenting. This is what presence reveals — things that speed hides.", verified:true },
      ],
    },
    {
      id:"cs3", creatorId:"solace", prompt: getSparkPrompt("cs3", ""),
      category:"Empathy", difficulty:1, time:"60 min", points:40,
      accepted:42, returned:35, avgDepth:87,
      responses:[],
    },
  ];

  const handleCreateSpark = () => {
    const check = moderateContent(newSparkPrompt);
    if (!check.safe) { setModWarn(check.message); return; }
    if (newSparkPrompt.length >= 30) {
      setSparkCreated(true);
      setMyCreatedSparks(function(prev){return prev.concat([{id:"my_"+Date.now(),prompt:newSparkPrompt,category:newSparkCategory,accepted:0,returned:0,toReview:0,created:new Date().toLocaleDateString()}])});
      setTimeout(() => { setSparkCreated(false); setTab("mySparks"); setNewSparkPrompt(""); }, 2500);
    }
  };

  const handleSubmitResponse = () => {
    const check = moderateContent(reflectText);
    if (!check.safe) { setModWarn(check.message); return; }
    if (wordCount >= 20 && emotions.length >= 1) setPhase("submitted");
  };

  // ── BROWSE community sparks ──
  const renderBrowse = () => {
    var today = new Date().getDay();
    var dailySpark = DAILY_SPARKS[today % DAILY_SPARKS.length];
    var allSparks = [{isDailySpotlight:true, prompt:dailySpark.prompt, creator:dailySpark.creator, category:dailySpark.category, responses:[]}].concat(COMMUNITY_SPARKS);

    return (
    <div style={{ overflowY:"auto", maxHeight:"calc(100vh - 130px)", scrollbarWidth:"none", padding:"0 0 20px" }}>
      {allSparks.map(function(spark, i) {
        var isDaily = spark.isDailySpotlight;
        var creator = PEOPLE[spark.creatorId] || {name:spark.creator||"LUCID"};
        var echoCount = (spark.responses||[]).length;
        var returnRate = spark.accepted > 0 ? Math.round((spark.returned||0)/(spark.accepted||1)*100) : 0;

        return React.createElement("div", {key:isDaily?"daily":spark.id, style:{
            padding:"8px 16px 4px", display:"flex", flexDirection:"column",
        }},
          isDaily && React.createElement("div", {className:"di", style:{display:"flex",alignItems:"center",gap:6,marginBottom:14}},
            React.createElement("div", {style:{width:6,height:6,borderRadius:3,background:C.ember,animation:"breathe 2s ease-in-out infinite"}}),
            React.createElement("span", {style:{fontSize:10,color:C.ember,fontFamily:"'DM Sans',sans-serif",fontWeight:600,letterSpacing:2,textTransform:"uppercase"}}, t("sparkOfDay",lang))
          ),
          React.createElement("div", {className:"di", style:{
            background:isDaily?"linear-gradient(135deg,"+C.ember+"08,"+C.kindle+"05)":C.abyss,
            borderRadius:20, padding:"24px 20px",
            border:isDaily?"1px solid "+C.ember+"25":"1px solid "+C.ghost,
          }},
            React.createElement("div", {style:{display:"inline-flex",alignItems:"center",gap:5,padding:"4px 12px",borderRadius:10,background:C.ember+"10",border:"1px solid "+C.ember+"15",marginBottom:14}},
              React.createElement(Flame, {size:10,color:C.ember}),
              React.createElement("span", {style:{fontSize:9,color:C.ember,fontFamily:"'DM Sans',sans-serif",fontWeight:500,letterSpacing:1}}, spark.category)
            ),
            React.createElement("p", {style:{fontFamily:"'Cormorant Garamond',serif",fontSize:isDaily?20:17,color:C.light,lineHeight:1.7,marginBottom:18}},
              "\u201C" + spark.prompt + "\u201D"
            ),
            React.createElement("div", {style:{display:"flex",alignItems:"center",gap:10,marginBottom:16,padding:"8px 12px",borderRadius:12,background:C.surface,border:"1px solid "+C.ghost+"20"}},
              React.createElement("div", {style:{width:36,height:36,borderRadius:"50%",overflow:"hidden",border:"2px solid "+C.ember+"30",flexShrink:0}},
                creator.photo ? React.createElement("img", {src:creator.photo,alt:"",style:{width:"100%",height:"100%",objectFit:"cover"}}) : React.createElement("div", {style:{width:"100%",height:"100%",background:C.ember+"15",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.ember}}, (creator.name||"?")[0])
              ),
              React.createElement("div", {style:{flex:1}},
                React.createElement("div", {style:{fontSize:12,color:C.light,fontFamily:"'DM Sans',sans-serif",fontWeight:500}}, creator.name||spark.creator),
                React.createElement("div", {style:{fontSize:9,color:C.dim,fontFamily:"'DM Sans',sans-serif"}}, (creator.reflCount||0)+" reflections · "+(creator.connections||0)+" connections")
              ),
              React.createElement("div", {style:{padding:"3px 8px",borderRadius:8,background:(getTier(creator.essencePoints||0).color)+"10",border:"1px solid "+(getTier(creator.essencePoints||0).color)+"20"}},
                React.createElement("span", {style:{fontSize:9,color:getTier(creator.essencePoints||0).color,fontFamily:"'JetBrains Mono',monospace"}}, getTier(creator.essencePoints||0).name)
              )
            ),
            !isDaily && React.createElement("div", {style:{display:"flex",flexDirection:"column",gap:10,marginBottom:14}},
              React.createElement("div", {style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},
                React.createElement("div", {style:{display:"flex",gap:6,flexWrap:"wrap"}},
                  React.createElement("div", {style:{display:"flex",alignItems:"center",gap:4,padding:"5px 12px",borderRadius:10,background:C.ember+"08",border:"1px solid "+C.ember+"15"}},
                    React.createElement(Flame, {size:12,color:C.ember}),
                    React.createElement("span", {style:{fontSize:11,color:C.ember,fontFamily:"'JetBrains Mono',monospace",fontWeight:600}}, spark.accepted||0),
                    React.createElement("span", {style:{fontSize:9,color:C.dim}}, " "+t("acceptedLabel",lang))
                  ),
                  React.createElement("div", {style:{display:"flex",alignItems:"center",gap:4,padding:"5px 12px",borderRadius:10,background:C.understanding+"08",border:"1px solid "+C.understanding+"15"}},
                    React.createElement("span", {style:{fontSize:11,color:C.understanding,fontFamily:"'JetBrains Mono',monospace",fontWeight:600}}, returnRate+"%"),
                    React.createElement("span", {style:{fontSize:9,color:C.dim}}, " "+t("returnedLabel",lang))
                  )
                ),
                spark.avgDepth && React.createElement("div", {style:{display:"flex",alignItems:"center",gap:3,padding:"5px 10px",borderRadius:10,background:C.appreciation+"08",border:"1px solid "+C.appreciation+"15"}},
                  React.createElement("span", {style:{fontSize:9,color:C.dim}}, t("depthLabel",lang)),
                  React.createElement("span", {style:{fontSize:12,color:C.appreciation,fontFamily:"'JetBrains Mono',monospace",fontWeight:700}}, spark.avgDepth)
                )
              ),
              echoCount > 0 && React.createElement("button", {onClick:function(){haptic("light");setSelectedSpark(spark);setPhase("echoes")},style:{display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"8px 14px",borderRadius:12,background:C.appreciation+"06",border:"1px solid "+C.appreciation+"18",cursor:"pointer",width:"100%"}},
                React.createElement(Waves, {size:14,color:C.appreciation}),
                React.createElement("span", {style:{fontSize:11,color:C.appreciation,fontFamily:"'DM Sans',sans-serif",fontWeight:500}}, echoCount+" Echoes — see how people felt"),
                React.createElement(ChevronRight, {size:14,color:C.appreciation})
              )
            ),
            React.createElement("button", {onClick:function(){haptic("medium");setSelectedSpark(spark);setPhase("accepted")},style:{
              width:"100%",padding:14,borderRadius:14,
              background:isDaily?"linear-gradient(135deg,"+C.ember+","+C.kindle+")":C.ember+"15",
              color:isDaily?C.void:C.ember,fontSize:13,
              fontFamily:"'DM Sans',sans-serif",fontWeight:600,
              border:isDaily?"none":"1px solid "+C.ember+"30",
            }}, t("acceptSpark",lang))
          ),
          null
        );
      })}
    </div>
  )};

  const renderEchoes = () => {
    if (!selectedSpark) return null;
    var responses = selectedSpark.responses || [];
    var creator = PEOPLE[selectedSpark.creatorId] || {name:selectedSpark.creator||"LUCID"};
    return React.createElement("div", Object.assign({style:Object.assign({padding:16,paddingBottom:100,overflowY:"auto",maxHeight:"calc(100vh - 130px)"},swipe.style)},swipe.handlers),
      swipe.indicator,

      React.createElement("div", {style:{background:C.abyss,borderRadius:16,padding:"16px 14px",marginBottom:20,border:"1px solid "+C.ghost,borderLeft:"3px solid "+C.ember+"44"}},
        React.createElement("p", {style:{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:C.light,lineHeight:1.6}}, "\u201C"+selectedSpark.prompt+"\u201D"),
        React.createElement("div", {style:{fontSize:10,color:C.dim,fontFamily:"'DM Sans',sans-serif",marginTop:8}}, t("by",lang)+" "+(creator.name||""))
      ),
      React.createElement("div", {style:{display:"flex",alignItems:"center",gap:6,marginBottom:14}},
        React.createElement(Waves, {size:14,color:C.appreciation}),
        React.createElement("span", {style:{fontSize:12,color:C.light,fontFamily:"'DM Sans',sans-serif",fontWeight:500}}, responses.length+" Echoes"),
        React.createElement("span", {style:{fontSize:10,color:C.dim,fontFamily:"'DM Sans',sans-serif"}}, " \u2014 voices that came back")
      ),
      responses.map(function(resp, i) {
        var rp = PEOPLE[resp.userId] || {name:resp.userId};
        var rt = getTier(rp.essencePoints||0);
        return React.createElement("div", {key:i,className:"ri",style:{background:C.abyss,borderRadius:14,padding:"14px 12px",marginBottom:10,border:"1px solid "+C.ghost}},
          React.createElement("div", {style:{display:"flex",alignItems:"center",gap:8,marginBottom:10}},
            React.createElement("div", {style:{width:28,height:28,borderRadius:"50%",overflow:"hidden",border:"2px solid "+rt.color+"40"}},
              rp.photo ? React.createElement("img", {src:rp.photo,alt:"",style:{width:"100%",height:"100%",objectFit:"cover"}}) : React.createElement("div", {style:{width:"100%",height:"100%",background:rt.color+"20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:rt.color}}, (rp.name||"?")[0])
            ),
            React.createElement("div", null,
              React.createElement("div", {style:{fontSize:12,color:C.light,fontFamily:"'DM Sans',sans-serif",fontWeight:500}}, rp.name),
              React.createElement("div", {style:{fontSize:9,color:rt.color,fontFamily:"'JetBrains Mono',monospace"}}, rt.name)
            ),
            React.createElement("div", {style:{marginLeft:"auto",fontSize:10,color:C.appreciation,fontFamily:"'JetBrains Mono',monospace"}}, resp.depthScore)
          ),
          React.createElement("p", {style:{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:C.light,lineHeight:1.7,marginBottom:10}}, resp.text),
          React.createElement("div", {style:{display:"flex",gap:4,marginBottom:10,flexWrap:"wrap"}},
            (resp.emotions||[]).map(function(em) { return React.createElement("span", {key:em,style:{fontSize:9,padding:"3px 8px",borderRadius:8,background:C.ghost+"25",border:"1px solid "+C.ghost+"15",color:C.mid,fontFamily:"'DM Sans',sans-serif"}}, em); })
          ),
          React.createElement("button", {onClick:function(){haptic("light")},style:{display:"flex",alignItems:"center",gap:4,padding:"5px 12px",borderRadius:8,background:C.stirred+"08",border:"1px solid "+C.stirred+"15",cursor:"pointer"}},
            React.createElement(Waves, {size:12,color:C.stirred}),
            React.createElement("span", {style:{fontSize:10,color:C.stirred,fontFamily:"'DM Sans',sans-serif"}}, "Stir")
          ),
          resp.creatorReview && React.createElement("div", {style:{marginTop:10,padding:"10px 12px",borderRadius:10,background:C.ember+"06",borderLeft:"2px solid "+C.ember+"30"}},
            React.createElement("div", {style:{fontSize:9,color:C.ember,fontFamily:"'DM Sans',sans-serif",fontWeight:600,marginBottom:4}}, (creator.name||"")+"'s review"),
            React.createElement("p", {style:{fontSize:11,color:C.mid,fontFamily:"'Cormorant Garamond',serif",lineHeight:1.6,fontStyle:"italic"}}, resp.creatorReview)
          )
        );
      }),
      responses.length === 0 && React.createElement("div", {style:{textAlign:"center",padding:"40px 20px"}},
        React.createElement(Waves, {size:28,color:C.ghost,style:{marginBottom:10}}),
        React.createElement("p", {style:{fontSize:13,color:C.dim,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic"}}, "No echoes yet \u2014 be the first to live this spark.")
      )
    );
  };

  // ── CREATE a spark ──
  const renderSparkDetail = () => {
    if (!selectedSpark) return null;
    var creator = PEOPLE[selectedSpark.creatorId] || {name:selectedSpark.creator||"LUCID"};


    if (phase === "submitted") {
      return React.createElement("div", {style:{padding:40,textAlign:"center"}},
        React.createElement(Sparkles, {size:40,color:C.ember,style:{marginBottom:16}}),
        React.createElement("h3", {style:{fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:C.light,fontWeight:400,marginBottom:8}}, "Your echo has been shared"),
        React.createElement("p", {style:{fontSize:12,color:C.mid,fontFamily:"'DM Sans',sans-serif",lineHeight:1.6,marginBottom:20}}, "The spark creator will review your reflection. Your Humanity Index grows with every honest response."),
        React.createElement("button", {onClick:function(){setPhase("view");setSelectedSpark(null);setReflectText("");setEmotions([])},style:{padding:"12px 24px",borderRadius:12,background:C.ember,color:C.void,fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}, "Back to Sparks")
      );
    }

    if (phase === "reflect") {
      return React.createElement("div", Object.assign({style:Object.assign({padding:16},swipe.style)},swipe.handlers),
        swipe.indicator,

        React.createElement("p", {style:{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:C.mid,lineHeight:1.6,marginBottom:16,fontStyle:"italic"}}, "You lived this spark. Now share what you felt."),
        React.createElement("textarea", {value:reflectText,onChange:function(e){setReflectText(e.target.value)},rows:5,placeholder:"What happened? What did you feel? Be honest...",style:{width:"100%",padding:16,borderRadius:14,background:C.surface,border:"1px solid "+C.ghost,color:C.light,fontSize:14,fontFamily:"'Cormorant Garamond',serif",lineHeight:1.7,resize:"none",marginBottom:12}}),
        React.createElement("div", {style:{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16}},
          EMOTION_OPTIONS.slice(0,10).map(function(em) {
            var sel = emotions.indexOf(em) !== -1;
            return React.createElement("button", {key:em,onClick:function(){setEmotions(function(prev){return sel?prev.filter(function(x){return x!==em}):prev.length<3?prev.concat([em]):prev})},style:{padding:"5px 12px",borderRadius:10,fontSize:10,border:"1px solid "+(sel?C.ember:C.ghost),background:sel?C.ember+"12":"transparent",color:sel?C.ember:C.dim,fontFamily:"'DM Sans',sans-serif"}}, em);
          })
        ),
        React.createElement("button", {onClick:function(){if(reflectText.length>20&&emotions.length>=1){haptic("heavy");setPhase("submitted")}},style:{width:"100%",padding:14,borderRadius:14,background:reflectText.length>20&&emotions.length>=1?C.ember:C.ghost,color:reflectText.length>20&&emotions.length>=1?C.void:C.dim,fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}, "Share your echo")
      );
    }

    // Default: accepted state — swipe right to go back
    return React.createElement("div", Object.assign({style:Object.assign({padding:16},swipe.style)},swipe.handlers),
      swipe.indicator,

      React.createElement("div", {style:{background:C.abyss,borderRadius:16,padding:"20px 16px",border:"1px solid "+C.ember+"20",marginBottom:16}},
        React.createElement("div", {style:{display:"flex",alignItems:"center",gap:6,marginBottom:10}},
          React.createElement(Flame, {size:14,color:C.ember}),
          React.createElement("span", {style:{fontSize:10,color:C.ember,fontFamily:"'DM Sans',sans-serif",fontWeight:600,letterSpacing:1}}, "SPARK ACCEPTED")
        ),
        React.createElement("p", {style:{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:C.light,lineHeight:1.7,marginBottom:12}}, "\u201C"+selectedSpark.prompt+"\u201D"),
        React.createElement("div", {style:{fontSize:11,color:C.dim,fontFamily:"'DM Sans',sans-serif"}}, t("by",lang)+" "+(creator.name||""))
      ),
      React.createElement("div", {style:{background:C.surface,borderRadius:14,padding:"16px 14px",border:"1px solid "+C.ghost+"20",marginBottom:16}},
        React.createElement("p", {style:{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:C.mid,lineHeight:1.7,fontStyle:"italic"}}, "Now go live this spark. Step away from the screen. When you come back, share what you experienced and how it made you feel.")
      ),
      React.createElement("button", {onClick:function(){haptic("medium");setPhase("reflect")},style:{width:"100%",padding:14,borderRadius:14,background:"linear-gradient(135deg,"+C.ember+","+C.kindle+")",color:C.void,fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}, "I lived it — share my echo")
    );
  };

  const renderCreate = () => {
    if (sparkCreated) return (
      <div className="di" style={{ textAlign:"center", padding:"60px 0" }}>
        <Flame size={36} color={C.ember} style={{ margin:"0 auto 16px", animation:"pulseGlow 2s ease-in-out infinite" }}/>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:C.light, fontWeight:400, marginBottom:6 }}>Spark created</h3>
        <p style={{ fontSize:13, color:C.mid, fontFamily:"'Cormorant Garamond',serif", lineHeight:1.6 }}>Your challenge is live. Come back to verify responses.</p>
      </div>
    );
    return (
      <div className="di">
        <div className="ri" style={{ marginBottom:20 }}>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:C.light, fontWeight:400, marginBottom:4 }}>Create a Spark</h3>
          <p style={{ fontSize:12, color:C.mid, fontFamily:"'DM Sans',sans-serif", lineHeight:1.5 }}>
            Challenge others to live an experience. Not content for likes — a real human challenge. You'll come back to verify their responses.
          </p>
        </div>
        {/* Prompt */}
        <div style={{ background:C.abyss, borderRadius:14, padding:16, border:`1px solid ${C.ghost}`, marginBottom:14 }}>
          <div style={{ fontSize:11, color:C.light, fontFamily:"'DM Sans',sans-serif", marginBottom:8 }}>Your challenge to the world</div>
          <textarea value={newSparkPrompt} onChange={e => { setNewSparkPrompt(e.target.value); setModWarn(null); }} rows={4}
            placeholder="Challenge people to do something real. Something that requires them to leave this screen and come back changed..."
            style={{ width:"100%", background:"transparent", border:"none", color:C.light, fontSize:15, fontFamily:"'Cormorant Garamond',serif", lineHeight:1.7, resize:"none" }}/>
          <div style={{ fontSize:10, color:C.dim, fontFamily:"'JetBrains Mono',monospace", marginTop:6 }}>{newSparkPrompt.length}/300</div>
        </div>
        {modWarn && <div style={{ display:"flex", alignItems:"flex-start", gap:6, marginBottom:12, padding:"8px 12px", borderRadius:8, background:`${C.warmth}08`, border:`1px solid ${C.warmth}15` }}><AlertTriangle size={13} color={C.warmth}/><span style={{ fontSize:11, color:C.warmth, fontFamily:"'DM Sans'" }}>{modWarn}</span></div>}
        {/* Category */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, color:C.light, fontFamily:"'DM Sans',sans-serif", marginBottom:8 }}>Category</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setNewSparkCategory(cat)} style={{
                padding:"6px 14px", borderRadius:10, fontSize:12, fontFamily:"'DM Sans',sans-serif",
                border:`1px solid ${newSparkCategory === cat ? C.ember : C.ghost}`,
                background:newSparkCategory === cat ? `${C.ember}12` : "transparent",
                color:newSparkCategory === cat ? C.ember : C.dim,
              }}>{cat}</button>
            ))}
          </div>
        </div>
        {/* Difficulty */}
        <div style={{ display:"flex", gap:12, marginBottom:14 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:11, color:C.light, fontFamily:"'DM Sans',sans-serif", marginBottom:8 }}>Difficulty</div>
            <div style={{ display:"flex", gap:6 }}>
              {[{v:1,l:"Gentle"},{v:2,l:"Stretch"},{v:3,l:"Deep reach"}].map(d => (
                <button key={d.v} onClick={() => setNewSparkDifficulty(d.v)} style={{
                  flex:1, padding:"8px 4px", borderRadius:8, fontSize:10, fontFamily:"'DM Sans'",
                  border:`1px solid ${newSparkDifficulty===d.v ? C.ember : C.ghost}`,
                  background:newSparkDifficulty===d.v ? `${C.ember}12` : "transparent",
                  color:newSparkDifficulty===d.v ? C.ember : C.dim,
                }}>{d.l}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize:11, color:C.light, fontFamily:"'DM Sans',sans-serif", marginBottom:8 }}>Time</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
              {["30 min","60 min","90 min","2 hrs"].map(tv => (
                <button key={tv} onClick={() => setNewSparkTime(tv)} style={{
                  padding:"6px 10px", borderRadius:6, fontSize:10, fontFamily:"'DM Sans'",
                  border:`1px solid ${newSparkTime===tv ? C.ember : C.ghost}`,
                  background:newSparkTime===tv ? `${C.ember}12` : "transparent",
                  color:newSparkTime===tv ? C.ember : C.dim,
                }}>{tv}</button>
              ))}
            </div>
          </div>
        </div>
        {/* Commitment */}
        <div style={{ padding:"12px 14px", borderRadius:12, background:`${C.ember}06`, border:`1px solid ${C.ember}10`, marginBottom:16 }}>
          <p style={{ fontSize:11, color:C.ember, fontFamily:"'DM Sans',sans-serif", lineHeight:1.5 }}>
            <Shield size={11} style={{ marginRight:4, verticalAlign:"middle" }}/>
            By creating this spark, you commit to returning to verify and review responses. Your engagement with responders builds your Humanity Index.
          </p>
        </div>
        <button onClick={handleCreateSpark} disabled={newSparkPrompt.length < 30}
          style={{ width:"100%", padding:14, borderRadius:14, background:newSparkPrompt.length >= 30 ? `linear-gradient(135deg,${C.ember},${C.kindle})` : C.ghost, color:newSparkPrompt.length >= 30 ? C.void : C.dim, fontSize:14, fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>
          {newSparkPrompt.length < 30 ? `${30 - newSparkPrompt.length} more characters` : "Ignite this Spark"}
        </button>
      </div>
    );
  };

  // ── MY SPARKS — sparks you created, with responses to review ──
  const renderMySparks = () => (
    <div className="di">
      <div className="ri" style={{ marginBottom:16 }}>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:C.light, fontWeight:400, marginBottom:4 }}>Your Sparks</h3>
        <p style={{ fontSize:12, color:C.mid, fontFamily:"'DM Sans',sans-serif", lineHeight:1.5 }}>
          Challenges you created. Review responses to build your Humanity Index.
        </p>
      </div>
      {/* Example user-created spark */}
      <div style={{ background:C.abyss, borderRadius:14, padding:16, border:`1px solid ${C.ghost}`, marginBottom:12, borderLeft:`3px solid ${C.ember}44` }}>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:C.light, lineHeight:1.6, marginBottom:10 }}>
          {myCreatedSparks.length>0?myCreatedSparks[myCreatedSparks.length-1].prompt:"Your latest spark will appear here once created"}
        </p>
        <div style={{ display:"flex", gap:16 }}>
          <div style={{ textAlign:"center" }}><div style={{ fontSize:16, color:C.ember, fontFamily:"'Cormorant Garamond',serif", fontWeight:600 }}>0</div><div style={{ fontSize:8, color:C.dim, fontFamily:"'DM Sans'", textTransform:"uppercase" }}>Accepted</div></div>
          <div style={{ textAlign:"center" }}><div style={{ fontSize:16, color:C.understanding, fontFamily:"'Cormorant Garamond',serif", fontWeight:600 }}>0</div><div style={{ fontSize:8, color:C.dim, fontFamily:"'DM Sans'", textTransform:"uppercase" }}>Returned</div></div>
          <div style={{ textAlign:"center" }}><div style={{ fontSize:16, color:C.appreciation, fontFamily:"'Cormorant Garamond',serif", fontWeight:600 }}>0</div><div style={{ fontSize:8, color:C.dim, fontFamily:"'DM Sans'", textTransform:"uppercase" }}>To review</div></div>
        </div>
      </div>
      <div style={{ padding:"14px 16px", borderRadius:12, background:`${C.ember}06`, border:`1px solid ${C.ember}10` }}>
        <p style={{ fontSize:12, color:C.ember, fontFamily:"'DM Sans',sans-serif", lineHeight:1.5 }}>
          <Sparkles size={12} style={{ marginRight:4, verticalAlign:"middle" }}/>
          When people respond to your sparks, you'll review their experiences here. Your thoughtful verification builds both your Humanity Index and theirs.
        </p>
      </div>
    </div>
  );

  // ── Spark tab navigation ──
  const sparkTabs = [
    { id:"browse", label:"Explore", icon:Compass },
    { id:"create", label:"Create", icon:Plus },
    { id:"mySparks", label:"My Sparks", icon:Flame },
  ];

  return (
    <div style={{ padding:20, paddingBottom:100, overflowY:"auto", maxHeight:"calc(100vh - 70px)" }}>
      {/* Sub-tabs */}
      {!selectedSpark && (
        <div style={{ display:"flex", gap:6, marginBottom:20 }}>
          {sparkTabs.map(st => (
            <button key={st.id} onClick={() => setTab(st.id)} style={{
              flex:1, padding:"10px 8px", borderRadius:12, display:"flex", flexDirection:"column", alignItems:"center", gap:4,
              border:`1px solid ${tab === st.id ? C.ember : C.ghost}`,
              background:tab === st.id ? `${C.ember}10` : "transparent",
              color:tab === st.id ? C.ember : C.dim,
            }}>
              <st.icon size={16}/>
              <span style={{ fontSize:10, fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>{st.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {phase==="echoes" && selectedSpark ? renderEchoes() : selectedSpark ? renderSparkDetail() :
        tab === "browse" ? renderBrowse() :
        tab === "create" ? renderCreate() :
        renderMySparks()
      }
    </div>
  );
}



/* ═══════════════════════════════════════════════════════════════
   WITNESS CIRCLES — Small groups, deep commitment
   Max 12 people. Shared challenge over weeks.
   ═══════════════════════════════════════════════════════════════ */

function WitnessCirclesView({ user }) {
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [joinedCircles, setJoinedCircles] = useState({});

  const CIRCLES = [
    {
      id:"wc1", name:"Dawn Walkers", members:[
        {id:"meridian",...PEOPLE.meridian},{id:"solace",...PEOPLE.solace},{id:"kindling",...PEOPLE.kindling}
      ], max:12, challenge:"Walk at dawn for 30 days without your phone",
      day:14, totalDays:30, desc:"We walk at dawn. No phones, no music. Just the world waking up.",
      recentReflections:[
        {author:"Meridian",text:"Day 14. The birds sound different when you're not wearing earbuds. Louder, more layered. Like they were always having a conversation I was drowning out."},
        {author:"Solace",text:"I saw my own shadow for the first time in months. Literally. I've been so phone-focused I forgot shadows exist at dawn."},
      ]
    },
    {
      id:"wc2", name:"Stranger Conversations", members:[
        {id:"kindling",...PEOPLE.kindling},{id:"northlight",...PEOPLE.northlight}
      ], max:12, challenge:"Talk to one stranger per week for 8 weeks",
      day:38, totalDays:56, desc:"Breaking the bubble. Finding humanity in unfamiliar faces.",
      recentReflections:[
        {author:"Kindling",text:"Week 6. I talked to the bus driver today. His name is Marcus. He's been driving this route for 11 years. Nobody had ever asked his name before. That broke my heart a little."},
      ]
    },
    {
      id:"wc3", name:"Analog Evenings", members:[
        {id:"solace",...PEOPLE.solace}
      ], max:12, challenge:"Screen-free after 7pm for 21 days",
      day:3, totalDays:21, desc:"Reclaiming our evenings from the glow of screens.",
      recentReflections:[]
    },
  ];

  if (selectedCircle) {
    const circle = selectedCircle;
    return (
      <div style={{ padding:20, paddingBottom:100, overflowY:"auto", maxHeight:"calc(100vh - 70px)" }}>
        <button onClick={() => setSelectedCircle(null)} style={{ color:C.mid, display:"flex", alignItems:"center", gap:4, fontSize:12, fontFamily:"'DM Sans',sans-serif", marginBottom:16 }}>
          <ArrowLeft size={16}/> All circles
        </button>
        <div style={{ background:C.abyss, borderRadius:18, padding:20, border:"1px solid "+C.ghost, marginBottom:16, borderTop:"3px solid "+C.ember }}>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:C.light, fontWeight:400, marginBottom:6 }}>{circle.name}</h3>
          <p style={{ fontSize:13, color:C.mid, fontFamily:"'Cormorant Garamond',serif", lineHeight:1.6, marginBottom:14 }}>{circle.desc}</p>
          <div style={{ padding:"10px 14px", borderRadius:10, background:C.surface, border:"1px solid "+C.ghost, marginBottom:14 }}>
            <div style={{ fontSize:10, color:C.ember, fontFamily:"'DM Sans',sans-serif", marginBottom:4 }}>Challenge</div>
            <div style={{ fontSize:13, color:C.light, fontFamily:"'DM Sans',sans-serif" }}>{circle.challenge}</div>
          </div>
          <div style={{ width:"100%", height:4, borderRadius:2, background:C.ghost+"33", marginBottom:6 }}>
            <div style={{ width:(circle.day/circle.totalDays*100)+"%", height:"100%", borderRadius:2, background:C.ember }}/>
          </div>
          <div style={{ fontSize:10, color:C.dim, fontFamily:"'JetBrains Mono',monospace" }}>Day {circle.day} of {circle.totalDays}</div>
        </div>
        <div style={{ fontSize:10, color:C.mid, fontFamily:"'DM Sans',sans-serif", letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>Members ({circle.members.length}/{circle.max})</div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16 }}>
          {circle.members.map((m,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 10px", borderRadius:10, background:C.abyss, border:"1px solid "+C.ghost }}>
              <Avatar name={m.name} size={24} color={getTier(m.essencePoints).color} photo={m.photo}/>
              <span style={{ fontSize:11, color:C.light, fontFamily:"'DM Sans',sans-serif" }}>{m.name}</span>
            </div>
          ))}
          {joinedCircles[circle.id] ? <div style={{ padding:"6px 14px", borderRadius:10, background:C.ember+"15", border:"1px solid "+C.ember+"30", color:C.ember, fontSize:11, fontFamily:"'DM Sans',sans-serif", display:"flex", alignItems:"center", gap:4 }}><Check size={12}/> Joined</div> : <button onClick={function(){setJoinedCircles(function(p){var n={};Object.keys(p).forEach(function(k){n[k]=p[k]});n[circle.id]=true;return n})}} style={{ padding:"6px 14px", borderRadius:10, border:"1px dashed "+C.ember+"44", color:C.ember, fontSize:11, fontFamily:"'DM Sans',sans-serif", cursor:"pointer" }}>+ Join</button>}
        </div>
        {circle.recentReflections.length > 0 && (
          <div>
            <div style={{ fontSize:10, color:C.mid, fontFamily:"'DM Sans',sans-serif", letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>Recent reflections</div>
            {circle.recentReflections.map((r,i) => (
              <div key={i} style={{ background:C.abyss, borderRadius:14, padding:16, border:"1px solid "+C.ghost, marginBottom:8 }}>
                <div style={{ fontSize:12, color:C.ember, fontFamily:"'DM Sans',sans-serif", fontWeight:500, marginBottom:6 }}>{r.author}</div>
                <p style={{ fontSize:13, color:C.light, fontFamily:"'Cormorant Garamond',serif", lineHeight:1.7 }}>{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding:20, paddingBottom:100, overflowY:"auto", maxHeight:"calc(100vh - 70px)" }}>
      <div className="ri" style={{ marginBottom:20 }}>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:C.light, fontWeight:400, marginBottom:4 }}>Witness Circles</h3>
        <p style={{ fontSize:12, color:C.mid, fontFamily:"'DM Sans',sans-serif", lineHeight:1.5 }}>Small groups. Shared challenges. Real accountability. Max 12 people, committed to growth together.</p>
      </div>
      {CIRCLES.map((circle, i) => (
        <div key={circle.id} className={"ri ri"+(Math.min(i+1,4))} onClick={() => setSelectedCircle(circle)}
          style={{ background:C.abyss, borderRadius:16, padding:"16px 16px", marginBottom:12, cursor:"pointer", border:"1px solid "+C.ghost, borderTop:"3px solid "+C.ember+"55" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
            <div>
              <h4 style={{ fontSize:15, color:C.light, fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>{circle.name}</h4>
              <div style={{ fontSize:11, color:C.dim, fontFamily:"'DM Sans',sans-serif", marginTop:2 }}>{circle.members.length}/{circle.max} members</div>
            </div>
            <span style={{ fontSize:10, color:C.ember, fontFamily:"'JetBrains Mono',monospace", padding:"3px 8px", borderRadius:6, background:C.ember+"10" }}>Day {circle.day}</span>
          </div>
          <p style={{ fontSize:12, color:C.mid, fontFamily:"'Cormorant Garamond',serif", lineHeight:1.5, marginBottom:10 }}>{circle.desc}</p>
          <div style={{ width:"100%", height:3, borderRadius:2, background:C.ghost+"33" }}>
            <div style={{ width:(circle.day/circle.totalDays*100)+"%", height:"100%", borderRadius:2, background:C.ember }}/>
          </div>
          <div style={{ display:"flex", marginTop:10, gap:-4 }}>
            {circle.members.slice(0,5).map((m,j) => (
              <Avatar key={j} name={m.name} size={22} color={getTier(m.essencePoints).color} photo={m.photo}/>
            ))}
          </div>
        </div>
      ))}
      <button style={{ width:"100%", padding:14, borderRadius:14, border:"1px dashed "+C.ember+"33", background:C.ember+"06", color:C.ember, fontSize:13, fontFamily:"'DM Sans',sans-serif", fontWeight:500, display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:8 }}>
        <Plus size={16}/> Create a Witness Circle
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   THREADS — Slow conversations. 2-hour minimum delay.
   Think pen-pal, not chat. Depth over speed.
   ═══════════════════════════════════════════════════════════════ */

function ThreadsView({ user }) {
  const [activeThread, setActiveThread] = useState(null);
  const [newMsg, setNewMsg] = useState("");

  const THREADS = [
    {
      id:"t1", withId:"meridian", topic:"On grief growing into beauty",
      messages:[
        {from:"meridian",text:"That line from the old man — 'grief needs somewhere to grow into something beautiful.' I keep coming back to it. Do you think we get to choose what it grows into?",time:"2 days ago"},
        {from:"you",text:"I think the choosing is the gardening. You can't control what blooms, but you can decide to water it instead of paving over it. Most people pave.",time:"1 day ago"},
        {from:"meridian",text:"Paving over grief. That's exactly what I did for three years. Kept busy, kept moving, kept performing fine. LUCID's silence sparks cracked the pavement. What came through surprised me.",time:"8 hours ago"},
      ]
    },
    {
      id:"t2", withId:"solace", topic:"The phantom limb of our phones",
      messages:[
        {from:"solace",text:"You wrote about the phantom limb feeling when reaching for your phone. I experienced the same thing during my silence spark. It's terrifying how deep that reflex goes.",time:"3 days ago"},
        {from:"you",text:"What's more terrifying is realizing the reflex isn't about the phone — it's about avoiding whatever thought was about to surface. The phone is just the escape hatch.",time:"2 days ago"},
        {from:"solace",text:"An escape hatch from ourselves. That's devastating and accurate. When I stopped reaching, the first thought that surfaced was one I'd been running from for months. Worth the discomfort.",time:"6 hours ago"},
      ]
    },
  ];

  if (activeThread) {
    const thread = activeThread;
    const person = PEOPLE[thread.withId];
    const pTier = getTier((person||{}).essencePoints || 0);
    return (
      <div style={{ padding:20, paddingBottom:100, overflowY:"auto", maxHeight:"calc(100vh - 70px)" }}>
        <button onClick={() => setActiveThread(null)} style={{ color:C.mid, display:"flex", alignItems:"center", gap:4, fontSize:12, fontFamily:"'DM Sans',sans-serif", marginBottom:16 }}>
          <ArrowLeft size={16}/> All threads
        </button>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
          <Avatar name={(person||{}).name} size={36} color={pTier.color} photo={(person||{}).photo}/>
          <div>
            <div style={{ fontSize:14, color:C.light, fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>{(person||{}).name}</div>
            <div style={{ fontSize:11, color:C.mid, fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic" }}>{thread.topic}</div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 12px", borderRadius:8, background:C.intelligence+"08", border:"1px solid "+C.intelligence+"15", marginBottom:16 }}>
          <Sun size={12} color={C.intelligence}/>
          <span style={{ fontSize:10, color:C.intelligence, fontFamily:"'DM Sans',sans-serif" }}>2-hour minimum between messages. Think before you write.</span>
        </div>

        {thread.messages.map((msg, i) => {
          var isYou = msg.from === "you";
          return (
            <div key={i} style={{ display:"flex", justifyContent:isYou ? "flex-end" : "flex-start", marginBottom:12 }}>
              <div style={{
                maxWidth:"80%", padding:"12px 14px", borderRadius:14,
                background:isYou ? C.ember+"12" : C.abyss,
                border:"1px solid "+(isYou ? C.ember+"20" : C.ghost),
                borderBottomRightRadius:isYou ? 4 : 14,
                borderBottomLeftRadius:isYou ? 14 : 4,
              }}>
                <p style={{ fontSize:13, color:C.light, fontFamily:"'Cormorant Garamond',serif", lineHeight:1.7 }}>{msg.text}</p>
                <div style={{ fontSize:9, color:C.dim, fontFamily:"'JetBrains Mono',monospace", marginTop:6, textAlign:isYou?"right":"left" }}>{msg.time}</div>
              </div>
            </div>
          );
        })}

        <div style={{ display:"flex", gap:8, marginTop:16 }}>
          <input value={newMsg} onChange={function(e){setNewMsg(e.target.value)}} placeholder="Take your time..."
            style={{ flex:1, padding:"12px 14px", borderRadius:12, background:C.surface, border:"1px solid "+C.ghost, color:C.light, fontSize:13, fontFamily:"'Cormorant Garamond',serif" }}/>
          <button disabled={newMsg.length < 10} style={{
            padding:"12px 16px", borderRadius:12,
            background:newMsg.length >= 10 ? C.ember : C.ghost,
            color:newMsg.length >= 10 ? C.void : C.dim,
          }}>
            <Send size={16}/>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding:20, paddingBottom:100, overflowY:"auto", maxHeight:"calc(100vh - 70px)" }}>
      <div className="ri" style={{ marginBottom:20 }}>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:C.light, fontWeight:400, marginBottom:4 }}>Connection Threads</h3>
        <p style={{ fontSize:12, color:C.mid, fontFamily:"'DM Sans',sans-serif", lineHeight:1.5 }}>
          Slow conversations. 2-hour minimum between messages. Think before you write. These aren't chats — they're letters.
        </p>
      </div>
      {THREADS.map(function(thread, i) {
        var person = PEOPLE[thread.withId];
        var pTier = getTier((person||{}).essencePoints || 0);
        var lastMsg = thread.messages[thread.messages.length - 1];
        return (
          <div key={thread.id} className={"ri ri"+(Math.min(i+1,4))} onClick={function(){setActiveThread(thread)}}
            style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", background:C.abyss, borderRadius:14, marginBottom:10, border:"1px solid "+C.ghost, cursor:"pointer" }}>
            <Avatar name={(person||{}).name} size={40} color={pTier.color} photo={(person||{}).photo}/>
          <div style={{ flex:1, overflow:"hidden" }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
                <span style={{ fontSize:13, color:C.light, fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>{(person||{}).name}</span>
                <span style={{ fontSize:10, color:C.dim, fontFamily:"'JetBrains Mono',monospace" }}>{thread.messages.length} exchanges</span>
              </div>
              <div style={{ fontSize:12, color:C.ember, fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", marginBottom:3 }}>{thread.topic}</div>
              <div style={{ fontSize:11, color:C.dim, fontFamily:"'Cormorant Garamond',serif", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{lastMsg.text.substring(0,60)}...</div>
            </div>
            <div style={{ fontSize:9, color:C.dim, fontFamily:"'JetBrains Mono',monospace", flexShrink:0 }}>{lastMsg.time}</div>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   APP SHELL — with notifications, all screens
   ═══════════════════════════════════════════════════════════════ */

export default function LucidApp(){
  // Persistent session — load from localStorage (never expires until logout)
  var _st = useState(function() {
    try {
      var saved = localStorage.getItem("lucid_user");
      if (saved) { return JSON.parse(saved); }
    } catch(e) {}
    return null;
  }); var user = _st[0]; var setUser = _st[1];

  // Save user to localStorage whenever it changes — belt and suspenders
  useEffect(function() {
    if (user) {
      try {
        localStorage.setItem("lucid_user", JSON.stringify(user));
        localStorage.setItem("lucid_session_active", "true");
      } catch(e) {}
    }
  }, [user]);

  var handleAuth = function(userData) {
    // Save immediately on auth — don't wait for useEffect
    try {
      localStorage.setItem("lucid_user", JSON.stringify(userData));
      localStorage.setItem("lucid_session_active", "true");
    } catch(e) {}
    setUser(userData);
  };
  var handleLogout = function() {
    setUser(null);
    try {
      localStorage.removeItem("lucid_user");
      localStorage.removeItem("lucid_session_active");
    } catch(e) {}
  };
  var _toast = useState(null); var toast = _toast[0]; var setToast = _toast[1];
  var _emberView = useState(null); var emberView = _emberView[0]; var setEmberView = _emberView[1];
  var _st2 = useState("depth"); var screen = _st2[0]; var setScreen = _st2[1];
  var _st3 = useState(false); var showLangPicker = _st3[0]; var setShowLangPicker = _st3[1];
  var _st4 = useState(false); var showNotifs = _st4[0]; var setShowNotifs = _st4[1];

  var langInit = "en";
  try {
    var raw = typeof navigator !== "undefined" ? (navigator.language || "en") : "en";
    var bl = raw.split("-")[0].toLowerCase();
    var supported = SUPPORTED_CODES;
    if (supported.indexOf(bl) !== -1) langInit = bl;
  } catch(e) {}
  var _st5 = useState(langInit); var lang = _st5[0]; var setLang = _st5[1];

  var NOTIFS = [
    {text:"Solace illuminated your reflection",time:"2h",color:C.illuminated,icon:Sparkles,action:"depth",userId:"solace"},
    {text:"Your spark was accepted by 5 people",time:"4h",color:C.ember,icon:Flame,action:"spark"},
    {text:"Kindling verified your response",time:"6h",color:"#FFD700",icon:Sun,action:"depth",userId:"kindling"},
    {text:"12 people were stirred by your reflection",time:"1d",color:C.stirred,icon:Waves,action:"depth"},
    {text:"Northlight started a thread with you",time:"1d",color:C.intelligence,icon:MessageCircle,action:"threads",userId:"northlight"},
    {text:"Your Empathy score increased +3",time:"2d",color:C.understanding,icon:Heart,action:"essence"},
    {text:"Wren warmed your Ember",time:"3h",color:C.ember,icon:Flame,action:"depth",userId:"wren"},
    {text:"Atlas joined Kindred Minds circle",time:"5h",color:"#5B8DEF",icon:Users,action:"circles",userId:"atlas"},
  ];

  if(!user)return React.createElement("div",null,React.createElement("style",null,css),React.createElement(AuthScreen,{onAuth:handleAuth,lang:lang,setLang:setLang}));

  var tier = getTier(user.essencePoints || 0);

  return (
    <div style={{background:C.void,height:"100vh",maxWidth:480,margin:"0 auto",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",paddingTop:"env(safe-area-inset-top, 0px)"}}>
      <style>{css}</style>

      {/* ═══ TOP BAR — Logo + Actions ═══ */}
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"10px 16px", 
        background:C.void, flexShrink:0,
        position:"relative", zIndex:1000,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <svg width="30" height="30" viewBox="0 0 30 30">
            <defs>
              <radialGradient id="soulLogo" cx="50%" cy="40%" r="55%">
                <stop offset="0%" stopColor={C.ember} stopOpacity="0.9"/>
                <stop offset="70%" stopColor={C.kindle} stopOpacity="0.4"/>
                <stop offset="100%" stopColor={C.ember} stopOpacity="0"/>
              </radialGradient>
            </defs>
            <circle cx="15" cy="10" r="5.5" fill={C.ember} opacity="0.85"/>
            <ellipse cx="15" cy="21" rx="8.5" ry="6.5" fill={C.ember} opacity="0.45"/>
            <circle cx="15" cy="15" r="13" fill="none" stroke={C.ember} strokeWidth="0.7" opacity="0.25" style={{animation:"breathe 5s ease-in-out infinite"}}/>
            <circle cx="15" cy="15" r="10" fill="url(#soulLogo)" opacity="0.12"/>
          </svg>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:C.light, fontWeight:400, letterSpacing:4 }}>LUCID</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          {/* Language */}
          <div style={{ position:"relative", zIndex:1001 }}>
            <button onClick={function(){setShowLangPicker(!showLangPicker);setShowNotifs(false)}} style={{ padding:"4px 7px", borderRadius:8, background:C.surface, border:"1px solid "+C.ghost, fontSize:13, lineHeight:1 }}>
              {(LANGUAGES.find(function(l){return l.code===lang}) || {}).flag || "EN"}
            </button>
            {showLangPicker && (
              <div>
                <div onClick={function(){setShowLangPicker(false)}} style={{ position:"fixed", inset:0, zIndex:998 }}/>
                <div style={{ position:"absolute", top:"100%", right:0, marginTop:6, zIndex:1002, background:C.panel, border:"1px solid "+C.ghost, borderRadius:12, padding:6, minWidth:140, boxShadow:"0 12px 40px "+C.void+"ee", maxHeight:300, overflowY:"auto" }}>
                  {LANGUAGES.map(function(l){return (
                    <button key={l.code} onClick={function(){setLang(l.code);setShowLangPicker(false)}} style={{ display:"flex", alignItems:"center", gap:8, width:"100%", padding:"8px 10px", borderRadius:8, textAlign:"left", background:lang===l.code?C.ember+"12":"transparent", color:lang===l.code?C.ember:C.mid, fontSize:12, fontFamily:"'DM Sans',sans-serif" }}>
                      <span style={{fontSize:15}}>{l.flag}</span> {l.label}
                    </button>
                  )})}
                </div>
              </div>
            )}
          </div>

          {/* Notifications bell */}
          <div style={{ position:"relative", zIndex:1001 }}>
            <button onClick={function(){setShowNotifs(!showNotifs);setShowLangPicker(false)}} style={{ padding:"5px 7px", borderRadius:8, background:C.surface, border:"1px solid "+C.ghost, position:"relative" }}>
              <Bell size={14} color={C.mid}/>
              <div style={{ position:"absolute", top:2, right:2, width:6, height:6, borderRadius:3, background:C.ember }}/>
            </button>
            {showNotifs && (
              <div>
                <div onClick={function(){setShowNotifs(false)}} style={{ position:"fixed", inset:0, zIndex:998 }}/>
                <div style={{ position:"absolute", top:"100%", right:0, marginTop:6, zIndex:1002, background:C.panel, border:"1px solid "+C.ghost, borderRadius:14, padding:8, width:280, boxShadow:"0 12px 40px "+C.void+"ee", maxHeight:350, overflowY:"auto" }}>
                  <div style={{ fontSize:10, color:C.mid, fontFamily:"'DM Sans',sans-serif", letterSpacing:1, textTransform:"uppercase", padding:"4px 8px", marginBottom:4 }}>Notifications</div>
                  {NOTIFS.map(function(n,i){return (
                    <button key={i} onClick={function(){haptic("light");if(n.action)setScreen(n.action);setShowNotifs(false)}} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"10px 10px", borderRadius:10, marginBottom:2, background:i===0?C.ember+"08":"transparent", width:"100%", textAlign:"left", cursor:"pointer", transition:"background 0.2s" }}>
                      <div style={{ width:32, height:32, borderRadius:10, background:n.color+"12", border:"1px solid "+n.color+"20", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <n.icon size={14} color={n.color}/>
                      </div>
                      <div style={{flex:1}}>
                        <div style={{ fontSize:12, color:C.light, fontFamily:"'DM Sans',sans-serif", lineHeight:1.5 }}>{n.text}</div>
                        <div style={{ fontSize:9, color:C.dim, fontFamily:"'JetBrains Mono',monospace", marginTop:3 }}>{n.time} ago</div>
                      </div>
                      <ChevronRight size={14} color={C.ghost} style={{flexShrink:0, marginTop:4}}/>
                    </button>
                  )})}
                </div>
              </div>
            )}
          </div>

          {/* LP */}
          <div style={{ display:"flex", alignItems:"center", gap:3, padding:"3px 8px", borderRadius:12, background:tier.color+"08", border:"1px solid "+tier.color+"15" }}>
            <div style={{ width:4, height:4, borderRadius:2, background:tier.color }}/>
            <span style={{ fontSize:9, color:tier.color, fontFamily:"'JetBrains Mono',monospace" }}>{user.essencePoints||0}</span>
          </div>

        </div>
      </div>

      {/* ═══ PROFILE BAR — Facebook-style ═══ */}
      <div style={{
        display:"flex", alignItems:"center", gap:14,
        padding:"8px 16px 12px",
        borderBottom:"1px solid "+C.ghost+"12",
        background:C.void,
      }}>
        <button onClick={function(){haptic("light");setScreen("essence")}} style={{ 
          width:52, height:52, borderRadius:"50%", overflow:"hidden", padding:0, flexShrink:0,
          border:screen==="essence"?"3px solid "+tier.color:"3px solid "+C.ghost+"30", 
          background:user.photo?"none":"linear-gradient(135deg,"+tier.color+"30,"+tier.color+"08)", 
          display:"flex", alignItems:"center", justifyContent:"center", 
          boxShadow:"0 4px 16px "+tier.color+"15", transition:"all 0.3s ease",
        }}>
          {user.photo ? (
            <img src={user.photo} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
          ) : (
            <span style={{ fontSize:20, color:tier.color, fontFamily:"'Cormorant Garamond',serif", fontWeight:600 }}>{(user.name||"?")[0].toUpperCase()}</span>
          )}
        </button>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:16, color:C.light, fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>{user.name}</div>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:3 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"2px 10px", borderRadius:10, background:tier.color+"10", border:"1px solid "+tier.color+"18" }}>
              <div style={{ width:5, height:5, borderRadius:3, background:tier.color, animation:"breathe 3s ease-in-out infinite" }}/>
              <span style={{ fontSize:10, color:tier.color, fontFamily:"'JetBrains Mono',monospace", fontWeight:500 }}>{tier.name}</span>
            </div>
            <span style={{ fontSize:10, color:C.dim, fontFamily:"'JetBrains Mono',monospace" }}>{user.essencePoints||0} LP</span>
          </div>
        </div>
      </div>

      <ActivityTicker/>
      <div style={{ flex:1, overflowY:"auto", overflowX:"hidden" }}>
        {screen==="depth" && <DepthExperience user={user} lang={lang}/>}
        {screen==="spark" && <SparkView user={user} lang={lang}/>}
        {screen==="circles" && <div><EmbersReel onOpenEmber={function(ember, i) { setEmberView({ embers: EMBERS_DATA, startIndex: i }); }}/><WitnessCirclesView user={user}/></div>}
        {screen==="threads" && <ThreadsView user={user}/>}
        {screen==="dna" && <DNAView user={user}/>}
        {screen==="essence" && <MyEssence user={user} lang={lang}/>}
      </div>

      <div style={{
        display:"flex", justifyContent:"space-around", alignItems:"center",
        padding:"6px 8px 28px",
        background:C.void+"f5", backdropFilter:"blur(24px)",
        borderTop:"1px solid "+C.ghost+"12", flexShrink:0,
      }}>
        {[
          {id:"spark",icon:Flame,label:"Spark"},
          {id:"depth",icon:Layers,label:"Depth"},
          {id:"circles",icon:Users,label:"Circles"},
          {id:"threads",icon:MessageCircle,label:"Threads"},
          {id:"dna",icon:Fingerprint,label:"DNA"},
          
        ].map(function(n){
          var active = screen===n.id;
          return (
          <button key={n.id} onClick={function(){setScreen(n.id);setShowLangPicker(false);setShowNotifs(false)}} style={{
            display:"flex", flexDirection:"column", alignItems:"center", gap:3,
            padding: active ? "6px 12px" : "6px 8px",
            borderRadius: 12,
            background: active ? C.ember+"18" : "transparent",
            border: active ? "1px solid "+C.ember+"30" : "1px solid transparent",
            color: active ? C.ember : C.mid,
            transition:"all 0.25s ease",
          }}>
            <n.icon size={20} strokeWidth={active?2.2:1.5}/>
            <span style={{ fontSize:9, fontWeight: active ? 600 : 400, fontFamily:"'DM Sans',sans-serif", letterSpacing:0.8, textTransform:"uppercase" }}>{n.label}</span>
          </button>
        )})}
      </div>
      {emberView&&<EmberViewer embers={EMBERS_DATA} startIndex={emberView.startIndex} onClose={function(){setEmberView(null)}}/>}
    </div>
  );
}
