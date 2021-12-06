const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Username is required'],
      match: [/\S+@\S+\.\S+/, 'Email is not valid'],
      trim: true,
    },
    password:{
      type: String,
    },
    professionalExperience: [{
      companyName: {type: String, required: [true, 'Company name is required']},
      jobTitle: {type: String, required: [true, 'Job title is required']},
      jobDescription: {type: String, required: [true, 'Job description is required']},
      startDate: {type: Date, required: [true, 'Start date is required']},
      endDate: Date,
      salary: Number,
    }] 
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;

// name (string, required)
// lastName (string, required)
// password (string, unique, match, required)
// email (string, unique, match: [/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, 'Password is not valid'], lowercase: true, required)
// birth (date, required: {true, 'You must be 18 years old'})
// mobileNumber (number, maxlength: 9, match: [])
// postalCode (number, required:[true, 'Postal code is required'])
// province (string, required: [true, 'Province is required'])
// profilePicture (string, default: 'url img predeterminada')
// professionalExperience: [{
//   companyName: String,
//   jobDescription: String,
//   startDate: Date,
// }]
// studiesLevel (string, required: [true, 'Studies level is required'])
// savedjobOffers ({type: Schema.Types.ObjectId, ref: 'JobOffer'})
// appliedJobOffers ({type: Schema.Types.ObjectId, ref: 'JobOffer'})
// favoriteCompanies ({type: Schema.Types.ObjectId, ref: 'Company'})