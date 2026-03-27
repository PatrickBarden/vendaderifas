import React from 'react';
import { Home, Menu, Search, Ticket, User, X } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export function PublicLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col font-sans text-white pb-16 md:pb-0">
      <header className="bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="md:hidden flex items-center flex-1">
              <button onClick={() => setIsMobileMenuOpen((prev) => !prev)} className="text-zinc-400 hover:text-white focus:outline-none">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            <div className="flex-1 md:flex-none flex justify-center md:justify-start">
              <Link to="/" className="flex items-center space-x-2">
                <img 
                  src="/images/logo.png" 
                  alt="Bruno Pickups Premios" 
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8 h-full items-center justify-end flex-1">
              <NavLink to="/" currentPath={location.pathname} label="Inicio" />
              <NavLink to="/campaigns" currentPath={location.pathname} label="Campanhas" />
              <NavLink to="/winners" currentPath={location.pathname} label="Ganhadores" />
              <NavLink to="/sobre" currentPath={location.pathname} label="Sobre" />
            </nav>

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

        {isMobileMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-b border-zinc-800 absolute w-full">
            <div className="px-4 pt-2 pb-6 space-y-1">
              <MobileLink to="/" onNavigate={() => setIsMobileMenuOpen(false)} label="Inicio" />
              <MobileLink to="/campaigns" onNavigate={() => setIsMobileMenuOpen(false)} label="Campanhas" />
              <MobileLink to="/winners" onNavigate={() => setIsMobileMenuOpen(false)} label="Ganhadores" />
              <MobileLink to="/sobre" onNavigate={() => setIsMobileMenuOpen(false)} label="Sobre" />
              <MobileLink to="/dashboard" onNavigate={() => setIsMobileMenuOpen(false)} label="Meus Bilhetes" />
              <MobileLink to="/login" onNavigate={() => setIsMobileMenuOpen(false)} label="Login" />
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="hidden md:block bg-[#121214] border-t border-zinc-900 pt-16 pb-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <img 
                src="/images/logo.png" 
                alt="Bruno Pickups Premios" 
                className="h-10 w-auto mb-4"
              />
              <p className="text-xs text-zinc-400 leading-relaxed mt-4">
                Plataforma de rifas de carros com campanhas envolventes, sorteios transparentes e premios que aceleram sonhos.
              </p>
            </div>
            <FooterNav title="Navegacao" items={[['Como Funciona', '/#como-funciona'], ['Campanhas', '/campaigns'], ['Ganhadores', '/winners']]} />
            <FooterNav title="Suporte" items={[['Contato', '#'], ['Termos de Uso', '#'], ['Privacidade', '#']]} />
            <div>
              <h4 className="text-white font-bold mb-6 text-sm tracking-wider uppercase">Conformidade</h4>
              <div className="mt-6 flex items-center space-x-2 text-[10px] font-bold text-zinc-500 bg-zinc-900/50 p-2 rounded-lg border border-zinc-800 w-max">
                <ShieldCheckIcon className="w-4 h-4 text-yellow-500" />
                <span className="uppercase">Operacao rastreavel e sorteios com transparencia</span>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-900 text-[10px] font-bold uppercase tracking-widest text-zinc-600 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2026 Bruno Pickups. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around items-center h-16 px-2 z-50 pb-safe">
        <BottomLink to="/" active={location.pathname === '/'} icon={<Home className="w-5 h-5 mb-1" />} label="Inicio" />
        <BottomLink to="/campaigns" active={location.pathname === '/campaigns'} icon={<Search className="w-5 h-5 mb-1" />} label="Campanhas" />
        <BottomLink to="/dashboard" active={location.pathname === '/dashboard'} icon={<Ticket className="w-5 h-5 mb-1" />} label="Bilhetes" />
        <BottomLink to="/login" active={location.pathname === '/login'} icon={<User className="w-5 h-5 mb-1" />} label="Perfil" />
      </div>
    </div>
  );
}

function NavLink({ to, currentPath, label }: { to: string; currentPath: string; label: string }) {
  const active = currentPath === to;
  return (
    <Link to={to} className={`text-sm font-medium transition-colors h-full flex items-center ${active ? 'text-[#FF4D3A] border-b-2 border-[#FF4D3A]' : 'text-zinc-400 hover:text-white'}`}>
      {label}
    </Link>
  );
}

function MobileLink({ to, onNavigate, label }: { to: string; onNavigate: () => void; label: string }) {
  return (
    <Link to={to} onClick={onNavigate} className="block px-3 py-3 text-base font-medium text-zinc-300 hover:bg-zinc-800 rounded-lg">
      {label}
    </Link>
  );
}

function FooterNav({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <h4 className="text-white font-bold mb-6 text-sm tracking-wider uppercase">{title}</h4>
      <ul className="space-y-3 text-sm text-zinc-400">
        {items.map(([label, to]) => (
          <li key={label}>
            <Link to={to} className="hover:text-white transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BottomLink({ to, active, icon, label }: { to: string; active: boolean; icon: React.ReactNode; label: string }) {
  return (
    <Link to={to} className={`flex flex-col items-center justify-center w-full h-full ${active ? 'text-[#FF4D3A]' : 'text-zinc-500 hover:text-zinc-300'}`}>
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}

function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
