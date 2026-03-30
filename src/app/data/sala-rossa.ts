import type { RoomConfig } from '../types';

// Copione Castellano — ~90 secondi (C-01)
// Voce autorevole e calda. Micro-interruzioni narrative incluse.
const SUBTITLES_CASTELLANO = [
  { start: 0,  end: 6,  text: 'Benvenuto nella Sala Rossa della Rocca Albani di Urgnano.' },
  { start: 6,  end: 13, text: 'Io sono il Castellano. Custodisco queste mura da secoli.' },
  { start: 13, end: 22, text: 'Guarda intorno a te: le pareti rosse, gli arredi, la luce che filtra dalle finestre.' },
  { start: 22, end: 30, text: 'Questa sala ha accolto signori, ambasciatori e illustri ospiti nel corso dei secoli.' },
  { start: 30, end: 39, text: 'La Rocca fu eretta nel 1354 per volere dei Visconti, i signori di Milano.' },
  { start: 39, end: 47, text: 'Poi passò agli Albani — da cui prende il nome — e poi a molte altre famiglie nobili.' },
  { start: 47, end: 56, text: 'Avvicinati a quel mobile. Lo vedi? Intagliato nel noce, risale al Cinquecento.' },
  { start: 56, end: 65, text: 'Ogni cassetto custodiva documenti importanti, sigilli, corrispondenze private.' },
  { start: 65, end: 73, text: 'Le pareti rosse non erano solo decorazione — il rosso era il colore del potere.' },
  { start: 73, end: 82, text: 'Chi entrava in questa sala capiva subito che stava parlando con qualcuno di importante.' },
  { start: 82, end: 90, text: 'Grazie per aver ascoltato. La storia di queste mura vive anche grazie a te.' },
];

// Copione Drago Custode — ~70 secondi (C-02)
// Tono giocoso, misterioso, avventuroso. Voce vivace.
const SUBTITLES_DRAGO = [
  { start: 0,  end: 5,  text: 'Psst! Ehi, tu! Sì, parlo con te! Avvicinati...' },
  { start: 5,  end: 11, text: 'Sono il Drago Custode della Rocca Albani. Il guardiano segreto!' },
  { start: 11, end: 18, text: 'Solo i veri esploratori possono vedermi. E tu ci sei riuscito, complimenti!' },
  { start: 18, end: 26, text: 'Questa sala nasconde un segreto. Ma prima devi dimostrare di essere all\'altezza.' },
  { start: 26, end: 34, text: 'Guarda bene intorno. Che colore vedi sulle pareti? Molto importante!' },
  { start: 34, end: 42, text: 'Ah! E hai visto quel grande mobile di legno scuro? È il mio posto preferito.' },
  { start: 42, end: 50, text: 'Ci dormo sopra quando non c\'è nessuno! Ci sono anche io nelle storie del castello!' },
  { start: 50, end: 58, text: 'Ma ora... è il momento della prova! Rispondi alla mia domanda e ti svelo il segreto!' },
  { start: 58, end: 66, text: 'Se rispondi bene, guadagni i punti speciali dell\'Esploratore della Rocca!' },
];

// Quiz reali sulla Sala Rossa — Rocca Albani (C-07)
const QUIZ_DRAGO = {
  question: 'In che anno fu costruita la Rocca Albani di Urgnano?',
  options: [
    { text: '1200 — nel Medioevo',  correct: false },
    { text: '1354 — per i Visconti', correct: true },
    { text: '1492 — come Colombo',  correct: false },
  ],
  correctPoints: 20,
  wrongPoints: 5,
};

export const SALA_ROSSA: RoomConfig = {
  id: 'sala-rossa',
  name: 'Sala Rossa',
  icon: '🔴',
  description: 'La sala di rappresentanza della Rocca. Scopri gli arredi rinascimentali e la storia dei Visconti e degli Albani.',
  color: 'sala-red',
  available: true,
  experiences: [
    {
      type: 'castellano',
      title: 'Il Castellano Ti Racconta',
      subtitle: 'Un nobile del passato prende vita e racconta la storia della Rocca.',
      description: 'Narrazione storica con audio e sottotitoli. Il Castellano rivela aneddoti, dettagli architettonici e la storia dei nobili che vissero qui.',
      icon: '👑',
      audience: 'adulti',
      audienceColor: 'castellano',
      assets: {
        targetMind: 'assets/sala-rossa/targets/target-castellano.mind',
        modelGlb: 'assets/sala-rossa/models/castellano.glb',
        audioMp3: 'assets/sala-rossa/audio/narrazione-castellano.mp3',
      },
      subtitles: SUBTITLES_CASTELLANO,
      points: 10,
    },
    {
      type: 'drago',
      title: 'La Missione del Drago Custode',
      subtitle: 'Il draghetto segreto della Rocca ha bisogno del tuo aiuto da esploratore!',
      description: 'Il Drago Custode appare con animazione vivace, racconta il suo segreto e sfida il visitatore con un quiz sulla storia della sala.',
      icon: '🐉',
      audience: 'bambini',
      audienceColor: 'drago',
      assets: {
        targetMind: 'assets/sala-rossa/targets/target-drago.mind',
        modelGlb: 'assets/sala-rossa/models/drago.glb',
        audioMp3: 'assets/sala-rossa/audio/narrazione-drago.mp3',
      },
      subtitles: SUBTITLES_DRAGO,
      quiz: QUIZ_DRAGO,
      points: 10,
    },
    {
      type: 'laboratorio',
      title: 'Il Laboratorio del Tempo',
      subtitle: 'Pannelli informativi 3D, timeline interattiva e schede storiche.',
      description: 'Percorso didattico con etichette 3D, schede materiali e timeline dalla fondazione al presente. Perfetto per le scolaresche.',
      icon: '🔬',
      audience: 'scuole',
      audienceColor: 'laboratorio',
      assets: {
        targetMind: 'assets/sala-rossa/targets/target-laboratorio.mind',
      },
      subtitles: [],
      infoPanel: {
        title: 'Sala Rossa — Scheda Storica',
        body: 'La Sala Rossa è l\'ambiente di rappresentanza della Rocca Albani di Urgnano (BG). Le pareti rivestite di tessuto cremisi accoglievano ospiti illustri, ambasciatori e cerimonie ufficiali. Il grande mobile in noce intagliato è uno dei pezzi più pregiati: custodiva documenti, sigilli e corrispondenze delle famiglie nobili che si sono succedute nella Rocca dal 1354.',
        metadata: [
          { label: 'Epoca',     value: 'XV–XVI sec.' },
          { label: 'Materiale', value: 'Noce intagliato' },
          { label: 'Stile',     value: 'Rinascimentale lombardo' },
          { label: 'Ubicazione', value: 'Urgnano (BG), Bergamo' },
        ],
      },
      timeline: [
        { year: '1354', event: 'Fondazione della Rocca', detail: 'Eretta per volere di Bernabò Visconti, signore di Milano, come presidio militare sul territorio bergamasco.' },
        { year: 'XIV sec.', event: 'Dominio visconteo', detail: 'La Rocca diventa parte del sistema difensivo della Signoria di Milano lungo la via Francesca.' },
        { year: 'XV sec.', event: 'Agli Albani', detail: 'La famiglia Albani — illustre casata bergamasca che darà anche un Papa — prende possesso della Rocca, che da loro prende il nome.' },
        { year: 'XVI sec.', event: 'Rinnovamento rinascimentale', detail: 'Le sale vengono arredate e decorate nel gusto rinascimentale. Il mobile in noce della Sala Rossa risale a questo periodo.' },
        { year: 'XVII sec.', event: 'Dominio veneziano', detail: 'Bergamo è territorio della Serenissima Repubblica di Venezia. La Rocca assume funzione amministrativa più che militare.' },
        { year: '1800', event: 'Restauri borbonici', detail: 'Importanti interventi di consolidamento strutturale durante la dominazione napoleonica e poi austriaca.' },
        { year: 'Oggi', event: 'Sede del Comune di Urgnano', detail: 'La Rocca ospita il Municipio di Urgnano e spazi museali aperti ai visitatori.' },
      ],
      points: 10,
    },
  ],
};
