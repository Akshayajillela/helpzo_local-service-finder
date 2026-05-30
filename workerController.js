const express = require('express');
const router = express.Router();
const {
  getWorkers,
  getWorkerById,
  createWorker,
  updateWorker,
  deleteWorker,
  seedWorkers,
} = require('../controllers/workerController');
const { protect } = require('../middleware/authMiddleware');

// GET /api/workers - public
router.get('/', getWorkers);

// POST /api/workers/seed - seed sample data (dev use)
router.post('/seed', seedWorkers);

// GET /api/workers/:id - public
router.get('/:id', getWorkerById);

// POST /api/workers - protected
router.post('/', protect, createWorker);

// PUT /api/workers/:id - protected
router.put('/:id', protect, updateWorker);

// DELETE /api/workers/:id - protected
router.delete('/:id', protect, deleteWorker);

module.exports = router;
