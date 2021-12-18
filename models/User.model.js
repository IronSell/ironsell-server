const { Schema, model } = require('mongoose');
require('mongoose-type-url');

const userSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
    email: {
      type: String,
      match: [/\S+@\S+\.\S+/, 'Email is not valid'],
      lowercase: true,
      trim: true,
      unique: true,
      required: [true, 'Username is required'],
    },
    password: {
      type: String,
      match: [/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, 'Password is not valid'],
      required: [true, 'Password is required'],
      trim: true,
    },
    birth: { type: Date, required: [true, 'Birth is required'] },
    telephoneNumber: {
      type: Number,
      maxlength: 9,
      required: [true, 'Number is required'],
    },
    postalCode: {
      type: String,
      maxlength: 5,
      required: [true, 'Postal code is required'],
    },
    province: { type: String, required: [true, 'Province is required'] },
    profilePicture: {
      type: String,
      default:
        'https://res.cloudinary.com/dafy78pru/image/upload/v1639148882/default-candidate-image_yzvjdg.png',
    },
    profession: String,
    professionalProfiles: {
      github: String,
      linkedin: String,
      instagram: String,
      facebook: String,
      web: String,
    },
    professionalExperience: [{
      companyName: {
        type: String,
      },
      jobTitle: { type: String },
      jobDescription: {
        type: String,
      },
      startDate: { type: Date },
      endDate: { type: Date },
      salary: { type: Number },
    }],
    studiesLevel: {
      type: String,
    },
    savedJobs: {
      type: [Schema.Types.ObjectId],
      ref: 'JobOffer',
    },
    appliedJobs: {
      type: [Schema.Types.ObjectId],
      ref: 'JobOffer',
    },
    favoriteCompanies: {
      type: [Schema.Types.ObjectId],
      ref: 'Company',
    },
    isCompany: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
