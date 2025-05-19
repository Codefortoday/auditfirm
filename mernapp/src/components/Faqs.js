
import React, { useState } from "react";
//import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
//import Footer from "../components/Footer"
import axios from "axios";

const Faq= ({hideNavbar }) => {
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
    
    <div>
    {!hideNavbar && <Navbar />}  {/* Conditionally render navbar */}
<h3 className="mt-5">Frequently Asked Questions</h3>

        <div className="accordion" id="faqAccordion">

          {/* Question 1 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                What is included in the Consultancy service?
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                The consultancy service includes personalized business strategies, financial insights, and ROI-driven solutions.
              </div>
            </div>
          </div>

          {/* Question 2 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                How do you ensure accurate tax planning?
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Our tax experts stay updated with the latest national and global tax regulations to ensure compliance and maximum tax benefits for you.
              </div>
            </div>
          </div>

          {/* Question 3 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                Do you offer GST & Advance Tax planning for businesses?
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Yes, we provide tailored GST and advance tax planning services to ensure smooth tax filings and compliance.
              </div>
            </div>
          </div>

          {/* Question 4 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
                What industries do you specialize in for auditing?
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                We specialize in auditing businesses in finance, healthcare, real estate, manufacturing, and IT sectors.
              </div>
            </div>
          </div>

          {/* Question 5 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive">
                How can I schedule a consultation?
              </button>
            </h2>
            <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                You can schedule a consultation by filling out our contact form, emailing us, or calling our support team.
              </div>
            </div>
          </div>
          
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
        </>
         );
        };
        
        export default Faq;
