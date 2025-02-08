import { CanActivateFn, Router } from '@angular/router';
import { SupabaseSingleton } from '../classes/Supabase';
import { inject } from '@angular/core';
import { User } from '@supabase/supabase-js';

export const authGuard: CanActivateFn = async (route, state) => {
  const supabase = SupabaseSingleton.getInstance();
  const router = inject(Router);

  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  console.log(user);
  return true;
};

function isSuperAdmin(user: User): boolean {
  return user.app_metadata?.['role']?.includes('super-admin');
}

