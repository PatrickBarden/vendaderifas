import { CheckCircle, Minus, Plus, Rocket, Shield, Star, Ticket } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCampaign } from '@/hooks/useCampaign';
import { formatCurrency } from '@/lib/formatters';
import { PurchaseModal } from '../components/PurchaseModal';

export function CampaignDetailsPage() {
  const { id } = useParams();
  const { campaign, loading } = useCampaign(id);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(100);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  if (loading || !campaign) {
    return (
      <div className="min-h-screen bg-[#121214] text-white flex items-center justify-center">
        <p className="text-zinc-400 text-sm uppercase tracking-[0.3em]">Carregando campanha...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#121214] min-h-screen font-sans pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-3xl overflow-hidden bg-[#1C1C1F] border border-zinc-800/50">
              <div className="aspect-[4/3] md:aspect-[16/10] relative">
                <img src={campaign.heroImage} alt={campaign.title} className="w-full h-full object-cover" />
                <div className="absolute top-6 left-6 bg-yellow-500 text-black text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center shadow-lg">
                  <Star className="w-3.5 h-3.5 mr-1.5 fill-black" />
                  Edicao Limitada
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 p-4 bg-[#121214]">
                {campaign.gallery.map((image) => (
                  <button key={image} className="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-zinc-700 transition-colors relative bg-zinc-900">
                    <img src={image} alt={campaign.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#1C1C1F] rounded-3xl p-8 border border-zinc-800/50">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#FF4D3A]/10 flex items-center justify-center mr-4">
                  <Ticket className="w-5 h-5 text-[#FF4D3A]" />
                </div>
                <h2 className="text-2xl font-black tracking-tight text-white">Detalhes da Rifa</h2>
              </div>
              <p className="text-zinc-400 leading-relaxed mb-8">{campaign.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <Bullet text="Carro em destaque com fotos e informacoes completas" />
                <Bullet text="Compra de cotas em poucos cliques" />
                <Bullet text="Campanha exclusiva com quantidade limitada" />
                <Bullet text="Sorteio pensado para quem quer realizar o sonho do carro proprio" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <div className="bg-[#1C1C1F] rounded-[2rem] p-8 border border-zinc-800/50">
                <div className="mb-8">
                  <h1 className="text-3xl font-black tracking-tighter text-white mb-2 leading-tight uppercase">{campaign.title}</h1>
                  <p className="text-zinc-500 text-sm">Codigo da campanha: {campaign.code}</p>
                </div>
                <div className="mb-8">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Por apenas</p>
                  <div className="flex items-end gap-3">
                    <span className="text-5xl font-black text-[#FF4D3A] tracking-tighter">{formatCurrency(campaign.ticketPrice)}</span>
                    {campaign.originalPrice ? <span className="text-lg text-zinc-500 line-through mb-1">{formatCurrency(campaign.originalPrice)}</span> : null}
                  </div>
                </div>
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center">
                    <Ticket className="w-4 h-4 text-[#FF4D3A] mr-2" /> Escolha a quantidade de cotas
                  </h3>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {[10, 50, 100, 500].map((value) => (
                      <button
                        key={value}
                        onClick={() => setSelectedQuantity(value)}
                        className={`py-3 rounded-xl font-bold text-sm transition-colors ${selectedQuantity === value ? 'bg-[#FF4D3A] text-white' : 'bg-[#121214] text-zinc-400 hover:bg-zinc-800 border border-zinc-800/50'}`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  <div className="bg-[#121214] rounded-2xl p-2 flex items-center justify-between border border-zinc-800/50 border-dashed">
                    <button onClick={() => setSelectedQuantity((prev) => Math.max(10, prev - 10))} className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="text-center">
                      <span className="text-xl font-black text-white">{selectedQuantity} Cotas</span>
                    </div>
                    <button onClick={() => setSelectedQuantity((prev) => prev + 10)} className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => setIsPurchaseModalOpen(true)}
                  className="w-full bg-[#FF4D3A] text-white py-5 rounded-2xl font-black text-lg uppercase tracking-wider hover:bg-[#FF3A24] transition-colors flex items-center justify-center shadow-lg shadow-red-500/20 mb-6"
                >
                  COMPRAR AGORA <Rocket className="w-5 h-5 ml-2" />
                </button>

                <PurchaseModal
                  isOpen={isPurchaseModalOpen}
                  onClose={() => setIsPurchaseModalOpen(false)}
                  campaign={{
                    id: campaign.id,
                    title: campaign.title,
                    code: campaign.code,
                    ticketPrice: campaign.ticketPrice,
                    heroImage: campaign.heroImage
                  }}
                  selectedQuantity={selectedQuantity}
                />
                <div className="flex items-center justify-center gap-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  <div className="flex items-center">
                    <Shield className="w-3 h-3 mr-1.5" /> Compra Segura
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1.5" /> Sorteio Transparente
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

function Bullet({ text }: { text: string }) {
  return (
    <div className="flex items-center text-zinc-300">
      <CheckCircle className="w-5 h-5 text-[#FF4D3A] mr-3 flex-shrink-0" />
      <span>{text}</span>
    </div>
  );
}
