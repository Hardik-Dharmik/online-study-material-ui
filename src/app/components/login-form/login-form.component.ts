import { Component, signal } from '@angular/core';
import {
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

export type LoginCredentials = {
  email: string;
  password: string;
};

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loginForm!: UntypedFormGroup;
  errorMessage = signal('');

  ngOnInit() {
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new UntypedFormControl('', [Validators.required]),
    });
  }

  getEmailErrorMessage() {
    if (this.loginForm.get('email')?.hasError('required')) {
      return 'Email is required';
    }

    return this.loginForm.get('email')?.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.loginForm.get('pass')?.hasError('required')) {
      return 'You must enter a value';
    }

    return 'Password is required';
  }
}
