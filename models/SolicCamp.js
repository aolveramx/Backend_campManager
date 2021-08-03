const mongoose = require('mongoose')

const SolicCampSchema = new mongoose.Schema({
  camp: {
    type: String,
    required: true,
    trim: true,
  }, 
  person: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['guest', 'helper'],
  },
  status: {
    type: String,
    required: true,
    enum: ['pending','accepted','rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Create slug: user friendly url from name
SolicCampSchema.pre('save', function (next) {
  next()
})

module.exports = mongoose.model('SolicCamp', SolicCampSchema)
