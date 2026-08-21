import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 mt-12 md:mt-20 font-sans">
      <div className="container mx-auto px-6 sm:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-wider mb-4">CLOTHING STORE</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Elevating your everyday style with premium quality fabrics and contemporary designs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-200">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-white transition block py-0.5">Home</Link></li>
            <li><Link to="/new-arrivals" className="hover:text-white transition block py-0.5">New Arrivals</Link></li>
            <li><Link to="/shop" className="hover:text-white transition block py-0.5">Shop Collection</Link></li>
            <li><Link to="/cart" className="hover:text-white transition block py-0.5">Shopping Cart</Link></li>
            <li><Link to="/my-orders" className="hover:text-white transition block py-0.5">My Orders</Link></li>
            <li><Link to="/about" className="hover:text-white transition tracking-wide block">About Us / Atelier</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        {/* Customer Care */}
<div>
  <h4 className="font-semibold mb-4 text-gray-200">Customer Care</h4>
  <ul className="space-y-2.5 text-sm text-gray-400">
    {/* <li><span className="hover:text-white transition cursor-pointer block py-0.5">Shipping Policy</span></li> */}
    <li><span className="hover:text-white transition cursor-pointer block py-0.5">Returns & Exchanges</span></li>
    <li><Link to="/faq" className="hover:text-white transition tracking-wide block py-0.5">FAQs & Support</Link></li>
    <li><Link to="/shipping-policy" className="hover:text-white transition tracking-wide block py-0.5">Shipping Policy</Link></li>
  </ul>
</div>

        {/* Newsletter Subscription */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-200">Stay Updated</h4>
          <p className="text-gray-400 text-sm mb-4">Subscribe to get special offers and new drops.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-3 py-2 bg-gray-800 text-white text-sm rounded-l focus:outline-none w-full min-w-0"
            />
            <button 
              type="submit" 
              className="bg-white text-black px-4 py-2 text-sm font-bold rounded-r hover:bg-gray-200 transition shrink-0"
            >
              Join
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Copyright */}
     {/* Bottom Copyright & Legal Links */}
      <div className="container mx-auto px-4 mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
        <p>&copy; 2026 CLOTHING STORE. All rights reserved.</p>
        <div className="flex space-x-6 text-[10px] uppercase tracking-widest">
          <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
          <span className="hover:text-white transition cursor-pointer">Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}