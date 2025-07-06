import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const messageService = inject(MessageService);

  let clonedReq = req;

  if (token) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error en la solicitud:', error);
      if (error.status === 404) {
        messageService.add({
          severity: 'error',
          summary: 'Error 404',
          detail:
            'Recurso no encontrado. La información solicitada no está disponible.',
          life: 5000,
        });
      } else if (error.status === 500) {
        messageService.add({
          severity: 'error',
          summary: 'Error del Servidor',
          detail:
            'Ha ocurrido un error interno del servidor. Por favor, intenta nuevamente.',
          life: 5000,
        });
      } else if (error.status === 0 || !error.status) {
        messageService.add({
          severity: 'error',
          summary: 'Error de Conexión',
          detail:
            'No se puede conectar con el servidor. Verifica tu conexión a internet e intenta nuevamente.',
          life: 6000,
        });
      } else if (error.status === 408) {
        messageService.add({
          severity: 'error',
          summary: 'Tiempo de Espera Agotado',
          detail:
            'La solicitud tardó demasiado tiempo. Por favor, intenta nuevamente.',
          life: 5000,
        });
      } else if (error.status >= 500 && error.status < 600) {
        messageService.add({
          severity: 'error',
          summary: 'Error del Servidor',
          detail:
            'El servidor no está disponible en este momento. Intenta más tarde.',
          life: 5000,
        });
      }

      return throwError(() => error);
    })
  );
};
