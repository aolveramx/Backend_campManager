const express = require('express')
const router = express.Router()
const filtering = require('../middleware/filtering')
const { protect, authorize } = require('../middleware/auth')
const Edition = require('../models/Edition')
const {
  getEditions,
  getEdition,
  createEdition,
  updateEdition,
  deleteEdition,
} = require('../controllers/editions')

router
  .route('/')
  .get(protect, authorize('admin'), filtering(Edition), getEditions)
  .post(protect, authorize('admin'), createEdition)

router
  .route('/:id')
  .get(protect, authorize('admin'), getEdition)
  .put(protect, authorize('admin'), updateEdition)
  .delete(protect, authorize('admin'), deleteEdition)

module.exports = router
