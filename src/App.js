import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Rooms from './components/Rooms';
import Dashboard from './components/Dashboard';
import ViewAccounts from './components/ViewAccounts';
import Reports from './components/Reports'; // Import Reports component
import Notifications from './components/Notifications'; // Import Notifications component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const storedLoginState = localStorage.getItem('isLoggedIn');
    if (storedLoginState === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'rooms':
        return <Rooms onLogout={handleLogout} />;
      case 'accounts':
        return <ViewAccounts />;
      case 'reports': // Add Reports case
        return <Reports />;
      case 'notifications': // Add Notifications case
        return <Notifications />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Router>
      <main>
        {isLoggedIn ? (
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <div
              className={`${
                isSidebarCollapsed ? 'w-16' : 'w-64'
              } bg-blue-700 text-white flex flex-col transition-all duration-300`}
            >
              {/* Toggle Button */}
              <div className="p-4">
                <button
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="focus:outline-none"
                >
                  <i className="fas fa-bars"></i>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-4 py-2 space-y-4">
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded w-full text-left"
                >
                  <i className="fas fa-tachometer-alt"></i>
                  {!isSidebarCollapsed && <span>Dashboard</span>}
                </button>
                <button
                  onClick={() => setCurrentPage('rooms')}
                  className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded w-full text-left"
                >
                  <i className="fas fa-home"></i>
                  {!isSidebarCollapsed && <span>Rooms</span>}
                </button>
                <button
                  onClick={() => setCurrentPage('accounts')}
                  className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded w-full text-left"
                >
                  <i className="fas fa-users"></i>
                  {!isSidebarCollapsed && <span>View Accounts</span>}
                </button>
                <button
                  onClick={() => setCurrentPage('reports')} // Add Reports navigation
                  className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded w-full text-left"
                >
                  <i className="fas fa-file-alt"></i>
                  {!isSidebarCollapsed && <span>Reports</span>}
                </button>
                <button
                  onClick={() => setCurrentPage('notifications')} // Add Notifications navigation
                  className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded w-full text-left"
                >
                  <i className="fas fa-bell"></i>
                  {!isSidebarCollapsed && <span>Notifications</span>}
                </button>
              </nav>

              {/* Logout Button */}
              <div className="p-4 mt-auto">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 p-2 rounded w-full text-left"
                >
                  <i className="fas fa-sign-out-alt"></i>
                  {!isSidebarCollapsed && <span>Log out</span>}
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 p-4 md:p-6">
              {renderPage()}
            </div>
          </div>
        ) : isSignUp ? (
          <SignUpForm onSignUpComplete={() => setIsSignUp(false)} />
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}

        {/* Toggle Between Login and Sign Up */}
        {!isLoggedIn && (
          <div className="text-center mt-8">
            {isSignUp ? (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-blue-500 hover:underline"
                >
                  Log In
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-blue-500 hover:underline"
                >
                  Sign Up
                </button>
              </p>
            )}
          </div>
        )}
      </main>
    </Router>
  );
}

export default App;