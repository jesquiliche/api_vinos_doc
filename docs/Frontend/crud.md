---
sidebar_position: 8
---

# Operaciones CRUD

## Introducción

**"CRUD"** es un acrónimo que representa las cuatro operaciones básicas que se pueden realizar en la mayoría de las bases de datos relacionales y sistemas de gestión de bases de datos. Estas operaciones son: Create (Crear), Read (Leer), Update (Actualizar) y Delete (Eliminar). Aquí te explico cada una de estas operaciones:

1. **Create (Crear)**:

   - Esta operación implica la creación de nuevos registros o entradas en una base de datos. Por ejemplo, si tienes una base de datos de usuarios, la operación de creación se utilizaría para agregar un nuevo usuario con su información, como nombre, correo electrónico, contraseña, etc.

2. **Read (Leer)**:

   - La operación de lectura implica recuperar datos existentes de la base de datos. Permite consultar, buscar o filtrar registros específicos de la base de datos. Por ejemplo, puedes utilizar la operación de lectura para mostrar una lista de todos los usuarios registrados en tu aplicación.

3. **Update (Actualizar)**:

   - Esta operación se utiliza para modificar o actualizar registros existentes en la base de datos. Por ejemplo, si un usuario cambia su dirección de correo electrónico, puedes utilizar la operación de actualización para cambiar el correo electrónico almacenado en su registro de usuario.

4. **Delete (Eliminar)**:
   - La operación de eliminación se utiliza para eliminar registros existentes de la base de datos. Por ejemplo, si un usuario decide eliminar su cuenta, puedes utilizar la operación de eliminación para eliminar completamente su registro de usuario de la base de datos.

El CRUD es fundamental en el desarrollo de aplicaciones web y de software, ya que proporciona las funcionalidades básicas necesarias para interactuar con los datos almacenados en una base de datos. Casi todas las aplicaciones web modernas utilizan estas operaciones CRUD en algún momento para gestionar sus datos de manera eficiente y efectiva.

### Operaciones de lectura

Comencemos desplegando nuestra página de inicio, que incluye la barra de navegación integrada en el Layout, así como un filtro que te permite explorar nuestras cervezas según distintos criterios, como el color, los países, entre otros

![Inicio](/images/inicio.png)

Vamos a echarle un vistazo al código que se encuentra en el archivo **page.tsx** en el directorio raíz de nuestro proyecto.

```ts title=page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Load from "@/components/Load";

//Importar llamadas a la API
import {
  fetchCervezas,
  fetchColores,
  fetchGraduaciones,
  fetchPaises,
  fetchTipos,
  fetchCervezasQuery,
} from "@/services/api";
import {
  Cerveza,
  Color,
  Graduacion,
  PaisesData,
  Tipo,
} from "@/interfaces/interfaces";

import Link from "next/link";
import Cards from "@/components/Cards";

export default function Page() {
  //Paginación
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(40);

  //Definir estados
  const [loading, setLoading] = useState(true);
  const [cervezas, setCervezas] = useState<Cerveza[]>([]);
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [paises, setPaises] = useState<PaisesData | undefined>(undefined);
  const [colores, setColores] = useState<Color[]>([]);
  const [graduaciones, setGraduaciones] = useState<Graduacion[]>([]);
  //inicializar datos para los combos
  const [formData, setFormData] = useState({
    tipo: "",
    pais: "",
    color: "",
    graduacion: "",
    nombre: "",
    oferta: -1,
    novedad: -1,
  });

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

  const CervezasQuery = async (queryString: string) => {
    // Aquí puedes construir el query string con los valores de formData

    const cervezas = await fetchCervezasQuery(queryString);
    setCervezas(cervezas.data);
  };

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

        {loading ? (
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

              <div>
                <label htmlFor="pais" className="block text-gray-700">
                  País:
                </label>
                <select
                  name="pais"
                  id="pais"
                  onChange={handleOnChange}
                  className="form-control"
                >
                  <option key="0" value="0"></option>

                  {paises &&
                    paises.data.map((p) => (
                      <option
                        key={p.id}
                        value={p.id}
                        selected={p.id == +formData.pais}
                      >
                        {p.nombre}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label htmlFor="color" className="block text-gray-700">
                  Color:
                </label>
                <select
                  name="color"
                  id="color"
                  onChange={handleOnChange}
                  className="form-control"
                >
                  <option key="0" value="0"></option>

                  {colores.map((c) => (
                    <option
                      key={c.id}
                      value={c.id}
                      selected={c.id == +formData.color}
                    >
                      {c.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="graduacion" className="block text-gray-700">
                  Graduación:
                </label>
                <select
                  name="graduacion"
                  id="graduacion"
                  onChange={handleOnChange}
                  className="form-control"
                >
                  <option key="0" value="0"></option>

                  {graduaciones.map((g) => (
                    <option
                      key={g.id}
                      value={g.id}
                      selected={g.id == +formData.graduacion}
                    >
                      {g.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="nombre" className="block text-gray-700">
                  Nombre:
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  onChange={handleOnChange}
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="oferta" className="block text-gray-700">
                  Oferta:
                </label>
                <select
                  name="oferta"
                  id="oferta"
                  onChange={handleOnChange}
                  className="form-control"
                >
                  <option key="0" value="-1"></option>

                  <option key="1" value="1">
                    Si
                  </option>
                </select>
              </div>
              <div>
                <label htmlFor="Novedad" className="block text-gray-700">
                  Novedad:
                </label>
                <select
                  name="novedad"
                  id="novedad"
                  onChange={handleOnChange}
                  className="form-control"
                >
                  <option key="0" value="-1"></option>

                  <option key="1" value="1">
                    Si
                  </option>
                </select>
              </div>
            </div>
            <div className="flex items-center p-2">
              <button type="submit" className="btn-primary">
                Filtrar
              </button>
              <Link href="/add/" className="btn-primary">
                Añadir
              </Link>
              <Link href="/" className="btn-primary">
                Volver
              </Link>
            </div>
          </form>
        )}

        <Cards cervezas={cervezas} setCervezas={setCervezas} />
      </div>
    </div>
  );
}
```

### Desglose del código

1. **Imports**:

```javascript
import React, { useState, useEffect } from "react";
import Load from "@/components/Load";

import {
  fetchCervezas,
  fetchColores,
  fetchGraduaciones,
  fetchPaises,
  fetchTipos,
  fetchCervezasQuery,
} from "@/services/api";
import {
  Cerveza,
  Color,
  Graduacion,
  PaisesData,
  Tipo,
} from "@/interfaces/interfaces";

import Link from "next/link";
import Cards from "@/components/Cards";
```

- En esta sección, se importan los módulos y componentes necesarios para el funcionamiento de la página. Los módulos incluyen `React`, `useState`, `useEffect`, `Link` de Next.js, y el componente `Cards`. También se importan varias funciones de API (`fetchCervezas`, `fetchColores`, etc.) y las interfaces (`Cerveza`, `Color`, etc.) necesarias para el tipado.

2. **Estado local y funciones de manejo de estado**:

```javascript
const [page, setPage] = useState(1);
const [limit, setLimit] = useState(40);

const [loading, setLoading] = useState(true);
const [cervezas, setCervezas] = useState<Cerveza[]>([]);
const [tipos, setTipos] = useState<Tipo[]>([]);
const [paises, setPaises] = useState<PaisesData | undefined>(undefined);
const [colores, setColores] = useState<Color[]>([]);
const [graduaciones, setGraduaciones] = useState<Graduacion[]>([]);
const [formData, setFormData] = useState({
  tipo: "",
  pais: "",
  color: "",
  graduacion: "",
  nombre: "",
  oferta: -1,
  novedad: -1,
});

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

const CervezasQuery = async (queryString: string) => {
  const cervezas = await fetchCervezasQuery(queryString);
  setCervezas(cervezas.data);
};

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
```

- En esta sección, se definen múltiples estados locales utilizando el hook `useState`. Estos estados incluyen información sobre la paginación, el estado de carga, los datos de las cervezas y los filtros seleccionados por el usuario.
- Se crean funciones para manejar cambios en los elementos del formulario (`handleOnChange`), realizar consultas de cervezas (`CervezasQuery`), y enviar el formulario (`handleSubmit`).

3. **Efecto secundario de montaje (`useEffect`)**:

```javascript
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
```

- En esta sección, se utiliza el hook `useEffect` para ejecutar un efecto secundario después de que el componente se monte en el DOM. Este efecto se utiliza para obtener datos iniciales de tipos, países, colores, graduaciones y cervezas mediante llamadas a las funciones de API definidas anteriormente. Una vez que se obtienen los datos, se actualizan los estados locales correspondientes y se establece el estado de carga en falso.

4. **Renderizado JSX**:

```javascript
return (
  <div>
    <h1 className="text-2xl font-bold text-center mt-5">Cervezas</h1>
    <div className="w-11/12 mx-auto border-2 p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center">Filtro</h1>

      {loading ? (
        <Load />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-wrap">
          {/* Formulario de filtro */}
        </form>
      )}

      <Cards cervezas={cervezas} setCervezas={setCervezas} />
    </div>
  </div>
);
```

- En esta sección, se devuelve el JSX que compone la interfaz de usuario de la página. Esto incluye un título, un formulario de filtro y una lista de cards de cerveza.
- Se muestra un componente de carga (`Load`) si los datos aún se están cargando.

### Carga de datos

A continuación, vamos a repasar algunas de las funciones que utilizamos para la carga de datos de nuestro filtro implementadas en **useEffect**. En ellas, podremos observar cómo efectuamos las llamadas a nuestra API.

```javascript title=fetchPaises()
export async function fetchPaises(): Promise<PaisesData | undefined> {
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:8000/api/v1/";
  try {
    const response = await fetch(`${apiUrl}paises`);

    if (!response.ok) {
      throw new Error("No se pudieron obtener los datos de la API");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error al obtener datos:", error);

    return;
  }
}
```

La función `fetchPaises` solicita datos de países desde nuestra API. Realiza una solicitud GET a la URL proporcionada, espera la respuesta y la procesa. Si la respuesta es exitosa, devuelve los datos de los países en un formato que se pueda usar. En caso de error, registra el problema y devuelve `undefined`. La variable de entorno **API_URL** esta definida en el archivo **.env.local** como hemos explicado anteriores capítulos, es una variable de servidor. Si necesitara una variable de cliente desbebería utilizar el prefijo **NEXT_PUBLIC**, encontrara esta de definición el mismo archivo **.env.local**.

Otra función que sigue una estructura muy similar es **fetchColores**.

```ts title=fetchColores
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
```

### Componente

Este componente muestra la lista de cervezas que se pasa por Props.

```ts
`use client`;
import { Cerveza } from "@/interfaces/interfaces";
import Link from "next/link";
import { useSession } from "next-auth/react";
import React, { cache, useEffect } from "react";

interface Props {
  cervezas: Cerveza[];
  setCervezas: React.Dispatch<React.SetStateAction<Cerveza[]>>;
}
const Cards = ({ cervezas, setCervezas }: Props) => {
  const { data: session } = useSession();
  const BorrarCerveza = async (id: number) => {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1/";

    const token = session?.authorization.token;
    try {
      const response = await fetch(`${apiUrl}cervezas/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setCervezas(cervezas.filter((e) => e.id !== id));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="grid grid-cola-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {cervezas.map((cerveza) => (
          <div
            key={cerveza.id}
            className="relative border-2 shadow-lg p-2 rounded-lg flex flex-col justify-between hover:bg-gray-200"
          >
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-red-500 italic font-bold text-2xl">
                  {cerveza.precio} €
                </h3>
                <h3 className="italic font-bold">{cerveza.pais}</h3>
                {cerveza.oferta != 0 && (
                  <div className="bg-red-500 text-white rounded-full p-2 w-14 h-14 flex items-center justify-center absolute top-12 ml-[210px] shadow-lg">
                    <h4 className="text-center text-xs italic -rotate-45">
                      Oferta
                    </h4>
                  </div>
                )}
                {cerveza.novedad != 0 && (
                  <div className="bg-blue-500 text-white rounded-full p-2 w-14 h-14 flex items-center justify-center absolute top-12 ml-[150px] shadow-lg">
                    <h4 className="text-center text-xs italic -rotate-45">
                      Novedad
                    </h4>
                  </div>
                )}
              </div>
            </div>
            <img
              src={cerveza.foto}
              className="w-[200px] mx-auto"
              loading="lazy"
            />
            <h3 className="font-bold text-md text-center ">{cerveza.nombre}</h3>
            <div className="flex justify-between p-2 mt-2">
              //Pendiente de crear
              <Link href={`/Ver/${cerveza.id}`} className="btn-primary w-full">
                Ver
              </Link>
              //Pendiente de crear
              <Link href={`/Edit/${cerveza.id}`} className="btn-primary w-full">
                Editar
              </Link>
              <button
                className="btn-primary w-full"
                onClick={async () => await BorrarCerveza(cerveza.id)}
              >
                Borrar
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cards;
```

### Análisis del código

Este componente muestra lista de cervezas. Aquí hay un análisis de sus partes y funcionalidades:

1. **Importaciones**:

   - `Cerveza`: Se importa el tipo de dato `Cerveza` desde el módulo `interfaces/interfaces`.
   - `Link`: Importa el componente `Link` de Next.js para manejar enlaces entre páginas.
   - `useSession`: Un hook proporcionado por `next-auth/react` para obtener la sesión del usuario autenticado.
   - `React`, `useEffect`: Importaciones relacionadas con React y su hook `useEffect`.

2. **Interfaz Props**: Define una interfaz `Props` que especifica las propiedades esperadas por el componente. En este caso, se espera que el componente reciba un array de cervezas (`cervezas`) y una función para actualizar este array (`setCervezas`).

3. **Función `Cards`**:

   - Esta es la función principal del componente. Toma las cervezas recibidas como props y las muestra en tarjetas.
   - Utiliza el hook `useSession` para obtener la información de la sesión del usuario.
   - Define una función `BorrarCerveza` para eliminar una cerveza específica de la lista mediante una solicitud DELETE a la API.
   - Itera sobre el array de cervezas y muestra cada una en una tarjeta, que incluye el nombre, precio, país, oferta (si existe), novedad (si existe), una imagen, y botones para ver, editar y borrar la cerveza.
   - Al hacer clic en el botón "Borrar", se llama a la función `BorrarCerveza` para eliminar la cerveza correspondiente de la lista.

4. **Retorno**:

   - Retorna una lista de tarjetas de cerveza, donde cada tarjeta muestra la información de una cerveza específica.

### Borrado de producto

Vamos a observar con detenimiento esta función. Esta función realiza una llamada a nuestra API para borrar la cerveza por su ID. Obtiene la dirección de la **URL** a través de la variable de entorno del cliente especificada en **NEXT_PUBLIC_API_URL**. Esta operación de borrado está protegida y requiere del token de autenticación que obtuvimos al hacer el Login. Obtenemos el token accediendo a la sesión previamente cargada:

```ts
const token = session?.authorization.token;
```

Una vez obtenido dicho token, se lo pasa en la cabecera de la petición fetch precedido por la palabra **Bearer** e inmediatamente borra la cerveza de la lista, para no tener que volver a recargar toda la lista de cervezas.

```ts
const BorrarCerveza = async (id: number) => {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1/";

  const token = session?.authorization.token;
  try {
    const response = await fetch(`${apiUrl}cervezas/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setCervezas(cervezas.filter((e) => e.id !== id));
  } catch (error) {
    alert(error);
  }
};
```
### Lectura de producto (Ver)

![Inicio](/images/ver.png)

```ts title=src\app\Ver\[id]\page.tsx
import { fetchCervezasById } from "@/services/api";
import Link from "next/link";

export default async function Detalle({ params }: { params: { id: string } }) {
  const id = params.id;

  const cerveza = await fetchCervezasById(id);

  return (
    <>
      <article className="w-11/12 border-2 shadow-lg rounded-lg mx-auto p-2 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-bold mt-2 text-lg">Foto:</label>
            <img src={cerveza?.foto} />
          </div>
          <div className="bg-gray-200 p-4 mb-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                {cerveza?.novedad != 0 && (
                  <div className="font-bold mt-2 border-2 rounded-lg border-white  bg-gray-400">
                    <label className="font-bold p-2 italic text-white">
                      Novedad
                    </label>
                  </div>
                )}
              </div>
              <div>
                {cerveza?.oferta != 0 && (
                  <div className="font-bold mt-2 border-2 rounded-lg border-white  bg-gray-400">
                    <label className="font-bold p-2 italic text-white text-center">
                      Oferta
                    </label>
                  </div>
                )}
              </div>
            </div>

            <label className="font-bold mt-2 text-lg">Nombre:</label>
            <h1>{cerveza?.nombre}</h1>
            <label className="font-bold mt-2 text-lg">Descripción:</label>
            <h1>{cerveza?.descripcion}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-200 rounded-lg mt-2">
              <div>
                {" "}
                <label className="font-bold mt-2">
                  Precio: {cerveza?.precio}
                </label>
              </div>
              <div>
                {" "}
                <label className="font-bold mt-2">
                  Marca: {cerveza?.marca}
                </label>
              </div>
              <div>
                {" "}
                <label className="font-bold mt-2">
                  Color: {cerveza?.color}
                </label>
              </div>
              <div>
                <label className="font-bold mt-2 p-2">
                  Tipo: {cerveza?.tipo}
                </label>
              </div>
              <div>
                <label className="font-bold mt-2">País: {cerveza?.pais}</label>
              </div>
              <div>
                <label className="font-bold mt-2">
                  Graduación: {cerveza?.graduacion}
                </label>
              </div>
              <Link href="/" className="btn-primary">
                Volver
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

```

### Análisis del código

1. **Obtención de Datos**: El componente `Detalle` hace uso de la función `fetchCervezasById` para obtener los detalles de una cerveza específica mediante su ID. Esto indica que la página de detalle necesita información específica de la cerveza para funcionar correctamente.

2. **Presentación de Datos**: Una vez que se obtienen los detalles de la cerveza, estos se presentan en una estructura de dos columnas. La primera columna contiene la foto de la cerveza, mientras que la segunda columna presenta una serie de detalles, como nombre, descripción, precio, marca, color, tipo, país, graduación, etc. Esto permite al usuario obtener una visión completa de la cerveza seleccionada.

3. **Indicadores Visuales**: El componente también incluye indicadores visuales para resaltar si la cerveza es una novedad u oferta. Estos indicadores proporcionan información adicional al usuario de manera rápida y visualmente efectiva.

4. **Interacción de Usuario**: El componente incluye un enlace de vuelta que dirige al usuario de regreso a la página principal. Esto mejora la experiencia del usuario al proporcionar una manera fácil y clara de navegar entre diferentes partes de la aplicación.

 El componente `Detalle` cumple una función crucial al mostrar los detalles de una cerveza específica de manera clara y completa, permitiendo al usuario obtener toda la información necesaria sobre esa cerveza en particular. Además, incluye elementos visuales y de navegación que mejoran la experiencia del usuario en general.

### Función de apoyo

```ts title src\services\api.ts
export async function fetchCervezasById(id: string): Promise<CervezaData> {
  const apiUrl = process.env.API_URL ?? "http://127.0.0.1:1337/api/";

  const response = await fetch(`${apiUrl}cervezas/${id}`, {
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error("No se pudieron obtener los datos de la API");
  }

  const data = await response.json();

  return data;
  
}
```

### Añadir (Create)

En esta ocasión, nos enfocaremos en aprender cómo dar de alta un nuevo producto en nuestro sistema. Para realizar esta operación, emplearemos el método **"POST"** y enviaremos los datos utilizando un objeto `formData`. Esta elección nos permite enviar información que incluya archivos, como es el caso de las imágenes de los artículos.

![insertar](/images/insertar.png)


```ts title=src\app\add\page.tsx
"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Tipo, Pais, Color, Graduacion } from "@/interfaces/interfaces";
import { useSession, signOut } from "next-auth/react";
import {
  fetchTipos,
  fetchPaises,
  fetchColores,
  fetchGraduaciones,
} from "@/services/api";
import DisplayErrors from "@/components/DisplayErrors";
import Load from "@/components/Load";
import Link from "next/link";

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
  stock: number;
  unidades: number;
  formato: string;
}

interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}
const Formulario: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [ok, setOK] = useState("");
  const [errors, setErrors] = useState<any>(null);
  const { data: session, status } = useSession();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [paises, setPaises] = useState<Pais[] | undefined>([]);
  const [colores, setColores] = useState<Color[]>([]);
  const [graduaciones, setGraduaciones] = useState<Graduacion[]>([]);
  const [cerveza, setCerveza] = useState<CervezaData>({
    nombre: "",
    descripcion: "",
    color_id: 0,
    graduacion_id: 0,
    tipo_id: 0,
    pais_id: 0,
    novedad: true,
    oferta: false,
    precio: 0,
    foto: "",
    marca: "",
    file: null,
    unidades: 1,
    formato: "",
    stock: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tiposData = await fetchTipos();
        setTipos(tiposData.data);

        const paisesData = await fetchPaises();
        setPaises(paisesData?.data);

        const coloresData = await fetchColores();
        setColores(coloresData);

        const graduacionesData = await fetchGraduaciones();
        setGraduaciones(graduacionesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    if (e.target.type === "checkbox") {
      const isChecked = (e.target as HTMLInputElement).checked;
      const { name, value } = e.target;
      const check = isChecked;

      setCerveza({
        ...cerveza,
        [name]: check,
      });
    } else if (e.target.type === "number" || e.target.type === "select-one") {
      const { name, value } = e.target;
      setCerveza({
        ...cerveza,
        [name]: +value,
      });
    } else {
      const { name, value } = e.target;
      setCerveza({
        ...cerveza,
        [name]: value,
      });
    }
  };

  const resetCampos = () => {
    setCerveza({
      nombre: "",
      descripcion: "",
      color_id: 0,
      graduacion_id: 0,
      tipo_id: 0,
      pais_id: 0,
      novedad: true,
      oferta: false,
      precio: 0,
      foto: "",
      marca: "",
      file: null,
      formato: "Lata",
      stock: 1,
      unidades: 1,
    });
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);
    setOK("");
    const token = session?.authorization.token || "";
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1/";
    const formData = new FormData();
    formData.append("nombre", cerveza.nombre);
    formData.append("descripcion", cerveza.descripcion);
    formData.append("color_id", cerveza.color_id.toString());
    formData.append("graduacion_id", cerveza.graduacion_id.toString());
    formData.append("tipo_id", cerveza.tipo_id.toString());
    formData.append("pais_id", cerveza.pais_id.toString());
    formData.append("novedad", cerveza.novedad.toString());
    formData.append("oferta", cerveza.oferta.toString());
    formData.append("precio", cerveza.precio.toString());

    formData.append("marca", cerveza.marca);
    formData.append("unidades", cerveza.unidades.toString());
    formData.append("stock", cerveza.unidades.toString());
    formData.append("formato", cerveza.unidades.toString());

    // Aquí puedes agregar el campo de archivo si es necesario
    if (cerveza.file) {
      formData.append("file", cerveza.file);
      formData.append("foto", cerveza.file.name);
    }

    try {
      const response = await fetch(`${apiUrl}cervezas`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      setOK("");
      setErrors(null);
      // Manejar la respuesta
      if (response.ok) {
        const data = await response.json();
        setOK("Producto " + data.nombre + " guardado correctamente.");
        resetCampos();
      } else {
        const errores = await response.json();
        setErrors(errores);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(
        "No se pudo conectar con el servidor. Puede que la sesión halla expirado."
      );
      console.error("Error en la solicitud:");
    }
  };

  const handleImagenChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Crear una URL de objeto para la vista previa de la imagen
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setCerveza({
        ...cerveza,
        file: file,
        foto: file.name,
      });
    } else {
      // Si no hay archivo seleccionado, restablecer la vista previa y el estado del archivo
      setImagePreview(null);
      setCerveza({
        ...cerveza,
        file: null,
        foto: "", // Otra opción sería mantener el nombre del archivo anterior si lo necesitas
      });
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center">Añadir producto</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-11/12 mx-auto rounded-lg shadow-lg p-4 border-2">
          <div>
            <label className="block w-full">Foto:</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImagenChange}
              required
            ></input>
            <img
              className="rounded-lg h-80 mt-2"
              id="image-preview"
              src={imagePreview || ""}
              alt="Vista previa de la imagen"
              style={{
                display: imagePreview ? "block" : "none",
                maxWidth: "100%",
                margin: "0 auto",
              }}
            />
          </div>
          <div className="md:col-span-2">
            {" "}
            <label className="block w-full">Nombre:</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              id="nombre"
              maxLength={150}
              value={cerveza.nombre}
              onChange={handleOnChange}
              required
            ></input>
            <label className="">Descripción:</label>
            <textarea
              className="form-control row-span-4 h-64"
              id="descripcion"
              name="descripcion"
              value={cerveza.descripcion}
              onChange={handleOnChange}
              required
            ></textarea>
          </div>
          <div className="">
            {" "}
            <label htmlFor="tipo" className="block text-gray-700">
              Tipo:
            </label>
            <select
              name="tipo_id"
              id="tipo_id"
              onChange={handleOnChange}
              className="form-control"
              value={cerveza.tipo_id}
              required
            >
              <option key={0}></option>
              {tipos.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pais" className="block text-gray-700">
              País:
            </label>
            <select
              name="pais_id"
              id="pais_id"
              onChange={handleOnChange}
              value={cerveza.pais_id}
              className="form-control"
              required
            >
              <option key={0}></option>
              {paises &&
                paises.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="color" className="block text-gray-700">
              Color:
            </label>
            <select
              name="color_id"
              id="color_id"
              onChange={handleOnChange}
              value={cerveza.color_id}
              className="form-control"
              required
            >
              <option key={0}></option>
              {colores.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="graduacion" className="block text-gray-700">
              Graduación:
            </label>
            <select
              name="graduacion_id"
              id="graduacion_id"
              onChange={handleOnChange}
              value={cerveza.graduacion_id}
              className="form-control"
              required
            >
              <option key={0}></option>
              {graduaciones.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block w-full">Marca:</label>
            <input
              type="text"
              className="form-control"
              value={cerveza.marca}
              required
              name="marca"
              onChange={handleOnChange}
              id="marca"
            ></input>
          </div>
          <div>
            <label className="block w-full">Precio:</label>
            <input
              type="number"
              className="form-control"
              name="precio"
              id="precio"
              step="0.01"
              onChange={handleOnChange}
              value={cerveza.precio}
              required
            ></input>
          </div>
          <div>
            <label className="block w-full">Formato:</label>
            <input
              type="text"
              className="form-control"
              name="formato"
              id="formato"
              maxLength={100}
              value={cerveza.formato}
              onChange={handleOnChange}
              required
            ></input>
          </div>
          <div>
            <label className="block w-full">Unidades:</label>
            <input
              type="number"
              className="form-control"
              name="unidades"
              id="unidades"
              maxLength={100}
              step="1"
              value={cerveza.unidades}
              onChange={handleOnChange}
              required
            ></input>
          </div>
          <div>
            <label className="block w-full">Stock:</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              id="stock"
              maxLength={100}
              step="1"
              value={cerveza.stock}
              onChange={handleOnChange}
              required
            ></input>
          </div>
          <div className="flex p-2 items-center">
            <input
              type="checkbox"
              onChange={handleOnChange}
              id="novedad"
              name="novedad"
              value={0}
              className="p-2 border rounded bg-gray-100"
            />
            <label className="ml-4 flex">Novedad</label>
            <input
              type="checkbox"
              id="oferta"
              name="oferta"
              onChange={handleOnChange}
              value={0}
              className="ml-4 p-2 border rounded bg-gray-100"
            />
            <label className="ml-4 flex">Oferta</label>
          </div>
          {loading && <Load />}

          <div className="col-span-1 md:col-span-3">
            {errors && <DisplayErrors errors={errors} />}
            {ok && !errors && <p className="bg-green-300 rounded p-4">{ok}</p>}
            <div className="flex flex-items-center">
              <button type="submit" className="btn-primary">
                Guardar
              </button>
              <Link href="/Cervezas" className="btn-primary">
                Volver
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Formulario;
```
### Explicación del código


#### handleSubmit
```ts
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);
    setOK("");
    const token = session?.authorization.token || "";
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1/";
    const formData = new FormData();
    formData.append("nombre", cerveza.nombre);
    formData.append("descripcion", cerveza.descripcion);
    formData.append("color_id", cerveza.color_id.toString());
    formData.append("graduacion_id", cerveza.graduacion_id.toString());
    formData.append("tipo_id", cerveza.tipo_id.toString());
    formData.append("pais_id", cerveza.pais_id.toString());
    formData.append("novedad", cerveza.novedad.toString());
    formData.append("oferta", cerveza.oferta.toString());
    formData.append("precio", cerveza.precio.toString());

    formData.append("marca", cerveza.marca);
    formData.append("unidades", cerveza.unidades.toString());
    formData.append("stock", cerveza.unidades.toString());
    formData.append("formato", cerveza.unidades.toString());

    // Aquí puedes agregar el campo de archivo si es necesario
    if (cerveza.file) {
      formData.append("file", cerveza.file);
      formData.append("foto", cerveza.file.name);
    }

    try {
      const response = await fetch(`${apiUrl}cervezas`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      setOK("");
      setErrors(null);
      // Manejar la respuesta
      if (response.ok) {
        const data = await response.json();
        setOK("Producto " + data.nombre + " guardado correctamente.");
        resetCampos();
      } else {
        const errores = await response.json();
        setErrors(errores);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(
        "No se pudo conectar con el servidor. Puede que la sesión halla expirado."
      );
      console.error("Error en la solicitud:");
    }
  };
  ```
Este código corresponde a la función `handleSubmit`, la cual se ejecuta cuando se envía el formulario de alta de producto. Aquí tienes una explicación paso a paso:

1. **Prevenir comportamiento por defecto del formulario**:
   `e.preventDefault();` evita que el formulario se envíe de manera convencional, lo cual es útil cuando se necesita controlar el envío del formulario mediante JavaScript.

2. **Establecer el estado de carga y errores**:
   `setLoading(true);`, `setErrors(null);` y `setOK("");` se utilizan para preparar el estado del componente para el envío del formulario. `setLoading(true)` indica que se está realizando una operación de carga, `setErrors(null)` elimina cualquier mensaje de error previo, y `setOK("")` reinicia cualquier mensaje de éxito previo.

3. **Obtener el token de autenticación**:
   `const token = session?.authorization.token || "";` obtiene el token de autenticación de la sesión actual. Si no hay sesión o el token no está presente, se asigna una cadena vacía como valor predeterminado.

4. **Construir el objeto FormData**:
   Se crea un objeto `FormData` llamado `formData` que contendrá todos los datos del formulario. Se van añadiendo las diferentes propiedades de la cerveza y sus valores utilizando el método `formData.append()`.

5. **Preparar los datos para el envío**:
   Se agregan todas las propiedades relevantes de la cerveza al objeto `formData`, como nombre, descripción, id de color, id de graduación, etc. Estos datos se preparan para ser enviados al servidor como parte del cuerpo de la solicitud.

6. **Enviar la solicitud al servidor**:
   Se utiliza `fetch()` para enviar una solicitud POST al servidor con los datos del formulario. La URL de la API y el token de autenticación se incluyen en los encabezados de la solicitud. El cuerpo de la solicitud es el objeto `formData` que contiene todos los datos de la cerveza.

7. **Manejar la respuesta del servidor**:
   Se espera la respuesta del servidor. Si la respuesta es exitosa (`response.ok`), se procesa y se muestra un mensaje de éxito. Si la respuesta contiene errores, se muestran y manejan adecuadamente.

8. **Manejar errores de red o del servidor**:
   Si hay algún error durante la solicitud (por ejemplo, el servidor no está disponible o la sesión ha expirado), se maneja en el bloque `catch`. Se muestra una alerta al usuario y se registra el error en la consola para su posterior depuración.


### Editar (Update)

En esta ocasión, vamos a ver cómo editar un artículo utilizando el método **PATCH** y pasándole el token correspondiente. Existen algunas diferencias con respecto al método **POST**, las cuales veremos en esta sección.

![Update](/images/update.png)

```ts title=src\app\Edit\[id]\page.jsx
"use client";
/* eslint-disable */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  fetchTipos,
  fetchPaises,
  fetchColores,
  fetchGraduaciones,
  fetchCervezasById,
  fetchDeleteTiposById,
} from "@/services/api";
import DisplayErrors from "@/components/DisplayErrors";
import Load from "@/components/Load";
import { useSession } from "next-auth/react";

const Edit = ({ params }) => {
  const id = params.id;
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [ok, setOK] = useState("");
  const [errors, setErrors] = useState(null);
  const [tipos, setTipos] = useState([]);
  const [paises, setPaises] = useState([]);
  const [colores, setColores] = useState([]);
  const [graduaciones, setGraduaciones] = useState([]);
  const [cerveza, setCerveza] = useState({
    nombre: "",
    descripcion: "",
    color_id: 0,
    graduacion_id: 0,
    tipo_id: 0,
    pais_id: 0,
    novedad: 1,
    oferta: 1,
    precio: 0,
    foto: "",
    marca: "",
    stock: 0,
    unidades: 0,
    formato: "",
  });

  if (session.status == "loading") {
    return <p>Cargando</p>;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tiposData = await fetchTipos();
        setTipos(tiposData.data);

        const paisesData = await fetchPaises();
        setPaises(paisesData.data);

        const coloresData = await fetchColores();
        setColores(coloresData);

        const graduacionesData = await fetchGraduaciones();
        setGraduaciones(graduacionesData);

        const data = await fetchCervezasById(id);
        setCerveza(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleOnChange = (e) => {
    if (e.target.type === "checkbox") {
      const { name, checked } = e.target;
      const valor = checked ? 1 : 0;

      setCerveza({
        ...cerveza,
        [name]: valor,
      });
    } else if (e.target.type === "number" || e.target.type === "select-one") {
      const { name, value } = e.target;
      setCerveza({
        ...cerveza,
        [name]: +value,
      });
    } else {
      const { name, value } = e.target;
      setCerveza({
        ...cerveza,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors(null);
    setOK("");
    const token = session?.authorization.token || "";

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1/";

    try {
      const response = await fetch(`${apiUrl}cervezas/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cerveza),
      });

      // Manejar la respuesta
      if (response.ok) {
        const data = await response.json();

        setOK("Producto " + data.nombre + " guardado correctamente.");
      } else {
        const errores = await response.json();
        setErrors(errores);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(
        "No se pudo conectar con el servidor. Puede que la sesión halla expirado."
      );
      console.error("Error en la solicitud:");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center">Editar producto</h1>
      <div className="w-11/12 mx-auto border-2 rounded-lg shadow-lg py-2">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 w-11/12 mx-auto gap-4"
        >
          <div className="col-span-1">
            <img
              className="rounded-lg h-80 mt-2"
              id="image-preview"
              src={cerveza.foto}
              alt="Vista previa de la imagen"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block w-full">Nombre:</label>
            <input
              type="text"
              className="form-control mb-2"
              name="nombre"
              id="nombre"
              maxLength={150}
              value={cerveza.nombre}
              onChange={handleOnChange}
              required
            ></input>
            <label className=" ">Descripción:</label>
            <textarea
              className="form-control row-span-4 h-64"
              id="descipcion"
              name="descripcion"
              value={cerveza.descripcion}
              onChange={handleOnChange}
              required
            ></textarea>
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700">Tipo:</label>
            <select
              name="tipo_id"
              id="tipo_id"
              onChange={handleOnChange}
              className="form-control"
              value={cerveza.tipo_id}
              required
            >
              {tipos.map((t) => (
                <option
                  key={t.id}
                  value={t.id}
                  selected={t.id == cerveza.tipo_id}
                >
                  {t.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700">País:</label>
            <select
              name="pais_id"
              id="pais_id"
              onChange={handleOnChange}
              value={cerveza.pais_id}
              className="form-control"
              required
            >
              {paises.map((p) => (
                <option
                  key={p.id}
                  value={p.id}
                  selected={p.id === cerveza.pais_id}
                >
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700">Color:</label>
            <select
              name="color_id"
              id="color_id"
              onChange={handleOnChange}
              value={cerveza.color_id}
              className="form-control"
              required
            >
              {colores.map((c) => (
                <option
                  key={c.id}
                  value={c.id}
                  selected={c.id === cerveza.color_id}
                >
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700">Graduación:</label>
            <select
              name="graduacion_id"
              id="graduacion_id"
              onChange={handleOnChange}
              value={cerveza.graduacion_id}
              className="form-control"
              required
            >
              {graduaciones.map((g) => (
                <option
                  key={g.id}
                  value={g.id}
                  selected={g.id === cerveza.graduacion_id}
                >
                  {g.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-1">
            <label className="block w-full">Marca:</label>
            <input
              type="text"
              className="form-control"
              value={cerveza.marca}
              required
              name="marca"
              onChange={handleOnChange}
              id="marca"
            ></input>
          </div>
          <div className="col-span-1">
            <label className="block w-full">Precio:</label>
            <input
              type="number"
              className="form-control"
              name="precio"
              id="precio"
              step="0.01"
              onChange={handleOnChange}
              value={cerveza.precio}
              required
            ></input>
          </div>

          <div>
            <label className="col-span-1">Formato:</label>
            <input
              type="text"
              className="form-control"
              name="formato"
              id="formato"
              maxLength={100}
              value={cerveza.formato}
              onChange={handleOnChange}
              required
            ></input>
          </div>
          <div>
            <label className="col-span-1">Unidades:</label>
            <input
              type="number"
              className="form-control"
              name="unidades"
              id="unidades"
              maxLength={100}
              step="1"
              value={cerveza.unidades}
              onChange={handleOnChange}
              required
            ></input>
          </div>
          <div>
            <label className="col-span-1">Stoxk::</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              id="stock"
              maxLength={100}
              step="1"
              value={cerveza.stock}
              onChange={handleOnChange}
              required
            ></input>
          </div>

          <div className="flex p-2 items-center">
            <input
              type="checkbox"
              onChange={handleOnChange}
              id="novedad"
              name="novedad"
              checked={cerveza.novedad != 0}
              className="p-2 border rounded bg-gray-100"
            />
            <label className="ml-4 flex">Novedad</label>
            <input
              type="checkbox"
              id="oferta"
              name="oferta"
              checked={cerveza.oferta != 0}
              onChange={handleOnChange}
              value={0}
              className="ml-4 p-2 border rounded bg-gray-100"
            />
            <label className="ml-4 flex">Oferta</label>
          </div>

          {loading && <Load />}
          <div className="col-span-1 md:col-span-3 mt-2">
            {errors && <DisplayErrors errors={errors} />}
            {ok && <p className="bg-green-300 rounded p-4">{ok}</p>}
            <div className="flex items-center mt-2">
              <button type="submit" className="btn-primary ">
                Guardar
              </button>
              <Link href="/" className="btn-primary ">
                Volver
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Edit;
```
¡Claro! A continuación, proporcionaré el código asociado a cada punto del análisis:

1. **Imports y configuración inicial**:
```javascript
"use client";
/* eslint-disable */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  fetchTipos,
  fetchPaises,
  fetchColores,
  fetchGraduaciones,
  fetchCervezasById,
  fetchDeleteTiposById,
} from "@/services/api";
import DisplayErrors from "@/components/DisplayErrors";
import Load from "@/components/Load";
import { useSession } from "next-auth/react";
```

2. **Inicialización de estados**:
```javascript
const Edit = ({ params }) => {
  const id = params.id;
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [ok, setOK] = useState("");
  const [errors, setErrors] = useState(null);
  const [tipos, setTipos] = useState([]);
  const [paises, setPaises] = useState([]);
  const [colores, setColores] = useState([]);
  const [graduaciones, setGraduaciones] = useState([]);
  const [cerveza, setCerveza] = useState({
    nombre: "",
    descripcion: "",
    color_id: 0,
    graduacion_id: 0,
    tipo_id: 0,
    pais_id: 0,
    novedad: 1,
    oferta: 1,
    precio: 0,
    foto: "",
    marca: "",
    stock: 0,
    unidades: 0,
    formato: "",
  });
```

3. **useEffect para obtener datos iniciales**:
```javascript
useEffect(() => {
    const fetchData = async () => {
      try {
        const tiposData = await fetchTipos();
        setTipos(tiposData.data);

        const paisesData = await fetchPaises();
        setPaises(paisesData.data);

        const coloresData = await fetchColores();
        setColores(coloresData);

        const graduacionesData = await fetchGraduaciones();
        setGraduaciones(graduacionesData);

        const data = await fetchCervezasById(id);
        setCerveza(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);
```

4. **Manejo de cambios en los campos del formulario**:
```javascript
const handleOnChange = (e) => {
    if (e.target.type === "checkbox") {
      const { name, checked } = e.target;
      const valor = checked ? 1 : 0;

      setCerveza({
        ...cerveza,
        [name]: valor,
      });
    } else if (e.target.type === "number" || e.target.type === "select-one") {
      const { name, value } = e.target;
      setCerveza({
        ...cerveza,
        [name]: +value,
      });
    } else {
      const { name, value } = e.target;
      setCerveza({
        ...cerveza,
        [name]: value,
      });
    }
  };
```

5. **Manejo del envío del formulario**:
```javascript
const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors(null);
    setOK("");
    const token = session?.authorization.token || "";

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1/";

    try {
      const response = await fetch(`${apiUrl}cervezas/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cerveza),
      });

      // Manejar la respuesta
      if (response.ok) {
        const data = await response.json();

        setOK("Producto " + data.nombre + " guardado correctamente.");
      } else {
        const errores = await response.json();
        setErrors(errores);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(
        "No se pudo conectar con el servidor. Puede que la sesión halla expirado."
      );
      console.error("Error en la solicitud:");
    }
  };
```

6. **Renderizado del formulario**:
```javascript
return (
    <>
      <h1 className="text-2xl font-bold text-center">Editar producto</h1>
      <div className="w-11/12 mx-auto border-2 rounded-lg shadow-lg py-2">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 w-11/12 mx-auto gap-4"
        >
          {/* ...Código del formulario omitido para brevedad... */}
        </form>
      </div>
    </>
  );
```

7. **Manejo de estados de carga y mensajes**:
```javascript
{loading && <Load />}
<div className="col-span-1 md:col-span-3 mt-2">
  {errors && <DisplayErrors errors={errors} />}
  {ok && <p className="bg-green-300 rounded p-4">{ok}</p>}
  <div className="flex items-center mt-2">
    <button type="submit" className="btn-primary ">
      Guardar
    </button>
    <Link href="/" className="btn-primary ">
      Volver
    </Link>
  </div>
</div>
```

8. **Retorno del componente**:
```javascript
export default Edit;
```

Con estos fragmentos de código, ahora deberías tener una mejor comprensión de cómo cada parte del componente contribuye a su funcionalidad general.