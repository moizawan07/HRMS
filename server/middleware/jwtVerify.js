const jwt = require("jsonwebtoken");

const jwtVerify = async (req, res, next) => {
  const {token} = req.cookies;
  // console.log("token ==>", token);

  if (!token) {
    return res.status(400).json({ message: "Token not provided" });
  }

  try {
    const decodeToken =  jwt.verify(token, process.env.JWT_AUTH_SCRET);
    req.user = decodeToken;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = jwtVerify;
