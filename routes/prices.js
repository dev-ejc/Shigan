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
  try {
    const stocks = await Stock.find({ portfolio: req.params.id }).sort({
      date: -1
    });
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
          Object.keys(price.data["Time Series (Daily)"]).forEach(key => {
            if(price.data["Time Series (Daily)"][key]["4. close"] !== null) {
              price.data["Time Series (Daily)"][key] = price.data["Time Series (Daily)"][key]["4. close"] * stock.shares
            } else {
              console.log('sneak')
              price.data["Time Series (Daily)"][key] = price.data["Time Series (Daily)"][key]["1. open"] * stock.shares
            } 
          })
          return price.data["Time Series (Daily)"]
        });
    });
    Promise.all(promises).then(result => {
      res.send(result.reduce((r,e) => {
        return Object.keys(e).forEach(key => {
          if(!r[key]) {
            r[key] = 0
            r[key] += e[key]
          } else {
              r[key] += e[key]
          }
        }),r
      },{}))
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
