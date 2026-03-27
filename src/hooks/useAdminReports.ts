import { useEffect, useState } from 'react';
import { getAdminReports } from '@/services/admin';
import type { AdminReportCard, AdminReportInsight } from '@/types/domain';

export function useAdminReports() {
  const [cards, setCards] = useState<AdminReportCard[]>([]);
  const [insights, setInsights] = useState<AdminReportInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await getAdminReports();
        if (active) {
          setCards(data.cards);
          setInsights(data.insights);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return { cards, insights, loading };
}
