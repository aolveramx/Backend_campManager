const mongoose = require('mongoose')

const CampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Es necesario agregar un nombre'],
    unique: true,
    trim: true,
    maxlength: [40, 'El nombre no puede exceder 30 caracteres'],
  },
  slug: String,
  edition: String,
  location: {
    type: String,
    required: [true, 'Es necesario agregar una locación'],
  },
  description: String,
  tag: {
    type: [String],
    required: true,
    enum: [
      'urbano',
      'montaña',
      'playa'
    ]
  },
  activities: {
    type: [String],
    required: true,
    enum: [
      'piscina',
      'museo',
      'lectura',
      'taller de reciclaje',
      'taller de artesanias'
    ]
  },
  address: {
    type: String,
    required: [true, 'Es necesario agregar dirección'],
  },
  phone: {
    type: String,
    maxlength: [15, 'El número de teléfono no puede ser mayor a 15 caracteres'],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Ingresa un email válido',
    ],
  },
  from: {
    type: Date,
    default: Date.now,
  },
  to: {
    type: Date,
    default: Date.now,
  },
  capacity: {
    type: Number,
    default: 30,
  },
  inPeople: Number,
  available: {
    type: Boolean,
    default: true,
  },
  helpers: {
    type: [String],
    default: [],
  },
  guests: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
)

const Camp = mongoose.model('Camp', CampSchema)

module.exports = Camp;