import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom'

const ClientProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const userEmail = JSON.parse(localStorage.getItem("user"))?.email;


  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/getuser/${userEmail}`)

      .then(response => {
        console.log("User Data:", response.data); // Debugging log
        setUser(response.data);
        setLoading(false); // Stop loading
      })
      .catch(error => {
        console.error("Error fetching user:", error);
        setLoading(false); // Stop loading on error
      });
    //   .then((response) => setUser(response.data))
    //   .catch((error) => console.error("Error fetching user data:", error));
    //   setUser(response.data);
    //     setLoading(false); // Stop loading

    //     .catch(error => {
    //         console.error("Error fetching user:", error);
    //         setLoading(false); // Stop loading on error
    //       });
  }, []);
  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (!user) {
    return <p>No user data found.</p>;
  }

//   if (!user) {
//     return <div className="text-center mt-5">Loading...</div>;
//   }

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center bg-danger text-white p-3 rounded">Client Profile</h2>

        <div className="row align-items-center">
          <div className="col-md-4 text-center">
            <img
              src={user.image ? `http://localhost:5000${user.image}` : "https://via.placeholder.com/150"}
              alt="Profile"
              className="rounded-circle border border-danger"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <h3 className="mt-3">{user.name}</h3>
          </div>

          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Location:</strong> {user.location}</p>
                <p><strong>Client Type:</strong> {user.Client_type}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div className="row">
      <div className="col-md-6">
        
      <p><Link className="btn btn-primary" to="/Update_profile">Update Profile/Password</Link></p>
        {/* <p><Link className="btn btn-primary" to="/Notification">Notification</Link></p> */}
        </div>
      </div>
    </div>
    </>
  );
};

export default ClientProfile;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, Container, Row, Col } from "react-bootstrap";

// const ClientProfile = () => {
//   const [client, setClient] = useState(null);

//   useEffect(() => {
//     const fetchClientData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/getuser"); // Replace with actual API endpoint
//         setClient(response.data);
//       } catch (error) {
//         console.error("Error fetching client data", error);
//       }
//     };
//     fetchClientData();
//   }, []);

//   if (!client) {
//     return <div className="text-center mt-5">Loading...</div>;
//   }

//   return (
//     <Container className="mt-5">
//       <Card className="shadow-lg p-4">
//         <Row>
//           <Col md={4} className="text-center">
//             <img
//               src={client.image ? `http://localhost:5000${client.image}` : "https://via.placeholder.com/150"}
//               alt="Profile"
//               className="rounded-circle"
//               style={{ width: "150px", height: "150px", objectFit: "cover" }}
//             />
//             <h4 className="mt-3">{client.name}</h4>
//           </Col>
//           <Col md={8}>
//             <h3 className="text-primary">Client Profile</h3>
//             <hr />
//             <Row>
//               <Col md={6}>
//                 <p><strong>Email:</strong> {client.email}</p>
//                 <p><strong>Phone:</strong> {client.phone}</p>
//               </Col>
//               <Col md={6}>
//                 <p><strong>Location:</strong> {client.location}</p>
//                 <p><strong>Client Type:</strong> {client.Client_type}</p>
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//       </Card>
//     </Container>
//   );
// };

// export default ClientProfile;
