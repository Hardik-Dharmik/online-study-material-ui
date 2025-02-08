import { Component, signal, OnInit } from '@angular/core';
import {
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseSingleton } from 'src/app/classes/Supabase';


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

  constructor(
    private router: Router,
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

    const { data, error } = await this.supabase.auth.signInWithPassword(this.loginForm.getRawValue() as LoginCredentials);

    localStorage.setItem("user", JSON.stringify(data));

    if (!error) {
      this.router.navigate(['/dashboard']);
    }
  }

  gotoSignUp() {
    this.router.navigate(['/signup']);
  }
}
