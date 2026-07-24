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
const LANGUAGES = [
  { code:"en", label:"English", flag:"🇬🇧" },
  { code:"es", label:"Español", flag:"🇪🇸" },
  { code:"it", label:"Italiano", flag:"🇮🇹" },
  { code:"fr", label:"Français", flag:"🇫🇷" },
  { code:"pt", label:"Português", flag:"🇧🇷" },
  { code:"de", label:"Deutsch", flag:"🇩🇪" },
  { code:"ar", label:"العربية", flag:"🇸🇦" },
  { code:"zh", label:"中文", flag:"🇨🇳" },
  { code:"ja", label:"日本語", flag:"🇯🇵" },
];

const TRANSLATIONS = {
  en: {
    tagline:"See clearly. Feel deeply. Connect truly.",
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
    tagline:"Ve con claridad. Siente profundamente. Conéctate de verdad.",
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
    tagline:"Vedi con chiarezza. Senti profondamente. Connettiti davvero.",
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
    antiScroll:"Il tuo pensiero più interessante di oggi ti sta ancora aspettando fuori da questo schermo.",
  },
  fr: {
    tagline:"Voir clairement. Ressentir profondément. Se connecter vraiment.",
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
  pt:{tagline:"Veja com clareza. Sinta profundamente. Conecte-se de verdade.",begin:"COMECE SUA JORNADA",todaySpark:"Fagulha de hoje",spark:"Fagulha",depth:"Profundidade",dna:"DNA",essence:"Essência",back:"Voltar",goDeep:"Ir mais fundo",humanityIndex:"Seu Índice de Humanidade",torchbearer:"Portador da Tocha",createEssence:"Crie sua essência",antiScroll:"Seu pensamento mais interessante ainda está te esperando lá fora."},
  de:{tagline:"Klar sehen. Tief fühlen. Echt verbinden.",begin:"BEGINNE DEINE REISE",todaySpark:"Heutiger Funke",spark:"Funke",depth:"Tiefe",dna:"DNS",essence:"Essenz",back:"Zurück",goDeep:"Tiefer gehen",humanityIndex:"Dein Menschlichkeitsindex",torchbearer:"Fackelträger",createEssence:"Erstelle deine Essenz",antiScroll:"Dein interessantester Gedanke wartet noch draußen."},
  ar:{tagline:"انظر بوضوح. اشعر بعمق. تواصل بصدق.",begin:"ابدأ رحلتك",todaySpark:"شرارة اليوم",spark:"شرارة",depth:"عمق",essence:"جوهر",back:"رجوع",goDeep:"اذهب أعمق",humanityIndex:"مؤشر إنسانيتك",torchbearer:"حامل المشعل",createEssence:"أنشئ جوهرك"},
  zh:{tagline:"清晰地看。深深地感受。真诚地连接。",begin:"开始你的旅程",todaySpark:"今日火花",spark:"火花",depth:"深度",essence:"本质",back:"返回",goDeep:"深入探索",humanityIndex:"你的人性指数",torchbearer:"火炬手",createEssence:"创建你的本质"},
  ja:{tagline:"明確に見る。深く感じる。真につながる。",begin:"旅を始める",todaySpark:"今日のスパーク",spark:"スパーク",depth:"深さ",essence:"本質",back:"戻る",goDeep:"より深く",humanityIndex:"ヒューマニティインデックス",torchbearer:"トーチベアラー",createEssence:"エッセンスを作成"},
};

// Translation helper — falls back to English
const t = (key, lang) => (TRANSLATIONS[lang]||{})[key] || TRANSLATIONS.en[key] || key;

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

/* ── Content moderation config ─────────────────────────────── */
const BLOCKED_PATTERNS = /\b(fuck|shit|damn|ass|bitch|bastard|crap|dick|pussy|cock|slut|whore|kill|murder|hate\s+you|die|suicide|nude|naked|sex)\b/gi;
const GUIDELINES = [
  "Express emotions with depth and authenticity",
  "No profanity, offensive language, or harmful content",
  "Respect every person's experience and perspective",
  "No nudity, violence, or sexually suggestive content",
  "Share from the soul — this is a space for genuine human connection",
];

function moderateContent(text) {
  if (!text) return { safe:true, text };
  const found = text.match(BLOCKED_PATTERNS);
  if (found) return { safe:false, text, flagged:found, message:"This contains language that doesn't align with LUCID's soul-centered community. Please express your feelings with depth, not friction." };
  return { safe:true, text };
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
];

/* ═══════════════════════════════════════════════════════════════
   GLOBAL STYLES
   ═══════════════════════════════════════════════════════════════ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}body{background:${C.void};overflow:hidden}
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
.ri1{animation-delay:.08s;opacity:0}.ri2{animation-delay:.16s;opacity:0}
.ri3{animation-delay:.24s;opacity:0}.ri4{animation-delay:.32s;opacity:0}
.trait-pulse{animation:traitGlow 3s ease-in-out infinite}
.dna-container{perspective:800px;transform-style:preserve-3d}
.dna-helix{transform-style:preserve-3d;transition:transform .3s ease}
`;

/* ═══════════════════════════════════════════════════════════════
   EXPERIENCE PHOTO — Users attach their own photo to reflections
   Real moments > generated art. Your photo, your experience.
   ═══════════════════════════════════════════════════════════════ */

function ExperiencePhoto({ photo, height=160, borderRadiusTop }) {
  if (!photo) return null;
  return (
    <div style={{
      width:"100%", height, overflow:"hidden",
      borderRadius: borderRadiusTop ? "16px 16px 0 0" : 12,
    }}>
      <img src={photo} alt="Experience" style={{
        width:"100%", height:"100%", objectFit:"cover",
        filter:"brightness(0.85) saturate(1.1)",
      }}/>
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


function DNAHelixMap({ ownerId, onSelectPerson }) {
  const [activeNode, setActiveNode] = useState(null);
  const [animPhase, setAnimPhase] = useState(0);
  const [dragRotateX, setDragRotateX] = useState(0);
  const [dragRotateY, setDragRotateY] = useState(15);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX:0, startY:0, startRX:0, startRY:0 });

  useEffect(() => {
    const id = setInterval(() => setAnimPhase(p => p + 0.006), 40);
    return () => clearInterval(id);
  }, []);

  // Drag interaction for 3D rotation
  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragRef.current = { startX:e.clientX, startY:e.clientY, startRX:dragRotateX, startRY:dragRotateY };
  };
  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setDragRotateY(dragRef.current.startRY + dx * 0.3);
    setDragRotateX(Math.max(-30, Math.min(30, dragRef.current.startRX - dy * 0.2)));
  };
  const handlePointerUp = () => setIsDragging(false);

  const owner = PEOPLE[ownerId] || PEOPLE[Object.keys(PEOPLE)[0]];
  const ownerTier = getTier(owner.essencePoints);
  const connectedIds = Object.keys(PEOPLE).filter(id => id !== ownerId);

  const W = 360, H = 650;
  const cx = W / 2;
  const amp = 65;
  const freq = 0.016;
  const strandSteps = 180;

  const makeStrand = (phase, yOff = 0) => {
    const pts = [];
    for (let i = 0; i < strandSteps; i++) {
      const t = i / strandSteps;
      const y = yOff + t * H;
      const x = cx + amp * Math.sin(freq * y + phase + animPhase);
      const z = Math.cos(freq * y + phase + animPhase);
      pts.push({ x, y, z, t });
    }
    return pts;
  };

  const ownerStrand1 = makeStrand(0);
  const ownerStrand2 = makeStrand(Math.PI);

  const personStrands = connectedIds.map((id, i) => {
    const person = PEOPLE[id];
    const tier = getTier(person.essencePoints);
    const phase = (Math.PI * 2 * (i + 1)) / (connectedIds.length + 2);
    return { id, person, tier, phase, strand: makeStrand(phase) };
  });

  // Intersections
  const intersections = [];
  personStrands.forEach(ps => {
    [ownerStrand1, ownerStrand2].forEach(ownerPts => {
      for (let i = 12; i < strandSteps - 12; i += 5) {
        const oP = ownerPts[i], pP = ps.strand[i];
        const dist = Math.abs(oP.x - pP.x);
        if (dist < 10 && !intersections.some(n => Math.abs(n.y - oP.y) < 55) && intersections.length < 10) {
          const sharedIlls = REFLECTIONS.flatMap(r =>
            r.illuminations.filter(il =>
              (r.authorId === ownerId && il.userId === ps.id) ||
              (r.authorId === ps.id && il.userId === ownerId)
            ).map(il => ({ spectrum: il.spectrum, text: il.text }))
          );
          const connData = REFLECTIONS.flatMap(r => r.connections.filter(c => {
            const target = REFLECTIONS.find(x => x.id === c.toId);
            return target && ((r.authorId === ownerId && target.authorId === ps.id) || (r.authorId === ps.id && target.authorId === ownerId));
          }));
          const specKey = (sharedIlls[intersections.length % Math.max(1, sharedIlls.length)]||{}).spectrum || SPECTRUMS[intersections.length % 4].key;
          const spec = SPECTRUMS.find(s => s.key === specKey) || SPECTRUMS[0];
          const phrase = (connData[intersections.length % Math.max(1, connData.length)]||{}).sharedPhrase || (sharedIlls[0]||{}).text && (sharedIlls[0]||{}).text.substring(0, 60) || "shared experience";
          intersections.push({
            x: (oP.x + pP.x) / 2, y: oP.y, z: (oP.z + pP.z) / 2,
            personId: ps.id, person: ps.person, tier: ps.tier,
            spectrum: spec, phrase,
            strength: 55 + Math.floor(Math.random() * 40),
          });
        }
      }
    });
  });

  const toPath = (pts) => {
    if (pts.length < 2) return "";
    let d = `M${pts[0].x},${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      d += ` L${pts[i].x},${pts[i].y}`;
    }
    return d;
  };

  // Render strands with z-depth segments + 3D thickness effect
  const renderStrand3D = (pts, color, bright, baseW = 2.5) => {
    const segs = [];
    let cur = { pts: [pts[0]], front: ((pts[0]||{}).z) >= 0 };
    for (let i = 1; i < pts.length; i++) {
      const front = pts[i].z >= 0;
      if (front !== cur.front && cur.pts.length > 1) { segs.push({ ...cur }); cur = { pts: [cur.pts[cur.pts.length - 1]], front }; }
      cur.pts.push(pts[i]);
    }
    if (cur.pts.length > 1) segs.push(cur);

    return segs.map((seg, i) => {
      const opacity = bright ? (seg.front ? 0.95 : 0.2) : (seg.front ? 0.4 : 0.08);
      const w = seg.front ? baseW : baseW * 0.5;
      return (
        <g key={i}>
          {/* Glow layer */}
          {bright && seg.front && <path d={toPath(seg.pts)} fill="none" stroke={color} strokeWidth={w + 4} opacity={0.08} strokeLinecap="round"/>}
          {/* Main strand */}
          <path d={toPath(seg.pts)} fill="none" stroke={color} strokeWidth={w} opacity={opacity} strokeLinecap="round"/>
        </g>
      );
    });
  };

  // Rungs
  const rungs = [];
  for (let i = 6; i < strandSteps; i += 7) {
    const p1 = ownerStrand1[i], p2 = ownerStrand2[i];
    if (p1 && p2) rungs.push({ x1:p1.x, y1:p1.y, x2:p2.x, y2:p2.y, z:(p1.z+p2.z)/2 });
  }

  return (
    <div style={{ position:"relative" }}>
      <div style={{ textAlign:"center", marginBottom:12, padding:"0 16px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:4 }}>
          <Fingerprint size={16} color={ownerTier.color}/>
          <span style={{ fontSize:15, color:C.light, fontFamily:"'Cormorant Garamond',serif", fontWeight:500 }}>{owner.name}'s Connection DNA</span>
        </div>
        <p style={{ fontSize:11, color:C.mid, fontFamily:"'DM Sans',sans-serif" }}>Drag to rotate in 3D · Tap glowing nodes to explore</p>
      </div>

      {/* Legend */}
      <div style={{ display:"flex", justifyContent:"center", gap:12, marginBottom:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
          <div style={{ width:14, height:3, borderRadius:2, background:ownerTier.color }}/>
          <span style={{ fontSize:9, color:ownerTier.color, fontFamily:"'DM Sans',sans-serif" }}>You</span>
        </div>
        {personStrands.map(ps => (
          <div key={ps.id} style={{ display:"flex", alignItems:"center", gap:4 }}>
            <div style={{ width:14, height:3, borderRadius:2, background:ps.tier.color, opacity:0.4 }}/>
            <span style={{ fontSize:9, color:C.dim, fontFamily:"'DM Sans',sans-serif" }}>{ps.person.name}</span>
          </div>
        ))}
      </div>

      {/* 3D DNA Container */}
      <div className="dna-container"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{
          overflowY:"auto", overflowX:"hidden", maxHeight:400, borderRadius:18,
          background:`linear-gradient(180deg, ${C.abyss} 0%, ${C.deep} 40%, ${C.abyss} 100%)`,
          border:`1px solid ${C.ghost}`, cursor: isDragging ? "grabbing" : "grab",
          touchAction:"none",
        }}>
        <div className="dna-helix" style={{
          transform:`rotateX(${dragRotateX}deg) rotateY(${dragRotateY}deg)`,
          transformOrigin:"center center",
        }}>
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display:"block", margin:"0 auto" }}>
            <defs>
              <filter id="nGlow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <filter id="nGlow2"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <linearGradient id="oGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ownerTier.color} stopOpacity="0"/>
                <stop offset="10%" stopColor={ownerTier.color} stopOpacity="1"/>
                <stop offset="90%" stopColor={ownerTier.color} stopOpacity="1"/>
                <stop offset="100%" stopColor={ownerTier.color} stopOpacity="0"/>
              </linearGradient>
            </defs>

            {/* Rungs with 3D depth */}
            {rungs.map((r, i) => (
              <line key={`r${i}`} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
                stroke={ownerTier.color} strokeWidth={r.z >= 0 ? 1.2 : 0.4}
                opacity={r.z >= 0 ? 0.18 : 0.04} strokeDasharray="3,4"/>
            ))}

            {/* Other strands (behind) */}
            {personStrands.map(ps => <g key={ps.id}>{renderStrand3D(ps.strand, ps.tier.color, false, 2)}</g>)}

            {/* Owner double helix (front) */}
            <g>{renderStrand3D(ownerStrand1, ownerTier.color, true, 3)}</g>
            <g>{renderStrand3D(ownerStrand2, ownerTier.color, true, 2.5)}</g>

            {/* Intersection nodes with enhanced glow */}
            {intersections.map((node, i) => {
              const isActive = activeNode === i;
              const depthScale = 0.7 + (node.z + 1) * 0.3; // 0.7 to 1.3 based on z
              const r = (isActive ? 16 : 10) * depthScale;
              return (
                <g key={`n${i}`} onClick={(e) => { e.stopPropagation(); setActiveNode(isActive ? null : i); }} style={{ cursor:"pointer" }}>
                  {/* Outer pulse */}
                  <circle cx={node.x} cy={node.y} r={r + 12} fill={node.spectrum.color} opacity={isActive ? 0.12 : 0.05}
                    filter="url(#nGlow2)" style={{ animation:`breathe 3s ease-in-out infinite ${i*0.4}s` }}/>
                  {/* Mid ring */}
                  <circle cx={node.x} cy={node.y} r={r + 4} fill="none" stroke={node.spectrum.color}
                    strokeWidth={isActive ? 1.5 : 0.6} opacity={0.35}
                    style={{ animation:`nodeFloat 2.5s ease-in-out infinite ${i*0.3}s` }}/>
                  {/* Core */}
                  <circle cx={node.x} cy={node.y} r={r} fill={node.spectrum.color} opacity={0.15 + depthScale * 0.3} filter="url(#nGlow)"/>
                  <circle cx={node.x} cy={node.y} r={r * 0.5} fill={node.spectrum.color} opacity={0.8}/>
                  <circle cx={node.x} cy={node.y} r={r * 0.2} fill={C.light} opacity={0.9}/>
                  {isActive && (
                    <text x={node.x} y={node.y - r - 8} textAnchor="middle" fill={node.spectrum.color}
                      style={{ fontSize:"9px", fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>
                      {owner.name[0]} ↔ {node.person.name[0]}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Owner label */}
            <g>
              <circle cx={cx} cy={22} r={16} fill={C.abyss} stroke={ownerTier.color} strokeWidth="2"/>
              <text x={cx} y={27} textAnchor="middle" fill={ownerTier.color}
                style={{ fontSize:"12px", fontFamily:"'Cormorant Garamond',serif", fontWeight:600 }}>{owner.name[0]}</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Active node panel */}
      {activeNode !== null && intersections[activeNode] && (() => {
        const node = intersections[activeNode];
        return (
          <div className="di" style={{
            marginTop:10, padding:"14px 16px", borderRadius:14,
            background:C.abyss, border:`1px solid ${node.spectrum.color}25`,
          }}>
            <div style={{ position:"absolute", top:0, left:16, right:16, height:2, borderRadius:1, background:node.spectrum.color, opacity:0.5 }}/>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <Avatar name={owner.name} size={24} color={ownerTier.color} photo={owner.photo}/>
                <div style={{ width:16, height:1, background:node.spectrum.color }}/>
                <node.spectrum.icon size={13} color={node.spectrum.color}/>
                <div style={{ width:16, height:1, background:node.spectrum.color }}/>
                <Avatar name={node.person.name} size={24} color={node.tier.color} photo={node.person.photo}/>
              </div>
              <span style={{ fontSize:11, color:node.spectrum.color, fontFamily:"'JetBrains Mono',monospace" }}>{node.strength}%</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:6 }}>
              <span style={{ fontSize:10, color:node.spectrum.color, fontFamily:"'DM Sans'", padding:"2px 8px", borderRadius:6, background:`${node.spectrum.color}12` }}>{node.spectrum.label}</span>
              <span style={{ fontSize:10, color:C.mid, fontFamily:"'DM Sans'" }}>{owner.name} ↔ {node.person.name}</span>
            </div>
            <p style={{ fontSize:12, color:C.light, fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", lineHeight:1.6, marginBottom:8 }}>"{node.phrase}"</p>
            <button onClick={() => onSelectPerson && onSelectPerson(node.personId)} style={{
              width:"100%", padding:"8px 12px", borderRadius:8,
              border:`1px solid ${node.tier.color}25`, background:`${node.tier.color}06`,
              color:node.tier.color, fontSize:11, fontFamily:"'DM Sans'",
              display:"flex", alignItems:"center", justifyContent:"center", gap:5,
            }}>See {node.person.name}'s essence <ChevronRight size={12}/></button>
          </div>
        );
      })()}

      {/* Spectrum key */}
      <div style={{ display:"flex", justifyContent:"center", gap:10, marginTop:10 }}>
        {SPECTRUMS.map(s => (
          <div key={s.key} style={{ display:"flex", alignItems:"center", gap:3 }}>
            <div style={{ width:6, height:6, borderRadius:3, background:s.color, boxShadow:`0 0 6px ${s.color}44` }}/>
            <span style={{ fontSize:8, color:C.dim, fontFamily:"'DM Sans'" }}>{s.label}</span>
          </div>
        ))}
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
      <DNAHelixMap ownerId="solace" onSelectPerson={setViewPerson}/>
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
  const cx=size/2, cy=size/2, maxR=size/2-44;

  const path = HI_AXES.map((ax,i) => {
    const angle = i*step - Math.PI/2;
    const val = ((data||{})[ax.key] || 50) / 100;
    const r = val * maxR;
    return `${i===0?"M":"L"}${cx+Math.cos(angle)*r},${cy+Math.sin(angle)*r}`;
  }).join(" ") + " Z";

  const avg = HI_AXES.reduce((s,ax) => s + ((data||{})[ax.key]||50), 0) / n;

  return (
    <div style={{ textAlign:"center" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid rings */}
        {[0.25, 0.5, 0.75, 1].map((s,i) => {
          const ring = HI_AXES.map((_, j) => {
            const a = j*step - Math.PI/2;
            return `${j===0?"M":"L"}${cx+Math.cos(a)*maxR*s},${cy+Math.sin(a)*maxR*s}`;
          }).join(" ") + " Z";
          return <path key={i} d={ring} fill="none" stroke={C.ghost} strokeWidth="0.5" opacity="0.25"/>;
        })}
        {/* Axis lines */}
        {HI_AXES.map((ax,i) => {
          const a = i*step - Math.PI/2;
          return <line key={i} x1={cx} y1={cy} x2={cx+Math.cos(a)*maxR} y2={cy+Math.sin(a)*maxR} stroke={C.ghost} strokeWidth="0.5" opacity="0.2"/>;
        })}
        {/* Data shape */}
        <path d={path} fill={`${C.ember}12`} stroke={C.ember} strokeWidth="2" opacity="0.8"
          style={{ animation:"breathe 5s ease-in-out infinite" }}/>
        {/* Axis endpoints with glow */}
        {HI_AXES.map((ax,i) => {
          const a = i*step - Math.PI/2;
          const val = ((data||{})[ax.key] || 50) / 100;
          const r = val * maxR;
          const px = cx+Math.cos(a)*r, py = cy+Math.sin(a)*r;
          const lx = cx+Math.cos(a)*(maxR+26), ly = cy+Math.sin(a)*(maxR+26);
          return (
            <g key={i}>
              <circle cx={px} cy={py} r={6} fill={ax.color} opacity="0.8"/>
              <circle cx={px} cy={py} r={12} fill={ax.color} opacity="0.12"/>
              <text x={lx} y={ly+3} textAnchor="middle" fill={ax.color} opacity="0.8"
                style={{ fontSize:"11px", fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>
                {ax.label.replace("\n"," ")}
              </text>
              <text x={lx} y={ly+16} textAnchor="middle" fill={ax.color}
                style={{ fontSize:"13px", fontFamily:"'JetBrains Mono',monospace", fontWeight:600 }}>
                {(data||{})[ax.key] || 50}
              </text>
            </g>
          );
        })}
        {/* Center score */}
        <text x={cx} y={cy-4} textAnchor="middle" fill={C.light}
          style={{ fontSize:"30px", fontFamily:"'Cormorant Garamond',serif", fontWeight:600 }}>
          {Math.round(avg)}
        </text>
        <text x={cx} y={cy+16} textAnchor="middle" fill={C.dim}
          style={{ fontSize:"9px", fontFamily:"'DM Sans',sans-serif", letterSpacing:2 }}>
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
  const [showPw,setShowPw]=useState(false);
  const [phase,setPhase]=useState(0);
  const fileRef=useRef(null);

  useEffect(()=>{if(mode==="landing"){const t=[];[400,900,1400,2000].forEach((d,i)=>t.push(setTimeout(()=>setPhase(i+1),d)));return()=>t.forEach(clearTimeout);}
  },[mode]);

  const validate=()=>{const e={};if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))e.email="Valid email required";if(mode==="register"){if(form.name.length<2)e.name="Essence name required";if(form.password.length<8)e.password="Min 8 chars, uppercase & number";else if(!/[A-Z]/.test(form.password)||!/[0-9]/.test(form.password))e.password="Include uppercase and number";if(form.password!==form.confirmPw)e.confirmPw="Passwords don't match";}else if(!form.password)e.password="Required";setErrors(e);return !Object.keys(e).length;};

  const handleAuth=()=>{if(!validate())return;if(mode==="register")setMode("setup");else onAuth({name:"You",email:form.email,bio:"",values:[],essencePoints:0,photo:null,soulprint:[50,50,50,50,50,50,50,50],spectrum:{intelligence:50,understanding:50,communication:50,appreciation:50},rewards:{witnessed:0,stirred:0,illuminated:0,rippled:0}});};

  const finishSetup=()=>onAuth({name:form.name,email:form.email,bio,values,essencePoints:0,photo,profileBg:null,soulprint:[50,50,50,50,50,50,50,50],spectrum:{intelligence:50,understanding:50,communication:50,appreciation:50},rewards:{witnessed:0,stirred:0,illuminated:0,rippled:0},humanityIndex:{depth:50,empathy:50,criticalThinking:50,impact:50,consistency:50}});

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
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,color:C.light,fontWeight:400,marginBottom:6,textAlign:"center"}}>Your opening line</h2>
        <textarea value={bio} onChange={e=>setBio(e.target.value)} rows={4} placeholder="I'm someone who..."
          style={{width:"100%",padding:16,borderRadius:12,background:C.surface,border:`1px solid ${C.ghost}`,color:C.light,fontSize:14,fontFamily:"'Cormorant Garamond',serif",lineHeight:1.7,resize:"none",marginBottom:16}}/>
        {/* Community guidelines */}
        <div style={{padding:"12px 14px",borderRadius:10,background:`${C.understanding}06`,border:`1px solid ${C.understanding}12`,marginBottom:20}}>
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
    <div className="di" style={{padding:"0 20px",paddingBottom:100}}>
      <div className="ri" style={{marginBottom:24}}>
        <p style={{fontSize:14,color:C.mid,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",lineHeight:1.6}}>Three chapters today. Each holds a human experience and its own visual aura — born from the emotions within.</p>
      </div>
      {REFLECTIONS.map((ref,i)=>{
        const au=PEOPLE[ref.authorId],tier=getTier(au.essencePoints);
        return(
          <div key={ref.id} className={`ri ri${i+1}`} onClick={()=>goDeep(ref)} style={{background:C.abyss,borderRadius:18,marginBottom:16,cursor:"pointer",border:`1px solid ${C.ghost}`,overflow:"hidden"}}>
            {/* User's experience photo */}
            {ref.photo && <ExperiencePhoto photo={ref.photo} height={140} borderRadiusTop/>}
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
          {r.photo && <ExperiencePhoto photo={r.photo} height={180} borderRadiusTop/>}
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

        {/* Humanity Index — the real measure */}
        <div className="ri ri2" style={{background:C.abyss,borderRadius:16,padding:"16px 8px",marginBottom:14,border:`1px solid ${C.ghost}`}}>
          <div style={{fontSize:10,color:C.mid,fontFamily:"'DM Sans'",letterSpacing:1.5,textTransform:"uppercase",marginBottom:4,textAlign:"center"}}>Humanity Index</div>
          <HumanityIndexViz data={p.humanityIndex} size={320}/>
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
  return(<div style={{height:"100%"}}>
    <div style={{padding:"10px 20px",display:"flex",alignItems:"center",gap:12}}>
      {depth>0&&<button onClick={goBack} style={{color:C.mid,display:"flex",alignItems:"center",gap:4,fontSize:12,fontFamily:"'DM Sans'"}}><ArrowLeft size={16}/>Back</button>}
      <div style={{marginLeft:depth>0?"auto":0}}><DepthNav depth={depth} labels={labels}/></div>
    </div>
    <div key={`d${depth}-${(selRef||{}).id}-${(selPerson||{}).id}`}>{layers[depth]()}</div>
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

const QUALITIES = [
  {
    key:"mindfulness", label:"Mindfulness", color:"#5BB8EF",
    icon: Eye,
    poeticLow:"A seed of awareness, waiting to unfurl.",
    poeticMid:"You're learning to notice the world before reacting to it.",
    poeticHigh:"Presence flows through you like breath — natural, constant, quiet.",
    moments:["Completed 12 silence sparks","Averaged 140-word reflections","82 hours offline this month"],
  },
  {
    key:"morality", label:"Morality", color:"#E8C84A",
    icon: Shield,
    poeticLow:"The compass is forming. True north is ahead.",
    poeticMid:"You stand by your word. Others notice even when you don't.",
    poeticHigh:"Your integrity isn't performed — it's structural. People trust you because you've earned it in the quiet moments.",
    moments:["100% community guideline adherence","Constructive engagement in 14 Arena debates","Consistently supportive illuminations"],
  },
  {
    key:"empathy", label:"Empathy", color:"#4AE8C4",
    icon: Heart,
    poeticLow:"You're beginning to hear what people mean beneath what they say.",
    poeticMid:"When others speak, you listen with your whole self. They feel it.",
    poeticHigh:"You carry others' experiences without losing yourself. That's rare. That's empathy matured into wisdom.",
    moments:["47 illuminations through Understanding","31 Kindred connections formed","Resonated with 89% of vulnerability reflections"],
  },
  {
    key:"kindness", label:"Kindness", color:"#E88A5B",
    icon: Sun,
    poeticLow:"Small warmths are gathering. Keep tending them.",
    poeticMid:"Your words leave people feeling lighter. That's a gift few give consciously.",
    poeticHigh:"Kindness isn't what you do — it's what radiates from you. Your illuminations have become lifelines for people you'll never meet.",
    moments:["Most-stirred illumination author this week","Supported 28 first-time reflectors","Kindled 6 reflections on grief with grace"],
  },
  {
    key:"courage", label:"Courage", color:"#E85B8D",
    icon: Flame,
    poeticLow:"The edge is calling. You're gathering the nerve.",
    poeticMid:"You've started choosing discomfort over avoidance. That's where growth lives.",
    poeticHigh:"You walk toward what frightens you, and you write about it honestly. Your vulnerability gives others permission to be human.",
    moments:["Completed 8 'deep reach' difficulty sparks","Shared 12 reflections tagged Vulnerability","Started 3 disagreement conversations"],
  },
  {
    key:"wisdom", label:"Wisdom", color:"#A86BDB",
    icon: Lightbulb,
    poeticLow:"Questions are forming that don't have easy answers. Good.",
    poeticMid:"You're seeing patterns — not just in others, but in yourself. That's the beginning of wisdom.",
    poeticHigh:"Your reflections don't just describe experiences — they illuminate truths. People return to your words like bookmarks in a book they're still learning from.",
    moments:["Depth score averaging 91","14 reflections Rippled into new ones","Top-rated Arena argument on individualism"],
  },
];

function EssenceBloomViz({ qualities, size=380, tier }) {
  const cx=size/2, cy=size/2, maxR=size/2-40;
  const n=qualities.length;
  const step=(2*Math.PI)/n;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <filter id="bloomGlow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="softBloom"><feGaussianBlur stdDeviation="14" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <radialGradient id="centerLight">
          <stop offset="0%" stopColor={tier.color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={tier.color} stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Ambient center glow */}
      <circle cx={cx} cy={cy} r={80} fill="url(#centerLight)" filter="url(#softBloom)"/>

      {/* Concentric guide rings */}
      {[0.3,0.6,0.9].map((s,i)=>(
        <circle key={i} cx={cx} cy={cy} r={maxR*s} fill="none" stroke={C.ghost} strokeWidth="0.5" opacity="0.25"
          strokeDasharray={i===2?"":"3,5"} />
      ))}

      {/* Quality petals — organic shapes radiating from center */}
      {qualities.map((q,i) => {
        const angle = i * step - Math.PI/2;
        const level = q.level; // 0-1
        const petalR = 30 + level * (maxR - 40);
        const tipX = cx + Math.cos(angle) * petalR;
        const tipY = cy + Math.sin(angle) * petalR;

        // Bezier control points for organic petal shape
        const spread = 0.32;
        const cp1Angle = angle - spread;
        const cp2Angle = angle + spread;
        const cpR = petalR * 0.55;
        const cp1x = cx + Math.cos(cp1Angle) * cpR;
        const cp1y = cy + Math.sin(cp1Angle) * cpR;
        const cp2x = cx + Math.cos(cp2Angle) * cpR;
        const cp2y = cy + Math.sin(cp2Angle) * cpR;

        const path = `M${cx},${cy} Q${cp1x},${cp1y} ${tipX},${tipY} Q${cp2x},${cp2y} ${cx},${cy}`;

        // Glow orb at tip — scaled up
        const glowR = 5 + level * 10;

        return (
          <g key={q.key}>
            {/* Petal body */}
            <path d={path} fill={`${q.color}${Math.round(8 + level * 15).toString(16).padStart(2,'0')}`}
              stroke={q.color} strokeWidth={1 + level * 1.5} opacity={0.3 + level * 0.5}
              style={{ transition:"all 1s ease" }}
            />
            {/* Glow trail along petal */}
            <line x1={cx} y1={cy} x2={tipX} y2={tipY}
              stroke={q.color} strokeWidth={level * 3} opacity={level * 0.12}
              filter="url(#softBloom)"
            />
            {/* Tip orb */}
            <circle cx={tipX} cy={tipY} r={glowR}
              fill={q.color} opacity={0.2 + level * 0.5}
              filter="url(#bloomGlow)"
              style={{ animation:`breathe ${3 + i*0.4}s ease-in-out infinite ${i*0.3}s` }}
            />
            <circle cx={tipX} cy={tipY} r={glowR * 0.4}
              fill={q.color} opacity={0.7 + level * 0.3}
            />
            {/* Label — larger, clearer */}
            <text x={cx + Math.cos(angle) * (petalR + 24)} y={cy + Math.sin(angle) * (petalR + 24) + 4}
              textAnchor="middle" fill={q.color} opacity={0.7 + level * 0.3}
              style={{ fontSize:"11px", fontFamily:"'DM Sans',sans-serif", fontWeight:500, letterSpacing:"0.5px" }}>
              {q.label}
            </text>
          </g>
        );
      })}

      {/* Center core — the self */}
      <circle cx={cx} cy={cy} r={18} fill={C.abyss} stroke={tier.color} strokeWidth="2"
        style={{ animation:"pulseGlow 4s ease-in-out infinite" }}/>
      <circle cx={cx} cy={cy} r={8} fill={tier.color} opacity="0.5"/>
      <circle cx={cx} cy={cy} r={3} fill={C.light} opacity="0.8"/>
    </svg>
  );
}

function QualityExpandedView({ quality, onClose }) {
  const q = quality;
  const levelLabel = q.level > 0.7 ? "Flourishing" : q.level > 0.4 ? "Growing" : "Emerging";
  const poeticText = q.level > 0.7 ? q.poeticHigh : q.level > 0.4 ? q.poeticMid : q.poeticLow;

  return (
    <div className="di" style={{
      position:"absolute", inset:0, background:`${C.void}f8`, zIndex:200,
      display:"flex", flexDirection:"column", padding:20, overflow:"auto",
    }}>
      {/* Close */}
      <button onClick={onClose} style={{ alignSelf:"flex-start", color:C.mid, display:"flex", alignItems:"center", gap:4, fontSize:12, fontFamily:"'DM Sans',sans-serif", marginBottom:20 }}>
        <ArrowLeft size={16}/> Back to bloom
      </button>

      {/* Quality header */}
      <div style={{ textAlign:"center", marginBottom:28, position:"relative" }}>
        {/* Background aura */}
        <div style={{
          position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
          width:200, height:200, borderRadius:"50%",
          background:`radial-gradient(circle, ${q.color}12 0%, transparent 70%)`,
          filter:"blur(30px)", pointerEvents:"none",
        }}/>

        <div style={{
          width:64, height:64, borderRadius:"50%", margin:"0 auto 16px",
          background:`${q.color}12`, border:`1.5px solid ${q.color}30`,
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:`0 0 30px ${q.color}15`,
        }}>
          <q.icon size={28} color={q.color}/>
        </div>

        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, color:C.light, fontWeight:400, letterSpacing:1 }}>
          {q.label}
        </h2>

        <div style={{
          display:"inline-flex", alignItems:"center", gap:6, marginTop:8,
          padding:"4px 14px", borderRadius:16,
          background:`${q.color}10`, border:`1px solid ${q.color}20`,
        }}>
          <div style={{ width:6, height:6, borderRadius:3, background:q.color, boxShadow:`0 0 8px ${q.color}55` }}/>
          <span style={{ fontSize:11, color:q.color, fontFamily:"'DM Sans',sans-serif" }}>{levelLabel}</span>
          <span style={{ fontSize:10, color:C.dim, fontFamily:"'JetBrains Mono',monospace" }}>
            {Math.round(q.level * 100)}%
          </span>
        </div>
      </div>

      {/* Growth visualization — organic fill */}
      <div style={{ marginBottom:24, padding:"0 10px" }}>
        <div style={{ width:"100%", height:6, borderRadius:3, background:`${C.ghost}33`, overflow:"hidden", position:"relative" }}>
          <div style={{
            width:`${q.level * 100}%`, height:"100%", borderRadius:3,
            background:`linear-gradient(90deg, ${q.color}44, ${q.color})`,
            transition:"width 1.5s ease",
            boxShadow:`0 0 12px ${q.color}33`,
          }}/>
        </div>
      </div>

      {/* Poetic description */}
      <div style={{
        background:`${C.abyss}`, borderRadius:16, padding:"24px 20px",
        border:`1px solid ${q.color}12`, marginBottom:20,
        position:"relative", overflow:"hidden",
      }}>
        <div style={{
          position:"absolute", top:-20, right:-20, width:80, height:80, borderRadius:"50%",
          background:`radial-gradient(circle, ${q.color}08 0%, transparent 70%)`,
          pointerEvents:"none",
        }}/>
        <p style={{
          fontFamily:"'Cormorant Garamond',serif", fontSize:17, color:C.light,
          lineHeight:1.85, fontStyle:"italic",
        }}>
          {poeticText}
        </p>
      </div>

      {/* Key moments — what built this quality */}
      <div style={{
        background:C.abyss, borderRadius:14, padding:"18px 16px",
        border:`1px solid ${C.ghost}`, marginBottom:20,
      }}>
        <div style={{ fontSize:10, color:q.color, fontFamily:"'DM Sans',sans-serif", letterSpacing:1, textTransform:"uppercase", marginBottom:14 }}>
          What shaped this
        </div>
        {q.moments.map((m, i) => (
          <div key={i} style={{
            display:"flex", alignItems:"flex-start", gap:10, marginBottom:i < q.moments.length - 1 ? 12 : 0,
          }}>
            <div style={{
              width:6, height:6, borderRadius:3, background:q.color,
              marginTop:5, flexShrink:0, boxShadow:`0 0 6px ${q.color}44`,
            }}/>
            <p style={{ fontSize:13, color:C.light, fontFamily:"'Cormorant Garamond',serif", lineHeight:1.6 }}>
              {m}
            </p>
          </div>
        ))}
      </div>

      {/* Invitation to grow */}
      <div style={{
        padding:"16px 18px", borderRadius:14,
        background:`${q.color}06`, border:`1px solid ${q.color}12`,
      }}>
        <p style={{ fontSize:12, color:q.color, fontFamily:"'DM Sans',sans-serif", lineHeight:1.6 }}>
          <Sparkles size={12} style={{ marginRight:6, verticalAlign:"middle" }}/>
          {q.level < 0.5
            ? `Continue reflecting on experiences that challenge your ${q.label.toLowerCase()}. Each spark accepted is a seed planted.`
            : q.level < 0.8
            ? `Your ${q.label.toLowerCase()} is becoming visible to others. Keep illuminating reflections that move you.`
            : `You've reached a rare depth of ${q.label.toLowerCase()}. Your presence on LUCID is quietly transforming how others experience connection.`
          }
        </p>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   UNIFIED ESSENCE — Profile + Humanity Index as ONE organism
   Photo at center of pentagon. Identity, metrics, qualities,
   dynamic activity all flow as a single living representation.
   ═══════════════════════════════════════════════════════════════ */

function UnifiedProfileViz({ user, humanityData, size=320 }) {
  const tier = getTier(user.essencePoints || 0);
  const n = HI_AXES.length, step = (2*Math.PI)/n;
  const cx=size/2, cy=size/2, maxR=size/2-38;
  const photoR = 38;

  const path = HI_AXES.map((ax,i) => {
    const angle = i*step - Math.PI/2;
    const val = ((humanityData||{})[ax.key] || 50) / 100;
    const r = val * maxR;
    return `${i===0?"M":"L"}${cx+Math.cos(angle)*r},${cy+Math.sin(angle)*r}`;
  }).join(" ") + " Z";

  const avg = HI_AXES.reduce((s,ax) => s + ((humanityData||{})[ax.key]||50), 0) / n;

  return (
    <div style={{ position:"relative", width:size, height:size, margin:"0 auto" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position:"absolute", inset:0 }}>
        <defs>
          <clipPath id="profileClip"><circle cx={cx} cy={cy} r={photoR}/></clipPath>
          <filter id="profileGlow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>

        {/* Grid rings */}
        {[0.33, 0.66, 1].map((s,i) => {
          const ring = HI_AXES.map((_, j) => {
            const a = j*step - Math.PI/2;
            return `${j===0?"M":"L"}${cx+Math.cos(a)*maxR*s},${cy+Math.sin(a)*maxR*s}`;
          }).join(" ") + " Z";
          return <path key={i} d={ring} fill="none" stroke={C.ghost} strokeWidth="0.5" opacity="0.2"/>;
        })}

        {/* Axis lines */}
        {HI_AXES.map((ax,i) => {
          const a = i*step - Math.PI/2;
          return <line key={i} x1={cx} y1={cy} x2={cx+Math.cos(a)*maxR} y2={cy+Math.sin(a)*maxR} stroke={C.ghost} strokeWidth="0.5" opacity="0.15"/>;
        })}

        {/* Humanity shape */}
        <path d={path} fill={`${tier.color}10`} stroke={tier.color} strokeWidth="2" opacity="0.85"
          style={{ animation:"breathe 5s ease-in-out infinite" }}/>

        {/* Axis endpoints + labels */}
        {HI_AXES.map((ax,i) => {
          const a = i*step - Math.PI/2;
          const val = ((humanityData||{})[ax.key] || 50) / 100;
          const r = val * maxR;
          const px = cx+Math.cos(a)*r, py = cy+Math.sin(a)*r;
          const lx = cx+Math.cos(a)*(maxR+22), ly = cy+Math.sin(a)*(maxR+22);
          return (
            <g key={i}>
              <circle cx={px} cy={py} r={5} fill={ax.color} opacity="0.85"/>
              <circle cx={px} cy={py} r={10} fill={ax.color} opacity="0.1"/>
              <text x={lx} y={ly+3} textAnchor="middle" fill={ax.color} opacity="0.8"
                style={{ fontSize:"9px", fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>
                {ax.label.replace("\n"," ")}
              </text>
              <text x={lx} y={ly+15} textAnchor="middle" fill={ax.color}
                style={{ fontSize:"12px", fontFamily:"'JetBrains Mono',monospace", fontWeight:600 }}>
                {(humanityData||{})[ax.key] || 50}
              </text>
            </g>
          );
        })}

        {/* Center: profile photo ring */}
        <circle cx={cx} cy={cy} r={photoR+4} fill="none" stroke={tier.color} strokeWidth="2" opacity="0.4"/>
        <circle cx={cx} cy={cy} r={photoR+8} fill="none" stroke={tier.color} strokeWidth="0.5" opacity="0.15"
          style={{ animation:"breathe 4s ease-in-out infinite" }}/>
      </svg>

      {/* Profile photo — HTML overlay at center of SVG */}
      <div style={{
        position:"absolute",
        left:cx - photoR, top:cy - photoR,
        width:photoR*2, height:photoR*2,
        borderRadius:"50%", overflow:"hidden",
        border:`2.5px solid ${tier.color}55`,
        boxShadow:`0 0 20px ${tier.color}18`,
      }}>
        {user.photo ? (
          <img src={user.photo} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
        ) : (
          <div style={{
            width:"100%", height:"100%",
            background:`linear-gradient(135deg, ${tier.color}25, ${tier.color}08)`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:28, color:tier.color, fontFamily:"'Cormorant Garamond',serif", fontWeight:600,
          }}>
            {(user.name || "?")[0].toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
}

function MyEssence({user, lang}) {
  const tier = getTier(user.essencePoints || 0);
  const currentLang = lang || "en";
  const [expanded, setExpanded] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [profileBg, setProfileBg] = useState(user.profileBg || null);
  const bgRef = useRef(null);

  const handleBgUpload = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader(); r.onload = (ev) => setProfileBg(ev.target.result); r.readAsDataURL(f);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ display:`${pos.coords.latitude.toFixed(1)}°, ${pos.coords.longitude.toFixed(1)}°` }),
        () => setUserLocation({ display:"Location not shared" }),
        { timeout:5000 }
      );
    }
  }, []);

  const qualityLevels = useMemo(() => {
    const pts = user.essencePoints || 0;
    const base = Math.min(pts / 1400, 1);
    return QUALITIES.map((q, i) => ({
      ...q,
      level: Math.min(1, base * (0.6 + Math.sin(i * 1.2 + 0.5) * 0.4 + 0.4)),
    }));
  }, [user.essencePoints]);

  const avg = HI_AXES.reduce((s,ax) => s + (((user.humanityIndex||{})[ax.key])||50), 0) / HI_AXES.length;

  // Dynamic activity content
  const ACTIVITY = [
    { type:"spark", text:"Your spark was accepted by 3 people", time:"2h ago", color:C.ember },
    { type:"illuminate", text:"Solace illuminated your reflection", time:"4h ago", color:C.understanding },
    { type:"stirred", text:"Your reflection stirred 12 people today", time:"6h ago", color:C.stirred },
    { type:"growth", text:"Empathy score increased +3 this week", time:"1d ago", color:C.understanding },
  ];

  if (expanded !== null) {
    return (
      <div style={{ position:"relative", height:"100%" }}>
        <QualityExpandedView quality={qualityLevels[expanded]} onClose={() => setExpanded(null)}/>
      </div>
    );
  }

  return (
    <div style={{ padding:16, paddingBottom:100, overflowY:"auto", maxHeight:"calc(100vh - 70px)" }}>

      {/* ═══ PROFILE BACKGROUND BANNER ═══ */}
      {/* Background image upload */}
      <div onClick={() => bgRef.current && bgRef.current.click()} style={{
        width:"100%", height: profileBg ? 120 : 50, cursor:"pointer",
        background: profileBg ? "none" : C.abyss,
        borderRadius:"20px 20px 0 0", overflow:"hidden", position:"relative",
        border:"1px solid " + C.ghost, borderBottom:"none",
      }}>
        {profileBg ? (
          <img src={profileBg} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.6)" }}/>
        ) : (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100%", gap:6 }}>
            <Camera size={14} color={C.dim}/>
            <span style={{ fontSize:10, color:C.dim, fontFamily:"'DM Sans',sans-serif" }}>Add background</span>
          </div>
        )}
      </div>
      <input ref={bgRef} type="file" accept="image/*" onChange={handleBgUpload} style={{ display:"none" }}/>

      {/* ═══ UNIFIED PROFILE CARD ═══ */}
      <div className="ri" style={{
        padding:"0 12px 16px", marginBottom:16, textAlign:"center",
        background: C.abyss,
        borderRadius: profileBg ? "0 0 20px 20px" : 20,
        border:"1px solid " + C.ghost,
        borderTop: profileBg ? "none" : "1px solid " + C.ghost,
      }}>
        <div style={{ marginTop: profileBg ? -20 : 12, position:"relative", zIndex:2 }}>
          <UnifiedProfileViz
            user={user}
            humanityData={user.humanityIndex || {depth:50,empathy:50,criticalThinking:50,impact:50,consistency:50}}
            size={300}
          />

        {/* Name + Tier + Humanity score — below the visual */}
        <div style={{ marginTop:4 }}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, color:C.light, fontWeight:400 }}>
            {user.name}
          </h2>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginTop:6 }}>
            <div style={{
              display:"inline-flex", alignItems:"center", gap:5,
              padding:"4px 12px", borderRadius:14,
              background:`${tier.color}10`, border:`1px solid ${tier.color}18`,
            }}>
              <div style={{ width:5, height:5, borderRadius:3, background:tier.color, boxShadow:`0 0 6px ${tier.color}44` }}/>
              <span style={{ fontSize:11, color:tier.color, fontFamily:"'JetBrains Mono',monospace" }}>{tier.name}</span>
            </div>
            <div style={{
              display:"inline-flex", alignItems:"center", gap:4,
              padding:"4px 12px", borderRadius:14,
              background:`${C.ember}08`, border:`1px solid ${C.ember}15`,
            }}>
              <span style={{ fontSize:11, color:C.ember, fontFamily:"'JetBrains Mono',monospace" }}>{Math.round(avg)}</span>
              <span style={{ fontSize:9, color:C.dim, fontFamily:"'DM Sans',sans-serif" }}>humanity</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p style={{
          fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:C.mid,
          lineHeight:1.7, maxWidth:300, margin:"12px auto 0",
        }}>
          {user.bio || "Your essence emerges through reflection..."}
        </p>

        {/* Location + Values row */}
        <div style={{ marginTop:12 }}>
          {userLocation && (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:4, marginBottom:8 }}>
              <Compass size={11} color={C.dim}/>
              <span style={{ fontSize:10, color:C.dim, fontFamily:"'DM Sans',sans-serif" }}>{userLocation.display}</span>
            </div>
          )}
          {(user.values||[]).length > 0 && (
            <div style={{ display:"flex", flexWrap:"wrap", gap:5, justifyContent:"center" }}>
              {user.values.map(v => (
                <span key={v} style={{
                  fontSize:10, color:C.ember, padding:"4px 10px", borderRadius:8,
                  background:`${C.ember}08`, border:`1px solid ${C.ember}12`,
                  fontFamily:"'DM Sans',sans-serif",
                }}>{v}</span>
              ))}
            </div>
          )}
        </div>

        {/* Quick stats row */}
        <div style={{ display:"flex", justifyContent:"center", gap:20, marginTop:14, paddingTop:12, borderTop:`1px solid ${C.ghost}15` }}>
          {[
            { val:(user.rewards||{}).witnessed||0, label:"Witnessed", color:C.witnessed },
            { val:(user.rewards||{}).stirred||0, label:"Stirred", color:C.stirred },
            { val:(user.rewards||{}).illuminated||0, label:"Illuminated", color:C.illuminated },
            { val:(user.rewards||{}).rippled||0, label:"Rippled", color:C.rippled },
          ].map((s,i) => (
            <div key={i} style={{ textAlign:"center" }}>
              <div style={{ fontSize:16, color:s.color, fontFamily:"'Cormorant Garamond',serif", fontWeight:600 }}>{s.val}</div>
              <div style={{ fontSize:7, color:C.dim, fontFamily:"'DM Sans',sans-serif", textTransform:"uppercase", letterSpacing:0.5, marginTop:1 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* ═══ DYNAMIC ACTIVITY FEED ═══ */}
      <div className="ri ri1" style={{
        background:C.abyss, borderRadius:16, padding:"14px 14px",
        border:`1px solid ${C.ghost}`, marginBottom:16,
      }}>
        <div style={{ fontSize:10, color:C.mid, fontFamily:"'DM Sans',sans-serif", letterSpacing:1.5, textTransform:"uppercase", marginBottom:10 }}>
          Recent activity
        </div>
        {ACTIVITY.map((a, i) => (
          <div key={i} style={{
            display:"flex", alignItems:"center", gap:10, padding:"8px 0",
            borderBottom: i < ACTIVITY.length-1 ? `1px solid ${C.ghost}15` : "none",
          }}>
            <div style={{ width:6, height:6, borderRadius:3, background:a.color, boxShadow:`0 0 6px ${a.color}33`, flexShrink:0 }}/>
            <span style={{ fontSize:12, color:C.light, fontFamily:"'DM Sans',sans-serif", flex:1 }}>{a.text}</span>
            <span style={{ fontSize:9, color:C.dim, fontFamily:"'JetBrains Mono',monospace", flexShrink:0 }}>{a.time}</span>
          </div>
        ))}
      </div>

      {/* ═══ JOURNEY MAP ═══ */}
      {user.journey && user.journey.length > 0 && (
        <div className="ri ri2" style={{ marginBottom:16 }}>
          <div style={{ fontSize:10, color:C.mid, fontFamily:"'DM Sans',sans-serif", letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>
            Your journey
          </div>
          <JourneyMap person={user}/>
        </div>
      )}

      {/* ═══ ESSENCE BLOOM — Qualities ═══ */}
      <div className="ri ri3" style={{
        background:C.abyss, borderRadius:18, padding:"16px 0 12px",
        border:`1px solid ${C.ghost}`, textAlign:"center", marginBottom:16,
      }}>
        <div style={{ fontSize:10, color:C.mid, fontFamily:"'DM Sans',sans-serif", letterSpacing:1.5, textTransform:"uppercase", marginBottom:2 }}>
          Essence bloom
        </div>
        <p style={{ fontSize:11, color:C.dim, fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", marginBottom:4 }}>
          Tap any quality to explore
        </p>
        <EssenceBloomViz qualities={qualityLevels} size={340} tier={tier}/>
      </div>

      {/* Quality cards — tappable */}
      <div style={{ marginBottom:8 }}>
        <div style={{ fontSize:10, color:C.mid, fontFamily:"'DM Sans',sans-serif", letterSpacing:1, textTransform:"uppercase", marginBottom:10, paddingLeft:4 }}>
          The qualities within you
        </div>
        {qualityLevels.map((q, i) => {
          const levelLabel = q.level > 0.7 ? "Flourishing" : q.level > 0.4 ? "Growing" : "Emerging";
          const poeticText = q.level > 0.7 ? q.poeticHigh : q.level > 0.4 ? q.poeticMid : q.poeticLow;
          return (
            <div key={q.key} className={`ri ri${Math.min(i+1,4)}`}
              onClick={() => setExpanded(i)}
              style={{
                background:C.abyss, borderRadius:14, padding:"14px 14px",
                marginBottom:8, cursor:"pointer",
                border:`1px solid ${C.ghost}`,
                borderLeft:`3px solid ${q.color}55`,
                position:"relative", overflow:"hidden",
              }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                <div style={{
                  width:30, height:30, borderRadius:"50%",
                  background:`${q.color}10`, border:`1px solid ${q.color}20`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  <q.icon size={14} color={q.color}/>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ fontSize:13, color:C.light, fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>{q.label}</span>
                    <span style={{ fontSize:9, color:q.color, fontFamily:"'JetBrains Mono',monospace", padding:"2px 7px", borderRadius:6, background:`${q.color}10` }}>{levelLabel}</span>
                  </div>
                </div>
                <ChevronRight size={14} color={C.dim}/>
              </div>
              <div style={{ width:"100%", height:3, borderRadius:2, background:`${C.ghost}33`, marginBottom:6 }}>
                <div style={{ width:`${q.level * 100}%`, height:"100%", borderRadius:2, background:`linear-gradient(90deg, ${q.color}55, ${q.color})`, boxShadow:`0 0 8px ${q.color}22` }}/>
              </div>
              <p style={{ fontSize:12, color:C.mid, fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", lineHeight:1.5 }}>
                {poeticText.substring(0, 80)}{poeticText.length > 80 ? "..." : ""}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SparkView({ user, lang }) {
  const [tab, setTab] = useState("browse");       // browse | create | mySparks | respond
  const [selectedSpark, setSelectedSpark] = useState(null);
  const [phase, setPhase] = useState("view");      // view → accepted → reflect → submitted
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
      setTimeout(() => { setSparkCreated(false); setTab("mySparks"); setNewSparkPrompt(""); }, 2500);
    }
  };

  const handleSubmitResponse = () => {
    const check = moderateContent(reflectText);
    if (!check.safe) { setModWarn(check.message); return; }
    if (wordCount >= 20 && emotions.length >= 1) setPhase("submitted");
  };

  // ── BROWSE community sparks ──
  const renderBrowse = () => (
    <div className="di">
      <div className="ri" style={{ marginBottom:20 }}>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:C.light, fontWeight:400, marginBottom:4 }}>
          Community Sparks
        </h3>
        <p style={{ fontSize:12, color:C.mid, fontFamily:"'DM Sans',sans-serif", lineHeight:1.5 }}>
          Real challenges from real people. Accept one, live it, come back and share what you felt.
        </p>
      </div>

      {COMMUNITY_SPARKS.map((spark, i) => {
        const creator = PEOPLE[spark.creatorId];
        const cTier = getTier((creator||{}).essencePoints || 0);
        const returnRate = spark.accepted > 0 ? Math.round((spark.returned / spark.accepted) * 100) : 0;
        return (
          <div key={spark.id} className={`ri ri${Math.min(i+1,4)}`}
            onClick={() => { setSelectedSpark(spark); setPhase("view"); }}
            style={{
              background:C.abyss, borderRadius:16, padding:"18px 16px",
              marginBottom:12, cursor:"pointer", border:`1px solid ${C.ghost}`,
              borderLeft:`3px solid ${cTier.color}44`,
            }}>
            {/* Creator */}
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <Avatar name={(creator||{}).name} size={34} color={cTier.color} photo={(creator||{}).photo}/>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ fontSize:13, color:C.light, fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>{(creator||{}).name}</span>
                  {(creator||{}).torchbearer && <Sun size={12} color="#FFD700"/>}
                </div>
                <span style={{ fontSize:10, color:C.dim, fontFamily:"'DM Sans',sans-serif" }}>Spark creator</span>
              </div>
              <div style={{ textAlign:"right" }}>
                <span style={{ fontSize:10, color:C.ember, fontFamily:"'JetBrains Mono',monospace" }}>{spark.category}</span>
              </div>
            </div>

            {/* Prompt */}
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:C.light, lineHeight:1.7, marginBottom:14 }}>
              "{spark.prompt}"
            </p>

            {/* Metrics — the social proof */}
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              <div style={{ display:"flex", alignItems:"center", gap:4, padding:"4px 10px", borderRadius:8, background:`${C.ember}08`, border:`1px solid ${C.ember}12` }}>
                <Flame size={11} color={C.ember}/>
                <span style={{ fontSize:10, color:C.ember, fontFamily:"'JetBrains Mono',monospace" }}>{spark.accepted}</span>
                <span style={{ fontSize:9, color:C.dim, fontFamily:"'DM Sans',sans-serif" }}>accepted</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:4, padding:"4px 10px", borderRadius:8, background:`${C.understanding}08`, border:`1px solid ${C.understanding}12` }}>
                <ArrowLeft size={11} color={C.understanding} style={{ transform:"rotate(180deg)" }}/>
                <span style={{ fontSize:10, color:C.understanding, fontFamily:"'JetBrains Mono',monospace" }}>{returnRate}%</span>
                <span style={{ fontSize:9, color:C.dim, fontFamily:"'DM Sans',sans-serif" }}>returned</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:4, padding:"4px 10px", borderRadius:8, background:`${C.appreciation}08`, border:`1px solid ${C.appreciation}12` }}>
                <Brain size={11} color={C.appreciation}/>
                <span style={{ fontSize:10, color:C.appreciation, fontFamily:"'JetBrains Mono',monospace" }}>{spark.avgDepth}</span>
                <span style={{ fontSize:9, color:C.dim, fontFamily:"'DM Sans',sans-serif" }}>depth</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // ── SPARK DETAIL + ACCEPT + REFLECT + RESPONSES ──
  const renderSparkDetail = () => {
    if (!selectedSpark) return null;
    const spark = selectedSpark;
    const creator = PEOPLE[spark.creatorId];
    const cTier = getTier((creator||{}).essencePoints || 0);

    // ── Submitted ──
    if (phase === "submitted") return (
      <div className="di" style={{ textAlign:"center", padding:"40px 0" }}>
        <div style={{ width:64, height:64, borderRadius:"50%", margin:"0 auto 16px", background:`${C.ember}12`, border:`1.5px solid ${C.ember}30`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 0 30px ${C.glow}`, animation:"pulseGlow 3s ease-in-out infinite" }}>
          <Feather size={28} color={C.ember}/>
        </div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:C.light, fontWeight:400, marginBottom:6 }}>Experience shared</h2>
        <p style={{ fontSize:13, color:C.mid, fontFamily:"'Cormorant Garamond',serif", lineHeight:1.6, maxWidth:280, margin:"0 auto 20px" }}>
          {(creator||{}).name} will review your response. Your ability to express genuine feeling is being measured — not for judgment, but for growth.
        </p>
        <div style={{ display:"flex", gap:16, justifyContent:"center", marginBottom:24 }}>
          <div style={{ textAlign:"center" }}><div style={{ fontSize:22, color:C.ember, fontFamily:"'Cormorant Garamond',serif", fontWeight:600 }}>+{spark.points}</div><div style={{ fontSize:8, color:C.dim, fontFamily:"'DM Sans',sans-serif", textTransform:"uppercase" }}>Lucidity</div></div>
          <div style={{ textAlign:"center" }}><div style={{ fontSize:22, color:C.understanding, fontFamily:"'Cormorant Garamond',serif", fontWeight:600 }}>{Math.min(97, 55+wordCount)}</div><div style={{ fontSize:8, color:C.dim, fontFamily:"'DM Sans',sans-serif", textTransform:"uppercase" }}>Soul depth</div></div>
        </div>
        <button onClick={() => { setPhase("view"); setSelectedSpark(null); setReflectText(""); setEmotions([]); setReflectPhoto(null); setPerspectiveText(""); }}
          style={{ padding:"10px 28px", borderRadius:12, background:C.surface, border:`1px solid ${C.ghost}`, color:C.mid, fontSize:12, fontFamily:"'DM Sans',sans-serif" }}>
          Back to sparks
        </button>
      </div>
    );

    return (
      <div className="di">
        {/* Back */}
        <button onClick={() => { setSelectedSpark(null); setPhase("view"); }} style={{ color:C.mid, display:"flex", alignItems:"center", gap:4, fontSize:12, fontFamily:"'DM Sans',sans-serif", marginBottom:16 }}>
          <ArrowLeft size={16}/> All sparks
        </button>

        {/* Creator card */}
        <div style={{ display:"flex", alignItems:"center", gap:12, padding:14, borderRadius:14, background:C.abyss, border:`1px solid ${cTier.color}15`, marginBottom:16 }}>
          <Avatar name={(creator||{}).name} size={44} color={cTier.color} photo={(creator||{}).photo}/>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ fontSize:14, color:C.light, fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>{(creator||{}).name}</span>
              {(creator||{}).torchbearer && <Sun size={13} color="#FFD700"/>}
              <span style={{ fontSize:9, color:cTier.color, fontFamily:"'JetBrains Mono',monospace", padding:"2px 6px", borderRadius:6, background:`${cTier.color}10` }}>{cTier.name}</span>
            </div>
            <span style={{ fontSize:11, color:C.mid, fontFamily:"'DM Sans',sans-serif" }}>Spark creator · comes back to verify responses</span>
          </div>
        </div>

        {/* Spark prompt */}
        <div style={{ background:`linear-gradient(160deg,${C.abyss},${C.surface}55)`, borderRadius:18, padding:"22px 18px", border:`1px solid ${C.ember}10`, marginBottom:16, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-20, right:-20, width:100, height:100, background:`radial-gradient(circle,${C.glow},transparent 70%)`, borderRadius:"50%", pointerEvents:"none", animation:"breathe 5s ease-in-out infinite" }}/>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
            <Flame size={16} color={C.ember}/>
            <span style={{ fontSize:12, color:C.ember, fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>{spark.category}</span>
            <span style={{ fontSize:11, color:C.dim, fontFamily:"'JetBrains Mono',monospace", marginLeft:"auto" }}>~{spark.time}</span>
          </div>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, color:C.light, lineHeight:1.7, marginBottom:16 }}>
            {spark.prompt}
          </p>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom: phase === "view" ? 16 : 0 }}>
            <div style={{ display:"flex", gap:4 }}>{[1,2,3].map(i => <div key={i} style={{ width:7, height:7, borderRadius:4, background:i <= spark.difficulty ? C.ember : C.ghost }}/>)}</div>
            <span style={{ fontSize:11, color:C.dim, fontFamily:"'DM Sans',sans-serif" }}>{spark.difficulty === 1 ? "Gentle" : spark.difficulty === 2 ? "Stretch" : "Deep reach"}</span>
            <span style={{ fontSize:12, color:C.understanding, fontFamily:"'JetBrains Mono',monospace", marginLeft:"auto" }}>+{spark.points} LP</span>
          </div>

          {phase === "view" && (
            <button onClick={() => setPhase("accepted")} style={{ width:"100%", padding:14, borderRadius:14, background:`linear-gradient(135deg,${C.ember},${C.kindle})`, color:C.void, fontSize:14, fontFamily:"'DM Sans',sans-serif", fontWeight:600, boxShadow:`0 8px 24px ${C.glow}` }}>
              Accept this Spark
            </button>
          )}
          {phase === "accepted" && (
            <div style={{ marginTop:14 }}>
              <div style={{ padding:12, borderRadius:12, background:`${C.understanding}08`, border:`1px solid ${C.understanding}20`, display:"flex", alignItems:"center", justifyContent:"center", gap:8, color:C.understanding, fontSize:13, fontFamily:"'DM Sans',sans-serif", marginBottom:12 }}>
                <Check size={16}/> Go live it — {(creator||{}).name} will review your response
              </div>
              <button onClick={() => setPhase("reflect")} style={{ width:"100%", padding:12, borderRadius:12, border:`1px solid ${C.ember}22`, background:`${C.ember}06`, color:C.ember, fontSize:13, fontFamily:"'DM Sans',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                <Pen size={14}/> I lived it — share my experience
              </button>
            </div>
          )}
        </div>

        {/* ═══ REFLECT on this spark ═══ */}
        {phase === "reflect" && (
          <div className="di">
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, color:C.light, fontWeight:400, marginBottom:4 }}>
              What did you experience?
            </h3>
            <p style={{ fontSize:12, color:C.mid, fontFamily:"'DM Sans',sans-serif", marginBottom:14 }}>
              {(creator||{}).name} will read this. Express what you genuinely felt — not what sounds good.
            </p>
            <div style={{ background:C.abyss, borderRadius:14, padding:16, border:`1px solid ${modWarn ? C.warmth : C.ghost}`, marginBottom:14 }}>
              <textarea value={reflectText} onChange={e => { setReflectText(e.target.value); setModWarn(null); }} rows={6}
                placeholder="When I did this, I felt..."
                style={{ width:"100%", background:"transparent", border:"none", color:C.light, fontSize:15, fontFamily:"'Cormorant Garamond',serif", lineHeight:1.8, resize:"none" }}/>
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:8, borderTop:`1px solid ${C.ghost}`, paddingTop:8 }}>
                <span style={{ fontSize:11, color:C.dim, fontFamily:"'JetBrains Mono',monospace" }}>{wordCount} words</span>
                <span style={{ fontSize:11, color:wordCount >= 50 ? C.understanding : C.dim, fontFamily:"'DM Sans',sans-serif" }}>
                  {wordCount < 20 ? `${20-wordCount} more` : wordCount < 50 ? "Keep going" : "Good depth"}
                </span>
              </div>
            </div>
            {modWarn && <div style={{ display:"flex", alignItems:"flex-start", gap:6, marginBottom:12, padding:"8px 12px", borderRadius:8, background:`${C.warmth}08`, border:`1px solid ${C.warmth}15` }}><AlertTriangle size={13} color={C.warmth} style={{ flexShrink:0, marginTop:1 }}/><span style={{ fontSize:11, color:C.warmth, fontFamily:"'DM Sans',sans-serif" }}>{modWarn}</span></div>}
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, color:C.light, fontFamily:"'DM Sans',sans-serif", marginBottom:8 }}>Emotions (1–5)</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                {EMOTION_OPTIONS.map(em => <EmChip key={em} emotion={em} active={emotions.includes(em)} onClick={() => setEmotions(p => p.includes(em) ? p.filter(x=>x!==em) : p.length<5 ? [...p,em] : p)}/>)}
              </div>
            </div>
            {/* Perspective challenge */}
            {wordCount >= 20 && (
              <div style={{ marginBottom:14, padding:14, borderRadius:14, background:`${C.intelligence}06`, border:`1px solid ${C.intelligence}12` }}>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
                  <Brain size={14} color={C.intelligence}/><span style={{ fontSize:12, color:C.intelligence, fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>Perspective Challenge</span>
                  <span style={{ fontSize:9, color:C.dim, fontFamily:"'JetBrains Mono',monospace", marginLeft:"auto" }}>+20 LP</span>
                </div>
                <p style={{ fontSize:11, color:C.mid, fontFamily:"'Cormorant Garamond',serif", lineHeight:1.5, marginBottom:10 }}>What would someone with a completely different perspective say about this?</p>
                <textarea value={perspectiveText} onChange={e => setPerspectiveText(e.target.value)} placeholder="Someone else might see this differently because..." rows={2}
                  style={{ width:"100%", padding:10, borderRadius:8, background:C.surface, border:`1px solid ${C.ghost}`, color:C.light, fontSize:12, fontFamily:"'Cormorant Garamond',serif", lineHeight:1.5, resize:"none" }}/>
              </div>
            )}
            {/* Photo */}
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, color:C.light, fontFamily:"'DM Sans',sans-serif", marginBottom:6 }}>Photo <span style={{ color:C.dim }}>(optional)</span></div>
              <div onClick={() => photoRef.current && photoRef.current.click()} style={{ borderRadius:12, overflow:"hidden", border:`1px dashed ${reflectPhoto ? C.ember : C.ghost}`, background:reflectPhoto?"none":C.surface, height:reflectPhoto?120:60, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                {reflectPhoto ? <img src={reflectPhoto} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/> : <Camera size={18} color={C.dim}/>}
              </div>
              <input ref={photoRef} type="file" accept="image/*" onChange={handleReflectPhoto} style={{ display:"none" }}/>
            </div>
            <button onClick={handleSubmitResponse} disabled={wordCount<20||emotions.length<1}
              style={{ width:"100%", padding:14, borderRadius:14, background:wordCount>=20&&emotions.length>=1?`linear-gradient(135deg,${C.ember},${C.kindle})`:C.ghost, color:wordCount>=20&&emotions.length>=1?C.void:C.dim, fontSize:14, fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>
              {wordCount < 20 ? `${20-wordCount} more words` : emotions.length < 1 ? "Choose an emotion" : "Share your experience"}
            </button>
          </div>
        )}

        {/* ═══ RESPONSES — other people's experiences + creator reviews ═══ */}
        {phase === "view" && spark.responses.length > 0 && (
          <div style={{ marginTop:4 }}>
            <div style={{ fontSize:11, color:C.mid, fontFamily:"'DM Sans',sans-serif", letterSpacing:1, textTransform:"uppercase", marginBottom:12 }}>
              Experiences shared · {spark.responses.length} souls responded
            </div>
            {spark.responses.map((resp, i) => {
              const respPerson = PEOPLE[resp.userId];
              const rTier = getTier((respPerson||{}).essencePoints || 0);
              return (
                <div key={i} style={{ background:C.abyss, borderRadius:14, padding:16, marginBottom:12, border:`1px solid ${C.ghost}` }}>
                  {/* Responder */}
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                    <Avatar name={(respPerson||{}).name} size={30} color={rTier.color} photo={(respPerson||{}).photo}/>
                    <span style={{ fontSize:12, color:C.light, fontFamily:"'DM Sans',sans-serif" }}>{(respPerson||{}).name}</span>
                    <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:4 }}>
                      <span style={{ fontSize:10, color:C.appreciation, fontFamily:"'JetBrains Mono',monospace" }}>depth {resp.depthScore}</span>
                    </div>
                  </div>
                  {/* Response text */}
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:C.light, lineHeight:1.7, marginBottom:10 }}>
                    {resp.text}
                  </p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:10 }}>
                    {resp.emotions.map(em => <EmChip key={em} emotion={em} active small/>)}
                  </div>
                  {/* Creator verification — this is the key differentiator */}
                  {resp.verified && resp.creatorReview && (
                    <div style={{ padding:"12px 14px", borderRadius:12, background:`${cTier.color}06`, border:`1px solid ${cTier.color}15`, marginTop:8 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
                        <Avatar name={(creator||{}).name} size={20} color={cTier.color} photo={(creator||{}).photo}/>
                        <span style={{ fontSize:10, color:cTier.color, fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>
                          {(creator||{}).name} verified
                        </span>
                        <Check size={12} color={cTier.color}/>
                      </div>
                      <p style={{ fontSize:12, color:C.mid, fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", lineHeight:1.6 }}>
                        "{resp.creatorReview}"
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Soul metrics for this spark */}
        {phase === "view" && (
          <div style={{ background:C.abyss, borderRadius:14, padding:16, border:`1px solid ${C.ghost}`, marginTop:8 }}>
            <div style={{ fontSize:10, color:C.mid, fontFamily:"'DM Sans',sans-serif", letterSpacing:1, textTransform:"uppercase", marginBottom:12 }}>Spark performance</div>
            <div style={{ display:"flex", justifyContent:"space-around" }}>
              {[
                { val:spark.accepted, label:"Accepted", color:C.ember },
                { val:`${spark.accepted > 0 ? Math.round((spark.returned/spark.accepted)*100) : 0}%`, label:"Return rate", color:C.understanding },
                { val:spark.avgDepth, label:"Avg depth", color:C.appreciation },
                { val:spark.responses.filter(r => r.verified).length, label:"Verified", color:"#FFD700" },
              ].map((m, i) => (
                <div key={i} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:18, color:m.color, fontFamily:"'Cormorant Garamond',serif", fontWeight:600 }}>{m.val}</div>
                  <div style={{ fontSize:8, color:C.dim, fontFamily:"'DM Sans',sans-serif", textTransform:"uppercase", letterSpacing:0.5 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── CREATE a spark ──
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
          "Your latest spark will appear here once created"
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
      {selectedSpark ? renderSparkDetail() :
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
          <button style={{ padding:"6px 14px", borderRadius:10, border:"1px dashed "+C.ember+"44", color:C.ember, fontSize:11, fontFamily:"'DM Sans',sans-serif" }}>+ Join</button>
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
  var _st = useState(null); var user = _st[0]; var setUser = _st[1];
  var _st2 = useState("depth"); var screen = _st2[0]; var setScreen = _st2[1];
  var _st3 = useState(false); var showLangPicker = _st3[0]; var setShowLangPicker = _st3[1];
  var _st4 = useState(false); var showNotifs = _st4[0]; var setShowNotifs = _st4[1];

  var langInit = "en";
  try {
    var raw = typeof navigator !== "undefined" ? (navigator.language || "en") : "en";
    var bl = raw.split("-")[0].toLowerCase();
    var supported = LANGUAGES.map(function(l){return l.code});
    if (supported.indexOf(bl) !== -1) langInit = bl;
  } catch(e) {}
  var _st5 = useState(langInit); var lang = _st5[0]; var setLang = _st5[1];

  var NOTIFS = [
    {text:"Solace illuminated your reflection",time:"2h",color:C.illuminated,icon:Sparkles},
    {text:"Your spark was accepted by 5 people",time:"4h",color:C.ember,icon:Flame},
    {text:"Kindling verified your response",time:"6h",color:"#FFD700",icon:Sun},
    {text:"12 people were stirred by your reflection",time:"1d",color:C.stirred,icon:Waves},
    {text:"Northlight started a thread with you",time:"1d",color:C.intelligence,icon:MessageCircle},
    {text:"Your Empathy score increased +3",time:"2d",color:C.understanding,icon:Heart},
  ];

  if(!user)return React.createElement("div",null,React.createElement("style",null,css),React.createElement(AuthScreen,{onAuth:setUser,lang:lang,setLang:setLang}));

  var tier = getTier(user.essencePoints || 0);

  return (
    <div style={{background:C.void,height:"100vh",maxWidth:480,margin:"0 auto",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column"}}>
      <style>{css}</style>

      <div style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"10px 12px", borderBottom:"1px solid "+C.ghost+"12",
        background:C.void+"ee", backdropFilter:"blur(16px)", flexShrink:0,
        position:"relative", zIndex:1000,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ width:26, height:26, borderRadius:"50%", background:C.ember+"10", border:"1px solid "+C.ember+"25", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Eye size={13} color={C.ember}/>
          </div>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:16, color:C.light, fontWeight:500, letterSpacing:2 }}>LUCID</span>
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
                    <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"8px 8px", borderRadius:8, marginBottom:2, background:i===0?C.ember+"06":"transparent" }}>
                      <n.icon size={13} color={n.color} style={{flexShrink:0,marginTop:2}}/>
                      <div style={{flex:1}}>
                        <div style={{ fontSize:11, color:C.light, fontFamily:"'DM Sans',sans-serif", lineHeight:1.4 }}>{n.text}</div>
                        <div style={{ fontSize:9, color:C.dim, fontFamily:"'JetBrains Mono',monospace", marginTop:2 }}>{n.time}</div>
                      </div>
                    </div>
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

          {/* Profile */}
          <button onClick={function(){setScreen("essence")}} style={{ width:30, height:30, borderRadius:"50%", overflow:"hidden", padding:0, border:screen==="essence"?"2px solid "+tier.color:"2px solid "+C.ghost+"33", background:user.photo?"none":"linear-gradient(135deg,"+tier.color+"30,"+tier.color+"10)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {user.photo ? (
              <img src={user.photo} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
            ) : (
              <span style={{ fontSize:12, color:tier.color, fontFamily:"'Cormorant Garamond',serif", fontWeight:600 }}>{(user.name||"?")[0].toUpperCase()}</span>
            )}
          </button>
        </div>
      </div>

      <div style={{ flex:1, overflow:"hidden" }}>
        {screen==="depth" && <DepthExperience user={user} lang={lang}/>}
        {screen==="spark" && <SparkView user={user} lang={lang}/>}
        {screen==="circles" && <WitnessCirclesView user={user}/>}
        {screen==="threads" && <ThreadsView user={user}/>}
        {screen==="dna" && <DNAView user={user}/>}
        {screen==="essence" && <MyEssence user={user} lang={lang}/>}
      </div>

      <div style={{
        display:"flex", justifyContent:"space-around",
        padding:"5px 2px 20px",
        background:C.void+"f0", backdropFilter:"blur(16px)",
        borderTop:"1px solid "+C.ghost+"12", flexShrink:0,
      }}>
        {[
          {id:"spark",icon:Flame,label:"Spark"},
          {id:"depth",icon:Layers,label:"Depth"},
          {id:"circles",icon:Users,label:"Circles"},
          {id:"threads",icon:MessageCircle,label:"Threads"},
          {id:"dna",icon:Fingerprint,label:"DNA"},
          {id:"essence",icon:Eye,label:"Me"},
        ].map(function(n){return (
          <button key={n.id} onClick={function(){setScreen(n.id);setShowLangPicker(false);setShowNotifs(false)}} style={{
            display:"flex", flexDirection:"column", alignItems:"center", gap:2,
            padding:"4px 4px",
            color:screen===n.id?C.ember:C.dim,
            opacity:screen===n.id?1:0.4,
          }}>
            <n.icon size={16} strokeWidth={screen===n.id?2:1.5}/>
            <span style={{ fontSize:7, fontFamily:"'DM Sans',sans-serif", letterSpacing:0.5, textTransform:"uppercase" }}>{n.label}</span>
          </button>
        )})}
      </div>
    </div>
  );
}
