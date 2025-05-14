import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get('notifications/');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Notifications</h1>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            <strong>{notification.title}</strong>: {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;