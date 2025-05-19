// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/services");
//       setServices(response.data);
//     } catch (error) {
//       console.error("Error fetching services:", error);
//     }
//   };

//   const markCompleted = async (serviceId) => {
//     try {
//       await axios.put(`http://localhost:5000/api/complete-service/${serviceId}`);
//       fetchServices();
//     } catch (error) {
//       console.error("Error marking service as completed:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Admin Dashboard - Service Management</h2>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Client</th>
//             <th>Service</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {services.map((service) => (
//             <tr key={service._id}>
//               <td>{service.assignedUser?.name || "Unknown"}</td>
//               <td>{service.name}</td>
//               <td>
//                 <span className={`badge ${service.status === "Completed" ? "bg-success" : "bg-warning"}`}>
//                   {service.status}
//                 </span>
//               </td>
//               <td>
//                 {service.status === "Pending" && (
//                   <button className="btn btn-success" onClick={() => markCompleted(service._id)}>
//                     Mark as Completed
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminServiceRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/services/all")
            .then(res => setRequests(res.data))
            .catch(err => console.error(err));
    }, []);

    const markCompleted = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/services/complete/${id}`);
            setRequests(requests.map(req => req._id === id ? { ...req, status: "Completed" } : req));
        } catch (error) {
            console.error("Error updating status");
        }
    };

    return (
        <div className="container">
            <h2>Service Requests</h2>
            <table className="table">
                <thead>
                    <tr><th>Client</th><th>Service</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                    {requests.map(req => (
                        <tr key={req._id}>
                            <td>{req.email}</td>
                            <td>{req.service}</td>
                            <td>{req.status}</td>
                            <td>{req.status === "Pending" && <button onClick={() => markCompleted(req._id)} className="btn btn-success">Complete</button>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminServiceRequests;

