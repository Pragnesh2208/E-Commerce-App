import {FormGroup} from '@angular/forms';

export class FormValidator {
  static validatePassword(control: FormGroup) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    const passwordDoNotMatch =
      confirmPassword != '' && password != confirmPassword;
    return passwordDoNotMatch ? {passwordDoNotMatch: passwordDoNotMatch} : null;
  }
}
