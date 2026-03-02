LLM Agent Instructions — Personal Website Project

Este documento define los estándares de codificación y el flujo de trabajo para agentes de IA que colaboren en este portafolio personal.
⚠️ CRÍTICO: Leer Documentación ANTES de Codificar

ANTES de generar o modificar cualquier código, DEBES:

    Leer este archivo AGENTS.md por completo.

    Identificar y leer los archivos de instrucción en /docs.

El directorio /docs contiene reglas específicas que anulan convenciones generales:

    docs/ui-instructions.md — Uso obligatorio de shadcn/ui, Tailwind CSS y lineamientos de estilo.

    docs/content-instructions.md — (Si existe) Reglas sobre manejo de MDX o JSON para proyectos/blog.

Propósito

    Mantener un código limpio, performante y estéticamente alineado con un sitio personal de alto nivel.

    Evitar sobreingeniería (No hay DB, no hay Auth).

    Forzar el uso de componentes reutilizables de shadcn/ui.

Principios Core

    TypeScript Strict: Tipado fuerte siempre. Prohibido el uso de any.

    Next.js App Router: Uso de app/ para rutas y componentes locales.

    Server Components por defecto: Solo usar 'use client' cuando la interactividad (framer-motion, hooks de estado) lo exija.

    Clean UI: Interfaz minimalista, accesible y responsiva.

Checklist de Flujo de Trabajo

    Analizar el alcance: Identificar si el cambio es un componente nuevo, una página o un ajuste de estilo.

    Verificar /docs/ui-instructions.md: No inventes clases de CSS si shadcn ya tiene un componente para eso.

    Plan de Componentes: Separar la lógica pesada en lib/utils.ts y mantener los componentes de UI en components/.

    Optimización de Imágenes: Usar siempre next/image con dimensiones correctas.

    Linting: Asegurar que el código pase el check de ESLint antes de entregarlo.

Convenciones del Proyecto

UI & Estilos:

    Framework: Tailwind CSS.

    Componentes: Únicamente shadcn/ui. Si necesitas algo nuevo (ej. un Carousel), instálalo vía CLI de shadcn, no crees componentes de bajo nivel desde cero.

    Iconos: Lucide-react (o los definidos en el proyecto).

    Animaciones: Framer Motion (si aplica), manteniendo la sobriedad.

Estructura de Archivos:

    app/: Rutas, layouts y páginas.

    components/ui/: Componentes base de shadcn.

    components/: Componentes específicos del sitio (Hero, ProjectCard, etc.).

    public/: Assets estáticos (PDFs, imágenes del portafolio).

    lib/: Funciones de utilidad y constantes.

Reglas de Implementación
1. UI Components

    Prioriza Server Components. Si un componente solo muestra datos, no necesita ser Client Component.

    Props explícitas mediante interface.

    Accesibilidad (A11y): Uso de etiquetas semánticas (<section>, <article>, <nav>).

2. Manejo de Datos Estáticos

    Como no hay base de datos, los datos de proyectos o experiencia deben residir en archivos de configuración (ej. lib/data.ts o archivos .json / .mdx).

3. Rendimiento

    No importar librerías pesadas para tareas simples.

    Mantener el bundle size bajo.

Requisito Absoluto del Agente

Si generas código ignorando docs/ui-instructions.md, el resultado será rechazado. Este proyecto se basa en la consistencia visual de shadcn y Tailwind.