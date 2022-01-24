import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Validator } from './validator';
import { EmailService } from '../services/email.service';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class UniqueEmailValidator implements Validator {

    constructor(private emailService: EmailService) { }

    getValidator(errorName = 'unique'): AsyncValidatorFn {
        return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> =>
            this.emailService.exists(control.value).pipe(
                map(isExists => (isExists ? { [errorName]: true } : null)),
                catchError(() => of(null))
            );
    }

}
