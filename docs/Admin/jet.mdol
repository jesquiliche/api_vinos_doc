---
sidebar_position: 10
---
# Instalación de JetStream

:::info Objetivo
Hasta el momento, hemos utilizado JWT para autenticar nuestra API. En esta sección, vamos a incorporar vistas de **Administración** a nuestra aplicación Laravel. Para autenticar estas vistas, emplearemos **Laravel Sanctum**. Aprovecharemos la existencia de paquetes en Laravel dedicados a construir todo el sistema de autenticación, registro y gestión de usuarios, y realizaremos una breve introducción a Laravel Jetstream.
:::

## ¿Qué es JetStrem?

Laravel JetStream se presenta como un conjunto integral de herramientas en el ámbito del desarrollo de aplicaciones web mediante el marco de trabajo Laravel. Este paquete proporciona soluciones predefinidas para aspectos fundamentales del desarrollo, simplificando la implementación de funciones críticas. Aquí se presentan sus principales características de manera más detallada:

1. **Autenticación Simplificada:**
   - JetStream facilita significativamente la implementación de sistemas de registro y autenticación, proporcionando una base robusta sin necesidad de construir estas funcionalidades desde cero.

2. **Refuerzo de Seguridad con Autenticación de Dos Factores (2FA):**
   - Incluye soporte nativo para la autenticación de dos factores, fortaleciendo la seguridad mediante la incorporación de una capa adicional de verificación.

3. **Gestión Eficiente de Equipos:**
   - En el contexto de aplicaciones colaborativas, JetStream ofrece una estructura para la gestión eficaz de equipos, asignando roles y simplificando la administración de usuarios.

4. **Integración Cohesiva con Livewire e Inertia:**
   - La integración con Livewire e Inertia.js permite la creación de interfaces de usuario interactivas y dinámicas, facilitando la interacción fluida en las páginas de la aplicación.

5. **Soporte Nativo para Desarrollo de APIs:**
   - JetStream proporciona herramientas nativas para el desarrollo de APIs, permitiendo la exposición de servicios y funcionalidades de la aplicación de manera eficiente.

6. **Altamente Personalizable y Escalable:**
   - La flexibilidad y extensibilidad de JetStream permiten su adaptación a las necesidades específicas de cada aplicación, ofreciendo una base sólida que puede ser modificada según los requisitos del proyecto.

En esencia, Laravel JetStream sirve como una solución integral que acelera el proceso de desarrollo al ofrecer una estructura sólida y funcionalidades comunes, permitiendo a los desarrolladores concentrarse en aspectos más específicos y distintivos de sus aplicaciones.

## Introducción a Laravel Jetstream

Laravel Jetstream es un kit de inicio de aplicaciones bellamente diseñado para Laravel y proporciona el punto de partida perfecto para su próxima aplicación Laravel. Jetstream proporciona la implementación para el inicio de sesión, el registro, la verificación de correo electrónico, la autenticación de dos factores, la administración de sesiones, la API a través de Laravel Sanctum y funciones opcionales de administración de equipos de su aplicación.*

Jetstream está diseñado con Tailwind CSS y ofrece su opción de andamio Livewire o Inertia.*

**Pilas disponibles:**

Laravel Jetstream ofrece dos pilas de interfaz para elegir: Livewire e Inertia.js. Cada pila proporciona un punto de partida potente y productivo para crear su aplicación; sin embargo, la pila que elija dependerá de su idioma de plantilla preferido.*

**Laravel Livewire + blade:**

Laravel Livewire es una biblioteca que simplifica la creación de interfaces modernas, reactivas y dinámicas utilizando Laravel Blade como lenguaje de plantillas. Esta es una excelente pila para elegir si desea crear una aplicación que sea dinámica y reactiva, y es una excelente alternativa a un marco de JavaScript completo como Vue.js.

Al utilizar Livewire, puede elegir qué partes de su aplicación serán un componente de Livewire, mientras que el resto de su aplicación se puede representar como las plantillas Blade tradicionales a las que está acostumbrado.

**Inertia + Vista:**

La pila Inertia proporcionada por Jetstream utiliza Vue.js como lenguaje de plantillas. Crear una aplicación Inertia es muy parecido a crear una aplicación Vue típica; sin embargo, utilizará el enrutador de Laravel en lugar del enrutador Vue. Inertia es una pequeña biblioteca que le permite renderizar componentes Vue de un solo archivo desde su backend de Laravel proporcionando el nombre del componente y los datos que deben hidratarse en los "accesorios" de ese componente.*

En otras palabras, esta pila le brinda todo el poder de Vue.js sin la complejidad del enrutamiento del lado del cliente. Puede utilizar el enrutamiento estándar de Laravel y ver los enfoques de hidratación de datos a los que está acostumbrado.

La pila Inertia es una excelente opción si se siente cómodo y disfruta usando Vue.js como lenguaje de plantillas.*

## Instalación de Laravel con Jetstream (Modalidad Global)

:::info No aplica
En nuestro caso este tipo de instalación no aplica. Se utiliza normalmente esta instalación de nuevos proyectos. En nuestro caso seguiremos trabajando con el proyecto actual.
:::

1. Verificar si tienes instalado Composer: Para instalar Laravel, necesitas tener Composer instalado en tu computadora. Para verificar si lo tienes instalado, abre la terminal (en Windows: Command Prompt o PowerShell) y escribe el siguiente comando:

   ```
   composer --version
   ```

   Si Composer está instalado, se mostrará su versión. Si no está instalado, puedes descargarlo desde https://getcomposer.org/.

2. Instalar Laravel: Para instalar Laravel, abre la terminal y escribe el siguiente comando:

   ```
   composer global require laravel/installer
   ```

   Este comando descargará e instalará Laravel de manera global en tu computadora. Después de la instalación, verifica que Laravel se haya instalado correctamente escribiendo el siguiente comando:

   ```
   laravel --version
   ```

3. Crear un nuevo proyecto de Laravel con Jetstream: Para crear un nuevo proyecto de Laravel con Jetstream, abre la terminal y escribe el siguiente comando:

   ```
   laravel new nombre-del-proyecto --jet
   ```

   Este comando creará un nuevo proyecto de Laravel con Jetstream y todas las dependencias necesarias instaladas.

## Instalación de Laravel con Jetstream (Modalidad Local)

:::info Saltar los primeros pasos
En nuestro caso como ya disponemos de un proyecto, podemos omitir los primeros cuatro pasos y pasar directamente al 5 paso.
:::

1. Verificar si tienes instalado Composer: Para instalar Laravel, necesitas tener Composer instalado en tu computadora. Para verificar si lo tienes instalado, abre la terminal (en Windows: Command Prompt o PowerShell) y escribe el siguiente comando:

   ```
   composer --version
   ```

   Si Composer está instalado, se mostrará su versión. Si no está instalado, puedes descargarlo desde [getcomposer.org](https://getcomposer.org/).



2. Crear un directorio para el proyecto: Crea un nuevo directorio en tu computadora donde guardarás el proyecto de Laravel.

3. Navegar al directorio del proyecto: Abre la terminal y navega hasta el directorio que acabas de crear.

4. Descargar Laravel con Jetstream: Para descargar Laravel con Jetstream, escribe el siguiente comando en la terminal:

   ```
   composer create-project --prefer-dist laravel/laravel nombre-del-proyecto
   ```

   Este comando descargará Laravel en el directorio del proyecto que acabas de crear.

5. Instalar Jetstream: Para instalar Jetstream, navega hasta el directorio del proyecto en la terminal y escribe el siguiente comando:

   ```
   composer require laravel/jetstream
   ```

   Este comando instalará Jetstream y todas las dependencias necesarias.

6. Ejecutar Jetstream: Para ejecutar Jetstream, escribe el siguiente comando en la terminal:

   ```
   php artisan jetstream:install livewire
   ```

   Este comando instalará Jetstream con el stack de Livewire.

## Configuración de Base de datos

:::info Solo para nuevas instalaciones
En nuestra caso como ya disponemos de una instalación, podemos omitir todos los pasos y pasar al último paso.
:::

Para configurar las variables de entorno para conectar Laravel con la base de datos, sigue estos pasos:

1. Abre tu proyecto Laravel en tu editor de código preferido.
2. Crea un archivo llamado `.env` en la raíz del proyecto. Si estás utilizando Windows, puedes hacer esto abriendo la línea de comandos, navegando hasta el directorio raíz del proyecto y escribiendo el comando `copy .env.example .env`. Si estás utilizando Mac o Linux, puedes usar el comando `cp .env.example .env`.
3. Abre el archivo `.env` y configura las siguientes variables de entorno:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nombre_de_la_base_de_datos
DB_USERNAME=nombre_de_usuario_de_la_base_de_datos
DB_PASSWORD=contraseña_de_usuario_de_la_base_de_datos
```

4. Asegúrate de reemplazar `nombre_de_la_base_de_datos`, `nombre_de_usuario_de_la_base_de_datos` y `contraseña_de_usuario_de_la_base_de_datos` con los valores correspondientes para tu base de datos.
5. Guarda el archivo `.env`.

Ahora Laravel utilizará estas variables de entorno para conectarse a la base de datos. Si estás utilizando XAMPP o WAMP, asegúrate de que el servicio de MySQL esté ejecutándose en el puerto especificado en la variable `DB_PORT` (por defecto, el puerto es 3306).

Si ya has configurado las variables de entorno pero no estás seguro de si funcionan correctamente, puedes probar la conexión a la base de datos ejecutando el comando `php artisan migrate` en la línea de comandos en la raíz del proyecto. Este comando ejecutará las migraciones de la base de datos y te indicará si hay algún problema de conexión.

6. Ejecute el comando php artisan migrate si todavía no lo ha ejecutado.
