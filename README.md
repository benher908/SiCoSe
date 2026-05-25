# SiCoSe - Sistema de Cobro de Servicios (San Diego Chalma)

> **SaaS Studio - 9° Cuatrimestre** > **Asignaturas:** Desarrollo Web Integral + Administración de Proyectos de TI  
> **Estatus del MVP:** Bloque 1 - Landing Page & Validación en Marcha  

---

##  El Problema Real (Validación de Negocio)
El Comité de Agua y Recaudación de la Junta Auxiliar de San Diego Chalma enfrenta diariamente ineficiencias críticas debido a la gestión analógica:
* **Falta de control centralizado:** El registro de usuarios, adeudos e historial de pagos se realiza manualmente en libretas de papel, propiciando la pérdida de datos y duplicidad de folios.
* **Fricción en la conciliación bancaria:** Los usuarios realizan transferencias SPEI, pero la tesorería debe validar manualmente capturas de pantalla de WhatsApp frente a los estados de cuenta bancarios, lo que genera retrasos y errores humanos.
* **Falta de transparencia:** Los ciudadanos no cuentan con un canal digital inmediato para consultar su estado de cuenta en tiempo real (24/7), limitando la recaudación óptima.

**SiCoSe** nace para digitalizar integralmente este flujo, eliminando las libretas de papel y proveyendo un Dashboard automatizado de control de ingresos accesible desde dispositivos móviles.

---

##  Alcance del MVP (Mínimo Producto Viable)
Para mitigar el riesgo técnico y validar la adopción en el mercado, el producto se ha dividido en módulos incrementales priorizados por el Product Owner:

1. **Bloque 1 - Landing Page (Actual):** Página de aterrizaje pública y responsiva orientada a la presentación del sistema y a la captura de leads interesados en la automatización del comité.
2. **Bloque 2 - Módulo de Autenticación (Login):** Acceso seguro y segregado por roles (Administradores/Tesoreros del comité y Usuarios finales).
3. **Bloque 3 - Dashboard de Recaudación:** Panel administrativo con analíticas de ingresos, estado de cuentas globales y conciliación de pagos.
4. **Bloque 4 - Padrón Digital de Usuarios:** Listado indexado y filtrable de los ciudadanos de la junta auxiliar con historial de adeudos por año/mes.

---

##  Stack Tecnológico Local
La infraestructura base del cliente se configuró bajo los siguientes estándares de ingeniería:
* **Frontend:** React.js con JavaScript (ESM).
* **Entorno de Construcción:** Vite 5.4.x *(Versión seleccionada de forma nativa para garantizar estricta compatibilidad local con entornos Node.js v20.18.0+ sin bloqueos de dependencias opcionales).*
* **Estilos:** Tailwind CSS (Diseño Mobile-First y Responsivo).

---

##  Célula de Producto y Roles de Ingeniería
De acuerdo con la metodología de operación del curso, cada integrante asume la responsabilidad principal de un área auditables mediante KPIs y artefactos en el repositorio:

* **David Aguilar Rodriguez (Product Owner / Business Lead):** Responsable de la validación del problema de negocio, definición de requerimientos del MVP, gestión del Backlog del producto y maquetación de la lógica inicial del formulario de captura de leads.
* **[Samuel Jonathan Trujillo Bolaños ] (Tech Lead / Software Architect):** Responsable de la arquitectura del sistema, diagramas estructurales, gobernanza de Git (GitHub Flow) y Code Reviews de los PRs.
* **[Cesar Gaspar Pacheco] (Product Engineer / Full Stack Builder):** Responsable del desarrollo modular de los componentes informativos, lógica interactiva en React y estilizado responsivo móvil mediante Tailwind.
* **[Benkis Carbajal Hernández] (QA / Delivery / Operations Engineer):** Responsable de los planes de pruebas visuales/funcionales (Smoke testing), gestión de bugs y configuración del pipeline de despliegue continuo (Vercel/Netlify).

---

##  Protocolo de Git - GitHub Flow (Gobernanza)
Este repositorio opera estrictamente bajo la metodología **GitHub Flow** para asegurar la trazabilidad del trabajo individual:
1. **Ramas Estables:** La rama `main` representa el código de producción listo para deploy. Nadie trabaja directo sobre `main`.
2. **Ciclo de Desarrollo:** Todo cambio o feature inicia con la creación de un *Issue* con contexto de negocio y criterios de aceptación claros.
3. **Nomenclatura de Ramas:** Se derivan ramas de trabajo con los prefijos obligatorios `feature/`, `fix/`, `docs/`, `chore/` o `test/`.
4. **Integración:** Todo código entra a revisión mediante un *Pull Request (PR)* estructurado, requiriendo la aprobación técnica (*Review*) de un compañero antes de integrarse a la rama común de desarrollo.