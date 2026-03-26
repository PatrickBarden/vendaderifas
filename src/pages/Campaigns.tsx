import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Ticket, PartyPopper, Star } from 'lucide-react';

export function Campaigns() {
  return (
    <div className="bg-[#121214] min-h-screen pb-20 md:pb-0 font-sans">
      
      {/* Campaigns Section */}
      <section className="pt-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <p className="text-[#FF4D3A] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Oportunidades Únicas</p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
              Campanhas<span className="text-[#FF4D3A]">Ativas</span>
            </h1>
          </div>
          <div className="mt-6 md:mt-0 flex bg-[#1C1C1F] p-1 rounded-lg border border-zinc-800/50 self-start md:self-auto">
            <button className="px-6 py-2 bg-[#FF4D3A] text-white text-sm font-bold rounded-md shadow-lg shadow-red-500/20">Todos</button>
            <button className="px-6 py-2 text-zinc-400 text-sm font-medium hover:text-white transition-colors">Pickups</button>
            <button className="px-6 py-2 text-zinc-400 text-sm font-medium hover:text-white transition-colors">Carros</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#1C1C1F] rounded-2xl overflow-hidden border border-zinc-800/50 flex flex-col group">
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
              <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80" alt="RAM 2500 Laramie" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-[#FF4D3A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-white mr-1.5 animate-pulse"></span>
                Ativo
              </div>
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 text-white px-3 py-1.5 rounded-lg text-right">
                <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest mb-0.5">Cota a partir de</p>
                <p className="text-lg font-black leading-none">R$ 1,50</p>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-black text-white leading-tight mb-1 uppercase">RAM 2500 LARAMIE + R$ 50k NO PIX</h3>
              <div className="mt-auto pt-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Progresso de Vendas</span>
                  <span className="text-xs font-bold text-[#FF4D3A]">84%</span>
                </div>
                <div className="w-full bg-black rounded-full h-1.5 mb-5 overflow-hidden">
                  <div className="bg-[#FF4D3A] h-full rounded-full" style={{ width: '84%' }}></div>
                </div>
                <Link to="/campaign/1" className="block w-full bg-[#FF4D3A] text-white text-center py-3.5 rounded-lg text-sm font-bold hover:bg-[#FF3A24] transition-colors flex items-center justify-center">
                  PARTICIPAR AGORA <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1C1C1F] rounded-2xl overflow-hidden border border-zinc-800/50 flex flex-col group">
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
              <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80" alt="Toyota Hilux" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-[#FF4D3A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-white mr-1.5 animate-pulse"></span>
                Ativo
              </div>
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 text-white px-3 py-1.5 rounded-lg text-right">
                <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest mb-0.5">Cota a partir de</p>
                <p className="text-lg font-black leading-none">R$ 0,99</p>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-black text-white leading-tight mb-1 uppercase">TOYOTA HILUX GR SPORT 2024</h3>
              <div className="mt-auto pt-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Progresso de Vendas</span>
                  <span className="text-xs font-bold text-[#FF4D3A]">42%</span>
                </div>
                <div className="w-full bg-black rounded-full h-1.5 mb-5 overflow-hidden">
                  <div className="bg-[#FF4D3A] h-full rounded-full" style={{ width: '42%' }}></div>
                </div>
                <Link to="/campaign/2" className="block w-full bg-[#FF4D3A] text-white text-center py-3.5 rounded-lg text-sm font-bold hover:bg-[#FF3A24] transition-colors flex items-center justify-center">
                  PARTICIPAR AGORA <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1C1C1F] rounded-2xl overflow-hidden border border-zinc-800/50 flex flex-col group">
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 to-zinc-900"></div>
              <div className="text-7xl text-yellow-500 font-black relative z-10 drop-shadow-2xl">R$</div>
              <div className="absolute top-4 left-4 bg-yellow-500 text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center shadow-lg">
                <Star className="w-3 h-3 mr-1 fill-black" />
                VIP
              </div>
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 text-white px-3 py-1.5 rounded-lg text-right z-20">
                <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest mb-0.5">Cota a partir de</p>
                <p className="text-lg font-black leading-none">R$ 2,50</p>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-black text-white leading-tight mb-1 uppercase">MEIO MILHÃO NO PIX (R$ 500.000)</h3>
              <div className="mt-auto pt-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Progresso de Vendas</span>
                  <span className="text-xs font-bold text-[#FF4D3A]">12%</span>
                </div>
                <div className="w-full bg-black rounded-full h-1.5 mb-5 overflow-hidden">
                  <div className="bg-[#FF4D3A] h-full rounded-full" style={{ width: '12%' }}></div>
                </div>
                <Link to="/campaign/3" className="block w-full bg-[#FF4D3A] text-white text-center py-3.5 rounded-lg text-sm font-bold hover:bg-[#FF3A24] transition-colors flex items-center justify-center">
                  PARTICIPAR AGORA <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 4 - Finished */}
          <div className="bg-[#1C1C1F]/40 rounded-2xl overflow-hidden border border-zinc-800/30 flex flex-col grayscale opacity-70">
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
              <img src="https://images.unsplash.com/photo-1584345604476-8ec5e12e42a5?auto=format&fit=crop&q=80" alt="Mustang" className="w-full h-full object-cover opacity-40" />
              <div className="absolute top-4 left-4 bg-zinc-800 text-zinc-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Finalizado
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/80 backdrop-blur-sm border border-white/10 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl">
                  Sorteio Realizado
                </div>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-black text-zinc-500 leading-tight mb-1 uppercase">MUSTANG GT PERFORMANCE</h3>
              <div className="mt-auto pt-6">
                <div className="w-full bg-zinc-900 rounded-full h-1.5 mb-5 overflow-hidden">
                  <div className="bg-zinc-700 h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
                <button disabled className="block w-full bg-zinc-800/50 text-zinc-500 text-center py-3.5 rounded-lg text-sm font-bold cursor-not-allowed uppercase tracking-wider">
                  Encerrado
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-[#1C1C1F] rounded-[2rem] p-8 md:p-12 border border-zinc-800/50 flex flex-col lg:flex-row gap-12 items-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF4D3A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <div className="flex-1 relative z-10 w-full">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6 leading-[1.1]">
              Como Transformar<br/>
              <span className="text-[#FF4D3A]">Centavos</span> em Prêmios<br/>
              Incríveis
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-10 max-w-md">
              O Bruno Pickups Prêmios é a maior plataforma de sorteios automotivos do Brasil. Transparência, velocidade no PIX e entrega garantida em todo território nacional.
            </p>
            
            <div className="flex gap-8">
              <div className="border-l-2 border-[#FF4D3A] pl-4">
                <p className="text-3xl font-black text-white leading-none mb-1">+250</p>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Ganhadores</p>
              </div>
              <div className="border-l-2 border-zinc-700 pl-4">
                <p className="text-3xl font-black text-white leading-none mb-1">R$ 5Mi</p>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Em Prêmios</p>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full space-y-4 relative z-10">
            {/* Step 1 */}
            <div className="bg-[#121214]/50 border border-zinc-800/50 p-6 rounded-2xl flex gap-6 items-start hover:bg-[#121214] transition-colors group">
              <div className="w-12 h-12 rounded-full bg-[#FF4D3A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF4D3A]/20 transition-colors">
                <Target className="w-5 h-5 text-[#FF4D3A]" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1.5 text-lg">Escolha sua Campanha</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">Navegue pelos prêmios ativos e escolha o que quer levar para casa.</p>
              </div>
            </div>
            {/* Step 2 */}
            <div className="bg-[#121214]/50 border border-zinc-800/50 p-6 rounded-2xl flex gap-6 items-start hover:bg-[#121214] transition-colors group">
              <div className="w-12 h-12 rounded-full bg-[#FF4D3A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF4D3A]/20 transition-colors">
                <Ticket className="w-5 h-5 text-[#FF4D3A]" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1.5 text-lg">Compre seus Bilhetes</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">Pagamento instantâneo via PIX. Seus números são gerados na hora.</p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="bg-[#121214]/50 border border-zinc-800/50 p-6 rounded-2xl flex gap-6 items-start hover:bg-[#121214] transition-colors group">
              <div className="w-12 h-12 rounded-full bg-[#FF4D3A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF4D3A]/20 transition-colors">
                <PartyPopper className="w-5 h-5 text-[#FF4D3A]" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1.5 text-lg">Aguarde o Sorteio</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">Baseado nos resultados da Loteria Federal. 100% seguro e auditável.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
