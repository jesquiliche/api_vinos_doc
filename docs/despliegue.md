---
sidebar_position: 20
---
# Despliegue

## Introducción

En el presente capítulo veremos cómo efectuar un despliegue de nuestro proyecto en Internet, para que pueda ser visible por todo el mundo. Para poder llevar a cabo este proceso con éxito, deberemos contemplar varios requisitos. Para nuestro ejemplo, utilizaremos el proveedor de servicios **Railway**, que, si bien no es gratuito a fecha de hoy **(marzo 2024)**, cuenta con planes a partir de 5 €, suficiente para desplegar nuestros proyectos de prueba. Para más información, consulte al proveedor. Siéntase libre de escoger otros planes o proveedores que sean de su agrado. También deberá contar con una cuenta en **GitHub** y un repositorio. Además, asegúrese de que su proveedor cuente con la versión **PHP 8.2** o superior y, por supuesto, con una base de datos relacional **MySQL** para este ejemplo. Aunque Laravel permite la conexión con otras bases de datos relacionales, como *PostgreSQL, SQL Server y SQLite*, para más detalles consulte la documentación oficial de **Laravel**.

## Procedimiento

### Creación de la base de datos
1. Una vez dado de alta como uauario e inicida sessión, pule en el botón **Start New Project**.

![Railway](/images/railway1.png)

2. Una vez pulsado el botón deberá aparecerle la siguinente pantalla.
En el desplegable que aparece en pantalla, deberá escoger la opción **Provision MySQL**. Esta opción nos permitirá crear y montar nuestra base de datos.

![Railway](/images/railway2.png)

3.- Una vez creada la BBDD, pulse sobre el enlace de la ficha y deberá aparecerle una ficha, a continuación seleccione la pestaña **variables**.
Una vez seleccionada la pestaña, deberá copiar el contenio de las siguientes variables:

```
MYSQLDATABASE
MYSQLHOST
MYSQLPASSWORD
MYSQLPORT
MYSQL_DATABASE
```
Guarde estas variables, en cualquier lugar accesible pues haremos uso de ellas más tarde.

![Railway](/images/railway3.png)

### Creación de la aplicación

Antes de continuar, deberá de disponer de un repositorio en **Github**, si usted no conoce **git** y **gitub** le recomiendo seguir uno de los muchos tutoriales que existen en Internet.

Pulse sobre el icono del tren y deberá aparecerle un pantalla similar a la siguiente:

![Railway](/images/railway4.png)

Pulse el botón **New Project** deberá aparecerse una página como la siguiente:

![Railway](/images/railway5.png)

Selecciona **Deploy from GitHub repo**. Suponiendo que es tu primer despliegue en **RailWay**, deberás seleccionar la opción **Configured GitHub**. Esta opción es muy útil, ya que no solo desplegará nuestra aplicación por primera vez, sino que también se volverá a desplegar automáticamente cada vez que hagamos cambios en nuestro repositorio. A esto se le llama integración continua. Se nos pedirá nuestra contraseña de acceso a **GitHub** y que le demos permisos de acceso a **Railway** a nuestro repositorio 

![Railway](/images/railway6.png)

![Railway](/images/railway7.png)

A continuación se nos pedirá que selccionemos un repositorio. Existen dos opciones, o seleccionarlos o todos o uno concreto. Escoja su proyecto.

![Railway](/images/railway8.png)

Una vez seccionada la opción adecuada, nos aparecerá la siguiente pantalla:

![Railway](/images/railway9.png)

Aún no vamos a desplegar la aplicación; todavía necesitamos especificar las variables de entorno. Selecciona **Add Variables**. En la siguiente pantalla, haz clic en **cancelar**, porque de lo contrario tendríamos que introducirlas una por una. En la siguiente pantalla escoja la pestaña **variables**.

![Railway](/images/railway10.png)

Escoja la opción **RAW Editor**.

En la ventana modal emergente, copie el contenido de su archivo .env que se encuentra en la raíz del proyecto y péguelo. 

![Railway](/images/railway11.png)

A continuación debemos cambiar el contenido de ciertas variables:

:::info variables de entorno
APP_NAME=**Nombre de su aplicación**

APP_ENV=production

APP_DEBUG=false

APP_URL=**Poner después del despliegue**
:::

Los valores en negrita  indican que estos valores deben ser especificados por usted según sus necesidades. El **APP_URL** debe ser rellanado una vez conozcamos el dominio asignado por **RailWay**. 
Recuerda que unos pasos atrás le indique que guardara los valores de ciertas valores de valores de entorno, estos se verían algo así:

:::info Variables de conexión BBDD
MYSQLDATABASE=**xxxxxxxxxxxxxx**

MYSQLHOST=**xxxxxxx**

MYSQLPASSWORD=**xxxx**

MYSQLPORT=**xxxxxxxxx**

MYSQLUSER=**xxxx**
:::

A continuación debe cambiar las siguientes variables con el valor de las variables de conexión antes expuestas:

:::info variables de conexión de la app
DB_CONNECTION=mysql

DB_HOST==>MYSQLHOST

DB_PORT=>MYSQLPORT

DB_DATABASE=>MYSQLDATABASE

DB_USERNAME=>MYSQLUSER

DB_PASSWORD=>MYSQLPASSWORD
:::

A continuación y al final del **Raw edito4** debajo de todas las variables debe introducir el siguiente código literal:

```
NIXPACKS_BUILD_CMD=composer install && npm i && npm run build && php artisan optimize && php artisan config:cache &&  php artisan route:cache && php artisan view:cache && php artisan migrate:fresh --seed --force
```
Si observas atentamente estas instrucciones, notarás que son las mismas que utilizarías para iniciar el proyecto. La instrucción php artisan migrate:fresh --seed --force inicializa la base de datos, ejecuta las migraciones y los seeders. Por lo tanto, deberás modificarla en despliegues posteriores si ya tienes datos. Modifícala en ese caso si no quieres que la base de datos se inicialice en cada nuevo despliegue.

Una vez ya definidas las variables de entorno, ya puede comenzar a realizar el despliegue. Pulse sobre el boton **Deploy**. Justo en este momento comenzara el despliegue esta proceso, pude tardar varios minutos.

![Railway](/images/railway12.png)

Si todo ha ido bien en la pestaña **Deploy** nos deberá aparecer una pantalla similar a la siguiente:

![Railway](/images/railway14.png)

Ya casi hemos terminado, solo quedan un par de pasos. Vaya a la pestaña **Settings** y en la opción **Public networking** pulse el botón **Generate Domain**.

![Railway](/images/railway15.png)



![Railway](/images/railway16.png)



Vuelva a la pestaña de **Deployments** y pulse sobre el enlace. Debería aparecer la pantalla de presentación Laravel.

![Railway](/images/railway18.png)
