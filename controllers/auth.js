const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')

/**
 * @route   POST api/v1/auth/register
 * @desc    Auth user & get token
 * @access  Public
 */
exports.register = asyncHandler(async(req, res, next) => {
  const { 
    name, 
    lastName, 
    nationality, 
    gender, 
    documentId, 
    idNumber, 
    bornDate, 
    tutor, 
    address,
    phone,
    medicalKnowledge,
    about,
    allergies,
    curriculum,
    username,
    email, 
    password, 
    role 
  } = req.body

  const user = await User.create({
    name, 
    lastName, 
    nationality, 
    gender, 
    documentId, 
    idNumber, 
    bornDate, 
    tutor, 
    address,
    phone,
    medicalKnowledge,
    about,
    allergies,
    curriculum,
    username,
    email, 
    password, 
    role
  })

  sendTokenResponse(user, 200, res)
})

/**
 * @route   POST api/v1/auth/login
 * @desc    Auth user & get token
 * @access  Public
 */
exports.login = asyncHandler(async(req, res, next) => {
  const { email, password } = req.body

  // validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Ingresa un correo y una contraseña'), 400)
  }

  // check for user 
  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return next(new ErrorResponse('Credenciales incorrectas'), 401)
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password)

  if (!isMatch) {
    return next(new ErrorResponse('Credenciales incorrectas'), 401)
  }

  sendTokenResponse(user, 200, res)
})

/**
 * @route   GET api/v1/auth/me
 * @desc    Get current logged in user
 * @access  Private
 * @role    admin/guest/helper
 */
exports.getMe = asyncHandler(async(req, res, next) => {
  const user = await User.findById(req.user.id)

  res.status(200).json({ success: true, data: user })
})

/**
 * @route   PUT api/v1/auth/:id/updateInfo
 * @desc    Update details
 * @access  Private
 * @role    admin/guest/helper
 */
exports.updateInfo = (req, res, next) => (
  res.status(200).json({ success: true, msg: 'Actualizar información de usuario' })
)

/**
 * @route   PUT api/v1/auth/updatepassword
 * @desc    Update password
 * @access  Private
 * @role    admin/guest/helper
 */
exports.updatePassword = (req, res, next) => (
  res.status(200).json({ success: true, msg: 'Actualizar contraseña' })
)

/**
 * @route   POST api/v1/auth/forgotpassword
 * @desc    Forgot password
 * @access  Private
 * @role    admin/guest/helper
 */
exports.forgotPassword = (req, res, next) => (
  res.status(200).json({ success: true, msg: 'Olvide contraseña' })
)

/**
 * @route   PUT api/v1/auth/:id/resettoken
 * @desc    Reset password
 * @access  Public
 */
exports.resetPassword = (req, res, next) => (
  res.status(200).json({ success: true, msg: 'Reiniciar password' })
)

/**
 * @route   GET api/v1/auth/logout
 * @desc    Logout
 * @access  Privado
 * @role    admin/guest/helper
 */
exports.logout = (req, res, next) => (
  res.status(200).json({ success: true, msg: 'Cerrar sesión' })
)

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create user with method lowercase not a static uppercase
  const token = user.getSignJWtToken()

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000 ),
    httpOnly: true,
  }

  if(process.env.NODE_ENV === 'production') {
    opctions.secure = true
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    })
}