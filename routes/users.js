const express = require('express')
const updateUserMiddleware = require('../middleware/updateUser.js')
const User = require('../_data/users.json')
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
  .put(updateUserMiddleware(User), updateUser)
  .delete(deleteUser)

module.exports = router