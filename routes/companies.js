const router = require('express').Router();
const fileUploader = require('../config/cloudinary.config');

// Models
const Company = require('../models/Company.model');

//Middleware
const isCompanyLoggedIn = require('../middleware/isCompanyLoggedIn');
const isLoggedIn = require('../middleware/isLoggedIn');

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
    const showCompany = await Company.findById(req.params._id).populate('jobOffers');
    return res.status(200).json({ message: 'Company found', showCompany });
  } catch (err) {
    return res
      .status(404)
      .json({ errorMessage: 'Company page does not exist' });
  }
});

// GET company profile
router.get('/profile/:_id', isCompanyLoggedIn, async (req, res) => {
  try {
    const showCompany = await Company.findById(req.params._id);
    return res.status(200).json({ message: 'Company found', showCompany });
  } catch (err) {
    return res
      .status(404)
      .json({ errorMessage: 'Company page does not exist' });
  }
});

// UPDATE/EDIT company profile
router.patch(
  '/:id',
  fileUploader.single('company-logo'),
  isCompanyLoggedIn,
  async (req, res) => {
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

    let imageUrl;
    req.file ? (imageUrl = req.file.path) : (imageUrl = companyLogo);

    try {
      const updateCompany = await Company.findByIdAndUpdate(
        req.params.id,
        {
          name,
          email,
          password,
          professionalSector,
          cif,
          address,
          companyDescription,
          province,
          companyUrl,
          companyLogo,
        },
        { new: true }
      );
      return res.status(200).json({ message: 'Company edited', editCompany });
    } catch (err) {
      return res.status(400).json({ message: 'Cannot update the company' });
    }
  }
);

//DELETE company profile
router.delete('/delete/:_id', isCompanyLoggedIn, async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params._id);
    return res.status(200).json({ message: 'Company deleted', deletedCompany });
  } catch (err) {
    return res.status(400).json({ message: 'Cannot delete the company' });
  }
});

module.exports = router;
