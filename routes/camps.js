const express = require('express')
const router = express.Router()
const filtering = require('../middleware/filtering')
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
  .post(createCamp)

router
  .route('/:id')
  .get(getCamp)
  .put(updateCamp)
  .delete(deleteCamp)

module.exports = router