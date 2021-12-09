const { Schema, model } = require('mongoose');

const jobOfferSchema = new Schema(
  {
    jobTitle: {
      type: String,
      required: [true, 'Job title is required'],
    },
    experienceYears: {
      type: String,
      required: [true, 'Experience years are required'],
    },
    salary: {
      type: String,
      required: [true, 'Salary is required'],
    },
    province: {
      type: String,
      required: [true, 'Province is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    requirements: {
      type: String,
      required: [true, 'Requirements are required'],
    },
    schedule: {
      type: String,
      required: [true, 'Schedule is required'],
    },
    company: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
    candidates: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

const JobOffer = model('JobOffer', jobOfferSchema);

module.exports = JobOffer;
