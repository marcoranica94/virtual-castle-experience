import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  animations: [
    trigger('routeFade', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(5px)' }),
        animate('180ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
  template: `
    <div id="main-content" class="max-w-lg mx-auto px-4 pb-12 min-h-dvh"
         [@routeFade]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet" />
    </div>
  `,
})
export class AppComponent {
  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRoute?.snapshot?.url?.[0]?.path ?? '';
  }
}
