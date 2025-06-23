let userModel = require("../models/user");

// Fetch All Users Collection and send
const fetchAllUsers = async (req, res) => {
  let {campanyId} = req.user
  try {
    let allUsers = await userModel.find({ role: { $nin: ["admin"] }, campanyId});


    if (!allUsers) return res.status(400).json({ message: "Users is Empty" });

    res.status(200).json({ message: "Sucess", data: allUsers });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}


// Admin Updated Salary
const updatedSalary = async (req, res) => {
    let {userId, salary} = req.body
    
  try{
      let updated = await userModel.findByIdAndUpdate(userId, {salary})
    res.status(200).json({message : 'SucessFully Updated'})
  }
  catch(error){
    res.status(500).json({message : 'Serevr Error'})
  }
}

module.exports = {fetchAllUsers, updatedSalary}
