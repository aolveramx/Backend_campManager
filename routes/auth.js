const express = require('express')
const {
  register,
  login,
  me,
  updateInfo,
  updatePassword,
  forgotPassword,
  resetPassword,
  logout
} = require('../controllers/auth')
const router = express.Router()

router
  .route('/register')
  .post(register)

router
  .route('/login')
  .post(login)

router
  .route('/me')
  .get(me)

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