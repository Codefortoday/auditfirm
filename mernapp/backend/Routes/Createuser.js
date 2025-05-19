const express = require('express')
const router = express.Router()
const User = require('../models/User')
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const bcrypt =require('bcryptjs');
const jwt=require("jsonwebtoken");
const jwtSecret="Helloniftybanknifty5200$$"


// Multer setup for image storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Save images in an 'uploads' folder
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const upload = multer({ storage });

  //create user route
router.post("/createuser",upload.single('image'),
    body('email').isEmail(),
    body('pass', "too small").isLength({ min: 6 })
    , async (req, res) => {

       //let imageUrl = ""   //'req.file ? `/uploads/${req.file.filename}`';

    // if (req.file) {
    //   imageUrl = `/uploads/${req.file.filename}`;
    // }

        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        const salt= await bcrypt.genSalt(10);
        let securePass= await bcrypt.hash(req.body.pass,salt);

        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
        try {
            await User.create({
                name: req.body.name,
                pass: securePass,
                email: req.body.email,
                phone: req.body.phone,
                location: req.body.location,
                Client_type:req.body.Client_type,
                image: imageUrl
            })
            res.json({ success: true });
        } 
        catch (error) {
            console.log(error);
            
            res.status(500).json({ success: false, message: "Enter valid data" });

        }
    })
router.post("/loginuser", body('email').isEmail(),
    body('pass', "too small").isLength({ min: 6 })
    , async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ error: "Try entering proper credentials" });
            }
            const pwdCompare= await bcrypt.compare(req.body.pass,userData.pass)
            if (!pwdCompare){
                return res.status(400).json({ error: "Try entering proper credentials" });
            }          
            const data={
                user:{
                    id:userData.id
                }
            }
            const authToken= jwt.sign(data,jwtSecret)
            return res.json({ success: true , authToken:authToken});
            
        } catch (error) {
            console.log(error);            
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    })
    const fetchUser = (req, res, next) => {
        const token = req.header("auth-token");
        if (!token) {
          return res.status(401).json({ error: "Access Denied" });
        }
        try {
          const data = jwt.verify(token, jwtSecret);
          req.user = data.user;
          next();
        } catch (error) {
          return res.status(401).json({ error: "Invalid Token" });
        }
      };
      // 🔹 Update User Profile (Name, Phone, Password Reset)
router.put(
    "/updateprofile",
    fetchUser,
    [
      body("name", "Name is required").optional().notEmpty(),
      body("phone", "Invalid phone number").optional().isMobilePhone(),
      body("password", "Password must be at least 6 characters").optional().isLength({ min: 6 }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        let user = await User.findById(req.user.id);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
  
        // Update name and phone
        if (req.body.name) user.name = req.body.name;
        if (req.body.phone) user.phone = req.body.phone;
  
        // Update password if provided
        if (req.body.password) {
          const salt = await bcrypt.genSalt(10);
          user.pass = await bcrypt.hash(req.body.password, salt);
        }
  
        await user.save();
        res.json({ success: true, message: "Profile updated successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      }
    }
  );
  router.get("/profile", fetchUser, async (req, res) => {
    try {
      let user = await User.findById(req.user.email).select("-pass"); // Exclude password from response
      if (!user) return res.status(404).json({ error: "User not found" });
  
      res.json(user); // Send user data
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
    
module.exports = router;