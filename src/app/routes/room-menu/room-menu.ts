import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CardComponent } from '../../components/card/card';
import { ProgressService } from '../../services/progress.service';
import { ArService } from '../../services/ar.service';
import { getRoomById } from '../../data/rooms';
import type { RoomConfig, ExperienceType } from '../../types';

const AUDIENCE_COLORS: Record<string, string> = {
  castellano: '#8b6914',
  drago: '#c0392b',
  laboratorio: '#2471a3',
};

@Component({
  selector: 'app-room-menu',
  standalone: true,
  imports: [RouterLink, CardComponent],
  template: `
    @if (room) {
      <!-- Indietro -->
      <a routerLink="/" class="inline-flex items-center min-h-11 px-2 py-2 text-text-muted text-sm no-underline">
        ← Tutte le sale
      </a>

      <!-- Header sala -->
      <div class="text-center pt-6 pb-4 animate-[fadeIn_0.4s_ease]">
        <span class="text-4xl block mb-2" aria-hidden="true">{{ room.icon }}</span>
        <h1 class="font-[family-name:var(--font-family-title)] text-gold text-2xl">{{ room.name }}</h1>
        <p class="text-text-muted text-sm mt-2">Scegli come vuoi esplorare questa sala della Rocca Albani.</p>
      </div>

      <!-- Esperienze -->
      @for (exp of room.experiences; track exp.type) {
        <app-card
          [link]="'/sala/' + room.id + '/' + exp.type"
          [title]="exp.title"
          [icon]="exp.icon"
          [description]="exp.subtitle"
          [accentColor]="getColor(exp.audienceColor)"
        >
          <span
            class="inline-block text-[0.7rem] px-2 py-0.5 rounded-xl mt-2 font-semibold uppercase tracking-wide text-white"
            [style.background]="getColor(exp.audienceColor)"
          >
            {{ exp.audience }}
          </span>
          @if (isCompleted(exp.type)) {
            <span class="absolute top-4 right-4 text-xl">✅</span>
          }
        </app-card>
      }

      <!-- Info -->
      <div class="bg-stone-dark rounded-md p-4 mt-5 text-sm text-text-muted text-center">
        📱 Tieni il telefono in verticale e cerca il pannello AR nella sala.<br>
        Inquadralo con la fotocamera per far apparire i contenuti.
      </div>
    }
  `,
})
export class RoomMenuComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly progress = inject(ProgressService);
  private readonly arService = inject(ArService);

  room: RoomConfig | undefined;

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomId');
    if (!roomId) { this.router.navigate(['/']); return; }
    this.room = getRoomById(roomId);
    if (!this.room || !this.room.available) { this.router.navigate(['/']); return; }

    // Precarica MindAR + A-Frame in background mentre l'utente sceglie l'esperienza
    if (this.arService.checkCompatibility().supported) {
      this.arService.loadArLibraries().catch(() => { /* silenzioso, riprova in ArExperience */ });
    }
  }

  getColor(key: string): string {
    return AUDIENCE_COLORS[key] ?? '#4a3f35';
  }

  isCompleted(type: ExperienceType): boolean {
    return this.room ? this.progress.isExperienceCompleted(this.room.id, type) : false;
  }
}
