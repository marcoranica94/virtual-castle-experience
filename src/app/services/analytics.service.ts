import { Injectable } from '@angular/core';
import type { AnalyticsEvent } from '../types';

const STORAGE_KEY = 'castello_ar_analytics';
const MAX_EVENTS = 500;

/** Accesso type-safe a window.plausible iniettato da index.html */
declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {

  track(category: string, action: string, label = ''): void {
    // 1. localStorage (offline, debug)
    try {
      const events: AnalyticsEvent[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      events.push({ category, action, label, timestamp: new Date().toISOString() });
      if (events.length > MAX_EVENTS) events.splice(0, events.length - MAX_EVENTS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch {
      // noop
    }

    // 2. Plausible custom event (privacy-first, no-cookie)
    try {
      window.plausible?.(`${category}:${action}`, { props: { label } });
    } catch {
      // noop — Plausible non installato o bloccato da adblocker
    }
  }

  getEvents(): AnalyticsEvent[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }
}
