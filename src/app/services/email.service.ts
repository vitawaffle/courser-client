import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) { }

  exists(email: string): Observable<boolean> {
    return this.httpClient.post<boolean>('/emails/exists', { email: email });
  }

}
