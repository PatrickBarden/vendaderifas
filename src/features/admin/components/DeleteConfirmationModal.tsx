import { X, AlertTriangle, Trash2 } from 'lucide-react';
import type { AdminCampaign } from '@/types/domain';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  campaign: AdminCampaign | null;
}

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm, campaign }: DeleteConfirmationModalProps) {
  if (!isOpen || !campaign) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#1C1C1C] rounded-2xl w-full max-w-md overflow-hidden">
        <div className="bg-red-500/10 p-6 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </div>
        
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Excluir Campanha?</h3>
          <p className="text-white/60 mb-6">
            Você está prestes a excluir <strong className="text-white">{campaign.title}</strong>.
            Esta ação não pode ser desfeita.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Excluir
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
