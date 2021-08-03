const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const PositionStaff = require('../models/PositionStaff')

/**
 * @route   GET api/v1/positionsstaff
 * @desc    Get all positionsstaff
 * @access  Public
 */
exports.getPositionsStaff = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filtering)
})

/**
 * @route   GET api/v1/positionsstaff/:id
 * @desc    Get single positionstaff
 * @access  Public
 */
exports.getPositionStaff = asyncHandler(async (req, res, next) => {
  const positionstaff = await PositionStaff.findById(req.params.id)

  if (!positionstaff) {
    return next(
      new ErrorResponse(`PositionStaff not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: positionstaff })
})

/**
 * @route   POST api/v1/positionsstaff
 * @desc    Add new positionstaff
 * @access  Private
 * @role    admin
 */
exports.createPositionStaff = asyncHandler(async (req, res, next) => {
  const positionstaff = await PositionStaff.create(req.body)
  res.status(201).json({ success: true, data: positionstaff })
})

/**
 * @route   UPDATE api/v1/positionsstaff/:id
 * @desc    Update new positionstaff
 * @access  Private
 * @role    admin
 */
exports.updatePositionStaff = asyncHandler(async (req, res, next) => {
  const positionstaff = await PositionStaff.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!positionstaff) {
    return next(
      new ErrorResponse(`PositionStaff not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: positionstaff })
})

/**
 * @route   Delete api/v1/positionsstaff/:id
 * @desc    Delete positionstaff
 * @access  Private
 * @role    admin
 */
exports.deletePositionStaff = asyncHandler(async (req, res, next) => {
  const positionstaff = await PositionStaff.findByIdAndDelete(req.params.id)

  if (!positionstaff) {
    return next(
      new ErrorResponse(`PositionStaffstaff not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true })
})
