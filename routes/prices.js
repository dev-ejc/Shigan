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
router.get("/historical/:id", auth, async (req, res) => {
  console.log('Historical Price route hit')
  try {
    const stocks = await Stock.find({ portfolio: req.params.id }).sort({
      date: -1
    });
    console.log(stocks)
    let promises = stocks.map(stock => {
        const configs = {
          params: {
            function: "TIME_SERIES_DAILY",
            symbol: stock.ticker,
            apikey: key,
            outputsize: "compact"
          }
        };
        return axios.get(
          "https://www.alphavantage.co/query",
          configs
        ).then(price => {
          const prices = price.data["Time Series (Daily)"]
          Object.keys(prices).forEach(key => {
            Object.keys(prices[key]).forEach(k => {
              prices[key][k] = prices[key][k] * stock.shares 
            })
          })
          return prices
        });
    });
    Promise.all(promises).then(result => {
      const data = result.reduce((r,e) => {
        return Object.keys(e).forEach(key => {
          if(!r[key]) {
            r[key] = {}
            Object.keys(e[key]).forEach(k => {
              r[key][k] = 0 + e[key][k]
            })
          } else {
            Object.keys(e[key]).forEach(k => {
              r[key][k] = r[key][k] + e[key][k]
            })
          }
        }),r
      },{})
      res.send(data)
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
router.get("/:ticker", auth, async (req, res) => {
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

// @route   GET api/stocks
// @desc    GET all user stocks
// @access  Private
// @TODO    abstract route framework
// @TODO    What happend to AbortControllers
router.get("/search/:keyword", auth, async (req, res) => {
  console.log('Search route hit')
  try {
        const configs = {
          params: {
            function: "SYMBOL_SEARCH",
            keywords: req.params.keyword,
            apikey: key
          }
        };
        return axios.get(
          "https://www.alphavantage.co/query",
          configs
        ).then(price => {
          res.send(price.data.bestMatches)
        });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
