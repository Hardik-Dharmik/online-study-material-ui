import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseSingleton } from 'src/app/classes/Supabase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  supabase: SupabaseClient;

  constructor() {
    this.supabase = SupabaseSingleton.getInstance();
  }

  async isSuperAdmin() {
    const { data: { user } } = await this.supabase.auth.getUser();
    if (!user) return false;
    return user.app_metadata?.['role']?.includes('super-admin');
  }


}
