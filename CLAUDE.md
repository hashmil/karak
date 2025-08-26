# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js application called "Karak Calculator" - a fun web app that converts AED (UAE Dirham) amounts into the number of karak chai cups you could buy. The app uses React with TypeScript and shadcn/ui components for a modern UI.

## Development Commands

- `npm run dev` - Start development server with Turbopack (runs on http://localhost:3000)
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

**Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **Components**: Located in `components/ui/` following shadcn/ui conventions
- **Main App**: Single page calculator in `app/page.tsx`
- **Layout**: Root layout with Geist fonts in `app/layout.tsx`
- **Utils**: Utility functions in `lib/utils.ts`

**Key Dependencies**:
- shadcn/ui components (@radix-ui packages, lucide-react)
- Tailwind CSS with utility classes and CSS variables
- TypeScript with strict mode enabled

## Component Structure

The app uses shadcn/ui components configured in `components.json`:
- Style: "new-york"
- Path aliases: `@/components`, `@/lib/utils`, etc.
- Components follow shadcn/ui patterns with Radix UI primitives

## File Organization

- `app/` - Next.js App Router pages and layout
- `components/ui/` - Reusable UI components (shadcn/ui)
- `lib/` - Utility functions and shared logic
- `public/` - Static assets

## Path Aliases

Configured in `tsconfig.json`:
- `@/*` maps to project root
- Use `@/components/ui/*` for UI components
- Use `@/lib/utils` for utilities