const express = require('express')
const router = express.Router()

/**
 * @route   GET api/v1/camps
 * @desc    Get all camps
 * @access  Public
 */
router.get('/', (req, res) => {
  res.send('Get all camps')
})

/**
 * @route   GET api/v1/camps/:id
 * @desc    Get single camp
 * @access  Public
 */
router.get('/:id', (req, res) => {
  res.send('Get single camp')
})

/**
 * @route   POST api/v1/camps
 * @desc    Add new camp
 * @access  Private
 * @role    admin
 */
router.post('/', (req, res) => {
  res.send('Add camp')
})

/**
 * @route   UPDATE api/v1/camps/:id
 * @desc    Update new camp
 * @access  Private
 * @role    admin
 */
 router.put('/:id', (req, res) => {
  res.send('Update camp')
})

/**
 * @route   UPDATE api/v1/camps/:id/photo
 * @desc    Update photo for camp
 * @access  Private
 * @role    admin
 */
 router.put('/:id/photo', (req, res) => {
  res.send('Update photo for camp')
})

/**
 * @route   Delete api/v1/camps/:id
 * @desc    Delete camp
 * @access  Private
 * @role    admin
 */
 router.delete('/:id', (req, res) => {
  res.send('Delete camp')
})


module.exports = router