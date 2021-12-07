const router = require("express").Router();

//Models
const User = require("../models/User.model");
const Company = require("../models/Company.model")
const JobOffer = require("../model/JobOffer.model")

//Middleware
const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');

//Get user profile
router.get('/:_id', isLoggedIn, async (req, res) => {
    try {
      const showUser = await User.find(req.params._id);
      return res.status(200).json({ message: 'Profile found', showUser });
    } catch (err) {
      return res.status(404).json({ errorMessage: 'User profile does not exist'})
    }
  })

//Get search companies
router.get('/companies', async (req, res) => {
    try {
      const searchCompany = await Company.find();
      return res.status(200).json({ message: 'Companies found', searchCompany});
    } catch (err) {
      return res.status(404).json({ errorMessage: 'Companies not found'})
    }
  })

//Get company
router.get('/companies/:_id', isLoggedIn, async (req, res) => {
    try {
      const showCompany = await Company.find(req.params._id);
      return res.status(200).json({ message: 'Company found', showCompany });
    } catch (err) {
      return res.status(404).json({ errorMessage: 'Company not found'})
    }
  })


//Get search offers
router.get('/offers', async (req, res) => {
    try {
      const searchOffers = await JobOffer.find();
      return res.status(200).json({ message: 'Offers found', searchOffers});
    } catch (err) {
      return res.status(404).json({ errorMessage: 'Offers not found'})
    }
  })

//Get offer
router.get('/offers/:_id', isLoggedIn, async (req, res) => {
    try {
      const showOffer = await JobOffer.find(req.params._id);
      return res.status(200).json({ message: 'Offer found', showOffer });
    } catch (err) {
      return res.status(404).json({ errorMessage: 'Offer not found'})
    }
  })

//Get favorites offers


//Get applied offers


//Get edit profile
  router.patch('/update/:_id', isLoggedIn, async (req, res) => {
    try {
      const editProfile = await User.findByIdAndUpdate(req.params._id);
      return res.status(200).json({ message: 'Profile edited', editProfile });
    } catch (err) {
      return res.status(400).json({ message: 'Cannot update the profile' });
    }
  });


  module.exports = router;
