import React  from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import logo from "../assets/logo.png";


export default function Navbar() {
  

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const navigate=useNavigate();
  const handleLogout =()=>{
    localStorage.removeItem('authToken');
    navigate("/Login");

  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Brand Name */}

        <Link className="navbar-brand fs-1 fst-italic" to="/">
         <img src={logo} alt="Audit Firm Logo" width="50" height="50" className="me-2 rounded-circle" /> {/* Logo */}AuditFirm</Link>

        {/* Mobile Toggle Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            {(localStorage.getItem("authToken"))?
            <li>
              <Link className="nav-link active" to="/Client_Profile">Client-Profile</Link>
            </li>  
            
          :''}
          
            {(localStorage.getItem("authToken"))?
            <li>
           <Link className="nav-link active" to="/appointment">📅 Book Appointment</Link>
           </li> 
            
          :''}
            {/* {(localStorage.getItem("authToken"))?
            <li>
           <Link className="nav-link active" to="/Service">Services</Link>
           </li> 
            
          :''} */}
         
          <li>

                
         
            
            <Link className="nav-link active" onClick={scrollToAbout}>About</Link>
          </li>
          <li>
            
            <Link className="nav-link active" to="/Contact">Contact</Link>
          </li>
          </ul>

          {/* Right-side Login & Signup Links */}
          {(!localStorage.getItem("authToken"))?
          <div className="d-flex gap-3">
            <Link className="btn btn-outline-light" to="/Adminlogin">AdminLogin</Link>
            <Link className="btn btn-outline-light" to="/login">Login</Link> 
            <Link className="btn btn-primary" to="/Createuser">Signup</Link>
          </div>
        :<div className="btn btn-outline-danger" onClick={handleLogout}> 
          Logout          
          </div>}
        </div>
      </div>
    </nav>
  )
}
