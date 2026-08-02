# LUCID i18n Architecture Plan

## Why inline t() replacements keep crashing
The current 3200+ line LucidApp.jsx has translation calls scattered through a massive 
single component. String replacements accidentally hit state values (setPhase("accepted")), 
module-level constants (REWARDS labels), and components without lang access.

## Proposed Architecture

### File structure:
```
src/
  i18n/
    index.ts          — t() function + language detection
    en.json           — English strings (~120 keys)
    it.json           — Italian
    fr.json           — French  
    es.json           — Spanish
    pt.json           — Portuguese
    de.json           — German
```

### How it works:
1. Each JSON file has flat key-value pairs: `{"nav.spark": "Spark", "nav.depth": "Depth"}`
2. `t()` function imported from `src/i18n/index.ts` — reads from JSON at runtime
3. Language stored in localStorage, passed via React context (not prop drilling)
4. Components use `const { t, lang } = useI18n()` hook — no prop needed
5. Fallback chain: requested lang → English → key name

### Key namespaces:
- `nav.*` — Navigation tabs
- `auth.*` — Login/register/setup flow
- `spark.*` — Spark view
- `depth.*` — Depth layers
- `circles.*` — Witness Circles
- `threads.*` — Connection Threads
- `profile.*` — Me/Essence profile
- `embers.*` — Embers feature
- `notif.*` — Notifications
- `common.*` — Shared (Continue, Back, Join, etc.)

### Migration strategy:
1. Create i18n module + JSON files
2. Add useI18n() context provider at app root
3. Replace strings ONE component at a time, testing each
4. Never touch module-level constants — translate at render time only

## Languages: EN, IT, FR, PT, ES, DE
