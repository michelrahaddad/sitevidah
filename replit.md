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
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```