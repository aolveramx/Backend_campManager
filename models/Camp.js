const mongoose = require('mongoose')
const slugify = require('slugify')

const CampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters'],
  },
  slug: String,
  edition: String,
  location: {
    type: String,
    required: [true, 'Please add a location'],
  },
  description: String,
  tag: {
    type: [String],
    required: true,
<<<<<<< HEAD
    enum: ['urban', 'mountain', 'beach'],
=======
    enum: [
      'urban',
      'mountain',
      'beach'
    ]
>>>>>>> DevJpg-filtering
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
<<<<<<< HEAD
      'meditation',
    ],
=======
      'meditation'
    ]
>>>>>>> DevJpg-filtering
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
  },
  phone: {
    type: String,
    maxlength: [15, 'Phone number can not be more than 15 characters'],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  from: {
    type: {year:Number, month:Number, day:Number},
    default: Date.now,
  },
  to: {
    type: {year:Number, month:Number, day:Number},
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
})

// Create slug: user friendly url from name
CampSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { replacement: '-' })
  next()
})

module.exports = mongoose.model('Camp', CampSchema)
