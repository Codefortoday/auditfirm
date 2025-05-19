import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";

export default function AdminDashboard() {
    const [subscribers, setSubscribers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/subscribersfetch")
            .then(response => setSubscribers(response.data))
            .catch(error => console.error("Error fetching subscribers:", error));
    }, []);

    return (
        <div className="container mt-5">
            <Link to="/AdminDash" className='m-3 btn btn-primary'>Dashboard</Link>
            <h2 className="text-center">Newsletter Subscribers</h2>
            <table className="table table-striped mt-3">
                <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                {subscribers.map((subscriber, index) => (
            <tr key={subscriber._id}>
              <td>{index + 1}</td>
              <td>{subscriber.email}</td>
              <td>{new Date(subscriber.subscribeat).toLocaleString()}</td>
              </tr>
                    ))}
                    {/* {subscribers.map((subscriber, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{subscriber.email}</td>
                            */}
                    
                </tbody>
            </table>
        </div>
    );
}
