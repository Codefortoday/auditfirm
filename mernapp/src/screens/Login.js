import { useState } from "react"
import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

export default function Login() {
  const [credentials, setcredentails] = useState({ email: "", pass: "" })
let Navigate= useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(('http://localhost:5000/api/loginuser'), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, pass: credentials.pass})
    });
    const json = await response.json()
    console.log(json);
    if (!json.success) {
      alert("enter vaild credentials");
    }
    if (json.success) {
      localStorage.setItem("authToken",json.authToken);
      localStorage.setItem("user", JSON.stringify({ email: credentials.email }));
      console.log(localStorage.getItem("authToken"))
      //localStorage.setItem("token", response.data.authToken); // Ensure `authToken` is returned from backend
      //const authToken = jwt.sign({ user: { id: user.id } }, JWT_SECRET, { expiresIn: "1h" });

      Navigate("/");
    }

  }

  const onChange = (event) => {
    setcredentails({ ...credentials, [event.target.name]: event.target.value })


  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">🔑 Login</h3>
        <form onSubmit={handleSubmit}>
          
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">Email Address</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-envelope"></i></span>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                placeholder="Enter your email" 
                name="email" 
                value={credentials.email} 
                onChange={onChange} 
                required 
              />
            </div>
            <small className="text-muted">We'll never share your email with anyone else.</small>
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">Password</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock"></i></span>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                placeholder="Enter password" 
                name="pass" 
                value={credentials.pass} 
                onChange={onChange} 
                required 
              />
            </div>
          </div>

          {/* Buttons */}
          <button type="submit" className="btn btn-primary w-100">Login</button>
          
          {/* Other Links */}
          <div className="text-center mt-3">
            <Link to="/Forgotpass" className="text-decoration-none">Forgot Password?</Link>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <Link to="/createuser" className="btn btn-outline-danger w-48">Sign Up</Link>
            <Link to="/" className="btn btn-outline-secondary w-48">Home</Link>
          </div>
          
        </form>
      </div>
    </div>
  );
}
//   return (
//     <div>
//       <div className='container'>
//         <form onSubmit={handleSubmit}>
          

//           <div className="form-group">
//             <label htmlFor="exampleInputEmail1">Email address</label>
//             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={credentials.email} onChange={onChange} />
//             <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
//           </div>

          
//           <div className="form-group">
//             <label htmlFor="exampleInputPassword1">Password</label>
//             <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="pass" value={credentials.pass} onChange={onChange} />
//           </div>
          


//           <button type="submit" className="m-3 btn btn-primary">Submit</button>
//           <Link to="/createuser" className='m-3 btn btn-danger'>New User</Link>
//           <Link to="/" className='m-3 btn btn-primary'>Home</Link>
//           <Link to="/Forgotpass" className='m-3 btn btn-primary'>Forgot Password ?</Link>

//           {/* <button onClick={() => window.location.href = "/forgotpassword"}>Forgot Password?</button> */}
//         </form>
//       </div>
//     </div>
//   )
// }
