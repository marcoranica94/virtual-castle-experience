import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ROOMS } from '../../data/rooms';
import type { RoomConfig } from '../../types';

/** URL base del sito live su GitHub Pages */
const BASE_URL = 'https://marcoranica94.github.io/virtual-castle-experience';

interface QrRoom {
  room: RoomConfig;
  url: string;
  dataUrl: string;
}

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Header (nascosto in stampa) -->
    <div class="no-print flex items-center justify-between px-4 pt-4 pb-2">
      <a routerLink="/" class="text-text-muted text-sm no-underline">← Mappa</a>
      <button
        class="min-h-10 px-4 py-2 bg-gold text-stone-dark font-semibold rounded-lg text-sm"
        onclick="window.print()"
      >
        🖨️ Stampa tutti
      </button>
    </div>

    <div class="px-4 pb-4 no-print">
      <h1 class="font-[family-name:var(--font-family-title)] text-gold text-xl mb-1">QR Code Cartelli</h1>
      <p class="text-text-muted text-xs">
        Stampa questi cartelli e posizionali nelle sale. Ogni QR code porta il visitatore
        direttamente alla pagina della sala.
      </p>
    </div>

    <!-- Istruzioni cartello (C-09) — una per sala, ottimizzate per stampa -->
    @for (item of qrRooms; track item.room.id) {
      <div class="cartello-page bg-parchment text-stone-dark mx-4 mb-6 rounded-xl p-6 shadow-md no-print-shadow">

        <!-- Logo + titolo -->
        <div class="text-center mb-4">
          <div class="text-4xl mb-2">🏰</div>
          <div class="text-xs font-semibold tracking-[2px] uppercase text-stone-light">Rocca Albani · Urgnano</div>
          <div class="text-lg font-bold mt-1" style="font-family: Georgia, serif;">
            {{ item.room.icon }} {{ item.room.name }}
          </div>
        </div>

        <!-- QR code -->
        <div class="flex justify-center my-4">
          @if (item.dataUrl) {
            <img
              [src]="item.dataUrl"
              [alt]="'QR Code ' + item.room.name"
              class="w-40 h-40 border-4 border-stone rounded-lg"
            />
          } @else {
            <div class="w-40 h-40 bg-stone-light rounded-lg flex items-center justify-center text-xs text-center p-2">
              Caricamento QR…
            </div>
          }
        </div>

        <!-- Istruzioni (C-09) -->
        <div class="border-t border-stone-light pt-4">
          <p class="text-center text-sm font-semibold mb-3">Come usarlo:</p>
          <div class="space-y-2">
            @for (step of instructionSteps; track step.n) {
              <div class="flex gap-3 items-start text-sm">
                <span class="bg-stone text-parchment rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-xs font-bold">{{ step.n }}</span>
                <span class="text-stone-dark leading-snug">{{ step.text }}</span>
              </div>
            }
          </div>
        </div>

        <!-- URL di fallback -->
        <div class="mt-4 pt-3 border-t border-stone-light text-center">
          <p class="text-[0.6rem] text-stone-light break-all">{{ item.url }}</p>
        </div>
      </div>
    }

    <!-- Nota tecnica (nascosta in stampa) -->
    <div class="no-print px-4 pb-12 mt-2">
      <div class="bg-bg-card border border-stone rounded-xl p-4">
        <h3 class="font-[family-name:var(--font-family-title)] text-gold text-sm mb-2">💡 Note per la stampa</h3>
        <ul class="text-xs text-text-muted space-y-1">
          <li>→ Stampa in formato A4 verticale, a colori se possibile</li>
          <li>→ Plastifica il cartello per resistenza all'umidità</li>
          <li>→ Dimensione minima QR code consigliata: 5×5 cm</li>
          <li>→ Posiziona il pannello in un punto ben illuminato</li>
          <li>→ Testa sempre il QR da distanza di 30–50 cm prima di posizionarlo</li>
          <li>→ Se cambia il dominio del sito, rigenera i QR da questa pagina</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    @media print {
      .no-print { display: none !important; }
      .no-print-shadow { box-shadow: none !important; }
      .cartello-page {
        page-break-after: always;
        margin: 0;
        border-radius: 0;
        padding: 2cm;
        max-width: 100%;
      }
    }
  `],
})
export class QrPageComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

  readonly instructionSteps = [
    { n: 1, text: 'Apri la fotocamera del tuo smartphone' },
    { n: 2, text: 'Punta la fotocamera sul codice QR qui sopra' },
    { n: 3, text: 'Tocca il link che appare sullo schermo' },
    { n: 4, text: 'Scegli l\'esperienza che preferisci' },
    { n: 5, text: 'Concedi il permesso alla fotocamera e inquadra il pannello AR!' },
  ];

  qrRooms: QrRoom[] = ROOMS
    .filter(r => r.available)
    .map(r => ({
      room: r,
      url: `${BASE_URL}/#/sala/${r.id}`,
      dataUrl: '',
    }));

  async ngOnInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const QRCode = await import('qrcode');
    for (const item of this.qrRooms) {
      item.dataUrl = await QRCode.toDataURL(item.url, {
        width: 400,
        margin: 2,
        color: { dark: '#2e2519', light: '#f5f0e1' },
      });
    }
  }
}
