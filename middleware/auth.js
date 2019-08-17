const jwt = require('jsonwebtoken')
const config = require('config')
const jwtSecret = config.get('jwtSecret')
module.exports = function(req,res,next) {
    try {
        // Get token from header
        const token = req.header('x-auth-token')
        //Check if not token
        if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'})
        }
        const decoded = jwt.verify(token, process.env.JWTSECRET)
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json( {msg: 'Invalid Token'})
    }
}