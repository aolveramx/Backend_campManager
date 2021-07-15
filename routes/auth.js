const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')
const {
  register,
  login,
  getMe,
  logout,
  updateInfo,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth')

router.route('/register').post(register)

router.route('/login').post(login)

router.route('/me').get(protect, getMe)

router.route('/logout').get(logout)

router.route('/:id/updateinfo').put(updateInfo)

router.route('/forgotpassword').post(forgotPassword)

router.route('/resetpassword/:resettoken').put(resetPassword)

module.exports = router
