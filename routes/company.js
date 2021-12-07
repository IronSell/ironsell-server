const router = require('express').Router();

// Models
const Company = require('../models/Company.model');
const Session = require('../models/Session.model');

//Middleware
const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');

// GET company page
router.get('/company/:_id', isLoggedIn, async (req, res) => {
  try {
    const showCompany = await Company.find(req.params._id);
    // res.status(200).json({ message:  })
  } catch (err) {
    return res.status(404).json({ errorMessage: 'Company page does not exist'})
  }
})

module.exports = router;