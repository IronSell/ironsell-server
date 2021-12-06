const { Schema, model } = require('mongoose');

require('mongoose-type-url');

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      unique: true,
    },
    professionalSector: {
      type: String,
      required: [true, 'Professioanl sector is required'],
    },
    cif: {
      type: String,
      maxlength: 9,
      required: [true, 'CIF is required'],
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
    companyUrl: [{type: Schema.Types.Url}],
  },
  {
    timestamps: true,
  }
);

const Company = model('Company', companySchema);

module.exports = Company;
