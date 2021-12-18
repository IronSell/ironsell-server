const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User.model');

const users = [
  {
    name: 'Nacho',
    lastName: 'Benito',
    email: 'nacho@nacho.com',
    password: 'User1234',
    birth: '07/23/1991',
    telephoneNumber: '666666666',
    postalCode: '46020',
    province: 'Valencia',
    profilePicture: 'https://res.cloudinary.com/dafy78pru/image/upload/v1639249579/FAB5BA1E-7234-44B8-8FD8-9C28C13C5845_ji77mh.jpg',
  },
  {
    name: 'Federico',
    lastName: 'Altava',
    email: 'fede@fede.com',
    password: 'User1234',
    birth: '06/30/1992',
    telephoneNumber: '666666666',
    postalCode: '12001',
    province: 'Castellon',
    profilePicture: 'https://avatars.githubusercontent.com/u/91974251?v=4',
  },
  {
    name: 'Rocio',
    lastName: 'Garcia',
    email: 'rocio@rocio.com',
    password: 'User1234',
    birth: '05/05/1989',
    telephoneNumber: '666666666',
    postalCode: '28045',
    province: 'Madrid',
    profilePicture: 'https://avatars.githubusercontent.com/u/91464194?v=4',
  },
  {
    name: 'Aaron',
    lastName: 'Lopez',
    email: 'aaron@aaron.com',
    password: 'User1234',
    birth: '01/01/2000',
    telephoneNumber: '666666666',
    postalCode: '80001',
    province: 'Barcelona',
    profilePicture: 'https://avatars.githubusercontent.com/u/92530312?v=4',
  },
  {
    name: 'Sherab',
    lastName: 'Pereira',
    email: 'sherab@sherab.com',
    password: 'User1234',
    birth: '01/01/2000',
    telephoneNumber: '666666666',
    postalCode: '80001',
    province: 'Barcelona',
    profilePicture: 'https://avatars.githubusercontent.com/u/34879233?v=4',
  },
  {
    name: 'Santiago',
    lastName: 'Jiménez',
    email: 'santi@santi.com',
    password: 'User1234',
    birth: '01/01/2000',
    telephoneNumber: '666666666',
    postalCode: '28001',
    province: 'Madrid',
    profilePicture: 'https://avatars.githubusercontent.com/u/13215841?v=4',
  },
  {
    name: 'Nerea',
    lastName: 'Pardo',
    email: 'nerea@nerea.com',
    password: 'User1234',
    birth: '01/01/2000',
    telephoneNumber: '666666666',
    postalCode: '280001',
    province: 'Faro',
    profilePicture: 'https://avatars.githubusercontent.com/u/77238108?v=4',
  },
  {
    name: 'Guillem',
    lastName: 'Ferrer',
    email: 'guillem@guillem.com',
    password: 'User1234',
    birth: '01/01/2000',
    telephoneNumber: '666666666',
    postalCode: '28001',
    province: 'Barcelona',
    profilePicture: 'https://avatars.githubusercontent.com/u/10597459?v=4',
  },
  {
    name: 'Jose',
    lastName: 'Gutierrez',
    email: 'jose@jose.com',
    password: 'User1234',
    birth: '01/01/2000',
    telephoneNumber: '666666666',
    postalCode: '28001',
    province: 'Sevilla',
    profilePicture: 'https://avatars.githubusercontent.com/u/91822616?v=4',
  },
  {
    name: 'Tatiana',
    lastName: 'Prada',
    email: 'tatiana@tatiana.com',
    password: 'User1234',
    birth: '01/01/2000',
    telephoneNumber: '666666666',
    postalCode: '28001',
    province: 'Porto',
    profilePicture: 'https://media-exp1.licdn.com/dms/image/C4D03AQGkLCeqm6DsDw/profile-displayphoto-shrink_400_400/0/1636621873932?e=1645056000&v=beta&t=7sjqIK5IHOLG1Apyrh0RJ7EZL-V8TnTpfzkPaTVTEL8',
  },
  {
    name: 'Raquel',
    lastName: 'Hidalgo',
    email: 'raquel@raquel.com',
    password: 'User1234',
    birth: '01/01/2000',
    telephoneNumber: '666666666',
    postalCode: '46001',
    province: 'Valencia',
    profilePicture: 'https://media-exp1.licdn.com/dms/image/C4D03AQEHDRehk1Q61g/profile-displayphoto-shrink_400_400/0/1636111583515?e=1645056000&v=beta&t=u-XRS4faeDl_U5qEsVkQEMBm1-6SKiddgv2XPT8nZSE',
  },
  {
    name: 'Federico',
    lastName: 'Gómez',
    email: 'federico@federico.com',
    password: 'User1234',
    birth: '01/01/2000',
    telephoneNumber: '666666666',
    postalCode: '46001',
    province: 'Valencia',
    profilePicture: 'https://res.cloudinary.com/dafy78pru/image/upload/v1639148882/default-candidate-image_yzvjdg.png',
  },
  {
    name: 'Fernando',
    lastName: 'Ortega',
    email: 'fernando@fernando.com',
    password: 'User1234',
    birth: '01/01/2000',
    telephoneNumber: '666666666',
    postalCode: '28001',
    province: 'Madrid',
    profilePicture: 'https://res.cloudinary.com/dafy78pru/image/upload/v1639148882/default-candidate-image_yzvjdg.png',
  },
  {
    name: 'Fernando',
    lastName: 'Cases',
    email: 'nando@nando.com',
    password: 'User1234',
    birth: '01/01/2000',
    telephoneNumber: '666666666',
    postalCode: '28000',
    province: 'Estocolmo',
    profilePicture: 'https://media-exp1.licdn.com/dms/image/C4E03AQHagB04nyABDA/profile-displayphoto-shrink_400_400/0/1631754014127?e=1645056000&v=beta&t=qPEztwJDMeZX6YBvDQydVWChmSkLgZzvythjWnRC2ew',
  },
  {
    name: 'Jose',
    lastName: 'Luis',
    email: 'joseluis@joseluis.com',
    password: 'User1234',
    birth: '01/01/2000',
    telephoneNumber: '666666666',
    postalCode: '28000',
    province: 'Salamanca',
    profilePicture: 'https://avatars.githubusercontent.com/u/91371183?v=4',
  },
  {
    name: 'Germán',
    lastName: 'Fuegote',
    email: 'german@german.com',
    password: 'User1234',
    birth: '01/01/2000',
    telephoneNumber: '666666666',
    postalCode: '28045',
    province: 'Madrid',
    profilePicture: 'https://cdn.discordapp.com/attachments/904648192711340089/920302562006167572/Captura_de_pantalla_2021-12-14_a_las_14.13.01.png',
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

const usersCreate = async () => {
  try {
    await User.create(users);
    await mongoose.connection.close();
  } catch (err) {
    console.log('ERROR: ', err);
  }
};
usersCreate();
