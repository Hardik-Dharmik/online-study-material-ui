import { Component, signal, OnInit, inject } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseSingleton } from 'src/app/classes/Supabase';
import { NgxSpinnerService } from "ngx-spinner";
import FingerprintJS from '@fingerprintjs/fingerprintjs';

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
    if (error) {
      console.error('Login error:', error);
      return;
    }
    const deviceId = await this.getDeviceId();
    const { data: sessions, error: sessionError } = await this.supabase
      .from('sessions')
      .select('device_id')
      .eq('user_id', data.user.id);

    if (sessionError) {
      console.error('Error fetching sessions:', sessionError);
      return;
    }

    if (sessions && sessions.some((session: any) => session.device_id === deviceId)) {
      localStorage.setItem("user", JSON.stringify(data));
      console.log('Login successful!');
      this.spinner.hide('full');
      this.router.navigate(['/dashboard']);
    } else {
      console.log('Login denied: Different device detected.');
      // Handle denied login
    }
  }

  gotoSignUp() {
    this.router.navigate(['/signup']);
  }

  async getDeviceId() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
  }
}
