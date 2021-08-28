// General dependencies
const path = require('path')
const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const colors = require('colors')
const errorHandler = require('./middleware/error')
const cookieParser = require('cookie-parser')
const fileupload = require('express-fileupload')
// Security dependencies
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
// Connect DB Config
const connectDB = require('./config/db')

// Connect to DB
connectDB()

// Route files
const camps = require('./routes/camps')
const genders = require('./routes/genders')
const editions = require('./routes/editions')
const nationalities = require('./routes/nationalities')
const activities = require('./routes/activities')
const positions = require('./routes/positions')
const positionsstaff = require('./routes/positionsstaff')
const soliccamps = require('./routes/soliccamps')

const auth = require('./routes/auth')
const users = require('./routes/users')

// Init app
const app = express()

// Body parser middleware
app.use(express.json())

// Cookie parser
app.use(cookieParser())

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//File uploading
app.use(fileupload())

// Security Dependencies
//Sanitize data
app.use(mongoSanitize())
//Set security headers
app.use(helmet())
//Prevent XSS attacks
app.use(xss())
//Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
})
app.use(limiter)
//Prevent http param pollution
app.use(hpp())
//Enable CORS
app.use(cors())

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Mount Routers
app.use('/api/v1/camps', camps)
app.use('/api/v1/genders', genders)
app.use('/api/v1/editions', editions)
app.use('/api/v1/nationalities', nationalities)
app.use('/api/v1/activities', activities)
app.use('/api/v1/positions', positions)
app.use('/api/v1/positionsstaff', positionsstaff)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)
app.use('/api/v1/soliccamps', soliccamps)

app.use(errorHandler)

// Init Server
const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)


//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  server.close(() => process.exit(1))
})

module.exports = {app, server}