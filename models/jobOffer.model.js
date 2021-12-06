const { Schema, model } = require('mongoose');

const jobOfferSchema = new Schema(
  {
    jobTitle: {
      type: String,
      required: [true, 'Job title is required'],
    },
  },
  {
    timestamps: true,
  }
);

const JobOffer = model('JobTitle', jobOfferSchema);

module.exports = JobOffer;
