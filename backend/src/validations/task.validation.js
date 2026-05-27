const { z } = require('zod');

const taskSchema = z.object({
  titulo: z.string().min(3).max(150),
  descripcion: z.string().optional(),
  estado: z.enum(['pendiente', 'completada']).optional(),
  prioridad: z.enum(['alta', 'media', 'baja']),
});

const updateTaskSchema = taskSchema.partial().refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided',
});

module.exports = { taskSchema, updateTaskSchema };