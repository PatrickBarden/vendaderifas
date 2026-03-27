import React from 'react';
import { Eye, Lock, Mail, Star, User, Chrome, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { hasSupabaseEnv } from '@/lib/env';
import { signInWithEmail } from '@/services/auth';

type Mode = 'login' | 'register';

export function LoginPage() {
  const [mode, setMode] = useState<Mode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const isLogin = mode === 'login';

  const toggleMode = () => {
    setMode(isLogin ? 'register' : 'login');
    setError(null);
  };

  const handleGoogleSignIn = () => {
    alert('Login com Google em breve!');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#121214]">
      <div className="hidden lg:flex w-1/2 relative flex-col justify-end p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/login.png" alt="Pickup Truck" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/60 to-transparent" />
          <div className="absolute inset-0 bg-red-500/20 mix-blend-overlay" />
        </div>
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-zinc-900/80 border border-red-500/30 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
            <Star className="w-3 h-3 mr-2 fill-red-500" />
            {isLogin ? 'Sua area exclusiva' : 'Junte-se a nos'}
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-white mb-4 italic leading-[0.9]">
            ACELERE SUA
            <br />
            SORTE
          </h1>
          <p className="text-lg text-zinc-400 max-w-md leading-relaxed">
            {isLogin 
              ? 'Entre para acompanhar suas cotas, campanhas favoritas e resultados dos sorteios.'
              : 'Crie sua conta e comece a participar dos melhores sorteios de carros do Brasil.'}
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col p-6 lg:p-8 xl:p-10 relative">
        <div className="flex-1 flex flex-col justify-start max-w-md w-full mx-auto pt-2">
          <div className="flex justify-center mb-6">
            <Link to="/" className="inline-block">
              <img 
                src="/images/logo.png" 
                alt="Bruno Pickups Premios" 
                className="h-20 w-auto"
              />
            </Link>
          </div>

          {/* Animated Container */}
          <div className="relative">
            <div 
              className={`transition-all duration-500 ease-in-out transform ${
                isLogin ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 absolute inset-0 pointer-events-none'
              }`}
            >
              {/* Login Form */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">Bem-vindo de volta</h2>
                <p className="text-zinc-400 text-sm">Insira suas credenciais para acompanhar suas rifas e cotas compradas.</p>
              </div>

              <form
                className="space-y-4"
                onSubmit={async (event) => {
                  event.preventDefault();
                  setSubmitting(true);
                  setError(null);

                  try {
                    const result = await signInWithEmail(email, password);
                    navigate(result.redirectTo);
                  } catch (authError) {
                    const message = authError instanceof Error ? authError.message : 'Nao foi possivel entrar.';
                    setError(message);
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                <Field label="E-mail" icon={<Mail className="h-5 w-5 text-zinc-600" />}>
                  <input 
                    value={email} 
                    onChange={(event) => setEmail(event.target.value)} 
                    type="email" 
                    autoComplete="email" 
                    required 
                    className="block w-full pl-12 pr-4 py-3.5 bg-zinc-900/50 border border-zinc-700 rounded-md text-white placeholder-zinc-600 focus:ring-1 focus:ring-red-500 focus:bg-zinc-900 focus:border-red-500 transition-colors sm:text-sm" 
                    placeholder="seu@email.com" 
                  />
                </Field>

                <Field label="Senha" icon={<Lock className="h-5 w-5 text-zinc-600" />}>
                  <input 
                    value={password} 
                    onChange={(event) => setPassword(event.target.value)} 
                    type={showPassword ? 'text' : 'password'} 
                    autoComplete="current-password" 
                    required 
                    className="block w-full pl-12 pr-12 py-3.5 bg-zinc-900/50 border border-zinc-700 rounded-md text-white placeholder-zinc-600 focus:ring-1 focus:ring-red-500 focus:bg-zinc-900 focus:border-red-500 transition-colors sm:text-sm tracking-widest" 
                    placeholder="********" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword((prev) => !prev)} 
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-600 hover:text-zinc-400 transition-colors"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </Field>

                {!hasSupabaseEnv() ? <p className="text-xs text-amber-400">Area de login temporariamente em ajuste. Tente novamente em instantes.</p> : null}
                {error ? <p className="text-sm text-red-400">{error}</p> : null}

                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="w-full flex justify-center items-center py-4 px-4 rounded-md text-sm font-bold text-white bg-[#FF4D3A] hover:bg-[#FF3A24] transition-colors disabled:opacity-70"
                >
                  {submitting ? 'ENTRANDO...' : 'ENTRAR NA CONTA'}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#121214] text-zinc-500">ou</span>
                </div>
              </div>

              {/* Google Button */}
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex justify-center items-center gap-3 py-3.5 px-4 rounded-md border border-zinc-700 bg-zinc-900/50 text-white font-medium hover:bg-zinc-800 transition-colors"
              >
                <Chrome className="w-5 h-5" />
                Entrar com Google
              </button>

              {/* Toggle to Register */}
              <p className="mt-4 text-center text-sm text-zinc-400">
                Nao tem uma conta?{' '}
                <button 
                  onClick={toggleMode}
                  className="text-[#FF4D3A] font-medium hover:text-[#FF3A24] transition-colors"
                >
                  Cadastre-se
                </button>
              </p>
            </div>

            <div 
              className={`transition-all duration-500 ease-in-out transform ${
                !isLogin ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 absolute inset-0 pointer-events-none'
              }`}
            >
              {/* Register Form */}
              <div className="mb-6">
                <button 
                  onClick={toggleMode}
                  className="flex items-center text-zinc-400 hover:text-white text-sm mb-4 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Voltar para login
                </button>
                <h2 className="text-3xl font-bold text-white mb-2">Criar conta</h2>
                <p className="text-zinc-400 text-sm">Preencha seus dados para começar a participar dos sorteios.</p>
              </div>

              <form
                className="space-y-4"
                onSubmit={async (event) => {
                  event.preventDefault();
                  setSubmitting(true);
                  setError(null);

                  if (password !== confirmPassword) {
                    setError('As senhas nao coincidem.');
                    setSubmitting(false);
                    return;
                  }

                  alert('Cadastro em desenvolvimento! Use login por enquanto.');
                  setSubmitting(false);
                }}
              >
                <Field label="Nome completo" icon={<User className="h-5 w-5 text-zinc-600" />}>
                  <input 
                    value={name} 
                    onChange={(event) => setName(event.target.value)} 
                    type="text" 
                    autoComplete="name" 
                    required 
                    className="block w-full pl-12 pr-4 py-3.5 bg-zinc-900/50 border border-zinc-700 rounded-md text-white placeholder-zinc-600 focus:ring-1 focus:ring-red-500 focus:bg-zinc-900 focus:border-red-500 transition-colors sm:text-sm" 
                    placeholder="Seu nome completo" 
                  />
                </Field>

                <Field label="E-mail" icon={<Mail className="h-5 w-5 text-zinc-600" />}>
                  <input 
                    value={email} 
                    onChange={(event) => setEmail(event.target.value)} 
                    type="email" 
                    autoComplete="email" 
                    required 
                    className="block w-full pl-12 pr-4 py-3.5 bg-zinc-900/50 border border-zinc-700 rounded-md text-white placeholder-zinc-600 focus:ring-1 focus:ring-red-500 focus:bg-zinc-900 focus:border-red-500 transition-colors sm:text-sm" 
                    placeholder="seu@email.com" 
                  />
                </Field>

                <Field label="Senha" icon={<Lock className="h-5 w-5 text-zinc-600" />}>
                  <input 
                    value={password} 
                    onChange={(event) => setPassword(event.target.value)} 
                    type={showPassword ? 'text' : 'password'} 
                    autoComplete="new-password" 
                    required 
                    className="block w-full pl-12 pr-12 py-3.5 bg-zinc-900/50 border border-zinc-700 rounded-md text-white placeholder-zinc-600 focus:ring-1 focus:ring-red-500 focus:bg-zinc-900 focus:border-red-500 transition-colors sm:text-sm tracking-widest" 
                    placeholder="********" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword((prev) => !prev)} 
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-600 hover:text-zinc-400 transition-colors"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </Field>

                <Field label="Confirmar senha" icon={<Lock className="h-5 w-5 text-zinc-600" />}>
                  <input 
                    value={confirmPassword} 
                    onChange={(event) => setConfirmPassword(event.target.value)} 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    autoComplete="new-password" 
                    required 
                    className="block w-full pl-12 pr-12 py-3.5 bg-zinc-900/50 border border-zinc-700 rounded-md text-white placeholder-zinc-600 focus:ring-1 focus:ring-red-500 focus:bg-zinc-900 focus:border-red-500 transition-colors sm:text-sm tracking-widest" 
                    placeholder="********" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmPassword((prev) => !prev)} 
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-600 hover:text-zinc-400 transition-colors"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </Field>

                {error ? <p className="text-sm text-red-400">{error}</p> : null}

                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-md text-sm font-bold text-white bg-[#FF4D3A] hover:bg-[#FF3A24] transition-colors disabled:opacity-70"
                >
                  {submitting ? 'CRIANDO CONTA...' : 'CRIAR CONTA'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

                {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#121214] text-zinc-500">ou</span>
                </div>
              </div>

              {/* Google Button */}
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex justify-center items-center gap-3 py-3.5 px-4 rounded-md border border-zinc-700 bg-zinc-900/50 text-white font-medium hover:bg-zinc-800 transition-colors"
              >
                <Chrome className="w-5 h-5" />
                Cadastrar com Google
              </button>

              {/* Toggle to Login */}
              <p className="mt-4 text-center text-sm text-zinc-400">
                Ja tem uma conta?{' '}
                <button 
                  onClick={toggleMode}
                  className="text-[#FF4D3A] font-medium hover:text-[#FF3A24] transition-colors"
                >
                  Entrar
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">{icon}</div>
        {children}
      </div>
    </div>
  );
}
