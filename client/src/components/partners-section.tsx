import { motion } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import { Stethoscope, ShoppingBag, Star, Users, MapPin, Percent, User, Building, Phone, Globe, MessageCircle, Plus } from "lucide-react";
import LeadCaptureModal from "./lead-capture-modal";
// Placeholder melhorado para logos das empresas
const placeholderLogo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='80' viewBox='0 0 120 80'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2300B894;stop-opacity:0.1' /%3E%3Cstop offset='100%25' style='stop-color:%2300B894;stop-opacity:0.05' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='120' height='80' fill='url(%23grad)' rx='8'/%3E%3Ccircle cx='60' cy='30' r='12' fill='%2300B894' opacity='0.2'/%3E%3Ctext x='60' y='55' text-anchor='middle' fill='%2300B894' font-family='Arial, sans-serif' font-size='11' font-weight='600'%3ELogo Empresa%3C/text%3E%3C/svg%3E";

// Logo do Grupo Vidah
const vidahLogoUrl = "/logos/vidah-logo.png";

// Logo do Silasgás Ultragaz
const silasgasLogoUrl = "/logos/silagas-logo.jpeg";

// Logo do Dom Pedro
const domPedroLogoUrl = "/logos/dom-pedro-logo.jpg";

// Logo do Pronto Vet
const prontoVetLogoUrl = "/logos/pronto-vet-logo.png";

const prontoVetLogo = placeholderLogo;
const domPedroLogo = placeholderLogo;
const santaTerezaLogo = placeholderLogo;
const hospitalMalzoniLogo = placeholderLogo;
const sosEnfermagemLogo = placeholderLogo;
const funerariaCanaaLogo = placeholderLogo;
const fiduciaEletroLogo = placeholderLogo;
const drogavenLogo = placeholderLogo;
const oticasCarolLogo = placeholderLogo;
const silagasLogo = placeholderLogo;

// Logos adicionais das empresas parceiras - aguardando upload
const evolucaoLogo = placeholderLogo;
const reabilitarNeuropedLogo = placeholderLogo;
const corpoHarmoniaLogo = placeholderLogo;
const inerpLogo = placeholderLogo;
const ipcLogo = placeholderLogo;
const magiaDoSorrisoLogo = placeholderLogo;
const lab7Logo = placeholderLogo;

// Doctor photos
import drDiegoFoto from "@/assets/doctors/dr-diego.jpg";
import draIsabelaCardosoFoto from "@/assets/doctors/dra-isabela-cardoso.jpg";
import draAnaSollerFoto from "@/assets/doctors/dra-ana-soller.jpg";
import draBrunaDeRosaFoto from "@/assets/doctors/dra-bruna-de-rosa.jpg";
import draGabrielaPedrolimFoto from "@/assets/doctors/dra-gabriela-pedrolim.jpg";
import drFabioMalaraFoto from "@/assets/doctors/dr-fabio-malara.jpg";
import draClaudiaArrudaFoto from "@/assets/doctors/dra-claudia-arruda.jpg";
import draMaysaQuarteiroFoto from "@/assets/doctors/dra-maysa-quarteiro.jpg";
import draVanessaYucraFoto from "@/assets/doctors/dra-vanessa-yucra.jpg";
import draBrunaMargadonaFoto from "@/assets/doctors/dra-bruna-margadona.jpg";

const medicos = [
  { nome: "Dr. William Teixeira Haddad", especialidade: "Cardiologia e Clínica Médica", foto: null },
  { nome: "Dr. Michel Raineri Haddad", especialidade: "Cardiologia e Clínica Médica", foto: null },
  { nome: "Dr. William Teixeira Haddad Jr.", especialidade: "Radiologia", foto: null },
  { nome: "Dr. Alex Teles Vasconcelos", especialidade: "Oftalmologia", foto: null },
  { nome: "Dr Diego Rodrigues Charamitara", especialidade: "Clínico Geral", foto: drDiegoFoto },
  { nome: "Dra Isabela Cardoso", especialidade: "Ginecologia e Obstetrícia", foto: draIsabelaCardosoFoto },
  { nome: "Dra Ana Soler", especialidade: "Dermatologista", foto: draAnaSollerFoto },
  { nome: "Dra Bruna de Rosa", especialidade: "Psiquiatra", foto: draBrunaDeRosaFoto },
  { nome: "Dra Gabriela Pedrolim", especialidade: "Endocrinologista", foto: draGabrielaPedrolimFoto },
  { nome: "Dr Fabio Malara", especialidade: "Cardiologista", foto: drFabioMalaraFoto },
  { nome: "Dra Claudia Arruda", especialidade: "Psiquiatra", foto: draClaudiaArrudaFoto },
  { nome: "Dra Maysa Quarteiro", especialidade: "Ginecologia e Obstetrícia", foto: draMaysaQuarteiroFoto },
  { nome: "Dra Vanessa Yucra", especialidade: "Psicóloga", foto: draVanessaYucraFoto },
  { nome: "Dra Bruna Margadona", especialidade: "Ginecologia e Obstetrícia", foto: draBrunaMargadonaFoto },
  { nome: "Pedro Betini", especialidade: "Psicólogo", foto: null },
  { nome: "Erika Aravechia", especialidade: "Psicopedagoga", foto: null },
  { nome: "Bruna Margadona", especialidade: "Fisioterapeuta", foto: null },
  { nome: "Sofia Mella", especialidade: "Psicóloga Infantil", foto: null }
];

const parceiroDestaque = {
  nome: "Grupo Vidah",
  desconto: "Benefícios Exclusivos",
  categoria: "Parceiro Principal",
  logo: vidahLogoUrl,
  endereco: "R. XV de Novembro, 594 - Centro, Ibitinga - SP, 14940-000",
  telefone: "(16) 3342-4768",
  site: "https://www.grupovidah.com.br/",
  destaque: true
};

// Nova estrutura moderna para empresas parceiras
const parceiros = [
  { nome: "Grupo Vidah", desconto: "Exclusivo", categoria: "Parceiro Principal", icon: "🏥" },
  { nome: "Silasgás Ultragaz", desconto: "10%", categoria: "Energia & Gás", icon: "🔥" },
  { nome: "Óticas Carol", desconto: "20%", categoria: "Saúde Visual", icon: "👁️" },
  { nome: "Fiducia Eletro", desconto: "10%", categoria: "Tecnologia", icon: "⚡" },
  { nome: "Evolução Centro Multidisciplinar", desconto: "Especial", categoria: "Bem-estar", icon: "🏥" },
  { nome: "Pronto Vet", desconto: "15%", categoria: "Pet Care", icon: "🐾" },
  { nome: "Reabilitar Neuroped", desconto: "Especial", categoria: "Fisioterapia", icon: "🏃‍♂️" },
  { nome: "Corpo em Harmonia", desconto: "Especial", categoria: "Fitness", icon: "🧘‍♀️" },
  { nome: "Drogaven", desconto: "Especial", categoria: "Farmácia", icon: "💊" },
  { nome: "Hospital Malzoni", desconto: "Especial", categoria: "Saúde", icon: "🏥" },
  { nome: "Dom Pedro", desconto: "15%", categoria: "Alimentação", icon: "🥬" },
  { nome: "Magia do Sorriso", desconto: "20%", categoria: "Odontologia", icon: "😁" },
  { nome: "Lab 7", desconto: "30%", categoria: "Diagnósticos", icon: "🔬" }
];

export default function PartnersSection() {
  const [showAllPartners, setShowAllPartners] = useState(false);
  const [showAllSegments, setShowAllSegments] = useState(false);
  
  console.log('PartnersSection renderizando:', { showAllPartners, showAllSegments });
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    buttonType: 'plan_subscription' | 'doctor_appointment' | 'enterprise_quote';
    planName?: string;
    doctorName?: string;
    whatsappPhone: string;
    whatsappMessage: string;
  }>({
    isOpen: false,
    buttonType: 'doctor_appointment',
    whatsappPhone: '5516993247676',
    whatsappMessage: ''
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Memoize calculated data for better performance
  const { displayedPartners, displayedMedicos } = useMemo(() => {
    const topPartners = parceiros.slice(0, 8);
    const topMedicos = medicos.slice(0, 4);
    
    return {
      displayedPartners: showAllPartners ? parceiros : topPartners,
      displayedMedicos: showAllSegments ? medicos : topMedicos
    };
  }, [showAllPartners, showAllSegments]);

  const handleDoctorAppointment = useCallback((medico: any) => {
    setModalData({
      isOpen: true,
      buttonType: 'doctor_appointment',
      doctorName: medico.nome,
      whatsappPhone: '5516993247676',
      whatsappMessage: `Gostaria de agendar uma consulta com ${medico.nome} (${medico.especialidade}). Poderia me ajudar com os horários disponíveis?`
    });
  }, []);

  return (
    <section id="parceiros" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00B894]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0984E3]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-[#00B894]/20 mb-6">
            <Users className="w-5 h-5 text-[#00B894]" />
            <span className="text-[#636E72] font-medium">Rede Credenciada</span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#636E72] mb-6">
            Nossos <span className="text-[#00B894]">Parceiros</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-[#636E72] max-w-3xl mx-auto px-4">
            Uma rede completa de profissionais de saúde e empresas parceiras para oferecer 
            os melhores benefícios e descontos exclusivos
          </motion.p>
        </motion.div>

        {/* Statistics */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          <motion.div variants={itemVariants} className="glass-card text-center p-4 md:p-6 rounded-2xl">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#00B894]/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Stethoscope className="w-5 h-5 md:w-6 md:h-6 text-[#00B894]" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-[#636E72] mb-1 md:mb-2">18+</div>
            <div className="text-[#636E72] font-medium text-sm md:text-base">Médicos Especialistas</div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card text-center p-4 md:p-6 rounded-2xl">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0984E3]/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-[#0984E3]" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-[#636E72] mb-1 md:mb-2">15+</div>
            <div className="text-[#636E72] font-medium text-sm md:text-base">Empresas Parceiras</div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card text-center p-4 md:p-6 rounded-2xl">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#00B894]/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Percent className="w-5 h-5 md:w-6 md:h-6 text-[#00B894]" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-[#636E72] mb-1 md:mb-2">50%</div>
            <div className="text-[#636E72] font-medium text-sm md:text-base">Desconto Máximo</div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card text-center p-4 md:p-6 rounded-2xl">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0984E3]/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Star className="w-5 h-5 md:w-6 md:h-6 text-[#0984E3]" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-[#636E72] mb-1 md:mb-2">41+</div>
            <div className="text-[#636E72] font-medium text-sm md:text-base">Total de Parceiros</div>
          </motion.div>
        </motion.div>

        {/* Parceiro Principal em Destaque */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-bold text-[#636E72] mb-8 text-center">
            Parceiro Principal
          </motion.h3>
          <motion.div variants={itemVariants} className="max-w-md mx-auto">
            <div className="relative glass-card p-8 rounded-3xl border-2 border-[#0984E3]/30 bg-gradient-to-br from-[#0984E3]/5 to-[#74B9FF]/5 overflow-hidden group hover:shadow-2xl hover:scale-105 transition-all duration-300">
              {/* Efeito de brilho */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Badge de destaque */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#0984E3] to-[#74B9FF] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                PRINCIPAL
              </div>
              
              <div className="relative z-10">
                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg overflow-hidden">
                  <img 
                    src={vidahLogoUrl} 
                    alt="Grupo Vidah Logo"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                
                <h4 className="text-2xl font-bold text-[#636E72] mb-2 text-center">{parceiroDestaque.nome}</h4>
                <p className="text-[#0984E3] font-semibold text-center mb-3">{parceiroDestaque.categoria}</p>
                
                <div className="space-y-2 mb-4 text-sm text-[#636E72]/80">
                  <div className="flex items-center justify-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-center">{parceiroDestaque.endereco}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <a href={`tel:${parceiroDestaque.telefone}`} className="hover:text-[#0984E3] transition-colors">
                      {parceiroDestaque.telefone}
                    </a>
                  </div>
                  <div className="flex items-center justify-center">
                    <Globe className="w-4 h-4 mr-2" />
                    <a 
                      href={parceiroDestaque.site} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-[#0984E3] transition-colors"
                    >
                      grupovidah.com.br
                    </a>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-[#0984E3] to-[#74B9FF] text-white px-4 py-2 rounded-full text-center font-bold">
                  {parceiroDestaque.desconto}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Medical Professionals */}
        <motion.div
          key={`medicos-container-${showAllSegments}`}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-16"
        >
          <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-bold text-[#636E72] mb-6 md:mb-8 flex items-center justify-center md:justify-start">
            <Stethoscope className="w-6 h-6 md:w-8 md:h-8 text-[#00B894] mr-2 md:mr-3" />
            Médicos Credenciados
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayedMedicos.map((medico, index) => (
              <motion.div
                key={`medico-${medico.nome}-${index}`}
                variants={itemVariants}
                className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300 group hover:scale-105"
              >
                <div className="text-center">
                  {/* Photo placeholder - replace with actual doctor photos */}
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00B894]/20 to-[#0984E3]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {medico.foto ? (
                      <img 
                        src={medico.foto} 
                        alt={medico.nome}
                        className="w-full h-full rounded-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <User className="w-8 h-8 text-[#00B894]" />
                    )}
                  </div>
                  <h4 className="font-bold text-[#636E72] mb-2 group-hover:text-[#00B894] transition-colors">
                    {medico.nome}
                  </h4>
                  <p className="text-sm text-[#636E72]/80 font-medium mb-4">
                    {medico.especialidade}
                  </p>
                  <button
                    onClick={() => handleDoctorAppointment(medico)}
                    className="w-full bg-[#00B894] text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-[#009d7f] transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} />
                    Agendar Consulta
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {!showAllSegments && medicos.length > 4 && (
            <div className="text-center mt-8">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Clicando em Ver mais médicos - antes do setState');
                  setShowAllSegments(true);
                  console.log('Clicando em Ver mais médicos - depois do setState');
                }}
                className="bg-[#00B894] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#009d7f] transition-all transform hover:scale-105"
              >
                Ver mais médicos ({medicos.length - 4} restantes)
              </button>
            </div>
          )}
        </motion.div>

        {/* Business Partners */}
        <motion.div
          key={`parceiros-container-${showAllPartners}`}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h3 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#00B894] via-[#00d2a0] to-[#0984E3] bg-clip-text text-transparent">
              Rede de Parceiros
            </span>
          </motion.h3>
          
          {/* Design Circular Moderno */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-8">
            {displayedPartners.map((parceiro, index) => (
              <motion.div
                key={`parceiro-${parceiro.nome}-${index}`}
                variants={itemVariants}
                className="group relative flex flex-col items-center"
              >
                {/* Container Principal Circular */}
                <div className="relative">
                  
                  {/* Círculo Principal com Logo */}
                  <div className="w-32 h-32 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 border-4 border-white/80 relative overflow-hidden group-hover:border-[#00B894]/30">
                    
                    {/* Efeito de brilho circular */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                    
                    {/* Espaço para Logo da Empresa */}
                    <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-[#00B894]/10 to-[#0984E3]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                      {parceiro.nome === "Grupo Vidah" ? (
                        <img 
                          src={vidahLogoUrl} 
                          alt={parceiro.nome}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : parceiro.nome === "Silasgás Ultragaz" ? (
                        <img 
                          src={silasgasLogoUrl} 
                          alt={parceiro.nome}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : parceiro.nome === "Dom Pedro" ? (
                        <img 
                          src={domPedroLogoUrl} 
                          alt={parceiro.nome}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : parceiro.nome === "Pronto Vet" ? (
                        <img 
                          src={prontoVetLogoUrl} 
                          alt={parceiro.nome}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-4xl filter drop-shadow-sm">{parceiro.icon}</span>
                      )}
                    </div>
                    
                    {/* Badge de Desconto Flutuante */}
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-[#00B894] to-[#00d2a0] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg z-20 animate-pulse">
                      {parceiro.desconto}
                    </div>
                  </div>
                  
                  {/* Anel de Progresso Animado */}
                  <div className="absolute inset-0 w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="stroke-gray-200"
                        fill="none"
                        strokeWidth="2"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="stroke-[#00B894] opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="75, 100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                  </div>
                </div>
                
                {/* Informações da Empresa */}
                <div className="mt-6 text-center">
                  <h4 className="font-bold text-gray-800 mb-2 text-sm leading-tight group-hover:text-[#00B894] transition-colors duration-300">
                    {parceiro.nome}
                  </h4>
                  
                  <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full text-xs font-medium shadow-sm border border-gray-200/50 group-hover:bg-[#00B894]/10 group-hover:text-[#00B894] group-hover:border-[#00B894]/20 transition-all duration-300">
                    {parceiro.categoria}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {!showAllPartners && parceiros.length > 8 && (
            <div className="text-center mt-16">
              <button
                onClick={() => setShowAllPartners(true)}
                className="group relative bg-gradient-to-r from-[#00B894] to-[#00d2a0] text-white px-12 py-5 rounded-full font-semibold hover:from-[#009d7f] hover:to-[#00B894] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center gap-4 mx-auto"
              >
                <span className="text-lg">Ver Todos os Parceiros</span>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-300">
                  <Plus size={20} />
                </div>
              </button>
            </div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mt-16 text-center"
        >
          <motion.div variants={itemVariants} className="bg-gradient-to-r from-[#00B894] to-[#0984E3] rounded-3xl p-8 text-white">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
              Faça Parte da Nossa Rede
            </h3>
            <p className="text-base md:text-lg mb-6 opacity-90 px-4">
              Acesse todos esses benefícios com seu Cartão Vidah e economize em consultas, 
              exames e compras em nossa rede credenciada
            </p>
            <button 
              onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-[#00B894] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              Ver Planos Disponíveis
            </button>
          </motion.div>
        </motion.div>
      </div>

      <LeadCaptureModal
        isOpen={modalData.isOpen}
        onClose={() => setModalData(prev => ({ ...prev, isOpen: false }))}
        buttonType={modalData.buttonType}
        planName={modalData.planName}
        doctorName={modalData.doctorName}
        whatsappPhone={modalData.whatsappPhone}
        whatsappMessage={modalData.whatsappMessage}
      />
    </section>
  );
}