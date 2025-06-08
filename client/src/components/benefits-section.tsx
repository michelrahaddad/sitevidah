import { Heart, Utensils, GraduationCap, TrendingUp, Users, Clock, Shield } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Heart,
      title: "Saúde & Bem-estar",
      description: "Descontos em consultas médicas, exames, farmácias e academias parceiras."
    },
    {
      icon: Utensils,
      title: "Alimentação", 
      description: "Vantagens em restaurantes, delivery e supermercados da sua região."
    },
    {
      icon: GraduationCap,
      title: "Educação",
      description: "Descontos em cursos, idiomas e instituições de ensino credenciadas."
    }
  ];

  const stats = [
    { value: "1000+", label: "Empresas Parceiras" },
    { value: "50K+", label: "Clientes Satisfeitos" },
    { value: "30%", label: "Economia Média" },
    { value: "24/7", label: "Suporte" }
  ];

  return (
    <section id="beneficios" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#636E72] mb-6">
            Por que escolher o <span className="gradient-text">Cartão + Vidah?</span>
          </h2>
          <p className="text-xl text-[#636E72] max-w-3xl mx-auto">
            Mais de 1000 empresas parceiras oferecendo descontos exclusivos em saúde, alimentação, educação e muito mais.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="glass-card rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <benefit.icon className="text-2xl text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#636E72] mb-4">{benefit.title}</h3>
              <p className="text-[#636E72]">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
              <div className="text-[#636E72]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <div className="text-center p-6">
            <TrendingUp className="w-12 h-12 text-[#00B894] mx-auto mb-4" />
            <h4 className="font-semibold text-[#636E72] mb-2">Economia Garantida</h4>
            <p className="text-sm text-[#636E72]">Economize até 30% em produtos e serviços</p>
          </div>
          <div className="text-center p-6">
            <Users className="w-12 h-12 text-[#00B894] mx-auto mb-4" />
            <h4 className="font-semibold text-[#636E72] mb-2">Para Toda Família</h4>
            <p className="text-sm text-[#636E72]">Benefícios estendidos para dependentes</p>
          </div>
          <div className="text-center p-6">
            <Clock className="w-12 h-12 text-[#00B894] mx-auto mb-4" />
            <h4 className="font-semibold text-[#636E72] mb-2">Disponível 24/7</h4>
            <p className="text-sm text-[#636E72]">Use seus benefícios a qualquer hora</p>
          </div>
          <div className="text-center p-6">
            <Shield className="w-12 h-12 text-[#00B894] mx-auto mb-4" />
            <h4 className="font-semibold text-[#636E72] mb-2">100% Seguro</h4>
            <p className="text-sm text-[#636E72]">Tecnologia de ponta em segurança</p>
          </div>
        </div>
      </div>
    </section>
  );
}
