import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../services/progress.service';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-attestato',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Barra superiore (nascosta in stampa) -->
    <div class="no-print flex items-center justify-between px-4 pt-4 pb-2">
      <a routerLink="/profilo" class="text-text-muted text-sm no-underline">← Il mio zaino</a>
      <div class="flex gap-2">
        <button
          class="min-h-10 px-3 py-2 bg-stone text-parchment font-semibold rounded-lg text-sm flex items-center gap-1"
          (click)="shareAttestate()"
          aria-label="Condividi il link alla Rocca Albani AR"
        >
          {{ shareLabel() }}
        </button>
        <button
          class="min-h-10 px-4 py-2 bg-gold text-stone-dark font-semibold rounded-lg text-sm"
          onclick="window.print()"
          aria-label="Stampa attestato di visita"
        >
          🖨️ Stampa
        </button>
      </div>
    </div>

    <!-- Foglio attestato (ottimizzato A4) -->
    <div class="attestato-page mx-auto my-4 bg-parchment text-stone-dark p-10 rounded-xl shadow-lg max-w-lg no-print-shadow">

      <!-- Intestazione -->
      <div class="text-center mb-6">
        <div class="text-5xl mb-3">🏰</div>
        <div class="text-xs font-semibold tracking-[3px] uppercase text-stone-light mb-1">
          Comune di Urgnano
        </div>
        <div class="text-2xl font-bold tracking-wide" style="font-family: Georgia, serif;">
          Rocca Albani
        </div>
        <div class="text-xs tracking-widest uppercase text-stone-light">
          Urgnano · Bergamo
        </div>
        <div class="mt-4 border-t-2 border-b-2 border-stone-light py-2">
          <div class="text-xs font-semibold tracking-[2px] uppercase">Attestato di Visita</div>
        </div>
      </div>

      <!-- Testo centrale -->
      <div class="text-center my-8">
        <p class="text-sm text-stone-light mb-3">Si attesta che</p>
        <div class="border-b-2 border-stone mx-8 h-8 mb-2"></div>
        <p class="text-xs text-stone-light italic mb-6">(nome del visitatore)</p>

        <p class="text-sm leading-relaxed text-stone-dark max-w-xs mx-auto">
          ha esplorato la <strong>Sala Rossa</strong> della Rocca Albani di Urgnano
          e completato l'esperienza di Realtà Aumentata, scoprendo
          la storia secolare di queste mura.
        </p>
      </div>

      <!-- Badge e punti -->
      <div class="flex items-center justify-center gap-6 my-6 p-4 border border-stone-light rounded-lg bg-parchment-dark">
        <div class="text-center">
          <div class="text-3xl mb-1">🔴</div>
          <div class="text-xs font-semibold">Custode Sala Rossa</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold" style="font-family: Georgia, serif;">{{ progress.points() }}</div>
          <div class="text-xs font-semibold text-stone-light">punti raccolt{{ progress.points() === 1 ? 'o' : 'i' }}</div>
        </div>
        @if (getRank(); as rank) {
          <div class="text-center">
            <div class="text-3xl mb-1">{{ rank.icon }}</div>
            <div class="text-xs font-semibold">{{ rank.title }}</div>
          </div>
        }
      </div>

      <!-- Data e firma -->
      <div class="flex justify-between items-end mt-10">
        <div class="text-center">
          <div class="border-b border-stone-light w-28 h-6 mb-1"></div>
          <div class="text-xs text-stone-light">Data visita</div>
        </div>
        <div class="text-center">
          <div class="text-2xl mb-1">🔑</div>
          <div class="text-xs text-stone-light italic">Il Castellano</div>
        </div>
        <div class="text-center">
          <div class="border-b border-stone-light w-28 h-6 mb-1"></div>
          <div class="text-xs text-stone-light">Firma responsabile</div>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center mt-8 pt-4 border-t border-stone-light">
        <p class="text-[0.6rem] text-stone-light leading-relaxed">
          Esperienza in Realtà Aumentata · rocca-albani.it<br>
          Rocca Albani, Via Roma 1, 24059 Urgnano (BG)
        </p>
      </div>
    </div>

    <!-- Istruzioni stampa (nascosti in stampa) -->
    <div class="no-print max-w-lg mx-auto px-4 pb-8 mt-2">
      <p class="text-xs text-text-muted text-center">
        💡 Scrivi il nome del visitatore nel campo apposito prima di stampare.<br>
        Stampa su carta A4 in orientamento verticale.
      </p>
    </div>
  `,
  styles: [`
    @media print {
      .no-print { display: none !important; }
      .no-print-shadow { box-shadow: none !important; }
      .attestato-page {
        margin: 0;
        border-radius: 0;
        max-width: 100%;
        padding: 2cm;
      }
    }
  `],
})
export class AttestatiComponent {
  readonly progress = inject(ProgressService);
  private readonly share = inject(ShareService);

  readonly shareLabel = signal('🔗 Condividi');

  async shareAttestate(): Promise<void> {
    const result = await this.share.share({
      title: 'Rocca Albani AR — Urgnano',
      text: `Ho esplorato la Rocca Albani in Realtà Aumentata e raccolto ${this.progress.points()} punti! Prova anche tu 🏰`,
      url: 'https://marcoranica94.github.io/virtual-castle-experience/',
    });
    if (result === 'copied') {
      this.shareLabel.set('✅ Link copiato!');
      setTimeout(() => this.shareLabel.set('🔗 Condividi'), 2500);
    }
  }

  getRank(): { title: string; icon: string } | null {
    const p = this.progress.points();
    if (p >= 500) return { title: 'Cavaliere del Castello', icon: '⚔️' };
    if (p >= 200) return { title: 'Custode della Rocca', icon: '🛡️' };
    if (p >= 50)  return { title: 'Scudiero Esploratore', icon: '🗡️' };
    if (p >= 10)  return { title: 'Visitatore Curioso', icon: '🔍' };
    return null;
  }
}
