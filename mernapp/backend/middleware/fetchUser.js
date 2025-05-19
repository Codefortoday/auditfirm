// const jwt = require("jsonwebtoken");
// const JWT_SECRET = 'Helloniftybanknifty5200$$'; // Use the same secret as in your backend

// const fetchUser = (req, res, next) => {
//     // Get token from request header
//     const token = req.header("authToken");
//     if (!token) {
//         return res.status(401).json({ success: false, message: "Access Denied: No token provided" });
//     }

//     try {
//         const data = jwt.verify(token, JWT_SECRET);
//         req.user = data.user; // Assign user data to req.users
//         next();
//     } catch (error) {
//         res.status(401).json({ success: false, message: "Invalid token" });
//     }
// };

// module.exports = fetchUser;






 const jwt = require('jsonwebtoken');
 const JWT_SECRET = "Helloniftybanknifty5200$$"; // secret key

// // const fetchUser = (req, res, next) => {
// //     // Get the token from the request header
// //     const token = req.header('authToken');
    
// //     if (!token) {
// //         return res.status(401).json({ error: "Access Denied: No token provided" });
// //     }

// //     try {
// //         // Verify token and extract user data
// //         const data = jwt.verify(token, JWT_SECRET);
// //         req.user = data.user; // Attach user info to request object
// //         next(); // Call the next middleware/route handler
// //     } catch (error) {
// //         return res.status(401).json({ error: "Invalid Token" });
// //     }
// // };

// // module.exports = fetchUser;

const fetchUser = (req, res, next) => {
    const token = req.header("Authorization"); // ✅ Updated to get 'Authorization' header
    if (!token) {
        return res.status(401).json({ success: false, message: "Access Denied: No token provided" });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET); //  Extract token correctly
        req.user = decoded.user;  //  Ensuring `req.user.id` is accessible
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};

module.exports = fetchUser;
