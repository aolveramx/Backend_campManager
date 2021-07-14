const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Camp = require('../models/Camp')

/**
 * @route   GET api/v1/camps
 * @desc    Get all camps
 * @access  Public
 */
exports.getCamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filtering)
})

/**
 * @route   GET api/v1/camps/:id
 * @desc    Get single camp
 * @access  Public
 */
exports.getCamp = asyncHandler(async (req, res, next) => {
  const camp = await Camp.findById(req.params.id)

  if (!camp) {
    return next(
      new ErrorResponse(`Camp not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: camp })
})

/**
 * @route   POST api/v1/camps
 * @desc    Add new camp
 * @access  Private
 * @role    admin
 */
exports.createCamp = asyncHandler(async (req, res, next) => {
  const camp = await Camp.create(req.body)
  res.status(201).json({ success: true, data: camp })
})

/**
 * @route   UPDATE api/v1/camps/:id
 * @desc    Update new camp
 * @access  Private
 * @role    admin
 */
exports.updateCamp = asyncHandler(async (req, res, next) => {
  const camp = await Camp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!camp) {
    return next(
      new ErrorResponse(`Camp not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: camp })
})

/**
 * @route   Delete api/v1/camps/:id
 * @desc    Delete camp
 * @access  Private
 * @role    admin
 */
exports.deleteCamp = asyncHandler(async (req, res, next) => {
  const camp = await Camp.findByIdAndDelete(req.params.id)

  if (!camp) {
    return next(
      new ErrorResponse(`Camp not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true })
})
