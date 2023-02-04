# Ticket - Backend

## Descripción
Backend de la aplicación Ticket. Se encarga de manejar las conexiones de los clientes y de enviar y recibir los mensajes.

- [Frontend](https://github.com/bl0pez/Ticket-frontEnd) - Frontend de la aplicación Ticket

## Installation
1. Clona el repositorio
2. Renombra el archivo `.env.example` a `.env` y configura las variables de entorno
3. Ejecuta `npm install` para instalar las dependencias
4. Ejecuta `npm run dev` para iniciar el servidor

## Estructura de carpetas
- `models`: Contiene las clases del proyecto
- `public`: Contiene los archivos estáticos del proyecto
- `.env`: Contiene las variables de entorno
- `index.js`: Contiene el código principal del proyecto

## Dependencias
- `express`: Framework para crear servidores web
- `socket.io`: Librería para crear aplicaciones en tiempo real
- `cors`: Librería para habilitar el acceso a recursos desde otros dominios
- `dotenv`: Librería para leer variables de entorno
- `uuid`: Librería para generar identificadores únicos


## Dependencias de desarrollo
- `nodemon`: Herramienta para reiniciar el servidor automáticamente cuando se detectan cambios en el código