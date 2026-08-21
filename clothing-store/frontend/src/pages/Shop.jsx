// import React, { useEffect, useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { Heart } from 'lucide-react';
// import API, { addToWishlist, removeFromWishlist, getWishlist } from '../services/api';

// export default function Shop() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [wishlistMap, setWishlistMap] = useState({});
//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const currentGender = searchParams.get('gender') || 'all';
//   const currentCategory = searchParams.get('category') || '';

//   // UPDATED: image object/array અને URL પાથ હેન્ડલ કરવા માટેનું ફંક્શન
//   const getImageUrl = (product) => {
//     let imagePath = product?.image;

//     // જો ડાયરેક્ટ image ન હોય અને images એરે (Array) માંથી આવતી હોય
//     if (!imagePath && product?.images && product.images.length > 0) {
//       imagePath = product.images[0]?.image || product.images[0];
//     }

//     if (!imagePath) return "https://placehold.co/600x800?text=Garment";

//     if (typeof imagePath === 'string' && (imagePath.startsWith('http://') || imagePath.startsWith('https://'))) {
//       return imagePath;
//     }

//     return `http://127.0.0.1:8000${imagePath}`;
//   };

//   useEffect(() => {
//     setLoading(true);
    
//     // Dynamic Query Parameters Construction
//     const params = new URLSearchParams();
//     if (currentGender !== 'all') {
//       params.append('gender', currentGender);
//     }
//     if (currentCategory) {
//       params.append('category', currentCategory);
//     }

//     const queryString = params.toString();
//     const url = queryString ? `products/?${queryString}` : 'products/';

//     // 1. Fetch Products based on Gender & Subcategory
//     API.get(url)
//       .then(res => {
//         const data = Array.isArray(res.data) ? res.data : res.data.results || [];
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setLoading(false);
//       });

//     // 2. Fetch Wishlist Items
//     const token = localStorage.getItem('access_token');
//     if (token) {
//       getWishlist()
//         .then(res => {
//           const list = Array.isArray(res.data) ? res.data : res.data.results || [];
//           const map = {};
//           list.forEach(item => {
//             map[item.product] = item.id;
//           });
//           setWishlistMap(map);
//         })
//         .catch(err => console.error(err));
//     }
//   }, [currentGender, currentCategory]);

//   const handleWishlistToggle = async (e, productId) => {
//     e.stopPropagation();
//     const token = localStorage.getItem('access_token');
//     if (!token) {
//       alert('Please login to add items to your wishlist.');
//       navigate('/login');
//       return;
//     }

//     try {
//       if (wishlistMap[productId]) {
//         const wishlistId = wishlistMap[productId];
//         await removeFromWishlist(wishlistId);
//         setWishlistMap(prev => {
//           const newMap = { ...prev };
//           delete newMap[productId];
//           return newMap;
//         });
//       } else {
//         const res = await addToWishlist(productId);
//         setWishlistMap(prev => ({ ...prev, [productId]: res.data.id }));
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Failed to update wishlist. Please try again.');
//     }
//   };

//   return (
//     <div className="bg-[#FDFBF7] min-h-screen py-6 sm:py-10 md:py-12">
//       <div className="container mx-auto px-4 sm:px-6 md:px-12">
        
//         {/* Page Header */}
//         <div className="text-center max-w-xl mx-auto mb-6 sm:mb-10">
//           <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-neutral-500 font-semibold mb-1.5 sm:mb-2 block">
//             Exclusive Collection
//           </span>
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 capitalize px-2">
//             {currentCategory 
//               ? `${currentCategory}`
//               : currentGender === 'all' 
//                 ? 'Entire Collection' 
//                 : `${currentGender} Wardrobe`}
//           </h1>
//           <div className="w-10 sm:w-12 h-[1px] bg-neutral-400 mx-auto mt-3 sm:mt-4"></div>
//         </div>

//         {/* Top Gender Filter Tabs */}
//         <div className="flex justify-start sm:justify-center items-center gap-4 sm:gap-8 mb-8 sm:mb-12 border-b border-neutral-200 pb-3 sm:pb-4 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
//           {['all', 'women', 'men', 'kids', 'ethnic'].map((g) => (
//             <button
//               key={g}
//               onClick={() => setSearchParams(g === 'all' ? {} : { gender: g })}
//               className={`text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-semibold transition-all pb-1 whitespace-nowrap shrink-0 ${
//                 currentGender === g && !currentCategory ? 'text-black border-b-2 border-black' : 'text-neutral-400 hover:text-black'
//               }`}   
//             >
//               {g}
//             </button>
//           ))}
//         </div>

//         {/* Grid Display */}
//         {loading ? (
//           <div className="text-center py-16 sm:py-20 font-serif text-neutral-500 uppercase tracking-widest text-xs">
//             Refining Garments...
//           </div>
//         ) : products.length === 0 ? (
//           <div className="text-center py-16 sm:py-20 font-serif text-neutral-500 text-sm sm:text-base">
//             No clothing pieces found in this section.
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
//             {products.map(product => (
//               <div 
//                 key={product.id} 
//                 onClick={() => navigate(`/product/${product.id}`)}
//                 className="group cursor-pointer flex flex-col relative"
//               >
//                 <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-2.5 sm:mb-4">
//                   {/* UPDATED: Passing full product object instead of product.image */}
//                   <img 
//                     src={getImageUrl(product)} 
//                     alt={product.name} 
//                     className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-700 ease-out" 
//                     onError={(e) => { e.target.src = "https://placehold.co/600x800?text=Image+Unavailable"; }}
//                   />

//                   <button 
//                     onClick={(e) => handleWishlistToggle(e, product.id)}
//                     className="absolute top-2 right-2 sm:top-3 sm:right-3 p-2 sm:p-2.5 bg-white/80 backdrop-blur rounded-full shadow-sm hover:scale-110 active:scale-95 transition duration-300 z-20 text-neutral-800"
//                     title={wishlistMap[product.id] ? "Remove from Wishlist" : "Add to Wishlist"}
//                   >
//                     <Heart 
//                       size={15} 
//                       className={wishlistMap[product.id] ? "fill-red-600 text-red-600" : "text-neutral-800"} 
//                     />
//                   </button>

//                   <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent hidden sm:block">
//                     <span className="block w-full py-2 sm:py-2.5 bg-white text-black text-center text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em]">
//                       View Piece
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex flex-col sm:flex-row justify-between items-start gap-1 sm:gap-2">
//                   <div className="min-w-0 flex-1">
//                     <h3 className="font-serif text-xs sm:text-sm text-neutral-900 truncate">{product.name}</h3>
//                     <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400 mt-0.5 sm:mt-1 truncate">
//                       {product.category_name || 'Haute Couture'}
//                     </p>
//                   </div>
//                   <span className="text-xs sm:text-sm font-serif text-neutral-900 font-medium shrink-0">
//                     ₹{Number(product.price).toLocaleString()}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Heart, Search } from 'lucide-react';
import API, { addToWishlist, removeFromWishlist, getWishlist } from '../services/api';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistMap, setWishlistMap] = useState({});
  const [searchQuery, setSearchQuery] = useState(''); 
  const [selectedSize, setSelectedSize] = useState(''); // 👈 Size filter state
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentGender = searchParams.get('gender') || 'all';
  const currentCategory = searchParams.get('category') || '';

  const getImageUrl = (product) => {
    let imagePath = product?.image;

    if (!imagePath && product?.images && product.images.length > 0) {
      imagePath = product.images[0]?.image || product.images[0];
    }

    if (!imagePath) return "https://placehold.co/600x800?text=Garment";

    if (typeof imagePath === 'string' && (imagePath.startsWith('http://') || imagePath.startsWith('https://'))) {
      return imagePath;
    }

    return `https://clothing-backend-gynt.onrender.com${imagePath}`;
  };

  useEffect(() => {
    setLoading(true);
    
    // Dynamic Query Parameters Construction
    const params = new URLSearchParams();
    if (currentGender !== 'all') {
      params.append('gender', currentGender);
    }
    if (currentCategory) {
      params.append('category', currentCategory);
    }
    if (searchQuery) {
      params.append('search', searchQuery);
    }
    if (selectedSize) {
      params.append('size', selectedSize); // 👈 Backend size filter query
    }

    const queryString = params.toString();
    const url = queryString ? `products/?${queryString}` : 'products/';

    // 1. Fetch Products based on Gender, Subcategory, Search & Size
    API.get(url)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    // 2. Fetch Wishlist Items
    const token = localStorage.getItem('access_token');
    if (token) {
      getWishlist()
        .then(res => {
          const list = Array.isArray(res.data) ? res.data : res.data.results || [];
          const map = {};
          list.forEach(item => {
            map[item.product] = item.id;
          });
          setWishlistMap(map);
        })
        .catch(err => console.error(err));
    }
  }, [currentGender, currentCategory, searchQuery, selectedSize]);

  const handleWishlistToggle = async (e, productId) => {
    e.stopPropagation();
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('Please login to add items to your wishlist.');
      navigate('/login');
      return;
    }

    try {
      if (wishlistMap[productId]) {
        const wishlistId = wishlistMap[productId];
        await removeFromWishlist(wishlistId);
        setWishlistMap(prev => {
          const newMap = { ...prev };
          delete newMap[productId];
          return newMap;
        });
      } else {
        const res = await addToWishlist(productId);
        setWishlistMap(prev => ({ ...prev, [productId]: res.data.id }));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update wishlist. Please try again.');
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-6 sm:py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-neutral-500 font-semibold mb-1.5 sm:mb-2 block">
            Exclusive Collection
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 capitalize px-2">
            {currentCategory 
              ? `${currentCategory}`
              : currentGender === 'all' 
                ? 'Entire Collection' 
                : `${currentGender} Wardrobe`}
          </h1>
          <div className="w-10 sm:w-12 h-[1px] bg-neutral-400 mx-auto mt-3 sm:mt-4"></div>
        </div>

        {/* Search Bar Input */}
        <div className="max-w-md mx-auto mb-6 relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search garments, shirts, dresses..."
            className="w-full bg-white border border-neutral-300 pl-11 pr-4 py-3 text-xs tracking-wider uppercase focus:outline-none focus:border-neutral-900 transition shadow-sm rounded-none"
          />
        </div>

        {/* Size Filter Pills */}
        <div className="flex justify-center items-center gap-2 mb-8 flex-wrap">
          <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mr-2">Filter Size:</span>
          {['', 'S', 'M', 'L', 'XL'].map((sz) => (
            <button
              key={sz}
              onClick={() => setSelectedSize(sz)}
              className={`px-3.5 py-1.5 text-[10px] uppercase tracking-widest transition-all border ${
                selectedSize === sz 
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm' 
                  : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-900'
              }`}
            >
              {sz === '' ? 'All Sizes' : sz}
            </button>
          ))}
        </div>

        {/* Top Gender Filter Tabs */}
        <div className="flex justify-start sm:justify-center items-center gap-4 sm:gap-8 mb-8 sm:mb-12 border-b border-neutral-200 pb-3 sm:pb-4 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {['all', 'women', 'men', 'kids', 'ethnic'].map((g) => (
            <button
              key={g}
              onClick={() => {
                setSearchParams(g === 'all' ? {} : { gender: g });
                setSearchQuery(''); 
              }}
              className={`text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-semibold transition-all pb-1 whitespace-nowrap shrink-0 ${
                currentGender === g && !currentCategory ? 'text-black border-b-2 border-black' : 'text-neutral-400 hover:text-black'
              }`}   
            >
              {g}
            </button>
          ))}
        </div>

        {/* Grid Display */}
        {loading ? (
          <div className="text-center py-16 sm:py-20 font-serif text-neutral-500 uppercase tracking-widest text-xs">
            Refining Garments...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 sm:py-20 font-serif text-neutral-500 text-sm sm:text-base">
            No clothing pieces found in this section.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
            {products.map(product => (
              <div 
                key={product.id} 
                onClick={() => navigate(`/product/${product.id}`)}
                className="group cursor-pointer flex flex-col relative"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-2.5 sm:mb-4">
                  <img 
                    src={getImageUrl(product)} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-700 ease-out" 
                    onError={(e) => { e.target.src = "https://placehold.co/600x800?text=Image+Unavailable"; }}
                  />

                  <button 
                    onClick={(e) => handleWishlistToggle(e, product.id)}
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 p-2 sm:p-2.5 bg-white/80 backdrop-blur rounded-full shadow-sm hover:scale-110 active:scale-95 transition duration-300 z-20 text-neutral-800"
                    title={wishlistMap[product.id] ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    <Heart 
                      size={15} 
                      className={wishlistMap[product.id] ? "fill-red-600 text-red-600" : "text-neutral-800"} 
                    />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent hidden sm:block">
                    <span className="block w-full py-2 sm:py-2.5 bg-white text-black text-center text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em]">
                      View Piece
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start gap-1 sm:gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-xs sm:text-sm text-neutral-900 truncate">{product.name}</h3>
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400 mt-0.5 sm:mt-1 truncate">
                      {product.category_name || 'Haute Couture'}
                    </p>
                  </div>
                  <span className="text-xs sm:text-sm font-serif text-neutral-900 font-medium shrink-0">
                    ₹{Number(product.price).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}