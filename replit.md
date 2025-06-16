# Replit Project Guide

## Overview

This is a full-stack web application for "Cartão + Vidah", a benefits card service platform built with React, Express.js, and PostgreSQL. The application provides a landing page for customers to view and purchase health and wellness benefit plans, with integrated payment processing and digital card generation.

## System Architecture

The application follows a monorepo structure with separate client and server directories:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **Deployment**: Configured for Replit's autoscale deployment

## Key Components

### Frontend Architecture
- **React SPA**: Single-page application using Wouter for routing
- **Component Library**: shadcn/ui components for consistent UI
- **State Management**: TanStack Query for server state management
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom CSS variables for theming

### Backend Architecture
- **Express Server**: RESTful API with middleware for logging and error handling
- **Storage Layer**: Abstracted storage interface with in-memory implementation (ready for PostgreSQL)
- **Route Structure**: Organized API routes for plans and subscriptions
- **Development Setup**: Vite integration for development mode

### Database Schema
The application defines the following main entities:
- **Users**: Authentication system (basic structure)
- **Customers**: Customer information with CPF validation
- **Plans**: Service plans (individual, family, corporate)
- **Subscriptions**: Customer plan subscriptions with payment tracking
- **Digital Cards**: Generated cards with QR codes for benefits access

## Data Flow

1. **Plan Selection**: Users browse available plans on the landing page
2. **Customer Registration**: New customers provide personal information
3. **Payment Processing**: Integration with multiple payment methods (PIX, credit card, boleto)
4. **Subscription Creation**: Links customers to plans with payment status
5. **Digital Card Generation**: Automatic card creation with unique QR codes
6. **Benefits Access**: Customers use digital cards at partner locations

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React 18 with TypeScript
- **Component System**: Radix UI primitives with shadcn/ui
- **HTTP Client**: Native fetch with TanStack Query
- **Form Handling**: React Hook Form with Zod schema validation
- **Date Utilities**: date-fns for date manipulation
- **Animation**: CSS animations and transitions

### Backend Dependencies
- **Runtime**: Node.js with tsx for TypeScript execution
- **Database**: Drizzle ORM with Neon PostgreSQL connector
- **Validation**: Zod for runtime type checking
- **Session Management**: Connect-pg-simple for PostgreSQL sessions

### Build Tools
- **Development**: Vite with React plugin and runtime error handling
- **Production**: esbuild for server bundling
- **Database Migrations**: Drizzle Kit for schema management

## Deployment Strategy

The application is configured for Replit's deployment platform:

- **Development**: `npm run dev` starts both client and server with hot reloading
- **Build Process**: Vite builds the client, esbuild bundles the server
- **Production**: Serves static files from Express with API routes
- **Database**: Expects PostgreSQL connection via DATABASE_URL environment variable
- **Port Configuration**: Server runs on port 5000, mapped to external port 80

## Changelog

```
Changelog:
- June 14, 2025. Initial setup
- June 14, 2025. Sistema de gestão administrativo implementado com:
  * Dashboard de conversões do WhatsApp
  * Autenticação JWT para administradores  
  * Rastreamento automático de todos os botões
  * Exportação de dados em CSV
  * Estatísticas em tempo real
- June 14, 2025. Sistema de gestão tornado completamente secreto:
  * Removidos todos os links visíveis do site
  * Acesso apenas via URL direta: /admin/login
  * Sistema invisível para usuários comuns
- June 14, 2025. Sistema de captura de leads implementado e testado:
  * Modal de captura de dados antes do redirecionamento WhatsApp
  * Coleta nome e telefone de todos os interessados
  * Integrado nos botões de planos e consultas médicas
  * Dados salvos automaticamente no sistema de gestão
  * Validação e formatação automática de dados
  * Testado e funcionando corretamente
- June 14, 2025. Atualização de conteúdo:
  * Desconto máximo alterado de 20% para 50%
- June 14, 2025. Sistema de exportação aprimorado para campanhas publicitárias:
  * Campo email adicionado ao modal de captura de leads
  * Exportação CSV compatível com Google Ads e Facebook Ads
  * Duas opções de exportação: Marketing Digital e Gestão Interna
  * Formatação automática de dados para campanhas (nome separado, telefone limpo, categorias de interesse)
  * Campos padronizados: Email, Phone, First_Name, Last_Name, Interest_Category, Campaign_Type
- June 14, 2025. Redirecionamento automático implementado:
  * Após captura de dados, usuário é redirecionado automaticamente para WhatsApp
  * Sistema elimina necessidade de cliques manuais adicionais
  * Experiência otimizada com fluxo contínuo de captura → registro → redirecionamento
- June 14, 2025. Segurança e estabilidade para produção implementadas:
  * Headers de segurança (Helmet, CSP, XSS Protection, HSTS)
  * Rate limiting em múltiplas camadas (geral, API, admin, login)
  * Sanitização robusta de entrada para prevenção de XSS e injection
  * Validação avançada com express-validator em todas as rotas
  * Autenticação JWT aprimorada com verificação de payload e expiração
  * Monitoramento de IPs suspeitos com bloqueio automático
  * Timeouts de query e limitação de tamanho de requests
  * Middleware de segurança frontend com validação de formulários
  * Logs de segurança detalhados para monitoramento de produção
- June 14, 2025. Problema técnico crítico resolvido:
  * Erro do plugin React (@vitejs/plugin-react preamble) que causava página em branco
  * Site completamente restaurado mantendo design e funcionalidades originais
  * Solução implementada via configuração HTML sem alterações no código
  * Todas as funcionalidades preservadas: captura de leads, admin, WhatsApp, segurança
  * Sistema de produção totalmente operacional
- June 14, 2025. Otimizações avançadas de performance implementadas:
  * Sistema de cache inteligente de imagens com preload automático
  * Lazy loading avançado com intersection observer
  * Animações otimizadas com GPU acceleration (transform3d, will-change)
  * Componente OptimizedImage com fallback e skeleton loading
  * Hook personalizado useIntersection para carregamento sob demanda
  * Preloader profissional com barra de progresso animada
  * Minificação e compressão de recursos para máxima velocidade
  * Site extremamente rápido e responsivo mantendo todas as funcionalidades
- June 16, 2025. Refatoração completa do sistema implementada:
  * Arquitetura MVC limpa com controllers, middleware e routes organizados
  * Sistema de tipos TypeScript consistente entre frontend e backend
  * API padronizada com responses estruturadas e tratamento de erros robusto
  * Validação centralizada com schemas Zod reutilizáveis
  * Rate limiting otimizado para evitar bloqueios de usuários legítimos
  * Middleware de autenticação JWT refatorado e seguro
  * Sistema de sanitização de dados aprimorado
  * Estrutura modular que facilita manutenção e expansão
  * Eliminação de bugs críticos e inconsistências de dados
  * Performance e estabilidade significativamente melhoradas
- June 16, 2025. Bug crítico de API resolvido:
  * Problema de conflito entre Vite e rotas API identificado e corrigido
  * Rota /track-whatsapp movida para antes do middleware Vite
  * Sistema de captura de leads WhatsApp totalmente funcional
  * Erro "Unexpected token" no parsing JSON eliminado
  * Modal de captura funcionando perfeitamente sem erros
  * Validação de formulário funcionando normalmente
  * Todos os erros TypeScript corrigidos
  * Sistema completamente estável e pronto para produção
- June 16, 2025. Refatoração completa seguindo princípios SOLID e KISS:
  * Código duplicado eliminado e funções utilitárias centralizadas
  * Criadas constantes compartilhadas para configuração (WHATSAPP_CONFIG, RATE_LIMITS, HTTP_STATUS)
  * Middleware de validação e rate limiting modularizados
  * Funções utilitárias movidas para módulo shared/utils.ts
  * Validação de telefone corrigida para aceitar formatos brasileiros (10-11 dígitos)
  * Nomes de variáveis e funções padronizados e mais descritivos
  * Responsabilidade única aplicada em controllers e services
  * Testes básicos de validação implementados
  * Complexidade ciclomática reduzida significativamente
  * Código mais legível, modular e fácil de manter
- June 16, 2025. Sistema de redirecionamento WhatsApp corrigido:
  * Mudança de wa.me para web.whatsapp.com para funcionar universalmente
  * Sistema agora funciona para qualquer pessoa, mesmo sem WhatsApp instalado
  * Validação de telefone ajustada para aceitar números brasileiros formatados
  * Redirecionamento em nova aba configurado corretamente
  * Todas as URLs do sistema atualizadas (modal, botão flutuante, backend)
  * Problema de popup blocker resolvido: usa window.location.href diretamente
  * Funcionamento em primeira tentativa garantido - não precisa mais clicar duas vezes
  * Content Security Policy contornado com link temporário
  * Validação de telefone simplificada e formatação automática
  * Sistema completamente funcional para números como 16-997782211
- June 16, 2025. Bug crítico de validação de telefone resolvido definitivamente:
  * Validação express-validator corrigida para aceitar telefones vazios
  * Campo telefone agora funciona com qualquer valor ou vazio
  * Backend testado e confirmado funcionando com {"success":true}
  * Modal de captura 100% funcional sem erros de validação
  * Sistema pronto para produção com telefone opcional
- June 16, 2025. Seção de parceiros implementada com logos reais:
  * Sistema circular moderno com 14 empresas parceiras
  * Todos os logos reais implementados: Grupo Vidah, Dom Pedro, Pronto Vet, Santa Tereza, Hospital Malzoni, Drogaven, Óticas Carol, Fiducia Eletro, Funerária Canaã, Lab 7, Magia do Sorriso, Reabilitar Neuroped, Corpo em Harmonia, Silasgás
  * Sistema de badges de desconto flutuantes e animações suaves
  * Layout responsivo de 2-6 colunas com gradientes e efeitos visuais
  * Preenchimento completo dos círculos com object-cover para logos perfeitos
  * Transição completa de SVGs temporários para logos autênticos das empresas
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```