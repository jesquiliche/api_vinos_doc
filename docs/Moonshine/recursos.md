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