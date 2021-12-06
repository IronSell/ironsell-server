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
      match: 3,
      required: [true, 'Number is required'],
    },
    postalCode: {
      type: Number,
      maxlength: 5,
      required: [true, 'Postal code is required'],
    },
    province: { type: String, required: [true, 'Province is required'] },
    profilePicture: {
      type: String,
      default: '',
    },
    professionalProfiles: [{ type: Schema.Types.Url }],
    professionalExperience: [
      {
        companyName: {
          type: String,
          required: [true, 'Company name is required'],
        },
        jobTitle: { type: String, required: [true, 'Job title is required'] },
        jobDescription: {
          type: String,
          required: [true, 'Job description is required'],
        },
        startDate: { type: Date, required: [true, 'Start date is required'] },
        endDate: { type: Date },
        salary: { type: Number },
      },
    ],
    studiesLevel: {
      type: String,
      required: [true, 'Studies level is required'],
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
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
