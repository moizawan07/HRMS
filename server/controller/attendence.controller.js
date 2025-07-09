let attendenceModel = require("../models/attendence");
let userModel = require("../models/user");
let moment = require('moment')

// Attendence Record get and show the attendence
const attendenceGet = async (req, res) => {
  let { userId, userRole, campanyId } = req.user;
  try {
    // If Employe hit api so us ko apni attendence show hogiii agr admin or hr hua use sb kiii
    if (userRole === "employee") {
      let employeAttendence = await attendenceModel.find({
        userId,
        approvalStatus: "Approved",
      }).sort({createdAt : -1});
      return res
        .status(200)
        .json({ message: "Sucess", data: employeAttendence });
    }
    // ----------------------------------------------------
    let allAttendence = await attendenceModel.find({
      companyId: campanyId,
      approvalStatus: "Approved",
    }).sort({createdAt : -1});

    res.status(200).json({ message: "Sucess", data: allAttendence });
  } catch (error) {
    console.log("error" , error);
    
    res.status(500).json({ message: "Server Error" });
  }
};

// user hr add attendence
const attendenceAdd = async (req, res) => {
  let { email, status } = req.body;
  let { userRole, campanyId } = req.user;

  try {
    let user = await userModel.findOne({ email, campanyId });
    if (!user || user.role === 'admin') {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const now = moment();
    const twentyFourHoursAgo = moment().subtract(24, 'hours');
    console.log("now ==>", now);
    console.log("twenetyFours Hour Ago ==>", twentyFourHoursAgo);
    

    let alreadyMarked = await attendenceModel.findOne({
      userId: user._id,
      companyId: campanyId,
      createdAt: { $gte: twentyFourHoursAgo.toDate(), $lte: now.toDate() },
    });

    if (alreadyMarked) {
      return res.status(400).json({ message: "Attendance already marked in the last 24 hours" });
    }

    await attendenceModel.create({
      userId: user._id,
      companyId: campanyId,
      email,
      status,
      date: now.format("YYYY-MM-DD"),
      createdBy: userRole,
      approvalStatus: "Pending",
    });

    res.status(200).json({ message: "Attendance Submitted" });

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


// Attendence Reqest Get kis kis user kii Approval Status Pending ha us ka liye
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


// Mark Unattended Attendence  jo user ne mark nhi kii us kii to wo system kr dai ga 
const markUnAttended = async (req, res) => {
  let { campanyId } = req.user;

  try {
    let allUsers = await userModel.find({
      role: { $in: ["employee", "hr"] },
      campanyId,
    });

    if (allUsers.length <= 0)
      return res.status(400).json({ message: 'No Users Found In Your Company' });

    const now = moment();
    const twentyFourHoursAgo = moment().subtract(24, 'hours');

    let recentAttendances = await attendenceModel.find({
      companyId: campanyId,
      createdAt: { $gte: twentyFourHoursAgo.toDate(), $lte: now.toDate() },
    });

    let attendedUserIds = recentAttendances.map(att => att.userId.toString());

    let unattendedUsers = allUsers.filter(
      user => !attendedUserIds.includes(user._id.toString())
    );

    if (unattendedUsers.length <= 0)
      return res.status(400).json({ message: 'All Users already marked attendance' });

    for (let user of unattendedUsers) {
      await attendenceModel.create({
        userId: user._id,
        companyId: user.campanyId,
        email: user.email,
        date: now.format("YYYY-MM-DD"),
        status: "Absent",
        createdBy: "system",
        approvalStatus: "Approved",
        approvedBy: "Admin"
      });
    }

    res.status(200).json({ message: 'Unattended users marked as Absent' });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};




module.exports = { attendenceGet, attendenceAdd, approvalStatusChanged, attendenceRequestGet, markUnAttended };
