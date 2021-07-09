const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')
const {
  register,
  login,
  getMe,
  updateInfo,
  updatePassword,
  forgotPassword,
  resetPassword,
  logout
} = require('../controllers/auth')

router
  .route('/register')
  .post(register)

router
  .route('/login')
  .post(login)

router
  .route('/me')
  .get(protect, getMe)

router
  .route('/:id/updateinfo')
  .put(updateInfo)

router
  .route('/:id/updatepassword')
  .put(updatePassword)

router
  .route('/forgotpassword')
  .post(forgotPassword)

router
  .route('/:id/resettoken')
  .put(resetPassword)

router
  .route('/logout')
  .get(logout)

module.exports = router