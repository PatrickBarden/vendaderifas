import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Ticket, CreditCard, Users, BarChart3, LogOut, HelpCircle, Home, Search, User } from 'lucide-react';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin');
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isLogin = location.pathname === '/login';

  if (isLogin) {
    return <Outlet />;
  }

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex font-sans">
        {/* Admin Sidebar */}
        <aside className="w-64 bg-zinc-900 border-r border-zinc-800 hidden md:flex flex-col">
          <div className="p-6">
            <h1 className="text-xl font-bold text-red-500">Gestão Bruno</h1>
            <p className="text-[10px] text-zinc-500 tracking-widest mt-1 uppercase font-semibold">Administrador</p>
          </div>
          <nav className="flex-1 px-4 space-y-2 mt-4">
            <Link to="/admin" className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === '/admin' ? 'bg-zinc-800/50 text-white border-l-2 border-red-500' : 'text-zinc-400 hover:bg-zinc-800/30 hover:text-white'}`}>
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium text-sm">Dashboard</span>
            </Link>
            <Link to="/admin/campaigns" className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === '/admin/campaigns' ? 'bg-zinc-800/50 text-white border-l-2 border-red-500' : 'text-zinc-400 hover:bg-zinc-800/30 hover:text-white'}`}>
              <Ticket className="w-5 h-5" />
              <span className="font-medium text-sm">Campanhas</span>
            </Link>
            <Link to="/admin/tickets" className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === '/admin/tickets' ? 'bg-zinc-800/50 text-white border-l-2 border-red-500' : 'text-zinc-400 hover:bg-zinc-800/30 hover:text-white'}`}>
              <Ticket className="w-5 h-5" />
              <span className="font-medium text-sm">Bilhetes</span>
            </Link>
            <Link to="/admin/payments" className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === '/admin/payments' ? 'bg-zinc-800/50 text-white border-l-2 border-red-500' : 'text-zinc-400 hover:bg-zinc-800/30 hover:text-white'}`}>
              <CreditCard className="w-5 h-5" />
              <span className="font-medium text-sm">Pagamentos</span>
            </Link>
            <Link to="/admin/users" className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === '/admin/users' ? 'bg-zinc-800/50 text-white border-l-2 border-red-500' : 'text-zinc-400 hover:bg-zinc-800/30 hover:text-white'}`}>
              <Users className="w-5 h-5" />
              <span className="font-medium text-sm">Usuários</span>
            </Link>
            <Link to="/admin/reports" className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === '/admin/reports' ? 'bg-zinc-800/50 text-white border-l-2 border-red-500' : 'text-zinc-400 hover:bg-zinc-800/30 hover:text-white'}`}>
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium text-sm">Relatórios</span>
            </Link>
          </nav>
          <div className="p-4 mt-auto">
            <Link to="/admin/campaigns/new" className="w-full bg-red-500 text-white px-4 py-3 rounded-lg text-sm font-bold hover:bg-red-600 transition-colors flex items-center justify-center">
              + Nova Campanha
            </Link>
          </div>
        </aside>

        {/* Admin Main Content */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-zinc-950">
          <header className="bg-zinc-900 border-b border-zinc-800 h-16 flex items-center justify-between px-6 md:hidden">
             <Link to="/admin" className="text-xl font-bold text-red-500">
              Gestão Bruno
            </Link>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-zinc-400">
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

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col font-sans text-white pb-16 md:pb-0">
      {/* Header */}
      <header className="bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Menu Button (Left) */}
            <div className="md:hidden flex items-center flex-1">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-zinc-400 hover:text-white focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* Logo (Center on mobile, Left on desktop) */}
            <div className="flex-1 md:flex-none flex justify-center md:justify-start">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-xl font-black italic tracking-tight text-white">
                  BRUNO <span className="text-red-500">PICKUPS</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 h-full items-center flex-1 justify-center">
              <Link to="/" className={`text-sm font-medium transition-colors h-full flex items-center ${location.pathname === '/' ? 'text-[#FF4D3A] border-b-2 border-[#FF4D3A]' : 'text-zinc-400 hover:text-white'}`}>
                Início
              </Link>
              <Link to="/campaigns" className={`text-sm font-medium transition-colors h-full flex items-center ${location.pathname === '/campaigns' ? 'text-[#FF4D3A] border-b-2 border-[#FF4D3A]' : 'text-zinc-400 hover:text-white'}`}>
                Campanhas
              </Link>
              <Link to="/winners" className={`text-sm font-medium transition-colors h-full flex items-center ${location.pathname === '/winners' ? 'text-[#FF4D3A] border-b-2 border-[#FF4D3A]' : 'text-zinc-400 hover:text-white'}`}>
                Ganhadores
              </Link>
            </nav>

            {/* Desktop & Mobile Actions (Right) */}
            <div className="flex items-center flex-1 justify-end space-x-6">
              <Link to="/login" className="hidden md:flex text-sm font-medium text-white hover:text-zinc-300 transition-colors">
                Login
              </Link>
              <Link to="/campaigns" className="hidden md:flex bg-[#FF4D3A] text-white px-5 py-2 rounded-md text-sm font-bold hover:bg-[#FF3A24] transition-colors shadow-lg shadow-red-500/20">
                Participar Agora
              </Link>
              <Link to="/login" className="md:hidden w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-300">
                <User className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-b border-zinc-800 absolute w-full">
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-white hover:bg-zinc-800 rounded-lg">
                Início
              </Link>
              <Link to="/campaigns" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-zinc-400 hover:bg-zinc-800 rounded-lg">
                Campanhas
              </Link>
              <Link to="/winners" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-zinc-400 hover:bg-zinc-800 rounded-lg">
                Ganhadores
              </Link>
              <Link to="/dashboard/tickets" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-zinc-400 hover:bg-zinc-800 rounded-lg">
                Meus Bilhetes
              </Link>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-zinc-400 hover:bg-zinc-800 rounded-lg">
                Login
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer (Hidden on mobile to favor bottom nav) */}
      <footer className="hidden md:block bg-[#121214] border-t border-zinc-900 pt-16 pb-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <span className="text-xl font-black italic tracking-tight text-white mb-4 block">
                BRUNO <span className="text-[#FF4D3A]">PICKUPS</span><br/>
                PRÊMIOS
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed mt-4">
                A maior plataforma de sorteios automotivos do Brasil. Realizando sonhos através da transparência e paixão por motores.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-sm tracking-wider uppercase">Navegação</h4>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li><Link to="/#como-funciona" className="hover:text-white transition-colors">Como Funciona</Link></li>
                <li><Link to="/campaigns" className="hover:text-white transition-colors">Campanhas</Link></li>
                <li><Link to="/winners" className="hover:text-white transition-colors">Ganhadores</Link></li>
                <li><Link to="/regulamento" className="hover:text-white transition-colors">Regulamento</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-sm tracking-wider uppercase">Suporte</h4>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li><Link to="/contact" className="hover:text-white transition-colors">Contato</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Termos de Uso</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacidade</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-sm tracking-wider uppercase">Redes Sociais</h4>
              <div className="flex items-center space-x-3">
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </a>
              </div>
              <div className="mt-6 flex items-center space-x-2 text-[10px] font-bold text-zinc-500 bg-zinc-900/50 p-2 rounded-lg border border-zinc-800 w-max">
                <ShieldCheckIcon className="w-4 h-4 text-yellow-500" />
                <span className="uppercase">Sorteios Autorizados pela SECAP</span>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-zinc-900 text-[10px] font-bold uppercase tracking-widest text-zinc-600 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 Bruno Pickups Prêmios. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around items-center h-16 px-2 z-50 pb-safe">
        <Link to="/" className={`flex flex-col items-center justify-center w-full h-full ${location.pathname === '/' ? 'text-[#FF4D3A]' : 'text-zinc-500 hover:text-zinc-300'}`}>
          <Home className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium">Início</span>
        </Link>
        <Link to="/campaigns" className={`flex flex-col items-center justify-center w-full h-full ${location.pathname === '/campaigns' ? 'text-[#FF4D3A]' : 'text-zinc-500 hover:text-zinc-300'}`}>
          <Search className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium">Campanhas</span>
        </Link>
        <Link to="/dashboard/tickets" className={`flex flex-col items-center justify-center w-full h-full ${location.pathname.includes('/tickets') ? 'text-[#FF4D3A]' : 'text-zinc-500 hover:text-zinc-300'}`}>
          <Ticket className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium">Bilhetes</span>
        </Link>
        <Link to="/dashboard" className={`flex flex-col items-center justify-center w-full h-full ${location.pathname === '/dashboard' ? 'text-[#FF4D3A]' : 'text-zinc-500 hover:text-zinc-300'}`}>
          <User className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium">Perfil</span>
        </Link>
      </div>
    </div>
  );
}

function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
