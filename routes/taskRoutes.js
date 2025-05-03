const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', taskController.listTasks);
router.get('/new', taskController.getCreateForm);
router.post('/new', taskController.createTask);
router.get('/:id', taskController.getTask);
router.get('/:id/edit', taskController.getEditForm);
router.post('/:id/edit', taskController.updateTask);
router.post('/:id/delete', taskController.deleteTask);

module.exports = router;