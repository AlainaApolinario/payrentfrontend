import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios'; // Import the Axios instance
import { FaHome, FaUsers, FaWallet, FaChartBar, FaCheckCircle, FaArrowRight } from 'react-icons/fa'; // Import icons
import ViewAccounts from './ViewAccounts';

const Dashboard = () => {
  const [showViewAccounts, setShowViewAccounts] = useState(false);

  const [dashboardData, setDashboardData] = useState({
    total_rooms: 0,
    total_tenants: 0,
    payment_this_month: 0,
    total_reports: 0,
    active_tenants: 0,
    tenants_paid_this_month: 0,
    pending_reports: 0,
  });

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get('dashboard/'); // Replace with your backend endpoint
        setDashboardData(response.data); // Update state with the fetched data
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  if (showViewAccounts) {
    return <ViewAccounts />;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Rooms Card */}
        <div className="bg-blue-500 text-white shadow rounded-lg p-6 flex flex-col items-start">
          <FaHome className="text-4xl mb-4" />
          <h2 className="text-xl font-bold mb-2">Total Rooms</h2>
          <p className="text-3xl font-semibold">{dashboardData.total_rooms}</p>
        </div>

        {/* Total Tenants Card */}
        <div className="bg-yellow-500 text-white shadow rounded-lg p-6 flex flex-col items-start">
          <FaUsers className="text-4xl mb-4" />
          <h2 className="text-xl font-bold mb-2">Total Tenants</h2>
          <p className="text-3xl font-semibold">{dashboardData.total_tenants}</p>
        </div>

        {/* Payment for This Month Card */}
        <div className="bg-green-500 text-white shadow rounded-lg p-6 flex flex-col items-start">
          <FaWallet className="text-4xl mb-4" />
          <h2 className="text-xl font-bold mb-2">Payment for This Month</h2>
          <p className="text-3xl font-semibold">₱{dashboardData.payment_this_month}</p>
        </div>

        {/* Total Reports Card */}
        <div className="bg-red-500 text-white shadow rounded-lg p-6 flex flex-col items-start">
          <FaChartBar className="text-4xl mb-4" />
          <h2 className="text-xl font-bold mb-2">Total Reports</h2>
          <p className="text-3xl font-semibold">{dashboardData.total_reports}</p>
        </div>

        {/* Active Tenants Card */}
        <div className="bg-blue-400 text-white shadow rounded-lg p-6 flex flex-col items-start">
          <FaCheckCircle className="text-4xl mb-4" />
          <h2 className="text-xl font-bold mb-2">Active Tenants</h2>
          <p className="text-3xl font-semibold">{dashboardData.active_tenants}</p>
        </div>

        {/* Tenants Who Paid This Month Card */}
        <div className="bg-gray-400 text-white shadow rounded-lg p-6 flex flex-col items-start">
          <FaArrowRight className="text-4xl mb-4" />
          <h2 className="text-xl font-bold mb-2">Tenants Who Paid This Month</h2>
          <p className="text-3xl font-semibold">{dashboardData.tenants_paid_this_month}</p>
        </div>

        {/* Pending Reports Card */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-start">
          <h2 className="text-xl font-bold text-gray-700 mb-2">Pending Reports</h2>
          <p className="text-3xl font-semibold text-red-500">{dashboardData.pending_reports}</p>
        </div>

        {/* View Accounts Card */}
        <div
          className="bg-white shadow rounded-lg p-6 flex flex-col items-start cursor-pointer hover:bg-gray-50"
          onClick={() => setShowViewAccounts(true)}
        >
          <h2 className="text-xl font-bold text-gray-700 mb-2">View Accounts</h2>
          <p className="text-l font-semibold text-purple-500">Click Here</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;