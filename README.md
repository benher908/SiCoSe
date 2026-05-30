# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# SiCoSe — Sistema de Cobro y Seguimiento

Sistema web para la gestión y digitalización de pagos de servicios públicos
en Juntas Auxiliares gubernamentales.

## Contexto
Diseñado para el personal administrativo y tesorería de Juntas Auxiliares que
operan con procesos semi-manuales de recaudación (agua, cooperaciones, etc).

## Problemáticas que resuelve
- **Caos en conciliación de pagos** por transferencia vía WhatsApp o físicos
- **Falta de trazabilidad** de adeudos históricos por ciudadano
- **Ausencia de métricas** para toma de decisiones en planeación presupuestal

## Equipo — SiCoSe
| Nombre | Rol |
|--------|-----|
| David Aguilar Rodríguez | Product Owner / Business Lead |
| Samuel Jonathan Trujillo Bolaños | Tech Lead / Software Architect |
| Cesar Gaspar Pacheco | Product Engineer / Full Stack Builder |
| Benkis Carbajal Hernández | QA / Delivery / Operations Engineer |

## Ramas del Proyecto
| Rama | Propósito |
|------|-----------|
| `main` | Producción — protegida, solo merge por PR |
| `develop` | Integración — rama base para features |
| `feature/landing-base` | Maquetación base de la Landing Page |
| `chore/setup-deploy` | Configuración del entorno de deploy |
| `docs/github-flow` | Documentación del flujo de trabajo Git |
| `docs/projectcharter` | Project Charter del equipo |

##  Stack Tecnológico
- **Frontend:** React + Vite 5
- **Node:** v20.18
- **Deploy:** Vercel

##  Estructura del Repositorio
SiCoSe/
├── src/
│   ├── components/
│   ├── sections/
│   ├── assets/
│   └── App.jsx
├── docs/
│   ├── github-flow.md
│   └── projectcharter.md
├── public/
├── README.md
└── CONTRIBUTING.md
## 🔗 Evidencias
- [Carpeta de Entrevistas (Drive)](https://drive.google.com/drive/folders/1cmE8uLZS3bM8irf7t4ViYPTdaCJVjN_b?usp=drive_link)
