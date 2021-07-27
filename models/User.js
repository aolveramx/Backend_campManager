const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  firstFamilyName: {
    type: String,
    required: [true, 'Please add a family name'],
    trim: true,
    maxlength: [30, 'Name can not be more than 30 characters'],
  },
  secondFamilyName: {
    type: String,
    required: false,
    trim: true,
    maxlength: [30, 'Name can not be more than 30 characters'],
  },
  secondFamilyName: {
    type: String,
    required: false,
    trim: true,
    maxlength: [30, 'El nombre no puede exceder 30 caracteres'],
  },
  nationality: {
    type: String,
    required: [true, 'Please add a nationality'],
  },
  gender: {
    type: String,
    required: [true, 'Please add your gender'],
  },
  documentId: {
    type: [String],
    required: [true, 'Please add type ID'],
    enum: ['DNI', 'NIE', 'PASS'],
  },
  idNumber: {
    type: String,
    required: [true, 'Please enter ID number'],
    match: [/^[A-Z0-9]+$/, 'Enter a valid ID'],
  },
  bornDate: {
    type: Date,
    required: [true, 'Please add your Birthday'],
  },
  tutor: String,
  address: {
    type: String,
    required: [true, 'Please add an address'],
  },
  phone: {
    type: String,
    maxlength: [15, 'Phone number can not be more than 15 characters'],
  },
  medicalKnowledge: {
    type: Boolean,
    required: [
      true,
      'It is very important to know if you have medical knowledge',
    ],
    default: false,
  },
  about: {
    type: String,
    required: [true, 'Please add a personal description'],
  },
  allergies: {
    type: String,
    required: [false, 'It is very important to know if you have allergies'],
  },
  curriculum: String,
  photo: {
    type: String,
    default: 'default-profile-photo.jpg',
  },
  username: {
    type: String,
    required: [true, 'Please add a username'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  role: {
    type: String,
    required: true,
    enum: ['guest', 'helper'],
    default: 'guest',
  },
  password: {
    type: String,
    required: [true, 'Password must be at leat 6 characters length'],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Encrypt password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Sign JWT and return
UserSchema.methods.getSignJWtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

// Compare user entered password to hashed password in DB
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000

  return resetToken
}

module.exports = mongoose.model('User', UserSchema)
