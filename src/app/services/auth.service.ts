import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { HandlingArguments } from './handling-arguments';
import { UserEntity } from '../entities/user.entity';
import { CredentialsDTO } from '../dto/credentials.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user?: UserEntity;

  constructor(private httpClient: HttpClient) { }

  get isAuthenticated(): boolean {
    return !!this.user;
  }

  checkAuth({
    onSuccess,
    onFinal,
    onError,
    onUnauthorized,
  }: Pick<HandlingArguments, 'onSuccess' | 'onFinal' | 'onError' | 'onUnauthorized'> = {}): void {
    this.httpClient.get<UserEntity>('/users/me').pipe(catchError((error: any) => {
      switch (error.status) {
        case 401:
          this.logout();
          if (onUnauthorized) {
            onUnauthorized();
          }
          break;
      }

      if (onError) {
        onError(error);
      }
      throw error;
    }), finalize(() => {
      if (onFinal) {
        onFinal();
      }
    })).subscribe((user: UserEntity) => {
      this.user = user;

      if (onSuccess) {
        onSuccess();
      }
    });
  }

  logout({ onSuccess, }: Pick<HandlingArguments, 'onSuccess'> = {}): void {
    this.user = undefined;
    localStorage.removeItem('authToken');

    if (onSuccess) {
      onSuccess();
    }
  }

  login(credentials: CredentialsDTO, {
    onSuccess,
    onFinal,
    onError,
    onUnauthorized,
  }: Pick<HandlingArguments, 'onSuccess' | 'onFinal' | 'onError' | 'onUnauthorized'> = {}): void {
    this.httpClient.post('/auth/login', credentials, {
      responseType: 'text'
    }).pipe(catchError((error: any) => {
      switch (error.status) {
        case 401:
          if (onUnauthorized) {
            onUnauthorized();
          }
          break;
      }

      if (onError) {
        onError(error);
      }
      throw error;
    }), finalize(() => {
      if (onFinal) {
        onFinal();
      }
    })).subscribe((authToken: string) => {
      localStorage.setItem('authToken', authToken);

      if (onSuccess) {
        onSuccess();
      }
    });
  }

  signin(credentials: CredentialsDTO, {
    onSuccess,
    onFinal,
    onError,
  }: Pick<HandlingArguments, 'onSuccess' | 'onFinal' | 'onError'> = {}): void {
    this.httpClient.post('/auth/signin', credentials, {
      responseType: 'text'
    }).pipe(catchError((error: any) => {
      if (onError) {
        onError();
      }
      throw error;
    }), finalize(() => {
      if (onFinal) {
        onFinal();
      }
    })).subscribe((authToken: string) => {
      localStorage.setItem('authToken', authToken);

      if (onSuccess) {
        onSuccess();
      }
    });
  }

}
