# Castello AR — Piano di Progetto Completo

**Versione:** 2.0 — Analisi unificata  
**Data:** 30 Marzo 2026  
**Progetto:** Realtà Aumentata per la visita al castello  
**Sala pilota:** Sala Rossa (con mobile come elemento principale)  
**Sviluppo:** Claude Code  

---

## INDICE

1. Visione del Progetto
2. Le 3 Esperienze (con identità narrative)
3. Architettura del Sistema
4. Come Creare gli Avatar 3D — Guida Completa
5. Audio e Narrazioni
6. Integrazione con Virtual Tour Matterport
7. UX in Loco — Problemi e Soluzioni
8. Connettività — Il Nemico Invisibile
9. Game Design e Gamification
10. Analytics — Dati per la Giunta
11. Integrazione Fisica dei Marker
12. Scalabilità — Da Progetto a Prodotto
13. Product Backlog Completo (tutte le Epic e Task)
14. Piano Sprint Aggiornato
15. Comandi Claude Code
16. Idee Visionarie (Futuro)
17. Rischi e Mitigazioni
18. Checklist Prima di Iniziare

---

## 1. VISIONE DEL PROGETTO

Il visitatore arriva al castello, scansiona un QR code con il telefono, e senza installare nulla si ritrova immerso in un'esperienza di Realtà Aumentata. Inquadrando elementi della sala con la fotocamera, appaiono personaggi 3D animati, narrazioni audio, giochi interattivi e contenuti didattici.

**Tecnologia:** WebApp AR (browser-based) — zero installazione, zero store, zero complicazioni.  
**Stack:** MindAR.js + A-Frame + HTML/JS vanilla.  
**Hosting:** GitHub Pages (gratuito, HTTPS incluso, deploy con git push). Nessun database — localStorage per punti/badge.  

Il progetto parte dalla **Sala Rossa** come prototipo, con struttura replicabile per tutte le sale e il giardino.

---

## 2. LE 3 ESPERIENZE — Con Identità Narrative

Non sono "modalità" — sono **porte d'ingresso in mondi narrativi diversi**.

### 2.1 "Il Castellano Ti Racconta" (Adulti)

**Personaggio guida:** Il Castellano — avatar storico (cavaliere, dama o nobile) che appare accanto al mobile e racconta la storia della sala.  
**Tono:** Autorevole, affascinante, colto.  
**Contenuto:** Narrazione storica di 2-3 minuti con audio + sottotitoli. Il Castellano indica dettagli architettonici, racconta aneddoti, collega la sala alla storia del territorio.  
**Trigger AR:** Il visitatore inquadra il pannello/elemento target vicino al mobile.  
**Interazione:** Pulsante "Ascolta la storia" → audio parte con animazione "talking" dell'avatar. Sottotitoli sincronizzati a schermo.

### 2.2 "La Missione del Drago Custode" (Bambini)

**Personaggio guida:** Un draghetto cartoon — simpatico, un po' pasticcione, custode segreto del castello.  
**Tono:** Avventuroso, misterioso, divertente.  
**Contenuto:** Il Drago appare con animazione vivace, si presenta, e dà un indizio per la caccia al tesoro. Poi propone un mini-quiz sulla sala.  
**Trigger AR:** Il visitatore inquadra il marcatore bambini (colorato, con illustrazione del drago).  
**Interazione:** Animazione di ingresso → fumetto con indizio → audio → quiz a scelta multipla → badge/punti.  
**Evoluzione tra sale:** Il Drago riconosce il bambino ("Bentornato, esploratore!") grazie a localStorage.

### 2.3 "Il Laboratorio del Tempo" (Scuole/Didattica)

**Personaggio guida:** Nessun avatar — interfaccia "da scienziato del tempo". Pannelli informativi 3D che fluttuano intorno all'oggetto.  
**Tono:** Curioso, scientifico, chiaro.  
**Contenuto:** Etichette 3D con frecce che indicano dettagli architettonici. Timeline interattiva. Schede materiali, date, stili. Confronto "prima/dopo".  
**Trigger AR:** Pannello target stile museale.  
**Interazione:** Toccare le etichette per espandere le informazioni. Scorrere la timeline.

---

## 3. ARCHITETTURA DEL SISTEMA

### 3.1 Struttura File

```
castello-ar/
├── index.html                        ← Homepage generale (elenco sale)
├── sala-rossa/
│   ├── index.html                    ← Menù narrativo (3 esperienze)
│   ├── il-castellano.html            ← "Il Castellano Ti Racconta"
│   ├── drago-custode.html            ← "La Missione del Drago Custode"
│   ├── laboratorio-tempo.html        ← "Il Laboratorio del Tempo"
│   └── assets/
│       ├── models/                   ← File .glb (avatar, oggetti 3D)
│       ├── audio/                    ← File .mp3 (narrazioni)
│       ├── images/                   ← Immagini target originali
│       └── targets/                  ← File .mind compilati
├── sala-blu/                         ← Stessa struttura (prossima sala)
├── giardino/                         ← Location-based con AR.js + GPS
├── shared/
│   ├── css/
│   │   └── theme.css                ← Variabili CSS, colori castello
│   ├── js/
│   │   ├── ar-utils.js              ← Funzioni AR condivise
│   │   ├── audio-player.js          ← Player audio con sottotitoli
│   │   ├── badge-system.js          ← Sistema punti e badge
│   │   └── analytics.js             ← Tracciamento eventi
│   └── models/                      ← Avatar riusabili tra sale
├── tutorial/
│   └── tutorial.html                ← Mini-tutorial animato pre-AR
├── profilo/
│   └── index.html                   ← "Il mio zaino" — badge, punti
├── CLAUDE-DOC.md
├── ISTRUZIONI-DEV.md
├── BACKLOG.md
└── package.json
```

### 3.2 Flusso Utente Aggiornato

1. Visitatore scansiona QR code (posizionato in punto con buon segnale)
2. Si apre homepage → seleziona "Sala Rossa"
3. Pagina menù narrativo con 3 porte: "Il Castellano Ti Racconta", "La Missione del Drago Custode", "Il Laboratorio del Tempo"
4. Tocca la scelta → **mini-tutorial animato** (5 sec, come funziona, cosa inquadrare)
5. Pulsante "Ho capito, inizia!" → richiesta permesso fotocamera con spiegazione chiara in italiano
6. **Loading** con barra progresso (pre-carica modello + audio)
7. Fotocamera attiva → visitatore inquadra target → contenuto AR appare
8. Esperienza (narrazione/gioco/didattica) con sottotitoli
9. Al termine: pulsante **"Fine"** → chiude fotocamera, torna al menù, salva progressi
10. Se tutti i punti della sala sono completati → badge "Custode della Sala Rossa"

---

## 4. COME CREARE GLI AVATAR 3D — Guida Completa

### 4.1 Cosa Serve Tecnicamente

Un avatar per WebAR deve essere:
- **Un file in formato GLB** (glTF Binary — il "JPEG del 3D", un file unico con modello + texture + animazioni)
- **Con scheletro (rigging)** — sistema di "ossa" che permette le animazioni
- **Con almeno un'animazione** — "talking", "idle", "waving", "pointing"
- **Ottimizzato per il web** — sotto 5 MB, pochi poligoni, texture compresse

### 4.2 Le 4 Strade per Ottenere gli Avatar

#### OPZIONE A — Mixamo (Adobe) ✅ RACCOMANDATO PER INIZIARE

**Cos'è:** Servizio gratuito di Adobe con decine di personaggi 3D pronti e migliaia di animazioni.

**Passo per passo:**
1. Vai su mixamo.com (account Adobe gratuito)
2. Tab "Characters" → scegli personaggio (ce ne sono medievali, realistici, cartoon)
3. Tab "Animations" → scegli animazione ("Talking", "Pointing", "Waving", "Idle")
4. Download: Format FBX, Skin: With Skin, FPS: 30, Keyframe Reduction: Uniform
5. Apri Blender → File → Import → FBX
6. File → Export → glTF 2.0 (.glb) — spuntare "Export Animations"
7. Il file .glb è pronto per MindAR/A-Frame

**Pro:** Gratuito, velocissimo (30 min per avatar completo), migliaia di animazioni.  
**Contro:** Personaggi generici, non personalizzati per il castello.

**Alternativa alla conversione Blender:** Character Animation Combiner (nilooy.github.io/character-animation-combiner) — carica FBX + animazioni, esporta direttamente GLB. Zero Blender necessario.

#### OPZIONE B — Sketchfab (Modelli Pronti)

**Cos'è:** Il più grande marketplace di modelli 3D. Migliaia di modelli gratuiti, molti già in GLB animati.

**Passo per passo:**
1. Vai su sketchfab.com
2. Cerca "medieval knight", "medieval lady", "dragon cartoon", ecc.
3. Filtra per "Downloadable" e "Animated"
4. Scarica in formato glTF/GLB → già pronto per l'uso

**Pro:** Enorme varietà, molti modelli medievali, spesso già in GLB.  
**Contro:** Qualità variabile, verificare SEMPRE la licenza d'uso (Creative Commons).

#### OPZIONE C — Ready Player Me + Mixamo (Avatar Personalizzato)

**Cos'è:** Ready Player Me crea avatar 3D personalizzati da foto o design. Poi si animano con Mixamo.

**Passo per passo:**
1. Vai su readyplayer.me → crea avatar (puoi caricare una foto come base)
2. Scarica il GLB
3. Carica su Mixamo per aggiungere animazioni
4. Scarica FBX animato → converti in GLB con Blender

**Pro:** Avatar personalizzabile — potreste creare "il Castellano" del VOSTRO castello.  
**Contro:** Stile cartoon, più passaggi richiesti.

#### OPZIONE D — Commissione a Artista 3D (Massima Qualità)

**Dove trovare artisti:**
- Fiverr.com → 50-200€ per personaggio base
- Upwork.com → 200-1000€ per personaggio completo con animazioni custom
- Accademie d'arte locali → studenti come progetto didattico (costo bassissimo o nullo)

**Pro:** Qualità massima, avatar unico e storicamente accurato.  
**Contro:** Costo più alto, tempi 2-4 settimane.

### 4.3 Strategia Raccomandata

**Per il prototipo (Sala Rossa):** Opzione A (Mixamo) o B (Sketchfab). In 30 minuti avete un avatar animato funzionante. Questo permette di validare l'intera esperienza prima di investire.

**Per la versione definitiva:** Opzione C o D per personaggi storici accurati legati al castello. Ideale: collaborare con un'accademia d'arte locale.

---

## 5. AUDIO E NARRAZIONI

### 5.1 Come Creare le Narrazioni

| Metodo | Come Funziona | Costo | Qualità |
|---|---|---|---|
| **AI Text-to-Speech** | ElevenLabs, Google Cloud TTS — scrivi il testo, ottieni audio in secondi | Gratuito/basso | Molto buona, voci naturali in IT |
| **Registrazione dal vivo** | Attore/attrice locale interpreta il personaggio | Da gratuito a qualche centinaio di € | Autentica, personale |
| **Combinazione** | AI per prototipo + lingue straniere, dal vivo per IT definitiva | Variabile | Strategia raccomandata |

### 5.2 Sottotitoli — OBBLIGATORI

Ogni narrazione audio DEVE avere sottotitoli sincronizzati a schermo:
- Molti visitatori non avranno auricolari
- Audio ad alto volume rovina l'atmosfera della sala
- Accessibilità per visitatori con disabilità uditive
- Implementazione: overlay HTML con testo che scorre sincronizzato all'audio

### 5.3 Regola iOS — MAI Autoplay

iOS Safari blocca l'autoplay audio. Serve SEMPRE un pulsante che l'utente tocca ("Ascolta la storia"). Non è un bug, è una policy Apple. Non cercare workaround — metti il pulsante.

### 5.4 Micro-Interruzioni (copioni evoluti)

L'avatar non parla solo linearmente. Ogni tanto dice:
- "Hai visto questo dettaglio sul mobile?"
- "Avvicinati un po'..."
- "Guarda in alto, verso il soffitto..."

Questo guida lo sguardo del visitatore e rende l'esperienza viva.

### 5.5 Lingua Automatica

Detect automatico dalla lingua del browser del visitatore. Se la lingua è disponibile → parte in quella lingua. Se no → fallback su italiano. Selettore lingua manuale come override.

---

## 6. INTEGRAZIONE CON VIRTUAL TOUR MATTERPORT

Il tour Matterport esistente = esplorazione passiva (da casa).  
L'AR = attivazione attiva (dal vivo).  
Non vanno integrati tecnicamente — vanno collegati narrativamente.

### Come Collegare

**Nel tour Matterport:**
- Hotspot visivi nelle sale con testo: "Se sei qui dal vivo, attiva l'esperienza AR"
- QR code renderizzati dentro il tour
- Chi guarda da casa → anticipazione → motivazione a visitare

**Sul sito del castello:**
- Sezione "Vieni a scoprire la Realtà Aumentata"
- Video demo registrato con screen recording del telefono

**Risultato:** Continuità digitale-fisico, rarissima nei comuni.

---

## 7. UX IN LOCO — Problemi e Soluzioni

### 7.1 Cartelli Ultra-Chiari

Il vero problema NON sarà la tecnologia. Sarà: persone che non capiscono cosa fare.

**MAI scrivere:**
> "Scansiona il QR code per l'esperienza AR"

**SEMPRE scrivere:**
> 1. Apri la fotocamera del telefono  
> 2. Inquadra questo codice [QR grande]  
> 3. Tocca il link che appare  
> 4. Premi "Inizia" e punta verso il pannello qui accanto →  

Con icone grandi, numeri chiari, freccia che indica il pannello target.

### 7.2 Mini-Tutorial Animato (5 secondi)

Prima di attivare la fotocamera AR: animazione che mostra una mano con telefono che inquadra il pannello. Pulsante "Ho capito, inizia!". Da mostrare solo la prima volta (localStorage).

### 7.3 Pulsante "Non funziona?"

Sempre visibile durante l'esperienza AR:
- "Avvicinati al pannello (30-50 cm)"
- "Migliora la luce"
- "Ricarica la pagina"
- Link a istruzioni per abilitare la fotocamera nelle Impostazioni

### 7.4 Pulsante "Fine" — OBBLIGATORIO

Alla fine di ogni esperienza AR:
- Ferma lo stream video della fotocamera
- Salva progressi (punti, badge)
- Riporta al menù della sala
- Risparmia batteria e previene surriscaldamento

---

## 8. CONNETTIVITÀ — Il Nemico Invisibile

Muri di pietra = segnale 4G/5G quasi nullo all'interno.

### Soluzioni (in ordine di priorità)

1. **WiFi dedicato** nella Sala Rossa (50-150€ per access point) — RACCOMANDATO
2. **QR code in punto con segnale** (cortile, biglietteria) — pre-caricamento mentre si cammina
3. **Loading con progresso** — mostrare % di caricamento, non schermo bianco
4. **Service Worker** (futuro) — cache degli asset dopo primo caricamento
5. **Asset leggeri automatici** — detect connessione, se debole → modelli low-res

**Azione immediata:** Testare copertura WiFi/4G nella Sala Rossa PRIMA di qualsiasi sviluppo.

---

## 9. GAME DESIGN E GAMIFICATION

### 9.1 Sistema Punti e Badge

| Azione | Punti |
|---|---|
| Scansionare un target | 10 |
| Ascoltare narrazione completa | 20 |
| Rispondere correttamente al quiz | 30 |
| Completare una sala (tutte e 3 le esperienze) | 100 bonus |

**Titoli progressivi:**
- 0-50 → "Apprendista del Castello"
- 50-200 → "Scudiero Esploratore"
- 200-500 → "Custode della Sala Rossa"
- 500+ → "Cavaliere del Castello"

**Implementazione:** localStorage del browser. Zero backend. Pagina "Il mio zaino" con badge e punti.

### 9.2 Zaino Virtuale + Attestato Fisico

Il bambino colleziona stemmi digitali. A fine giro, in biglietteria, gli danno un attestato cartaceo di "Cavaliere del Castello" con il suo nome. Costa zero (stampa A4). Effetto wow garantito.

### 9.3 Finale Segreto (post-lancio, multi-sala)

Chi completa TUTTE le sale sblocca un contenuto segreto: storia nascosta, stanza segreta virtuale, personaggio finale. Motivazione fortissima per il percorso completo.

### 9.4 Scelte Narrative (evoluzione futura)

Nel quiz: scelte che cambiano il percorso. "Il drago ha trovato una porta segreta. Entri a destra o a sinistra?" → Ogni scelta porta a un indizio diverso → rigiocabilità.

---

## 10. ANALYTICS — Dati per la Giunta

| Dato | Perché | Tool |
|---|---|---|
| Visitatori AR totali | Report per giunta | Plausible Analytics |
| Modalità scelta | Capire il pubblico | Plausible |
| Tempo medio in AR | Engagement reale | Custom event |
| Punto di abbandono | Dove si perde interesse | Custom event |
| Sale completate per visitatore | Percorso medio | localStorage + event |
| Device e browser | Compatibilità reale | Plausible |
| Lingua selezionata | Profilo turisti stranieri | Custom event |

Questi dati servono per: report alla giunta con numeri concreti, richieste di finanziamento (bandi cultura digitale), miglioramenti basati su dati reali.

---

## 11. INTEGRAZIONE FISICA DEI MARKER

### Problema Estetico
Pannelli poster rischiano di essere un "pugno nell'occhio" nella Sala Rossa.

### Soluzioni

**A. Supporti in stile museale** — Stampa su supporto rigido in finto ottone/legno, tipo leggìo da museo.

**B. Usare elementi già presenti come target** — MindAR funziona con qualsiasi immagine dettagliata. Testare se un quadro, un arazzo, lo stemma sul muro, o le decorazioni del mobile hanno abbastanza feature point. Test: fotografare e provare nel MindAR Compiler. Se abbastanza punti rossi → nessun pannello aggiuntivo.

**Azione Sprint 1:** Fotografare anche gli elementi decorativi esistenti e testarli nel compiler.

---

## 12. SCALABILITÀ — Da Progetto a Prodotto

### Fase 1 (ora): Template per sala
Ogni sala = cartella indipendente con asset propri. Codice AR identico, cambiano solo i riferimenti.

### Fase 2 (post-lancio): Configurazione JSON
Un file `config.json` per sala con parametri: nome, avatar, audio, testi, quiz, indizi. Il codice HTML legge il JSON. Aggiungere una sala = aggiungere un JSON + asset.

### Fase 3 (futuro): Prodotto replicabile
Framework vendibile ad altri castelli, musei, borghi, scuole. Quello che si sta costruendo NON è "l'AR del castello" — è una piattaforma narrativa territoriale.

---

## 13. PRODUCT BACKLOG COMPLETO

### EPIC 1: Setup Progetto

| ID | Task | Descrizione | Chi | Effort | Priorità |
|---|---|---|---|---|---|
| S-01 | Installare Node.js LTS | Scaricare da nodejs.org — verificare ultima LTS | Utente | 15 min | 🔴 Alta |
| S-02 | Attivare Claude Pro | Sottoscrivere $20/mese per Claude Code | Utente | 10 min | 🔴 Alta |
| S-03 | Installare Claude Code | `npm install -g @anthropic-ai/claude-code` | Utente | 5 min | 🔴 Alta |
| S-04 | Creare struttura cartelle | Struttura come da sezione 3.1. ATTENZIONE: tutti i path devono essere relativi (GitHub Pages serve da sottocartella) | Claude Code | 10 min | 🔴 Alta |
| S-05 | Inizializzare Git + GitHub | `git init`, primo commit, creare repo su GitHub (Public), push, attivare GitHub Pages in Settings → Pages → main / root | Utente + Claude Code | 20 min | 🔴 Alta |
| S-06 | Verificare deploy GitHub Pages | Controllare che https://[username].github.io/castello-ar/ sia raggiungibile con HTTPS | Utente | 10 min | 🔴 Alta |
| S-07 | Dominio personalizzato | Opzionale: es. ar.castello-xyz.it → CNAME su GitHub Pages | GitHub Settings | 30 min | 🟢 Bassa |
| S-08 | Creare CLAUDE-DOC.md | Inizializzare con template da skill | Claude Code | 10 min | 🔴 Alta |
| S-09 | Creare ISTRUZIONI-DEV.md | Inizializzare con template da skill | Claude Code | 10 min | 🔴 Alta |
| S-10 | Creare BACKLOG.md | Inizializzare con tutte le task | Claude Code | 15 min | 🔴 Alta |

### EPIC 2: Immagini Target e Pannelli

| ID | Task | Descrizione | Chi | Effort | Priorità |
|---|---|---|---|---|---|
| T-01 | Fotografare il mobile | Foto HD del mobile Sala Rossa, varie angolazioni | Utente | 15 min | 🔴 Alta |
| T-02 | Fotografare elementi decorativi | Quadri, stemmi, arazzi, decorazioni — per testare come target AR nativi | Utente | 30 min | 🔴 Alta |
| T-03 | Testare elementi come target | Caricare foto di T-02 nel MindAR Compiler — verificare feature point | Utente | 30 min | 🔴 Alta |
| T-04 | Creare immagine target adulti | Se T-03 non basta: illustrazione storica-elegante per pannello | Utente (Canva/AI) | 1-2 ore | 🔴 Alta |
| T-05 | Creare immagine target bambini | Marcatore colorato/divertente con drago/mappa tesoro | Utente (Canva/AI) | 1-2 ore | 🔴 Alta |
| T-06 | Creare target didattico | Pannello stile museale che funge anche da target | Utente (Canva/AI) | 1 ora | 🟡 Media |
| T-07 | Generare file .mind | Caricare immagini su MindAR Compiler, scaricare .mind | Utente | 15 min | 🔴 Alta |
| T-08 | Testare qualità tracking | Verificare stabilità riconoscimento su smartphone reale | Utente | 30 min | 🔴 Alta |
| T-09 | Progettare supporti fisici | Decidere tipo di supporto (leggìo museo, cornice, ecc.) | Utente | 1 ora | 🟡 Media |
| T-10 | Stampare pannelli prototipo | Stampa A3 per test iniziale | Tipografia | 1 giorno | 🟡 Media |

### EPIC 3: Avatar e Modelli 3D

| ID | Task | Descrizione | Chi | Effort | Priorità |
|---|---|---|---|---|---|
| A-01 | Scegliere avatar Castellano | Su Mixamo/Sketchfab: cavaliere, dama o nobile medievale | Utente | 1 ora | 🔴 Alta |
| A-02 | Animazioni Castellano | Su Mixamo: "Talking", "Pointing", "Idle" | Utente | 30 min | 🔴 Alta |
| A-03 | Convertire Castellano in GLB | FBX → GLB con Blender o Character Animation Combiner | Utente | 1 ora | 🔴 Alta |
| A-04 | Scegliere avatar Drago | Personaggio cartoon: draghetto, folletto, piccolo cavaliere | Utente (Sketchfab) | 1 ora | 🔴 Alta |
| A-05 | Animazioni Drago | "Dancing", "Jumping", "Waving", "Excited" | Utente (Mixamo) | 30 min | 🔴 Alta |
| A-06 | Convertire Drago in GLB | FBX → GLB | Utente | 1 ora | 🔴 Alta |
| A-07 | Ottimizzare dimensioni | Ogni avatar < 5 MB — comprimere con gltf-transform se necessario | Claude Code | 1 ora | 🟡 Media |
| A-08 | Modelli didattici | Frecce 3D, etichette, timeline — geometrie semplici | Claude Code | 2 ore | 🟡 Media |

### EPIC 4: Audio e Contenuti

| ID | Task | Descrizione | Chi | Effort | Priorità |
|---|---|---|---|---|---|
| C-01 | Copione Castellano | Narrazione storica Sala Rossa + mobile, 2-3 min. Tono autorevole, micro-interruzioni ("Guarda in alto...") | Claude AI | 1-2 ore | 🔴 Alta |
| C-02 | Copione Drago | Presentazione + indizio caccia al tesoro + incoraggiamento. Tono divertente, misterioso | Claude AI | 1 ora | 🔴 Alta |
| C-03 | Testi didattici | Schede: data, stile, materiali, storia. Brevi e chiare | Claude AI | 1-2 ore | 🟡 Media |
| C-04 | Audio IT Castellano | Voce maschile/femminile autorevole | ElevenLabs | 30 min | 🔴 Alta |
| C-05 | Audio IT Drago | Voce giocosa e allegra | ElevenLabs | 30 min | 🔴 Alta |
| C-06 | File sottotitoli IT | Testo sincronizzato per overlay (formato SRT o JSON con timestamp) | Claude Code | 1 ora | 🔴 Alta |
| C-07 | Quiz bambini | 3-5 domande a scelta multipla sulla Sala Rossa | Claude AI | 30 min | 🟡 Media |
| C-08 | Audio EN | Versione inglese narrazioni per turisti | ElevenLabs | 1 ora | 🟢 Bassa |
| C-09 | Testi cartelli QR | Istruzioni ultra-chiare numerate con icone per i cartelli fisici | Claude AI | 1 ora | 🔴 Alta |

### EPIC 5: Sviluppo WebApp AR

| ID | Task | Descrizione | Chi | Effort | Priorità |
|---|---|---|---|---|---|
| D-01 | Homepage generale | Elenco sale (Sala Rossa attiva, altre "Prossimamente"). Logo, colori castello | Claude Code | 1 ora | 🟡 Media |
| D-02 | Menù narrativo Sala Rossa | 3 "porte" con nomi narrativi, illustrazioni, breve descrizione. Mobile-first | Claude Code | 2 ore | 🔴 Alta |
| D-03 | Mini-tutorial animato | Animazione 5 sec: mano con telefono inquadra pannello. "Ho capito, inizia!" Mostrare solo prima volta | Claude Code | 1-2 ore | 🔴 Alta |
| D-04 | Loading con progresso | Barra % caricamento asset. Istruzioni durante attesa ("Prepara il telefono...") | Claude Code | 1 ora | 🔴 Alta |
| D-05 | Gestione permessi camera | Richiesta permesso con spiegazione chiara IT. Fallback se rifiutato | Claude Code | 1 ora | 🔴 Alta |
| D-06 | "Il Castellano" — AR base | Target adulti → avatar appare con animazione idle | Claude Code | 2 ore | 🔴 Alta |
| D-07 | "Il Castellano" — audio + sottotitoli | Pulsante "Ascolta" → audio + animazione talking + sottotitoli sincronizzati | Claude Code | 2-3 ore | 🔴 Alta |
| D-08 | "Drago Custode" — AR base | Target bambini → drago appare con animazione vivace | Claude Code | 2 ore | 🔴 Alta |
| D-09 | "Drago Custode" — indizio | Fumetto 3D con indizio + audio + pulsante "Prossima sala" | Claude Code | 2-3 ore | 🔴 Alta |
| D-10 | "Drago Custode" — quiz | 3 risposte come pulsanti. Feedback visivo. Punti assegnati | Claude Code | 2-3 ore | 🟡 Media |
| D-11 | "Laboratorio del Tempo" | Pannelli info 3D con frecce, etichette espandibili al tocco | Claude Code | 2-3 ore | 🟡 Media |
| D-12 | Pulsante "Fine" | Chiude camera, salva progressi, torna al menù. SU OGNI PAGINA AR | Claude Code | 30 min | 🔴 Alta |
| D-13 | Pulsante "Non funziona?" | Guida rapida troubleshooting sempre visibile | Claude Code | 1 ora | 🔴 Alta |
| D-14 | Lingua automatica | Detect lingua browser → contenuti nella lingua corrispondente + selettore manuale | Claude Code | 2 ore | 🟢 Bassa |
| D-15 | theme.css condiviso | Variabili CSS castello: colori, font, touch target 44x44px | Claude Code | 1 ora | 🔴 Alta |

### EPIC 6: Gamification

| ID | Task | Descrizione | Chi | Effort | Priorità |
|---|---|---|---|---|---|
| G-01 | Sistema punti localStorage | Salvataggio punti nel browser. Funzioni: addPoints, getPoints, getTitle | Claude Code | 2 ore | 🟡 Media |
| G-02 | Badge per sala completata | Logica: se tutte e 3 le esperienze fatte → badge "Custode Sala Rossa" | Claude Code | 1 ora | 🟡 Media |
| G-03 | Pagina "Il mio zaino" | Visualizzazione punti, badge, titolo corrente. Grafica per bambini | Claude Code | 2 ore | 🟡 Media |
| G-04 | Riconoscimento Drago | Il Drago controlla localStorage: se già visitato → "Bentornato!" | Claude Code | 1 ora | 🟢 Bassa |
| G-05 | Design attestato cartaceo | Template stampabile A4 "Cavaliere del Castello" con spazio per nome | Claude AI/Canva | 1 ora | 🟡 Media |

### EPIC 7: Test e Qualità

| ID | Task | Descrizione | Chi | Effort | Priorità |
|---|---|---|---|---|---|
| Q-01 | Test iPhone Safari | Tutte le 3 esperienze su iPhone reale | Utente | 1 ora | 🔴 Alta |
| Q-02 | Test Android Chrome | Tutte le 3 esperienze su almeno 2 Android diversi | Utente | 1 ora | 🔴 Alta |
| Q-03 | Test in loco Sala Rossa | Test con pannelli stampati, illuminazione reale, connessione reale | Utente | 2 ore | 🔴 Alta |
| Q-04 | Test connettività | Verificare WiFi/4G nella sala. Se insufficiente → pianificare access point | Utente | 30 min | 🔴 Alta |
| Q-05 | Test utenti pilota | 5-10 persone miste età. Feedback strutturato | Utente | 3 ore | 🔴 Alta |
| Q-06 | Ottimizzare prestazioni | Ridurre tempi caricamento. Comprimere. Misurare prima/dopo | Claude Code | 2-3 ore | 🟡 Media |
| Q-07 | Validazione HTML | Niente errori sintassi, tutti i file referenziati esistono, HTTPS nei CDN | Claude Code | 30 min | 🔴 Alta |
| Q-08 | Verifica dimensioni asset | Alert se >5 MB per file o >15 MB totale pagina | Claude Code | 30 min | 🔴 Alta |

### EPIC 8: Lancio e Comunicazione

| ID | Task | Descrizione | Chi | Effort | Priorità |
|---|---|---|---|---|---|
| L-01 | Pannelli definitivi | Stampa professionale su supporto stile museale | Tipografia | 3-5 giorni | 🔴 Alta |
| L-02 | QR code + cartelli istruzioni | Cartelli con QR + istruzioni numerate ultra-chiare | Tipografia | 2-3 giorni | 🔴 Alta |
| L-03 | Installare pannelli | Posizionare nella Sala Rossa | Utente | 2 ore | 🔴 Alta |
| L-04 | Attestati cartacei | Stampa attestati "Cavaliere del Castello" per biglietteria | Tipografia | 2 giorni | 🟡 Media |
| L-05 | Privacy/GDPR | Informativa privacy nella WebApp. La fotocamera non registra/invia | Claude Code | 1-2 ore | 🔴 Alta |
| L-06 | Analytics Plausible | Installare Plausible Analytics + custom event | Claude Code | 1-2 ore | 🟡 Media |
| L-07 | Comunicato stampa | Testo per media locali sull'innovazione AR | Claude AI | 2 ore | 🟡 Media |
| L-08 | Contenuti social | Video demo AR, foto, stories | Utente | 2 ore | 🟡 Media |
| L-09 | Formare personale | Breve formazione: come funziona, come aiutare visitatori, troubleshooting | Utente | 1 ora | 🔴 Alta |
| L-10 | Hotspot nel tour Matterport | Aggiungere riferimenti all'AR nel virtual tour esistente | Utente | 1-2 ore | 🟢 Bassa |

---

## 14. PIANO SPRINT AGGIORNATO

### SPRINT 1 — SETUP, ASSET E VERIFICA CONNETTIVITÀ (Settimana 1)

**Obiettivo:** Ambiente pronto, connettività verificata, primi asset pronti.

**Task:**
- S-01 → S-06, S-08 → S-10 — Setup completo + GitHub Pages attivo
- Q-04 — **Test connettività nella Sala Rossa** (PRIORITÀ ASSOLUTA)
- T-01, T-02, T-03 — Foto mobile + test elementi decorativi come target
- T-04, T-05, T-07, T-08 — Creazione e test target AR
- A-01 → A-06 — Avatar scelti e convertiti in GLB

**Deliverable:** Repository GitHub con Pages attivo, 2 avatar GLB funzionanti, file .mind pronti, report connettività sala. URL live: https://[username].github.io/castello-ar/

---

### SPRINT 2 — PROTOTIPO AR FUNZIONANTE (Settimana 2-3)

**Obiettivo:** Le 3 esperienze della Sala Rossa funzionano. Dimostrabile alla giunta.

**Task:**
- D-15 — Theme CSS condiviso
- D-02 — Menù narrativo Sala Rossa
- D-03 — Mini-tutorial animato
- D-04, D-05 — Loading e permessi camera
- D-06 — "Il Castellano" AR base
- D-08 — "Drago Custode" AR base
- D-12 — Pulsante "Fine" su ogni pagina
- D-13 — Pulsante "Non funziona?"
- C-01, C-02 — Copioni narrazione
- Q-07, Q-08 — Validazione HTML e dimensioni

**Deliverable:** WebApp live su GitHub Pages. QR → scelta → tutorial → fotocamera → avatar appare. Funzionante su iPhone e Android. Dimostrabile.

---

### SPRINT 3 — CONTENUTI COMPLETI E POLISH (Settimana 4-5)

**Obiettivo:** Audio, sottotitoli, interazioni, quiz, didattica, gamification base.

**Task:**
- C-04, C-05 — Generazione audio
- C-06 — File sottotitoli sincronizzati
- D-07 — Audio + sottotitoli nel Castellano
- D-09 — Indizio caccia al tesoro con fumetto
- D-10 — Quiz interattivo bambini
- T-06, A-08, D-11 — Modalità didattica completa
- C-03, C-07 — Testi didattici e quiz
- D-01 — Homepage generale
- A-07 — Ottimizzazione asset
- G-01, G-02, G-03 — Sistema punti e badge
- C-09 — Testi cartelli QR

**Deliverable:** Tutte e 3 le esperienze complete con audio, sottotitoli, quiz, badge. Pronte per test.

---

### SPRINT 4 — TEST E LANCIO (Settimana 6-8)

**Obiettivo:** Test reali, materiali stampati, formazione, lancio pubblico.

**Task:**
- Q-01, Q-02, Q-03 — Test dispositivi e in loco
- Q-05 — Test utenti pilota
- Q-06 — Ottimizzazione prestazioni
- T-09, T-10 → L-01 — Progettazione e stampa supporti definitivi
- L-02, L-03 — QR code + installazione pannelli
- L-04 — Attestati cartacei
- L-05 — Privacy/GDPR
- L-06 — Analytics
- L-09 — Formazione personale
- L-07, L-08 — Comunicato stampa + social
- G-05 — Design attestato

**Deliverable:** 🚀 LANCIO PUBBLICO. Pannelli installati, personale formato, comunicato diramato, analytics attivi.

---

### POST-LANCIO — EVOLUZIONE CONTINUA

| Priorità | Task |
|---|---|
| 🔴 Alta | Seconda sala (duplicare struttura Sala Rossa) |
| 🔴 Alta | Terza sala |
| 🟡 Media | G-04 — Continuità Drago tra sale ("Bentornato!") |
| 🟡 Media | D-14 — Lingua automatica + EN completo |
| 🟡 Media | Foto AR condivisibili |
| 🟡 Media | L-10 — Hotspot in tour Matterport |
| 🟡 Media | Service worker per cache asset |
| 🟡 Media | Finale segreto multi-sala |
| 🟢 Bassa | Configurazione JSON per scalabilità |
| 🟢 Bassa | Scelte narrative nel quiz |
| 🟢 Bassa | Audio spaziale simulato |
| 🟢 Bassa | Contenuti stagionali (Natale, Halloween, estate) |
| 💡 Futuro | AI narrativa (avatar risponde a domande) |
| 💡 Futuro | Modalità "Viaggio nel tempo" |
| 💡 Futuro | Multiplayer soft |
| 💡 Futuro | Prodotto replicabile per altri siti culturali |

---

## 15. COMANDI CLAUDE CODE

Per ogni task di sviluppo, ecco cosa scrivere nel terminale:

### D-02 (Menù narrativo)
```
Crea sala-rossa/index.html — pagina mobile-first con 3 "porte" narrative:
"Il Castellano Ti Racconta" (icona cavaliere, tono caldo),
"La Missione del Drago Custode" (icona drago, tono avventuroso),
"Il Laboratorio del Tempo" (icona lente/orologio, tono scientifico).
Usa i colori da shared/css/theme.css. Link a il-castellano.html,
drago-custode.html, laboratorio-tempo.html. Aggiungi logo castello in alto.
```

### D-06 (Castellano AR base)
```
Crea sala-rossa/il-castellano.html — pagina WebAR con MindAR + A-Frame.
Usa l'ULTIMA versione stabile di MindAR e A-Frame (verifica prima su npm).
Target: assets/targets/target-adulti.mind
Modello: assets/models/castellano.glb con animazione idle.
Aggiungi pulsante "Fine" che chiude la camera e torna a index.html.
Aggiungi pulsante "Non funziona?" con troubleshooting.
Gestisci permesso fotocamera con messaggio chiaro in italiano.
Schermata loading con barra progresso.
```

### D-08 (Drago Custode AR base)
```
Crea sala-rossa/drago-custode.html — pagina WebAR bambini.
Target: assets/targets/target-bambini.mind
Modello: assets/models/drago.glb con animazione vivace.
Dopo 3 secondi appare fumetto con indizio: "Cerca il simbolo del leone
nella prossima sala!" + pulsante "Ascolta" per audio.
Pulsante "Prossima sala" e pulsante "Fine".
Stile colorato e divertente.
Controlla localStorage: se il bambino ha già visitato, il Drago dice
"Bentornato, esploratore!".
```

### D-03 (Tutorial)
```
Crea tutorial/tutorial.html — mini-tutorial animato (solo CSS, no video).
Mostra: icona telefono → freccia → icona pannello.
Testo: "Inquadra il pannello con la fotocamera del telefono".
Pulsante grande "Ho capito, inizia!".
Salva in localStorage che il tutorial è stato visto.
Se già visto, non mostrarlo più.
```

---

## 16. IDEE VISIONARIE (FUTURO)

### Modalità "Viaggio nel Tempo"
Inquadrando la sala: sovrapporre ricostruzione AR degli arredi d'epoca.
Richiede modelli 3D commissionati a artista.

### Multiplayer Soft
Bambini insieme: indizi complementari, collaborazione per trovarli tutti.
Nessun backend necessario se gli indizi sono complementari by design.

### AI Narrativa
L'avatar risponde a domande: "Quanti anni ha questo mobile?"
Richiede integrazione API AI. Fattibile come upgrade futuro.

### Contenuti Stagionali
Natale: decorazioni AR. Halloween: esperienza horror-light. Estate: caccia al tesoro nel giardino. Notte dei Musei: contenuti esclusivi.

### Foto AR Condivisibili
Pulsante "Scatta foto con il Cavaliere" → screenshot → condividi su social → marketing organico automatico.

---

## 17. RISCHI E MITIGAZIONI

| Rischio | Probabilità | Impatto | Mitigazione |
|---|---|---|---|
| Niente connessione nella sala | Alta | Bloccante | WiFi dedicato o pre-caricamento |
| Visitatori non capiscono cosa fare | Alta | Alto | Cartelli chiari, tutorial, "Non funziona?" |
| Batteria si scarica | Media | Medio | Pulsante "Fine", esperienze brevi (2-3 min) |
| Target non riconosciuto (buio) | Media | Alto | Illuminazione pannelli, test in loco |
| Dispositivi vecchi non supportano | Bassa | Medio | Fallback testuale, messaggio chiaro |
| "Effetto demo" (wow e poi nessuno torna) | Media | Alto | Badge, contenuti che cambiano, stagionalità |
| Libreria AR deprecata | Bassa | Alto | Skill impone verifica versioni ad ogni sessione |
| Audio forte disturba altri visitatori | Alta | Medio | Sottotitoli obbligatori, istruzioni "usa auricolari" |

---

## 18. CHECKLIST PRIMA DI INIZIARE

### Cose da avere
- [ ] Computer con accesso a Internet
- [ ] Smartphone per test (iPhone 6s+ o Android recente)
- [ ] Accesso fisico alla Sala Rossa

### Informazioni da raccogliere
- [ ] Storia della Sala Rossa (date, personaggi, aneddoti)
- [ ] Storia del mobile (data, stile, proprietari)
- [ ] Foto HD del mobile e della sala (da varie angolazioni)
- [ ] Foto degli elementi decorativi esistenti (quadri, stemmi, arazzi)
- [ ] Stato connettività WiFi/4G nella sala

### Account da creare
- [ ] Claude Pro ($20/mese) — claude.ai
- [ ] Adobe (gratuito) — per Mixamo
- [ ] Netlify (gratuito) — per hosting
- [ ] GitHub (gratuito) — per codice
- [ ] ElevenLabs (gratuito) — per audio AI

### Software da installare
- [ ] Node.js LTS — nodejs.org
- [ ] Claude Code — `npm install -g @anthropic-ai/claude-code`
- [ ] Blender — blender.org
- [ ] Git — git-scm.com

---

**Prossimo passo:** Raccogli le info storiche e le foto della Sala Rossa. Poi dimmi "Partiamo con lo Sprint 1" e ti guido task per task.
