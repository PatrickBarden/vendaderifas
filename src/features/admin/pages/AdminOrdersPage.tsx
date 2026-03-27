import { useState } from 'react';
import { Search, Filter, ShoppingCart, User, Mail, Phone, Calendar, Package, CheckCircle, XCircle, Clock, ChevronDown, MessageCircle, ExternalLink } from 'lucide-react';
import { useOrders, type Order, type OrderStatus } from '@/contexts/OrdersContext';
import { formatCurrency, formatRelativeTime } from '@/lib/formatters';

const statusConfig: Record<OrderStatus, { label: string; icon: typeof Clock; color: string; bg: string }> = {
  pending: {
    label: 'Pendente',
    icon: Clock,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10'
  },
  paid: {
    label: 'Pago',
    icon: CheckCircle,
    color: 'text-green-500',
    bg: 'bg-green-500/10'
  },
  cancelled: {
    label: 'Cancelado',
    icon: XCircle,
    color: 'text-red-500',
    bg: 'bg-red-500/10'
  }
};

export function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.campaignTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    paid: orders.filter(o => o.status === 'paid').length,
    revenue: orders.filter(o => o.status === 'paid').reduce((sum, o) => sum + o.total, 0)
  };

  const openWhatsApp = (order: Order) => {
    const message = encodeURIComponent(
      `Olá ${order.customerName}! 👋\n\n` +
      `Recebemos seu pedido #${order.id} para a campanha *${order.campaignTitle}*.\n\n` +
      `*Detalhes:*\n` +
      `📦 ${order.quantity} cotas\n` +
      `💰 ${formatCurrency(order.total)}\n` +
      `📱 ${order.customerPhone}\n\n` +
      `Aguardamos seu comprovante de pagamento para confirmar sua participação! 🎉`
    );
    window.open(`https://wa.me/${order.customerPhone.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white mb-1">Pedidos</h1>
          <p className="text-sm text-zinc-500">Gerencie todas as compras de cotas</p>
        </div>
        <button className="bg-[#FF5A46] text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#FF4532] transition-colors">
          <ShoppingCart className="w-4 h-4" />
          Exportar
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Total de Pedidos" 
          value={stats.total.toString()} 
          icon={Package} 
          color="bg-blue-500/10 text-blue-500" 
        />
        <StatCard 
          label="Pendentes" 
          value={stats.pending.toString()} 
          icon={Clock} 
          color="bg-amber-500/10 text-amber-500" 
        />
        <StatCard 
          label="Pagos" 
          value={stats.paid.toString()} 
          icon={CheckCircle} 
          color="bg-green-500/10 text-green-500" 
        />
        <StatCard 
          label="Receita" 
          value={formatCurrency(stats.revenue)} 
          icon={ShoppingCart} 
          color="bg-[#FF5A46]/10 text-[#FF5A46]" 
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente, email, pedido ou campanha..."
            className="w-full pl-12 pr-4 py-3 bg-[#1C1C1C] border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:ring-1 focus:ring-[#FF5A46] focus:border-[#FF5A46] transition-colors"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
            className="pl-10 pr-10 py-3 bg-[#1C1C1C] border border-white/10 rounded-xl text-white appearance-none focus:ring-1 focus:ring-[#FF5A46] focus:border-[#FF5A46] transition-colors cursor-pointer"
          >
            <option value="all">Todos os status</option>
            <option value="pending">Pendentes</option>
            <option value="paid">Pagos</option>
            <option value="cancelled">Cancelados</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#1C1C1C] rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Pedido</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Cliente</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Campanha</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Cotas</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Total</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Data</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon;
                return (
                  <tr 
                    key={order.id} 
                    onClick={() => setSelectedOrder(order)}
                    className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-white">#{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                          <User className="w-4 h-4 text-zinc-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{order.customerName}</p>
                          <p className="text-xs text-zinc-500">{order.customerPhone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-white">{order.campaignTitle}</p>
                      <p className="text-xs text-zinc-500">Código: {order.campaignCode}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-[#FF5A46]">{order.quantity}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-white">{formatCurrency(order.total)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig[order.status].bg}`}>
                        <StatusIcon className={`w-3.5 h-3.5 ${statusConfig[order.status].color}`} />
                        <span className={`text-xs font-bold ${statusConfig[order.status].color}`}>
                          {statusConfig[order.status].label}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-zinc-500">{formatRelativeTime(order.createdAt)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openWhatsApp(order);
                          }}
                          className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 hover:bg-green-500/20 transition-colors"
                          title="Enviar WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOrder(order);
                          }}
                          className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                          title="Ver detalhes"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredOrders.length === 0 && (
          <div className="p-12 text-center">
            <ShoppingCart className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-500">Nenhum pedido encontrado</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="relative w-full max-w-lg bg-[#1C1C1C] rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Detalhes do Pedido</h2>
                <p className="text-sm text-zinc-500">#{selectedOrder.id}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Status</span>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig[selectedOrder.status].bg}`}>
                  {(() => {
                    const StatusIcon = statusConfig[selectedOrder.status].icon;
                    return <StatusIcon className={`w-4 h-4 ${statusConfig[selectedOrder.status].color}`} />;
                  })()}
                  <span className={`text-sm font-bold ${statusConfig[selectedOrder.status].color}`}>
                    {statusConfig[selectedOrder.status].label}
                  </span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-zinc-900/50 rounded-xl p-4 space-y-3">
                <h3 className="text-sm font-bold text-white mb-3">Dados do Cliente</h3>
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm text-white">{selectedOrder.customerName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm text-white">{selectedOrder.customerEmail}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm text-white">{selectedOrder.customerPhone}</span>
                </div>
              </div>

              {/* Campaign Info */}
              <div className="bg-zinc-900/50 rounded-xl p-4 space-y-3">
                <h3 className="text-sm font-bold text-white mb-3">Campanha</h3>
                <p className="text-sm text-white">{selectedOrder.campaignTitle}</p>
                <p className="text-xs text-zinc-500">Código: {selectedOrder.campaignCode}</p>
              </div>

              {/* Order Summary */}
              <div className="bg-zinc-900/50 rounded-xl p-4">
                <h3 className="text-sm font-bold text-white mb-3">Resumo</h3>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-500">Quantidade de cotas</span>
                  <span className="text-white font-bold">{selectedOrder.quantity}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-white/10">
                  <span className="text-white">Total</span>
                  <span className="text-[#FF5A46]">{formatCurrency(selectedOrder.total)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {selectedOrder.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        updateOrderStatus(selectedOrder.id, 'paid');
                        setSelectedOrder(null);
                      }}
                      className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Marcar como Pago
                    </button>
                    <button
                      onClick={() => {
                        updateOrderStatus(selectedOrder.id, 'cancelled');
                        setSelectedOrder(null);
                      }}
                      className="flex-1 bg-red-500/10 text-red-500 py-3 rounded-xl font-bold text-sm hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Cancelar
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={() => openWhatsApp(selectedOrder)}
                className="w-full bg-green-500 text-white py-3 rounded-xl font-bold text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Enviar WhatsApp para Cliente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: typeof Package; color: string }) {
  return (
    <div className="bg-[#1C1C1C] rounded-2xl p-5 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color.split(' ')[0]}`}>
          <Icon className={`w-5 h-5 ${color.split(' ')[1]}`} />
        </div>
      </div>
      <p className="text-2xl font-black text-white mb-1">{value}</p>
      <p className="text-xs text-zinc-500">{label}</p>
    </div>
  );
}
