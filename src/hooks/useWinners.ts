import { useEffect, useState } from 'react';
import { listWinners } from '@/services/winners';
import type { Winner } from '@/types/domain';

export function useWinners() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await listWinners();
        if (active) {
          setWinners(data);
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

  return { winners, loading };
}
