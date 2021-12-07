const router = require("express").Router();
const User = require("../models/User.model");

const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');