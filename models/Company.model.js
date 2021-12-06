const { Schema, model } = require('mongoose');

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Company = model('Company', companySchema);

module.exports = Company;

professioanlSector (string, required: [true, 'Professioanl sector is required'])
cif  (string, maxlength: 9)
address (string, required: [true, 'Address is required'])
province (string, required: [true, 'Province is required'])
jobOffers: { type: [Schema.Types.ObjectId], ref: "JobOffer" }
