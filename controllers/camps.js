const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Camp = require('../models/Camp')
const User = require('../models/User')
const SolicCamp = require('../models/SolicCamp')
const jwt = require('jsonwebtoken')

/**
 * @route   GET api/v1/camps
 * @desc    Get all camps
 * @access  Public
 */
exports.getCamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filtering)
})

/**
 * @route   GET api/v1/camps/:id
 * @desc    Get single camp
 * @access  Public
 */
exports.getCamp = asyncHandler(async (req, res, next) => {
  const camp = await Camp.findById(req.params.id)

  if (!camp) {
    return next(
      new ErrorResponse(`Camp not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: camp })
})

/**
 * @route   POST api/v1/camps
 * @desc    Add new camp
 * @access  Private
 * @role    admin
 */
exports.createCamp = asyncHandler(async (req, res, next) => {
  const camp = await Camp.create(req.body)
  res.status(201).json({ success: true, data: camp })
})

/**
 * @route   UPDATE api/v1/camps/:id
 * @desc    Update new camp
 * @access  Private
 * @role    admin
 */
exports.updateCamp = asyncHandler(async (req, res, next) => {
  const camp = await Camp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!camp) {
    return next(
      new ErrorResponse(`Camp not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: camp })
})

/**
 * @route   Delete api/v1/camps/:id
 * @desc    Delete camp
 * @access  Private
 * @role    admin
 */
exports.deleteCamp = asyncHandler(async (req, res, next) => {
  const camp = await Camp.findByIdAndDelete(req.params.id)

  if (!camp) {
    return next(
      new ErrorResponse(`Camp not found with id of ${req.params.id}`, 404)
    )
  
  }
})


/**
 * @route   PUT api/v1/camps/:id/subscribeCamp
 * @desc    subscribeCamp
 * @access  Private
 * @role    helper/guest
 */
exports.subscribeCamp = asyncHandler(async (req, res, next) => {
  const camp = await Camp.findById(req.params.id)

  const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
  const user = await User.findById(decoded.id)

  if(!camp) {
    return next(
      new ErrorResponse(`Camp not found with id of ${req.params.id}`, 404)
    )
  }

  if(user.role === 'helper'){
    if(camp.helpers.includes(user._id) || camp.confirmedHelpers.includes(user._id)){
      res.status(429).json({ success:false, data:`You have already requested for the camp: ${camp.name}`})
    } else {
      await Camp.findByIdAndUpdate(req.params.id, {helpers: camp.helpers.concat(user._id), inPeople: camp.helpers.length} )
      await User.findByIdAndUpdate(user._id, {campsRequested: user.campsRequested.concat(req.params.id)})
      // await SolicCamp.create({camp: req.params.id, person: user._id, role: user.role})
      res.status(200).json({ success: true, data:camp.helpers, data:user.campsRequested })
    }
  } else if(user.role === 'guest') {
    if(camp.guests.includes(user._id) || camp.confirmedGuests.includes(user._id)){
      res.status(429).json({ success:false, data:`You have already requested for the camp: ${camp.name}`})
    } else {
      await Camp.findByIdAndUpdate(req.params.id, {guests: camp.guests.concat(user._id), inPeople: camp.helpers.length} )
      await User.findByIdAndUpdate(user._id, {campsRequested: user.campsRequested.concat(req.params.id)})
      // await SolicCamp.create({camp: req.params.id, person: user._id, role: user.role})
      res.status(200).json({ success: true, data:camp.guests, data:user.campsRequested })
    }
  
  }
})

/**
 * @route   PUT api/v1/camps/:id/unSubscribeCamp
 * @desc    unSubscribeCamp
 * @access  Private
 * @role    helper/guest
 */
 exports.unsubscribeCamp = asyncHandler(async (req, res, next) => {
  const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
  const userID = decoded.id
  const user = await User.findOne({ _id: userID})

  const campID = req.params.id
  const camp = await Camp.findOne({ _id: campID})

  if(!camp) {
    console.log('campamento sangriento')
    return next(
      new ErrorResponse(`Camp not found with id of ${req.params.id}`, 404)
    )
  }

  if(user.role === 'helper'){
    try{
      const indexCampHelper = camp.helpers.indexOf(user._id)
      const indexCampHelperConfirmed = camp.confirmedHelpers.indexOf(user._id)
      const indexUserRequested = user.campsRequested.indexOf(req.params.id)
      const indexUserConfirmed = user.campsConfirmed.indexOf(req.params.id)


      if(indexCampHelper > -1){
        camp.helpers.splice(indexCampHelper, 1)
        await camp.save()
      } else if(indexCampHelperConfirmed > -1){
        camp.confirmedHelpers.splice(indexCampHelperConfirmed, 1)
        await camp.save()
      }

      if(indexUserRequested > -1){
        user.campsRequested.splice(indexUserRequested, 1)
        await user.save()
      } else if(indexUserConfirmed > -1){
        user.campsConfirmed.splice(indexUserConfirmed, 1)
        await user.save()
      }

      res.status(200).json({ success: true, data: {} })

    } catch(error) {
      return next(
        new ErrorResponse(error.message, 404)
      )
    }

  } else if(user.role === 'guest') {
    try{
      const indexCampGuest = camp.guests.indexOf(user._id)
      const indexCampGuestConfirmed = camp.confirmedGuests.indexOf(user._id)
      const indexUserRequested = user.campsRequested.indexOf(req.params.id)
      const indexUserConfirmed = user.campsConfirmed.indexOf(req.params.id)

      if(indexCampGuest > -1){
        camp.guests.splice(indexCampGuest, 1)
        await camp.save()
      } else if(indexCampGuestConfirmed > -1){
        camp.confirmedGuests.splice(indexCampGuestConfirmed, 1)
        await camp.save()
      }

      if(indexUserRequested > -1){
        user.campsRequested.splice(indexUserRequested, 1)
        await user.save()
      } else if (indexUserConfirmed > -1) {
        user.campsConfirmed.splice(indexUserConfirmed, 1)
        await user.save()
      }

      res.status(200).json({ success: true, data: {} })

    }catch(error){
      return next(
        new ErrorResponse(error.message, 404)
      )
    }
  } //else {
    //res.status(200).json({ success: true, data:"something was wrong"})
  //}
})

