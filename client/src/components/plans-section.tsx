import { Check, MessageCircle, Users, Building } from "lucide-react";
import type { SelectedPlan } from "@/pages/home";

interface PlansSectionProps {
  onSelectPlan: (plan: SelectedPlan) => void;
}

export default function PlansSection({ onSelectPlan }: PlansSectionProps) {

  // Static plans as specified in the document
  const plans = [
    {
      id: 1,
      name: "Cartão Familiar",
      type: "familiar",
      monthlyPrice: "34.90",
      icon: "👨‍👩‍👧‍👦",
      features: [
        "Cobertura para você e até 4 dependentes",
        "Descontos em clínicas médicas e odontológicas", 
        "Atendimento humanizado sempre que precisar"
      ]
    },
    {
      id: 2,
      name: "Cartão Corporativo", 
      type: "empresarial",
      icon: "🏢",
      features: [
        "Benefícios para sua equipe com custo acessível",
        "Incentive saúde e bem-estar no ambiente de trabalho",
        "Personalizado para empresas de Ibitinga/SP",
        "Fale com nosso time e receba uma proposta"
      ]
    }
  ];

  const handleSelectPlan = (plan: any) => {
    if (plan.type === 'empresarial') {
      const message = `Olá! Gostaria de saber mais sobre o plano empresarial do Cartão + Vidah`;
      const whatsappUrl = `https://wa.me/5516993247676?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      return;
    }

    // Para plano familiar, também direcionar para WhatsApp
    const message = `Olá! Gostaria de assinar o ${plan.name} por R$ ${plan.monthlyPrice}/mês. Pode me ajudar com o processo?`;
    const whatsappUrl = `https://wa.me/5516993247676?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="planos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#636E72] mb-6">
            Escolha seu <span className="gradient-text">Plano Ideal</span>
          </h2>
          <p className="text-xl text-[#636E72] max-w-3xl mx-auto">
            Economize com saúde, educação, mobilidade e bem-estar. Com o Cartão + Vidah, você e sua família aproveitam benefícios exclusivos em empresas parceiras.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => {
            const isEnterprise = plan.type === 'empresarial';

            return (
              <div 
                key={plan.id}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{plan.icon}</div>
                  <h3 className="text-2xl font-bold text-[#636E72] mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-lg text-[#636E72] mb-4">
                    {isEnterprise ? "Plano para Empresas" : "Plano Familiar"}
                  </p>
                  
                  {!isEnterprise && (
                    <div className="mb-6">
                      <div className="text-4xl font-bold gradient-text mb-2">
                        💰 Só R$ {plan.monthlyPrice}/mês
                      </div>
                      <div className="text-sm text-[#636E72]">Sem taxa de adesão</div>
                    </div>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8 text-left">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="text-[#00B894] mr-3 mt-1">
                        {isEnterprise ? "🏢" : "🦷"}
                      </div>
                      <span className="text-[#636E72]">{feature}</span>
                    </li>
                  ))}
                  {!isEnterprise && (
                    <li className="flex items-start">
                      <div className="text-[#00B894] mr-3 mt-1">📲</div>
                      <span className="text-[#636E72]">Atendimento humanizado sempre que precisar</span>
                    </li>
                  )}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-4 px-6 rounded-full font-semibold text-lg transition-all transform hover:scale-105 ${
                    isEnterprise
                      ? 'bg-[#0984E3] text-white hover:bg-[#0773cc]'
                      : 'bg-gradient-to-r from-[#00B894] to-[#009d7f] text-white hover:shadow-lg'
                  }`}
                >
                  {isEnterprise ? (
                    <span className="flex items-center justify-center">
                      💬 Solicitar Cotação
                    </span>
                  ) : (
                    'Assinar Agora'
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}