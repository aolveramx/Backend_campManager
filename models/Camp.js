const mongoose = require('mongoose')
const slugify = require('slugify')

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
      'urban',
      'mountain',
      'beach'
    ]
  },
  activities: {
    type: [String],
    required: true,
    enum: [
      'pool',
      'museum',
      'reading',
      'recycling workshop',
      'crafts workshop',
      'conference',
      'seminar',
      'show',
      'meditation'
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
    type: Object,
    default: Date.now,
  },
  to: {
    type: Object,
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

// Create slug: user friendly url from name
CampSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { replacement: '-' })
  next()
})

module.exports = mongoose.model('Camp', CampSchema)