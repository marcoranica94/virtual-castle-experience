import { Component, Input, Output, EventEmitter } from '@angular/core';
import type { QuizConfig } from '../../types';

@Component({
  selector: 'app-quiz',
  standalone: true,
  template: `
    @if (config && visible) {
      <div class="fixed inset-0 bg-black/85 flex flex-col items-center justify-center z-[200] p-6 text-center">

        <div class="font-[family-name:var(--font-family-title)] text-xl text-gold mb-6 max-w-xs">
          {{ config.question }}
        </div>

        <div class="flex flex-col gap-2 w-full max-w-xs">
          @for (option of config.options; track option.text; let i = $index) {
            <button
              class="min-h-11 p-4 bg-stone border-2 border-stone-light rounded-xl text-text-primary text-base transition-all active:scale-[0.97]"
              [class.border-success]="answered && option.correct"
              [class.bg-success/20]="answered && option.correct"
              [class.border-error]="answered && selectedIndex === i && !option.correct"
              [class.bg-error/20]="answered && selectedIndex === i && !option.correct"
              [disabled]="answered"
              (click)="selectOption(i)"
            >
              {{ option.text }}
            </button>
          }
        </div>

        @if (answered) {
          <div class="mt-6 text-xl">
            {{ selectedCorrect ? '✅ Esatto! Bravo esploratore!' : '❌ Non proprio... ma hai guadagnato punti per aver provato!' }}
          </div>
          <button
            class="mt-6 min-h-11 px-6 py-3 bg-gold text-stone-dark font-semibold rounded-md"
            (click)="onContinue()"
          >
            Continua
          </button>
        }
      </div>
    }
  `,
})
export class QuizComponent {
  @Input() config: QuizConfig | undefined;
  @Input() visible = false;
  @Output() completed = new EventEmitter<{ correct: boolean; points: number }>();

  answered = false;
  selectedIndex = -1;
  selectedCorrect = false;

  selectOption(index: number): void {
    if (this.answered || !this.config) return;
    this.answered = true;
    this.selectedIndex = index;
    this.selectedCorrect = this.config.options[index].correct;
  }

  onContinue(): void {
    if (!this.config) return;
    this.completed.emit({
      correct: this.selectedCorrect,
      points: this.selectedCorrect ? this.config.correctPoints : this.config.wrongPoints,
    });
    this.answered = false;
    this.selectedIndex = -1;
  }
}
