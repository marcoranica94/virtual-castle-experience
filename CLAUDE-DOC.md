# Castello AR — Documentazione Tecnica

Ultimo aggiornamento: 2026-03-30

## Decisioni Architetturali

### 2026-03-30 — Migrazione a Angular 21
- **Motivazione:** l'utente ha richiesto uno stack professionale, pronto per il futuro, con TypeScript e framework serio
- **Stack scelto:** Angular 21 + TypeScript strict + Tailwind CSS 4
- **Perché Angular:** TypeScript nativo, tutto incluso (routing, DI, forms), architettura scalabile, SSR-ready
- **Perché Tailwind:** design system con @theme tokens, purge automatico, zero CSS custom
- **Hosting:** GitHub Pages via `angular-cli-ghpages` — `npm run deploy` → branch `gh-pages`
- **Routing:** `withHashLocation()` (necessario per SPA su GitHub Pages — URL tipo `/#/sala/rossa`)
- **baseHref:** `/virtual-castle-experience/` impostato in `angular.json` (configurazione production)
- **Vecchio stack HTML/JS vanilla rimosso completamente**

### Architettura componenti
- **Standalone components** (no NgModules) — standard Angular moderno
- **Lazy loading** su tutte le route — bundle iniziale 63 kB
- **Signals** per lo stato reattivo (non RxJS per lo stato UI)
- **ArService** carica A-Frame/MindAR **dinamicamente** via script injection (non nel bundle)
- **Dati sala separati dal codice** — aggiungere una sala = aggiungere un file .ts tipizzato

### Convenzioni
- Un componente = un file `.ts` (template inline per componenti semplici)
- Servizi `providedIn: 'root'` (singleton)
- Nomi file: kebab-case, nomi classi: PascalCase
- Route: lazy loaded via `loadComponent`

## Versioni in Uso
| Libreria | Versione | Data |
|---|---|---|
| Angular | 21.2.6 | 2026-03-30 |
| Angular CLI | 21.2.5 | 2026-03-30 |
| TypeScript | 5.9.2 | 2026-03-30 |
| Tailwind CSS | 4.2.2 | 2026-03-30 |
| MindAR | 1.2.5 | 2026-03-30 |
| A-Frame | 1.7.1 | 2026-03-30 |
| Node.js | v24.14.0 | 2026-03-30 |

## Problemi Noti e Soluzioni
| Problema | Soluzione |
|---|---|
| A-Frame non è un modulo ES — non si può importare | Caricamento dinamico via `document.createElement('script')` in ArService |
| TS strict non accetta `window as Record` | Cast via `unknown` intermedio |
| SPA routing non funziona su GitHub Pages | `withHashLocation()` in `app.config.ts` — URL con `#` |
| Build Angular con GitHub Pages sbagliato il baseHref | `"baseHref": "/virtual-castle-experience/"` in `angular.json` production |

## Cosa Funziona
- Build Angular compilato con successo (63 kB iniziali)
- Routing lazy-loaded: Home → Sala → Esperienza AR → Tutorial → Profilo
- Servizi: ProgressService (badge/punti), ArService (compatibilità + load librerie), AnalyticsService
- Componenti UI: Card, ProgressBar, SubtitleOverlay, Quiz, InfoPanel
- Dati Sala Rossa tipizzati e separati dal codice

## Cosa Non Funziona / Limitazioni
- **Asset mancanti:** servono modelli 3D (.glb), audio (.mp3), immagini target e file .mind
- **Contenuti placeholder:** testi, sottotitoli, quiz, timeline — da sostituire con info reali
- **Non testato su device reale** — serve hosting HTTPS per test AR

## Asset Utilizzati
| Asset | Provenienza | Licenza | Note |
|---|---|---|---|
| castellano.glb | DA FORNIRE | — | Avatar adulti, serve animazione "talking" |
| drago.glb | DA FORNIRE | — | Draghetto cartoon, serve animazione "idle" |
| narrazione-castellano.mp3 | DA FORNIRE | — | Audio narrazione adulti, max 3 min |
| narrazione-drago.mp3 | DA FORNIRE | — | Audio drago bambini, max 2 min |
| target-*.mind | DA GENERARE | — | Compilare con MindAR compiler |
