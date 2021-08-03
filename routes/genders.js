const express = require('express')
const router = express.Router()
const filtering = require('../middleware/filtering')
const { protect, authorize } = require('../middleware/auth')
const Gender = require('../models/Gender')
const {
  getGenders,
  getGender,
  createGender,
  updateGender,
  deleteGender,
} = require('../controllers/genders')

router
  .route('/')
  .get(protect, authorize('admin'), filtering(Gender), getGenders)
  .post(protect, authorize('admin'), createGender)

router
  .route('/:id')
  .get(protect, authorize('admin'), getGender)
  .put(protect, authorize('admin'), updateGender)
  .delete(protect, authorize('admin'), deleteGender)

module.exports = router
