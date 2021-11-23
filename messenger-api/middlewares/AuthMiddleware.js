const jwt = require('jsonwebtoken')
const SECRET = '1234'

function verifyJWT(req, res, next) {
    const token = req.headers['authorization']
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(401).json({
                message: "Token inválido!"
            })
        }
        req.userId = decoded.userId
        next()
    })
}

module.exports = verifyJWT