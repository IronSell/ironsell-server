const router = require('express').Router();

//Models
const JobOffer = require('../models/JobOffer.model');

//Middleware
const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');

// GET search offers
router.get('/', async (req, res) => {
  try {
    const searchOffers = await JobOffer.find();
    return res.status(200).json({ message: 'Offers found', searchOffers });
  } catch (err) {
    return res.status(404).json({ errorMessage: 'Offers not found' });
  }
});

// GET offer
router.get('/:_id', isLoggedIn, async (req, res) => {
  try {
    const showOffer = await JobOffer.find(req.params._id);
    return res.status(200).json({ message: 'Offer found', showOffer });
  } catch (err) {
    return res.status(404).json({ errorMessage: 'Offer not found' });
  }
});

// UPDATE/EDIT job offer
router.patch('/update/:_id', isLoggedIn, async (req, res) => {
  try {
    const updatedJobOffer = await JobOffer.findByIdAndUpdate(req.params._id);
    return res
      .status(200)
      .json({ message: 'Offer update successfuly', updatedJobOffer });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'Cannot update job offer', updatedJobOffer });
  }
});

// DELETE offer
router.delete('/delete/:_id', isLoggedIn, async (req, res) => {
  try {
    const deletedOffer = await JobOffer.find(req.params._id);
    return res.status(200).json({ message: 'Offer deleted', deletedOffer });
  } catch (err) {
    return res.status(404).json({ errorMessage: 'Cannot delete the offer' });
  }
});

module.exports = router;
