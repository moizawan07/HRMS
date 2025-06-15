const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: String,
    companyLogo: String,
    companySize: String,
    headquarters: String,
    companyField: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const companyModel = mongoose.model('companies', companySchema)


module.exports  = companyModel
