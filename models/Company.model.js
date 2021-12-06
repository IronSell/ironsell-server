const { Schema, model } = require('mongoose');

require('mongoose-type-url');

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: [ true, 'Company name is required' ],
      unique: true,
    },
    professionalSector:{ 
      string, required: [ true, 'Professioanl sector is required']
     },
    cif:{
        string, maxlength: 9
    },
    address:{
      string, required: [true, 'Address is required']
    },
    province:{
      string, required: [true, 'Province is required']
    },
    jobOffers:{ 
      type: [Schema.Types.ObjectId], ref: "JobOffer"
    },
    url:{
      company: [Schema.Types.Url]
    }
  },
    
  {
    timestamps: true,
  }
);

const Company = model('Company', companySchema);

module.exports = Company;





