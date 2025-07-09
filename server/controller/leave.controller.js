const leaveModel = require("../models/leave");

// get User Leave
export const getUserLeave = async (req, res) => {
  let { userId, userRole, campanyId } = req.user;
  try {
    // If Employe hit api so us ko apni Leaves Record show hogiii agr admin or hr hua use sb kiii
    if (userRole === "employee") {
      let employeLeaves = await leaveModel
        .find({
          userId,
          // approvalStatus: "Approved",
        })
        .sort({ createdAt: -1 });
      return res.status(200).json({ message: "Sucess", data: employeLeaves });
    }
    // ----------------------------------------------------
    let allLeaves = await leaveModel
      .find({
        companyId: campanyId,
        // approvalStatus: "Approved",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Sucess", data: allLeaves });
  } catch (error) {
    console.log("error", error);

    res.status(500).json({ message: "Server Error" });
  }
};

// // get (Multiples) Users Leave
// export const getUsersLeave = async (req, res) => {
//   let { campanyId } = req.user;
//   try {
//     let data = await leaveModel.find({ companyId: campanyId });

//     res.status(200).json({ message: "Sucess", data });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// get Requestted Leaves 
export const getLeavesRequests = async (req, res) => {
  let {campanyId, userRole} = req.user
  if(userRole === 'employee') return res.status(401).json({message : 'Credentails issue'})

  try{
    let allRequests = await leaveModel.find({
      companyId : campanyId,
      status : 'Pending'
    })

    res.status(200).json({message : 'sucess', data : allRequests})
  }
  catch(error){
    res.status(500).json({message : 'Serevr error'})
  }
}

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
  let { userRole } = req.user;
  let { status, LeaveId } = req.body;
  try {
    let updated = await leaveModel.findByIdAndUpdate(leaveId, {
      $set: { status, approvedBy: userRole },
    });
    res.status(200).json({ message: "sucessfully updated" });
  } catch (error) {
    res.status(500).json({ message: "Serevr error" });
  }
};
