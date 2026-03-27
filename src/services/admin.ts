import { adminCampaignsMock, adminOverviewMock, adminPaymentsMock, adminReportCardsMock, adminReportInsightsMock, adminTicketsMock, adminUsersMock } from '@/data/admin';
import { getSupabaseClient } from '@/lib/supabase/client';
import { formatCurrency } from '@/lib/formatters';
import type { AdminCampaign, AdminCampaignStatus, AdminOverview, AdminPaymentRow, AdminReportCard, AdminReportInsight, AdminTicket, AdminUserRow, AppRole } from '@/types/domain';

function formatRelativeTime(value?: string | null) {
  if (!value) {
    return 'Agora mesmo';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Agora mesmo';
  }

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.max(Math.floor(diffMs / 60000), 0);

  if (diffMinutes < 1) {
    return 'Agora mesmo';
  }

  if (diffMinutes < 60) {
    return `Ha ${diffMinutes} min`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return diffHours === 1 ? 'Ha 1 hora' : `Ha ${diffHours} horas`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return diffDays === 1 ? 'Ha 1 dia' : `Ha ${diffDays} dias`;
}

function getInitials(name?: string | null) {
  return String(name ?? 'CL')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function resolveRoleFromUser(user: { app_metadata?: Record<string, unknown>; user_metadata?: Record<string, unknown> } | null | undefined): AppRole {
  const metadataRole = user?.app_metadata?.role ?? user?.user_metadata?.role;
  return metadataRole === 'admin' ? 'admin' : 'customer';
}

export async function getUserRole(user: { id?: string; email?: string; app_metadata?: Record<string, unknown>; user_metadata?: Record<string, unknown> } | null | undefined): Promise<AppRole> {
  if (!user) {
    return 'customer';
  }

  const metadataRole = resolveRoleFromUser(user);
  if (metadataRole === 'admin') {
    return metadataRole;
  }

  const supabase = getSupabaseClient();
  if (!supabase || !user.id) {
    return user.email?.toLowerCase().includes('admin') ? 'admin' : 'customer';
  }

  try {
    const { data, error } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle();
    if (!error && data?.role === 'admin') {
      return 'admin';
    }
  } catch {
    return user.email?.toLowerCase().includes('admin') ? 'admin' : 'customer';
  }

  return user.email?.toLowerCase().includes('admin') ? 'admin' : 'customer';
}

export async function getAdminOverview(): Promise<AdminOverview> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return adminOverviewMock;
  }

  try {
    const [metricsResult, revenueResult, featuredResult, paymentsResult] = await Promise.all([
      supabase.from('admin_dashboard_metrics').select('*').maybeSingle(),
      supabase.from('admin_revenue_daily_7d').select('*').order('bucket_date', { ascending: true }),
      supabase.from('admin_featured_campaign').select('*').limit(1).maybeSingle(),
      supabase.from('admin_recent_payments').select('*').limit(4),
    ]);

    if (metricsResult.error || revenueResult.error || featuredResult.error || paymentsResult.error || !metricsResult.data) {
      return adminOverviewMock;
    }

    return {
      metrics: [
        {
          title: 'Vendas Totais',
          value: formatCurrency(Number(metricsResult.data.total_sales ?? 0)),
          delta: `${Number(metricsResult.data.total_sales_growth_pct ?? 0) >= 0 ? '+' : ''}${Number(metricsResult.data.total_sales_growth_pct ?? 0).toFixed(1)}%`,
          trend: Number(metricsResult.data.total_sales_growth_pct ?? 0) === 0 ? 'stable' : Number(metricsResult.data.total_sales_growth_pct ?? 0) > 0 ? 'up' : 'down',
          tone: 'primary',
        },
        {
          title: 'Usuarios Ativos',
          value: String(metricsResult.data.total_users ?? 0),
          delta: `${Number(metricsResult.data.user_growth_pct ?? 0) >= 0 ? '+' : ''}${Number(metricsResult.data.user_growth_pct ?? 0).toFixed(1)}%`,
          trend: Number(metricsResult.data.user_growth_pct ?? 0) === 0 ? 'stable' : Number(metricsResult.data.user_growth_pct ?? 0) > 0 ? 'up' : 'down',
          tone: 'accent',
        },
        {
          title: 'Campanhas Ativas',
          value: String(metricsResult.data.active_campaigns ?? 0),
          delta: Number(metricsResult.data.active_campaigns_delta ?? 0) === 0 ? 'Estavel' : `${Number(metricsResult.data.active_campaigns_delta ?? 0) > 0 ? '+' : ''}${Number(metricsResult.data.active_campaigns_delta ?? 0)}`,
          trend: Number(metricsResult.data.active_campaigns_delta ?? 0) === 0 ? 'stable' : Number(metricsResult.data.active_campaigns_delta ?? 0) > 0 ? 'up' : 'down',
          tone: 'warning',
        },
        {
          title: 'Receita Mensal',
          value: formatCurrency(Number(metricsResult.data.monthly_revenue ?? 0)),
          delta: `${Number(metricsResult.data.monthly_revenue_growth_pct ?? 0) >= 0 ? '+' : ''}${Number(metricsResult.data.monthly_revenue_growth_pct ?? 0).toFixed(1)}%`,
          trend: Number(metricsResult.data.monthly_revenue_growth_pct ?? 0) === 0 ? 'stable' : Number(metricsResult.data.monthly_revenue_growth_pct ?? 0) > 0 ? 'up' : 'down',
          tone: 'primary',
        },
      ],
      revenueSeries:
        revenueResult.data?.map((item: any) => ({
          day: String(item.day_label ?? '').toUpperCase(),
          value: Number(item.revenue ?? 0),
          highlight: Boolean(item.is_highlight),
        })) ?? adminOverviewMock.revenueSeries,
      highlight: featuredResult.data
        ? {
            title: featuredResult.data.title,
            image: featuredResult.data.hero_image,
            progress: Number(featuredResult.data.progress_pct ?? 0),
            soldTickets: Number(featuredResult.data.sold_tickets ?? 0),
            totalTickets: Number(featuredResult.data.total_tickets ?? 0),
            badge: featuredResult.data.badge ?? 'DESTAQUE',
          }
        : adminOverviewMock.highlight,
      recentPayments:
        paymentsResult.data?.map((payment) => ({
          id: payment.id,
          customerName: payment.customer_name ?? 'Cliente',
          customerEmail: payment.customer_email ?? 'sem-email@local',
          campaignTitle: payment.campaign_title ?? 'Campanha',
          amount: Number(payment.amount ?? 0),
          createdAtLabel: formatRelativeTime(payment.created_at),
          status: payment.status === 'pending' ? 'pending' : 'completed',
          initials: getInitials(payment.customer_name),
        })) ?? adminOverviewMock.recentPayments,
    };
  } catch {
    return adminOverviewMock;
  }
}

function normalizeCampaignStatus(status: string | null | undefined, soldTickets: number, totalTickets: number): AdminCampaignStatus {
  if (status === 'draft' || status === 'completed' || status === 'active') {
    return status;
  }

  if (soldTickets <= 0) {
    return 'draft';
  }

  if (soldTickets >= totalTickets && totalTickets > 0) {
    return 'completed';
  }

  return 'active';
}

export async function listAdminCampaigns(): Promise<AdminCampaign[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return adminCampaignsMock;
  }

  try {
    const { data, error } = await supabase.from('admin_campaign_performance').select('*').order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return adminCampaignsMock;
    }

    return data.map((campaign) => {
      const soldTickets = Number(campaign.sold_tickets ?? 0);
      const totalTickets = Number(campaign.total_tickets ?? 0);
      const status = normalizeCampaignStatus(campaign.status, soldTickets, totalTickets);
      const revenue = soldTickets * Number(campaign.ticket_price ?? 0);

      return {
        id: campaign.id,
        code: campaign.code,
        title: campaign.title,
        image: campaign.hero_image,
        soldTickets,
        totalTickets,
        revenue: Number(campaign.revenue ?? revenue),
        status,
        trendLabel: campaign.trend_label ?? (status === 'completed' ? 'Finalizado recentemente' : status === 'draft' ? 'Aguardando lancamento' : '+12% vs ontem'),
        note: campaign.note ?? (status === 'completed' ? 'Campanha encerrada com alto desempenho' : status === 'draft' ? 'Rascunho aguardando validacao' : 'Aquecendo vendas para o proximo sorteio'),
      };
    });
  } catch {
    return adminCampaignsMock;
  }
}

export async function listAdminTickets(): Promise<AdminTicket[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return adminTicketsMock;
  }

  try {
    const { data, error } = await supabase.from('admin_ticket_feed').select('*').order('reserved_at', { ascending: false }).limit(20);

    if (error || !data || data.length === 0) {
      return adminTicketsMock;
    }

    return data.map((ticket: any) => ({
      id: ticket.id,
      ticketNumber: ticket.ticket_number,
      campaignTitle: ticket.campaign_title ?? 'Campanha',
      customerName: ticket.customer_name ?? 'Cliente',
      customerEmail: ticket.customer_email ?? 'sem-email@local',
      reservedAtLabel: formatRelativeTime(ticket.reserved_at),
      paymentStatus: ticket.payment_status === 'pending' ? 'pending' : 'completed',
      channel: ticket.channel ?? ticket.payment_method ?? 'Online',
    }));
  } catch {
    return adminTicketsMock;
  }
}

export async function listAdminPayments(): Promise<AdminPaymentRow[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return adminPaymentsMock;
  }

  try {
    const { data, error } = await supabase.from('admin_recent_payments').select('*').order('created_at', { ascending: false }).limit(20);
    if (error || !data || data.length === 0) {
      return adminPaymentsMock;
    }

    return data.map((payment: any) => ({
      id: payment.id,
      customerName: payment.customer_name,
      customerEmail: payment.customer_email,
      campaignTitle: payment.campaign_title,
      amount: Number(payment.amount ?? 0),
      method: payment.method ?? 'Online',
      status: payment.status ?? 'completed',
      createdAtLabel: formatRelativeTime(payment.created_at),
    }));
  } catch {
    return adminPaymentsMock;
  }
}

export async function listAdminUsers(): Promise<AdminUserRow[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return adminUsersMock;
  }

  try {
    const { data, error } = await supabase.from('admin_user_summary').select('*').order('created_at', { ascending: false }).limit(20);
    if (error || !data || data.length === 0) {
      return adminUsersMock;
    }

    return data.map((user: any) => ({
      id: user.id,
      fullName: user.full_name ?? 'Usuario',
      email: user.email,
      role: user.role === 'admin' ? 'admin' : 'customer',
      city: user.city ?? 'Nao informado',
      totalOrders: Number(user.total_orders ?? 0),
      totalSpent: Number(user.total_spent ?? 0),
      status: user.status === 'inactive' ? 'inactive' : 'active',
    }));
  } catch {
    return adminUsersMock;
  }
}

export async function getAdminReports(): Promise<{ cards: AdminReportCard[]; insights: AdminReportInsight[] }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { cards: adminReportCardsMock, insights: adminReportInsightsMock };
  }

  try {
    const [metricsResult, reportsResult] = await Promise.all([
      supabase.from('admin_dashboard_metrics').select('*').maybeSingle(),
      supabase.from('admin_report_summary').select('*').maybeSingle(),
    ]);

    if (metricsResult.error || reportsResult.error || !metricsResult.data || !reportsResult.data) {
      return { cards: adminReportCardsMock, insights: adminReportInsightsMock };
    }

    return {
      cards: [
        { id: 'r1', title: 'Faturamento 30 dias', value: formatCurrency(Number(reportsResult.data.revenue_last_30_days ?? 0)), subtitle: 'Consolidado das vendas aprovadas' },
        { id: 'r2', title: 'Taxa de conversao', value: `${Number(reportsResult.data.conversion_rate_pct ?? 0).toFixed(1)}%`, subtitle: 'Bilhetes pagos sobre emitidos' },
        { id: 'r3', title: 'Ticket medio', value: formatCurrency(Number(reportsResult.data.average_ticket ?? 0)), subtitle: 'Media por compra finalizada' },
        { id: 'r4', title: 'Clientes recorrentes', value: `${Number(reportsResult.data.repeat_customer_rate_pct ?? 0).toFixed(1)}%`, subtitle: 'Base atual com recompra recente' },
      ],
      insights: [
        { id: 'i1', label: 'Melhor campanha', value: reportsResult.data.top_campaign_title ?? 'Sem dados', tone: 'primary' },
        { id: 'i2', label: 'Falhas recentes', value: `${Number(reportsResult.data.failed_payments_last_30_days ?? 0)} pagamentos falharam`, tone: 'warning' },
        { id: 'i3', label: 'Base total', value: `${metricsResult.data.total_users ?? 0} usuarios cadastrados`, tone: 'neutral' },
      ],
    };
  } catch {
    return { cards: adminReportCardsMock, insights: adminReportInsightsMock };
  }
}
