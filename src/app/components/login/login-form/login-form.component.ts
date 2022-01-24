import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { FormUtil } from 'src/app/utils/form.util';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  isLoading = false;

  isInvalidCredentials = false;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private formUtil: FormUtil,
    private authService: AuthService
  ) { }

  get emailControl(): AbstractControl {
    return this.loginForm.controls.email;
  }

  get passwordControl(): AbstractControl {
    return this.loginForm.controls.password;
  }

  get isEmailInvalid() {
    return this.formUtil.isControlInvalid(this.emailControl);
  }

  get isPasswordInvalid() {
    return this.formUtil.isControlInvalid(this.passwordControl);
  }

  get isLoginFormInvalid() {
    return this.loginForm.invalid;
  }

  login() {
    this.isInvalidCredentials = false;
    this.isLoading = true;

    this.authService.login(this.loginForm.value).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.isInvalidCredentials = true;
        }

        throw error;
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(() => this.authService.checkAuth().subscribe(() => this.router.navigateByUrl('/home')));
  }

}
