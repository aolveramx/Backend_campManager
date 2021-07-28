const express = require('express')
const router = express.Router()
const filtering = require('../middleware/filtering')
const { protect, authorize } = require('../middleware/auth')
const Nationality = require('../models/Nationality')
const {
  getNationalities,
  getNationality,
  createNationality,
  updateNationality,
  deleteNationality,
} = require('../controllers/nationalities')

router
  .route('/')
  .get(protect, authorize('admin'), filtering(Nationality), getNationalities)
  .post(protect, authorize('admin'), createNationality)

router
  .route('/:id')
  .get(protect, authorize('admin'), getNationality)
  .put(protect, authorize('admin'), updateNationality)
  .delete(protect, authorize('admin'), deleteNationality)

module.exports = router
