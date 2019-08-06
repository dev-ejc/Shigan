const express = require("express");
const router = express.Router();
const Stock = require("../models/Stock");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const axios = require("axios");

// @route   GET api/stocks
// @desc    GET all user stocks
// @access  Private
// @TODO    abstract route framework
router.get("/ticker/:ticker", (req, res) => {
  axios
    .get(
      `https://financialmodelingprep.com/api/v3/company-key-metrics/${
        req.params.ticker
      }`
    )
    .then(metrics => res.send(metrics.data))
    .catch(err => {
      console.error(err.message);
      res.status(500).send("Server Error");
    });
});

// @route   GET api/stocks
// @desc    GET all user stocks
// @access  Private
// @TODO    abstract route framework
router.get("/stocklist", (req, res) => {
  axios
    .get("https://financialmodelingprep.com/api/v3/company/stock/list")
    .then(metrics => res.send(metrics.data.symbolsList))
    .catch(err => {
      console.error(err.message);
      res.status(500).send("Server Error");
    });
});

module.exports = router;
