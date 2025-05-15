import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../api/axios'; // Adjust path if needed
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaArrowLeft } from 'react-icons/fa';


const initialRoomState = () => ({
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

const initialTenantState = () => ({
  name: '',
  email: '',
  phone: '',
  move_in_date: '',
});

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isRoomOptionsMode, setIsRoomOptionsMode] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showTenantModal, setShowTenantModal] = useState(false);
  const [showAddTenantModal, setShowAddTenantModal] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [newRoom, setNewRoom] = useState(initialRoomState());
  const [dropdownRoomId, setDropdownRoomId] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [tenantInfo, setTenantInfo] = useState(initialTenantState());
  const [tenants, setTenants] = useState([]); // State to store tenants of the selected room
  const [showAddModal, setShowAddModal] = useState(false); // Define state for Add Modal

  const dropdownRef = useRef(null);

  const roomFieldKeys = Object.keys(initialRoomState());

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownRoomId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axiosInstance.get('rooms/');
      console.log('Fetched rooms:', response.data);
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const fetchTenants = async (roomId) => {
    // Correct usage
axiosInstance.get(`rooms/${roomId}/tenants/`)
  .then((response) => {
    setTenants(response.data);
  })
  .catch((error) => {
    console.error("Error fetching tenants:", error);
  });
  };

  const handleEdit = (room) => {
    setSelectedRoom(room);
    fetchTenants(room.id);
    setIsRoomOptionsMode(true); // Enable room options mode
    setShowTenantModal(true);
    setDropdownRoomId(null);
  };

  const handleAddTenant = async (room) => {
    setSelectedRoom(room); // Store the selected room
    await fetchTenants(room.id); // Wait for tenants to be fetched
    setShowTenantModal(true); // Open the modal
    setDropdownRoomId(null);
  };

  const handleTenantInputChange = (e) => {
    const { name, value } = e.target;
    setTenantInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTenantSubmit = async (e) => {
    e.preventDefault();

    const tenantData = {
      ...tenantInfo,
      room_id: selectedRoom?.id, // Ensure selectedRoom is not null
    };

    console.log('Submitting tenant:', tenantData);

    try {
      await axiosInstance.post('tenants/', tenantData); // Adjust endpoint if needed
      console.log('Tenant added successfully');
      setTenantInfo(initialTenantState());
      fetchTenants(selectedRoom.id); // Refresh the tenant list
      setShowAddTenantModal(false);
    } catch (error) {
      console.error('Error adding tenant:', error.response?.data || error.message);
      alert('Failed to add tenant. Please check the input and try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    console.log('Submitting room:', sanitizedRoom);

    try {
      if (editingRoomId) {
        await axiosInstance.put(`rooms/${editingRoomId}/`, sanitizedRoom);
      } else {
        await axiosInstance.post('rooms/', sanitizedRoom);
      }
      console.log('Room saved successfully');
      setShowRoomModal(false);
      setNewRoom(initialRoomState());
      setEditingRoomId(null);
      fetchRooms();
    } catch (error) {
      console.error('Error saving room:', error.response?.data || error.message);
    }
  };

  const handleDelete = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await axiosInstance.delete(`rooms/${roomId}/`);
        setRooms((prev) => prev.filter((room) => room.id !== roomId));
        setDropdownRoomId(null);
      } catch (error) {
        console.error('Error deleting room:', error);
      }
    }
  };

  const handleEditRoomRates = (room) => {
    setShowTenantModal(false); // Close the View Tenant modal
    setNewRoom(room); // Populate the modal with the selected room's data
    setEditingRoomId(room.id); // Set the room ID for editing
    setShowRoomModal(true); // Open the Edit Room modal
  };

  const deleteTenant = async (tenantId) => {
    if (window.confirm('Are you sure you want to delete this tenant?')) {
      try {
        await axiosInstance.delete(`tenants/${tenantId}/`);
        setTenants((prev) => prev.filter((tenant) => tenant.id !== tenantId));
      } catch (error) {
        console.error('Error deleting tenant:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Rooms</h1>
        <button
          onClick={() => {
            setNewRoom(initialRoomState());
            setEditingRoomId(null);
            setShowRoomModal(true);
          }}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          <span className="mr-2 text-xl">+</span> Add Room
        </button>
      </div>

      {/* Add/Edit Room Modal */}
      {showRoomModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] border">
            <div className="flex items-center mb-4">
              <button onClick={() => setShowRoomModal(false)} className="mr-4">
                <FaArrowLeft />
              </button>
              <h2 className="text-xl font-bold">{editingRoomId ? 'Edit Room' : 'Add Room'}</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {roomFieldKeys.map((key) => (
                  <div key={key}>
                    <label className="block text-gray-700 text-sm mb-1 capitalize">{key.replace(/_/g, ' ')}</label>
                    <input
                      type="text"
                      name={key}
                      value={newRoom[key] || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required={key === 'pad_number' || key === 'monthly_fee'}
                    />
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 mt-4 rounded-lg w-full hover:bg-green-600"
              >
                {editingRoomId ? 'Update Room' : 'Add Room'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tenant Modal */}
      {showTenantModal && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded shadow-lg overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {isRoomOptionsMode
                  ? "Room Options"
                  : `Tenants for ${selectedRoom.pad_number}`}
              </h2>
              <button
                onClick={() => {
                  setShowTenantModal(false);
                  setIsRoomOptionsMode(false);
                  setSelectedRoom(null);
                }}
                className="text-gray-600 hover:text-gray-900"
              >
                &times;
              </button>
            </div>

            {isRoomOptionsMode && (
              <div className="flex justify-around mb-4">
                <button
                  onClick={() => handleEditRoomRates(selectedRoom)}
                  className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
                >
                  Edit Room Rates
                </button>
                <button
                  onClick={() => setShowAddTenantModal(true)}
                  className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
                >
                  Add Tenant
                </button>
              </div>
            )}

            <h3 className="text-lg font-semibold mb-2">Tenants</h3>
            <ul className="divide-y divide-gray-200">
              {tenants.length === 0 ? (
                <p className="text-gray-600">No tenants found.</p>
              ) : (
                tenants.map((tenant) => (
                  <li key={tenant.id} className="py-2">
                    <div className="flex justify-between items-center">
                      <span>{tenant.name}</span>
                      <button
                        onClick={() => deleteTenant(tenant.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Add Tenant Modal */}
      {showAddTenantModal && selectedRoom && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] border">
            <div className="flex items-center mb-4">
              <button onClick={() => setShowAddTenantModal(false)} className="mr-4">
                <FaArrowLeft />
              </button>
              <h2 className="text-xl font-bold">Add Tenant to {selectedRoom.pad_number}</h2>
            </div>
            <form onSubmit={handleAddTenantSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={tenantInfo.name}
                    onChange={handleTenantInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={tenantInfo.email}
                    onChange={handleTenantInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={tenantInfo.phone}
                    onChange={handleTenantInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Move-in Date</label>
                  <input
                    type="date"
                    name="move_in_date"
                    value={tenantInfo.move_in_date}
                    onChange={handleTenantInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 mt-4 rounded-lg w-full hover:bg-green-600"
              >
                Add Tenant
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Room List */}
      <div className="bg-white rounded-lg shadow p-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="flex justify-between items-center border-b py-3 hover:bg-gray-50 relative"
          >
            <div className="font-medium text-lg">Pad Number: {room.pad_number}</div>
            <div className="relative" ref={dropdownRoomId === room.id ? dropdownRef : null}>
              <button
                onClick={() =>
                  setDropdownRoomId(dropdownRoomId === room.id ? null : room.id)
                }
                className="p-2 hover:bg-gray-200 rounded-full"
              >
                <BsThreeDotsVertical size={20} />
              </button>
              {dropdownRoomId === room.id && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-10">
                  <button
                    onClick={() => handleEdit(room)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Edit Room
                  </button>
                  <button
                    onClick={() => handleAddTenant(room)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    View Tenant
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Delete Room
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;