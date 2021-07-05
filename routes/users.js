const express = require('express')
const { 
  getUsers, 
  getUser, 
  createUser, 
  updateUser, 
  updateUserPhoto, 
  deleteUser 
} = require('../controllers/users')
const router = express.Router()

router
  .route('/')
  .get(getUsers)
  .post(createUser)

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)

router
  .route('/:id/photo')
  .put(updateUserPhoto)

module.exports = router