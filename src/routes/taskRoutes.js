import express from 'express';
import { createTask, getTasks, deleteTask } from '../controllers/taskController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', auth, createTask);
router.get('/', auth, getTasks);
router.delete('/:id', auth, deleteTask);

export default router;