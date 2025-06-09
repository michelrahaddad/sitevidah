import { motion } from "framer-motion";
import { Stethoscope, ShoppingBag, Star, Users, MapPin, Percent, User, Building } from "lucide-react";

const medicos = [
  { nome: "Drª Vanesa", especialidade: "Clínico Geral", foto: null },
  { nome: "Drª Isabela", especialidade: "Ginecologista", foto: null },
  { nome: "Drª Ana Soler", especialidade: "Dermatologista", foto: null },
  { nome: "Drª Bruna de Rosa", especialidade: "Psiquiatra", foto: null },
  { nome: "Dra Gabriela Pedrolim", especialidade: "Endocrinologista", foto: null },
  { nome: "Dr José Eduardo", especialidade: "Neurologista", foto: null },
  { nome: "Dr Michel Haddad", especialidade: "Cardiologista", foto: null },
  { nome: "Dr Willian Haddad", especialidade: "Cardiologista", foto: null },
  { nome: "Dr Fabio Malara", especialidade: "Reumatologista", foto: null },
  { nome: "Dr Samir Farah", especialidade: "Ortopedista", foto: null },
  { nome: "Dr Diego Biella", especialidade: "Pediatra", foto: null },
  { nome: "Dr Walter Dall'Acqua", especialidade: "Pediatra", foto: null },
  { nome: "Dr Alex Vasconcelos", especialidade: "Oftalmologista", foto: null },
  { nome: "Dr Willian Haddad Jr", especialidade: "Radiologista", foto: null },
  { nome: "André Quarteiro", especialidade: "Otorrinolaringologista", foto: null },
  { nome: "Julio Cesar", especialidade: "Gastroenterologista", foto: null },
  { nome: "Maysa Quarteiro", especialidade: "Geriatra", foto: null },
  { nome: "Adriana de Marqui", especialidade: "Cirurgia Vascular", foto: null },
  { nome: "Paulo Hilario", especialidade: "Pneumologista", foto: null },
  { nome: "Claudia Arruda", especialidade: "Nutricionista", foto: null },
  { nome: "Pedro Betini", especialidade: "Psicólogo", foto: null },
  { nome: "Erika Aravechia", especialidade: "Psicopedagoga", foto: null },
  { nome: "Bruna Margadona", especialidade: "Fisioterapeuta", foto: null },
  { nome: "Sofia Mella", especialidade: "Psicóloga Infantil", foto: null }
];

const parceiroDestaque = {
  nome: "Grupo Vidah",
  desconto: "Benefícios Exclusivos",
  categoria: "Parceiro Principal",
  logo: null,
  destaque: true
};

const parceiros = [
  { nome: "Silasgás Ultragaz", desconto: "10%", categoria: "Gás de Cozinha", logo: null, endereco: null },
  { nome: "Óticas Carol", desconto: "20%", categoria: "Ótica", logo: null, endereco: "Rua Prudente de Moraes, 897 - Centro, Ibitinga - SP" },
  { nome: "Fiducia Eletro", desconto: "10%", categoria: "Materiais Elétricos", logo: null, endereco: "Rua Domingos Robert, 640 - Centro, Ibitinga - SP" },
  { nome: "Evolução Centro de Integração Multidisciplinar", desconto: "Tabela", categoria: "Centro Multidisciplinar", logo: null, endereco: "R. Dr. Adail de Oliveira, 864 - Centro, Ibitinga - SP, 14940-151" },
  { nome: "Pronto Vet Clínica Veterinária", desconto: "5-10%", categoria: "Pet Shop", logo: null, endereco: "Av. Eng. Ivanil Francischini, 5363 - São José, Ibitinga - SP, 14940-000" },
  { nome: "Reabilitar", desconto: "Tabela", categoria: "Reabilitação", logo: null, endereco: null },
  { nome: "Corpo em Harmonia - Studio de Pilates", desconto: "Tabela", categoria: "Pilates", logo: null, endereco: "Rua Treze de Maio, 541 - Centro, Ibitinga - SP" },
  { nome: "Drogaven", desconto: "Tabela", categoria: "Farmácia", logo: null, endereco: "Rua Prudente de Moraes, 934 - Centro, Ibitinga - SP" },
  { nome: "Funerária Canaã Ibitinga", desconto: "Tabela", categoria: "Funerária", logo: null, endereco: "Rua Domingos Robert, 985 - Centro, Ibitinga - SP" },
  { nome: "INERP - Instituto de Neurologia", desconto: "Tabela", categoria: "Neurologia", logo: null, endereco: null },
  { nome: "Hospital Malzoni", desconto: "Tabela", categoria: "Hospital", logo: null, endereco: null },
  { nome: "IPC - Análises Patológicas", desconto: "Tabela", categoria: "Laboratório", logo: null, endereco: null },
  { nome: "S.O.S", desconto: "5-10%", categoria: "Emergência", logo: null, endereco: null },
  { nome: "Dom Pedro", desconto: "15%", categoria: "Hotelaria", logo: null, endereco: null },
  { nome: "Magia do Sorriso", desconto: "5-20%", categoria: "Odontologia", logo: null, endereco: null },
  { nome: "Lab 7", desconto: "20-40%", categoria: "Laboratório", logo: null, endereco: null }
];

export default function PartnersSection() {
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
            <div className="text-2xl md:text-3xl font-bold text-[#636E72] mb-1 md:mb-2">24+</div>
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
            <div className="text-2xl md:text-3xl font-bold text-[#636E72] mb-1 md:mb-2">20%</div>
            <div className="text-[#636E72] font-medium text-sm md:text-base">Desconto Máximo</div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card text-center p-4 md:p-6 rounded-2xl">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0984E3]/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Star className="w-5 h-5 md:w-6 md:h-6 text-[#0984E3]" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-[#636E72] mb-1 md:mb-2">40+</div>
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
                <div className="w-20 h-20 bg-gradient-to-br from-[#0984E3] to-[#74B9FF] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Star className="w-10 h-10 text-white" />
                </div>
                
                <h4 className="text-2xl font-bold text-[#636E72] mb-2 text-center">{parceiroDestaque.nome}</h4>
                <p className="text-[#0984E3] font-semibold text-center mb-3">{parceiroDestaque.categoria}</p>
                <div className="bg-gradient-to-r from-[#0984E3] to-[#74B9FF] text-white px-4 py-2 rounded-full text-center font-bold">
                  {parceiroDestaque.desconto}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Medical Professionals */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-bold text-[#636E72] mb-6 md:mb-8 flex items-center justify-center md:justify-start">
            <Stethoscope className="w-6 h-6 md:w-8 md:h-8 text-[#00B894] mr-2 md:mr-3" />
            Médicos Credenciados
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {medicos.map((medico, index) => (
              <motion.div
                key={index}
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
                      />
                    ) : (
                      <User className="w-8 h-8 text-[#00B894]" />
                    )}
                  </div>
                  <h4 className="font-bold text-[#636E72] mb-2 group-hover:text-[#00B894] transition-colors">
                    {medico.nome}
                  </h4>
                  <p className="text-sm text-[#636E72]/80 font-medium">
                    {medico.especialidade}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Business Partners */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-bold text-[#636E72] mb-6 md:mb-8 flex items-center justify-center md:justify-start">
            <ShoppingBag className="w-6 h-6 md:w-8 md:h-8 text-[#0984E3] mr-2 md:mr-3" />
            Empresas Parceiras
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {parceiros.map((parceiro, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300 group hover:scale-105"
              >
                {/* Logo placeholder - replace with actual partner logos */}
                <div className="w-12 h-12 bg-gradient-to-br from-[#0984E3]/20 to-[#00B894]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {parceiro.logo ? (
                    <img 
                      src={parceiro.logo} 
                      alt={`Logo ${parceiro.nome}`}
                      className="w-full h-full rounded-lg object-contain p-1"
                    />
                  ) : (
                    <Building className="w-6 h-6 text-[#0984E3]" />
                  )}
                </div>
                
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-[#636E72] group-hover:text-[#0984E3] transition-colors">
                    {parceiro.nome}
                  </h4>
                  <span className="bg-[#00B894]/10 text-[#00B894] px-3 py-1 rounded-full text-xs font-bold">
                    {parceiro.desconto}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-[#636E72]/80">
                    <MapPin className="w-4 h-4 mr-1" />
                    {parceiro.categoria}
                  </div>
                  {parceiro.endereco && (
                    <div className="flex items-start text-xs text-[#636E72]/60">
                      <MapPin className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
                      <span className="leading-tight">{parceiro.endereco}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
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
    </section>
  );
}