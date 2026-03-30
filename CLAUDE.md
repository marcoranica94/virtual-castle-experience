# CLAUDE.md — Istruzioni per Claude Code

Questo è il progetto **Castello AR** — esperienza di Realtà Aumentata WebAR per la visita al castello.

---

## PRIMA DI QUALSIASI COSA

1. **Leggi la skill:** `castello-ar-skill/SKILL.md` — contiene il workflow obbligatorio a 6 fasi
2. **Leggi il reference:** `castello-ar-skill/CASTELLO-AR-REFERENCE.md` — stack, versioni, convenzioni, hosting GitHub Pages
3. **Leggi lo stato del progetto:**
    - `CLAUDE-DOC.md` — decisioni tecniche, versioni, problemi risolti
    - `ISTRUZIONI-DEV.md` — azioni pendenti per l'utente
    - `BACKLOG.md` — task, sprint corrente, priorità

Se uno di questi file non esiste, crealo usando i template in `castello-ar-skill/templates/`.

---

## REGOLE CHIAVE

- **Versioni:** verifica SEMPRE l'ultima versione stabile di MindAR, A-Frame e qualsiasi libreria prima di usarla. Mai versioni vecchie.
- **Leggi prima di toccare:** leggi SEMPRE i file esistenti prima di modificarli. Mai riscrivere da zero.
- **Path relativi:** il progetto è su GitHub Pages (sottocartella). Tutti i path devono essere relativi, mai assoluti con `/`.
- **Mobile-first:** il progetto è SOLO per smartphone. Testa sempre pensando a mobile.
- **iOS Safari:** mai autoplay audio. Sempre pulsante per l'utente.
- **Dopo ogni push:** aggiorna CLAUDE-DOC.md, ISTRUZIONI-DEV.md e BACKLOG.md.
- **Conferma prima di implementare:** mostra all'utente cosa farai e chiedi OK.

---

## STACK

- HTML5 + JavaScript vanilla (ES6+) + CSS vanilla
- MindAR.js + A-Frame (ultima versione stabile, CDN con versione esplicita)
- AR.js (solo per giardino/GPS)
- Hosting: GitHub Pages (gratuito, HTTPS, deploy con `git push`)
- Nessun database — localStorage per punti/badge
- Nessun framework frontend pesante

---

## STRUTTURA PROGETTO

```
castello-ar/
├── CLAUDE.md                ← Questo file
├── CLAUDE-DOC.md            ← Decisioni tecniche (aggiorna sempre)
├── ISTRUZIONI-DEV.md        ← Azioni per l'utente (aggiorna sempre)
├── BACKLOG.md               ← Task e sprint (aggiorna sempre)
├── index.html               ← Homepage (elenco sale)
├── sala-rossa/              ← Sala pilota
│   ├── index.html           ← Menù 3 esperienze
│   ├── il-castellano.html   ← AR adulti
│   ├── drago-custode.html   ← AR bambini
│   ├── laboratorio-tempo.html ← AR didattica
│   └── assets/
├── shared/                  ← CSS, JS, modelli condivisi
├── tutorial/                ← Mini-tutorial pre-AR
├── profilo/                 ← Badge e punti visitatore
└── castello-ar-skill/       ← Skill + reference + templates
```

---

## WORKFLOW

Per ogni richiesta di sviluppo, segui le 6 fasi della skill:

**Fase 0** → Leggi CLAUDE-DOC.md, ISTRUZIONI-DEV.md, BACKLOG.md  
**Fase 1** → Analizza la richiesta, leggi i file coinvolti  
**Fase 2** → Pianifica (solo per feature grandi)  
**Fase 3** → Implementa seguendo le convenzioni del Reference  
**Fase 4** → Testa (validazione HTML, path, dimensioni asset)  
**Fase 5** → Commit, push, aggiorna i 3 file di documentazione

---

## LE 3 ESPERIENZE AR

Ogni sala ha 3 esperienze selezionabili dal visitatore:

| Esperienza | File | Pubblico | Personaggio |
|---|---|---|---|
| "Il Castellano Ti Racconta" | `il-castellano.html` | Adulti | Avatar storico con narrazione audio + sottotitoli |
| "La Missione del Drago Custode" | `drago-custode.html` | Bambini | Draghetto con indizi, quiz, punti/badge |
| "Il Laboratorio del Tempo" | `laboratorio-tempo.html` | Scuole | Pannelli info 3D, timeline, etichette |

---

## DEPLOY

```bash
git add .
git commit -m "tipo(scope): descrizione in inglese"
git push origin main
# GitHub Pages si aggiorna in 1-2 minuti
```

Il piano completo del progetto è in `Piano_Completo_AR_Castello_v2.md`.
