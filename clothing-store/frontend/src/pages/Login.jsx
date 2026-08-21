import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('token/', { username, password });
      
      // ✅ Corrected: localStorage.setItem use karo
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      alert('Login successful!');
      navigate('/'); // Cart na badle Home ya Profile par redirect karo
    } catch (error) {
      console.error("Login error:", error);
      alert('Invalid username or password');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 sm:py-16 md:py-20 max-w-md min-h-[80vh] flex flex-col justify-center">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-900 tracking-tight">
        Login to Your Account
      </h2>
      
      <form onSubmit={handleLogin} className="border border-gray-200 p-5 sm:p-8 rounded-lg shadow-sm bg-white space-y-4 sm:space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1.5 text-sm sm:text-base">
            Username
          </label>
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:border-black transition"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1.5 text-sm sm:text-base">
            Password
          </label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:border-black transition"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-black text-white py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-bold hover:bg-gray-800 active:scale-[0.99] transition duration-150"
        >
          Login
        </button>

        <p className="text-center text-xs sm:text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-black font-bold underline hover:text-gray-800">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}