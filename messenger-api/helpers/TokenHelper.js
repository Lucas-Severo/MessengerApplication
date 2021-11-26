const jwt = require('jsonwebtoken')

function getUserIdByToken(token, secret) {
    const {userId} = jwt.verify(token, secret)
    return userId
}

module.exports = getUserIdByToken