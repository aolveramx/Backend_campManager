const mongoose = require('mongoose')
const slugify = require('slugify')

const ActivitySchema = new mongoose.Schema({
  idActivity: {
    type: String,
    required: [true, 'Please add a id Activity/Por favor agregue un id Actividad'],
    unique: true,
    trim: true,
    maxlength: [3, 'Name can not be more than 3 characters'],
  },
  nameActivityENG: {
    type: String,
    required: [true, 'Please add a english name'],
    unique: true,
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  nameActivityESP: {
    type: String,
    required: [true, 'Por favor agregue un nombre en español'],
    unique: true,
    trim: true,
    maxlength: [20, 'El nombre no puede superar 20 caracteres'],
  }
})

// Create slug: user friendly url from name
ActivitySchema.pre('save', function (next) {
  this.slug = slugify(this.idActivity, { replacement: '-' })
  next()
})

module.exports = mongoose.model('Activity', ActivitySchema)
