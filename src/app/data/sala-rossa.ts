import type { RoomConfig } from '../types';

export const SALA_ROSSA: RoomConfig = {
  id: 'sala-rossa',
  name: 'Sala Rossa',
  icon: '🔴',
  description: 'La sala principale della Rocca. Scopri i segreti del mobile antico e la storia dei suoi custodi.',
  color: 'sala-red',
  available: true,
  experiences: [
    {
      type: 'castellano',
      title: 'Il Castellano Ti Racconta',
      subtitle: 'Un nobile del passato prende vita e racconta la storia della sala.',
      description: 'Narrazione storica di 2-3 minuti con audio e sottotitoli. Il Castellano indica dettagli architettonici e racconta aneddoti.',
      icon: '👑',
      audience: 'adulti',
      audienceColor: 'castellano',
      assets: {
        targetMind: 'assets/sala-rossa/targets/target-castellano.mind',
        modelGlb: 'assets/sala-rossa/models/castellano.glb',
        audioMp3: 'assets/sala-rossa/audio/narrazione-castellano.mp3',
      },
      subtitles: [
        { start: 0, end: 5, text: 'Benvenuto nella Sala Rossa della Rocca Albani...' },
        { start: 5, end: 12, text: 'Io sono il Castellano, custode di queste mura da secoli.' },
        { start: 12, end: 20, text: 'Lascia che ti racconti la storia di questa sala...' },
      ],
      points: 10,
    },
    {
      type: 'drago',
      title: 'La Missione del Drago Custode',
      subtitle: 'Il draghetto custode della Rocca ha bisogno del tuo aiuto!',
      description: 'Indizi, quiz e punti da raccogliere. Il Drago appare con animazione vivace e propone un mini-quiz sulla sala.',
      icon: '🐉',
      audience: 'bambini',
      audienceColor: 'drago',
      assets: {
        targetMind: 'assets/sala-rossa/targets/target-drago.mind',
        modelGlb: 'assets/sala-rossa/models/drago.glb',
        audioMp3: 'assets/sala-rossa/audio/narrazione-drago.mp3',
      },
      subtitles: [
        { start: 0, end: 4, text: 'Psst! Ehi, tu! Sei un esploratore?' },
        { start: 4, end: 9, text: 'Io sono il Drago Custode della Rocca Albani!' },
        { start: 9, end: 15, text: 'Ho bisogno del tuo aiuto per risolvere un mistero...' },
        { start: 15, end: 20, text: 'Guarda bene questa sala e rispondi alla mia domanda!' },
      ],
      quiz: {
        question: 'Di che colore sono le pareti di questa sala?',
        options: [
          { text: 'Blu come il cielo', correct: false },
          { text: 'Rosso come il fuoco', correct: true },
          { text: 'Verde come il prato', correct: false },
        ],
        correctPoints: 20,
        wrongPoints: 5,
      },
      points: 10,
    },
    {
      type: 'laboratorio',
      title: 'Il Laboratorio del Tempo',
      subtitle: 'Pannelli informativi 3D, timeline interattiva e schede materiali.',
      description: 'Perfetto per le scuole. Etichette 3D con frecce, timeline interattiva, confronto prima/dopo.',
      icon: '🔬',
      audience: 'scuole',
      audienceColor: 'laboratorio',
      assets: {
        targetMind: 'assets/sala-rossa/targets/target-laboratorio.mind',
      },
      subtitles: [],
      infoPanel: {
        title: 'Sala Rossa — Scheda Informativa',
        body: 'La Sala Rossa è uno degli ambienti più rappresentativi della Rocca Albani di Urgnano. Le pareti rivestite di tessuto rosso accolgono arredi d\'epoca e testimonianze della vita quotidiana nel castello. Il mobile principale della sala risale al periodo rinascimentale.',
        metadata: [
          { label: 'Epoca', value: 'XV-XVI sec.' },
          { label: 'Materiale', value: 'Noce intagliato' },
          { label: 'Stile', value: 'Rinascimentale' },
        ],
      },
      timeline: [
        { year: '1354', event: 'Costruzione della Rocca' },
        { year: 'XV sec.', event: 'Passaggio agli Albani' },
        { year: 'XVI sec.', event: 'Rinnovamento sale' },
        { year: '1800', event: 'Restauri importanti' },
        { year: 'Oggi', event: 'Sede comunale e museale' },
      ],
      points: 10,
    },
  ],
};
