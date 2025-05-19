import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
const UpdateProfile = () => {
  const [user, setUser] = useState({ name: "", phone: "" });
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  

  useEffect(() => {
    fetchUserProfile();
  }, []);

//   const fetchUserProfile = async () => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const res = await axios.get("http://localhost:5000/api/profile", {
//         headers: { "auth-token": token },
//       });
//       setUser({ name: res.data.name, phone: res.data.phone });
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//     }
//   };
const fetchUserProfile = async () => {
    try {
      //const userEmail = localStorage.getItem("userEmail"); // 🔹 Retrieve email from localStorage
      const userEmail = JSON.parse(localStorage.getItem("user"))?.email;
      if (!userEmail) {
        console.error("No email found in localStorage");
        return;
      }
  
      const res = await axios.get(`http://localhost:5000/api/getuser/${userEmail}`);
  
      setUser({
        name: res.data.name,
        phone: res.data.phone
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.put(
        "http://localhost:5000/api/updateprofile",
        { name: user.name, phone: user.phone, password },
        { headers: { "auth-token": token } }
      );
      setMessage(res.data.message);
    } catch (error) {
      console.error("Update failed:", error);
      setMessage("Update failed");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <h2>Update Profile</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Profile/Password
        </button>
      </form>
    </div>
    </>
  );
};

export default UpdateProfile;
