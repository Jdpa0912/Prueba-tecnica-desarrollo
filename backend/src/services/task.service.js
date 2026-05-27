const taskModel = require('../models/task.model');

const createTask = (userId, payload) => taskModel.createTask(userId, payload);
const getTasksByUser = (userId) => taskModel.getTasksByUser(userId);
const updateTask = (taskId, userId, updates) => taskModel.updateTask(taskId, userId, updates);
const deleteTask = (taskId, userId) => taskModel.deleteTask(taskId, userId);

module.exports = { createTask, getTasksByUser, updateTask, deleteTask };
