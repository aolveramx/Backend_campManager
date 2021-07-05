/**
 * @route   POST api/v1/auth/register
 * @desc    Auth user & get token
 * @access  Public
 */
exports.register = (req, res, next) => (
  res.status(200).json({ success: true, msg: 'Registrar usuario' })
)

/**
 * @route   POST api/v1/auth/login
 * @desc    Auth user & get token
 * @access  Public
 */
exports.login = (req, res, next) => (
  res.status(200).json({ success: true, msg: 'Iniciar sesión' })
)

/**
 * @route   GET api/v1/auth/me
 * @desc    Get current logged in user
 * @access  Private
 * @role    admin/guest/helper
 */
exports.me = (req, res, next) => (
  res.status(200).json({ success: true, msg: 'Ver usuario logado' })
)

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