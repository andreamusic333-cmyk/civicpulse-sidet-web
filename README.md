# CivicPulse — Gestión Operativa de Participación Ciudadana

Aplicación web desarrollada con **Next.js**, **TypeScript** y **Tailwind CSS** para centralizar el registro, seguimiento, validación y trazabilidad de actividades comunitarias en el municipio Juan José Mora (Morón, estado Carabobo). Permite autenticar usuarios operativos mediante un módulo de acceso con validaciones, registrar intervenciones clasificadas por tipo de actividad asignando automáticamente el usuario de la sesión activa, consultar indicadores clave y filtrar el historial de actividades.

## Tecnologías y Librerías Utilizadas

* **Next.js** (App Router) y **React** para la estructura de la aplicación, el enrutamiento y los componentes interactivos de interfaz.
* **TypeScript** para el tipado estático de modelos de datos, propiedades de componentes y funciones de validación/filtrado.
* **Tailwind CSS** para el diseño visual, distribución responsiva y estilos de la interfaz.
* **lucide-react** para la iconografía de formularios, encabezados, alertas y tablas.
* **Node.js / npm** para la ejecución de los scripts de desarrollo (`npm run dev`) y compilación (`npm run build`).

## Estructura del Repositorio

* `app/layout.tsx` y `app/page.tsx`: Configuración raíz de la aplicación y punto de entrada que renderiza el panel principal.
* `app/globals.css`: Definición de estilos globales y variables visuales del tema.
* `components/civic/login-card.tsx`: Componente de autenticación (`LoginCard`) que solicita nombre de usuario y rol operativo, validando campos vacíos o de longitud insuficiente antes de iniciar sesión.
* `components/civic/dashboard.tsx`: Componente integrador del panel operativo que gestiona el estado de la sesión activa, el registro de actividades, la aprobación de reportes pendientes y el cálculo de métricas.
* `components/civic/activity-form.tsx`: Formulario para crear nuevas actividades con selección obligatoria de *Tipo de actividad*, validación de campos, asignación automática del usuario en sesión y eliminación del ingreso manual de responsable.
* `components/civic/traceability-table.tsx`: Tabla y vista móvil de trazabilidad con búsqueda por texto, filtro por *Tipo de actividad* y filtro por estatus (`En curso`, `Finalizado`, `En revisión`).
* `components/civic/kpi-cards.tsx`, `components/civic/community-coverage.tsx`, `components/civic/alerts-panel.tsx`, `components/civic/hero.tsx` y `components/civic/site-header.tsx`: Módulos visuales para indicadores clave, cobertura comunitaria, alertas/aprobaciones, cabecera y navegación.
* `lib/civic-data.ts`: Definición de tipos (`Activity`, `ActivityType`, `ActivityStatus`, `SessionUser`, `Commitment`), catálogos de comunidades y tipos de actividad, y datos iniciales de prueba.
* `lib/format.ts` y `lib/utils.ts`: Funciones auxiliares de formato y composición de clases.
* `README.md`: Documentación técnica y guía de uso del proyecto.

## Instrucciones de Instalación y Configuración

1. Abre una terminal y ubícate en la carpeta raíz del proyecto (`diseno-interfaz-civic-pulse`).
2. Instala las dependencias necesarias ejecutando:
   ```bash
   npm install