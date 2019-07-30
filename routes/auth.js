const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
//const { connectDB, disconnectDB } = require('../config/db')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')
//const passport = require('passport')

// @route   GET api/users
// @desc    GET logged in user
// @access  Private
router.get('/', auth, async (req,res) => {
    try {
        //await connectDB()
        const user = await User.findById(req.user.id).select('-password')
        // await disconnectDB()
        res.json(user)
    } catch (err) {
        // await disconnectDB()
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   POST api/users
// @desc    Auth logged in user
// @access  Public
router.post('/',[
    check('email','Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
] ,async (req,res,next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const { email, password } = req.body
    try {
        // passport.authenticate('local', {
        //     successRedirect:'/',
        //     failureRedirect:'/login',
        //     failureFlash:false
        // })
        //await connectDB()
        let user = await User.findOne({ email })
        if(!user) {
            // await disconnectDB()
            return res.status(400).json({ msg: "Invalid Credentials"})
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            // await disconnectDB()
            return res.status(400).json({ msg: 'Invalid Credentials'})
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload,config.get('jwtSecret'), {
            expiresIn: 18000
        }, (err,token) => {
            if(err) throw err
            res.json({ token })
        })
        // await disconnectDB()
    } catch (err) {
        // await disconnectDB()
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


module.exports =  router 