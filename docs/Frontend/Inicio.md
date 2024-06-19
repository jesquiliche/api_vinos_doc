---
sidebar_position: 3
---

# Inicializar el proyecto

## Introducción

En esta sección y las siguientes, vamos a ver cómo consumir nuestra API desde el frontend. Para ello, utilizaremos el framework Next.js 14.

## Creando el Layout

Al desarrollar un sitio web, encontramos elementos que se repiten a lo largo de la aplicación, como el menú y el pie de página, entre otros. La manera más inteligente de reutilizar este diseño es mediante el uso de un Layout, en lugar de repetir el código para cada página. Esto no solo simplifica el proceso de desarrollo, sino que también facilita el mantenimiento en el futuro. Para implementarlo, dirígete a la raíz del proyecto y edita el archivo **Layout.tsx**.

```js title=Layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frontend",
  description: "Frontend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="">{children}</div>
      </body>
    </html>
  );
}
```
### children

`children` es una prop especial en React que permite que un componente contenedor pase componentes hijos o cualquier otro tipo de contenido entre sus etiquetas de apertura y cierre. Esto es útil cuando se desea crear componentes que actúen como contenedores genéricos y flexibles para el contenido que pueden variar de una instancia a otra.

En el contexto del código proporcionado, el componente `RootLayout` utiliza `children` para recibir y renderizar el contenido específico de cada página. Por ejemplo, si tienes una página `HomePage` que contiene contenido específico de la página de inicio, puedes utilizar `RootLayout` para envolver el contenido de la siguiente manera:

```jsx
<RootLayout>
  <HomePageContent />
</RootLayout>
```

En este ejemplo, `<HomePageContent />` es el contenido específico de la página de inicio que se pasa como `children` al componente `RootLayout`. Dentro del componente `RootLayout`, este contenido se renderizará en el lugar donde se coloque `{children}`, como se ve en el código:

```jsx
<div className="flex-1">{children}</div>
```

Por lo tanto, `children` permite que el componente `RootLayout` actúe como un contenedor flexible que puede envolver y renderizar cualquier contenido que se le pase, lo que facilita la creación de diseños modulares y reutilizables en una aplicación React.

## Estilos globales

Dentro del directorio **App** edite el archivo **global.css** edite y copie el siguiente código.

```css title=global.css
@tailwind base;
@tailwind components;
@tailwind utilities;

.form-control{
    @apply w-full  p-2 border rounded bg-gray-200 focus:border-2 
}

.btn-page {
    @apply bg-gray-400  rounded-md before:odd:shadow-md text-white  hover:bg-gray-700 px-4 py-1  items-center text-center border

}

.btn-primary {
    @apply bg-blue-800  rounded-md before:odd:shadow-md text-white  hover:bg-blue-500 px-4 py-1  items-center text-center border

}

body {
    max-width: 1366px; /* Define el ancho máximo que desees */
    margin: 0 auto; /* Centra el contenido horizontalmente */
}
```

## Creando la página de inicio

En esta nueva versión de Next.js, las rutas se definen dentro del directorio **App**. Las páginas se configuran en subdirectorios dentro de **App**, los cuales deben contener un archivo **page.tsx** como punto de inicio de la página. Por ejemplo, si deseamos crear una ruta llamada **products**, debemos crear un subdirectorio **products** dentro del directorio **App**, junto con su respectivo archivo **page.tsx**. Edite el fichero **page.tsx** y y sustituya el código por el siguiente: 

```js title=page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Load from "@/components/Load"; // Importación del componente de carga

import {
  fetchCervezas,
  fetchColores,
  fetchGraduaciones,
  fetchPaises,
  fetchTipos,
  fetchCervezasQuery,
} from "@/services/api"; // Importación de funciones de servicio para obtener datos

import {
  Cerveza,
  Color,
  Graduacion,
  Pais,
  PaisesData,
  Tipo,
} from "@/interfaces/interfaces"; // Importación de interfaces para tipado

import Link from "next/link"; // Importación de componente de enlace
import Cards from "@/components/Cards"; // Importación de componente de tarjetas

export default function Page() {
  // Estado para manejar la paginación y carga de datos
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(40);

  const [loading, setLoading] = useState(true); // Estado para controlar el estado de carga
  const [cervezas, setCervezas] = useState<Cerveza[]>([]); // Estado para almacenar la lista de cervezas
  const [tipos, setTipos] = useState<Tipo[]>([]); // Estado para almacenar la lista de tipos de cerveza
  const [paises, setPaises] = useState<PaisesData | undefined>(undefined); // Estado para almacenar la lista de países
  const [colores, setColores] = useState<Color[]>([]); // Estado para almacenar la lista de colores de cerveza
  const [graduaciones, setGraduaciones] = useState<Graduacion[]>([]); // Estado para almacenar la lista de graduaciones

  const [formData, setFormData] = useState({
    // Estado para almacenar los datos del formulario de filtrado
    tipo: "",
    pais: "",
    color: "",
    graduacion: "",
    nombre: "",
    oferta: -1,
    novedad: -1,
  });

  // Función para manejar cambios en los campos del formulario
  const handleOnChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    switch (name) {
      case "oferta":
        let valor: number = 0;

        valor = +value;

        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: valor,
        }));

        break;
      case "novedad":
        let valor1: number = 0;

        valor1 = +value;

        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: valor1,
        }));

        break;
      default:
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
    }
  };

  // Función para realizar la consulta de cervezas con el queryString proporcionado
  const CervezasQuery = async (queryString: string) => {
    // Aquí puedes construir el query string con los valores de formData
    const cervezas = await fetchCervezasQuery(queryString);
    setCervezas(cervezas.data);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let queryString = `page=${page}&per_page=${limit}&tipo_id=${formData.tipo}&pais_id=${formData.pais}&color_id=${formData.color}&nombre=${formData.nombre}&graduacion_id=${formData.graduacion}`;
    if (formData.oferta != -1) {
      queryString += `&oferta=${formData.oferta}`;
    }
    if (formData.novedad != -1) {
      queryString += `&novedad=${formData.novedad}`;
    }

    await CervezasQuery(queryString);
  };

  // Efecto para obtener los datos iniciales
  useEffect(() => {
    const obtenerCervezas = async () => {
      setLoading(true);
      try {
        const tiposData = await fetchTipos();
        setTipos(tiposData.data);

        const paisesData = await fetchPaises();
        setPaises(paisesData);

        const coloresData = await fetchColores();
        setColores(coloresData);

        const graduacionesData = await fetchGraduaciones();
        setGraduaciones(graduacionesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      const cervezasData = await fetchCervezas();
      setCervezas(cervezasData.data);
      setLoading(false);
    };

    obtenerCervezas();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-5">Cervezas</h1>
      <div className="w-11/12 mx-auto border-2 p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Filtro</h1>

        {loading ? ( // Renderizar el componente de carga mientras se cargan los datos
          <Load />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-wrap">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="tipo" className="block text-gray-700">
                  Tipo:
                </label>
                <select
                  name="tipo"
                  id="tipo"
                  onChange={handleOnChange}
                  value={formData.tipo}
                  className="form-control"
                >
                  <option key="0" value="0"></option>

                  {tipos.map((t) => (
                    <option
                      key={t.id}
                      value={t.id}
                      selected={t.id == +formData.tipo}
                    >
                      {t.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Código similar para los demás campos del formulario */}
            </div>
            <div className="flex items-center p-2">
              <button type="submit" className="btn-primary">
                Filtrar
              </button>
              <Link href="/Cervezas/add/" className="btn-primary">
                Añadir
              </Link>
              <Link href="/" className="btn-primary">
                Volver
              </Link>
            </div>
          </form>
        )}

        <Cards cervezas={cervezas} setCervezas={setCervezas} /> {/* Renderizar el componente de tarjetas con las cervezas */}
      </div>
    </div>
  );
}
```
:::info Documentación del Código

### Introducción
Este documento proporciona una descripción general y una guía de referencia para el código de la aplicación de gestión de cervezas. La aplicación está escrita en React utilizando Next.js y utiliza servicios API para obtener datos relacionados con las cervezas.

### Estructura del Código
El código está organizado en un solo archivo, `Page.tsx`, que contiene la lógica y los componentes de la página principal de la aplicación.

#### Componentes Importados
- **Load:** Componente de carga utilizado para indicar que se están cargando datos.
- **Link:** Componente de Next.js utilizado para crear enlaces entre diferentes páginas de la aplicación.
- **Cards:** Componente utilizado para renderizar las tarjetas de cervezas.

#### Estados del Componente
- **page:** Estado que almacena el número de página actual.
- **limit:** Estado que determina el límite de elementos por página.
- **loading:** Estado que indica si se están cargando datos.
- **cervezas:** Estado que almacena la lista de cervezas.
- **tipos:** Estado que almacena la lista de tipos de cerveza.
- **paises:** Estado que almacena la lista de países.
- **colores:** Estado que almacena la lista de colores de cerveza.
- **graduaciones:** Estado que almacena la lista de graduaciones de cerveza.
- **formData:** Estado que almacena los datos del formulario de filtrado.

#### Funciones Principales
- **handleOnChange:** Función para manejar los cambios en los campos del formulario.
- **CervezasQuery:** Función para realizar una consulta de cervezas con un queryString proporcionado.
- **handleSubmit:** Función para manejar el envío del formulario de filtrado.

#### Efectos
- Se utiliza un efecto `useEffect` para obtener los datos iniciales cuando el componente se monta por primera vez.

#### Renderizado
El componente renderiza un título, un formulario de filtrado y las tarjetas de cervezas. El formulario de filtrado permite al usuario seleccionar diferentes criterios para filtrar las cervezas. Además, se muestra un componente de carga mientras se cargan los datos.

### Uso
Para utilizar este componente, simplemente incorpórelo en su aplicación React y asegúrese de proporcionar los datos necesarios a través de las propiedades o los servicios API correspondientes.

:::

Esta documentación proporciona una descripción general del código y su funcionalidad, así como instrucciones sobre cómo utilizarlo en otras aplicaciones. Si necesitas más detalles sobre algún aspecto específico del código, no dudes en consultar el código fuente directamente.
### Definición de interfaces para las llamadas a la API

Crea un directorio interfaces dentro de la raíz del proyecto, y cree el siguiente fichero.

```ts title=interfaces.d.ts
interface CervezaData {
  nombre: string;
  descripcion: string;
  color_id: number;
  graduacion_id: number;
  tipo_id: number;
  pais_id: number;
  novedad: boolean | number;
  oferta: boolean | number;
  precio: number;
  foto: string;
  marca: string;
  file: File | null;
  color:string;
  tipo:string;
  graduacion:string;
  pais:string;
  formato:string;
  unidades:number;
  stock:number;
}






export interface Cerveza {
  id: number
  nombre: string
  descripcion: string
  novedad: number
  oferta: number
  precio: string
  foto: string
  marca: string
  color: string
  graduacion: string
  tipo: string
  pais: string
}
  

  export interface Pais {
    id: number
    nombre: string
    descripcion:string
    created_at: any
    updated_at: any
  }
  
  

  export interface Tipo {
    id: number
    nombre: string
    descripcion: string
    created_at: any
    updated_at: any
  }
  
  export interface Color {
    id: number
    nombre: string
    created_at: any
    updated_at: any
  }
  
  export interface Graduacion {
    id: number
    nombre: string
    created_at: any
    updated_at: any
  }

  export interface TiposData {
    current_page: number
    data: Tipo[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: Link[]
    next_page_url: any
    path: string
    per_page: number
    prev_page_url: any
    to: number
    total: number
  }
  
  export interface Link {
    url?: string
    label: string
    active: boolean
  }
  
  export interface PaisesData {
    current_page: number
    data: Pais[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: Link[]
    next_page_url: any
    path: string
    per_page: number
    prev_page_url: any
    to: number
    total: number
  }
```

