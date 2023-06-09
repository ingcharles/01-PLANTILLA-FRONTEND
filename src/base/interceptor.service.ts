import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InterceptorService implements HttpInterceptor {
  constructor() { }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${localStorage.getItem('token')}`
  //   });

  //   const reqClone = req.clone({
  //     headers
  //   });

  //   return next.handle(reqClone);
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const reqClone = req.clone({
      headers
    });

    return next.handle(reqClone);
  }
}

