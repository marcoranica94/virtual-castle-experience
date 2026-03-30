import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="max-w-lg mx-auto px-4 pb-12 min-h-dvh">
      <router-outlet />
    </div>
  `,
})
export class AppComponent {}
