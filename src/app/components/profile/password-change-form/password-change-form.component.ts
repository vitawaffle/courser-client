import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { catchError, finalize } from 'rxjs/operators';
import { PasswordValidator } from 'src/app/validators/password.validator';
import { EqualsValidator } from 'src/app/validators/equals.validator';
import { FormUtil } from 'src/app/utils/form.util';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-change-form',
  templateUrl: './password-change-form.component.html',
  styleUrls: ['./password-change-form.component.scss']
})
export class PasswordChangeFormComponent {

  isLoading = false;

  isInvalidCredentials = false;

  isSuccessAlertShown = false;

  newPasswordControl: AbstractControl = this.formBuilder.control(
    '',
    [
      Validators.required,
      this.passwordValidator.getValidator(),
    ],
  );

  passwordChangeForm = this.formBuilder.group({
    oldPassword: [
      '',
      [Validators.required],
    ],
    newPassword: this.newPasswordControl,
    confirmedPassword: [
      '',
      [
        Validators.required,
        this.equalsValidator.getValidator(this.newPasswordControl, 'passwordMismatch'),
      ],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private passwordValidator: PasswordValidator,
    private equalsValidator: EqualsValidator,
    private formUtil: FormUtil,
    private authService: AuthService,
  ) { }

  get oldPasswordControl(): AbstractControl {
    return this.passwordChangeForm.controls.oldPassword;
  }

  get confirmedPasswordControl(): AbstractControl {
    return this.passwordChangeForm.controls.confirmedPassword;
  }

  get isOldPasswordInvalid() {
    return this.isInvalid(this.oldPasswordControl);
  }

  get isNewPasswordInvalid() {
    return this.isInvalid(this.newPasswordControl);
  }

  get isConfirmedPasswordInvalid() {
    return this.isInvalid(this.confirmedPasswordControl);
  }

  get isPasswordChangeFormInvalid() {
    return this.passwordChangeForm.invalid;
  }

  isInvalid(control: AbstractControl) {
    return this.formUtil.isControlInvalid(control);
  }

  changePassword() {
    this.isLoading = true;
    this.isInvalidCredentials = false;

    this.authService.changePassword({
      oldPassword: this.oldPasswordControl.value,
      newPassword: this.newPasswordControl.value,
    }).pipe(catchError(error => {
      if (error.status === 400) {
        this.isInvalidCredentials = true;
      }

      throw error;
    }), finalize(() => this.isLoading = false)).subscribe(() => {
      this.isSuccessAlertShown = true;
      setTimeout(() => this.isSuccessAlertShown = false, 5000);

      this.passwordChangeForm.reset();
    });
  }

}
