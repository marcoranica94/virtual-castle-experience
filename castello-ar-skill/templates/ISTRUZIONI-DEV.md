# Castello AR — Istruzioni per lo Sviluppatore / Utente

Ultimo aggiornamento: [DATA CREAZIONE]

---

## Setup Iniziale (da fare una volta)

### Software da installare
- [ ] **Node.js LTS** — Scarica da https://nodejs.org (scegli la versione LTS)
- [ ] **Claude Code** — Da terminale: `npm install -g @anthropic-ai/claude-code`
- [ ] **Git** — Scarica da https://git-scm.com (se non già installato)
- [ ] **Blender** — Scarica da https://blender.org (per conversione modelli 3D)

### Account da creare (tutti gratuiti tranne Claude Pro)
- [ ] **Claude Pro** ($20/mese) — https://claude.ai (necessario per Claude Code)
- [ ] **GitHub** — https://github.com (repository codice)
- [ ] **Adobe/Mixamo** — https://mixamo.com (per avatar 3D animati)
- [ ] **ElevenLabs** — https://elevenlabs.io (per generazione audio AI, piano free)

### Setup progetto
```bash
# 1. Clona il repository
git clone https://github.com/[TUO-USERNAME]/virtual-castle-experience.git
cd virtual-castle-experience

# 2. Installa le dipendenze
npm install

# 3. Avvia il server locale
npm start
# → Apri http://localhost:4200 nel browser

# 4. Per il deploy: connetti il repo a Vercel (vercel.com → New Project)
#    Framework: Angular, Output: dist/castello-ar/browser
```

---

## Azioni Manuali Pendenti

<!-- Qui Claude Code scrive le azioni che l'utente deve fare.
     Formato:

### [DATA] — Descrizione azione
**Cosa fare:** istruzioni step-by-step
**Perché:** motivazione
**Stato:** 🔄 Da fare / ✅ Fatto
-->

### Nessuna azione pendente al momento.
Quando Claude Code completa una task che richiede un intervento manuale, lo troverai scritto qui.

---

## Come Fare le Operazioni Comuni

### Testare sul telefono (rete locale)
```bash
# Dal terminale, nella cartella del progetto:
npm start
# → http://localhost:4200
# Per accedere dal telefono (stessa rete WiFi), usa l'IP della macchina:
# http://192.168.1.X:4200
```

Se serve un URL pubblico temporaneo con HTTPS (richiesto per AR):
```bash
npx localtunnel --port 4200
# Ti darà un URL tipo https://xyz.loca.lt
```

### Generare file .mind (target per MindAR)
1. Vai su https://hiukim.github.io/mind-ar-js-doc/tools/compile
2. Carica l'immagine JPG/PNG che userai come pannello
3. Clicca "Start" e aspetta la compilazione
4. **Controlla i feature point** (pallini rossi sull'immagine):
   - Molti pallini = tracking stabile ✅
   - Pochi pallini = tracking instabile ❌ → rifai l'immagine con più dettagli
5. Clicca "Download" per scaricare il file `.mind`
6. Metti il file nella cartella `public/assets/sala-nome/targets/`

### Aggiungere un modello 3D da Mixamo
1. Vai su https://www.mixamo.com e accedi con account Adobe
2. **Tab "Characters"** → scegli un personaggio
3. **Tab "Animations"** → cerca e seleziona un'animazione
4. **Download** con queste impostazioni:
   - Format: **FBX Binary (.fbx)**
   - Skin: **With Skin**
   - Frames per Second: **30**
   - Keyframe Reduction: **Uniform**
5. **Converti in GLB con Blender:**
   - Apri Blender → File → Import → FBX (.fbx)
   - Seleziona il file scaricato
   - File → Export → glTF 2.0 (.glb)
   - Nelle opzioni di export: spunta "Export Animations", Format: "GLB"
   - Salva nella cartella `public/assets/sala-nome/models/`
6. **Verifica dimensione**: deve essere < 5 MB. Se più grande:
   ```bash
   gltf-transform etc1s input.glb output.glb
   ```

### Generare audio con ElevenLabs
1. Vai su https://elevenlabs.io e crea un account gratuito
2. Incolla il testo del copione
3. Scegli una voce italiana
4. Clicca "Generate"
5. Scarica il file MP3
6. Metti nella cartella `public/assets/sala-nome/audio/`
7. Rinomina in modo descrittivo: `narrazione-sala-rossa.mp3`

### Pubblicare le modifiche online (Deploy)
```bash
# Salva le modifiche
git add .
git commit -m "feat(sala-rossa): descrizione della modifica"
git push origin master
# → GitHub Actions fa build + deploy automaticamente
# → sito live in 1-2 min su GitHub Pages

# Per verificare: github.com/[USER]/[REPO] → Actions → vedi se è verde ✅
```

---

## Troubleshooting

### La fotocamera non si attiva
- **Verifica HTTPS**: il sito DEVE usare https://, non http://
- **Permesso negato**: l'utente ha rifiutato il permesso fotocamera
  - Android: Impostazioni → App → Chrome → Permessi → Fotocamera → Consenti
  - iOS: Impostazioni → Safari → Fotocamera → Consenti
- **Browser non supportato**: aggiornare Chrome o Safari all'ultima versione

### Il modello 3D non appare
- Verifica che il path del file .glb sia corretto nel codice HTML
- Verifica che il file .mind corrisponda all'immagine stampata
- Illuminazione: l'image tracking funziona male al buio
- Distanza: tenere il telefono a 30-50 cm dal pannello
- Angolazione: inquadrare il pannello frontalmente, non di lato

### L'audio non si sente
- **iOS**: l'audio NON può partire automaticamente. Serve un pulsante che l'utente tocca.
- **Volume**: verificare che il volume del telefono non sia su muto
- **File**: verificare che il file .mp3 esista nel path specificato

### Il caricamento è troppo lento
- Verificare dimensioni: `ls -lh public/assets/sala-rossa/models/` — ogni file <5 MB
- Comprimere i modelli con gltf-transform
- Comprimere le immagini con TinyPNG (tinypng.com)
- Verificare la connessione: il WiFi del castello è abbastanza veloce?
