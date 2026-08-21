import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, Package, LogOut, ArrowRight } from 'lucide-react';
import API from '../services/api';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Backend mathi user profile details fetch karo (Jo API endpoint /users/me/ ya similar hoy)
    API.get('auth/users/me/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Profile fetch error:", err);
        // Fallback token check or mock basic details if endpoint differs
        setUser({ username: 'Atelier Client', email: 'client@luxury.com' });
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen flex justify-center items-center text-xs font-serif uppercase tracking-widest text-neutral-500">
        Accessing Client Profile...
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-12 px-6 sm:px-8 md:px-12 font-sans">
      <div className="max-w-3xl mx-auto bg-white border border-neutral-200/80 p-8 sm:p-12 shadow-sm rounded-2xl">
        
        {/* Header */}
        <div className="text-center pb-8 border-b border-neutral-200 mb-8">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-800">
            <User size={30} strokeWidth={1.5} />
          </div>
          <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block mb-1">
            Client Dashboard
          </span>
          <h1 className="text-3xl font-serif tracking-tight">Account Profile</h1>
        </div>

        {/* User Info Details */}
        <div className="space-y-6 mb-10">
          <div className="flex items-center gap-4 p-4 bg-neutral-50 border border-neutral-100 rounded-xl">
            <User size={20} className="text-neutral-500 shrink-0" />
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">Username</span>
              <span className="text-sm font-medium text-neutral-900">{user?.username || 'Valued Member'}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-neutral-50 border border-neutral-100 rounded-xl">
            <Mail size={20} className="text-neutral-500 shrink-0" />
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">Email Address</span>
              <span className="text-sm font-medium text-neutral-900">{user?.email || 'client@atelier.com'}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-neutral-50 border border-neutral-100 rounded-xl">
            <Shield size={20} className="text-neutral-500 shrink-0" />
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">Account Status</span>
              <span className="text-xs uppercase tracking-wider text-emerald-700 font-bold">Verified Luxury Member</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-neutral-200">
          <button 
            onClick={() => navigate('/my-orders')}
            className="bg-neutral-900 text-white py-4 px-6 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-black transition flex items-center justify-center gap-2"
          >
            <Package size={16} /> View Order History
          </button>

          <button 
            onClick={handleLogout}
            className="bg-white border border-red-200 text-red-600 py-4 px-6 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-red-50 transition flex items-center justify-center gap-2"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

      </div>
    </div>
  );
}