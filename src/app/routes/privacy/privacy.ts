import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a routerLink="/" class="inline-flex items-center min-h-11 px-2 py-2 text-text-muted text-sm no-underline">
      ← Torna alla mappa
    </a>

    <div class="text-center pt-6 pb-4 animate-[fadeIn_0.4s_ease]">
      <h1 class="font-[family-name:var(--font-family-title)] text-gold text-2xl">Privacy e Fotocamera</h1>
      <p class="text-text-muted text-sm italic mt-1">Informativa semplice e trasparente</p>
    </div>

    <div class="space-y-4 pb-12">

      <div class="bg-bg-card border border-stone rounded-xl p-5">
        <h2 class="font-[family-name:var(--font-family-title)] text-gold text-base mb-3">📷 La fotocamera</h2>
        <p class="text-sm text-text-muted leading-relaxed">
          L'esperienza AR usa la fotocamera del tuo dispositivo <strong class="text-parchment">solo per riconoscere i pannelli nella sala</strong>
          e sovrapporre i contenuti 3D. Le immagini riprese dalla fotocamera
          <strong class="text-parchment">non vengono mai registrate, salvate o inviate</strong> da nessuna parte.
          Tutto avviene in tempo reale, solo sul tuo dispositivo.
        </p>
      </div>

      <div class="bg-bg-card border border-stone rounded-xl p-5">
        <h2 class="font-[family-name:var(--font-family-title)] text-gold text-base mb-3">💾 Dati salvati</h2>
        <p class="text-sm text-text-muted leading-relaxed mb-3">
          L'app salva sul tuo dispositivo (localStorage) solo:
        </p>
        <ul class="space-y-2">
          @for (item of savedData; track item.label) {
            <li class="flex gap-3 text-sm text-text-muted">
              <span class="text-gold shrink-0">→</span>
              <span><strong class="text-parchment">{{ item.label }}:</strong> {{ item.desc }}</span>
            </li>
          }
        </ul>
        <p class="text-xs text-text-muted mt-3 italic">
          Questi dati restano solo sul tuo telefono e non vengono mai trasmessi.
          Puoi cancellarli in qualsiasi momento dalla pagina "Il mio zaino" → Azzera progressi.
        </p>
      </div>

      <div class="bg-bg-card border border-stone rounded-xl p-5">
        <h2 class="font-[family-name:var(--font-family-title)] text-gold text-base mb-3">📊 Analytics anonimi</h2>
        <p class="text-sm text-text-muted leading-relaxed">
          Raccogliamo statistiche anonime sull'utilizzo dell'app (quante persone usano
          ogni esperienza, tempi medi, tipo di dispositivo) per migliorare il servizio
          e produrre report per l'amministrazione comunale. Nessun dato personale viene
          raccolto. Non usiamo cookie di profilazione.
        </p>
      </div>

      <div class="bg-bg-card border border-stone rounded-xl p-5">
        <h2 class="font-[family-name:var(--font-family-title)] text-gold text-base mb-3">🔒 Nessun account richiesto</h2>
        <p class="text-sm text-text-muted leading-relaxed">
          Non è richiesta registrazione, account o email.
          L'app funziona completamente in modo anonimo. Puoi usarla senza fornire
          alcun dato personale.
        </p>
      </div>

      <div class="bg-stone-dark border border-stone rounded-xl p-4 text-center">
        <p class="text-xs text-text-muted leading-relaxed">
          Per qualsiasi domanda sulla privacy:<br>
          <strong class="text-parchment">Comune di Urgnano</strong><br>
          Via Roma 1, 24059 Urgnano (BG)<br>
          urgnano&#64;comune.urgnano.bg.it
        </p>
      </div>

    </div>
  `,
})
export class PrivacyComponent {
  readonly savedData = [
    { label: 'Punti e badge',        desc: 'I punti guadagnati e i badge sbloccati durante le esperienze.' },
    { label: 'Progressi delle sale', desc: 'Quali esperienze hai completato in ogni sala.' },
    { label: 'Tutorial visto',       desc: 'Se hai già visto la schermata di istruzioni (per non ripeterla).' },
    { label: 'Visita precedente',    desc: 'Se hai già visitato il Drago Custode (per il saluto di ritorno).' },
  ];
}
