import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import auditimg from "../assets/auditpic.jpg";
import auditimg2 from "../assets/auditpic2.jpg";
import auditimg3 from "../assets/auditpic3.jpg";
import auditimg4 from "../assets/auditpic5.jpg";

export default function Carosal(props) {
  return (
    <div >
      <div id="firmCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
        
        {/* Indicators */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#firmCarousel" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#firmCarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#firmCarousel" data-bs-slide-to="2"></button>
          <button type="button" data-bs-target="#firmCarousel" data-bs-slide-to="3"></button>
        </div>

        {/* Carousel Items */}
        <div className="carousel-inner">
          {/* Slide 1 - Firm Background */}
          <div className="carousel-item active position-relative">
            <img src={auditimg} className="d-block w-100" alt="Firm Background" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center text-white"
                 style={{
                   position: "absolute",
                   top: 0,
                   left: 0,
                   width: "100%",
                   height: "100%",
                   backgroundColor: "rgba(0, 0, 0, 0.5)" // Dark overlay
                 }}>
              <h3 className="fw-bold" style={{ fontSize: "2rem", textShadow: "2px 2px 5px rgba(0,0,0,0.7)" }}>
                Welcome to AuditFirm & Company
              </h3>
              <p style={{ fontSize: "1.2rem", maxWidth: "80%", textShadow: "1px 1px 3px rgba(0,0,0,0.6)" }}>
                Providing top-notch financial solutions with years of expertise.
              </p>
            </div>
          </div>

          {/* Slide 2 - Services */}
          <div className="carousel-item position-relative">
            <img src={auditimg4} className="d-block w-100" alt="Services" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center text-white"
                 style={{
                   position: "absolute",
                   top: 0,
                   left: 0,
                   width: "100%",
                   height: "100%",
                   backgroundColor: "rgba(0, 0, 0, 0.5)"
                 }}>
              <h3 className="fw-bold" style={{ fontSize: "2rem", textShadow: "2px 2px 5px rgba(0,0,0,0.7)" }}>
                Expert Financial Services
              </h3>
              <p style={{ fontSize: "1.2rem", maxWidth: "80%", textShadow: "1px 1px 3px rgba(0,0,0,0.6)" }}>
                From audits to tax planning, we cover it all.
              </p>
            </div>
          </div>

          {/* Slide 3 - Achievements */}
          <div className="carousel-item position-relative">
            <img src={auditimg2} className="d-block w-100" alt="Achievements" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center text-white"
                 style={{
                   position: "absolute",
                   top: 0,
                   left: 0,
                   width: "100%",
                   height: "100%",
                   backgroundColor: "rgba(0, 0, 0, 0.5)"
                 }}>
              <h3 className="fw-bold" style={{ fontSize: "2rem", textShadow: "2px 2px 5px rgba(0,0,0,0.7)" }}>
                Recognized Excellence
              </h3>
              <p style={{ fontSize: "1.2rem", maxWidth: "80%", textShadow: "1px 1px 3px rgba(0,0,0,0.6)" }}>
                Award-winning services trusted by top firms.
              </p>
            </div>
          </div>

          {/* Slide 4 - Client Testimonials */}
          <div className="carousel-item position-relative">
            <img src={auditimg3} className="d-block w-100" alt="Client Testimonials" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center text-white"
                 style={{
                   position: "absolute",
                   top: 0,
                   left: 0,
                   width: "100%",
                   height: "100%",
                   backgroundColor: "rgba(0, 0, 0, 0.5)"
                 }}>
              <h3 className="fw-bold" style={{ fontSize: "2rem", textShadow: "2px 2px 5px rgba(0,0,0,0.7)" }}>
                Client Testimonials
              </h3>
              <p style={{ fontSize: "1.2rem", maxWidth: "80%", textShadow: "1px 1px 3px rgba(0,0,0,0.6)" }}>
                "AuditFirm & Company transformed our financial strategies!" - Happy Client
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#firmCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#firmCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
}
