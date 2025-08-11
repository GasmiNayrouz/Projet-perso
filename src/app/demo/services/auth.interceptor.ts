// auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // *** Exclude login endpoint from this interceptor ***
    const isLoginRequest = request.url.includes('/auth/authenticate');

    if (!isLoginRequest) {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      console.log('Interceptor - Token found for non-login request:', token);

      // If token exists, clone the request and add the Authorization header
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } else {
      console.log('Interceptor - Skipping Authorization header for login request');
       // Optional: Explicitly remove any existing Authorization header
       // if you suspect it might be carried over somehow, though clone() below should handle this.
       // if (request.headers.has('Authorization')) {
       //   request = request.clone({ headers: request.headers.delete('Authorization') });
       // }
    }

    // Pass the (potentially modified) request to the next handler
    return next.handle(request);
  }
}