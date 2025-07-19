const mongoose = require("mongoose");

const schema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies",
  },
  salary: Number,
  salaryDate : Date,
  generated: {
    type : String,
   enum: ["admin", "Hr"],
  }
}, 
{timestamps : true}
);

const salaryModel = mongoose.model("salaries", schema);


module.exports = salaryModel;