# Castello AR — Istruzioni per lo Sviluppatore

Ultimo aggiornamento: 2026-03-30

---

## Setup Iniziale (da fare UNA VOLTA)

### 1. Installa le dipendenze
```bash
cd /home/z004v04h/personal/virtual-castle-experience
npm install
```

### 2. Avvia il server di sviluppo
```bash
npm start
# Apri http://localhost:4200 nel browser
```

### 3. Build di produzione
```bash
npm run build
# Output in dist/castello-ar/ — file statici pronti per il deploy
```

---

## Deploy su GitHub Pages

Il progetto usa `angular-cli-ghpages` — un comando solo:

```bash
npm run deploy
# Esegue: build produzione + push automatico sul branch gh-pages
# URL live: https://marcoranica94.github.io/virtual-castle-experience/
```

### Setup iniziale GitHub Pages (da fare UNA VOLTA)
- [ ] Vai su github.com/marcoranica94/virtual-castle-experience → Settings → Pages
- [ ] Source: "Deploy from a branch" → Branch: `gh-pages` → Folder: `/ (root)` → Save
- [ ] Esegui `npm run deploy` → dopo 1-2 min il sito è live

### Dominio personalizzato (opzionale, futuro)
Vedi sezione in `castello-ar-skill/CASTELLO-AR-REFERENCE.md`.

---

## Asset da Creare / Fornire

### Immagini Target (pannelli AR nelle sale)
Servono 3 immagini target per la Sala Rossa:

- [ ] **target-castellano.jpg** — Pannello esperienza adulti
  - Immagine dettagliata, molti colori e particolari
  - Risoluzione minima: 1000x1000px
- [ ] **target-drago.jpg** — Pannello esperienza bambini
  - Colorata, con illustrazione del drago
- [ ] **target-laboratorio.jpg** — Pannello esperienza didattica
  - Stile museale, infografica

### Compilare i file .mind
Per ogni immagine target:
1. Vai su https://hiukim.github.io/mind-ar-js-doc/tools/compile
2. Carica l'immagine JPG/PNG
3. Clicca "Start" e attendi la compilazione
4. Verifica i feature point (pallini rossi) — devono essere molti
5. Scarica il file `.mind`
6. Metti nella cartella `public/assets/sala-rossa/targets/`

### Modelli 3D
- [ ] **castellano.glb** — Avatar del castellano/nobile
  - Fonte: Mixamo (mixamo.com) → personaggio medievale + animazione "Talking"
  - Esporta da Blender come GLB, max 5 MB
  - Metti in `public/assets/sala-rossa/models/`
- [ ] **drago.glb** — Draghetto cartoon
  - Fonte: Sketchfab (filtra "dragon cartoon animated downloadable")
  - Metti in `public/assets/sala-rossa/models/`

### Audio narrazione
- [ ] **narrazione-castellano.mp3** — Narrazione storica adulti (2-3 min)
  - Fonte: ElevenLabs per TTS con voce profonda/autorevole
- [ ] **narrazione-drago.mp3** — Voce del drago per bambini (1-2 min)
- [ ] Mettere in `public/assets/sala-rossa/audio/`

---

## Contenuti da Scrivere

- [ ] Narrazione storica reale per il Castellano (Sala Rossa della Rocca Albani)
- [ ] Sottotitoli sincronizzati (modificare array in `src/app/data/sala-rossa.ts`)
- [ ] Dialoghi del Drago Custode
- [ ] Domande quiz reali sulla Sala Rossa
- [ ] Scheda informativa Laboratorio del Tempo con dati verificati
- [ ] Timeline storica della Rocca Albani con date corrette

---

## Come Testare

### In locale (navigazione e UI)
```bash
npm start
# Apri http://localhost:4200 su browser desktop o mobile (stesso WiFi)
```

### AR su smartphone (richiede HTTPS)
L'AR **non funziona su HTTP** — serve HTTPS. Opzioni:
1. **Deploy su Vercel/Netlify** (HTTPS automatico) — metodo consigliato
2. `npx localtunnel --port 4200` — URL HTTPS temporaneo per test

### Checklist test su device
- [ ] iPhone Safari — la fotocamera si attiva?
- [ ] Android Chrome — la fotocamera si attiva?
- [ ] Inquadrare target → modello 3D appare?
- [ ] Audio si riproduce toccando il pulsante?
- [ ] Quiz funziona e assegna punti?
- [ ] Badge viene assegnato completando tutte e 3 le esperienze?

---

## Troubleshooting

| Problema | Soluzione |
|---|---|
| `ng serve` non parte | `npm install` poi riprova |
| Fotocamera non si attiva | Serve HTTPS — usa Vercel/Netlify o localtunnel |
| Modello 3D non appare | Verifica che il file .glb esista in `public/assets/sala-rossa/models/` |
| Target non riconosciuto | Immagine con pochi dettagli — rigenerare .mind |
| Audio non parte su iPhone | Normale — serve tap utente su pulsante "Ascolta" |
| Build fallisce | Controlla errori TS: `npx ng build 2>&1` |
