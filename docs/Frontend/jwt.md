---
sidebar_position: 1
---

# Primeros pasos con Next

## Introducción

En esta sección y las siguientes, vamos a ver cómo consumir nuestra API desde el frontend. Para ello, utilizaremos el framework Next.js 14.

## Instalación y configuración

### Requisitos del sistema:

Node.js 18.17 o posterior.
Se admiten macOS, Windows (incluido WSL) y Linux.

### Instalación
Recomendamos comenzar una nueva aplicación Next.js usando create-next-app, que configura todo automáticamente para ti. Para crear un proyecto, ejecuta:

```
npx create-next-app@latest
```

Durante la instalación, verás los siguientes mensajes:

![Next 14](/images/next1.png)


:::info traducción
<p>¿Cómo se llama tu proyecto? <b>(nombre de proyecto)</b></p>
<p>¿Te gustaría usar TypeScript? No / Sí <b>(escoja Sí)</b></p>
<p>¿Te gustaría usar ESLint? No / Sí <b>(escoja Sí)</b></p>
<p>¿Te gustaría usar Tailwind CSS? No / Sí <b>(escoja Sí)</b></p>
<p>¿Te gustaría usar el directorio `src/`? No / Sí <b>(escoja Sí)</b></p>
<p>¿Te gustaría usar App Router? (recomendado) No / Sí  <b>(escoja Sí)</b></p>
<p>¿Te gustaría personalizar el alias de importación predeterminado (@/*)? No /  <b>(escoja No)</b></p>
:::

Después de los mensajes, create-next-app creará una carpeta con el nombre de tu proyecto e instalará las dependencias necesarias.

Si eres nuevo en Next.js, consulta la documentación de la estructura del proyecto para obtener una descripción general de todos los archivos y carpetas posibles en tu aplicación.

:::info
Next.js ahora incluye configuraciones de TypeScript, ESLint y Tailwind CSS de forma predeterminada.
Opcionalmente, puedes usar un directorio src en la raíz de tu proyecto para separar el código de tu aplicación de los archivos de configuración.
:::

## Estructura del Proyecto Next.js

Esta página proporciona una visión general de la estructura del proyecto de una aplicación Next.js. Cubre archivos y carpetas de nivel superior, archivos de configuración y convenciones de enrutamiento dentro de los directorios de la aplicación y páginas.

### Carpetas de nivel superior

Las carpetas de nivel superior se utilizan para organizar el código de tu aplicación y los archivos estáticos.

- **app:** Enrutador de la Aplicación
- **pages:** Enrutador de Páginas
- **public:** Ficheros estáticos que se servirán
- **src:** Carpeta opcional de origen de la aplicación

### Directorio App

**¿Qué es el directorio de aplicaciones?**

* Es una carpeta específica dentro de tu proyecto Next.js dedicada a crear componentes y definir las rutas de la aplicación.
* Aprovecha características de React 18 como los Server Components y Suspense, habilitando funcionalidades avanzadas.

**Ventajas de usar el directorio de aplicaciones:**

* **Rutas dinámicas:** Crea rutas que se adapten según el estado de la aplicación o los datos del usuario.
* **Rutas anidadas:** Organiza tu aplicación con una estructura jerárquica usando carpetas anidadas dentro del directorio de aplicaciones. Cada carpeta actúa como un segmento de la ruta.
* **SEO mejorado:** El directorio de aplicaciones permite renderizado del lado del servidor, lo que puede mejorar el SEO de tu aplicación. 
* **Flexibilidad:** Separa la estructura lógica y de diseño de tu aplicación de la estructura de rutas.

**Conclusión:**

El directorio de aplicaciones en Next.js te brinda una forma moderna de estructurar y enrutar tus aplicaciones, ofreciendo ventajas en términos de flexibilidad, SEO y aprovechamiento de las funciones más recientes de React.

#### Pages
Es la forma de crear rutas de la las versiones anteriores a la 13. En esta proyecto no aplica.

### Archivos de nivel superior

Los archivos de nivel superior se utilizan para configurar tu aplicación, gestionar dependencias, ejecutar middleware, integrar herramientas de monitoreo y definir variables de entorno.

- **Next.js:** Instalación de Next.js
- **next.config.js:** Archivo de configuración para Next.js
- **package.json:** Dependencias y scripts del proyecto
- **instrumentation.ts:** Archivo de OpenTelemetry e Instrumentación
- **middleware.ts:** Middleware de solicitud de Next.js
- **.env:** Variables de entorno
- **.env.local:** Variables de entorno locales
- **.env.production:** Variables de entorno de producción
- **.env.development:** Variables de entorno de desarrollo
- **.eslintrc.json:** Archivo de configuración para ESLint
- **.gitignore:** Archivos y carpetas de Git a ignorar
- **next-env.d.ts:** Archivo de declaración de TypeScript para Next.js
- **tsconfig.json:** Archivo de configuración para TypeScript
- **jsconfig.json:** Archivo de configuración para JavaScript



## Convenciones de Enrutamiento de la Aplicación

A continuación, se presentan las convenciones de archivos utilizadas para definir rutas y manejar metadatos en el enrutador de la aplicación.

**Archivos de Enrutamiento:**

- **layout:** Archivos con extensiones .js, .jsx, .tsx: Diseño de la página.
- **page:** Archivos con extensiones .js, .jsx, .tsx: Página principal.
- **loading:** Archivos con extensiones .js, .jsx, .tsx: Interfaz de usuario para la carga.
- **not-found:** Archivos con extensiones .js, .jsx, .tsx: Interfaz de usuario para página no encontrada.
- **error:** Archivos con extensiones .js, .jsx, .tsx: Interfaz de usuario para errores.
- **global-error:** Archivos con extensiones .js, .jsx, .tsx: Interfaz de usuario para errores globales.
- **route:** Archivos con extensiones .js, .ts: Punto final de la API.
- **template:** Archivos con extensiones .js, .jsx, .tsx: Plantilla para el diseño re-renderizado.
- **default:** Archivos con extensiones .js, .jsx, .tsx: Página de respaldo para rutas paralelas.

