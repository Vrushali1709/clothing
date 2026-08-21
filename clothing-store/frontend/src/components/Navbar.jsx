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
//           CLOTHING WEB
//         </Link>
        
//         {/* Center Categories (Desktop) */}
//         <div className="hidden md:flex space-x-8">
//           <Link to="/" className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 hover:text-black py-2">
//             Home
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

//           <div className="pt-2">
//             {token ? (
//               <div className="flex items-center space-x-6">
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
//               </div>
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











import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Package, ChevronDown, Search, Heart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const token = localStorage.getItem('access_token');

  // Mobile Menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  const menuCategories = [
    {
      name: 'WOMEN',
      gender: 'women',
      subcategories: ['Dresses', 'Tops & Shirts', 'Sarees', 'Ethnic Wear', 'Jeans & Trousers']
    },
    {
      name: 'MEN',
      gender: 'men',
      subcategories: ['Casual Shirts', 'Formal Shirts', 'T-Shirts', 'Kurta Sets', 'Suits & Blazers']
    },
    {
      name: 'KIDS',
      gender: 'kids',
      subcategories: ['Boys Clothing', 'Girls Clothing', 'Festive Wear', 'Nightwear']
    },
    {
      name: 'ETHNIC',
      gender: 'ethnic',
      subcategories: ['Lehengas', 'Designer Sarees', 'Anarkali Suits', 'Indo-Western']
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const toggleCategory = (name) => {
    setOpenCategory(openCategory === name ? null : name);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7] border-b border-neutral-200">
      {/* Main Navigation */}
      <nav className="container mx-auto px-4 sm:px-8 py-4 flex justify-between items-center relative">
        
        {/* Left: Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-neutral-800 hover:text-black focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-serif tracking-[0.25em] text-neutral-900 font-bold uppercase">
          CLOTHING WEB
        </Link>
        
        {/* Center Categories (Desktop) */}
        <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
          <Link to="/" className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 hover:text-black py-2">
            Home
          </Link>

          {/* New Arrivals Link added */}
          <Link to="/new-arrivals" className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 hover:text-black py-2">
            New Arrivals
          </Link>

          {menuCategories.map((item) => (
            <div key={item.name} className="relative group py-2">
              
              {/* Category Link & Chevron */}
              <button 
                onClick={() => navigate(`/shop?gender=${item.gender}`)}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 hover:text-black flex items-center gap-1.5 focus:outline-none"
              >
                {item.name}
                <ChevronDown size={12} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>

              {/* Dropdown Container */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                
                {/* Dropdown Box */}
                <div className="w-56 bg-white border border-neutral-200 shadow-xl p-5">
                  <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400 mb-3 border-b pb-2">
                    Explore {item.name}
                  </div>
                  <ul className="space-y-2.5">
                    {item.subcategories.map((sub, idx) => (
                      <li key={idx}>
                        <Link 
                          to={`/shop?gender=${item.gender}&category=${encodeURIComponent(sub)}`} 
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

          <Link to="/shop" className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 hover:text-black py-2">
            All Shop
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3 sm:space-x-6 text-neutral-800">
          <Link to="/shop" className="hover:text-black transition" title="Search">
            <Search size={20} />
          </Link>

          <Link to="/wishlist" className="hover:text-black transition hover:scale-110" title="Wishlist">
            <Heart size={20} />
          </Link>

          <Link to="/cart" className="hover:text-black transition relative" title="Shopping Bag">
            <ShoppingBag size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>

          {token ? (
            <div className="hidden sm:flex items-center space-x-4 border-l pl-4 border-neutral-300">
              <Link to="/my-orders" className="text-neutral-700 hover:text-black transition" title="My Orders">
                <Package size={20} />
              </Link>
              <button onClick={handleLogout} title="Logout" className="text-neutral-700 hover:text-red-600 transition">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden sm:block hover:text-black transition" title="Login">
              <User size={20} />
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-b border-neutral-200 px-6 pt-2 pb-6 space-y-4">
          <Link 
            to="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 py-2 border-b border-neutral-100"
          >
            Home
          </Link>

          {/* New Arrivals Mobile Link */}
          <Link 
            to="/new-arrivals" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 py-2 border-b border-neutral-100"
          >
            New Arrivals
          </Link>

          {menuCategories.map((item) => (
            <div key={item.name} className="border-b border-neutral-100 pb-2">
              <div className="flex justify-between items-center py-2">
                <button
                  onClick={() => {
                    navigate(`/shop?gender=${item.gender}`);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 text-left"
                >
                  {item.name}
                </button>
                <button 
                  onClick={() => toggleCategory(item.name)}
                  className="p-1 text-neutral-600 focus:outline-none"
                >
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-300 ${openCategory === item.name ? 'rotate-180' : ''}`} 
                  />
                </button>
              </div>

              {/* Mobile Subcategories Accordion */}
              {openCategory === item.name && (
                <div className="pl-4 py-2 space-y-2 bg-neutral-50/50 rounded-sm mt-1">
                  {item.subcategories.map((sub, idx) => (
                    <Link
                      key={idx}
                      to={`/shop?gender=${item.gender}&category=${encodeURIComponent(sub)}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-xs text-neutral-600 py-1"
                    >
                      {sub}
                    </Link>
                  ))}
                  <Link
                    to={`/shop?gender=${item.gender}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-[10px] font-bold uppercase tracking-widest text-neutral-900 underline pt-2"
                  >
                    View All Collection →
                  </Link>
                </div>
              )}
            </div>
          ))}

          <Link 
            to="/shop" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 py-2 border-b border-neutral-100"
          >
            All Shop
          </Link>

          <div className="pt-2">
            {token ? (
              <div className="flex items-center space-x-6">
                <Link 
                  to="/my-orders" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-800"
                >
                  <Package size={18} /> My Orders
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-600"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-800"
              >
                <User size={18} /> Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}