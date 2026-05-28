# Task Manager - Prueba Técnica Full Stack- Backend

Node.js + Express(backend) y PostgreSQL (base de datos).


## Tecnologías usadas y justificación

En el backend se utilizó Node.js con Express por ser liviano, de fácil integración con JWT y bcrypt, y contar con una amplia comunidad. 

Como base de datos se optó por PostgreSQL 14+ debido a su soporte de CHECK constraints, integridad referencial, índices y manejo nativo de JSON. La autenticación se implementó con JWT (stateless y seguro) y bcrypt para el hashing de contraseñas. Finalmente, las validaciones se resolvieron con Zod en el backend y Reactive Forms en el frontend, proporcionando tipado estático, reutilización y mensajes de error claros.

---

###  Decisiones del proyecto

Separación por capas en backend (routes → controllers → services → DB) para mantener la lógica desacoplada.

Zod para validaciones: permite tipado inferido y mensajes de error detallados.

JWT almacenado en localStorage (simple para esta prueba; en producción se podría usar HttpOnly cookie).

Manejo centralizado de errores con middleware errorHandler.

#### Pendientes / Mejoras futuras

Mejor manejo de sesión expirada (redirección automática al login).

Completar el Soft delete

#####  Clonar el repositorio
```bash
git clone <https://github.com/Jdpa0912/Backend-prueba.git>