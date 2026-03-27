import { getSupabaseClient } from '@/lib/supabase/client';

export async function signInWithEmail(email: string, password: string) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return { user: null, fallback: true };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return { user: data.user, fallback: false };
}
