---
sidebar_position: 4
---

# Autenticación con Next-Auth y JWT

## Introducción

**NextAuth.js** es una biblioteca de autenticación para aplicaciones web desarrolladas con Next.js, un marco de trabajo de React para construir aplicaciones web modernas. NextAuth.js simplifica el proceso de autenticación al proporcionar una capa de abstracción sobre los servicios de autenticación populares, como OAuth, OpenID Connect y otros proveedores de identidad, así como también autenticación propia.

Con NextAuth.js, los desarrolladores pueden integrar fácilmente la autenticación en sus aplicaciones Next.js sin tener que preocuparse por los detalles de implementación de cada proveedor de autenticación individual. Esto permite a los desarrolladores centrarse en la lógica de la aplicación en lugar de en la configuración y gestión de la autenticación.

NextAuth.js proporciona una API sencilla y flexible que permite a los desarrolladores personalizar y adaptar la autenticación a las necesidades específicas de sus aplicaciones. Además, ofrece soporte para funciones avanzadas como la autenticación de dos factores y la gestión de sesiones, lo que garantiza la seguridad y la experiencia del usuario en todo momento.

NextAuth.js es una herramienta poderosa para simplificar y agilizar el proceso de autenticación en aplicaciones web desarrolladas con Next.js, permitiendo a los desarrolladores centrarse en la creación de experiencias de usuario excepcionales sin tener que lidiar con la complejidad de la autenticación.

## Instalación y configuración 

Instalar **NextAuth**
```bash
npm install next-auth
```
:::info
Agregar Ruta de API
Para agregar NextAuth.ts a tu proyecto, crea un archivo llamado [...nextauth].js en app/api/auth. Este archivo contiene el controlador de ruta dinámica para NextAuth.js que también contendrá todas tus configuraciones globales de NextAuth.js.
:::
```javascript title=app/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        try {
          // Realiza una solicitud POST al endpoint de autenticación en el servidor
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_AUTH}/login`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          // Si la respuesta no es 200 (éxito), lanza un error
          if (res.status !== 200) {
            throw new Error("Invalid credentials");
          }

          // Si la respuesta es 200, obtiene los datos de usuario y autorización
          const data = await res.json();
          return {
            user: data.user,
            authorization: data.authorization,
          };
        } catch (error) {
          // Captura cualquier error y lo muestra en la consola
          console.error("Error during login:", error);
          throw new Error("Error during login");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Fusiona los datos del token y del usuario
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // Establece la sesión del usuario basada en el token
      session = token;
      return session;
    },
  },
  session: {
    // Configura el tiempo de vida del token JWT a 1 hora (3600 segundos)
    jwt: true,
    maxAge: 3600,
  },
  pages: {
    // Define la ruta para cerrar sesión
    signOut: "/auth/signout",
  },
});

// Exporta el controlador de autenticación para manejar solicitudes GET y POST
export { handler as GET, handler as POST };
```

### Explicación del código
1. **Importaciones de Módulos:**

```javascript
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
```

- **¿Qué hace esto?**:
  - Aquí estamos importando dos módulos necesarios para implementar la autenticación en nuestra aplicación Next.js. `NextAuth` nos proporciona un conjunto de herramientas para manejar la autenticación de manera sencilla, mientras que `CredentialsProvider` es un proveedor específico que nos permite autenticar usuarios utilizando credenciales como correo electrónico y contraseña.

2. **Configuración de NextAuth:**

```javascript
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { ... },
        password: { ... }
      },
      async authorize(credentials) { ... }
    })
  ],
  callbacks: { ... },
  session: { ... },
  pages: { ... }
});
```

- **¿Qué hace esto?**:
  - Aquí estamos configurando NextAuth para que funcione con nuestro proveedor de credenciales. Dentro de la configuración, definimos cómo se deben manejar las credenciales de correo electrónico y contraseña, qué funciones deben ejecutarse en diferentes etapas del proceso de autenticación, cómo debe gestionarse la sesión del usuario y cómo deben ser las páginas relacionadas con la autenticación.

3. **Función `authorize`:**

```javascript
  async authorize(credentials) {
        try {
          // Realización de una solicitud POST al endpoint de autenticación en el servidor
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_AUTH}login`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          });
          
          // Si la solicitud no es exitosa (código de estado distinto a 200), lanzar un error
          if (res.status !== 200) {
            throw new Error("Credenciales no válidas");
          }

          // Si la solicitud es exitosa, obtener los datos de usuario y autorización
          const data = await res.json();
          
          // Devolver los datos de usuario y autorización
          return {
            user: data.user,
            authorization: data.authorization,
          };
        } catch (error) {
          // Capturar cualquier error y mostrarlo en la consola
          console.error("Error during login:", error);
          throw new Error("Error durante el inicio de sesión");
        }
      },
```

- **¿Qué hace esto?**:
  - Esta función es crucial en el proceso de autenticación. Se ejecuta cuando un usuario intenta iniciar sesión en nuestra aplicación. Dentro de esta función, tomamos las credenciales proporcionadas por el usuario (correo electrónico y contraseña), las utilizamos para realizar una solicitud HTTP a la API  autenticación, y luego evaluamos si las credenciales son válidas o no (status 200). Si son válidas, devolvemos información sobre el usuario y su autorización para acceder a la aplicación, en caso contrario devuelve error.
:::info respuesta Login
  ```
    {
    "user": {
      "id": 1,
      "name": "admin",
      "email": "admin@test.com",
      "email_verified_at": null,
      "role": "admin",
      "created_at": "2024-03-14T20:25:49.000000Z",
      "updated_at": "2024-03-14T20:25:49.000000Z"
    },
    "authorization": {
      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbGFyYXZlbGJpcnJhcy1wcm9kdWN0aW9uLnVwLnJhaWx3YXkuYXBwL2FwaS9sb2dpbiIsImlhdCI6MTcxMjgxODQ0MSwiZXhwIjoxNzEyOTA0ODQxLCJuYmYiOjE3MTI4MTg0NDEsImp0aSI6InZwQnZlbUJsRHExRVllQk4iLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.rkPMYTdSYGU7LRZoLe24u5kDu4meNRNLW1mzh3qY7UQ",
      "type": "bearer"
    }
  }
  ```
  Estos datos serán guardados en la sesión.
:::

4. **Callbacks**
```js
callbacks: {
    // Callback para manipular el token JWT
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    // Callback para manejar la sesión del usuario
    async session({ session, token }) {
      // Establecer la sesión del usuario basada en el token
      session = token;
      return session;
    },
  },
```
- **¿Qué hace esto?**:

  Estas secciones de código definen callbacks en el objeto de configuración de NextAuth. Los callbacks son funciones que se ejecutan en momentos específicos del ciclo de vida de la autenticación y nos permiten personalizar y manipular los datos del usuario y su sesión. En este caso, los callbacks están relacionados con el manejo del token JWT y la sesión del usuario:

  **Callback jwt:**

  Esta función se ejecuta cada vez que se crea o actualiza el token JWT.
  Recibe como parámetro un objeto con el token y los datos del usuario.
  En este código, la función simplemente fusiona los datos del token y del usuario y los devuelve como un objeto combinado.

  **Callback session:**

  Esta función se ejecuta cada vez que se crea una nueva sesión para un usuario.
  Recibe como parámetros el objeto de sesión actual y el token JWT.
  En este código, la función establece la sesión del usuario basada en el token JWT asignándole el valor del token al objeto de sesión y luego devuelve este objeto de sesión modificado.

5. **Resto de opciones**
Estas opciones adicionales en el objeto de configuración de NextAuth tienen un impacto en la sesión del usuario y en la configuración de las páginas de la aplicación:

1. **Opciones de sesión (`session`):**
   - `jwt`: Un booleano que indica si se debe habilitar el uso de JWT (JSON Web Tokens) para la gestión de la sesión del usuario. Cuando está establecido en `true`, NextAuth utiliza JWT para manejar la sesión del usuario.
   - `maxAge`: Define el tiempo máximo de vida del token JWT en segundos. En este caso, está configurado en 3600 segundos (1 hora), lo que significa que el token JWT expirará después de 1 hora de haber sido emitido.

2. **Configuración de páginas (`pages`):**
   - `signOut`: Especifica la ruta de la página a la que se redirigirá cuando un usuario cierre sesión. En este caso, se ha configurado la ruta "/auth/signout" como la ruta a la que se redirigirá el usuario al cerrar sesión.


6. **Exportación del Controlador:**

```javascript
export { handler as GET, handler as POST };
```

- **¿Qué hace esto?**:
  - Exportamos el controlador de autenticación como dos funciones, `GET` y `POST`, lo que nos permite manejar tanto las solicitudes GET como POST relacionadas con la autenticación en nuestra aplicación. Esto nos proporciona flexibilidad en cómo gestionamos las solicitudes de autenticación en nuestra aplicación.

## Configuración del provider

El componente `SessionAuthProvider` sirve para proporcionar acceso a la información de sesión en toda nuestra aplicación React. Básicamente, actúa como un envoltorio alrededor de nuestra aplicación, permitiendo que todos los componentes secundarios dentro de él accedan a la información de sesión proporcionada por NextAuth.

Cuando utilizamos `SessionAuthProvider`, estamos asegurándonos de que nuestros componentes secundarios puedan acceder fácilmente a detalles importantes sobre la sesión del usuario, como su estado de autenticación, información del usuario, etc.

Entonces, para simplificar, el `SessionAuthProvider` es como un puente que conecta nuestra aplicación con NextAuth, permitiendo que la información de sesión fluya sin problemas a través de todos los componentes de nuestra aplicación React. Esto facilita la implementación de funcionalidades relacionadas con la autenticación y la gestión de sesiones en nuestra aplicación.

```ts title=context/SessionAuthProvider.tsx
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

1. **Importamos los módulos necesarios:**
   - Importamos el componente `SessionProvider` de la biblioteca `next-auth/react`. También necesitamos importar la biblioteca `React` para poder utilizar JSX en nuestro componente.

```javascript
import { SessionProvider } from "next-auth/react";
import React from "react";
```

2. **Definimos nuestro componente `SessionAuthProvider`:**
   - Creamos un componente de función llamado `SessionAuthProvider`.
   - Este componente toma un único prop llamado `children`, que representará los elementos secundarios que estarán dentro de nuestro proveedor de sesión.

```javascript
interface Props {
  children: React.ReactNode;
}

const SessionAuthProvider = ({ children }: Props) => {
  // Este componente proporciona acceso a la información de sesión en toda la aplicación
  // Envuelve los componentes secundarios en el SessionProvider de NextAuth
};
```

3. **Desarrollamos el cuerpo de nuestro componente `SessionAuthProvider`:**
   - Nuestro componente `SessionAuthProvider` devuelve el componente `SessionProvider`, que envuelve los elementos secundarios (`children`) que se le pasan como prop.
   - `SessionProvider` es un componente de contexto proporcionado por NextAuth que nos asegura que nuestros componentes secundarios tengan acceso a la información de sesión proporcionada por NextAuth.

```javascript
const SessionAuthProvider = ({ children }: Props) => {
  // Devuelve el SessionProvider para que los componentes secundarios tengan acceso a la información de sesión
  return (
    <SessionProvider>{children}</SessionProvider>
  );
};
```

4. **Exportamos nuestro componente `SessionAuthProvider`:**
   - Finalmente, exportamos nuestro componente `SessionAuthProvider` para que pueda ser utilizado en otras partes de nuestra aplicación.

```javascript
export default SessionAuthProvider;
```
## Definición de tipos

Si bien este paso es opcional, es altamente recomendable. En este módulo definiremos el tipo devuelto por el hook **useSessión**, que veremos más adelante.

**src\types\next-auth.d.ts**

```ts
import "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    two_factor_secret: string | null;
    two_factor_recovery_codes: string[] | null;
    two_factor_confirmed_at: string | null;
    created_at: string;
    updated_at: string;
  }
  
  interface Authorization {
    token: string;
    type: string;
  }
  
  interface Session {
    user: User;
    authorization: Authorization;
    iat: number;
    exp: number;
    jti: string;
  }
  
}
```