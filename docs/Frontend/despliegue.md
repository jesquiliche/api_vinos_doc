---
sidebar: 9
---

# Despliegue

## Introducción

En esta sección, vamos a desplegar nuestra aplicación **frontend** en el servidor de **Vercel**. Para ello, necesitaremos tener un repositorio en **GitHub** y una cuenta en **Vercel**. Recomendamos usar la misma cuenta de GitHub para iniciar sesión en Vercel. Puedes acceder a Vercel en la siguiente URL: [https://vercel.com](https://vercel.com).

![Vercel](/images/vercel.png)

Deberías ver una pantalla similar a esta. El contenido dependerá del número de proyectos que tengas desplegados. Si no has realizado ningún despliegue anterior, es posible que la encuentres vacía.

Haz clic en **Add New** y luego en **Project**.

![Vercel](/images/vercel1.png)

En la siguiente pantalla, importaremos el proyecto desde nuestro repositorio.

![Vercel](/images/vercel2.png)

Escribe el nombre de tu proyecto. Si no lo encuentras, selecciona la opción **Configure GitHub App**.

![Vercel](/images/vercel4.png)

Selecciona tu repositorio y pulsa **Save**. A continuación, aparecerá la siguiente pantalla:

![Vercel](/images/vercel5.png)

Pulsa en **Import**.

![Vercel](/images/vercel6.png)

A continuación, despliega la pestaña **Settings** e introduce tus variables de entorno.

![Vercel](/images/vercel7.png)

```bash
NEXT_PUBLIC_API_URL=<Tu ruta>
API_URL=<Tu ruta>
NEXT_PUBLIC_API_AUTH=<Tu ruta>
NEXTAUTH_SECRET=<Clave secreta>
```

Finalmente, pulsa **Deploy**.

Si todo ha marchado correctamente, deberías obtener una pantalla como esta:

![Vercel](/images/exito.png)

Para poder acceder a la web de Vercel, pulsa sobre la imagen del proyecto que se muestra en la pantalla.

