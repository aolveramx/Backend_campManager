const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Edition = require('../models/Edition')

/**
 * @route   GET api/v1/editions
 * @desc    Get all editions
 * @access  Public
 */
exports.getEditions = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filtering)
})

/**
 * @route   GET api/v1/editions/:id
 * @desc    Get single edition
 * @access  Public
 */
exports.getEdition = asyncHandler(async (req, res, next) => {
  const edition = await Edition.findById(req.params.id)

  if (!edition) {
    return next(
      new ErrorResponse(`Edition not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: edition })
})

/**
 * @route   POST api/v1/editions
 * @desc    Add new edition
 * @access  Private
 * @role    admin
 */
exports.createEdition = asyncHandler(async (req, res, next) => {
  const edition = await Edition.create(req.body)
  res.status(201).json({ success: true, data: edition })
})

/**
 * @route   UPDATE api/v1/editions/:id
 * @desc    Update new edition
 * @access  Private
 * @role    admin
 */
exports.updateEdition = asyncHandler(async (req, res, next) => {
  const edition = await Edition.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!edition) {
    return next(
      new ErrorResponse(`Edition not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: edition })
})

/**
 * @route   Delete api/v1/editions/:id
 * @desc    Delete edition
 * @access  Private
 * @role    admin
 */
exports.deleteEdition = asyncHandler(async (req, res, next) => {
  const edition = await Edition.findByIdAndDelete(req.params.id)

  if (!edition) {
    return next(
      new ErrorResponse(`Edition not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true })
})
