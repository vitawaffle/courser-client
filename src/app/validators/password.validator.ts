import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Validator } from './validator';
import { ConfigurationService } from '../services/configuration.service';

@Injectable({
    providedIn: 'root'
})
export class PasswordValidator implements Validator {

    constructor(private configurationService: ConfigurationService) { }

    getValidator(errorName: string = 'password'): AsyncValidatorFn {
        return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> =>
            this.configurationService.activePasswordRules.pipe(
                map(activePasswordRules => activePasswordRules.find(
                    rule => !rule.isValid(control.value)
                ) ? { [errorName]: true } : null)
            )
    }

}
