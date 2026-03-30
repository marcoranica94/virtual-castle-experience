import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./routes/home/home').then(m => m.HomeComponent),
  },
  {
    path: 'sala/:roomId',
    loadComponent: () => import('./routes/room-menu/room-menu').then(m => m.RoomMenuComponent),
  },
  {
    path: 'sala/:roomId/:experienceType',
    loadComponent: () => import('./routes/ar-experience/ar-experience').then(m => m.ArExperienceComponent),
  },
  {
    path: 'tutorial',
    loadComponent: () => import('./routes/tutorial/tutorial').then(m => m.TutorialComponent),
  },
  {
    path: 'profilo',
    loadComponent: () => import('./routes/profile/profile').then(m => m.ProfileComponent),
  },
  {
    path: 'attestato',
    loadComponent: () => import('./routes/attestato/attestato').then(m => m.AttestatiComponent),
  },
  {
    path: 'privacy',
    loadComponent: () => import('./routes/privacy/privacy').then(m => m.PrivacyComponent),
  },
  {
    path: 'qr',
    loadComponent: () => import('./routes/qr/qr').then(m => m.QrPageComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./routes/not-found/not-found').then(m => m.NotFoundComponent),
  },
];
