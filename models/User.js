const mongoose = require('mongoose')

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
    type: String,
    required: [true, 'Es necesario agregar el tipo de identificación'],
  },
  idNumber: {
    type: String,
    required: [true, 'Es necesario agregar el número de identificación'],
  },
  bornDate: {
    type: Date,
    required: [true, 'Es necesario agregar tu fecha de nacimiento'],
  },
  tutor: {
    type: String,
    required: [true, 'Es necesario agregar a un tutor'],
  },
  address: {
    type: String,
    required: [true, 'Es necesario agregar tu dirección'],
  },
  phone: {
    type: String,
    maxlength: [15, 'El número de teléfono no puede ser mayor a 15 caracteres'],
  },
  medicalKnowledge: {
    type: String,
  },
  about: {
    type: String,
  },
  picture: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Ingresa un correo electrónico válido'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  role: {
    type: String,
    enum: ['guest', 'helper'],
    default: 'guest'
  },
  password: {
    type: String,
    required: [true, 'Ingresa una contraseña de mínimo 6 caracteres'],
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

module.exports = mongoose.model('User', UserSchema)