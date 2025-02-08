import { CanActivateFn, Router } from '@angular/router';
import { SupabaseSingleton } from '../classes/Supabase';
import { inject } from '@angular/core';
import { User } from '@supabase/supabase-js';

export const adminGuard: CanActivateFn = async (route, state) => {
    const supabase = SupabaseSingleton.getInstance();
    const router = inject(Router);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        router.navigate(['/login']);
        return false;
    }

    if (!isSuperAdmin(user)) {
        router.navigate(['/dashboard']);
        return false;
    }

    return true;
};

export function isSuperAdmin(user: User): boolean {
    return user.app_metadata?.['role']?.includes('super-admin');
}