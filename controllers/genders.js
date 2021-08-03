const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Gender = require('../models/Gender')

/**
 * @route   GET api/v1/genders
 * @desc    Get all genders
 * @access  Public
 */
exports.getGenders = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filtering)
})

/**
 * @route   GET api/v1/genders/:id
 * @desc    Get single gender
 * @access  Public
 */
exports.getGender = asyncHandler(async (req, res, next) => {
  const gender = await Gender.findById(req.params.id)

  if (!gender) {
    return next(
      new ErrorResponse(`Gender not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: gender })
})

/**
 * @route   POST api/v1/genders
 * @desc    Add new gender
 * @access  Private
 * @role    admin
 */
exports.createGender = asyncHandler(async (req, res, next) => {
  const gender = await Gender.create(req.body)
  res.status(201).json({ success: true, data: gender })
})

/**
 * @route   UPDATE api/v1/genders/:id
 * @desc    Update new gender
 * @access  Private
 * @role    admin
 */
exports.updateGender = asyncHandler(async (req, res, next) => {
  const gender = await Gender.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!gender) {
    return next(
      new ErrorResponse(`Gender not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: gender })
})

/**
 * @route   Delete api/v1/genders/:id
 * @desc    Delete gender
 * @access  Private
 * @role    admin
 */
exports.deleteGender = asyncHandler(async (req, res, next) => {
  const gender = await Gender.findByIdAndDelete(req.params.id)

  if (!gender) {
    return next(
      new ErrorResponse(`Gender not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true })
})
