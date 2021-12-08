const { Schema, model } = require('mongoose');

const jobOfferSchema = new Schema(
  {
    jobTitle: {
      type: String,
      required: [true, 'Job title is required'],
    },
    experienceYears: {
      type: Number,
      required: [true, 'Experience years is required'],
    },
    salary: {
      type: Number,
      maxlength: 7,
      max: 999.999,
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
    schedule: {
      type: String,
      required: [true, 'Schedule is required'],
    },
    candidates: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const JobOffer = model('JobOffer', jobOfferSchema);

module.exports = JobOffer;
