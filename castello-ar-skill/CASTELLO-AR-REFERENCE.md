# Castello AR — Reference Tecnico

Documento di riferimento per convenzioni, versioni, e dettagli tecnici del progetto.
Consultato da Claude Code durante la Fase 0 e la Fase 3 del workflow.

---

## Stack Tecnico

| Componente | Tecnologia | Versione in Uso | Note |
|---|---|---|---|
| Framework | Angular | 21.2.6 | Standalone components, signals, lazy routing |
| Linguaggio | TypeScript | 5.9.2 | Strict mode — mai `any` |
| Styling | Tailwind CSS | 4.2.2 | Design tokens via `@theme`, mobile-first |
| Runtime dev | Node.js | 24.x LTS (verifica nodejs.org) | Solo per dev/build |
| AR Engine (Image) | MindAR.js | 1.2.5 | Caricato dinamicamente via ArService |
| AR Engine (GPS) | AR.js | Ultima stabile (verifica GitHub) | Solo per giardino/esterno — futuro |
| Framework 3D | A-Frame | 1.7.1 | Caricato dinamicamente via ArService |
| Hosting | Dedicato (Vercel/Netlify/altro) | — | Non GitHub Pages. HTTPS obbligatorio per AR |
| Modelli 3D | glTF/GLB | 2.0 | Standard web, unico file binario |
| Audio | MP3 | — | Compatibilità universale |
| Build | Angular CLI + Vite | 21.2.5 | `npm run build` → `dist/castello-ar/browser/` |

---

## Build e Deploy

### Sviluppo locale
```bash
npm start                # ng serve → http://localhost:4200
```

### Build produzione
```bash
npm run build            # output in dist/castello-ar/browser/
```

### Deploy su GitHub Pages

Il progetto usa `angular-cli-ghpages` per il deploy automatico.

```bash
npm run deploy
# Equivale a: ng deploy
# 1. Esegue ng build --configuration production (con baseHref automatico)
# 2. Pusha dist/castello-ar/browser/ sul branch gh-pages
# 3. GitHub Pages serve il sito su:
#    https://marcoranica94.github.io/virtual-castle-experience/
```

**Setup iniziale GitHub Pages (una volta):**
1. Vai su github.com/marcoranica94/virtual-castle-experience → Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: `gh-pages` → `/ (root)` → Save
4. Dopo il primo `npm run deploy` il sito sarà live

**Note tecniche:**
- `baseHref` impostato a `/virtual-castle-experience/` in `angular.json` (configurazione production)
- Routing con `withHashLocation()` — URL tipo `.../#/sala/rossa` (necessario per GitHub Pages)
- Il branch `gh-pages` viene gestito interamente da `angular-cli-ghpages`, non modificarlo manualmente

### Dominio personalizzato (opzionale)
1. Nelle impostazioni GitHub Pages → Custom domain → inserisci: `ar.rocca-albani.it`
2. Nel DNS del dominio, aggiungi record CNAME: `ar.rocca-albani.it → marcoranica94.github.io`
3. Spunta "Enforce HTTPS"
4. Aggiorna `baseHref` in `angular.json` da `/virtual-castle-experience/` a `/`

### Come verificare le versioni delle dipendenze
```bash
# Versioni installate
cat package.json

# Angular ultima stabile
npm view @angular/core version

# MindAR ultima stabile
npm view mind-ar version

# Node.js LTS
node --version  # Confronta con https://nodejs.org
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
| Libreria | Versione | Data |
|---|---|---|
| Angular | X.Y.Z | [data] |
| TypeScript | X.Y.Z | [data] |
| Tailwind CSS | X.Y.Z | [data] |
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
- [ ] Clonare il repository: `git clone [URL]`
- [ ] Entrare nella cartella: `cd virtual-castle-experience`
- [ ] Installare dipendenze: `npm install`
- [ ] Avviare il dev server: `npm start` → http://localhost:4200

## Azioni Manuali Pendenti
<!-- Task che richiedono intervento umano: test dispositivo, caricare asset, ecc. -->

## Come Testare
### In locale (navigazione e UI)
```bash
npm start
# Apri http://localhost:4200 su browser desktop o mobile (stesso WiFi)
```

### AR su smartphone (richiede HTTPS)
1. Deploy su Vercel/Netlify (HTTPS automatico) — metodo consigliato
2. Oppure: `npx localtunnel --port 4200` — URL HTTPS temporaneo

## Come Pubblicare (Deploy)
1. `npm run build` → genera `dist/castello-ar/browser/`
2. Push su GitHub → Vercel/Netlify fa deploy automatico (se configurato)

## Come Generare File .mind (Target AR)
1. Vai su https://hiukim.github.io/mind-ar-js-doc/tools/compile
2. Carica l'immagine target (JPG/PNG)
3. Clicca "Start"
4. Verifica i feature point (pallini rossi) — devono essere molti
5. Scarica il file .mind
6. Metti nella cartella `public/assets/sala-nome/targets/`

## Come Aggiungere un Modello 3D da Mixamo
1. Vai su https://www.mixamo.com
2. Tab "Characters" → scegli personaggio
3. Tab "Animations" → scegli animazione (es. "Talking")
4. Download → Format: FBX, Skin: With Skin, FPS: 30
5. Apri Blender → File → Import → FBX
6. File → Export → glTF 2.0 (.glb)
   - Spunta: "Export Animations"
   - Format: GLB (binary)
7. Metti il .glb nella cartella `public/assets/sala-nome/models/`

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
| Cartelle sala (asset) | kebab-case | `sala-rossa`, `sala-blu`, `giardino` |
| File TypeScript | kebab-case | `ar.service.ts`, `sala-rossa.ts`, `progress-bar.ts` |
| Classi Angular | PascalCase | `ArService`, `ProgressBarComponent`, `SalaRossaData` |
| File asset | kebab-case descrittivo | `cavaliere-parlante.glb`, `narrazione-sala-rossa.mp3` |
| File target | kebab-case + tipo | `target-adulti.mind`, `target-bambini.mind` |
| Variabili TS | camelCase | `arScene`, `audioPlayer`, `targetFound` |
| Costanti TS | UPPER_SNAKE | `MAX_AUDIO_DURATION`, `MODEL_SCALE` |
| Signals Angular | camelCase | `isLoading`, `currentRoom`, `userPoints` |
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
- [ ] Creare `src/app/data/sala-nome.ts` con i dati tipizzati (implementa `RoomConfig`)
- [ ] Registrare la sala in `src/app/data/rooms.ts`
- [ ] Copiare gli asset in `public/assets/sala-nome/` (models/, audio/, images/, targets/)
- [ ] Verificare che i path asset in `sala-nome.ts` corrispondano alla struttura in `public/`
- [ ] `ng build` — verifica che la compilazione TS sia senza errori
- [ ] Nessun HTML/route nuovo necessario — `ArExperienceComponent` è generico

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
