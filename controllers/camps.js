const Camp = require('../models/Camp')

/**
 * @route   GET api/v1/camps
 * @desc    Get all camps
 * @access  Public
 */
exports.getCamps = async (req, res, next) => {
  try {
    const camps = await Camp.find()
    res.status(200).json({ success: true, count: camps.length, data: camps })
  } catch (error) {
    res.status(400).json({ success: false })
  }
} 

/**
 * @route   GET api/v1/camps/:id
 * @desc    Get single camp
 * @access  Public
 */
exports.getCamp = async (req, res, next) => {
  try {
    const camp = await Camp.findById(req.params.id)
    
    if (!camp) {
      return res.status(400).json({ success: false })
    }

    res.status(200).json({ success: true, data: camp })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}

/**
 * @route   POST api/v1/camps
 * @desc    Add new camp
 * @access  Private
 * @role    admin
 */
exports.createCamp = async (req, res, next) => {
  try {
    const camp = await Camp.create(req.body)
    res.status(201).json({ success:true, data: camp })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}

/**
 * @route   UPDATE api/v1/camps/:id
 * @desc    Update new camp
 * @access  Private
 * @role    admin
 */
exports.updateCamp = async (req, res, next) => {
  try {
    const camp = await Camp.findByIdAndUpdate(req.params.id, req.body, { 
      new: true,
      runValidators: true, 
    })

    if (!camp) {
      return res.status(400).json({ success: false })
    }

    res.status(200).json({ success: true, data: camp })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}

/**
 * @route   Delete api/v1/camps/:id
 * @desc    Delete camp
 * @access  Private
 * @role    admin
 */
exports.deleteCamp = async (req, res, next) => {
  try {
    const camp = await Camp.findByIdAndDelete(req.params.id)

    if (!camp) {
      return res.status(400).json({ success: false, data: {} })
    }

    res.status(200).json({ success: true })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}