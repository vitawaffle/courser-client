import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserEntity } from '../entities/user.entity';
import { CredentialsDTO } from '../dto/credentials.dto';
import { ChangePasswordDTO } from '../dto/change-password.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user?: UserEntity;

  constructor(private httpClient: HttpClient) { }

  get isAuthenticated(): boolean {
    return !!this.user;
  }

  checkAuth(): Observable<UserEntity> {
    return this.httpClient.get<UserEntity>('/users/me').pipe(catchError((error: any) => {
      if (error.status === 401) {
          this.logout();
      }

      throw error;
    }), tap(user => this.user = user));
  }

  logout(): Observable<any> {
    this.user = undefined;
    localStorage.removeItem('authToken');

    return of({});
  }

  private authenticate(credentials: CredentialsDTO, url: string): Observable<string> {
    return this.httpClient.post(url, credentials, {
      responseType: 'text',
    }).pipe(tap((authToken: string) => localStorage.setItem('authToken', authToken)));
  }

  login(credentials: CredentialsDTO): Observable<string> {
    return this.authenticate(credentials, '/auth/login');
  }

  signin(credentials: CredentialsDTO): Observable<string> {
    return this.authenticate(credentials, '/auth/signin');
  }

  changePassword(changePasswordDTO: ChangePasswordDTO): Observable<any> {
    return this.httpClient.post('/auth/change-password', changePasswordDTO);
  }

}
