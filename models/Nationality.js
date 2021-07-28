const mongoose = require('mongoose')
const slugify = require('slugify')

const NationalitySchema = new mongoose.Schema({
  idNationality: {
    type: String,
    required: [true, 'Please add a id Nationality/Por favor agregue un id Nacionalidad'],
    unique: true,
    trim: true,
    maxlength: [3, 'Name can not be more than 3 characters'],
  },
  nameNationalityENG: {
    type: String,
    required: [true, 'Please add a english name'],
    unique: true,
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  nameNationalityESP: {
    type: String,
    required: [true, 'Por favor agregue un nombre en español'],
    unique: true,
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  }
})

// Create slug: user friendly url from name
NationalitySchema.pre('save', function (next) {
  this.slug = slugify(this.idNationality, { replacement: '-' })
  next()
})

module.exports = mongoose.model('Nationality', NationalitySchema)
