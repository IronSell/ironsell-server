const { Schema, model } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const sessionCompanySchema = new Schema(
  {
    user: { type: ObjectId, ref: 'Company' },
    createdAt: {
      type: Date,
      default: Date.now(),
      index: { expires: 1000 * 60 * 60 * 24 * 7 }, // 1 week.
    },
  },
  {
    timestamps: true,
  }
);

const SessionCompany = model('SessionCompany', sessionCompanySchema);

module.exports = SessionCompany;
