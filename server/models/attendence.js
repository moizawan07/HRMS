const mongoose = require("mongoose");

const schema = mongoose.schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Leave"],
  }, // selected by user
  date: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  }, // JWT se niklega, kis ne daali
  approvalStatus: {
    type: String,
    enum: ["Pending", "Approved", "Reject"],
  }, // optional: pending / approved / rejected
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  //   checkIn: "09:00",
  //   checkOut: "17:00",
});

const attendenceModel = mongoose.model("attendence", schema);
