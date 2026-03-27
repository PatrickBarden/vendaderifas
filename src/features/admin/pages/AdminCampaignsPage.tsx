import React from 'react';
import { Edit, Eye, Filter, Pause, Play, Plus, Search, Trash2 } from 'lucide-react';
import { useCampaigns } from '@/hooks/useCampaigns';
import { formatCurrency } from '@/lib/formatters';

export function AdminCampaignsPage() {
  const { campaigns, loading } = useCampaigns();

  if (loading) {
    return <div className="text-zinc-400">Carregando campanhas...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Campanhas</h1>
          <p className="text-zinc-400 text-sm mt-1">Gerencie sorteios ativos, rascunhos e finalizados.</p>
        </div>
        <button className="bg-amber-500 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-amber-400 transition-colors shadow-sm flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Nova Campanha
        </button>
      </div>
      <div className="bg-zinc-900 rounded-xl p-4 shadow-sm border border-zinc-800 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input type="text" className="block w-full pl-10 pr-3 py-2 border border-zinc-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 sm:text-sm bg-zinc-950 text-white transition-colors" placeholder="Buscar campanhas..." />
        </div>
        <div className="flex space-x-2 w-full sm:w-auto">
          <select className="bg-zinc-950 border border-zinc-700 text-zinc-300 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2 flex-1 sm:w-auto">
            <option>Todos os Status</option>
            <option>Ativos</option>
            <option>Rascunhos</option>
            <option>Finalizados</option>
          </select>
          <button className="bg-zinc-950 border border-zinc-700 text-zinc-300 px-3 py-2 rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-center">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-950 text-zinc-500 font-medium border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4">Campanha</th>
                <th className="px-6 py-4">Progresso</th>
                <th className="px-6 py-4">Receita</th>
                <th className="px-6 py-4">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {campaigns.map((campaign) => {
                const progress = Math.round((campaign.soldTickets / campaign.totalTickets) * 100);
                return (
                  <tr key={campaign.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-zinc-700">
                          <img src={campaign.heroImage} alt={campaign.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-1 block">{campaign.code}</span>
                          <h4 className="text-base font-bold text-white">{campaign.title}</h4>
                          <p className="text-xs text-zinc-500">{formatCurrency(campaign.ticketPrice)} / número</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 w-48">
                      <div className="flex justify-between text-xs mb-1 font-medium">
                        <span className="text-zinc-400">
                          {campaign.soldTickets} / {campaign.totalTickets}
                        </span>
                        <span className="text-amber-500">{progress}%</span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-emerald-500">{formatCurrency(campaign.soldTickets * campaign.ticketPrice)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <IconButton icon={<Eye className="w-4 h-4" />} />
                        <IconButton icon={progress === 0 ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />} />
                        <IconButton icon={<Edit className="w-4 h-4" />} />
                        <IconButton icon={<Trash2 className="w-4 h-4" />} danger />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function IconButton({ icon, danger = false }: { icon: React.ReactNode; danger?: boolean }) {
  return <button className={`p-2 rounded-lg transition-colors ${danger ? 'text-zinc-400 hover:text-red-600 hover:bg-red-50' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>{icon}</button>;
}
