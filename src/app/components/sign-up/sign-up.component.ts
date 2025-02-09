import { Component, signal, OnInit, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { LoginCredentials } from '../login-form/login-form.component';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseSingleton } from 'src/app/classes/Supabase';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm!: UntypedFormGroup;
  errorMessage = signal('');
  supabase: SupabaseClient;

  spinner = inject(NgxSpinnerService);
  router = inject(Router);
  _snackBar = inject(MatSnackBar);

  constructor() {
    this.supabase = SupabaseSingleton.getInstance();

  }

  ngOnInit() {
    this.signUpForm = new UntypedFormGroup({
      email: new UntypedFormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new UntypedFormControl('', [Validators.required]),
    });
  }

  getEmailErrorMessage() {
    if (this.signUpForm.get('email')?.hasError('required')) {
      return 'Email is required';
    }

    return this.signUpForm.get('email')?.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.signUpForm.get('pass')?.hasError('required')) {
      return 'You must enter a value';
    }

    return 'Password is required';
  }

  async signUp() {
    if (this.signUpForm.invalid) {
      return;
    }

    this.spinner.show('full');

    const redirectURL = environment.url + "login";
    const { data, error } = await this.supabase.auth.signUp({
      ...this.signUpForm.getRawValue() as LoginCredentials, options: {
        emailRedirectTo: redirectURL
      }
    });


    if (!error) {
      this.spinner.hide('full');
      this._snackBar.open("Confirmation link is sent on email", "Ok");
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
