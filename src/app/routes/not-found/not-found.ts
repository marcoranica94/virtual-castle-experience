import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex flex-col items-center justify-center min-h-[70dvh] text-center px-6 animate-[fadeIn_0.4s_ease]">
      <div class="text-7xl mb-4" aria-hidden="true">🏰</div>
      <h1 class="font-[family-name:var(--font-family-title)] text-gold text-2xl mb-2">
        Sala non trovata
      </h1>
      <p class="text-text-muted text-sm max-w-xs mb-2">
        Questa pagina non esiste o la sala non è ancora disponibile.
      </p>
      <p class="text-text-muted text-xs mb-8">
        Forse hai seguito un vecchio QR code?
      </p>
      <a routerLink="/"
         class="inline-flex items-center justify-center min-h-11 px-8 py-3 bg-gold text-stone-dark font-semibold rounded-xl no-underline active:scale-[0.97] transition-transform">
        ← Torna alla mappa
      </a>
    </div>
  `,
})
export class NotFoundComponent {}
