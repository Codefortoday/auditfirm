const express = require("express");
const User = require("../models/User"); // Import your User model
const router = express.Router();
router.post('/firmdata',(req,res)=>{
    try {
        res.send([global.fetch_data1])
    } catch (error) {
        console.log(error.message);
        res.send('server error');
        
    }

})

// API to fetch a user's data
router.get("/getuser/:email", async (req, res) => {
    try {
        const userEmail = req.params.email; // Get email from URL
        const user = await User.findOne({ email: userEmail }); // Find user in DB

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user); // Send user data to frontend
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
