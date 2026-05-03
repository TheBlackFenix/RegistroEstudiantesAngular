# Registro de Estudiantes

Aplicación web para que un estudiante pueda registrarse, iniciar sesión y seleccionar sus materias. También permite consultar las materias inscritas y ver compañeros asociados a las mismas.

## Funcionalidades principales

- Registro e inicio de sesión de estudiantes.
- Validación de sesión mediante token.
- Consulta de materias inscritas.
- Registro de materias disponibles.
- Restricción de máximo 3 materias por estudiante.
- Validación para no seleccionar varias materias con el mismo profesor.
- Consulta de compañeros y sus materias.
- Mensajes de confirmación y error para mejorar la experiencia de uso.

## Tecnologías usadas

- Angular 18
- PrimeNG
- Tailwind CSS
- RxJS
- JWT para autenticación

## Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- Node.js
- Angular CLI
- Backend de la aplicación ejecutándose

## Configuración del backend

La URL base de la API se configura en:

- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

Por defecto está configurada así:

```ts
apiUrl: 'https://localhost:7129/api'
```

Si el backend corre en otro puerto o dominio, cambia ese valor.

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm start
```

Luego abre:

```text
http://localhost:4200
```

## Generar build

```bash
npm run build
```

El resultado se genera en la carpeta `dist/`.

## Estructura general

- `src/app/core`: servicios, modelos, guard e interceptor.
- `src/app/pages/Auth`: pantallas de login y registro.
- `src/app/pages/Materias`: pantallas relacionadas con materias y compañeros.
- `src/environments`: configuración de ambientes.

## Nota

Para que la aplicación funcione correctamente, el backend debe estar disponible y aceptar las rutas configuradas para autenticación, materias y compañeros.
