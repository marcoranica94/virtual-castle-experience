import type { RoomConfig } from '../types';
import { SALA_ROSSA } from './sala-rossa';

/** Registry centrale di tutte le sale. Per aggiungere una sala: creare il file dati e aggiungerlo qui. */
export const ROOMS: RoomConfig[] = [
  SALA_ROSSA,
  {
    id: 'sala-blu',
    name: 'Sala Blu',
    icon: '🔵',
    description: 'Prossimamente disponibile.',
    color: 'sala-blue',
    available: false,
    experiences: [],
  },
  {
    id: 'giardino',
    name: 'Giardino',
    icon: '🌳',
    description: 'Esplora il giardino con la Realtà Aumentata basata su GPS.',
    color: 'garden-green',
    available: false,
    experiences: [],
  },
];

export function getRoomById(id: string): RoomConfig | undefined {
  return ROOMS.find(r => r.id === id);
}

export function getExperience(roomId: string, type: string) {
  return getRoomById(roomId)?.experiences.find(e => e.type === type);
}
