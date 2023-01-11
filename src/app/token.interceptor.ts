import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    if (!request.url.includes('/token') && !request.url.includes('/register')) {
      const token = JSON.parse(sessionStorage.getItem('user-token') || '{}');
      request = request.clone({
        headers: request.headers.append('Authorization', token['token']),
      });
    }

    return next.handle(request);
  }
}
