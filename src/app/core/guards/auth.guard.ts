import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const decoded: any = jwtDecode(token);

    const ahora = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < ahora) {
      localStorage.removeItem('token'); // Limpiar token expirado
      router.navigate(['/login']);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Token inválido o mal formado:', err);
    localStorage.removeItem('token'); // Limpiar token inválido
    router.navigate(['/login']);
    return false;
  }
};
