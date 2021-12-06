const { Schema, model } = require('mongoose');

const jobOfferSchema = new Schema(
  {
    jobTitle: {
      type: String,
      required: [true, 'Job title is required'],
    },
    experiencieYears:{
      type: Number,
      required: [true, 'experiencie Years is required'],
    },
    Salary:{
      type: Number,
      required: [true, 'Salary is required'],
    },
    province:{
      string, required: [true, 'Province is required']
    }
  },
  {
    timestamps: true,
  }
);

const JobOffer = model('JobTitle', jobOfferSchema);

module.exports = JobOffer;
