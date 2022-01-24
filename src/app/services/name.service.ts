import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { NameEntity } from '../entities/name.entity';
import { NameDTO } from '../dto/name.dto';
import { HandlingArguments } from './handling-arguments';

@Injectable({
  providedIn: 'root'
})
export class NameService {

  constructor(private httpClient: HttpClient) { }

  getAllNames(): Observable<NameDTO[]> {
    return this.httpClient.get<NameDTO[]>('/names/me');
  }

  /*
   * TODO Need to refactor
   */
  saveName(name: NameDTO, {
    onSuccess,
    onFinal,
    onError,
    onBadRequest,
  }: Pick<HandlingArguments, 'onSuccess' | 'onFinal' | 'onError' | 'onBadRequest'> = {}) {
    this.httpClient.post<NameEntity>('/names/me', name).pipe(catchError(error => {
      switch (error.status) {
        case 400:
          if (onBadRequest) {
            onBadRequest(error.body);
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
    })).subscribe(() => {
      if (onSuccess) {
        onSuccess();
      }
    });
  }

  /*
   * TODO Need to refactor
   */
  deleteName(languageId: number, {
    onSuccess,
    onFinal,
    onError,
  }: Pick<HandlingArguments, 'onSuccess' | 'onFinal' | 'onError'> = {}) {
    this.httpClient.delete(`/names/me/${languageId}`).pipe(catchError(error => {
      if (onError) {
        onError(error);
      }
      throw error;
    }), finalize(() => {
      if (onFinal) {
        onFinal();
      }
    })).subscribe(() => {
      if (onSuccess) {
        onSuccess();
      }
    });
  }

}
