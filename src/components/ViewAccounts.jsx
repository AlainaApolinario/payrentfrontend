import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

const ViewAccounts = () => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await axiosInstance.get('tenants/');
        setTenants(response.data);
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    };

    fetchTenants();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">View Accounts</h1>
      <div className="space-y-6">
        {tenants.map((tenant) => (
          <div key={tenant.id} className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Billing History: {tenant.first_name} {tenant.last_name}
            </h2>
            {tenant.billingHistory.map((bill) => (
              <div
                key={bill.billingId}
                className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">
                    <strong>Billing ID:</strong> {bill.billingId}
                  </p>
                  <p className="text-gray-700">
                    <strong>Due Date:</strong> {bill.dueDate}
                  </p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">
                    <strong>Rent Fee:</strong> {bill.rentFee}
                  </p>
                  <p className="text-gray-700">
                    <strong>Water Bill:</strong> {bill.waterBill}
                  </p>
                  <p className="text-gray-700">
                    <strong>Electric Bill:</strong> {bill.electricBill}
                  </p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p
                    className={`text-lg font-bold ${
                      bill.status === 'Paid' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    Status: {bill.status}
                  </p>
                  <p className="text-lg font-bold">
                    Total: {bill.rentFee + bill.waterBill + bill.electricBill}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    disabled={bill.status === 'Paid'}
                  >
                    Mark as Paid
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Check the Receipt
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAccounts;