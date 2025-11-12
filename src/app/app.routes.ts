import { Routes } from '@angular/router';
import { notAuthenticatedGuard } from './auth/guard/not-authenticated.guard';
import { isAdminGuard } from './auth/guard/auth.guard';

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
    canMatch: [
      isAdminGuard
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
