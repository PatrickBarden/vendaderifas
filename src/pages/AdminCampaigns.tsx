import React from 'react';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, Play, Pause } from 'lucide-react';

export function AdminCampaigns() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Campanhas</h1>
          <p className="text-slate-500 text-sm mt-1">Gerencie seus sorteios ativos, rascunhos e finalizados.</p>
        </div>
        <button className="bg-amber-500 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-amber-400 transition-colors shadow-sm flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Nova Campanha
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-amber-500 focus:border-amber-500 sm:text-sm bg-gray-50 focus:bg-white transition-colors"
            placeholder="Buscar campanhas..."
          />
        </div>
        <div className="flex space-x-2 w-full sm:w-auto">
          <select className="bg-white border border-gray-200 text-slate-700 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2 flex-1 sm:w-auto">
            <option>Todos os Status</option>
            <option>Ativos</option>
            <option>Rascunhos</option>
            <option>Finalizados</option>
          </select>
          <button className="bg-gray-50 border border-gray-200 text-slate-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-gray-50 text-slate-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Campanha</th>
                <th className="px-6 py-4">Progresso</th>
                <th className="px-6 py-4">Receita</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Campaign 1 */}
              <tr className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                      <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80" alt="RAM 2500" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-1 block">Sorteio #1042</span>
                      <h4 className="text-base font-bold text-slate-900">RAM 2500 Laramie</h4>
                      <p className="text-xs text-slate-500">R$ 0,99 / número</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 w-48">
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-slate-600">85.000 / 100.000</span>
                    <span className="text-amber-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-emerald-600">R$ 84.150,00</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    <span className="w-2 h-2 mr-1.5 bg-emerald-500 rounded-full"></span>
                    Ativo
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Ver">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Pausar">
                      <Pause className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-gray-100 rounded-lg transition-colors" title="Editar">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>

              {/* Campaign 2 */}
              <tr className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                      <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80" alt="BMW M3" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-1 block">Sorteio #1043</span>
                      <h4 className="text-base font-bold text-slate-900">BMW M3 Competition</h4>
                      <p className="text-xs text-slate-500">R$ 1,50 / número</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 w-48">
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-slate-600">16.000 / 50.000</span>
                    <span className="text-amber-600">32%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-emerald-600">R$ 24.000,00</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    <span className="w-2 h-2 mr-1.5 bg-emerald-500 rounded-full"></span>
                    Ativo
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Ver">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Pausar">
                      <Pause className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-gray-100 rounded-lg transition-colors" title="Editar">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>

              {/* Campaign 3 */}
              <tr className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                      <img src="https://images.unsplash.com/photo-1622185135505-2d795003994a?auto=format&fit=crop&q=80" alt="R$ 50.000" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-1 block">Sorteio #1044</span>
                      <h4 className="text-base font-bold text-slate-900">R$ 50.000 no PIX</h4>
                      <p className="text-xs text-slate-500">R$ 0,50 / número</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 w-48">
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-slate-600">0 / 200.000</span>
                    <span className="text-slate-400">0%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-slate-400">R$ 0,00</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <span className="w-2 h-2 mr-1.5 bg-gray-400 rounded-full"></span>
                    Rascunho
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Publicar">
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-gray-100 rounded-lg transition-colors" title="Editar">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-slate-500">Mostrando <span className="font-medium text-slate-900">1</span> a <span className="font-medium text-slate-900">3</span> de <span className="font-medium text-slate-900">12</span> campanhas</span>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border border-gray-200 rounded-md text-sm font-medium text-slate-500 hover:bg-gray-50 disabled:opacity-50" disabled>Anterior</button>
            <button className="px-3 py-1 border border-amber-500 bg-amber-50 rounded-md text-sm font-medium text-amber-600">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded-md text-sm font-medium text-slate-500 hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-200 rounded-md text-sm font-medium text-slate-500 hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border border-gray-200 rounded-md text-sm font-medium text-slate-500 hover:bg-gray-50">Próxima</button>
          </div>
        </div>
      </div>
    </div>
  );
}
