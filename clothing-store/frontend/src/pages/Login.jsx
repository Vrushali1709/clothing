// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import API from '../services/api';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await API.post('token/', { username, password });
      
//       // ✅ Corrected: localStorage.setItem use karo
//       localStorage.setItem('access_token', response.data.access);
//       localStorage.setItem('refresh_token', response.data.refresh);
      
//       alert('Login successful!');
//       navigate('/'); // Cart na badle Home ya Profile par redirect karo
//     } catch (error) {
//       console.error("Login error:", error);
//       alert('Invalid username or password');
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-10 sm:py-16 md:py-20 max-w-md min-h-[80vh] flex flex-col justify-center">
//       <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-900 tracking-tight">
//         Login to Your Account
//       </h2>
      
//       <form onSubmit={handleLogin} className="border border-gray-200 p-5 sm:p-8 rounded-lg shadow-sm bg-white space-y-4 sm:space-y-5">
//         <div>
//           <label className="block text-gray-700 font-medium mb-1.5 text-sm sm:text-base">
//             Username
//           </label>
//           <input 
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:border-black transition"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium mb-1.5 text-sm sm:text-base">
//             Password
//           </label>
//           <input 
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:border-black transition"
//             required
//           />
//         </div>

//         <button 
//           type="submit"
//           className="w-full bg-black text-white py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-bold hover:bg-gray-800 active:scale-[0.99] transition duration-150"
//         >
//           Login
//         </button>

//         <p className="text-center text-xs sm:text-sm text-gray-600 mt-4">
//           Don't have an account?{' '}
//           <Link to="/register" className="text-black font-bold underline hover:text-gray-800">
//             Register
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }






import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import API from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getErrorMessage = (err) => {
    const data = err?.response?.data;

    if (!data) {
      return 'Unable to connect to the server. Please try again.';
    }

    if (typeof data === 'string') {
      return data;
    }

    if (data.detail) {
      return data.detail;
    }

    if (data.non_field_errors?.length) {
      return data.non_field_errors[0];
    }

    if (data.username?.length) {
      return data.username[0];
    }

    if (data.password?.length) {
      return data.password[0];
    }

    return 'Invalid username or password.';
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError('');

    const cleanUsername = username.trim();

    if (!cleanUsername) {
      setError('Please enter your username.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const response = await API.post('token/', {
        username: cleanUsername,
        password
      });

      if (!response.data?.access) {
        throw new Error('Authentication token was not received.');
      }

      localStorage.setItem('access_token', response.data.access);

      if (response.data.refresh) {
        localStorage.setItem('refresh_token', response.data.refresh);
      }

      // If user was redirected to login from another protected page,
      // send them back there. Otherwise go to home.
      const redirectTo =
        location.state?.from?.pathname || '/';

      navigate(redirectTo, { replace: true });

    } catch (err) {
      console.error('Login error:', err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16">

      <div className="w-full max-w-md">

        {/* Brand / Header */}
        <div className="text-center mb-7 sm:mb-9">
          <div className="w-14 h-14 rounded-full bg-white border border-neutral-200 flex items-center justify-center mx-auto mb-5 shadow-sm">
            <Lock
              size={22}
              strokeWidth={1.5}
              className="text-neutral-700"
            />
          </div>

          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block mb-2">
            Private Client Access
          </span>

          <h1 className="text-3xl sm:text-4xl font-serif tracking-tight">
            Welcome Back
          </h1>

          <p className="text-xs text-neutral-500 mt-2 font-light">
            Sign in to access your collection and orders.
          </p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleLogin}
          className="bg-white border border-neutral-200/80 p-5 sm:p-8 shadow-sm"
        >

          {/* Error */}
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs leading-relaxed">
              {error}
            </div>
          )}

          {/* Username */}
          <div className="mb-5">
            <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-semibold">
              Username
            </label>

            <div className="relative">
              <User
                size={16}
                strokeWidth={1.5}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                autoComplete="username"
                placeholder="Enter your username"
                disabled={loading}
                className="w-full bg-neutral-50 border border-neutral-200 pl-10 pr-3.5 py-3.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition disabled:opacity-60"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
                Password
              </label>
            </div>

            <div className="relative">
              <Lock
                size={16}
                strokeWidth={1.5}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                autoComplete="current-password"
                placeholder="Enter your password"
                disabled={loading}
                className="w-full bg-neutral-50 border border-neutral-200 pl-10 pr-11 py-3.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={loading}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 transition disabled:opacity-50"
                aria-label={
                  showPassword ? 'Hide password' : 'Show password'
                }
              >
                {showPassword ? (
                  <EyeOff size={16} strokeWidth={1.5} />
                ) : (
                  <Eye size={16} strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neutral-900 text-white py-3.5 sm:py-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] hover:bg-black transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2
                  size={15}
                  className="animate-spin"
                />
                Signing In...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight
                  size={14}
                />
              </>
            )}
          </button>

          {/* Security */}
          <div className="flex items-center justify-center gap-2 mt-5 text-[10px] text-neutral-400">
            <ShieldCheck size={14} strokeWidth={1.5} />
            Secure client authentication
          </div>

          {/* Register */}
          <div className="border-t border-neutral-100 mt-6 pt-6 text-center">
            <p className="text-xs text-neutral-500">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-neutral-900 font-semibold underline underline-offset-4 hover:text-neutral-600 transition"
              >
                Create Account
              </Link>
            </p>
          </div>

        </form>

      </div>
    </div>
  );
}