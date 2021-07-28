const express = require('express')
const router = express.Router()
const filtering = require('../middleware/filtering')
const { protect, authorize } = require('../middleware/auth')
const PositionStaff = require('../models/PositionStaff')
const {
  getPositionsStaff,
  getPositionStaff,
  createPositionStaff,
  updatePositionStaff,
  deletePositionStaff,
} = require('../controllers/positionsstaff')

router
  .route('/')
  .get(protect, authorize('admin'), filtering(PositionStaff), getPositionsStaff)
  .post(protect, authorize('admin'), createPositionStaff)

router
  .route('/:id')
  .get(protect, authorize('admin'), getPositionStaff)
  .put(protect, authorize('admin'), updatePositionStaff)
  .delete(protect, authorize('admin'), deletePositionStaff)

module.exports = router
