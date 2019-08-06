const express = require('express')
const router = express.Router()
const Stock = require('../models/Stock')
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')

// @route   GET api/stocks
// @desc    GET all portfolio stocks
// @access  Private
// @TODO    abstract route framework
router.get('/:id', auth, async (req,res) => {
    console.log('Hit Stocks Route')
        try  {
        const stocks = await Stock
        .find({portfolio: req.params.id})
        .sort({date:-1})
        res.send(stocks)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   POST api/stocks
// @desc    Add new stock
// @access  Private
// TODO     add validation for existing shares
router.post('/:id',[auth, [
    check('ticker','Ticker Symbol is required').exists(),
    check('shares', "Requires more than 1 share").isInt({min:0})
]], async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const { ticker,shares,purchaseDate} = req.body
    try {
        const newStock = new Stock({
            portfolio:req.params.id, ticker, shares, purchaseDate
        })
        const stock = await newStock.save()
        res.json(stock)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   POST api/stocks
// @desc    Update portfolio stocks
// @access  Private
router.put('/:id',auth, async (req,res) => {
    console.log('Update route hit')
    const { ticker,shares, portfolio } = req.body  
    const stockFields = {}
    if(ticker) stockFields.ticker = ticker
    if(shares) stockFields.shares = shares  
    try {
        let stock = await Stock.findById(req.params.id)
        if(!stock) {
            return res.status(404).json({ msg:"Stock does not exist"})
        }
        // if(stock.portfolio.id.toString() !== portfolio) {
        //     return res.status(401).json({ msg:"Not authorized"})
        // }
        stock = await Stock.findByIdAndUpdate(req.params.id,
            { $set: stockFields}, 
            { new: true })
        console.log(stock)
        res.json(stock)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   DELETE 
// @desc    Delete Stock
// @access  Private
// @TODO    update ordering of validation
router.delete('/:id',auth, async (req,res) => {
    try {
        let stock = await Stock.findById(req.params.id)
        if(!stock) {
            return res.status(404).json({ msg:"Stock does not exist"})
        }
        stock = await Stock.findByIdAndDelete(req.params.id)
        res.json(stock)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports =  router;