import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import Faqs from "../components/Faqs"
import { useEffect } from "react";
const Price = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Pricing Data
  const Price = [
    {
      category: "Consultancy",
      description:
        "Auditing advice helps you formulate your strategy for future business diversification and better ROI.",
      plans: [
        { name: "Basic Consultation", individual: "₹2,500/session", company: "₹5,000/session" },
        { name: "Advanced Business Strategy", individual: "₹4,500/session", company: "₹10,000/session" },
        { name: "Annual Consultancy Package", individual: "₹15,000/year", company: "₹50,000/year" },
      ],
    },
    {
      category: "Specialty Services",
      description:
        "We understand each family business is unique. Therefore, our solutions are personalized.",
      plans: [
        { name: "Business Setup Advisory", individual: "₹5,000", company: "₹12,000" },
        { name: "Financial Planning", individual: "₹4,000", company: "₹8,000" },
        { name: "Succession Planning", individual: "₹6,500", company: "₹15,000" },
      ],
    },
    {
      category: "Audit & Assurance",
      description:
        "Auditing needs to give authentic, actionable, and insightful statements for investors.",
      plans: [
        { name: "Financial Statement Review", individual: "₹7,500", company: "₹20,000" },
        { name: "Internal Audit", individual: "₹10,000", company: "₹30,000" },
        { name: "Compliance Audit", individual: "₹12,500", company: "₹40,000" },
      ],
    },
    {
      category: "Tax Planning Services",
      description:
        "Our tax experts ensure you get professional advice on national & global taxation laws.",
      plans: [
        { name: "Income Tax Filing", individual: "₹2,000", company: "₹5,000" },
        { name: "Tax Savings Strategies", individual: "₹3,500", company: "₹8,000" },
        { name: "International Tax Compliance", individual: "₹8,000", company: "₹20,000" },
      ],
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Pricing Plans</h1>
        {Price.map((service, index) => (
          <div key={index} className="mb-5">
            <h2 className="text-primary">{service.category}</h2>
            <p>{service.description}</p>
            <table className="table table-bordered table-striped mt-3">
              <thead className="table-dark">
                <tr>
                  <th>Plan</th>
                  <th>Individual</th>
                  <th>Company</th>
                </tr>
              </thead>
              <tbody>
                {service.plans.map((plan, idx) => (
                  <tr key={idx}>
                    <td>{plan.name}</td>
                    <td>{plan.individual}</td>
                    <td>{plan.company}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        <h3 className="text-center mt-5">Compare Our Plans</h3>
        <table className="table table-striped table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>Features</th>
              <th>Other Firms</th>
              <th>At AuditFirm</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dedicated Consultant</td>
              <td>❌</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Tax Advisory</td>
              <td>❌</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Financial Strategy</td>
              <td>Limited</td>
              <td>Full</td>
            </tr>
          </tbody>
        </table>
       
        <Faqs hideNavbar={true} />  {/* Hide navbar when rendering here */}
           

        <div className="text-center mt-5">
          <h3>Ready to Get Started?</h3>
          <p>Contact us today and take your business to the next level!</p>
          <Link className="btn btn-primary btn-lg" to="/Login">Login & Book a Consultation with us</Link>
          

        </div>
        <br></br>
      </div>
      <Footer/>
    </div>
  );
};

export default Price;
