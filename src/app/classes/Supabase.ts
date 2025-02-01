import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

export class SupabaseSingleton {
    private static instance: SupabaseClient;

    public static getInstance(): SupabaseClient {
        if (!SupabaseSingleton.instance) {
            SupabaseSingleton.instance = createClient(environment.supabaseUrl, environment.supabaseKey);
        }
        return SupabaseSingleton.instance;
    }
}

