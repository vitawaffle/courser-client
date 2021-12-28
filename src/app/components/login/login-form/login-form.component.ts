import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormUtil } from '../../../utils/form.util';
import { AuthService } from '../../../services/auth.service';

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

  get emailControl() {
    return this.loginForm.controls.email;
  }

  get passwordControl() {
    return this.loginForm.controls.password;
  }

  get isEmailInvalid() {
    return this.formUtil.isControlInvalid(this.emailControl);
  }

  get isPasswordInvalid() {
    return this.formUtil.isControlInvalid(this.passwordControl);
  }

  login() {
    this.isInvalidCredentials = false;
    this.isLoading = true;
    this.authService.login(
      this.loginForm.value,
      () => this.authService.checkAuth(() => this.router.navigateByUrl('/home')),
      () => this.isInvalidCredentials = true,
      () => this.isLoading = false
    );
  }

}
