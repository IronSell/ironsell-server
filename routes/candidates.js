const router = require('express').Router();

// Models
const User = require('../models/User.model');

// Middleware
const isLoggedOut = require('../middleware/isLoggedOut');
const isLoggedIn = require('../middleware/isLoggedIn');

// GET candidates page
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const getCandidates = await User.find();
    return res
      .status(200)
      .json({ message: 'Candidates found 👍', getCandidates });
  } catch (err) {
    return res.status(404).json({ message: 'Page not found' });
  }
});

// GET candidate profile
router.get('/:_id', isLoggedIn, async (req, res) => {
  try {
    const showUser = await User.findById(req.params._id);
    return res.status(200).json({ message: 'Candidate found', showUser });
  } catch (err) {
    return res.status(404).json({ errorMessage: 'This user does not' });
  }
});

module.exports = router;
