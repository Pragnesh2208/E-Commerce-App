import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {Login} from '../../models/Auth.model';

import {ValidationMessages} from 'src/app/shared/constants/validation.contants';
import {ECommerceDataService} from 'src/app/shared/services/e-commerce-data.service';
import {Router, RouterModule} from '@angular/router';

import {ROUTE} from '../../../../shared/constants/index';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone : true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule , RouterModule]
  
})
export class LoginComponent implements OnInit {
  readonly ValidationMessages = ValidationMessages;
  readonly routePath = ROUTE;

  loginForm: FormGroup = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required]),
  });
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private ecd: ECommerceDataService,
    private route: Router,
  ) {}

  ngOnInit(): void {
    const token = this.ecd.getTokenFromLocalStorage();
    if (token !== '' && token !== null) {
      this.route.navigate([ROUTE.dashboard]);
    }
  }

  submit({valid}: {valid: boolean}): void {
    this.loginForm.markAllAsTouched();

    if (valid) {
      this.authService
        .loginUsingEmailPassword(this.loginForm.value as Login)
        .subscribe(
          (response) => {
            this.authService.storeTokenInLocalStorage(response.token);
            this.route.navigate([ROUTE.dashboard]);
            this.loginForm.reset();
          },
          (e) => {
            this.errorMessage = e.error;

            setTimeout(() => {
              this.errorMessage = '';
            }, 2000);
          },
        );
    }
  }

  isFieldValid(fieldName: string): boolean {
    return !!(
      this.loginForm.get(fieldName)?.invalid &&
      this.loginForm.get(fieldName)?.touched
    );
  }

  hasError(fieldName: string, validationType: string): boolean {
    return this.loginForm.get(fieldName)?.errors?.[validationType];
  }
}
