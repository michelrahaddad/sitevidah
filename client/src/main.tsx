// Direct DOM manipulation to bypass React plugin issues
document.addEventListener('DOMContentLoaded', function() {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <header style="text-align: center; color: white; margin-bottom: 40px;">
          <h1 style="font-size: 3rem; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">Cartão + Vidah</h1>
          <p style="font-size: 1.2rem; margin: 10px 0;">Benefícios para toda sua família</p>
        </header>

        <div style="max-width: 1200px; margin: 0 auto;">
          <!-- Hero Section -->
          <section style="background: white; border-radius: 15px; padding: 40px; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <div style="text-align: center;">
              <h2 style="color: #333; font-size: 2.5rem; margin-bottom: 20px;">Seu Cartão de Benefícios</h2>
              <p style="color: #666; font-size: 1.2rem; margin-bottom: 30px;">Descontos em saúde, bem-estar e muito mais. Um cartão para facilitar sua vida e cuidar da sua família.</p>
              <button onclick="window.scrollTo(0, 600)" style="background: linear-gradient(45deg, #00B894, #00a085); color: white; border: none; padding: 15px 30px; font-size: 1.1rem; border-radius: 25px; cursor: pointer; box-shadow: 0 5px 15px rgba(0,184,148,0.3);">
                Ver Planos
              </button>
            </div>
          </section>

          <!-- Planos Section -->
          <section style="background: white; border-radius: 15px; padding: 40px; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <h2 style="text-align: center; color: #333; font-size: 2rem; margin-bottom: 40px;">Escolha seu Plano Ideal</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
              <!-- Plano Individual -->
              <div style="border: 2px solid #e0e0e0; border-radius: 15px; padding: 30px; text-align: center; position: relative; background: #f9f9f9;">
                <div style="font-size: 3rem; margin-bottom: 15px;">👤</div>
                <h3 style="color: #333; font-size: 1.5rem; margin-bottom: 15px;">Cartão Individual</h3>
                <div style="font-size: 2rem; color: #00B894; font-weight: bold; margin-bottom: 20px;">💰 Só R$ 29,90/mês</div>
                <ul style="text-align: left; color: #666; list-style: none; padding: 0; margin-bottom: 30px;">
                  <li style="margin: 10px 0;">🦷 Descontos em clínicas odontológicas</li>
                  <li style="margin: 10px 0;">🏥 Consultas médicas com desconto</li>
                  <li style="margin: 10px 0;">💊 Farmácias com preços especiais</li>
                  <li style="margin: 10px 0;">📲 Atendimento humanizado</li>
                </ul>
                <button onclick="window.open('https://wa.me/5516993247676?text=Olá! Gostaria de assinar o Cartão Individual', '_blank')" style="width: 100%; background: linear-gradient(45deg, #00B894, #00a085); color: white; border: none; padding: 15px; font-size: 1.1rem; border-radius: 25px; cursor: pointer;">
                  Assinar Agora
                </button>
              </div>

              <!-- Plano Familiar -->
              <div style="border: 2px solid #00B894; border-radius: 15px; padding: 30px; text-align: center; position: relative; background: white; transform: scale(1.05);">
                <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #00B894; color: white; padding: 5px 20px; border-radius: 15px; font-size: 0.9rem;">
                  MAIS POPULAR
                </div>
                <div style="font-size: 3rem; margin-bottom: 15px;">👨‍👩‍👧‍👦</div>
                <h3 style="color: #333; font-size: 1.5rem; margin-bottom: 15px;">Cartão Familiar</h3>
                <div style="font-size: 2rem; color: #00B894; font-weight: bold; margin-bottom: 20px;">💰 Só R$ 37,90/mês</div>
                <ul style="text-align: left; color: #666; list-style: none; padding: 0; margin-bottom: 30px;">
                  <li style="margin: 10px 0;">🦷 Descontos para toda família</li>
                  <li style="margin: 10px 0;">🏥 Até 6 dependentes inclusos</li>
                  <li style="margin: 10px 0;">💊 Farmácias com preços especiais</li>
                  <li style="margin: 10px 0;">📲 Atendimento humanizado</li>
                </ul>
                <button onclick="window.open('https://wa.me/5516993247676?text=Olá! Gostaria de assinar o Cartão Familiar', '_blank')" style="width: 100%; background: linear-gradient(45deg, #00B894, #00a085); color: white; border: none; padding: 15px; font-size: 1.1rem; border-radius: 25px; cursor: pointer;">
                  Assinar Agora
                </button>
              </div>
            </div>
          </section>

          <!-- Benefícios Section -->
          <section style="background: white; border-radius: 15px; padding: 40px; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <h2 style="text-align: center; color: #333; font-size: 2rem; margin-bottom: 40px;">Seus Benefícios</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
              <div style="text-align: center; padding: 20px;">
                <div style="font-size: 4rem; margin-bottom: 15px;">🏥</div>
                <h3 style="color: #333; margin-bottom: 10px;">Saúde</h3>
                <p style="color: #666;">Consultas, exames e procedimentos com desconto</p>
              </div>
              
              <div style="text-align: center; padding: 20px;">
                <div style="font-size: 4rem; margin-bottom: 15px;">🦷</div>
                <h3 style="color: #333; margin-bottom: 10px;">Odontologia</h3>
                <p style="color: #666;">Tratamentos dentários com preços especiais</p>
              </div>
              
              <div style="text-align: center; padding: 20px;">
                <div style="font-size: 4rem; margin-bottom: 15px;">💊</div>
                <h3 style="color: #333; margin-bottom: 10px;">Farmácias</h3>
                <p style="color: #666;">Medicamentos com desconto em toda rede</p>
              </div>
              
              <div style="text-align: center; padding: 20px;">
                <div style="font-size: 4rem; margin-bottom: 15px;">👨‍⚕️</div>
                <h3 style="color: #333; margin-bottom: 10px;">Especialistas</h3>
                <p style="color: #666;">Acesso a médicos especialistas</p>
              </div>
            </div>
          </section>

          <!-- Admin Link (Hidden) -->
          <div style="position: fixed; bottom: 10px; right: 10px;">
            <a href="/admin/login" style="color: rgba(255,255,255,0.1); font-size: 0.8rem; text-decoration: none;">Admin</a>
          </div>
        </div>

        <!-- WhatsApp Float -->
        <div style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
          <button onclick="window.open('https://wa.me/5516993247676?text=Olá! Gostaria de saber mais sobre o Cartão + Vidah', '_blank')" style="width: 60px; height: 60px; border-radius: 50%; background: #25D366; border: none; color: white; font-size: 1.5rem; cursor: pointer; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4); display: flex; align-items: center; justify-content: center;">
            💬
          </button>
        </div>
      </div>
    `;
  }
});
