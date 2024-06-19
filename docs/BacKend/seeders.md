---
sidebar_position: 5
---
# Rellenando la BB.DD
## Seeders

### ¿Qué es un seeder?
![Seeder](/assets/images/bd.webp)

Un seeder en Laravel es una clase que se utiliza para poblar una base de datos con datos de prueba. Los seeders son útiles para probar aplicaciones, crear datos de prueba para desarrolladores y para personalizar una base de datos con información específica.

Cada seeder en Laravel extiende de la clase **Illuminate\Database\Seeder** y contiene un método run que se ejecuta cuando se llama el comando **php artisan db:seed**. Dentro de este método, puedes escribir cualquier lógica que necesites para insertar datos en tu base de datos.

Puedes crear varios seeders y ejecutarlos todos o solo algunos según tus necesidades. Al ejecutar un seeder, sus datos se insertan en la base de datos de forma automática, lo que te permite rellenar tus tablas de forma rápida y sencilla.

### ¿Cómo se crea un seeder?


Para crear un seeder en Laravel, puedes usar el siguiente comando de Artisan:
```bash
php artisan make:seeder NombreSeeder
```

Donde NombreSeeder es el nombre que le quieres dar a tu seeder. Este comando creará un archivo en la carpeta database/seeds con el nombre que le hayas especificado y con una estructura básica de código para que puedas empezar a escribir tu lógica de seeding.

Aquí tienes un ejemplo básico de código para un seeder:

```js
<?php
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NombreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('table_name')->insert([
            'column1' => 'value1',
            'column2' => 'value2',
            // ...
        ]);
    }
}
?>
```

Puedes agregar más datos o lógica para rellenar tus tablas de forma más compleja.

Para ejecutar los seeders, puedes usar el siguiente comando:

```bash
php artisan db:seed
```
También puedes ejecutar un seeder específico utilizando el siguiente comando:

```bash
php artisan db:seed --class=NombreSeeder
```
### ColoresSeeder

Vamos a poner en practica lo aprendido en el apartado anterior. Crearemos un **seeder** destinado a rellanar nuestra tabla colores con los distintos colores que puede tener una cerveza. Para ello ejecute el siguiente comando en su terminal y dentro de su proyecto.

```bash
php artisan make:seeder  --class=ColoresSeeder
```
Se habrá creado en la carpeta database/seeders un nuevo archivo con extensión PHP llamado **ColoresSeeder**. En el deberemos escribir el siguiente código, el cual comentaremos a continuación.

```js
<?php

namespace Database\Seeders;
namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    
    public function run()
    {
        $data = [
    ["nombre" => "Amarillo"],
    ["nombre" => "Ambar"],
    ["nombre" => "Blanca"],
    ["nombre" => "Cobrizo"],
    ["nombre" => "Marrón"],
    ["nombre" => "Negra"],
    ["nombre" => "Rubia"],
    ["nombre" => "Tostada"]
];

            DB::table('colores')->insert($data);
    }
}
```
Este Seeder en Laravel tiene como objetivo insertar datos en la tabla "colores" de la base de datos. Veamos una explicación de lo que hace:

1. **Namespace y Uso de Clases**: Al principio del Seeder, se declaran los namespaces necesarios para Laravel. El Seeder se encuentra en el namespace `Database\Seeders`. Además, se importa la clase `Seeder` de Laravel, así como otras clases útiles, como `DB`.

2. **Clase `ColorSeeder`**: El Seeder se define como una clase llamada `ColorSeeder` que extiende la clase base `Seeder`.

3. **Método `run`**: En el Seeder, se implementa el método `run`. Este método se ejecuta cuando ejecutas el Seeder y es el lugar donde se define la lógica para insertar datos en la base de datos.

4. **Datos a Insertar**: Se define un array llamado `$data` que contiene un conjunto de registros de colores. Cada registro es un array asociativo con un campo "nombre" que representa el nombre del color.

5. **Inserción en la Base de Datos**: Se utiliza la clase `DB` y su método `table` para especificar la tabla en la que se insertarán los datos, en este caso, "colores". Luego, se utiliza el método `insert` para insertar los datos del array `$data` en la tabla "colores".

6. **Ejecución del Seeder**: Cuando ejecutas este Seeder mediante el comando `php artisan db:seed`, los datos definidos en el array `$data` se insertarán en la tabla "colores" de la base de datos.

A continuación aplicaremos la misma lógica para el resto de seeders

### TiposSeeder

```js"
<?php

namespace Database\Seeders;

use App\Models\Tipo;
use \Illuminate\Support\Facades\File;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TiposSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tipos')->delete();
        $json = File::get("database/seeders/data/tipos.json");
        $data = json_decode($json);
        foreach ($data as $obj) {
            Tipo::create(array(
                'nombre' => $obj->nombre,
                'descripcion' => $obj->descripcion,
            ));
        
        }
    }
}
```
### Explicación del código
Este seeder de Laravel está diseñado para poblar la base de datos con información de tipos de cerveza a partir de un archivo JSON. Aquí hay una explicación paso a paso de lo que hace:

1. **Namespace y Uso de Clases:**
   ```js
   namespace Database\Seeders;
   
   use App\Models\Tipo;
   use \Illuminate\Support\Facades\File;
   use Illuminate\Database\Console\Seeds\WithoutModelEvents;
   use Illuminate\Database\Seeder;
   use Illuminate\Support\Facades\DB;
   ```

   - El seeder está en el namespace `Database\Seeders`.
   - Utiliza el modelo `Tipo` ubicado en el espacio de nombres `App\Models`.
   - Hace uso de la clase `File` del espacio de nombres `Illuminate\Support\Facades` para trabajar con archivos.
   - Extiende la clase base `Seeder` de Laravel.

2. **Clase `TiposSeeder`:**
   ```php
   class TiposSeeder extends Seeder
   {
   ```

   - La clase se llama `TiposSeeder` y extiende la clase base `Seeder`.

3. **Método `run()`:**
   ```php
   public function run(): void
   {
   ```

   - Este método es llamado cuando se ejecuta el seeder. Contiene la lógica principal para poblar la base de datos.

4. **Eliminar Registros Existente:**
   ```js
   DB::table('tipos')->delete();
   ```
   - Elimina todos los registros existentes en la tabla `tipos`. Esto asegura que la tabla esté vacía antes de insertar nuevos datos.

5. **Obtener Datos del Archivo JSON:**
   ```js
   $json = File::get("database/seeders/data/tipos.json");
   $data = json_decode($json);
   ```
   - Lee el contenido del archivo JSON ubicado en `database/seeders/data/tipos.json`.
   - Convierte el JSON en un objeto PHP usando `json_decode`.

6. **Iterar y Crear Registros:**
   ```js
   foreach ($data as $obj) {
       Tipo::create(array(
           'nombre' => $obj->nombre,
           'descripcion' => $obj->descripcion,
       ));
   }
   ```
   - Itera sobre cada objeto en los datos obtenidos del JSON.
   - Para cada objeto, crea un nuevo registro en la tabla `tipos` utilizando el modelo `Tipo`.
   - Asigna los valores de 'nombre' y 'descripcion' desde el objeto JSON.

En resumen, este seeder se encarga de vaciar la tabla `tipos` y luego llenarla con datos obtenidos de un archivo JSON que contiene información sobre tipos de cerveza, utilizando el modelo `Tipo`. Este proceso es comúnmente utilizado en el desarrollo para tener datos de prueba o iniciales en la base de datos.


### PaisesSeeder

```js
<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaisesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ["nombre" => "España"],
            ["nombre" => "Alemania"],
            ["nombre" => "Francia"],
            ["nombre" => "República checa"],
            ["nombre" => "Belgica"],
            ["nombre" => "EEUU"],
            ["nombre" =>"Escocia"],
            ["nombre" => "Holanda"],
            ["nombre" => "Inglaterra"],
            ["nombre" =>"Escocia"],
            ["nombre" => "Holanda"],
            ["nombre" => "Irlanda"]
        ];

        DB::table('Paises')->insert($data);
    }
}
```

###  ProvinciasSeeder

```js
<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProvinciaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return vocodigo
     */
    public function run()
    {
        //
        $provincias = array (
            array ('codigo' => "01", "nombre" => "ALAVA"),
            array ('codigo' => "02", "nombre" => "ALBACETE"),
            array ('codigo' => "03", "nombre" => "ALICANTE"),
            array ('codigo' => "04", "nombre" => "ALMERIA"),
            array ('codigo' => "33", "nombre" => "ASTURIAS"),
            array ('codigo' => "05", "nombre" => "AVILA"),
            array ('codigo' => "06", "nombre" => "BADAJOZ"),
            array ('codigo' => "08", "nombre" => "BARCELONA"),
            array ('codigo' => "09", "nombre" => "BURGOS"),
            array ('codigo' => "10", "nombre" => "CACERES"),
            array ('codigo' => "11", "nombre" => "CADIZ"),
            array ('codigo' => "39", "nombre" => "CANTABRIA"),
            array ('codigo' => "12", "nombre" => "CASTELLON"),
            array ('codigo' => "51", "nombre" => "CEUTA"),
            array ('codigo' => "13", "nombre" => "CIUDAD REAL"),
            array ('codigo' => "14", "nombre" => "CORDOBA"),
            array ('codigo' => "15", "nombre" => "CORUÑA"),
            array ('codigo' => "16", "nombre" => "CUENCA"),
            array ('codigo' => "17", "nombre" => "GIRONA"),
            array ('codigo' => "18", "nombre" => "GRANADA"),
            array ('codigo' => "19", "nombre" => "GUADALAJARA"),
            array ('codigo' => "20", "nombre" => "GUIPUZCOA"),
            array ('codigo' => "21", "nombre" => "HUELVA"),
            array ('codigo' => "22", "nombre" => "HUESCA"),
            array ('codigo' => "07", "nombre" => "ILLES BALEARS"),
            array ('codigo' => "23", "nombre" => "JAEN"),
            array ('codigo' => "24", "nombre" => "LEON"),
            array ('codigo' => "25", "nombre" => "LLEcodigoA"),
            array ('codigo' => "27", "nombre" => "LUGO"),
            array ('codigo' => "28", "nombre" => "MADRID"),
            array ('codigo' => "29", "nombre" => "MALAGA"),
            array ('codigo' => "52", "nombre" => "MELILLA"),
            array ('codigo' => "30", "nombre" => "MURCIA"),
            array ('codigo' => "31", "nombre" => "NAVARRA"),
            array ('codigo' => "32", "nombre" => "OURENSE"),
            array ('codigo' => "34", "nombre" => "PALENCIA"),
            array ('codigo' => "35", "nombre" => "PALMAS, LAS"),
            array ('codigo' => "36", "nombre" => "PONTEVEDRA"),
            array ('codigo' => "26", "nombre" => "RIOJA, LA"),
            array ('codigo' => "37", "nombre" => "SALAMANCA"),
            array ('codigo' => "38", "nombre" => "SANTA CRUZ DE TENERIFE"),
            array ('codigo' => "40", "nombre" => "SEGOVIA"),
            array ('codigo' => "41", "nombre" => "SEVILLA"),
            array ('codigo' => "42", "nombre" => "SORIA"),
            array ('codigo' => "43", "nombre" => "TARRAGONA"),
            array ('codigo' => "44", "nombre" => "TERUEL"),
            array ('codigo' => "45", "nombre" => "TOLEDO"),
            array ('codigo' => "46", "nombre" => "VALENCIA"),
            array ('codigo' => "47", "nombre" => "VALLADOLID"),
            array ('codigo' => "48", "nombre" => "VIZCAYA"),
            array ('codigo' => "49", "nombre" => "ZAMORA"),
            array ('codigo' => "50", "nombre" => "ZARAGOZA")
       );
       print "Insertando provincias\n";
       DB::table('provincias')->insert($provincias);
    }
}
```
### GraduacionesSeeder

```js 
<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GraduacionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ["nombre" => "Alta(7-9"],
            ["nombre" => "Baja(3-5)"],
            ["nombre" => "Maxima(12+)"],
            ["nombre" => "Muy alta(9-12"],
            ["nombre" => "Sin alcohol(0-2.9)"],
        ];
        
        DB::table('graduaciones')->insert($data);
    }
}
```
### CervezasSeeder

A continuación, vamos a estudiar un caso diferente. Vamos a llenar nuestra tabla **cervezas** con datos de un archivo externo, específicamente un archivo en formato **JSON**. Esta opción es interesante cuando necesitamos migrar datos ya existentes de otra aplicación a nuestra aplicación Laravel. Para lograrlo, crearemos un archivo llamado **cervezas.json** en un directorio llamado **data** dentro de **database/seeders**. A continuación, edita el archivo y escribe el siguiente código:

```
[
    {
        "nombre": "POMELO IPA IDA Y VUELTA 24x33cl",
        "descripcion": "**Estilo POMELO IPA. Sin gluten**\n5,8 % ABV\nIBU´S 50, amarga.\n**INGREDIENTES:** Agua; maltas de trigo Torrefacto y Extra pale; lúpulos Cascade, Columbus y Citra, copos de AVENA, zumo y cáscara de pomelo y levadura Ale. \nGastos de envío España Peninsular incluidos.\n24 botellas de 33 cl\n\nExiste la posibilidad de que, como realizamos los envíos en cajas de 12 unidades, puedas componer la tuya con los tipos de cerveza de Dougall que desees. Para ello, debes enviar un correo a info@milcervezas.com explicando lo que desearías. \n\nCerveza elaborada por DouGall's desde el 2023 en colaboración con Refu. Valle de Arán",
        "precio": 59.81,
        "marca": "DouGall's",
        "envase": "Botella",
        "contenido": "33cl",
        "unidades": 24,
        "novedad": true,
        "color_id": 1,
        "graduacion_id": 4,
        "pais_id": 1,
        "tipo_id": 2,
        "foto": "https://res.cloudinary.com/dkrew530b/image/upload/v1697309153/pomelo_ipa_ida_y_vuelta_24x33cl_4baeb73584.jpg"
    },
    {
        "nombre": "DIPA or Nothing 12x33",
        "descripcion": "Estilo: DDH Doble IPA\nAlcohol: 7,5 % Abv \nIBU’S: 70 Bastante Amarga\nSin gluten\nIngredientes: Agua, maltas y lúpulos Incognito Mosaic, Azacca y Vic Secret.\nGastos de envío España Peninsular incluidos.\n1\n",
        "precio": 46.58,
        "marca": "DIPA or Nothing ",
        "envase": "Botella",
        "contenido": "33cl",
        "unidades": 12,
        "novedad": true,
        "color_id": 8,
        "graduacion_id": 1,
        "pais_id": 2,
        "tipo_id": 7,
        "foto": "https://res.cloudinary.com/dkrew530b/image/upload/v1697311032/dipa_or_nothing_12x33_a547d464d5.jpg"
    }
]
```

En este archivo JSON, hemos proporcionado datos de cervezas que pueden ser insertados en la tabla 'cervezas' de Laravel utilizando seeders. Asegúrate de que el archivo JSON esté en el directorio correcto y que siga el formato adecuado para que puedas utilizarlo en tu aplicación.

Seguidamente crearemos el **seeder** desde la terminal escriba el siguiente comando y ejecútelo:

```bash
php artisan make:seeder CervezasSeeder
```

Abra el archivo y escriba el siguiente código el cual analizaremos a continuación.

```js
<?php
// Paso 1: Espacio de nombres y Uso de Clases
namespace Database\Seeders;

use App\Models\Cerveza; // Modelo de cerveza
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; // Facade para la base de datos
use \Illuminate\Support\Facades\File; // Facade para trabajar con archivos

// Paso 2: Clase `CervezasSeeder`
class CervezasSeeder extends Seeder
{
    // Paso 3: Método `run`
    public function run()
    {
        // Paso 4: Eliminación de Datos Existente
        DB::table('cervezas')->delete(); // Elimina todos los registros existentes en la tabla "cervezas"

        // Paso 5: Lectura del Archivo JSON
        $json = File::get("database/seeders/data/cervezas.json"); // Lee el contenido del archivo JSON

        // Paso 6: Decodificación del JSON
        $data = json_decode($json); // Convierte el contenido JSON en un array de objetos PHP

        // Paso 7: Bucle de Inserción de Datos
        foreach ($data as $obj) {
            // Cada objeto se utiliza para crear un nuevo registro en la tabla "cervezas" utilizando el modelo `Cerveza`
            Cerveza::create(array(
                'nombre' => $obj->nombre,
                'descripcion' => $obj->descripcion,
                'color_id' => $obj->color_id,
                'tipo_id' => $obj->tipo_id,
                'pais_id' => $obj->pais_id,
                'graduacion_id' => $obj->graduacion_id,
                'marca' => $obj->marca,
                'precio' => $obj->precio,
                'foto' => $obj->foto
            ));
            // Paso 8: Impresión de Mensajes
            print "Insertando cerveza -> " . $obj->nombre . "\n";
        }
    }
}
```
### Explicación del código
Vamos a desglosar lo que hace paso a paso:

1. **Espacio de nombres y Uso de Clases**:
   - Se establece el espacio de nombres del Seeder en `Database\Seeders`.
   - Se importan las clases necesarias, como `Cerveza` (el modelo de cerveza), `Seeder`, `DB` (facade para la base de datos) y `File` (facade para trabajar con archivos).

2. **Clase `CervezasSeeder`**:
   - La clase `CervezasSeeder` extiende la clase base `Seeder` de Laravel.

3. **Método `run`**:
   - El método `run` es el punto de entrada para ejecutar el Seeder. En este método, se realizarán las operaciones para insertar datos en la base de datos.

4. **Eliminación de Datos Existente**:
   - `DB::table('cervezas')->delete()` elimina todos los registros existentes en la tabla "cervezas" antes de insertar nuevos datos. Esto asegura que la tabla esté vacía antes de agregar nuevos registros.

5. **Lectura del Archivo JSON**:
   - `File::get("database/seeders/data/cervezas.json")` lee el contenido del archivo JSON llamado "cervezas.json" ubicado en la ruta especificada.

6. **Decodificación del JSON**:
   - `json_decode($json)` convierte el contenido JSON en un array de objetos PHP. Cada objeto en el array representa un registro de cerveza.

7. **Bucle de Inserción de Datos**:
   - Se recorre el array de objetos JSON en un bucle `foreach`. Para cada objeto, se crea un nuevo registro en la tabla "cervezas" utilizando el modelo `Cerveza`.
   - Los campos de la tabla se llenan con los valores correspondientes de los objetos JSON.

8. **Impresión de Mensajes**:
   - `print` se utiliza para imprimir un mensaje que indica que se está insertando una cerveza en la base de datos. Esto puede ser útil para rastrear el progreso de la inserción.

En resumen, este Seeder se encarga de eliminar los datos existentes en la tabla "cervezas" y luego inserta nuevos registros en esa tabla a partir de los datos contenidos en el archivo JSON "cervezas.json". Es una forma eficaz de poblar la base de datos con datos iniciales para su aplicación Laravel.

### PoblacionesSeeder

A continuación siguiendo el ejemplo anterior vamos a llenar nustra tabla de poblaciones con otro JSON.

```js
<?php
namespace Database\Seeders;

use App\Models\Poblacion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use \Illuminate\Support\Facades\File;

class PoblacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('poblaciones')->delete();
        $json = File::get("database/seeders/data/poblaciones.json");
        $data = json_decode($json);
        foreach ($data as $obj) {
            Poblacion::create(array(
                
                'codigo' => $obj->codigo,
                'provincia_cod'=>substr($obj->codigo,0,2),
                'nombre' => $obj->nombre,
            ));
         //   print "Insertando población -> ".$obj->codigo." ".$obj->nombre."\n";
        }

    }
}
```
### Ejecución masiva de los Seeders

Para ejecutar múltiples seeders en Laravel, puedes utilizar el comando de *Artisan db:seed*. Este comando se utiliza para llenar la base de datos con datos iniciales y se ejecuta en la consola.

Por defecto, el comando **db:seed** ejecutará todos los seeders registrados en el archivo DatabaseSeeder.php en el directorio database/seeds. El archivo **DatabaseSeeder.php** debería contener una clase que extienda de **Illuminate\Database\Seeder** y que llame a los seeders individuales a través del método call.

Aquí esta el fichero **DatabaseSeeder.php** que ejecuta todo los seeders:

```js
<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(ColoresSeeder::class);
        $this->call(TiposSeeder::class);
        $this->call(GraduacionesSeeder::class);
        $this->call(PaisesSeeder::class);
        $this->call(CervezasSeeder::class);
    }
}
```
Una vez que tengas tu archivo DatabaseSeeder.php configurado, puedes ejecutar el comando db:seed en la consola de la siguiente manera:

```bash
php artisan db:seed
```
Esto ejecutará todos los seeders registrados en el archivo DatabaseSeeder.php y llenará la base de datos con los datos iniciales especificados en cada seeder.

También puede ejecutar los sideers después de ejecutar las migraciones con el siguiente comando:

```bash
php artisan migrate --seed
```
## Faker

Un "Faker" es una herramienta o biblioteca que se utiliza para generar datos falsos y realistas en el contexto del desarrollo de software. Estos datos falsos son útiles en diversas situaciones, como pruebas unitarias, pruebas de integración, desarrollo de prototipos y relleno de bases de datos con información de prueba. El objetivo principal de un Faker es proporcionar datos que parezcan reales, pero que no tengan información confidencial o privada.

En el desarrollo de software, los Fakers son especialmente útiles en las siguientes situaciones:

1. **Pruebas Unitarias y de Integración**: Puedes utilizar un Faker para crear datos de prueba que se ajusten a las estructuras de datos de tu aplicación. Esto es útil para simular situaciones reales y probar el comportamiento de tu código.

2. **Desarrollo de Prototipos**: Cuando estás creando un prototipo de una aplicación, no siempre tienes datos reales disponibles. Un Faker te permite generar datos ficticios que se ven como datos reales y que pueden ayudarte a diseñar y probar la interfaz de usuario.

3. **Población de Bases de Datos de Prueba**: Cuando necesitas llenar una base de datos con datos de prueba, un Faker puede generar una gran cantidad de datos ficticios que se asemejan a los datos que esperarías en una aplicación real.

4. **Privacidad y Seguridad**: Los Fakers son útiles cuando necesitas compartir información de muestra con otros desarrolladores o equipos sin exponer datos confidenciales o personales.

Laravel, un popular framework de PHP, proporciona una biblioteca llamada "Faker" que es ampliamente utilizada en el desarrollo de aplicaciones web. Laravel Faker permite generar una variedad de datos falsos, como nombres, direcciones, direcciones de correo electrónico, números de teléfono, fechas, y más, de una manera sencilla y coherente.

### UsersSeeder

Supongamos que tienes el modelo `User` predeterminado proporcionado por Laravel con los campos `name`, `email` y `password`. El objetivo es llenar la tabla de usuarios con datos de prueba generados por el Faker de Laravel. Aprovecharemos de paso para crear un usuario administrador.

1. Crea un Seeder utilizando el comando Artisan:

   ```
   php artisan make:seeder UsersSeeder
   ```

2. Abre el Seeder (`UsersSeeder.php`) y agrega la lógica para poblar la base de datos con datos falsos:

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
            'password' => bcrypt('admin_password') // Puedes establecer una contraseña predeterminada
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

En este ejemplo, se generan 20 usuarios de prueba con nombres y correos electrónicos falsos. Se utiliza la función `bcrypt` para cifrar una contraseña predeterminada ("password"), pero en una aplicación real, probablemente querrás generar contraseñas seguras.

3. Ejecuta el Seeder para poblar la tabla de usuarios:

   ```
   php artisan db:seed --class=UsersSeeder
   ```

Este Seeder generará 20 registros de usuarios de prueba en la tabla `users` de tu base de datos. Los nombres y correos electrónicos serán ficticios, pero puedes personalizar y extender este Seeder según tus necesidades, agregando más campos y lógica si es necesario. Este es un ejemplo básico de cómo usar el Faker de Laravel para poblar una tabla con datos falsos.

4. Añadir a la class DatabaseSeeder:

```js
<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(ColoresSeeder::class);
        $this->call(TiposSeeder::class);
        $this->call(GraduacionesSeeder::class);
        $this->call(PaisesSeeder::class);
        $this->call(CervezasSeeder::class);
        $this->call(UsersSeeder::class);
    }
}
```