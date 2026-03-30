import { Injectable, signal, computed } from '@angular/core';
import type { VisitorProgress, RoomId, ExperienceType, Badge, RoomProgress } from '../types';

const STORAGE_KEY = 'castello_ar_progress';

const DEFAULT_PROGRESS: VisitorProgress = {
  points: 0,
  badges: [],
  rooms: {},
};

/** Badge appena guadagnato — emesso per un breve toast in UI */
export interface BadgeToast {
  id: string;
  name: string;
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly state = signal<VisitorProgress>(this.load());

  readonly points = computed(() => this.state().points);
  readonly badges = computed(() => this.state().badges);

  /** Ultimo badge guadagnato — i componenti possono leggerlo e azzerarlo dopo il toast */
  readonly newBadge = signal<BadgeToast | null>(null);

  /** Carica lo stato dal localStorage */
  private load(): VisitorProgress {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as VisitorProgress;
    } catch {
      // dati corrotti o localStorage non disponibile
    }
    return { ...DEFAULT_PROGRESS, badges: [], rooms: {} };
  }

  /** Persiste lo stato nel localStorage */
  private persist(state: VisitorProgress): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // localStorage pieno o non disponibile
    }
  }

  /** Aggiorna lo stato con una funzione di trasformazione */
  private update(fn: (draft: VisitorProgress) => void): void {
    const next = structuredClone(this.state());
    fn(next);
    this.state.set(next);
    this.persist(next);
  }

  addPoints(amount: number): number {
    this.update(s => { s.points += amount; });
    return this.state().points;
  }

  completeExperience(roomId: RoomId, experience: ExperienceType): void {
    this.update(s => {
      if (!s.rooms[roomId]) s.rooms[roomId] = {};
      s.rooms[roomId][experience] = true;

      // Badge sala completa se tutte e 3 le esperienze sono fatte
      const room = s.rooms[roomId];
      if (room.castellano && room.drago && room.laboratorio) {
        const badgeId = `custode-${roomId}`;
        if (!s.badges.some(b => b.id === badgeId)) {
          const roomName = roomId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          const badge: Badge = {
            id: badgeId,
            name: `Custode della ${roomName}`,
            icon: '🏰',
            description: `Hai completato tutte le esperienze della ${roomName}`,
            earnedAt: new Date().toISOString(),
          };
          s.badges.push(badge);
          // Notifica toast — azzerato dal componente dopo la visualizzazione
          this.newBadge.set({ id: badge.id, name: badge.name, icon: badge.icon });
        }
      }
    });
  }

  isExperienceCompleted(roomId: RoomId, experience: ExperienceType): boolean {
    return !!this.state().rooms[roomId]?.[experience];
  }

  getRoomProgress(roomId: RoomId): RoomProgress {
    const room = this.state().rooms[roomId] ?? {};
    return {
      castellano: !!room.castellano,
      drago: !!room.drago,
      laboratorio: !!room.laboratorio,
    };
  }

  getRoomCompletionCount(roomId: RoomId): number {
    const p = this.getRoomProgress(roomId);
    return [p.castellano, p.drago, p.laboratorio].filter(Boolean).length;
  }

  hasBadge(badgeId: string): boolean {
    return this.state().badges.some(b => b.id === badgeId);
  }

  earnBadge(badge: Omit<Badge, 'earnedAt'>): boolean {
    if (this.hasBadge(badge.id)) return false;
    this.update(s => {
      s.badges.push({ ...badge, earnedAt: new Date().toISOString() });
    });
    return true;
  }

  reset(): void {
    this.state.set({ ...DEFAULT_PROGRESS, badges: [], rooms: {} });
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* noop */ }
  }
}
