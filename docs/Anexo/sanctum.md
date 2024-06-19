---
sidebar_position: 2
---
# Laravel Sanctum

## Introducción

Laravel Sanctum fue creado para resolver dos problemas separados. Vamos a discutir cada uno antes de profundizar en la biblioteca.

Tokens de API
Primero, Sanctum es un paquete simple que puedes usar para emitir tokens de API a tus usuarios sin la complicación de OAuth. Esta característica está inspirada en GitHub y otras aplicaciones que emiten "tokens de acceso personal". Por ejemplo, imagina que la "configuración de la cuenta" de tu aplicación tiene una pantalla donde un usuario puede generar un token de API para su cuenta. Puedes usar Sanctum para generar y gestionar esos tokens. Estos tokens suelen tener un tiempo de expiración muy largo (años), pero pueden ser revocados manualmente por el usuario en cualquier momento.

Laravel Sanctum ofrece esta función almacenando los tokens de API del usuario en una única tabla de base de datos y autenticando las solicitudes HTTP entrantes a través del encabezado de Autorización, que debería contener un token de API válido.

Autenticación de SPA (Aplicaciones de Página Única)
Segundo, Sanctum existe para ofrecer una forma sencilla de autenticar aplicaciones de página única (SPAs) que necesitan comunicarse con una API alimentada por Laravel. Estas SPAs pueden existir en el mismo repositorio que tu aplicación Laravel o pueden ser un repositorio completamente separado, como una SPA creada usando Vue CLI o una aplicación Next.js.

Para esta característica, Sanctum no utiliza tokens de ningún tipo. En su lugar, Sanctum utiliza los servicios de autenticación de sesión basados en cookies integrados en Laravel. Típicamente, Sanctum utiliza el guardia de autenticación web de Laravel para lograr esto. Esto proporciona los beneficios de protección contra CSRF, autenticación de sesión, así como protección contra la filtración de las credenciales de autenticación a través de XSS.

Sanctum solo intentará autenticar usando cookies cuando la solicitud entrante provenga de tu propio frontend de SPA. Cuando Sanctum examina una solicitud HTTP entrante, primero buscará una cookie de autenticación y, si no está presente, entonces examinará el encabezado de Autorización en busca de un token de API válido.

## Instalación y configuración 

En la versión 11 de Laravel, no se instala por defecto el código necesario para desarrollar APIs; se deja como una opción para el desarrollador. Sin embargo, puedes instalar Laravel Sanctum, una herramienta popular para la autenticación de APIs, utilizando el comando Artisan "install:api".

```bash
php artisan install:api
```


### Model User
Debe cambiar el código del modelo **User** por este otro:

```php title=app\Models\User.php
<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
```
#### Análisis del código

Cambio del modelo User.

```php
namespace App\Models;
```

Esta línea define el espacio de nombres en el que se encuentra la clase `User`. En este caso, la clase `User` se encuentra en el directorio `App\Models`.

```php
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
```

Estas líneas importan y utilizan los rasgos (traits) necesarios para el modelo de usuario:

- `HasFactory`: Este trait proporciona métodos para la creación de "factories", que son útiles para generar datos de prueba.
- `Authenticatable`: Este trait proporciona métodos de autenticación para el modelo de usuario. Laravel utiliza este trait para gestionar la autenticación de usuarios.
- `Notifiable`: Este trait agrega funcionalidad para enviar notificaciones por correo electrónico, SMS, Slack, etc.
- `HasApiTokens`: Este trait habilita la funcionalidad de tokens de API utilizando Laravel Sanctum para autenticación API.

```php
class User extends Authenticatable
```

Esta línea define la clase `User` que extiende `Authenticatable`, lo que significa que el modelo de usuario puede aprovechar los métodos proporcionados por `Authenticatable`.

```php
{
    use HasApiTokens, HasFactory, Notifiable;
```

Esto aplica los rasgos (traits) a la clase `User`, lo que le permite utilizar los métodos y funcionalidades proporcionados por estos rasgos.

```php
/**
 * The attributes that are mass assignable.
 *
 * @var array<int, string>
 */
protected $fillable = [
    'name',
    'email',
    'password',
];
```

Esta propiedad `$fillable` especifica qué atributos pueden ser asignados masivamente (es decir, utilizando el método `create` en el modelo). En este caso, los atributos `name`, `email` y `password` pueden ser asignados masivamente.

```php
/**
 * The attributes that should be hidden for serialization.
 *
 * @var array<int, string>
 */
protected $hidden = [
    'password',
    'remember_token',
];
```

Esta propiedad `$hidden` especifica qué atributos deben ser ocultos cuando el modelo se serializa a un array o a JSON. En este caso, oculta la contraseña (`password`) y el token de recordatorio (`remember_token`), lo que garantiza que no se devuelvan accidentalmente en respuestas API.

```php
/**
 * Get the attributes that should be cast.
 *
 * @return array<string, string>
 */
protected function casts(): array
{
    return [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
```

Este método `casts()` define cómo deben ser tratados los atributos del modelo al serializarse o deserializarse. En este caso, `email_verified_at` se convierte automáticamente a un objeto `datetime`, y `password` se trata como un campo hash. Esto asegura que Laravel maneje automáticamente la conversión de estos atributos al formato adecuado cuando se trabaja con el modelo.

### El archivo de arranque de la aplicación

La configuración de la aplicación de Laravel se encuentra en el archivo `config/app.php`. Desde este archivo, puedes personalizar el enrutamiento, el middleware, los proveedores de servicios, el manejo de excepciones y más aspectos de tu aplicación.

Después de ejecutar el comando `php artisan install:api`, el archivo `config/app.php` se configurará de la siguiente manera:


#### bootstrap/app.php

Se ha eliminado el archivo RouteServiceProvider y ahora es reemplazado por el archivo bootstrap/app.php. Este último es crucial ya que configura y arranca la aplicación. Después de la instalación de Laravel s (parece que la oración quedó inconclusa), es importante asegurarse de que el archivo bootstrap/app.php esté correctamente configurado para garantizar el funcionamiento adecuado de la aplicación.

```php
<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Aquí puedes registrar middleware global para tu aplicación.
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Aquí puedes registrar manejadores de excepciones personalizados.
    })->create();
```

1. **use Illuminate\Foundation\Application;**
   - Importa la clase `Application` del framework Laravel, que es responsable de manejar el ciclo de vida de la aplicación.

2. **use Illuminate\Foundation\Configuration\Exceptions;**
   - Importa la clase `Exceptions`, que se utiliza para configurar cómo la aplicación maneja las excepciones.

3. **use Illuminate\Foundation\Configuration\Middleware;**
   - Importa la clase `Middleware`, que se utiliza para configurar el middleware de la aplicación.

4. **Application::configure(basePath: dirname(__DIR__))**
   - Crea una nueva instancia de la aplicación Laravel y establece la ruta base de la aplicación al directorio padre del directorio actual.

5. **->withRouting(...)**
   - Configura las rutas de la aplicación especificando los archivos de rutas para la web, la API, los comandos de consola y un punto de verificación de salud.

6. **->withMiddleware(...)**
   - Permite la configuración de middleware global. El middleware es un mecanismo para filtrar las solicitudes HTTP entrantes en la aplicación.

7. **->withExceptions(...)**
   - Permite la configuración de manejadores de excepciones personalizados. Esto es útil para definir cómo la aplicación debe responder a diferentes tipos de errores.

8. **->create();**
   - Finaliza la configuración y crea la instancia de la aplicación.

### Creación de AuthController

A continuación deberá crear el controlador **AuthController**, para ello introduzca el siguiente comando en la terminal:

```
php artisan make:Controller AuthController
```
Edite el controlador y copie el siguiente codigo:

```js title=app\Http\Controllers\AuthController.php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Registro de un nuevo usuario.
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
            return response()->json(['errors' => ['email' => ['Las credenciales proporcionadas son incorrectas.']]], 422);
        }

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('authToken')->plainTextToken
        ]);
    }

    /**
     * Refresca el token de autenticación.
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
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Sesión cerrada correctamente.']);
    }
}

```

### Configuración de sanctum
 A continuacion edite el archivo de configuración de Laravel Sanctum.

```js title=config\sanctum.php
<?php

use Laravel\Sanctum\Sanctum;

return [

    /*
    |--------------------------------------------------------------------------
    | Stateful Domains
    |--------------------------------------------------------------------------
    |
    | Requests from the following domains / hosts will receive stateful API
    | authentication cookies. Typically, these should include your local
    | and production domains which access your API via a frontend SPA.
    |
    */

   // 'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', '*')),
   'stateful' => [],
    /*
    |--------------------------------------------------------------------------
    | Sanctum Guards
    |--------------------------------------------------------------------------
    |
    | This array contains the authentication guards that will be checked when
    | Sanctum is trying to authenticate a request. If none of these guards
    | are able to authenticate the request, Sanctum will use the bearer
    | token that's present on an incoming request for authentication.
    |
    */

    'guard' => ['web'],

    /*
    |--------------------------------------------------------------------------
    | Expiration Minutes
    |--------------------------------------------------------------------------
    |
    | This value controls the number of minutes until an issued token will be
    | considered expired. This will override any values set in the token's
    | "expires_at" attribute, but first-party sessions are not affected.
    |
    */

    'expiration' => null,

    /*
    |--------------------------------------------------------------------------
    | Token Prefix
    |--------------------------------------------------------------------------
    |
    | Sanctum can prefix new tokens in order to take advantage of numerous
    | security scanning initiatives maintained by open source platforms
    | that notify developers if they commit tokens into repositories.
    |
    | See: https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning
    |
    */

    'token_prefix' => env('SANCTUM_TOKEN_PREFIX', ''),

    /*
    |--------------------------------------------------------------------------
    | Sanctum Middleware
    |--------------------------------------------------------------------------
    |
    | When authenticating your first-party SPA with Sanctum you may need to
    | customize some of the middleware Sanctum uses while processing the
    | request. You may change the middleware listed below as required.
    |
    */

    'middleware' => [
        'authenticate_session' => Laravel\Sanctum\Http\Middleware\AuthenticateSession::class,
        'encrypt_cookies' => Illuminate\Cookie\Middleware\EncryptCookies::class,
        'validate_csrf_token' => Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class,
    ],

];
```
Cambie el siguiente código.
```ts
 // 'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', '*')),
   'stateful' => [],
```
Este código le indica a **sanctum** que vamos a realizar la utentificación por **token**.

### Rutas protegidas con **sanctum**.

El middleware de autenticación de Sanctum es una capa de seguridad que puedes aplicar a tus rutas para asegurarte de que solo los usuarios autenticados puedan acceder a ellas. Aquí tienes un desglose paso a paso:

1. **Middleware `auth:sanctum`:** Este middleware proporcionado por Laravel Sanctum es el que utilizaremos para proteger nuestras rutas. Cuando una solicitud llega a una ruta que tiene este middleware aplicado, Laravel verificará si el usuario está autenticado utilizando Sanctum antes de permitir el acceso a la ruta.

2. **Aplicar el middleware a las rutas deseadas:** En el archivo de rutas de tu aplicación Laravel, por lo general `routes/api.php`, puedes aplicar el middleware `auth:sanctum` a las rutas que desees proteger. Puedes aplicarlo individualmente a una ruta específica o agruparlo para aplicarlo a un conjunto de rutas relacionadas.

   ```ts
   use App\Http\Controllers\APIController;
   use Illuminate\Support\Facades\Route;

   // Ruta protegida individualmente
   Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
       return $request->user();
   });

   // Grupo de rutas protegidas
   Route::middleware('auth:sanctum')->group(function () {
       // Aquí puedes definir todas las rutas que deseas proteger
       Route::get('/protected-route', [APIController::class, 'protectedMethod']);
       Route::post('/another-protected-route', [APIController::class, 'anotherProtectedMethod']);
   });
   ```

En este ejemplo:

- La ruta `/user` está protegida individualmente con el middleware `auth:sanctum`. Solo los usuarios autenticados podrán acceder a esta ruta.
- El grupo de rutas dentro de `Route::middleware('auth:sanctum')->group(function () { ... })` contiene las rutas `/protected-route` y `/another-protected-route`. Ambas rutas están protegidas por el middleware `auth:sanctum`, lo que significa que solo los usuarios autenticados podrán acceder a ellas.

Al aplicar el middleware `auth:sanctum` de esta manera, puedes proteger fácilmente tus rutas API en Laravel y asegurarte de que solo los usuarios autenticados puedan acceder a ellas.

### Código definitivo

Nuestro código debería quedar asi:

```ts
<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



// Rutas para la autenticación
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rutas protegidas por Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
```

Con esto hemos llegado al final del capítulo.