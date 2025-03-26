import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login/login.service';
import { APIResponse, LoginResponseData } from '../../model/apiResponse';
import { User } from '../../model/user';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private loginService = inject(LoginService);
  router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  usernameField = this.loginForm.controls['username'];
  passwordField = this.loginForm.controls['password'];
  invalidCredentials = false;

  login() {
    this.loginService.login({ emailId: this.usernameField.value, password: this.passwordField.value }).subscribe((response: APIResponse<User>) => {
      if (response.result) {
        sessionStorage.setItem('authToken', (response.data as LoginResponseData).token)
        this.router.navigateByUrl('dashboard');
      }
    },
      (error: any) => {
        this.invalidCredentials = true;
      });
  }
}
