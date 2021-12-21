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
    password: {
      type: String,
      match: [/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, 'Password is not valid'],
      required: [true, 'Password is required'],
      trim: true,
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
    companyDescription: {
      type: String,
      default:
        'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc metus odio, molestie ut leo at, sollicitudin auctor mauris. Nunc cursus faucibus enim ut pretium. Sed pulvinar ipsum sed commodo porttitor. Praesent commodo a sapien at accumsan. Nam nisi magna, consectetur nec ex non, facilisis tempor tortor. Nam non urna elit. Curabitur laoreet, nibh eget luctus iaculis, ligula sapien pulvinar nisl, sed pharetra libero libero ac metus. Cras mattis finibus nulla ac blandit. Vestibulum nec velit varius, mattis nisl sit amet, pulvinar quam. Fusce vitae scelerisque nulla. Fusce lacinia nec elit eu congue. Vivamus blandit ultricies turpis, nec aliquet neque congue vel. Quisque interdum tincidunt rhoncus.',
    },
    province: {
      type: String,
      required: [true, 'Province is required'],
    },
    jobOffers: [{ type: Schema.Types.ObjectId, ref: 'JobOffer' }],
    companyUrl: { type: Schema.Types.Url },
    linkedIn: { type: Schema.Types.Url },
    facebook: { type: Schema.Types.Url },
    instagram: { type: Schema.Types.Url },
    companyLogo: {
      type: String,
      default:
        'https://res.cloudinary.com/dafy78pru/image/upload/v1639090003/default-company-logo_tqgr0i.png ',
    },
    isCompany: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Company = model('Company', companySchema);

module.exports = Company;
