const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const User = require("../models/User")

router.get("/all-musicians", (req, res) => {
  User.find({artistType: 'musician'})
  .then(allMusicians => {
    res.json({allMusicians})
  })
})

router.get("/all-bands", (req, res) => {
  User.find({artistType: 'band'})
  .then(allBands => {
    res.json({allBands})
  })
})

router.get("/guitarists", (req, res) => {
  User.find({artistType: 'musician'})
  .then(allGuitarists => {
    res.json({allGuitarists})
  })
})


module.exports = router;