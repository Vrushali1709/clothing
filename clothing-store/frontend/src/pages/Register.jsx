// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import API from '../services/api';

// export default function Register() {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post('register/', { username, email, password });
//       alert('Registration successful! Please login.');
//       navigate('/login');
//     } catch (error) {
//       console.error("Registration error:", error);
//       alert('Error during registration. Try a different username.');
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-10 sm:py-16 md:py-20 max-w-md">
//       <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-900">
//         Create an Account
//       </h2>
//       <form 
//         onSubmit={handleRegister} 
//         className="border p-5 sm:p-8 rounded-lg shadow-sm bg-white space-y-4"
//       >
//         <div>
//           <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
//             Username
//           </label>
//           <input 
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full border rounded-lg p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:border-black transition"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
//             Email
//           </label>
//           <input 
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border rounded-lg p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:border-black transition"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
//             Password
//           </label>
//           <input 
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full border rounded-lg p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:border-black transition"
//             required
//           />
//         </div>
//         <button 
//           type="submit"
//           className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 active:scale-[0.98] transition duration-200 text-sm sm:text-base"
//         >
//           Register
//         </button>
//         <p className="text-center text-xs sm:text-sm text-gray-600 mt-4">
//           Already have an account?{' '}
//           <Link to="/login" className="text-black font-bold underline hover:text-gray-800">
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }










import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserPlus,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import API from '../services/api';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError('');

    const username = formData.username.trim();
    const email = formData.email.trim();

    if (!username || !email || !formData.password) {
      setError('Please fill all required fields.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await API.post('register/', {
        username,
        email,
        password: formData.password,
      });

      alert('Registration successful! Please login.');

      navigate('/login', {
        replace: true,
        state: {
          registered: true,
        },
      });
    } catch (error) {
      console.error('Registration error:', error);

      const backendError = error?.response?.data;

      let message = 'Unable to create account. Please try again.';

      if (typeof backendError === 'string') {
        message = backendError;
      } else if (backendError?.username) {
        message = Array.isArray(backendError.username)
          ? backendError.username[0]
          : backendError.username;
      } else if (backendError?.email) {
        message = Array.isArray(backendError.email)
          ? backendError.email[0]
          : backendError.email;
      } else if (backendError?.detail) {
        message = backendError.detail;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-[80vh] flex items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-7">
          <div className="w-14 h-14 bg-neutral-900 text-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
            <UserPlus size={22} strokeWidth={1.5} />
          </div>

          <span className="block text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold mb-2">
            Become a Client
          </span>

          <h1 className="text-3xl sm:text-4xl font-serif tracking-tight">
            Create Account
          </h1>

          <p className="text-xs text-neutral-500 mt-3">
            Join our collection and manage your purchases effortlessly.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleRegister}
          className="bg-white border border-neutral-200 p-5 sm:p-8 shadow-sm"
        >
          {error && (
            <div className="mb-5 border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-xs leading-relaxed">
              {error}
            </div>
          )}

          {/* Username */}
          <div className="mb-4">
            <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-semibold">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              placeholder="Choose a username"
              className="w-full bg-neutral-50 border border-neutral-200 px-3.5 py-3.5 text-sm focus:outline-none focus:border-neutral-900 transition"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-semibold">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="example@gmail.com"
              className="w-full bg-neutral-50 border border-neutral-200 px-3.5 py-3.5 text-sm focus:outline-none focus:border-neutral-900 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-semibold">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="Minimum 6 characters"
                className="w-full bg-neutral-50 border border-neutral-200 px-3.5 py-3.5 pr-12 text-sm focus:outline-none focus:border-neutral-900 transition"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-semibold">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="Re-enter password"
                className="w-full bg-neutral-50 border border-neutral-200 px-3.5 py-3.5 pr-12 text-sm focus:outline-none focus:border-neutral-900 transition"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Register */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neutral-900 text-white py-3.5 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-black transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UserPlus size={15} />

            {loading ? 'Creating Account...' : 'Create Account'}

            {!loading && <ArrowRight size={14} />}
          </button>

          {/* Login */}
          <div className="mt-6 pt-5 border-t border-neutral-100 text-center">
            <p className="text-xs text-neutral-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-neutral-900 font-bold underline underline-offset-4"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>

        {/* Security */}
        <div className="flex justify-center items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-400 mt-5">
          <ShieldCheck size={14} />
          Secure Account Registration
        </div>
      </div>
    </div>
  );
}