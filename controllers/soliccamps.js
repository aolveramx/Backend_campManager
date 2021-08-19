const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const SolicCamp = require('../models/SolicCamp')

/**
 * @route   GET api/v1/soliccamps
 * @desc    Get all soliccamps
 * @access  Private
 */
exports.getSolicCamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filtering)
})

/**
 * @route   GET api/v1/soliccamps/:id
 * @desc    Get single soliccamps
 * @access  Private
 */
exports.getSolicCamp = asyncHandler(async (req, res, next) => {
  const soliccamp = await SolicCamp.findById(req.params.id)

  if (!soliccamp) {
    return next(
      new ErrorResponse(`SolicCamp not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: soliccamp })
})

/**
 * @route   POST api/v1/soliccamps
 * @desc    Add new soliccamp
 * @access  Private
 * @role    admin
 */
exports.createSolicCamp = asyncHandler(async (req, res, next) => {
  const soliccamp = await SolicCamp.create(req.body)
  res.status(201).json({ success: true, data: soliccamp })
})

/**
 * @route   UPDATE api/v1/soliccamps/:id
 * @desc    Update new soliccamp
 * @access  Private
 * @role    admin
 */
exports.updateSolicCamp = asyncHandler(async (req, res, next) => {
  const soliccamp = await SolicCamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!soliccamp) {
    return next(
      new ErrorResponse(`SolicCamp not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: soliccamp })
})

/**
 * @route   Delete api/v1/soliccamps/:id
 * @desc    Delete soliccamp
 * @access  Private
 * @role    admin
 */
exports.deleteSolicCamp = asyncHandler(async (req, res, next) => {
  const soliccamp = await SolicCamp.findByIdAndDelete(req.params.id)

  if (!soliccamp) {
    return next(
      new ErrorResponse(`SolicCamp not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true })
})
