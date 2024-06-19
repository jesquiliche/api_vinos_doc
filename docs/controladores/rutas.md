---
sidebar_position: 6
---
# Rutas
![Conceptos](/assets/images/rutas.jpeg)

## ¿Qué es una ruta?

Las rutas en Laravel 11 son la manera de establecer URLs que se corresponden con las funciones específicas en su aplicación. Cada URL se asocia con un controlador y una acción en ese controlador, que determina qué se muestra al usuario cuando accede a la URL. Las rutas en Laravel 9 se definen en el archivo "routes/web.php" o "routes/api.php" y se pueden utilizar para establecer tanto rutas para vistas como para API REST. Además, también es posible asignar rutas a grupos que compartan una serie de características comunes, como middleware, prefijos de URL o namespaces.

## Creación de las rutas de nuestra API REST.

En el archivo api.php deberíamos tener el siguiente código:

```js title="routes\api.php"
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::apiResource('v1/colores', App\Http\Controllers\Api\V1\ColorController::class);
Route::apiResource('v1/paises', App\Http\Controllers\Api\V1\PaisController::class);
Route::apiResource('v1/tipos', App\Http\Controllers\Api\V1\TipoController::class);
Route::apiResource('v1/graduaciones', App\Http\Controllers\Api\V1\GraduacionController::class);
Route::apiResource('v1/poblaciones', App\Http\Controllers\Api\V1\PoblacionController::class);
Route::apiResource('v1/provincias', App\Http\Controllers\Api\V1\ProvinciaController::class);

Route::get('v1/cervezas',[App\Http\Controllers\Api\V1\CervezaController::class,'index']);
Route::get('v1/cervezas/{id}',[App\Http\Controllers\Api\V1\CervezaController::class,'show']);
Route::get('v1/consultaCervezasPorPais',[App\Http\Controllers\Api\V1\SystemController::class,'consultaCervezasPorPais']);
Route::get('v1/consultaCervezasPorTipo',[App\Http\Controllers\Api\V1\SystemController::class,'consultaCervezasPorTipo']);
Route::get('v1/consultaCervezasPorColores',[App\Http\Controllers\Api\V1\SystemController::class,'consultaCervezasColores']);
Route::get('v1/consultaCervezasPorGraduaciones',[App\Http\Controllers\Api\V1\SystemController::class,'consultaCervezasGraduaciones']);
Route::get('v1/stockPorPais',[App\Http\Controllers\Api\V1\SystemController::class,'stockPorPais']);
Route::get('v1/consultaTablas',[App\Http\Controllers\Api\V1\SystemController::class,'consultaTablas']);
Route::get('v1/consultaTablas2',[App\Http\Controllers\Api\V1\SystemController::class,'consultaTablas2']);
Route::get('v1/consultaBD',[App\Http\Controllers\Api\V1\SystemController::class,'consultaBD']);

Route::put('v1/cervezas/{id}',[App\Http\Controllers\Api\V1\CervezaController::class,'update']);
Route::patch('v1/cervezas/{id}',[App\Http\Controllers\Api\V1\CervezaController::class,'patch']);
Route::post('v1/cervezas',[App\Http\Controllers\Api\V1\CervezaController::class,'store']);
Route::delete('v1/cervezas/{id}',[App\Http\Controllers\Api\V1\CervezaController::class,'destroy']);
```
Este código define rutas para una aplicación Laravel. Utiliza el método Route::controller() para crear un grupo de rutas que son manejadas por un controlador específico (AuthController en este caso). Este controlador contiene métodos para iniciar sesión, registrarse, cerrar sesión y actualizar el token de autenticación.

El método **Route::apiResource()** se utiliza para definir rutas para los siguientes controladores: CategoriaController, IvaController, ProductoController, OfertaController, PoblacionController, ProveedorController, ProvinciaController, SubcategoriaController y MarcaController. Estas rutas se asignan a los siguientes recursos: categorías, ivas, productos, ofertas, poblaciones, proveedores, provincias, subcategorías y marcas. Todas estas rutas se aplican el middleware 'api', que es un grupo de middleware predefinido en Laravel que incluye la autenticación y la protección contra ataques CSRF.

En resumen, este código define un conjunto de rutas para una aplicación Laravel, que permiten a los usuarios interactuar con diferentes recursos a través de una API REST.

### Probando las rutas

Para probar nuestras rutas vamos a utilizar un **plugin** de **Visual Studio Code** llamado **REST client** que permite almacenar todos nuestros endpoints en un archivo de texto para uso futuro, el cual también nos puede servir documentación. Aunque puede utilizar cualquier cliente REST que le apetezca como **POSTMAN**.

```
@accessToken = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzA0NzAwNzcxLCJleHAiOjE3MDQ3MDQzNzEsIm5iZiI6MTcwNDcwMDc3MSwianRpIjoidXlIYmtTQU5ZNlZ5bkFaeSIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.o6pzi58w4dUUzSsJhlzBC9PWIVSqKrc2EpRqVx2WNpQ

#### Registrarse
POST  http://127.0.0.1:8000/api/register
Content-Type: application/json

{
    "name":"Jesus",
    "email":"jesquiliche@hotmail.com",
    "password":"1234678"
}

#### Login
POST  http://127.0.0.1:8000/api/login
Content-Type: application/json

{
    "email":"admin@test.com",
    "password":"admin_password"
}

#### Logout
POST  http://127.0.0.1:8000/api/logout
Authorization: Bearer {{accessToken}}

#### refresh
POST  http://127.0.0.1:8000/api/refresh
Authorization: Bearer {{accessToken}}


#### Obtener todos los colores
GET http://localhost:8000/api/v1/colores

### Crear color
POST   http://localhost:8000/api/v1/colores
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
    "nombre":"Rojo"
}

### Obtener color por Id
GET   http://localhost:8000/api/v1/colores/1


### Modificicar color
DELETE   http://localhost:8000/api/v1/colores/1
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
    "nombre":"Prueba 2"
}

#### Obtener todos los paises
GET http://localhost:8000/api/v1/paises

#### Obtener pais por su id
GET http://localhost:8000/api/v1/paises/5

### Crear país
POST   http://localhost:8000/api/v1/paises
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
    "nombre":"Peru"
}

### Modificar  país
PUT   http://localhost:8000/api/v1/paises/1
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
    "nombre":"Pais modificado"
}

### Borrando pais
DELETE   http://localhost:8000/api/v1/paises/9
Authorization: Bearer {{accessToken}}


#### Obtener todos los tipos
GET http://localhost:8000/api/v1/tipos

#### Obtener tipo por su id
GET http://localhost:8000/api/v1/tipos/1

### Crear tipo
POST   http://localhost:8000/api/v1/tipos
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
    "nombre":"Sin alcohol"
}

### Modificar tipo
PATCH    http://localhost:8000/api/v1/tipos/11
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
    "update_at":"32323323",
    "nombre":"Doble malta",
    "descripcion":"Prueba"
}

### Borrar tipo
DELETE   http://localhost:8000/api/v1/tipos/2
Authorization: Bearer {{accessToken}}

#### Obtener todas las graduaciones
GET http://localhost:8000/api/v1/graduaciones

#### Obtener graduación por su id
GET http://localhost:8000/api/v1/graduaciones/5

### Crear graduación
POST   http://localhost:8000/api/v1/tipos
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
    "nombre":"Super toxica"
}

### Obtener ripo
GET   http://localhost:8000/api/v1/tipos/1


### Modificar tipo
PUT   http://localhost:8000/api/v1/graduaciones/3
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
    "nombre":"Puro alcohol"
}

### Bor6543rar tipo
DELETE   http://localhost:8000/api/v1/graduaciones/1
Authorization: Bearer {{accessToken}}


#### Obtener las cervezas
GET http://localhost:8000/api/v1/cervezas?oferta=0


#### Obtener una cerveza
GET http://localhost:8000/api/v1/cervezas/15

#### Obtener las cervezas
GET http://localhost:8000/api/v1/cervezas?per_page=1&novedad=0&marca=a

#### Crear cerveza
POST   http://localhost:8000/api/v1/cervezas
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
    "nombre":"Cerveza Voldamm14",
    "descripcion":"La mejor cerveza de españa",
    "color_id":4,
    "graduacion_id":2,
    "tipo_id":1,
    "pais_id":1,
    "novedad":1,
    "oferta":1,
    "precio":0,
    "foto":"imagen",
    "marca":"damm"
}

#### Modificar cerveza
PUT   http://localhost:8000/api/v1/cervezas/14
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
    "nombre":"Cerveza Voldamm Modificada",
    "descripcion":"La mejor cerveza de españa erer",
    "color_id":4,
    "graduacion_id":2,
    "tipo_id":1,
    "pais_id":1,
    "novedad":1,
    "oferta":1,
    "precio":0,
    "marca":"damm"
}

#### Modificar cerveza
PATCH  http://localhost:8000/api/v1/cervezas/15
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
    "id": 13,
    "novedad":1,
    "oferta":1,
    "tipo_id": 16,
   
    
}
#### Borrar cerveza
DELETE  http://localhost:8000/api/v1/cervezas/1
Authorization: Bearer {{accessToken}}

#### Obtener cervezas por pais
GET  http://localhost:8000/api/v1/consultaCervezasPorPais

#### Obtener cervezas por pais
GET  http://localhost:8000/api/v1/consultaCervezasPorTipo

#### Obtener cervezas por pais
GET  http://localhost:8000/api/v1/consultaTablas

#### Obtener cervezas por pais
GET  http://localhost:8000/api/v1/consultaDB
```