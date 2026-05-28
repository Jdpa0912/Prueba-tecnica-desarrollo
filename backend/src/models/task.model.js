const pool = require('../config/db');

const createTask = async (userId, { titulo, descripcion, prioridad, estado = 'pendiente' }) => {
  const result = await pool.query(
    `INSERT INTO tasks (titulo, descripcion, prioridad, estado, user_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, titulo, descripcion, estado, prioridad, created_at, user_id`,
    [titulo, descripcion || null, prioridad, estado, userId]
  );
  return result.rows[0];
};

const getTasksByUser = async (userId) => {
  const result = await pool.query(
    `SELECT id, titulo, descripcion, estado, prioridad, created_at, user_id
     FROM tasks
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

const updateTask = async (taskId, userId, updates) => {
  const allowedFields = ['titulo', 'descripcion', 'estado', 'prioridad'];
  const entries = Object.entries(updates).filter(([key]) => allowedFields.includes(key));

  if (entries.length === 0) {
    return null;
  }

  const setClauses = entries.map(([key], index) => `${key} = $${index + 1}`);
  const values = entries.map(([, value]) => value);

  values.push(taskId, userId);

  const result = await pool.query(
    `UPDATE tasks
     SET ${setClauses.join(', ')}
     WHERE id = $${entries.length + 1} AND user_id = $${entries.length + 2}
     RETURNING id, titulo, descripcion, estado, prioridad, created_at, user_id`,
    values
  );

  return result.rows[0] || null;
};

const deleteTask = async (taskId, userId) => {
  const result = await pool.query(
    'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING id',
    [taskId, userId]
  );

  return result.rows.length > 0;
};

const softDeleteTask = async (taskId, userId) => {
  const result = await pool.query(
    `UPDATE tasks
     SET deleted_at = NOW()
     WHERE id = $1
       AND user_id = $2
       AND deleted_at IS NULL
     RETURNING id`,
    [taskId, userId]
  );
  return result.rows.length > 0;
};

module.exports = {
  createTask,
  getTasksByUser,
  updateTask,
  deleteTask,
  softDeleteTask
};
