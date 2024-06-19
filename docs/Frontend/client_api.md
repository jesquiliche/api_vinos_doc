---
sidebar_position: 7
---

# API Cliente

La biblioteca de cliente de NextAuth.js facilita la interacción con sesiones desde aplicaciones React o Next

```ts title="Ejemplo de Objeto de Sesión"
{
  user: {
    name: string
    email: string
    image: string
  },
  expires: Date // Esta es la caducidad de la sesión, no de ninguno de los tokens dentro de la sesión
}
```

Puede usar la devolución de llamada de sesión para personalizar el objeto de sesión devuelto al cliente si necesita devolver datos adicionales en el objeto de sesión.

El valor de caducidad se rota, lo que significa que cada vez que se recupera la sesión de la API REST, este valor también se actualizará para evitar la expiración de la sesión.

**useSession()**
Lado del Cliente: Sí
Lado del Servidor: No
El hook de React useSession() en el cliente de NextAuth.js es la forma más sencilla de comprobar si alguien ha iniciado sesión.



Ejemplo
```javascript
import { useSession } from "next-auth/react"

export default function Componente() {
  const { data: session, status } = useSession()

  if (status === "authenticated") {
    return <p>Sesión iniciada como {session.user.email}</p>
  }

  return <a href="/api/auth/signin">Iniciar sesión</a>
}
```

## useSession()
Devuelve un objeto que contiene dos valores: **data y status**:

data: Esto puede ser tres valores: 
- Sesión 
- undefined 
- null.

Cuando la sesión aún no se ha cargado, data será undefined.
En caso de que no se halla iniciado la sesión, data será null.
En caso de éxito, data será un objeto Sesión.

**status: mapeo enum a tres posibles estados de sesión:**
- loading (cargando sesión)
- authenticated (autorizado)
- unauthenticated (no autorizado)

### Requerir sesión

Debido a la forma en que Next.js maneja getServerSideProps y getInitialProps, cada carga de página protegida debe realizar una solicitud del lado del servidor para verificar si la sesión es válida y luego generar la página solicitada (SSR). Esto aumenta la carga del servidor, y si prefieres hacer las solicitudes desde el cliente, hay una alternativa. Puedes usar useSession de manera que asegure que siempre tengas una sesión válida. Si después del estado de carga inicial no se encuentra ninguna sesión, puedes definir la acción apropiada para responder.

Para poder utilizar el hook **useSession**, primero debemos crear un proveedor de sesión que permita el acceso a todas las páginas y componentes que lo contengan para tener acceso a la sesión. Vamos a ver cómo implementarlo en nuestro proyecto, lo cual puede servirnos como ejemplo para futuros proyectos. Cree una carpeta llamada **context** en la raíz del proyecto y un componente llamado **SessionAuthProvider.tsx**. Estos nombres son completamente libres de ser definidos a gusto del desarrollador.

```typescript title=src\context\SessionAuthProvider.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const SessionAuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  );
};

export default SessionAuthProvider;
```
Ahora para hacer que **useSessión** sea accesible para todos los componentes y paginas del proyecto, vamos a redefinir nuestro punto de entrada a la aplicación **Layout.tsx**.


```ts
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frontend curso",
  description: "Frontend curso",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SessionAuthProvider>
          <NavBar />
          <div className="flex-1 ">{children}</div>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
```


- **Interfaz de Usuario Global**: Importa estilos globales (`globals.css`) para aplicar estilos a toda la aplicación, lo que garantiza una apariencia consistente en todas las páginas.

- **Manejo de Sesión de Usuario**: El componente `SessionAuthProvider` se encarga de manejar la autenticación y la sesión de usuario en la aplicación. Envuelve el contenido de la aplicación para proporcionar acceso a la sesión a todas las páginas y componentes que lo contienen.

- **Barra de Navegación**: El componente `NavBar` se renderiza para proporcionar navegación entre las diferentes secciones de la aplicación.

- **Definición de Metadatos**: Define metadatos (`metadata`) para la página, como el título y la descripción, que pueden ser utilizados para mejorar el SEO y la accesibilidad de la aplicación.

- **Diseño de Página Principal**: El componente `RootLayout` actúa como el diseño principal de la aplicación, envolviendo el contenido de cada página para aplicar estilos globales, manejar la sesión de usuario y proporcionar una barra de navegación consistente en todas las páginas.
El comportamiento predeterminado es redirigir al usuario a la página de inicio de sesión, desde donde, después de iniciar sesión correctamente, se le enviará de vuelta a la página en la que comenzó. También puedes definir un callback onUnauthenticated(), si deseas hacer algo diferente:
:::

A continuación vamos a ver como implementar nuestra barra de navegación, que nos servirá como ejemplo de implementación de **useSession** en nuestros componentes.

:::info 
Recuerde que para poder utilizar hooks, nuestros componentes deben estar del lado del cliente. En el ejemplo no se especifica explícitamente por que **SessionAuthProvider** ya está definido como un componente del lado del cliente. Por lo tanto, todos sus hijos **{children}** heredarán este comportamiento automáticamente, a menos que se especifique lo contrario.
:::


```ts =src\components\NavBar.tsx
import React from "react";
import ButtonAuth from "./ButtonAuth";
import Link from "next/link";
const NavBar = () => {
    return (
      <div className="px-4 py-2 mx-auto flex justify-between flex-items-center shadow-lg">
        <Link href="/" className="py-2 italic font-bold text-xl">
            Inicio
        </Link>
        <ButtonAuth />
      </div>
    );
  };
  

export default NavBar;

```
A continuación crearemos el componente **ButtonAuth**, el cual nos permitirá **iniciar y cerrar sesión**.

```ts title=src\components\ButtonAuth.tsx
"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function ButtonAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
 
  console.log(session);
  if (session) {
    return (
      <>
        <button
          onClick={async () => await signOut({ callbackUrl: "/" })}
          className="btn-primary"
        >
          <span className="">Log out - {session.user?.name}</span>
        </button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()} className="btn-primary">
        Log in
      </button>
    </>
  );
}
```

:::info Explicación del código

- Importa los hooks `signIn`, `signOut`, y `useSession` de la biblioteca `next-auth/react`, que se utilizan para gestionar la autenticación de usuario.
- El componente `ButtonAuth` utiliza el hook `useSession` para obtener el estado de la sesión del usuario (`session`) y su estado de carga (`status`).
- Si la sesión está cargando (`status === "loading"`), muestra un mensaje de carga para indicar al usuario que se está procesando la autenticación.
- Si hay una sesión activa (`session` no es `null`), muestra un botón para cerrar sesión. Al hacer clic en este botón, se llama a la función `signOut` para cerrar la sesión del usuario.
- Si no hay una sesión activa (`session` es `null`), muestra un botón para iniciar sesión. Al hacer clic en este botón, se llama a la función `signIn` para iniciar sesión.
- Conclusión, este componente proporciona una interfaz sencilla para que el usuario inicie sesión o cierre sesión en la aplicación, dependiendo de su estado de sesión actual.
:::