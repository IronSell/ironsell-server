const router = require('express').Router();

// Models
const Company = require('../models/Company.model');
const Session = require('../models/Session.model');

//Middleware
const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');

//
