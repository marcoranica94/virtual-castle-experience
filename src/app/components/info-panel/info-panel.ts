import { Component, Input, Output, EventEmitter } from '@angular/core';
import type { InfoPanelConfig, TimelineEntry } from '../../types';

@Component({
  selector: 'app-info-panel',
  standalone: true,
  template: `
    <div
      class="fixed bottom-0 left-0 right-0 z-[200] bg-bg border-t-2 border-laboratorio rounded-t-2xl p-5 pb-8 max-h-[60vh] overflow-y-auto transition-transform duration-300"
      [class.translate-y-full]="!visible"
      [class.translate-y-0]="visible"
    >
      <button
        class="absolute top-4 right-4 bg-transparent border-none text-text-muted text-2xl cursor-pointer min-w-11 min-h-11 flex items-center justify-center"
        (click)="close.emit()"
        aria-label="Chiudi"
      >&times;</button>

      @if (mode === 'info' && info) {
        <h3 class="text-laboratorio font-[family-name:var(--font-family-title)] text-lg mb-2">🏛️ {{ info.title }}</h3>
        <p class="text-sm text-text-muted leading-relaxed">{{ info.body }}</p>
        <div class="flex gap-4 mt-4 pt-4 border-t border-stone">
          @for (meta of info.metadata; track meta.label) {
            <div class="text-xs">
              <span class="text-text-muted block">{{ meta.label }}</span>
              <span class="text-gold font-semibold">{{ meta.value }}</span>
            </div>
          }
        </div>
      }

      @if (mode === 'timeline' && timeline) {
        <h3 class="text-laboratorio font-[family-name:var(--font-family-title)] text-lg mb-2">⏳ Timeline della Rocca</h3>
        <div class="flex gap-1 overflow-x-auto py-4">
          @for (entry of timeline; track entry.year) {
            <div class="flex-none min-w-[120px] p-2 px-4 bg-stone rounded-md border-l-[3px] border-laboratorio text-xs">
              <span class="font-bold text-gold block">{{ entry.year }}</span>
              <span class="text-text-muted mt-0.5">{{ entry.event }}</span>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class InfoPanelComponent {
  @Input() info: InfoPanelConfig | undefined;
  @Input() timeline: TimelineEntry[] | undefined;
  @Input() mode: 'info' | 'timeline' = 'info';
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
}
