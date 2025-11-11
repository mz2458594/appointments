import { Routes } from '@angular/router';
import { notAuthenticatedGuard } from './auth/guard/not-authenticated.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/pages/login/login.component'),
    canMatch: [
      notAuthenticatedGuard
    ]
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/pages/register/register.component'),
    canMatch: [
      notAuthenticatedGuard
    ]
  },
  {
    path: 'intranet',
    loadChildren: () => import('./intranet/intranet.routes'),

  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
