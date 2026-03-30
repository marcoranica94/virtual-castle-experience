# Castello AR — Reference Tecnico

Documento di riferimento per convenzioni, versioni, e dettagli tecnici del progetto.
Consultato da Claude Code durante la Fase 0 e la Fase 3 del workflow.

---

## Stack Tecnico

| Componente | Tecnologia | Versione Minima | Note |
|---|---|---|---|
| Runtime | Node.js | LTS corrente (verifica nodejs.org) | Solo per dev/build, il progetto finale è statico |
| AR Engine (Image) | MindAR.js | Ultima stabile (verifica npm/GitHub) | Image tracking + Face tracking |
| AR Engine (GPS) | AR.js | Ultima stabile (verifica GitHub) | Solo per giardino/esterno — Location-based |
| Framework 3D | A-Frame | Ultima stabile (verifica aframe.io) | Integrato con MindAR e AR.js |
| Hosting | GitHub Pages | — | Statico, HTTPS automatico, deploy con git push |
| Modelli 3D | glTF/GLB | 2.0 | Standard web, unico file binario |
| Audio | MP3 | — | Compatibilità universale |

---

## Hosting — GitHub Pages

GitHub Pages è la piattaforma primaria per il progetto. È gratuita, include HTTPS, e il deploy avviene automaticamente con `git push`.

### Setup Iniziale (una volta)

```bash
# 1. Crea repository su GitHub (github.com → New repository)
#    Nome: castello-ar
#    Visibilità: Public (necessario per GitHub Pages gratuito)

# 2. Clona e inizializza
git clone https://github.com/[TUO-USERNAME]/castello-ar.git
cd castello-ar

# 3. Crea il primo file e pusha
git add .
git commit -m "chore: initial project structure"
git push origin main

# 4. Attiva GitHub Pages:
#    - Vai su github.com/[TUO-USERNAME]/castello-ar/settings/pages
#    - Source: "Deploy from a branch"
#    - Branch: main
#    - Folder: / (root)
#    - Salva

# 5. Dopo 1-2 minuti il sito è live su:
#    https://[TUO-USERNAME].github.io/castello-ar/
```

### Deploy (ogni volta)

```bash
git add .
git commit -m "feat(sala-rossa): descrizione modifica"
git push origin main
# GitHub Pages si aggiorna automaticamente in 1-2 minuti
```

### Limiti GitHub Pages

| Limite | Valore | Impatto |
|---|---|---|
| Dimensione repository | 1 GB (soft limit) | OK — con asset ottimizzati, 10+ sale stanno comodamente |
| Dimensione singolo file | 100 MB | OK — i nostri asset sono tutti <5 MB |
| Bandwidth mensile | 100 GB | OK — più che sufficiente per un castello |
| Build al minuto | 10 | OK — non facciamo build, sono file statici |
| Siti per account | illimitati | OK |

### Dominio Personalizzato (opzionale)

Se vuoi un URL tipo `ar.castello-xyz.it` invece di `username.github.io/castello-ar`:

```
# 1. Nelle impostazioni GitHub Pages → Custom domain → inserisci: ar.castello-xyz.it
# 2. Nel DNS del dominio, aggiungi un record CNAME:
#    ar.castello-xyz.it → [TUO-USERNAME].github.io
# 3. Spunta "Enforce HTTPS"
# 4. Aspetta qualche ora per la propagazione DNS
```

### Path Relativi — ATTENZIONE

GitHub Pages serve il sito da `https://username.github.io/castello-ar/` (con sottocartella).
Tutti i link interni DEVONO essere **relativi**, mai assoluti:

```html
<!-- ✅ CORRETTO — path relativo -->
<a href="sala-rossa/index.html">Sala Rossa</a>
<script src="shared/js/ar-utils.js"></script>
<a-asset-item src="assets/models/cavaliere.glb"></a-asset-item>

<!-- ❌ SBAGLIATO — path assoluto (non funziona su GitHub Pages) -->
<a href="/sala-rossa/index.html">Sala Rossa</a>
<script src="/shared/js/ar-utils.js"></script>
```

### Firebase — NON necessario per la demo

Il progetto è interamente statico. Il sistema punti/badge usa localStorage del browser.
Firebase servirebbe solo in futuro per: classifica condivisa tra visitatori, dati sincronizzati
tra dispositivi, o AI narrativa con backend. Per la demo e il lancio iniziale: **non serve**.

### Migrazione futura (se necessario)

Se un giorno servisse un backend (serverless functions per AI, database condiviso):
- Migrare su **Vercel** (che Marco già conosce) → stesso deploy da GitHub, stessi file
- Oppure aggiungere Firebase solo per le funzionalità che lo richiedono
- Il codice frontend resta identico, cambia solo l'hosting

### Come Verificare le Versioni

**Prima di ogni sessione di sviluppo**, verifica:

```bash
# MindAR — ultima versione
npm view mind-ar version

# A-Frame — ultima versione
npm view aframe version

# Node.js LTS
node --version  # Confronta con https://nodejs.org
```

**Nei file HTML, usa i CDN con versione esplicita:**

```html
<!-- TEMPLATE — sostituisci X.Y.Z con la versione verificata -->
<script src="https://aframe.io/releases/X.Y.Z/aframe.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/mind-ar@X.Y.Z/dist/mindar-image-aframe.prod.js"></script>
```

**MAI usare:**
```html
<!-- ❌ SBAGLIATO — versione non specificata -->
<script src="https://cdn.jsdelivr.net/npm/mind-ar/dist/mindar-image-aframe.prod.js"></script>

<!-- ❌ SBAGLIATO — versione troppo vecchia -->
<script src="https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/dist/mindar-image-aframe.prod.js"></script>
```

---

## Template File di Progetto

### CLAUDE-DOC.md (template iniziale)

```markdown
# Castello AR — Documentazione Tecnica

Ultimo aggiornamento: [data]

## Decisioni Architetturali
<!-- Ogni decisione tecnica importante va qui con data e motivazione -->

## Versioni in Uso
| Libreria | Versione | Data Aggiornamento |
|---|---|---|
| MindAR | X.Y.Z | [data] |
| A-Frame | X.Y.Z | [data] |
| Node.js | X.Y.Z | [data] |

## Problemi Noti e Soluzioni
<!-- Bug trovati e come sono stati risolti -->

## Cosa Funziona
<!-- Funzionalità testate e confermate funzionanti -->

## Cosa Non Funziona / Limitazioni
<!-- Problemi aperti, limitazioni note -->

## Asset Utilizzati
| Asset | Provenienza | Licenza | Note |
|---|---|---|---|
<!-- Per ogni modello 3D, audio, immagine: da dove viene e che licenza ha -->
```

### ISTRUZIONI-DEV.md (template iniziale)

```markdown
# Castello AR — Istruzioni per lo Sviluppatore / Utente

Ultimo aggiornamento: [data]

## Setup Iniziale (da fare una volta)
- [ ] Installare Node.js LTS da https://nodejs.org
- [ ] Installare Claude Code: `npm install -g @anthropic-ai/claude-code`
- [ ] Creare account Netlify gratuito su https://netlify.com
- [ ] Creare account Adobe gratuito per Mixamo su https://mixamo.com
- [ ] Installare Blender da https://blender.org (per conversione modelli)
- [ ] Clonare il repository: `git clone [URL]`
- [ ] Entrare nella cartella: `cd castello-ar`

## Azioni Manuali Pendenti
<!-- Task che richiedono intervento umano: test dispositivo, caricare asset, stampare -->

## Come Testare
1. Avvia server locale: `npx serve .` (dalla root del progetto)
2. Apri `https://localhost:3000` dal telefono (stesso WiFi)
   - Oppure usa `npx localtunnel --port 3000` per un URL pubblico temporaneo
3. Naviga alla sala da testare
4. Concedi permesso fotocamera
5. Inquadra il pannello target stampato

## Come Pubblicare (Deploy)
1. Push su GitHub: `git push origin main`
2. Netlify fa deploy automatico (se configurato)
   - Oppure: trascina la cartella del progetto su app.netlify.com/drop

## Come Generare File .mind (Target AR)
1. Vai su https://hiukim.github.io/mind-ar-js-doc/tools/compile
2. Carica l'immagine target (JPG/PNG)
3. Clicca "Start"
4. Verifica i feature point (pallini rossi) — devono essere molti
5. Scarica il file .mind
6. Metti nella cartella `sala-nome/assets/targets/`

## Come Aggiungere un Modello 3D da Mixamo
1. Vai su https://www.mixamo.com
2. Tab "Characters" → scegli personaggio
3. Tab "Animations" → scegli animazione (es. "Talking")
4. Download → Format: FBX, Skin: With Skin, FPS: 30
5. Apri Blender → File → Import → FBX
6. File → Export → glTF 2.0 (.glb)
   - Spunta: "Export Animations"
   - Format: GLB (binary)
7. Metti il .glb nella cartella `sala-nome/assets/models/`

## Troubleshooting
<!-- Problemi comuni e soluzioni -->
```

### BACKLOG.md (template iniziale)

```markdown
# Castello AR — Backlog

Ultimo aggiornamento: [data]

## Sprint Corrente: [N] — [Obiettivo]

### In Corso 🔄
<!-- Task attualmente in lavorazione -->

### Da Fare 📋
<!-- Task pronte per essere prese in carico -->

### Completate ✅
<!-- Task finite — segna data completamento -->

---

## Backlog Futuro (non ancora in sprint)

### Alta Priorità 🔴
<!-- Task importanti non ancora pianificate -->

### Media Priorità 🟡

### Bassa Priorità 🟢

---

## Idee / Parking Lot 💡
<!-- Idee per il futuro, da valutare -->
```

---

## Convenzioni di Naming

| Elemento | Convenzione | Esempio |
|---|---|---|
| Cartelle sala | kebab-case | `sala-rossa`, `sala-blu`, `giardino` |
| File HTML | kebab-case | `visita-culturale.html`, `caccia-tesoro.html` |
| File asset | kebab-case descrittivo | `cavaliere-parlante.glb`, `narrazione-sala-rossa-it.mp3` |
| File target | kebab-case + tipo | `target-adulti.mind`, `target-bambini.mind` |
| ID CSS/HTML | kebab-case | `btn-ascolta`, `ar-scene-adulti` |
| Variabili JS | camelCase | `arScene`, `audioPlayer`, `targetFound` |
| Costanti JS | UPPER_SNAKE | `MAX_AUDIO_DURATION`, `MODEL_SCALE` |
| Commit | Conventional Commits EN | `feat(sala-rossa): add knight avatar` |
| Branch | tipo/descrizione | `feat/sala-blu`, `fix/ios-audio-bug` |

---

## Checklist Nuova Sala

Quando si aggiunge una nuova sala, seguire questa checklist:

```
## Nuova Sala: [nome]

### Preparazione (Utente)
- [ ] Foto della sala e degli elementi principali
- [ ] Informazioni storiche (date, personaggi, aneddoti)
- [ ] Creare immagine target adulti (dettagliata, molti colori)
- [ ] Creare immagine target bambini (colorata, divertente)
- [ ] Generare file .mind per ogni target
- [ ] Scegliere avatar su Mixamo/Sketchfab
- [ ] Convertire avatar in .glb con Blender
- [ ] Scrivere copione narrazione adulti
- [ ] Scrivere copione caccia al tesoro bambini
- [ ] Scrivere schede didattiche
- [ ] Generare audio con ElevenLabs o registrare

### Sviluppo (Claude Code)
- [ ] Duplicare struttura da sala esistente
- [ ] Aggiornare index.html della sala (titolo, tema)
- [ ] Aggiornare visita-culturale.html (nuovo target, nuovo avatar, nuovo audio)
- [ ] Aggiornare caccia-tesoro.html (nuovo target, nuovo personaggio, nuovo indizio)
- [ ] Aggiornare didattica.html (nuovi contenuti informativi)
- [ ] Aggiornare index generale con nuova sala
- [ ] Verificare tutti i path dei file
- [ ] Test automatici (link, dimensioni, HTML valido)

### Test (Utente)
- [ ] Test iPhone Safari
- [ ] Test Android Chrome
- [ ] Test in loco nella sala reale
- [ ] Verifica posizionamento pannelli
- [ ] Verifica audio (volume, chiarezza)
- [ ] Verifica leggibilità testi didattici
```

---

## Compatibilità Browser

| Feature | Chrome Android | Safari iOS | Note |
|---|---|---|---|
| getUserMedia (camera) | ✅ 53+ | ✅ 11+ | Richiede HTTPS |
| WebGL | ✅ | ✅ | Necessario per rendering 3D |
| WebRTC | ✅ | ✅ 11+ | Usato per accesso camera |
| Audio autoplay | ⚠️ con gesto | ❌ senza gesto | SEMPRE richiedere tap utente per audio |
| Geolocation | ✅ | ✅ | Richiede HTTPS + permesso, solo per giardino |
| DeviceOrientation | ✅ | ⚠️ 13+ con permesso | iOS richiede richiesta esplicita |

### Note Critiche iOS Safari
- **Audio**: MAI tentare autoplay. Servire SEMPRE un pulsante "Ascolta" che l'utente tocca.
- **Fullscreen**: Safari non supporta Fullscreen API su iPhone. Workaround: aggiungere `<meta name="apple-mobile-web-app-capable" content="yes">`
- **Camera**: la prima volta chiede permesso. Se l'utente nega, non c'è modo di richiedere di nuovo dalla pagina — mostrare istruzioni per abilitare dalle Impostazioni.

---

## Performance Budget

| Metrica | Target | Critico |
|---|---|---|
| Peso pagina totale | < 10 MB | > 15 MB |
| Singolo asset | < 3 MB | > 5 MB |
| Tempo primo caricamento (4G) | < 4 sec | > 8 sec |
| Tempo riconoscimento target | < 2 sec | > 5 sec |
| FPS rendering AR | > 30 | < 15 |

### Ottimizzazione Modelli 3D

Se un modello .glb è troppo pesante:

```bash
# Installa gltf-transform (una volta)
npm install -g @gltf-transform/cli

# Comprimi texture
gltf-transform etc1s input.glb output.glb

# Riduci poligoni (se necessario)
gltf-transform simplify input.glb output.glb --ratio 0.5

# Comprimi tutto (draco)
gltf-transform draco input.glb output.glb
```

---

## Risorse Gratuite per Asset

### Modelli 3D
- **Mixamo** (mixamo.com) — Personaggi animati gratuiti, richiede conversione FBX→GLB
- **Sketchfab** (sketchfab.com) — Enorma libreria, filtrare per "Downloadable" + "Animated"
- **Poly Pizza** (poly.pizza) — Modelli low-poly CC0
- **Kenney** (kenney.nl) — Game asset gratuiti

### Audio
- **ElevenLabs** (elevenlabs.io) — TTS AI, piano gratuito disponibile
- **Google Cloud TTS** — API TTS, 1M caratteri/mese gratuiti
- **Freesound** (freesound.org) — Effetti sonori gratuiti

### Immagini / Design Target
- **Canva** (canva.com) — Design gratuito online
- **DALL-E / Midjourney** — Generazione AI di illustrazioni per i pannelli target

### Tool
- **MindAR Compiler** — hiukim.github.io/mind-ar-js-doc/tools/compile
- **Blender** (blender.org) — Conversione e editing 3D gratuito
- **gltf-transform** — CLI per ottimizzazione modelli
- **Character Animation Combiner** — nilooy.github.io/character-animation-combiner (merge animazioni Mixamo in un GLB)
