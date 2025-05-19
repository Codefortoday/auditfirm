import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminPanel = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contacts");
      setContacts(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
        <h2 className="mb-4">Admin Panel - Contact Messages</h2>
      {loading ? (
        <p>Loading messages...</p>
      ) : contacts.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact._id}>
                <td>{index + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.message}</td>
                <td>{new Date(contact.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link to="/AdminDash" className='m-3 btn btn-primary'>Dashboard</Link>
    </div>
  );
};

export default AdminPanel;
