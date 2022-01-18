import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
    name: 'auth',
})
export class AuthPipe implements PipeTransform {

    constructor(private httpClient: HttpClient, private domSanitizer: DomSanitizer) { }

    transform(src: string): Observable<SafeUrl> {
        return this.httpClient.get(src, {
            responseType: 'blob',
        }).pipe(map((image: Blob) => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(image))));
    }

}
