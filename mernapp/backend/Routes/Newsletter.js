const mongoose = require("mongoose");
const express = require('express')
const router = express.Router()
// Define Schema & Model
const subscriberSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    subscribeat:{type:Date,default:Date.now}
},{ collection: "Newsletter" });

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// API Route to Handle Subscription
router.post("/subscribe", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ message: "You are already subscribed!" });
        }

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();
        res.status(201).json({ message: "Subscribed successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
// API to Get All Subscribers
router.get("/subscribersfetch", async (req, res) => {
    try {
      const subscribers = await Subscriber.find();
      res.json(subscribers);
    } catch (error) {
      res.status(500).json({ error: "Error fetching subscribers" });
    }
  });
module.exports = router;
