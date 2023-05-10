import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {concatMap} from 'rxjs';

import {Login, Signup} from '../../models/Auth.model';
import {FormValidator} from '../../custom-validators/form.validator';
import {ValidationMessages} from '../../../../shared/constants/validation.contants';

import {ROUTE} from '../../../../shared/constants/index';
import {ECommerceDataService} from 'src/app/shared/services/e-commerce-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone : true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule , RouterModule]
})
export class SignupComponent implements OnInit {
  readonly ValidationMessages = ValidationMessages;

  signupForm: FormGroup = this.fb.group(
    {
      email: this.fb.control('', [Validators.required, Validators.email]),
      firstName: this.fb.control('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: this.fb.control('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      confirmPassword: this.fb.control('', [Validators.required]),
    },
    {
      updateOn: 'blur',
      validators: [FormValidator.validatePassword],
    },
  );
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private route: Router,
    private ecd: ECommerceDataService,
  ) {}

  ngOnInit(): void {
    const token = this.ecd.getTokenFromLocalStorage();
    if (token !== '' && token !== null) {
      this.route.navigate([ROUTE.dashboard]);
    }
  }

  submit({valid}: {valid: boolean}): void {
    this.signupForm.markAllAsTouched();

    if (valid) {
      this.authService
        .signupUsingEmailPassword(this.signupForm.value as Signup)
        .pipe(
          concatMap(() => {
            return this.authService.loginUsingEmailPassword(
              this.signupForm.value as Login,
            );
          }),
        )
        .subscribe(
          (response) => {
            this.authService.storeTokenInLocalStorage(response.token);
            this.route.navigate([ROUTE.dashboard]);
            this.signupForm.reset();
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
      this.signupForm.get(fieldName)?.invalid &&
      this.signupForm.get(fieldName)?.touched
    );
  }

  hasError(fieldName: string, validationType: string): boolean {
    return this.signupForm.get(fieldName)?.errors?.[validationType];
  }
}
