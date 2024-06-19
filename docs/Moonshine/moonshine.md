---
sidebar_position: 4
---

# Moonshine

## Introducción

Laravel MoonShine es un paquete para el framework Laravel que facilita la creación de paneles de administración personalizados. Permite a los desarrolladores configurar interfaces de administración para gestionar datos de manera eficiente, aprovechando las características y la estructura de Laravel. Algunas características clave de Laravel MoonShine incluyen:

1. **Fácil instalación y configuración**: MoonShine se integra perfectamente con Laravel, lo que permite una instalación rápida mediante Composer y configuraciones sencillas a través de archivos de configuración.

2. **Gestión de usuarios y roles**: MoonShine proporciona herramientas para crear y gestionar usuarios y roles dentro del panel de administración, permitiendo un control granular de los permisos y accesos.

3. **Recursos personalizados**: Los desarrolladores pueden definir recursos personalizados que representan los modelos de datos de la aplicación, facilitando la visualización, creación, edición y eliminación de registros a través de la interfaz administrativa.

4. **Menús configurables**: MoonShine permite la creación de menús personalizados para organizar y acceder fácilmente a las diferentes secciones del panel de administración.

5. **Internacionalización**: Ofrece soporte para la traducción de textos en la interfaz de usuario, lo que es útil para aplicaciones que necesitan ser accesibles en múltiples idiomas.

6. **Tematización**: Permite la personalización del aspecto del panel de administración mediante la aplicación de temas, proporcionando flexibilidad en el diseño y la apariencia.

7. **Comandos Artisan**: Incluye comandos de consola que facilitan tareas administrativas como la creación de usuarios administradores, la generación de recursos y otras configuraciones.

Laravel MoonShine es una herramienta poderosa para construir interfaces administrativas robustas y personalizadas en aplicaciones Laravel, mejorando la productividad y la gestión de datos.

## Instalación

### Requisitos

Para usar MoonShine, se deben cumplir los siguientes requisitos antes de la instalación:

- php >= 8.1
- laravel >= 10.23
- composer > 2composer > 2

### Composer

```bash
composer require moonshine/moonshine
```

### Instalación

```bash
php artisan moonshine:install
```

```bash
 Dashboard created ............................................. DONE

  Install migrations? (yes/no) [yes]
❯ yes

   INFO  Nothing to migrate.


  Create super user ? (yes/no) [yes]
❯ yes

  Username(email):
❯ admin@test.com

   WARN  There is already a username, try another one.

  Username(email):
❯ admin

  Name: [admin]
❯ 12345678

  Password:
❯

 User is created

  Can you quickly star our GitHub repository? 🙏🏻: (yes/no) [yes]
❯ no

  ⇂ Star or contribute to MoonShine: https://github.com/moonshine-software/moonshine
```

Si durante el proceso de instalación no se crea el usuario, puede ejecutar el siguiente comando.

```bash
php artisan moonshine:user
```
Después de este procesos se va creadp un archivo **app\Providers\MoonShineServiceProvider.php**.
Deberá presentar el siguiente aspecto:

```js
namespace App\Providers;

use MoonShine\Menu\MenuGroup;
use MoonShine\Menu\MenuItem;
use MoonShine\Providers\MoonShineApplicationServiceProvider;
use MoonShine\Resources\MoonShineUserResource;
use MoonShine\Resources\MoonShineUserRoleResource;

class MoonShineServiceProvider extends MoonShineApplicationServiceProvider
{
  protected function resources(): array
  {
      return [
      ];
  }

  protected function menu(): array
  {
      return [
          MenuGroup::make('moonshine::ui.resource.system', [
             MenuItem::make('moonshine::ui.resource.admins_title', new MoonShineUserResource())
                 ->translatable(),
             MenuItem::make('moonshine::ui.resource.role_title', new MoonShineUserRoleResource())
                 ->translatable(),
          ])->translatable(),

          MenuItem::make('Documentation', 'https://laravel.com')
             ->badge(fn() => 'Check'),
      ];
  }

  protected function theme(): array
  {
      return [];
  }
}
```
Para comprobar que todo ha funcionado correctamente, puede escribir la url **http://localhost:8000/admin** en la barra de su navegador. debería aparecer una pantalla similar a la siguiente:

![Descripcion de la imagen"](/images/moonshine.png)

Donde deberá introducir los datos del usuario que ha creado anteriormente.

### Creación de los mantenimientos

Vamos a crear