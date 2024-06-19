---
sidebar_position: 3
---
# Aplicación de Ejemplo

## Introducción

Vamos a crear una pequeña aplicación de ejemplo para probar nuestra API con Sanctum. Esta aplicación consiste en un pequeño catálogo de vinos clasificados por tipo y denominación de origen. Empezaremos creando las migraciones.

## Migraciones

### create_denominaciones_table.php

```js
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('denominaciones', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('descripcion')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('denominaciones');
    }
};
```
:::info Esplicación del código

1. **Definición de la migración**: 
    ```ts
    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;
    ```
    Estos `use` son declaraciones de importación que permiten utilizar las clases `Migration`, `Blueprint` y `Schema` del framework Laravel. Estas clases son esenciales para la creación y gestión de migraciones en Laravel.

2. **Inicio de la migración**:
    ```ts
    return new class extends Migration
    ```
    Esta línea define una nueva clase anónima que extiende la clase `Migration` de Laravel. Al extender `Migration`, esta clase hereda métodos y propiedades que facilitan la creación y manipulación de tablas en la base de datos.

3. **Método `up`**:
    ```ts
    public function up(): void
    {
        Schema::create('denominaciones', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('descripcion')->nullable();
            $table->timestamps();
        });
    }
    ```
    - El método `up` se ejecuta cuando se aplica la migración. Su propósito es definir la estructura de una nueva tabla en la base de datos.
    - `Schema::create('denominaciones', function (Blueprint $table) {...})` indica que se creará una nueva tabla llamada `denominaciones`.
    - Dentro de la función anónima que recibe `Blueprint $table`:
        - `$table->id()` crea una columna `id` que es una clave primaria autoincremental.
        - `$table->string('nombre')` crea una columna `nombre` de tipo cadena de texto.
        - `$table->string('descripcion')->nullable()` crea una columna `descripcion` de tipo cadena de texto que puede ser nula (es opcional).
        - `$table->timestamps()` añade dos columnas: `created_at` y `updated_at` para gestionar automáticamente las marcas de tiempo de creación y actualización de los registros.

4. **Método `down`**:
    ```ts
    public function down(): void
    {
        Schema::dropIfExists('denominaciones');
    }
    ```
    - El método `down` se ejecuta cuando se revierte la migración. Su propósito es deshacer las acciones realizadas en el método `up`.
    - `Schema::dropIfExists('denominaciones')` elimina la tabla `denominaciones` si existe.

En resumen, este código define una migración que crea una tabla llamada `denominaciones` con tres columnas (`id`, `nombre` y `descripcion`), y dos columnas adicionales para marcas de tiempo (`created_at` y `updated_at`). La migración también incluye la lógica para eliminar esta tabla si es necesario revertir los cambios.
:::

### create_tipos_table

```js
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('descripcion')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tipos');
    }
};
```
:::info Esplicación del código

1. **Importación de clases**: 
    ```ts
    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;
    ```
    Estas declaraciones `use` permiten utilizar las clases `Migration`, `Blueprint` y `Schema` del framework Laravel. Estas clases son esenciales para la creación y gestión de migraciones en Laravel.

2. **Definición de la migración**:
    ```ts
    return new class extends Migration
    ```
    Esta línea define una nueva clase anónima que extiende la clase `Migration` de Laravel. Al extender `Migration`, esta clase hereda métodos y propiedades que facilitan la creación y manipulación de tablas en la base de datos.

3. **Método `up`**:
    ```ts
    public function up(): void
    {
        Schema::create('tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('descripcion')->nullable();
            $table->timestamps();
        });
    }
    ```
    - El método `up` se ejecuta cuando se aplica la migración. Define la estructura de una nueva tabla en la base de datos.
    - `Schema::create('tipos', function (Blueprint $table) {...})` indica que se creará una nueva tabla llamada `tipos`.
    - Dentro de la función anónima que recibe `Blueprint $table`:
        - `$table->id()` crea una columna `id` que es una clave primaria autoincremental.
        - `$table->string('nombre')` crea una columna `nombre` de tipo cadena de texto.
        - `$table->string('descripcion')->nullable()` crea una columna `descripcion` de tipo cadena de texto que puede ser nula (es opcional).
        - `$table->timestamps()` añade dos columnas: `created_at` y `updated_at` para gestionar automáticamente las marcas de tiempo de creación y actualización de los registros.

4. **Método `down`**:
    ```ts
    public function down(): void
    {
        Schema::dropIfExists('tipos');
    }
    ```
    - El método `down` se ejecuta cuando se revierte la migración. Su propósito es deshacer las acciones realizadas en el método `up`.
    - `Schema::dropIfExists('tipos')` elimina la tabla `tipos` si existe.

En resumen, este código define una migración que crea una tabla llamada `tipos` con tres columnas (`id`, `nombre` y `descripcion`), y dos columnas adicionales para marcas de tiempo (`created_at` y `updated_at`). La migración también incluye la lógica para eliminar esta tabla si es necesario revertir los cambios.

:::

### create_productos_table

```js
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('bodega')->nullable();
            $table->text('descripcion');
            $table->text('maridaje');
            $table->decimal('graduacion',5,2);
            $table->integer('ano')->nullable();
            $table->string('sabor')->nullable();
            $table->unsignedBigInteger('tipo_id');
            $table->string('imagen');
            $table->foreign('tipo_id')->references('id')->on('tipos'); 
            $table->unsignedBigInteger('denominacion_id');
            $table->foreign('denominacion_id')->references('id')->on('denominaciones'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
```
:::info Esplicación del código

1. **Importación de clases**: 
    ```ts
    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;
    ```
    Estas declaraciones `use` permiten utilizar las clases `Migration`, `Blueprint` y `Schema` del framework Laravel. Estas clases son esenciales para la creación y gestión de migraciones en Laravel.

2. **Definición de la migración**:
    ```ts
    return new class extends Migration
    ```
    Esta línea define una nueva clase anónima que extiende la clase `Migration` de Laravel. Al extender `Migration`, esta clase hereda métodos y propiedades que facilitan la creación y manipulación de tablas en la base de datos.

3. **Método `up`**:
    ```ts
    public function up(): void
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('bodega')->nullable();
            $table->text('descripcion');
            $table->text('maridaje');
            $table->decimal('graduacion', 5, 2);
            $table->integer('ano')->nullable();
            $table->string('sabor')->nullable();
            $table->unsignedBigInteger('tipo_id');
            $table->string('imagen');
            $table->foreign('tipo_id')->references('id')->on('tipos');
            $table->unsignedBigInteger('denominacion_id');
            $table->foreign('denominacion_id')->references('id')->on('denominaciones');
            $table->timestamps();
        });
    }
    ```
    - El método `up` se ejecuta cuando se aplica la migración. Define la estructura de una nueva tabla en la base de datos.
    - `Schema::create('productos', function (Blueprint $table) {...})` indica que se creará una nueva tabla llamada `productos`.
    - Dentro de la función anónima que recibe `Blueprint $table`:
        - `$table->id()` crea una columna `id` que es una clave primaria autoincremental.
        - `$table->string('nombre')` crea una columna `nombre` de tipo cadena de texto.
        - `$table->string('bodega')->nullable()` crea una columna `bodega` de tipo cadena de texto que puede ser nula (opcional).
        - `$table->text('descripcion')` crea una columna `descripcion` de tipo texto.
        - `$table->text('maridaje')` crea una columna `maridaje` de tipo texto.
        - `$table->decimal('graduacion', 5, 2)` crea una columna `graduacion` de tipo decimal con un total de 5 dígitos y 2 decimales para representar la graduación alcohólica.
        - `$table->integer('ano')->nullable()` crea una columna `ano` de tipo entero que puede ser nula (opcional).
        - `$table->string('sabor')->nullable()` crea una columna `sabor` de tipo cadena de texto que puede ser nula (opcional).
        - `$table->unsignedBigInteger('tipo_id')` crea una columna `tipo_id` de tipo entero sin signo para referenciar a la tabla `tipos`.
        - `$table->string('imagen')` crea una columna `imagen` de tipo cadena de texto.
        - `$table->foreign('tipo_id')->references('id')->on('tipos')` define una clave foránea `tipo_id` que referencia la columna `id` en la tabla `tipos`.
        - `$table->unsignedBigInteger('denominacion_id')` crea una columna `denominacion_id` de tipo entero sin signo para referenciar a la tabla `denominaciones`.
        - `$table->foreign('denominacion_id')->references('id')->on('denominaciones')` define una clave foránea `denominacion_id` que referencia la columna `id` en la tabla `denominaciones`.
        - `$table->timestamps()` añade dos columnas: `created_at` y `updated_at` para gestionar automáticamente las marcas de tiempo de creación y actualización de los registros.

4. **Método `down`**:
    ```ts
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
    ```
    - El método `down` se ejecuta cuando se revierte la migración. Su propósito es deshacer las acciones realizadas en el método `up`.
    - `Schema::dropIfExists('productos')` elimina la tabla `productos` si existe.

En resumen, este código define una migración que crea una tabla llamada `productos` con varias columnas: `id`, `nombre`, `bodega`, `descripcion`, `maridaje`, `graduacion`, `ano`, `sabor`, `tipo_id`, `imagen`, `denominacion_id`, además de las columnas `created_at` y `updated_at` para marcas de tiempo. También establece relaciones con las tablas `tipos` y `denominaciones` mediante claves foráneas. La migración incluye la lógica para eliminar esta tabla si es necesario revertir los cambios.
:::

## Modelos

### Denominacion

```js
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Denominacion extends Model
{
    use HasFactory;

    protected $table = "Denominaciones";

    protected $fillable = ['nombre', 'descripcion'];

    /**
     * Define la relación uno a muchos con el modelo Producto.
     */
    public function producto()
    {
        return $this->hasMany('App\Models\Producto');
    }
}
```
:::info Esplicación del código

1. **Espacio de nombres y uso de clases**:
    ```ts
    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;
    ```
    - `namespace App\Models;` define el espacio de nombres para la clase `Denominacion`, indicando que pertenece al directorio `App\Models`.
    - `use Illuminate\Database\Eloquent\Factories\HasFactory;` y `use Illuminate\Database\Eloquent\Model;` importan las clases `HasFactory` y `Model` de Laravel, necesarias para definir un modelo.

2. **Definición de la clase `Denominacion`**:
    ```ts
    class Denominacion extends Model
    {
        use HasFactory;
    ```
    - `class Denominacion extends Model` define una clase llamada `Denominacion` que extiende la clase `Model` de Laravel. Esto convierte a `Denominacion` en un modelo Eloquent, lo que permite interactuar con la base de datos de forma sencilla y fluida.
    - `use HasFactory;` permite utilizar las fábricas de modelos de Laravel para generar instancias del modelo para pruebas y seeding (poblamiento de la base de datos con datos de prueba).

3. **Propiedad `$table`**:
    ```ts
    protected $table = "Denominaciones";
    ```
    - `protected $table = "Denominaciones";` especifica el nombre de la tabla en la base de datos que este modelo representa. En este caso, el modelo `Denominacion` está asociado con la tabla `Denominaciones`.

4. **Propiedad `$fillable`**:
    ```ts
    protected $fillable = ['nombre', 'descripcion'];
    ```
    - `protected $fillable = ['nombre', 'descripcion'];` define un arreglo de atributos que se pueden asignar de manera masiva. Esto ayuda a prevenir vulnerabilidades de asignación masiva, especificando solo los campos `nombre` y `descripcion` como asignables.

5. **Relación `producto`**:
    ```ts
    /**
     * Define la relación uno a muchos con el modelo Producto.
     */
    public function producto()
    {
        return $this->hasMany('App\Models\Producto');
    }
    ```
    - `public function producto()` define un método que establece una relación uno a muchos con el modelo `Producto`.
    - `return $this->hasMany('App\Models\Producto');` indica que una `Denominacion` puede tener muchos `Producto`s asociados. La relación se define utilizando el método `hasMany`, que es una característica de Eloquent para modelar relaciones en la base de datos.

En resumen, este código define un modelo `Denominacion` en Laravel que:
- Extiende la clase base `Model` de Eloquent.
- Usa el trait `HasFactory` para habilitar la generación de instancias para pruebas.
- Está asociado con la tabla `Denominaciones` en la base de datos.
- Permite la asignación masiva de los campos `nombre` y `descripcion`.
- Define una relación uno a muchos con el modelo `Producto`, indicando que una denominación puede tener múltiples productos asociados.
:::

### Tipo

```js
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tipo extends Model
{
    use HasFactory;

    protected $fillable=['nombre','descripcion'];

    public function producto()
    {
        return $this->hasMany('App\Models\Producto');
    }
}
```

:::info Explicación del código

1. **Espacio de nombres y uso de clases**:
    ```ts
    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;
    ```
    - `namespace App\Models;` define el espacio de nombres para la clase `Tipo`, indicando que pertenece al directorio `App\Models`.
    - `use Illuminate\Database\Eloquent\Factories\HasFactory;` y `use Illuminate\Database\Eloquent\Model;` importan las clases `HasFactory` y `Model` de Laravel, necesarias para definir un modelo.

2. **Definición de la clase `Tipo`**:
    ```ts
    class Tipo extends Model
    {
        use HasFactory;
    ```
    - `class Tipo extends Model` define una clase llamada `Tipo` que extiende la clase `Model` de Laravel. Esto convierte a `Tipo` en un modelo Eloquent, lo que permite interactuar con la base de datos de forma sencilla y fluida.
    - `use HasFactory;` permite utilizar las fábricas de modelos de Laravel para generar instancias del modelo para pruebas y seeding (poblamiento de la base de datos con datos de prueba).

3. **Propiedad `$fillable`**:
    ```ts
    protected $fillable = ['nombre', 'descripcion'];
    ```
    - `protected $fillable = ['nombre', 'descripcion'];` define un arreglo de atributos que se pueden asignar de manera masiva. Esto ayuda a prevenir vulnerabilidades de asignación masiva, especificando solo los campos `nombre` y `descripcion` como asignables.

4. **Relación `producto`**:
    ```ts
    public function producto()
    {
        return $this->hasMany('App\Models\Producto');
    }
    ```
    - `public function producto()` define un método que establece una relación uno a muchos con el modelo `Producto`.
    - `return $this->hasMany('App\Models\Producto');` indica que un `Tipo` puede tener muchos `Producto`s asociados. La relación se define utilizando el método `hasMany`, que es una característica de Eloquent para modelar relaciones en la base de datos.

En concllusión, este código define un modelo `Tipo` en Laravel que:
- Extiende la clase base `Model` de Eloquent.
- Usa el trait `HasFactory` para habilitar la generación de instancias para pruebas.
- Permite la asignación masiva de los campos `nombre` y `descripcion`.
- Define una relación uno a muchos con el modelo `Producto`, indicando que un tipo puede tener múltiples productos asociados.
:::

### Producto

```js
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'productos';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombre',
        'bodega',
        'descripcion',
        'maridaje',
        'precio',
        'graduacion',
        'ano',
        'sabor',
        'tipo_id',
        'imagen',
        'denominacion_id',
    ];

    /**
     * Get the tipo that owns the producto.
     */
    public function tipo()
    {
        return $this->belongsTo(Tipo::class);
    }

    /**
     * Get the denominacion that owns the producto.
     */
    public function denominacion()
    {
        return $this->belongsTo(Denominacion::class);
    }
}
```

:::info Explicación del código

1. **Espacio de nombres y uso de clases**:
    ```ts
    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;
    ```
    - `namespace App\Models;` define el espacio de nombres para la clase `Producto`, indicando que pertenece al directorio `App\Models`.
    - `use Illuminate\Database\Eloquent\Factories\HasFactory;` y `use Illuminate\Database\Eloquent\Model;` importan las clases `HasFactory` y `Model` de Laravel, necesarias para definir un modelo.

2. **Definición de la clase `Producto`**:
    ```ts
    class Producto extends Model
    {
        use HasFactory;
    ```
    - `class Producto extends Model` define una clase llamada `Producto` que extiende la clase `Model` de Laravel. Esto convierte a `Producto` en un modelo Eloquent, lo que permite interactuar con la base de datos de forma sencilla y fluida.
    - `use HasFactory;` permite utilizar las fábricas de modelos de Laravel para generar instancias del modelo para pruebas y seeding (poblamiento de la base de datos con datos de prueba).

3. **Propiedad `$table`**:
    ```ts
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'productos';
    ```
    - `protected $table = 'productos';` especifica el nombre de la tabla en la base de datos que este modelo representa. En este caso, el modelo `Producto` está asociado con la tabla `productos`.

4. **Propiedad `$fillable`**:
    ```ts
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombre',
        'bodega',
        'descripcion',
        'maridaje',
        'precio',
        'graduacion',
        'ano',
        'sabor',
        'tipo_id',
        'imagen',
        'denominacion_id',
    ];
    ```
    - `protected $fillable = [...]` define un arreglo de atributos que se pueden asignar de manera masiva. Esto ayuda a prevenir vulnerabilidades de asignación masiva, especificando los campos que se pueden asignar de forma segura.

5. **Relación `tipo`**:
    ```ts
    /**
     * Get the tipo that owns the producto.
     */
    public function tipo()
    {
        return $this->belongsTo(Tipo::class);
    }
    ```
    - `public function tipo()` define un método que establece una relación de pertenencia con el modelo `Tipo`.
    - `return $this->belongsTo(Tipo::class);` indica que cada `Producto` pertenece a un `Tipo`. La relación se define utilizando el método `belongsTo`, que es una característica de Eloquent para modelar relaciones en la base de datos.

6. **Relación `denominacion`**:
    ```ts
    /**
     * Get the denominacion that owns the producto.
     */
    public function denominacion()
    {
        return $this->belongsTo(Denominacion::class);
    }
    ```
    - `public function denominacion()` define un método que establece una relación de pertenencia con el modelo `Denominacion`.
    - `return $this->belongsTo(Denominacion::class);` indica que cada `Producto` pertenece a una `Denominacion`. La relación se define utilizando el método `belongsTo`, que es una característica de Eloquent para modelar relaciones en la base de datos.

Este código define un modelo `Producto` en Laravel que:
- Extiende la clase base `Model` de Eloquent.
- Usa el trait `HasFactory` para habilitar la generación de instancias para pruebas.
- Está asociado con la tabla `productos` en la base de datos.
- Permite la asignación masiva de los campos `nombre`, `bodega`, `descripcion`, `maridaje`, `precio`, `graduacion`, `ano`, `sabor`, `tipo_id`, `imagen` y `denominacion_id`.
- Define relaciones de pertenencia con los modelos `Tipo` y `Denominacion`, indicando que un producto pertenece a un tipo y a una denominación.
:::


## Seeders

### DenominacionSeeder

```js
<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DenominacioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "nombre" => "Jumilla",
                "descripcion" => "Jumilla"
            ],
            [
                "nombre" => "Rioja",
                "descripcion" => "Rioja"
            ],
            [
                "nombre" => "Rivera del Duero",
                "descripcion" => "Duero"
            ],
            [
                "nombre" => "Rueda",
                "descripcion" => "Rueda"
            ],
            [
                "nombre" => "Toro",
                "descripcion" => "Toro"
            ],
            [
                "nombre" => "Cava",
                "descripcion" => "Cava"
            ],
            [
                "nombre" => "Alella",
                "descripcion" => "Alella"
            ],
            [
                "nombre" => "Penedés",
                "descripcion" => "Penedés"
            ],
        ];
        DB::table('denominaciones')->insert($data);
        //
    }
}
```

:::info Explicación del código

1. **Espacio de nombres y uso de clases**:
    ```ts
    namespace Database\Seeders;

    use Illuminate\Database\Console\Seeds\WithoutModelEvents;
    use Illuminate\Database\Seeder;
    use Illuminate\Support\Facades\DB;
    ```
    - `namespace Database\Seeders;` define el espacio de nombres para la clase `DenominacioSeeder`, indicando que pertenece al directorio `Database\Seeders`.
    - `use Illuminate\Database\Console\Seeds\WithoutModelEvents;` y `use Illuminate\Database\Seeder;` importan clases relacionadas con el seeding de bases de datos.
    - `use Illuminate\Support\Facades\DB;` importa el facade `DB` que proporciona métodos para interactuar con la base de datos.

2. **Definición de la clase `DenominacioSeeder`**:
    ```ts
    class DenominacioSeeder extends Seeder
    ```
    - `class DenominacioSeeder extends Seeder` define una clase llamada `DenominacioSeeder` que extiende la clase `Seeder` de Laravel. Esto permite utilizar las funcionalidades de seeding para poblar la base de datos con datos iniciales.

3. **Método `run`**:
    ```ts
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "nombre" => "Jumilla",
                "descripcion" => "Jumilla"
            ],
            [
                "nombre" => "Rioja",
                "descripcion" => "Rioja"
            ],
            [
                "nombre" => "Rivera del Duero",
                "descripcion" => "Duero"
            ],
            [
                "nombre" => "Rueda",
                "descripcion" => "Rueda"
            ],
            [
                "nombre" => "Toro",
                "descripcion" => "Toro"
            ],
            [
                "nombre" => "Cava",
                "descripcion" => "Cava"
            ],
            [
                "nombre" => "Alella",
                "descripcion" => "Alella"
            ],
            [
                "nombre" => "Penedés",
                "descripcion" => "Penedés"
            ],
        ];
        DB::table('denominaciones')->insert($data);
    }
    ```
    - El método `run` se ejecuta cuando se aplica el seeder. Su propósito es insertar datos en la base de datos.
    - `public function run(): void` define el método `run` que no retorna ningún valor (`void`).
    - Se define un arreglo `$data` que contiene varios arreglos asociativos. Cada arreglo asociativo representa un registro que será insertado en la tabla `denominaciones`.
    - `DB::table('denominaciones')->insert($data);` inserta los datos definidos en `$data` en la tabla `denominaciones` usando el facade `DB`.

En resumen, este código define un seeder `DenominacioSeeder` en Laravel que:
- Extiende la clase base `Seeder` de Laravel.
- Define un método `run` que inserta múltiples registros en la tabla `denominaciones` de la base de datos.
- Los datos insertados son nombres y descripciones de diferentes denominaciones de origen, como "Jumilla", "Rioja", "Rivera del Duero", etc.

Este seeder puede ser ejecutado usando el comando `php artisan db:seed --class=DenominacioSeeder` para poblar la tabla `denominaciones` con los datos especificados.

### TipoSeeder

```js
<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $data=[
            [
            "nombre"=>"Blanco",
            "descripcion"=>"Blanco"
            ],
            [
                "nombre"=>"Tinto",
                "descripcion"=>"Tinto"
                ],
            [
            "nombre"=>"Rosado",
            "descripcion"=>"Rosado"
            ],
            [
            "nombre"=>"Cava",
            "descripcion"=>"Cava"
            ],
            [
            "nombre"=>"Bloque IV",
            "descripcion"=>"Sistemas y comunicaciones"
            ],
        ];
        DB::table('tipos')->insert($data);
    }
}
```

### UserSeeder

```js
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User; // Asegúrate de importar el modelo User
use Faker\Factory as Faker;

class UsersSeeder extends Seeder
{
    public function run()
    {
        
        //Crear usuario administrador
        User::create([
            'name' => 'admin',
            'email' => 'admin@test.com',
            'password' => bcrypt('admin_password'), // Puedes establecer una contraseña predeterminada
              
        ]);
        
        $faker = Faker::create();

        // Genera 20 usuarios de prueba
        for ($i = 0; $i < 20; $i++) {
            User::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => bcrypt('password') // Puedes establecer una contraseña predeterminada
            ]);
        }
    }
}
```
:::info Explicación del código

1. **Espacio de nombres y uso de clases**:
    ```ts
    namespace Database\Seeders;

    use Illuminate\Database\Seeder;
    use App\Models\User; // Asegúrate de importar el modelo User
    use Faker\Factory as Faker;
    ```
    - `namespace Database\Seeders;` define el espacio de nombres para la clase `UsersSeeder`, indicando que pertenece al directorio `Database\Seeders`.
    - `use Illuminate\Database\Seeder;` importa la clase `Seeder` de Laravel, que es la clase base para todos los seeders.
    - `use App\Models\User;` importa el modelo `User`, que se utilizará para crear registros en la tabla de usuarios.
    - `use Faker\Factory as Faker;` importa la fábrica de Faker, una biblioteca utilizada para generar datos falsos.

2. **Definición de la clase `UsersSeeder`**:
    ```ts
    class UsersSeeder extends Seeder
    ```
    - `class UsersSeeder extends Seeder` define una clase llamada `UsersSeeder` que extiende la clase `Seeder` de Laravel. Esto permite utilizar las funcionalidades de seeding para poblar la base de datos con datos iniciales.

3. **Método `run`**:
    ```ts
    public function run()
    {
        //Crear usuario administrador
        User::create([
            'name' => 'admin',
            'email' => 'admin@test.com',
            'password' => bcrypt('admin_password'), // Puedes establecer una contraseña predeterminada
        ]);
        
        $faker = Faker::create();

        // Genera 20 usuarios de prueba
        for ($i = 0; $i < 20; $i++) {
            User::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => bcrypt('password') // Puedes establecer una contraseña predeterminada
            ]);
        }
    }
    ```
    - `public function run()` define el método `run`, que se ejecuta cuando se aplica el seeder. Su propósito es insertar datos en la base de datos.
    - La primera acción dentro del método `run` es crear un usuario administrador con datos predefinidos:
        ```ts
        User::create([
            'name' => 'admin',
            'email' => 'admin@test.com',
            'password' => bcrypt('admin_password'), // Puedes establecer una contraseña predeterminada
        ]);
        ```
        - `User::create([...])` crea un nuevo registro en la tabla `users` utilizando el modelo `User`.
        - `bcrypt('admin_password')` encripta la contraseña para almacenarla de forma segura.
    - Luego, se crea una instancia de Faker para generar datos falsos:
        ```ts
        $faker = Faker::create();
        ```
    - A continuación, se utiliza un bucle `for` para generar 20 usuarios de prueba:
        ```ts
        for ($i = 0; $i < 20; $i++) {
            User::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => bcrypt('password') // Puedes establecer una contraseña predeterminada
            ]);
        }
        ```
        - Dentro del bucle, `User::create([...])` crea un nuevo usuario con datos generados por Faker.
        - `name` se genera utilizando `$faker->name`.
        - `email` se genera utilizando `$faker->unique()->safeEmail` para asegurar que cada correo electrónico sea único.
        - `password` se establece como `'password'` y se encripta utilizando `bcrypt`.

En resumen, este código define un seeder `UsersSeeder` en Laravel que:
- Extiende la clase base `Seeder` de Laravel.
- Define un método `run` que crea un usuario administrador con datos predefinidos.
- Utiliza la biblioteca Faker para generar y crear 20 usuarios de prueba con nombres y correos electrónicos aleatorios, y contraseñas predeterminadas encriptadas.

Este seeder puede ser ejecutado usando el comando `php artisan db:seed --class=UsersSeeder` para poblar la tabla `users` con los datos especificados.
:::

### DatabaseSeeder

```js
<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call(TipoSeeder::class);
        $this->call(DenominacioSeeder::class);
        $this->call(UsersSeeder::class);
      
    }
}
```

## Controllers

### DenominacionController

```js
<?php

namespace App\Http\Controllers;

use App\Models\Denominacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DenominacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $denominaciones = Denominacion::all();
        return response()->json($denominaciones);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $denominacion = Denominacion::create($validator->validated());

        return response()->json($denominacion, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $denominacion = Denominacion::findOrFail($id);
        return response()->json($denominacion);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $denominacion = Denominacion::find($id);
        if ($denominacion) {
            $denominacion->update($request->all());
            return response()->json($denominacion);
        } else {
            return response()->json(['message' => 'Denominación no encontrada'], 404);
        }
        return response()->json($denominacion);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $denominacion = Denominacion::findOrFail($id);
        $denominacion->delete();

        return response()->json(null, 204);
    }
}
```


### TipoController

```js
<?php

namespace App\Http\Controllers;

use App\Models\Tipo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TipoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tipos = Tipo::all();
        return response()->json($tipos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $tipo = Tipo::create($validator->validated());

        return response()->json($tipo, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $tipo = Tipo::findOrFail($id);
        return response()->json($tipo);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $tipo = Tipo::find($id);
        if ($tipo) {
            $tipo->update($request->all());
            return response()->json($tipo);
        } else {
            return response()->json(['message' => 'Tipo no encontrada'], 404);
        }

    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $tipo = Tipo::find($id);
        if($tipo){
            $tipo->delete();
            return response()->json(null, 204);
        }
        return response()->json(null, 404);
    }
}
```
### ProductoController

```js
<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductoController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->query('per_page', 15); // Número de elementos por página, por defecto 15
        $productos = Producto::paginate($perPage);
        return response()->json($productos);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'bodega' => 'nullable|string|max:255',
            'descripcion' => 'required|string',
            'maridaje' => 'required|string',
            'precio' => 'required|numeric',
            'graduacion' => 'required|numeric',
            'ano' => 'nullable|integer',
            'sabor' => 'nullable|string|max:255',
            'tipo_id' => 'required|exists:tipos,id',
            'file' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'denominacion_id' => 'required|exists:denominaciones,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Procesar y guardar la imagen
        $fileUrl = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('imagenes', 'public');
            $fileUrl = url('storage/' . $filePath);
        }

        $producto = Producto::create([
            'nombre' => $request->nombre,
            'bodega' => $request->bodega,
            'descripcion' => $request->descripcion,
            'maridaje' => $request->maridaje,
            'precio' => $request->precio,
            'graduacion' => $request->graduacion,
            'ano' => $request->ano,
            'sabor' => $request->sabor,
            'tipo_id' => $request->tipo_id,
            'imagen' => $fileUrl ?? null,
            'denominacion_id' => $request->denominacion_id,
        ]);

        return response()->json($producto, 201); // 201 Created
    }

    public function show($id): JsonResponse
    {
        $producto = Producto::find($id);
        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        return response()->json($producto);
    }

    public function update(Request $request, Producto $producto): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'bodega' => 'nullable|string|max:255',
            'descripcion' => 'required|string',
            'maridaje' => 'required|string',
            'precio' => 'required|numeric',
            'graduacion' => 'required|numeric',
            'ano' => 'nullable|integer',
            'sabor' => 'nullable|string|max:255',
            'tipo_id' => 'required|exists:tipos,id',
            'denominacion_id' => 'required|exists:denominaciones,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Procesar y guardar la nueva imagen si se ha cargado
        if ($request->hasFile('file')) {
            // Eliminar la imagen antigua si existe
            if ($producto->imagen) {
                Storage::disk('public')->delete($producto->imagen);
            }

            // Guardar la nueva imagen
            $filePath = $request->file('file')->store('imagenes', 'public');
            $producto->imagen = $filePath;
        }

        $producto->update($validator->validated());

        return response()->json($producto);
    }

    public function destroy($id): JsonResponse
    {
        $producto = Producto::find($id);
        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        // Eliminar la imagen asociada si existe
        if ($producto->imagen) {
            $imagePath = 'imagenes/' . basename($producto->imagen);
            if (Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
        }

        $producto->delete();

        return response()->json(null, 204); // 204 No Content
    }
}

```
