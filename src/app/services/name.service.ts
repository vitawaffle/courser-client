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

  saveName(name: NameDTO, {
    onSuccess,
    onFinal,
    onError,
    onBadRequest,
  }: Pick<HandlingArguments, 'onSuccess' | 'onFinal' | 'onError' | 'onBadRequest'> = {}): void {
    this.httpClient.post<NameEntity>('/names/me', name).pipe(catchError((error: any) => {
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
    })).subscribe((name: NameEntity) => {
      if (onSuccess) {
        onSuccess();
      }
    });
  }

}
