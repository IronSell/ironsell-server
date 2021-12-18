const router = require('express').Router();

// ℹ️ Handles password encryption
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require('../models/User.model');
const Session = require('../models/Session.model');
const SessionCompany = require('../models/SessionCompany.model');
const Company = require('../models/Company.model');

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require('../middleware/isLoggedOut');
const isLoggedIn = require('../middleware/isLoggedIn');
const isCompanyLoggedIn = require('../middleware/isCompanyLoggedIn');

// GET candidate session
router.get('/session', (req, res) => {
  // we dont want to throw an error, and just maintain the user as null
  if (!req.headers.authorization) {
    return res.json(null);
  }

  // accessToken is being sent on every request in the headers
  const accessToken = req.headers.authorization;

  Session.findById(accessToken)
    .populate('user')
    .then((session) => {
      if (!session) {
        return res.status(404).json({ errorMessage: 'Session does not exist' });
      }
      return res.status(200).json(session);
    });
});

// GET candidate session
router.get('/session-company', (req, res) => {
  // we dont want to throw an error, and just maintain the user as null
  if (!req.headers.authorization) {
    return res.json(null);
  }

  // accessToken is being sent on every request in the headers
  const accessToken = req.headers.authorization;

  SessionCompany.findById(accessToken)
    .populate('user')
    .then((session) => {
      if (!session) {
        return res.status(404).json({ errorMessage: 'Session does not exist' });
      }
      return res.status(200).json(session);
    });
});

// GET login/signup user page
router.get('/login/user', isLoggedOut, async (req, res) => {
  res.json('You are in login/singup user poage');
});

//GET login/singup company page
router.get('/login/company', isLoggedOut, async (req, res) => {
  res.json('You are in login/signup company page');
});

// POST signup user
router.post('/signup/user', isLoggedOut, (req, res) => {
  const {
    name,
    lastName,
    password,
    email,
    birth,
    telephoneNumber,
    province,
    postalCode,
  } = req.body;

  if (
    !name ||
    !lastName ||
    !email ||
    !birth ||
    !telephoneNumber ||
    !province ||
    !postalCode
  ) {
    return res.status(400).json({ errorMessage: 'Please fill all inputs.' });
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(400).json({
      errorMessage:
        'Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.',
    });
  }

  // Search the database for a user with the username submitted in the form
  User.findOne({ email }).then((found) => {
    // If the user is found, send the message username is taken
    if (found) {
      return res.status(400).json({ errorMessage: 'Email already taken.' });
    }

    // if user is not found, create a new user - start with hashing the password
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        // Create a user and save it in the database
        return User.create({
          name,
          lastName,
          email,
          password: hashedPassword,
          birth,
          telephoneNumber,
          province,
          postalCode,
        });
      })
      .then((user) => {
        Session.create({
          user: user._id,
          createdAt: Date.now(),
        }).then((session) => {
          res.status(201).json({ user, accessToken: session._id });
        });
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage:
              'Email need to be unique. The username you chose is already in use.',
          });
        }
        return res.status(500).json({ errorMessage: error.message });
      });
  });
});

// POST signup company
router.post('/signup/company', isLoggedOut, (req, res) => {
  const {
    name,
    email,
    password,
    professionalSector,
    cif,
    address,
    province,
    companyUrl,
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !professionalSector ||
    !cif ||
    !address ||
    !province ||
    !companyUrl
  ) {
    return res.status(400).json({ errorMessage: 'Please fill all inputs.' });
  }

  // This use case is using a regular expression to control for special characters and min length
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(400).json({
      errorMessage:
        'Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.',
    });
  }

  // Search the database for a user with the username submitted in the form
  Company.findOne({ email }).then((found) => {
    // If the user is found, send the message username is taken
    if (found) {
      return res.status(400).json({ errorMessage: 'Email already taken.' });
    }

    // if user is not found, create a new user - start with hashing the password
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        // Create a user and save it in the database
        return Company.create({
          name,
          email,
          password: hashedPassword,
          professionalSector,
          cif,
          address,
          province,
          companyUrl,
        });
      })
      .then((user) => {
        SessionCompany.create({
          user: user._id,
          createdAt: Date.now(),
        }).then((session) => {
          res.status(201).json({ user, accessToken: session._id });
        });
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage:
              'Email need to be unique. The username you chose is already in use.',
          });
        }
        return res.status(500).json({ errorMessage: error.message });
      });
  });
});

// POST login user
router.post('/login/user', isLoggedOut, (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ errorMessage: 'Please fill all inputs.' });
  }

  // Search the database for a user with the username submitted in the form
  User.findOne({ email })
    .then((user) => {
      // If the user isn't found, send the message that user provided Incorrect email or password
      if (!user) {
        return res
          .status(400)
          .json({ errorMessage: 'Incorrect email or password.' });
      }

      // If user is found based on the username, check if the in putted password matches the one saved in the database
      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res
            .status(400)
            .json({ errorMessage: 'Incorrect email or password.' });
        }
        Session.create({ user: user._id, createdAt: Date.now() }).then(
          (session) => {
            return res.json({ user, accessToken: session._id });
          }
        );
      });
    })

    .catch((err) => {
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});

// POST login company
router.post('/login/company', isLoggedOut, (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ errorMessage: 'Please fill all inputs.' });
  }

  // Search the database for a user with the username submitted in the form
  Company.findOne({ email })
    .then((user) => {
      // If the user isn't found, send the message that user provided Incorrect email or password
      if (!user) {
        return res
          .status(400)
          .json({ errorMessage: 'Incorrect email or password.' });
      }

      // If user is found based on the username, check if the in putted password matches the one saved in the database
      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res
            .status(400)
            .json({ errorMessage: 'Incorrect email or password.' });
        }
        SessionCompany.create({ user: user._id, createdAt: Date.now() }).then(
          (session) => {
            return res.json({ user, accessToken: session._id });
          }
        );
      });
    })

    .catch((err) => {
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});

// DELETE candidate session
router.delete('/logout', isLoggedIn, (req, res) => {
  Session.findByIdAndDelete(req.headers.authorization)
    .then(() => {
      res.status(200).json({ message: 'User was logged out' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    });
});

// DELETE company session
router.delete('/logout/company', isCompanyLoggedIn, (req, res) => {
  console.log('delete company');
  SessionCompany.findByIdAndDelete(req.headers.authorization)
    .then(() => {
      res.status(200).json({ message: 'User was logged out' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    });
});

module.exports = router;
