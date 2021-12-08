const mongoose = require('mongoose');
require('dotenv').config();

const Company = require('../models/Company.model');

const companies = [
  {
    name: 'Nacho',
    email: 'nacho@nacho.com',
    password: 'Coche123456',
    birth: '1991/07/24',
    telephoneNumber: '666666666',
    postalCode: '46020',
    province: 'Valencia',
  },
  {
    name: 'Nacho',
    lastName: 'Benito',
    email: 'nacho22@nacho.com',
    password: 'Coche123456',
    birth: '1991/02/24',
    telephoneNumber: '666666666',
    postalCode: '46020',
    province: 'Valencia',
  },
];

const MONGODB_URI = process.env.MONGODB_URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Mongo');
  } catch (err) {
    console.log('Error connecting to Mongo: ', err);
  }
};
connectToMongo();

const companiesCreate = async () => {
  try {
    await Company.create(companies);
    await mongoose.connection.close();
  } catch (err) {
    console.log('ERROR: ', err);
  }
};
companiesCreate();