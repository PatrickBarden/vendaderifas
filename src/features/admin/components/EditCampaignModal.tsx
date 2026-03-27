import { useState, useEffect, useCallback } from 'react';
import { X, Upload, Plus, Image as ImageIcon, Loader2 } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase/client';
import type { AdminCampaign, CampaignCategory } from '@/types/domain';

interface EditCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: AdminCampaign | null;
  onSuccess?: () => void;
}

interface CampaignFormData {
  code: string;
  title: string;
  shortDescription: string;
  description: string;
  category: CampaignCategory;
  ticketPrice: string;
  originalPrice: string;
  totalTickets: string;
  badge: string;
  drawDate: string;
  status: 'draft' | 'active' | 'completed';
}

export function EditCampaignModal({ isOpen, onClose, campaign, onSuccess }: EditCampaignModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState<string>('');
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<CampaignFormData>({
    code: '',
    title: '',
    shortDescription: '',
    description: '',
    category: 'pickup',
    ticketPrice: '',
    originalPrice: '',
    totalTickets: '',
    badge: '',
    drawDate: '',
    status: 'active',
  });

  const fetchCampaignDetails = useCallback(async () => {
    if (!campaign) return;
    
    setIsFetching(true);
    const supabase = getSupabaseClient();
    if (!supabase) {
      setIsFetching(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', campaign.id)
        .single();

      if (error || !data) {
        setIsFetching(false);
        return;
      }

      setFormData({
        code: data.code || '',
        title: data.title || '',
        shortDescription: data.short_description || '',
        description: data.description || '',
        category: data.category || 'pickup',
        ticketPrice: String(data.ticket_price || ''),
        originalPrice: String(data.original_price || ''),
        totalTickets: String(data.total_tickets || ''),
        badge: data.badge || '',
        drawDate: data.draw_date ? data.draw_date.split('T')[0] : '',
        status: data.status || 'active',
      });

      setHeroPreview(data.hero_image || '');
      setExistingGallery(data.gallery || []);
      setGalleryPreviews([]);
      setGalleryImages([]);
    } catch (error) {
      console.error('Error fetching campaign:', error);
    } finally {
      setIsFetching(false);
    }
  }, [campaign]);

  useEffect(() => {
    if (isOpen && campaign) {
      fetchCampaignDetails();
    }
  }, [isOpen, campaign, fetchCampaignDetails]);

  const handleHeroImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeroImage(file);
      setHeroPreview(URL.createObjectURL(file));
    }
  }, []);

  const handleGalleryImagesChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const totalImages = existingGallery.length + galleryImages.length + files.length;
      if (totalImages > 5) {
        alert('Máximo de 5 imagens na galeria');
        return;
      }
      const newFiles = [...galleryImages, ...files];
      setGalleryImages(newFiles);
      setGalleryPreviews(prev => [...prev, ...files.map(file => URL.createObjectURL(file))]);
    }
  }, [galleryImages, existingGallery.length]);

  const removeHeroImage = useCallback(() => {
    setHeroImage(null);
    setHeroPreview('');
  }, []);

  const removeGalleryImage = useCallback((index: number, isExisting: boolean) => {
    if (isExisting) {
      setExistingGallery(prev => prev.filter((_, i) => i !== index));
    } else {
      const newImages = galleryImages.filter((_, i) => i !== index);
      const newPreviews = galleryPreviews.filter((_, i) => i !== index);
      setGalleryImages(newImages);
      setGalleryPreviews(newPreviews);
    }
  }, [galleryImages, galleryPreviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaign) return;

    setIsLoading(true);
    const supabase = getSupabaseClient();
    if (!supabase) {
      setIsLoading(false);
      alert('Erro: Cliente Supabase não disponível');
      return;
    }

    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setIsLoading(false);
      alert('Erro: Você precisa estar logado para fazer upload de imagens');
      return;
    }

    // Set a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      alert('Erro: O upload está demorando muito. Verifique sua conexão.');
    }, 30000); // 30 seconds timeout

    try {
      // Sanitize code for file path (remove # and special characters)
      const safeCode = formData.code.replace(/[^a-zA-Z0-9-_]/g, '_');
      let heroImageUrl = heroPreview;

      // Upload new hero image if changed
      if (heroImage) {
        const fileExt = heroImage.name.split('.').pop()?.toLowerCase() || 'jpg';
        const fileName = `${safeCode}/hero/${Date.now()}.${fileExt}`;
        
        console.log('Uploading hero image:', fileName, 'Size:', heroImage.size, 'Type:', heroImage.type);
        
        try {
          const { error: uploadError, data: uploadData } = await supabase.storage
            .from('campaigns')
            .upload(fileName, heroImage, { 
              cacheControl: '3600', 
              upsert: false,
              contentType: heroImage.type || 'image/jpeg'
            });

          if (uploadError) {
            console.error('Hero upload error:', uploadError);
            throw new Error(`Erro no upload da imagem principal: ${uploadError.message}`);
          }

          console.log('Hero upload success:', uploadData);
          const { data: urlData } = supabase.storage.from('campaigns').getPublicUrl(fileName);
          heroImageUrl = urlData.publicUrl;
        } catch (heroErr: any) {
          console.error('Hero upload exception:', heroErr);
          throw new Error(`Falha ao enviar imagem principal: ${heroErr.message || 'Erro de rede - verifique sua conexão'}`);
        }
      }

      // Upload new gallery images
      const newGalleryUrls: string[] = [];
      for (let i = 0; i < galleryImages.length; i++) {
        const image = galleryImages[i];
        const fileExt = image.name.split('.').pop()?.toLowerCase() || 'jpg';
        const fileName = `${safeCode}/gallery/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        
        console.log(`Uploading gallery image ${i + 1}/${galleryImages.length}:`, fileName, 'Size:', image.size, 'Type:', image.type);
        
        try {
          const { error: uploadError, data: uploadData } = await supabase.storage
            .from('campaigns')
            .upload(fileName, image, { 
              cacheControl: '3600', 
              upsert: false,
              contentType: image.type || 'image/jpeg'
            });

          if (uploadError) {
            console.error('Gallery upload error:', uploadError);
            throw new Error(`Erro no upload da imagem ${i + 1}: ${uploadError.message}`);
          }

          console.log('Upload success:', uploadData);
          const { data: urlData } = supabase.storage.from('campaigns').getPublicUrl(fileName);
          newGalleryUrls.push(urlData.publicUrl);
        } catch (uploadErr: any) {
          console.error('Upload exception:', uploadErr);
          throw new Error(`Falha ao enviar imagem ${i + 1}: ${uploadErr.message || 'Erro de rede'}`);
        }
      }

      console.log('Updating campaign with gallery:', [...existingGallery, ...newGalleryUrls]);
      const { error: updateError } = await supabase
        .from('campaigns')
        .update({
          code: formData.code,
          title: formData.title,
          short_description: formData.shortDescription,
          description: formData.description,
          category: formData.category,
          ticket_price: parseFloat(formData.ticketPrice),
          original_price: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
          total_tickets: parseInt(formData.totalTickets),
          hero_image: heroImageUrl,
          gallery: [...existingGallery, ...newGalleryUrls],
          badge: formData.badge || null,
          draw_date: formData.drawDate,
          status: formData.status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', campaign.id);

      clearTimeout(timeoutId); // Clear timeout on success

      if (updateError) {
        console.error('Update error:', updateError);
        throw new Error(`Erro ao atualizar: ${updateError.message}`);
      }

      onSuccess?.();
      onClose();
    } catch (error: any) {
      clearTimeout(timeoutId); // Clear timeout on error
      console.error('Error updating campaign:', error);
      alert(error.message || 'Erro ao atualizar campanha. Tente novamente.');
    } finally {
      clearTimeout(timeoutId); // Ensure timeout is cleared
      setIsLoading(false);
    }
  };

  if (!isOpen || !campaign) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#1C1C1C] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#1C1C1C] border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-black text-white">Editar Campanha</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {isFetching ? (
          <div className="p-12 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#FF5A46] animate-spin" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#FF5A46]" />
                Imagens da Campanha
              </h3>
              
              {/* Hero Image */}
              <div className="space-y-2">
                <label className="text-sm text-white/70">Imagem Principal</label>
                <div className="relative">
                  {heroPreview ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-800">
                      <img src={heroPreview} alt="Hero" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={removeHeroImage}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-full aspect-video rounded-xl border-2 border-dashed border-zinc-700 hover:border-[#FF5A46] transition-colors flex flex-col items-center justify-center gap-3 text-zinc-500 hover:text-[#FF5A46] cursor-pointer">
                      <Upload className="w-10 h-10" />
                      <span className="text-sm font-medium">Clique para trocar a imagem principal</span>
                      <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleHeroImageChange} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              {/* Gallery Images */}
              <div className="space-y-2">
                <label className="text-sm text-white/70">Galeria de Imagens (Máx. 5)</label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {/* Existing images */}
                  {existingGallery.map((url, index) => (
                    <div key={`existing-${index}`} className="relative aspect-square rounded-lg overflow-hidden bg-zinc-800">
                      <img src={url} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index, true)}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {/* New images */}
                  {galleryPreviews.map((preview, index) => (
                    <div key={`new-${index}`} className="relative aspect-square rounded-lg overflow-hidden bg-zinc-800">
                      <img src={preview} alt={`New Gallery ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index, false)}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {/* Add button */}
                  {existingGallery.length + galleryImages.length < 5 && (
                    <label className="aspect-square rounded-lg border-2 border-dashed border-zinc-700 hover:border-[#FF5A46] transition-colors flex flex-col items-center justify-center gap-1 text-zinc-500 hover:text-[#FF5A46] cursor-pointer">
                      <Plus className="w-6 h-6" />
                      <span className="text-xs">Adicionar</span>
                      <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleGalleryImagesChange} className="hidden" />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Informações Básicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-white/70">Código da Campanha *</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full bg-[#262626] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF5A46]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/70">Título *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#262626] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF5A46]"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70">Subtítulo / Descrição Curta *</label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full bg-[#262626] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF5A46]"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70">Detalhes da Rifa *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full bg-[#262626] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF5A46] resize-none"
                  required
                />
              </div>
            </div>

            {/* Pricing & Tickets */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Preços e Cotas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-white/70">Preço da Cota (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={formData.ticketPrice}
                    onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
                    className="w-full bg-[#262626] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF5A46]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/70">Preço Original (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full bg-[#262626] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF5A46]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/70">Total de Cotas *</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.totalTickets}
                    onChange={(e) => setFormData({ ...formData, totalTickets: e.target.value })}
                    className="w-full bg-[#262626] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF5A46]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Status & Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Opções e Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-white/70">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'active' | 'completed' })}
                    className="w-full bg-[#262626] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF5A46]"
                  >
                    <option value="draft">Rascunho</option>
                    <option value="active">Ativa</option>
                    <option value="completed">Concluída</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/70">Categoria</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as CampaignCategory })}
                    className="w-full bg-[#262626] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF5A46]"
                  >
                    <option value="pickup">Pickup</option>
                    <option value="car">Carro</option>
                    <option value="cash">Dinheiro</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/70">Badge</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Destaque, VIP..."
                    className="w-full bg-[#262626] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF5A46]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70">Data do Sorteio *</label>
                <input
                  type="date"
                  value={formData.drawDate}
                  onChange={(e) => setFormData({ ...formData, drawDate: e.target.value })}
                  className="w-full bg-[#262626] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF5A46]"
                  required
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-lg text-white/70 hover:text-white font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-[#FF5A46] text-white rounded-lg font-bold hover:bg-[#FF4532] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Salvar Alterações'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
