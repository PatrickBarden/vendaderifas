import { Calendar, MapPin, Ticket, Trophy } from 'lucide-react';
import { useWinners } from '@/hooks/useWinners';

export function WinnersPage() {
  const { winners, loading } = useWinners();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121214] text-white flex items-center justify-center">
        <p className="text-zinc-400 text-sm uppercase tracking-[0.3em]">Carregando ganhadores...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#121214] min-h-screen pb-24 font-sans pt-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase relative inline-block mb-4">
            ULTIMOS GANHADORES
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#FF4D3A]" />
          </h1>
          <p className="text-zinc-400 mt-8 max-w-2xl text-lg">Veja quem ja foi contemplado, conheca os premios entregues e inspire-se para ser o proximo ganhador.</p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {winners.map((winner) => (
            <div key={winner.id} className="bg-[#1C1C1F] rounded-2xl overflow-hidden border border-zinc-800/50 flex flex-col group">
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
                <img src={winner.image} alt={winner.prizeDescription} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-[#FF4D3A] text-white text-xs font-bold px-3 py-1.5 rounded-sm flex items-center shadow-lg">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  {winner.drawDate}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-black text-white leading-tight mb-4 uppercase">{winner.campaignTitle}</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-zinc-300">
                    <Trophy className="w-4 h-4 text-[#FF4D3A] mr-2 flex-shrink-0" />
                    <span className="font-bold">{winner.winnerName}</span>
                  </div>
                  <div className="flex items-center text-zinc-400 text-sm">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>
                      {winner.city} / {winner.state}
                    </span>
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-zinc-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Cota Premiada</span>
                    <div className="flex items-center bg-zinc-800/50 px-3 py-1.5 rounded text-[#FF4D3A] font-mono font-bold">
                      <Ticket className="w-3.5 h-3.5 mr-1.5" />
                      {winner.winningTicket}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
