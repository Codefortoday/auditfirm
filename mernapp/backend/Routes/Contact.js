require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

// Create Model
const Contact = mongoose.model("Contact", contactSchema);

// API Route
router.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newMessage = new Contact({ name, email, message });
        await newMessage.save();
        res.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

router.get("/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ date: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

module.exports = router;


