export type CampaignCategory = 'pickup' | 'car' | 'cash';

export interface Campaign {
  id: string;
  code: string;
  title: string;
  shortDescription: string;
  description: string;
  category: CampaignCategory;
  ticketPrice: number;
  originalPrice?: number;
  totalTickets: number;
  soldTickets: number;
  heroImage: string;
  gallery: string[];
  badge?: string;
  drawDate: string;
}

export interface Winner {
  id: string;
  campaignId: string;
  campaignTitle: string;
  winnerName: string;
  city: string;
  state: string;
  winningTicket: string;
  drawDate: string;
  prizeDescription: string;
  image: string;
}
