import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, Star } from 'lucide-react';

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#121214]">
      {/* Left Side - Hero Image */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-end p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80" 
            alt="Pickup Truck" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-red-500/20 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-zinc-900/80 border border-red-500/30 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
            <Star className="w-3 h-3 mr-2 fill-red-500" />
            Prêmios Exclusivos
          </div>
          
          <h1 className="text-6xl font-black tracking-tighter text-white mb-4 italic leading-[0.9]">
            ACELERE SUA<br />SORTE
          </h1>
          
          <p className="text-lg text-zinc-400 max-w-md leading-relaxed">
            Entre na arena Bruno Pickups e dispute os utilitários mais desejados do Brasil.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-16 xl:p-24 relative">
        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
          
          {/* Logo */}
          <Link to="/" className="mb-12 inline-block">
            <span className="text-2xl font-black tracking-tighter text-white italic">
              Bruno Pickups <span className="text-red-500">Prêmios</span>
            </span>
          </Link>

          {/* Header */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              Bem-vindo de volta
            </h2>
            <p className="text-zinc-400 text-sm">
              Insira suas credenciais para gerenciar seus bilhetes.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-600" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-12 pr-4 py-3.5 bg-zinc-900/50 border-0 rounded-md text-white placeholder-zinc-600 focus:ring-1 focus:ring-red-500 focus:bg-zinc-900 transition-colors sm:text-sm"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Senha
                </label>
                <a href="#" className="text-[11px] font-bold text-red-500 hover:text-red-400 transition-colors">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-600" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full pl-12 pr-12 py-3.5 bg-zinc-900/50 border-0 rounded-md text-white placeholder-zinc-600 focus:ring-1 focus:ring-red-500 focus:bg-zinc-900 transition-colors sm:text-sm tracking-widest"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center pt-2 pb-4">
              <div className="relative flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-zinc-800 bg-zinc-900/50 checked:border-red-500 checked:bg-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-1 focus:ring-offset-[#121214] transition-all"
                />
                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <label htmlFor="remember-me" className="ml-3 block text-sm text-zinc-400 cursor-pointer">
                Lembrar de mim
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#FF4D3A] hover:bg-[#FF3A24] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-[#121214] transition-colors"
            >
              ENTRAR NA CONTA
            </button>

            <button
              type="button"
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 focus:ring-offset-[#121214] transition-colors"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff"/>
              </svg>
              Google
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm text-zinc-400">
              Não tem uma conta?{' '}
              <a href="#" className="font-bold text-red-500 hover:text-red-400 transition-colors">
                Cadastre-se agora
              </a>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-auto pt-12 flex flex-col sm:flex-row justify-between items-center text-[10px] text-zinc-600 font-medium uppercase tracking-widest">
          <p className="mb-4 sm:mb-0 text-center sm:text-left">
            © 2024 BRUNO PICKUPS PRÊMIOS. JOGUE COM RESPONSABILIDADE.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-zinc-400 transition-colors">TERMOS</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">PRIVACIDADE</a>
          </div>
        </div>
      </div>
    </div>
  );
}
