import React from 'react';
import { BarChart3, ChevronLeft, ChevronRight, Eye, Filter, Pencil, Plus, Search, Trash2, X, TrendingUp, DollarSign, Ticket, AlertTriangle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useAdminCampaigns } from '@/hooks/useAdminCampaigns';
import { formatCurrency } from '@/lib/formatters';
import { deleteCampaign, updateCampaignStatus } from '@/services/adminCampaigns';
import { getSupabaseClient } from '@/lib/supabase/client';
import type { AdminCampaign, AdminCampaignStatus, Campaign } from '@/types/domain';
import { DeleteConfirmationModal } from '@/features/admin/components/DeleteConfirmationModal';
import { CampaignStatsModal } from '@/features/admin/components/CampaignStatsModal';
import { EditCampaignModal } from '@/features/admin/components/EditCampaignModal';

const statusLabels: Record<AdminCampaignStatus, string> = {
  active: 'ATIVA',
  draft: 'RASCUNHO',
  completed: 'CONCLUIDA',
};

const statusClasses: Record<AdminCampaignStatus, string> = {
  active: 'bg-[#3A2421] text-[#F2B2A8]',
  draft: 'bg-[#313131] text-white/70',
  completed: 'bg-[#3A3420] text-[#E7C75E]',
};

export function AdminCampaignsPage() {
  const { campaigns, loading, refetch } = useAdminCampaigns();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | AdminCampaignStatus>('all');
  
  // Modal states
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; campaign: AdminCampaign | null }>({ isOpen: false, campaign: null });
  const [statsModal, setStatsModal] = useState<{ isOpen: boolean; campaign: AdminCampaign | null }>({ isOpen: false, campaign: null });
  const [editModal, setEditModal] = useState<{ isOpen: boolean; campaign: AdminCampaign | null }>({ isOpen: false, campaign: null });

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesQuery = `${campaign.title} ${campaign.code}`.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === 'all' ? true : campaign.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [campaigns, query, status]);

  if (loading) {
    return <div className="text-white/60 uppercase tracking-[0.3em] text-sm">Carregando campanhas...</div>;
  }

  const handleDelete = async () => {
    if (!deleteModal.campaign) return;
    try {
      await deleteCampaign(deleteModal.campaign.id);
      setDeleteModal({ isOpen: false, campaign: null });
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      refetch?.();
    } catch (error) {
      console.error('Error deleting campaign:', error);
      alert('Erro ao excluir campanha. Tente novamente.');
    }
  };

  const handleStatusChange = async (campaignId: string, newStatus: AdminCampaignStatus) => {
    try {
      await updateCampaignStatus(campaignId, newStatus);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      refetch?.();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Erro ao atualizar status. Tente novamente.');
    }
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
        <div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white">Campanhas</h1>
          <p className="text-xl text-[#D3AEA6] mt-3 max-w-3xl">Gerencie seus sorteios ativos, rascunhos e historicos de premiacoes em uma interface de alta performance.</p>
        </div>
        <div className="grid grid-cols-2 bg-[#2A2A2A] border border-white/5 min-w-[320px]">
          <div className="px-8 py-4 border-r border-white/5">
            <p className="text-xs uppercase tracking-[0.3em] text-white/45 mb-2">Total Ativo</p>
            <p className="text-2xl font-black text-white">{campaigns.filter((campaign) => campaign.status === 'active').length}</p>
          </div>
          <div className="px-8 py-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/45 mb-2">Receita Mensal</p>
            <p className="text-2xl font-black text-[#E8C55D]">{formatCurrency(campaigns.reduce((sum, campaign) => sum + campaign.revenue, 0))}</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.2fr)_280px_280px] gap-5">
        <label className="bg-[#232323] px-6 py-5 flex items-center gap-4 border border-white/5">
          <Search className="w-6 h-6 text-[#C89C96]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nome da campanha ou premio..."
            className="bg-transparent outline-none w-full text-2xl text-[#C89C96] placeholder:text-[#8C6D68]"
          />
        </label>
        <label className="bg-[#232323] border border-white/5 px-6 py-5">
          <select value={status} onChange={(event) => setStatus(event.target.value as 'all' | AdminCampaignStatus)} className="bg-transparent w-full outline-none text-2xl text-white">
            <option value="all">Todos os Status</option>
            <option value="active">Ativas</option>
            <option value="draft">Rascunhos</option>
            <option value="completed">Concluidas</option>
          </select>
        </label>
        <button className="bg-[#353535] border border-white/5 px-6 py-5 text-2xl text-white font-semibold flex items-center justify-center gap-3">
          <Filter className="w-6 h-6" />
          Filtros Avancados
        </button>
      </section>

      <section className="rounded-[2rem] border border-white/8 overflow-hidden bg-[#171717]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px]">
            <thead className="bg-[#111111]">
              <tr className="text-left text-xs uppercase tracking-[0.35em] text-[#D0A8A0]">
                <th className="px-8 py-7 font-semibold">Campanha</th>
                <th className="px-8 py-7 font-semibold">Progresso de Vendas</th>
                <th className="px-8 py-7 font-semibold">Receita</th>
                <th className="px-8 py-7 font-semibold">Status</th>
                <th className="px-8 py-7 font-semibold text-right">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map((campaign) => {
                const progress = campaign.totalTickets > 0 ? Math.round((campaign.soldTickets / campaign.totalTickets) * 100) : 0;

                return (
                  <tr key={campaign.id} className="border-t border-white/5">
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-20 h-20 rounded-sm overflow-hidden bg-white/5">
                          <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="text-[2rem] font-bold leading-tight text-white">{campaign.title}</h3>
                          <p className="text-2xl text-[#C8A6A0]">ID: {campaign.code}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="max-w-[280px]">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`${progress === 100 ? 'text-[#E5C24B]' : 'text-[#F3A89F]'} text-2xl font-bold`}>{progress}%</span>
                          <span className="text-xl text-white/70">
                            {campaign.soldTickets.toLocaleString('pt-BR')} / {campaign.totalTickets.toLocaleString('pt-BR')}
                          </span>
                        </div>
                        <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${campaign.status === 'completed' ? 'bg-[#E5C24B]' : campaign.status === 'draft' ? 'bg-white/20' : 'bg-[#FF5A46]'}`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <p className="text-[2.2rem] font-black text-white leading-none">{formatCurrency(campaign.revenue)}</p>
                      <p className={`mt-2 text-xl ${campaign.status === 'active' ? 'text-[#E5C24B]' : 'text-white/45'}`}>{campaign.trendLabel}</p>
                    </td>
                    <td className="px-8 py-8">
                      <span className={`inline-flex rounded-full px-5 py-3 text-sm font-black ${statusClasses[campaign.status]}`}>{statusLabels[campaign.status]}</span>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex items-center justify-end gap-6">
                        <ActionButton 
                          icon={<Pencil className="w-6 h-6" />} 
                          onClick={() => setEditModal({ isOpen: true, campaign })}
                          title="Editar campanha"
                        />
                        <ActionButton 
                          icon={campaign.status === 'completed' ? <Eye className="w-6 h-6" /> : <BarChart3 className="w-6 h-6" />} 
                          onClick={() => setStatsModal({ isOpen: true, campaign })}
                          title={campaign.status === 'completed' ? 'Ver campanha' : 'Ver estatísticas'}
                        />
                        <ActionButton 
                          icon={<Trash2 className="w-6 h-6" />} 
                          onClick={() => setDeleteModal({ isOpen: true, campaign })}
                          title="Excluir campanha"
                          variant="danger"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-7 border-t border-white/5 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
          <p className="text-2xl text-white/75">Exibindo 1-{filteredCampaigns.length} de {campaigns.length} campanhas</p>
          <div className="flex items-center gap-3">
            <PaginationButton icon={<ChevronLeft className="w-6 h-6" />} />
            <PaginationButton active label="1" />
            <PaginationButton label="2" />
            <PaginationButton label="3" />
            <PaginationButton icon={<ChevronRight className="w-6 h-6" />} />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.4fr)_360px] gap-8">
        <article className="rounded-[2.5rem] bg-[#2D2A2A] p-8 md:p-10 relative overflow-hidden">
          <div className="absolute right-[-36px] top-1/2 -translate-y-1/2 w-52 h-52 rounded-full bg-[#5B4743]/60" />
          <div className="relative z-10 max-w-[620px]">
            <h3 className="text-5xl font-black text-white tracking-tight mb-5">Proximo Sorteio em 48h</h3>
            <p className="text-2xl text-[#D2ADA7] leading-relaxed">A campanha da Hilux esta com 82% das cotas vendidas. Prepare a live de encerramento!</p>
            <button className="mt-10 bg-white text-[#151515] px-8 py-5 text-2xl font-bold shadow-lg">Agendar Live</button>
          </div>
        </article>
        <article className="rounded-[2.5rem] bg-[#2D2A2A] p-8 md:p-10">
          <div className="w-12 h-12 rounded-full bg-[#3C3726] text-[#E5C24B] flex items-center justify-center mb-10">
            <TrendingIcon />
          </div>
          <p className="text-2xl text-white font-bold mb-6">Desempenho Semanal</p>
          <p className="text-6xl font-black text-white mb-4">+24%</p>
          <p className="text-xl text-[#CDB2AC]">Comparado a semana passada</p>
        </article>
      </section>

      <footer className="pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xl text-[#C3AAA4]">
        <p>&copy; 2024 Bruno Pickups. Todos os direitos reservados.</p>
        <div className="flex flex-wrap items-center gap-8">
          <span>Relatorio de Seguranca</span>
          <span>Termos do Admin</span>
          <span>Suporte Tecnico</span>
        </div>
      </footer>
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, campaign: null })}
        onConfirm={handleDelete}
        campaign={deleteModal.campaign}
      />

      <CampaignStatsModal
        isOpen={statsModal.isOpen}
        onClose={() => setStatsModal({ isOpen: false, campaign: null })}
        campaign={statsModal.campaign}
      />

      <EditCampaignModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, campaign: null })}
        campaign={editModal.campaign}
        onSuccess={() => {
          setEditModal({ isOpen: false, campaign: null });
          refetch?.();
        }}
      />
    </div>
  );
}

function ActionButton({ icon, onClick, title, variant = 'default' }: { icon: React.ReactNode; onClick?: () => void; title?: string; variant?: 'default' | 'danger' }) {
  const colorClass = variant === 'danger' 
    ? 'text-red-400 hover:text-red-300' 
    : 'text-[#E1B0A8] hover:text-white';
  return (
    <button 
      onClick={onClick} 
      title={title}
      className={`${colorClass} transition-colors p-1 rounded hover:bg-white/5`}
    >
      {icon}
    </button>
  );
}

function PaginationButton({ label, icon, active = false }: { label?: string; icon?: React.ReactNode; active?: boolean }) {
  return (
    <button className={`w-16 h-16 flex items-center justify-center text-2xl ${active ? 'bg-[#FF5A46] text-white' : 'bg-[#2A2A2A] text-white/75'}`}>
      {label ?? icon}
    </button>
  );
}

function TrendingIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </svg>
  );
}
