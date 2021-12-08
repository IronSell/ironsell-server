const router = require('express').Router();

//Models
const User = require('../models/User.model');
const Company = require('../models/Company.model');
const JobOffer = require('../models/JobOffer.model');

//Middleware
const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');

//Get user profile
router.get('/profile', isLoggedIn, async (req, res) => {
  try {
    return res.status(200).json({ message: 'Profile found', showUser });
  } catch (err) {
    return res.status(404).json({ errorMessage: 'This user does not' });
  }
});

//Get favorites offers
// router.get('/favorites', isLoggedIn, async (req, res) => {
//   try {
//     const savedJobs = await User.
//   } catch (err) {
//     return res.status(404).json({message: 'Page is not found'})
//   }
// })

//Get applied offers

//UPDATE/EDIT profile
router.patch('/edit/:_id', isLoggedIn, async (req, res) => {
  try {
    const editProfile = await User.findByIdAndUpdate(req.params._id);
    return res.status(200).json({ message: 'Profile edited', editProfile });
  } catch (err) {
    return res.status(400).json({ message: 'Cannot update the profile' });
  }
});

// DELETE profile
router.delete('/profile/:_id', isLoggedIn, async (req, res) => {
  try {
    const deletedProfile = await User.findByIdAndDelete(req.params._id);
    return res
      .status(200)
      .json({ message: 'Profile deleted successfuly', deletedProfile });
  } catch (err) {
    return res.status(400).json({ messsage: 'Cannot delete profile' });
  }
});

module.exports = router;