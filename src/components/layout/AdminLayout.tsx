import { BarChart3, Bell, CreditCard, LayoutDashboard, Menu, Plus, ShoppingCart, Ticket, Users, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { CreateCampaignModal } from '@/features/admin/components/CreateCampaignModal';
import { useOrders } from '@/contexts/OrdersContext';
import { formatCurrency, formatRelativeTime } from '@/lib/formatters';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/campaigns', label: 'Campanhas', icon: Ticket },
  { to: '/admin/orders', label: 'Pedidos', icon: ShoppingCart },
  { to: '/admin/tickets', label: 'Bilhetes', icon: Ticket },
  { to: '/admin/payments', label: 'Pagamentos', icon: CreditCard },
  { to: '/admin/users', label: 'Usuarios', icon: Users },
  { to: '/admin/reports', label: 'Relatorios', icon: BarChart3 },
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orders, unreadCount, markAsRead } = useOrders();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#151515] text-white font-sans flex">
      <aside className="hidden lg:flex w-[272px] bg-[#1C1C1C] border-r border-white/5 flex-col">
        <div className="px-7 py-6 flex flex-col items-center">
          <img 
            src="/images/logo.png" 
            alt="Bruno Pickups Premios" 
            className="h-16 w-auto mb-2"
          />
          <p className="text-sm uppercase tracking-[0.35em] text-white/80 font-semibold">Administrador</p>
        </div>
        <nav className="px-4 space-y-3 flex-1">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-4 px-5 py-5 rounded-r-2xl border-l-4 transition-colors ${
                  active ? 'bg-white/8 border-[#FF5A46] text-[#F3BEBA]' : 'border-transparent text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[1.1rem] font-medium">{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto px-5 pb-7">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-[#FF5A46] text-white rounded-none py-5 text-[1.05rem] font-bold flex items-center justify-center gap-3 shadow-[0_18px_40px_rgba(255,90,70,0.24)] hover:bg-[#FF4532] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nova Campanha
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="lg:hidden h-16 px-4 border-b border-white/5 bg-[#151515] flex items-center justify-between">
          <Link to="/admin" className="flex items-center justify-center flex-1">
            <img 
              src="/images/logo.png" 
              alt="Bruno Pickups Premios" 
              className="h-12 w-auto"
            />
          </Link>
          <button onClick={() => setMobileOpen((prev) => !prev)} className="text-white/70">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {mobileOpen ? (
          <div className="lg:hidden border-b border-white/5 bg-[#1C1C1C] px-4 py-4 space-y-2">
            {navItems.map(({ to, label }) => (
              <Link key={to} to={to} onClick={() => setMobileOpen(false)} className="block rounded-xl px-4 py-3 text-white/80 hover:bg-white/5">
                {label}
              </Link>
            ))}
          </div>
        ) : null}

        <div className="px-5 md:px-8 xl:px-12 py-6 md:py-8 flex items-center justify-end gap-4">
          <div className="relative">
            <button 
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                if (!notificationsOpen && unreadCount > 0) {
                  markAsRead();
                }
              }}
              className="w-11 h-11 rounded-full bg-white/8 flex items-center justify-center relative text-white/70 hover:text-white transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FF5A46] text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            
            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-[#1C1C1C] rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-50">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">Notificações</h3>
                  <button 
                    onClick={() => setNotificationsOpen(false)}
                    className="text-zinc-500 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {orders.slice(0, 5).map((order) => (
                    <div 
                      key={order.id}
                      onClick={() => {
                        navigate('/admin/orders');
                        setNotificationsOpen(false);
                      }}
                      className="p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#FF5A46]/20 flex items-center justify-center flex-shrink-0">
                          <ShoppingCart className="w-4 h-4 text-[#FF5A46]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white font-medium truncate">
                            Novo pedido: {order.campaignTitle}
                          </p>
                          <p className="text-xs text-zinc-500 mt-1">
                            {order.customerName} • {order.quantity} cotas • {formatCurrency(order.total)}
                          </p>
                          <p className="text-[10px] text-zinc-600 mt-1">
                            {formatRelativeTime(order.createdAt)}
                          </p>
                        </div>
                        {order.status === 'pending' && (
                          <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  ))}
                  {orders.length === 0 && (
                    <div className="p-8 text-center">
                      <Bell className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                      <p className="text-sm text-zinc-500">Nenhuma notificação</p>
                    </div>
                  )}
                </div>
                {orders.length > 0 && (
                  <div className="p-3 border-t border-white/10">
                    <button 
                      onClick={() => {
                        navigate('/admin/orders');
                        setNotificationsOpen(false);
                      }}
                      className="w-full text-xs text-[#FF5A46] hover:text-[#FF4532] font-medium text-center"
                    >
                      Ver todos os pedidos
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="w-11 h-11 rounded-full border border-[#FF5A46] overflow-hidden bg-[#2A2A2A]">
            <img src="/images/favcon.png" alt="Administrador" className="w-full h-full object-cover" />
          </div>
        </div>

        <main className="flex-1 px-5 md:px-8 xl:px-12 pb-10">
          <Outlet />
        </main>
      </div>

      <CreateCampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
