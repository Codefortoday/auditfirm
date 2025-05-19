import React from 'react'
import { motion } from "framer-motion";

export default function About(props) {
  return (
    <div id="about-section" className="bg-light">
      
      {/* Hero Section */}
      <section className="position-relative text-white text-center" 
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?business,office')", height: "80vh", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="position-relative z-1 d-flex flex-column justify-content-center align-items-center h-100"
        >
          <h1 className="display-4 fw-bold">About AUDIT FIRM & Company</h1>
          <p className="lead">Trusted financial and audit services with excellence.</p>
        </motion.div>
      </section>
      
      {/* Firm Background Section */}
      <section className="container py-5">
        <motion.div 
          initial={{ opacity: 0, x: -100 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h2 className="fw-bold">Our Background</h2>
          <p className="text-muted">
            Established in 2025, AuditFirm & Company has been providing top-tier financial consulting and audit services.
            Our team of professionals is dedicated to offering exceptional solutions tailored to your business needs.
          </p>
        </motion.div>
      </section>
      
      {/* Insights Section */}
      <section className="bg-secondary text-white py-5">
        <div className="container">
          <div className="row">
            <motion.div 
              className="col-md-6"
              initial={{ opacity: 0, x: -100 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 1 }}
            >
              <h2 className="fw-bold">Our Mission</h2>
              <p>
                Our mission is to provide financial transparency and professional auditing services that empower businesses
                to make informed decisions.
              </p>
            </motion.div>
            <motion.div 
              className="col-md-6"
              initial={{ opacity: 0, x: 100 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 1 }}
            >
              <img src={props.imgSrc} alt="Our Team" className="img-fluid rounded shadow-lg" />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Location Section */}
      <section className="container py-5">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="text-center"
        >
        
          <div className="embed-responsive embed-responsive-16by9">
          <section className="container py-5">
      <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1 }}
      className="text-center"
      >
      <h2 className="fw-bold">Our Location</h2>
      <p className="text-muted">Visit us at our office in Mumbai, India.</p>
      <div className="embed-responsive embed-responsive-16by9">
      <iframe 
        title="Google Map"
        className="embed-responsive-item w-100 rounded shadow-lg" 
        style={{ height: "450px", border: "0" }}
        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d322.93136487161!2d72.85241874118519!3d18.99603239553304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgoogle%20maps!5e0!3m2!1sen!2sin!4v1739559806835!5m2!1sen!2sin" 
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      </div>
      </motion.div>
      </section>
      
          </div>
        </motion.div>
      </section>
      </div>
    
  )
}
