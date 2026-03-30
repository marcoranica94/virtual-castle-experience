---
name: castello-ar-dev
description: >
  Workflow di sviluppo strutturato per il progetto Castello AR — esperienza di Realtà Aumentata WebAR
  per la visita al castello (adulti, bambini, didattica). Usa questa skill SEMPRE quando ricevi una
  richiesta di sviluppo, implementazione, feature, bugfix, refactoring, aggiunta sala, aggiunta contenuto,
  o qualsiasi modifica al codice del progetto Castello AR. Attivala anche quando l'utente chiede di
  pianificare sprint, creare task, aggiungere una nuova sala, creare un nuovo avatar, modificare
  un'esperienza AR, ottimizzare prestazioni, o testare su dispositivi.
  NON saltare mai le fasi — ogni sviluppo deve passare per analisi, verifica stato attuale,
  implementazione, testing dispositivi, e documentazione.
---

# Castello AR — Development Workflow

Processo obbligatorio per OGNI richiesta di sviluppo sul progetto Castello AR.

> **Per dettagli su librerie, versioni, convenzioni e architettura:**
> leggi `CASTELLO-AR-REFERENCE.md` nella stessa cartella di questa skill.
> Leggilo in Fase 0 e consultalo in Fase 3. Non serve rileggerlo se già letto nella sessione.

---

## REGOLE INVIOLABILI

### 1. VERSIONI — SEMPRE LTS / ULTIMA STABILE
- **Prima di QUALSIASI `npm install`**: verifica l'ultima versione stabile della libreria
- Usa SEMPRE la versione LTS di Node.js (controlla su nodejs.org)
- Per ogni dipendenza: `npm install pacchetto@latest` poi verifica compatibilità
- **MAI usare versioni vecchie o hardcodate senza motivo documentato**
- Se una libreria cambia API tra versioni: documenta in `CLAUDE-DOC.md`

### 2. ANALISI PRIMA DI TOCCARE — SEMPRE
Prima di modificare QUALSIASI file:
1. Leggi il file esistente per intero
2. Comprendi la struttura attuale
3. Identifica cosa cambiare e cosa NON toccare
4. **Mai riscrivere un file da zero se esiste già** — modifica solo le parti necessarie
5. Se il file è nuovo: verifica che non esista già qualcosa di simile

### 3. TEST SU DISPOSITIVO — OBBLIGATORIO
Ogni modifica che tocca codice AR (MindAR, A-Frame, camera, modelli 3D):
- DEVE essere testata su smartphone reale (iPhone Safari + Android Chrome)
- Aggiungi istruzioni di test in `ISTRUZIONI-DEV.md`
- Se il test non è possibile in sessione: crea una task esplicita in `BACKLOG.md`

### 4. DOCUMENTAZIONE — AGGIORNA SEMPRE
Dopo ogni `git push` o completamento task:

| File | Quando aggiornare |
|---|---|
| `CLAUDE-DOC.md` | Decisione tecnica, pattern nuovo, problema risolto, dipendenza aggiunta, cosa funziona/non funziona |
| `ISTRUZIONI-DEV.md` | Azione manuale richiesta all'utente, setup, deploy, test da fare |
| `BACKLOG.md` | Task completata (segna ✅), nuova task scoperta, priorità cambiata |

### 5. PROPORZIONALITÀ

| Dimensione task | Fasi da seguire |
|---|---|
| **Fix rapido** (< 15 min, 1-2 file) | Fase 0 → 3 → 5 (rapido) |
| **Task medio** (15 min - 2h) | Fase 0 → 1 → 3 → 4 → 5 |
| **Feature/Sala nuova** (> 2h) | Tutte le fasi (0-5) |

### 6. CONFERMA PRIMA DI IMPLEMENTARE
Prima di Fase 3: mostra all'utente cosa farai e chiedi OK.

---

## LE 6 FASI

### FASE 0: CONTESTO (SEMPRE, PRIMA DI TUTTO)

Leggi silenziosamente dalla root del progetto:

1. **`CLAUDE-DOC.md`** — Decisioni tecniche, errori passati, cosa funziona, versioni in uso
2. **`ISTRUZIONI-DEV.md`** — Azioni manuali pendenti per l'utente, stato setup
3. **`BACKLOG.md`** — Task pendenti, priorità, stato sprint corrente

Se un file non esiste, **crealo con la struttura base** (vedi template in CASTELLO-AR-REFERENCE.md).
Non menzionare all'utente che li stai leggendo — fallo silenziosamente.

**Verifica versioni:**
- Controlla `package.json` per le versioni attuali delle dipendenze
- Se una dipendenza principale è obsoleta (>6 mesi): segnalalo e proponi aggiornamento

---

### FASE 1: ANALISI

1. **Riformula** la richiesta in modo chiaro
2. **Leggi i file coinvolti** — TUTTI, per intero, prima di proporre modifiche
3. **Identifica impatto** — quali pagine/componenti/asset sono toccati
4. **Verifica compatibilità** — la modifica funziona su iOS Safari E Android Chrome?
5. **Domande** se ambiguo (max 3)

**Output:**
```
## Analisi
**Richiesta:** [riformulazione]
**File coinvolti:** [lista con path completi]
**Asset necessari:** [modelli 3D, audio, immagini target — chi li deve fornire]
**Compatibilità:** [note su iOS/Android]
**Rischi:** [cosa potrebbe non funzionare]
```

---

### FASE 2: PIANIFICAZIONE (solo per feature/sala nuova)

1. Definisci i passi ordinati per dipendenza
2. Per ogni passo: chi lo fa (Claude Code / Utente manuale)
3. Stima tempo per ogni passo
4. Aggiorna `BACKLOG.md` con le nuove task

---

### FASE 3: IMPLEMENTAZIONE

**Prima di scrivere codice:**
- Consulta `CASTELLO-AR-REFERENCE.md` per convenzioni
- Se aggiungi una dipendenza: `npm install pacchetto@latest` e documenta in `CLAUDE-DOC.md`
- Leggi SEMPRE i file esistenti prima di modificarli — mai riscrivere da zero

**Regole codice:**

#### Angular / TypeScript
- **Standalone components** — niente NgModules
- **Signals** per lo stato reattivo — non RxJS per lo stato UI
- **Lazy loading** su tutte le route via `loadComponent`
- **TypeScript strict** — mai `any` senza motivazione documentata in `CLAUDE-DOC.md`
- Servizi `providedIn: 'root'` (singleton)
- Nomi file: kebab-case (`ar.service.ts`, `sala-rossa.ts`)
- Nomi classi: PascalCase (`ArService`, `SalaRossaData`)
- Template inline per componenti semplici; file `.html` separato per template grandi
- Commenti in italiano per le sezioni principali

#### Tailwind CSS 4
- Design tokens via `@theme` in `styles.css` — niente custom CSS fuori dal tema
- Mobile-first sempre (breakpoint `sm:`, `md:` per desktop)
- Touch target minimo 44x44px: usa `min-h-[44px] min-w-[44px]` (Apple HIG)
- Niente `style=""` inline — sempre classi Tailwind

#### WebAR (MindAR + A-Frame)
- MindAR e A-Frame caricati **dinamicamente** via `ArService.loadLibraries()` — NON in `angular.json` né importati direttamente
- `vr-mode-ui="enabled: false"` sempre su `<a-scene>`
- `device-orientation-permission-ui="enabled: false"` sempre
- Gestisci il permesso fotocamera con UI chiara in italiano
- Schermata di loading obbligatoria con istruzioni per l'utente
- Fallback se la fotocamera non è disponibile o il device non supporta AR
- Cast `window` tramite `unknown` intermedio per TS strict (vedi `CLAUDE-DOC.md`)

#### Asset
- Modelli 3D: formato `.glb` (non `.gltf` separato — un file unico è più affidabile)
- Audio: `.mp3` (compatibilità universale)
- Immagini target: `.jpg` o `.png`, alta risoluzione, molti dettagli
- File MindAR: `.mind` generati dal compiler ufficiale
- **Max dimensione per asset singolo: 5 MB**
- **Max dimensione totale bundle + asset caricati al primo accesso: 15 MB**
- Asset in `public/assets/` — copiati staticamente nel build senza trasformazioni

#### Struttura dati per ogni sala
```
// src/app/data/sala-nome.ts  ← implementa RoomConfig
// public/assets/sala-nome/
//   models/    ← File .glb
//   audio/     ← File .mp3
//   images/    ← Immagini target originali
//   targets/   ← File .mind compilati
// Nessun HTML o route nuovi — ArExperienceComponent è generico
```

---

### FASE 4: TEST

**Test automatizzabili (Claude Code fa):**
- Validazione HTML (niente errori di sintassi)
- Verifica che tutti i file referenziati esistano (modelli, audio, target, CSS, JS)
- Verifica dimensioni asset (alert se >5 MB per file o >15 MB totale pagina)
- Verifica HTTPS nei CDN (mai http://)
- Verifica `<meta viewport>` presente
- Link interni funzionanti (niente 404 interni)

**Test manuali (utente fa — documenta in ISTRUZIONI-DEV.md):**
- [ ] Aprire su iPhone Safari — la fotocamera si attiva?
- [ ] Aprire su Android Chrome — la fotocamera si attiva?
- [ ] Inquadrare il target — il modello 3D appare?
- [ ] Il modello è posizionato correttamente (non fluttua, non è sottosopra)?
- [ ] L'audio si riproduce toccando il pulsante?
- [ ] Il caricamento è accettabile (<5 secondi su 4G)?
- [ ] Il menù di scelta funziona e tutti i link portano alla pagina giusta?
- [ ] Il pulsante "indietro" riporta al menù?

**Se un test fallisce:** non andare avanti. Correggi prima.

---

### FASE 5: CHIUSURA

**1. Commit** (Conventional Commits, inglese):
```
feat(sala-rossa): add cultural visit AR experience with knight avatar
fix(caccia-tesoro): correct model position on iOS Safari
chore(deps): update MindAR to 1.2.5
```

**2. Push (= deploy automatico):**
```bash
git push origin master
# GitHub Actions fa build + deploy su GitHub Pages automaticamente
# URL: https://marcoranica94.github.io/virtual-castle-experience/
# Monitora: github.com/marcoranica94/virtual-castle-experience → Actions
```

**3. Aggiorna documentazione** (OBBLIGATORIO):

- **`CLAUDE-DOC.md`**: aggiungi decisioni tecniche, problemi risolti, versioni cambiate
- **`ISTRUZIONI-DEV.md`**: aggiungi azioni manuali per l'utente (test, stampa, deploy)
- **`BACKLOG.md`**: segna task completate ✅, aggiungi nuove task scoperte

**4. Riepilogo:**
```
## Riepilogo
**Fatto:** [cosa è stato implementato]
**File modificati/creati:** [lista]
**Test:** [quali sono stati fatti, quali restano da fare manualmente]
**Da fare (utente):** [azioni manuali — test dispositivo, caricare asset, ecc.]
**Prossimi passi:** [prossima task dal backlog]
```

---

## REGOLE PER TIPO DI RICHIESTA

| Tipo | Regola speciale |
|---|---|
| **Nuova sala** | Duplica struttura sala esistente → Cambia solo asset e contenuti → Aggiorna index generale |
| **Nuovo avatar/modello** | Verifica formato GLB, dimensione <5MB, animazioni presenti → Documenta provenienza in CLAUDE-DOC.md |
| **Nuovo audio** | Formato MP3, durata <3 min per narrazione → Testa riproduzione su iOS (autoplay bloccato!) |
| **Bugfix AR** | SEMPRE verifica su entrambi iOS Safari e Android Chrome — il bug potrebbe essere specifico per piattaforma |
| **Aggiornamento libreria** | Leggi changelog → Testa TUTTO → Se breaking change: documenta migrazione in CLAUDE-DOC.md |
| **Aggiunta lingua** | Duplica testi IT → Traduci → Aggiungi flag nel selettore → Testa audio in nuova lingua |
| **Ottimizzazione** | Misura PRIMA (dimensioni, tempi caricamento) → Ottimizza → Misura DOPO → Documenta delta |
| **Giardino (GPS)** | Usa AR.js (non MindAR) per location-based → Testa SOLO all'aperto → GPS impreciso al chiuso |

---

## ANTI-PATTERN — MAI FARE

**Processo:**
- Mai implementare senza leggere prima i file esistenti (Fase 0)
- Mai pushare senza aggiornare CLAUDE-DOC.md e ISTRUZIONI-DEV.md
- Mai lasciare una task senza segnarla nel BACKLOG.md
- Mai dire "devi fare X" senza scriverlo in ISTRUZIONI-DEV.md

**Codice:**
- Mai `any` in TypeScript senza motivazione documentata
- Mai importare A-Frame/MindAR direttamente — solo tramite `ArService.loadLibraries()`
- Mai `http://` (la fotocamera richiede HTTPS)
- Mai autoplay audio (bloccato su iOS — serve interazione utente)
- Mai modelli 3D >5 MB senza compressione
- Mai riscrivere un file da zero quando basta una modifica chirurgica
- Mai usare librerie/versioni vecchie se esiste una versione stabile più recente
- Mai testare solo su desktop — il progetto è SOLO per mobile
- Mai hardcodare testi se il progetto supporta più lingue
- Mai dimenticare il fallback per dispositivi che non supportano AR
- Mai NgModules — standalone components sempre
- Mai `style=""` inline — sempre Tailwind classes
