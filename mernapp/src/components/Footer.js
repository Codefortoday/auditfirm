// import React from 'react'
// import { Link } from 'react-router-dom'


// export default function Footer() {
//   return (
//     <div>
//       <footer className="py-5">
//     <div className="row">
//       <div className="col-2">
//         <h5>Section</h5>
//         <ul className="nav flex-column">
//           <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Home</Link></li>
//           <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Features</Link></li>
//           <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Pricing</Link></li>
//           <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">FAQs</Link></li>
//           <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">About</Link></li>
//         </ul>
//       </div>

//       <div className="col-2">
//         <h5>Section</h5>
//         <ul className="nav flex-column">
//           <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Home</Link></li>
//           <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Features</Link></li>
//           <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Pricing</Link></li>
//           <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">FAQs</Link></li>
//           <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">About</Link></li>
//         </ul>
//       </div>

//       <div className="col-2">
//         <h5>Section</h5>
//         <ul className="nav flex-column">
//           <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Home</Link></li>
//           <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Features</Link></li>
//           <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Pricing</Link></li>
//           <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">FAQs</Link></li>
//           <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">About</Link></li>
//         </ul>
//       </div>

//       <div className="col-4 offset-1">
//         <form>
//           <h5>Subscribe to our newsletter</h5>
//           <p>Monthly digest of whats new and exciting from us.</p>
//           <div className="d-flex w-100 gap-2">
//             <label for="newsletter1" className="visually-hidden">Email address</label>
//             <input id="newsletter1" type="text" className="form-control" placeholder="Email address" fdprocessedid="kwypz"/>
//             <button className="btn btn-primary" type="button" fdprocessedid="5xy60q">Subscribe</button>
//           </div>
//         </form>
//       </div>
//     </div>

//     <div className="d-flex justify-content-between py-4 my-4 border-top">
//     <center><p>© 2025 AuditFirm Company, Inc. All rights reserved.</p></center>

//       <ul className="list-unstyled d-flex">
//       <li className="ms-3">
//         <Link className="link-dark" to="/">
//           <img src="https://img.icons8.com/?size=100&id=6Fsj3rv2DCmG&format=png&color=000000" alt="Twitter" width="24" height="24" />
//         </Link>
//       </li>
//       <li className="ms-3">
//         <Link className="link-dark" to="/">
//           <img src={"https://img.icons8.com/?size=100&id=ZRiAFreol5mE&format=png&color=000000"} alt="Instagram" width="24" height="24" />
//         </Link>
//       </li>
//       <li className="ms-3">
//         <Link className="link-dark" to="/">
//           <img src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000" alt="Facebook" width="24" height="24" />
//         </Link>
//       </li>
//     </ul>
//     </div>
//   </footer>
//     </div>
//   )
// }



import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";


export default function Footer() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/subscribe", { email });
      setMessage({ text: response.data.message, type: "success" });
      setEmail(""); // Clear input after success
    } catch (error) {
      setMessage({ text: error.response?.data?.message || "Something went wrong", type: "error" });
    }
  };
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row gy-4">
          {/* About Section */}
          <div className="col-md-3">
            <h5 className="fst-italic">AuditFirm & Company</h5> 
            <p className="small">
              We are a leading audit firm providing reliable and
              professional financial services. Our team ensures your business
              meets compliance standards with accuracy.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-md-3">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-light text-decoration-none">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/price" className="text-light text-decoration-none">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/Contact" className="text-light text-decoration-none">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-md-3">
            <h5 className="text-uppercase">Resources</h5>
            <ul className="list-unstyled">
              {(localStorage.getItem("authToken"))?
                          <li>
                         <Link className="nav-link active" to="/Calculate">Calculate Tax</Link>
                         </li> 
                          
                        :''}  
              <li>
                <Link to="/blog" className="text-light text-decoration-none">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/Faqs" className="text-light text-decoration-none">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-light text-decoration-none">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-light text-decoration-none">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          {/* <div className="col-md-3">
            <h5 className="text-uppercase">Subscribe</h5>
            <p className="small">
              Stay updated with our latest news and offers. Subscribe to our
              newsletter.
            </p>
            <form>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  required
                />
                <button className="btn btn-primary" type="submit">
                  Subscribe
                </button>
              </div>
            </form>
          </div> */}

          <div className="col-md-3">
            <h5>Subscribe to our newsletter</h5>
            <p>Stay updated with our latest news and offers.</p>

            {message && (
              <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button className="btn btn-primary" type="submit">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 border-top pt-3">
          <p className="mb-0 text-center text-md-start">
            © 2025 AuditFirm & Company, Inc. All rights reserved.
          </p>

          {/* Social Media Icons */}
          <div className="d-flex">
            <Link to="/" className="me-3">
              <img
                src="https://img.icons8.com/?size=100&id=6Fsj3rv2DCmG&format=png&color=ffffff"
                alt="Twitter"
                width="24"
                height="24"
              />
            </Link>
            <Link to="/" className="me-3">
              <img
                src="https://img.icons8.com/?size=100&id=ZRiAFreol5mE&format=png&color=ffffff"
                alt="Instagram"
                width="24"
                height="24"
              />
            </Link>
            <Link to="/">
              <img
                src="https://img.icons8.com/?size=100&id=118497&format=png&color=ffffff"
                alt="Facebook"
                width="24"
                height="24"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

