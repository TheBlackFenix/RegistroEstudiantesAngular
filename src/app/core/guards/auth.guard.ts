import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  if (!auth.tieneSesionValida()) {
    auth.limpiarSesion();
    router.navigate(['/login']);
    return false;
  }

  return true;
};
