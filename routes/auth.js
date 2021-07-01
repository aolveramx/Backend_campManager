const express = require('express')
const router = express.Router()

/**
 * @route   POST api/v1/auth/register
 * @desc    Auth user & get token
 * @access  Public
 */
router.post('/register', (req, res) => {
  res.send('Register user')
})

/**
 * @route   POST api/v1/auth/login
 * @desc    Auth user & get token
 * @access  Public
 */
router.post('/login', (req, res) => {
  res.send('Log in user')
})

/**
 * @route   GET api/v1/auth/me
 * @desc    Get current logged in user
 * @access  Private
 * @role    admin/guest/helper
 */
 router.get('/me', (req, res) => {
  res.send('Get current logged in user')
})

/**
 * @route   PUT api/v1/auth/:id/updatedetails
 * @desc    Update details
 * @access  Private
 * @role    admin/guest/helper
 */
 router.put('/:id/updatedetails', (req, res) => {
  res.send('Update details')
})

/**
 * @route   PUT api/v1/auth/updatepassword
 * @desc    Update password
 * @access  Private
 * @role    admin/guest/helper
 */
 router.put('/:id/updatepassword', (req, res) => {
  res.send('Update password')
})

/**
 * @route   POST api/v1/auth/forgotpassword
 * @desc    Forgot password
 * @access  Private
 * @role    admin/guest/helper
 */
 router.post('/forgotpassword', (req, res) => {
  res.send('Forgot password')
})

/**
 * @route   PUT api/v1/auth/:id/resettoken
 * @desc    Reset password
 * @access  Public
 */
 router.put('/:id/resettoken', (req, res) => {
  res.send('Reset password')
})

/**
 * @route   GET api/v1/auth/logout
 * @desc    Logout
 * @access  Privado
 * @role    admin/guest/helper
 */
 router.get('/logout', (req, res) => {
  res.send('Logout')
})

module.exports = router