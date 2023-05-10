import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

import {Login} from '../models/Auth.model';
import {Signup} from '../models/Auth.model';
import {LoginResponse} from '../models/Auth.model';
import {SignupResponse} from '../models/Auth.model';

import {API} from '../../../shared/constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  storeTokenInLocalStorage(token: string): void {
    return localStorage.setItem('token', token);
  }

  loginUsingEmailPassword(loginCredentials: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API.loginAPI, loginCredentials);
  }

  signupUsingEmailPassword(
    signupCredentials: Signup,
  ): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(API.signupAPI, signupCredentials);
  }
}
