import React from 'react';
import { ArrowRight, Award, CarFront, ChevronRight, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCampaigns } from '@/hooks/useCampaigns';

export function HomePage() {
  const { campaigns, loading } = useCampaigns();
  const featuredCampaigns = campaigns.slice(0, 3);

  if (loading) {
    return <PageState label="Carregando campanhas..." />;
  }

  if (featuredCampaigns.length === 0) {
    return <PageState label="Nenhuma campanha disponivel no momento." />;
  }

  return (
    <div className="bg-[#121214] min-h-screen pb-20 md:pb-0 font-sans">
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={featuredCampaigns[0].heroImage} alt="Hero Background" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121214] via-[#121214]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#121214]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-zinc-900/80 border border-red-500/30 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
            Rifas oficiais de veiculos
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-[0.9] max-w-3xl">
            SUA
            <br />
            CHANCE DE
            <br />
            <span className="text-[#FF4D3A] italic">CONQUISTAR</span>
            <br />O CARRO
            <br />
            DOS SONHOS.
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-md mb-10 leading-relaxed font-medium">
            Escolha sua rifa, garanta suas cotas e participe da disputa por carros incriveis com sorteios transparentes.
          </p>
          <Link to="/campaigns" className="inline-flex px-8 py-4 bg-[#FF4D3A] text-white rounded-full font-bold hover:bg-[#FF3A24] transition-colors items-center shadow-lg shadow-red-500/20">
            QUERO PARTICIPAR AGORA <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10 border-b border-zinc-800 pb-4">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase relative">
            Campanhas Ativas
            <span className="absolute -bottom-4 left-0 w-12 h-1 bg-[#FF4D3A]" />
          </h2>
          <Link to="/campaigns" className="text-sm font-bold text-[#FF4D3A] hover:text-[#FF3A24] transition-colors flex items-center">
            Ver todas <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCampaigns.map((campaign) => (
            <div key={campaign.id} className="bg-[#1C1C1F] rounded-2xl overflow-hidden flex flex-col group">
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
                <img src={campaign.heroImage} alt={campaign.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {campaign.badge ? (
                  <div className="absolute top-4 left-4 bg-[#FF4D3A] text-white text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-lg">
                    {campaign.badge}
                  </div>
                ) : null}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-black text-white leading-tight mb-2 uppercase">{campaign.title}</h3>
                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">{campaign.shortDescription}</p>
                <div className="mt-auto">
                  <Link to={`/campaign/${campaign.id}`} className="block w-full bg-zinc-800 text-zinc-300 text-center py-3.5 rounded-full text-sm font-bold hover:bg-zinc-700 hover:text-white transition-colors">
                    ADQUIRIR BILHETE
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="como-funciona" className="py-20 px-4 md:px-8 max-w-7xl mx-auto bg-[#1C1C1F] my-12">
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase text-center mb-16">COMO FUNCIONA</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <FeatureStep icon={<CarFront className="w-8 h-8 text-[#FF4D3A]" />} title="Escolha seu carro" description="Veja os detalhes do premio e selecione a rifa que mais combina com voce." />
          <FeatureStep icon={<Ticket className="w-8 h-8 text-[#FF4D3A]" />} title="Garanta suas cotas" description="Compre quantas cotas quiser para aumentar suas chances no sorteio." />
          <FeatureStep icon={<Award className="w-8 h-8 text-[#FF4D3A]" />} title="Acompanhe o resultado" description="Confira os sorteios e torca para levar o carro dos sonhos para casa." />
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto mb-20">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 w-full">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase mb-2 leading-none">ULTIMOS</h2>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#FF4D3A] uppercase mb-6 leading-none">GANHADORES</h2>
            <p className="text-zinc-400 text-base mb-10 max-w-md leading-relaxed">Conheca quem ja realizou o sonho do carro proprio participando das nossas rifas.</p>
            <Link to="/winners" className="inline-flex items-center text-sm font-bold text-white hover:text-[#FF4D3A] transition-colors">
              Ver galeria completa de ganhadores <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1511516171870-505f88f4fa40?auto=format&fit=crop&q=80" alt="Ganhador comemorando" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
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

function FeatureStep({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 shadow-lg">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">{description}</p>
    </div>
  );
}
