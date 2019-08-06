const express = require("express");
const router = express.Router();
const config = require("config");
const key = config.get("newsKey");
const axios = require("axios");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

// @route   GET api/stocks
// @desc    GET all user stocks
// @access  Private
// @TODO    abstract route framework
router.get("/:name", (req, res) => {
  const configs = {
    headers: {
      "x-api-key": key
    },
    params: {
      country: "us",
      category: "business",
      q: req.params.name,
      page: 1
    }
  };
  axios
    .get("https://newsapi.org/v2/everything", configs)
    .then(news => res.send(news.data.articles))
    .catch(err => {
      console.error(err.message);
      res.status(500).send("Server Error");
    });
});

router.get("/", (req, res) => {
  console.log("Headline route hit");
  const configs = {
    headers: {
      "x-api-key": key
    },
    params: {
      country: "us",
      category: "business",
      page: 1
    }
  };
  axios
    .get("https://newsapi.org/v2/top-headlines/", configs)
    .then(news => res.send(news.data.articles))
    .catch(err => {
      console.error(err.message);
      res.status(500).send("Server Error");
    });
});

module.exports = router;