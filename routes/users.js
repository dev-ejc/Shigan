const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwtSecret = config.get('jwtSecret')
// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', [
    check('name', 'A name is required').not().isEmpty(), 
    check('email', "Please include a valid email").isEmail(),
    check('password', 'Please enter a passowrd with 7 or more characters').isLength({ min:6 })
],
async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const { name, email, password } = req.body

    try {

        let user = await User.findOne({ email })
        if(user) {
            return res.status(400).json({msg:"User already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashed_pw = await bcrypt.hash(password,salt)
        user = new User({
            name,email,password: hashed_pw
        })
        await user.save()
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload,jwtSecet, {
            expiresIn: 18000
        }, (err,token) => {
            if(err) throw err
            res.json({ token })
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports =  router 