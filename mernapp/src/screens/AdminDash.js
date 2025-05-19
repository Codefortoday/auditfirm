// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AdminDashboard() {
//     const [admin, setAdmin] = useState(null);
//     const [admins, setAdmins] = useState([]);
//     const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "" });
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = localStorage.getItem("adminToken");
//         if (!token) {
//             navigate("/Adminlogin");
//             return;
//         }

//         fetch("http://localhost:5000/api/admin/profile", {
//             method: "GET",
//             headers: { "Content-Type": "application/json", Authorization: token },
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 if (data.error) {
//                     navigate("Adminlogin");
//                 } else {
//                     setAdmin(data);
//                 }
//             });

//         fetch("http://localhost:5000/api/admin/all", {
//             method: "GET",
//             headers: { "Content-Type": "application/json", Authorization: token },
//         })
//             .then((res) => res.json())
//             .then((data) => setAdmins(data));
//     }, [navigate]);

//     const handleLogout = () => {
//         localStorage.removeItem("adminToken");
//         navigate("/Adminlogin");
//     };

//     const handleAddAdmin = async (e) => {
//         e.preventDefault();
//         const token = localStorage.getItem("adminToken");

//         const response = await fetch("http://localhost:5000/api/admin/add", {
//             method: "POST",
//             headers: { "Content-Type": "application/json", Authorization: token },
//             body: JSON.stringify(newAdmin),
//         });

//         const data = await response.json();
//         if (response.ok) {
//             alert("New admin added!");
//             setAdmins([...admins, data]);
//             setNewAdmin({ name: "", email: "", password: "" });
//         } else {
//             alert(data.message);
//         }
//     };

//     return (
//         <div className="container mt-5">
//             {admin ? (
//                 <>
//                     <h2>Welcome, {admin.name}!</h2>
//                     <p>Email: {admin.email}</p>

//                     <h3>Admin List</h3>
//                     <ul>
//                         {admins.map((adm) => (
//                             <li key={adm._id}>{adm.name} - {adm.email}</li>
//                         ))}
//                     </ul>


//                     {admin.email === "Superadmin@gmail.com" && (

//                         <div><h3>Add new Admin</h3>
//                         <form onSubmit={handleAddAdmin}>
//                             <input
//                                 type="text"
//                                 placeholder="Name"
//                                 value={newAdmin.name}
//                                 onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
//                                 required
//                             />
//                             <input
//                                 type="email"
//                                 placeholder="Email"
//                                 value={newAdmin.email}
//                                 onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
//                                 required
//                             />
//                             <input
//                                 type="password"
//                                 placeholder="Password"
//                                 value={newAdmin.password}
//                                 onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
//                                 required
//                             />
//                             <input
//                                 type="String"
//                                 placeholder="role"
//                                 value={newAdmin.role}
//                                 onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
//                                 required
//                             />
//                             <button type="submit">Add Admin</button>
//                         </form>
//                         </div>
//                     )}


//                     {/* <form onSubmit={handleAddAdmin}>
//             <input type="text" placeholder="Name" value={newAdmin.name} onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })} required />
//             <input type="email" placeholder="Email" value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} required />
//             <input type="password" placeholder="Password" value={newAdmin.password} onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })} required />
//             <button type="submit">Add Admin</button>
//           </form> */}

//                     <button className="btn btn-danger mt-3" onClick={handleLogout}>
//                         Logout
//                     </button>
//                 </>
//             ) : (
//                 <h2>Loading...</h2>
//             )}
//         </div>
//     );
// }

 import React, { useEffect, useState } from "react";
 import { useNavigate, Link, data } from "react-router-dom";
 import AdminLogin from "./Adminlogin";
 import axios from "axios";

 export default function AdminDashboard() {
   const [admin, setAdmin] = useState(null);
   const [users, setUsers] = useState([]);
   const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "" });
   const navigate = useNavigate();
  
   useEffect(() => {
     const fetchAdminData = async () => {
       const token = localStorage.getItem("adminToken");
       if (!token) {
         navigate("/Adminlogin");
         return;
       }
       const response = await fetch("http://localhost:5000/api/admin/profile", {
         method: "GET",
         headers: { Authorization: token },
       });
       const data = await response.json();
       setAdmin(data);
     };

     const fetchUsers = async () => {
       const response = await fetch("http://localhost:5000/api/profile");
       const data = await response.json();
       setUsers(data);
     };

     fetchAdminData();
     fetchUsers();
   }, [navigate]);

   const handleLogout = () => {
     localStorage.removeItem("adminToken");
     navigate("/Adminlogin");
   };

   const handleAddAdmin = async (e) => {
     e.preventDefault();
     const response = await fetch("http://localhost:5000/api/admin/add", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Authorization: localStorage.getItem("adminToken"),
       },
       body: JSON.stringify(newAdmin),
       
     });

     const json = await response.json();
     if (json.success) {
      setNewAdmin({ name: "", email: "", password: "" });
      alert("Admin added successfully!");
     } else {
      alert(`Error: ${json.message}`);
       

     }
   };
   const [totalAdmins, setTotalAdmins] = useState(0);

   useEffect(() => {
     const fetchAdmins = async () => {
       try {
         const response = await fetch("http://localhost:5000/api/admin/login"); // API to fetch all admins
         const data = await response.json();
         setTotalAdmins(data.length); // Store the total count of admins
       } catch (error) {
         console.error("Error fetching admins:", error);
       }
     };

     fetchAdmins();
   }, []);

   return (
     <div className="container-fluid">
       <div className="row">
         {/* Sidebar */}
         <nav className="col-md-2 col-lg-1 d-md-block bg-dark sidebar text-white p-3" style={{ minHeight: "100vh", width: "180px" }}>
          <h4 className="text-center pb-2 border-bottom">Admin Panel</h4>
          <ul className="nav flex-column mt-3">
            <li className="nav-item">
              <a className="nav-link text-white py-2" href="#">
                <i className="bi bi-house-door-fill me-2"></i> Dashboard
              </a>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white py-2" to="/Newslettertb">
                <i className="bi bi-envelope-fill me-2"></i> Manage Newsletter
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white py-2" to="/Booked_tb">
                <i className="bi bi-calendar-check-fill me-2"></i> Manage Appointments
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white py-2" to="/Contact_tb">
                <i className="bi bi-chat-left-dots-fill me-2"></i> Manage Contact Query
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link className="nav-link text-white py-2" to="/Service_tb">
                <i className="bi bi-gear-fill me-2"></i> Manage Client Services
              </Link>
            </li> */}

            {admin?.role === "superadmin" && (
              <li className="nav-item">
                <a className="nav-link text-white py-2" href="#">
                  <i className="bi bi-person-plus-fill me-2"></i> Add Admin
                </a>
              </li>
            )}

            {/* <li className="nav-item">
              <a className="nav-link text-white py-2" href="#">
                <i className="bi bi-gear-wide-connected me-2"></i> Settings
              </a>
            </li> */}

            <li className="nav-item">
              <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </button>
            </li>
          </ul>
        </nav>
        

         {/* Main Content */}
         <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
           <h2 className="mt-4">Welcome, {admin?.name || "Admin"}!</h2>

           {/* Analytics Cards */}
           <div className="row mt-4">
             <div className="col-md-4">
               <div className="card text-white bg-primary mb-3">
                 <div className="card-body">
                   <h5 className="card-title">Total Superadmin</h5>
                   <p className="card-text">1</p>
                 </div>
               </div>
             </div>
             <div className="col-md-4">
               <div className="card text-white bg-success mb-3">
                 <div className="card-body">
                   <h5 className="card-title">Total Admins</h5>
                   <p className="card-text">{data.length}</p>
                 </div>
               </div>
             </div>
           </div>
           {/* User Management Table */}
           {/* <h3 className="mt-4">Manage Users</h3>
           <table className="table table-striped table-hover table-bordered text-center">
             <thead className="table-dark">
               <tr>
                 <th>Name</th>
                 <th>Email</th>
                 <th>Actions</th>
               </tr>
             </thead>
             <tbody>
  {users && users.length > 0 ? (
    users.map((user) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          <button className="btn btn-warning btn-sm me-2">
            <i className="bi bi-pencil-square"></i> Edit
          </button>
          <button className="btn btn-danger btn-sm">
            <i className="bi bi-trash"></i> Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3" className="text-center text-muted">No users found</td>
    </tr>
  )}
</tbody>

           </table> */}
          {/* Add Admin Form (Only for Super Admin) */}
           {admin?.email === "Superadmin@gmail.com" && (
             <div className="mt-5">
               <h3>Add New Admin</h3>
               <form onSubmit={handleAddAdmin} className="mt-3">
                <div className="mb-3">
                   <input
                     type="text"
                     className="form-control"
                     placeholder="Name"
                     value={newAdmin.name}
                     onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                     required
                   />
                 </div>
                 <div className="mb-3">
                  <input
                     type="email"
                     className="form-control"
                     placeholder="Email"
                     value={newAdmin.email}
                     onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                     required
                   />
                 </div>
                 <div className="mb-3">
                   <input
                     type="password"
                     className="form-control"
                     placeholder="Password"
                     value={newAdmin.password}
                     onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                     required
                   />
                </div>
                 <button type="submit" className="btn btn-primary">Add Admin</button>
               </form>
             </div>
           )}
         </main>
       </div>
     </div>
   );
}


// import React, { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// export default function AdminDashboard() {
//   const [admin, setAdmin] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "" });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAdminData = async () => {
//       const token = localStorage.getItem("adminToken");
//       if (!token) {
//         navigate("/Adminlogin");
//         return;
//       }
//       const response = await fetch("http://localhost:5000/api/admin/profile", {
//         method: "GET",
//         headers: { Authorization: token },
//       });
//       const data = await response.json();
//       setAdmin(data);
//     };

//     const fetchUsers = async () => {
//       const response = await fetch("http://localhost:5000/api/users");
//       const data = await response.json();
//       setUsers(data);
//     };

//     fetchAdminData();
//     fetchUsers();
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/Adminlogin");
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         {/* Sidebar */}
        
//           <nav className="col-md-2 col-lg-1 d-md-block bg-dark sidebar text-white p-3" style={{ minHeight: "100vh", width: "180px" }}>
//           <h4 className="text-center pb-2 border-bottom">Admin Panel</h4>
//           <ul className="nav flex-column mt-3">
//             <li className="nav-item">
//               <a className="nav-link text-white py-2" href="#">
//                 <i className="bi bi-house-door-fill me-2"></i> Dashboard
//               </a>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link text-white py-2" to="/Newslettertb">
//                 <i className="bi bi-envelope-fill me-2"></i> Manage Newsletter
//               </Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link text-white py-2" to="/Booked_tb">
//                 <i className="bi bi-calendar-check-fill me-2"></i> Manage Appointments
//               </Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link text-white py-2" to="/Contact_tb">
//                 <i className="bi bi-chat-left-dots-fill me-2"></i> Manage Contact Query
//               </Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link text-white py-2" to="/Service_tb">
//                 <i className="bi bi-gear-fill me-2"></i> Manage Client Services
//               </Link>
//             </li>

//             {admin?.role === "superadmin" && (
//               <li className="nav-item">
//                 <a className="nav-link text-white py-2" href="#">
//                   <i className="bi bi-person-plus-fill me-2"></i> Add Admin
//                 </a>
//               </li>
//             )}

//             <li className="nav-item">
//               <a className="nav-link text-white py-2" href="#">
//                 <i className="bi bi-gear-wide-connected me-2"></i> Settings
//               </a>
//             </li>

//             <li className="nav-item">
//               <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
//                 <i className="bi bi-box-arrow-right me-2"></i> Logout
//               </button>
//             </li>
//           </ul>
//         </nav>

//         {/* Main Content */}
//         <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
//           <h2 className="mt-4">Welcome, {admin?.name || "Admin"}!</h2>

//           {/* Analytics Cards */}
//           <div className="row mt-4">
//             <div className="col-md-4">
//               <div className="card text-white bg-primary mb-3 shadow">
//                 <div className="card-body">
//                   <h5 className="card-title">Total Users</h5>
//                   <p className="card-text">{users.length}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div className="card text-white bg-success mb-3 shadow">
//                 <div className="card-body">
//                   <h5 className="card-title">Total Admins</h5>
//                   <p className="card-text">3</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* User Management Table */}
//           <h3 className="mt-4">Manage Users</h3>
//           <table className="table table-striped mt-3">
//             <thead className="table-dark">
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user) => (
//                 <tr key={user._id}>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>
//                     <button className="btn btn-warning btn-sm me-2">Edit</button>
//                     <button className="btn btn-danger btn-sm">Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Add Admin Form */}
//           {admin?.email === "Superadmin@gmail.com" && (
//             <div className="mt-5">
//               <h3>Add New Admin</h3>
//               <form className="mt-3">
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Name"
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="email"
//                     className="form-control"
//                     placeholder="Email"
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Password"
//                     required
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Add Admin</button>
//               </form>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }
