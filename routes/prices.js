const express = require("express");
const router = express.Router();
const Stock = require("../models/Stock");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const axios = require("axios");
const config = require("config");
const key = config.get("alphaKey");

// @route   GET api/stocks
// @desc    GET all user stocks
// @access  Private
// @TODO    abstract route framework
// @TODO    What happend to AbortControllers
router.get("/:id", auth, (req, res) => {
  let result = {};
  console.log("Hit Stocks Route");
    Stock.find({ portfolio: req.params.id }).sort({
      date: -1
    })
    .then(async stocks => {
        console.log('Beginning of av requests')
        await stocks
        .forEach(stock => {
          const configs = {
            params: {
              function: "GLOBAL_QUOTE",
              symbol: req.params.ticker,
              apikey: key
            }
          }
        axios.get("https://www.alphavantage.co/query", configs)
        .then(price => {
          console.log(price.data["Global Quote"])
          result[req.params.ticker] = price.data["Global Quote"]
          })        
        })
        return result
      })
      .then(result => res.send(result))
      .catch(err => {
        console.error(err.message);
        res.status(500).send("Server Error");
      })});

module.exports = router;