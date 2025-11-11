import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const notAuthenticatedGuard: CanMatchFn = async (route, segments) => {


  const router = inject(Router)

  const authService = inject(AuthService)

  const isAuthenticated = await firstValueFrom(authService.checkStatus())

  if(isAuthenticated){
    router.navigateByUrl('/intranet')
    return false
  }

  return true;
};
