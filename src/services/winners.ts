import { winners as mockWinners } from '@/data/winners';
import { getSupabaseClient } from '@/lib/supabase/client';
import { mapWinnerRow } from '@/lib/supabase/mappers';
import type { Winner } from '@/types/domain';

export async function listWinners(): Promise<Winner[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return mockWinners;
  }

  const { data, error } = await supabase
    .from('winners')
    .select('id, campaign_id, campaign_title, winner_name, city, state, winning_ticket, draw_date, prize_description, image')
    .order('draw_date', { ascending: false });

  if (error || !data) {
    console.warn('Falling back to mock winners:', error?.message);
    return mockWinners;
  }

  return data.map(mapWinnerRow);
}
