interface AdminPlaceholderPageProps {
  title: string;
  description: string;
}

export function AdminPlaceholderPage({ title, description }: AdminPlaceholderPageProps) {
  return (
    <div className="rounded-[2rem] border border-white/5 bg-[#1E1E1E] p-8 md:p-10">
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">{title}</h1>
      <p className="text-lg text-[#D0B1AC] max-w-2xl leading-relaxed">{description}</p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-[1.5rem] bg-[#161616] border border-white/5 p-6">
          <p className="text-sm uppercase tracking-[0.28em] text-[#C18F87] mb-3">Status</p>
          <p className="text-2xl font-black text-white">Em construcao</p>
        </div>
        <div className="rounded-[1.5rem] bg-[#161616] border border-white/5 p-6">
          <p className="text-sm uppercase tracking-[0.28em] text-[#C18F87] mb-3">Proximo passo</p>
          <p className="text-2xl font-black text-white">Integrar dados reais</p>
        </div>
        <div className="rounded-[1.5rem] bg-[#161616] border border-white/5 p-6">
          <p className="text-sm uppercase tracking-[0.28em] text-[#C18F87] mb-3">Objetivo</p>
          <p className="text-2xl font-black text-white">Operacao centralizada</p>
        </div>
      </div>
    </div>
  );
}
