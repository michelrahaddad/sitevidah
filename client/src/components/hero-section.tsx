import { CreditCard } from "lucide-react";
import { scrollToElement } from "@/lib/utils";
import type { SelectedPlan } from "@/pages/home";

interface HeroSectionProps {
  onSelectPlan: (plan: SelectedPlan) => void;
}

export default function HeroSection({ onSelectPlan }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-5"></div>
      
      {/* Floating geometric elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#00B894]/20 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#0984E3]/20 rounded-xl animate-float" style={{animationDelay: '-2s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#00B894]/30 rounded-lg animate-float" style={{animationDelay: '-4s'}}></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Cartão + Vidah</span>
            <br />
            <span className="text-[#636E72]">Benefícios Exclusivos</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#636E72] mb-8 max-w-3xl mx-auto leading-relaxed">
            Descubra um mundo de vantagens com nosso cartão de benefícios. 
            Descontos exclusivos em empresas parceiras para você e sua família.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={() => scrollToElement('planos')}
              className="bg-[#00B894] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#009d7f] transition-all transform hover:scale-105 animate-glow"
            >
              Ver Planos
            </button>
            <button 
              onClick={() => scrollToElement('beneficios')}
              className="border-2 border-[#0984E3] text-[#0984E3] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#0984E3] hover:text-white transition-all"
            >
              Saiba Mais
            </button>
          </div>

          {/* Digital Card Preview */}
          <div className="relative max-w-sm mx-auto animate-fade-in" style={{animationDelay: '0.5s'}}>
            <div className="glass-card rounded-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="gradient-bg rounded-xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 rounded-full"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 bg-white/20 rounded-full"></div>
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-white rounded-lg p-2 flex items-center justify-center min-w-[70px]">
                    <img 
                      src="/logo-vidah.png" 
                      alt="Cartão Vidah" 
                      className="h-5 w-auto max-w-[60px] object-contain"
                    />
                  </div>
                  <CreditCard className="text-2xl opacity-80" size={32} />
                </div>
                <div className="space-y-2">
                  <div className="text-sm opacity-80">CARTÃO + VIDAH</div>
                  <div className="font-bold text-lg">João Silva</div>
                  <div className="text-sm opacity-80">Válido até 12/2025</div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <div className="w-8 h-8 bg-white/40 rounded grid grid-cols-3 gap-0.5">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="bg-white/60 rounded-sm"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
