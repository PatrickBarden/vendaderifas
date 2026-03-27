import { campaigns as mockCampaigns } from '@/data/campaigns';
import { getSupabaseClient } from '@/lib/supabase/client';
import { mapCampaignRow } from '@/lib/supabase/mappers';
import type { Campaign } from '@/types/domain';

export async function listCampaigns(): Promise<Campaign[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return mockCampaigns;
  }

  try {
    const { data, error } = await supabase
      .from('campaigns')
      .select(
        'id, code, title, short_description, description, category, ticket_price, original_price, total_tickets, sold_tickets, hero_image, gallery, badge, draw_date',
      )
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn('Falling back to mock campaigns:', error?.message ?? 'No campaigns returned from Supabase.');
      return mockCampaigns;
    }

    return data.map(mapCampaignRow);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Supabase error';
    console.warn('Falling back to mock campaigns:', message);
    return mockCampaigns;
  }
}

export async function getCampaign(id?: string): Promise<Campaign> {
  const items = await listCampaigns();
  return items.find((campaign) => campaign.id === id) ?? items[0];
}
