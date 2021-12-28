import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { UserEntity } from '../entities/user.entity';
import { CredentialsDTO } from '../dto/credentials.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user?: UserEntity;

  constructor(private httpClient: HttpClient) { }

  get isAuthenticated() {
    return !!this.user;
  }

  checkAuth(
    onSuccess?: () => void,
    onUnauthorized?: () => void,
    onError?: () => void,
    onFinal?: () => void
  ) {
    this.httpClient.get<UserEntity>('/users/me').pipe(catchError(error => {
      switch (error.status) {
        case 401:
          this.logout();
          if (onUnauthorized) {
            onUnauthorized();
          }
          break;
      }

      if (onError) {
        onError();
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
 
  logout(onSuccess?: () => void) {
    this.user = undefined;
    localStorage.removeItem('authToken');

    if (onSuccess) {
      onSuccess();
    }
  }

  login(
    credentials: CredentialsDTO,
    onSuccess?: () => void,
    onUnauthorized?: () => void,
    onError?: () => void,
    onFinal?: () => void
  ) {
    this.httpClient.post('/auth/login', credentials, {
      responseType: 'text'
    }).pipe(catchError(error => {
      switch (error.status) {
        case 401:
          if (onUnauthorized) {
            onUnauthorized();
          }
          break;
      }

      if (onError) {
        onError();
      }
      throw error;
    }), finalize(() => {
      if (onFinal) {
        onFinal();
      }
    })).subscribe(authToken => {
      localStorage.setItem('authToken', authToken);

      if (onSuccess) {
        onSuccess();
      }
    });
  }

  signin(
    credentials: CredentialsDTO,
    onSuccess?: () => void,
    onError?: () => void,
    onFinal?: () => void
  ) {
    this.httpClient.post('/auth/signin', credentials, {
      responseType: 'text'
    }).pipe(catchError(error => {
      if (onError) {
        onError();
      }
      throw error;
    }), finalize(() => {
      if (onFinal) {
        onFinal();
      }
    })).subscribe(authToken => {
      localStorage.setItem('authToken', authToken);

      if (onSuccess) {
        onSuccess();
      }
    });
  }

}
