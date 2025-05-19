// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Notifications = ({ userId }) => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/notifications/${userId}`);
//       setNotifications(response.data);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Your Notifications</h2>
//       <ul className="list-group">
//         {notifications.length === 0 ? (
//           <li className="list-group-item">No new notifications</li>
//         ) : (
//           notifications.map((notification) => (
//             <li key={notification._id} className="list-group-item">
//               {notification.message} - <small className="text-muted">{new Date(notification.createdAt).toLocaleString()}</small>
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Notifications;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/notifications/${userId}`);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <div className="container">
      <h2>Your Notifications</h2>
      <ul className="list-group">
        {notifications.length === 0 ? (
          <li className="list-group-item">No new notifications</li>
        ) : (
          notifications.map((notification) => (
            <li key={notification._id} className="list-group-item">
              {notification.message} - <small className="text-muted">{new Date(notification.createdAt).toLocaleString()}</small>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Notifications;

