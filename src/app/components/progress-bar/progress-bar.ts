import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  template: `
    <div class="w-4/5 max-w-[280px] h-1.5 bg-stone rounded-full mx-auto overflow-hidden">
      <div
        class="h-full bg-gold rounded-full transition-[width] duration-300"
        [style.width.%]="value"
      ></div>
    </div>
  `,
})
export class ProgressBarComponent {
  @Input() value = 0;
}
