const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')

/**
 * @route   GET api/v1/auth/users
 * @desc    Get all users
 * @access  Private
 * @role    admin
 */
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find()
  res.status(200).json({ sucess: true, count: users.length, data: users })
})

/**
 * @route   GET api/v1/auth/users
 * @desc    Get single user
 * @access  Private
 * @role    admin
 */
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ sucess: true, data: user })
})

/**
 * @route   PUT api/v1/users/:id
 * @desc    Update user
 * @access  Private
 * @role    admin
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: user })
})

/**
 * @route   DELETE api/v1/users/:id
 * @desc    Delete a user
 * @access  Private
 * @role    admin/guest/helper
 */
exports.deleteMyAccount = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id)

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: {} })
})