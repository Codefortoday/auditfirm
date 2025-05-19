// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");

// dotenv.config();

// const adminAuth = (req, res, next) => {
//   const token = req.header("Authorization");

//   if (!token) {
//     return res.status(401).json({ message: "Access Denied. No token provided." });
//   }

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
    
//     if (!verified || verified.role !== "superadmin") {
//       return res.status(403).json({ message: "Access Denied. Only Super Admins allowed." });
//     }

//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid Token." });
//   }
// };

// module.exports = adminAuth;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const adminAuth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "defaultSecret");
    if (!verified || verified.role !== "admin") return res.status(403).json({ message: "Access Denied" });

    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};


module.exports = adminAuth;

