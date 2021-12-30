import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Validator } from './validator';

@Injectable({
    providedIn: 'root'
})
export class EqualsValidator implements Validator {

    getValidator(equalsTo: AbstractControl, errorName: string = 'valueMismatch'): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return control.value !== equalsTo.value
                ? { [errorName]: true }
                : null;
        }
    }

}
