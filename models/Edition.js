const mongoose = require('mongoose')
const slugify = require('slugify')

const EditionSchema = new mongoose.Schema({
  idEdition: {
    type: String,
    required: [true, 'Please add a id Edition/Por favor agregue un id Edicción'],
    unique: true,
    trim: true,
    maxlength: [3, 'Name can not be more than 3 characters'],
  },
  nameEditionENG: {
    type: String,
    required: [true, 'Please add a english name'],
    unique: true,
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  nameEditionESP: {
    type: String,
    required: [true, 'Por favor agregue un nombre en español'],
    unique: true,
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  }
})

// Create slug: user friendly url from name
EditionSchema.pre('save', function (next) {
  this.slug = slugify(this.idEdition, { replacement: '-' })
  next()
})

module.exports = mongoose.model('Edition', EditionSchema)
