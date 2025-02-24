import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  usernameField = this.loginForm.controls['username'];
  passwordField = this.loginForm.controls['password'];
  router = inject(Router);
  invalidCredentials = false;

  login() {
    if (this.usernameField.value === 'admin' && this.passwordField.value === 'Admin12') {
      this.router.navigateByUrl('dashboard')

      return;
    }

    this.invalidCredentials = true;
  }
}
