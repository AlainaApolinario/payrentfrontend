import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [newRoom, setNewRoom] = useState({
    pad_number: '',
    monthly_fee: '',
    one_month_deposit: '',
    one_month_advance: '',
    security_deposit: '',
    min_water_bill: '',
    min_electric_bill: '',
    initial_electric_reading: '',
    initial_water_reading: '',
  });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axiosInstance.get('rooms/');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleAddRoom = () => {
    setShowAddRoomModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all numeric fields are valid numbers or null
    const sanitizedRoom = {
      ...newRoom,
      one_month_deposit: newRoom.one_month_deposit || null,
      one_month_advance: newRoom.one_month_advance || null,
      security_deposit: newRoom.security_deposit || null,
      min_water_bill: newRoom.min_water_bill || null,
      min_electric_bill: newRoom.min_electric_bill || null,
      initial_electric_reading: newRoom.initial_electric_reading || null,
      initial_water_reading: newRoom.initial_water_reading || null,
    };

    console.log('Submitting room data:', sanitizedRoom); // Log the sanitized payload

    try {
      const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      };
      await axiosInstance.post('rooms/', sanitizedRoom, config);
      setShowAddRoomModal(false);
      setNewRoom({
        pad_number: '',
        monthly_fee: '',
        one_month_deposit: '',
        one_month_advance: '',
        security_deposit: '',
        min_water_bill: '',
        min_electric_bill: '',
        initial_electric_reading: '',
        initial_water_reading: '',
      });
      const response = await axiosInstance.get('rooms/', config);
      setRooms(response.data);
    } catch (error) {
      console.error('Error adding room:', error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Rooms</h1>
        <button
          onClick={handleAddRoom}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          + Add Room
        </button>
      </div>

      {showAddRoomModal && (
        <div className="modal bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Add Room</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Pad Number</label>
              <input
                type="text"
                name="pad_number"
                value={newRoom.pad_number}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Monthly Fee</label>
              <input
                type="number"
                name="monthly_fee"
                value={newRoom.monthly_fee}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">One Month Deposit</label>
              <input
                type="number"
                name="one_month_deposit"
                value={newRoom.one_month_deposit}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">One Month Advance</label>
              <input
                type="number"
                name="one_month_advance"
                value={newRoom.one_month_advance}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Security Deposit</label>
              <input
                type="number"
                name="security_deposit"
                value={newRoom.security_deposit}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Min Water Bill</label>
              <input
                type="number"
                name="min_water_bill"
                value={newRoom.min_water_bill}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Min Electric Bill</label>
              <input
                type="number"
                name="min_electric_bill"
                value={newRoom.min_electric_bill}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Initial Electric Reading</label>
              <input
                type="number"
                name="initial_electric_reading"
                value={newRoom.initial_electric_reading}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Initial Water Reading</label>
              <input
                type="number"
                name="initial_water_reading"
                value={newRoom.initial_water_reading}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowAddRoomModal(false)}
              className="ml-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {rooms.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">No rooms available. Click "Add Room" to create one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white shadow rounded-lg p-6 flex flex-col items-start"
            >
              <h2 className="text-xl font-bold text-gray-700 mb-2">
                Room {room.pad_number}
              </h2>
              <p className="text-gray-600">
                Monthly Fee: <span className="font-semibold">₱{room.monthly_fee}</span>
              </p>
              <p className="text-gray-600">
                One Month Deposit: <span className="font-semibold">₱{room.one_month_deposit}</span>
              </p>
              <p className="text-gray-600">
                One Month Advance: <span className="font-semibold">₱{room.one_month_advance}</span>
              </p>
              <p className="text-gray-600">
                Security Deposit: <span className="font-semibold">₱{room.security_deposit}</span>
              </p>
              <p className="text-gray-600">
                Min Water Bill: <span className="font-semibold">₱{room.min_water_bill}</span>
              </p>
              <p className="text-gray-600">
                Min Electric Bill: <span className="font-semibold">₱{room.min_electric_bill}</span>
              </p>
              <p className="text-gray-600">
                Initial Electric Reading: <span className="font-semibold">{room.initial_electric_reading}</span>
              </p>
              <p className="text-gray-600">
                Initial Water Reading: <span className="font-semibold">{room.initial_water_reading}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rooms;