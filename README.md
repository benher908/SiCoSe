# SiCoSe

Sistema de Cobro de Servicios para Juntas Auxiliares.

## Arquitectura

El repositorio sigue una arquitectura de tres capas para el MVP:

- `frontend/` de facto en la raiz del repo: React + TypeScript + Vite + Tailwind
- `backend/`: Node.js 20 + Express 5 + Prisma + JWT
- `data/`: PostgreSQL 16 + Redis 7

Infraestructura y despliegue objetivo:

- Frontend: Vercel
- Backend: Railway o Render
- DB gestionada: Supabase
- DNS y SSL: Cloudflare
- CI/CD: GitHub Actions

## Estructura actual

```text
SiCoSe/
├── src/                  # Landing page y UI actual
├── public/               # Assets estaticos
├── backend/              # API Express + Prisma + TypeScript
├── docker-compose.yml    # Frontend + backend + Postgres + Redis
├── Dockerfile            # Imagen del frontend
├── backend/Dockerfile    # Imagen del backend
├── backend/prisma/       # Schema relacional
├── .env.example          # Variables locales de referencia
├── .env.docker           # Variables para Docker Compose
└── docs/                 # Documentacion de flujo y charter
```

## Que ya cubre el repo

- Landing page responsive para validacion
- API base para leads, auth demo, health y dashboard mock
- Docker Compose para levantar frontend, backend, Postgres y Redis
- Esquema Prisma inicial alineado al modelo de datos

## Que falta para el MVP completo

- Persistencia real con Prisma migrations y seed
- Auth completa con usuarios reales y blacklist en Redis
- CRUD de ciudadanos, pagos, adeudos, reportes y auditoria
- Integracion de React Query, Zustand y shadcn/ui en el frontend
- CI/CD completo con lint, tests, build y analisis de seguridad

## Desarrollo local

### Opcion 1: con Docker

```bash
docker compose up -d
docker compose ps
```

### Opcion 2: sin Docker

```bash
npm install
npm run dev
```

## Variables de entorno

Usa `.env.example` como referencia para el frontend y el backend.
Usa `.env.docker` para el stack local con contenedores.

## Estado del proyecto

El repo ya tiene la base tecnica para el entorno local del MVP y la
separacion inicial de capas. La siguiente iteracion debe completar el backend
real y las entidades de negocio del sistema.
