import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/Auth/login/login.component'),
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/Auth/registro/registro.component'),
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/Materias/inicio/inicio.component'),
    canActivate: [authGuard],
    children: [
      {
        path: 'registrar-materias',
        loadComponent: () =>
          import('./pages/Materias/registro/registro.component'),
      },
      {
        path: 'companeros',
        loadComponent: () =>
          import('./pages/Materias/companeros/companeros.component'),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
