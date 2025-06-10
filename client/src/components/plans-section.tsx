
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

    onSelectPlan({
      id: plan.id,
      name: plan.name,
      type: plan.type,
      annualPrice: (parseFloat(plan.monthlyPrice) * 12).toString(),
      monthlyPrice: plan.monthlyPrice,
      adhesionFee: "0",
      maxDependents: 4,
    });
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
                className={`plan-card ${isPopular ? 'popular' : ''}`}
              >
                {isPopular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-[#00B894] to-[#009d7f] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg border-2 border-white">
                      ⭐ Mais Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-[#636E72] mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-[#636E72]">
                    {plan.type === 'individual' && "Perfeito para você"}
                    {plan.type === 'familiar' && "Para toda a família"}
                    {plan.type === 'empresarial' && "Para sua empresa"}
                  </p>
                </div>
                
                <div className="text-center mb-8">
                  {isEnterprise ? (
                    <>
                      <div className="text-4xl font-bold text-[#0984E3] mb-2">
                        {formatCurrency(parseFloat(plan.monthlyPrice || "0"))}
                      </div>
                      <div className="text-[#636E72]">por colaborador/mês</div>
                      <div className="text-sm text-[#636E72] mt-2">
                        + {formatCurrency(parseFloat(plan.adhesionFee))} taxa de adesão por pessoa
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl font-bold text-[#00B894] mb-2">
                        {formatCurrency(parseFloat(plan.annualPrice))}
                      </div>
                      <div className="text-[#636E72]">por ano</div>
                      <div className="text-sm text-[#636E72] mt-2">
                        + {formatCurrency(parseFloat(plan.adhesionFee))} taxa de adesão
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className={`mr-3 ${isEnterprise ? 'text-[#0984E3]' : 'text-[#00B894]'}`} size={20} />
                      <span className="text-[#636E72]">{feature}</span>
                    </div>
                  ))}
                </div>

                {!isEnterprise && (
                  <div className="space-y-3 mb-8 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#636E72]">À vista (PIX):</span>
                      <span className="font-semibold text-[#00B894]">
                        {formatCurrency(paymentOptions.pix.total - parseFloat(plan.adhesionFee))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#636E72]">Cartão 12x:</span>
                      <span className="font-semibold">
                        {paymentOptions.credit.label.split(': ')[1]}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#636E72]">Boleto 12x:</span>
                      <span className="font-semibold">
                        {paymentOptions.boleto.label.split(': ')[1]}
                      </span>
                    </div>
                  </div>
                )}

                {isEnterprise && (
                  <div className="mb-8 text-center text-sm text-[#636E72]">
                    Valor flexível conforme número de colaboradores
                  </div>
                )}

                <button 
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-4 rounded-full font-semibold transition-colors flex items-center justify-center ${
                    isEnterprise 
                      ? 'bg-[#0984E3] text-white hover:bg-[#0770c4]' 
                      : isPopular
                      ? 'bg-[#00B894] text-white hover:bg-[#009d7f] animate-glow'
                      : 'bg-[#00B894] text-white hover:bg-[#009d7f]'
                  }`}
                >
                  {isEnterprise && <MessageCircle className="mr-2" size={20} />}
                  {isEnterprise ? 'Falar com Vendedor' : 'Escolher Plano'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
