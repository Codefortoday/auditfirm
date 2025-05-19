import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar"

export default function Appointment() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        mainSlot: "",
        subSlot: "",
        subject: ""
    });
    const [bookedSlots, setBookedSlots] = useState([]);
    const [success, setSuccess] = useState(false);


    const mainSlots = {
        "14:00-16:00": ["14:00-14:30", "14:30-15:00", "15:00-15:30", "15:30-16:00"],
        "17:00-19:00": ["17:00-17:30", "17:30-18:00", "18:00-18:30", "18:30-19:00"]
    };

    // Fetch booked slots when date changes
    useEffect(() => {
        if (formData.date) {
            axios.get(`http://localhost:5000/api/bookedslots?date=${formData.date}`)
                .then(response => setBookedSlots(response.data.bookedSlots) )
                .catch(error => console.error("Error fetching booked slots:", error));
        }
    }, [formData.date,success]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/appointments", formData);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000); 
            setFormData({ name: "", email: "", phone: "", date: "", mainSlot: "", subSlot: "", subject: "" });
        } catch (error) {
            setError(error.response?.data?.message || "Failed to book appointment");
            // console.error("Error booking appointment:", error);
        } finally {
            setLoading(false);  // ✅ Stop loading
        }
    };

    return (
        <div>{error && <div className="alert alert-danger">{error}</div>}

            <Navbar/>
        <div className="container mt-5">

            <h2 className="text-center">📅 Book an Appointment</h2>
            <p className="text-center ">Get Appointments with our Team Experts</p>
            <p className="text-center text-muted">Choose a date and an available slot</p>

            {success && <div className="alert alert-success">✅ Appointment booked successfully!</div>}

            <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Appointment Subject</label>
                    <input type="text" name="subject" className="form-control" value={formData.subject} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} required min={new Date().toISOString().split("T")[0]} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Select Time Category</label>
                    <select name="mainSlot" className="form-control" value={formData.mainSlot} onChange={handleChange} required>
                        <option value="">-- Select a Time Slot --</option>
                        {Object.keys(mainSlots).map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Select Sub-Slot</label>
                    <select name="subSlot" className="form-control" value={formData.subSlot} onChange={handleChange} required>
                        <option value="">-- Select a Sub-Slot --</option>
                        {formData.mainSlot && mainSlots[formData.mainSlot].map(subSlot => (
                            <option key={subSlot} value={subSlot} disabled={bookedSlots.includes(subSlot)}>
                                {subSlot} {bookedSlots.includes(subSlot) ? " (Booked)" : ""}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Book Appointment</button>
            </form>
        </div>
        </div>
    );
}
