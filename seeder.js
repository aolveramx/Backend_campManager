const fs = require('fs')
const mongoose = require('mongoose')
const color = require('colors')
const dotenv = require('dotenv')

dotenv.config({ path: './config/config.env'})

const Camp =  require('./models/Camp')
const User =  require('./models/User')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})

// Read JSON files
const camps = JSON.parse(fs.readFileSync(`${__dirname}/_data/camps.json`, 'utf-8'))
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'))

// Import into DB
const importData = async () => {
  try {
    await Camp.create(camps)
    await User.create(users)
    console.log('Data Imported...'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(error)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await Camp.deleteMany()
    await User.deleteMany()
    console.log('Data Destroyed...'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(error)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
