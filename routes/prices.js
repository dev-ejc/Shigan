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
router.get('/:id',auth, async (req,res) => {
    console.log('Hit Stocks Route')
    try  {
    let stocks = await Stock
    .find({portfolio: req.params.id})
    .sort({date:-1})
    // var result = []
    console.log(stocks)
    stocks.map(stock => {
        console.log(stock.ticker)
        stock.ticker
    //     const configs = {
    //         params: {
    //     "function":"GLOBAL_QUOTE",
    //     "symbol": stock.ticker,
    //     "apikey":key
    //         }
    //     }
    //     axios.get("https://www.alphavantage.co/query", configs).data
    })
    console.log(stocks)
    res.send('Hi')
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router