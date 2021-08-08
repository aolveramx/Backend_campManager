const mongoose = require('mongoose')
const slugify = require('slugify')

const PositionSchema = new mongoose.Schema({
  idPosition: {
    type: String,
    required: [true, 'Please add a id Position/Por favor agregue un id Posición'],
    unique: true,
    trim: true,
    maxlength: [3, 'Name can not be more than 3 characters'],
  },
  namePositionENG: {
    type: String,
    required: [true, 'Please add a english name'],
    unique: true,
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  namePositionESP: {
    type: String,
    required: [true, 'Por favor agregue un nombre en español'],
    unique: true,
    trim: true,
    maxlength: [20, 'El nombre no puede superar 20 caracteres'],
  }
})

// Create slug: user friendly url from name
PositionSchema.pre('save', function (next) {
  this.slug = slugify(this.idPosition, { replacement: '-' })
  next()
})

module.exports = mongoose.model('Position', PositionSchema)
