import React from 'react';
import { CheckCircle, Clock, CreditCard, LogOut, Settings, Ticket, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { title: 'Bilhetes Ativos', value: '145', icon: <Ticket className="w-5 h-5" />, accent: 'bg-amber-100 text-amber-600' },
  { title: 'Sorteios Participados', value: '12', icon: <CheckCircle className="w-5 h-5" />, accent: 'bg-emerald-100 text-emerald-600' },
  { title: 'Aguardando Sorteio', value: '2', icon: <Clock className="w-5 h-5" />, accent: 'bg-blue-100 text-blue-600' },
];

export function UserDashboardPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-28">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold text-2xl">R</div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Olá, Ricardo!</h2>
                  <p className="text-sm text-slate-500">Membro desde 2023</p>
                </div>
              </div>
              <nav className="space-y-2">
                <SidebarLink icon={<Ticket className="w-5 h-5" />} label="Meus Bilhetes" active />
                <SidebarLink icon={<CreditCard className="w-5 h-5" />} label="Histórico de Pagamentos" />
                <SidebarLink icon={<User className="w-5 h-5" />} label="Meus Dados" />
                <SidebarLink icon={<Settings className="w-5 h-5" />} label="Configurações" />
              </nav>
              <div className="mt-8 pt-8 border-t border-gray-100">
                <Link to="/" className="flex items-center space-x-3 p-3 rounded-xl text-red-500 hover:bg-red-50 font-medium transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span>Sair da Conta</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-500 font-medium">{stat.title}</h3>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.accent}`}>{stat.icon}</div>
                  </div>
                  <span className="text-3xl font-black text-slate-900">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <a href="#" className={`flex items-center space-x-3 p-3 rounded-xl font-medium transition-colors ${active ? 'bg-amber-50 text-amber-600 font-semibold' : 'text-slate-600 hover:bg-gray-50 hover:text-slate-900'}`}>
      {icon}
      <span>{label}</span>
    </a>
  );
}
