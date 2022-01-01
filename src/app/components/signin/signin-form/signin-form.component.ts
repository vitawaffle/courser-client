import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator } from '../../../validators/password.validator';
import { UniqueEmailValidator } from '../../../validators/unique-email.validator';
import { EqualsValidator } from 'src/app/validators/equals.validator';
import { FormUtil } from 'src/app/utils/form.util';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent {

  isLoading: boolean = false;

  passwordControl: AbstractControl = this.formBuilder.control(
    '',
    [Validators.required, this.passwordValidator.getValidator()]
  );

  signinForm: FormGroup = this.formBuilder.group({
    email: [
      '',
      [Validators.required, Validators.email],
      [this.uniqueEmailValidator.getValidator()]
    ],
    password: this.passwordControl,
    confirmedPassword: [
      '',
      [Validators.required, this.equalsValidator.getValidator(this.passwordControl, 'passwordMismatch')]
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private passwordValidator: PasswordValidator,
    private uniqueEmailValidator: UniqueEmailValidator,
    private equalsValidator: EqualsValidator,
    private formUtil: FormUtil,
    private authService: AuthService,
    private router: Router,
  ) { }

  get emailControl(): AbstractControl {
    return this.signinForm.controls.email;
  }

  get confirmedPasswordControl(): AbstractControl {
    return this.signinForm.controls.confirmedPassword;
  }

  get isEmailInvalid(): boolean {
    return this.isInvalid(this.emailControl);
  }

  get isPasswordInvalid(): boolean {
    return this.isInvalid(this.passwordControl);
  }

  get isConfirmedPasswordInvalid(): boolean {
    return this.isInvalid(this.confirmedPasswordControl);
  }

  get isSigninFormInvalid(): boolean {
    return this.signinForm.invalid;
  }

  isInvalid(control: AbstractControl): boolean {
    return this.formUtil.isControlInvalid(control);
  }

  signin(): void {
    this.isLoading = true;
    this.authService.signin(this.signinForm.value, {
      onSuccess: () => this.authService.checkAuth({
        onSuccess: () => this.router.navigateByUrl('/home')
      }),
      onFinal: () => this.isLoading = false,
    });
  }

}
