import { BarChart3, TrendingUp } from 'lucide-react';
import { useAdminReports } from '@/hooks/useAdminReports';

export function AdminReportsPage() {
  const { cards, insights, loading } = useAdminReports();

  if (loading) {
    return <PageLoading label="Carregando relatorios..." />;
  }

  return (
    <div className="space-y-8">
      <Header title="Relatorios" description="Consolide indicadores de performance, saude operacional e sinais de crescimento em uma visao executiva do negocio." />

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <article key={card.id} className="bg-[#242424] border-l-4 border-[#FF5A46] p-6">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <BarChart3 className="w-6 h-6 text-[#FFB4AA]" />
            </div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/45 mb-2">{card.title}</p>
            <p className="text-4xl font-black text-white">{card.value}</p>
            <p className="text-white/45 mt-3 leading-relaxed">{card.subtitle}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.3fr)_420px] gap-8">
        <article className="bg-[#1E1E1E] border border-white/5 p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-black text-white">Radar Executivo</h2>
            <div className="w-12 h-12 rounded-full bg-[#312723] text-[#FFB4AA] flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="space-y-5">
            {insights.map((insight) => (
              <div key={insight.id} className="bg-[#171717] border border-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-white/45 mb-3">{insight.label}</p>
                <p className={`text-2xl font-black ${insight.tone === 'primary' ? 'text-[#FFB4AA]' : insight.tone === 'warning' ? 'text-[#E6C65B]' : 'text-white'}`}>{insight.value}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="bg-[#2B2A2A] rounded-[2.5rem] p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D0A19A] mb-4">Resumo da Semana</p>
          <h3 className="text-5xl font-black text-white leading-tight">Painel pronto para cruzar vendas, pagamentos e base ativa.</h3>
          <p className="text-xl text-[#D4AEA7] mt-6 leading-relaxed">Com os dados do Supabase ligados, esta area vira o centro de inteligencia do negocio para acompanhar campanhas, conversao e seguranca operacional.</p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            <MiniStat title="Ritmo atual" value="Forte" />
            <MiniStat title="Meta mensal" value="82%" />
          </div>
        </article>
      </section>
    </div>
  );
}

function MiniStat({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-[#171717] border border-white/5 p-5 rounded-[1.5rem]">
      <p className="text-sm uppercase tracking-[0.25em] text-white/45 mb-3">{title}</p>
      <p className="text-3xl font-black text-white">{value}</p>
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

function PageLoading({ label }: { label: string }) {
  return <div className="text-white/60 uppercase tracking-[0.3em] text-sm">{label}</div>;
}
