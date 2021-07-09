const express = require('express')
const router = express.Router()
const filtering = require('../middleware/filtering')
const { protect, authorize } = require('../middleware/auth')
const Camp = require('../models/Camp')
const {
  getCamps,
  getCamp,
  createCamp,
  updateCamp,
  deleteCamp,
} = require('../controllers/camps')

router
  .route('/')
  .get(filtering(Camp), getCamps)
  .post(protect, authorize('admin'), createCamp)

router
  .route('/:id')
  .get(getCamp)
  .put(protect, authorize('admin'), updateCamp)
  .delete(protect, authorize('admin'), deleteCamp)

module.exports = router