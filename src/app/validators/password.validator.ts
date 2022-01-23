import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Validator } from './validator';
import { ConfigurationService } from '../services/configuration.service';

@Injectable({
    providedIn: 'root'
})
export class PasswordValidator implements Validator {

    constructor(private configurationService: ConfigurationService) { }

    getValidator(errorName: string = 'password'): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null =>
            this.configurationService.activePasswordRules.find(rule => !rule.isValid(control.value))
                ? { [errorName]: true }
                : null;
    }

}
