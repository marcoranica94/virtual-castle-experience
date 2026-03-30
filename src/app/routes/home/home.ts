import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../../components/card/card';
import { ProgressService } from '../../services/progress.service';
import { ROOMS } from '../../data/rooms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CardComponent],
  template: `
    <!-- Hero -->
    <div class="text-center pt-10 pb-6 animate-[fadeIn_0.4s_ease]">
      <span class="text-5xl block mb-3" aria-hidden="true">🏰</span>
      <h1 class="font-[family-name:var(--font-family-title)] text-gold text-2xl leading-tight">
        Rocca Albani<br>di Urgnano
      </h1>
      <p class="text-gold-light text-xs font-semibold tracking-widest uppercase mt-1">
        Esperienza in Realtà Aumentata
      </p>
      <p class="text-text-muted text-sm mt-3">
        Scegli una sala e scopri la storia del castello con il tuo smartphone.
      </p>
    </div>

    <!-- Titolo sezione -->
    <div class="text-xs text-text-muted uppercase tracking-[1.5px] mb-4 pb-1 border-b border-stone">
      Le Sale
    </div>

    <!-- Sale -->
    @for (room of rooms; track room.id) {
      <app-card
        [link]="room.available ? '/sala/' + room.id : ''"
        [title]="room.name"
        [icon]="room.icon"
        [description]="room.description"
        [disabled]="!room.available"
      >
        @if (!room.available) {
          <span class="inline-block text-[0.7rem] px-2 py-0.5 bg-stone rounded-xl mt-2 font-semibold uppercase tracking-wide">
            In arrivo
          </span>
        }
        @if (room.available) {
          <div class="text-xs text-text-muted mt-2" [id]="'status-' + room.id">
            {{ getRoomStatus(room.id) }}
          </div>
        }
      </app-card>
    }

    <!-- Navigazione bassa -->
    <div class="flex gap-2 mt-6">
      <a routerLink="/profilo"
         class="flex-1 text-center min-h-11 px-4 py-3 bg-stone text-parchment rounded-xl font-semibold text-base no-underline active:scale-[0.96] transition-transform">
        🏆 I miei badge
      </a>
      <a routerLink="/tutorial"
         class="flex-1 text-center min-h-11 px-4 py-3 bg-stone text-parchment rounded-xl font-semibold text-base no-underline active:scale-[0.96] transition-transform">
        ❓ Come funziona
      </a>
    </div>

    <!-- Footer -->
    <div class="mt-8 pt-4 border-t border-stone text-center">
      <p class="text-[0.65rem] text-text-muted">
        Rocca Albani di Urgnano · Esperienza AR<br>
        <a routerLink="/privacy" class="text-text-muted underline">Privacy e fotocamera</a>
        &nbsp;·&nbsp;
        <a routerLink="/tutorial" class="text-text-muted underline">Come funziona</a>
      </p>
    </div>
  `,
})
export class HomeComponent {
  private readonly progress = inject(ProgressService);
  readonly rooms = ROOMS;

  getRoomStatus(roomId: string): string {
    const count = this.progress.getRoomCompletionCount(roomId);
    const p = this.progress.getRoomProgress(roomId);
    if (p.castellano && p.drago && p.laboratorio) return '✅ Tutte le esperienze completate!';
    if (count > 0) return `${count}/3 esperienze completate`;
    return 'Non ancora visitata';
  }
}
