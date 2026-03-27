import { ArrowUpRight, Bell, CarFront, DollarSign, TrendingUp, Users } from 'lucide-react';
import { useAdminOverview } from '@/hooks/useAdminOverview';
import { formatCurrency } from '@/lib/formatters';

const toneClasses = {
  primary: 'border-l-[#FF5A46] text-[#FFB1A6]',
  accent: 'border-l-[#F0B9AF] text-[#F0B9AF]',
  warning: 'border-l-[#E5C24B] text-[#E5C24B]',
  neutral: 'border-l-white/10 text-white/80',
} as const;

const toneIcons = {
  primary: <TrendingUp className="w-5 h-5" />,
  accent: <Users className="w-5 h-5" />,
  warning: <CarFront className="w-5 h-5" />,
  neutral: <DollarSign className="w-5 h-5" />,
} as const;

export function AdminDashboardPage() {
  const { overview, loading } = useAdminOverview();

  if (loading || !overview) {
    return <div className="text-white/60 uppercase tracking-[0.3em] text-sm">Carregando dashboard...</div>;
  }

  const maxValue = Math.max(...overview.revenueSeries.map((item) => item.value));

  return (
    <div className="space-y-8">
      <section className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
        <div>
          <h1 className="text-5xl md:text-6xl font-black italic tracking-tight text-white">VISAO GERAL</h1>
          <p className="text-xl text-[#C9B0AA] mt-2">Bem-vindo ao centro de comando, Bruno.</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {overview.metrics.map((metric) => (
          <article key={metric.title} className={`bg-[#262626] border-l-4 ${toneClasses[metric.tone]} rounded-sm p-6 min-h-[152px] flex flex-col justify-between`}>
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">{toneIcons[metric.tone]}</div>
              <div className="flex items-center gap-1 text-sm font-bold">
                <span>{metric.delta}</span>
                {metric.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : metric.trend === 'stable' ? <Bell className="w-4 h-4" /> : null}
              </div>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/55 mb-3">{metric.title}</p>
              <h2 className="text-4xl font-black text-white tracking-tight">{metric.value}</h2>
            </div>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.8fr)] gap-8">
        <article className="bg-[#1E1E1E] rounded-none p-7 md:p-8 border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-4xl font-black tracking-tight text-white">Fluxo de Receita (7 dias)</h3>
            </div>
            <button className="px-5 py-3 rounded-full bg-white/8 text-white/80 text-sm font-semibold">Ultima Semana</button>
          </div>
          <div className="h-[420px] border-t border-white/6 pt-10 flex items-end gap-3 md:gap-5">
            {overview.revenueSeries.map((point) => {
              const height = Math.max((point.value / maxValue) * 100, 18);
              return (
                <div key={point.day} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div className="text-center mb-4">
                    {point.highlight ? (
                      <>
                        <p className="text-sm font-black text-white">R$</p>
                        <p className="text-lg font-black text-white">{(point.value / 1000).toFixed(1)}k</p>
                      </>
                    ) : null}
                  </div>
                  <div
                    className={`w-full rounded-t-[2rem] ${point.highlight ? 'bg-[#FF5A46]' : 'bg-[#3A3936]'}`}
                    style={{ height: `${height}%` }}
                  />
                  <p className="mt-4 text-xs md:text-sm tracking-[0.25em] text-white/45">{point.day}</p>
                </div>
              );
            })}
          </div>
        </article>

        <article className="bg-[#1E1E1E] rounded-none p-7 md:p-8 border border-white/5">
          <h3 className="text-4xl font-black tracking-tight text-white mb-8">Destaque da Semana</h3>
          <div className="relative rounded-[2rem] overflow-hidden">
            <img src={overview.highlight.image} alt={overview.highlight.title} className="w-full aspect-[4/3] object-cover" />
            <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-[#FF5A46] text-white text-sm font-black">{overview.highlight.badge}</div>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-2xl font-black text-white">{overview.highlight.title}</h4>
              <span className="text-[#FF8B7D] font-black text-xl">{overview.highlight.progress}%</span>
            </div>
            <div className="mt-4 h-3 rounded-full bg-black/45 overflow-hidden">
              <div className="h-full bg-[#FF5A46]" style={{ width: `${overview.highlight.progress}%` }} />
            </div>
            <div className="mt-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/35 mb-2">Bilhetes Vendidos</p>
                <p className="text-4xl font-black text-white">
                  {overview.highlight.soldTickets.toLocaleString('pt-BR')} / {overview.highlight.totalTickets.toLocaleString('pt-BR')}
                </p>
              </div>
              <button className="w-14 h-14 rounded-full bg-[#4B413E] text-[#F1B1A9] flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </article>
      </section>

      <section className="bg-[#1E1E1E] border border-white/5">
        <div className="flex items-center justify-between px-7 py-6 border-b border-white/5">
          <h3 className="text-4xl font-black tracking-tight text-white">Pagamentos Recentes</h3>
          <button className="text-[#F6B1A6] font-semibold">Ver tudo</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.3em] text-white/35">
                <th className="px-7 py-5 font-semibold">Usuario</th>
                <th className="px-7 py-5 font-semibold">Campanha</th>
                <th className="px-7 py-5 font-semibold">Data</th>
                <th className="px-7 py-5 font-semibold">Valor</th>
                <th className="px-7 py-5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {overview.recentPayments.map((payment) => (
                <tr key={payment.id} className="border-t border-white/5">
                  <td className="px-7 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-sm font-black text-[#F3BEBA]">{payment.initials}</div>
                      <div>
                        <p className="text-xl font-bold text-white">{payment.customerName}</p>
                        <p className="text-white/40">{payment.customerEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-7 py-6 text-xl text-white/90">{payment.campaignTitle}</td>
                  <td className="px-7 py-6 text-xl text-white/60">{payment.createdAtLabel}</td>
                  <td className="px-7 py-6 text-xl font-bold text-white">{formatCurrency(payment.amount)}</td>
                  <td className="px-7 py-6">
                    <span
                      className={`inline-flex rounded-full px-4 py-2 text-sm font-black ${
                        payment.status === 'completed' ? 'bg-[#3B3420] text-[#E8C75D]' : 'bg-[#3A2421] text-[#FF786A]'
                      }`}
                    >
                      {payment.status === 'completed' ? 'CONCLUIDO' : 'PENDENTE'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="border-t border-white/5 pt-10 pb-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-white/70">
        <div>
          <img 
            src="/images/logo.png" 
            alt="Bruno Pickups Premios" 
            className="h-10 w-auto mb-4"
          />
          <p className="leading-relaxed">A plataforma lider em premiacoes automotivas premium no Brasil. Seguranca, transparencia e adrenalina.</p>
        </div>
        <div>
          <h5 className="text-[#F1B1A9] font-bold mb-4">Administracao</h5>
          <p className="mb-3">Dashboard</p>
          <p className="mb-3">Gerenciar Campanhas</p>
          <p>Auditoria de Bilhetes</p>
        </div>
        <div>
          <h5 className="text-[#F1B1A9] font-bold mb-4">Suporte Admin</h5>
          <p className="mb-3">Central de Ajuda</p>
          <p className="mb-3">Seguranca de Dados</p>
          <p>Logs do Sistema</p>
        </div>
        <div>
          <h5 className="text-[#F1B1A9] font-bold mb-4">Legal</h5>
          <p className="mb-3">Termos de Uso</p>
          <p className="mb-3">Privacidade</p>
          <p>Regulamento</p>
        </div>
      </footer>
    </div>
  );
}
