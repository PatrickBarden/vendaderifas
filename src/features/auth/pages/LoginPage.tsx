import React from 'react';
import { Eye, Lock, Mail, Star } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { hasSupabaseEnv } from '@/lib/env';
import { signInWithEmail } from '@/services/auth';

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#121214]">
      <div className="hidden lg:flex w-1/2 relative flex-col justify-end p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80" alt="Pickup Truck" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/60 to-transparent" />
          <div className="absolute inset-0 bg-red-500/20 mix-blend-overlay" />
        </div>
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-zinc-900/80 border border-red-500/30 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
            <Star className="w-3 h-3 mr-2 fill-red-500" />
            Pronta para auth com Supabase
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-white mb-4 italic leading-[0.9]">
            ACELERE SUA
            <br />
            SORTE
          </h1>
          <p className="text-lg text-zinc-400 max-w-md leading-relaxed">Tela preparada para evoluir para e-mail/senha e OAuth real.</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-16 xl:p-24 relative">
        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
          <Link to="/" className="mb-12 inline-block">
            <span className="text-2xl font-black tracking-tighter text-white italic">
              Bruno Pickups <span className="text-red-500">Prêmios</span>
            </span>
          </Link>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Bem-vindo de volta</h2>
            <p className="text-zinc-400 text-sm">Insira suas credenciais para gerenciar seus bilhetes.</p>
          </div>

          <form
            className="space-y-5"
            onSubmit={async (event) => {
              event.preventDefault();
              setSubmitting(true);
              setError(null);

              try {
                await signInWithEmail(email, password);
                navigate('/dashboard');
              } catch (authError) {
                const message = authError instanceof Error ? authError.message : 'Nao foi possivel entrar.';
                setError(message);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <Field label="E-mail" icon={<Mail className="h-5 w-5 text-zinc-600" />}>
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" required className="block w-full pl-12 pr-4 py-3.5 bg-zinc-900/50 border-0 rounded-md text-white placeholder-zinc-600 focus:ring-1 focus:ring-red-500 focus:bg-zinc-900 transition-colors sm:text-sm" placeholder="seu@email.com" />
            </Field>

            <Field label="Senha" icon={<Lock className="h-5 w-5 text-zinc-600" />}>
              <input value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? 'text' : 'password'} autoComplete="current-password" required className="block w-full pl-12 pr-12 py-3.5 bg-zinc-900/50 border-0 rounded-md text-white placeholder-zinc-600 focus:ring-1 focus:ring-red-500 focus:bg-zinc-900 transition-colors sm:text-sm tracking-widest" placeholder="********" />
              <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-600 hover:text-zinc-400 transition-colors">
                <Eye className="h-5 w-5" />
              </button>
            </Field>

            {!hasSupabaseEnv() ? <p className="text-xs text-amber-400">Sem credenciais Supabase configuradas. O login segue em modo demonstracao.</p> : null}
            {error ? <p className="text-sm text-red-400">{error}</p> : null}

            <button type="submit" disabled={submitting} className="w-full flex justify-center items-center py-4 px-4 rounded-md text-sm font-bold text-white bg-[#FF4D3A] hover:bg-[#FF3A24] transition-colors disabled:opacity-70">
              {submitting ? 'ENTRANDO...' : 'ENTRAR NA CONTA'}
            </button>
          </form>
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
