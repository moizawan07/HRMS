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
  try{
    let allUsers = await userModel.find({ 
      role: { $in: ["employee", "hr"] }, 
      campanyId,
    });

   if(allUsers.length <= 0) return res.status(400).json({message : 'No Users Found In Your Company'})
    

    let now = new Date();

let todayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
let todayEnd = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59));
    // let todayStart = new Date();
    // todayStart.setHours(0, 0, 0, 0); // 12:00 AM

    // let todayEnd = new Date();
    // todayEnd.setHours(23, 59, 59, 999); // 11:59:59 PM
    
    
    let todaysAttendances = await attendenceModel.find({
    date: { $gte: todayStart, $lte: todayEnd },
    companyId: campanyId
});

console.log("todayattendence==>", todaysAttendances);


let attendedUserIds = todaysAttendances.map(att => att.userId.toString());

let unattendedUsers = allUsers.filter(
  user => !attendedUserIds.includes(user._id.toString())
);


if(unattendedUsers.length <= 0) return res.status(400).json({message : 'All Users add attendence already'})
  
for (let user of unattendedUsers) {
  await attendenceModel.create({
    userId: user._id,
    companyId : user.campanyId,
    email : user.email,
    date:  new Date().toISOString().split("T")[0], // Aaj ki date
    status: "Absent", // Status auto ho gaya
    createdBy: "system", // System ne lagai hai, user ne nahi
    approvalStatus: "Approved",
    approvedBy : 'Admin'
  });
}

    res.status(200).json({message : 'Attendence Update it'})

  }
  catch(error){
    res.status(500).json({message : 'server error'})
  }

}



module.exports = { attendenceGet, attendenceAdd, approvalStatusChanged, attendenceRequestGet, markUnAttended };
