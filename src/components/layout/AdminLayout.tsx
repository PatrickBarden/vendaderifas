import { BarChart3, CreditCard, LayoutDashboard, Menu, Ticket, Users } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/campaigns', label: 'Campanhas', icon: Ticket },
  { to: '#', label: 'Bilhetes', icon: Ticket },
  { to: '#', label: 'Pagamentos', icon: CreditCard },
  { to: '#', label: 'Usuários', icon: Users },
  { to: '#', label: 'Relatórios', icon: BarChart3 },
];

export function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex font-sans">
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 hidden md:flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold text-red-500">Gestão Bruno</h1>
          <p className="text-[10px] text-zinc-500 tracking-widest mt-1 uppercase font-semibold">Administrador</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = to !== '#' && location.pathname === to;
            return (
              <Link key={label} to={to} className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${active ? 'bg-zinc-800/50 text-white border-l-2 border-red-500' : 'text-zinc-400 hover:bg-zinc-800/30 hover:text-white'}`}>
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-zinc-950">
        <header className="bg-zinc-900 border-b border-zinc-800 h-16 flex items-center justify-between px-6 md:hidden">
          <Link to="/admin" className="text-xl font-bold text-red-500">
            Gestão Bruno
          </Link>
          <button className="text-zinc-400">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 overflow-auto p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
