# 📘 Proyecto de Gestión Escolar

Este repositorio contiene el sistema de gestión escolar desarrollado con **Vue 3 + TypeScript + Vite**, con una arquitectura modular y componentes reutilizables.

---

## 🚀 Tecnologías principales

- **Vue 3** con Composition API
- **TypeScript**
- **Pinia** para la gestión de estado
- **Vue Router**
- **Axios** para consumo de API
- **TailwindCSS** para estilos
- **Vite** como bundler

---

## 📂 Estructura del proyecto

La estructura está organizada por módulos y elementos reutilizables para mantener escalabilidad y claridad:

```
src/
 ├─ api/
 │   └─ api.ts
 │
 ├─ assets/
 │   └─ assets.txt
 │
 ├─ components/
 │   ├─ layout/
 │   │   └─ layout.vue
 │   │
 │   └─ elements/
 │       └─ element.vue
 │
 ├─ modules/
 │   ├─ public/
 │   │   ├─ pages/
 │   │   │   └─ page.vue
 │   │   ├─ components/
 │   │   │   └─ component.vue
 │   │   ├─ store.ts
 │   │   └─ interfaces.ts
 │   │
 │   ├─ students/
 │   │   ├─ pages/
 │   │   │   └─ page.vue
 │   │   ├─ components/
 │   │   │   └─ component.vue
 │   │   ├─ store.ts
 │   │   └─ interfaces.ts
 │   │
 │   ├─ school/
 │   │   ├─ pages/
 │   │   │   └─ page.vue
 │   │   ├─ components/
 │   │   │   └─ component.vue
 │   │   ├─ store.ts
 │   │   └─ interfaces.ts
 │   │
 │   ├─ linking/
 │   │   ├─ pages/
 │   │   │   └─ page.vue
 │   │   ├─ components/
 │   │   │   └─ component.vue
 │   │   ├─ store.ts
 │   │   └─ interfaces.ts
 │   │
 │   ├─ admin/
 │   │   ├─ pages/
 │   │   │   └─ page.vue
 │   │   ├─ components/
 │   │   │   └─ component.vue
 │   │   ├─ store.ts
 │   │   └─ interfaces.ts
 │   │
 │   └─ director/
 │       ├─ pages/
 │       │   └─ page.vue
 │       ├─ components/
 │       │   └─ component.vue
 │       ├─ store.ts
 │       └─ interfaces.ts
 │
 ├─ interfaces/
 │   └─ types.ts
 │
 ├─ router/
 │   └─ index.ts
 │
 ├─ store/
 │   └─ store.ts
 │
 ├─ utils/
 │   └─ utils.ts
 │
 ├─ App.vue
 └─ main.ts
```

### api/

Contiene las llamadas a la **API** organizadas por dominio. Cada archivo maneja las peticiones de un módulo específico.

### assets/

Contiene recursos estáticos:

### components/

Componentes reutilizables en toda la aplicación.

- **layout/** → estructuras globales como `Navbar`, `Sidebar`, `Footer`.
- **elements/** → elementos atómicos estandarizados como `Button`, `Input`, `Modal`, `Dropdown`.

### modules/

Módulos organizados por rol del sistema. Cada módulo contiene:

- **pages/** → páginas de ese rol.
- **components/** → componentes internos de las páginas.
- **store.ts** → estado específico de ese módulo.
- **interfaces.ts** → interfaces TypeScript específicas del módulo.

### interfaces/

Interfaces **globales** reutilizables en varios módulos.

- `User.ts` → definición base de usuario.
- `Auth.ts` → tipos relacionados con autenticación.
- `ApiResponse.ts` → formato estándar de respuestas de la API.

### router/

Contiene la configuración de rutas.

### store/

Almacena **Pinia stores globales** que afectan a toda la aplicación.

---

## 📌 Flujo de trabajo con control de versiones

Para mantener claridad, organización y trazabilidad en el desarrollo del proyecto, se definirá un **flujo de trabajo basado en ramas y commits estandarizados**.

### Estrategia de ramas

El proyecto seguirá una estructura de ramas que permita diferenciar los tipos de cambios:

- **main**: Rama principal con el código estable y listo para producción.
- **develop**: Rama donde se integran los cambios validados y probados.
- **test**: Rama dedicada a pruebas, donde el líder probará los cambios antes de integrarlos a `develop`.
- **feature/**: Para el desarrollo de nuevas funcionalidades.  
  Ejemplo: `feature/students-dashboard`
- **fix/**: Para la corrección de errores detectados.  
  Ejemplo: `fix/login-validation`
- **docs/**: Para cambios en la documentación.  
  Ejemplo: `docs/readme-update`
- **refactor/**: Para refactorización de código sin cambiar la funcionalidad.  
  Ejemplo: `refactor/components-layout`

---

### Convención de commits (Conventional Commits)

Se usará la convención **tipo(módulo): descripción breve** para estandarizar los mensajes de commit.  
Esto asegura claridad sobre qué se cambió y en qué parte del sistema.

#### Tipos más comunes:

- `feat`: Nueva funcionalidad
- `fix`: Corrección de errores
- `docs`: Cambios en documentación
- `style`: Ajustes de estilo (espacios, formato, etc.) sin cambios en lógica
- `refactor`: Refactorización de código sin modificar funcionalidad
- `test`: Creación o modificación de pruebas
- `chore`: Tareas de mantenimiento (dependencias, configuraciones, etc.)

#### Ejemplos:

```bash
feat(students): agregar componente para tabla de calificaciones
fix(auth): corregir error en la validación del token
docs(public): actualizar readme con nueva estructura del proyecto
refactor(elements): optimizar componente de botón para reutilización
test(school): añadir pruebas unitarias al módulo de boletas
chore(utils): actualizar dependencias y reglas de linting
```

### Flujo de integración

1. **Crear una rama nueva** a partir de `develop` según el tipo de cambio.
   ```bash
   git checkout develop
   git checkout -b feature/nueva-funcionalidad
   ```
2. **Realizar los cambios y commits** siguiendo la convención establecida.
   Ejemplo:
   ```bash
   feat(students): agregar componente para tabla de calificaciones
   ```
3. Subir la rama al repositorio remoto.
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
4. **Abrir un Pull Request (PR)** hacia la rama `test`.
5. El **líder del proyecto** validará y probará los cambios en la rama `test` para asegurar que todo funcione correctamente.
6. Una vez aprobados, los cambios se integrarán en `develop`.
