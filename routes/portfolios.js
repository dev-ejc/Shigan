const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

// @route   GET api/portfolio
// @desc    GET all User portfolio
// @access  Private
// @TODO    abstract route framework
router.get("/", auth, async (req, res) => {
  console.log('Grabbing Portfolios')
  try {
    const portfolio = await Portfolio.find({ user: req.user.id }).sort({
      openDate: -1
    });
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/portfolio
// @desc    Add new Portfolio
// @access  Private
// TODO     add validation for existing shares
router.post(
  "/",
  [auth, [check("name", "Name is required").exists()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;
    try {
      const newPortfolio = new Portfolio({
        user: req.user.id,
        name
      });
      const portfolio = await newPortfolio.save();
      res.json(portfolio);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST api/portfolio
// @desc    Update User portfolio
// @access  Private
router.put("/:id", auth, async (req, res) => {
  console.log('Portfolio Update Route hit')
  const { name } = req.body;
  const portfolioFields = {};
  if (name) portfolioFields.name = name;
  try {
    let portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ msg: "Portfolio does not exist" });
    }
    // if (portfolio.user.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: "Not authorized" });
    // }
    portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { $set: portfolioFields },
      { new: true }
    );
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE
// @desc    Delete Portfolio
// @access  Private
// @TODO    update ordering of validation
router.delete("/:id", auth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ msg: "Portfolio does not exist" });
    }
    if (portfolio.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
