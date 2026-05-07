import { HttpErrorResponse, HttpInterceptor, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { AuthService } from "./auth-service";
import { Router } from "@angular/router";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Intentamos obtener el token del localStorage
  const token = localStorage.getItem('token');

  // SI LA RUTA CONTIENE '/login', NO AÑADIMOS NADA
  if (req.url.includes('/login')) {
    return next(req);
  }
  
  // Si hay token, clonamos la petición y le añadimos la cabecera Authorization
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned); // Enviamos la petición con el token
  }

  // Si no hay token, la petición sigue su curso normal
  return next(req);

  
};
