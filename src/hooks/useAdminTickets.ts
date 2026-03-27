import { useEffect, useState } from 'react';
import { listAdminTickets } from '@/services/admin';
import type { AdminTicket } from '@/types/domain';

export function useAdminTickets() {
  const [tickets, setTickets] = useState<AdminTicket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await listAdminTickets();
        if (active) setTickets(data);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return { tickets, loading };
}
