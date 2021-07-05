/**
 * @route   GET api/v1/camps
 * @desc    Get all camps
 * @access  Public
 */
exports.getCamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Ver todos los campamentos' })
} 

/**
 * @route   GET api/v1/camps/:id
 * @desc    Get single camp
 * @access  Public
 */
exports.getCamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Ver un campamento' })
}

/**
 * @route   POST api/v1/camps
 * @desc    Add new camp
 * @access  Private
 * @role    admin
 */
exports.createCamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Crear un campamento' })
}

/**
 * @route   UPDATE api/v1/camps/:id
 * @desc    Update new camp
 * @access  Private
 * @role    admin
 */
exports.updateCamp = (req, res, next) => {
res.status(200).json({ success: true, msg: 'Actualizar un campamento' })
}

/**
 * @route   Delete api/v1/camps/:id
 * @desc    Delete camp
 * @access  Private
 * @role    admin
 */
exports.deleteCamp = (req, res, next) => {
res.status(200).json({ success: true, msg: 'Borrar un campamento' })
}