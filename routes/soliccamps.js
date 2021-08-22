const express = require('express')
const router = express.Router()
const filtering = require('../middleware/filtering')
const { protect, authorize } = require('../middleware/auth')
const SolicCamp = require('../models/SolicCamp')
const {
  getSolicCamps,
  getSolicCamp,
  updateSolicCamp,
  deleteSolicCamp,
} = require('../controllers/soliccamps')

router
  .route('/')
  .get(protect, authorize('admin'), filtering(SolicCamp), getSolicCamps)

router
  .route('/:id')
  .get(protect, authorize('guest','helper','admin'), getSolicCamp)
  .put(protect, authorize('admin'), updateSolicCamp)
  .delete(protect, authorize('guest','helper','admin'), deleteSolicCamp)

module.exports = router
