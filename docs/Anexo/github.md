---
sidebar_position: 4
---
# Descargar e instalar desde Git-Hub

Para descargar y configurar un proyecto de Laravel en tu máquina local, sigue estos pasos:

### Requisitos Previos:

1. **Composer:** Asegúrate de tener Composer instalado en tu máquina. Puedes descargar Composer desde [getcomposer.org](https://getcomposer.org/download/).

2. **PHP:** Laravel requiere PHP instalado en tu máquina. Puedes descargar PHP desde [php.net](https://www.php.net/downloads.php).

3. **Base de Datos:** Asegúrate de tener una base de datos (por ejemplo, MySQL) y las credenciales necesarias.

### Pasos para Instalar el Proyecto Laravel:

1. **Descargar el Proyecto:**
   - Puedes clonar un repositorio existente de Laravel desde GitHub o descargar un archivo ZIP del proyecto desde el repositorio.

     ```bash
     git clone https://github.com/jesquiliche/cervezas.git
     ```

     O bien, descargar el archivo ZIP y descomprimirlo.

2. **Instalar Dependencias:**
   - Navega a la carpeta del proyecto.

     ```bash
     cd nombre-proyecto
     ```

   - Ejecuta el siguiente comando para instalar las dependencias del proyecto.

     ```bash
     composer install
     ```

3. **Copiar el Archivo de Configuración:**
   - Copia el archivo `.env.example` y crea un nuevo archivo llamado `.env`.

     ```bash
     cp .env.example .env
     ```

   - Abre el archivo `.env` en un editor de texto y configura la conexión a la base de datos y otras configuraciones según sea necesario.

4. **Generar Clave de Aplicación:**
   - Ejecuta el siguiente comando para generar la clave de aplicación.

     ```bash
     php artisan key:generate
     ```

5. **Ejecutar Migraciones y Semillas:**
   - Ejecuta las migraciones para crear las tablas de la base de datos.

     ```bash
     php artisan migrate
     ```

   - Si hay semillas definidas, puedes ejecutar el siguiente comando para insertar datos de ejemplo.

     ```bash
     php artisan db:seed
     ```

6. **Iniciar el Servidor de Desarrollo:**
   - Ejecuta el siguiente comando para iniciar el servidor de desarrollo.

     ```bash
     php artisan serve
     ```

   - El proyecto estará disponible en `http://127.0.0.1:8000` por defecto.

7. **Acceder al Proyecto:**
   - Abre tu navegador y visita `http://127.0.0.1:8000`. Verás la página principal de Laravel.

Estos pasos deberían permitirte descargar un proyecto Laravel existente, configurarlo en tu máquina local y ejecutarlo para propósitos de desarrollo. Asegúrate de revisar la documentación específica del proyecto para obtener detalles adicionales, especialmente si hay consideraciones específicas de configuración.

:::info Variables de entorno
No olvide configuras sus variables de entorno con los valores de su base de datos
y crear la base datos correspondiente.

DB_CONNECTION=mysql

DB_HOST=127.0.0.1

DB_PORT=3306

DB_DATABASE=cervezas

DB_USERNAME=root

DB_PASSWORD=
:::