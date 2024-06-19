---
sidebar_position: 3
---

# Obtención de Datos

## Introducción

### Almacenamiento en Caché de Datos

El almacenamiento en caché guarda datos para evitar recuperarlos repetidamente de su fuente original en cada solicitud.

Por defecto, Next.js almacena automáticamente los valores devueltos de las solicitudes fetch en la Caché de Datos del servidor. Esto permite recuperar los datos durante la construcción o la solicitud, almacenarlos en caché y reutilizarlos en cada solicitud de datos.

Sin embargo, hay excepciones; las solicitudes fetch no se almacenan en caché cuando:

- Se utilizan dentro de una Acción del Servidor.
- Se utilizan dentro de un Manejador de Rutas que usa el método POST.

### ¿Qué es la Caché de Datos?

La Caché de Datos es una caché HTTP persistente. Puede escalar automáticamente y compartirse entre varias regiones dependiendo de la plataforma.

### Revalidación de Datos

La revalidación es el proceso de purgar la Caché de Datos y volver a recuperar los datos más recientes. Esto es útil cuando los datos cambian y quieres asegurarte de mostrar la información más actualizada.

Los datos en caché pueden revalidarse de dos maneras:

- Revalidación basada en el tiempo: Revalida automáticamente los datos después de un cierto período. Es útil para datos que cambian raramente y no necesitan estar siempre actualizados.
- Revalidación bajo demanda: Revalida manualmente los datos basándose en un evento específico, como el envío de un formulario. Esto es útil cuando necesitas mostrar los datos más recientes lo antes posible.

#### Revalidación basada en el tiempo

Para revalidar datos en intervalos de tiempo, puedes utilizar la opción `next.revalidate` de la función fetch para establecer el tiempo de vida en caché de un recurso en segundos.

```javascript
fetch('https://...', { next: { revalidate: 3600 } })
```

Alternativamente, puedes configurar la revalidación para todas las solicitudes fetch en un segmento de ruta utilizando las Opciones de Configuración de Segmento.

```javascript
layout.js | page.js

export const revalidate = 3600 // Revalidar como máximo cada hora
```

Si tienes múltiples solicitudes fetch en una ruta renderizada estáticamente y cada una tiene una frecuencia de revalidación diferente, se utilizará el tiempo más bajo para todas las solicitudes. Para rutas renderizadas dinámicamente, cada solicitud fetch se revalidará independientemente.

#### Revalidación bajo demanda

Los datos pueden revalidarse bajo demanda por ruta (revalidatePath) o por etiqueta de caché (revalidateTag) dentro de una Acción del Servidor o un Manejador de Rutas.

Next.js tiene un sistema de etiquetado de caché para invalidar las solicitudes fetch en todas las rutas.

```javascript
app/page.tsx

export default async function Page() {
  const res = await fetch('https://...', { next: { tags: ['collection'] } })
  const data = await res.json()
  // ...
}
```

Luego, puedes revalidar esta llamada fetch etiquetada con `collection` llamando a `revalidateTag` en una Acción del Servidor.

```javascript
app/actions.ts

'use server'
 
import { revalidateTag } from 'next/cache'
 
export default async function action() {
  revalidateTag('collection')
}
```

### Manejo de Errores y Revalidación

Si se produce un error al intentar revalidar datos, se seguirán sirviendo los últimos datos generados con éxito desde la caché. En la siguiente solicitud, Next.js intentará volver a validar los datos.

### Exclusión del Almacenamiento en Caché de Datos

Las solicitudes fetch no se almacenan en caché si:

- Se añade `cache: 'no-store'` a las solicitudes fetch.
- Se añade la opción `revalidate: 0` a las solicitudes fetch individuales.
- La solicitud fetch está dentro de un Manejador de Rutas que utiliza el método POST.
- La solicitud fetch viene después del uso de encabezados o cookies.
- La opción de segmento de ruta `const dynamic = 'force-dynamic'` está en uso.
- La opción de segmento de ruta `fetchCache` está configurada para omitir la caché de forma predeterminada.
- La solicitud fetch utiliza encabezados de Autorización o Cookies y hay una solicitud sin caché arriba en el árbol de componentes.

## Desarrollo funcionas api.ts

Este modulo es un conjunto de funciones para interactuar con la API que maneja datos relacionados con cervezas y otros elementos relacionados, como países, colores, tipos, etc. Aquí hay un resumen de las funciones proporcionadas y su propósito:

1. Funciones para obtener datos de cervezas:
   - `fetchCervezas()`: Obtiene una lista de cervezas desde la API.
   - `fetchCervezasPorPaises()`: Obtiene una lista de cervezas agrupadas por país.
   - `fetchCervezasById(id)`: Obtiene los detalles de una cerveza específica por su ID.
   - `fetchCervezasQuery(query)`: Obtiene cervezas según una consulta específica.

2. Funciones para obtener datos de tipos, países y graduaciones:
   - `fetchTipos()`: Obtiene una lista de tipos de cervezas.
   - `fetchTiposQuery(query)`: Obtiene tipos de cervezas según una consulta específica.
   - `fetchPaises()`: Obtiene una lista de países.
   - `fetchPaisesById(id)`: Obtiene detalles de un país específico por su ID.
   - `fetchColores()`: Obtiene una lista de colores de cervezas.
   - `fetchGraduaciones()`: Obtiene una lista de graduaciones de cervezas.

3. Funciones para realizar acciones de registro y eliminación:
   - `postRegister(url, datos)`: Envía datos de registro de usuarios a una URL específica.
   - `fetchDeleteCervezasById(id, token)`: Elimina una cerveza específica por su ID y con un token de autorización.

 Esta modulo proporciona un conjunto de funciones para interactuar con una API que maneja datos relacionados con cervezas y otras entidades asociadas, como tipos, países y colores. Las funciones abarcan desde la obtención de datos hasta acciones de registro y eliminación.

 Cree una carpeta llamada **services** y cree dentro el fichero **api.ts**, edite y copie el siguiente **código**.

```js title=api.ts
"use server";
import {
  Cerveza,
  Color,
  Pais,
  Tipo,
  Graduacion,
  CervezaData,
  PaisesData,
} from "@/interfaces/interfaces";

export async function fetchCervezas() {
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:1337/api/";

  try {
    const response = await fetch(`${apiUrl}cervezas?page=1&per_page=40`, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("No se pudieron obtener los datos de la API");
    }

    const data = await response.json();

    return data;
    // Aquí puedes trabajar con los datos obtenidos de la API
  } catch (error) {
    console.error(error);
    return []; // Debes devolver un valor adecuado en caso de error
  }
}

export async function fetchCervezasPorPaises() {
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:1337/api/";

  try {
    const response = await fetch(`${apiUrl}consultaCervezasPorPais`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("No se pudieron obtener los datos de la API");
    }

    const data = await response.json();

    return data;
    // Aquí puedes trabajar con los datos obtenidos de la API
  } catch (error) {
    console.error(error);
    return []; // Debes devolver un valor adecuado en caso de error
  }
}

export async function fetchCervezasById(id: string): Promise<CervezaData> {
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:1337/api/";

  const response = await fetch(`${apiUrl}cervezas/${id}`, { next: { revalidate: 0 } });

  if (!response.ok) {
    throw new Error("No se pudieron obtener los datos de la API");
  }

  const data = await response.json();
  

  return data;
  // Aquí puedes trabajar con los datos obtenidos de la API
}

export async function fetchCervezasQuery(query: string) {
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:1337/api/";
  try {
    const response = await fetch(`${apiUrl}cervezas?${query}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("No se pudieron obtener los datos de la API");
    }

    const data = await response.json();
    return data;

    // Aquí puedes trabajar con los datos obtenidos de la API
  } catch (error) {
    return []; // Debes devolver un valor adecuado en caso de error
  }
}

export async function fetchTiposQuery(query: string) {
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:1337/api/";
  try {
    const response = await fetch(`${apiUrl}tipos?${query}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return false
      throw new Error("No se pudieron obtener los datos de la API");
    }

    const data = await response.json();
    return data;

    // Aquí puedes trabajar con los datos obtenidos de la API
  } catch (error) {
    return []; // Debes devolver un valor adecuado en caso de error
  }
}
export async function fetchPaises(): Promise<PaisesData | undefined> {
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:8000/api/v1/";
  try {
    const response = await fetch(`${apiUrl}paises`,);

    if (!response.ok) {
      throw new Error("No se pudieron obtener los datos de la API");
    }

    const data = await response.json();
   
    return data;
    // Aquí puedes trabajar con los datos obtenidos de la API
  } catch (error) {
    console.error("Error al obtener datos:", error);

    return;
  }
}

export async function fetchColores(): Promise<Color[] | any> {
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:8000/api/v1/";
  try {
    const response = await fetch(`${apiUrl}colores`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("No se pudieron obtener los datos de la API");
    }

    const data = await response.json();
    return data.colores;
    // Aquí puedes trabajar con los datos obtenidos de la API
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}

export async function fetchTipos() {
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:8000/api/v1/";

  try {
    const response = await fetch(`${apiUrl}tipos`, );

    if (!response.ok) {
      throw new Error("No se pudieron obtener los datos de la API");
    }

    const data = await response.json();
    return data;
    // Aquí puedes trabajar con los datos obtenidos de la API
  } catch (error) {
    console.log(error);
    return []; // Debes devolver un valor adecuado en caso de error
  }
}

export async function fetchTiposById(id:string): Promise<Tipo | undefined> {
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:8000/api/v1/";


  try {
    const response = await fetch(`${apiUrl}tipos/${id}`, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("No se pudieron obtener los datos de la API");
    }

    const data = await response.json();
    return data.Tipo;

    // Aquí puedes trabajar con los datos obtenidos de la API
  } catch (error) {
    console.log(error);
    return ; // Debes devolver un valor adecuado en caso de error
  }
}

export async function fetchPaisesById(id:string): Promise<Pais | undefined> {
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:8000/api/v1/";


  try {
    const response = await fetch(`${apiUrl}paises/${id}`, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("No se pudieron obtener los datos de la API");
    }

    const data = await response.json();

    return data.Pais;

    // Aquí puedes trabajar con los datos obtenidos de la API
  } catch (error) {
    console.log(error);
    return ; // Debes devolver un valor adecuado en caso de error
  }
}


export async function fetchGraduaciones(): Promise<Graduacion[]> {
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:8000/api/v1/";
  try {
    const response = await fetch(`${apiUrl}graduaciones`, 
       
    );

    if (!response.ok) {
      throw new Error("No se pudieron obtener los datos de la API");
    }

    const data = await response.json();
    return data.graduaciones;
    // Aquí puedes trabajar con los datos obtenidos de la API
  } catch (error) {
    console.error("Error al obtener datos:", error);

    return [];
  }
}

export async function postRegister(
  url: string,
  datos: {
    name: string;
    password: string;
    email: string;
  }
): Promise<string> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    if (response.ok) {
      console.log("Datos enviados correctamente.");
      // Aquí puedes realizar acciones adicionales después de enviar los datos
    } else {
      switch (response.status) {
        case 409:
          throw new Error(
            "Ya existe un Usuario con este email: " + response.statusText
          );
          break;
        case 422:
          // const data=await response.json();
          throw new Error("Ya existe un Usuario con este email: ");

        default:
          throw new Error("Error al enviar los datos:" + response.statusText);
          break;
      }
    }
    return "ok";
  } catch (error: any) {
    return error.message;
  }
}

export async function fetchDeleteCervezasById(id: string, token: string) {
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:1337/api/";

  try {
    const response = await fetch(`${apiUrl}cervezas/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return true;
      throw new Error(`Error al eliminar la cerveza con ID ${id}`);
    }
    return true
    /*const data = await response.json();

    return data.data;*/
  } catch (error) {
    console.error(error);
  }
}

```

## Variables de entorno

 Las variables de entorno en Next.js te permiten configurar cómo se ejecuta tu aplicación dependiendo del entorno en el que se encuentra. Aquí tienes una explicación de cómo funcionan en Next.js 14:

- **Variables locales**: Puedes usar un archivo `.env.local` para cargar variables de entorno específicas de tu entorno local. Estas variables se cargan en `process.env` y son accesibles en los métodos de obtención de datos y rutas API de Next.js.

- **Variables públicas**: Si quieres exponer variables de entorno al navegador, debes prefijarlas con `NEXT_PUBLIC_`. Por ejemplo, `NEXT_PUBLIC_API_URL`. Estas variables se incluirán en el JavaScript que se envía al navegador y serán reemplazadas en tiempo de compilación por sus valores reales.

- **Referencia de otras variables**: Next.js expande automáticamente las variables que utilizan `$` para referenciar otras variables dentro de tus archivos `.env*`.

- **Variables por defecto**: Puedes establecer valores predeterminados para diferentes entornos usando archivos como `.env.development` o `.env.production`.

Es importante recordar que las variables que no están prefijadas con `NEXT_PUBLIC_` solo estarán disponibles en el entorno de Node.js y no en el navegador¹².


Para acceder a las variables de entorno en tus componentes de Next.js, puedes hacerlo directamente usando `process.env.NEXT_PUBLIC_` seguido del nombre de tu variable. Aquí en esta caso se utiliza una variable de servidor, el uso de variables de servidor se aplica a su ámbito.  Variables ded servidor para componentes de servidor y variables de clienta para componente de cliente.

```ts
export async function fetchCervezasPorPaises() {
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:8000/api/";

  try {
    const response = await fetch(`${apiUrl}consultaCervezasPorPais`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("No se pudieron obtener los datos de la API");
    }

    const data = await response.json();

    return data;
    // Aquí puedes trabajar con los datos obtenidos de la API
  } catch (error) {
    console.error(error);
    return []; // Debes devolver un valor adecuado en caso de error
  }
}
```

Recuerda que solo las variables de entorno que comienzan con `NEXT_PUBLIC_` estarán disponibles en el navegador, ya que se reemplazan en tiempo de compilación por sus valores reales y se incluyen en el JavaScript que se envía al navegador.

### Archivo .env.local en la raíz del proyecto.

```
# Variables de cliente
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1/
NEXT_PUBLIC_API_AUTH=http://127.0.0.1:8000/api/
# Variables de servidor
API_URL=http://127.0.0.1:8000/api/v1/


NEXTAUTH_SECRET=no.utilizar.en.producción
```