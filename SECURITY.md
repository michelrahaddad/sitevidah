# Guia de Segurança para Produção - Cartão + Vidah

## Medidas de Segurança Implementadas

### 1. Proteção de Headers HTTP
- **Helmet.js**: Headers de segurança automáticos
- **CSP (Content Security Policy)**: Prevenção contra XSS
- **HSTS**: Forçar conexões HTTPS em produção
- **X-Frame-Options**: Proteção contra clickjacking
- **X-Content-Type-Options**: Prevenção de MIME sniffing

### 2. Rate Limiting Multicamada
- **Geral**: 100 requests por IP a cada 15 minutos
- **API**: 50 requests por IP a cada 15 minutos
- **Admin**: 20 requests por IP a cada 15 minutos
- **Login**: 5 tentativas por IP a cada 15 minutos
- **Frontend**: 5 submissões de formulário por minuto

### 3. Validação e Sanitização de Entrada
- **Express-validator**: Validação robusta de todas as entradas
- **Sanitização XSS**: Remoção de scripts maliciosos
- **Validação de formato**: Email, telefone, nomes
- **Limitação de tamanho**: Requests limitados a 10MB
- **Escape de caracteres**: Prevenção de injection

### 4. Autenticação JWT Segura
- **Algoritmo HS256**: Criptografia robusta
- **Expiração de 2 horas**: Tokens com tempo limitado
- **Verificação de payload**: Validação de campos obrigatórios
- **Headers seguros**: Bearer token obrigatório
- **Logs de tentativas**: Monitoramento de acesso

### 5. Monitoramento de Segurança
- **IPs suspeitos**: Bloqueio automático após 50 tentativas
- **Logs detalhados**: Timestamp, IP, User-Agent
- **Alertas de segurança**: Console logs para monitoramento
- **Timeouts**: 30 segundos para queries de banco
- **Limpeza automática**: Remoção de dados antigos

### 6. Proteção Frontend
- **Validação client-side**: Verificação antes do envio
- **Rate limiting local**: Controle de submissões
- **Sanitização de entrada**: Limpeza de dados do usuário
- **Storage seguro**: Wrapper para localStorage
- **Detecção XSS**: Identificação de tentativas de ataque

## Configurações de Produção Recomendadas

### Variáveis de Ambiente Críticas
```bash
NODE_ENV=production
JWT_SECRET=<secret-super-seguro-alterar-em-producao>
SESSION_SECRET=<secret-sessao-super-seguro>
DATABASE_URL=<url-postgresql-segura>
```

### Headers de Segurança
- CSP configurado para domínios confiáveis
- HSTS habilitado para HTTPS forçado
- Referrer Policy restritiva
- Frame Options definido como DENY

### Monitoramento de Logs
- Todas as tentativas de login registradas
- IPs bloqueados documentados
- Erros de validação registrados
- Tentativas de XSS identificadas

## Checklist de Deploy Seguro

### Antes do Deploy
- [ ] Alterar JWT_SECRET e SESSION_SECRET
- [ ] Configurar DATABASE_URL segura
- [ ] Verificar CORS origins para produção
- [ ] Revisar logs de segurança
- [ ] Testar rate limiting

### Pós Deploy
- [ ] Verificar headers de segurança
- [ ] Testar proteção XSS
- [ ] Confirmar rate limiting ativo
- [ ] Validar autenticação JWT
- [ ] Monitorar logs de acesso

## Vulnerabilidades Mitigadas

### XSS (Cross-Site Scripting)
- Sanitização de entrada em frontend e backend
- CSP headers configurados
- Escape de caracteres especiais
- Validação de formatos

### SQL Injection
- Uso exclusivo de Drizzle ORM
- Validação de entrada com Zod
- Sanitização de queries
- Timeouts de banco configurados

### CSRF (Cross-Site Request Forgery)
- Headers X-Requested-With obrigatórios
- Validação de origem
- Tokens JWT com expiração
- Rate limiting por IP

### Brute Force
- Rate limiting progressivo
- Bloqueio de IPs suspeitos
- Logs de tentativas
- Timeouts incrementais

### DoS (Denial of Service)
- Limitação de tamanho de request
- Rate limiting multicamada
- Timeouts de query
- Monitoramento de tráfego

## Manutenção de Segurança

### Diário
- Revisar logs de acesso
- Verificar IPs bloqueados
- Monitorar tentativas de login

### Semanal
- Atualizar dependências
- Revisar configurações de segurança
- Analisar padrões de tráfego

### Mensal
- Rotacionar secrets
- Revisar políticas de rate limiting
- Auditar logs de segurança
- Testar vulnerabilidades

## Contatos de Emergência
Em caso de incidente de segurança:
1. Verificar logs do sistema
2. Identificar fonte do problema
3. Aplicar bloqueios temporários se necessário
4. Documentar o incidente
5. Implementar correções adicionais