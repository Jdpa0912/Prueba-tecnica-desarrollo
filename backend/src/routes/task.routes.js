const express = require('express');
const { create, list, update, remove, softDelete } = require('../controllers/task.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { taskSchema, updateTaskSchema } = require('../validations/task.validation');

const router = express.Router();

router.use(authenticate);
router.post('/', validate(taskSchema), create);
router.get('/', list);
router.put('/:id', validate(updateTaskSchema), update);
router.put('/:id/delete', softDelete);
router.delete('/:id', remove);

module.exports = router;
