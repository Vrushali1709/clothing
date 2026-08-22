// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { User, Mail, Shield, Package, LogOut, ArrowRight } from 'lucide-react';
// import API from '../services/api';

// export default function UserProfile() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('access_token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     // Backend mathi user profile details fetch karo (Jo API endpoint /users/me/ ya similar hoy)
//     API.get('auth/users/me/', {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(res => {
//         setUser(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Profile fetch error:", err);
//         // Fallback token check or mock basic details if endpoint differs
//         setUser({ username: 'Atelier Client', email: 'client@luxury.com' });
//         setLoading(false);
//       });
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('refresh_token');
//     navigate('/login');
//   };

//   if (loading) {
//     return (
//       <div className="bg-[#FAF8F5] min-h-screen flex justify-center items-center text-xs font-serif uppercase tracking-widest text-neutral-500">
//         Accessing Client Profile...
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-12 px-6 sm:px-8 md:px-12 font-sans">
//       <div className="max-w-3xl mx-auto bg-white border border-neutral-200/80 p-8 sm:p-12 shadow-sm rounded-2xl">
        
//         {/* Header */}
//         <div className="text-center pb-8 border-b border-neutral-200 mb-8">
//           <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-800">
//             <User size={30} strokeWidth={1.5} />
//           </div>
//           <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block mb-1">
//             Client Dashboard
//           </span>
//           <h1 className="text-3xl font-serif tracking-tight">Account Profile</h1>
//         </div>

//         {/* User Info Details */}
//         <div className="space-y-6 mb-10">
//           <div className="flex items-center gap-4 p-4 bg-neutral-50 border border-neutral-100 rounded-xl">
//             <User size={20} className="text-neutral-500 shrink-0" />
//             <div>
//               <span className="block text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">Username</span>
//               <span className="text-sm font-medium text-neutral-900">{user?.username || 'Valued Member'}</span>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 p-4 bg-neutral-50 border border-neutral-100 rounded-xl">
//             <Mail size={20} className="text-neutral-500 shrink-0" />
//             <div>
//               <span className="block text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">Email Address</span>
//               <span className="text-sm font-medium text-neutral-900">{user?.email || 'client@atelier.com'}</span>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 p-4 bg-neutral-50 border border-neutral-100 rounded-xl">
//             <Shield size={20} className="text-neutral-500 shrink-0" />
//             <div>
//               <span className="block text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">Account Status</span>
//               <span className="text-xs uppercase tracking-wider text-emerald-700 font-bold">Verified Luxury Member</span>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-neutral-200">
//           <button 
//             onClick={() => navigate('/my-orders')}
//             className="bg-neutral-900 text-white py-4 px-6 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-black transition flex items-center justify-center gap-2"
//           >
//             <Package size={16} /> View Order History
//           </button>

//           <button 
//             onClick={handleLogout}
//             className="bg-white border border-red-200 text-red-600 py-4 px-6 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-red-50 transition flex items-center justify-center gap-2"
//           >
//             <LogOut size={16} /> Sign Out
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }









// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   User,
//   Mail,
//   ShieldCheck,
//   Package,
//   LogOut,
//   Heart,
//   ArrowRight,
//   RefreshCw,
// } from 'lucide-react';
// import API from '../services/api';

// export default function UserProfile() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const navigate = useNavigate();

//   const fetchProfile = async () => {
//     const token = localStorage.getItem('access_token');

//     if (!token) {
//       navigate('/login', {
//         replace: true,
//         state: { from: '/profile' },
//       });
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const response = await API.get('profile/');

//       setUser(response.data);
//     } catch (err) {
//       console.error('Profile fetch error:', err);

//       if (err?.response?.status === 401) {
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('refresh_token');

//         window.dispatchEvent(new Event('auth-change'));

//         navigate('/login', {
//           replace: true,
//           state: { from: '/profile' },
//         });

//         return;
//       }

//       setError(
//         err?.response?.data?.detail ||
//         'Unable to load your profile.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('refresh_token');

//     window.dispatchEvent(new Event('auth-change'));

//     navigate('/login', { replace: true });
//   };

//   if (loading) {
//     return (
//       <div className="bg-[#FAF8F5] min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-10 h-10 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin mx-auto mb-4" />

//           <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">
//             Accessing Client Profile...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-[#FAF8F5] min-h-screen flex items-center justify-center px-4">
//         <div className="bg-white border border-neutral-200 p-8 max-w-md w-full text-center shadow-sm">
//           <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-5">
//             <User size={24} />
//           </div>

//           <h2 className="font-serif text-2xl mb-3">
//             Unable to Load Profile
//           </h2>

//           <p className="text-xs text-neutral-500 mb-6">
//             {error}
//           </p>

//           <button
//             onClick={fetchProfile}
//             className="bg-neutral-900 text-white px-6 py-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 mx-auto"
//           >
//             <RefreshCw size={14} />
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-10 sm:py-14 px-4">
//       <div className="max-w-3xl mx-auto">

//         {/* Profile Card */}
//         <div className="bg-white border border-neutral-200 shadow-sm">

//           {/* Header */}
//           <div className="text-center p-6 sm:p-10 border-b border-neutral-200">
//             <div className="w-16 h-16 bg-neutral-900 text-white rounded-full flex items-center justify-center mx-auto mb-5">
//               <User size={28} strokeWidth={1.5} />
//             </div>

//             <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block mb-2">
//               Client Dashboard
//             </span>

//             <h1 className="text-3xl sm:text-4xl font-serif tracking-tight">
//               Account Profile
//             </h1>

//             <p className="text-xs text-neutral-500 mt-3">
//               Manage your account and purchase history.
//             </p>
//           </div>

//           {/* Information */}
//           <div className="p-5 sm:p-8 space-y-4">

//             <div className="flex items-center gap-4 p-4 bg-neutral-50 border border-neutral-100">
//               <User
//                 size={20}
//                 className="text-neutral-500 shrink-0"
//               />

//               <div className="min-w-0">
//                 <span className="block text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1">
//                   Username
//                 </span>

//                 <span className="text-sm font-medium break-all">
//                   {user?.username || 'Not available'}
//                 </span>
//               </div>
//             </div>

//             <div className="flex items-center gap-4 p-4 bg-neutral-50 border border-neutral-100">
//               <Mail
//                 size={20}
//                 className="text-neutral-500 shrink-0"
//               />

//               <div className="min-w-0">
//                 <span className="block text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1">
//                   Email Address
//                 </span>

//                 <span className="text-sm font-medium break-all">
//                   {user?.email || 'Not available'}
//                 </span>
//               </div>
//             </div>

//             <div className="flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-100">
//               <ShieldCheck
//                 size={20}
//                 className="text-emerald-600 shrink-0"
//               />

//               <div>
//                 <span className="block text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1">
//                   Account Status
//                 </span>

//                 <span className="text-xs uppercase tracking-wider text-emerald-700 font-bold">
//                   Active Member
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="p-5 sm:p-8 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-3">

//             <button
//               onClick={() => navigate('/my-orders')}
//               className="bg-neutral-900 text-white py-4 px-5 text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-black transition flex items-center justify-center gap-2"
//             >
//               <Package size={16} />
//               My Orders
//               <ArrowRight size={14} />
//             </button>

//             <button
//               onClick={() => navigate('/wishlist')}
//               className="bg-white border border-neutral-300 text-neutral-900 py-4 px-5 text-[10px] font-semibold uppercase tracking-[0.2em] hover:border-neutral-900 transition flex items-center justify-center gap-2"
//             >
//               <Heart size={16} />
//               Wishlist
//             </button>

//             <button
//               onClick={handleLogout}
//               className="sm:col-span-2 bg-white border border-red-200 text-red-600 py-4 px-5 text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-red-50 transition flex items-center justify-center gap-2"
//             >
//               <LogOut size={16} />
//               Sign Out
//             </button>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  ShieldCheck,
  Package,
  LogOut,
  Heart,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import API from '../services/api';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const fetchProfile = async () => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      navigate('/login', {
        replace: true,
        state: { from: '/profile' },
      });
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await API.get('profile/');
      setUser(response.data);
    } catch (err) {
      console.error('Profile fetch error:', err);

      if (err?.response?.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        window.dispatchEvent(new Event('auth-change'));

        navigate('/login', {
          replace: true,
          state: { from: '/profile' },
        });

        return;
      }

      setError(
        err?.response?.data?.detail ||
        'Unable to load your profile.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    window.dispatchEvent(new Event('auth-change'));

    navigate('/login', { replace: true });
  };

  if (loading) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs uppercase tracking-wider text-neutral-500 font-serif">
            Loading Profile...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen flex items-center justify-center px-4">
        <div className="bg-white border border-neutral-200/80 p-8 max-w-md w-full text-center shadow-sm rounded-2xl">
          <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-5">
            <User size={24} />
          </div>

          <h2 className="font-serif text-2xl mb-3 text-neutral-900">
            Unable to Load Profile
          </h2>

          <p className="text-xs text-neutral-500 mb-6 font-light">
            {error}
          </p>

          <button
            onClick={fetchProfile}
            className="bg-neutral-900 text-white px-6 py-3.5 text-xs uppercase tracking-wider font-semibold flex items-center gap-2 mx-auto rounded-xl hover:bg-black transition"
          >
            <RefreshCw size={14} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-10 sm:py-14 px-4">
      <div className="max-w-2xl mx-auto">

        {/* PROFILE CARD */}
        <div className="bg-white border border-neutral-200/80 shadow-sm rounded-2xl overflow-hidden">

          {/* HEADER */}
          <div className="text-center p-6 sm:p-10 border-b border-neutral-100">
            <div className="w-16 h-16 bg-neutral-900 text-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
              <User size={26} strokeWidth={1.5} />
            </div>

            <h1 className="text-3xl font-serif tracking-tight text-neutral-900 mb-2">
              Account Profile
            </h1>

            <p className="text-xs text-neutral-500 font-light">
              Manage your account details and purchase history.
            </p>
          </div>

          {/* INFORMATION */}
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-4 p-4 bg-neutral-50 border border-neutral-200/60 rounded-xl">
              <User size={20} className="text-neutral-500 shrink-0" />
              <div className="min-w-0">
                <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-0.5">
                  Username
                </span>
                <span className="text-xs sm:text-sm font-medium break-all text-neutral-900">
                  {user?.username || 'Not available'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-neutral-50 border border-neutral-200/60 rounded-xl">
              <Mail size={20} className="text-neutral-500 shrink-0" />
              <div className="min-w-0">
                <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-0.5">
                  Email Address
                </span>
                <span className="text-xs sm:text-sm font-medium break-all text-neutral-900">
                  {user?.email || 'Not available'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-emerald-50/60 border border-emerald-200/60 rounded-xl">
              <ShieldCheck size={20} className="text-emerald-600 shrink-0" />
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-0.5">
                  Account Status
                </span>
                <span className="text-xs uppercase tracking-wider text-emerald-700 font-bold">
                  Active Member
                </span>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="p-6 sm:p-8 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/my-orders')}
              className="bg-neutral-900 text-white py-3.5 px-5 text-xs font-bold uppercase tracking-wider hover:bg-black transition flex items-center justify-center gap-2 rounded-xl shadow-sm"
            >
              <Package size={15} />
              My Orders
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => navigate('/wishlist')}
              className="bg-white border border-neutral-300 text-neutral-900 py-3.5 px-5 text-xs font-bold uppercase tracking-wider hover:border-neutral-900 transition flex items-center justify-center gap-2 rounded-xl"
            >
              <Heart size={15} />
              Wishlist
            </button>

            <button
              onClick={handleLogout}
              className="sm:col-span-2 bg-white border border-red-200 text-red-600 py-3.5 px-5 text-xs font-bold uppercase tracking-wider hover:bg-red-50 transition flex items-center justify-center gap-2 rounded-xl"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}