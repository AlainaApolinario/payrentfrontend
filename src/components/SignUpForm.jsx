import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../api/axios';

const SignUpForm = ({ onSignUpComplete }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    contact_number: '',
    password: '',
    date_occupancy: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('tenants/', formData);
      console.log('User registered:', response.data);
      if (onSignUpComplete) {
        onSignUpComplete();
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex items-center justify-center w-full max-w-6xl">
        {/* Left Section */}
        <div className="w-1/2 flex flex-col items-center justify-center">
          <img
            src="/pic.jpg" // Ensure this image is in the public folder
            alt="Rental Payment Tracking System"
            className="w-3/4 mb-6"
          />
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-blue-600 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-white mb-6">Sign Up</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="first_name" className="block text-sm font-medium text-white">
                  First Name
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  placeholder="Input your name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="last_name" className="block text-sm font-medium text-white">
                  Last Name
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  placeholder="Input your last name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact_number" className="block text-sm font-medium text-white">
                Contact Number
              </label>
              <input
                id="contact_number"
                name="contact_number"
                type="text"
                placeholder="Input your number"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.contact_number}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Input your username"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Input your password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="date_occupancy" className="block text-sm font-medium text-white">
                Date of Occupancy
              </label>
              <input
                id="date_occupancy"
                name="date_occupancy"
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.date_occupancy}
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 rounded-full text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

SignUpForm.propTypes = {
  onSignUpComplete: PropTypes.func.isRequired,
};

export default SignUpForm;