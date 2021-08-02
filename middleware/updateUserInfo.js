const jwt = require('jsonwebtoken')
const User = require('../models/User')

const updateUserInfo = (model) => async (req, res, next) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    user = await User.findById(decoded.id)
    console.log(user,'user in updateUserInfo')
}

module.exports = updateUserInfo