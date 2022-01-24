import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvatarDTO } from '../dto/avatar.dto';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private httpClient: HttpClient) { }

  getAllAvatars(): Observable<AvatarDTO[]> {
    return this.httpClient.get<AvatarDTO[]>('/avatars/me');
  }

  storeAvatar(avatarFile: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", avatarFile);

    return this.httpClient.post('/avatars/me', formData);
  }

  deleteCurrentAvatar(): Observable<any> {
    return this.httpClient.delete('/avatars/me/current');
  }

  deleteAvatarById(id: number): Observable<any> {
    return this.httpClient.delete(`/avatars/me/${id}`);
  }

}
