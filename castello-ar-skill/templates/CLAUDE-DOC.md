# Castello AR — Documentazione Tecnica

Ultimo aggiornamento: [DATA CREAZIONE]

---

## Decisioni Architetturali

### [DATA] — Scelta WebAR vs App Nativa
**Decisione:** WebApp AR (browser-based) con MindAR + A-Frame.
**Motivazione:** Zero installazione per i visitatori, costi minimi, aggiornamenti istantanei, sviluppabile con Claude Code.
**Alternative scartate:** App nativa iOS/Android (troppo costosa, richiede store, manutenzione doppia).

### [DATA] — Hosting su GitHub Pages
**Decisione:** GitHub Pages come piattaforma di hosting primaria.
**Motivazione:** Gratuito, HTTPS incluso, deploy automatico con git push, nessun servizio aggiuntivo da gestire. Il progetto è 100% statico (HTML/JS/CSS + asset), perfetto per GitHub Pages.
**Alternative valutate:** Netlify (equivalente ma servizio in più da gestire), Vercel (idem), Firebase (overengineering — non serve un DB per la demo).
**Limiti accettati:** Repository deve essere public (piano gratuito). Max 1 GB repo, 100 MB per file, 100 GB bandwidth/mese — tutti ampiamente sufficienti.

### [DATA] — Nessun database per la demo
**Decisione:** localStorage del browser per punti/badge. Nessun Firebase o backend.
**Motivazione:** Zero costi, zero complessità. I dati sono locali al dispositivo del visitatore. Sufficiente per validare l'esperienza.
**Evoluzione futura:** Se servisse una classifica condivisa o sincronizzazione, aggiungere Firebase Realtime DB o migrare hosting su Vercel con serverless functions.

### [DATA] — Struttura multi-esperienza
**Decisione:** Ogni sala ha 3 esperienze selezionabili (Culturale, Caccia al Tesoro, Didattica).
**Motivazione:** Massima flessibilità per pubblici diversi. Ogni esperienza è un file HTML separato per semplicità.

---

## Versioni in Uso

| Libreria | Versione | Data Aggiornamento | CDN |
|---|---|---|---|
| MindAR | [VERIFICARE] | [DATA] | cdn.jsdelivr.net/npm/mind-ar@VERSION |
| A-Frame | [VERIFICARE] | [DATA] | aframe.io/releases/VERSION/aframe.min.js |
| Node.js | [VERIFICARE] | [DATA] | — (solo dev locale) |

⚠️ **Regola:** Prima di ogni sessione di sviluppo, verifica che queste siano le ultime versioni stabili.

---

## Problemi Noti e Soluzioni

<!-- Formato:
### [DATA] — Descrizione problema
**Sintomo:** cosa succede
**Causa:** perché succede
**Soluzione:** come è stato risolto
**File coinvolti:** quali file sono stati modificati
-->

---

## Cosa Funziona ✅

<!-- Lista delle funzionalità testate e confermate -->

---

## Cosa Non Funziona / Limitazioni ⚠️

- iOS Safari: autoplay audio bloccato — serve tap utente
- GPS al chiuso: troppo impreciso per AR location-based nelle sale
- Dispositivi pre-2018: possibili problemi di performance

---

## Asset Utilizzati

| Asset | Tipo | Provenienza | Licenza | Dimensione | Sala |
|---|---|---|---|---|---|
<!-- Es: cavaliere-parlante.glb | Modello 3D | Mixamo | Gratuito Adobe | 3.2 MB | Sala Rossa -->
