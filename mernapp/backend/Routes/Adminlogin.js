const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin"); // Import Admin Schema
const router = express.Router();


// Admin Login Route
router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin.name===req.body) {
      return res.status(400).json({ message: "Admin not found" });
    }
    //console.log("Stored Hashed Password:", admin.password);
    //console.log("Entered Password:", password);

    // Comparing input password with hashed password from DB
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //  environment variable for the secret key
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET || "defaultSecret",
      { expiresIn: "1h" }
    );

    res.json({ token, message: "Admin logged in successfully" });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

const adminAuth = require("../middleware/adminAuth");

// Only existing admin can add another admin
router.post("/admin/add", adminAuth, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword, role: "admin" });

    await newAdmin.save();
    res.status(201).json({ message: "New admin added successfully" });
  } catch (error) {
    console.error("Admin Creation Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/admin/profile", adminAuth, async (req, res) => {
    try {
      const admin = await Admin.findById(req.user.id).select("-password"); // Exclude password
      if (!admin) return res.status(404).json({ error: "Admin not found" });
  
      res.json(admin);
    } catch (error) {
      console.error("Profile fetch error:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  router.get("/admin/all", adminAuth, async (req, res) => {
    try {
      const admins = await Admin.find().select("-password"); 
      res.json(admins);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  router.get("/api/admins", async (req, res) => {
    try {
      const admins = await Admin.find(); // Fetch all admins from MongoDB
      res.json(admins);
    } catch (error) {
      res.status(500).json({ message: "Error fetching admins" });
    }
  });
router.get("/admin/profile", adminAuth, async (req, res) => {
    try {
      console.log("Admin ID:", req.user.id);
      const admin = await Admin.findById(req.user.id).select("-password");
      if (!admin) return res.status(404).json({ error: "Admin not found" });
  
      res.json(admin);
    } catch (error) {
      console.error("Profile fetch error:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  
module.exports = router;
