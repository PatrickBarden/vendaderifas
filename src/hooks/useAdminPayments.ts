import { useEffect, useState } from 'react';
import { listAdminPayments } from '@/services/admin';
import type { AdminPaymentRow } from '@/types/domain';

export function useAdminPayments() {
  const [payments, setPayments] = useState<AdminPaymentRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await listAdminPayments();
        if (active) setPayments(data);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return { payments, loading };
}
