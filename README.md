# Superhéroes App - Aplicación SPA con React

## Descripción
Esta aplicación web es un sistema de gestión de superhéroes y sus creadores, desarrollada como una SPA (Single Page Application) utilizando React. Permite realizar operaciones CRUD completas sobre superhéroes y sus creadores, con un sistema de autenticación robusto.

## Funcionalidades Principales

### 1. Autenticación
- Sistema de login y registro de usuarios
- Protección de rutas privadas mediante tokens JWT
- Gestión de sesiones segura
- Redirección automática a login para rutas protegidas

### 2. Gestión de Superhéroes
- Crear, ver, editar y eliminar superhéroes
- Asignación de poderes múltiples
- Vinculación con creadores
- Descripción detallada de cada superhéroe
- Paginación de resultados

### 3. Gestión de Creadores
- CRUD completo de creadores
- Registro de compañía y años de experiencia
- Visualización en formato de cards
- Sistema de paginación integrado

### 4. Características Técnicas
- Navegación SPA con React Router
- Gestión de estado con Context API
- Diseño responsive con Tailwind CSS
- Integración con API REST
- Modales para formularios de edición

## Tecnologías Utilizadas
- React 18
- React Router v6
- Axios para peticiones HTTP
- Tailwind CSS para estilos
- Heroicons para iconografía
- Context API para estado global
- JWT para autenticación

## Estructura del Proyecto

superheros-app/
├── src/
│ ├── components/
│ │ ├── CreatorModal.jsx
│ │ ├── Navbar.jsx
│ │ ├── ProtectedRoute.jsx
│ │ └── SuperheroModal.jsx
│ ├── pages/
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ ├── SuperheroesList.jsx
│ │ ├── CreatorsList.jsx
│ │ └── NotFound.jsx
│ ├── services/
│ │ ├── authService.js
│ │ ├── creatorService.js
│ │ └── superheroService.js
│ ├── context/
│ │ └── AuthContext.jsx
│ └── App.jsx

## Instrucciones de Uso

### 1. Clonar el repositorio

bash
git clone https://github.com/Esteban705/SuperheroFrontUTN.git
cd superheros-app


### 2. Instalar dependencias

bash
npm install

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto:

VITE_API_URL=http://localhost:3001/api

### 4. Iniciar el servidor de desarrollo

bash
npm run dev



## Características de la Interfaz
- Diseño moderno y responsive
- Sistema de cards para visualización de datos
- Modales interactivos para formularios
- Navegación intuitiva con barra superior
- Mensajes de feedback para operaciones CRUD
- Paginación para grandes conjuntos de datos

## Estado del Proyecto
🚀 En desarrollo activo

## API Endpoints
- `/api/auth/login` - Autenticación de usuarios
- `/api/auth/register` - Registro de usuarios
- `/api/superheros` - CRUD de superhéroes
- `/api/creators` - CRUD de creadores

## Próximas Mejoras
- [ ] Implementación de búsqueda y filtros
- [ ] Sistema de roles de usuario
- [ ] Galería de imágenes para superhéroes
- [ ] Estadísticas y dashboard
- [ ] Modo oscuro

## Contribuidores
- Ruben Esteban Rodriguez
