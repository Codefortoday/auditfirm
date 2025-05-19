import React from 'react'
import Footer from '../components/Footer'

export default function Home2() {
  return (
    <div>


const Home = () ={
   (
    <div className="home-container">
      
      
      
    </div>
  )
};

const Header = () = (
  <header className="header">
    <h1>Welcome to SMJ and Company</h1>
    <p>Your trusted audit and consultancy firm</p>
  </header>
);

const MainContent = () =(
  <section className="main-content">
    <Footer/>
  </section>
);

const ServiceList = () = {
  global.services = [
    "Audit & Assurance",
    "Tax Advisory",
    "Financial Consulting",
    "Legal Compliance",
  ]

(
    <div className="services">
      <h2>Our Services</h2>
      <ul>
        {global.services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
    </div>
  )
};

const AboutUs = () = (
  <div className="about-us">
    <h2>About Us</h2>
    <p>SMJ and Company is a professional firm dedicated to financial integrity.</p>
  </div>
);

const ContactSection = () =(
  <div className="contact">
    <h2>Contact Us</h2>
    <p>Email: contact@smjcompany.com</p>
    <p>Phone: +91 98765 43210</p>
  </div>
);

const Footer = () = (
  <footer className="footer">
    <p>© {new Date().getFullYear()} SMJ and Company. All rights reserved.</p>
  </footer>
);

export default Home;

    </div>
  )
}
