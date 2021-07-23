const mongoose = require('mongoose')
const slugify = require('slugify')

const PositionStaffSchema = new mongoose.Schema({
  idPositionStaff: {
    type: String,
    required: [true, 'Please add a id PositionStaff/Por favor agregue un id PosiciónStaff'],
    unique: true,
    trim: true,
    maxlength: [3, 'Name can not be more than 3 characters'],
  },
  namePositionStaffENG: {
    type: String,
    required: [true, 'Please add a english name'],
    unique: true,
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  namePositionStaffESP: {
    type: String,
    required: [true, 'Por favor agregue un nombre en español'],
    unique: true,
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  }
})

// Create slug: user friendly url from name
PositionStaffSchema.pre('save', function (next) {
  this.slug = slugify(this.idPositionStaff, { replacement: '-' })
  next()
})

module.exports = mongoose.model('PositionStaff', PositionStaffSchema)
