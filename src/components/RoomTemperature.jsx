import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

const RoomTemperature = () => {
  const [temperatures, setTemperatures] = useState([]);
  const [error, setError] = useState('');

  // Temporarily disable data fetching by commenting out the useEffect hook
  /*
  useEffect(() => {
    const fetchRoomTemperatures = async () => {
      try {
        const response = await axiosInstance.get('rooms/temperature/'); // Replace with your backend endpoint
        setTemperatures(response.data); // Update state with the fetched data
      } catch (error) {
        console.error('Error fetching room temperatures:', error);
        setError('Failed to fetch room temperatures.');
      }
    };

    fetchRoomTemperatures();
  }, []);
  */

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Room Temperature</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {temperatures.map((room) => (
          <div
            key={room.id}
            className="bg-blue-500 text-white shadow rounded-lg p-6 flex flex-col items-start"
          >
            <h2 className="text-xl font-bold mb-2">{room.name}</h2>
            <p className="text-3xl font-semibold">{room.temperature}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomTemperature;