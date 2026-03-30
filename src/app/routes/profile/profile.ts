import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../services/progress.service';
import { ROOMS } from '../../data/rooms';
import type { Badge } from '../../types';

interface BadgeDefinition {
  id: string;
  name: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a routerLink="/" class="inline-flex items-center min-h-11 px-2 py-2 text-text-muted text-sm no-underline">
      ← Torna alla mappa
    </a>

    <!-- Header profilo -->
    <div class="text-center pt-8 pb-6 animate-[fadeIn_0.4s_ease]">
      <span class="text-5xl block mb-2" aria-hidden="true">🏆</span>
      <h1 class="font-[family-name:var(--font-family-title)] text-gold text-2xl">Il Mio Zaino</h1>
      <div class="text-3xl font-[family-name:var(--font-family-title)] text-gold font-bold mt-2">
        {{ progress.points() }}
      </div>
      <div class="text-xs text-text-muted uppercase tracking-widest">punti raccolti</div>
    </div>

    <!-- Progresso sale -->
    <div class="text-xs text-text-muted uppercase tracking-[1.5px] mb-4 pb-1 border-b border-stone">
      Progresso Sale
    </div>

    @for (room of availableRooms; track room.id) {
      <div class="bg-bg-card border border-stone rounded-xl p-4 mb-2">
        <div class="font-[family-name:var(--font-family-title)] text-gold text-sm mb-2">
          {{ room.icon }} {{ room.name }}
        </div>
        <div class="flex gap-1">
          @for (exp of ['castellano', 'drago', 'laboratorio']; track exp) {
            <div
              class="flex-1 h-2 rounded-full"
              [class.bg-success]="isExpDone(room.id, exp)"
              [class.bg-stone]="!isExpDone(room.id, exp)"
            ></div>
          }
        </div>
        <div class="flex gap-1 mt-1">
          <span class="flex-1 text-center text-[0.6rem] text-text-muted">Castellano</span>
          <span class="flex-1 text-center text-[0.6rem] text-text-muted">Drago</span>
          <span class="flex-1 text-center text-[0.6rem] text-text-muted">Laboratorio</span>
        </div>
      </div>
    }

    <!-- Badge -->
    <div class="text-xs text-text-muted uppercase tracking-[1.5px] mt-6 mb-4 pb-1 border-b border-stone">
      Badge
    </div>

    @for (def of allBadges; track def.id) {
      <div
        class="flex items-center gap-4 bg-bg-card border rounded-xl p-4 mb-2"
        [class.border-gold-dark]="isBadgeEarned(def.id)"
        [class.border-stone]="!isBadgeEarned(def.id)"
        [class.opacity-40]="!isBadgeEarned(def.id)"
      >
        <div class="text-2xl shrink-0">{{ isBadgeEarned(def.id) ? def.icon : '🔒' }}</div>
        <div class="flex-1">
          <div class="font-[family-name:var(--font-family-title)] text-gold text-sm">{{ def.name }}</div>
          <p class="text-xs text-text-muted m-0">{{ def.description }}</p>
          @if (getBadgeDate(def.id); as date) {
            <div class="text-[0.65rem] text-text-muted mt-0.5">Ottenuto il {{ date }}</div>
          }
        </div>
      </div>
    }

    <!-- Attestato -->
    <a routerLink="/attestato"
       class="flex items-center justify-center gap-2 w-full min-h-11 mt-6 px-4 py-3 bg-stone text-parchment font-semibold rounded-xl no-underline active:scale-[0.97] transition-transform text-sm">
      🖨️ Stampa attestato di visita
    </a>

    <!-- QR code -->
    <a routerLink="/qr"
       class="flex items-center justify-center gap-2 w-full min-h-11 mt-2 px-4 py-3 bg-stone text-parchment font-semibold rounded-xl no-underline active:scale-[0.97] transition-transform text-sm">
      📲 Cartelli QR per le sale
    </a>

    <!-- Reset -->
    <button
      class="block mx-auto mt-8 text-xs text-text-muted opacity-50 bg-transparent border-none cursor-pointer"
      (click)="resetProgress()"
    >
      Azzera tutti i progressi
    </button>
  `,
})
export class ProfileComponent {
  readonly progress = inject(ProgressService);

  readonly availableRooms = ROOMS.filter(r => r.available);

  /** Badge possibili — uno per ogni sala disponibile + futuri speciali */
  readonly allBadges: BadgeDefinition[] = ROOMS
    .filter(r => r.available)
    .map(r => ({
      id: `custode-${r.id}`,
      name: `Custode della ${r.name}`,
      icon: r.icon,
      description: `Completa tutte e 3 le esperienze nella ${r.name}`,
    }));

  isExpDone(roomId: string, exp: string): boolean {
    const p = this.progress.getRoomProgress(roomId);
    return !!(p as unknown as Record<string, boolean>)[exp];
  }

  isBadgeEarned(badgeId: string): boolean {
    return this.progress.hasBadge(badgeId);
  }

  getBadgeDate(badgeId: string): string | null {
    const badge = this.progress.badges().find((b: Badge) => b.id === badgeId);
    if (!badge?.earnedAt) return null;
    return new Date(badge.earnedAt).toLocaleDateString('it-IT');
  }

  resetProgress(): void {
    if (confirm('Sei sicuro di voler azzerare tutti i progressi? Questa azione non può essere annullata.')) {
      this.progress.reset();
    }
  }
}
