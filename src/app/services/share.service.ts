import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ShareService {

  /** true se il browser supporta Web Share API */
  readonly canShare = typeof navigator !== 'undefined' && !!navigator.share;

  /**
   * Condivide un link via Web Share API o copia negli appunti come fallback.
   * @returns 'shared' | 'copied' | 'error'
   */
  async share(options: { title: string; text: string; url: string }): Promise<'shared' | 'copied' | 'error'> {
    if (this.canShare) {
      try {
        await navigator.share(options);
        return 'shared';
      } catch (err) {
        // AbortError = utente ha annullato — non è un errore reale
        if ((err as DOMException)?.name === 'AbortError') return 'error';
      }
    }
    // Fallback: copia URL negli appunti
    try {
      await navigator.clipboard.writeText(options.url);
      return 'copied';
    } catch {
      return 'error';
    }
  }
}
