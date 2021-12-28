import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(httpRequest: HttpRequest<any>, nextHandler: HttpHandler): Observable<HttpEvent<any>> {
        return nextHandler.handle(httpRequest.clone({
            url: 'http://localhost:8080/api' + httpRequest.url,
            headers: httpRequest.headers.set('Authorization', 'Bearer ' + localStorage.getItem('authToken'))
        }));
    }

}
