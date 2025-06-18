let attendenceModel = require('../models/attendence')
let userModel = require('../models/user')

// user hr add attendence
const attendenceAdd = async (req, res) => {
   let {email, status, date} = req.body;
   let user = await userModel.findOne({email})
      if(!user) return res.status(400).json({message : 'Invalid Email Add'})

   let addAtten = await attendenceModel.create({
    userId : user._id,
    email,
    status,
    date, 
    createdBy : req.user.role,
    approvalStatus : 'Pending',
   })

   res.status(200).json({message : 'Attendence Submit'})
}

// ApprovalStatus Change Like  Approved / Reject Attendence Hr And Admin  
const approvalStatusChanged = async (req, res) => {
   let {attendenceId, approvalMsg} = req.body;
   let user = await attendenceModel.findById(attendenceId)
      if(!user) return res.status(400).json({message : 'Invalid Attendence id'})

    user.approvalStatus = approvalMsg
    user.approvedBy = req.body.role

    await user.save()

   res.status(200).json({message : 'Sucessfully Updated The Status'})
}


module.exports = {attendenceAdd,approvalStatusChanged}