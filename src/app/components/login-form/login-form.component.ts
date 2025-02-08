import { Component, signal, OnInit, inject } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseSingleton } from 'src/app/classes/Supabase';
import { NgxSpinnerService } from "ngx-spinner";


export interface LoginCredentials {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

  loginForm!: UntypedFormGroup;
  supabase: any;
  errorMessage = signal('');

  spinner = inject(NgxSpinnerService);
  router = inject(Router);

  constructor(
  ) {
  }

  ngOnInit() {
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new UntypedFormControl('', [Validators.required]),
    });
    this.supabase = SupabaseSingleton.getInstance();
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

  get email() {
    return this.loginForm.get('email') as UntypedFormControl;
  }

  get password() {
    return this.loginForm.get('password') as UntypedFormControl;
  }

  async login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show('full');

    const { data, error } = await this.supabase.auth.signInWithPassword(this.loginForm.getRawValue() as LoginCredentials);

    localStorage.setItem("user", JSON.stringify(data));

    if (!error) {
      this.spinner.hide('full');
      this.router.navigate(['/dashboard']);
    }
  }

  gotoSignUp() {
    this.router.navigate(['/signup']);
  }
}
