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
      name: "Dr. Diego Rodrigues Charamitara",
      speciality: "Clínico Geral",
      description: "Clínico geral com experiência no atendimento ambulatorial e consultas gerais.",
      experience: "15+ anos",
      location: "Ibitinga/SP",
      featured: false,
      crm: "CRM-SP 78.901",
      schedule: "Segunda a Sexta: 8h às 17h",
      procedures: ["Consultas Gerais", "Check-up", "Acompanhamento"],
      achievements: ["Especialista em Clínica Médica", "Residência em Medicina Interna"]
    },
    {
      id: 5,
      name: "Dra. Isabela Cardoso",
      speciality: "Ginecologia e Obstetrícia",
      description: "Ginecologista e obstetra especializada na saúde da mulher.",
      experience: "12+ anos",
      location: "Ibitinga/SP",
      featured: false,
      crm: "CRM-SP 67.543",
      schedule: "Segunda a Sexta: 7h às 16h",
      procedures: ["Consultas Ginecológicas", "Pré-natal", "Preventivo"],
      achievements: ["Especialista em Ginecologia e Obstetrícia", "Título FEBRASGO"]
    },
    {
      id: 6,
      name: "Dra. Maria Santos Silva",
      speciality: "Pediatria",
      description: "Pediatra com experiência no cuidado infantil e adolescente.",
      experience: "12+ anos",
      location: "Ibitinga/SP",
      featured: false,
      crm: "CRM-SP 78.902",
      schedule: "Segunda a Sexta: 8h às 17h",
      procedures: ["Consultas Pediátricas", "Puericultura", "Vacinação"],
      achievements: ["Especialista em Pediatria", "Residência em Pediatria"]
    },
    {
      id: 7,
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
      id: 8,
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
            <span className="gradient-text">Profissionais de Saúde</span>
          </h2>
          <p className="text-xl text-[#636E72] max-w-3xl mx-auto">
            Conte com uma equipe médica experiente e dedicada ao seu bem-estar. 
            Profissionais qualificados e comprometidos com a excelência no atendimento.
          </p>
        </div>

        {/* Unified Professionals Section */}
        <div className="max-w-6xl mx-auto">
          
          <div className="space-y-12">
            {professionals.map((professional) => (
              <div 
                key={professional.id}
                className="text-center"
              >
                {/* Professional avatar */}
                <div className="w-20 h-20 rounded-full mx-auto mb-6 overflow-hidden shadow-lg">
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {professional.name.split(' ').map(name => name[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-gray-700 mb-2">
                  {professional.name}
                </h4>
                <p className="text-gray-500 font-medium text-lg">
                  {professional.speciality}
                </p>
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