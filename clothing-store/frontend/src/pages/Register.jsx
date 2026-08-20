import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('register/', { username, email, password });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      console.error("Registration error:", error);
      alert('Error during registration. Try a different username.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 sm:py-16 md:py-20 max-w-md">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-900">
        Create an Account
      </h2>
      <form 
        onSubmit={handleRegister} 
        className="border p-5 sm:p-8 rounded-lg shadow-sm bg-white space-y-4"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
            Username
          </label>
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-lg p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:border-black transition"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
            Email
          </label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:border-black transition"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
            Password
          </label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:border-black transition"
            required
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 active:scale-[0.98] transition duration-200 text-sm sm:text-base"
        >
          Register
        </button>
        <p className="text-center text-xs sm:text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-black font-bold underline hover:text-gray-800">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}