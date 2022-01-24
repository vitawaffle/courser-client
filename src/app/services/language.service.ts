import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageEntity } from '../entities/language.entity';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private httpClient: HttpClient) { }

  getAllLanguages(): Observable<LanguageEntity[]> {
    return this.httpClient.get<LanguageEntity[]>('/languages');
  }

  getLanguageNameByCode(code: string) {
    let name: string;
    switch (code) {
      case 'en':
        name = 'English';
        break;
      case 'ru':
        name = 'Russian';
        break;
      default:
        name = code;
    }
    return name;
  }

}
