import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../api/axios';
import pic from '../assets/pic.jpg';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/api/token/', {
        username,
        password,
      });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      setIsLoading(false);
      onLogin();
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid username or password');
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/password-reset/', {
        email: forgotPasswordEmail,
      });
      setForgotPasswordMessage('Password reset link sent to your email.');
    } catch (error) {
      console.error('Forgot password failed:', error);
      setForgotPasswordMessage('Failed to send password reset link.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex items-center justify-center w-full max-w-6xl">
        {/* Left Section */}
        <div className="w-1/2 flex flex-col items-center justify-center">
          <img
            src={pic}
            alt="Rental Payment Tracking System"
            className="w-3/4 mb-6"
          />
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-blue-600 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            {isForgotPassword ? 'Forgot Password' : 'Login'}
          </h2>

          {isForgotPassword ? (
            <form className="space-y-6" onSubmit={handleForgotPassword}>
              <div>
                <label
                  htmlFor="forgotPasswordEmail"
                  className="block text-sm font-medium text-white"
                >
                  Email
                </label>
                <input
                  id="forgotPasswordEmail"
                  name="forgotPasswordEmail"
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                />
              </div>

              {forgotPasswordMessage && (
                <div className="text-green-500 text-sm">
                  {forgotPasswordMessage}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 rounded-full text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Reset Link
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(false)}
                  className="text-sm text-white hover:underline bg-transparent border-none p-0 underline cursor-pointer"
                >
                  Back to Login
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-white"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Input your username"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Input your password"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-sm text-white hover:underline bg-transparent border-none p-0 underline cursor-pointer"
                >
                  Forgot Password
                </button>
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <div>
                <button
                  type="submit"
                  className={`w-full flex justify-center py-2 px-4 rounded-full text-sm font-medium text-white ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    'Login'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
