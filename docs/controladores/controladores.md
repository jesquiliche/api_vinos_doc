---
sidebar_position: 6
---

# Controladores

## ¿Qué es un controlador?

Un **controlador** en Laravel es una clase PHP que se encarga de manejar las solicitudes HTTP y proporcionar una respuesta apropiada. Los controladores se utilizan para agrupar el lógica de negocios y proporcionar un punto de acceso central para el manejo de solicitudes **HTTP**.

Un controlador puede contener varios métodos, cada uno de los cuales se ejecutará en respuesta a una solicitud HTTP específica. Por ejemplo, puedes tener un controlador que maneje las solicitudes para ver, crear, actualizar y eliminar registros de una tabla de la base de datos.

Para crear un controlador en Laravel, debes usar el comando php artisan make:controller seguido del nombre del controlador. Por ejemplo, para crear un controlador llamado **ProductosController**, ejecutarías el siguiente comando:

```bash
php artisan make:controller ProductosController
```

Una vez creado el controlador, puedes agregar métodos para manejar diferentes solicitudes HTTP. Por ejemplo, puedes tener un método index que muestre una lista de productos y un método store que almacene un nuevo producto en la base de datos.

Para hacer una solicitud HTTP a un controlador, debes definir una ruta en el archivo routes/web.php o routes/api.php según corresponda que apunte a un método específico en el controlador. Por ejemplo, para hacer una solicitud GET a /productos y ejecutar el método index en el controlador ProductosController, podrías agregar la siguiente ruta:

```bash
Route::get('/productos', 'ProductosController@index');
```

El controlador es una parte importante de la arquitectura de Laravel y se utiliza para separar la lógica de negocios de la lógica de presentación, lo que ayuda a mantener tu aplicación limpia y organizada.

## Creación de un controladores REST

### ColorController

Para crear el controlador teclee el siguiente comando en su terminal:

```bash
php artisan make:controller Api/V1/ColorController --resource
```

La opción --resource le indica a la Laravel que cree los métodos necesarios para crear un CRUD.

Diríjase a la carpeta **App\Http\Controllers\Api\V1** y edite el archivo CategoriaController.

Seguidamente comentaremos paso a paso los para crear el controlador:

```js
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Color; // Asegúrate de importar el modelo Color
use Illuminate\Support\Facades\Validator;


class ColorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * Método: index
     * Ruta asociada: GET /colors
     * Descripción: Este método muestra una lista de recursos (en este caso, colores).
     */
    public function index()
    {
        // Recuperar todos los colores desde la base de datos y retornarlos como una respuesta JSON
        $colores = Color::orderBy('nombre')->get;
        return response()->json(['colores' => $colores]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * Método: create
     * Ruta asociada: GET /colors/create
     * Descripción: Este método muestra el formulario para crear un nuevo recurso (color).
     */

    public function store(Request $request)
    {
        // Validación de los datos del nuevo color (por ejemplo, nombre, código de color).
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255|unique:colores'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }

        //Debe estar configurado fillable en el modelo para
        //utilizar inserción masiva

        $color=Color::create($request->all());

        // Retornar una respuesta JSON que confirma la creación exitosa del color.
        return response()->json(['message' => 'Color creado con éxito', 'color' => $color],201);
    }

    /**
     * Display the specified resource.
     *
     * Método: show
     * Ruta asociada: GET /colors/{id}
     * Descripción: Este método muestra un recurso (color) específico identificado por su ID.
     */
    public function show(string $id)
    {
        // Buscar el color por su ID en la base de datos y retornarlo como una respuesta JSON.
        $color = Color::find($id);

        if (!$color) {
            return response()->json(['message' => 'Color no encontrado'], 404);
        }


        return response()->json(['color' => $color]);
    }


    /**
     * Update the specified resource in storage.
     *
     * Método: update
     * Ruta asociada: PUT/PATCH /colors/{id}
     * Descripción: Este método actualiza un recurso (color) específico identificado por su ID en el almacenamiento.
     */
    public function update(Request $request, string $id)
    {
        // Validación de los datos actualizados del color.
        $validator = Validator::make($request->all(),[
            'nombre' => 'required|string|max:255|unique:colores'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }


        // Buscar el color por su ID en la base de datos.
        $color = Color::find($id);

        if (!$color) {
            return response()->json(['message' => 'Color no encontrado'], 404);
        }

        // Actualizar los datos del color con los datos validados.
        $color->update($request->all());

        // Retornar una respuesta JSON que confirma la actualización exitosa del color.
        return response()->json(['message' => 'Color actualizado con éxito', 'color' => $color]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * Método: destroy
     * Ruta asociada: DELETE /colors/{id}
     * Descripción: Este método elimina un recurso (color) específico identificado por su ID del almacenamiento.
     */
    public function destroy(string $id)
    {
        // Buscar el color por su ID en la base de datos.
        $color = Color::find($id);

        if (!$color) {
            return response()->json(['message' => 'Color no encontrado'], 404);
        }

        if ($color->cervezas()->exists()) {
            return response()->json(['message' => 'No se pudo borrar el color, tiene cervezas relacionadas'],400);
        }
        // Eliminar el color de la base de datos.
        $color->delete();

        // Retornar una respuesta JSON que confirma la eliminación exitosa del color.
        return response()->json(['message' => 'Color eliminado con éxito']);
    }
}
```

1. Hemos añadido dos clases: Color y la clase Validator.

:::tip La clase validator
La clase `Validator` en Laravel es una parte fundamental del sistema de validación de datos de Laravel. Proporciona una forma conveniente y poderosa de validar los datos de entrada de una solicitud antes de procesarlos o almacenarlos en la base de datos. Laravel utiliza esta clase para llevar a cabo la validación de datos, y es ampliamente utilizada en controladores, formularios, y en otros lugares donde es necesario garantizar la integridad de los datos.

Aquí hay algunas características y conceptos clave relacionados con la clase `Validator` en Laravel:

1. **Creación de un Validador**: Puedes crear una instancia de la clase `Validator` pasando los datos que deseas validar y las reglas de validación. Las reglas de validación se definen como un array asociativo donde las claves son los nombres de los campos y los valores son las reglas de validación que se deben aplicar.

   ```php
   $validator = Validator::make($data, [
       'nombre' => 'required|string|max:255',
       'correo' => 'required|email|unique:users',
   ]);
   ```

2. **Reglas de Validación**: Las reglas de validación son expresiones que especifican cómo se debe validar un campo. Laravel proporciona una amplia variedad de reglas de validación predefinidas, como 'required', 'numeric', 'email', 'unique', 'max', 'min', entre otras. También puedes crear tus propias reglas de validación personalizadas si es necesario.

3. **Mensajes de Error Personalizados**: Puedes personalizar los mensajes de error para cada regla de validación si deseas proporcionar mensajes más descriptivos.

   ```php
   $messages = [
       'nombre.required' => 'El nombre es obligatorio.',
       'correo.email' => 'El correo debe ser una dirección de correo electrónico válida.',
   ];
   ```

4. **Evaluación de Validación**: Una vez que has creado una instancia del validador, puedes evaluar la validación utilizando el método `validate()`. Este método devolverá `true` si la validación es exitosa y lanzará una excepción `ValidationException` si la validación falla.

   ```php
   if ($validator->validate()) {
       // La validación fue exitosa
   }
   ```

5. **Recuperación de Errores**: Si la validación falla, puedes recuperar los errores generados por el validador. Esto es útil para mostrar mensajes de error al usuario.

   ```php
   if ($validator->fails()) {
       $errors = $validator->errors();
       // Puedes acceder a los errores individualmente, por ejemplo: $errors->first('nombre')
   }
   ```

6. **Validación en Controladores**: La validación se usa comúnmente en controladores para garantizar que los datos de entrada cumplan con ciertas reglas antes de procesarlos o almacenarlos en la base de datos. Esto ayuda a mantener la integridad de los datos y a prevenir problemas de seguridad.

7. **Middleware de Validación**: Laravel también proporciona middleware de validación que se puede utilizar para validar los datos antes de que lleguen al controlador. Esto es especialmente útil para formularios web y API.

8. **Personalización de Reglas de Validación**: Puedes personalizar las reglas de validación y crear reglas personalizadas si tus requisitos son más específicos que las reglas de validación predefinidas.
   :::

:::tip Reglas de validación más comunes
Claro, aquí tienes ejemplos de algunas de las reglas de validación más comunes en Laravel:

1. **required**: El campo debe estar presente y no puede estar en blanco.

```php
'nombre' => 'required'
```

2. **email**: El campo debe ser una dirección de correo electrónico válida.

```php
'correo' => 'email'
```

3. **numeric**: El campo debe ser un valor numérico.

```php
'edad' => 'numeric'
```

4. **alpha**: El campo debe contener solo letras del alfabeto.

```php
'nombre' => 'alpha'
```

5. **integer**: El campo debe ser un número entero.

```php
'cantidad' => 'integer'
```

6. **min:valor**: El campo debe tener un valor numérico mayor o igual que "valor".

```php
'edad' => 'min:18'
```

7. **max:valor**: El campo debe tener un valor numérico menor o igual que "valor".

```php
'puntaje' => 'max:100'
```

8. **between:min,max**: El campo debe tener un valor numérico que esté dentro del rango especificado.

```php
'nota' => 'between:0,10'
```

9. **in:foo,bar,...**: El campo debe estar en la lista de valores permitidos.

```php
'color' => 'in:rojo,verde,azul'
```

10. **not_in:foo,bar,...**: El campo no debe estar en la lista de valores prohibidos.

```php
'rol' => 'not_in:admin,superadmin'
```

11. **date**: El campo debe ser una fecha válida.

```php
'fecha_nacimiento' => 'date'
```

12. **before:date**: El campo debe ser una fecha anterior a la fecha especificada.

```php
'fecha_vencimiento' => 'before:2023-12-31'
```

13. **after:date**: El campo debe ser una fecha posterior a la fecha especificada.

```php
'fecha_inicio' => 'after:2023-01-01'
```

Estos son solo ejemplos de algunas reglas de validación comunes en Laravel. Puedes combinar varias reglas en una sola validación y personalizar los mensajes de error según tus necesidades específicas. La validación de datos es una parte fundamental de cualquier aplicación web para garantizar la integridad de los datos recibidos.
:::

### TipoController

Para crear el controlador teclee el siguiente comando en su terminal:

```bash
php artisan make:controller Api/V1/TipoController
```

Diríjase al controlador creado, editelo y copie el siguiente código:

```js
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tipo;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TipoController extends Controller
{
    //Introducir solo si esta instalado JWT
    public function __construct()
    {
        $this->middleware('auth:api')->only(['store', 'destroy']);
    }

    public function index(Request $request)
    {
        // Recopila parámetros de consulta desde la solicitud
        $perPage = $request->input('per_page', 40);
        $page = $request->input('page', 1);

        // Construye una consulta utilizando el Query Builder de Laravel
        $query = DB::table('tipos as tip')
            ->select('*')
            ->orderBy('tip.nombre');

        // Realiza una paginación de los resultados
        $results = $query->paginate($perPage, ['*'], 'page', $page);

        // Devuelve una respuesta JSON con los resultados paginados
        return response()->json($results);
    }

    public function store(Request $request)
    {
        // Validación de los datos del nuevo tipo (por ejemplo, nombre, código de tipo).
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:150|unique:tipos'
        ]);
        
        if($validator->fails()){
            return response()->json($validator->errors(),422); 
        }

        //Debe estar configurado fillable en el modelo para 
        //utilizar inserción masiva
        $tipo=Tipo::create($request->all());
       
        // Retornar una respuesta JSON que confirma la creación exitosa del tipo.
        return response()->json(['message' => 'Tipo creado con éxito', 'tipo' => $tipo]);
    }

    public function show(string $id)
    {
        // Buscar el tipo por su ID en la base de datos y retornarlo como una respuesta JSON.
        $tipo = Tipo::find($id);

        if (!$tipo) {
            return response()->json(['message' => 'Tipo no encontrado'], 404);
        }


        return response()->json(['Tipo' => $tipo]);
    }

    public function update(Request $request, string $id)
{
    // Validación de los datos actualizados del tipo.
    $validator = Validator::make($request->all(), [
        'nombre' => 'required|string|max:100',
        'descripcion' => 'required|string',
    ]);

    
    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    // Buscar el tipo por su ID en la base de datos.
    $tipo = Tipo::find($id);

    if (!$tipo) {
        return response()->json(['message' => 'tipo no encontrado'], 404);
    }
    
    $tipo->nombre = $request->input('nombre');
    $tipo->descripcion = $request->input('descripcion');
    $tipo->save();
    
    return response()->json(['message' => 'Tipo actualizado con éxito', 'tipo' => $tipo]);
}

    public function destroy(string $id)
    {
        // Buscar el tipo por su ID en la base de datos.
        $tipo = Tipo::find($id);

        if (!$tipo) {
            return response()->json(['message' => 'Tipo no encontrado'], 404);
        }

        if ($tipo->cervezas()->exists()) {
            return response()->json(['message' => 'No se pudo borrar el tipo, tiene cervezas relacionadas'],400);
        }
        // Eliminar el tipo de la base de datos.
        $tipo->delete();

        // Retornar una respuesta JSON que confirma la eliminación exitosa del tipo.
        return response()->json(['message' => 'Tipo eliminado con éxito']);
    }
}
```
:::info Explicación del código
Este controlador en Laravel, denominado `TipoController`, maneja las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para el modelo `Tipo` en una API. Aquí hay una explicación paso a paso de sus métodos:

1. **Namespace y Uso de Clases:**
   ```js
   namespace App\Http\Controllers\Api\V1;

   use App\Http\Controllers\Controller;
   use Illuminate\Http\Request;
   use App\Models\Tipo;
   use Illuminate\Support\Facades\DB;
   use Illuminate\Support\Facades\Validator;
   ```

   - El controlador está en el namespace `App\Http\Controllers\Api\V1`.
   - Extiende la clase base `Controller` de Laravel.
   - Utiliza el modelo `Tipo` y clases adicionales para manejar validación y consultas de base de datos.

2. **Constructor y Middleware:**
   ```js
   //Solo si esta configurado JWT
   public function __construct()
   {
       $this->middleware('auth:api')->only(['store', 'destroy']);
   }
   ```

   - El constructor establece un middleware para autenticación en los métodos `store` y `destroy`. Esto significa que se requiere autenticación API para realizar estas operaciones. Utilizar solo si esta configurado JWT, el cual veremos en un próximo capitulo

3. **Método `index`:**
   ```js
   public function index(Request $request)
   {
       // Recopila parámetros de consulta desde la solicitud
       $perPage = $request->input('per_page', 40);
       $page = $request->input('page', 1);

       // Construye una consulta utilizando el Query Builder de Laravel
       $query = DB::table('tipos as tip')
           ->select('*')
           ->orderBy('tip.nombre');

       // Realiza una paginación de los resultados
       $results = $query->paginate($perPage, ['*'], 'page', $page);

       // Devuelve una respuesta JSON con los resultados paginados
       return response()->json($results);
   }
   ```

   - Este método maneja la obtención paginada de todos los tipos.
   - Lee parámetros de consulta para paginación.
   - Utiliza el Query Builder para construir la consulta y la ordena por el nombre.
   - Retorna los resultados paginados como respuesta JSON.

4. **Método `store`:**
   ```js
   public function store(Request $request)
   {
       // Validación de los datos del nuevo tipo (por ejemplo, nombre, código de tipo).
       $validator = Validator::make($request->all(), [
           'nombre' => 'required|string|max:150|unique:tipos'
       ]);
       
       if($validator->fails()){
           return response()->json($validator->errors(), 422); 
       }

       // Debe estar configurado fillable en el modelo para 
       // utilizar inserción masiva
       $tipo = Tipo::create($request->all());
      
       // Retornar una respuesta JSON que confirma la creación exitosa del tipo.
       return response()->json(['message' => 'Tipo creado con éxito', 'tipo' => $tipo]);
   }
   ```

   - Este método maneja la creación de un nuevo tipo.
   - Realiza validación utilizando el componente Validator de Laravel.
   - Crea un nuevo tipo utilizando inserción masiva si la validación es exitosa.
   - Retorna una respuesta JSON indicando el éxito y el nuevo tipo creado.

5. **Método `show`:**
   ```js
   public function show(string $id)
   {
       // Buscar el tipo por su ID en la base de datos y retornarlo como una respuesta JSON.
       $tipo = Tipo::find($id);

       if (!$tipo) {
           return response()->json(['message' => 'Tipo no encontrado'], 404);
       }

       return response()->json(['Tipo' => $tipo]);
   }
   ```

   - Maneja la obtención de un tipo por su ID.
   - Retorna una respuesta JSON con el tipo si es encontrado, de lo contrario, devuelve un mensaje de error.

6. **Método `update`:**
   ```js
   public function update(Request $request, string $id)
   {
       // Validación de los datos actualizados del tipo.
       $validator = Validator::make($request->all(), [
           'nombre' => 'required|string|max:100',
           'descripcion' => 'required|string',
       ]);

       if ($validator->fails()) {
           return response()->json($validator->errors(), 422);
       }

       // Buscar el tipo por su ID en la base de datos.
       $tipo = Tipo::find($id);

       if (!$tipo) {
           return response()->json(['message' => 'Tipo no encontrado'], 404);
       }
       
       $tipo->nombre = $request->input('nombre');
       $tipo->descripcion = $request->input('descripcion');
       $tipo->save();

       // Actualizar los datos del tipo con los datos validados.
       // $tipo->update($request->all());

       // Retornar una respuesta JSON que confirma la actualización exitosa del tipo.
       return response()->json(['message' => 'Tipo actualizado con éxito', 'tipo' => $tipo]);
   }
   ```

   - Maneja la actualización de un tipo por su ID.
   - Realiza validación utilizando el componente Validator de Laravel.
   - Busca el tipo en la base de datos y actualiza sus atributos si es encontrado.
   - Retorna una respuesta JSON indicando el éxito y el tipo actualizado.

7. **Método `destroy`:**

   ```js
   
   public function destroy(string $id)
   {
       // Buscar el tipo por su ID en la base de datos.
       $tipo = Tipo::find($id);

       if (!$tipo) {
           return response()->json(['message' => 'Tipo no encontrado'], 404);
       }

       if ($tipo->cervezas()->exists()) {
           return response()->json(['message' => 'No se pudo borrar el tipo, tiene cervezas relacionadas'], 400);
       }
       // Eliminar el tipo de la base de datos.
       $tipo->delete();

       // Retornar una respuesta JSON que confirma la eliminación exitosa del tipo.
       return response()->json(['message' => 'Tipo elimin

ado con éxito']);
   }
   ```

   - Maneja la eliminación de un tipo por su ID.
   - Verifica si existen cervezas relacionadas antes de intentar la eliminación.
   - Elimina el tipo de la base de datos si es encontrado.
   - Retorna una respuesta JSON indicando el éxito y el mensaje de eliminación.
:::

### PaisController

Para crear el controlador teclee el siguiente comando en su terminal:

```bash
php artisan make:controller Api/V1/PaisController
```

Diríjase al controlador creado, editelo y copie el siguiente código:

```js
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pais;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PaisController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api')->only(['store', 'destroy', 'update']);
    }


 public function index(Request $request)
 {
     // Recopila parámetros de consulta desde la solicitud
     $perPage = $request->input('per_page', 20);
     $page = $request->input('page', 1);
 
     // Construye una consulta utilizando el Query Builder de Laravel
     $query = DB::table('paises as p')
         ->select('*')
         ->orderBy('p.nombre');
 
     // Realiza una paginación de los resultados
     $results = $query->paginate($perPage, ['*'], 'page', $page);
 
     // Devuelve una respuesta JSON con los resultados paginados
     return response()->json($results);
 }
 
    public function store(Request $request)
    {
        // Validación de los datos del nuevo pais (por ejemplo, nombre, código de pais).
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255|unique:paises'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //Debe estar configurado fillable en el modelo para 
        //utilizar inserción masiva
        $tipo = Pais::create($request->all());

        // Retornar una respuesta JSON que confirma la creación exitosa del pais.
        return response()->json(['message' => 'País creado con éxito', 'pais' => $tipo]);
    }


    public function show(string $id)
    {
        // Buscar el pais por su ID en la base de datos y retornarlo como una respuesta JSON.
        $pais = Pais::find($id);

        if (!$pais) {
            return response()->json(['message' => 'país no encontrado'], 404);
        }

        return response()->json(['País' => $pais]);
    }


    public function update(Request $request, string $id)
    {
        // Validación de los datos actualizados del tipo.
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }


        // Buscar el pais por su ID en la base de datos.
        $pais = Pais::find($id);

        if (!$pais) {
            return response()->json(['message' => 'Pais no encontrado'], 404);
        }

        // Actualizar los datos del pais con los datos validados.
        $pais->update($request->all());

        // Retornar una respuesta JSON que confirma la actualización exitosa del pais.
        return response()->json(['message' => 'País actualizado con éxito', 'pais' => $pais]);
    }


    public function destroy(string $id)
    {
        // Buscar el pais por su ID en la base de datos.
        $pais = Pais::find($id);

        if (!$pais) {
            return response()->json(['message' => 'País no encontrado'], 404);
        }

        if ($pais->cervezas()->exists()) {
            return response()->json(['message' => 'No se pudo borrar el país, tiene cervezas relacionadas'], 400);
        }
        // Eliminar el pais de la base de datos.
        $pais->delete();

        // Retornar una respuesta JSON que confirma la eliminación exitosa del tipo.
        return response()->json(['message' => 'País eliminado con éxito']);
    }
}

```

### GraduacionController

Para crear el controlador teclee el siguiente comando en su terminal:

```bash
php artisan make:controller Api/V1/GraduaciónController
```

Diríjase al controlador creado, editelo y copie el siguiente código:

```js
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Graduacion;
use Illuminate\Support\Facades\Validator;


class GraduacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * Método: index
     * Ruta asociada: GET /tipos
     * Descripción: Este método muestra una lista de recursos (en este caso, tipoes).
     */
    public function index()
    {
        // Recuperar todos los tipoes desde la base de datos y retornarlos como una respuesta JSON
        $graduaciones = Graduacion::orderBy('nombre')->get();
        return response()->json(['graduaciones' => $graduaciones]);
    }


    public function store(Request $request)
    {
        // Validación de los datos del nuevo tipo (por ejemplo, nombre, código de tipo).
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:150|unique:tipos'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }

        //Debe estar configurado fillable en el modelo para
        //utilizar inserción masiva
        $graduacion=Graduacion::create($request->all());

        // Retornar una respuesta JSON que confirma la creación exitosa del tipo.
        return response()->json(['message' => 'Graduación creado con éxito', 'graduacion' => $graduacion]);
    }

    /**
     * Display the specified resource.
     *
     * Método: show
     * Ruta asociada: GET /tipos/{id}
     * Descripción: Este método muestra un recurso (tipo) específico identificado por su ID.
     */
    public function show(string $id)
    {
        // Buscar el tipo por su ID en la base de datos y retornarlo como una respuesta JSON.
        $graduacion = Graduacion::find($id);

        if (!$graduacion) {
            return response()->json(['message' => 'Graduación no encontrado'], 404);
        }


        return response()->json(['Tipo' => $graduacion]);
    }


    /**
     * Update the specified resource in storage.
     *
     * Método: update
     * Ruta asociada: PUT/PATCH /itposs/{id}
     * Descripción: Este método actualiza un recurso (tipo) específico identificado por su ID en el almacenamiento.
     */
    public function update(Request $request, string $id)
    {
        // Validación de los datos actualizados del tipo.
        $validator = Validator::make($request->all(),[
            'nombre' => 'required|string|max:150|unique:graduaciones'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }


        // Buscar el tipo por su ID en la base de datos.
        $graduacion = Graduacion::find($id);

        if (!$graduacion) {
            return response()->json(['message' => 'graduación no encontrada'], 404);
        }

        // Actualizar los datos del tipo con los datos validados.
        $graduacion->update($request->all());

        // Retornar una respuesta JSON que confirma la actualización exitosa del tipo.
        return response()->json(['message' => 'Graduación actualizado con éxito', 'graduacion' => $graduacion]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * Método: destroy
     * Ruta asociada: DELETE /tipos/{id}
     * Descripción: Este método elimina un recurso (tipo) específico identificado por su ID del almacenamiento.
     */
    public function destroy(string $id)
    {
        // Buscar el tipo por su ID en la base de datos.

        $graduacion = Graduacion::find($id);

        if (!$graduacion) {
            return response()->json(['message' => 'Graduación no encontrada'], 404);
        }

        if ($graduacion->cervezas()->exists()) {
            return response()->json(['message' => 'No se pudo borrar la graduación, tiene cervezas relacionadas'],400);
        }


        // Eliminar el tipo de la base de datos.
        $graduacion->delete();

        // Retornar una respuesta JSON que confirma la eliminación exitosa del tipo.
        return response()->json(['message' => 'Graduación eliminado con éxito']);
    }
}
```

### ProvinciaController

Para crear el controlador teclee el siguiente comando en su terminal:

```bash
php artisan make:controller Api/V1/ProvinciaController
```

Diríjase al controlador creado, editelo y copie el siguiente código:

```js
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Provincia;
use Illuminate\Http\Request;

class ProvinciaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        // Recupera todas las provincias desde la base de datos y las devuelve como una respuesta JSON ordenadas por nombre
        return Provincia::orderBy('nombre')->get();
    }

    
}
```

### PoblacionController

Para crear el controlador teclee el siguiente comando en su terminal:

```bash
php artisan make:controller Api/V1/PoblacionController
```

Diríjase al controlador creado, editelo y copie el siguiente código:

```js
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Poblacion;

class PoblacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $provincia = $request->input('provincia', ''); // Valor predeterminado es una cadena vacía

        return Poblacion::where('provincia_cod', $provincia)->orderBy('nombre')->get();
    }
}
```
### SystemController

Para crear el controlador teclee el siguiente comando en su terminal:

```bash
php artisan make:controller Api/V1/SystemController
```

Diríjase al controlador creado, editelo y copie el siguiente código:

```js
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class SystemController extends Controller
{
    public function consultaCervezasPorPais()
    {
        $resultados = DB::select("
            SELECT COUNT(*) as value, p.nombre as name
            FROM cervezas as cer
            INNER JOIN paises AS p ON cer.pais_id = p.id
            GROUP BY cer.pais_id, p.nombre
            ORDER BY p.nombre
        ");

        return response()->json($resultados);
    }

  
    public function consultaCervezasPorTipo()
    {
        $resultados = DB::select("
            SELECT COUNT(*) as value, t.nombre as name
            FROM cervezas as cer
            INNER JOIN tipos AS t ON cer.tipo_id = t.id
            GROUP BY cer.tipo_id, t.nombre
            ORDER BY t.nombre
        ");

        return response()->json($resultados);
    }

 
    public function consultaBD()
    {
        $databaseName = env('DB_DATABASE');
        $resultados = DB::select("
            SELECT 
            table_name,
            table_rows,
            data_length / (1024 * 1024) AS data_size_mb,
            index_length / (1024 * 1024) AS index_size_mb
            FROM information_schema.tables
            WHERE table_schema = '{$databaseName}'
            AND table_type = 'BASE TABLE'; -- Solo tablas, no vistas ni tablas de sistema;
        ");

        return response()->json($resultados);
    }

 
    public function consultaTablas()
    {
        $databaseName = env('DB_DATABASE');
    
        $resultados = DB::select("
            SELECT table_name, table_rows
            FROM information_schema.tables
            WHERE table_schema = '{$databaseName}'
              AND table_type = 'BASE TABLE'; -- Solo tablas, no vistas ni tablas de sistema
        ");
    
        return response()->json($resultados);
    }
    
};
```

## Transacciones y subida de archivos

En el controlador CervezaController estudiaremos y experimentaremos con conceptos fundamentales relacionados con nuestros controladores.

:::tip ¿Què es una transacción?

Una transacción en bases de datos es una secuencia de operaciones que se ejecutan como una única unidad lógica e indivisible. Estas operaciones pueden ser tanto lecturas como escrituras en la base de datos. La idea fundamental detrás de las transacciones es garantizar la consistencia y la integridad de los datos, incluso en el caso de fallos o errores.

Aquí hay algunos conceptos clave relacionados con las transacciones en bases de datos:

1. **Atomicidad:**

   - Una transacción se considera atómica, lo que significa que todas sus operaciones se realizan como una sola unidad.
   - Si alguna parte de la transacción falla, todas las operaciones realizadas hasta ese punto se deshacen, y la base de datos vuelve a su estado anterior a la transacción.

2. **Consistencia:**

   - La consistencia asegura que una transacción lleve la base de datos desde un estado válido a otro estado válido.
   - Las reglas y restricciones de la base de datos deben mantenerse después de cada transacción.

3. **Aislamiento:**

   - Cada transacción se ejecuta de manera aislada de otras transacciones concurrentes.
   - Este concepto ayuda a evitar que los resultados de una transacción sean visibles para otras transacciones hasta que se complete.

4. **Durabilidad:**
   - La durabilidad garantiza que una vez que una transacción se ha completado correctamente, sus efectos persistirán incluso en caso de fallo del sistema o reinicio.
   - Los cambios realizados por una transacción se guardan de manera permanente en la base de datos.

Ejemplo de uso de transacciones en SQL:

```sql
BEGIN TRANSACTION;

-- Operaciones de la transacción (INSERT, UPDATE, DELETE, etc.)

-- Si todo está bien, se confirma la transacción
COMMIT;

-- Si hay algún problema, se deshacen las operaciones
ROLLBACK;
```

Las transacciones son esenciales para mantener la integridad de los datos en sistemas de bases de datos, especialmente en entornos donde múltiples operaciones pueden ocurrir simultáneamente. La implementación adecuada de transacciones contribuye a la confiabilidad y la consistencia de las operaciones en una base de datos.

:::

### Transacciones en Laravel

En Laravel, puedes gestionar transacciones de base de datos de manera bastante sencilla utilizando las funciones proporcionadas por Eloquent, el ORM (Object-Relational Mapping) integrado en el framework. Aquí hay un ejemplo básico de cómo puedes trabajar con transacciones en Laravel:

```js
use App\Models\TuModelo;

// Iniciar una transacción
DB::beginTransaction();

try {
    // Realizar operaciones de base de datos
    TuModelo::create(['campo' => 'valor']);
    OtroModelo::where('condicion', 'valor')->update(['campo' => 'nuevo_valor']);

    // Confirmar la transacción si todo está bien
    DB::commit();
} catch (\Exception $e) {
    // Deshacer la transacción en caso de error
    DB::rollBack();

    // Manejar el error de alguna manera (registros de errores, mensajes, etc.)
    // Puedes acceder al mensaje de error usando $e->getMessage()
}
```

En este ejemplo:

1. **`DB::beginTransaction()`:** Inicia la transacción.

2. **Operaciones de base de datos:** Realiza las operaciones de base de datos dentro del bloque `try`. Si alguna de estas operaciones falla (lanza una excepción), el bloque `catch` se ejecutará.

3. **`DB::commit()`:** Confirma la transacción si todas las operaciones fueron exitosas. Esto guarda los cambios permanentemente en la base de datos.

4. **`DB::rollBack()`:** Si alguna operación falla, deshace la transacción para que no se apliquen los cambios incorrectos. Esto asegura la integridad de la base de datos.

Es fundamental utilizar bloques `try-catch` para capturar cualquier excepción que se produzca durante la transacción y garantizar que se realice un rollback si algo sale mal.

Este enfoque es muy útil cuando necesitas garantizar que varias operaciones en la base de datos se realicen de manera atómica. La transacción asegura que todas las operaciones se completen correctamente o que no tengan ningún efecto en la base de datos si algo falla.

### CervezaController

Para crear el controlador teclee el siguiente comando en su terminal:

```bash
php artisan make:controller Api/V1/CervezaController
```

Diríjase a la carpeta **App\Http\Controllers\Api\V1** y edite el archivo TipoController.

Seguidamente comentaremos paso a paso los para crear el controlador:

1. De momento teclee el siguiente código

```js
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\Cerveza;
use App\Models\Color;
use App\Models\Graduacion;
use App\Models\Pais;
use App\Models\Tipo;
use Exception;
use Illuminate\Support\Facades\Storage;

class CervezaController extends Controller
{
    
    public function __construct()
    {
        $this->middleware('auth:api')->only(['store', 'destroy', 'update', 'patch']);
    }

    public function index(Request $request)
    {
        // Recopila parámetros de consulta desde la solicitud
        $perPage = $request->input('per_page', 20);
        $page = $request->input('page', 1);
        $colorId = $request->input('color_id');
        $paisId = $request->input('pais_id');
        $tipoId = $request->input('tipo_id');
        $graduacionId=$request->input('graduacion_id');
        $novedad = $request->input('novedad');
        $oferta = $request->input('oferta');
        $marca = $request->input('marca');
        $precioDesde = $request->input('precio_desde');
        $precioHasta = $request->input('precio_hasta');

        // Construye una consulta utilizando el Query Builder de Laravel
        $query = DB::table('cervezas as cer')
            ->select('cer.id', 'cer.nombre', 'cer.descripcion', 'cer.novedad', 'cer.oferta', 'cer.precio', 'cer.foto', 'cer.marca', 'col.nombre as color', 'g.nombre as graduacion', 't.nombre as tipo', 'p.nombre as pais')
            ->join('colores as col', 'cer.color_id', '=', 'col.id')
            ->join('graduaciones as g', 'cer.graduacion_id', '=', 'g.id')
            ->join('tipos as t', 'cer.tipo_id', '=', 't.id')
            ->join('paises as p', 'cer.pais_id', '=', 'p.id')
            ->orderBy('cer.nombre');

        // Aplica condiciones según los parámetros de consulta
        if ($colorId) {
            $query->where('cer.color_id', $colorId);
        }

        if ($paisId) {
            $query->where('cer.pais_id', $paisId);
        }

        if ($graduacionId) {
            $query->where('cer.graduacion_id', $graduacionId);
        }

        if ($tipoId) {
            $query->where('cer.tipo_id', $tipoId);
        }

        if ($novedad) {
            $query->where('cer.novedad', $novedad);
        }

        if ($oferta) {
            $query->where('cer.oferta', $oferta);
        }

        if ($marca) {
            // Realiza una búsqueda de marca insensible a mayúsculas y minúsculas
            $query->whereRaw('LOWER(cer.marca) LIKE ?', ['%' . strtolower($marca) . '%']);
        }

        if ($precioDesde && $precioHasta) {
            $query->whereBetween('cer.precio', [$precioDesde, $precioHasta]);
        }

        // Realiza una paginación de los resultados
        $results = $query->paginate($perPage, ['*'], 'page', $page);
        //print_r($graduacionId);
        // Devuelve una respuesta JSON con los resultados paginados
        return response()->json($results);
    }

    public function store(Request $request)
    {
        // Comenzar una transacción de base de datos
        DB::beginTransaction();
       // return $request;

        try {
            // Define las reglas de validación para los campos
            $rules = [
                'nombre' => 'required|string|unique:cervezas|max:150',
                'descripcion' => 'required',
                'color_id' => 'required|numeric',
                'graduacion_id' => 'required|numeric',
                'tipo_id' => 'required|numeric',
                'pais_id' => 'required|numeric',
                'novedad' => 'required|string|in:true,false',
                'oferta' => 'required|string|in:true,false',
                'precio' => 'required|numeric|between:1,1000',
                'foto'=> 'required|string',
                'file' => 'required|image|max:2048',
                'marca' => 'required|string|max:150',
            ];

            $messages = [
                'oferta.in' => 'El campo oferta debe ser "true" o "false".',
                'novedad.in' => 'El campo novedad debe ser "true" o "false".',
                // Mensajes personalizados para otros campos si es necesario...
            ];
            // Realiza la validación de la solicitud
            $validator = Validator::make($request->all(), $rules,$messages);

             
            // Si la validación falla, devuelve una respuesta JSON con los errores de validación
            if ($validator->fails()) {
                DB::rollback();
                return response()->json($validator->errors(), 400);
            }

            // Valida la existencia de valores relacionados (por ejemplo, color, graduación, país, tipo)

            $color_id = $request->input('color_id');
            $color = Color::find($color_id);
            if (!$color) {
                DB::rollback();
                return response()->json('El color_id ' . $color_id . ' no existe', 404);
            }

            $graduacion_id = $request->input('graduacion_id');
            $graduacion = Graduacion::find($graduacion_id);
            if (!$graduacion) {
                DB::rollback();
                return response()->json('La graduacion_id ' . $graduacion_id . ' no existe', 404);
            }

            $pais_id = $request->input('pais_id');
            $pais = Pais::find($pais_id);
            if (!$pais) {
                DB::rollback();
                return response()->json('El pais_id ' . $pais_id . ' no existe', 404);
            }

            $tipo_id = $request->input('tipo_id');
            $tipo = Tipo::find($tipo_id);
            if (!$tipo) {
                DB::rollback();
                return response()->json('El tipo_id ' . $tipo_id . ' no existe', 404);
            }

            $cerveza = $request->all();
            $cerveza['novedad'] = filter_var($request->input('novedad'), FILTER_VALIDATE_BOOLEAN);
            $cerveza['oferta'] = filter_var($request->input('oferta'), FILTER_VALIDATE_BOOLEAN);
    
            //return $cerveza;
            // Procesa la imagen y guárdala en la carpeta 'storage/images'
            if ($request->hasFile('file')) {
                $path = $request->file('file')->store('/public/images');
                $url = url('/') . '/storage/images/' . basename($path); // 'images' es la subcarpeta donde se almacenará la imagen

                $cerveza['foto'] = $url; // Actualiza el campo 'foto' con la ubicación de la imagen almacenad
            }

            // Guardar la cerveza en la base de datos
            $cerveza = Cerveza::create($cerveza);
            
            // Confirmar la transacción si todo se completó con éxito
            DB::commit();
            
            // Devuelve una respuesta JSON con la cerveza recién creada y el código de respuesta 201 (creado)
            return response()->json($cerveza, 201);
        } catch (Exception $e) {
            // Revertir la transacción en caso de fallo
            DB::rollback();

            // Devuelve una respuesta de error
            return response()->json('Error al procesar la solicitud', 500);
        }
    }


    public function show(string $id)
    {
        $cerveza = Cerveza::find($id);
        return response()->json($cerveza, 200);
    }

    public function update(Request $request, $id)
    {
        // El código del método permanece sin cambios
    }

    
    public function patch(Request $request, $id)
    {
        // Comenzar una transacción de base de datos
        DB::beginTransaction();

        try {
            // Encuentra la cerveza que deseas actualizar
            $cerveza = Cerveza::find($id);

            if (!$cerveza) {
                DB::rollback();
                return response()->json('La cerveza con ID ' . $id . ' no existe', 404);
            }

            // Valida la existencia de valores relacionados (por ejemplo, color, graduación, país, tipo)
            // ...

            // Actualiza los campos de la cerveza solo si están presentes en la solicitud
            // Actualiza los campos de la cerveza solo si están presentes en la solicitud

            $cerveza->nombre = $request->json('nombre', $cerveza->nombre);
            $cerveza->descripcion = $request->json('descripcion', $cerveza->descripcion);
            $cerveza->color_id = $request->json('color_id', $cerveza->color_id);
            $cerveza->graduacion_id = $request->json('graduacion_id', $cerveza->graduacion_id);
            $cerveza->tipo_id = $request->json('tipo_id', $cerveza->tipo_id);
            $cerveza->pais_id = $request->json('pais_id', $cerveza->pais_id);
            $cerveza->novedad = $request->json('novedad', $cerveza->novedad);
            $cerveza->oferta = $request->json('oferta', $cerveza->oferta);
            $cerveza->precio = $request->json('precio', $cerveza->precio);
            $cerveza->marca = $request->json('marca', $cerveza->marca);

            // Guarda la cerveza
            $cerveza->save();


            // Guarda la cerveza
            $cerveza->save();

            // Actualiza la imagen si se proporciona una nueva
            if ($request->hasFile('foto')) {
                $path = $request->file('foto')->store('/public/images');
                $url = url('/') . '/storage/images/' . basename($path);
                $cerveza->foto = $url;
                $cerveza->save();
            }

            // Confirmar la transacción si todo se completó con éxito
            DB::commit();

            return response()->json($cerveza, 200); // Devuelve la cerveza actualizada
        } catch (Exception $e) {
            // Revertir la transacción en caso de fallo
            DB::rollback();

            // Devuelve una respuesta de error
            return response()->json('Error al procesar la solicitud', 500);
        }
    }


   
    public function destroy(string $id)
    {
        // Comienza una transacción de base de datos
        DB::beginTransaction();

        try {
            // Encuentra el modelo que deseas eliminar
            $cerveza = Cerveza::find($id);

            if (!$cerveza) {
                DB::rollback();
                return response()->json('El recurso con ID ' . $id . ' no existe', 404);
            }

            // Elimina la imagen asociada si existe
            if (!empty($cerveza->foto)) {
                Storage::delete('public/images/' . basename($cerveza->foto));
            }

            // Elimina el modelo
            $cerveza->delete();

            // Confirmar la transacción si todo se completó con éxito
            DB::commit();

            return response()->json('Recurso eliminado correctamente', 200);
        } catch (Exception $e) {
            // Revertir la transacción en caso de fallo
            DB::rollback();

            // Devuelve una respuesta de error
            return response()->json('Error al procesar la solicitud', 500);
        }
    }
}

```

### Método Index

1. El método `index` se encarga de recuperar una lista de cervezas con la posibilidad de aplicar varios filtros y paginar los resultados.

2. Se recopilan los parámetros de consulta de la solicitud, como el número de elementos por página (`per_page`), la página actual (`page`), y varios filtros como `color_id`, `pais_id`, `tipo_id`, `novedad`, `oferta`, `marca`, `precio_desde`, y `precio_hasta`.

```js
 // Recopila parámetros de consulta desde la solicitud
        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);
        $colorId = $request->input('color_id');
        $paisId = $request->input('pais_id');
        $tipoId = $request->input('tipo_id');
        $novedad = $request->input('novedad');
        $oferta = $request->input('oferta');
        $marca = $request->input('marca');
        $precioDesde = $request->input('precio_desde');
        $precioHasta = $request->input('precio_hasta');
```

3. Se construye una consulta SQL utilizando el Query Builder de Laravel, que selecciona las columnas deseadas de la tabla `cervezas` y se une a las tablas relacionadas como `colores`, `graduaciones`, `tipos`, y `paises`. La consulta se ordena por el nombre de las cervezas.

```js
// Construye una consulta utilizando el Query Builder de Laravel
        $query = DB::table('cervezas as cer')
            ->select('cer.id', 'cer.nombre', 'cer.descripcion', 'cer.novedad', 'cer.oferta', 'cer.precio', 'cer.foto', 'cer.marca', 'col.nombre as color', 'g.nombre as graduacion', 't.nombre as tipo', 'p.nombre as pais')
            ->join('colores as col', 'cer.color_id', '=', 'col.id')
            ->join('graduaciones as g', 'cer.graduacion_id', '=', 'g.id')
            ->join('tipos as t', 'cer.tipo_id', '=', 't.id')
            ->join('paises as p', 'cer.pais_id', '=', 'p.id')
            ->orderBy('cer.nombre');

```

4. Se aplican condiciones a la consulta según los filtros proporcionados en los parámetros de la solicitud. Por ejemplo, si se proporciona un valor para `color_id`, se filtra por ese color; si se proporciona un valor para `novedad`, se filtra por novedad, y así sucesivamente.

```js
 // Aplica condiciones según los parámetros de consulta
        if ($colorId) {
            $query->where('cer.color_id', $colorId);
        }

        if ($paisId) {
            $query->where('cer.pais_id', $paisId);
        }

        if ($tipoId) {
            $query->where('cer.tipo_id', $tipoId);
        }

        if ($novedad) {
            $query->where('cer.novedad', $novedad);
        }

        if ($oferta) {
            $query->where('cer.oferta', $oferta);
        }

        if ($marca) {
            // Realiza una búsqueda de marca insensible a mayúsculas y minúsculas
            $query->whereRaw('LOWER(cer.marca) LIKE ?', ['%' . strtolower($marca) . '%']);
        }

        if ($precioDesde && $precioHasta) {
            $query->whereBetween('cer.precio', [$precioDesde, $precioHasta]);
        }
```

5. Si se proporciona un valor para `marca`, se realiza una búsqueda insensible a mayúsculas y minúsculas en la columna "marca".

6. Si se proporcionan valores para `precio_desde` y `precio_hasta`, se filtra por un rango de precios.

7. Finalmente, se aplica la paginación a los resultados de la consulta, utilizando los valores de `per_page` y `page`, y se obtiene una colección paginada de cervezas.

8. Los resultados paginados se devuelven como una respuesta JSON, lo que permite a los clientes de la API acceder a la lista de cervezas de manera estructurada y paginada, lo que facilita la navegación y la presentación de los datos.

```js
 return response()->json($results);
```

### Método Store

A continuación revisaremos el método **Store**. Para después entrar en más detalle en el.

```js
 public function store(Request $request)
    {
        // Comenzar una transacción de base de datos
        DB::beginTransaction();
       // return $request;

        try {
            // Define las reglas de validación para los campos
            $rules = [
                'nombre' => 'required|string|unique:cervezas|max:150',
                'descripcion' => 'required',
                'color_id' => 'required|numeric',
                'graduacion_id' => 'required|numeric',
                'tipo_id' => 'required|numeric',
                'pais_id' => 'required|numeric',
                'novedad' => 'required|string|in:true,false',
                'oferta' => 'required|string|in:true,false',
                'precio' => 'required|numeric|between:1,1000',
                'foto'=> 'required|string',
                'file' => 'required|image|max:2048',
                'marca' => 'required|string|max:150',
            ];

            $messages = [
                'oferta.in' => 'El campo oferta debe ser "true" o "false".',
                'novedad.in' => 'El campo novedad debe ser "true" o "false".',
                // Mensajes personalizados para otros campos si es necesario...
            ];
            // Realiza la validación de la solicitud
            $validator = Validator::make($request->all(), $rules,$messages);

             
            // Si la validación falla, devuelve una respuesta JSON con los errores de validación
            if ($validator->fails()) {
                DB::rollback();
                return response()->json($validator->errors(), 400);
            }

            // Valida la existencia de valores relacionados (por ejemplo, color, graduación, país, tipo)

            $color_id = $request->input('color_id');
            $color = Color::find($color_id);
            if (!$color) {
                DB::rollback();
                return response()->json('El color_id ' . $color_id . ' no existe', 404);
            }

            $graduacion_id = $request->input('graduacion_id');
            $graduacion = Graduacion::find($graduacion_id);
            if (!$graduacion) {
                DB::rollback();
                return response()->json('La graduacion_id ' . $graduacion_id . ' no existe', 404);
            }

            $pais_id = $request->input('pais_id');
            $pais = Pais::find($pais_id);
            if (!$pais) {
                DB::rollback();
                return response()->json('El pais_id ' . $pais_id . ' no existe', 404);
            }

            $tipo_id = $request->input('tipo_id');
            $tipo = Tipo::find($tipo_id);
            if (!$tipo) {
                DB::rollback();
                return response()->json('El tipo_id ' . $tipo_id . ' no existe', 404);
            }

            $cerveza = $request->all();
            $cerveza['novedad'] = filter_var($request->input('novedad'), FILTER_VALIDATE_BOOLEAN);
            $cerveza['oferta'] = filter_var($request->input('oferta'), FILTER_VALIDATE_BOOLEAN);
    
            //return $cerveza;
            // Procesa la imagen y guárdala en la carpeta 'storage/images'
            if ($request->hasFile('file')) {
                $path = $request->file('file')->store('/public/images');
                $url = url('/') . '/storage/images/' . basename($path); // 'images' es la subcarpeta donde se almacenará la imagen

                $cerveza['foto'] = $url; // Actualiza el campo 'foto' con la ubicación de la imagen almacenad
            }

            // Guardar la cerveza en la base de datos
            $cerveza = Cerveza::create($cerveza);
            
            // Confirmar la transacción si todo se completó con éxito
            DB::commit();
            
            // Devuelve una respuesta JSON con la cerveza recién creada y el código de respuesta 201 (creado)
            return response()->json($cerveza, 201);
        } catch (Exception $e) {
            // Revertir la transacción en caso de fallo
            DB::rollback();

            // Devuelve una respuesta de error
            return response()->json('Error al procesar la solicitud', 500);
        }
    }
```

### Exploración del Método store

#### **1. Iniciando una Transacción de Base de Datos**
```js
// Inicio de la transacción de base de datos
DB::beginTransaction();
```
Inicia una transacción de base de datos para asegurar que todas las operaciones dentro de este bloque se completen exitosamente antes de confirmar la transacción.

#### **2. Definiendo Reglas de Validación**
```js
// Definición de reglas de validación
 // Define las reglas de validación para los campos
$rules = [
    'nombre' => 'required|string|unique:cervezas|max:150',
    'descripcion' => 'required',
    'color_id' => 'required|numeric',
    'graduacion_id' => 'required|numeric',
    'tipo_id' => 'required|numeric',
    'pais_id' => 'required|numeric',
    'novedad' => 'required|string|in:true,false',
    'oferta' => 'required|string|in:true,false',
    'precio' => 'required|numeric|between:1,1000',
    'foto'=> 'required|string',
    'file' => 'required|image|max:2048',
    'marca' => 'required|string|max:150',
];
```
Define reglas de validación para los campos de la cerveza. Estas reglas garantizan que los datos proporcionados en la solicitud cumplan con los requisitos antes de intentar almacenarlos en la base de datos. Hay un detalle interesante en la validación de esta solicitud. Ya que recibiremos la solicitud a través de un formData, debemos enviar el campo oferta y novedad como una cadena (string), ya que los datos tipo booleano no son bien aceptados en el fetch del cliente. Veremos más adelante cómo transformarlos en booleanos antes de grabarlos en la base de datos (BBDD)

#### **3. Realizando la Validación de la Solicitud**
```js
// Realización de la validación de la solicitud
$validator = Validator::make($request->all(), $rules);

if ($validator->fails()) {
    DB::rollback();
    return response()->json($validator->errors(), 400);
}
```
Utiliza el validador de Laravel para verificar si los datos de la solicitud cumplen con las reglas establecidas. Si la validación falla, revierte la transacción y devuelve una respuesta JSON con los errores de validación y un código de estado 400.

#### **4. Validando la Existencia de Valores Relacionados**
```js
$color_id = $request->input('color_id');
$color = Color::find($color_id);

if (!$color) {
    DB::rollback();
    return response()->json('El color_id ' . $color_id . ' no existe', 404);
}
```
Verifica la existencia de valores relacionados, como el color, la graduación, el país y el tipo de cerveza, utilizando los modelos Eloquent correspondientes. Si alguno de estos valores no existe, revierte la transacción y devuelve una respuesta JSON con un código de estado 404.

#### **5. Procesamiento y Almacenamiento de la Imagen**
```js
$cerveza = $request->all();

//Convertimos a valores boleanos novedad y oferta
$cerveza['novedad'] = filter_var($request->input('novedad'), FILTER_VALIDATE_BOOLEAN);
$cerveza['oferta'] = filter_var($request->input('oferta'), FILTER_VALIDATE_BOOLEAN);
    
if ($request->hasFile('foto')) {
    $path = $request->file('foto')->store('/public/images');
    $url = '/storage/images/' . basename($path);
    $cerveza['foto'] = $url;
}
```
Si se proporciona una imagen en la solicitud, la procesa y almacena utilizando el sistema de almacenamiento de Laravel. La URL resultante se asigna al campo 'foto' de la cerveza.

:::tip El comando ***php artisan storage:link***
Claro que sí. El comando `php artisan storage:link` crea un enlace simbólico (o symlink) en la carpeta `public/storage` que apunta a la carpeta `storage/app/public`. Esto permite que los archivos almacenados en la carpeta `storage/app/public` sean accesibles desde la web.

Por defecto, el sistema de archivos `public` utiliza el controlador local y almacena sus archivos en la carpeta `storage/app/public`. Para que estos archivos sean accesibles desde la web, es necesario crear un enlace simbólico desde la carpeta `public/storage` a la carpeta `storage/app/public`.

El comando `php artisan storage:link` crea este enlace simbólico automáticamente. Para ejecutarlo, simplemente ejecute el siguiente comando en la línea de comandos:

```
php artisan storage:link
```
Este comando creará un enlace simbólico llamado `storage` en la carpeta `public` que apunta a la carpeta `storage/app/public`.

Una vez que haya creado el enlace simbólico, podrá acceder a los archivos almacenados en la carpeta `storage/app/public` desde la web utilizando la ruta `/storage/[ruta_al_archivo]`. Por ejemplo, si tiene un archivo llamado `file.jpg` almacenado en la carpeta `storage/app/public/images`, puede acceder a él desde la web utilizando la ruta `/storage/images/file.jpg`.

Es importante tener en cuenta que el comando `php artisan storage:link` solo funciona en sistemas operativos que admiten enlaces simbólicos. 
:::

#### **6. Guardando la Cerveza en la Base de Datos**
```js
// Guardar la cerveza en la base de datos
$cerveza = Cerveza::create($cerveza);
```
Utiliza el método `create` de Eloquent para crear una nueva instancia de la cerveza y guardarla en la base de datos.

#### **7. Confirmando la Transacción**
```js
DB::commit();
```
Si todas las operaciones se han realizado con éxito, confirma la transacción, lo que significa que los cambios realizados en la base de datos son permanentes.

#### **8. Respuesta de Éxito o Manejo de Errores**
```js
return response()->json($cerveza, 201);

} catch (Exception $e) {
    DB::rollback();
    return response()->json('Error al procesar la solicitud', 500);
}
```
Si todo el proceso se ha completado sin problemas, devuelve una respuesta JSON con la cerveza recién creada y un código de estado 201. En caso de algún error durante el proceso, revierte la transacción y devuelve una respuesta de error con un código de estado 500.

### SystemController

En este controlador exploraremos como devolver consultas para elaborar estadísticas de nuestra base de datos y del sistema.

Para crear el controlador teclee el siguiente comando en su terminal:

```bash
php artisan make:controller Api/V1/SystmController
```

Diríjase a la carpeta **App\Http\Controllers\Api\V1** y edite el archivo TipoController.

Seguidamente comentaremos paso a paso los para crear el controlador:

1. De momento teclee el siguiente código

```js
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class SystemController extends Controller
{
    public function consultaCervezasPorPais()
    {
        $resultados = DB::select("
            SELECT COUNT(*) as value, p.nombre as name
            FROM cervezas as cer
            INNER JOIN paises AS p ON cer.pais_id = p.id
            GROUP BY cer.pais_id, p.nombre
            ORDER BY p.nombre
        ");

        return response()->json($resultados);
    }

    public function consultaCervezasPorTipo()
    {
        $resultados = DB::select("
            SELECT COUNT(*) as value, t.nombre as name
            FROM cervezas as cer
            INNER JOIN tipos AS t ON cer.tipo_id = t.id
            GROUP BY cer.tipo_id, t.nombre
            ORDER BY t.nombre
        ");

        return response()->json($resultados);
    }

    public function consultaBD()
    {
        $databaseName = env('DB_DATABASE');
        $resultados = DB::select("
            SELECT 
            table_name,
            table_rows,
            data_length / (1024 * 1024) AS data_size_mb,
            index_length / (1024 * 1024) AS index_size_mb
            FROM information_schema.tables
            WHERE table_schema = '{$databaseName}'
            AND table_type = 'BASE TABLE'; -- Solo tablas, no vistas ni tablas de sistema;
        ");

        return response()->json($resultados);
    }

    public function consultaTablas()
    {
        $databaseName = env('DB_DATABASE');
    
        $resultados = DB::select("
            SELECT table_name, table_rows
            FROM information_schema.tables
            WHERE table_schema = '{$databaseName}'
              AND table_type = 'BASE TABLE'; -- Solo tablas, no vistas ni tablas de sistema
        ");
    
        return response()->json($resultados);
    }
    
};
```

:::info Explicación del código
Este controlador , llamado `SystemController`, esta diseñado para realizar consultas específicas relacionadas con el sistema, como obtener información sobre cervezas por país, por tipo, detalles sobre la base de datos y la lista de tablas. A continuación, se proporciona una explicación para cada método:

1. **`consultaCervezasPorPais`**
   ```php
   public function consultaCervezasPorPais()
   {
       $resultados = DB::select("
           SELECT COUNT(*) as value, p.nombre as name
           FROM cervezas as cer
           INNER JOIN paises AS p ON cer.pais_id = p.id
           GROUP BY cer.pais_id, p.nombre
           ORDER BY p.nombre
       ");

       return response()->json($resultados);
   }
   ```

   - Este método realiza una consulta para contar la cantidad de cervezas agrupadas por país.
   - Utiliza el Query Builder para construir la consulta SQL, que incluye una unión interna (`INNER JOIN`) entre las tablas `cervezas` y `paises` mediante las claves foráneas `cer.pais_id` y `p.id`.
   - El resultado es un conjunto de datos que incluye el nombre del país (`name`) y la cantidad de cervezas (`value`) asociadas a ese país.
   - Retorna los resultados en formato JSON.

2. **`consultaCervezasPorTipo`**
   ```php
   public function consultaCervezasPorTipo()
   {
       $resultados = DB::select("
           SELECT COUNT(*) as value, t.nombre as name
           FROM cervezas as cer
           INNER JOIN tipos AS t ON cer.tipo_id = t.id
           GROUP BY cer.tipo_id, t.nombre
           ORDER BY t.nombre
       ");

       return response()->json($resultados);
   }
   ```

   - Similar al método anterior, este realiza una consulta para contar la cantidad de cervezas agrupadas por tipo.
   - Utiliza un `INNER JOIN` entre las tablas `cervezas` y `tipos` utilizando las claves foráneas `cer.tipo_id` y `t.id`.
   - El resultado incluye el nombre del tipo (`name`) y la cantidad de cervezas (`value`) asociadas a ese tipo.
   - Retorna los resultados en formato JSON.

3. **`consultaBD`**
   ```php
   public function consultaBD()
   {
       $databaseName = env('DB_DATABASE');
       $resultados = DB::select("
           SELECT 
           table_name,
           table_rows,
           data_length / (1024 * 1024) AS data_size_mb,
           index_length / (1024 * 1024) AS index_size_mb
           FROM information_schema.tables
           WHERE table_schema = '{$databaseName}'
           AND table_type = 'BASE TABLE'; -- Solo tablas, no vistas ni tablas de sistema;
       ");

       return response()->json($resultados);
   }
   ```

   - Este método realiza una consulta para obtener información sobre las tablas de la base de datos.
   - Utiliza la tabla `information_schema.tables` para obtener detalles como el nombre de la tabla (`table_name`), el número de filas (`table_rows`), el tamaño de datos en megabytes (`data_size_mb`), y el tamaño del índice en megabytes (`index_size_mb`).
   - Filtra las tablas basándose en el nombre de la base de datos actual.
   - Retorna los resultados en formato JSON.

4. **`consultaTablas`**
   ```php
   public function consultaTablas()
   {
       $databaseName = env('DB_DATABASE');
   
       $resultados = DB::select("
           SELECT table_name, table_rows
           FROM information_schema.tables
           WHERE table_schema = '{$databaseName}'
             AND table_type = 'BASE TABLE'; -- Solo tablas, no vistas ni tablas de sistema
       ");
   
       return response()->json($resultados);
   }
   ```

   - Similar al método anterior, este realiza una consulta para obtener información sobre las tablas de la base de datos.
   - Retorna los nombres de las tablas (`table_name`) y el número de filas (`table_rows`) en formato JSON.
   - Filtra las tablas basándose en el nombre de la base de datos actual.
:::