import { getSupabaseClient } from '@/lib/supabase/client';
import { getUserRole } from '@/services/admin';
import type { AppRole } from '@/types/domain';

interface SignInResult {
  user: unknown;
  fallback: boolean;
  role: AppRole;
  redirectTo: '/admin' | '/dashboard';
}

const STORAGE_KEY = 'bruno-pickups-role';

export function persistUserRole(role: AppRole) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, role);
  }
}

export function getPersistedUserRole(): AppRole | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === 'admin' || value === 'customer' ? value : null;
}

export function clearPersistedUserRole() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

export async function resolveCurrentUserRole(): Promise<AppRole> {
  const persisted = getPersistedUserRole();
  if (persisted) {
    return persisted;
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return 'customer';
  }

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const role = await getUserRole(session?.user);
    persistUserRole(role);
    return role;
  } catch {
    return 'customer';
  }
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    const role: AppRole = email.toLowerCase().includes('admin') ? 'admin' : 'customer';
    return { user: null, fallback: true, role, redirectTo: role === 'admin' ? '/admin' : '/dashboard' } satisfies SignInResult;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  const role = await getUserRole(data.user);
  persistUserRole(role);

  return {
    user: data.user,
    fallback: false,
    role,
    redirectTo: role === 'admin' ? '/admin' : '/dashboard',
  } satisfies SignInResult;
}
