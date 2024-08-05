---
sidebar_position: 4
---
# Sanctum y swagger

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

## Documentación controladores

### AuthController
```ts
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

/**
 * @OA\Info(
 *     title="API de mi aplicación",
 *     version="1.0.0",
 *     description="Descripción de mi API",
 *     termsOfService="https://example.com/terms/",
 *     @OA\Contact(
 *         email="contacto@example.com"
 *     ),
 *     @OA\License(
 *         name="MIT",
 *         url="https://opensource.org/licenses/MIT"
 *     )
 * )
 * @OA\Server(url="http://localhost:8000")
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 */
class AuthController extends Controller
{
    /**
     * Registro de un nuevo usuario.
     */
    /**
     * @OA\Post(
     *     path="/api/register",
     *     operationId="register",
     *     tags={"Authentication"},
     *     summary="Registro de un nuevo usuario",
     *     description="Registro de un nuevo usuario en la aplicación",
     *     @OA\RequestBody(
     *         required=true,
     *         description="Datos del nuevo usuario",
     *         @OA\JsonContent(
     *             required={"name","email","password"},
     *             @OA\Property(property="name", type="string", example="John Doe"),
     *             @OA\Property(property="email", type="string", format="email", example="john@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="password123")
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Operación exitosa",
     *         @OA\JsonContent(
     *             @OA\Property(property="user", type="object"),
     *             @OA\Property(property="token", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validación fallida",
     *         @OA\JsonContent(
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('authToken')->plainTextToken
        ]);
    }

    /**
     * Inicio de sesión y obtención del token.
     */
    /**
     * @OA\Post(
     *     path="/api/login",
     *     operationId="login",
     *     tags={"Authentication"},
     *     summary="Inicio de sesión",
     *     description="Inicia sesión y devuelve el token de autenticación",
     *     @OA\RequestBody(
     *         required=true,
     *         description="Credenciales de inicio de sesión",
     *         @OA\JsonContent(
     *             required={"email","password"},
     *             @OA\Property(property="email", type="string", format="email", example="admin@test.com"),
     *             @OA\Property(property="password", type="string", format="password", example="admin_password")
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Operación exitosa",
     *         @OA\JsonContent(
     *             @OA\Property(property="user", type="object"),
     *             @OA\Property(property="token", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Credenciales incorrectas"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validación fallida",
     *         @OA\JsonContent(
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['errors' => ['email' => ['Las credenciales proporcionadas son incorrectas.']]], 401);
        }

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('authToken')->plainTextToken
        ]);
    }

    /**
     * Refresca el token de autenticación.
     */
    /**
     * @OA\Post(
     *     path="/api/refresh",
     *     operationId="refreshToken",
     *     tags={"Authentication"},
     *     summary="Refresca el token de autenticación",
     *     description="Refresca el token de autenticación del usuario actualmente autenticado",
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Operación exitosa",
     *         @OA\JsonContent(
     *             @OA\Property(property="token", type="string")
     *         )
     *     )
     * )
     */
    public function refresh(Request $request)
    {
        $user = $request->user();
        $user->tokens()->delete();

        return response()->json([
            'token' => $user->createToken('authToken')->plainTextToken
        ]);
    }

    /**
     * Cierra la sesión del usuario.
     */
    /**
     * @OA\Post(
     *     path="/api/logout",
     *     operationId="logout",
     *     tags={"Authentication"},
     *     summary="Cerrar sesión",
     *     description="Cerrar sesión del usuario actualmente autenticado",
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Operación exitosa",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string")
     *         )
     *     )
     * )
     */
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Sesión cerrada correctamente.']);
    }
}
```

:::info Explicación

### Encabezado de la Documentación

```php
/**
 * @OA\Info(
 *     title="API de mi aplicación",
 *     version="1.0.0",
 *     description="Descripción de mi API",
 *     termsOfService="https://example.com/terms/",
 *     @OA\Contact(
 *         email="contacto@example.com"
 *     ),
 *     @OA\License(
 *         name="MIT",
 *         url="https://opensource.org/licenses/MIT"
 *     )
 * )
 * @OA\Server(url="http://localhost:8000")
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 */
```

Esta sección proporciona información general sobre la API:
- **Título**: "API de mi aplicación"
- **Versión**: 1.0.0
- **Descripción**: "Descripción de mi API"
- **Términos de servicio**: URL donde se pueden encontrar los términos de servicio.
- **Contacto**: Email de contacto (contacto@example.com)
- **Licencia**: Tipo de licencia (MIT) y la URL a la misma.
- **Servidor**: URL base del servidor (http://localhost:8000)
- **Esquema de seguridad**: Define que se usará un esquema de autenticación Bearer para tokens JWT.

### Métodos del Controlador `AuthController`

#### Registro de un nuevo usuario

```php
/**
 * @OA\Post(
 *     path="/api/register",
 *     operationId="register",
 *     tags={"Authentication"},
 *     summary="Registro de un nuevo usuario",
 *     description="Registro de un nuevo usuario en la aplicación",
 *     @OA\RequestBody(
 *         required=true,
 *         description="Datos del nuevo usuario",
 *         @OA\JsonContent(
 *             required={"name","email","password"},
 *             @OA\Property(property="name", type="string", example="John Doe"),
 *             @OA\Property(property="email", type="string", format="email", example="john@example.com"),
 *             @OA\Property(property="password", type="string", format="password", example="password123")
 *         ),
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Operación exitosa",
 *         @OA\JsonContent(
 *             @OA\Property(property="user", type="object"),
 *             @OA\Property(property="token", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=422,
 *         description="Validación fallida",
 *         @OA\JsonContent(
 *             @OA\Property(property="errors", type="object")
 *         )
 *     )
 * )
 */
public function register(Request $request)
{
    // Código del método
}
```

Este método maneja el registro de nuevos usuarios:
- **Endpoint**: `/api/register`
- **Método HTTP**: POST
- **Tags**: Authentication
- **Resumen**: "Registro de un nuevo usuario"
- **Descripción**: "Registro de un nuevo usuario en la aplicación"
- **Cuerpo de la solicitud**: Se requiere un JSON con los campos `name`, `email` y `password`.
- **Respuestas**:
  - **200**: Devuelve un objeto con el usuario registrado y un token de autenticación.
  - **422**: Devuelve errores de validación.

#### Inicio de sesión

```php
/**
 * @OA\Post(
 *     path="/api/login",
 *     operationId="login",
 *     tags={"Authentication"},
 *     summary="Inicio de sesión",
 *     description="Inicia sesión y devuelve el token de autenticación",
 *     @OA\RequestBody(
 *         required=true,
 *         description="Credenciales de inicio de sesión",
 *         @OA\JsonContent(
 *             required={"email","password"},
 *             @OA\Property(property="email", type="string", format="email", example="admin@test.com"),
 *             @OA\Property(property="password", type="string", format="password", example="admin_password")
 *         ),
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Operación exitosa",
 *         @OA\JsonContent(
 *             @OA\Property(property="user", type="object"),
 *             @OA\Property(property="token", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Credenciales incorrectas"
 *     ),
 *     @OA\Response(
 *         response=422,
 *         description="Validación fallida",
 *         @OA\JsonContent(
 *             @OA\Property(property="errors", type="object")
 *         )
 *     )
 * )
 */
public function login(Request $request)
{
    // Código del método
}
```

Este método maneja el inicio de sesión de los usuarios:
- **Endpoint**: `/api/login`
- **Método HTTP**: POST
- **Tags**: Authentication
- **Resumen**: "Inicio de sesión"
- **Descripción**: "Inicia sesión y devuelve el token de autenticación"
- **Cuerpo de la solicitud**: Se requiere un JSON con los campos `email` y `password`.
- **Respuestas**:
  - **200**: Devuelve un objeto con el usuario autenticado y un token de autenticación.
  - **401**: Credenciales incorrectas.
  - **422**: Errores de validación.

#### Refresca el token de autenticación

```php
/**
 * @OA\Post(
 *     path="/api/refresh",
 *     operationId="refreshToken",
 *     tags={"Authentication"},
 *     summary="Refresca el token de autenticación",
 *     description="Refresca el token de autenticación del usuario actualmente autenticado",
 *     security={{"bearerAuth": {}}},
 *     @OA\Response(
 *         response=200,
 *         description="Operación exitosa",
 *         @OA\JsonContent(
 *             @OA\Property(property="token", type="string")
 *         )
 *     )
 * )
 */
public function refresh(Request $request)
{
    // Código del método
}
```

Este método maneja la renovación del token de autenticación:
- **Endpoint**: `/api/refresh`
- **Método HTTP**: POST
- **Tags**: Authentication
- **Resumen**: "Refresca el token de autenticación"
- **Descripción**: "Refresca el token de autenticación del usuario actualmente autenticado"
- **Seguridad**: Requiere autenticación Bearer.
- **Respuestas**:
  - **200**: Devuelve un nuevo token de autenticación.

#### Cerrar sesión

```php
/**
 * @OA\Post(
 *     path="/api/logout",
 *     operationId="logout",
 *     tags={"Authentication"},
 *     summary="Cerrar sesión",
 *     description="Cerrar sesión del usuario actualmente autenticado",
 *     security={{"bearerAuth": {}}},
 *     @OA\Response(
 *         response=200,
 *         description="Operación exitosa",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string")
 *         )
 *     )
 * )
 */
public function logout(Request $request)
{
    // Código del método
}
```

Este método maneja el cierre de sesión de los usuarios:
- **Endpoint**: `/api/logout`
- **Método HTTP**: POST
- **Tags**: Authentication
- **Resumen**: "Cerrar sesión"
- **Descripción**: "Cerrar sesión del usuario actualmente autenticado"
- **Seguridad**: Requiere autenticación Bearer.
- **Respuestas**:
  - **200**: Devuelve un mensaje indicando que la sesión ha sido cerrada correctamente.

### Resumen

El controlador `AuthController` maneja las operaciones básicas de autenticación, como registro, inicio de sesión, refresco de tokens y cierre de sesión. La documentación de OpenAPI proporciona una descripción detallada de cada endpoint, incluyendo los parámetros esperados y las posibles respuestas, facilitando así la integración y el uso de la API por parte de otros desarrolladores.
:::

### TipoController

```ts

<?php

namespace App\Http\Controllers;

use App\Models\Tipo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TipoController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/tipo",
     *     operationId="getTiposList",
     *     tags={"Tipos"},
     *     summary="Get list of tipos",
     *     description="Returns list of tipos",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(type="array", @OA\Items(
     *             @OA\Property(property="id", type="integer", example=1),
     *             @OA\Property(property="nombre", type="string", example="Tipo 1"),
     *             @OA\Property(property="descripcion", type="string", example="Descripción del tipo 1")
     *         ))
     *     )
     * )
     */
    public function index()
    {
        $tipos = Tipo::all();
        return response()->json($tipos);
    }

    /**
     * @OA\Post(
     *     path="/api/tipo",
     *     operationId="storeTipo",
     *     tags={"Tipos"},
     *     summary="Store a new tipo",
     *     description="Stores a new tipo and returns it",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="nombre", type="string", example="Nuevo Tipo"),
     *             @OA\Property(property="descripcion", type="string", example="Descripción del nuevo tipo")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="id", type="integer", example=1),
     *             @OA\Property(property="nombre", type="string", example="Nuevo Tipo"),
     *             @OA\Property(property="descripcion", type="string", example="Descripción del nuevo tipo")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(type="object", @OA\Property(property="errors", type="object"))
     *     )
     * )
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
     * @OA\Get(
     *     path="/api/tipo/{id}",
     *     operationId="getTipoById",
     *     tags={"Tipos"},
     *     summary="Get tipo by ID",
     *     description="Returns a single tipo",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of tipo to return",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="id", type="integer", example=1),
     *             @OA\Property(property="nombre", type="string", example="Tipo 1"),
     *             @OA\Property(property="descripcion", type="string", example="Descripción del tipo 1")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Tipo not found"
     *     )
     * )
     */
    public function show($id)
    {
        $tipo = Tipo::findOrFail($id);
        return response()->json($tipo);
    }

    /**
     * @OA\Put(
     *     path="/api/tipo/{id}",
     *     operationId="updateTipo",
     *     tags={"Tipos"},
     *     summary="Update an existing tipo",
     *     description="Updates an existing tipo and returns it",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of tipo to update",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="nombre", type="string", example="Tipo Actualizado"),
     *             @OA\Property(property="descripcion", type="string", example="Descripción del tipo actualizado")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="id", type="integer", example=1),
     *             @OA\Property(property="nombre", type="string", example="Tipo Actualizado"),
     *             @OA\Property(property="descripcion", type="string", example="Descripción del tipo actualizado")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Tipo not found"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(type="object", @OA\Property(property="errors", type="object"))
     *     )
     * )
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
     * @OA\Delete(
     *     path="/api/tipo/{id}",
     *     operationId="deleteTipo",
     *     tags={"Tipos"},
     *     summary="Delete a tipo",
     *     description="Deletes a single tipo",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of tipo to delete",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Successful operation"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Tipo not found"
     *     )
     * )
     */
    public function destroy($id)
    {
        $tipo = Tipo::find($id);
        if ($tipo) {
            $tipo->delete();
            return response()->json(null, 204);
        }
        return response()->json(null, 404);
    }
}
?>
```

:::info explicación
Aquí tienes la explicación de la documentación del controlador `TipoController` utilizando anotaciones de OpenAPI (Swagger):

### Métodos del Controlador `TipoController`

#### Obtener lista de tipos

```php
/**
 * @OA\Get(
 *     path="/api/tipo",
 *     operationId="getTiposList",
 *     tags={"Tipos"},
 *     summary="Get list of tipos",
 *     description="Returns list of tipos",
 *     @OA\Response(
 *         response=200,
 *         description="Successful operation",
 *         @OA\JsonContent(type="array", @OA\Items(
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="nombre", type="string", example="Tipo 1"),
 *             @OA\Property(property="descripcion", type="string", example="Descripción del tipo 1")
 *         ))
 *     )
 * )
 */
public function index()
{
    $tipos = Tipo::all();
    return response()->json($tipos);
}
```

Este método maneja la obtención de una lista de todos los tipos:
- **Endpoint**: `/api/tipo`
- **Método HTTP**: GET
- **Tags**: Tipos
- **Resumen**: "Get list of tipos"
- **Descripción**: "Returns list of tipos"
- **Respuestas**:
 

  - **200**: Devuelve un array de objetos, cada uno representando un tipo con sus propiedades `id`, `nombre` y `descripcion`.

#### Crear un nuevo tipo

```php
/**
 * @OA\Post(
 *     path="/api/tipo",
 *     operationId="storeTipo",
 *     tags={"Tipos"},
 *     summary="Store a new tipo",
 *     description="Stores a new tipo and returns it",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="nombre", type="string", example="Nuevo Tipo"),
 *             @OA\Property(property="descripcion", type="string", example="Descripción del nuevo tipo")
 *         )
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Successful operation",
 *         @OA\JsonContent(
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="nombre", type="string", example="Nuevo Tipo"),
 *             @OA\Property(property="descripcion", type="string", example="Descripción del nuevo tipo")
 *         )
 *     ),
 *     @OA\Response(
 *         response=422,
 *         description="Validation error",
 *         @OA\JsonContent(type="object", @OA\Property(property="errors", type="object"))
 *     )
 * )
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
```

Este método maneja la creación de un nuevo tipo:
- **Endpoint**: `/api/tipo`
- **Método HTTP**: POST
- **Tags**: Tipos
- **Resumen**: "Store a new tipo"
- **Descripción**: "Stores a new tipo and returns it"
- **Cuerpo de la solicitud**: Se requiere un JSON con los campos `nombre` y `descripcion`.
- **Respuestas**:
  - **201**: Devuelve el objeto del tipo creado con sus propiedades `id`, `nombre` y `descripcion`.
  - **422**: Errores de validación.

#### Obtener un tipo por ID

```php
/**
 * @OA\Get(
 *     path="/api/tipo/{id}",
 *     operationId="getTipoById",
 *     tags={"Tipos"},
 *     summary="Get tipo by ID",
 *     description="Returns a single tipo",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="ID of tipo to return",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful operation",
 *         @OA\JsonContent(
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="nombre", type="string", example="Tipo 1"),
 *             @OA\Property(property="descripcion", type="string", example="Descripción del tipo 1")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Tipo not found"
 *     )
 * )
 */
public function show($id)
{
    $tipo = Tipo::findOrFail($id);
    return response()->json($tipo);
}
```

Este método maneja la obtención de un tipo específico por su ID:
- **Endpoint**: `/api/tipo/{id}`
- **Método HTTP**: GET
- **Tags**: Tipos
- **Resumen**: "Get tipo by ID"
- **Descripción**: "Returns a single tipo"
- **Parámetros**:
  - **id**: ID del tipo que se desea obtener (en el path).
- **Respuestas**:
  - **200**: Devuelve el objeto del tipo con sus propiedades `id`, `nombre` y `descripcion`.
  - **404**: Tipo no encontrado.

#### Actualizar un tipo existente

```php
/**
 * @OA\Put(
 *     path="/api/tipo/{id}",
 *     operationId="updateTipo",
 *     tags={"Tipos"},
 *     summary="Update an existing tipo",
 *     description="Updates an existing tipo and returns it",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="ID of tipo to update",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="nombre", type="string", example="Tipo Actualizado"),
 *             @OA\Property(property="descripcion", type="string", example="Descripción del tipo actualizado")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful operation",
 *         @OA\JsonContent(
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="nombre", type="string", example="Tipo Actualizado"),
 *             @OA\Property(property="descripcion", type="string", example="Descripción del tipo actualizado")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Tipo not found"
 *     ),
 *     @OA\Response(
 *         response=422,
 *         description="Validation error",
 *         @OA\JsonContent(type="object", @OA\Property(property="errors", type="object"))
 *     )
 * )
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
```

Este método maneja la actualización de un tipo existente:
- **Endpoint**: `/api/tipo/{id}`
- **Método HTTP**: PUT
- **Tags**: Tipos
- **Resumen**: "Update an existing tipo"
- **Descripción**: "Updates an existing tipo and returns it"
- **Parámetros**:
  - **id**: ID del tipo que se desea actualizar (en el path).
- **Cuerpo de la solicitud**: Se requiere un JSON con los campos `nombre` y `descripcion`.
- **Respuestas**:
  - **200**: Devuelve el objeto del tipo actualizado con sus propiedades `id`, `nombre` y `descripcion`.
  - **404**: Tipo no encontrado.
  - **422**: Errores de validación.

#### Eliminar un tipo

```php
/**
 * @OA\Delete(
 *     path="/api/tipo/{id}",
 *     operationId="deleteTipo",
 *     tags={"Tipos"},
 *     summary="Delete a tipo",
 *     description="Deletes a single tipo",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="ID of tipo to delete",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=204,
 *         description="Successful operation"
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Tipo not found"
 *     )
 * )
 */
public function destroy($id)
{
    $tipo = Tipo::find($id);
    if ($tipo) {
        $tipo->delete();
        return response()->json(null, 204);
    }
    return response()->json(null, 404);
}
```

Este método maneja la eliminación de un tipo:
- **Endpoint**: `/api/tipo/{id}`
- **Método HTTP**: DELETE
- **Tags**: Tipos
- **Resumen**: "Delete a tipo"
- **Descripción**: "Deletes a single tipo"
- **Parámetros**:
  - **id**: ID del tipo que se desea eliminar (en el path).
- **Respuestas**:
  - **204**: Operación exitosa, sin contenido.
  - **404**: Tipo no encontrado.

### Resumen

El controlador `TipoController` maneja las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para la entidad "Tipo". La documentación de OpenAPI proporciona una descripción detallada de cada endpoint, incluyendo los parámetros esperados y las posibles respuestas, facilitando así la integración y el uso de la API por parte de otros desarrolladores.
:::

### DenominacionController

```ts
<?php

namespace App\Http\Controllers;

use App\Models\Denominacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DenominacionController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/denominacion",
     *     operationId="getDenominacionList",
     *     tags={"Denominacion"},
     *     summary="Get list of denominaciones",
     *     description="Returns list of denominaciones",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(type="array", @OA\Items(
     *             @OA\Property(property="id", type="integer", example=1),
     *             @OA\Property(property="nombre", type="string", example="Denominacion 1"),
     *             @OA\Property(property="descripcion", type="string", example="Descripción de la denominacion 1")
     *         ))
     *     )
     * )
     */
    public function index()
    {
        $denominaciones = Denominacion::all();
        return response()->json($denominaciones);
    }

    /**
     * @OA\Post(
     *     path="/api/denominacion",
     *     operationId="storeDenominacion",
     *     tags={"Denominacion"},
     *     summary="Store a new denominacion",
     *     description="Stores a new denominacion and returns it",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="nombre", type="string", example="Nueva Denominacion"),
     *             @OA\Property(property="descripcion", type="string", example="Descripción de la nueva denominacion")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="id", type="integer", example=1),
     *             @OA\Property(property="nombre", type="string", example="Nueva Denominacion"),
     *             @OA\Property(property="descripcion", type="string", example="Descripción de la nueva denominacion")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(type="object", @OA\Property(property="errors", type="object"))
     *     )
     * )
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
     * @OA\Get(
     *     path="/api/denominacion/{id}",
     *     operationId="getDenominacionById",
     *     tags={"Denominacion"},
     *     summary="Get denominacion by ID",
     *     description="Returns a single denominacion",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of denominacion to return",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="id", type="integer", example=1),
     *             @OA\Property(property="nombre", type="string", example="Denominacion 1"),
     *             @OA\Property(property="descripcion", type="string", example="Descripción de la denominacion 1")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Denominacion not found"
     *     )
     * )
     */
    public function show($id)
    {
        $denominacion = Denominacion::findOrFail($id);
        return response()->json($denominacion);
    }

    /**
     * @OA\Put(
     *     path="/api/denominacion/{id}",
     *     operationId="updateDenominacion",
     *     tags={"Denominacion"},
     *     summary="Update an existing denominacion",
     *     description="Updates an existing denominacion and returns it",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of denominacion to update",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="nombre", type="string", example="Denominacion Actualizada"),
     *             @OA\Property(property="descripcion", type="string", example="Descripción de la denominacion actualizada")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="id", type="integer", example=1),
     *             @OA\Property(property="nombre", type="string", example="Denominacion Actualizada"),
     *             @OA\Property(property="descripcion", type="string", example="Descripción de la denominacion actualizada")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Denominacion not found"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(type="object", @OA\Property(property="errors", type="object"))
     *     )
     * )
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
            return response()->json(['message' => 'Denominacion no encontrada'], 404);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/denominacion/{id}",
     *     operationId="deleteDenominacion",
     *     tags={"Denominacion"},
     *     summary="Delete a denominacion",
     *     description="Deletes a single denominacion",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of denominacion to delete",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Successful operation"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Denominacion not found"
     *     )
     * )
     */
    public function destroy($id)
    {
        $denominacion = Denominacion::findOrFail($id);
        $denominacion->delete();

        return response()->json(null, 204);
    }
}
```


:::info Explicación
### Métodos del Controlador `DenominacionController`

#### Obtener lista de denominaciones

```php
/**
 * @OA\Get(
 *     path="/api/denominacion",
 *     operationId="getDenominacionList",
 *     tags={"Denominacion"},
 *     summary="Get list of denominaciones",
 *     description="Returns list of denominaciones",
 *     @OA\Response(
 *         response=200,
 *         description="Successful operation",
 *         @OA\JsonContent(type="array", @OA\Items(
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="nombre", type="string", example="Denominacion 1"),
 *             @OA\Property(property="descripcion", type="string", example="Descripción de la denominacion 1")
 *         ))
 *     )
 * )
 */
public function index()
{
    $denominaciones = Denominacion::all();
    return response()->json($denominaciones);
}
```

Este método maneja la obtención de una lista de todas las denominaciones:
- **Endpoint**: `/api/denominacion`
- **Método HTTP**: GET
- **Tags**: Denominacion
- **Resumen**: "Get list of denominaciones"
- **Descripción**: "Returns list of denominaciones"
- **Respuestas**:
  - **200**: Devuelve un array de objetos, cada uno representando una denominación con sus propiedades `id`, `nombre` y `descripcion`.

#### Crear una nueva denominación

```php
/**
 * @OA\Post(
 *     path="/api/denominacion",
 *     operationId="storeDenominacion",
 *     tags={"Denominacion"},
 *     summary="Store a new denominacion",
 *     description="Stores a new denominacion and returns it",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="nombre", type="string", example="Nueva Denominacion"),
 *             @OA\Property(property="descripcion", type="string", example="Descripción de la nueva denominacion")
 *         )
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Successful operation",
 *         @OA\JsonContent(
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="nombre", type="string", example="Nueva Denominacion"),
 *             @OA\Property(property="descripcion", type="string", example="Descripción de la nueva denominacion")
 *         )
 *     ),
 *     @OA\Response(
 *         response=422,
 *         description="Validation error",
 *         @OA\JsonContent(type="object", @OA\Property(property="errors", type="object"))
 *     )
 * )
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
```

Este método maneja la creación de una nueva denominación:
- **Endpoint**: `/api/denominacion`
- **Método HTTP**: POST
- **Tags**: Denominacion
- **Resumen**: "Store a new denominacion"
- **Descripción**: "Stores a new denominacion and returns it"
- **Cuerpo de la solicitud**: Se requiere un JSON con los campos `nombre` y `descripcion`.
- **Respuestas**:
  - **201**: Devuelve el objeto de la denominación creada con sus propiedades `id`, `nombre` y `descripcion`.
  - **422**: Errores de validación.

#### Obtener una denominación por ID

```php
/**
 * @OA\Get(
 *     path="/api/denominacion/{id}",
 *     operationId="getDenominacionById",
 *     tags={"Denominacion"},
 *     summary="Get denominacion by ID",
 *     description="Returns a single denominacion",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="ID of denominacion to return",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful operation",
 *         @OA\JsonContent(
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="nombre", type="string", example="Denominacion 1"),
 *             @OA\Property(property="descripcion", type="string", example="Descripción de la denominacion 1")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Denominacion not found"
 *     )
 * )
 */
public function show($id)
{
    $denominacion = Denominacion::findOrFail($id);
    return response()->json($denominacion);
}
```

Este método maneja la obtención de una denominación específica por su ID:
- **Endpoint**: `/api/denominacion/{id}`
- **Método HTTP**: GET
- **Tags**: Denominacion
- **Resumen**: "Get denominacion by ID"
- **Descripción**: "Returns a single denominacion"
- **Parámetros**:
  - **id**: ID de la denominación que se desea obtener (en el path).
- **Respuestas**:
  - **200**: Devuelve el objeto de la denominación con sus propiedades `id`, `nombre` y `descripcion`.
  - **404**: Denominación no encontrada.

#### Actualizar una denominación existente

```php
/**
 * @OA\Put(
 *     path="/api/denominacion/{id}",
 *     operationId="updateDenominacion",
 *     tags={"Denominacion"},
 *     summary="Update an existing denominacion",
 *     description="Updates an existing denominacion and returns it",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="ID of denominacion to update",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="nombre", type="string", example="Denominacion Actualizada"),
 *             @OA\Property(property="descripcion", type="string", example="Descripción de la denominacion actualizada")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful operation",
 *         @OA\JsonContent(
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="nombre", type="string", example="Denominacion Actualizada"),
 *             @OA\Property(property="descripcion", type="string", example="Descripción de la denominacion actualizada")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Denominacion not found"
 *     ),
 *     @OA\Response(
 *         response=422,
 *         description="Validation error",
 *         @OA\JsonContent(type="object", @OA\Property(property="errors", type="object"))
 *     )
 * )
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
        return response()->json(['message' => 'Denominacion no encontrada'], 404);
    }
}
```

Este método maneja la actualización de una denominación existente:
- **Endpoint**: `/api/denominacion/{id}`
- **Método HTTP**: PUT
- **Tags**: Denominacion
- **Resumen**: "Update an existing denominacion"
- **Descripción**: "Updates an existing denominacion and returns it"
- **Parámetros**:
  - **id**: ID de la denominación que se desea actualizar (en el path).
- **Cuerpo de la solicitud**: Se requiere un JSON con los campos `nombre` y `descripcion`.
- **Respuestas**:
  - **200**: Devuelve el objeto de la denominación actualizada con sus propiedades `id`, `nombre` y `descripcion`.
  - **404**: Denominación no encontrada.
  - **422**: Errores de validación.

#### Eliminar una denominación

```php
/**
 * @OA\Delete(
 *     path="/api/denominacion/{id}",
 *     operationId="deleteDenominacion",
 *     tags={"Denominacion"},
 *     summary="Delete a denominacion",
 *     description="Deletes a single denominacion",
 *     @OA\Parameter(


 *         name="id",
 *         in="path",
 *         description="ID of denominacion to delete",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=204,
 *         description="Successful operation"
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Denominacion not found"
 *     )
 * )
 */
public function destroy($id)
{
    $denominacion = Denominacion::findOrFail($id);
    $denominacion->delete();

    return response()->json(null, 204);
}
```

Este método maneja la eliminación de una denominación:
- **Endpoint**: `/api/denominacion/{id}`
- **Método HTTP**: DELETE
- **Tags**: Denominacion
- **Resumen**: "Delete a denominacion"
- **Descripción**: "Deletes a single denominacion"
- **Parámetros**:
  - **id**: ID de la denominación que se desea eliminar (en el path).
- **Respuestas**:
  - **204**: Operación exitosa, sin contenido.
  - **404**: Denominación no encontrada.

Este controlador cubre las operaciones CRUD básicas (Crear, Leer, Actualizar y Eliminar) para el recurso `Denominacion` utilizando anotaciones de OpenAPI para facilitar la generación de documentación automática y las pruebas de la API.
:::

### ProductoController

```ts
<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
       /**
     * @OA\Get(
     *     path="/api/producto",
     *     operationId="getProductoList",
     *     tags={"Producto"},
     *     summary="Obtener lista de productos",
     *     description="Devuelve una lista paginada de productos",
     *     @OA\Parameter(
     *         name="per_page",
     *         in="query",
     *         description="Número de elementos por página",
     *         required=false,
     *         @OA\Schema(type="integer", default=15)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Operación exitosa",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="data", type="array", @OA\Items(
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="nombre", type="string", example="Producto 1"),
     *                 @OA\Property(property="bodega", type="string", example="Bodega A"),
     *                 @OA\Property(property="descripcion", type="string", example="Descripción del producto 1"),
     *                 @OA\Property(property="maridaje", type="string", example="Maridaje del producto 1"),
     *                 @OA\Property(property="precio", type="number", format="float", example=20.5),
     *                 @OA\Property(property="graduacion", type="number", format="float", example=12.5),
     *                 @OA\Property(property="ano", type="integer", example=2023),
     *                 @OA\Property(property="sabor", type="string", example="Sabor del producto 1"),
     *                 @OA\Property(property="tipo_id", type="integer", example=1),
     *                 @OA\Property(property="denominacion_id", type="integer", example=1),
     *                 @OA\Property(property="imagen", type="string", example="http://example.com/storage/imagen.jpg")
     *             )),
     *             @OA\Property(property="links", type="object", @OA\Property(property="first", type="string"), @OA\Property(property="last", type="string"), @OA\Property(property="prev", type="string"), @OA\Property(property="next", type="string")),
     *             @OA\Property(property="meta", type="object", @OA\Property(property="current_page", type="integer"), @OA\Property(property="from", type="integer"), @OA\Property(property="last_page", type="integer"), @OA\Property(property="path", type="string"), @OA\Property(property="per_page", type="integer"), @OA\Property(property="to", type="integer"), @OA\Property(property="total", type="integer"))
     *         )
     *     )
     * )
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->query('per_page', 15); // Número de elementos por página, por defecto 15
        $productos = Producto::paginate($perPage);
        return response()->json($productos);
    }

     /**
     * @OA\Post(
     *     path="/api/producto",
     *     operationId="storeProducto",
     *     tags={"Producto"},
     *     summary="Crear un nuevo producto",
     *     description="Crea un nuevo producto y almacena sus datos junto con una imagen",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="nombre",
     *                     type="string",
     *                     description="Nombre del producto",
     *                     example="Producto 1"
     *                 ),
     *                 @OA\Property(
     *                     property="bodega",
     *                     type="string",
     *                     description="Bodega del producto",
     *                     example="Bodega A"
     *                 ),
     *                 @OA\Property(
     *                     property="descripcion",
     *                     type="string",
     *                     description="Descripción del producto",
     *                     example="Descripción del producto 1"
     *                 ),
     *                 @OA\Property(
     *                     property="maridaje",
     *                     type="string",
     *                     description="Maridaje del producto",
     *                     example="Maridaje del producto 1"
     *                 ),
     *                 @OA\Property(
     *                     property="precio",
     *                     type="number",
     *                     format="float",
     *                     description="Precio del producto",
     *                     example=20.5
     *                 ),
     *                 @OA\Property(
     *                     property="graduacion",
     *                     type="number",
     *                     format="float",
     *                     description="Graduación del producto",
     *                     example=12.5
     *                 ),
     *                 @OA\Property(
     *                     property="ano",
     *                     type="integer",
     *                     description="Año del producto",
     *                     example=2023
     *                 ),
     *                 @OA\Property(
     *                     property="sabor",
     *                     type="string",
     *                     description="Sabor del producto",
     *                     example="Sabor del producto 1"
     *                 ),
     *                 @OA\Property(
     *                     property="tipo_id",
     *                     type="integer",
     *                     description="ID del tipo de producto",
     *                     example=1
     *                 ),
     *                 @OA\Property(
     *                     property="denominacion_id",
     *                     type="integer",
     *                     description="ID de la denominación del producto",
     *                     example=1
     *                 ),
     *                 @OA\Property(
     *                     property="file",
     *                     type="string",
     *                     format="binary",
     *                     description="Imagen del producto"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Producto creado con éxito",
     *         @OA\JsonContent(
     *             @OA\Property(property="id", type="integer", example=1),
     *             @OA\Property(property="nombre", type="string", example="Producto 1"),
     *             @OA\Property(property="bodega", type="string", example="Bodega A"),
     *             @OA\Property(property="descripcion", type="string", example="Descripción del producto 1"),
     *             @OA\Property(property="maridaje", type="string", example="Maridaje del producto 1"),
     *             @OA\Property(property="precio", type="number", format="float", example=20.5),
     *             @OA\Property(property="graduacion", type="number", format="float", example=12.5),
     *             @OA\Property(property="ano", type="integer", example=2023),
     *             @OA\Property(property="sabor", type="string", example="Sabor del producto 1"),
     *             @OA\Property(property="tipo_id", type="integer", example=1),
     *             @OA\Property(property="denominacion_id", type="integer", example=1),
     *             @OA\Property(property="imagen", type="string", example="http://example.com/storage/imagen.jpg")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */
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
            'imagen' => 'nullable|string',
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

    /**
     * Display the specified resource.
     */
        /**
     * @OA\Get(
     *     path="/api/producto/{id}",
     *     operationId="getProductoById",
     *     tags={"Producto"},
     *     summary="Obtener un producto por ID",
     *     description="Devuelve los datos de un producto específico",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del producto",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Operación exitosa",
     *         @OA\JsonContent(
     *             @OA\Property(property="id", type="integer", example=1),
     *             @OA\Property(property="nombre", type="string", example="Producto 1"),
     *             @OA\Property(property="bodega", type="string", example="Bodega A"),
     *             @OA\Property(property="descripcion", type="string", example="Descripción del producto 1"),
     *             @OA\Property(property="maridaje", type="string", example="Maridaje del producto 1"),
     *             @OA\Property(property="precio", type="number", format="float", example=20.5),
     *             @OA\Property(property="graduacion", type="number", format="float", example=12.5),
     *             @OA\Property(property="ano", type="integer", example=2023),
     *             @OA\Property(property="sabor", type="string", example="Sabor del producto 1"),
     *             @OA\Property(property="tipo_id", type="integer", example=1),
     *             @OA\Property(property="denominacion_id", type="integer", example=1),
     *             @OA\Property(property="imagen", type="string", example="http://example.com/storage/imagen.jpg")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Producto no encontrado",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Producto no encontrado")
     *         )
     *     )
     * )
     */
    public function show($id): JsonResponse
    {
        $producto = Producto::find($id);
        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        return response()->json($producto);
    }

/**
 * @OA\Put(
 *     path="/api/producto/{id}",
 *     operationId="updateProducto",
 *     tags={"Producto"},
 *     summary="Actualizar un producto existente",
 *     description="Actualiza los datos de un producto existente",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="ID del producto",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="nombre", type="string", example="Producto Actualizado"),
 *             @OA\Property(property="bodega", type="string", example="Bodega Actualizada"),
 *             @OA\Property(property="descripcion", type="string", example="Descripción del producto actualizado"),
 *             @OA\Property(property="maridaje", type="string", example="Maridaje del producto actualizado"),
 *             @OA\Property(property="precio", type="number", format="float", example=25.75),
 *             @OA\Property(property="graduacion", type="number", format="float", example=13.0),
 *             @OA\Property(property="ano", type="integer", example=2022),
 *             @OA\Property(property="sabor", type="string", example="Sabor del producto actualizado"),
 *             @OA\Property(property="tipo_id", type="integer", example=2),
 *             @OA\Property(property="denominacion_id", type="integer", example=2),
 *             @OA\Property(property="file", type="string", format="binary", description="Imagen del producto")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Operación exitosa",
 *         @OA\JsonContent(
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="nombre", type="string", example="Producto Actualizado"),
 *             @OA\Property(property="bodega", type="string", example="Bodega Actualizada"),
 *             @OA\Property(property="descripcion", type="string", example="Descripción del producto actualizado"),
 *             @OA\Property(property="maridaje", type="string", example="Maridaje del producto actualizado"),
 *             @OA\Property(property="precio", type="number", format="float", example=25.75),
 *             @OA\Property(property="graduacion", type="number", format="float", example=13.0),
 *             @OA\Property(property="ano", type="integer", example=2022),
 *             @OA\Property(property="sabor", type="string", example="Sabor del producto actualizado"),
 *             @OA\Property(property="tipo_id", type="integer", example=2),
 *             @OA\Property(property="denominacion_id", type="integer", example=2),
 *             @OA\Property(property="imagen", type="string", example="http://example.com/storage/imagen.jpg")
 *         )
 *     ),
 *     @OA\Response(
 *         response=422,
 *         description="Error de validación",
 *         @OA\JsonContent(type="object", @OA\Property(property="errors", type="object"))
 *     )
 * )
 */
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
      //  'file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'denominacion_id' => 'required|exists:denominaciones,id',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    // Procesar y guardar la nueva imagen si se ha cargado
    if ($request->hasFile('file')) {
        // Eliminar la imagen antigua si existe
        if ($producto->file) {
            Storage::disk('public')->delete($producto->file);
        }

        // Guardar la nueva imagen
        $filePath = $request->file('file')->store('imagenes', 'public');
        $producto->imagen = $filePath;
    }

    $producto->update($validator->validated());

    return response()->json($producto);
}
    /**
     * @OA\Delete(
     *     path="/api/producto/{id}",
     *     operationId="deleteProducto",
     *     tags={"Producto"},
     *     summary="Eliminar un producto",
     *     description="Elimina un producto existente por su ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del producto",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="No Content",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Producto no encontrado",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Producto no encontrado")
     *         )
     *     )
     * )
     */
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
                $deleted = Storage::disk('public')->delete($imagePath);
                if (!$deleted) {
                    return response()->json(['message' => 'Error al eliminar la imagen'], 500);
                }
            } else {
                return response()->json(['message' => 'Imagen no encontrada'], 404);
            }
        }
        
        $producto->delete();

        return response()->json(null, 204); // 204 No Content
    }

}
```

:::info explicación
La documentación Swagger proporcionada describe un controlador `ProductoController` en Laravel, que gestiona operaciones CRUD para productos, junto con la especificación OpenAPI (anteriormente conocida como Swagger) para documentar una API RESTful. Aquí tienes un desglose detallado de cada parte:

### Listado de Productos (`index`)

```ts
* @OA\Get(
     *     path="/api/producto",
     *     operationId="getProductoList",
     *     tags={"Producto"},
     *     summary="Obtener lista de productos",
     *     description="Devuelve una lista paginada de productos",
     *     @OA\Parameter(
     *         name="per_page",
     *         in="query",
     *         description="Número de elementos por página",
     *         required=false,
     *         @OA\Schema(type="integer", default=15)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Operación exitosa",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="data", type="array", @OA\Items(
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="nombre", type="string", example="Producto 1"),
     *                 @OA\Property(property="bodega", type="string", example="Bodega A"),
     *                 @OA\Property(property="descripcion", type="string", example="Descripción del producto 1"),
     *                 @OA\Property(property="maridaje", type="string", example="Maridaje del producto 1"),
     *                 @OA\Property(property="precio", type="number", format="float", example=20.5),
     *                 @OA\Property(property="graduacion", type="number", format="float", example=12.5),
     *                 @OA\Property(property="ano", type="integer", example=2023),
     *                 @OA\Property(property="sabor", type="string", example="Sabor del producto 1"),
     *                 @OA\Property(property="tipo_id", type="integer", example=1),
     *                 @OA\Property(property="denominacion_id", type="integer", example=1),
     *                 @OA\Property(property="imagen", type="string", example="http://example.com/storage/imagen.jpg")
     *             )),
     *             @OA\Property(property="links", type="object", @OA\Property(property="first", type="string"), @OA\Property(property="last", type="string"), @OA\Property(property="prev", type="string"), @OA\Property(property="next", type="string")),
     *             @OA\Property(property="meta", type="object", @OA\Property(property="current_page", type="integer"), @OA\Property(property="from", type="integer"), @OA\Property(property="last_page", type="integer"), @OA\Property(property="path", type="string"), @OA\Property(property="per_page", type="integer"), @OA\Property(property="to", type="integer"), @OA\Property(property="total", type="integer"))
     *         )
     *     )
     * )
     */
    public function index(Request $request): JsonResponse
```
- **Operación**: Listar productos paginados.
- **Ruta**: `GET /api/producto`
- **Descripción**: Devuelve una lista paginada de productos.
- **Parámetros**:
  - `per_page` (query): Número de elementos por página (por defecto 15).
- **Respuestas**:
  - `200 OK`: Lista de productos paginada con enlaces y metadatos.

### Crear Producto (`store`)

```ts
  /**
     * @OA\Post(
     *     path="/api/producto",
     *     operationId="storeProducto",
     *     tags={"Producto"},
     *     summary="Crear un nuevo producto",
     *     description="Crea un nuevo producto y almacena sus datos junto con una imagen",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="nombre",
     *                     type="string",
     *                     description="Nombre del producto",
     *                     example="Producto 1"
     *                 ),
     *                 @OA\Property(
     *                     property="bodega",
     *                     type="string",
     *                     description="Bodega del producto",
     *                     example="Bodega A"
     *                 ),
     *                 @OA\Property(
     *                     property="descripcion",
     *                     type="string",
     *                     description="Descripción del producto",
     *                     example="Descripción del producto 1"
     *                 ),
     *                 @OA\Property(
     *                     property="maridaje",
     *                     type="string",
     *                     description="Maridaje del producto",
     *                     example="Maridaje del producto 1"
     *                 ),
     *                 @OA\Property(
     *                     property="precio",
     *                     type="number",
     *                     format="float",
     *                     description="Precio del producto",
     *                     example=20.5
     *                 ),
     *                 @OA\Property(
     *                     property="graduacion",
     *                     type="number",
     *                     format="float",
     *                     description="Graduación del producto",
     *                     example=12.5
     *                 ),
     *                 @OA\Property(
     *                     property="ano",
     *                     type="integer",
     *                     description="Año del producto",
     *                     example=2023
     *                 ),
     *                 @OA\Property(
     *                     property="sabor",
     *                     type="string",
     *                     description="Sabor del producto",
     *                     example="Sabor del producto 1"
     *                 ),
     *                 @OA\Property(
     *                     property="tipo_id",
     *                     type="integer",
     *                     description="ID del tipo de producto",
     *                     example=1
     *                 ),
     *                 @OA\Property(
     *                     property="denominacion_id",
     *                     type="integer",
     *                     description="ID de la denominación del producto",
     *                     example=1
     *                 ),
     *                 @OA\Property(
     *                     property="file",
     *                     type="string",
     *                     format="binary",
     *                     description="Imagen del producto"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Producto creado con éxito",
     *         @OA\JsonContent(
     *             @OA\Property(property="id", type="integer", example=1),
     *             @OA\Property(property="nombre", type="string", example="Producto 1"),
     *             @OA\Property(property="bodega", type="string", example="Bodega A"),
     *             @OA\Property(property="descripcion", type="string", example="Descripción del producto 1"),
     *             @OA\Property(property="maridaje", type="string", example="Maridaje del producto 1"),
     *             @OA\Property(property="precio", type="number", format="float", example=20.5),
     *             @OA\Property(property="graduacion", type="number", format="float", example=12.5),
     *             @OA\Property(property="ano", type="integer", example=2023),
     *             @OA\Property(property="sabor", type="string", example="Sabor del producto 1"),
     *             @OA\Property(property="tipo_id", type="integer", example=1),
     *             @OA\Property(property="denominacion_id", type="integer", example=1),
     *             @OA\Property(property="imagen", type="string", example="http://example.com/storage/imagen.jpg")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */
    public function store(Request $request): JsonResponse
```  

- **Operación**: Crear un nuevo producto.
- **Ruta**: `POST /api/producto`
- **Descripción**: Crea un nuevo producto con imagen adjunta.
- **Cuerpo de la Solicitud**: Campos del producto (nombre, bodega, descripción, etc.) y archivo de imagen.
- **Respuestas**:
  - `201 Created`: Producto creado con éxito con detalles y URL de imagen.
  - `422 Unprocessable Entity`: Error de validación si falla la validación de campos.

### Obtener Producto por ID (`show`)

```ts
/**
     * @OA\Get(
     *     path="/api/producto/{id}",
     *     operationId="getProductoById",
     *     tags={"Producto"},
     *     summary="Obtener un producto por ID",
     *     description="Devuelve los datos de un producto específico",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del producto",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Operación exitosa",
     *         @OA\JsonContent(
     *             @OA\Property(property="id", type="integer", example=1),
     *             @OA\Property(property="nombre", type="string", example="Producto 1"),
     *             @OA\Property(property="bodega", type="string", example="Bodega A"),
     *             @OA\Property(property="descripcion", type="string", example="Descripción del producto 1"),
     *             @OA\Property(property="maridaje", type="string", example="Maridaje del producto 1"),
     *             @OA\Property(property="precio", type="number", format="float", example=20.5),
     *             @OA\Property(property="graduacion", type="number", format="float", example=12.5),
     *             @OA\Property(property="ano", type="integer", example=2023),
     *             @OA\Property(property="sabor", type="string", example="Sabor del producto 1"),
     *             @OA\Property(property="tipo_id", type="integer", example=1),
     *             @OA\Property(property="denominacion_id", type="integer", example=1),
     *             @OA\Property(property="imagen", type="string", example="http://example.com/storage/imagen.jpg")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Producto no encontrado",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Producto no encontrado")
     *         )
     *     )
     * )
     */
    public function show($id): JsonResponse
```

- **Operación**: Obtener detalles de un producto por ID.
- **Ruta**: `GET /api/producto/{id}`
- **Descripción**: Devuelve los detalles de un producto específico por su ID.
- **Parámetros**:
  - `id` (path): ID del producto.
- **Respuestas**:
  - `200 OK`: Detalles del producto.
  - `404 Not Found`: Si no se encuentra el producto.

### Actualizar Producto (`update`)

```ts
/**
     * @OA\Get(
     *     path="/api/producto/{id}",
     *     operationId="getProductoById",
     *     tags={"Producto"},
     *     summary="Obtener un producto por ID",
     *     description="Devuelve los datos de un producto específico",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del producto",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Operación exitosa",
     *         @OA\JsonContent(
     *             @OA\Property(property="id", type="integer", example=1),
     *             @OA\Property(property="nombre", type="string", example="Producto 1"),
     *             @OA\Property(property="bodega", type="string", example="Bodega A"),
     *             @OA\Property(property="descripcion", type="string", example="Descripción del producto 1"),
     *             @OA\Property(property="maridaje", type="string", example="Maridaje del producto 1"),
     *             @OA\Property(property="precio", type="number", format="float", example=20.5),
     *             @OA\Property(property="graduacion", type="number", format="float", example=12.5),
     *             @OA\Property(property="ano", type="integer", example=2023),
     *             @OA\Property(property="sabor", type="string", example="Sabor del producto 1"),
     *             @OA\Property(property="tipo_id", type="integer", example=1),
     *             @OA\Property(property="denominacion_id", type="integer", example=1),
     *             @OA\Property(property="imagen", type="string", example="http://example.com/storage/imagen.jpg")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Producto no encontrado",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Producto no encontrado")
     *         )
     *     )
     * )
     */
    public function show($id): JsonResponse
```

- **Operación**: Actualizar un producto existente.
- **Ruta**: `PUT /api/producto/{id}`
- **Descripción**: Actualiza los datos de un producto existente, incluida la imagen si se proporciona.
- **Parámetros**:
  - `id` (path): ID del producto.
- **Cuerpo de la Solicitud**: Campos actualizados del producto y archivo de imagen (opcional).
- **Respuestas**:
  - `200 OK`: Producto actualizado con éxito con detalles y URL de imagen.
  - `422 Unprocessable Entity`: Error de validación si falla la validación de campos.

### Eliminar Producto (`destroy`)

```ts
 /**
     * @OA\Delete(
     *     path="/api/producto/{id}",
     *     operationId="deleteProducto",
     *     tags={"Producto"},
     *     summary="Eliminar un producto",
     *     description="Elimina un producto existente por su ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del producto",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="No Content",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Producto no encontrado",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Producto no encontrado")
     *         )
     *     )
     * )
     */
    public function destroy($id): JsonResponse
```

- **Operación**: Eliminar un producto existente.
- **Ruta**: `DELETE /api/producto/{id}`
- **Descripción**: Elimina un producto por su ID y su imagen asociada si existe.
- **Parámetros**:
  - `id` (path): ID del producto.
- **Respuestas**:
  - `204 No Content`: Producto eliminado con éxito.
  - `404 Not Found`: Si no se encuentra el producto o la imagen asociada.

### Detalles Adicionales

- **Validaciones**: Utiliza el validador de Laravel para asegurar que los datos cumplen con ciertos criterios antes de procesarlos.
- **Almacenamiento de Imágenes**: Utiliza el sistema de almacenamiento de Laravel para guardar y eliminar imágenes asociadas a los productos.
- **Paginación**: Utiliza el método `paginate` de Eloquent para manejar la paginación de resultados en las respuestas `index`.

Esta documentación Swagger es esencial para desarrolladores y consumidores de la API, ya que proporciona detalles claros sobre cómo interactuar con cada endpoint, qué parámetros esperar y qué respuestas recibir, mejorando así la comprensión y la interoperabilidad de la API.
:::