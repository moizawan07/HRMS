//  Models Imports
const userModel = require("../models/user");
const companyModel = require("../models/company");
const inviteModel = require("../models/invite");
let jwt = require("jsonwebtoken");
let { generateInviteEmail } = require("../utils/emailTemplate");
let sendMail = require("../utils/mailer");
let {uploadToCloudinary} = require("../config/cloudinary");
let moment = require('moment')
let bcryptJs = require('bcryptjs')




// 1 Invite Company Admin => By Owner
const companyInvite = async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      email,
      role,
      phoneNumber,
      companyName,
      companySize,
      headquarters,
      companyField,
    } = req.body;

    let emailReserverd = await  userModel.findOne({email})
       if(emailReserverd) return res.status(400).json({ message: "This Email is Reserved"});
    // 1. Upload logo
    const result = await uploadToCloudinary(req.file.buffer);

    // 2. Save in DB
    const addin = await inviteModel.create({
      firstName,
      lastName,
      email,
      role,
      phoneNumber,
      companyName,
      companyLogo: result.secure_url,
      companySize,
      headquarters,
      companyField,
      invitedBy: "owner", // Replace with req.user._id ideally
    });

    // // 3. Token 
    // const token = jwt.sign(
    //   { companyInviteId: addin._id },
    //   process.env.JWT_INVITE_SECRET,
    //   { expiresIn: "2d" }
    // );

    const htmlContent = generateInviteEmail({
      companyName,
      role,
      companyLogo: result.secure_url,
      link: `${process.env.Invite_Link}/${addin._id}`,
    });

    await sendMail({
      to: 'ahmedmoizawan007@gmail.com', // email
      subject: `Youre Invited to Join as an ${role} In ${companyName}`,
      html: htmlContent,
    });

    res.status(200).json({ message: "Invite sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// 2 Invite Employee OR Hr => By Company Admin
const EmployeeOrHrInvite = async (req, res) => {
  let {firstName, lastName, email, role, phoneNumber, salary} = req.body;
  // console.log('req.user', req.user);

   let emailReserverd = await  userModel.findOne({email})
       if(emailReserverd) return res.status(400).json({ message: "This Email is Reserved"});
  
  try {
  let addin = await inviteModel.create({
    firstName,
    lastName,
    email,
    role,
    phoneNumber,
    companyName : req.user.companyName,
    companyId : req.user.campanyId,
    companyLogo : req.user.companyLogo,
    invitedBy : req.user.userRole,
    salary,
  });

  // let token = jwt.sign(
  //   { companyInviteId: addin._id },
  //   process.env.JWT_INVITE_SECRET,
  //   { expiresIn: "2d" }
  // );

  const htmlContent = generateInviteEmail({
     companyName: req.user.companyName,
     role,
     companyLogo : req.user.companyLogo,
    link: `http://localhost:5173/verify/${addin._id}`,
  });

  await sendMail({
    to: "ahmedmoizawan007@gmail.com", // 'Replace with the user email'
    subject: `You're Invited to Join as an ${role} In  ${req.user.companyName}`,
    html: htmlContent,
  });

  res.status(200).json({ message: "Invite sent successfully" });
} 
  catch (error) {
    console.log('errror==>',error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 3: All Invite verify Function like company means admin hr and employee
const inviteVerify = async (req, res) => {
  let {id} = req.params;
  console.log('id ==>', id);
   try {
    const invite = await inviteModel.findById(id);
    console.log('invite==>', invite.firstName);
    
    if (!invite) return res.status(404).json({ message: "Invite not found" });

    const now = moment();
    const createdAt = moment(invite.createdAt);
    const diffInHours = now.diff(createdAt, "hours");

    if (diffInHours > 48) {
      return res.status(400).json({ message: "Invite expired" });
    }

    res.status(200).json(invite);
  } catch (err) {
    console.log('catch==>', err.message);
    
    res.status(500).json({ message: "Server error" });
  }
  
}

// 4: Invite Accept 
const inviteAccept =  async (req, res) => {
   try {
    let{ firstName,lastName,email,password,gender,address, _id,role, phoneNumber,dateOfBirth, invitedBy, salary,   // user schems
         companyName, companyId, companyLogo, companySize, headquarters, companyField,      // company schema
    } = req.body

    console.log('inviteaccept api body==>', req.body);
   let hashPass = await bcryptJs.hash(password, 10)
   
    if(companySize){
      let companyAdd = await companyModel.create({
        companyName, companyLogo, companySize, headquarters, companyField
      })
      let userAdd =  await userModel.create({
        firstName,lastName,email,password:hashPass, gender,address, campanyId: companyAdd._id ,role, phoneNumber,dateOfBirth,
        invitedBy,
      })
    }else{
      let userAdd = await userModel.create({
        firstName,lastName,email,password : hashPass, gender, address, campanyId : companyId, invitedBy,  role, phoneNumber,dateOfBirth, salary
      })
    }
    let inviteDocumentDelet = await inviteModel.findByIdAndDelete(_id);
    res.status(200).json({message : 'sucess fullly add'})
  }
   catch (error) {
    console.log('error==>', error);
    
    res.status(500).json({message : 'server error'})
   }
}  

// All Exports
module.exports = { companyInvite, EmployeeOrHrInvite, inviteVerify, inviteAccept };
