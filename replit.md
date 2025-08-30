# ehostelz.com - Smart Hostel Management Platform

## Overview

ehostelz.com is a comprehensive hostel management platform designed to simplify operations for single hostels and multi-hostel organizations. The application provides a complete solution for managing hostel infrastructure, student enrollment, financial operations, and reporting through a modern web interface.

The platform features a React-based frontend with shadcn/ui components, an Express.js backend, and PostgreSQL database integration through Drizzle ORM. The system supports multi-hostel management from a single dashboard, automated fee processing, room allocation, and comprehensive reporting capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type-safe component development
- **UI Framework**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript for API development
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Development Server**: Custom Vite integration for unified development experience
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development

### Data Storage Solutions
- **Primary Database**: PostgreSQL configured through Drizzle with migration support
- **Database Provider**: Neon Database (@neondatabase/serverless) for serverless PostgreSQL
- **Schema Management**: Drizzle Kit for database migrations and schema generation
- **Development Storage**: In-memory storage implementation for rapid prototyping

### Authentication and Authorization
- **Session Management**: Placeholder user schema with basic authentication structure
- **User Model**: Simple user table with username/password fields and UUID primary keys
- **Security**: Express session handling with future expansion for role-based access

### Frontend Component Structure
- **Layout Components**: Modular header and footer with navigation handling
- **Page Sections**: Dedicated components for hero, features, pricing, about, FAQ, and contact
- **UI Components**: Comprehensive shadcn/ui component library including forms, dialogs, data tables, and navigation
- **Responsive Design**: Mobile-first approach with responsive breakpoints and mobile menu support

### Development and Build Process
- **Development**: Unified development server combining Vite frontend and Express backend
- **Type Safety**: Shared TypeScript types between frontend and backend
- **Code Organization**: Monorepo structure with client, server, and shared directories
- **Path Aliases**: Configured path mapping for clean imports (@/, @shared/)

### Location Search Feature
- **Hierarchical Search**: Province → City → Location dropdown structure
- **Regional Focus**: Pre-configured for Pakistani administrative divisions
- **Component Integration**: Reusable location search component for hostel discovery

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **TypeScript**: Full TypeScript support across frontend and backend
- **Vite**: Build tool and development server with React plugin

### UI and Styling
- **shadcn/ui**: Complete component library with 40+ pre-built components
- **Radix UI**: Unstyled, accessible UI primitives for complex components
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Lucide React**: Icon library for consistent iconography

### Backend and Database
- **Express.js**: Web application framework for Node.js
- **Drizzle ORM**: TypeScript ORM with PostgreSQL dialect support
- **Neon Database**: Serverless PostgreSQL database provider
- **Connect PG Simple**: PostgreSQL session store for Express sessions

### State Management and Data Fetching
- **TanStack Query**: Server state management with caching and synchronization
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation library integrated with Drizzle

### Development Tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **TSX**: TypeScript execution environment for development
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

### Additional Libraries
- **Date-fns**: Date manipulation and formatting utilities
- **Class Variance Authority**: Utility for creating variant-based component APIs
- **CLSX/Tailwind Merge**: Conditional CSS class handling
- **Embla Carousel**: Carousel component for product showcases