# Castello AR — Backlog

Ultimo aggiornamento: 2026-03-30

## Sprint 0 — Fondamenta Angular (corrente)

### Completate ✅
- [x] Migrazione stack: Angular 21 + TypeScript strict + Tailwind CSS 4 (2026-03-30)
- [x] Tipi TypeScript per tutto il dominio (RoomConfig, ExperienceConfig, Badge, ecc.) (2026-03-30)
- [x] Servizi: ProgressService, ArService, AnalyticsService (2026-03-30)
- [x] Componenti UI: Card, ProgressBar, SubtitleOverlay, Quiz, InfoPanel (2026-03-30)
- [x] Route lazy-loaded: Home, RoomMenu, ArExperience, Tutorial, Profile (2026-03-30)
- [x] Dati Sala Rossa tipizzati e separati dal codice (2026-03-30)
- [x] Build produzione riuscito — 63 kB bundle iniziale (2026-03-30)
- [x] Documentazione aggiornata (CLAUDE.md, CLAUDE-DOC.md, ISTRUZIONI-DEV.md) (2026-03-30)

### Completate ✅ (2026-03-30 — sprint 1)
- [x] D-03: Mini-tutorial pre-AR (prima visita, localStorage)
- [x] D-13: Modale "Non funziona?" con troubleshooting
- [x] C-01/C-02: Copioni storici realistici Rocca Albani in sala-rossa.ts
- [x] C-07: Quiz sulla storia della Rocca (anno di fondazione 1354)
- [x] G-05: Pagina attestato stampabile (`/attestato`, @media print)
- [x] PWA manifest (manifest.webmanifest, theme-color, installabile)
- [x] Scan hint automatico dopo 15 sec se target non trovato
- [x] Aggiornato Piano_Completo_AR_Castello_v2.md con nuovo stack
- [x] G-04: Messaggio bentornato al secondo accesso esperienza Drago (2026-03-30)
- [x] L-05: Pagina Privacy GDPR + footer home con link privacy/tutorial (2026-03-30)
- [x] C-09: Cartelli QR stampabili per le sale con istruzioni (2026-03-30)

### Da Fare 📋 (utente)
- [ ] Configurare GitHub Pages: Settings → Pages → Source: **"GitHub Actions"** → poi `git push`
- [ ] Creare/reperire 2 modelli 3D (castellano.glb, drago.glb)
- [ ] Creare/reperire 2 file audio narrazione (.mp3)
- [ ] Creare 3 immagini target e compilare i file .mind
- [ ] Primo test su smartphone reale via HTTPS

---

## Sprint 1 — Asset e Contenuti Reali (prossimo)

### Da Fare 📋
- [ ] Integrare modello 3D reale del Castellano (calibrare posizione/scala)
- [ ] Integrare modello 3D reale del Drago
- [ ] Integrare file .mind reali e testare riconoscimento target
- [ ] Integrare audio narrazione reale con sottotitoli sincronizzati
- [ ] Sostituire contenuti placeholder in sala-rossa.ts
- [ ] Quiz reali per il Drago Custode
- [ ] Timeline storica accurata della Rocca
- [ ] Test completo su iPhone Safari + Android Chrome
- [ ] Ottimizzare dimensioni asset (<5 MB ciascuno)

---

## Sprint 2 — Polish e Seconda Sala

### Da Fare 📋
- [ ] Animazioni di transizione tra pagine (Angular animations)
- [ ] Gestione orientamento schermo (warning portrait→landscape su AR)
- [ ] Seconda sala (Sala Blu) — creare solo il file dati + asset
- [ ] L-06: Plausible Analytics — script + custom events (targetFound, quizAnswered, badgeEarned)
- [ ] Service Worker per cache offline degli asset

### Completate ✅
- [x] Generazione QR code per ogni sala (C-09 — /qr)

---

## Backlog Futuro

### Alta Priorità 🔴
- [ ] SSR/SSG con Angular Universal (SEO e performance)
- [ ] Giardino con AR.js GPS-based
- [ ] i18n Angular (IT/EN)
- [ ] Service Worker per offline

### Media Priorità 🟡
- [ ] Backend API (Firebase/Supabase) per analytics e classifica condivisa
- [ ] Integrazione tour virtuale Matterport
- [ ] Admin dashboard per gestione contenuti sale

### Bassa Priorità 🟢
- [ ] AI narrativa con risposte dinamiche
- [ ] Modalità notturna / eventi speciali
- [ ] Accessibilità avanzata (WCAG 2.1 AA)

---

## Idee / Parking Lot 💡
- Dominio personalizzato (ar.rocca-albani.it)
- Badge fisici NFC
- Collaborazione scuole per contenuti didattici
- Versione "dietro le quinte"
