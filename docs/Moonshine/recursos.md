---
sidebar_position: 5
---

# Generando recursos

### ¿Qué es un recurso en MoonShine?

Un recurso en MoonShine representa un modelo de datos en tu aplicación Laravel y define cómo se administran esos datos en el panel de administración. Los recursos permiten crear, leer, actualizar y eliminar registros de una manera estructurada y fácil de usar.

### Cómo crear un recurso en MoonShine

Para crear un recurso en MoonShine, se utiliza un comando de Artisan, que es la herramienta de línea de comandos de Laravel. Aquí tienes los pasos detallados:

1. **Ejecutar el Comando Artisan**:
   Abre tu terminal y navega al directorio raíz de tu proyecto Laravel. Luego ejecuta el siguiente comando:

   ```sh
   php artisan moonshine:resource Denominacion
   ```

   Este comando generará un recurso para el modelo `Denominacion`.

2. **Revisar el Archivo Generado**:
   Después de ejecutar el comando, se creará un archivo de recurso en el directorio `app/MoonShine/Resources`. El archivo se llamará `DenominacionResource.php`. Este archivo contendrá la configuración básica del recurso.

3. **Editar el Archivo del Recurso**:
   Abre el archivo `DenominacionResource.php`. Este archivo define cómo se presentarán y manejarán los datos del modelo `Denominacion` en el panel de administración. Aquí puedes configurar campos, reglas de validación, permisos, etc. Un ejemplo básico del contenido del archivo podría ser:

   ```ts
   namespace App\MoonShine\Resources;

   use MoonShine\Fields\ID;
   use MoonShine\Fields\Text;
   use MoonShine\Resources\Resource;
   use App\Models\Post;

   class DenominacionResource extends Resource
   {
       public static string $model = Post::class;

       public static string $title = 'Denominaciones';

       public function fields(): array
       {
           return [
               ID::make()->sortable(),
               Text::make('Nombre','nombre),
               Text::make('Descripcion','descripcion'),
           ];
       }
   }
   ```

   En este ejemplo:

   - `ID::make()->sortable()` agrega un campo ID que es ordenable.
   - `Text::make('Nombre','nombre')` agrega un campo de texto para el título del post.
   - `Text::make('Descripción','descripcion')` agrega un campo de texto para el contenido de la denominación que se oculta en la vista de índice.

4. **Registrar el Recurso en el menu Proveedor de Servicios**:
   Para que el recurso sea accesible en el panel de administración, debes registrarlo en `MoonShineServiceProvider.php`. Abre el archivo `app/Providers/MoonShineServiceProvider.php` y agrega el recurso en el método `menu()`, de paso borre el menu de documentación:

```ts
     /**
     * @return Closure|list<MenuElement>
     */
    protected function menu(): array
    {
        return [
            MenuGroup::make(static fn() => __('moonshine::ui.resource.system'), [
                MenuItem::make(
                    static fn() => __('moonshine::ui.resource.admins_title'),
                    new MoonShineUserResource()
                ),
                MenuItem::make(
                    static fn() => __('moonshine::ui.resource.role_title'),
                    new MoonShineUserRoleResource()
                ),
            ]),

            MenuItem::make('Documentation', 'https://moonshine-laravel.com/docs')
                ->badge(fn() => 'Check')
                ->blank(),
        ];
    }
```

5. **Acceder al Panel de Administración**:
   Después de registrar el recurso, podrás acceder al panel de administración y gestionar los posts a través de la interfaz administrativa proporcionada por MoonShine. Por defecto, el panel de administración está disponible en la URL `/admin`.

### Resumen

Un recurso en MoonShine es una representación de un modelo de datos que permite administrar los registros de ese modelo en el panel de administración de Laravel. Se crea mediante un comando Artisan, se configura en el archivo generado y se registra en el proveedor de servicios para hacerlo accesible en el panel de administración.

### DenominacionResource

```ts
<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use App\Models\Denominacion;

use MoonShine\Resources\ModelResource;
use MoonShine\Decorations\Block;
use MoonShine\Fields\ID;
use MoonShine\Fields\Field;
use MoonShine\Fields\Text;
use MoonShine\Fields\Textarea;

use MoonShine\Components\MoonShineComponent;

/**
 * @extends ModelResource<Denominacion>
 */
class DenominacionResource extends ModelResource
{
    protected string $model = Denominacion::class;

    protected string $title = 'Denominaciones';

        protected bool $createInModal = true;

    protected bool $editInModal = true;

    protected bool $detailInModal = true;


    /**
     * @return list<MoonShineComponent|Field>
     */
    public function fields(): array
    {
        return [
            Block::make([
                ID::make()->sortable(),
                Text::make(
                    'Nombre',
                    'nombre',
                ),
                Textarea::make(
                    'Descripción',
                    'descripcion',
                )
            ]),
        ];
    }

    /**
     * @param Denominacion $item
     *
     * @return array<string, string[]|string>
     * @see https://laravel.com/docs/validation#available-validation-rules
     */
    public function rules(Model $item): array
    {
        return ['nombre'=>'string|required','descripcion'=>'string|required'];
    }




}
```
:::info Explicación
### Explicación General

El código define un recurso de MoonShine para gestionar un modelo llamado `Denominacion` en una aplicación Laravel. MoonShine es una herramienta de administración para Laravel que permite la creación de paneles de administración de forma sencilla y personalizable. Este recurso específico define cómo se debe manejar y presentar el modelo `Denominacion` en el panel de administración de MoonShine.

### Desglose del Código

#### Declaración de Namespace y Uso de Clases

```ts
<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use App\Models\Denominacion;

use MoonShine\Resources\ModelResource;
use MoonShine\Decorations\Block;
use MoonShine\Fields\ID;
use MoonShine\Fields\Field;
use MoonShine\Fields\Text;
use MoonShine\Fields\Textarea;

use MoonShine\Components\MoonShineComponent;
```

- **Namespace**: Define el namespace del recurso, `App\MoonShine\Resources`, organizando el código y evitando conflictos de nombres.
- **Importaciones**: Usa varias clases de Laravel y MoonShine necesarias para definir el recurso y sus campos.

#### Definición de la Clase `DenominacionResource`

```ts
/**
 * @extends ModelResource<Denominacion>
 */
class DenominacionResource extends ModelResource
{
    protected string $model = Denominacion::class;

    protected string $title = 'Denominaciones';

    protected bool $createInModal = true;
    protected bool $editInModal = true;
    protected bool $detailInModal = true;
```

- **Extiende `ModelResource`**: Indica que esta clase es un recurso de modelo específico para `Denominacion`.
- **Propiedades**:
  - `$model`: Define el modelo que este recurso gestiona, en este caso `Denominacion`.
  - `$title`: Título que se muestra en la interfaz de administración.
  - `$createInModal`, `$editInModal`, `$detailInModal`: Configura el recurso para que las acciones de crear, editar y ver detalles se realicen en ventanas modales.

#### Definición de los Campos del Recurso

```ts
/**
 * @return list<MoonShineComponent|Field>
 */
public function fields(): array
{
    return [
        Block::make([
            ID::make()->sortable(),
            Text::make(
                'Nombre',
                'nombre',
            ),
            Textarea::make(
                'Descripción',
                'descripcion',
            )
        ]),
    ];
}
```

- **`fields` Método**: Define los campos que se mostrarán en el formulario del recurso.
  - **Bloque**: Agrupa los campos en un bloque.
  - **Campos**:
    - `ID`: Campo de ID, marcado como sortable.
    - `Text`: Campo de texto para el nombre.
    - `Textarea`: Campo de área de texto para la descripción.

#### Definición de las Reglas de Validación

```ts
/**
 * @param Denominacion $item
 *
 * @return array<string, string[]|string>
 * @see https://laravel.com/docs/validation#available-validation-rules
 */
public function rules(Model $item): array
{
    return ['nombre'=>'string|required','descripcion'=>'string|required'];
}
```

- **`rules` Método**: Define las reglas de validación para el modelo `Denominacion`.
  - Las reglas especifican que los campos `nombre` y `descripcion` son obligatorios y deben ser cadenas de texto.

### Resumen

Este código define un recurso de MoonShine para gestionar el modelo `Denominacion`. Configura el recurso para que las acciones de crear, editar y ver detalles se realicen en modales. Además, especifica los campos que se mostrarán en los formularios de administración y las reglas de validación para esos campos. 

- **Modales**: Las propiedades `createInModal`, `editInModal` y `detailInModal` hacen que las operaciones de creación, edición y visualización de detalles se realicen en modales, mejorando la experiencia del usuario.
- **Campos**: Los campos `ID`, `nombre` y `descripcion` se definen para su visualización y edición.
- **Validación**: Las reglas de validación aseguran que `nombre` y `descripcion` sean siempre cadenas de texto y que estén presentes en los formularios.
:::

### TipoResource

```ts
<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tipo;

use MoonShine\Resources\ModelResource;
use MoonShine\Decorations\Block;
use MoonShine\Fields\ID;
use MoonShine\Fields\Text;
use MoonShine\Fields\Textarea;

use MoonShine\Components\MoonShineComponent;

/**
 * @extends ModelResource<Tipo>
 */
class TipoResource extends ModelResource
{
    protected string $model = Tipo::class;

    protected string $title = 'Tipos';

    protected bool $createInModal = true;

    protected bool $editInModal = true;

    protected bool $detailInModal = true;

    /**
     * @return list<MoonShineComponent|Field>
     */
    public function fields(): array
    {
        return [
            Block::make([
                ID::make()->sortable(),
                Text::make(
                    'Nombre',
                    'nombre',
                ),
                Textarea::make(
                    'Descripción',
                    'descripcion',
                )
            ]),
        ];
    }


    /**
     * @param Tipo $item
     *
     * @return array<string, string[]|string>
     * @see https://laravel.com/docs/validation#available-validation-rules
     */
    public function rules(Model $item): array
    {
        return ['nombre'=>'required','descripcion'=>'required'];
    }
}
```
:::info Explicación

Aquí tienes una explicación detallada del código que has proporcionado para el recurso `Tipo` en MoonShine:

### Explicación General

Este código define un recurso de MoonShine para gestionar un modelo llamado `Tipo` en una aplicación Laravel. MoonShine es una herramienta que facilita la creación de paneles de administración en Laravel, proporcionando una interfaz de usuario intuitiva y funcionalidades avanzadas.

### Desglose del Código

#### Declaración de Namespace y Uso de Clases

```ts
<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tipo;

use MoonShine\Resources\ModelResource;
use MoonShine\Decorations\Block;
use MoonShine\Fields\ID;
use MoonShine\Fields\Text;
use MoonShine\Fields\Textarea;

use MoonShine\Components\MoonShineComponent;
```

- **Namespace**: Define el espacio de nombres del recurso, `App\MoonShine\Resources`, organizando el código y evitando conflictos de nombres.
- **Importaciones**: Utiliza varias clases de Laravel y MoonShine necesarias para definir el recurso y sus campos.

#### Definición de la Clase `TipoResource`

```ts
/**
 * @extends ModelResource<Tipo>
 */
class TipoResource extends ModelResource
{
    protected string $model = Tipo::class;

    protected string $title = 'Tipos';

    protected bool $createInModal = true;

    protected bool $editInModal = true;

    protected bool $detailInModal = true;
```

- **Extiende `ModelResource`**: Indica que esta clase es un recurso de modelo específico para `Tipo`.
- **Propiedades**:
  - `$model`: Define el modelo que este recurso gestiona, en este caso `Tipo`.
  - `$title`: Título que se muestra en la interfaz de administración.
  - `$createInModal`, `$editInModal`, `$detailInModal`: Configura el recurso para que las acciones de crear, editar y ver detalles se realicen en ventanas modales.

#### Definición de los Campos del Recurso

```ts
/**
 * @return list<MoonShineComponent|Field>
 */
public function fields(): array
{
    return [
        Block::make([
            ID::make()->sortable(),
            Text::make(
                'Nombre',
                'nombre',
            ),
            Textarea::make(
                'Descripción',
                'descripcion',
            )
        ]),
    ];
}
```

- **`fields` Método**: Define los campos que se mostrarán en el formulario del recurso.
  - **Bloque**: Agrupa los campos en un bloque.
  - **Campos**:
    - `ID`: Campo de ID, marcado como sortable.
    - `Text`: Campo de texto para el nombre.
    - `Textarea`: Campo de área de texto para la descripción.

#### Definición de las Reglas de Validación

```ts
/**
 * @param Tipo $item
 *
 * @return array<string, string[]|string>
 * @see https://laravel.com/docs/validation#available-validation-rules
 */
public function rules(Model $item): array
{
    return ['nombre'=>'required','descripcion'=>'required'];
}
```

- **`rules` Método**: Define las reglas de validación para el modelo `Tipo`.
  - Las reglas especifican que los campos `nombre` y `descripcion` son obligatorios.

### Resumen

Este código define un recurso de MoonShine para gestionar el modelo `Tipo`. Configura el recurso para que las acciones de crear, editar y ver detalles se realicen en modales. Además, especifica los campos que se mostrarán en los formularios de administración y las reglas de validación para esos campos.

- **Modales**: Las propiedades `createInModal`, `editInModal` y `detailInModal` hacen que las operaciones de creación, edición y visualización de detalles se realicen en modales, mejorando la experiencia del usuario.
- **Campos**: Los campos `ID`, `nombre` y `descripcion` se definen para su visualización y edición.
- **Validación**: Las reglas de validación aseguran que `nombre` y `descripcion` sean siempre obligatorios en los formularios.

### Explicación de los Campos y Métodos

- **`ID::make()->sortable()`**: Define un campo para el ID del modelo, haciéndolo sortable en la interfaz.
- **`Text::make('Nombre', 'nombre')`**: Define un campo de texto para el atributo `nombre` del modelo.
- **`Textarea::make('Descripción', 'descripcion')`**: Define un campo de área de texto para el atributo `descripcion` del modelo.
- **`rules(Model $item): array`**: Este método retorna un array de reglas de validación que se aplican al modelo `Tipo`. En este caso, ambas reglas aseguran que `nombre` y `descripcion` sean campos obligatorios.

Al seguir estas configuraciones y definiciones, MoonShine sabrá cómo manejar el modelo `Tipo` en el panel de administración, proporcionando una interfaz amigable y funcional para gestionar estos datos.
:::

### ProductResource

```ts
<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use App\Models\Producto;
use App\MoonShine\Pages\Producto\ProductoIndexPage;
use App\MoonShine\Pages\Producto\ProductoFormPage;
use App\MoonShine\Pages\Producto\ProductoDetailPage;
use MoonShine\Fields\ID;
use MoonShine\Resources\ModelResource;
use MoonShine\Pages\Page;
use MoonShine\Fields\Text;
use MoonShine\Fields\Textarea;
use MoonShine\Fields\Image;
use MoonShine\Fields\Number;
use MoonShine\Fields\Relationships\BelongsTo;

/**
 * @extends ModelResource<Producto>
 */
class ProductoResource extends ModelResource
{
    protected string $model = Producto::class;

    protected string $title = 'Productos';

    protected bool $createInModal = true;

    protected bool $editInModal = true;

    protected bool $detailInModal = true;


    /**
     * @return list<Page>
     */
    public function pages(): array
    {
        return [
            ProductoIndexPage::make($this->title()),
            ProductoFormPage::make(
                $this->getItemID()
                    ? __('moonshine::ui.edit')
                    : __('moonshine::ui.add')
            ),
            ProductoDetailPage::make(__('moonshine::ui.show')),
        ];
    }

    /**
     * @param Producto $item
     *
     * @return array<string, string[]|string>
     * @see https://laravel.com/docs/validation#available-validation-rules
     */
    public function rules(Model $item): array
    {
        return ['nombre' => 'required|string|max:255',
        'bodega' => 'nullable|string|max:255',
        'descripcion' => 'required|string',
        'maridaje' => 'required|string',
        'precio' => 'required|numeric',
        'graduacion' => 'required|numeric',
        'ano' => 'nullable|integer',
        'sabor' => 'nullable|string|max:255',
        'tipo_id' => 'required|exists:tipos,id',
        'imagen'=>'nullable:string',
        //'file' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        'denominacion_id' => 'required|exists:denominaciones,id',
];
    }

    public function fields(): array
    {
        return [
            ID::make()->sortable(),
            Image::make('imagen'),
            BelongsTo::make('Tipo', 'tipo', 'nombre')->nullable(),
            BelongsTo::make('D.O.P', 'denominacion', 'nombre')->nullable(),
            Text::make('Nombre', 'nombre')->sortable(),
            Textarea::make('Descripción', 'descripcion')->hideOnIndex(),
            Text::make('Maridaje', 'maridaje')->hideOnIndex(),
            Number::make('Precio', 'precio')->min(1)->max(1000)->step(0.10),
            Number::make('Graduacion', 'graduacion')->min(1)->max(100)->step(0.10),
            Number::make('Año', 'ano')->min(1950)->max(2030)->step(1)->hideOnIndex(),
            Text::make('Sabor', 'sabor')->hideOnIndex(),
        ];
    }

    public function filters(): array
    {
        return [

            BelongsTo::make('Tipo', 'tipo', 'nombre')->nullable(),
            BelongsTo::make('Denominación', 'denominacion', 'nombre')->nullable(),
            Text::make('Nombre', 'nombre'),
        ];
    }

}
```

:::Explicación

### Explicación General

Este código define un recurso de MoonShine para gestionar un modelo llamado `Producto` en una aplicación Laravel. MoonShine es una herramienta que facilita la creación de paneles de administración en Laravel, proporcionando una interfaz de usuario intuitiva y funcionalidades avanzadas.

### Desglose del Código

#### Declaración de Namespace y Uso de Clases

```ts
<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use App\Models\Producto;
use App\MoonShine\Pages\Producto\ProductoIndexPage;
use App\MoonShine\Pages\Producto\ProductoFormPage;
use App\MoonShine\Pages\Producto\ProductoDetailPage;
use MoonShine\Fields\ID;
use MoonShine\Resources\ModelResource;
use MoonShine\Pages\Page;
use MoonShine\Fields\Text;
use MoonShine\Fields\Textarea;
use MoonShine\Fields\Image;
use MoonShine\Fields\Number;
use MoonShine\Fields\Relationships\BelongsTo;
```

- **Namespace**: Define el espacio de nombres del recurso, `App\MoonShine\Resources`, organizando el código y evitando conflictos de nombres.
- **Importaciones**: Utiliza varias clases de Laravel y MoonShine necesarias para definir el recurso, sus campos, y sus páginas.

#### Definición de la Clase `ProductoResource`

```ts
/**
 * @extends ModelResource<Producto>
 */
class ProductoResource extends ModelResource
{
    protected string $model = Producto::class;

    protected string $title = 'Productos';

    protected bool $createInModal = true;

    protected bool $editInModal = true;

    protected bool $detailInModal = true;
```

- **Extiende `ModelResource`**: Indica que esta clase es un recurso de modelo específico para `Producto`.
- **Propiedades**:
  - `$model`: Define el modelo que este recurso gestiona, en este caso `Producto`.
  - `$title`: Título que se muestra en la interfaz de administración.
  - `$createInModal`, `$editInModal`, `$detailInModal`: Configura el recurso para que las acciones de crear, editar y ver detalles se realicen en ventanas modales.

#### Definición de las Páginas del Recurso

```ts
/**
 * @return list<Page>
 */
public function pages(): array
{
    return [
        ProductoIndexPage::make($this->title()),
        ProductoFormPage::make(
            $this->getItemID()
                ? __('moonshine::ui.edit')
                : __('moonshine::ui.add')
        ),
        ProductoDetailPage::make(__('moonshine::ui.show')),
    ];
}
```

- **`pages` Método**: Define las páginas que se utilizarán para mostrar, editar y detallar el recurso.
  - **`ProductoIndexPage`**: Página para mostrar la lista de productos.
  - **`ProductoFormPage`**: Página para crear o editar un producto.
  - **`ProductoDetailPage`**: Página para mostrar los detalles de un producto.

#### Definición de las Reglas de Validación

```ts
/**
 * @param Producto $item
 *
 * @return array<string, string[]|string>
 * @see https://laravel.com/docs/validation#available-validation-rules
 */
public function rules(Model $item): array
{
    return [
        'nombre' => 'required|string|max:255',
        'bodega' => 'nullable|string|max:255',
        'descripcion' => 'required|string',
        'maridaje' => 'required|string',
        'precio' => 'required|numeric',
        'graduacion' => 'required|numeric',
        'ano' => 'nullable|integer',
        'sabor' => 'nullable|string|max:255',
        'tipo_id' => 'required|exists:tipos,id',
        'imagen' => 'nullable|string',
        'denominacion_id' => 'required|exists:denominaciones,id',
    ];
}
```

- **`rules` Método**: Define las reglas de validación para el modelo `Producto`.
  - Las reglas especifican que varios campos son obligatorios (`nombre`, `descripcion`, `maridaje`, `precio`, `graduacion`, `tipo_id`, `denominacion_id`), mientras que otros son opcionales (`bodega`, `ano`, `sabor`, `imagen`).

#### Definición de los Campos del Recurso

```ts
public function fields(): array
{
    return [
        ID::make()->sortable(),
        Image::make('imagen'),
        BelongsTo::make('Tipo', 'tipo', 'nombre')->nullable(),
        BelongsTo::make('D.O.P', 'denominacion', 'nombre')->nullable(),
        Text::make('Nombre', 'nombre')->sortable(),
        Textarea::make('Descripción', 'descripcion')->hideOnIndex(),
        Text::make('Maridaje', 'maridaje')->hideOnIndex(),
        Number::make('Precio', 'precio')->min(1)->max(1000)->step(0.10),
        Number::make('Graduacion', 'graduacion')->min(1)->max(100)->step(0.10),
        Number::make('Año', 'ano')->min(1950)->max(2030)->step(1)->hideOnIndex(),
        Text::make('Sabor', 'sabor')->hideOnIndex(),
    ];
}
```

- **`fields` Método**: Define los campos que se mostrarán en el formulario del recurso.
  - **Campos**:
    - `ID`: Campo de ID, marcado como sortable.
    - `Image`: Campo para subir una imagen.
    - `BelongsTo`: Campos de relación con `Tipo` y `Denominación`.
    - `Text`: Campos de texto para `nombre`, `maridaje`, `sabor`.
    - `Textarea`: Campo de área de texto para `descripcion`.
    - `Number`: Campos numéricos para `precio`, `graduacion`, `ano`.

#### Definición de los Filtros del Recurso

```ts
public function filters(): array
{
    return [
        BelongsTo::make('Tipo', 'tipo', 'nombre')->nullable(),
        BelongsTo::make('Denominación', 'denominacion', 'nombre')->nullable(),
        Text::make('Nombre', 'nombre'),
    ];
}
```

- **`filters` Método**: Define los filtros que se pueden aplicar en la vista de índice del recurso.
  - Permite filtrar productos por `Tipo`, `Denominación`, y `Nombre`.

### Resumen

Este código define un recurso de MoonShine para gestionar el modelo `Producto`. Configura el recurso para que las acciones de crear, editar y ver detalles se realicen en modales. Además, especifica las páginas que se utilizarán para diferentes acciones, los campos que se mostrarán en los formularios de administración, las reglas de validación para esos campos, y los filtros que se pueden aplicar en la vista de índice.

- **Modales**: Las propiedades `createInModal`, `editInModal` y `detailInModal` hacen que las operaciones de creación, edición y visualización de detalles se realicen en modales, mejorando la experiencia del usuario.
- **Campos**: Los campos `ID`, `imagen`, `tipo`, `denominacion`, `nombre`, `descripcion`, `maridaje`, `precio`, `graduacion`, `ano`, y `sabor` se definen para su visualización y edición.
- **Validación**: Las reglas de validación aseguran que los campos obligatorios sean siempre completados y que cumplan con los formatos esperados.
- **Filtros**: Los filtros permiten a los usuarios encontrar productos específicos basados en `Tipo`, `Denominación`, y `Nombre`.
:::

### Definición de menú

```ts

<?php

declare(strict_types=1);

namespace App\Providers;

use App\MoonShine\Resources\DenominacionResource;
use App\MoonShine\Resources\ProductoResource;
use App\MoonShine\Resources\TipoResource;
use App\MoonShine\Resources\UserResource;
use MoonShine\Providers\MoonShineApplicationServiceProvider;
use MoonShine\MoonShine;
use MoonShine\Menu\MenuGroup;
use MoonShine\Menu\MenuItem;
use MoonShine\Resources\MoonShineUserResource;
use MoonShine\Resources\MoonShineUserRoleResource;
use MoonShine\Contracts\Resources\ResourceContract;
use MoonShine\Menu\MenuElement;
use MoonShine\Pages\Page;
use Closure;

class MoonShineServiceProvider extends MoonShineApplicationServiceProvider
{
    /**
     * @return list<ResourceContract>
     */
    protected function resources(): array
    {
        return [];
    }

    /**
     * @return list<Page>
     */
    protected function pages(): array
    {
        return [];
    }

    /**
     * @return Closure|list<MenuElement>
     */
    protected function menu(): array
    {
        return [
            MenuGroup::make(static fn () => __('moonshine::ui.resource.system'), [
                MenuItem::make(
                    static fn () => __('moonshine::ui.resource.admins_title'),
                    new MoonShineUserResource()
                ),
                MenuItem::make(
                    static fn () => __('moonshine::ui.resource.role_title'),
                    new MoonShineUserRoleResource()
                ),
            ]),

        
            MenuItem::make('Denominaciones', new DenominacionResource()),

            MenuItem::make('Tipos', new TipoResource()),
            MenuItem::make('Productos', new ProductoResource())

        ];
    }

    /**
     * @return Closure|array{css: string, colors: array, darkColors: array}
     */
    protected function theme(): array
    {
        return [];
    }
}
```