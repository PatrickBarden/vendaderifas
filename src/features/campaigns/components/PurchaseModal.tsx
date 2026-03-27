import { useState } from 'react';
import { X, User, Mail, Phone, ArrowRight, ArrowLeft, QrCode, Copy, Check, MessageCircle, Smartphone } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import { useOrders } from '@/contexts/OrdersContext';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: {
    id: string;
    title: string;
    code: string;
    ticketPrice: number;
    heroImage: string;
  };
  selectedQuantity: number;
}

type Step = 'details' | 'payment' | 'confirmation';

export function PurchaseModal({ isOpen, onClose, campaign, selectedQuantity }: PurchaseModalProps) {
  const { addOrder } = useOrders();
  const [step, setStep] = useState<Step>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [orderId, setOrderId] = useState('');

  const total = campaign.ticketPrice * selectedQuantity;
  const adminWhatsApp = '555581623856';

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleSubmitDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create order
    const newOrder = addOrder({
      customerName: customerData.name,
      customerEmail: customerData.email,
      customerPhone: customerData.phone,
      campaignId: campaign.id,
      campaignTitle: campaign.title,
      campaignCode: campaign.code,
      quantity: selectedQuantity,
      total: total
    });
    
    setOrderId(newOrder.id);
    setIsSubmitting(false);
    setStep('payment');
  };

  const copyPixCode = () => {
    const pixCode = `00020126580014BR.GOV.PIX0114${adminWhatsApp}520400005303986540${total.toFixed(2).replace('.', '')}5802BR5925${customerData.name}6009SAO PAULO62070503***6304`;
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Olá! Acabei de fazer uma compra na plataforma.\n\n` +
      `*Pedido:* #${orderId}\n` +
      `*Campanha:* ${campaign.title}\n` +
      `*Cotas:* ${selectedQuantity}\n` +
      `*Total:* ${formatCurrency(total)}\n\n` +
      `*Dados do cliente:*\n` +
      `Nome: ${customerData.name}\n` +
      `Email: ${customerData.email}\n` +
      `Telefone: ${customerData.phone}\n\n` +
      `Segue o comprovante de pagamento:`
    );
    window.open(`https://wa.me/${adminWhatsApp}?text=${message}`, '_blank');
  };

  const handleClose = () => {
    setStep('details');
    setCustomerData({ name: '', email: '', phone: '' });
    setOrderId('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-full max-w-sm bg-[#1C1C1F] rounded-2xl border border-zinc-800/50 shadow-2xl max-h-[calc(100vh-2rem)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-zinc-800/50 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FF4D3A]/10 flex items-center justify-center">
              {step === 'details' && <User className="w-4 h-4 text-[#FF4D3A]" />}
              {step === 'payment' && <QrCode className="w-4 h-4 text-[#FF4D3A]" />}
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                {step === 'details' && 'Seus Dados'}
                {step === 'payment' && 'Pagamento'}
              </h2>
              <p className="text-[10px] text-zinc-500">
                {step === 'details' && 'Etapa 1 de 2'}
                {step === 'payment' && 'Etapa 2 de 2'}
              </p>
            </div>
          </div>
          <button onClick={handleClose} className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Campaign Summary */}
        <div className="px-3 py-2 bg-zinc-900/50 border-b border-zinc-800/50 flex-shrink-0">
          <div className="flex items-center gap-2">
            <img src={campaign.heroImage} alt={campaign.title} className="w-10 h-10 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-bold text-white truncate">{campaign.title}</h3>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-[#FF4D3A]">{selectedQuantity} cotas</span>
                <span className="text-zinc-600 text-[10px]">|</span>
                <span className="text-[10px] font-bold text-white">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">

        {/* Step 1: Customer Details */}
        {step === 'details' && (
          <form onSubmit={handleSubmitDetails} className="p-3 space-y-2">
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  type="text"
                  value={customerData.name}
                  onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                  required
                  className="w-full pl-9 pr-3 py-2 bg-zinc-900/50 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-600 focus:ring-1 focus:ring-[#FF4D3A] focus:border-[#FF4D3A] transition-colors"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  type="email"
                  value={customerData.email}
                  onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                  required
                  className="w-full pl-9 pr-3 py-2 bg-zinc-900/50 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-600 focus:ring-1 focus:ring-[#FF4D3A] focus:border-[#FF4D3A] transition-colors"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                WhatsApp
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  type="tel"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({ ...customerData, phone: formatPhone(e.target.value) })}
                  required
                  maxLength={15}
                  className="w-full pl-9 pr-3 py-2 bg-zinc-900/50 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-600 focus:ring-1 focus:ring-[#FF4D3A] focus:border-[#FF4D3A] transition-colors"
                  placeholder="(55) 9 9999-9999"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FF4D3A] text-white py-2.5 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-[#FF3A24] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
            >
              {isSubmitting ? 'PROCESSANDO...' : 'CONTINUAR'}
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-zinc-500 text-center">
              Ao continuar, você concorda com os termos
            </p>
          </form>
        )}

        {/* Step 2: Payment */}
        {step === 'payment' && (
          <div className="p-3 space-y-2">
            <div className="bg-gradient-to-br from-[#FF4D3A]/10 to-[#FF4D3A]/5 rounded-xl p-3 border border-[#FF4D3A]/20">
              <div className="text-center mb-2">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">Valor Total</p>
                <p className="text-xl font-black text-white">{formatCurrency(total)}</p>
              </div>

              {/* QR Code Placeholder */}
              <div className="bg-white rounded-lg p-2 mb-2 flex items-center justify-center">
                <div className="w-24 h-24 bg-zinc-100 rounded flex items-center justify-center">
                  <QrCode className="w-12 h-12 text-zinc-800" />
                </div>
              </div>

              <p className="text-[10px] text-zinc-400 text-center mb-2">
                Escaneie o QR Code ou copie o código PIX
              </p>

              {/* Copy PIX Button */}
              <button
                onClick={copyPixCode}
                className="w-full bg-zinc-800 text-white py-2 rounded-lg font-medium text-xs hover:bg-zinc-700 transition-colors flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copiado!' : 'Copiar Código PIX'}
              </button>
            </div>

            {/* Instructions */}
            <div className="bg-zinc-900/50 rounded-lg p-2 border border-zinc-800">
              <h4 className="text-xs font-bold text-white mb-1 flex items-center gap-1">
                <Smartphone className="w-3 h-3 text-[#FF4D3A]" />
                Instruções
              </h4>
              <ol className="text-[10px] text-zinc-400 space-y-0.5 list-decimal list-inside">
                <li>Abra seu aplicativo bancário</li>
                <li>Escolha pagar com PIX</li>
                <li>Escaneie o QR ou cole o código</li>
                <li>Confirme e envie comprovante</li>
              </ol>
            </div>

            {/* WhatsApp Button */}
            <button
              onClick={openWhatsApp}
              className="w-full bg-green-500 text-white py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-green-600 transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              Enviar Comprovante
            </button>

            <button
              onClick={handleClose}
              className="w-full text-zinc-500 py-1.5 text-xs hover:text-white transition-colors"
            >
              Fechar
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
