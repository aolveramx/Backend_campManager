const jwt = require('jsonwebtoken')
const asyncHandler = require('./async')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token

  console.log(req.body,'req.body')
  console.log(req.url,'req.url')
  // console.log(req.params.id,'req.params')
  // console.log(req.cookies,'cookies')
  // console.log(req,'req.host')
  // console.log(req.user,'req.user')

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1]
    // Set token from cookie
  } else if (req.cookies.token) {
    token = req.cookies.token
  }

  if (!token) {
    return next(new ErrorResponse('You are not authorized', 401))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()
  } catch (error) {
    console.log('No estas autorizado a editar este usuario')
    return next(new ErrorResponse('Not authorized', 401))
  }
})

// Access to admin
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `The user with rol ${req.user.role} is not authorized to access this route`,
          403
        )
      )
    }
    next()
  }
}
