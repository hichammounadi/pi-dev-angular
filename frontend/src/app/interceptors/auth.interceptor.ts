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

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({withCredentials: true})
    request = request.clone({
      headers: request.headers.set('Content-Type', 'application/json')
    })
    request = request.clone({
      headers: request.headers.set('accept', 'application/json')
    })
    console.log(request.withCredentials.valueOf())
    return next.handle(request);
  }
}
