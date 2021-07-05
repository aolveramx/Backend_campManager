const User = require('../models/User')

/**
 * @route   GET api/v1/auth/users
 * @desc    Get all users
 * @access  Private
 * @role    admin
 */
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    res.status(200).json({ sucess: true, count: users.length, data: users })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}

/**
 * @route   GET api/v1/users/:id
 * @desc    Get single user
 * @access  Private
 * @role    admin
 */
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json({ success: true, data: user })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}

/**
 * @route   POST api/v1/users
 * @desc    Create a user
 * @access  Public
 * @role    admin/guest/helper
 */
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ success: true, data: user })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}

/**
 * @route   PUT api/v1/users/:id
 * @desc    Update user
 * @access  Private
 * @role    admin/guest/helper
 */
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!user) {
      return res.status(400).json({ success: false })
    }

    res.status(200).json({ success: true, data: user })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}

/**
 * @route   UPDATE api/v1/users/:id/photo
 * @desc    Update photo for user
 * @access  Private
 * @role    admin/guest/helper
 */
exports.updateUserPhoto = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Actualizar foto de usuario' })
}

/**
 * @route   DELETE api/v1/users/:id
 * @desc    Delete a user
 * @access  Private
 * @role    admin/guest/helper
 */
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(400).json({ success: false })
    }

    res.status(200).json({ success: true, data: {} })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}