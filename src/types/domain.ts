export type CampaignCategory = 'pickup' | 'car' | 'cash';
export type AppRole = 'admin' | 'customer';
export type AdminCampaignStatus = 'active' | 'draft' | 'completed';

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

export interface AdminMetric {
  title: string;
  value: string;
  delta: string;
  trend: 'up' | 'down' | 'stable';
  tone: 'primary' | 'accent' | 'warning' | 'neutral';
}

export interface AdminRevenuePoint {
  day: string;
  value: number;
  highlight?: boolean;
}

export interface AdminHighlight {
  title: string;
  image: string;
  progress: number;
  soldTickets: number;
  totalTickets: number;
  badge: string;
}

export interface AdminRecentPayment {
  id: string;
  customerName: string;
  customerEmail: string;
  campaignTitle: string;
  amount: number;
  createdAtLabel: string;
  status: 'completed' | 'pending';
  initials: string;
}

export interface AdminOverview {
  metrics: AdminMetric[];
  revenueSeries: AdminRevenuePoint[];
  highlight: AdminHighlight;
  recentPayments: AdminRecentPayment[];
}

export interface AdminCampaign {
  id: string;
  code: string;
  title: string;
  image: string;
  soldTickets: number;
  totalTickets: number;
  revenue: number;
  status: AdminCampaignStatus;
  trendLabel: string;
  note: string;
}

export interface AdminTicket {
  id: string;
  ticketNumber: string;
  campaignTitle: string;
  customerName: string;
  customerEmail: string;
  reservedAtLabel: string;
  paymentStatus: 'completed' | 'pending';
  channel: string;
}

export interface AdminPaymentRow {
  id: string;
  customerName: string;
  customerEmail: string;
  campaignTitle: string;
  amount: number;
  method: string;
  status: 'completed' | 'pending' | 'failed';
  createdAtLabel: string;
}

export interface AdminUserRow {
  id: string;
  fullName: string;
  email: string;
  role: AppRole;
  city: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
}

export interface AdminReportCard {
  id: string;
  title: string;
  value: string;
  subtitle: string;
}

export interface AdminReportInsight {
  id: string;
  label: string;
  value: string;
  tone: 'primary' | 'warning' | 'neutral';
}
