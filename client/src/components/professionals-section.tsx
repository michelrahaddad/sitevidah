import { Stethoscope, Award, Users, Heart, Clock, Activity } from "lucide-react";

export default function ProfessionalsSection() {
  const professionals = [
    {
      id: 1,
      name: "Dr. William Teixeira Haddad",
      speciality: "Cardiologia Intervencionista",
      description: "Cardiologista intervencionista com mais de 25 anos de experiência em procedimentos cardíacos complexos. Especialista em cateterismo cardíaco, angioplastia e implante de marcapasso.",
      experience: "25+ anos",
      location: "Ibitinga/SP",
      featured: true,
      crm: "CRM-SP 45.678",
      schedule: "Segunda a Sexta: 8h às 18h",
      procedures: ["Cateterismo Cardíaco", "Angioplastia", "Implante de Stent", "Holter 24h"],
      achievements: [
        "Título de Especialista em Cardiologia - SBC",
        "Residência em Cardiologia - InCor/HCFMUSP",
        "Fellowship em Cardiologia Intervencionista"
      ]
    },
    {
      id: 2,
      name: "Dr. Michel Raineri Haddad",
      speciality: "Medicina Interna e Clínica Geral",
      description: "Clínico geral e internista com ampla experiência no diagnóstico e tratamento de doenças complexas. Especialista em medicina preventiva e check-up executivo.",
      experience: "20+ anos",
      location: "Ibitinga/SP", 
      featured: true,
      crm: "CRM-SP 67.890",
      schedule: "Segunda a Sábado: 7h às 17h",
      procedures: ["Check-up Executivo", "Consultas Gerais", "Medicina Preventiva", "Acompanhamento Crônicos"],
      achievements: [
        "Título de Especialista em Clínica Médica",
        "Residência em Medicina Interna",
        "Pós-graduação em Medicina Preventiva"
      ]
    },
    {
      id: 3,
      name: "Dr. William Teixeira Haddad Jr.",
      speciality: "Ortopedia e Traumatologia",
      description: "Ortopedista e traumatologista especializado em cirurgia do joelho, ombro e medicina esportiva. Experiência em artroscopia e reconstrução ligamentar.",
      experience: "15+ anos",
      location: "Ibitinga/SP",
      featured: true,
      crm: "CRM-SP 89.012",
      schedule: "Segunda a Sexta: 8h às 18h | Urgências 24h",
      procedures: ["Artroscopia", "Cirurgia do Joelho", "Lesões Esportivas", "Traumatologia"],
      achievements: [
        "Título de Especialista em Ortopedia e Traumatologia",
        "Fellowship em Cirurgia do Joelho",
        "Especialização em Medicina Esportiva"
      ]
    },
    {
      id: 4,
      name: "Dra. Maria Santos Silva",
      speciality: "Pediatria",
      description: "Pediatra com experiência no cuidado infantil e adolescente.",
      experience: "12+ anos",
      location: "Ibitinga/SP",
      featured: false,
      crm: "CRM-SP 78.901",
      schedule: "Segunda a Sexta: 8h às 17h",
      procedures: ["Consultas Pediátricas", "Puericultura", "Vacinação"],
      achievements: ["Especialista em Pediatria", "Residência em Pediatria"]
    },
    {
      id: 5,
      name: "Dr. Carlos Eduardo Lima",
      speciality: "Dermatologia",
      description: "Dermatologista especializado em tratamentos estéticos e clínicos.",
      experience: "10+ anos",
      location: "Ibitinga/SP",
      featured: false,
      crm: "CRM-SP 65.432",
      schedule: "Terça a Sábado: 9h às 18h",
      procedures: ["Consultas Dermatológicas", "Procedimentos Estéticos"],
      achievements: ["Especialista em Dermatologia", "Fellowship em Dermatologia Estética"]
    },
    {
      id: 6,
      name: "Dra. Ana Paula Rodrigues",
      speciality: "Ginecologia",
      description: "Ginecologista e obstetra com foco na saúde da mulher.",
      experience: "14+ anos",
      location: "Ibitinga/SP",
      featured: false,
      crm: "CRM-SP 54.321",
      schedule: "Segunda a Sexta: 7h às 16h",
      procedures: ["Consultas Ginecológicas", "Pré-natal"],
      achievements: ["Especialista em Ginecologia e Obstetrícia", "Título de Especialista FEBRASGO"]
    },
    {
      id: 7,
      name: "Dr. Roberto Almeida",
      speciality: "Oftalmologia",
      description: "Oftalmologista com experiência em cirurgias e tratamentos oculares.",
      experience: "16+ anos",
      location: "Ibitinga/SP",
      featured: false,
      crm: "CRM-SP 43.210",
      schedule: "Segunda a Sexta: 8h às 18h",
      procedures: ["Consultas Oftalmológicas", "Cirurgia de Catarata"],
      achievements: ["Especialista em Oftalmologia", "Fellowship em Cirurgia de Retina"]
    }
  ];

  const featuredProfessionals = professionals.filter(p => p.featured);
  const otherProfessionals = professionals.filter(p => !p.featured);

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

        {/* Featured Professionals - Main Highlights */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#636E72] mb-4">
              <span className="gradient-text">Nossos Principais Especialistas</span>
            </h3>
            <p className="text-lg text-[#636E72]">
              Médicos de destaque com ampla experiência e reconhecimento profissional
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredProfessionals.map((professional) => (
              <div 
                key={professional.id}
                className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden ring-2 ring-[#00B894] ring-opacity-30 relative"
              >
                <div className="bg-gradient-to-r from-[#00B894] to-[#009d7f] text-white text-center py-3 text-sm font-bold relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 transform -skew-y-1"></div>
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    <span className="text-yellow-300">★</span>
                    Especialista Destaque
                    <span className="text-yellow-300">★</span>
                  </div>
                </div>
              
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

                  {/* Schedule */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-[#636E72] text-sm mb-2 flex items-center gap-2">
                      <Clock size={16} className="text-[#00B894]" />
                      Horários de Atendimento
                    </h4>
                    <p className="text-xs text-[#636E72]">{professional.schedule}</p>
                  </div>

                  {/* Procedures */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-[#636E72] text-sm mb-2 flex items-center gap-2">
                      <Activity size={16} className="text-[#00B894]" />
                      Principais Procedimentos
                    </h4>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {professional.procedures.map((procedure, index) => (
                        <span key={index} className="text-xs bg-[#00B894]/10 text-[#00B894] px-2 py-1 rounded-full">
                          {procedure}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-[#636E72] text-sm mb-2 flex items-center gap-2">
                      <Heart size={16} className="text-[#00B894]" />
                      Qualificações
                    </h4>
                    <ul className="space-y-1">
                      {professional.achievements.slice(0, 3).map((achievement, index) => (
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
                      className="w-full bg-gradient-to-r from-[#00B894] to-[#009d7f] text-white py-3 px-6 rounded-full text-sm font-bold hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      📞 Agendar Consulta
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Professionals Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-xl font-bold text-[#636E72] mb-4">
              Nossa Equipe Médica Completa
            </h3>
            <p className="text-base text-[#636E72]">
              Outros profissionais especializados da nossa rede de atendimento
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherProfessionals.map((professional) => (
              <div 
                key={professional.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="p-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#636E72] to-[#2d3436] rounded-full mx-auto mb-3 flex items-center justify-center">
                    <div className="text-white font-semibold text-sm">
                      {professional.name.split(' ').map(name => name[0]).join('').slice(0, 2)}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h4 className="text-sm font-bold text-[#636E72] mb-1">
                      {professional.name}
                    </h4>
                    <p className="text-xs text-[#00B894] font-semibold mb-2">
                      {professional.speciality}
                    </p>
                    <p className="text-xs text-[#636E72] mb-3">
                      {professional.experience} • {professional.location}
                    </p>
                    
                    <button 
                      onClick={() => {
                        const message = `Olá! Gostaria de agendar uma consulta com ${professional.name} - ${professional.speciality}. Pode me ajudar?`;
                        const whatsappUrl = `https://wa.me/5516993247676?text=${encodeURIComponent(message)}`;
                        window.open(whatsappUrl, '_blank');
                      }}
                      className="w-full bg-[#636E72] text-white py-2 px-3 rounded-full text-xs font-semibold hover:bg-[#2d3436] transition-all"
                    >
                      Agendar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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