const router = require('express').Router();
const fileUploader = require('../config/cloudinary.config');

//Models
const User = require('../models/User.model');

//Middleware
const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');

//Get user profile
router.get('/profile/:_id', isLoggedIn, async (req, res) => {
  try {
    const showUser = await User.findById(req.params._id);
    return res.status(200).json({ message: 'Profile found', showUser });
  } catch (err) {
    return res.status(404).json({ errorMessage: 'This user does not' });
  }
});

// Get applied offers

// UPDATE/EDIT candidate profile
router.patch(
  '/:_id',
  fileUploader.single('profile-picture'),
  isLoggedIn,
  async (req, res) => {
    const {
      name,
      lastName,
      email,
      password,
      birth,
      telephoneNumber,
      postalCode,
      province,
      profilePicture,
      profession,
      professionalProfiles,
      professionalExperience,
      studiesLevel,
    } = req.body;

    let imageUrl;
    req.file ? (imageUrl = req.file.path) : (imageUrl = profilePicture);
    
    try {
      const editProfile = await User.findByIdAndUpdate(
        req.params._id,
        {
          name,
          lastName,
          email,
          password,
          birth,
          telephoneNumber,
          postalCode,
          province,
          profilePicture,
          profession,
          professionalProfiles,
          professionalExperience,
          studiesLevel,
        },
        { new: true }
      );
      return res.status(200).json({ message: 'Profile edited', editProfile });
    } catch (err) {
      return res.status(400).json({ message: 'Cannot update the profile' });
    }
  }
);

// DELETE profile
router.delete('/profile/:_id', isLoggedIn, async (req, res) => {
  // quitar /delete
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
