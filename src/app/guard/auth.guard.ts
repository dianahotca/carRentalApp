import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const loggedUserToken = sessionStorage.getItem('authToken');

  if (loggedUserToken) {
    return true;
  }

  const router = inject(Router);
  router.navigateByUrl('login');

  return false;
};
