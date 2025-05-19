import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Navbar from "../components/Navbar";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);
      setMessage(res.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setMessage("Error sending message. Try again.");
    }
  };

  return (
    <>
        <Navbar/>
    
    <div className="container mt-5">
      <div className="row p-5 text-light rounded" style={{ background: "rgba(0,0,0,0.6)" }}>
        <div className="col-md-6">
          <h2>Contact Us</h2>
          <p>AuditFirm & Company , Mumbai Office</p>
          <div className="mt-4">
            <p><i className="fas fa-map-marker-alt"></i> <strong>Address:</strong> 12-7, Mathew street, Mumbai-123</p>
            <p><i className="fas fa-phone"></i> <strong>Phone:</strong> 561-456-2321</p>
            <p><i className="fas fa-envelope"></i> <strong>Email:</strong> example@email.com</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-4 bg-white text-dark rounded shadow">
            <h3>Send Message or Queries</h3>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input type="text" className="form-control" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input type="email" className="form-control" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <textarea className="form-control" name="message" placeholder="Type your Message..." rows="3" value={formData.message} onChange={handleChange} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
