import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface TutorialStep {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a routerLink="/" class="inline-flex items-center min-h-11 px-2 py-2 text-text-muted text-sm no-underline">
      ← Torna alla mappa
    </a>

    <div class="text-center pt-6 pb-4 animate-[fadeIn_0.4s_ease]">
      <h1 class="font-[family-name:var(--font-family-title)] text-gold text-2xl">Come Funziona</h1>
      <p class="text-text-muted text-sm italic mt-1">Guida rapida all'esperienza AR della Rocca Albani</p>
    </div>

    <div class="space-y-3">
      @for (step of steps; track step.title; let i = $index) {
        <div class="relative pl-16 p-5 bg-bg-card rounded-xl border border-stone">
          <div class="absolute left-5 top-5 w-8 h-8 bg-gold text-stone-dark rounded-full flex items-center justify-center font-bold text-sm">
            {{ i + 1 }}
          </div>
          <span class="text-2xl block mb-2">{{ step.icon }}</span>
          <h3 class="font-[family-name:var(--font-family-title)] text-gold text-base mb-1">{{ step.title }}</h3>
          <p class="text-sm text-text-muted mb-0">{{ step.text }}</p>
        </div>
      }
    </div>

    <!-- Tips -->
    <div class="bg-stone-dark border-l-[3px] border-warning rounded-md p-4 mt-6">
      <h3 class="font-[family-name:var(--font-family-title)] text-warning text-sm mb-2">💡 Consigli</h3>
      <ul class="list-none p-0 space-y-1">
        @for (tip of tips; track tip) {
          <li class="text-sm text-text-muted">→ {{ tip }}</li>
        }
      </ul>
    </div>

    <div class="text-center mt-6">
      <a routerLink="/"
         class="inline-flex items-center justify-center w-full min-h-11 px-6 py-3 bg-gold text-stone-dark font-semibold rounded-xl text-lg no-underline active:scale-[0.96] transition-transform">
        Inizia l'avventura!
      </a>
    </div>
  `,
})
export class TutorialComponent {
  readonly steps: TutorialStep[] = [
    { icon: '📱', title: 'Apri con il telefono', text: 'Scansiona il QR code nella sala con la fotocamera del tuo smartphone. Si apre direttamente nel browser, senza installare nulla.' },
    { icon: '🎭', title: 'Scegli l\'esperienza', text: 'Ogni sala offre 3 percorsi: Il Castellano per gli adulti, il Drago Custode per i bambini, il Laboratorio del Tempo per le scuole.' },
    { icon: '📷', title: 'Concedi la fotocamera', text: 'Il telefono ti chiederà il permesso di usare la fotocamera. Tocca "Consenti" — serve per vedere i contenuti AR.' },
    { icon: '🎯', title: 'Inquadra il pannello', text: 'Cerca il pannello AR nella sala e inquadralo con il telefono. Tienilo fermo per qualche secondo e... magia!' },
    { icon: '✨', title: 'Esplora e divertiti', text: 'Ascolta le storie, rispondi ai quiz, scopri i dettagli storici. Guadagna punti e badge completando le esperienze!' },
  ];

  readonly tips = [
    'Funziona meglio con buona illuminazione',
    'Tieni il telefono stabile davanti al pannello',
    'Se la fotocamera non si attiva, controlla i permessi nelle impostazioni del browser',
    'Usa le cuffie per un\'esperienza audio migliore',
    'Non serve connessione veloce — i contenuti sono leggeri',
  ];
}
