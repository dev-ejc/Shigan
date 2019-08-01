const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req,res,next) {
    try {
        // Get token from header
        const token = req.header('x-auth-token')
        //Check if not token
        if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'})
        }
        next()
    } catch (err) {
        res.status(401).json( {msg: 'Invalid Token'})
    }
}