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
    salary:{
      type: Number,
      required: [true, 'Salary is required'],
    },
    province:{
      string, required: [true, 'Province is required']
    },
    description:{
      string, required: [true, 'Description is required']
    },
    schedule: {
      string, required: [true, 'Schedule is required']
    }
  },
  {
    timestamps: true,
  }
);

const JobOffer = model('JobOffer', jobOfferSchema);

module.exports = JobOffer;

