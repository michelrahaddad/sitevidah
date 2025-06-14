import { Stethoscope, MapPin, Clock, Phone } from "lucide-react";

export default function CredentialedDoctorsSection() {
  const doctors = [
    {
      id: 1,
      name: "Dr. William Teixeira Haddad",
      speciality: "Cardiologia",
      location: "Ibitinga/SP",
      experience: "20+ anos",
      phone: "(16) 99324-7676"
    },
    {
      id: 2,
      name: "Dr. Michel Raineri Haddad",
      speciality: "Clínica Geral",
      location: "Ibitinga/SP",
      experience: "15+ anos",
      phone: "(16) 99324-7676"
    },
    {
      id: 3,
      name: "Dr. William Teixeira Haddad Jr.",
      speciality: "Ortopedia",
      location: "Ibitinga/SP",
      experience: "12+ anos",
      phone: "(16) 99324-7676"
    },
    {
      id: 4,
      name: "Dr. Alex Teles Vasconcelos",
      speciality: "Dermatologia",
      location: "Ibitinga/SP",
      experience: "10+ anos",
      phone: "(16) 99324-7676"
    }
  ];

  const handleContactDoctor = (doctor: any) => {
    const message = `Olá! Gostaria de agendar uma consulta com ${doctor.name} - ${doctor.speciality}. Pode me ajudar?`;
    const whatsappUrl = `https://wa.me/5516993247676?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="medicos-credenciados" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#636E72] mb-6">
            Médicos <span className="gradient-text">Credenciados</span>
          </h2>
          <p className="text-xl text-[#636E72] max-w-3xl mx-auto">
            Profissionais de saúde qualificados e experientes, prontos para atender você e sua família com excelência e dedicação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {doctors.map((doctor) => (
            <div 
              key={doctor.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-6"
            >
              {/* Doctor Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-[#00B894] to-[#0984E3] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Stethoscope className="text-white text-2xl" />
              </div>
              
              {/* Doctor Info */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-[#636E72] mb-2">
                  {doctor.name}
                </h3>
                <p className="text-[#00B894] font-semibold mb-3">
                  {doctor.speciality}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center gap-2 text-sm text-[#636E72]">
                    <MapPin size={14} />
                    <span>{doctor.location}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-[#636E72]">
                    <Clock size={14} />
                    <span>{doctor.experience}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleContactDoctor(doctor)}
                  className="w-full bg-gradient-to-r from-[#00B894] to-[#009d7f] text-white py-2 px-4 rounded-full text-sm font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Phone size={16} />
                  Agendar Consulta
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-[#636E72] mb-3">
              Atendimento de Qualidade
            </h3>
            <p className="text-[#636E72] mb-4">
              Todos os nossos médicos credenciados são profissionais experientes e comprometidos 
              com a excelência no atendimento médico.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-[#00B894]">
                <Stethoscope size={16} />
                <span>Consultas Especializadas</span>
              </div>
              <div className="flex items-center gap-2 text-[#00B894]">
                <Clock size={16} />
                <span>Horários Flexíveis</span>
              </div>
              <div className="flex items-center gap-2 text-[#00B894]">
                <Phone size={16} />
                <span>Agendamento Fácil</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}