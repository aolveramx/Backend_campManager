const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Es necesario agregar un nombre'],
    trim: true,
    maxlength: [30, 'El nombre no puede exceder 30 caracteres'],
  },
  lastName: {
    type: String,
    required: [true, 'Es necesario agregar un apellido'],
    trim: true,
    maxlength: [30, 'El nombre no puede exceder 30 caracteres'],
  },
  nationality: {
    type: String,
    required: [true, 'Es necesario agregar nacionalidad'],
  },
  gender: {
    type: String,
    required: [true, 'Es necesario agregar tu género'],
  },
  documentId: {
    type: [String],
    required: [true, 'Es necesario agregar el tipo de identificación'],
    enum: [
      'DNI',
      'NIE',
      'PASS'
    ],
  },
  idNumber: {
    type: String,
    required: [true, 'Es necesario agregar el número de identificación'],
    match: [
      /^[A-Z0-9]+$/,
      'Ingresa un Id válido',
    ],
  },
  bornDate: {
    type: Date,
    required: [true, 'Es necesario agregar tu fecha de nacimiento'],
  },
  tutor:String,
  address: {
    type: String,
    required: [true, 'Es necesario agregar tu dirección'],
  },
  phone: {
    type: String,
    maxlength: [15, 'El número de teléfono no puede ser mayor a 15 caracteres'],
  },
  medicalKnowledge: {
    type: Boolean,
    required: [true, 'Es necesario indicar si cuentas con conocimientos médicos'],
    default: false,
  },
  about: {
    type: String,
    required: [true, 'Es necesario contar con una breve descripción de tí'],
  },
  allergies: {
    type: String,
    required: [true, 'Es importante indicar si tienes alergias'],
  },
  curriculum: String,
  photo: {
    type: String,
    default: 'default-profile-photo.jpg'
  },
  username: {
    type: String,
    required: [true, 'Es obligatorio ingresar un nombre de usuario'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Ingresa un correo electrónico válido'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Ingresa un correo electrónico válido',
    ],
  },
  role: {
    type: String,
    required: true,
    enum: [
      'guest',
      'helper'
    ],
    default: 'guest'
  },
  password: {
    type: String,
    required: [true, 'Ingresa una contraseña de mínimo 6 caracteres'],
    minlength: 6,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Encrypt password
UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Sign JWT and return
UserSchema.methods.getSignJWtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

// Compare user entered password to hashed password in DB
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)