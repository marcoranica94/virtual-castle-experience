import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subtitle-overlay',
  standalone: true,
  template: `
    @if (text) {
      <div class="fixed bottom-20 left-4 right-4 z-50 text-center">
        <span class="inline-block bg-black/75 text-white px-4 py-2 rounded-md text-[0.95rem] leading-snug max-w-full">
          {{ text }}
        </span>
      </div>
    }
  `,
})
export class SubtitleOverlayComponent {
  @Input() text = '';
}
