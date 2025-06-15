const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    campanyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
    },
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phoneNumber: String,
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    dateOfBirth: {
      type: Date,
    },
    address: String,
    role: {
      type: String,
      enum: ["owner", "admin", "hr", "employee"],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", schema);

module.exports = userModel
