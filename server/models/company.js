const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    companyName: String,
    companyLogo: String,
    companySize: String,
    headquarters: String,
    companyField: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const companyModel = mongoose.model("companies", companySchema);

module.exports = companyModel;
