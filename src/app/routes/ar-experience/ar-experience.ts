import { Component, inject, OnInit, OnDestroy, signal, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar';
import { SubtitleOverlayComponent } from '../../components/subtitle-overlay/subtitle-overlay';
import { QuizComponent } from '../../components/quiz/quiz';
import { InfoPanelComponent } from '../../components/info-panel/info-panel';
import { ProgressService } from '../../services/progress.service';
import type { BadgeToast } from '../../services/progress.service';
import { ArService } from '../../services/ar.service';
import { AnalyticsService } from '../../services/analytics.service';
import { getExperience, getRoomById } from '../../data/rooms';
import type { ExperienceConfig, ExperienceType, SubtitleEntry } from '../../types';

@Component({
  selector: 'app-ar-experience',
  standalone: true,
  imports: [ProgressBarComponent, SubtitleOverlayComponent, QuizComponent, InfoPanelComponent],
  template: `
    <!-- G-04: Toast "Bentornato" per visitatori di ritorno (Drago) -->
    @if (showReturnGreeting()) {
      <div class="fixed inset-0 bg-bg/90 flex flex-col items-center justify-center z-[1002] px-6 text-center animate-[fadeIn_0.3s_ease]">
        <div class="text-6xl mb-4">🐉</div>
        <h2 class="font-[family-name:var(--font-family-title)] text-gold text-2xl mb-2">Bentornato, Esploratore!</h2>
        <p class="text-text-muted text-sm max-w-xs mb-8">
          Il Drago Custode ti ricorda! Sei pronto per una nuova missione alla Rocca Albani?
        </p>
        <button
          class="min-h-12 px-8 py-3 bg-drago text-white font-semibold rounded-xl text-lg active:scale-[0.97] transition-transform"
          (click)="dismissReturnGreeting()"
        >
          Sì, sono pronto! 🐾
        </button>
      </div>
    }

    <!-- D-03: Mini-tutorial pre-AR (solo prima visita) -->
    @if (showArTutorial()) {
      <div class="fixed inset-0 bg-bg flex flex-col items-center justify-center z-[1002] px-6 text-center animate-[fadeIn_0.3s_ease]">
        <h2 class="font-[family-name:var(--font-family-title)] text-gold text-xl mb-2">
          {{ experience?.icon }} {{ experience?.title }}
        </h2>
        <p class="text-text-muted text-sm mb-8">Come funziona l'esperienza AR</p>

        <div class="w-full max-w-xs space-y-4 mb-8">
          <div class="flex items-center gap-4 bg-bg-card rounded-xl p-4 border border-stone text-left">
            <span class="text-3xl shrink-0">📷</span>
            <div>
              <div class="text-parchment text-sm font-semibold mb-0.5">Concedi la fotocamera</div>
              <div class="text-text-muted text-xs">Il telefono chiederà il permesso — tocca "Consenti".</div>
            </div>
          </div>
          <div class="flex items-center gap-4 bg-bg-card rounded-xl p-4 border border-stone text-left">
            <span class="text-3xl shrink-0">🎯</span>
            <div>
              <div class="text-parchment text-sm font-semibold mb-0.5">Inquadra il pannello</div>
              <div class="text-text-muted text-xs">Cerca il pannello AR nella sala e puntaci sopra la fotocamera.</div>
            </div>
          </div>
          <div class="flex items-center gap-4 bg-bg-card rounded-xl p-4 border border-stone text-left">
            <span class="text-3xl shrink-0">✨</span>
            <div>
              <div class="text-parchment text-sm font-semibold mb-0.5">Magia!</div>
              <div class="text-text-muted text-xs">Il contenuto AR appare. Tienilo stabile e goditi l'esperienza!</div>
            </div>
          </div>
        </div>

        <button
          class="w-full max-w-xs min-h-12 px-6 py-3 bg-gold text-stone-dark font-semibold rounded-xl text-lg active:scale-[0.97] transition-transform"
          (click)="dismissArTutorial()"
        >
          Ho capito, inizia!
        </button>
        <button
          class="mt-4 text-sm text-text-muted bg-transparent border-none cursor-pointer"
          (click)="goBack()"
        >
          ← Torna al menù
        </button>
      </div>
    }

    <!-- Orientation warning: richiedi portrait per AR -->
    @if (isLandscape() && !showReturnGreeting() && !showArTutorial()) {
      <div class="fixed inset-0 bg-bg/95 flex flex-col items-center justify-center z-[1004] px-6 text-center">
        <div class="text-6xl mb-4 animate-[spin_2s_linear_infinite]">📱</div>
        <h2 class="font-[family-name:var(--font-family-title)] text-gold text-xl mb-2">Ruota il telefono</h2>
        <p class="text-text-muted text-sm max-w-xs">
          L'esperienza AR funziona meglio in modalità verticale.<br>Ruota il telefono per continuare.
        </p>
      </div>
    }

    <!-- Loading screen -->
    @if (loading()) {
      <div class="fixed inset-0 bg-bg flex flex-col items-center justify-center z-[1000] px-6 text-center">
        <h2 class="font-[family-name:var(--font-family-title)] text-gold text-xl mb-5">
          {{ experience?.icon }} {{ experience?.title }}
        </h2>
        <p class="text-sm text-text-muted max-w-xs">
          Preparazione in corso...<br>
          Tra poco potrai inquadrare il pannello AR.
        </p>
        <div class="mt-5 w-full max-w-xs">
          <app-progress-bar [value]="loadingProgress()" />
        </div>
        <p class="text-xs text-text-muted mt-3">
          Assicurati di aver concesso il permesso alla fotocamera.
        </p>
      </div>
    }

    <!-- Fallback -->
    @if (fallbackMessage()) {
      <div class="fixed inset-0 bg-bg flex flex-col items-center justify-center z-[1001] px-6 text-center">
        <h2 class="font-[family-name:var(--font-family-title)] text-gold text-xl mb-4">
          ⚠️ Dispositivo non compatibile
        </h2>
        <p class="text-text-muted text-sm">{{ fallbackMessage() }}</p>
        <button class="mt-6 min-h-11 px-6 py-3 bg-gold text-stone-dark font-semibold rounded-md" (click)="goBack()">
          ← Torna al menù
        </button>
      </div>
    }

    <!-- Scena AR (inserita dinamicamente) -->
    <div id="ar-container"></div>

    <!-- Overlay UI sopra AR -->
    @if (sceneReady()) {
      <div class="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-start pointer-events-none">
        <button
          class="pointer-events-auto bg-black/60 rounded-full w-11 h-11 flex items-center justify-center text-white text-xl border-none cursor-pointer"
          (click)="goBack()"
          aria-label="Torna al menù"
        >&times;</button>

        <div class="flex gap-2 pointer-events-auto">
          @if (experience?.type === 'drago') {
            <div class="inline-flex items-center gap-1 bg-stone border border-gold-dark rounded-full px-2 py-1 text-xs text-gold-light">
              ⭐ {{ progress.points() }} punti
            </div>
          }
          <!-- D-13: Pulsante "Non funziona?" -->
          <button
            class="bg-black/60 rounded-full w-11 h-11 flex items-center justify-center text-white text-sm border-none cursor-pointer font-bold"
            (click)="showHelp.set(true)"
            aria-label="Aiuto"
          >?</button>
        </div>
      </div>
    }

    <!-- Sottotitoli -->
    <app-subtitle-overlay [text]="currentSubtitle()" />

    <!-- Barra azioni -->
    @if (targetFound()) {
      <div class="fixed bottom-0 left-0 right-0 z-50 p-4 flex justify-center gap-2 bg-gradient-to-t from-black/70 to-transparent pb-[max(1.5rem,env(safe-area-inset-bottom))]">

        @if (experience?.type === 'castellano' || experience?.type === 'drago') {
          <button
            class="min-h-11 px-6 py-3 bg-gold text-stone-dark font-semibold rounded-md"
            (click)="toggleAudio()"
          >
            {{ audioPlaying() ? '⏸ Pausa' : (audioEnded() ? '▶ Riascolta' : '▶ Ascolta') }}
          </button>
        }

        @if (experience?.type === 'drago' && audioEnded() && !quizDone()) {
          <button
            class="min-h-11 px-6 py-3 bg-drago text-white font-semibold rounded-md"
            (click)="showQuiz.set(true)"
          >
            ❓ Quiz!
          </button>
        }

        @if (experience?.type === 'laboratorio') {
          <button
            class="min-h-11 px-5 py-3 bg-gold text-stone-dark font-semibold rounded-md"
            (click)="toggleInfoPanel('info')"
          >
            📖 Scheda
          </button>
          <button
            class="min-h-11 px-5 py-3 bg-stone text-parchment font-semibold rounded-md"
            (click)="toggleInfoPanel('timeline')"
          >
            ⏳ Timeline
          </button>
        }

        <button
          class="min-h-11 px-5 py-3 bg-stone text-parchment font-semibold rounded-md"
          (click)="finish()"
        >
          Fine
        </button>
      </div>
    }

    <!-- Barra aiuto se target non trovato (dopo 15 sec) -->
    @if (sceneReady() && !targetFound() && showScanHint()) {
      <div class="fixed bottom-0 left-0 right-0 z-40 p-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <div class="bg-black/70 rounded-xl p-3 text-center text-sm text-parchment">
          🔍 Cerca il pannello AR nella sala e inquadralo con la fotocamera
        </div>
      </div>
    }

    <!-- Quiz (bambini) -->
    @if (experience?.quiz) {
      <app-quiz
        [config]="experience?.quiz"
        [visible]="showQuiz()"
        (completed)="onQuizComplete($event)"
      />
    }

    <!-- Info panel (didattica) -->
    @if (experience?.type === 'laboratorio') {
      <app-info-panel
        [info]="experience?.infoPanel"
        [timeline]="experience?.timeline"
        [mode]="infoPanelMode()"
        [visible]="infoPanelVisible()"
        (close)="infoPanelVisible.set(false)"
      />
    }

    <!-- G-06: Toast "Badge guadagnato!" -->
    @if (badgeToast()) {
      <div class="fixed top-[4.5rem] left-4 right-4 z-[1005] animate-[fadeIn_0.3s_ease] pointer-events-none">
        <div class="bg-bg-card border border-gold-dark rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg">
          <span class="text-3xl shrink-0">{{ badgeToast()!.icon }}</span>
          <div class="flex-1 min-w-0">
            <div class="text-[0.65rem] text-gold uppercase tracking-widest font-semibold">Badge sbloccato!</div>
            <div class="font-[family-name:var(--font-family-title)] text-parchment text-sm truncate">{{ badgeToast()!.name }}</div>
          </div>
          <span class="text-gold text-lg shrink-0">🏆</span>
        </div>
      </div>
    }

    <!-- D-13: Modale "Non funziona?" -->
    @if (showHelp()) {
      <div class="fixed inset-0 bg-black/80 z-[1003] flex items-end justify-center p-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]" (click)="showHelp.set(false)">
        <div class="bg-bg-card border border-stone rounded-2xl w-full max-w-sm p-5" (click)="$event.stopPropagation()">
          <h3 class="font-[family-name:var(--font-family-title)] text-gold text-lg mb-4">❓ Non funziona?</h3>
          <ul class="space-y-3 mb-5">
            @for (tip of helpTips; track tip.icon) {
              <li class="flex gap-3 text-sm text-text-muted">
                <span class="text-lg shrink-0">{{ tip.icon }}</span>
                <span>{{ tip.text }}</span>
              </li>
            }
          </ul>
          <button
            class="w-full min-h-11 py-3 bg-stone text-parchment font-semibold rounded-xl"
            (click)="showHelp.set(false)"
          >
            Chiudi
          </button>
        </div>
      </div>
    }
  `,
})
export class ArExperienceComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly progress = inject(ProgressService);
  private readonly arService = inject(ArService);
  private readonly analytics = inject(AnalyticsService);
  private readonly platformId = inject(PLATFORM_ID);

  experience: ExperienceConfig | undefined;
  private roomId = '';

  // Stato UI con signals
  readonly showArTutorial = signal(false);
  readonly loading = signal(false);
  readonly loadingProgress = signal(0);
  readonly fallbackMessage = signal('');
  readonly sceneReady = signal(false);
  readonly targetFound = signal(false);
  readonly showScanHint = signal(false);
  readonly currentSubtitle = signal('');
  readonly audioPlaying = signal(false);
  readonly audioEnded = signal(false);
  readonly showQuiz = signal(false);
  readonly quizDone = signal(false);
  readonly infoPanelVisible = signal(false);
  readonly infoPanelMode = signal<'info' | 'timeline'>('info');
  readonly showHelp = signal(false);
  readonly showReturnGreeting = signal(false);
  readonly isLandscape = signal(false);
  readonly badgeToast = signal<BadgeToast | null>(null);

  readonly helpTips = [
    { icon: '💡', text: 'Assicurati di essere in un luogo ben illuminato.' },
    { icon: '📷', text: 'Controlla che il permesso fotocamera sia abilitato (Impostazioni → Browser → Fotocamera).' },
    { icon: '🎯', text: 'Inquadra il pannello AR frontalmente, a 30–50 cm di distanza, tenendo il telefono fermo.' },
    { icon: '🔄', text: 'Se il modello non appare, prova ad allontanarti un poco e poi riquadrare.' },
    { icon: '🌐', text: 'Verifica la connessione: le prime librerie AR vengono scaricate online.' },
  ];

  private audio: HTMLAudioElement | null = null;
  private subtitleInterval: ReturnType<typeof setInterval> | null = null;
  private progressInterval: ReturnType<typeof setInterval> | null = null;
  private scanHintTimeout: ReturnType<typeof setTimeout> | null = null;
  private labPanelOpened = false;
  private orientationHandler: (() => void) | null = null;

  private static readonly TUTORIAL_KEY = 'arTutorialSeen';
  private static readonly DRAGO_VISITED_KEY = 'dragoVisited';

  constructor() {
    // G-06: mostra toast quando ProgressService segnala un nuovo badge
    effect(() => {
      const badge = this.progress.newBadge();
      if (!badge) return;
      this.badgeToast.set(badge);
      this.progress.newBadge.set(null);
      setTimeout(() => this.badgeToast.set(null), 4000);
    });
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.roomId = this.route.snapshot.paramMap.get('roomId') ?? '';
    const expType = this.route.snapshot.paramMap.get('experienceType') ?? '';

    this.experience = getExperience(this.roomId, expType);
    if (!this.experience) { this.router.navigate(['/']); return; }

    // Orientation warning
    this.orientationHandler = () => {
      this.isLandscape.set(window.innerWidth > window.innerHeight);
    };
    this.orientationHandler();
    window.addEventListener('resize', this.orientationHandler);

    // G-04: saluta visitatori di ritorno del Drago
    if (this.experience.type === 'drago') {
      const dragoVisited = localStorage.getItem(ArExperienceComponent.DRAGO_VISITED_KEY);
      if (dragoVisited) {
        this.showReturnGreeting.set(true);
        return;
      }
      localStorage.setItem(ArExperienceComponent.DRAGO_VISITED_KEY, '1');
    }

    // D-03: mostra tutorial solo alla prima visita
    const tutorialSeen = localStorage.getItem(ArExperienceComponent.TUTORIAL_KEY);
    if (!tutorialSeen) {
      this.showArTutorial.set(true);
      return; // la vera init parte al click "Ho capito"
    }

    this.startArInit();
  }

  /** G-04: chiamato al click "Sì, sono pronto!" */
  dismissReturnGreeting(): void {
    this.showReturnGreeting.set(false);
    const tutorialSeen = localStorage.getItem(ArExperienceComponent.TUTORIAL_KEY);
    if (!tutorialSeen) {
      this.showArTutorial.set(true);
      return;
    }
    this.startArInit();
  }

  /** D-03: chiamato al click "Ho capito, inizia!" */
  dismissArTutorial(): void {
    localStorage.setItem(ArExperienceComponent.TUTORIAL_KEY, '1');
    this.showArTutorial.set(false);
    this.startArInit();
  }

  private startArInit(): void {
    // Controlla compatibilità
    const compat = this.arService.checkCompatibility();
    if (!compat.supported) {
      this.fallbackMessage.set(compat.reason!);
      return;
    }

    this.loading.set(true);

    // Simula progresso loading
    this.progressInterval = setInterval(() => {
      const current = this.loadingProgress();
      if (current < 90) this.loadingProgress.set(current + Math.random() * 15);
    }, 300);

    // Carica librerie AR e crea scena
    this.arService.loadArLibraries().then(() => {
      this.createArScene();
    }).catch(() => {
      this.loading.set(false);
      this.fallbackMessage.set('Errore nel caricamento delle librerie AR.');
    });
  }

  ngOnDestroy(): void {
    this.stopAudio();
    if (this.progressInterval) clearInterval(this.progressInterval);
    if (this.subtitleInterval) clearInterval(this.subtitleInterval);
    if (this.scanHintTimeout) clearTimeout(this.scanHintTimeout);
    if (this.orientationHandler) window.removeEventListener('resize', this.orientationHandler);
    // Rimuovi scena AR dal DOM
    const container = document.getElementById('ar-container');
    if (container) container.innerHTML = '';
  }

  /** Crea la scena A-Frame/MindAR dinamicamente nel DOM */
  private createArScene(): void {
    if (!this.experience) return;

    const container = document.getElementById('ar-container');
    if (!container) return;

    const scene = document.createElement('a-scene');
    scene.setAttribute('mindar-image', `imageTargetSrc: ${this.experience.assets.targetMind}; autoStart: true; uiLoading: no; uiScanning: no; uiError: no;`);
    scene.setAttribute('color-space', 'sRGB');
    scene.setAttribute('renderer', 'colorManagement: true; physicallyCorrectLights: true;');
    scene.setAttribute('vr-mode-ui', 'enabled: false');
    scene.setAttribute('device-orientation-permission-ui', 'enabled: false');

    // Camera
    const camera = document.createElement('a-camera');
    camera.setAttribute('position', '0 0 0');
    camera.setAttribute('look-controls', 'enabled: false');
    scene.appendChild(camera);

    // Target entity
    const target = document.createElement('a-entity');
    target.setAttribute('mindar-image-target', 'targetIndex: 0');

    if (this.experience.assets.modelGlb) {
      // Modello 3D
      const assets = document.createElement('a-assets');
      const assetItem = document.createElement('a-asset-item');
      assetItem.setAttribute('id', 'ar-model');
      assetItem.setAttribute('src', this.experience.assets.modelGlb);
      assets.appendChild(assetItem);
      scene.appendChild(assets);

      const model = document.createElement('a-gltf-model');
      model.setAttribute('src', '#ar-model');
      model.setAttribute('position', '0 -0.5 0');
      model.setAttribute('scale', '0.3 0.3 0.3');
      model.setAttribute('animation-mixer', 'clip: *; loop: repeat;');
      target.appendChild(model);
    } else {
      // Etichette 3D (laboratorio)
      this.createLabLabels(target);
    }

    scene.appendChild(target);

    // Event listeners
    scene.addEventListener('arReady', () => {
      if (this.progressInterval) clearInterval(this.progressInterval);
      this.loadingProgress.set(100);
      setTimeout(() => {
        this.loading.set(false);
        this.sceneReady.set(true);
        this.analytics.track('ar', 'scene_ready', `${this.roomId}/${this.experience!.type}`);
        // Mostra hint di scansione dopo 15 secondi se il target non è ancora trovato
        this.scanHintTimeout = setTimeout(() => {
          if (!this.targetFound()) this.showScanHint.set(true);
        }, 15000);
      }, 400);
    });

    scene.addEventListener('arError', () => {
      if (this.progressInterval) clearInterval(this.progressInterval);
      this.loading.set(false);
      this.fallbackMessage.set('Errore nell\'avvio della fotocamera. Verifica di aver concesso il permesso.');
    });

    target.addEventListener('targetFound', () => {
      this.targetFound.set(true);
      this.showScanHint.set(false);
      this.analytics.track('ar', 'target_found', `${this.roomId}/${this.experience!.type}`);
    });

    container.appendChild(scene);
  }

  /** Crea etichette 3D per il laboratorio */
  private createLabLabels(parent: HTMLElement): void {
    const labels = [
      { text: 'Materiale', pos: '-0.5 0.3 0' },
      { text: 'Epoca', pos: '0.5 0.3 0' },
      { text: 'Dettagli', pos: '0 -0.4 0' },
    ];
    for (const label of labels) {
      const entity = document.createElement('a-entity');
      entity.setAttribute('position', label.pos);
      const plane = document.createElement('a-plane');
      plane.setAttribute('color', '#2471a3');
      plane.setAttribute('opacity', '0.85');
      plane.setAttribute('width', '0.4');
      plane.setAttribute('height', '0.12');
      const text = document.createElement('a-text');
      text.setAttribute('value', label.text);
      text.setAttribute('align', 'center');
      text.setAttribute('width', '0.8');
      text.setAttribute('color', 'white');
      text.setAttribute('position', '0 0 0.01');
      plane.appendChild(text);
      entity.appendChild(plane);
      parent.appendChild(entity);
    }
  }

  /** Toggle audio playback */
  toggleAudio(): void {
    if (!this.experience?.assets.audioMp3) return;

    if (!this.audio) {
      this.audio = new Audio(this.experience.assets.audioMp3);
      this.audio.addEventListener('ended', () => {
        this.audioPlaying.set(false);
        this.audioEnded.set(true);
        this.stopSubtitles();
        // Segna esperienza completata per castellano
        if (this.experience!.type === 'castellano') {
          this.progress.completeExperience(this.roomId, this.experience!.type);
          this.progress.addPoints(this.experience!.points);
          this.analytics.track('ar', 'experience_complete', `${this.roomId}/${this.experience!.type}`);
        }
      });
    }

    if (this.audioPlaying()) {
      this.audio.pause();
      this.audioPlaying.set(false);
      this.stopSubtitles();
    } else {
      this.audio.play().then(() => {
        this.audioPlaying.set(true);
        this.startSubtitles();
        this.analytics.track('audio', 'play', `${this.roomId}/${this.experience!.type}`);
      }).catch(() => {
        // Errore riproduzione
      });
    }
  }

  /** Avvia sincronizzazione sottotitoli */
  private startSubtitles(): void {
    if (!this.audio || !this.experience?.subtitles.length) return;
    this.stopSubtitles();
    this.subtitleInterval = setInterval(() => {
      const time = this.audio!.currentTime;
      const current = this.experience!.subtitles.find(
        (s: SubtitleEntry) => time >= s.start && time < s.end
      );
      this.currentSubtitle.set(current?.text ?? '');
    }, 200);
  }

  private stopSubtitles(): void {
    if (this.subtitleInterval) { clearInterval(this.subtitleInterval); this.subtitleInterval = null; }
    this.currentSubtitle.set('');
  }

  private stopAudio(): void {
    if (this.audio) { this.audio.pause(); this.audio.currentTime = 0; }
    this.stopSubtitles();
  }

  /** Quiz completato (bambini) */
  onQuizComplete(result: { correct: boolean; points: number }): void {
    this.showQuiz.set(false);
    this.quizDone.set(true);
    this.progress.addPoints(result.points);
    this.progress.completeExperience(this.roomId, 'drago');
    this.analytics.track('quiz', result.correct ? 'correct' : 'wrong', `${this.roomId}/drago`);
    this.analytics.track('ar', 'experience_complete', `${this.roomId}/drago`);
  }

  /** Toggle pannello info (didattica) */
  toggleInfoPanel(mode: 'info' | 'timeline'): void {
    if (this.infoPanelMode() === mode && this.infoPanelVisible()) {
      this.infoPanelVisible.set(false);
    } else {
      this.infoPanelMode.set(mode);
      this.infoPanelVisible.set(true);
      this.labPanelOpened = true;
      this.analytics.track('didattica', `open_${mode}`, `${this.roomId}/laboratorio`);
    }
  }

  /** Termina esperienza */
  finish(): void {
    this.stopAudio();
    if (this.experience?.type === 'laboratorio' && this.labPanelOpened) {
      this.progress.completeExperience(this.roomId, 'laboratorio');
      this.progress.addPoints(this.experience.points);
      this.analytics.track('ar', 'experience_complete', `${this.roomId}/laboratorio`);
    }
    this.goBack();
  }

  goBack(): void {
    this.router.navigate(['/sala', this.roomId]);
  }
}
