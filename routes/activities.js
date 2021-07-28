const express = require('express')
const router = express.Router()
const filtering = require('../middleware/filtering')
const { protect, authorize } = require('../middleware/auth')
const Activity = require('../models/Activity')
const {
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
} = require('../controllers/activities')

router
  .route('/')
  .get(protect, authorize('admin'), filtering(Activity), getActivities)
  .post(protect, authorize('admin'), createActivity)

router
  .route('/:id')
  .get(protect, authorize('admin'), getActivity)
  .put(protect, authorize('admin'), updateActivity)
  .delete(protect, authorize('admin'), deleteActivity)

module.exports = router
