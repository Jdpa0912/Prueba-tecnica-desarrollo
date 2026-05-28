const taskService = require('../services/task.service');

const create = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.user.userId, req.body);
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const tasks = await taskService.getTasksByUser(req.user.userId);
    res.json({ success: true, data: tasks });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.user.userId, req.body);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    res.json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const deleted = await taskService.deleteTask(req.params.id, req.user.userId);
    if (!deleted) return res.status(404).json({ success: false, message: 'Task not found' });
    res.json({ success: true, message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};

const softDelete = async (req, res, next) => {
  try {
    const deleted = await taskService.softDeleteTask(req.params.id, req.user.userId);
    if (!deleted) return res.status(404).json({ success: false, message: 'Task not found' });
    res.json({ success: true, message: 'Task marked as deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { create, list, update, remove, softDelete };