import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axiosInstance.get('reports/');
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Reports</h1>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            {report.title} - {report.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;