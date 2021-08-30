const mongoose = require('mongoose')
const {NODE_ENV, MONGO_URI, MONGO_URI_TEST} = process.env

const mongoStr = NODE_ENV === 'test'
  ? MONGO_URI_TEST
  : MONGO_URI

const connectDB = async () => {
  const conn = await mongoose.connect(mongoStr, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.italic.bold)
}

module.exports = connectDB
