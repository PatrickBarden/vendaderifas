import { useState, useRef, useCallback } from 'react';
import { X, Upload, Plus, Image as ImageIcon, Loader2, AlertCircle, FileImage } from 'lucide-react';
import { createCampaign } from '@/services/adminCampaigns';

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Helper functions
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const validateFile = (file: File): string | null => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return `Tipo não permitido: ${file.type}. Use JPG, PNG ou WebP.`;
  }
  if (file.size > MAX_FILE_SIZE) {
    return `Arquivo muito grande: ${formatFileSize(file.size)}. Máximo: ${formatFileSize(MAX_FILE_SIZE)}.`;
  }
  return null;
};

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateCampaignModal({ isOpen, onClose, onSuccess }: CreateCampaignModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState<string>('');
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    shortDescription: '',
    description: '',
    category: 'pickup' as const,
    ticketPrice: '',
    originalPrice: '',
    totalTickets: '',
    badge: '',
    drawDate: '',
  });

  const heroInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleHeroImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const error = validateFile(file);
      if (error) {
        setFileErrors(prev => [...prev, error]);
        setTimeout(() => setFileErrors(prev => prev.filter(e => e !== error)), 5000);
        return;
      }
      setHeroImage(file);
      setHeroPreview(URL.createObjectURL(file));
    }
  }, []);

  const handleGalleryImagesChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles: File[] = [];
    const errors: string[] = [];
    
    files.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(error);
      } else {
        validFiles.push(file);
      }
    });
    
    if (errors.length > 0) {
      setFileErrors(prev => [...prev, ...errors]);
      setTimeout(() => setFileErrors(prev => prev.filter(e => !errors.includes(e))), 5000);
    }
    
    if (validFiles.length > 0) {
      const newFiles = [...galleryImages, ...validFiles].slice(0, 5);
      setGalleryImages(newFiles);
      setGalleryPreviews(newFiles.map(file => URL.createObjectURL(file)));
    }
  }, [galleryImages]);

  const removeHeroImage = useCallback(() => {
    setHeroImage(null);
    setHeroPreview('');
    if (heroInputRef.current) heroInputRef.current.value = '';
  }, []);

  const removeGalleryImage = useCallback((index: number) => {
    const newImages = galleryImages.filter((_, i) => i !== index);
    const newPreviews = galleryPreviews.filter((_, i) => i !== index);
    setGalleryImages(newImages);
    setGalleryPreviews(newPreviews);
    URL.revokeObjectURL(galleryPreviews[index]);
  }, [galleryImages, galleryPreviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroImage) {
      alert('Por favor, adicione uma imagem principal');
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);
    setUploadStatus('Preparando upload...');

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
      setUploadStatus(prev => 
        prev === 'Preparando upload...' ? 'Enviando imagens...' : 
        prev === 'Enviando imagens...' ? 'Quase pronto...' : 'Finalizando...'
      );
    }, 1000);

    try {
      await createCampaign({
        ...formData,
        ticketPrice: parseFloat(formData.ticketPrice),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        totalTickets: parseInt(formData.totalTickets),
        heroImage,
        galleryImages,
      });
      clearInterval(progressInterval);
      setUploadProgress(100);
      onSuccess?.();
      onClose();
      // Reset form
      setFormData({
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
      });
      setHeroImage(null);
      setHeroPreview('');
      setGalleryImages([]);
      setGalleryPreviews([]);
      setUploadProgress(0);
      setUploadStatus('');
    } catch (error: any) {
      clearInterval(progressInterval);
      console.error('Error creating campaign:', error);
      alert(error.message || 'Erro ao criar campanha. Tente novamente.');
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
      setUploadStatus('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#1C1C1C] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#1C1C1C] border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-black text-white">Nova Campanha</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#FF5A46]" />
              Imagens da Campanha
            </h3>
            
            {/* Hero Image */}
            <div className="space-y-2">
              <label className="text-sm text-white/70 flex items-center justify-between">
                <span>Imagem Principal (Obrigatória)</span>
                <span className="text-xs text-zinc-500">Máx. {formatFileSize(MAX_FILE_SIZE)}</span>
              </label>
              <div className="relative">
                {heroPreview ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-800">
                    <img src={heroPreview} alt="Hero" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                      {heroImage && formatFileSize(heroImage.size)}
                    </div>
                    <button
                      type="button"
                      onClick={removeHeroImage}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => heroInputRef.current?.click()}
                    className="w-full aspect-video rounded-xl border-2 border-dashed border-zinc-700 hover:border-[#FF5A46] transition-colors flex flex-col items-center justify-center gap-3 text-zinc-500 hover:text-[#FF5A46]"
                  >
                    <FileImage className="w-12 h-12" />
                    <span className="text-sm font-medium">Clique para upload da imagem principal</span>
                    <span className="text-xs text-zinc-600">JPG, PNG ou WebP (até {formatFileSize(MAX_FILE_SIZE)})</span>
                  </button>
                )}
                <input
                  ref={heroInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleHeroImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Gallery Images */}
            <div className="space-y-2">
              <label className="text-sm text-white/70 flex items-center justify-between">
                <span>Galeria de Imagens (Máx. 5)</span>
                <span className="text-xs text-zinc-500">Máx. {formatFileSize(MAX_FILE_SIZE)} cada</span>
              </label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {galleryPreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-zinc-800">
                    <img src={preview} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute bottom-1 left-1 bg-black/70 px-1.5 py-0.5 rounded text-[10px] text-white">
                      {galleryImages[index] && formatFileSize(galleryImages[index].size)}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {galleryImages.length < 5 && (
                  <button
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    className="aspect-square rounded-lg border-2 border-dashed border-zinc-700 hover:border-[#FF5A46] transition-colors flex flex-col items-center justify-center gap-1 text-zinc-500 hover:text-[#FF5A46]"
                  >
                    <Plus className="w-6 h-6" />
                    <span className="text-xs">Adicionar</span>
                  </button>
                )}
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleGalleryImagesChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Error Messages */}
            {fileErrors.length > 0 && (
              <div className="space-y-2">
                {fileErrors.map((error, index) => (
                  <div key={index} className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-2 rounded">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Progress */}
            {isLoading && uploadProgress > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">{uploadStatus}</span>
                  <span className="text-[#FF5A46] font-bold">{uploadProgress}%</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF5A46] transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
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
                  placeholder="#1001"
                  className="w-full bg-[#262626] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5A46]"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70">Título *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="RAM 2500 Laramie + R$ 50 mil"
                  className="w-full bg-[#262626] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5A46]"
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
                placeholder="Pickup premium com alta procura e bônus em dinheiro."
                className="w-full bg-[#262626] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5A46]"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70">Detalhes da Rifa *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="A lendária RAM 2500 Laramie em versão exclusiva, pronta para uma campanha de alto giro..."
                rows={4}
                className="w-full bg-[#262626] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5A46] resize-none"
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
                  placeholder="1.50"
                  className="w-full bg-[#262626] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5A46]"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70">Preço Original (R$) <span className="text-zinc-500">(opcional)</span></label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  placeholder="3.00"
                  className="w-full bg-[#262626] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5A46]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70">Total de Cotas *</label>
                <input
                  type="number"
                  min="1"
                  value={formData.totalTickets}
                  onChange={(e) => setFormData({ ...formData, totalTickets: e.target.value })}
                  placeholder="100000"
                  className="w-full bg-[#262626] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5A46]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Opções Adicionais</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-white/70">Categoria</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as 'pickup' | 'car' | 'cash' })}
                  className="w-full bg-[#262626] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF5A46]"
                >
                  <option value="pickup">Pickup</option>
                  <option value="car">Carro</option>
                  <option value="cash">Dinheiro</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70">Badge <span className="text-zinc-500">(opcional)</span></label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="Destaque, VIP..."
                  className="w-full bg-[#262626] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5A46]"
                />
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
                  Criando...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Criar Campanha
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
