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
// router.get("/:id", auth, (req, res) => {
//   let result = {}
//   console.log("Hit Stocks Route");
//     Stock.find({ portfolio: req.params.id }).sort({
//       date: -1
//     })
//     .then(async stocks => {
//         console.log(stocks)
//         await stocks
//         .forEach(stock => {
//           const configs = {
//             params: {
//               function: "GLOBAL_QUOTE",
//               symbol: stock.ticker,
//               apikey: key
//             }
//           }
//         axios.get("https://www.alphavantage.co/query", configs)
//         .then(price => {
//           console.log(price.data)
//           result[stock.ticker] = price.data
//           })
//         })
//       })
//       .then(() =>  res.send(result))
//       .catch(err => {
//         console.error(err.message);
//         res.status(500).send("Server Error");
//       })});

// @route   GET api/stocks
// @desc    GET all user stocks
// @access  Private
// @TODO    abstract route framework
// @TODO    What happend to AbortControllers
router.get("/:id", auth, async (req, res) => {
  console.log('Price route hit')
  try {
    const stocks = await Stock.find({ portfolio: req.params.id }).sort({
      date: -1
    });
    let promises = stocks.map(stock => {
        const configs = {
          params: {
            function: "GLOBAL_QUOTE",
            symbol: stock.ticker,
            apikey: key
          }
        };
        return axios.get(
          "https://www.alphavantage.co/query",
          configs
        ).then(price => {
          return data = price.data["Global Quote"]
        });
    });
    Promise.all(promises).then(result => {
      res.send(result)
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/stocks
// @desc    GET all user stocks
// @access  Private
// @TODO    abstract route framework
// @TODO    What happend to AbortControllers
router.get("/ticker/:ticker", auth, async (req, res) => {
  console.log('Ticker Price route hit')
  try {
        const configs = {
          params: {
            function: "GLOBAL_QUOTE",
            symbol: req.params.ticker,
            apikey: key
          }
        };
        return axios.get(
          "https://www.alphavantage.co/query",
          configs
        ).then(price => {
          res.send(price.data["Global Quote"])
        });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
