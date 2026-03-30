# CLAUDE.md — Istruzioni per Claude Code

Questo è il progetto **Castello AR** — esperienza di Realtà Aumentata WebAR per la visita alla Rocca Albani di Urgnano.

---

## PRIMA DI QUALSIASI COSA

1. **Leggi la skill:** `castello-ar-skill/SKILL.md` — contiene il workflow obbligatorio a 6 fasi
2. **Leggi il reference:** `castello-ar-skill/CASTELLO-AR-REFERENCE.md` — stack, versioni, convenzioni
3. **Leggi lo stato del progetto:**
    - `CLAUDE-DOC.md` — decisioni tecniche, versioni, problemi risolti
    - `ISTRUZIONI-DEV.md` — azioni pendenti per l'utente
    - `BACKLOG.md` — task, sprint corrente, priorità

Se uno di questi file non esiste, crealo usando i template in `castello-ar-skill/templates/`.

---

## REGOLE CHIAVE

- **Versioni:** verifica SEMPRE l'ultima versione stabile di Angular, MindAR, A-Frame e qualsiasi libreria prima di usarla. Mai versioni vecchie.
- **Leggi prima di toccare:** leggi SEMPRE i file esistenti prima di modificarli. Mai riscrivere da zero.
- **TypeScript strict:** tutto il codice è TypeScript con strict mode. Mai `any` senza motivo documentato.
- **Mobile-first:** il progetto è SOLO per smartphone. Testa sempre pensando a mobile.
- **iOS Safari:** mai autoplay audio. Sempre pulsante per l'utente.
- **Dopo ogni push:** aggiorna CLAUDE-DOC.md, ISTRUZIONI-DEV.md e BACKLOG.md.
- **Conferma prima di implementare:** mostra all'utente cosa farai e chiedi OK.

---

## STACK

- **Framework:** Angular 21 (standalone components, signals, lazy routing)
- **Linguaggio:** TypeScript 5.9+ (strict mode)
- **Styling:** Tailwind CSS 4 (design tokens via @theme)
- **AR Engine:** MindAR.js 1.2.5 + A-Frame 1.7.1 (caricati dinamicamente via ArService)
- **AR GPS:** AR.js (solo per giardino/GPS — futuro)
- **State:** Angular signals + localStorage (via ProgressService)
- **Build:** Angular CLI + Vite (produzione ottimizzata)
- **Hosting:** GitHub Pages via `angular-cli-ghpages` (`npm run deploy` → branch `gh-pages`)
- **Nessun database** — localStorage per punti/badge

---

## STRUTTURA PROGETTO

```
castello-ar/
├── CLAUDE.md                     ← Questo file
├── CLAUDE-DOC.md                 ← Decisioni tecniche (aggiorna sempre)
├── ISTRUZIONI-DEV.md             ← Azioni per l'utente (aggiorna sempre)
├── BACKLOG.md                    ← Task e sprint (aggiorna sempre)
├── angular.json                  ← Configurazione Angular CLI
├── tsconfig.json                 ← Configurazione TypeScript (strict)
├── package.json
├── public/                       ← Asset statici (copiati nel build)
│   └── assets/
│       └── sala-rossa/
│           ├── models/           ← File .glb
│           ├── audio/            ← File .mp3
│           ├── images/           ← Immagini target originali
│           └── targets/          ← File .mind compilati
├── src/
│   ├── index.html
│   ├── main.ts                   ← Bootstrap Angular
│   ├── styles.css                ← Tailwind + tema castello
│   └── app/
│       ├── app.ts                ← Root component
│       ├── app.config.ts         ← Providers (router)
│       ├── app.routes.ts         ← Routing con lazy loading
│       ├── types/
│       │   └── index.ts          ← Interfacce TypeScript
│       ├── services/
│       │   ├── progress.service.ts  ← Badge, punti, stato sale
│       │   ├── ar.service.ts        ← Compatibilità, caricamento librerie AR
│       │   └── analytics.service.ts ← Tracciamento eventi
│       ├── data/
│       │   ├── rooms.ts          ← Registry sale
│       │   └── sala-rossa.ts     ← Dati sala rossa (tipizzati)
│       ├── components/           ← Componenti riutilizzabili
│       │   ├── card/
│       │   ├── progress-bar/
│       │   ├── subtitle-overlay/
│       │   ├── quiz/
│       │   └── info-panel/
│       └── routes/               ← Pagine (lazy loaded)
│           ├── home/
│           ├── room-menu/
│           ├── ar-experience/
│           ├── tutorial/
│           └── profile/
└── castello-ar-skill/            ← Skill + reference + templates
```

---

## ARCHITETTURA

### Aggiungere una nuova sala
1. Creare `src/app/data/sala-nome.ts` con i dati tipizzati (implementa `RoomConfig`)
2. Registrarla in `src/app/data/rooms.ts`
3. Mettere gli asset in `public/assets/sala-nome/`
4. **Zero codice nuovo** — routing e componenti sono generici

### Le 3 esperienze AR
Ogni sala ha 3 esperienze gestite dallo stesso componente `ArExperienceComponent`:

| Esperienza | Route | Pubblico | Comportamento |
|---|---|---|---|
| Il Castellano Ti Racconta | `/sala/:id/castellano` | Adulti | Modello 3D + audio + sottotitoli |
| La Missione del Drago Custode | `/sala/:id/drago` | Bambini | Modello 3D + audio + quiz interattivo |
| Il Laboratorio del Tempo | `/sala/:id/laboratorio` | Scuole | Etichette 3D + pannelli info + timeline |

---

## WORKFLOW

Per ogni richiesta di sviluppo, segui le 6 fasi della skill:

**Fase 0** → Leggi CLAUDE-DOC.md, ISTRUZIONI-DEV.md, BACKLOG.md
**Fase 1** → Analizza la richiesta, leggi i file coinvolti
**Fase 2** → Pianifica (solo per feature grandi)
**Fase 3** → Implementa seguendo le convenzioni del Reference
**Fase 4** → Testa (`ng build` per compilazione, verifica path asset)
**Fase 5** → Commit, push, aggiorna i 3 file di documentazione

---

## BUILD E DEPLOY

```bash
# Sviluppo locale
npm start              # ng serve → http://localhost:4200

# Build produzione
npm run build          # output in dist/castello-ar/browser/

# Deploy su GitHub Pages — automatico via GitHub Actions
git push origin master # → GitHub Actions fa build + deploy automaticamente
# URL: https://marcoranica94.github.io/virtual-castle-experience/
```

Il piano completo del progetto è in `Piano_Completo_AR_Castello_v2.md`.
