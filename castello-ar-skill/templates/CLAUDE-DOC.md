# Castello AR — Documentazione Tecnica

Ultimo aggiornamento: [DATA CREAZIONE]

---

## Decisioni Architetturali

### [DATA] — Scelta WebAR vs App Nativa
**Decisione:** WebApp AR (browser-based) con MindAR + A-Frame.
**Motivazione:** Zero installazione per i visitatori, costi minimi, aggiornamenti istantanei, sviluppabile con Claude Code.
**Alternative scartate:** App nativa iOS/Android (troppo costosa, richiede store, manutenzione doppia).

### [DATA] — Stack Angular 21 + TypeScript strict + Tailwind CSS 4
**Decisione:** Angular 21 con standalone components, signals, lazy routing.
**Motivazione:** TypeScript nativo, tutto incluso (routing, DI), architettura scalabile, SSR-ready per il futuro. Tailwind per design system con @theme tokens. Niente HTML/JS vanilla.
**Alternative scartate:** Vue/React (meno opinionated, più boilerplate per TypeScript strict), HTML vanilla (non scalabile).

### [DATA] — Hosting su GitHub Pages con angular-cli-ghpages
**Decisione:** GitHub Pages come hosting, con `angular-cli-ghpages` per automatizzare build + deploy.
**Motivazione:** Gratuito, HTTPS incluso, `npm run deploy` fa tutto. Angular non può usare GitHub Pages "nativo" (nessun build step), ma `angular-cli-ghpages` risolve: fa il build e pusha il risultato sul branch `gh-pages`.
**Dettagli tecnici:** `baseHref: /[REPO-NAME]/` in `angular.json`, routing con `withHashLocation()` per SPA su GitHub Pages.

### [DATA] — Nessun database per la demo
**Decisione:** localStorage del browser per punti/badge. Nessun Firebase o backend.
**Motivazione:** Zero costi, zero complessità. I dati sono locali al dispositivo del visitatore. Sufficiente per validare l'esperienza.
**Evoluzione futura:** Se servisse una classifica condivisa, aggiungere Firebase o Supabase.

### [DATA] — Struttura multi-esperienza generica
**Decisione:** Ogni sala ha 3 esperienze gestite dallo stesso componente `ArExperienceComponent`.
**Motivazione:** Zero codice nuovo per aggiungere una sala — basta aggiungere un file `.ts` con i dati tipizzati e gli asset in `public/`.

---

## Versioni in Uso

| Libreria | Versione | Data |
|---|---|---|
| Angular | [VERIFICARE] | [DATA] |
| TypeScript | [VERIFICARE] | [DATA] |
| Tailwind CSS | [VERIFICARE] | [DATA] |
| MindAR | [VERIFICARE] | [DATA] |
| A-Frame | [VERIFICARE] | [DATA] |
| Node.js | [VERIFICARE] | [DATA] |

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
