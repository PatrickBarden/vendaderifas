import React from 'react';
import { Link } from 'react-router-dom';
import { User, Ticket, CreditCard, Settings, LogOut, CheckCircle, Clock } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-28">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold text-2xl">
                  R
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Olá, Ricardo!</h2>
                  <p className="text-sm text-slate-500">Membro desde 2023</p>
                </div>
              </div>

              <nav className="space-y-2">
                <a href="#" className="flex items-center space-x-3 p-3 rounded-xl bg-amber-50 text-amber-600 font-semibold transition-colors">
                  <Ticket className="w-5 h-5" />
                  <span>Meus Bilhetes</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-xl text-slate-600 hover:bg-gray-50 hover:text-slate-900 font-medium transition-colors">
                  <CreditCard className="w-5 h-5" />
                  <span>Histórico de Pagamentos</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-xl text-slate-600 hover:bg-gray-50 hover:text-slate-900 font-medium transition-colors">
                  <User className="w-5 h-5" />
                  <span>Meus Dados</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-xl text-slate-600 hover:bg-gray-50 hover:text-slate-900 font-medium transition-colors">
                  <Settings className="w-5 h-5" />
                  <span>Configurações</span>
                </a>
              </nav>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <Link to="/" className="flex items-center space-x-3 p-3 rounded-xl text-red-500 hover:bg-red-50 font-medium transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span>Sair da Conta</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-500 font-medium">Bilhetes Ativos</h3>
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                    <Ticket className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-3xl font-black text-slate-900">145</span>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-500 font-medium">Sorteios Participados</h3>
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-3xl font-black text-slate-900">12</span>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-500 font-medium">Aguardando Sorteio</h3>
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-3xl font-black text-slate-900">2</span>
              </div>
            </div>

            {/* Active Tickets */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">Meus Bilhetes Ativos</h3>
              </div>
              
              <div className="divide-y divide-gray-100">
                {/* Ticket Item 1 */}
                <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80" alt="RAM 2500" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-1 block">Sorteio #1042</span>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">RAM 2500 Laramie</h4>
                      <p className="text-sm text-slate-500">Sorteio pela Loteria Federal</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end">
                    <span className="text-sm text-slate-500 mb-2">Seus números (100)</span>
                    <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors">
                      Ver Números
                    </button>
                  </div>
                </div>

                {/* Ticket Item 2 */}
                <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80" alt="BMW M3" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-1 block">Sorteio #1043</span>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">BMW M3 Competition</h4>
                      <p className="text-sm text-slate-500">Sorteio pela Loteria Federal</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end">
                    <span className="text-sm text-slate-500 mb-2">Seus números (45)</span>
                    <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors">
                      Ver Números
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment History */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">Histórico de Pagamentos</h3>
                <a href="#" className="text-amber-500 text-sm font-semibold hover:text-amber-600">Ver todos</a>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-gray-50 text-slate-500 font-medium border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4">Data</th>
                      <th className="px-6 py-4">Campanha</th>
                      <th className="px-6 py-4">Valor</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">12/05/2024</td>
                      <td className="px-6 py-4 font-medium text-slate-900">RAM 2500 Laramie</td>
                      <td className="px-6 py-4">R$ 99,00</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          Aprovado
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">10/05/2024</td>
                      <td className="px-6 py-4 font-medium text-slate-900">BMW M3 Competition</td>
                      <td className="px-6 py-4">R$ 67,50</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          Aprovado
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
