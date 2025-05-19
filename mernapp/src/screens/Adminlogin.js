import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("adminToken", data.token);
      navigate("/AdminDash"); // Redirect to admin panel
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="card p-4 shadow-lg border-0" style={{ maxWidth: "400px", width: "100%" }}>
      <h2 className="text-center mb-4">🔑 Admin Login</h2>
      
      {error && <p className="text-danger text-center">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input 
            type="email" 
            className="form-control" 
            placeholder="Enter your email" 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input 
            type="password" 
            className="form-control" 
            placeholder="Enter your password" 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-box-arrow-in-right"></i> Login
          </button>
          <Link className="btn btn-outline-secondary" to="/">
            <i className="bi bi-house-door"></i> Home
          </Link>
        </div>
      </form>
    </div>
  </div>


    // <div className="container mt-5">
    //   <h2>Admin Login</h2>
    //   {error && <p className="text-danger">{error}</p>}
    //   <form onSubmit={handleSubmit}>
    //     <div className="mb-3">
    //       <label>Email:</label>
    //       <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
    //     </div>
    //     <div className="mb-3">
    //       <label>Password:</label>
    //       <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
    //     </div>
    //     <button type="submit" className="btn btn-primary m-3">Login</button>
        
    //     <Link className="btn btn-primary m-3"  to="/">Home</Link>
    //   </form>
      
     
    // </div>
  );
}
