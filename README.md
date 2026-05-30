# SiCoSe — Sistema de Cobro y Seguimiento

Sistema web para la digitalización y gestión de pagos de servicios públicos
en Juntas Auxiliares gubernamentales del estado de Puebla.

---

## Descripción General

SiCoSe nace como respuesta a los procesos semi-manuales de recaudación que
operan actualmente en Juntas Auxiliares. El sistema centraliza el registro de
pagos en efectivo y por transferencia, proporciona trazabilidad histórica de
adeudos por ciudadano y genera métricas en tiempo real para la toma de
decisiones presupuestales.

El producto está dirigido al personal administrativo, tesoreros y presidentes
de Juntas Auxiliares que hoy dependen de libretas físicas, hojas de Excel
desconectadas y revisiones manuales de estados de cuenta bancarios.

---

## Problemáticas que Resuelve

**Problema A — Caos en conciliación de pagos por transferencia**
Los ciudadanos realizan pagos vía banca móvil y envían comprobantes por
WhatsApp o en papel días después. El tesorero debe cotejar manualmente cada
transferencia contra el estado de cuenta bancario, lo que genera duplicidad
de cobros y pagos sin registrar.

**Problema B — Falta de trazabilidad de adeudos**
Cuando un ciudadano consulta su historial de pagos o la Junta necesita
generar un reporte de morosidad, la búsqueda se realiza manualmente en libros
físicos numerados. Esto genera desconfianza en el ciudadano e impide planear
obras públicas con datos reales.

**Problema C — Ausencia de métricas para decisiones**
Durante las reuniones de planeación presupuestal no existe forma de visualizar
porcentajes de recaudación por tipo de servicio (agua, predial, cooperaciones)
ni por zona geográfica. Los cálculos se realizan de forma aproximada con base
en el efectivo disponible en caja.

---

## Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Frontend | React 18 + Vite 5 |
| Estilos | CSS Modules |
| Runtime | Node.js v20.18 |
| Control de versiones | Git + GitHub |
| Deploy | Vercel |

---

## Estructura del Repositorio
SiCoSe/
├── src/
│   ├── components/        # Componentes reutilizables (Button, Card, Input)
│   ├── sections/          # Secciones de la Landing Page (Hero, Problema, CTA)
│   ├── assets/            # Imágenes, íconos y fuentes
│   ├── styles/            # Variables CSS globales y reset
│   └── App.jsx            # Componente raíz y enrutamiento
├── public/                # Archivos estáticos públicos
├── docs/
│   ├── github-flow.md     # Flujo de trabajo Git del equipo
│   └── projectcharter.md  # Charter y alcance del proyecto
├── .env.example           # Variables de entorno requeridas (sin valores)
├── .gitignore
├── index.html
├── vite.config.js
├── README.md
└── CONTRIBUTING.md

---

## Ramas del Proyecto

| Rama | Proposito | Estado |
|------|-----------|--------|
| `main` | Produccion. Protegida. Solo merge por PR aprobado. | Activa |
| `develop` | Integracion. Base de todas las ramas de trabajo. | Activa |
| `feature/landing-base` | Maquetacion base de la Landing Page | En desarrollo |
| `chore/setup-deploy` | Configuracion del entorno de deploy en Vercel | En desarrollo |
| `docs/github-flow` | Documentacion del flujo de trabajo Git | En desarrollo |
| `docs/projectcharter` | Project Charter del equipo | En desarrollo |

---

## Instalacion y Ejecucion Local

### Requisitos previos

- Node.js v20.18 o superior
- npm v9 o superior
- Git

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Reing01/SiCoSe.git

# 2. Entrar al directorio
cd SiCoSe

# 3. Instalar dependencias
npm install

# 4. Copiar variables de entorno
cp .env.example .env

# 5. Iniciar el servidor de desarrollo
npm run dev
```

El servidor quedara disponible en `http://localhost:4000`.

### Scripts disponibles

| Comando | Descripcion |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con hot reload |
| `npm run build` | Genera el build de produccion en `/dist` |
| `npm run preview` | Previsualiza el build de produccion localmente |

---

## Equipo

| Nombre | Rol | Responsabilidad |
|--------|-----|-----------------|
| David Aguilar Rodriguez | Product Owner / Business Lead | Definicion de producto, landing y propuesta de valor |
| Samuel Jonathan Trujillo Bolanos | Tech Lead / Software Architect | Arquitectura, repositorio, deploy y code reviews |
| Cesar Gaspar Pacheco | Product Engineer / Full Stack Builder | Desarrollo de componentes y funcionalidades |
| Benkis Carbajal Hernandez | QA / Delivery / Operations Engineer | Calidad, validacion de PRs y documentacion |

---

## Contribucion

Consulta [CONTRIBUTING.md](./CONTRIBUTING.md) para conocer el flujo de trabajo,
la convencion de commits y las reglas del equipo antes de abrir tu primer
Pull Request.

Para el modelo de ramas y ciclo completo de una tarea, revisa
[docs/github-flow.md](./docs/github-flow.md).

---

## Evidencias de Investigacion

Las entrevistas realizadas con el personal de la Junta Auxiliar de San Diego
(presidente, secretaria administrativa y tesorera) estan disponibles en la
siguiente carpeta compartida:

[Carpeta de evidencias — Google Drive](https://drive.google.com/drive/folders/1cmE8uLZS3bM8irf7t4ViYPTdaCJVjN_b)

---

## Licencia

Proyecto academico
Todos los derechos reservados al equipo SiCoSe — 2026.