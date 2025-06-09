import { TrendingUp, Users, Clock, Shield } from "lucide-react";

export default function BenefitsSection() {
  const stats = [
    { value: "17+", label: "Empresas Parceiras" },
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
            Mais de 17 empresas parceiras oferecendo descontos exclusivos para você e sua família.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-16">
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
