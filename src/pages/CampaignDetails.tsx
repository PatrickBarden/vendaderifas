import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Shield, Zap, ArrowLeft, Info, Share2, Heart, Star, Ticket, ExternalLink, Minus, Plus, Rocket } from 'lucide-react';

export function CampaignDetails() {
  const [selectedQuantity, setSelectedQuantity] = useState<number>(100);
  const pricePerNumber = 0.85;
  const originalPrice = 1.50;

  const handleQuantityChange = (amount: number) => {
    setSelectedQuantity(amount);
  };

  const incrementQuantity = () => {
    setSelectedQuantity(prev => prev + 10);
  };

  const decrementQuantity = () => {
    if (selectedQuantity > 10) {
      setSelectedQuantity(prev => prev - 10);
    }
  };

  return (
    <div className="bg-[#121214] min-h-screen font-sans pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column - Images & Info */}
          <div className="lg:col-span-7 space-y-8">
            {/* Main Image Gallery */}
            <div className="rounded-3xl overflow-hidden bg-[#1C1C1F] border border-zinc-800/50">
              <div className="aspect-[4/3] md:aspect-[16/10] relative">
                <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80" alt="RAM 2500 Laramie" className="w-full h-full object-cover" />
                <div className="absolute top-6 left-6 bg-yellow-500 text-black text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center shadow-lg">
                  <Star className="w-3.5 h-3.5 mr-1.5 fill-black" />
                  Edição Limitada
                </div>
              </div>
              
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4 p-4 bg-[#121214]">
                <button className="aspect-square rounded-xl overflow-hidden border-2 border-[#FF4D3A] relative">
                  <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80" alt="Thumbnail 1" className="w-full h-full object-cover" />
                </button>
                <button className="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-zinc-700 transition-colors relative bg-zinc-900">
                  <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80" alt="Thumbnail 2" className="w-full h-full object-cover opacity-50" />
                </button>
                <button className="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-zinc-700 transition-colors relative bg-zinc-900">
                  <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80" alt="Thumbnail 3" className="w-full h-full object-cover opacity-50" />
                </button>
                <button className="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-zinc-700 transition-colors relative bg-zinc-900 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                    <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-[#1C1C1F] rounded-3xl p-8 border border-zinc-800/50">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#FF4D3A]/10 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-[#FF4D3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-black tracking-tight text-white">Detalhes do Prêmio</h2>
              </div>
              
              <p className="text-zinc-400 leading-relaxed mb-8">
                A lendária RAM 2500 Laramie em sua versão mais exclusiva. Equipada com o motor Cummins 6.7 Turbo Diesel de 365cv, esta unidade conta com kit lift de 4 polegadas, pneus 37" e interior personalizado em couro napa.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <div className="flex items-center text-zinc-300">
                  <CheckCircle className="w-5 h-5 text-[#FF4D3A] mr-3 flex-shrink-0" />
                  <span>Ano/Modelo: 2023/2023</span>
                </div>
                <div className="flex items-center text-zinc-300">
                  <CheckCircle className="w-5 h-5 text-[#FF4D3A] mr-3 flex-shrink-0" />
                  <span>Apenas 5.000km rodados</span>
                </div>
                <div className="flex items-center text-zinc-300">
                  <CheckCircle className="w-5 h-5 text-[#FF4D3A] mr-3 flex-shrink-0" />
                  <span>Som Alpine Premium</span>
                </div>
                <div className="flex items-center text-zinc-300">
                  <CheckCircle className="w-5 h-5 text-[#FF4D3A] mr-3 flex-shrink-0" />
                  <span>Pintura Cerâmica Pro</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-zinc-800/50">
                <div>
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Data do Sorteio</h4>
                  <p className="text-white font-bold text-lg mb-1">15 de Junho de 2024</p>
                  <p className="text-xs text-zinc-500">Baseado no resultado da Loteria Federal</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Regras Gerais</h4>
                  <a href="#" className="inline-flex items-center text-white font-bold hover:text-[#FF4D3A] transition-colors">
                    Ver Regulamento Completo <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Actions */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <div className="bg-[#1C1C1F] rounded-[2rem] p-8 border border-zinc-800/50">
                
                {/* Title Area */}
                <div className="mb-8">
                  <h1 className="text-3xl font-black tracking-tighter text-white mb-2 leading-tight uppercase">
                    RAM 2500 LARAMIE - <br/>
                    <span className="text-[#FF4D3A]">EDIÇÃO LIMITADA</span>
                  </h1>
                  <p className="text-zinc-500 text-sm">Cód. da Campanha: #2983-BR</p>
                </div>

                {/* Price Area */}
                <div className="mb-8">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Por Apenas</p>
                  <div className="flex items-end gap-3">
                    <span className="text-5xl font-black text-[#FF4D3A] tracking-tighter">R$ 0,85</span>
                    <span className="text-lg text-zinc-500 line-through mb-1">R$ 1,50</span>
                    <span className="bg-red-500/10 text-[#FF4D3A] text-[10px] font-bold px-2 py-1 rounded border border-red-500/20 mb-2 uppercase tracking-wider">Promoção</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-10">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-white font-bold">Progresso de Vendas</span>
                    <span className="text-[#FF4D3A] font-black">65%</span>
                  </div>
                  <div className="w-full bg-zinc-900 rounded-full h-2 mb-3 overflow-hidden">
                    <div className="bg-[#FF4D3A] h-full rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-xs text-zinc-500 text-center italic">Faltam apenas 35% para o sorteio ser liberado!</p>
                </div>

                {/* Timer */}
                <div className="bg-[#121214] rounded-2xl p-6 mb-8 border border-zinc-800/50">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center mb-4">Oportunidade termina em</p>
                  <div className="flex justify-center gap-3">
                    <div className="bg-[#1C1C1F] rounded-xl w-16 py-3 flex flex-col items-center justify-center border border-zinc-800/50">
                      <span className="text-2xl font-black text-white">02</span>
                      <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Dias</span>
                    </div>
                    <div className="bg-[#1C1C1F] rounded-xl w-16 py-3 flex flex-col items-center justify-center border border-zinc-800/50">
                      <span className="text-2xl font-black text-white">14</span>
                      <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Horas</span>
                    </div>
                    <div className="bg-[#1C1C1F] rounded-xl w-16 py-3 flex flex-col items-center justify-center border border-zinc-800/50">
                      <span className="text-2xl font-black text-white">52</span>
                      <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Mins</span>
                    </div>
                    <div className="bg-[#1C1C1F] rounded-xl w-16 py-3 flex flex-col items-center justify-center border border-zinc-800/50">
                      <span className="text-2xl font-black text-white">19</span>
                      <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Segs</span>
                    </div>
                  </div>
                </div>

                {/* Quantity Selection */}
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center">
                    <Ticket className="w-4 h-4 text-[#FF4D3A] mr-2" /> Escolha a quantidade de cotas
                  </h3>
                  
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <button 
                      onClick={() => handleQuantityChange(10)} 
                      className={`py-3 rounded-xl font-bold text-sm transition-colors ${selectedQuantity === 10 ? 'bg-[#FF4D3A] text-white' : 'bg-[#121214] text-zinc-400 hover:bg-zinc-800 border border-zinc-800/50'}`}
                    >
                      10
                    </button>
                    <button 
                      onClick={() => handleQuantityChange(50)} 
                      className={`py-3 rounded-xl font-bold text-sm transition-colors ${selectedQuantity === 50 ? 'bg-[#FF4D3A] text-white' : 'bg-[#121214] text-zinc-400 hover:bg-zinc-800 border border-zinc-800/50'}`}
                    >
                      50
                    </button>
                    <button 
                      onClick={() => handleQuantityChange(100)} 
                      className={`py-3 rounded-xl font-bold text-sm transition-colors ${selectedQuantity === 100 ? 'bg-[#FF4D3A] text-white' : 'bg-[#121214] text-zinc-400 hover:bg-zinc-800 border border-zinc-800/50'}`}
                    >
                      100
                    </button>
                    <button 
                      onClick={() => handleQuantityChange(500)} 
                      className={`py-3 rounded-xl font-bold text-sm transition-colors ${selectedQuantity === 500 ? 'bg-[#FF4D3A] text-white' : 'bg-[#121214] text-zinc-400 hover:bg-zinc-800 border border-zinc-800/50'}`}
                    >
                      500
                    </button>
                  </div>

                  <div className="bg-[#121214] rounded-2xl p-2 flex items-center justify-between border border-zinc-800/50 border-dashed">
                    <button onClick={decrementQuantity} className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="text-center">
                      <span className="text-xl font-black text-white">{selectedQuantity} Cotas</span>
                    </div>
                    <button onClick={incrementQuantity} className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Buy Button */}
                <button className="w-full bg-[#FF4D3A] text-white py-5 rounded-2xl font-black text-lg uppercase tracking-wider hover:bg-[#FF3A24] transition-colors flex items-center justify-center shadow-lg shadow-red-500/20 mb-6">
                  COMPRAR AGORA <Rocket className="w-5 h-5 ml-2" />
                </button>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  <div className="flex items-center">
                    <Shield className="w-3 h-3 mr-1.5" /> Pagamento Seguro
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1.5" /> Sorteio Auditado
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
