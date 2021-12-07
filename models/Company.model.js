const { Schema, model } = require('mongoose');

require('mongoose-type-url');

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      unique: true,
    },
    email: {
      type: String,
      match: [/\S+@\S+\.\S+/, 'Email is not valid'],
      lowercase: true,
      trim: true,
      unique: true,
      required: [true, 'Username is required'],
    },
    professionalSector: {
      type: String,
      required: [true, 'Professional sector is required'],
    },
    cif: {
      type: String,
      maxlength: 9,
      required: [true, 'CIF is required'],
      unique: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    province: {
      type: String,
      required: [true, 'Province is required'],
    },
    jobOffers: {
      type: [Schema.Types.ObjectId],
      ref: 'JobOffer',
    },
    companyUrl: [{ type: Schema.Types.Url }],
    companyLogo: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

const Company = model('Company', companySchema);

module.exports = Company;
