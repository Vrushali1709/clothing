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










import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  ShieldCheck,
  Package,
  LogOut,
  Heart,
  ShoppingBag,
  ArrowRight,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import API from '../services/api';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const token = localStorage.getItem('access_token');

    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await API.get('auth/users/me/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (mounted) {
          setUser(response.data);
        }
      } catch (err) {
        console.error('Profile fetch error:', err);

        /*
         * Some Django/JWT setups may not have this exact endpoint.
         * We do not create fake profile data here.
         */
        if (err?.response?.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');

          if (mounted) {
            navigate('/login', { replace: true });
          }

          return;
        }

        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  const handleLogout = () => {
    if (loggingOut) return;

    setLoggingOut(true);

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Small delay gives button feedback
    setTimeout(() => {
      navigate('/login', { replace: true });
    }, 300);
  };

  if (loading) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen flex flex-col justify-center items-center text-neutral-500">
        <Loader2
          size={25}
          className="animate-spin mb-4 text-neutral-700"
        />

        <span className="text-[10px] font-serif uppercase tracking-[0.25em]">
          Accessing Client Profile...
        </span>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-8 sm:py-12 md:py-16 px-4 sm:px-6">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-7 sm:mb-10 pb-5 sm:pb-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-end justify-between gap-3">

          <div>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block mb-1">
              Private Client Area
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight">
              Account Profile
            </h1>
          </div>

          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-emerald-700 font-semibold flex items-center gap-1.5">
            <CheckCircle2 size={13} />
            Active Account
          </span>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white border border-neutral-200/80 shadow-sm">

          {/* Profile Hero */}
          <div className="p-6 sm:p-8 md:p-10 border-b border-neutral-200">

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">

              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-700 shrink-0">
                <User
                  size={38}
                  strokeWidth={1.2}
                />
              </div>

              <div className="text-center sm:text-left">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold">
                  Welcome
                </span>

                <h2 className="text-2xl sm:text-3xl font-serif mt-1">
                  {user?.username || 'Private Client'}
                </h2>

                <p className="text-xs text-neutral-500 mt-2">
                  {user?.email || 'Email address unavailable'}
                </p>
              </div>

            </div>

          </div>

          {/* User Details */}
          <div className="p-5 sm:p-8 md:p-10">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

              {/* Username */}
              <div className="p-4 sm:p-5 bg-neutral-50 border border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white border border-neutral-200 flex items-center justify-center">
                    <User
                      size={17}
                      strokeWidth={1.5}
                      className="text-neutral-600"
                    />
                  </div>

                  <div className="min-w-0">
                    <span className="block text-[9px] uppercase tracking-widest text-neutral-400 font-semibold">
                      Username
                    </span>

                    <span className="block text-sm font-medium text-neutral-900 truncate mt-0.5">
                      {user?.username || 'Not available'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="p-4 sm:p-5 bg-neutral-50 border border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white border border-neutral-200 flex items-center justify-center">
                    <Mail
                      size={17}
                      strokeWidth={1.5}
                      className="text-neutral-600"
                    />
                  </div>

                  <div className="min-w-0">
                    <span className="block text-[9px] uppercase tracking-widest text-neutral-400 font-semibold">
                      Email Address
                    </span>

                    <span className="block text-sm font-medium text-neutral-900 truncate mt-0.5">
                      {user?.email || 'Not available'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Account Status */}
              <div className="p-4 sm:p-5 bg-neutral-50 border border-neutral-100 md:col-span-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white border border-neutral-200 flex items-center justify-center">
                    <ShieldCheck
                      size={17}
                      strokeWidth={1.5}
                      className="text-emerald-700"
                    />
                  </div>

                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-neutral-400 font-semibold">
                      Account Status
                    </span>

                    <span className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-emerald-700 font-bold mt-0.5">
                      Verified Client Account
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Actions */}
            <div className="mt-8 sm:mt-10">

              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-bold">
                  Account Services
                </span>

                <div className="h-px bg-neutral-200 flex-1" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                {/* Orders */}
                <button
                  onClick={() => navigate('/my-orders')}
                  className="group border border-neutral-200 bg-white p-4 text-left hover:border-neutral-900 transition"
                >
                  <Package
                    size={19}
                    strokeWidth={1.5}
                    className="text-neutral-700 mb-5"
                  />

                  <span className="block text-[10px] uppercase tracking-widest font-bold">
                    My Orders
                  </span>

                  <span className="text-[10px] text-neutral-400 mt-1 block">
                    View purchase history
                  </span>

                  <ArrowRight
                    size={14}
                    className="mt-4 group-hover:translate-x-1 transition-transform"
                  />
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => navigate('/wishlist')}
                  className="group border border-neutral-200 bg-white p-4 text-left hover:border-neutral-900 transition"
                >
                  <Heart
                    size={19}
                    strokeWidth={1.5}
                    className="text-neutral-700 mb-5"
                  />

                  <span className="block text-[10px] uppercase tracking-widest font-bold">
                    Wishlist
                  </span>

                  <span className="text-[10px] text-neutral-400 mt-1 block">
                    View saved garments
                  </span>

                  <ArrowRight
                    size={14}
                    className="mt-4 group-hover:translate-x-1 transition-transform"
                  />
                </button>

                {/* Shop */}
                <button
                  onClick={() => navigate('/shop')}
                  className="group border border-neutral-200 bg-white p-4 text-left hover:border-neutral-900 transition"
                >
                  <ShoppingBag
                    size={19}
                    strokeWidth={1.5}
                    className="text-neutral-700 mb-5"
                  />

                  <span className="block text-[10px] uppercase tracking-widest font-bold">
                    Collection
                  </span>

                  <span className="text-[10px] text-neutral-400 mt-1 block">
                    Explore latest pieces
                  </span>

                  <ArrowRight
                    size={14}
                    className="mt-4 group-hover:translate-x-1 transition-transform"
                  />
                </button>

              </div>
            </div>

            {/* Logout */}
            <div className="mt-8 pt-6 border-t border-neutral-200">

              {!showLogoutConfirm ? (
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full sm:w-auto border border-red-200 text-red-600 px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-red-50 transition flex items-center justify-center gap-2"
                >
                  <LogOut size={15} />
                  Sign Out
                </button>
              ) : (
                <div className="bg-red-50 border border-red-200 p-4 sm:p-5">

                  <p className="text-xs text-red-800 mb-4">
                    Are you sure you want to sign out of your account?
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2">

                    <button
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="bg-red-600 text-white px-5 py-3 text-[10px] font-semibold uppercase tracking-widest hover:bg-red-700 transition flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {loggingOut ? (
                        <>
                          <Loader2
                            size={14}
                            className="animate-spin"
                          />
                          Signing Out...
                        </>
                      ) : (
                        <>
                          <LogOut size={14} />
                          Yes, Sign Out
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setShowLogoutConfirm(false)}
                      disabled={loggingOut}
                      className="bg-white border border-neutral-200 text-neutral-700 px-5 py-3 text-[10px] font-semibold uppercase tracking-widest hover:border-neutral-900 transition"
                    >
                      Cancel
                    </button>

                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Bottom Security */}
        <div className="flex items-center justify-center gap-2 mt-5 text-[10px] text-neutral-400">
          <ShieldCheck
            size={14}
            strokeWidth={1.5}
          />
          Your account is protected by secure authentication
        </div>

      </div>
    </div>
  );
}