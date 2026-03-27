import { Shield, Trophy, Users, Zap, CheckCircle, Award, Sparkles } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <div className="relative bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Sobre Nossa Plataforma
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Sorteios Transparentes e <span className="text-[#FF4D3A]">Premios Incríveis</span>
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed">
              A Bruno Pickups é a plataforma líder em rifas de carros do Brasil. 
              Oferecemos sorteios 100% transparentes com transmissão ao vivo e 
              premios que transformam sonhos em realidade.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard number="50+" label="Campanhas Realizadas" />
          <StatCard number="10K+" label="Participantes" />
          <StatCard number="100%" label="Transparência" />
          <StatCard number="R$2M+" label="Em Prêmios" />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-zinc-900/50 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-white text-center mb-16">
            Por que escolher a <span className="text-[#FF4D3A]">Bruno Pickups?</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="100% Seguro"
              description="Todos os sorteios são realizados com auditoria independente e transmissão ao vivo para total transparência."
            />
            <FeatureCard
              icon={<Trophy className="w-8 h-8" />}
              title="Prêmios Premium"
              description="Trabalhamos exclusivamente com veículos de alta qualidade, revisados e prontos para entrega."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Entrega Rápida"
              description="O ganhador recebe seu prêmio em até 7 dias úteis após a confirmação do sorteio."
            />
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-zinc-800 text-zinc-400 text-sm font-medium mb-6">
            Processo Simples
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Como <span className="text-[#FF4D3A]">Funciona</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Em apenas 4 passos simples você pode concorrer aos melhores prêmios automotivos
          </p>
        </div>
        
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden md:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-zinc-800 via-[#FF4D3A]/30 to-zinc-800" />
          
          <div className="grid md:grid-cols-4 gap-6 lg:gap-8">
            <StepCard
              number="01"
              icon={<CheckCircle className="w-7 h-7" />}
              title="Escolha seu Prêmio"
              description="Navegue pelas campanhas ativas e escolha o veículo dos seus sonhos"
            />
            <StepCard
              number="02"
              icon={<Users className="w-7 h-7" />}
              title="Compre Cotas"
              description="Adquira quantas cotas desejar de forma 100% segura e rápida"
            />
            <StepCard
              number="03"
              icon={<Award className="w-7 h-7" />}
              title="Acompanhe"
              description="Monitore a venda das cotas em tempo real até o sorteio"
            />
            <StepCard
              number="04"
              icon={<Trophy className="w-7 h-7" />}
              title="Participe do Sorteio"
              description="Assista ao sorteio ao vivo e descubra se é o grande ganhador"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#FF4D3A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Pronto para tentar a sorte?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de participantes e concorra aos melhores prêmios automotivos do Brasil.
            </p>
            <a
              href="/campaigns"
              className="inline-flex items-center px-8 py-4 bg-white text-[#FF4D3A] font-bold rounded-lg hover:bg-zinc-100 transition-colors"
            >
              Ver Campanhas Ativas
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-black text-[#FF4D3A] mb-2">{number}</div>
      <div className="text-sm text-zinc-400">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-red-500/30 transition-colors">
      <div className="w-16 h-16 rounded-xl bg-red-500/10 flex items-center justify-center text-[#FF4D3A] mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ number, icon, title, description }: { number: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="relative group">
      {/* Card */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 lg:p-8 text-center hover:border-[#FF4D3A]/30 hover:bg-zinc-900 transition-all duration-300">
        {/* Number Badge */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-[#FF4D3A] to-[#FF3A24] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-red-500/25 group-hover:scale-110 transition-transform duration-300">
          {number}
        </div>
        
        {/* Icon Container */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 flex items-center justify-center text-[#FF4D3A] mx-auto mb-5 mt-4 group-hover:border-[#FF4D3A]/30 transition-colors duration-300">
          {icon}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FF4D3A] transition-colors duration-300">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-zinc-400 leading-relaxed text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
