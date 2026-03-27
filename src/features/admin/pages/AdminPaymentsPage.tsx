import { CreditCard, Search, Wallet } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useAdminPayments } from '@/hooks/useAdminPayments';
import { formatCurrency } from '@/lib/formatters';

export function AdminPaymentsPage() {
  const { payments, loading } = useAdminPayments();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => payments.filter((payment) => `${payment.customerName} ${payment.campaignTitle} ${payment.method}`.toLowerCase().includes(query.toLowerCase())), [payments, query]);

  const total = payments.filter((item) => item.status === 'completed').reduce((sum, item) => sum + item.amount, 0);
  const pending = payments.filter((item) => item.status === 'pending').reduce((sum, item) => sum + item.amount, 0);

  if (loading) {
    return <PageLoading label="Carregando pagamentos..." />;
  }

  return (
    <div className="space-y-8">
      <Header title="Pagamentos" description="Monitore transacoes, conciliacao e gargalos financeiros em um painel desenhado para operacao diaria." />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard icon={<Wallet className="w-6 h-6" />} title="Receita aprovada" value={formatCurrency(total)} subtitle="Somatorio de pagamentos concluidos" accent="warning" />
        <MetricCard icon={<CreditCard className="w-6 h-6" />} title="Em analise" value={formatCurrency(pending)} subtitle="Pagamentos ainda pendentes" accent="primary" />
        <MetricCard icon={<Search className="w-6 h-6" />} title="Transacoes" value={String(payments.length)} subtitle="Movimentacoes rastreadas no painel" />
      </section>

      <section className="bg-[#202020] border border-white/5 p-5 md:p-6">
        <label className="flex items-center gap-4 bg-[#161616] px-5 py-4 border border-white/5">
          <Search className="w-5 h-5 text-[#C79A93]" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="bg-transparent outline-none w-full text-xl text-[#D7B0AA]" placeholder="Buscar por cliente, campanha ou metodo..." />
        </label>
      </section>

      <section className="bg-[#171717] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px]">
            <thead className="bg-[#111111]">
              <tr className="text-left text-xs uppercase tracking-[0.3em] text-[#D4A49D]">
                <th className="px-7 py-5 font-semibold">Cliente</th>
                <th className="px-7 py-5 font-semibold">Campanha</th>
                <th className="px-7 py-5 font-semibold">Metodo</th>
                <th className="px-7 py-5 font-semibold">Data</th>
                <th className="px-7 py-5 font-semibold">Valor</th>
                <th className="px-7 py-5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((payment) => (
                <tr key={payment.id} className="border-t border-white/5">
                  <td className="px-7 py-6">
                    <p className="text-xl font-bold text-white">{payment.customerName}</p>
                    <p className="text-white/45">{payment.customerEmail}</p>
                  </td>
                  <td className="px-7 py-6 text-xl text-white/90">{payment.campaignTitle}</td>
                  <td className="px-7 py-6 text-xl text-white/70">{payment.method}</td>
                  <td className="px-7 py-6 text-xl text-white/60">{payment.createdAtLabel}</td>
                  <td className="px-7 py-6 text-xl font-black text-white">{formatCurrency(payment.amount)}</td>
                  <td className="px-7 py-6">
                    <StatusPill status={payment.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatusPill({ status }: { status: 'completed' | 'pending' | 'failed' }) {
  const classes = status === 'completed' ? 'bg-[#3A3420] text-[#E6C65B]' : status === 'pending' ? 'bg-[#3A2421] text-[#F3B1A7]' : 'bg-[#312325] text-[#FF8F80]';
  const label = status === 'completed' ? 'CONCLUIDO' : status === 'pending' ? 'PENDENTE' : 'FALHOU';
  return <span className={`inline-flex rounded-full px-4 py-2 text-sm font-black ${classes}`}>{label}</span>;
}

function Header({ title, description }: { title: string; description: string }) {
  return (
    <section>
      <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white">{title}</h1>
      <p className="text-xl text-[#D4AEA7] mt-3 max-w-3xl">{description}</p>
    </section>
  );
}

function MetricCard({ icon, title, value, subtitle, accent = 'neutral' }: { icon: React.ReactNode; title: string; value: string; subtitle: string; accent?: 'primary' | 'warning' | 'neutral' }) {
  const accentClass = accent === 'primary' ? 'border-[#FF5A46] text-[#FFB4AA]' : accent === 'warning' ? 'border-[#E3C45B] text-[#E3C45B]' : 'border-white/10 text-white';
  return (
    <article className={`bg-[#242424] border-l-4 ${accentClass} p-6`}>
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6">{icon}</div>
      <p className="text-sm uppercase tracking-[0.25em] text-white/45 mb-2">{title}</p>
      <p className="text-4xl font-black text-white">{value}</p>
      <p className="text-white/45 mt-3">{subtitle}</p>
    </article>
  );
}

function PageLoading({ label }: { label: string }) {
  return <div className="text-white/60 uppercase tracking-[0.3em] text-sm">{label}</div>;
}
