import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getPersistedUserRole, resolveCurrentUserRole } from '@/services/auth';
import type { AppRole } from '@/types/domain';

interface RequireRoleProps {
  allowed: AppRole[];
  redirectTo: string;
}

export function RequireRole({ allowed, redirectTo }: RequireRoleProps) {
  const [role, setRole] = useState<AppRole | null>(() => getPersistedUserRole());
  const [loading, setLoading] = useState(role === null);

  useEffect(() => {
    if (role !== null) {
      return;
    }

    let active = true;

    async function load() {
      try {
        const resolvedRole = await resolveCurrentUserRole();
        if (active) {
          setRole(resolvedRole);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [role]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#151515] text-white flex items-center justify-center">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">Validando acesso...</p>
      </div>
    );
  }

  if (!role || !allowed.includes(role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
