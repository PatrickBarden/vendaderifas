import React from 'react';
import { Activity, ArrowDownRight, ArrowUpRight, DollarSign, Ticket, TrendingUp, Users } from 'lucide-react';

const stats = [
  { title: 'Receita Total', value: 'R$ 124.500', accent: 'bg-emerald-100 text-emerald-600', icon: <DollarSign className="w-5 h-5" />, delta: '+12.5%' },
  { title: 'Bilhetes Vendidos', value: '45.231', accent: 'bg-amber-100 text-amber-600', icon: <Ticket className="w-5 h-5" />, delta: '+8.2%' },
  { title: 'Novos Usuários', value: '1.204', accent: 'bg-blue-100 text-blue-600', icon: <Users className="w-5 h-5" />, delta: '+24.1%' },
  { title: 'Taxa de Conversão', value: '3.4%', accent: 'bg-purple-100 text-purple-600', icon: <TrendingUp className="w-5 h-5" />, delta: '-1.2%', negative: true },
];

export function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Visão Geral</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-zinc-400 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.accent}`}>{stat.icon}</div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              {stat.negative ? <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" /> : <ArrowUpRight className="w-4 h-4 text-emerald-500 mr-1" />}
              <span className={stat.negative ? 'text-red-500 font-medium' : 'text-emerald-500 font-medium'}>{stat.delta}</span>
              <span className="text-zinc-500 ml-2">vs. mês anterior</span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Fluxo de Receita</h3>
            <Activity className="w-5 h-5 text-zinc-400" />
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[40, 70, 45, 90, 65, 85, 100].map((height, index) => (
              <div key={index} className="w-full bg-zinc-800 rounded-t-sm relative group">
                <div className="absolute bottom-0 w-full bg-red-500 rounded-t-sm transition-all duration-500 group-hover:bg-red-400" style={{ height: `${height}%` }} />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 p-6 text-white flex flex-col">
          <h3 className="text-lg font-bold mb-6">Destaque da Semana</h3>
          <div className="relative h-40 rounded-lg overflow-hidden mb-4">
            <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80" alt="RAM 2500" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
          </div>
          <h4 className="font-bold text-lg mb-2">RAM 2500 Laramie</h4>
          <p className="text-zinc-400 text-sm">Área administrativa separada da navegação pública e pronta para permissões futuras.</p>
        </div>
      </div>
    </div>
  );
}
