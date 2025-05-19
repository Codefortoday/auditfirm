import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";


export default function AdminAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        fetchAppointments(selectedDate);
    }, [selectedDate]);

    const fetchAppointments = (date) => {
        axios.get(`http://localhost:5000/api/bookedslots?date=${date}`)
            .then(response => setAppointments(response.data.appointments))
            .catch(error => console.error("Error fetching appointments:", error));
    };

    return (
        
            
        <div className="container mt-5">
            <h2 className="text-center mb-4">📋 Admin Dashboard - Appointments</h2>
            
            <div className="mb-3 d-flex justify-content-between">
                <label className="fw-bold">Select Date:</label>
                <input 
                    type="date" 
                    className="form-control w-25" 
                    value={selectedDate} 
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>
            
            <div className="table-responsive">
                <table className="table table-striped table-bordered text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Subject</th>
                            <th>Main Slot</th>
                            <th>Sub-Slot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? (
                            appointments.map((appointment, index) => (
                                <tr key={index}>
                                    <td>{appointment.name}</td>
                                    <td>{appointment.email}</td>
                                    <td>{appointment.phone}</td>
                                    <td>{appointment.subject}</td>
                                    <td>{appointment.mainSlot}</td>
                                    <td>{appointment.subSlot}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-muted">No appointments found for this date</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Link to="/AdminDash" className='m-3 btn btn-primary'>Dashboard</Link>
        </div>
        
    );
}
