import { Component, signal } from '@angular/core';
import {
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment'
import { Router } from '@angular/router';
import { SupabaseAuthService } from 'src/app/services/supabase/supabase-auth.service';


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
  private supabase: SupabaseClient;
  
  loginForm!: UntypedFormGroup;
  errorMessage = signal('');

  constructor(
    private router: Router,
    private supabaseAuthService: SupabaseAuthService
  ) {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

      this.supabaseAuthService.currentUser.subscribe((user) => {
        if (user) {
          this.router.navigateByUrl('/dashboard', { replaceUrl: true })
        }
      })
  }

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

  get email() {
    return this.loginForm.get('email') as UntypedFormControl;
  }

  get password() {
    return this.loginForm.get('password') as UntypedFormControl;
  }

  async signUp(){
    if(this.loginForm.invalid) {
      return;
    }

    const { data, error } = await this.supabase.auth.signUp(this.loginForm.getRawValue() as LoginCredentials);    
  }

  async login() {
    if (this.loginForm.invalid) {
      return;
    }

    const { data, error } = await this.supabase.auth.signInWithPassword(this.loginForm.getRawValue() as LoginCredentials);

    console.log(data, error);
  }

  gotoSignUp() {
    this.router.navigate(['/signup']);
  }
}
