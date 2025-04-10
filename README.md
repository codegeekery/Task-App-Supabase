# 📋 Gestor de Tareas con React Router y Supabase

[![My Skills](https://skillicons.dev/icons?i=supabase,ts,vite,remix,postgres,npm,react)](https://skillicons.dev)

Aplicación completa para gestión de tareas con operaciones CRUD usando React Router v7 y Supabase como backend.

# 🚀 Características Principales

- **CRUD Completo** de tareas
- **Interfaz intuitiva** con formularios
- **Confirmación** para operaciones críticas
- **Tipado estático** con TypeScript
- **Estilos modernos** con Tailwind CSS

# 📦 Estructura del Proyecto
```
react-router/
├── app/
│ ├── components/
│ │ └── TaskForm.tsx
│ ├── routes/
│ │ ├── home.tsx
│ │ └── task.tsx
│ ├── app.css
│ ├── root.tsx
│ └── routes.ts
├── lib/
│ ├── query.ts
│ ├── store.ts
│ └── supabase.ts
├── public/
├── types/
│ └── task.ts
├── node_modules/
├── .env
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.js
└── react-router.config.ts
```


# 🔧 Requisitos

- Node.js v22+
- Cuenta en Supabase
- Navegador moderno

# 🚧 Próximos Pasos a Completar

- [ ] Formulario Aplicar reset al editar o eliminar tareas
- [ ] Crear Sistema de Autenticacion. (Supabase Auth, JWT etc... hay varias opciones)
- [ ] Pulir la tabla que muestras las tareas. De manera que se puedan buscar las tareas mediante un buscador
- [ ] Agregar Paginacion, para renderizar bien la lista de item. Y no saturar el navegador de tantos item cargando