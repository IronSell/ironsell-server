const router = require('express').Router();

// Models
const User = require('../models/User.model');

// Middleware
const isLoggedOut = require('../middleware/isLoggedOut');
const isLoggedIn = require('../middleware/isLoggedIn');

//GET search candidates page
router.get('/search', isLoggedIn, async (req, res) => {
  try {
    const showCandidates = await User.find();
    // showCandidates: showCandidates
    // Esto hace falta ponerlo aquí o directamente en react?
    return res.status(200).json({ message: 'All good mate 👍' });
  } catch (err) {
    return res.status(404).json({ message: 'Page not found' });
  }
});

//GET candidate profile
router.get('/:_id', isLoggedIn, async (req, res) => {
  try {
    const showUser = await User.find(req.params._id);
    return res.status(200).json({ message: 'Profile found', showUser });
  } catch (err) {
    return res.status(404).json({ errorMessage: 'This user does not' });
  }
});

module.exports = router;
