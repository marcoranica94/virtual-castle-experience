import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="link"
      class="block bg-bg-card border border-stone rounded-xl p-5 mb-3 transition-all duration-200 active:scale-[0.97] active:border-gold"
      [class.opacity-40]="disabled"
      [class.pointer-events-none]="disabled"
      [style.border-left]="accentColor ? '4px solid ' + accentColor : ''"
    >
      @if (icon) {
        <div class="text-3xl mb-2">{{ icon }}</div>
      }
      <div class="font-[family-name:var(--font-family-title)] text-gold text-lg mb-1">
        {{ title }}
      </div>
      @if (description) {
        <p class="text-sm text-text-muted mb-0">{{ description }}</p>
      }
      <ng-content />
    </a>
  `,
})
export class CardComponent {
  @Input({ required: true }) link = '';
  @Input({ required: true }) title = '';
  @Input() icon = '';
  @Input() description = '';
  @Input() disabled = false;
  @Input() accentColor = '';
}
