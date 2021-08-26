const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const SolicCamp = require('../models/SolicCamp')
const User = require('../models/User')
const Camp = require('../models/Camp')

/**
 * @route   GET api/v1/soliccamps
 * @desc    Get all soliccamps
 * @access  Private
 */
exports.getSolicCamps = asyncHandler(async (req, res, next) => {
  const solics = await SolicCamp.find()
  const data = [[],[],[]]
  solics.forEach(solic => {
    if(solic.status == 'pending'){
      data[0].push(solic)
    }else if(solic.status == 'accepted'){
      data[1].push(solic)
    }else{
      data[2].push(solic)
    }
  })
  res.status(200).json({ sucess: true, count: solics.length, data: data })
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
 * @route   PUT api/v1/soliccamps/:id
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
      new ErrorResponse(`SolicCamp not found with id ${req.params.id}`, 404)
    )
  }

  const user = await User.findById(soliccamp.person)
  const camp = await Camp.findById(soliccamp.camp)
  const index = user.campsRequested.indexOf(soliccamp.camp)

  if(req.body.status === 'accepted') {
    if(user.role === 'helper'){
      const index2 = camp.helpers.indexOf(soliccamp.person)
      camp.helpers.splice(index2,1)
      const confirmedHelpers = camp.confirmedHelpers.concat(soliccamp.person)
      const campUpdated = await Camp.findByIdAndUpdate(soliccamp.camp, {helpers: camp.helpers, confirmedHelpers: confirmedHelpers})
    } else if(user.role === 'guest') {
      const index2 = camp.guests.indexOf(soliccamp.person)
      camp.guests.splice(index2,1)
      const confirmedGuests = camp.confirmedGuests.concat(soliccamp.person)
      const campUpdated = await Camp.findByIdAndUpdate(soliccamp.camp, {guests: camp.guests, confirmedGuests: confirmedGuests})
    }
    
    if(index > -1) {
      user.campsRequested.splice(index,1)
      const campsConfirmed = user.campsConfirmed.concat(soliccamp.camp)
      const userUpdated = await User.findByIdAndUpdate(user.id, {campsRequested: user.campsRequested, campsConfirmed: campsConfirmed})
    } else {
      next(
        new ErrorResponse(`SolicCamp ${req.params.id} found but it does not appear on user camps`, 409)
      )
    }
  }

  if(req.body.status === 'rejected') {
    const index4 = user.campsConfirmed.indexOf(soliccamp.camp)

    if(user.role === 'helper'){
      const index2 = camp.helpers.indexOf(soliccamp.person)
      const index3 = camp.confirmedHelpers.indexOf(soliccamp.person)
      if (index2 > -1){
        camp.helpers.splice(index2,1)
      };
      if(index3 > -1){
        camp.confirmedHelpers.splice(index3,1)
      }
      camp.rejectedHelpers.push(soliccamp.person)
      const campUpdated = await Camp.findByIdAndUpdate(soliccamp.camp, {helpers: camp.helpers, confirmedHelpers: camp.confirmedHelpers, rejectedHelpers: camp.rejectedHelpers})
    } else if(user.role === 'guest') {
      const index2 = camp.guests.indexOf(soliccamp.person)
      const index3 = camp.confirmedGuests.indexOf(soliccamp.person)
      if (index2 > -1){
        camp.guests.splice(index2,1)
      }
      if(index3 > -1){
        camp.confirmedGuests.splice(index3,1)
      }
      camp.rejectedGuests.push(soliccamp.person)
      const campUpdated = await Camp.findByIdAndUpdate(soliccamp.camp, {guests: camp.guests, confirmedGuests: camp.confirmedGuests, rejectedGuests: camp.rejectedGuests})
    }

    if(index > -1){
      user.campsRequested.splice(index,1)
      user.campsRejected.push(soliccamp.camp)
      const userUpdated = await User.findByIdAndUpdate(user.id, {campsRequested: user.campsRequested, campsRejected: user.campsRejected})
    } else if(index4 > -1){
      user.campsConfirmed.splice(index4,1)
      user.campsRejected.push(soliccamp.camp)
      const userUpdated = await User.findByIdAndUpdate(user.id, {campsConfirmed: user.campsConfirmed, campsRejected: user.campsRejected})
    }
    else {
      next(
        new ErrorResponse(`SolicCamp ${req.params.id} found but it does not appear on user camps`, 409)
      )
    }
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

//There are some routes relates with solic status in:
//camps (/api/v1/camps/5d7a514b5d2c12c7449be011/solicStatus) - route for get an spefic solic status being helper o guest
//users (/api/v1/users/:id/solics) - route for get all the camps requested by an user being admin / helper / guest

