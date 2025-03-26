import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../model/user';
import { APIResponse } from '../../model/api/apiResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://projectapi.gerasim.in/api/UserApp/"
  private httpClient = inject(HttpClient);
  private router = inject(Router);

  constructor() { }

  login(user: User) {
    return this.httpClient.post<APIResponse<User>>(`${this.apiUrl}login`, user);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('authToken');
  }

  logout() {
    sessionStorage.removeItem('authToken');
    this.router.navigateByUrl('login');
  }
}
