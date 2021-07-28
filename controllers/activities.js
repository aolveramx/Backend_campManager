const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Activity = require('../models/Activity')

/**
 * @route   GET api/v1/activities
 * @desc    Get all activities
 * @access  Public
 */
exports.getActivities = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filtering)
})

/**
 * @route   GET api/v1/activities/:id
 * @desc    Get single activity
 * @access  Public
 */
exports.getActivity = asyncHandler(async (req, res, next) => {
  const activity = await Activity.findById(req.params.id)

  if (!activity) {
    return next(
      new ErrorResponse(`Activity not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: activity })
})

/**
 * @route   POST api/v1/activities
 * @desc    Add new activity
 * @access  Private
 * @role    admin
 */
exports.createActivity = asyncHandler(async (req, res, next) => {
  const activity = await Activity.create(req.body)
  res.status(201).json({ success: true, data: activity })
})

/**
 * @route   UPDATE api/v1/activities/:id
 * @desc    Update new activity
 * @access  Private
 * @role    admin
 */
exports.updateActivity = asyncHandler(async (req, res, next) => {
  const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!activity) {
    return next(
      new ErrorResponse(`Activity not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: activity })
})

/**
 * @route   Delete api/v1/activities/:id
 * @desc    Delete activity
 * @access  Private
 * @role    admin
 */
exports.deleteActivity = asyncHandler(async (req, res, next) => {
  const activity = await Activity.findByIdAndDelete(req.params.id)

  if (!activity) {
    return next(
      new ErrorResponse(`Activity not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true })
})
