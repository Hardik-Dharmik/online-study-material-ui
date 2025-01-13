import { Component, signal } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { LoginCredentials } from '../login-form/login-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
private supabase: SupabaseClient;
  
  signUpForm!: UntypedFormGroup;
  errorMessage = signal('');

  constructor(
    private router: Router,
  ) {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
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

  async signUp(){
    if(this.signUpForm.invalid) {
      return;
    }

    const { data, error } = await this.supabase.auth.signUp(this.signUpForm.getRawValue() as LoginCredentials);    
  }

  async login() {
    if (this.signUpForm.invalid) {
      return;
    }

    const { data, error } = await this.supabase.auth.signInWithPassword(this.signUpForm.getRawValue() as LoginCredentials);

    console.log(data, error);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
