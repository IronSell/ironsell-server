const mongoose = require('mongoose');
require('dotenv').config();

const JobOffer = require('../models/JobOffer.model');

const jobOffers = [
  {
    jobTitle: 'Computer technician frontend ionic angular developer',
    experienceYears: '3+ years',
    salary: ' 22.900 -34.770',
    province: 'Valencia',
    description: `In this position you will have:
    - Innovative projects of high relevance in the company, working with cutting-edge technologies.
    - Continuous training adapted to your needs and internal promotion.
    - Constant learning as part of an experienced team within the IT Department.
    - Good working environment and job security
    - Direct contact with the best specialist suppliers`,
    requirements:`- Higher Level Training Cycle in Computer Science
    - Minimum experience of 3 years in the sector
    - Knowledge in:
    - HTML5, CSS, Javascript, JSON, Git (or version control)
    - Angular (v5 or higher)
    - Cordova / Ionic (ionic3 or higher)
    - Jasmine (unit test)`,
    schedule: 'Full-time',
    company:'Mercadona',
  },
  {
    jobTitle: 'Back Office Agent Foreclosed Assets',
    experienceYears: '1+ year',
    salary: '12.000€ - 15.000€',
    province: 'Palma De Mallorca',
    description: `- Making payments, balancing of accounts.
    - Telematic processing with public bodies (capital gains, Ibis, taxes, garbage, Cadastre).
    - Preparation of documentation of the Bank's adjudicated properties for sale and sending to the notary's office.
    - Proceedings with communities of owners.`,
    requirements:
  `- Availability for Immediate Incorporation
    - Responsible and methodical
    - Previous experience in banking / real estate / management or similar position for the preparation of documents for the sale of a property.
    - Notions on taxes, rates, capital gains, energy certificates, management of communities of owners.`,
    schedule: 'Part-time',
    company:'Prosegur',
  },
  {
    jobTitle: 'Call Center Agent customer service and banking Backoffice',
    experienceYears: '2+ years',
    salary: '15.000€ - 18.000€',
    province: 'Barcelona',
    description: `As a Call Center Agent your duties will consist of:
    - Reception and issuance of calls from customers of the Entity.
    - DB management according to previously established requirements.
    - Management of specific campaigns
    - Attending incoming and outgoing information contacts of products and services by electronic means.`,
    requirements:`- Languages: Spanish and native Catalan essential; English high (B2); German medium high (B1-B2).
    - Flexibility to work shifts, weekends and holidays.
    - Availability for immediate incorporation
    - Communication skills
    - Team work
    - Experience in Banking and/or Contact Center sector
    - Management skills
    - Ability to solve problems
    - Tolerance`,
    schedule: 'Full-time',
    company:'Prosegur',
  },
  {
    jobTitle: 'Santander IT Talent Program',
    experienceYears: '1+ year',
    salary: '18.000€ - 24.000€',
    province: 'Remote',
    description: `Through the Santander IT Talent Program, you will have the opportunity to enter a specific development plan focused on digital innovation oriented to new technologies and agile methodologies where you will have training in both technical and professional skills, which will allow you to be the engine of change in Santander Technology.
    Our goal is that you acquire the necessary skills to develop a successful career in the software industry, and that you want to continue facing professional challenges with us`,
    requirements:'Formative cycles of the family of computer science and communications.',
    schedule: 'Full-time',
    company:'Santander',
  },
  {
    jobTitle: 'Front-end Developer',
    experienceYears: '3+ years of professional experience in software development',
    salary: '30.000 - 45.000',
    province: 'Valencia',
    description: 'We are looking for a Front-End Web Developer who is motivated to combine the art of design with the art of programming. Your primary responsibilities might vary from: (1) develop new user-facing features, (2) build reusable code and libraries for future use, (3) ensure the technical feasibility of UI/UX designs, (4) optimize application for maximum speed and scalability, (5) assure that all user input is validated before submitting to back-end, and (6) collaborate with other team members and stakeholders.',
    requirements: `Proficient understanding of web markup, including HTML5, CSS3
    Basic understanding of server-side CSS pre-processing platforms, such as LESS and SASS
    Proficient understanding of client-side scripting and JavaScript frameworks, including jQuery
    Good understanding of asynchronous request handling, partial page updates, and AJAX
    Basic knowledge of image authoring tools, to be able to crop, resize, or perform small adjustments on an image. Familiarity with tools such as Gimp or Photoshop is a plus.
    Proficient understanding of cross-browser compatibility issues and ways to work around them.
    Proficient understanding of code versioning tools
    Experience with React is a strong advantage.
    Experience with system architecture or leading a software team is a strong advantage
    Full-time availability is a strong advantage`,
    schedule: 'Full-time',
  },
  {
    jobTitle: 'Frontend Developer (React)',
    experienceYears: '3+ years',
    salary: '36.000 - 48.000',
    province: 'Málaga',
    description:  `We are looking for a talented and passionate Frontend Developer to work ad collaborate on existing + greenfield projects and in time will be able to define their own tech stack.

    As our Frontend Developer you get to collaborate, develop and design it all end to end. You will get to work on architecture, application responsiveness, new features and performance together. You will work with quality at your heart and will be surrounded by like minded people so you can bring your creative mind to the decisions we make.
    
    If you have React, CSS & JS experience, then great! If you want to work remotely, then great! If you want to relocate to the Costa del Sol in Spain, then great! But most of all if you want to work in a Hyper growth Startup with a great culture, on a great project then great!`,
    requirements: 'To ensure success as a react.js developer, you should have in-depth knowledge of JavaScript and React concepts, excellent front-end coding skills, and a good understanding of progressive web applications. Ultimately, a top-class react.js developer should be able to design and build modern user interface components to enhance application performance.',
    schedule: 'Full-time',
  },
  {
    jobTitle: 'Angular FrontEnd Developer',
    experienceYears: '3+ years',
    salary: '35.000 - 43.000',
    province: 'Madrid',
    description: `From New Tandem we are looking for a Frontend Developer with knowledge of HTML, JQuery, Javascript and Angular framework as well as a bit of PHP.

    You will be responsible for code development, debugging, testing, integration, and support ofpossible incidences.
    
    We offer:
    
    * Flexible working hours, a young team, a great atmosphere and loads of opportunities.
    * Permanent contract with our client.`,
    requirements: `Upper Grade Educational Cycle or technical degree that involves programming.
    * Javascript knowledge.
    * Angular experience (It´s essential)
    * GIT version control knowledge is a plus.
    * PHP and VueJs knowledge is a plus.
    * Proactive, accountable, flexible, analytical, pragmatic.
    * High motivation to learn and grow.`,
    schedule: 'Full-time',
  },
  // {
  //   jobTitle: '',
  //   experienceYears: '',
  //   salary: '',
  //   province: '',
  //   description: '',
  //   requirements:'',
  //   schedule: '',
  //   company:'',
  // },
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

const jobOffersCreate = async () => {
  try {
    await JobOffer.create(jobOffers);
    await mongoose.connection.close();
  } catch (err) {
    console.log('ERROR: ', err);
  }
};
jobOffersCreate();