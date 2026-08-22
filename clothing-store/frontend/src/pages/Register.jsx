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
import { useNavigate, Link } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  UserPlus,
  User,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Loader2,
  Check
} from 'lucide-react';
import API from '../services/api';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setError('');
  };

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
      return `Username: ${data.username[0]}`;
    }

    if (data.email?.length) {
      return `Email: ${data.email[0]}`;
    }

    if (data.password?.length) {
      return `Password: ${data.password[0]}`;
    }

    return 'Registration failed. Please check your details and try again.';
  };

  const validateForm = () => {
    const username = formData.username.trim();
    const email = formData.email.trim();

    if (!username) {
      return 'Please enter a username.';
    }

    if (username.length < 3) {
      return 'Username must be at least 3 characters.';
    }

    if (!email) {
      return 'Please enter your email address.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email address.';
    }

    if (!formData.password) {
      return 'Please enter a password.';
    }

    if (formData.password.length < 8) {
      return 'Password must be at least 8 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match.';
    }

    return '';
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError('');
    setSuccess('');

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await API.post('register/', {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password
      });

      setSuccess(
        'Account created successfully. Redirecting you to login...'
      );

      setTimeout(() => {
        navigate('/login', {
          replace: true,
          state: {
            registered: true
          }
        });
      }, 1200);

    } catch (err) {
      console.error('Registration error:', err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const passwordLengthValid = formData.password.length >= 8;
  const passwordsMatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-14">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-7 sm:mb-9">
          <div className="w-14 h-14 rounded-full bg-white border border-neutral-200 flex items-center justify-center mx-auto mb-5 shadow-sm">
            <UserPlus
              size={22}
              strokeWidth={1.5}
              className="text-neutral-700"
            />
          </div>

          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block mb-2">
            Private Client Registration
          </span>

          <h1 className="text-3xl sm:text-4xl font-serif tracking-tight">
            Create Account
          </h1>

          <p className="text-xs text-neutral-500 mt-2 font-light">
            Join our private client collection.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleRegister}
          className="bg-white border border-neutral-200/80 p-5 sm:p-8 shadow-sm"
        >

          {/* Error */}
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs leading-relaxed">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs leading-relaxed flex items-start gap-2">
              <Check size={15} className="shrink-0 mt-0.5" />
              <span>{success}</span>
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
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
                placeholder="Choose a username"
                disabled={loading}
                className="w-full bg-neutral-50 border border-neutral-200 pl-10 pr-3.5 py-3.5 text-xs focus:outline-none focus:border-neutral-900 transition disabled:opacity-60"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-semibold">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={16}
                strokeWidth={1.5}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="you@example.com"
                disabled={loading}
                className="w-full bg-neutral-50 border border-neutral-200 pl-10 pr-3.5 py-3.5 text-xs focus:outline-none focus:border-neutral-900 transition disabled:opacity-60"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-semibold">
              Password
            </label>

            <div className="relative">
              <Lock
                size={16}
                strokeWidth={1.5}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="Minimum 8 characters"
                disabled={loading}
                className="w-full bg-neutral-50 border border-neutral-200 pl-10 pr-11 py-3.5 text-xs focus:outline-none focus:border-neutral-900 transition disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={loading}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900"
              >
                {showPassword ? (
                  <EyeOff size={16} strokeWidth={1.5} />
                ) : (
                  <Eye size={16} strokeWidth={1.5} />
                )}
              </button>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1 bg-neutral-100 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    formData.password.length === 0
                      ? 'w-0'
                      : formData.password.length < 8
                      ? 'w-1/3 bg-red-400'
                      : formData.password.length < 12
                      ? 'w-2/3 bg-amber-400'
                      : 'w-full bg-emerald-500'
                  }`}
                />
              </div>

              <span className="text-[9px] text-neutral-400 whitespace-nowrap">
                {formData.password.length === 0
                  ? 'Password'
                  : passwordLengthValid
                  ? 'Strong enough'
                  : '8+ characters'}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mt-5 mb-6">
            <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-semibold">
              Confirm Password
            </label>

            <div className="relative">
              <Lock
                size={16}
                strokeWidth={1.5}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="Repeat your password"
                disabled={loading}
                className={`w-full bg-neutral-50 border pl-10 pr-11 py-3.5 text-xs focus:outline-none focus:border-neutral-900 transition disabled:opacity-60 ${
                  formData.confirmPassword &&
                  !passwordsMatch
                    ? 'border-red-300'
                    : formData.confirmPassword &&
                      passwordsMatch
                    ? 'border-emerald-300'
                    : 'border-neutral-200'
                }`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
                disabled={loading}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900"
              >
                {showConfirmPassword ? (
                  <EyeOff size={16} strokeWidth={1.5} />
                ) : (
                  <Eye size={16} strokeWidth={1.5} />
                )}
              </button>
            </div>

            {passwordsMatch && (
              <p className="flex items-center gap-1 mt-1.5 text-[9px] text-emerald-600">
                <Check size={11} />
                Passwords match
              </p>
            )}
          </div>

          {/* Register */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neutral-900 text-white py-3.5 sm:py-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] hover:bg-black transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight size={14} />
              </>
            )}
          </button>

          {/* Security */}
          <div className="flex items-center justify-center gap-2 mt-5 text-[10px] text-neutral-400">
            <ShieldCheck size={14} strokeWidth={1.5} />
            Your account information is securely protected
          </div>

          {/* Login */}
          <div className="border-t border-neutral-100 mt-6 pt-6 text-center">
            <p className="text-xs text-neutral-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-neutral-900 font-semibold underline underline-offset-4 hover:text-neutral-600 transition"
              >
                Sign In
              </Link>
            </p>
          </div>

        </form>

      </div>
    </div>
  );
}