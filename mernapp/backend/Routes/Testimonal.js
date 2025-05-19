const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonal');
const User = require('../models/User');
const fetchUser = require('../middleware/fetchUser'); // Middleware to authenticate users

// Route to submit a testimonial 
router.post('/submit',fetchUser, async (req, res) => {
    try {
        const { review, rating } = req.body;
        
        if (!review || !rating) {
            return res.status(400).json({ success: false, message: "Please provide a review and rating." });
        }

        // Fetch user details from the database
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Create a new testimonial entry
        const newTestimonial = new Testimonial({
            user: req.user.id,
            name: user.name,
            image: user.image || '/default-avatar.png', // Default image if user has no profile pic
            review,
            rating
        });

        await newTestimonial.save();
        res.status(201).json({ success: true, message: "Testimonial submitted successfully!" });
        
    } catch (error) {
        //console.log(express.response.json)
        console.error(error);
        res.status(500).json({ success: false, message:error});
    }
    
});

//  Route to get all testimonials
router.get('/fetch', async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ date: -1 }); // Get latest testimonials
        res.json({ success: true, testimonials });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
