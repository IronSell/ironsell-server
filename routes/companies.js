const router = require('express').Router();

// Models
const Company = require('../models/Company.model');

//Middleware
const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');

//GET companies page
router.get('/', async (req, res) => {
  try {
    const searchCompany = await Company.find();
    return res
      .status(200)
      .json({ message: 'Companies found 👍', searchCompany });
  } catch (err) {
    return res.status(404).json({ errorMessage: 'Companies not found' });
  }
});

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

// UPDATE/EDIT company profile
router.post('/update/:id', async (req, res) => {
  const {
    name,
    email,
    password,
    professionalSector,
    cif,
    address,
    companyDescription,
    province,
    jobOffers,
    companyUrl,
    companyLogo,
  } = req.body;
  try {
    const updateCompany = await Company.findByIdAndUpdate(req.params.id);
    return res.status(200).json({ message: 'Company edited', editCompany });
  } catch (err) {
    return res.status(400).json({ message: 'Cannot update the company' });
  }
});

//DELETE company profile
router.delete('/delete/:_id', isLoggedIn, async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params._id);
    return res.status(200).json({ message: 'Company deleted', deletedCompany });
  } catch (err) {
    return res.status(400).json({ message: 'Cannot delete the company' });
  }
});

module.exports = router;
