import { Injectable } from '@angular/core';
import type { AnalyticsEvent } from '../types';

const STORAGE_KEY = 'castello_ar_analytics';
const MAX_EVENTS = 500;

@Injectable({ providedIn: 'root' })
export class AnalyticsService {

  track(category: string, action: string, label = ''): void {
    try {
      const events: AnalyticsEvent[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      events.push({ category, action, label, timestamp: new Date().toISOString() });
      if (events.length > MAX_EVENTS) events.splice(0, events.length - MAX_EVENTS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch {
      // noop
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
