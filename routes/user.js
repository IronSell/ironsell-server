const router = require("express").Router();
const User = require("../models/User.model");

const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');

//Models
const User = require("../models/User.model");
const Session = require('../models/Session.model');

//Middleware
const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');

//Get user profile
router.get('/user/:_id', isLoggedIn, async (req, res) => {
    try {
      const showUser = await User.find(req.params._id);
      // res.status(200).json({ message:  })
    } catch (err) {
      return res.status(404).json({ errorMessage: 'User profile does not exist'})
    }
  })
  
module.exports = router;
//Get favorites
//Get applied offers
//Get edit profile