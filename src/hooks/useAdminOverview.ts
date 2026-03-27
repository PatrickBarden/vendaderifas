import { useEffect, useState } from 'react';
import { getAdminOverview } from '@/services/admin';
import type { AdminOverview } from '@/types/domain';

export function useAdminOverview() {
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await getAdminOverview();
        if (active) {
          setOverview(data);
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
  }, []);

  return { overview, loading };
}
