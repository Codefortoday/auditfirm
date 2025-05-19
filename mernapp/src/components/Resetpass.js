import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/resetpassword/${token}`, { newPassword });
      setMessage(res.data.message);
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("Failed to reset password");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <button onClick={handleResetPassword}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
};

export default ResetPassword;
