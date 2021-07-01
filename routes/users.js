const express = require('express')
const router = express.Router()

/**
 * @route   GET api/v1/auth/users
 * @desc    Get all users
 * @access  Private
 * @role    admin
 */
 router.get('/', (req, res) => {
  res.send('Get all users')
})

/**
 * @route   GET api/v1/users/:id
 * @desc    Get single user
 * @access  Private
 * @role    admin/guest/helper
 */
 router.get('/:id', (req, res) => {
  res.send('Get single user')
})

/**
 * @route   POST api/v1/users
 * @desc    Register a user
 * @access  Public
 * @role    admin/guest/helper
 */
router.post('/', (req, res) => {
  res.send('Register a user')
})

/**
 * @route   PUT api/v1/users/:id
 * @desc    Update user
 * @access  Private
 * @role    admin/guest/helper
 */
 router.put('/:id', (req, res) => {
  res.send('Update a user')
})

/**
 * @route   DELETE api/v1/users/:id
 * @desc    Delete a user
 * @access  Private
 * @role    admin/guest/helper
 */
router.delete('/:id', (req, res) => {
  res.send('Delete a user')
})

module.exports = router