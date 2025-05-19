import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // For animation
import audit11 from "../assets/audit11.jpg";
import audit12 from "../assets/audit12.jpg";
import audit13 from "../assets/audit13.jpg";
import audit14 from "../assets/audit14.jpg";
import audit15 from "../assets/audit15.jpg";
import audit16 from "../assets/audit16.jpg";
import audit17 from "../assets/audit17.jpg";
import audit18 from "../assets/audit18.jpg";
import Bot from "../components/Bot"
import Signpop from "../components/Signpop"

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import About from "../components/About";
import {} from "react-router-dom";
import Carosal from "../components/Carosal";
import Testimonial from "../components/Testimonal";
import Signup from "./Signup";

export default function Home() {

  const [firmdata, setfirmdata] = useState([]);

  const loadData = async () => {
    let respone = await fetch("http://localhost:5000/api/firmdata", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      }
    });

    respone = await respone.json();
    setfirmdata(respone[0]);
    // console.log(respone[0]);
    // console.log(respone[0],respone[1]);
  }

  useEffect(() => {
    loadData()
  }, [])


  // const MainApp = () => {
  //   const location = useLocation();
  //   {location.pathname !== "/AdminDash" && <Bot />}
  // }; 

  return (
    <div>
      {/* Navbar */}
      <Navbar />

 {/* Carousel */}
 <div>
      <div>
          {firmdata.length > 0 ? (
            <Carosal imgSrc={firmdata[0].img} />
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </div>
      {/* Hero Section 
      <div className="container mt-4">

        <CardSection />
      </div>
        */}


        
      {/* Services Section
      <div className="container py-5">
        <h2 className="pb-3 border-bottom text-center">We are Experts in Our Domain</h2>
        <p className="pb-3 border-bottom text-center">Services under our Umbrella</p>

        
      </div> */}
        <ServiceGrid />
     

      <div>
        <div>
          {firmdata.length > 0 ? (
            <About imgSrc={firmdata[0].img} />
          ) : (
            <p>Loading data...</p>
          )}
        </div>
        <Testimonial/>
        <div className="container mt-5">
            <Signpop />
        </div>


        {/* for iiterating using map{
          firmdata !=[]
          ? firmdata.map((data)=>{
            return(
              <div key={data.id}>
              <About imgSrc={data.img} />
              </div>

            )
          })
          :"****"
        } */}

      </div>

      <Bot/>

      {/* Footer */}
      <Footer />
      
    </div>
  );
}





// Card Section Component
// const CardSection = () => {
//   return (
//     <div className="card-body text-center">
//       <h5 className="card-title">Card Title</h5>
//       <p className="card-text">
//         Some quick example text to build on the card title and make up the bulk of the card's content.
//       </p>
//       <Link to="/" className="btn btn-primary">
//         Go Somewhere
//       </Link>

//       {/* <div className="container w-100 mt-3">
//         <Dropdown label="Quantity" options={Array.from({ length: 6 }, (_, i) => i + 1)} />
//         <Dropdown label="Size" options={["Half", "Full"]} />
//         <span className="d-inline fs-5 h-100"> Total</span>
//       </div> */}
//     </div>
//   );
// };

// // Reusable Dropdown Component
// // const Dropdown = ({ label, options }) => {
// //   return (
// //     <select className="m-2 h-100 bg-success rounded">
// //       {options.map((option, index) => (
// //         <option key={index} value={option}>
// //           {option}
// //         </option>
// //       ))}
// //     </select>
//   );
// };

// Service Grid Component
const ServiceGrid = () => {
  const services = [
    { 
      icon: "bi-bootstrap", 
      title: "Consultancy", 
      description: "Auditing advice helps you formulate your strategy for future business diversification and better ROI.",
      img: audit11
    },
    { 
      icon: "bi-cpu", 
      title: "Specialty Services", 
      description: "We understand each family business is unique. Therefore, our solutions too are unique and personalized.",
      img: audit12
    },
    { 
      icon: "bi-calendar3", 
      title: "Audit & Assurance", 
      description: "Auditing needs to give authentic, actionable, and insightful statements for investors.",
      img: audit13
    },
    { 
      icon: "bi-house", 
      title: "Tax Planning Services", 
      description: "Our tax experts ensure you get professional advice on national & global taxation laws.",
      img: audit14
    },
    { 
      icon: "bi-speedometer2", 
      title: "Growth Strategies", 
      description: "Providing entrepreneurship & venture capital insights for business expansion.",
      img: audit15
    },
    { 
      icon: "bi-toggles2", 
      title: "Supporting Enterprise", 
      description: "Passionate about providing quality business ideas and insights that work.",
      img: audit16
    },
    { 
      icon: "bi-geo-alt-fill", 
      title: "GST & Advance Taxing", 
      description: "We handle your taxation filing so you can focus on business growth.",
      img: audit17
    },
    { 
      icon: "bi-tools", 
      title: "Investment", 
      description: "Get access to professional advice for Personal and Business Investment.",
      img: audit18
    }
  ];


  return (
    <div className="container py-5">
      <h2 className="pb-3 border-bottom text-center fw-bold">We are Experts in Our Domain</h2>
      <p className="pb-3 border-bottom text-center text-muted">Services under our Umbrella</p>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 py-4">
        {services.map((service, index) => (
          <ServiceItem key={index} icon={service.icon} title={service.title} description={service.description} img={service.img} />
        ))}
      </div>
    </div>
  );
};
// Reusable Service Item Component
const ServiceItem = ({ icon, title, description, img }) => {
  return (
    <motion.div 
      className="col"
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      viewport={{ once: true }}
    >
      <div className="card border-0 shadow-sm h-100">
        <img src={img} alt={title} className="card-img-top service-img" />
        <div className="card-body text-center">
          <i className={`bi ${icon} text-primary fs-3`}></i>
          <h5 className="fw-bold mt-3">{title}</h5>
          <p className="text-muted">{description}</p>
        </div>
      </div>
    </motion.div>
    
  );
};



