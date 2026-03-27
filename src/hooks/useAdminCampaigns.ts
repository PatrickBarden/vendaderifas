import { useEffect, useState, useCallback } from 'react';
import { listAdminCampaigns } from '@/services/admin';
import type { AdminCampaign } from '@/types/domain';

export function useAdminCampaigns() {
  const [campaigns, setCampaigns] = useState<AdminCampaign[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCampaigns = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listAdminCampaigns();
      setCampaigns(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await listAdminCampaigns();
        if (active) {
          setCampaigns(data);
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

  return { campaigns, loading, refetch: loadCampaigns };
}
