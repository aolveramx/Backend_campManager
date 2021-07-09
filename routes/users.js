const express = require('express')
const router = express.Router()
const { protect, authorize } = require('../middleware/auth')
const { 
  getUsers, 
  getUser,
  updateUser, 
  updateUserPhoto, 
  deleteMyAccount 
} = require('../controllers/users')

router
  .route('/')
  .get(protect, authorize('admin'), getUsers)

router
  .route('/:id')
  .get(protect, authorize('admin'), getUser)
  .put(protect, authorize('admin'), updateUser)
  .delete(deleteMyAccount)

module.exports = router