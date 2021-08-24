const jwt = require('jsonwebtoken');

let tokenDecoder = function(req) {
    if(req.cookies.token){
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
        return decoded
    }else if(req.headers.authorization) {
        const token = req.headers.authorization
        const index = token.indexOf(' ')
        const tokenFinal = token.slice(index + 1)
        const decoded = jwt.verify(tokenFinal, process.env.JWT_SECRET)
        return decoded
    }
}

module.exports = { tokenDecoder }