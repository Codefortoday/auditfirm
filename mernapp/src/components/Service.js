import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const ServicePage = ({ email }) => {
  const [clientType, setClientType] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [document, setDocument] = useState(null);
  const [message, setMessage] = useState("");
  const formRef = useRef(null);

  const servicesList = [
    { title: "GST Filing", description: "Timely GST filing for your business." },
    { title: "Income Tax Return", description: "Personal or business ITR filing." },
    { title: "Audit Services", description: "Comprehensive internal & external audits." },
    { title: "Legal Services", description: "Registrations, compliance & legal advice." },
    { title: "Investment Advisory", description: "Plan your investments smartly." },
    { title: "Advance Tax Filing", description: "Avoid penalties with advance tax support." }
  ];

  useEffect(() => {
    if (email) {
      axios.get(`http://localhost:5000/api/services/client-type/${email}`)
        .then((res) => setClientType(res.data.clientType))
        .catch((err) => console.error("Client type fetch error:", err));
    }
  }, [email]);

  const handleCardClick = (service) => {
    setSelectedService(service);
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedService) return setMessage("Please select a service.");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("clientType", clientType);
    formData.append("service", selectedService);
    formData.append("additionalInfo", additionalInfo);
    if (document) formData.append("document", document);

    try {
      const response = await axios.post("http://localhost:5000/api/request", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMessage(response.data.message);
      setAdditionalInfo("");
      setDocument(null);
    } catch (err) {
      setMessage("Failed to submit service request.");
      console.error(err);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Our Services</h2>

      <div className="row g-4">
        {servicesList.map((service, idx) => (
          <div className="col-md-4" key={idx}>
            <div
              className="card h-100 shadow-sm border-0"
              onClick={() => handleCardClick(service.title)}
              style={{
                cursor: "pointer",
                borderRadius: "15px",
                transition: "transform 0.3s ease",
                boxShadow: "0 6px 15px rgba(0,0,0,0.1)"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div className="card-body">
                <h5 className="card-title fw-bold">{service.title}</h5>
                <p className="card-text text-muted">{service.description}</p>
              </div>
              <div className="card-footer bg-light text-center text-primary fw-semibold">
                Click to Request
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Form */}
      <div ref={formRef} className="mt-5 pt-4">
        <h3 className="text-center mb-3">Submit Request for: {selectedService}</h3>
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm border-0">
          <div className="mb-3">
            <label className="form-label">Additional Information</label>
            <textarea
              className="form-control"
              rows="3"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Optional notes about your service request"
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Upload Supporting Document</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setDocument(e.target.files[0])}
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Submit Request
          </button>
          {message && <div className="alert alert-info mt-3">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default ServicePage;
