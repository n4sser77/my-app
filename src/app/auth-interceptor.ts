import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth'; // adjust path if needed
import { Observable, catchError, throwError } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const token = authService.getToken(); // implement this method in your AuthService

  // Only attach token if it exists and is not a request to login/register
  const isAuthRequest =
    req.url.endsWith('/login') || req.url.endsWith('/register');
  const authReq =
    !isAuthRequest && token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

  return next(authReq).pipe(
    catchError((err) => {
      if (err.status === 401) {
        // Optional: redirect to login, or show toast
        authService.logout(); // implement this method too
      }
      return throwError(() => err);
    })
  );
}
