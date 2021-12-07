const router = require('express').Router();

// Models
const Company = require('../models/Company.model');


//Middleware
const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');

// GET company page
router.get('/:_id', async (req, res) => {
  try {
    const showCompany = await Company.find(req.params._id);
    return res.status(200).json({ message: 'Company found', showCompany });
  } catch (err) {
    return res
      .status(404)
      .json({ errorMessage: 'Company page does not exist' });
  }
});

router.patch('/update/:_id', isLoggedIn, async (req, res) => {
  try {
    const editCompnay = await Company.findByIdAndUpdate(req.params._id)
    return res.status(200).json({ message: 'Company edited', editCompany })
  } catch
})

module.exports = router;
