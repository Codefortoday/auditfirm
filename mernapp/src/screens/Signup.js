import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  
  const [confirmPass, setConfirmPass] = useState("");
  const [credentials, setcredentails] = useState({ name: "", email: "", pass: "", phone: "", geolocation: "", Client_type: "", image: null })
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("name", credentials.name);
    formData.append("email", credentials.email);
    formData.append("pass", credentials.pass);
    formData.append("location", credentials.geolocation);
    formData.append("Client_type", credentials.Client_type);
    formData.append("phone", credentials.phone);
    if (credentials.image) {
      formData.append("image", credentials.image);
    }
    e.preventDefault();
    
    if (credentials.pass !== confirmPass) {
      alert("Passwords do not match");
      return;
      

      navigate('/');
    }
    const response = await fetch(('http://localhost:5000/api/createuser'), {
      method: "POST",
      body: formData,
      // headers: {
      //   'Content-Type': 'application/json'
      // },

      //body: JSON.stringify({ name: credentials.name, email: credentials.email, pass: credentials.pass, location: credentials.geolocation, phone: credentials.phone})
    });


    const json = await response.json();
    console.log(json);
    if (!json.success) {


      alert(`Error: ${json.message}`); // Use backticks for string interpolation
    } else {
      alert("User added successfully!");
      //navigate("/"); // Redirect to home page
    }
   


  }
  const onChange = (event) => {
    setcredentails({ ...credentials, [event.target.name]: event.target.value })

  }

  const handleImageChange = (event) => {
    setcredentails({ ...credentials, image: event.target.files[0] });
  };
  

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded" style={{ maxWidth: "450px", width: "100%" }}>
        <h3 className="text-center mb-4">🔐 Register</h3>
        <form onSubmit={handleSubmit}>
          
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-bold">Name:</label>
            <input 
              type="text" 
              className="form-control rounded-3" 
              placeholder="Enter your name" 
              name="name" 
              value={credentials.name} 
              onChange={onChange} 
              required 
            />
          </div>
  
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Email Address</label>
            <input 
              type="email" 
              className="form-control rounded-3" 
              id="exampleInputEmail1" 
              placeholder="Enter email" 
              name="email" 
              value={credentials.email} 
              onChange={onChange} 
              required 
            />
            <small className="text-muted">We'll never share your email with anyone else.</small>
          </div>
  
          {/* Phone Number */}
          <div className="mb-3">
            <label htmlFor="phoneno1" className="form-label fw-bold">Phone Number</label>
            <input 
              type="number" 
              className="form-control rounded-3" 
              id="phoneno1" 
              placeholder="Enter phone no." 
              name="phone" 
              value={credentials.phone} 
              onChange={onChange} 
              required 
            />
          </div>
  
          {/* Password */}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label fw-bold">Password</label>
            <input 
              type="password" 
              className="form-control rounded-3" 
              id="exampleInputPassword1" 
              placeholder="Password" 
              name="pass" 
              value={credentials.pass} 
              onChange={onChange} 
              required 
            />
          </div>

          <div className="mb-3">
  <label htmlFor="confirmPassword" className="form-label fw-bold">Confirm Password</label>
  <input 
    type="password" 
    className="form-control rounded-3" 
    id="confirmPassword" 
    placeholder="Confirm Password" 
    name="confirmPass" 
    value={confirmPass} 
    onChange={(e) => setConfirmPass(e.target.value)} 
    required 
  />
</div>

  
          {/* Address */}
          <div className="mb-3">
            <label htmlFor="location1" className="form-label fw-bold">Address/Location</label>
            <input 
              type="text" 
              className="form-control rounded-3" 
              id="location1" 
              placeholder="Enter your address" 
              name="geolocation" 
              value={credentials.geolocation} 
              onChange={onChange} 
              required 
            />
          </div>
  
          {/* Client Type */}
          <div className="mb-3">
            <label htmlFor="clientType" className="form-label fw-bold">Client Type:</label>
            <select 
              className="form-control rounded-3" 
              id="clientType" 
              name="Client_type" 
              value={credentials.Client_type} 
              onChange={onChange} 
              required
            >
              <option value="">Select Client Type</option>
              <option value="Individual">Individual Client</option>
              <option value="Company">Company Client</option>
            </select>
          </div>
  
          {/* Profile Picture Upload */}
          <div className="mb-3">
            <label htmlFor="image" className="form-label fw-bold">Profile Picture:</label>
            <input 
              type="file" 
              className="form-control rounded-3" 
              name="image" 
              accept="image/*" 
              onChange={handleImageChange} 
            />
          </div>
  
          {/* Buttons */}
          <button type="submit" className="btn btn-primary w-100 mb-2">Submit</button>
          <Link to="/Login" className="btn btn-outline-danger w-100">Already a User? Login</Link>
  
        </form>
      </div>
    </div>
  );
}  

//   return (
//     <div className='container'>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input type="text" className="form-control" placeholder="Enter your name" name="name" value={credentials.name} onChange={onChange} />

//         </div>

//         <div className="form-group">
//           <label htmlFor="exampleInputEmail1">Email address</label>
//           <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={credentials.email} onChange={onChange} />
//           <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
//         </div>

//         <div className="form-group">
//           <label htmlFor="phoneno">Phone Number</label>
//           <input type="number" className="form-control" id="phoneno1" placeholder="Enter phone no." name="phone" value={credentials.phone} onChange={onChange} />

//         </div>
//         <div className="form-group">
//           <label htmlFor="exampleInputPassword1">Password</label>
//           <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="pass" value={credentials.pass} onChange={onChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="exampleInputPassword1">Address/location</label>
//           <input type="text" className="form-control" id="location1" placeholder="address" name="geolocation" value={credentials.geolocation} onChange={onChange} />
//         </div>

//         <div className="form-group">
//             <label htmlFor="clientType">Client Type:</label>
//             <select
//                 className="form-control"
//                 id="clientType"
//                 name="Client_type"
//                 value={credentials.Client_type}
//                 onChange={onChange}
//             >
//                 <option value="">Select Client Type</option>
//                 <option value="Individual">Individual Client</option>
//                 <option value="Company">Company Client</option>
//             </select>
//             </div>


//         <div className="form-group">
//           <label htmlFor="image">Profile Picture:</label>
//           <input type="file" className="form-control" name="image" accept="image/*" onChange={handleImageChange} />
//         </div>



//         <button onClick={handleSubmit} type="submit" className="m-3 btn btn-primary">Submit</button>

//         <Link to="/Login" className='m-3 btn btn-danger'>Already a user</Link>
//       </form>
//     </div>
//   )
// }

{/* <div className="form-group">
    <label htmlFor="clientType">Client Type</label>
    <select 
        className="form-control" 
        id="clientType" 
        name="Client_type" 
        value={formData.Client_type} 
        onChange={(e) => setFormData({ ...formData, Client_type: e.target.value })}
    >
        <option value="">Select Client Type</option>
        <option value="Individual">Individual Client</option>
        <option value="Business">Business Client</option>
    </select>
</div> */}

