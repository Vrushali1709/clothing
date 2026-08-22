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





// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Eye, EyeOff, LockKeyhole, LogIn, ArrowRight } from 'lucide-react';
// import API from '../services/api';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const navigate = useNavigate();
//   const location = useLocation();

//   const redirectTo = location.state?.from || '/';

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     setError('');

//     if (!username.trim() || !password) {
//       setError('Please enter your username and password.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await API.post('token/', {
//         username: username.trim(),
//         password,
//       });

//       if (!response?.data?.access) {
//         throw new Error('Authentication token was not received.');
//       }

//       localStorage.setItem('access_token', response.data.access);

//       if (response.data.refresh) {
//         localStorage.setItem('refresh_token', response.data.refresh);
//       }

//       // Same-tab auth sync માટે
//       window.dispatchEvent(new Event('auth-change'));

//       navigate(redirectTo, { replace: true });
//     } catch (error) {
//       console.error('Login error:', error);

//       const message =
//         error?.response?.data?.detail ||
//         error?.response?.data?.non_field_errors?.[0] ||
//         'Invalid username or password.';

//       setError(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-[#FAF8F5] min-h-[80vh] flex items-center justify-center px-4 py-12 sm:py-16">
//       <div className="w-full max-w-md">

//         {/* Header */}
//         <div className="text-center mb-7">
//           <div className="w-14 h-14 bg-neutral-900 text-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
//             <LockKeyhole size={22} strokeWidth={1.5} />
//           </div>

//           <span className="block text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold mb-2">
//             Client Access
//           </span>

//           <h1 className="text-3xl sm:text-4xl font-serif tracking-tight text-neutral-900">
//             Welcome Back
//           </h1>

//           <p className="text-xs text-neutral-500 mt-3">
//             Sign in to access your account and orders.
//           </p>
//         </div>

//         {/* Form */}
//         <form
//           onSubmit={handleLogin}
//           className="bg-white border border-neutral-200 p-5 sm:p-8 shadow-sm"
//         >
//           {error && (
//             <div className="mb-5 border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-xs leading-relaxed">
//               {error}
//             </div>
//           )}

//           {/* Username */}
//           <div className="mb-5">
//             <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-semibold">
//               Username
//             </label>

//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               autoComplete="username"
//               placeholder="Enter your username"
//               className="w-full bg-neutral-50 border border-neutral-200 px-3.5 py-3.5 text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 transition"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-6">
//             <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-semibold">
//               Password
//             </label>

//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 autoComplete="current-password"
//                 placeholder="Enter your password"
//                 className="w-full bg-neutral-50 border border-neutral-200 px-3.5 py-3.5 pr-12 text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 transition"
//                 required
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-900"
//                 aria-label={showPassword ? 'Hide password' : 'Show password'}
//               >
//                 {showPassword ? (
//                   <EyeOff size={18} />
//                 ) : (
//                   <Eye size={18} />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Login */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-neutral-900 text-white py-3.5 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-black transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <LogIn size={15} />

//             {loading ? 'Signing In...' : 'Sign In'}

//             {!loading && <ArrowRight size={14} />}
//           </button>

//           {/* Register */}
//           <div className="mt-6 pt-5 border-t border-neutral-100 text-center">
//             <p className="text-xs text-neutral-500">
//               Don't have an account?{' '}
//               <Link
//                 to="/register"
//                 className="text-neutral-900 font-bold underline underline-offset-4 hover:text-neutral-500"
//               >
//                 Create Account
//               </Link>
//             </p>
//           </div>
//         </form>

//         {/* Security */}
//         <p className="text-center text-[10px] uppercase tracking-widest text-neutral-400 mt-5">
//           Secure Client Access
//         </p>
//       </div>
//     </div>
//   );
// }










// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import {
//   Eye,
//   EyeOff,
//   LockKeyhole,
//   LogIn,
//   ArrowRight,
// } from 'lucide-react';
// import API from '../services/api';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const navigate = useNavigate();
//   const location = useLocation();

//   /*
//     If user came from a protected page,
//     redirect them back there after login.
    
//     Example:
//     /profile -> /login -> successful login -> /profile
//   */
//   const redirectTo = location.state?.from || '/';

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // Prevent multiple submissions
//     if (loading) return;

//     setError('');

//     const cleanUsername = username.trim();

//     if (!cleanUsername || !password) {
//       setError('Please enter your username and password.');
//       return;
//     }

//     setLoading(true);

//     try {
//       /*
//         Clear old tokens first.
//         This prevents stale authentication data
//         from causing problems.
//       */
//       localStorage.removeItem('access_token');
//       localStorage.removeItem('refresh_token');

//       const response = await API.post('token/', {
//         username: cleanUsername,
//         password,
//       });

//       const accessToken = response?.data?.access;
//       const refreshToken = response?.data?.refresh;

//       if (!accessToken) {
//         throw new Error('Authentication token was not received.');
//       }

//       /*
//         Save JWT tokens
//       */
//       localStorage.setItem('access_token', accessToken);

//       if (refreshToken) {
//         localStorage.setItem('refresh_token', refreshToken);
//       }

//       /*
//         IMPORTANT:
//         Notify Navbar immediately.

//         Navbar listens for:
//         window.addEventListener('auth-change', ...)
//       */
//       window.dispatchEvent(new Event('auth-change'));

//       /*
//         Redirect user after successful login
//       */
//       navigate(redirectTo, {
//         replace: true,
//       });
//     } catch (err) {
//       console.error('Login error:', err);

//       /*
//         If API returned an error,
//         show useful message to user.
//       */
//       const apiError =
//         err?.response?.data?.detail ||
//         err?.response?.data?.non_field_errors?.[0];

//       if (apiError) {
//         setError(apiError);
//       } else if (err?.message === 'Authentication token was not received.') {
//         setError('Login failed. Authentication token was not received.');
//       } else {
//         setError('Invalid username or password. Please try again.');
//       }

//       /*
//         Make sure invalid tokens are not left behind.
//       */
//       localStorage.removeItem('access_token');
//       localStorage.removeItem('refresh_token');

//       window.dispatchEvent(new Event('auth-change'));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-[#FAF8F5] min-h-[80vh] flex items-center justify-center px-4 py-12 sm:py-16">
//       <div className="w-full max-w-md">

//         {/* =====================================================
//             HEADER
//         ===================================================== */}
//         <div className="text-center mb-7">

//           <div className="w-14 h-14 bg-neutral-900 text-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
//             <LockKeyhole
//               size={22}
//               strokeWidth={1.5}
//             />
//           </div>

//           <span className="block text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold mb-2">
//             Client Access
//           </span>

//           <h1 className="text-3xl sm:text-4xl font-serif tracking-tight text-neutral-900">
//             Welcome Back
//           </h1>

//           <p className="text-xs text-neutral-500 mt-3">
//             Sign in to access your account and orders.
//           </p>
//         </div>

//         {/* =====================================================
//             LOGIN FORM
//         ===================================================== */}
//         <form
//           onSubmit={handleLogin}
//           className="bg-white border border-neutral-200 p-5 sm:p-8 shadow-sm"
//         >

//           {/* Error Message */}
//           {error && (
//             <div
//               role="alert"
//               className="mb-5 border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-xs leading-relaxed"
//             >
//               {error}
//             </div>
//           )}

//           {/* =================================================
//               USERNAME
//           ================================================= */}
//           <div className="mb-5">

//             <label
//               htmlFor="username"
//               className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-semibold"
//             >
//               Username
//             </label>

//             <input
//               id="username"
//               type="text"
//               value={username}
//               onChange={(e) => {
//                 setUsername(e.target.value);

//                 if (error) {
//                   setError('');
//                 }
//               }}
//               autoComplete="username"
//               placeholder="Enter your username"
//               disabled={loading}
//               className="w-full bg-neutral-50 border border-neutral-200 px-3.5 py-3.5 text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
//               required
//             />
//           </div>

//           {/* =================================================
//               PASSWORD
//           ================================================= */}
//           <div className="mb-6">

//             <label
//               htmlFor="password"
//               className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-semibold"
//             >
//               Password
//             </label>

//             <div className="relative">

//               <input
//                 id="password"
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);

//                   if (error) {
//                     setError('');
//                   }
//                 }}
//                 autoComplete="current-password"
//                 placeholder="Enter your password"
//                 disabled={loading}
//                 className="w-full bg-neutral-50 border border-neutral-200 px-3.5 py-3.5 pr-12 text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
//                 required
//               />

//               {/* Show / Hide Password */}
//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowPassword((prev) => !prev)
//                 }
//                 disabled={loading}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-900 disabled:opacity-50"
//                 aria-label={
//                   showPassword
//                     ? 'Hide password'
//                     : 'Show password'
//                 }
//               >
//                 {showPassword ? (
//                   <EyeOff size={18} />
//                 ) : (
//                   <Eye size={18} />
//                 )}
//               </button>

//             </div>
//           </div>

//           {/* =================================================
//               LOGIN BUTTON
//           ================================================= */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-neutral-900 text-white py-3.5 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-black transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <>
//                 <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
//                 Signing In...
//               </>
//             ) : (
//               <>
//                 <LogIn size={15} />
//                 Sign In
//                 <ArrowRight size={14} />
//               </>
//             )}
//           </button>

//           {/* =================================================
//               REGISTER
//           ================================================= */}
//           <div className="mt-6 pt-5 border-t border-neutral-100 text-center">

//             <p className="text-xs text-neutral-500">
//               Don't have an account?{' '}

//               <Link
//                 to="/register"
//                 className="text-neutral-900 font-bold underline underline-offset-4 hover:text-neutral-500 transition"
//               >
//                 Create Account
//               </Link>
//             </p>

//           </div>
//         </form>

//         {/* =====================================================
//             SECURITY MESSAGE
//         ===================================================== */}
//         <p className="text-center text-[10px] uppercase tracking-widest text-neutral-400 mt-5">
//           Secure Client Access
//         </p>

//       </div>
//     </div>
//   );
// }








import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  LockKeyhole,
  LogIn,
  ArrowRight,
} from 'lucide-react';
import API from '../services/api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || '/';

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;
    setError('');

    const cleanUsername = username.trim();

    if (!cleanUsername || !password) {
      setError('Please enter your username and password.');
      return;
    }

    setLoading(true);

    try {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      const response = await API.post('token/', {
        username: cleanUsername,
        password,
      });

      const accessToken = response?.data?.access;
      const refreshToken = response?.data?.refresh;

      if (!accessToken) {
        throw new Error('Authentication token was not received.');
      }

      localStorage.setItem('access_token', accessToken);

      if (refreshToken) {
        localStorage.setItem('refresh_token', refreshToken);
      }

      window.dispatchEvent(new Event('auth-change'));

      navigate(redirectTo, {
        replace: true,
      });
    } catch (err) {
      console.error('Login error:', err);

      const apiError =
        err?.response?.data?.detail ||
        err?.response?.data?.non_field_errors?.[0];

      if (apiError) {
        setError(apiError);
      } else if (err?.message === 'Authentication token was not received.') {
        setError('Login failed. Authentication token was not received.');
      } else {
        setError('Invalid username or password. Please try again.');
      }

      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      window.dispatchEvent(new Event('auth-change'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-[85vh] flex items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-md">

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-neutral-900 text-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
            <LockKeyhole size={22} strokeWidth={1.5} />
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif tracking-tight text-neutral-900 mb-2">
            Welcome Back
          </h1>

          <p className="text-xs text-neutral-500 font-light">
            Sign in to access your account and orders.
          </p>
        </div>

        {/* LOGIN FORM */}
        <form
          onSubmit={handleLogin}
          className="bg-white border border-neutral-200/80 p-6 sm:p-10 rounded-2xl shadow-sm"
        >
          {error && (
            <div
              role="alert"
              className="mb-6 border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-xs leading-relaxed rounded-xl"
            >
              {error}
            </div>
          )}

          {/* USERNAME */}
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block text-xs uppercase tracking-wider text-neutral-700 mb-2 font-bold"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError('');
              }}
              autoComplete="username"
              placeholder="Enter your username"
              disabled={loading}
              className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition disabled:opacity-60 rounded-xl"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-xs uppercase tracking-wider text-neutral-700 mb-2 font-bold"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                autoComplete="current-password"
                placeholder="Enter your password"
                disabled={loading}
                className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3.5 pr-12 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition disabled:opacity-60 rounded-xl"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={loading}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 disabled:opacity-50"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neutral-900 text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                <LogIn size={15} />
                Sign In
                <ArrowRight size={14} />
              </>
            )}
          </button>

          {/* REGISTER LINK */}
          <div className="mt-6 pt-5 border-t border-neutral-100 text-center">
            <p className="text-xs text-neutral-500 font-light">
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