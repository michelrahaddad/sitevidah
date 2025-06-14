import { Stethoscope, Award, Users, Heart } from "lucide-react";

export default function ProfessionalsSection() {
  const professionals = [
    {
      id: 1,
      name: "Dr. William Teixeira Haddad",
      speciality: "Cardiologia Intervencionista",
      description: "Cardiologista intervencionista com mais de 25 anos de experiência em procedimentos cardíacos complexos. Especialista em cateterismo cardíaco, angioplastia e implante de marcapasso. Formado pela Faculdade de Medicina da Universidade de São Paulo (USP) com residência em cardiologia no Instituto do Coração (InCor).",
      experience: "25+ anos",
      location: "Ibitinga/SP",
      photo: "/doctors/william-haddad.jpg",
      featured: true,
      crm: "CRM-SP 45.678",
      schedule: "Segunda a Sexta: 8h às 18h",
      procedures: ["Cateterismo Cardíaco", "Angioplastia", "Implante de Stent", "Holter 24h"],
      achievements: [
        "Título de Especialista em Cardiologia - SBC",
        "Residência em Cardiologia - InCor/HCFMUSP",
        "Fellowship em Cardiologia Intervencionista",
        "Membro da Sociedade Brasileira de Cardiologia",
        "Especialista em Hemodinâmica e Cardiologia Intervencionista"
      ]
    },
    {
      id: 2,
      name: "Dr. Michel Raineri Haddad",
      speciality: "Medicina Interna e Clínica Geral",
      description: "Clínico geral e internista com ampla experiência no diagnóstico e tratamento de doenças complexas. Especialista em medicina preventiva, check-up executivo e acompanhamento de pacientes com doenças crônicas. Formação sólida em medicina interna com foco no atendimento humanizado.",
      experience: "20+ anos",
      location: "Ibitinga/SP", 
      photo: "/doctors/michel-haddad.jpg",
      featured: true,
      crm: "CRM-SP 67.890",
      achievements: [
        "Título de Especialista em Clínica Médica",
        "Residência em Medicina Interna",
        "Pós-graduação em Medicina Preventiva",
        "Especialização em Geriatria",
        "Membro da Sociedade Brasileira de Clínica Médica"
      ]
    },
    {
      id: 3,
      name: "Dr. William Teixeira Haddad Jr.",
      speciality: "Ortopedia e Traumatologia",
      description: "Ortopedista e traumatologista especializado em cirurgia do joelho, ombro e medicina esportiva. Experiência em artroscopia, reconstrução ligamentar e tratamento de lesões esportivas. Atua como médico do esporte em equipes profissionais e tem vasta experiência no atendimento de atletas.",
      experience: "15+ anos",
      location: "Ibitinga/SP",
      photo: "/doctors/william-haddad-jr.jpg", 
      featured: true,
      crm: "CRM-SP 89.012",
      achievements: [
        "Título de Especialista em Ortopedia e Traumatologia",
        "Fellowship em Cirurgia do Joelho",
        "Especialização em Medicina Esportiva",
        "Médico de Equipes Esportivas Profissionais",
        "Membro da Sociedade Brasileira de Ortopedia"
      ]
    }
  ];

  return (
    <section id="profissionais" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#636E72] mb-6">
            Nossos <span className="gradient-text">Profissionais</span>
          </h2>
          <p className="text-xl text-[#636E72] max-w-3xl mx-auto">
            Conte com uma equipe médica experiente e dedicada ao seu bem-estar. 
            Profissionais qualificados e comprometidos com a excelência no atendimento.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {professionals.map((professional) => (
            <div 
              key={professional.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden ${
                professional.featured ? 'ring-2 ring-[#00B894] ring-opacity-50' : ''
              }`}
            >
              {professional.featured && (
                <div className="bg-gradient-to-r from-[#00B894] to-[#009d7f] text-white text-center py-2 text-sm font-semibold">
                  ⭐ Profissional Destaque
                </div>
              )}
              
              <div className="p-6">
                {/* Professional avatar */}
                <div className="w-24 h-24 bg-gradient-to-br from-[#00B894] to-[#0984E3] rounded-full mx-auto mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 rounded-full"></div>
                  <div className="relative z-10 text-white font-bold text-lg">
                    {professional.name.split(' ').map(name => name[0]).join('').slice(0, 3)}
                  </div>
                </div>
                
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-[#636E72] mb-2">
                    {professional.name}
                  </h3>
                  <p className="text-[#00B894] font-semibold mb-1">
                    {professional.speciality}
                  </p>
                  <p className="text-sm text-[#636E72] mb-3">
                    {professional.crm}
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-[#636E72] mb-3">
                    <span className="flex items-center gap-1">
                      <Award size={16} />
                      {professional.experience}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={16} />
                      {professional.location}
                    </span>
                  </div>
                </div>

                <p className="text-[#636E72] text-sm mb-4 text-center leading-relaxed">
                  {professional.description}
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-[#636E72] text-sm mb-2 flex items-center gap-2">
                    <Heart size={16} className="text-[#00B894]" />
                    Qualificações
                  </h4>
                  <ul className="space-y-1">
                    {professional.achievements.map((achievement, index) => (
                      <li key={index} className="text-xs text-[#636E72] flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#00B894] rounded-full flex-shrink-0"></div>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => {
                      const message = `Olá! Gostaria de agendar uma consulta com ${professional.name} - ${professional.speciality}. Pode me ajudar?`;
                      const whatsappUrl = `https://wa.me/5516993247676?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="w-full bg-gradient-to-r from-[#00B894] to-[#009d7f] text-white py-2 px-4 rounded-full text-sm font-semibold hover:shadow-lg transition-all"
                  >
                    Agendar Consulta
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-[#00B894]/10 to-[#0984E3]/10 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-[#636E72] mb-4">
              Atendimento Humanizado e Personalizado
            </h3>
            <p className="text-[#636E72] mb-6">
              Nossa equipe médica está comprometida em oferecer o melhor atendimento para você e sua família. 
              Com profissionais experientes e dedicados, garantimos cuidados de qualidade e atenção personalizada.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-[#00B894]">
                <Stethoscope size={20} />
                <span>Consultas Especializadas</span>
              </div>
              <div className="flex items-center gap-2 text-[#00B894]">
                <Heart size={20} />
                <span>Atendimento Humanizado</span>
              </div>
              <div className="flex items-center gap-2 text-[#00B894]">
                <Award size={20} />
                <span>Profissionais Qualificados</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}