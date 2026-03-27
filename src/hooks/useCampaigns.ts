import { useEffect, useState } from 'react';
import { listCampaigns } from '@/services/campaigns';
import type { Campaign } from '@/types/domain';

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await listCampaigns();
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

  return { campaigns, loading };
}
