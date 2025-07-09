const leaveModel = require("../models/leave");

// get (Single )User Leave
export const getUserLeave = async (req, res) => {
  let { userId } = req.user;
  try {
    let data = await leaveModel.find({ userId });

    res.status(200).json({ message: "Sucess", data });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// get (Multiples) Users Leave
export const getUsersLeave = async (req, res) => {
  let { campanyId } = req.user;
  try {
    let data = await leaveModel.find({ companyId: campanyId });

    res.status(200).json({ message: "Sucess", data });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Create A Leave
export const createALeave = async (req, res) => {
  let { userId, campanyId } = req.user;
  let { name, email, fromDate, toDate, reason, type } = req.body;

  try {
    let create = await leaveModel.create({
      userId,
      companyId: campanyId,
      name,
      email,
      fromDate,
      toDate,
      reason,
      type,
    });
    res.status(200).json({ message: "Submitted" });
  } catch (error) {
    res.status(500).json({ message: "Serevr error" });
  }
};

// Leave Status Changed Approved Or
export const updateLeaveStatus = async (req, res) => {
    let {userRole} = req.user
    let {status, LeaveId} = req.body
  try {
    let updated =  await leaveModel.findByIdAndUpdate(leaveId, {$set: {status, approvedBy : userRole }})
    res.status(200).json({ message: "sucessfully updated" });

  } catch (error) {
    res.status(500).json({ message: "Serevr error" });
  }
};
