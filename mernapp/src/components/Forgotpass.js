import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/forgotpassword", { email });
      setMessage(res.data.message);
    } catch (error) {
      console.error("Error sending reset link:", error);
      setMessage("Failed to send reset link");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleForgotPassword}>Send Reset Link</button>
      <p>{message}</p>
      <Link to="/createuser" className='m-3 btn btn-danger'>New User</Link>
          <Link to="/" className='m-3 btn btn-primary'>Home</Link>
    </div>
  );
};

export default ForgotPassword;
