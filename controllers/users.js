const path = require('path')
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
 * @role    admin/guest/helper
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  
  if(req.user.role === 'helper' || req.user.role === 'guest') {
    if(req.user.role !== req.params.id) {
      return next(
        new ErrorResponse('You are not authorized to modify other users information', 401)
      )
    }
  }

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    )
  }


  res.status(200).json({ success: true, data: user })
})

/**
 * @route   PUT api/v1/users/:id/photo
 * @desc    Update user photo
 * @access  Private
 * @role    admin/guest/helper
 */
exports.userPhotoUpload = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    )
  }

  if (!req.files) {
    return next(new ErrorResponse(`Upload a photo`, 400))
  }

  const file = req.files.file

  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Upload an image file`, 400))
  }

  if (file.size > process.env.MAX_PHOTO_UPLOAD) {
    return next(
      new ErrorResponse(
        `Upload an image file less than ${process.env.MAX_PHOTO_UPLOAD}`,
        400
      )
    )
  }

  file.name = `photo_${user._id}${path.parse(file.name).ext}`

  file.mv(`${process.env.USER_PHOTO_UPLOAD}/${file.name}`, async error => {
    if (error) {
      console.log(error)
      return next(new ErrorResponse(`Problem with file upload`, 500))
    }

    await User.findByIdAndUpdate(req.params.id, { photo: file.name })

    res.status(200).json({
      success: true,
      data: file.name,
    })
  })
})

/**
 * @route   PUT api/v1/users/:id/cv
 * @desc    Update user curriculum
 * @access  Private
 * @role    admin/guest/helper
 */
exports.userCvUpload = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    )
  }

  if (!req.files) {
    return next(new ErrorResponse(`Upload a file`, 400))
  }

  console.log(req.files)

  const file = req.files.file

  if (!file.mimetype.startsWith('application/pdf')) {
    return next(new ErrorResponse(`Upload a .PDF file`, 400))
  }

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Upload a .PDF file less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    )
  }

  file.name = `CV_${user._id}${path.parse(file.name).ext}`

  file.mv(`${process.env.USER_FILE_UPLOAD}/${file.name}`, async error => {
    if (error) {
      console.log(error)
      return next(new ErrorResponse(`Problem with file upload`, 500))
    }

    await User.findByIdAndUpdate(req.params.id, { cv: file.name })

    res.status(200).json({
      success: true,
      data: file.name,
    })
  })
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
