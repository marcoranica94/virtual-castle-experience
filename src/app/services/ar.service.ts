import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ArService {

  /** Verifica se il browser supporta getUserMedia */
  isCameraSupported(): boolean {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  /** Verifica HTTPS o localhost */
  isSecureContext(): boolean {
    return window.isSecureContext === true;
  }

  /** Controllo completo compatibilità AR */
  checkCompatibility(): { supported: boolean; reason?: string } {
    if (!this.isSecureContext()) {
      return { supported: false, reason: 'Questa pagina deve essere aperta tramite HTTPS per accedere alla fotocamera.' };
    }
    if (!this.isCameraSupported()) {
      return { supported: false, reason: 'Il tuo browser non supporta l\'accesso alla fotocamera. Prova con Chrome o Safari.' };
    }
    return { supported: true };
  }

  /**
   * Carica gli script A-Frame e MindAR dinamicamente.
   * Ritorna una Promise che si risolve quando entrambi sono pronti.
   */
  loadArLibraries(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isArLoaded()) {
        resolve();
        return;
      }

      const aframeScript = document.createElement('script');
      aframeScript.src = 'https://aframe.io/releases/1.7.1/aframe.min.js';
      aframeScript.onload = () => {
        const mindarScript = document.createElement('script');
        mindarScript.src = 'https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js';
        mindarScript.onload = () => resolve();
        mindarScript.onerror = () => reject(new Error('Errore nel caricamento di MindAR'));
        document.head.appendChild(mindarScript);
      };
      aframeScript.onerror = () => reject(new Error('Errore nel caricamento di A-Frame'));
      document.head.appendChild(aframeScript);
    });
  }

  /** Verifica se A-Frame è già caricato */
  private isArLoaded(): boolean {
    return typeof (window as unknown as Record<string, unknown>)['AFRAME'] !== 'undefined';
  }
}
