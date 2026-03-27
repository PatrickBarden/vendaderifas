import { Search, ShieldCheck, Ticket, TimerReset } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useAdminTickets } from '@/hooks/useAdminTickets';

export function AdminTicketsPage() {
  const { tickets, loading } = useAdminTickets();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => tickets.filter((ticket) => `${ticket.ticketNumber} ${ticket.customerName} ${ticket.campaignTitle}`.toLowerCase().includes(query.toLowerCase())), [tickets, query]);

  const completed = tickets.filter((ticket) => ticket.paymentStatus === 'completed').length;
  const pending = tickets.filter((ticket) => ticket.paymentStatus === 'pending').length;

  if (loading) {
    return <PageLoading label="Carregando bilhetes..." />;
  }

  return (
    <div className="space-y-8">
      <Header title="Bilhetes" description="Audite cotas emitidas, reservas recentes e situacoes de pagamento com uma visao operacional centralizada." />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard icon={<Ticket className="w-6 h-6" />} title="Bilhetes recentes" value={String(tickets.length)} subtitle="Movimentacoes do painel" />
        <MetricCard icon={<ShieldCheck className="w-6 h-6" />} title="Confirmados" value={String(completed)} subtitle="Pagamentos aprovados" accent="warning" />
        <MetricCard icon={<TimerReset className="w-6 h-6" />} title="Pendentes" value={String(pending)} subtitle="Aguardando compensacao" accent="primary" />
      </section>

      <section className="bg-[#202020] border border-white/5 p-5 md:p-6">
        <label className="flex items-center gap-4 bg-[#161616] px-5 py-4 border border-white/5">
          <Search className="w-5 h-5 text-[#C79A93]" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="bg-transparent outline-none w-full text-xl text-[#D7B0AA]" placeholder="Buscar por numero, cliente ou campanha..." />
        </label>
      </section>

      <section className="bg-[#171717] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px]">
            <thead className="bg-[#111111]">
              <tr className="text-left text-xs uppercase tracking-[0.3em] text-[#D4A49D]">
                <th className="px-7 py-5 font-semibold">Bilhete</th>
                <th className="px-7 py-5 font-semibold">Cliente</th>
                <th className="px-7 py-5 font-semibold">Campanha</th>
                <th className="px-7 py-5 font-semibold">Canal</th>
                <th className="px-7 py-5 font-semibold">Horario</th>
                <th className="px-7 py-5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ticket) => (
                <tr key={ticket.id} className="border-t border-white/5">
                  <td className="px-7 py-6">
                    <span className="inline-flex px-4 py-2 rounded-full bg-[#2D2422] text-[#F0B4A9] font-black tracking-[0.2em]">{ticket.ticketNumber}</span>
                  </td>
                  <td className="px-7 py-6">
                    <p className="text-xl font-bold text-white">{ticket.customerName}</p>
                    <p className="text-white/45">{ticket.customerEmail}</p>
                  </td>
                  <td className="px-7 py-6 text-xl text-white/90">{ticket.campaignTitle}</td>
                  <td className="px-7 py-6 text-xl text-white/70">{ticket.channel}</td>
                  <td className="px-7 py-6 text-xl text-white/60">{ticket.reservedAtLabel}</td>
                  <td className="px-7 py-6">
                    <StatusPill status={ticket.paymentStatus === 'completed' ? 'CONCLUIDO' : 'PENDENTE'} tone={ticket.paymentStatus === 'completed' ? 'warning' : 'primary'} />
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

function StatusPill({ status, tone }: { status: string; tone: 'primary' | 'warning' }) {
  return <span className={`inline-flex rounded-full px-4 py-2 text-sm font-black ${tone === 'warning' ? 'bg-[#3A3420] text-[#E6C65B]' : 'bg-[#3A2421] text-[#F3B1A7]'}`}>{status}</span>;
}

function PageLoading({ label }: { label: string }) {
  return <div className="text-white/60 uppercase tracking-[0.3em] text-sm">{label}</div>;
}
