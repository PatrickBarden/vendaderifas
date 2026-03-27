import type { Campaign, Winner } from '@/types/domain';

interface CampaignRow {
  id: string;
  code: string;
  title: string;
  short_description: string;
  description: string;
  category: Campaign['category'];
  ticket_price: number;
  original_price: number | null;
  total_tickets: number;
  sold_tickets: number;
  hero_image: string;
  gallery: string[] | null;
  badge: string | null;
  draw_date: string;
}

interface WinnerRow {
  id: string;
  campaign_id: string;
  campaign_title: string;
  winner_name: string;
  city: string;
  state: string;
  winning_ticket: string;
  draw_date: string;
  prize_description: string;
  image: string;
}

export function mapCampaignRow(row: CampaignRow): Campaign {
  return {
    id: row.id,
    code: row.code,
    title: row.title,
    shortDescription: row.short_description,
    description: row.description,
    category: row.category,
    ticketPrice: row.ticket_price,
    originalPrice: row.original_price ?? undefined,
    totalTickets: row.total_tickets,
    soldTickets: row.sold_tickets,
    heroImage: row.hero_image,
    gallery: row.gallery ?? [],
    badge: row.badge ?? undefined,
    drawDate: row.draw_date,
  };
}

export function mapWinnerRow(row: WinnerRow): Winner {
  return {
    id: row.id,
    campaignId: row.campaign_id,
    campaignTitle: row.campaign_title,
    winnerName: row.winner_name,
    city: row.city,
    state: row.state,
    winningTicket: row.winning_ticket,
    drawDate: row.draw_date,
    prizeDescription: row.prize_description,
    image: row.image,
  };
}
