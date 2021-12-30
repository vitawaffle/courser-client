import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FormUtil } from '../../../utils/form.util';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  isLoading: boolean = false;

  isInvalidCredentials: boolean = false;

  loginForm: FormGroup = this.formBuilder.group({
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

  get isEmailInvalid(): boolean {
    return this.formUtil.isControlInvalid(this.emailControl);
  }

  get isPasswordInvalid(): boolean {
    return this.formUtil.isControlInvalid(this.passwordControl);
  }

  login(): void {
    this.isInvalidCredentials = false;
    this.isLoading = true;
    this.authService.login(this.loginForm.value, {
      onSuccess: () => this.authService.checkAuth({
        onSuccess: () => this.router.navigateByUrl('/home')
      }),
      onUnauthorized: () => this.isInvalidCredentials = true,
      onFinal: () => this.isLoading = false
    });
  }

}
