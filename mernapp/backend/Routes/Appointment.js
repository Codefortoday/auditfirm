 const express = require("express");
  const mongoose = require("mongoose");
  const router = express.Router();
const appointmentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    date: String,
    mainSlot: String,
    subSlot: String,
    subject: String
});
const Appointment = mongoose.model("Appointment", appointmentSchema, "Appointments"); 

// Check if sub-slot is available & book appointment
router.post("/appointments", async (req, res) => {
    try {
        const { date, subSlot } = req.body;

        // Check if the sub-slot is already booked
        const existingAppointment = await Appointment.findOne({ date, subSlot });
        if (existingAppointment) {
            return res.status(400).json({ message: "❌ This sub-slot is already booked. Please choose another." });
        }

        // Save the new appointment
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        res.status(201).json({ message: "✅ Appointment booked successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Error booking appointment", error });
    }
});

//  Get booked sub-slots for a specific date
router.get("/bookedslots", async (req, res) => {
    try {
        const { date } = req.query;
        const appointments = await Appointment.find({ date });
        const bookedSlots = appointments.map(apt => apt.subSlot);
        res.status(200).json({ appointments, bookedSlots }); //return booked slots
         } catch (error) {
        res.status(500).json({ message: "Error fetching booked slots", error });
    }

    
});
module.exports = router;

