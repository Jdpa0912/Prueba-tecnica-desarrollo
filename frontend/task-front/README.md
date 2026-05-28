# TaskFront

Aplicación de gestión de tareas (To-Do List) con Angular 17 (frontend)

## Tecnologías usadas y justificación

Para el frontend se eligió Angular 17 con componentes standalone, lo que permite reducir el boilerplate y facilita el uso de formularios reactivos con tipado fuerte. 

##  Decisiones del proyecto

Interceptor HTTP en Angular para añadir automáticamente el token.

Guard de rutas para proteger /tasks.

SSR (Server Side Rendering) configurado pero no utilizado activamente; se dejó la estructura por si se necesita en el futuro.


## Pendientes / Mejoras futuras

Paginación y filtros (por estado, prioridad) en el listado de tareas.


###  Clonar el repositorio

```bash
git clone <https://github.com/Jdpa0912/Frontend-Prueba.git>
