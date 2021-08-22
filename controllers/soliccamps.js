const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const SolicCamp = require('../models/SolicCamp')

/**
 * @route   GET api/v1/soliccamps
 * @desc    Get all soliccamps
 * @access  Private
 */
exports.getSolicCamps = asyncHandler(async (req, res, next) => {
  const solics = await SolicCamp.find()
  res.status(200).json({ sucess: true, count: solics.length, data: solics })
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
  const soliccamp = await SolicCamp.findById(req.params.id)
  console.log(req,'req.body')
  if(req.body.status){
    soliccamp.status = req.body.status;
    console.log(req.body.status,typeof(req.body.status))
  }
  const solicCampModifyed = await SolicCamp.findByIdAndUpdate(req.params.id,{ status: req.status})
  console.log(solicCampModifyed)

  if (!soliccamp) {
    return next(
      new ErrorResponse(`SolicCamp not found with id ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: solicCampModifyed })
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

//There are some routes relates with solic status in:
//camps (/api/v1/camps/5d7a514b5d2c12c7449be011/solicStatus) - route for get an spefic solic status being helper o guest
//users (/api/v1/users/:id/solics) - route for get all the camps requested by an user being admin / helper / guest

