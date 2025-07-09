const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
    },
    name: String,
    email: String,
    fromDate: Date,
    toDate: Date,
    reason: String,
    type: {
      type: String,
      enum: ["Casual", "Sick", "Annual"],
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Declined"],
      default : 'Pending'
    },
    approvedBy: {
      type: String,
      enum: ["Admin", "Hr"],
      default : null,
    },
  },
  { timestamps: true }
);

const leaveModel = mongoose.model("leaves", schema);

module.exports = leaveModel;
