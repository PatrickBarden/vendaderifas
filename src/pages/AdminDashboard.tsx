import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Ticket, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Visão Geral</h1>
        <div className="flex space-x-2">
          <select className="bg-white border border-gray-200 text-slate-700 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2.5">
            <option>Últimos 7 dias</option>
            <option>Últimos 30 dias</option>
            <option>Este mês</option>
            <option>Este ano</option>
          </select>
          <button className="bg-amber-500 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-amber-400 transition-colors shadow-sm">
            Exportar Relatório
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Receita Total</p>
              <h3 className="text-2xl font-bold text-slate-900">R$ 124.500</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpRight className="w-4 h-4 text-emerald-500 mr-1" />
            <span className="text-emerald-500 font-medium">+12.5%</span>
            <span className="text-slate-400 ml-2">vs. mês anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Bilhetes Vendidos</p>
              <h3 className="text-2xl font-bold text-slate-900">45.231</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
              <Ticket className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpRight className="w-4 h-4 text-emerald-500 mr-1" />
            <span className="text-emerald-500 font-medium">+8.2%</span>
            <span className="text-slate-400 ml-2">vs. mês anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Novos Usuários</p>
              <h3 className="text-2xl font-bold text-slate-900">1.204</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpRight className="w-4 h-4 text-emerald-500 mr-1" />
            <span className="text-emerald-500 font-medium">+24.1%</span>
            <span className="text-slate-400 ml-2">vs. mês anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Taxa de Conversão</p>
              <h3 className="text-2xl font-bold text-slate-900">3.4%</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-red-500 font-medium">-1.2%</span>
            <span className="text-slate-400 ml-2">vs. mês anterior</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area (Placeholder) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Fluxo de Receita</h3>
            <button className="text-slate-400 hover:text-slate-600">
              <Activity className="w-5 h-5" />
            </button>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {/* Mock Chart Bars */}
            {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
              <div key={i} className="w-full bg-amber-100 rounded-t-sm relative group">
                <div 
                  className="absolute bottom-0 w-full bg-amber-500 rounded-t-sm transition-all duration-500 group-hover:bg-amber-400" 
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-400 font-medium">
            <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span>
          </div>
        </div>

        {/* Highlighted Campaign */}
        <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6 text-white flex flex-col">
          <h3 className="text-lg font-bold mb-6 flex items-center">
            <StarIcon className="w-5 h-5 text-amber-500 mr-2" /> Destaque da Semana
          </h3>
          <div className="relative h-40 rounded-lg overflow-hidden mb-4">
            <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80" alt="RAM 2500" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
            <div className="absolute bottom-3 left-3">
              <span className="bg-amber-500 text-slate-900 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Sorteio #1042</span>
            </div>
          </div>
          <h4 className="font-bold text-lg mb-2">RAM 2500 Laramie</h4>
          
          <div className="mt-auto">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Progresso</span>
              <span className="text-amber-400 font-bold">85%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 mb-4">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-400">Receita</p>
                <p className="font-bold text-emerald-400">R$ 84.150</p>
              </div>
              <Link to="/admin/campaigns" className="text-sm font-semibold text-white hover:text-amber-400 transition-colors">
                Gerenciar
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Pagamentos Recentes</h3>
          <a href="#" className="text-sm font-semibold text-amber-600 hover:text-amber-700">Ver todos</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-gray-50 text-slate-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Usuário</th>
                <th className="px-6 py-4">Campanha</th>
                <th className="px-6 py-4">Valor</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold mr-3">
                      M
                    </div>
                    <span className="font-medium text-slate-900">Marcos Silva</span>
                  </div>
                </td>
                <td className="px-6 py-4">RAM 2500 Laramie</td>
                <td className="px-6 py-4 font-medium text-slate-900">R$ 49,50</td>
                <td className="px-6 py-4">Há 2 min</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    Aprovado
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold mr-3">
                      A
                    </div>
                    <span className="font-medium text-slate-900">Ana Paula</span>
                  </div>
                </td>
                <td className="px-6 py-4">BMW M3 Competition</td>
                <td className="px-6 py-4 font-medium text-slate-900">R$ 15,00</td>
                <td className="px-6 py-4">Há 15 min</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    Aprovado
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold mr-3">
                      R
                    </div>
                    <span className="font-medium text-slate-900">Roberto Carlos</span>
                  </div>
                </td>
                <td className="px-6 py-4">R$ 50.000 no PIX</td>
                <td className="px-6 py-4 font-medium text-slate-900">R$ 5,00</td>
                <td className="px-6 py-4">Há 45 min</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    Pendente
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
