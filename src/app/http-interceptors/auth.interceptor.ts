import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_ADDRESS } from '../config/app.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(httpRequest: HttpRequest<any>, nextHandler: HttpHandler): Observable<HttpEvent<any>> {
        return nextHandler.handle(httpRequest.clone({
            url: SERVER_ADDRESS + httpRequest.url,
            headers: httpRequest.headers.set('Authorization', 'Bearer ' + localStorage.getItem('authToken'))
        }));
    }

}
