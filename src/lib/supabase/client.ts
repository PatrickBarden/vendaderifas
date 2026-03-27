import { createClient } from '@supabase/supabase-js';
import { hasSupabaseEnv } from '@/lib/env';

let client: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  if (!client) {
    client = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
  }

  return client;
}
