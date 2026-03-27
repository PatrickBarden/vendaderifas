import React from 'react';
import { ArrowRight, PartyPopper, Star, Target, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCampaigns } from '@/hooks/useCampaigns';
import { formatCurrency } from '@/lib/formatters';

export function CampaignsPage() {
  const { campaigns, loading } = useCampaigns();

  if (loading) {
    return <PageState label="Carregando campanhas..." />;
  }

  return (
    <div className="bg-[#121214] min-h-screen pb-20 md:pb-0 font-sans">
      <section className="pt-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <p className="text-[#FF4D3A] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Rifas de carros em destaque</p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
              Campanhas<span className="text-[#FF4D3A]">Ativas</span>
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-[#1C1C1F] rounded-2xl overflow-hidden border border-zinc-800/50 flex flex-col group">
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
                <img src={campaign.heroImage} alt={campaign.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-[#FF4D3A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mr-1.5 animate-pulse" />
                  Ativo
                </div>
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 text-white px-3 py-1.5 rounded-lg text-right">
                  <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest mb-0.5">Cota a partir de</p>
                  <p className="text-lg font-black leading-none">{formatCurrency(campaign.ticketPrice)}</p>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-black text-white leading-tight mb-1 uppercase">{campaign.title}</h3>
                <p className="text-sm text-zinc-400">{campaign.shortDescription}</p>
                <div className="mt-auto pt-6">
                  <Link to={`/campaign/${campaign.id}`} className="block w-full bg-[#FF4D3A] text-white text-center py-3.5 rounded-lg text-sm font-bold hover:bg-[#FF3A24] transition-colors flex items-center justify-center">
                    PARTICIPAR AGORA <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-[#1C1C1F] rounded-[2rem] p-8 md:p-12 border border-zinc-800/50 flex flex-col lg:flex-row gap-12 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF4D3A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="flex-1 relative z-10 w-full">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6 leading-[1.1]">
              A melhor chance
              <br />
              para <span className="text-[#FF4D3A]">dirigir melhor</span>
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-10 max-w-md">Cada campanha traz um veiculo em destaque, valor acessivel por cota e uma experiencia pensada para quem sonha alto.</p>
          </div>
          <div className="flex-1 w-full space-y-4 relative z-10">
            <HowCard icon={<Target className="w-5 h-5 text-[#FF4D3A]" />} title="Premios desejados" description="Campanhas focadas em carros que chamam atencao e despertam desejo." />
            <HowCard icon={<Ticket className="w-5 h-5 text-[#FF4D3A]" />} title="Cotas acessiveis" description="Valores pensados para facilitar sua entrada em cada sorteio." />
            <HowCard icon={<PartyPopper className="w-5 h-5 text-[#FF4D3A]" />} title="Sorteios emocionantes" description="Cada campanha e uma nova chance de virar a chave da sua vida." />
            <HowCard icon={<Star className="w-5 h-5 text-[#FF4D3A]" />} title="Experiencia confiavel" description="Acompanhe as campanhas, escolha suas cotas e participe com tranquilidade." />
          </div>
        </div>
      </section>
    </div>
  );
}

function PageState({ label }: { label: string }) {
  return (
    <div className="min-h-screen bg-[#121214] text-white flex items-center justify-center">
      <p className="text-zinc-400 text-sm uppercase tracking-[0.3em]">{label}</p>
    </div>
  );
}

function HowCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-[#121214]/50 border border-zinc-800/50 p-6 rounded-2xl flex gap-6 items-start hover:bg-[#121214] transition-colors group">
      <div className="w-12 h-12 rounded-full bg-[#FF4D3A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF4D3A]/20 transition-colors">{icon}</div>
      <div>
        <h4 className="text-white font-bold mb-1.5 text-lg">{title}</h4>
        <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
