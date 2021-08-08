const mongoose = require('mongoose')
const slugify = require('slugify')

const GenderSchema = new mongoose.Schema({
  idGender: {
    type: String,
    required: [true, 'Please add a id Gender/Por favor agregue un id Sexo'],
    unique: true,
    trim: true,
    maxlength: [3, 'Name can not be more than 3 characters'],
  },
  nameGenderENG: {
    type: String,
    required: [true, 'Please add a english name'],
    unique: true,
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  nameGenderESP: {
    type: String,
    required: [true, 'Por favor agregue un nombre en español'],
    unique: true,
    trim: true,
    maxlength: [20, 'El nombre no puede superar 20 caracteres'],
  }
})

// Create slug: user friendly url from name
GenderSchema.pre('save', function (next) {
  this.slug = slugify(this.idGender, { replacement: '-' })
  next()
})

module.exports = mongoose.model('Gender', GenderSchema)
