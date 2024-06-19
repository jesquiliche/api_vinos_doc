---
sidebar_position: 10
---

# SWAGGER

## ¿Qué es Swagger?

Swagger es un conjunto de herramientas para diseñar, construir, documentar y consumir servicios web RESTful. La especificación Swagger define un estándar para la documentación de servicios web RESTful, que permite a los desarrolladores entender rápidamente la funcionalidad de un servicio sin acceder a su código fuente o comprender su lógica interna. La documentación Swagger se presenta en un formato fácil de leer, y también puede ser utilizada para generar automáticamente interfaces de usuario y código cliente para consumir los servicios.

Swagger proporciona una manera estándar de describir, documentar y consumir servicios web RESTful, facilitando la interoperabilidad entre servicios desarrollados por diferentes equipos y en diferentes plataformas. La especificación Swagger utiliza un formato JSON o YAML para describir la API REST, y las herramientas de Swagger pueden generar documentación interactiva, clientes de prueba y otras utilidades basadas en esta especificación.

## Instalación y configuración

La documentación del paquete de instalación puede encontrarla en el siguiente enlace:

https://github.com/DarkaOnLine/L5-Swagger/wiki/Installation-&-Configuration

### Instalación

Instalar Swagger en Laravel 11 generalmente implica el uso de una herramienta llamada "L5-Swagger", que es un paquete de Laravel que facilita la integración de Swagger en una aplicación Laravel. Aquí hay una guía básica de los pasos a seguir:

1. **Instalar el paquete L5-Swagger:**
   Puedes instalar el paquete utilizando Composer. Abre una terminal en el directorio de tu proyecto Laravel y ejecuta el siguiente comando:

   ```bash
   composer require darkaonline/l5-swagger
   ```

2. Diríjase al archivo **config/app.php** y añada a la sección de providers el siguiente código:

```js
L5Swagger\L5SwaggerServiceProvider::class,
```

   Si va a instalar **swagger** en la versión 11, esta configuración cambia. Deberá editar el archivo **bootstrap/providers.php** e introducir este mismo proveedor de la siguiente forma:

```js
<?php

return [
    App\Providers\AppServiceProvider::class,
    L5Swagger\L5SwaggerServiceProvider::class
];
```

3. **Publicar la configuración:**
   Después de instalar el paquete, necesitas publicar su configuración. Esto se puede hacer con el siguiente comando:

   ```bash
   php artisan vendor:publish --provider "L5Swagger\L5SwaggerServiceProvider"
   ```

   Este comando copiará la configuración de Swagger al directorio `config` de tu aplicación Laravel.

4. **Configurar Swagger:**
   Abre el archivo de configuración `config/l5-swagger.php` y ajusta la configuración según tus necesidades. Puedes configurar aspectos como la ruta de la documentación Swagger y otras opciones.

5. **Generar la documentación:**
   Después de configurar L5-Swagger, puedes generar la documentación Swagger ejecutando el siguiente comando Artisan:

   ```bash
   php artisan l5-swagger:generate
   ```

   Si este comando da error, vuelve a ejecutarlo después de documentar el primer controlador, como veremos en este mismo capítulo.

   Puedes hacer que la documentación se genere automáticamente cada vez que haya un cambio, introduciendo la siguiente línea en tu archivo **.env**:

   ```bash
   L5_SWAGGER_GENERATE_ALWAYS=true
   ```

   Esto generará los archivos necesarios para la documentación de Swagger.

6. **Acceder a la documentación:**
   Puedes acceder a la interfaz de Swagger visitando la URL especificada en tu configuración. Por defecto, podría ser algo como `http://tudominio.com/api/documentation`. No se preocupe si se produce un error, pues todavía queda documentar nuestros **Endpoints**.

Recuerda que la configuración puede variar según tu aplicación y tus necesidades específicas. Asegúrate de revisar la documentación oficial del paquete L5-Swagger para obtener información detallada y posiblemente actualizaciones. Además, ten en cuenta que Laravel 11 puede tener cambios que no estén reflejados en esta sección, por lo que siempre es recomendable consultar la documentación oficial de Laravel y de los paquetes específicos que estás utilizando.

## Documentación controladores

## AuthController

Empezaremos documentado el controlador **AuthController**, el encargado de manejar la autenticación.

### Anotaciones generales

Introduzca el siguiente código antes de la definición de la clase.

### `@OA\SecurityScheme`

Definición de la seguridad **JWT**.

```js
/**
 * @OA\SecurityScheme(
 *      securityScheme="bearerAuth",
 *      type="http",
 *      scheme="bearer",
 *      bearerFormat="JWT",
 * )
 */
```

- **`securityScheme="bearerAuth"`**: Define un esquema de seguridad llamado "bearerAuth". Este esquema se utiliza para indicar que los endpoints asociados requieren un token de tipo Bearer para la autenticación.

- **`type="http"`**: Indica que el esquema de seguridad se basa en un mecanismo HTTP.

- **`scheme="bearer"`**: Especifica que se utiliza el esquema de autenticación Bearer. En la autenticación Bearer, el token se incluye en el encabezado de autorización de la solicitud HTTP.

- **`bearerFormat="JWT"`**: Indica que se espera que el token sea un token JWT (JSON Web Token).

### `@OA\Tag`

Definición de tag

/\*\*

- @OA\Tag(
-     name="Autenticación",
-     description="Endpoints relacionados con la autenticación de usuarios"
- )
  \*/

````

- **`name="Autenticación"`**: Asigna un nombre a la etiqueta, en este caso, "Autenticación". Las etiquetas se utilizan para organizar y categorizar los endpoints.

- **`description="Endpoints relacionados con la autenticación de usuarios"`**: Proporciona una descripción de la etiqueta. En este caso, indica que la etiqueta "Autenticación" se utiliza para endpoints relacionados con la autenticación de usuarios.

Estas anotaciones ayudan a documentar y organizar los endpoints relacionados con la autenticación en la especificación OpenAPI/Swagger. Al generar la documentación, estas anotaciones se traducirán en una sección clara que describe cómo se deben autenticar las solicitudes a los endpoints y cómo están agrupados bajo la etiqueta "Autenticación".

### POST Login

```js
/**
 * @OA\Post(
 *      path="/api/login",
 *      operationId="login",
 *      tags={"Authentication"},
 *      summary="Iniciar sesión de un usuario existente",
 *      description="Inicia sesión de un usuario existente y devuelve un token de autorización",
 *      @OA\RequestBody(
 *          required=true,
 *          @OA\MediaType(
 *              mediaType="application/json",
 *              @OA\Schema(
 *                  @OA\Property(property="email", type="string", example="user@example.com"),
 *                  @OA\Property(property="password", type="string", example="password"),
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Inicio de sesión exitoso",
 *          @OA\JsonContent(
 *              @OA\Property(property="usuario", type="object"),
 *              @OA\Property(property="autorizacion", type="object",
 *                  @OA\Property(property="token", type="string"),
 *                  @OA\Property(property="tipo", type="string", example="bearer"),
 *              ),
 *          )
 *      ),
 *      @OA\Response(
 *          response=401,
 *          description="No autorizado",
 *          @OA\JsonContent(
 *              @OA\Property(property="mensaje", type="string"),
 *          )
 *      ),
 *      @OA\Response(
 *          response=422,
 *          description="Error de validación",
 *          @OA\JsonContent(
 *              @OA\Property(property="errores", type="object"),
 *          )
 *      ),
 * )
 */
````

- **`@OA\Post`**: Indica que se trata de un endpoint HTTP de tipo POST.

- **`path="/api/login"`**: Especifica la ruta del endpoint.

- **`operationId="login"`**: Identificador único para la operación.

- **`tags={"Authentication"}`**: Asigna la operación a la etiqueta "Authentication" para agruparla en la documentación.

- **`summary="Iniciar sesión de un usuario existente"`**: Breve descripción del propósito de la operación.

- **`description="Inicia sesión de un usuario existente y devuelve un token de autorización"`**: Descripción más detallada de la operación.

- **`@OA\RequestBody`**: Define el cuerpo de la solicitud.

  - **`required=true`**: Indica que el cuerpo de la solicitud es obligatorio.

  - **`@OA\MediaType`**: Define el tipo de medio de la solicitud como JSON.

    - **`mediaType="application/json"`**: Especifica que el tipo de medio es JSON.

    - **`@OA\Schema`**: Define la estructura del cuerpo de la solicitud.

- **`@OA\Response`**: Define las posibles respuestas de la operación.

  - **`response=200`**: Respuesta exitosa.

    - **`description="Inicio de sesión exitoso"`**: Descripción de la respuesta.

    - **`@OA\JsonContent`**: Define el contenido de la respuesta en formato JSON.

      - **`@OA\Property(property="usuario", type="object")`**: Propiedad "usuario" de tipo objeto en la respuesta JSON.

      - **`@OA\Property(property="autorizacion", type="object")`**: Propiedad "autorizacion" de tipo objeto en la respuesta JSON.

        - **`@OA\Property(property="token", type="string")`**: Propiedad "token" de tipo cadena en el objeto de autorización.

        - **`@OA\Property(property="tipo", type="string", example="bearer")`**: Propiedad "tipo" de tipo cadena en el objeto de autorización, con ejemplo "bearer".

  - **`response=401`**: Respuesta para el caso de no autorización.

    - **`description="No autorizado"`**: Descripción de la respuesta.

    - **`@OA\JsonContent(property="mensaje", type="string")`**: Propiedad "mensaje" de tipo cadena en la respuesta JSON.

  - **`response=422`**: Respuesta para el caso de error de validación.

    - **`description="Error de validación"`**: Descripción de la respuesta.

    - **`@OA\JsonContent(property="errores", type="object")`**: Propiedad "errores" de tipo objeto en la respuesta JSON.

Estas anotaciones de Swagger proporcionan información detallada sobre cómo se debe utilizar y qué esperar al interactuar con el endpoint de inicio de sesión en la API. Al generar la documentación, esta información se presenta de manera organizada para que los desarrolladores comprendan cómo utilizar este endpoint.

### POST Logout

```js
/**
 * @OA\Post(
 *      path="/api/v1/logout",
 *      operationId="logout",
 *      tags={"Authentication"},
 *      summary="Cerrar sesión del usuario autenticado",
 *      description="Cierra la sesión del usuario autenticado",
 *      security={{"bearerAuth": {}}},
 *      @OA\Response(
 *          response=200,
 *          description="Cierre de sesión exitoso",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string"),
 *          )
 *      ),
 * )
 */
```

- **`@OA\Post`**: Indica que esta anotación está asociada a una operación HTTP de tipo POST.

- **`path="/api/v1/logout"`**: Especifica la ruta del endpoint para el cierre de sesión.

- **`operationId="logout"`**: Identificador único para la operación. Ayuda a distinguir entre operaciones en la documentación.

- **`tags={"Authentication"}`**: Asigna la operación a la etiqueta "Authentication", indicando que está relacionada con la autenticación y agrupándola en la documentación.

- **`summary="Cerrar sesión del usuario autenticado"`**: Proporciona un resumen breve de la operación, indicando que es para cerrar la sesión de un usuario autenticado.

- **`description="Cierra la sesión del usuario autenticado"`**: Proporciona una descripción más detallada de la operación, explicando que su propósito es cerrar la sesión de un usuario autenticado.

- **`security={{"bearerAuth": {}}}`**: Especifica que esta operación requiere autenticación mediante un token Bearer. Indica que el usuario debe estar autenticado para realizar esta operación.

- **`@OA\Response`**: Define las posibles respuestas de la operación.

  - **`response=200`**: Respuesta exitosa para el cierre de sesión.

    - **`description="Cierre de sesión exitoso"`**: Descripción de la respuesta.

    - **`@OA\JsonContent`**: Define el contenido de la respuesta en formato JSON.

      - **`@OA\Property(property="message", type="string")`**: Propiedad "message" de tipo cadena en la respuesta JSON. En este caso, se espera que contenga un mensaje indicando que el cierre de sesión fue exitoso.

Esta anotación documenta claramente cómo realizar el cierre de sesión en la API, qué esperar como respuesta exitosa y qué seguridad se requiere para realizar esta operación. Al generar la documentación, esta información se presentará de manera organizada para los desarrolladores que utilicen tu API.

### POST Refresh

```js
/**
 * @OA\Post(
 *      path="/api/v1/refresh",
 *      operationId="refresh",
 *      tags={"Authentication"},
 *      summary="Actualizar el token de autenticación",
 *      description="Actualiza el token de autenticación para el usuario autenticado",
 *      security={{"bearerAuth": {}}},
 *      @OA\Response(
 *          response=200,
 *          description="Token de autenticación actualizado exitosamente",
 *          @OA\JsonContent(
 *              @OA\Property(property="user", type="object"),
 *              @OA\Property(property="authorization", type="object",
 *                  @OA\Property(property="token", type="string"),
 *                  @OA\Property(property="type", type="string", example="bearer"),
 *              ),
 *          )
 *      ),
 * )
 */
```

- **`@OA\Post`**: Indica que esta anotación está asociada a una operación HTTP de tipo POST.

- **`path="/api/v1/refresh"`**: Especifica la ruta del endpoint para la actualización del token de autenticación.

- **`operationId="refresh"`**: Identificador único para la operación. Ayuda a distinguir entre operaciones en la documentación.

- **`tags={"Authentication"}`**: Asigna la operación a la etiqueta "Authentication", indicando que está relacionada con la autenticación y agrupándola en la documentación.

- **`summary="Actualizar el token de autenticación"`**: Proporciona un resumen breve de la operación, indicando que es para actualizar el token de autenticación.

- **`description="Actualiza el token de autenticación para el usuario autenticado"`**: Proporciona una descripción más detallada de la operación, explicando que su propósito es actualizar el token de autenticación para el usuario autenticado.

- **`security={{"bearerAuth": {}}}`**: Especifica que esta operación requiere autenticación mediante un token Bearer. Indica que el usuario debe estar autenticado para realizar esta operación.

- **`@OA\Response`**: Define las posibles respuestas de la operación.

  - **`response=200`**: Respuesta exitosa para la actualización del token de autenticación.

    - **`description="Token de autenticación actualizado exitosamente"`**: Descripción de la respuesta.

    - **`@OA\JsonContent`**: Define el contenido de la respuesta en formato JSON.

      - **`@OA\Property(property="user", type="object")`**: Propiedad "user" de tipo objeto en la respuesta JSON. Indica que se espera información del usuario en la respuesta.

      - **`@OA\Property(property="authorization", type="object"`**: Propiedad "authorization" de tipo objeto en la respuesta JSON.

        - **`@OA\Property(property="token", type="string")`**: Propiedad "token" de tipo cadena en la respuesta JSON. Indica que se espera un nuevo token de autenticación.

        - **`@OA\Property(property="type", type="string", example="bearer")`**: Propiedad "type" de tipo cadena en la respuesta JSON. Indica el tipo de token, que en este caso es "bearer".

Esta anotación documenta claramente cómo realizar la actualización del token de autenticación en la API, qué esperar como respuesta exitosa y qué seguridad se requiere para realizar esta operación.

## CervezaController

```js
/**
 * @OA\Info(
 *     title="Cervezas de Importación e-commerce",
 *     version="1.0",
 *     description="Descripcion"
 * )
 *
 * @OA\Server(url="http://localhost:8000")
 *
 * @OA\Schema(
 *     schema="Cerveza",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="nombre", type="string"),
 *     @OA\Property(property="descripcion", type="string"),
 *     @OA\Property(property="color", type="string"),
 *     @OA\Property(property="graduacion", type="string"),
 *     @OA\Property(property="tipo", type="string"),
 *     @OA\Property(property="pais", type="string"),
 *     @OA\Property(property="novedad", type="boolean"),
 *     @OA\Property(property="oferta", type="boolean"),
 *     @OA\Property(property="precio", type="number"),
 *     @OA\Property(property="foto", type="string"),
 *     @OA\Property(property="marca", type="string"),
 * )
 */
```

**Significado de las anotaciones**

1. `@OA\Info`: Esta anotación define información general sobre la API.

   - `title`: Especifica el título de la API ("Cervezas de Importación e-commerce").
   - `version`: Indica la versión de la API ("1.0").
   - `description`: Proporciona una descripción general de la API ("Descripcion").

2. `@OA\Server`: Define el servidor base para la API.

   - `url`: Establece la URL base del servidor ("http://localhost:8000").

3. `@OA\Schema`: Define un esquema de datos llamado "Cerveza" que describe la estructura de los objetos de tipo cerveza en la API.
   - `@OA\Property`: Especifica las propiedades de un objeto "Cerveza", cada una con su nombre y tipo. - `id`: Tipo entero. - `nombre`: Tipo cadena de texto. - `descripcion`: Tipo cadena de texto. - `color`: Tipo cadena de texto. - `graduacion`: Tipo cadena de texto. - `tipo`: Tipo cadena de texto. - `pais`: Tipo cadena de texto. - `novedad`: Tipo booleano. - `oferta`: Tipo booleano. - `precio`: Tipo número. - `foto`: Tipo cadena de texto. - `marca`: Tipo cadena de texto.

### Código completo del controlador

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

/**
 * @OA\Info(
 *     title="Cervezas de Importación e-commerce",
 *     version="1.0",
 *     description="Descripcion"
 * )
 *
 * @OA\Server(url="http://localhost:8000")
 *
 * @OA\Schema(
 *     schema="Cerveza",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="nombre", type="string"),
 *     @OA\Property(property="descripcion", type="string"),
 *     @OA\Property(property="color", type="string"),
 *     @OA\Property(property="graduacion", type="string"),
 *     @OA\Property(property="tipo", type="string"),
 *     @OA\Property(property="pais", type="string"),
 *     @OA\Property(property="novedad", type="boolean"),
 *     @OA\Property(property="oferta", type="boolean"),
 *     @OA\Property(property="precio", type="number"),
 *     @OA\Property(property="foto", type="string"),
 *     @OA\Property(property="marca", type="string"),
 * )
 */


class CervezaController extends Controller
{
    /**
     * @OA\SecurityScheme(
     *     type="http",
     *     description="Autenticación Bearer JWT",
     *     scheme="bearer",
     *     securityScheme="bearerAuth"
     * )
     */

    public function __construct()
    {
        $this->middleware('auth:api')->only(['store', 'destroy', 'update', 'patch']);
    }
    /**
     * Display a listing of the resource.
     */
    /**
     * @OA\Get(
     *      path="/api/v1/cervezas",
     *      operationId="getCervezasList",
     *      tags={"Cervezas"},
     *      summary="Obtener la lista de cervezas",
     *      description="Devuelve la lista de cervezas",
     *      @OA\Parameter(
     *          name="per_page",
     *          description="Number of items per page",
     *          required=false,
     *          in="query",
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Parameter(
     *          name="page",
     *          description="Page number",
     *          required=false,
     *          in="query",
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Parameter(
     *          name="color_id",
     *          description="Filter by color ID",
     *          required=false,
     *          in="query",
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Parameter(
     *          name="pais_id",
     *          description="Filter by pais ID",
     *          required=false,
     *          in="query",
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Parameter(
     *          name="tipo_id",
     *          description="Filter by tipo ID",
     *          required=false,
     *          in="query",
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Parameter(
     *          name="novedad",
     *          description="Filter by novedad",
     *          required=false,
     *          in="query",
     *          @OA\Schema(type="boolean")
     *      ),
     *      @OA\Parameter(
     *          name="oferta",
     *          description="Filter by oferta",
     *          required=false,
     *          in="query",
     *          @OA\Schema(type="boolean")
     *      ),
     *      @OA\Parameter(
     *          name="marca",
     *          description="Filter by marca",
     *          required=false,
     *          in="query",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\Parameter(
     *          name="precio_desde",
     *          description="Filter by minimum price",
     *          required=false,
     *          in="query",
     *          @OA\Schema(type="numeric")
     *      ),
     *      @OA\Parameter(
     *          name="precio_hasta",
     *          description="Filter by maximum price",
     *          required=false,
     *          in="query",
     *          @OA\Schema(type="numeric")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items(ref="#/components/schemas/Cerveza")
     *          )
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad request"
     *      )
     * )
     */
    public function index(Request $request)
    {
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

        // Devuelve una respuesta JSON con los resultados paginados
        return response()->json($results);
    }

    /**
     * Store a newly created resource in storage.
     */
    /**
     * @OA\Post(
     *      path="/api/v1/cervezas",
     *      operationId="storeCerveza",
     *      tags={"Cervezas"},
     *      summary="Create a new cerveza",
     *      description="Creates a new cerveza and stores it in the database",
     *      security={{"bearerAuth": {}}},
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(property="nombre", type="string"),
     *                  @OA\Property(property="descripcion", type="string"),
     *                  @OA\Property(property="color_id", type="integer"),
     *                  @OA\Property(property="graduacion_id", type="integer"),
     *                  @OA\Property(property="tipo_id", type="integer"),
     *                  @OA\Property(property="pais_id", type="integer"),
     *                  @OA\Property(property="novedad", type="boolean"),
     *                  @OA\Property(property="oferta", type="boolean"),
     *                  @OA\Property(property="precio", type="number"),
     *                  @OA\Property(property="foto", type="string", format="binary"),
     *                  @OA\Property(property="marca", type="string"),
     *              ),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Cerveza created successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="id", type="integer"),
     *              @OA\Property(property="nombre", type="string"),
     *              @OA\Property(property="descripcion", type="string"),
     *              @OA\Property(property="color_id", type="integer"),
     *              @OA\Property(property="graduacion_id", type="integer"),
     *              @OA\Property(property="tipo_id", type="integer"),
     *              @OA\Property(property="pais_id", type="integer"),
     *              @OA\Property(property="novedad", type="boolean"),
     *              @OA\Property(property="oferta", type="boolean"),
     *              @OA\Property(property="precio", type="number"),
     *              @OA\Property(property="foto", type="string"),
     *              @OA\Property(property="marca", type="string"),
     *          )
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad request",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string")
     *          )
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string")
     *          )
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal Server Error",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string")
     *          )
     *      ),
     * )
     */
    public function store(Request $request)
    {
        // Comenzar una transacción de base de datos
        DB::beginTransaction();

        try {
            // Define las reglas de validación para los campos
            $rules = [
                'nombre' => 'required|unique:cervezas',
                'descripcion' => 'required',
                'color_id' => 'required|numeric',
                'graduacion_id' => 'required|numeric',
                'tipo_id' => 'required|numeric',
                'pais_id' => 'required|numeric',
                'novedad' => 'required|boolean',
                'oferta' => 'required|boolean',
                'precio' => 'required|numeric',
                'foto' => 'required|image|max:2048',
                'marca' => 'required',
            ];

            // Realiza la validación de la solicitud
            $validator = Validator::make($request->all(), $rules);

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
            // Procesa la imagen y guárdala en la carpeta 'storage/images'
            if ($request->hasFile('foto')) {
                $path = $request->file('foto')->store('/public/images');
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

    /**
     * Display the specified resource.
     */
    /**
     * @OA\Get(
     *      path="/api/v1/cervezas/{id}",
     *      operationId="getCervezaById",
     *      tags={"Cervezas"},
     *      summary="Get cerveza details by ID",
     *      description="Returns details of a cerveza based on its ID",
     *      @OA\Parameter(
     *          name="id",
     *          description="ID of the cerveza",
     *          required=true,
     *          in="path",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="id", type="integer"),
     *              @OA\Property(property="nombre", type="string"),
     *              @OA\Property(property="descripcion", type="string"),
     *              @OA\Property(property="color_id", type="integer"),
     *              @OA\Property(property="graduacion_id", type="integer"),
     *              @OA\Property(property="tipo_id", type="integer"),
     *              @OA\Property(property="pais_id", type="integer"),
     *              @OA\Property(property="novedad", type="boolean"),
     *              @OA\Property(property="oferta", type="boolean"),
     *              @OA\Property(property="precio", type="number"),
     *              @OA\Property(property="foto", type="string"),
     *              @OA\Property(property="marca", type="string"),
     *          )
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Cerveza not found",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string")
     *          )
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string")
     *          )
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal Server Error",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string")
     *          )
     *      ),
     * )
     */

    public function show(string $id)
    {
        $cerveza = Cerveza::find($id);
        return response()->json($cerveza, 200);
    }

    /**
     * @OA\Put(
     *      path="/api/v1/cervezas/{id}",
     *      operationId="updateCerveza",
     *      tags={"Cervezas"},
     *      summary="Update cerveza details by ID",
     *      description="Updates details of a cerveza based on its ID",
     *      security={{"bearerAuth": {}}},
     *      @OA\Parameter(
     *          name="id",
     *          description="ID of the cerveza",
     *          required=true,
     *          in="path",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          description="Cerveza details to be updated",
     *          @OA\JsonContent(
     *              @OA\Property(property="nombre", type="string"),
     *              @OA\Property(property="descripcion", type="string"),
     *              @OA\Property(property="color_id", type="integer"),
     *              @OA\Property(property="graduacion_id", type="integer"),
     *              @OA\Property(property="tipo_id", type="integer"),
     *              @OA\Property(property="pais_id", type="integer"),
     *              @OA\Property(property="novedad", type="boolean"),
     *              @OA\Property(property="oferta", type="boolean"),
     *              @OA\Property(property="precio", type="number"),
     *              @OA\Property(property="foto", type="string"),
     *              @OA\Property(property="marca", type="string"),
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="id", type="integer"),
     *              @OA\Property(property="nombre", type="string"),
     *              @OA\Property(property="descripcion", type="string"),
     *              @OA\Property(property="color_id", type="integer"),
     *              @OA\Property(property="graduacion_id", type="integer"),
     *              @OA\Property(property="tipo_id", type="integer"),
     *              @OA\Property(property="pais_id", type="integer"),
     *              @OA\Property(property="novedad", type="boolean"),
     *              @OA\Property(property="oferta", type="boolean"),
     *              @OA\Property(property="precio", type="number"),
     *              @OA\Property(property="foto", type="string"),
     *              @OA\Property(property="marca", type="string"),
     *          )
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad request",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string")
     *          )
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string")
     *          )
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Cerveza not found",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string")
     *          )
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal Server Error",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string")
     *          )
     *      ),
     * )
     */
    public function update(Request $request, $id)
    {
        // El código del método permanece sin cambios
    }

    /**
     * @OA\Patch(
     *      path="/api/v1/cervezas/{id}",
     *      operationId="patchCerveza",
     *      tags={"Cervezas"},
     *      summary="Patch cerveza details by ID",
     *      description="Partially updates details of a cerveza based on its ID",
     *      security={{"bearerAuth": {}}},
     *      @OA\Parameter(
     *          name="id",
     *          description="ID of the cerveza",
     *          required=true,
     *          in="path",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          description="Cerveza details to be partially updated",
     *          @OA\JsonContent(
     *              @OA\Property(property="nombre", type="string"),
     *              @OA\Property(property="descripcion", type="string"),
     *              @OA\Property(property="color_id", type="integer"),
     *              @OA\Property(property="graduacion_id", type="integer"),
     *              @OA\Property(property="tipo_id", type="integer"),
     *              @OA\Property(property="pais_id", type="integer"),
     *              @OA\Property(property="novedad", type="boolean"),
     *              @OA\Property(property="oferta", type="boolean"),
     *              @OA\Property(property="precio", type="number"),
     *              @OA\Property(property="foto", type="string"),
     *              @OA\Property(property="marca", type="string"),
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="id", type="integer"),
     *              @OA\Property(property="nombre", type="string"),
     *              @OA\Property(property="descripcion", type="string"),
     *              @OA\Property(property="color_id", type="integer"),
     *              @OA\Property(property="graduacion_id", type="integer"),
     *              @OA\Property(property="tipo_id", type="integer"),
     *              @OA\Property(property="pais_id", type="integer"),
     *              @OA\Property(property="novedad", type="boolean"),
     *              @OA\Property(property="oferta", type="boolean"),
     *              @OA\Property(property="precio", type="number"),
     *              @OA\Property(property="foto", type="string"),
     *              @OA\Property(property="marca", type="string"),
     *          )
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad request",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string")
     *          )
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string")
     *          )
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Cerveza not found",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string")
     *          )
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal Server Error",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string")
     *          )
     *      ),
     * )
     */
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


    /**
 * @OA\Delete(
 *      path="/api/v1/cervezas/{id}",
 *      operationId="deleteCerveza",
 *      tags={"Cervezas"},
 *      summary="Delete a cerveza by ID",
 *      description="Deletes a cerveza based on its ID",
 *      security={{"bearerAuth": {}}},
 *      @OA\Parameter(
 *          name="id",
 *          description="ID of the cerveza",
 *          required=true,
 *          in="path",
 *          @OA\Schema(type="string")
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Successful operation",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string")
 *          )
 *      ),
 *      @OA\Response(
 *          response=404,
 *          description="Cerveza not found",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string")
 *          )
 *      ),
 *      @OA\Response(
 *          response=500,
 *          description="Internal Server Error",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string")
 *          )
 *      ),
 * )
 */

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

## ColorController

```js
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Color; // Asegúrate de importar el modelo Color
use Illuminate\Support\Facades\Validator;


class ColorController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api')->only(['store', 'destroy', 'update']);
    }

    /**
     * Display a listing of the resource.
     *
     * Método: index
     * Ruta asociada: GET /colors
     * Descripción: Este método muestra una lista de recursos (en este caso, colores).
     */
    /**
     * @OA\Get(
     *      path="/api/v1/colores",
     *      operationId="getColores",
     *      tags={"Colores"},
     *      summary="Obtener todos los colores",
     *      description="Recupera todos los colores de la base de datos y los devuelve como una respuesta JSON",
     *      @OA\Response(
     *          response=200,
     *          description="Lista de colores",
     *          @OA\JsonContent(
     *              @OA\Property(property="colores", type="array",
     *                  @OA\Items(
     *                      @OA\Property(property="id", type="integer", example=1),
     *                      @OA\Property(property="nombre", type="string", example="Rojo"),
     *                      @OA\Property(property="codigo", type="string", example="#FF0000"),
     *                  ),
     *              ),
     *          ),
     *      ),
     * )
     */

    public function index()
    {
        // Recupera todos los colores desde la base de datos y los devuelve como una respuesta JSON
        $colores = Color::all();
        return response()->json(['colores' => $colores]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * Método: create
     * Ruta asociada: GET /colors/create
     * Descripción: Este método muestra el formulario para crear un nuevo recurso (color).
     */
    /**
     * @OA\Post(
     *      path="/api/v1/colores",
     *      operationId="createColor",
     *      tags={"Colores"},
     *      summary="Crear un nuevo color",
     *      description="Crea un nuevo color utilizando los datos proporcionados en la solicitud y lo devuelve como una respuesta JSON",
     *      security={{"bearerAuth": {}}},
     *      @OA\RequestBody(
     *          required=true,
     *          description="Datos del nuevo color",
     *          @OA\JsonContent(
     *              @OA\Property(property="nombre", type="string", example="Azul"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Color creado con éxito",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Color creado con éxito"),
     *              @OA\Property(property="color", type="object",
     *                  @OA\Property(property="id", type="integer", example=2),
     *                  @OA\Property(property="nombre", type="string", example="Azul"),
     *                  @OA\Property(property="created_at", type="string", format="date-time"),
     *                  @OA\Property(property="updated_at", type="string", format="date-time"),
     *              ),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="Error de validación",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Los datos proporcionados no son válidos"),
     *              @OA\Property(property="errors", type="object",
     *                  @OA\Property(property="nombre", type="array", @OA\Items(type="string")),
     *              ),
     *          ),
     *      ),
     * )
     */

    public function store(Request $request)
    {
        // Validación de los datos del nuevo color (por ejemplo, nombre, código de color).
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255|unique:colores'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //Debe estar configurado fillable en el modelo para
        //utilizar inserción masiva

        $color = Color::create($request->all());

        // Retornar una respuesta JSON que confirma la creación exitosa del color.
        return response()->json(['message' => 'Color creado con éxito', 'color' => $color], 201);
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
    /**
     * @OA\Put(
     *      path="/api/v1/colores/{id}",
     *      operationId="updateColor",
     *      tags={"Colores"},
     *      summary="Actualizar un color existente",
     *      description="Actualiza un color existente utilizando los datos proporcionados en la solicitud y lo devuelve como una respuesta JSON",
     *      security={{"bearerAuth": {}}},
     *      @OA\Parameter(
     *          name="id",
     *          description="ID del color a actualizar",
     *          required=true,
     *          in="path",
     *          @OA\Schema(type="string"),
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          description="Datos actualizados del color",
     *          @OA\JsonContent(
     *              @OA\Property(property="nombre", type="string", example="Verde"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Color actualizado con éxito",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Color actualizado con éxito"),
     *              @OA\Property(property="color", type="object",
     *                  @OA\Property(property="id", type="integer", example=2),
     *                  @OA\Property(property="nombre", type="string", example="Verde"),
     *                  @OA\Property(property="created_at", type="string", format="date-time"),
     *                  @OA\Property(property="updated_at", type="string", format="date-time"),
     *              ),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Color no encontrado",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Color no encontrado"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="Error de validación",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Los datos proporcionados no son válidos"),
     *              @OA\Property(property="errors", type="object",
     *                  @OA\Property(property="nombre", type="array", @OA\Items(type="string")),
     *              ),
     *          ),
     *      ),
     * )
     */

    public function update(Request $request, string $id)
    {
        // Validación de los datos actualizados del color.
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255|unique:colores'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Los datos proporcionados no son válidos', 'errors' => $validator->errors()], 422);
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
    /**
     * @OA\Delete(
     *      path="/api/v1/colores/{id}",
     *      operationId="deleteColor",
     *      tags={"Colores"},
     *      summary="Eliminar un color existente",
     *      description="Elimina un color existente por su ID y lo devuelve como una respuesta JSON",
     *      security={{"bearerAuth": {}}},
     *      @OA\Parameter(
     *          name="id",
     *          description="ID del color a eliminar",
     *          required=true,
     *          in="path",
     *          @OA\Schema(type="string"),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Color eliminado con éxito",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Color eliminado con éxito"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Color no encontrado",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Color no encontrado"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="No se pudo borrar el color, tiene cervezas relacionadas",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="No se pudo borrar el color, tiene cervezas relacionadas"),
     *          ),
     *      ),
     * )
     */

    public function destroy(string $id)
    {
        // Buscar el color por su ID en la base de datos.
        $color = Color::find($id);

        if (!$color) {
            return response()->json(['message' => 'Color no encontrado'], 404);
        }

        if ($color->cervezas()->exists()) {
            return response()->json(['message' => 'No se pudo borrar el color, tiene cervezas relacionadas'], 400);
        }

        // Eliminar el color de la base de datos.
        $color->delete();

        // Retornar una respuesta JSON que confirma la eliminación exitosa del color.
        return response()->json(['message' => 'Color eliminado con éxito']);
    }
}
```

## GraduacionController

```js
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Graduacion;
use Illuminate\Support\Facades\Validator;


/**
 * @OA\Schema(
 *     schema="Graduacion",
 *     type="object",
 *     title="Graduacion",
 *     properties={
 *         @OA\Property(property="id", type="integer", format="int64"),
 *         @OA\Property(property="nombre", type="string"),
 *     }
 * )
 */


class GraduacionController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api')->only(['store', 'destroy', 'update']);
    }
    /**
     * Display a listing of the resource.
     *
     * Método: index
     * Ruta asociada: GET /tipos
     * Descripción: Este método muestra una lista de recursos (en este caso, tipoes).
     */

    /**
     * @OA\Get(
     *      path="/api/v1/graduaciones",
     *      operationId="getGraduaciones",
     *      tags={"Graduaciones"},
     *      summary="Obtener todas las graduaciones",
     *      description="Recupera todas las graduaciones desde la base de datos y las retorna como una respuesta JSON.",
     *      @OA\Response(
     *          response=200,
     *          description="Lista de graduaciones",
     *          @OA\JsonContent(
     *              @OA\Property(property="graduaciones", type="array", @OA\Items(ref="#/components/schemas/Graduacion")),
     *          ),
     *      ),
     * )
     */


    public function index()
    {
        // Recuperar todos los tipos desde la base de datos y retornarlos como una respuesta JSON
        $graduaciones = Graduacion::all();
        return response()->json(['graduaciones' => $graduaciones]);
    }


    /**
     * @OA\Post(
     *      path="/api/v1/graduaciones",
     *      operationId="storeGraduacion",
     *      summary="Crear una nueva graduación",
     *      tags={"Graduaciones"},
     *      description="Crea una nueva graduación con los datos proporcionados en la solicitud y la retorna como una respuesta JSON.",
     *      @OA\RequestBody(
     *          required=true,
     *          description="Datos de la nueva graduación",
     *          @OA\JsonContent(
     *              required={"nombre"},
     *              @OA\Property(property="nombre", type="string", maxLength=150, description="Nombre de la nueva graduación"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Graduación creada con éxito",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Graduación creado con éxito"),
     *              @OA\Property(property="graduacion", type="object", ref="#/components/schemas/Graduacion"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="Error de validación",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="El nombre ya está en uso."),
     *          ),
     *      ),
     *      security={{"bearerAuth": {}}}
     * )
     */
    public function store(Request $request)
    {
        // Validación de los datos del nuevo tipo (por ejemplo, nombre, código de tipo).
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:150|unique:graduaciones'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //Debe estar configurado fillable en el modelo para
        //utilizar inserción masiva
        $graduacion = Graduacion::create($request->all());

        // Retornar una respuesta JSON que confirma la creación exitosa del tipo.
        return response()->json(['message' => 'Graduación creada con éxito', 'graduacion' => $graduacion], 201);
    }

    /**
     * @OA\Get(
     *      path="/api/v1/graduaciones/{id}",
     *      operationId="getGraduacionById",
     *      tags={"Graduaciones"},
     *      summary="Obtener información de una graduación específica",
     *      description="Recupera la información de una graduación específica identificada por su ID y la retorna como una respuesta JSON.",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          description="ID de la graduación",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Información de la graduación",
     *          @OA\JsonContent(
     *              @OA\Property(property="Graduacion", ref="#/components/schemas/Graduacion"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Graduación no encontrada",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Graduación no encontrado"),
     *          ),
     *      ),
     * )
     */

    public function show(string $id)
    {
        // Buscar el tipo por su ID en la base de datos y retornarlo como una respuesta JSON.
        $graduacion = Graduacion::find($id);

        if (!$graduacion) {
            return response()->json(['message' => 'Graduación no encontrado'], 404);
        }


        return response()->json(['Graducación' => $graduacion]);
    }

    /**
     * @OA\Put(
     *      path="/api/v1/graduaciones/{id}",
     *      operationId="updateGraduacion",
     *      tags={"Graduaciones"},
     *      summary="Actualizar una graduación existente",
     *      description="Actualiza una graduación existente identificada por su ID con los datos proporcionados en la solicitud y la retorna como una respuesta JSON.",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          description="ID de la graduación a actualizar",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          description="Datos actualizados de la graduación",
     *          @OA\JsonContent(
     *              required={"nombre"},
     *              @OA\Property(property="nombre", type="string", maxLength=150, description="Nuevo nombre de la graduación"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Graduación actualizada con éxito",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Graduación actualizado con éxito"),
     *              @OA\Property(property="graduacion", ref="#/components/schemas/Graduacion"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Graduación no encontrada",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Graduación no encontrado"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="Error de validación",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="El nombre ya está en uso."),
     *          ),
     *      ),
     *      security={{"bearerAuth": {}}}
     * )
     */

    public function update(Request $request, string $id)
    {
        // Validación de los datos actualizados del tipo.
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:150|unique:graduaciones'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
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
     * @OA\Delete(
     *      path="/api/v1/graduaciones/{id}",
     *      operationId="destroyGraduacion",
     *      tags={"Graduaciones"},
     *      summary="Eliminar una graduación existente",
     *      description="Elimina una graduación existente identificada por su ID y la retorna como una respuesta JSON.",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          description="ID de la graduación a eliminar",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Graduación eliminada con éxito",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Graduación eliminado con éxito"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Graduación no encontrada",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Graduación no encontrado"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="No se pudo borrar la graduación, tiene cervezas relacionadas",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="No se pudo borrar la graduación, tiene cervezas relacionadas"),
     *          ),
     *      ),
     *      security={{"bearerAuth": {}}}
     * )
     */

    public function destroy(string $id)
    {
        // Buscar el tipo por su ID en la base de datos.

        $graduacion = Graduacion::find($id);

        if (!$graduacion) {
            return response()->json(['message' => 'Graduación no encontrada'], 404);
        }

        if ($graduacion->cervezas()->exists()) {
            return response()->json(['message' => 'No se pudo borrar la graduación, tiene cervezas relacionadas'], 400);
        }

        // Eliminar el tipo de la base de datos.
        $graduacion->delete();

        // Retornar una respuesta JSON que confirma la eliminación exitosa del tipo.
        return response()->json(['message' => 'Graduación eliminado con éxito']);
    }
}
```

## PaisController

```js
<<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pais;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Schema(
 *     schema="Pais",
 *     type="object",
 *     title="Paises",
 *     properties={
 *         @OA\Property(property="id", type="integer", format="int64"),
 *         @OA\Property(property="nombre", type="string"),
 *     }
 * )
 */

class PaisController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api')->only(['store', 'destroy', 'update']);
    }

    /**
     * @OA\Get(
     *      path="/api/v1/paises",
     *      operationId="indexPais",
     *      tags={"Paises"},
     *      summary="Listar todos los países",
     *      description="Muestra una lista de todos los países en una respuesta JSON.",
     *      @OA\Response(
     *          response=200,
     *          description="Lista de países",
     *          @OA\JsonContent(
     *              @OA\Property(property="paises", type="array", @OA\Items(ref="#/components/schemas/Pais")),
     *          ),
     *      ),
     * )
     */

    public function index()
    {
        // Recuperar todos los paises desde la base de datos y retornarlos como una respuesta JSON
        $paises = Pais::all();
        return response()->json(['paises' => $paises]);
    }

    /**
     * @OA\Post(
     *      path="/api/v1/paises",
     *      operationId="storePais",
     *      tags={"Paises"},
     *      summary="Crear un nuevo país",
     *      description="Crea un nuevo país con los datos proporcionados en la solicitud y lo retorna como una respuesta JSON.",
     *      @OA\RequestBody(
     *          required=true,
     *          description="Datos del nuevo país",
     *          @OA\JsonContent(
     *              required={"nombre"},
     *              @OA\Property(property="nombre", type="string", maxLength=255, description="Nombre del nuevo país"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="País creado con éxito",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="País creado con éxito"),
     *              @OA\Property(property="pais", type="object", ref="#/components/schemas/Pais"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="Error de validación",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="El nombre ya está en uso."),
     *          ),
     *      ),
     *      security={{"bearerAuth": {}}}
     * )
     */
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

    /**
     * @OA\Get(
     *      path="/api/v1/paises/{id}",
     *      operationId="showPais",
     *      tags={"Paises"},
     *      summary="Mostrar un país específico",
     *      description="Muestra un país específico identificado por su ID en una respuesta JSON.",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          description="ID del país a mostrar",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="País encontrado",
     *          @OA\JsonContent(
     *              @OA\Property(property="País", type="object", ref="#/components/schemas/Pais"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="País no encontrado",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="País no encontrado"),
     *          ),
     *      ),
     * )
     */

    public function show(string $id)
    {
        // Buscar el pais por su ID en la base de datos y retornarlo como una respuesta JSON.
        $pais = Pais::find($id);

        if (!$pais) {
            return response()->json(['message' => 'país no encontrado'], 404);
        }

        return response()->json(['País' => $pais]);
    }

    /**
     * @OA\Put(
     *      path="/api/v1/paises/{id}",
     *      operationId="updatePais",
     *      tags={"Paises"},
     *      summary="Actualizar un país existente",
     *      description="Actualiza un país existente identificado por su ID con los datos proporcionados en la solicitud y lo retorna como una respuesta JSON.",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          description="ID del país a actualizar",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          description="Datos actualizados del país",
     *          @OA\JsonContent(
     *              required={"nombre"},
     *              @OA\Property(property="nombre", type="string", maxLength=255, description="Nombre actualizado del país"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="País actualizado con éxito",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="País actualizado con éxito"),
     *              @OA\Property(property="pais", type="object", ref="#/components/schemas/Pais"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="País no encontrado",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="País no encontrado"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="Error de validación",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="El nombre ya está en uso."),
     *          ),
     *      ),
     *      security={{"bearerAuth": {}}}
     * )
     */

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

    /**
     * @OA\Delete(
     *      path="/api/v1/paises/{id}",
     *      operationId="destroyPais",
     *      tags={"Paises"},
     *      summary="Eliminar un país existente",
     *      description="Elimina un país existente identificado por su ID y lo retorna como una respuesta JSON.",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          description="ID del país a eliminar",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="País eliminado con éxito",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="País eliminado con éxito"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="País no encontrado",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="País no encontrado"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="No se pudo borrar el país, tiene cervezas relacionadas",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="No se pudo borrar el país, tiene cervezas relacionadas"),
     *          ),
     *      ),
     *      security={{"bearerAuth": {}}}
     * )
     */

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

## TipoController

```js
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tipo;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Schema(
 *     schema="Tipo",
 *     type="object",
 *     title="Tipos",
 *     properties={
 *         @OA\Property(property="id", type="integer", format="int64"),
 *         @OA\Property(property="nombre", type="string"),
 *     }
 * )
 */



class TipoController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api')->only(['store', 'destroy','update']);
    }
    /**
     * @OA\Get(
     *      path="/api/v1/tipos",
     *      operationId="indexTipo",
     *      tags={"Tipos"},
     *      summary="Listar todos los tipos",
     *      description="Muestra una lista de todos los tipos en una respuesta JSON.",
     *      @OA\Response(
     *          response=200,
     *          description="Lista de tipos",
     *          @OA\JsonContent(
     *              @OA\Property(property="tipos", type="array", @OA\Items(ref="#/components/schemas/Tipo")),
     *          ),
     *      ),
     * )
     */

    public function index()
    {
        // Recuperar todos los tipoes desde la base de datos y retornarlos como una respuesta JSON
        $tipos = Tipo::all();
        return response()->json(['tipos' => $tipos]);
    }

       /**
     * @OA\Post(
     *      path="/api/v1/tipos",
     *      operationId="storeTipo",
     *      tags={"Tipos"},
     *      summary="Crear un nuevo tipo",
     *      description="Crea un nuevo tipo con los datos proporcionados en la solicitud y lo retorna como una respuesta JSON.",
     *      @OA\RequestBody(
     *          required=true,
     *          description="Datos del nuevo tipo",
     *          @OA\JsonContent(
     *              required={"nombre"},
     *              @OA\Property(property="nombre", type="string", maxLength=150, description="Nombre del nuevo tipo"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Tipo creado con éxito",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Tipo creado con éxito"),
     *              @OA\Property(property="tipo", type="object", ref="#/components/schemas/Tipo"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="Error de validación",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="El nombre ya está en uso."),
     *          ),
     *      ),
     *      security={{"bearerAuth": {}}}
     * )
     */
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

    /**
     * @OA\Get(
     *      path="/api/v1/tipos/{id}",
     *      operationId="showTipo",
     *      tags={"Tipos"},
     *      summary="Mostrar un tipo específico",
     *      description="Muestra un tipo específico identificado por su ID en una respuesta JSON.",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          description="ID del tipo a mostrar",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Tipo encontrado",
     *          @OA\JsonContent(
     *              @OA\Property(property="Tipo", type="object", ref="#/components/schemas/Tipo"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Tipo no encontrado",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Tipo no encontrado"),
     *          ),
     *      ),
     * )
     */
    public function show(string $id)
    {
        // Buscar el tipo por su ID en la base de datos y retornarlo como una respuesta JSON.
        $tipo = Tipo::find($id);

        if (!$tipo) {
            return response()->json(['message' => 'Tipo no encontrado'], 404);
        }


        return response()->json(['Tipo' => $tipo]);
    }


   /**
     * @OA\Put(
     *      path="/api/v1/tipos/{id}",
     *      operationId="updateTipo",
     *      tags={"Tipos"},
     *      summary="Actualizar un tipo existente",
     *      description="Actualiza un tipo existente identificado por su ID con los datos proporcionados en la solicitud y lo retorna como una respuesta JSON.",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          description="ID del tipo a actualizar",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          description="Datos actualizados del tipo",
     *          @OA\JsonContent(
     *              required={"nombre"},
     *              @OA\Property(property="nombre", type="string", maxLength=150, description="Nombre actualizado del tipo"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Tipo actualizado con éxito",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Tipo actualizado con éxito"),
     *              @OA\Property(property="tipo", type="object", ref="#/components/schemas/Tipo"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Tipo no encontrado",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Tipo no encontrado"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="Error de validación",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="El nombre ya está en uso."),
     *          ),
     *      ),
     *      security={{"bearerAuth": {}}}
     * )
     */
    public function update(Request $request, string $id)
    {
        // Validación de los datos actualizados del tipo.
        $validator = Validator::make($request->all(),[
            'nombre' => 'required|string|max:150|unique:tipos'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }


        // Buscar el tipo por su ID en la base de datos.
        $tipo = Tipo::find($id);

        if (!$tipo) {
            return response()->json(['message' => 'tipo no encontrado'], 404);
        }

        // Actualizar los datos del tipo con los datos validados.
        $tipo->update($request->all());

        // Retornar una respuesta JSON que confirma la actualización exitosa del tipo.
        return response()->json(['message' => 'Tipo actualizado con éxito', 'tipo' => $tipo]);
    }

    /**
     * @OA\Delete(
     *      path="/api/v1/tipos/{id}",
     *      operationId="destroyTipo",
     *      tags={"Tipos"},
     *      summary="Eliminar un tipo existente",
     *      description="Elimina un tipo existente identificado por su ID y lo retorna como una respuesta JSON.",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          description="ID del tipo a eliminar",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Tipo eliminado con éxito",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Tipo eliminado con éxito"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Tipo no encontrado",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Tipo no encontrado"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="No se pudo borrar el tipo, tiene cervezas relacionadas",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="No se pudo borrar el tipo, tiene cervezas relacionadas"),
     *          ),
     *      ),
     *      security={{"bearerAuth": {}}}
     * )
     */

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

## ProvinciaController

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

    /*public function __construct()
    {
        $this->middleware('auth:api');
    }*/

    /**
     * @OA\Get(
     *      path="/api/v1/provincias",
     *      operationId="getProvincias",
     *      tags={"Provincias"},
     *      summary="Obtener todas las provincias",
     *      description="Recupera todas las provincias de la base de datos y las devuelve como una respuesta JSON ordenadas por nombre.",
     *      @OA\Response(
     *          response=200,
     *          description="Lista de provincias ordenadas por nombre",
     *          @OA\JsonContent(
     *              @OA\Property(property="provincias", type="array",
     *                  @OA\Items(
     *                      @OA\Property(property="id", type="integer", example=1),
     *                      @OA\Property(property="nombre", type="string", example="Provincia A"),
     *                      @OA\Property(property="created_at", type="string", format="date-time"),
     *                      @OA\Property(property="updated_at", type="string", format="date-time"),
     *                  ),
     *              ),
     *          ),
     *      ),
     * )
     */
    public function index()
    {
        // Recupera todas las provincias desde la base de datos y las devuelve como una respuesta JSON ordenadas por nombre
        return Provincia::orderBy('nombre')->get();
    }


}
```

## PoblacionControler

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
    /**
     * @OA\Get(
     *     path="/api/v1/poblaciones",
     *     operationId="index",
     *     tags={"Poblaciones"},
     *     summary="Obtener todas las poblaciones",
     *     description="Devuelve todas las poblaciones ordenadas por nombre o filtradas por provincia si se proporciona.",
     *     @OA\Parameter(
     *         name="provincia",
     *         in="query",
     *         description="Código de la provincia para filtrar las poblaciones.",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Devuelve todas las poblaciones ordenadas por nombre o filtradas por provincia si se proporciona.",
     *     )
     * )
     */

    public function index(Request $request)
    {
        $provincia = $request->input('provincia', ''); // Valor predeterminado es una cadena vacía

        return Poblacion::where('provincia_cod', $provincia)->orderBy('nombre')->get();
    }
}
```

## SystemController

```js
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class SystemController extends Controller
{
    /**
     * @OA\Get(
     *      path="/api/v1/consultaCervezasPorPais",
     *      operationId="consultaCervezasPorPais",
     *      tags={"System"},
     *      summary="Consulta la cantidad de cervezas por país",
     *      description="Devuelve la cantidad de cervezas agrupadas por país",
     *      @OA\Response(
     *          response=200,
     *          description="Operación exitosa",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items(
     *                  @OA\Property(property="cantidad", type="integer"),
     *                  @OA\Property(property="nombre", type="string"),
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Error interno del servidor",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string")
     *          )
     *      ),
     * )
     */
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

    /**
     * @OA\Get(
     *      path="/api/v1/consultaCervezasPorTipo",
     *      operationId="consultaCervezasPorTipo",
     *      tags={"System"},
     *      summary="Consulta la cantidad de cervezas por tipo",
     *      description="Devuelve la cantidad de cervezas agrupadas por tipo",
     *      @OA\Response(
     *          response=200,
     *          description="Operación exitosa",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items(
     *                  @OA\Property(property="cantidad", type="integer"),
     *                  @OA\Property(property="nombre", type="string"),
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Error interno del servidor",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string")
     *          )
     *      ),
     * )
     */
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

    /**
     * @OA\Get(
     *      path="/api/v1/consultaBD",
     *      operationId="consultaBD",
     *      tags={"System"},
     *      summary="Consulta el tamaño de las tablas de la base de datos",
     *      description="Devuelve el tamaño de las tablas de la base de datos en megabytes",
     *      @OA\Response(
     *          response=200,
     *          description="Operación exitosa",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items(
     *                  @OA\Property(property="table_name", type="string"),
     *                  @OA\Property(property="table_rows", type="integer"),
     *                  @OA\Property(property="data_size_mb", type="number"),
     *                  @OA\Property(property="index_size_mb", type="number"),
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Error interno del servidor",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string")
     *          )
     *      ),
     * )
     */
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

    /**
     * @OA\Get(
     *      path="/api/v1/consultaTablas",
     *      operationId="consultaTablas",
     *      tags={"System"},
     *      summary="Consulta las tablas de la base de datos",
     *      description="Devuelve las tablas de la base de datos",
     *      @OA\Response(
     *          response=200,
     *          description="Operación exitosa",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items(
     *                  @OA\Property(property="table_name", type="string"),
     *                  @OA\Property(property="table_rows", type="integer"),
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Error interno del servidor",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string")
     *          )
     *      ),
     * )
     */
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

