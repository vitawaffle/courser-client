import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
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

  isLoading = false;

  passwordControl: AbstractControl = this.formBuilder.control(
    '',
    [
      Validators.required,
      this.passwordValidator.getValidator()
    ],
  );

  signinForm = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ],
      [this.uniqueEmailValidator.getValidator()]
    ],
    password: this.passwordControl,
    confirmedPassword: [
      '',
      [
        Validators.required,
        this.equalsValidator.getValidator(this.passwordControl, 'passwordMismatch')
      ],
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

  get isEmailInvalid() {
    return this.isInvalid(this.emailControl);
  }

  get isPasswordInvalid() {
    return this.isInvalid(this.passwordControl);
  }

  get isConfirmedPasswordInvalid() {
    return this.isInvalid(this.confirmedPasswordControl);
  }

  get isSigninFormInvalid() {
    return this.signinForm.invalid;
  }

  isInvalid(control: AbstractControl) {
    return this.formUtil.isControlInvalid(control);
  }

  signin() {
    this.isLoading = true;

    this.authService.signin(this.signinForm.value)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(() => this.authService.checkAuth().subscribe(() => this.router.navigateByUrl('/home')));
  }

}
