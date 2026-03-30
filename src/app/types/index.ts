/** Identificativo univoco di una sala */
export type RoomId = string;

/** Identificativo di un'esperienza AR */
export type ExperienceType = 'castellano' | 'drago' | 'laboratorio';

/** Configurazione di una singola sala */
export interface RoomConfig {
  id: RoomId;
  name: string;
  icon: string;
  description: string;
  color: string;
  available: boolean;
  experiences: ExperienceConfig[];
}

/** Configurazione di una singola esperienza AR */
export interface ExperienceConfig {
  type: ExperienceType;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  audience: 'adulti' | 'bambini' | 'scuole';
  audienceColor: string;
  assets: ExperienceAssets;
  subtitles: SubtitleEntry[];
  quiz?: QuizConfig;
  infoPanel?: InfoPanelConfig;
  timeline?: TimelineEntry[];
  points: number;
}

/** Asset necessari per un'esperienza AR */
export interface ExperienceAssets {
  targetMind: string;
  modelGlb?: string;
  audioMp3?: string;
}

/** Singola entry di sottotitolo */
export interface SubtitleEntry {
  start: number;
  end: number;
  text: string;
}

/** Configurazione quiz (esperienza bambini) */
export interface QuizConfig {
  question: string;
  options: QuizOption[];
  correctPoints: number;
  wrongPoints: number;
}

export interface QuizOption {
  text: string;
  correct: boolean;
}

/** Pannello informativo (esperienza didattica) */
export interface InfoPanelConfig {
  title: string;
  body: string;
  metadata: InfoMetaItem[];
}

export interface InfoMetaItem {
  label: string;
  value: string;
}

/** Entry nella timeline storica */
export interface TimelineEntry {
  year: string;
  event: string;
  detail?: string;
}

/** Progresso di una sala nel localStorage */
export interface RoomProgress {
  castellano: boolean;
  drago: boolean;
  laboratorio: boolean;
}

/** Badge ottenuto */
export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt?: string;
}

/** Stato globale del progresso visitatore */
export interface VisitorProgress {
  points: number;
  badges: Badge[];
  rooms: Record<RoomId, Partial<RoomProgress>>;
}

/** Evento analytics */
export interface AnalyticsEvent {
  category: string;
  action: string;
  label: string;
  timestamp: string;
}
