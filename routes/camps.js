const express = require('express')
const router = express.Router()
const filtering = require('../middleware/filtering')
const { protect, authorize } = require('../middleware/auth')
const Camp = require('../models/Camp')
const {
  getCamps,
  getCamp,
  getCampsNoPagination,
  createCamp,
  updateCamp,
  deleteCamp,
  subscribeCamp,
  unsubscribeCamp,
} = require('../controllers/camps')

router
  .route('/')
  .get(filtering(Camp), getCamps)
  .post(protect, authorize('admin'), createCamp)

router
  .route('/nopagination')
  .get(getCampsNoPagination)

router
  .route('/:id')
  .get(getCamp)
  .put(protect, authorize('admin'), updateCamp)
  .delete(protect, authorize('admin'), deleteCamp)

router
  .route('/:id/subscribe')
  .put(protect, authorize('guest','helper'), subscribeCamp)

router
  .route('/:id/unsubscribe')
  .put(protect, authorize('guest','helper'), unsubscribeCamp)
module.exports = router
