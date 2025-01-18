import { Component } from '@angular/core';
// import { SupabaseAuthService } from 'src/app/services/supabase/supabase-auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(
    // private supabaseAuthService: SupabaseAuthService
  ) {
  }

  logout() {
    // this.supabaseAuthService.signOut();
  }
}
