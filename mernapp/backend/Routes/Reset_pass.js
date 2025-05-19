const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require("dotenv").config(); // Load environment variables

// Forgot Password - Generate Reset Token & Send Email
router.post("/forgotpassword", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a random reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour

        await user.save();

        // Reset link
        const resetLink = `http://localhost:3000/resetpassword/${resetToken}`;

        // Setup Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: "Password Reset Request",
            text: `You requested a password reset. Click the link below:\n\n${resetLink}`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "Reset link sent to your email" });
    } catch (error) {
        console.error("Error in forgot password:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Reset Password - Validate Token & Update Password
router.post("/resetpassword/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }, // Check if token is valid
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash new password and update user
        const salt = await bcrypt.genSalt(10);
        user.pass = await bcrypt.hash(newPassword, salt);

        // Remove reset token fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;



// const nodemailer = require("nodemailer");
// const crypto = require("crypto");
// const router = express.Router();
// const express = require("express");
// const bcrypt =require('bcryptjs');
// const User = require('../models/User')

// router.post("/forgotpassword", async (req, res) => {
//     try {
//         const { email } = req.body;
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Generate a random reset token
//         const resetToken = crypto.randomBytes(20).toString("hex");
//         user.resetPasswordToken = resetToken;
//         user.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour

//         await user.save();

//         // Send reset link via email (for now, return token in response)
//         const resetLink = `http://localhost:3000/resetpassword/${resetToken}`;

//         // Setup email sending (you can replace this with your own SMTP)
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: "your-email@gmail.com", // Replace with your email
//                 pass: "your-email-password", // Replace with your email password
//             },
//         });

//         const mailOptions = {
//             to: user.email,
//             from: "your-email@gmail.com",
//             subject: "Password Reset Request",
//             text: `You requested a password reset. Click the link below:\n\n${resetLink}`,
//         };

//         await transporter.sendMail(mailOptions);

//         res.json({ message: "Reset link sent to your email", resetLink });
//     } catch (error) {
//         console.error("Error in forgot password:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });
// router.post("/resetpassword/:token", async (req, res) => {
//     try {
//         const { token } = req.params;
//         const { newPassword } = req.body;

//         const user = await User.findOne({
//             resetPasswordToken: token,
//             resetPasswordExpires: { $gt: Date.now() }, // Check if token is still valid
//         });

//         if (!user) {
//             return res.status(400).json({ message: "Invalid or expired token" });
//         }

//         // Hash new password and update user
//         const salt = await bcrypt.genSalt(10);
//         user.pass = await bcrypt.hash(newPassword, salt);

//         // Remove reset token fields
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;

//         await user.save();

//         res.json({ message: "Password reset successfully" });
//     } catch (error) {
//         console.error("Error resetting password:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// module.exports = router;