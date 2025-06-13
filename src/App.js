import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Components
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Rooms from './components/Rooms';
import Dashboard from './components/Dashboard';
import ViewAccounts from './components/ViewAccounts';
import Reports from './components/Reports';
import Notifications from './components/Notifications';

// Icons
import {
  FaTachometerAlt,
  FaHome,
  FaUsers,
  FaFileAlt,
  FaBell,
  FaSignOutAlt,
  FaBars
} from 'react-icons/fa';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // Load login state from localStorage
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

  // Render the current active page
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'rooms':
        return <Rooms onLogout={handleLogout} />;
      case 'accounts':
        return <ViewAccounts />;
      case 'reports':
        return <Reports />;
      case 'notifications':
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
              {/* Collapse/Expand Button */}
              <div className="p-4">
                <button
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="focus:outline-none"
                >
                  <FaBars />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-4 py-2 space-y-4">
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded w-full text-left"
                >
                  <FaTachometerAlt />
                  {!isSidebarCollapsed && <span>Dashboard</span>}
                </button>
                <button
                  onClick={() => setCurrentPage('rooms')}
                  className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded w-full text-left"
                >
                  <FaHome />
                  {!isSidebarCollapsed && <span>Rooms</span>}
                </button>
                <button
                  onClick={() => setCurrentPage('accounts')}
                  className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded w-full text-left"
                >
                  <FaUsers />
                  {!isSidebarCollapsed && <span>View Accounts</span>}
                </button>
                <button
                  onClick={() => setCurrentPage('reports')}
                  className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded w-full text-left"
                >
                  <FaFileAlt />
                  {!isSidebarCollapsed && <span>Reports</span>}
                </button>
                <button
                  onClick={() => setCurrentPage('notifications')}
                  className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded w-full text-left"
                >
                  <FaBell />
                  {!isSidebarCollapsed && <span>Notifications</span>}
                </button>
                <button
                  onClick={() => setCurrentPage('Room Temperature')}
                  className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded w-full text-left"
                >

                </button>
              </nav>

              {/* Logout */}
              <div className="p-14 mt-12">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 p-2 rounded w-full text-left"
                >
                  <FaSignOutAlt />
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

        {/* Login/Signup Toggle */}
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
