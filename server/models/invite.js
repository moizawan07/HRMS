const mongoose = require("mongoose");

const schema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  companyName: String,
  companyLogo: String,
  companySize: String,
  headquarters: String,
  companyField: String,
  invitedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const inviteModel = mongoose.model("invites", schema);

module.exports = inviteModel;
