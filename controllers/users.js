/**
 * @route   GET api/v1/auth/users
 * @desc    Get all users
 * @access  Private
 * @role    admin
 */
exports.getUsers = ('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'Ver usuarios' })
})

/**
 * @route   GET api/v1/users/:id
 * @desc    Get single user
 * @access  Private
 * @role    admin/guest/helper
 */
exports.getUser = ('/:id', (req, res) => {
  res.status(200).json({ success: true, msg: 'Ver usuario' })
})

/**
 * @route   POST api/v1/users
 * @desc    Register a user
 * @access  Public
 * @role    admin/guest/helper
 */
exports.createUser = ('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'Crear usuario' })
})

/**
 * @route   PUT api/v1/users/:id
 * @desc    Update user
 * @access  Private
 * @role    admin/guest/helper
 */
exports.updateUser = ('/:id', (req, res) => {
  res.status(200).json({ success: true, msg: 'Actualizar usuario' })
})

/**
 * @route   UPDATE api/v1/users/:id/photo
 * @desc    Update photo for user
 * @access  Private
 * @role    admin/guest/helper
 */
exports.updateUserPhoto = ('/:id/photo', (req, res) => {
  res.status(200).json({ success: true, msg: 'Actualizar foto de usuario' })
})

/**
 * @route   DELETE api/v1/users/:id
 * @desc    Delete a user
 * @access  Private
 * @role    admin/guest/helper
 */
exports.deleteUser = ('/:id', (req, res) => {
  res.send('Delete a user')
})