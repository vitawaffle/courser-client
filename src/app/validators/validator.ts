import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';

export interface Validator {
    getValidator(...args: any[]): ValidatorFn | AsyncValidatorFn;
}
