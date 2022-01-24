import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { FormUtil } from 'src/app/utils/form.util';

@Component({
  selector: '[app-invalid-feedback]',
  templateUrl: './invalid-feedback.component.html',
  styleUrls: ['./invalid-feedback.component.scss']
})
export class InvalidFeedbackComponent {

  @Input()
  control: AbstractControl = this.formBuilder.control('');

  @Input()
  errorName = '';

  constructor(private formBuilder: FormBuilder, private formUtil: FormUtil) { }

  get isShown() {
    return this.formUtil.isControlInvalid(this.control) && this.control.hasError(this.errorName);
  }

}
