import { useEffect, useState } from 'react';
import { listAdminUsers } from '@/services/admin';
import type { AdminUserRow } from '@/types/domain';

export function useAdminUsers() {
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await listAdminUsers();
        if (active) setUsers(data);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return { users, loading };
}
