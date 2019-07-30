const express = require('express')
const router = express.Router()
const Stock = require('../models/Stock')
//const { connectDB, disconnectDB } = require('../config/db')
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')
const axios = require('axios')
const config = require('config')
const key = config.get('alphaKey')

// @route   GET api/stocks
// @desc    GET all user stocks
// @access  Private
// @TODO    abstract route framework
// @TODO    What happend to AbortControllers
router.get('/:keyword', (req,res) => {
    console.log('Price Route Hit')
    const headers = {
            params: {
        "function":"SYMBOL_SEARCH",
        "keywords": req.params.keyword,
        "apikey":key
            }
    }
    console.log('Called AlphaVantage')
        axios.get("https://www.alphavantage.co/query", headers).then( 
            price => res.send(price.data)).catch(err => {
                console.error(err.message)
                res.status(500).send('Server Error')
            })
        }
        
)

module.exports = router