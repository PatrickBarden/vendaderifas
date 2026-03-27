import { useEffect, useState } from 'react';
import { getCampaign } from '@/services/campaigns';
import type { Campaign } from '@/types/domain';

export function useCampaign(id?: string) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await getCampaign(id);
        if (active) {
          setCampaign(data);
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
  }, [id]);

  return { campaign, loading };
}
