import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, catchError } from 'rxjs/operators';
import { HandlingArguments } from './handling-arguments';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private httpClient: HttpClient) { }

  storeAvatar(avatarFile: File, {
    onSuccess,
    onFinal,
    onError,
  }: Pick<HandlingArguments, 'onSuccess' | 'onFinal' | 'onError'> = {}): void {
    const formData = new FormData();
    formData.append("file", avatarFile);

    this.httpClient.post('/avatars/me', formData).pipe(catchError((error: any) => {
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
