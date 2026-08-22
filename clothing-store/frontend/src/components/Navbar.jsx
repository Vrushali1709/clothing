// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ShoppingBag, User, LogOut, Package, ChevronDown, Search, Heart, Menu, X } from 'lucide-react';
// import { useCart } from '../context/CartContext';

// export default function Navbar() {
//   const navigate = useNavigate();
//   const { cart } = useCart();
//   const token = localStorage.getItem('access_token');

//   // Mobile Menu state
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [openCategory, setOpenCategory] = useState(null);

//   const menuCategories = [
//     {
//       name: 'WOMEN',
//       gender: 'women',
//       subcategories: ['Dresses', 'Tops & Shirts', 'Sarees', 'Ethnic Wear', 'Jeans & Trousers']
//     },
//     {
//       name: 'MEN',
//       gender: 'men',
//       subcategories: ['Casual Shirts', 'Formal Shirts', 'T-Shirts', 'Kurta Sets', 'Suits & Blazers']
//     },
//     {
//       name: 'KIDS',
//       gender: 'kids',
//       subcategories: ['Boys Clothing', 'Girls Clothing', 'Festive Wear', 'Nightwear']
//     },
//     {
//       name: 'ETHNIC',
//       gender: 'ethnic',
//       subcategories: ['Lehengas', 'Designer Sarees', 'Anarkali Suits', 'Indo-Western']
//     }
//   ];

//   const handleLogout = () => {
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('refresh_token');
//     navigate('/login');
//     setIsMobileMenuOpen(false);
//   };

//   const toggleCategory = (name) => {
//     setOpenCategory(openCategory === name ? null : name);
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-[#FDFBF7] border-b border-neutral-200">
//       {/* Main Navigation */}
//       <nav className="container mx-auto px-4 sm:px-8 py-4 flex justify-between items-center relative">
        
//         {/* Left: Mobile Menu Button */}
//         <div className="flex items-center md:hidden">
//           <button 
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="text-neutral-800 hover:text-black focus:outline-none"
//             aria-label="Toggle Menu"
//           >
//             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Logo */}
//         <Link to="/" className="text-xl md:text-2xl font-serif tracking-[0.25em] text-neutral-900 font-bold uppercase">
//           CLOTHING 
//         </Link>
        
//         {/* Center Categories (Desktop) */}
//         <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
//           <Link to="/" className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 hover:text-black py-2">
//             Home
//           </Link>

//           {/* New Arrivals Link */}
//           <Link to="/new-arrivals" className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 hover:text-black py-2">
//             New Arrivals
//           </Link>

//           {menuCategories.map((item) => (
//             <div key={item.name} className="relative group py-2">
              
//               {/* Category Link & Chevron */}
//               <button 
//                 onClick={() => navigate(`/shop?gender=${item.gender}`)}
//                 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 hover:text-black flex items-center gap-1.5 focus:outline-none"
//               >
//                 {item.name}
//                 <ChevronDown size={12} className="transition-transform duration-300 group-hover:rotate-180" />
//               </button>

//               {/* Dropdown Container */}
//               <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                
//                 {/* Dropdown Box */}
//                 <div className="w-56 bg-white border border-neutral-200 shadow-xl p-5">
//                   <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400 mb-3 border-b pb-2">
//                     Explore {item.name}
//                   </div>
//                   <ul className="space-y-2.5">
//                     {item.subcategories.map((sub, idx) => (
//                       <li key={idx}>
//                         <Link 
//                           to={`/shop?gender=${item.gender}&category=${encodeURIComponent(sub)}`} 
//                           className="text-xs text-neutral-600 hover:text-black transition tracking-wide block hover:translate-x-1 duration-200"
//                         >
//                           {sub}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                   <div className="mt-4 pt-3 border-t border-neutral-100">
//                     <Link 
//                       to={`/shop?gender=${item.gender}`} 
//                       className="text-[10px] font-bold uppercase tracking-widest text-neutral-900 underline underline-offset-4 hover:text-neutral-600"
//                     >
//                       View All Collection →
//                     </Link>
//                   </div>
//                 </div>

//               </div>

//             </div>
//           ))}

//           <Link to="/shop" className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 hover:text-black py-2">
//             All Shop
//           </Link>
//         </div>

//         {/* Right Actions */}
//         <div className="flex items-center space-x-3 sm:space-x-6 text-neutral-800">
//           <Link to="/shop" className="hover:text-black transition" title="Search">
//             <Search size={20} />
//           </Link>

//           <Link to="/wishlist" className="hover:text-black transition hover:scale-110" title="Wishlist">
//             <Heart size={20} />
//           </Link>

//           <Link to="/cart" className="hover:text-black transition relative" title="Shopping Bag">
//             <ShoppingBag size={20} />
//             {cart.length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
//                 {cart.reduce((total, item) => total + item.quantity, 0)}
//               </span>
//             )}
//           </Link>

//           {token ? (
//             <div className="hidden sm:flex items-center space-x-4 border-l pl-4 border-neutral-300">
//               {/* Profile Link */}
//               <Link to="/profile" className="text-neutral-700 hover:text-black transition" title="Client Profile">
//                 <User size={20} />
//               </Link>
//               <Link to="/my-orders" className="text-neutral-700 hover:text-black transition" title="My Orders">
//                 <Package size={20} />
//               </Link>
//               <button onClick={handleLogout} title="Logout" className="text-neutral-700 hover:text-red-600 transition">
//                 <LogOut size={20} />
//               </button>
//             </div>
//           ) : (
//             <Link to="/login" className="hidden sm:block hover:text-black transition" title="Login">
//               <User size={20} />
//             </Link>
//           )}
//         </div>
//       </nav>

//       {/* Mobile Drawer Navigation */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-[#FDFBF7] border-b border-neutral-200 px-6 pt-2 pb-6 space-y-4">
//           <Link 
//             to="/" 
//             onClick={() => setIsMobileMenuOpen(false)}
//             className="block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 py-2 border-b border-neutral-100"
//           >
//             Home
//           </Link>

//           <Link 
//             to="/new-arrivals" 
//             onClick={() => setIsMobileMenuOpen(false)}
//             className="block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 py-2 border-b border-neutral-100"
//           >
//             New Arrivals
//           </Link>

//           {menuCategories.map((item) => (
//             <div key={item.name} className="border-b border-neutral-100 pb-2">
//               <div className="flex justify-between items-center py-2">
//                 <button
//                   onClick={() => {
//                     navigate(`/shop?gender=${item.gender}`);
//                     setIsMobileMenuOpen(false);
//                   }}
//                   className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 text-left"
//                 >
//                   {item.name}
//                 </button>
//                 <button 
//                   onClick={() => toggleCategory(item.name)}
//                   className="p-1 text-neutral-600 focus:outline-none"
//                 >
//                   <ChevronDown 
//                     size={16} 
//                     className={`transition-transform duration-300 ${openCategory === item.name ? 'rotate-180' : ''}`} 
//                   />
//                 </button>
//               </div>

//               {/* Mobile Subcategories Accordion */}
//               {openCategory === item.name && (
//                 <div className="pl-4 py-2 space-y-2 bg-neutral-50/50 rounded-sm mt-1">
//                   {item.subcategories.map((sub, idx) => (
//                     <Link
//                       key={idx}
//                       to={`/shop?gender=${item.gender}&category=${encodeURIComponent(sub)}`}
//                       onClick={() => setIsMobileMenuOpen(false)}
//                       className="block text-xs text-neutral-600 py-1"
//                     >
//                       {sub}
//                     </Link>
//                   ))}
//                   <Link
//                     to={`/shop?gender=${item.gender}`}
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="block text-[10px] font-bold uppercase tracking-widest text-neutral-900 underline pt-2"
//                   >
//                     View All Collection →
//                   </Link>
//                 </div>
//               )}
//             </div>
//           ))}

//           <Link 
//             to="/shop" 
//             onClick={() => setIsMobileMenuOpen(false)}
//             className="block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 py-2 border-b border-neutral-100"
//           >
//             All Shop
//           </Link>

//           <div className="pt-2 space-y-3">
//             {token ? (
//               <>
//                 <Link 
//                   to="/profile" 
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-800"
//                 >
//                   <User size={18} /> My Profile
//                 </Link>
//                 <Link 
//                   to="/my-orders" 
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-800"
//                 >
//                   <Package size={18} /> My Orders
//                 </Link>
//                 <button 
//                   onClick={handleLogout}
//                   className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-600"
//                 >
//                   <LogOut size={18} /> Logout
//                 </button>
//               </>
//             ) : (
//               <Link 
//                 to="/login" 
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-800"
//               >
//                 <User size={18} /> Login / Register
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }











import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  User,
  LogOut,
  Package,
  ChevronDown,
  Search,
  Heart,
  Menu,
  X,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart = [] } = useCart();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem('access_token')
  );

  const menuCategories = [
    {
      name: 'WOMEN',
      gender: 'women',
      subcategories: [
        'Dresses',
        'Tops & Shirts',
        'Sarees',
        'Ethnic Wear',
        'Jeans & Trousers',
      ],
    },
    {
      name: 'MEN',
      gender: 'men',
      subcategories: [
        'Casual Shirts',
        'Formal Shirts',
        'T-Shirts',
        'Kurta Sets',
        'Suits & Blazers',
      ],
    },
    {
      name: 'KIDS',
      gender: 'kids',
      subcategories: [
        'Boys Clothing',
        'Girls Clothing',
        'Festive Wear',
        'Nightwear',
      ],
    },
    {
      name: 'ETHNIC',
      gender: 'ethnic',
      subcategories: [
        'Lehengas',
        'Designer Sarees',
        'Anarkali Suits',
        'Indo-Western',
      ],
    },
  ];

  /* -------------------------------------------------------
     SYNC AUTH STATE
  ------------------------------------------------------- */

  useEffect(() => {
    const syncAuth = () => {
      setToken(localStorage.getItem('access_token'));
    };

    window.addEventListener('storage', syncAuth);

    return () => {
      window.removeEventListener('storage', syncAuth);
    };
  }, []);

  /* -------------------------------------------------------
     CLOSE MOBILE MENU ON ROUTE CHANGE
  ------------------------------------------------------- */

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenCategory(null);
  }, [location.pathname, location.search]);

  /* -------------------------------------------------------
     BODY SCROLL LOCK ON MOBILE MENU
  ------------------------------------------------------- */

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  /* -------------------------------------------------------
     LOGOUT
  ------------------------------------------------------- */

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    setToken(null);
    setIsMobileMenuOpen(false);
    setOpenCategory(null);

    navigate('/login');
  };

  /* -------------------------------------------------------
     MOBILE CATEGORY
  ------------------------------------------------------- */

  const toggleCategory = (name) => {
    setOpenCategory((prev) => (prev === name ? null : name));
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenCategory(null);
  };

  /* -------------------------------------------------------
     CART COUNT
  ------------------------------------------------------- */

  const cartCount = cart.reduce(
    (total, item) => total + Number(item?.quantity || 0),
    0
  );

  /* -------------------------------------------------------
     CATEGORY NAVIGATION
  ------------------------------------------------------- */

  const goToGender = (gender) => {
    navigate(`/shop?gender=${gender}`);
    closeMobileMenu();
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7] border-b border-neutral-200 shadow-sm">
      {/* =====================================================
          MAIN NAVIGATION
      ===================================================== */}

      <nav className="container mx-auto px-4 sm:px-8 py-4 flex justify-between items-center relative">

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="text-neutral-800 hover:text-black focus:outline-none"
            aria-label={
              isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ===================================================
            LOGO
        =================================================== */}

        <Link
          to="/"
          onClick={closeMobileMenu}
          className="text-xl md:text-2xl font-serif tracking-[0.25em] text-neutral-900 font-bold uppercase"
        >
          CLOTHING
        </Link>

        {/* ===================================================
            DESKTOP NAVIGATION
        =================================================== */}

        <div className="hidden md:flex space-x-5 lg:space-x-7 items-center">

          {/* Home */}
          <Link
            to="/"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 hover:text-black py-2 transition-colors"
          >
            Home
          </Link>

          {/* New Arrivals */}
          <Link
            to="/new-arrivals"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 hover:text-black py-2 transition-colors"
          >
            New Arrivals
          </Link>

          {/* Categories */}
          {menuCategories.map((item) => (
            <div
              key={item.name}
              className="relative group py-2"
            >
              <button
                type="button"
                onClick={() => navigate(`/shop?gender=${item.gender}`)}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 hover:text-black flex items-center gap-1.5 focus:outline-none"
              >
                {item.name}

                <ChevronDown
                  size={12}
                  className="transition-transform duration-300 group-hover:rotate-180"
                />
              </button>

              {/* Dropdown */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">

                <div className="w-60 bg-white border border-neutral-200 shadow-xl p-5">

                  <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400 mb-3 border-b border-neutral-100 pb-2">
                    Explore {item.name}
                  </div>

                  <ul className="space-y-2.5">
                    {item.subcategories.map((sub) => (
                      <li key={sub}>
                        <Link
                          to={`/shop?gender=${item.gender}&category=${encodeURIComponent(
                            sub
                          )}`}
                          className="text-xs text-neutral-600 hover:text-black transition tracking-wide block hover:translate-x-1 duration-200"
                        >
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-3 border-t border-neutral-100">
                    <Link
                      to={`/shop?gender=${item.gender}`}
                      className="text-[10px] font-bold uppercase tracking-widest text-neutral-900 underline underline-offset-4 hover:text-neutral-600"
                    >
                      View All Collection →
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          ))}

          {/* All Shop */}
          <Link
            to="/shop"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 hover:text-black py-2 transition-colors"
          >
            All Shop
          </Link>
        </div>

        {/* ===================================================
            RIGHT ACTIONS
        =================================================== */}

        <div className="flex items-center space-x-3 sm:space-x-5 text-neutral-800">

          {/* Search */}
          <Link
            to="/shop"
            className="hover:text-black hover:scale-110 transition"
            title="Search"
            aria-label="Search products"
          >
            <Search size={20} />
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="hover:text-black hover:scale-110 transition"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart size={20} />
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="hover:text-black transition relative"
            title="Shopping Bag"
            aria-label="Shopping bag"
          >
            <ShoppingBag size={20} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          {/* Desktop Account */}
          {token ? (
            <div className="hidden sm:flex items-center space-x-4 border-l pl-4 border-neutral-300">

              <Link
                to="/profile"
                className="text-neutral-700 hover:text-black transition hover:scale-110"
                title="Client Profile"
                aria-label="Client Profile"
              >
                <User size={20} />
              </Link>

              <Link
                to="/my-orders"
                className="text-neutral-700 hover:text-black transition hover:scale-110"
                title="My Orders"
                aria-label="My Orders"
              >
                <Package size={20} />
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                title="Logout"
                aria-label="Logout"
                className="text-neutral-700 hover:text-red-600 transition hover:scale-110"
              >
                <LogOut size={20} />
              </button>

            </div>
          ) : (
            <Link
              to="/login"
              className="hidden sm:block hover:text-black transition hover:scale-110"
              title="Login"
              aria-label="Login"
            >
              <User size={20} />
            </Link>
          )}
        </div>
      </nav>

      {/* =====================================================
          MOBILE DRAWER
      ===================================================== */}

      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 top-[73px] bg-black/20 md:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div className="relative md:hidden bg-[#FDFBF7] border-b border-neutral-200 px-6 pt-3 pb-7 space-y-3 max-h-[calc(100vh-73px)] overflow-y-auto">

            {/* Home */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 py-3 border-b border-neutral-100"
            >
              Home
            </Link>

            {/* New Arrivals */}
            <Link
              to="/new-arrivals"
              onClick={closeMobileMenu}
              className="block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 py-3 border-b border-neutral-100"
            >
              New Arrivals
            </Link>

            {/* Mobile Categories */}
            {menuCategories.map((item) => (
              <div
                key={item.name}
                className="border-b border-neutral-100 pb-2"
              >
                <div className="flex justify-between items-center py-3">

                  <button
                    type="button"
                    onClick={() => goToGender(item.gender)}
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 text-left"
                  >
                    {item.name}
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleCategory(item.name)}
                    className="p-1 text-neutral-600 focus:outline-none"
                    aria-label={`Toggle ${item.name} categories`}
                    aria-expanded={openCategory === item.name}
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        openCategory === item.name
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </button>

                </div>

                {/* Accordion */}
                {openCategory === item.name && (
                  <div className="pl-4 pr-2 py-3 space-y-2 bg-neutral-50/60 rounded-sm mt-1">

                    {item.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        to={`/shop?gender=${item.gender}&category=${encodeURIComponent(
                          sub
                        )}`}
                        onClick={closeMobileMenu}
                        className="block text-xs text-neutral-600 hover:text-black py-1.5 transition-colors"
                      >
                        {sub}
                      </Link>
                    ))}

                    <Link
                      to={`/shop?gender=${item.gender}`}
                      onClick={closeMobileMenu}
                      className="block text-[10px] font-bold uppercase tracking-widest text-neutral-900 underline pt-2"
                    >
                      View All Collection →
                    </Link>

                  </div>
                )}
              </div>
            ))}

            {/* All Shop */}
            <Link
              to="/shop"
              onClick={closeMobileMenu}
              className="block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 py-3 border-b border-neutral-100"
            >
              All Shop
            </Link>

            {/* Account */}
            <div className="pt-4 space-y-4">

              {token ? (
                <>
                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-neutral-800"
                  >
                    <User size={18} />
                    My Profile
                  </Link>

                  <Link
                    to="/my-orders"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-neutral-800"
                  >
                    <Package size={18} />
                    My Orders
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-neutral-800"
                  >
                    <Heart size={18} />
                    Wishlist
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-red-600"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-neutral-800"
                >
                  <User size={18} />
                  Login / Register
                </Link>
              )}

            </div>
          </div>
        </>
      )}
    </header>
  );
}