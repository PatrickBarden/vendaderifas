import { winners as mockWinners } from '@/data/winners';
import { getSupabaseClient } from '@/lib/supabase/client';
import { mapWinnerRow } from '@/lib/supabase/mappers';
import type { Winner } from '@/types/domain';

export async function listWinners(): Promise<Winner[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return mockWinners;
  }

  try {
    const { data, error } = await supabase
      .from('winners')
      .select('id, campaign_id, campaign_title, winner_name, city, state, winning_ticket, draw_date, prize_description, image')
      .order('draw_date', { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn('Falling back to mock winners:', error?.message ?? 'No winners returned from Supabase.');
      return mockWinners;
    }

    return data.map(mapWinnerRow);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Supabase error';
    console.warn('Falling back to mock winners:', message);
    return mockWinners;
  }
}
