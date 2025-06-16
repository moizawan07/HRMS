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
      companyLogo: result.secure_url,
      link: `${process.env.Invite_Link}/${addin._id}`,
    });

    await sendMail({
      to: 'ahmedmoizawan007@gmail.com', // email
      subject: `You're Invited to Join ${companyName}`,
      html: htmlContent,
    });

    res.status(200).json({ message: "Invite sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



// 2 Invite User OR Hr => By Company Admin
const userOrHrInvite = async (req, res) => {
  let {} = req.body;

  let addin = await inviteModel.create({
    firstName,
    lastName,
    email,
    role,
    phoneNumber,
    companyName,
    companyLogo,
    invitedBy,
  });

  let token = jwt.sign(
    { companyInviteId: addin._id },
    process.env.JWT_INVITE_SECRET,
    { expiresIn: "2d" }
  );

  const htmlContent = generateInviteEmail({
    companyName,
    companyLogo,
    link: `http://localhost:5173/verify/${token}`,
  });

  await sendMail({
    to: email,
    subject: `You're Invited to Join ${companyName}`,
    html: htmlContent,
  });

  res.status(200).json({ message: "Invite sent successfully" });
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
    let{ firstName,lastName,email,password,gender,address, id,role, phoneNumber,dateOfBirth,   // user schems
         companyName, companyLogo, companySize, headquarters, companyField,      // company schema
    } = req.body
   let hashPass = await bcryptJs.hash(password, 10)
   
    if(companySize){
      let companyAdd = await companyModel.create({
        companyName, companyLogo, companySize, headquarters, companyField
      })
      let userAdd =  await userModel.create({
        firstName,lastName,email,password:hashPass, gender,address, campanyId: companyAdd._id ,role, phoneNumber,dateOfBirth,
      })
    }else{
      let userAdd = await userModel.create({
        firstName,lastName,email,password,gender,address, campanyId : id,  role, phoneNumber,dateOfBirth
      })
    }
    res.status(200).json({message : 'sucess fullly add'})
  }
   catch (error) {
    console.log('error==>', error.message);
    
    res.status(500).json({message : 'server error'})
   }
}  

// All Exports
module.exports = { companyInvite, userOrHrInvite, inviteVerify, inviteAccept };
