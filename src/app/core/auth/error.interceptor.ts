import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth-service'; // Ajusta la ruta

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si el error es 401 (No autorizado) o 403 (Prohibido)
      if (error.status === 401 || error.status === 403) {
        console.warn('Sesión expirada o no autorizada. Redirigiendo...');
        authService.logout(); 
      }
      
      return throwError(() => error);
    })
  );
};