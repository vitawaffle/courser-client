import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormUtil {

    isControlInvalid(control: AbstractControl) {
        return (control.dirty || control.touched) && control.invalid;
    }

}
