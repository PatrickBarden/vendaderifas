import { Search, Shield, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useAdminUsers } from '@/hooks/useAdminUsers';
import { formatCurrency } from '@/lib/formatters';

export function AdminUsersPage() {
  const { users, loading } = useAdminUsers();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => users.filter((user) => `${user.fullName} ${user.email} ${user.city}`.toLowerCase().includes(query.toLowerCase())), [users, query]);

  const activeUsers = users.filter((user) => user.status === 'active').length;
  const customers = users.filter((user) => user.role === 'customer').length;

  if (loading) {
    return <PageLoading label="Carregando usuarios..." />;
  }

  return (
    <div className="space-y-8">
      <Header title="Usuarios" description="Gerencie perfis, niveis de acesso e a saude da base de clientes com um painel de leitura rapida e operacional." />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard icon={<Users className="w-6 h-6" />} title="Usuarios ativos" value={String(activeUsers)} subtitle="Perfis aptos a comprar ou operar" />
        <MetricCard icon={<Shield className="w-6 h-6" />} title="Administradores" value={String(users.filter((user) => user.role === 'admin').length)} subtitle="Acessos privilegiados cadastrados" accent="warning" />
        <MetricCard icon={<Search className="w-6 h-6" />} title="Clientes" value={String(customers)} subtitle="Usuarios finais da plataforma" accent="primary" />
      </section>

      <section className="bg-[#202020] border border-white/5 p-5 md:p-6">
        <label className="flex items-center gap-4 bg-[#161616] px-5 py-4 border border-white/5">
          <Search className="w-5 h-5 text-[#C79A93]" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="bg-transparent outline-none w-full text-xl text-[#D7B0AA]" placeholder="Buscar por nome, email ou cidade..." />
        </label>
      </section>

      <section className="bg-[#171717] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px]">
            <thead className="bg-[#111111]">
              <tr className="text-left text-xs uppercase tracking-[0.3em] text-[#D4A49D]">
                <th className="px-7 py-5 font-semibold">Usuario</th>
                <th className="px-7 py-5 font-semibold">Cidade</th>
                <th className="px-7 py-5 font-semibold">Pedidos</th>
                <th className="px-7 py-5 font-semibold">Gasto total</th>
                <th className="px-7 py-5 font-semibold">Perfil</th>
                <th className="px-7 py-5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-t border-white/5">
                  <td className="px-7 py-6">
                    <p className="text-xl font-bold text-white">{user.fullName}</p>
                    <p className="text-white/45">{user.email}</p>
                  </td>
                  <td className="px-7 py-6 text-xl text-white/70">{user.city}</td>
                  <td className="px-7 py-6 text-xl text-white/70">{user.totalOrders}</td>
                  <td className="px-7 py-6 text-xl font-black text-white">{formatCurrency(user.totalSpent)}</td>
                  <td className="px-7 py-6">
                    <span className={`inline-flex rounded-full px-4 py-2 text-sm font-black ${user.role === 'admin' ? 'bg-[#3A3420] text-[#E6C65B]' : 'bg-[#242424] text-white/75'}`}>
                      {user.role === 'admin' ? 'ADMIN' : 'CLIENTE'}
                    </span>
                  </td>
                  <td className="px-7 py-6">
                    <span className={`inline-flex rounded-full px-4 py-2 text-sm font-black ${user.status === 'active' ? 'bg-[#233228] text-[#92E0A8]' : 'bg-[#312325] text-[#FF8F80]'}`}>
                      {user.status === 'active' ? 'ATIVO' : 'INATIVO'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Header({ title, description }: { title: string; description: string }) {
  return (
    <section>
      <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white">{title}</h1>
      <p className="text-xl text-[#D4AEA7] mt-3 max-w-3xl">{description}</p>
    </section>
  );
}

function MetricCard({ icon, title, value, subtitle, accent = 'neutral' }: { icon: React.ReactNode; title: string; value: string; subtitle: string; accent?: 'primary' | 'warning' | 'neutral' }) {
  const accentClass = accent === 'primary' ? 'border-[#FF5A46] text-[#FFB4AA]' : accent === 'warning' ? 'border-[#E3C45B] text-[#E3C45B]' : 'border-white/10 text-white';
  return (
    <article className={`bg-[#242424] border-l-4 ${accentClass} p-6`}>
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6">{icon}</div>
      <p className="text-sm uppercase tracking-[0.25em] text-white/45 mb-2">{title}</p>
      <p className="text-4xl font-black text-white">{value}</p>
      <p className="text-white/45 mt-3">{subtitle}</p>
    </article>
  );
}

function PageLoading({ label }: { label: string }) {
  return <div className="text-white/60 uppercase tracking-[0.3em] text-sm">{label}</div>;
}
