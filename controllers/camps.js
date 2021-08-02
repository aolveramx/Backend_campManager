const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Camp = require('../models/Camp')
const User = require('../models/User')
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
  reqUser = await User.findById(decoded.id)

  if(!camp) {
    return next(
      new ErrorResponse(`Camp not found with id of ${req.params.id}`, 404)
    )
  }

  if(reqUser.role === 'helper'){
    if(camp.helpers.includes(reqUser._id) || camp.confirmedHelpers.includes(reqUser._id)){
      res.status(429).json({ success:false, data:`You have already requested for the camp: ${camp.name}`})
    } else {
      await Camp.findByIdAndUpdate(req.params.id, {helpers: camp.helpers.concat(reqUser._id), inPeople: camp.helpers.length} )
      await User.findByIdAndUpdate(reqUser._id, {campsRequested: reqUser.campsRequested.concat(req.params.id)})
      res.status(200).json({ success: true, data:camp.helpers, data:reqUser.campsRequested })
    }
  } else if(reqUser.role === 'guest') {
    if(camp.guests.includes(reqUser._id) || camp.confirmedGuests.includes(reqUser._id)){
      res.status(429).json({ success:false, data:`You have already requested for the camp: ${camp.name}`})
    } else {
      await Camp.findByIdAndUpdate(req.params.id, {guests: camp.guests.concat(reqUser._id), inPeople: camp.helpers.length} )
      await User.findByIdAndUpdate(reqUser._id, {campsRequested: reqUser.campsRequested.concat(req.params.id)})
      res.status(200).json({ success: true, data:camp.guests, data:reqUser.campsRequested })
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
  const camp = await Camp.findById(req.params.id)

  const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
  reqUser = await User.findById(decoded.id)

  //const campNotRequested = camp.helpers.includes(reqUser._id) || camp.confirmedHelpers.includes(reqUser._id) || camp.guests.includes(reqUser._id) || camp.confirmedGuests.includes(reqUser._id)
  
  if(!camp) {
    return next(
      new ErrorResponse(`Camp not found with id of ${req.params.id}`, 404)
    )
  }

  if(reqUser.role === 'helper'){
    // console.log(camp.helpers.indexOf(reqUser._id))
    // console.log(camp.helpers,'camp.helpers')
    // console.log(reqUser._id,'reqUser._id')
    // console.log(reqUser.campsRequested.indexOf(req.params.id))
    // console.log(reqUser.campsRequested,'reqUser.capsRequested')
    // console.log(req.params.id,'req.params.id')

    if(camp.helpers.indexOf(reqUser._id) > -1 && reqUser.campsRequested.indexOf(req.params.id) > -1){
      await Camp.findByIdAndUpdate(req.params.id, {helpers: camp.helpers.splice(camp.helpers.indexOf(reqUser._id), 1) })
      await User.findByIdAndUpdate(reqUser._id, {campsRequested: reqUser.campsRequested.splice(reqUser.campsRequested.indexOf(req.params.id), 1)})
      console.log(camp.helpers.indexOf(reqUser._id))
      console.log(camp.helpers,'camp.guests')
      console.log(reqUser._id,'reqUser._id')
      console.log(reqUser.campsRequested.indexOf(req.params.id))
      console.log(reqUser.campsRequested,'reqUser.capsRequested')
      console.log(req.params.id,'req.params.id')
      res.status(200).json({ success: true, data:camp.helpers, data:reqUser.campsRequested })
      
    } else if (camp.confirmedHelpers.indexOf(reqUser._id) > -1 && reqUser.campsConfirmed.indexOf(req.params.id) > -1){
      await Camp.findByIdAndUpdate(req.params.id, {confirmedHelpers: camp.confirmedHelpers.splice(camp.confirmedHelpers.indexOf(reqUser._id), 1) })
      await User.findByIdAndUpdate(reqUser._id, {campsConfirmed: reqUser.campsConfirmed.splice(reqUser.campsConfirmed.indexOf(req.params.id), 1) })
      res.status(200).json({ success: true, data:reqUser.campsConfirmed, data: camp.helpers })
    }
  } else if(reqUser.role === 'guest') {
    if(camp.guests.indexOf(reqUser._id) > -1 && reqUser.campsRequested.indexOf(req.params.id) > -1){
      console.log(camp.guests.indexOf(reqUser._id))
      console.log(camp.guests,'camp.guests')
      console.log(reqUser._id,'reqUser._id')
      console.log(reqUser.campsRequested.indexOf(req.params.id))
      console.log(reqUser.campsRequested,'reqUser.capsRequested')
      console.log(req.params.id,'req.params.id')

      await Camp.findByIdAndUpdate(req.params.id, { guests: camp.guests.splice(camp.guests.indexOf(reqUser._id), 1) })
      await User.findByIdAndUpdate(reqUser._id, { campsRequested: reqUser.campsRequested.splice(reqUser.campsRequested.indexOf(req.params.id), 1) })
      res.status(200).json({ success: true, data: {} })

    }else if (camp.confirmedGuests.indexOf(reqUser._id) > -1 && reqUser.campsConfirmed.indexOf(req.params.id) > -1){
      await Camp.findByIdAndUpdate(req.params.id, {confirmedGuests: camp.confirmedGuests.splice(camp.confirmedGuests.indexOf(reqUser._id), 1) })
      await User.findByIdAndUpdate(reqUser._id, {campsConfirmed: reqUser.campsConfirmed.splice(reqUser.campsConfirmed.indexOf(req.params.id), 1)})
      res.status(200).json({ success: true, data:{} })
    }
  } //else {
    //res.status(200).json({ success: true, data:"something was wrong"})
  //}
})

