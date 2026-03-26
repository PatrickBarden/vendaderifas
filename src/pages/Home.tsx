import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CarFront, Ticket, Award, ChevronRight } from 'lucide-react';

export function Home() {
  return (
    <div className="bg-[#121214] min-h-screen pb-20 md:pb-0 font-sans">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121214] via-[#121214]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#121214]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-zinc-900/80 border border-red-500/30 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></span>
            APENAS R$ 0,99
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-[0.9] max-w-3xl">
            SUA <br/>
            CHANCE DE <br/>
            <span className="text-[#FF4D3A] italic">CONQUISTAR</span><br/>
            A PICKUP <br/>
            DOS <br/>
            SONHOS.
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-md mb-10 leading-relaxed font-medium">
            Participe das nossas campanhas exclusivas e concorra aos melhores veículos e prêmios em dinheiro do Brasil.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
            <Link to="/campaigns" className="w-full sm:w-auto px-8 py-4 bg-[#FF4D3A] text-white rounded-full font-bold hover:bg-[#FF3A24] transition-colors flex items-center justify-center shadow-lg shadow-red-500/20">
              QUERO PARTICIPAR AGORA <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Sorteio encerra em:</p>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-[#FF4D3A]">02</span>
                <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Dias</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-[#FF4D3A]">14</span>
                <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Hrs</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-[#FF4D3A]">45</span>
                <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Min</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campanhas Ativas Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10 border-b border-zinc-800 pb-4">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase relative">
            Campanhas Ativas
            <span className="absolute -bottom-4 left-0 w-12 h-1 bg-[#FF4D3A]"></span>
          </h2>
          <Link to="/campaigns" className="text-sm font-bold text-[#FF4D3A] hover:text-[#FF3A24] transition-colors flex items-center">
            Ver todas <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#1C1C1F] rounded-2xl overflow-hidden flex flex-col group">
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
              <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80" alt="Toyota Hilux" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-[#FF4D3A] text-white text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-lg">
                Destaque
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-black text-white leading-tight mb-2 uppercase">TOYOTA HILUX GR-S 2024</h3>
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                A bruta mais desejada do Brasil, equipada com kit off-road e 224cv.
              </p>
              <div className="mt-auto">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Progresso</span>
                  <span className="text-[10px] font-bold text-[#FF4D3A] uppercase tracking-widest">82% Reservado</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5 mb-5 overflow-hidden">
                  <div className="bg-[#FF4D3A] h-full rounded-full" style={{ width: '82%' }}></div>
                </div>
                <Link to="/campaign/2" className="block w-full bg-zinc-800 text-zinc-300 text-center py-3.5 rounded-full text-sm font-bold hover:bg-zinc-700 hover:text-white transition-colors">
                  ADQUIRIR BILHETE - R$ 0,99
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1C1C1F] rounded-2xl overflow-hidden flex flex-col group">
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
              <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80" alt="Ford F-150 Raptor" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-black text-white leading-tight mb-2 uppercase">FORD F-150 RAPTOR</h3>
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                O monstro americano preparado para qualquer terreno. V6 EcoBoost.
              </p>
              <div className="mt-auto">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Progresso</span>
                  <span className="text-[10px] font-bold text-[#FF4D3A] uppercase tracking-widest">45% Reservado</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5 mb-5 overflow-hidden">
                  <div className="bg-[#FF4D3A] h-full rounded-full" style={{ width: '45%' }}></div>
                </div>
                <Link to="/campaign/1" className="block w-full bg-zinc-800 text-zinc-300 text-center py-3.5 rounded-full text-sm font-bold hover:bg-zinc-700 hover:text-white transition-colors">
                  ADQUIRIR BILHETE - R$ 1,50
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1C1C1F] rounded-2xl overflow-hidden flex flex-col group">
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-zinc-900"></div>
              <div className="text-8xl text-yellow-500 font-black relative z-10 drop-shadow-2xl">$</div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-black text-white leading-tight mb-2 uppercase">R$ 100.000,00 NO PIX</h3>
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                Prêmio em dinheiro direto na sua conta. Realize seus sonhos hoje.
              </p>
              <div className="mt-auto">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Progresso</span>
                  <span className="text-[10px] font-bold text-[#FF4D3A] uppercase tracking-widest">92% Reservado</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5 mb-5 overflow-hidden">
                  <div className="bg-[#FF4D3A] h-full rounded-full" style={{ width: '92%' }}></div>
                </div>
                <Link to="/campaign/3" className="block w-full bg-zinc-800 text-zinc-300 text-center py-3.5 rounded-full text-sm font-bold hover:bg-zinc-700 hover:text-white transition-colors">
                  ADQUIRIR BILHETE - R$ 0,50
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto bg-[#1C1C1F] my-12">
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase text-center mb-16">
          COMO FUNCIONA
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 shadow-lg">
              <CarFront className="w-8 h-8 text-[#FF4D3A]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Escolha a Campanha</h3>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              Selecione o veículo ou prêmio que deseja concorrer em nossa lista ativa.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 shadow-lg">
              <Ticket className="w-8 h-8 text-[#FF4D3A]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Compre Seus Bilhetes</h3>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              Quanto mais bilhetes você comprar, maiores são suas chances de ganhar.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 shadow-lg">
              <Award className="w-8 h-8 text-[#FF4D3A]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Aguarde o Sorteio</h3>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              Os sorteios são baseados na Loteria Federal, garantindo total transparência.
            </p>
          </div>
        </div>
      </section>

      {/* Últimos Ganhadores Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto mb-20">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 w-full">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase mb-2 leading-none">
              ÚLTIMOS
            </h2>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#FF4D3A] uppercase mb-6 leading-none">
              GANHADORES
            </h2>
            <p className="text-zinc-400 text-base mb-10 max-w-md leading-relaxed">
              Conheça as pessoas que acreditaram na sorte e hoje estão acelerando suas pickups exclusivas Bruno Pickups.
            </p>
            
            <div className="space-y-4 mb-8">
              {/* Winner 1 */}
              <div className="bg-[#1C1C1F] rounded-full p-2 pr-6 flex items-center gap-4 border border-zinc-800/50">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Ricardo S." className="w-12 h-12 rounded-full object-cover border-2 border-[#FF4D3A]" />
                <div>
                  <h4 className="text-white font-bold text-sm">Ricardo S. - São Paulo/SP</h4>
                  <p className="text-[10px] font-bold text-[#FF4D3A] uppercase tracking-wider">Ganhou: RAM 2500 Laramie</p>
                </div>
              </div>
              
              {/* Winner 2 */}
              <div className="bg-[#1C1C1F] rounded-full p-2 pr-6 flex items-center gap-4 border border-zinc-800/50">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Amanda M." className="w-12 h-12 rounded-full object-cover border-2 border-[#FF4D3A]" />
                <div>
                  <h4 className="text-white font-bold text-sm">Amanda M. - Curitiba/PR</h4>
                  <p className="text-[10px] font-bold text-[#FF4D3A] uppercase tracking-wider">Ganhou: R$ 50.000,00</p>
                </div>
              </div>
            </div>
            
            <Link to="/winners" className="inline-flex items-center text-sm font-bold text-white hover:text-[#FF4D3A] transition-colors">
              Ver galeria completa de ganhadores <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="flex-1 w-full relative">
            <div className="aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1511516171870-505f88f4fa40?auto=format&fit=crop&q=80" alt="Ganhador comemorando" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
