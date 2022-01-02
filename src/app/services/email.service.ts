import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { HandlingArguments } from './handling-arguments';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) { }

  exists(email: string): Observable<boolean> {
    return this.httpClient.post<boolean>('/emails/exists', { email: email });
  }

  getCanBeResend(): Observable<Date | undefined> {
    return this.httpClient.get<Date>('/email-confirmation/can-be-resend')
                          .pipe(map(response => response ? new Date(response) : undefined));
  }

  resendConfirmationEmail({
    onSuccess,
    onFinal,
    onError,
  }: Pick<HandlingArguments, 'onSuccess' | 'onFinal' | 'onError'> = {}): void {
    this.httpClient.post('/email-confirmation/resend', null).pipe(catchError((error: any) => {
      if (onError) {
        onError(error);
      }

      throw error;
    }), finalize(() => {
      if (onFinal) {
        onFinal();
      }
    })).subscribe((response: any) => {
      if (onSuccess) {
        onSuccess();
      }
    });
  }

}
