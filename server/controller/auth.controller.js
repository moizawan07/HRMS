let userModel = require("../models/user");
let companyModel = require("../models/company");
let jwt = require("jsonwebtoken");
let bcryptJs = require("bcryptjs");
const sendMail = require("../utils/mailer");
let crypto = require('crypto')
let resetPasswordTempl = require('../utils/reset-passwordTempl')


// Login
const login = async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials1" });
    let passMatch = await bcryptJs.compare(password, user.password);
    if (!passMatch)
      return res.status(400).json({ message: "Invalid Credentials2" });
    let simpleUser = user.toObject();
    // If Owner To sirf Use Apna Data reqturn bad am apis hit kr ka woh sb companies ka data nikal lai ga
    if (user.role === "owner") {
      let payload = {
        userId: user._id,
        userName: user.firstName,
        userEmail: user.email,
        userRole: user.role,
      };

      let token = jwt.sign(payload, process.env.JWT_AUTH_SCRET);

      // Cookies Set
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 din
      });
      return res
        .status(200)
        .json({
          message: "Sucessfully Login1",
          data: { user: { ...simpleUser } },
        });
    }

    let company = await companyModel.findById(user.campanyId);
    if (!company)
      return res.status(400).json({ message: "No Company Matched" });

    let simpleCompany = company.toObject();

    let payload = {
      userId: user._id,
      userName: user.firstName,
      userEmail: user.email,
      userRole: user.role,
      campanyId: company._id,
      companyName: company.companyName,
      companyLogo: company.companyLogo,
    };

    let token = jwt.sign(payload, process.env.JWT_AUTH_SCRET);

    // Cookies Set
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 din
    });

    res.status(200).json({
      message: "Sucessfully Login",
      data: { user: { ...simpleUser }, company: { ...simpleCompany } },
    });
  } catch (error) {
    console.log("errors==>", error);

    return res.status(500).json({ message: "Server Error" });
  }
};

// ForgetPasword
const forgetPassword = async (req, res) => {
  let { email } = req.body;

  try {
    let user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentails" });
    const token = crypto.randomBytes(20).toString("hex");

    // Expiry time set
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 120000; // 2 mnt
    await user.save();

     const resetLink = `http://localhost:5173/reset-password/${token}`;

    let emailTemplate = resetPasswordTempl(user.firstName, resetLink)

    sendMail({
      to: "ahmedmoizawan007@gmail.com", // user.email
      subject: "Reset Password",
      html: emailTemplate,
    });

     res.status(200).json({message : 'Sucess'})

  } catch (error) {
    console.log("catch ==>", error);
    
    res.status(500).json({ message: "Server Error" });
  }
};

// Reset password
const resetPassword =  async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try{
  const user = await userModel.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired token" });

  const hashedPassword = await bcryptJs.hash(password, 10);
  user.password = hashedPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  await user.save();

  res.status(200).json({ message: "Password successfully reset!" });
}
catch(error){
  res.status(500).json({ message: "server errrr!" });
} 
};



module.exports = { login, forgetPassword , resetPassword};
