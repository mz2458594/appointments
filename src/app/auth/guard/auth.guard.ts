import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const isAdminGuard: CanMatchFn = (route, segments) => {

  const service = inject(AuthService)
  const router = inject(Router)

  const isAdmin = service.isAdmin()

  if (!isAdmin) {
    router.navigateByUrl('/')
    return false
  }

  return true;


};
