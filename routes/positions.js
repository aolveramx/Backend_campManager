const express = require('express')
const router = express.Router()
const filtering = require('../middleware/filtering')
const { protect, authorize } = require('../middleware/auth')
const Position = require('../models/Position')
const {
  getPositions,
  getPosition,
  createPosition,
  updatePosition,
  deletePosition,
} = require('../controllers/positions')

router
  .route('/')
  .get(protect, authorize('admin'), filtering(Position), getPositions)
  .post(protect, authorize('admin'), createPosition)

router
  .route('/:id')
  .get(protect, authorize('admin'), getPosition)
  .put(protect, authorize('admin'), updatePosition)
  .delete(protect, authorize('admin'), deletePosition)

module.exports = router
