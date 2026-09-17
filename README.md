# Muni Cusco Consulta — starter profesional para Vercel

Proyecto demostrativo en Next.js 14 para iniciar un portal de consultas municipales.

## Incluye

- Página pública profesional.
- `/consulta`: consulta por código.
- `/admin`: CRUD demostrativo de registros.
- API REST:
  - `GET /api/consulta?q=MC-0001`
  - `GET /api/registros`
  - `POST /api/registros`
  - `PUT /api/registros/:id`
  - `DELETE /api/registros/:id`
- Diseño responsive.
- Metadata SEO básica.
- Estructura preparada para reemplazar el almacenamiento temporal por una base de datos.

## Importante antes de producción

Los datos actuales son ficticios y el almacenamiento está en memoria. En Vercel, las funciones serverless no deben usar este almacenamiento como base de datos permanente.

Para una versión real y autorizada, conectar una base de datos (por ejemplo PostgreSQL/Supabase/Neon), implementar autenticación de administrador, autorización por roles, validación de entrada, rate limiting, logs y gestión segura de secretos mediante variables de entorno.

También reemplazar el nombre y branding por la entidad que corresponda y publicar únicamente información que la entidad esté autorizada a exponer.

## Ejecutar

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Desplegar en Vercel

1. Subir este proyecto a GitHub.
2. Importar el repositorio en Vercel.
3. Framework: Next.js.
4. Deploy.
5. Para producción, añadir las variables de entorno de la base de datos y autenticación cuando se conecten esos servicios.
