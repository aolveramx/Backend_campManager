const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Nationality = require('../models/Nationality')

/**
 * @route   GET api/v1/nationalities
 * @desc    Get all nationalities
 * @access  Public
 */
exports.getNationalities = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filtering)
})

/**
 * @route   GET api/v1/nationalities/:id
 * @desc    Get single nationality
 * @access  Public
 */
exports.getNationality = asyncHandler(async (req, res, next) => {
  const nationality = await Nationality.findById(req.params.id)

  if (!nationality) {
    return next(
      new ErrorResponse(`Nationality not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: nationality })
})

/**
 * @route   POST api/v1/nationalities
 * @desc    Add new nationality
 * @access  Private
 * @role    admin
 */
exports.createNationality = asyncHandler(async (req, res, next) => {
  const nationality = await Nationality.create(req.body)
  res.status(201).json({ success: true, data: nationality })
})

/**
 * @route   UPDATE api/v1/nationalities/:id
 * @desc    Update new nationality
 * @access  Private
 * @role    admin
 */
exports.updateNationality = asyncHandler(async (req, res, next) => {
  const nationality = await Nationality.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!nationality) {
    return next(
      new ErrorResponse(`Nationality not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: nationality })
})

/**
 * @route   Delete api/v1/nationalities/:id
 * @desc    Delete nationality
 * @access  Private
 * @role    admin
 */
exports.deleteNationality = asyncHandler(async (req, res, next) => {
  const nationality = await Nationality.findByIdAndDelete(req.params.id)

  if (!nationality) {
    return next(
      new ErrorResponse(`Nationality not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true })
})
