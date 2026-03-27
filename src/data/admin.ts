import type { AdminCampaign, AdminOverview, AdminPaymentRow, AdminReportCard, AdminReportInsight, AdminTicket, AdminUserRow } from '@/types/domain';

export const adminOverviewMock: AdminOverview = {
  metrics: [
    { title: 'Vendas Totais', value: 'R$ 142.380', delta: '+12.5%', trend: 'up', tone: 'primary' },
    { title: 'Usuarios Ativos', value: '8.429', delta: '+4.2%', trend: 'up', tone: 'accent' },
    { title: 'Campanhas Ativas', value: '12', delta: 'Estavel', trend: 'stable', tone: 'warning' },
    { title: 'Receita Mensal', value: 'R$ 58.900', delta: '+18.9%', trend: 'up', tone: 'primary' },
  ],
  revenueSeries: [
    { day: 'SEG', value: 6200 },
    { day: 'TER', value: 9100 },
    { day: 'QUA', value: 12400, highlight: true },
    { day: 'QUI', value: 7800 },
    { day: 'SEX', value: 9800 },
    { day: 'SAB', value: 5400 },
    { day: 'DOM', value: 13800 },
  ],
  highlight: {
    title: 'RAM 1500 TRX 2024',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80',
    progress: 82,
    soldTickets: 41000,
    totalTickets: 50000,
    badge: 'HOT ITEM',
  },
  recentPayments: [
    { id: 'p1', customerName: 'Ricardo Silva', customerEmail: 'ricardo@email.com', campaignTitle: 'Hilux SRX 2024', amount: 150, createdAtLabel: 'Ha 12 min', status: 'completed', initials: 'RS' },
    { id: 'p2', customerName: 'Amanda Mendes', customerEmail: 'amanda.m@email.com', campaignTitle: 'F-150 Lariat Edition', amount: 500, createdAtLabel: 'Ha 45 min', status: 'completed', initials: 'AM' },
    { id: 'p3', customerName: 'Joao Paulo Costa', customerEmail: 'jp.costa@email.com', campaignTitle: 'RAM 1500 TRX', amount: 2500, createdAtLabel: 'Ha 1 hora', status: 'pending', initials: 'JP' },
    { id: 'p4', customerName: 'Felipe Barbosa', customerEmail: 'f.barbosa@email.com', campaignTitle: 'Hilux SRX 2024', amount: 75, createdAtLabel: 'Ha 3 horas', status: 'completed', initials: 'FB' },
  ],
};

export const adminCampaignsMock: AdminCampaign[] = [
  {
    id: '1',
    code: '#CAM-9821',
    title: 'Hilux GR-Sport 2024',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80',
    soldTickets: 8200,
    totalTickets: 10000,
    revenue: 410000,
    status: 'active',
    trendLabel: '+12% vs ontem',
    note: 'Forte tracao nas ultimas 24 horas',
  },
  {
    id: '2',
    code: '#CAM-7742',
    title: 'Jeep Wrangler Rubicon',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80',
    soldTickets: 0,
    totalTickets: 5000,
    revenue: 0,
    status: 'draft',
    trendLabel: 'Lancamento',
    note: 'Aguardando publicacao oficial',
  },
  {
    id: '3',
    code: '#CAM-5520',
    title: 'Ford F-150 Raptor',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80',
    soldTickets: 15000,
    totalTickets: 15000,
    revenue: 750000,
    status: 'completed',
    trendLabel: 'Finalizado em 12/05',
    note: 'Campanha encerrada com 100% das cotas',
  },
];

export const adminTicketsMock: AdminTicket[] = [
  { id: 't1', ticketNumber: '000154', campaignTitle: 'Hilux GR-Sport 2024', customerName: 'Ricardo Silva', customerEmail: 'ricardo@email.com', reservedAtLabel: 'Ha 12 min', paymentStatus: 'completed', channel: 'PIX' },
  { id: 't2', ticketNumber: '000155', campaignTitle: 'Hilux GR-Sport 2024', customerName: 'Amanda Mendes', customerEmail: 'amanda@email.com', reservedAtLabel: 'Ha 18 min', paymentStatus: 'completed', channel: 'Cartao' },
  { id: 't3', ticketNumber: '001020', campaignTitle: 'Jeep Wrangler Rubicon', customerName: 'Joao Costa', customerEmail: 'joao@email.com', reservedAtLabel: 'Ha 35 min', paymentStatus: 'pending', channel: 'PIX' },
  { id: 't4', ticketNumber: '001021', campaignTitle: 'RAM 1500 TRX 2024', customerName: 'Felipe Barbosa', customerEmail: 'felipe@email.com', reservedAtLabel: 'Ha 1 hora', paymentStatus: 'completed', channel: 'Boleto' },
];

export const adminPaymentsMock: AdminPaymentRow[] = [
  { id: 'pay1', customerName: 'Ricardo Silva', customerEmail: 'ricardo@email.com', campaignTitle: 'Hilux GR-Sport 2024', amount: 150, method: 'PIX', status: 'completed', createdAtLabel: 'Ha 12 min' },
  { id: 'pay2', customerName: 'Amanda Mendes', customerEmail: 'amanda@email.com', campaignTitle: 'F-150 Lariat Edition', amount: 500, method: 'Cartao', status: 'completed', createdAtLabel: 'Ha 45 min' },
  { id: 'pay3', customerName: 'Joao Costa', customerEmail: 'joao@email.com', campaignTitle: 'RAM 1500 TRX 2024', amount: 2500, method: 'PIX', status: 'pending', createdAtLabel: 'Ha 1 hora' },
  { id: 'pay4', customerName: 'Fernanda Alves', customerEmail: 'fernanda@email.com', campaignTitle: 'Jeep Wrangler Rubicon', amount: 90, method: 'Cartao', status: 'failed', createdAtLabel: 'Ha 3 horas' },
];

export const adminUsersMock: AdminUserRow[] = [
  { id: 'u1', fullName: 'Bruno Gestor', email: 'admin@brunopickups.com', role: 'admin', city: 'Sao Paulo', totalOrders: 0, totalSpent: 0, status: 'active' },
  { id: 'u2', fullName: 'Ricardo Silva', email: 'ricardo@email.com', role: 'customer', city: 'Campinas', totalOrders: 12, totalSpent: 1450, status: 'active' },
  { id: 'u3', fullName: 'Amanda Mendes', email: 'amanda@email.com', role: 'customer', city: 'Goiania', totalOrders: 18, totalSpent: 3890, status: 'active' },
  { id: 'u4', fullName: 'Joao Costa', email: 'joao@email.com', role: 'customer', city: 'Belo Horizonte', totalOrders: 4, totalSpent: 250, status: 'inactive' },
];

export const adminReportCardsMock: AdminReportCard[] = [
  { id: 'r1', title: 'Faturamento 30 dias', value: 'R$ 218.450', subtitle: 'Consolidado de todas as campanhas' },
  { id: 'r2', title: 'Taxa de conversao', value: '4.8%', subtitle: 'Visitante para pagamento confirmado' },
  { id: 'r3', title: 'Ticket medio', value: 'R$ 182', subtitle: 'Media por compra finalizada' },
  { id: 'r4', title: 'Clientes recorrentes', value: '37%', subtitle: 'Voltaram a comprar nos ultimos 60 dias' },
];

export const adminReportInsightsMock: AdminReportInsight[] = [
  { id: 'i1', label: 'Melhor campanha da semana', value: 'Hilux GR-Sport 2024', tone: 'primary' },
  { id: 'i2', label: 'Risco operacional', value: '7 pagamentos pendentes ha mais de 24h', tone: 'warning' },
  { id: 'i3', label: 'Canal mais forte', value: 'PIX representa 63% das vendas', tone: 'neutral' },
];
