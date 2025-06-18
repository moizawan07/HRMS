let attendenceModel = require("../models/attendence");
let userModel = require("../models/user");

// Attendence Record get and show the attendence
const attendenceGet = async (req, res) => {
  let { userId, userRole, campanyId } = req.user;
  try {
    // If Employe hit api so us ko apni attendence show hogiii agr admin or hr hua use sb kiii
    if (userRole === "employee") {
      let employeAttendence = await attendenceModel.find({
        userId,
        approvalStatus: "Approved",
      });
      return res
        .status(200)
        .json({ message: "Sucess", data: employeAttendence });
    }
    // ----------------------------------------------------
    let allAttendence = await attendenceModel.find({
      companyId: campanyId,
      approvalStatus: "Approved",
    });
    res.status(200).json({ message: "Sucess", data: allAttendence });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// user hr add attendence
const attendenceAdd = async (req, res) => {
  let { email, status, date } = req.body;
  let { userRole, campanyId } = req.user;
  try {
    let user = await userModel.findOne({ email });
    if (!user || user.role === 'admin' ) return res.status(400).json({ message: "Invalid Credentails" });

    let addAtten = await attendenceModel.create({
      userId: user._id,
      companyId : campanyId,
      email,
      status,
      date,
      createdBy: userRole,
      approvalStatus: "Pending",
    });

    res.status(200).json({ message: "Attendence Submit" });
  } catch (error) {
   console.log('catch==>', error.message);
   
    res.status(500).json({ message: "Server Error" });
  }
};

// ApprovalStatus Change Like  Approved / Reject Attendence Hr And Admin
const approvalStatusChanged = async (req, res) => {
  let { attendenceId, approvalMsg } = req.body;
  try {
    let user = await attendenceModel.findById(attendenceId);
    if (!user)
      return res.status(400).json({ message: "Invalid Attendence id" });

    user.approvalStatus = approvalMsg;
    user.approvedBy = req.user.userRole;

    await user.save();

    res.status(200).json({ message: "Sucessfully Updated The Status" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


const attendenceRequestGet = async (req, res) => {
  let { userRole, campanyId } = req.user;
    if(userRole === 'employee') return res.status(400).json({message : 'Credentails issue'})

  try {
    // ----------------------------------------------------
    let allAttendence = await attendenceModel.find({
      companyId: campanyId,
      approvalStatus: "Pending",
    });
    res.status(200).json({ message: "Sucess", data: allAttendence });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { attendenceGet, attendenceAdd, approvalStatusChanged, attendenceRequestGet };
