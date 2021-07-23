const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Position = require('../models/Position')

/**
 * @route   GET api/v1/positions
 * @desc    Get all positions
 * @access  Public
 */
exports.getPositions = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filtering)
})

/**
 * @route   GET api/v1/positions/:id
 * @desc    Get single position
 * @access  Public
 */
exports.getPosition = asyncHandler(async (req, res, next) => {
  const position = await Position.findById(req.params.id)

  if (!position) {
    return next(
      new ErrorResponse(`Position not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: position })
})

/**
 * @route   POST api/v1/positions
 * @desc    Add new position
 * @access  Private
 * @role    admin
 */
exports.createPosition = asyncHandler(async (req, res, next) => {
  const position = await Position.create(req.body)
  res.status(201).json({ success: true, data: position })
})

/**
 * @route   UPDATE api/v1/positions/:id
 * @desc    Update new position
 * @access  Private
 * @role    admin
 */
exports.updatePosition = asyncHandler(async (req, res, next) => {
  const position = await Position.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!position) {
    return next(
      new ErrorResponse(`Position not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: position })
})

/**
 * @route   Delete api/v1/positions/:id
 * @desc    Delete position
 * @access  Private
 * @role    admin
 */
exports.deletePosition = asyncHandler(async (req, res, next) => {
  const position = await Position.findByIdAndDelete(req.params.id)

  if (!position) {
    return next(
      new ErrorResponse(`Position not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true })
})
