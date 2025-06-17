const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    role: {
      type: String,
      enum: ["owner", "admin", "hr", "employee"],
    },
    phoneNumber: String,
    companyName: String,
    companyLogo: String,
    companySize: String,
    headquarters: String,
    companyField: String,
     companyId : String,
    invitedBy: {
      type: String,
      enum: ["owner", "admin", "hr", "employee"],
    },
    salary : String
  },
  {
    timestamps: true,
  }
);

const inviteModel = mongoose.model("invites", schema);

module.exports = inviteModel;
