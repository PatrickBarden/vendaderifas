import React from 'react';
import { Trophy, Calendar, MapPin, Ticket } from 'lucide-react';

export function Winners() {
  return (
    <div className="bg-[#121214] min-h-screen pb-24 font-sans pt-24">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase relative inline-block mb-4">
            Últimos Ganhadores
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#FF4D3A]"></span>
          </h1>
          <p className="text-zinc-400 mt-8 max-w-2xl text-lg">
            Conheça os sortudos que já levaram para casa os prêmios incríveis da Bruno Pickups. O próximo pode ser você!
          </p>
        </div>
      </section>

      {/* Winners Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Winner Card 1 */}
          <div className="bg-[#1C1C1F] rounded-2xl overflow-hidden border border-zinc-800/50 flex flex-col group">
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
              <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80" alt="Ganhador RAM 2500" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-[#FF4D3A] text-white text-xs font-bold px-3 py-1.5 rounded-sm flex items-center shadow-lg">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                15/03/2024
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-black text-white leading-tight mb-4 uppercase">RAM 2500 LARAMIE</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-zinc-300">
                  <Trophy className="w-4 h-4 text-[#FF4D3A] mr-2 flex-shrink-0" />
                  <span className="font-bold">Ricardo Silva</span>
                </div>
                <div className="flex items-center text-zinc-400 text-sm">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>São Paulo / SP</span>
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Cota Premiada</span>
                  <div className="flex items-center bg-zinc-800/50 px-3 py-1.5 rounded text-[#FF4D3A] font-mono font-bold">
                    <Ticket className="w-3.5 h-3.5 mr-1.5" />
                    123456
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Winner Card 2 */}
          <div className="bg-[#1C1C1F] rounded-2xl overflow-hidden border border-zinc-800/50 flex flex-col group">
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
              <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80" alt="Ganhador Hilux" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-[#FF4D3A] text-white text-xs font-bold px-3 py-1.5 rounded-sm flex items-center shadow-lg">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                28/02/2024
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-black text-white leading-tight mb-4 uppercase">TOYOTA HILUX GR-S</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-zinc-300">
                  <Trophy className="w-4 h-4 text-[#FF4D3A] mr-2 flex-shrink-0" />
                  <span className="font-bold">Marcos Antônio</span>
                </div>
                <div className="flex items-center text-zinc-400 text-sm">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Goiânia / GO</span>
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Cota Premiada</span>
                  <div className="flex items-center bg-zinc-800/50 px-3 py-1.5 rounded text-[#FF4D3A] font-mono font-bold">
                    <Ticket className="w-3.5 h-3.5 mr-1.5" />
                    987654
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Winner Card 3 */}
          <div className="bg-[#1C1C1F] rounded-2xl overflow-hidden border border-zinc-800/50 flex flex-col group">
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-zinc-900"></div>
              <div className="text-8xl text-yellow-500 font-black relative z-10 drop-shadow-2xl">$</div>
              <div className="absolute top-4 left-4 bg-[#FF4D3A] text-white text-xs font-bold px-3 py-1.5 rounded-sm flex items-center shadow-lg z-20">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                10/02/2024
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-black text-white leading-tight mb-4 uppercase">R$ 100.000,00 NO PIX</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-zinc-300">
                  <Trophy className="w-4 h-4 text-[#FF4D3A] mr-2 flex-shrink-0" />
                  <span className="font-bold">Amanda Costa</span>
                </div>
                <div className="flex items-center text-zinc-400 text-sm">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Belo Horizonte / MG</span>
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Cota Premiada</span>
                  <div className="flex items-center bg-zinc-800/50 px-3 py-1.5 rounded text-[#FF4D3A] font-mono font-bold">
                    <Ticket className="w-3.5 h-3.5 mr-1.5" />
                    456123
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Winner Card 4 */}
          <div className="bg-[#1C1C1F] rounded-2xl overflow-hidden border border-zinc-800/50 flex flex-col group">
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
              <img src="https://images.unsplash.com/photo-1584345604476-8ec5e12e42a5?auto=format&fit=crop&q=80" alt="Ganhador Mustang" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-[#FF4D3A] text-white text-xs font-bold px-3 py-1.5 rounded-sm flex items-center shadow-lg">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                25/01/2024
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-black text-white leading-tight mb-4 uppercase">MUSTANG GT PERFORMANCE</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-zinc-300">
                  <Trophy className="w-4 h-4 text-[#FF4D3A] mr-2 flex-shrink-0" />
                  <span className="font-bold">Fernando Oliveira</span>
                </div>
                <div className="flex items-center text-zinc-400 text-sm">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Curitiba / PR</span>
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Cota Premiada</span>
                  <div className="flex items-center bg-zinc-800/50 px-3 py-1.5 rounded text-[#FF4D3A] font-mono font-bold">
                    <Ticket className="w-3.5 h-3.5 mr-1.5" />
                    789012
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Winner Card 5 */}
          <div className="bg-[#1C1C1F] rounded-2xl overflow-hidden border border-zinc-800/50 flex flex-col group">
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
              <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80" alt="Ganhador Camaro" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-[#FF4D3A] text-white text-xs font-bold px-3 py-1.5 rounded-sm flex items-center shadow-lg">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                12/01/2024
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-black text-white leading-tight mb-4 uppercase">CHEVROLET CAMARO SS</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-zinc-300">
                  <Trophy className="w-4 h-4 text-[#FF4D3A] mr-2 flex-shrink-0" />
                  <span className="font-bold">Lucas Mendes</span>
                </div>
                <div className="flex items-center text-zinc-400 text-sm">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Rio de Janeiro / RJ</span>
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Cota Premiada</span>
                  <div className="flex items-center bg-zinc-800/50 px-3 py-1.5 rounded text-[#FF4D3A] font-mono font-bold">
                    <Ticket className="w-3.5 h-3.5 mr-1.5" />
                    345678
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Winner Card 6 */}
          <div className="bg-[#1C1C1F] rounded-2xl overflow-hidden border border-zinc-800/50 flex flex-col group">
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 to-zinc-900"></div>
              <div className="text-8xl text-yellow-500 font-black relative z-10 drop-shadow-2xl">$</div>
              <div className="absolute top-4 left-4 bg-[#FF4D3A] text-white text-xs font-bold px-3 py-1.5 rounded-sm flex items-center shadow-lg z-20">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                20/12/2023
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-black text-white leading-tight mb-4 uppercase">R$ 50.000,00 NO PIX</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-zinc-300">
                  <Trophy className="w-4 h-4 text-[#FF4D3A] mr-2 flex-shrink-0" />
                  <span className="font-bold">Juliana Pereira</span>
                </div>
                <div className="flex items-center text-zinc-400 text-sm">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Salvador / BA</span>
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Cota Premiada</span>
                  <div className="flex items-center bg-zinc-800/50 px-3 py-1.5 rounded text-[#FF4D3A] font-mono font-bold">
                    <Ticket className="w-3.5 h-3.5 mr-1.5" />
                    901234
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
