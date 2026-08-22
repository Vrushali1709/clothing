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







// import React, { useEffect, useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { Heart, Search } from 'lucide-react';
// import API, { addToWishlist, removeFromWishlist, getWishlist } from '../services/api';

// export default function Shop() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [wishlistMap, setWishlistMap] = useState({});
//   const [searchQuery, setSearchQuery] = useState(''); 
//   const [selectedSize, setSelectedSize] = useState('');
//   const [sortBy, setSortBy] = useState('default'); // 👈 Price Sorting State
//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const currentGender = searchParams.get('gender') || 'all';
//   const currentCategory = searchParams.get('category') || '';

//   const getImageUrl = (product) => {
//     let imagePath = product?.image;

//     if (!imagePath && product?.images && product.images.length > 0) {
//       imagePath = product.images[0]?.image || product.images[0];
//     }

//     if (!imagePath) return "https://placehold.co/600x800?text=Garment";

//     if (typeof imagePath === 'string' && (imagePath.startsWith('http://') || imagePath.startsWith('https://'))) {
//       return imagePath;
//     }

//     return `https://clothing-backend-gynt.onrender.com${imagePath}`;
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
//     if (searchQuery) {
//       params.append('search', searchQuery);
//     }
//     if (selectedSize) {
//       params.append('size', selectedSize);
//     }

//     const queryString = params.toString();
//     const url = queryString ? `products/?${queryString}` : 'products/';

//     // 1. Fetch Products based on Gender, Subcategory, Search & Size
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
//   }, [currentGender, currentCategory, searchQuery, selectedSize]);

//   // Sorting Logic Function
//   const sortedProducts = [...products].sort((a, b) => {
//     if (sortBy === 'low-high') return Number(a.price) - Number(b.price);
//     if (sortBy === 'high-low') return Number(b.price) - Number(a.price);
//     if (sortBy === 'newest') return b.id - a.id;
//     return 0; // default
//   });

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
//         <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
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

//         {/* Search Bar Input */}
//         <div className="max-w-md mx-auto mb-6 relative">
//           <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
//             <Search size={16} />
//           </span>
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search garments, shirts, dresses..."
//             className="w-full bg-white border border-neutral-300 pl-11 pr-4 py-3 text-xs tracking-wider uppercase focus:outline-none focus:border-neutral-900 transition shadow-sm rounded-none"
//           />
//         </div>

//         {/* Size Filter Pills & Sorting Dropdown Row */}
//         <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
//           {/* Size Filter Pills */}
//           <div className="flex items-center gap-2 flex-wrap justify-center">
//             <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mr-2">Filter Size:</span>
//             {['', 'S', 'M', 'L', 'XL'].map((sz) => (
//               <button
//                 key={sz}
//                 onClick={() => setSelectedSize(sz)}
//                 className={`px-3.5 py-1.5 text-[10px] uppercase tracking-widest transition-all border ${
//                   selectedSize === sz 
//                     ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm' 
//                     : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-900'
//                 }`}
//               >
//                 {sz === '' ? 'All Sizes' : sz}
//               </button>
//             ))}
//           </div>

//           {/* Sorting Dropdown */}
//           <div className="flex items-center gap-2">
//             <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Sort By:</span>
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="bg-white border border-neutral-300 px-3 py-1.5 text-[10px] uppercase tracking-widest text-neutral-800 focus:outline-none focus:border-neutral-900 transition shadow-sm cursor-pointer"
//             >
//               <option value="default">Featured / Default</option>
//               <option value="low-high">Price: Low to High</option>
//               <option value="high-low">Price: High to Low</option>
//               <option value="newest">Newest Arrivals</option>
//             </select>
//           </div>
//         </div>

//         {/* Top Gender Filter Tabs */}
//         <div className="flex justify-start sm:justify-center items-center gap-4 sm:gap-8 mb-8 sm:mb-12 border-b border-neutral-200 pb-3 sm:pb-4 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
//           {['all', 'women', 'men', 'kids', 'ethnic'].map((g) => (
//             <button
//               key={g}
//               onClick={() => {
//                 setSearchParams(g === 'all' ? {} : { gender: g });
//                 setSearchQuery(''); 
//               }}
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
//         ) : sortedProducts.length === 0 ? (
//           <div className="text-center py-16 sm:py-20 font-serif text-neutral-500 text-sm sm:text-base">
//             No clothing pieces found in this section.
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
//             {sortedProducts.map(product => (
//               <div 
//                 key={product.id} 
//                 onClick={() => navigate(`/product/${product.id}`)}
//                 className="group cursor-pointer flex flex-col relative"
//               >
//                 <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-2.5 sm:mb-4">
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







import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Heart, Search, X, ArrowRight } from 'lucide-react';
import API, {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from '../services/api';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistMap, setWishlistMap] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  /* =========================================================
     URL FILTERS
  ========================================================= */

  const currentGender = searchParams.get('gender') || 'all';
  const currentCategory = searchParams.get('category') || '';
  const currentCollection = searchParams.get('collection') || '';

  /* =========================================================
     COLLECTION CONFIG
     
     IMPORTANT:
     These collections work with your product data.
     If your backend has a "collection" field, that will be
     checked first. Otherwise keywords are used as fallback.
  ========================================================= */

  const collectionConfig = {
    monochrome: {
      title: 'The Monochrome Edit',
      subtitle: 'MINIMAL • REFINED • TIMELESS',

      keywords: [
        'monochrome',
        'black',
        'white',
        'grey',
        'gray',
        'minimal',
      ],
    },

    weekend: {
      title: 'Weekend Essentials',
      subtitle: 'EFFORTLESS EVERYDAY LUXURY',

      keywords: [
        'casual',
        'weekend',
        'everyday',
        'basic',
        't-shirt',
        'tshirt',
        'shirt',
        'top',
        'jeans',
      ],
    },

    occasion: {
      title: 'Occasion Edit',
      subtitle: 'MADE FOR YOUR MOMENTS',

      keywords: [
        'occasion',
        'party',
        'festive',
        'formal',
        'wedding',
        'ethnic',
        'lehenga',
        'saree',
        'anarkali',
        'suit',
        'blazer',
      ],
    },
  };

  const activeCollection = collectionConfig[currentCollection] || null;

  /* =========================================================
     IMAGE HELPER
  ========================================================= */

  const getImageUrl = (product) => {
    if (!product) {
      return 'https://placehold.co/600x800?text=Garment';
    }

    let imagePath =
      product.image ||
      product.image_url ||
      product.product_image ||
      (Array.isArray(product.images) && product.images[0]?.image) ||
      (Array.isArray(product.images) && product.images[0]) ||
      product.product?.image;

    // If image is object
    if (typeof imagePath === 'object' && imagePath !== null) {
      imagePath =
        imagePath.url ||
        imagePath.file ||
        imagePath.image ||
        '';
    }

    if (!imagePath || typeof imagePath !== 'string') {
      return 'https://placehold.co/600x800?text=Garment';
    }

    // Full URL
    if (
      imagePath.startsWith('http://') ||
      imagePath.startsWith('https://')
    ) {
      return imagePath;
    }

    // Backend URL
    const cleanPath = imagePath.startsWith('/')
      ? imagePath
      : `/${imagePath}`;

    return `https://clothing-backend-gynt.onrender.com${cleanPath}`;
  };

  /* =========================================================
     COLLECTION MATCHING
  ========================================================= */

  const matchesCollection = (product) => {
    if (!currentCollection) return true;

    const config = collectionConfig[currentCollection];

    if (!config) return true;

    /*
      1. If backend already provides collection field,
         use it first.
    */

    const backendCollection =
      product.collection ||
      product.collection_name ||
      product.collection_slug ||
      product.product_collection;

    if (backendCollection) {
      const normalizedBackendCollection = String(
        backendCollection
      )
        .toLowerCase()
        .replace(/\s+/g, '-');

      if (normalizedBackendCollection === currentCollection) {
        return true;
      }

      // If backend collection exists but doesn't match,
      // don't immediately reject because keyword fallback
      // may still be useful.
    }

    /*
      2. Keyword fallback.
    */

    const searchableText = [
      product.name,
      product.title,
      product.description,
      product.category_name,
      product.category,
      product.gender,
      product.color,
      product.colour,
      product.tags,
      product.collection,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return config.keywords.some((keyword) =>
      searchableText.includes(keyword.toLowerCase())
    );
  };

  /* =========================================================
     FETCH PRODUCTS
  ========================================================= */

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setLoading(true);

      try {
        /*
          Collection is intentionally NOT sent directly to backend
          because your current API may not have a collection filter.

          Gender/category/search/size continue using backend filters.
        */

        const params = new URLSearchParams();

        if (currentGender !== 'all') {
          params.append('gender', currentGender);
        }

        if (currentCategory) {
          params.append('category', currentCategory);
        }

        if (searchQuery.trim()) {
          params.append('search', searchQuery.trim());
        }

        if (selectedSize) {
          params.append('size', selectedSize);
        }

        const queryString = params.toString();

        const url = queryString
          ? `products/?${queryString}`
          : 'products/';

        const res = await API.get(url);

        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.results || [];

        if (isMounted) {
          setProducts(data);
        }
      } catch (err) {
        console.error('Product fetch error:', err);

        if (isMounted) {
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [
    currentGender,
    currentCategory,
    searchQuery,
    selectedSize,
  ]);

  /* =========================================================
     FETCH WISHLIST
  ========================================================= */

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      setWishlistMap({});
      return;
    }

    getWishlist()
      .then((res) => {
        const list = Array.isArray(res.data)
          ? res.data
          : res.data?.results || [];

        const map = {};

        list.forEach((item) => {
          const productId =
            typeof item.product === 'object'
              ? item.product?.id
              : item.product;

          if (productId) {
            map[productId] = item.id;
          }
        });

        setWishlistMap(map);
      })
      .catch((err) => {
        console.error('Wishlist fetch error:', err);
      });
  }, []);

  /* =========================================================
     FILTER + SORT PRODUCTS
  ========================================================= */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    /*
      Apply collection filter on frontend.
    */

    if (currentCollection) {
      result = result.filter(matchesCollection);
    }

    /*
      Sort
    */

    result.sort((a, b) => {
      if (sortBy === 'low-high') {
        return Number(a.price || 0) - Number(b.price || 0);
      }

      if (sortBy === 'high-low') {
        return Number(b.price || 0) - Number(a.price || 0);
      }

      if (sortBy === 'newest') {
        return Number(b.id || 0) - Number(a.id || 0);
      }

      return 0;
    });

    return result;
  }, [
    products,
    currentCollection,
    sortBy,
  ]);

  /* =========================================================
     WISHLIST TOGGLE
  ========================================================= */

  const handleWishlistToggle = async (e, productId) => {
    e.stopPropagation();

    const token = localStorage.getItem('access_token');

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      if (wishlistMap[productId]) {
        const wishlistId = wishlistMap[productId];

        await removeFromWishlist(wishlistId);

        setWishlistMap((prev) => {
          const updated = { ...prev };
          delete updated[productId];
          return updated;
        });
      } else {
        const res = await addToWishlist(productId);

        setWishlistMap((prev) => ({
          ...prev,
          [productId]: res.data.id,
        }));
      }
    } catch (err) {
      console.error('Wishlist update error:', err);

      const message =
        err?.response?.data?.detail ||
        'Failed to update wishlist. Please try again.';

      alert(message);
    }
  };

  /* =========================================================
     GENDER CHANGE
  ========================================================= */

  const handleGenderChange = (gender) => {
    setSearchQuery('');
    setSelectedSize('');
    setSortBy('default');

    if (gender === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({
        gender,
      });
    }
  };

  /* =========================================================
     CLEAR COLLECTION
  ========================================================= */

  const clearCollection = () => {
    const params = {};

    if (currentGender !== 'all') {
      params.gender = currentGender;
    }

    if (currentCategory) {
      params.category = currentCategory;
    }

    setSearchParams(params);
  };

  /* =========================================================
     PAGE TITLE
  ========================================================= */

  const pageTitle = activeCollection
    ? activeCollection.title
    : currentCategory
      ? currentCategory
      : currentGender === 'all'
        ? 'Entire Collection'
        : `${currentGender} Wardrobe`;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-6 sm:py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">

          <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-neutral-500 font-semibold mb-1.5 sm:mb-2 block">
            {activeCollection
              ? 'Curated Collection'
              : 'Exclusive Collection'}
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 capitalize px-2">
            {pageTitle}
          </h1>

          {activeCollection && (
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-neutral-400 mt-2">
              {activeCollection.subtitle}
            </p>
          )}

          <div className="w-10 sm:w-12 h-[1px] bg-neutral-400 mx-auto mt-3 sm:mt-4" />

          {/* Collection Clear */}
          {activeCollection && (
            <button
              onClick={clearCollection}
              className="mt-4 inline-flex items-center gap-2 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500 hover:text-black transition"
            >
              <X size={13} />
              Clear Collection
            </button>
          )}
        </div>

        {/* =====================================================
            SEARCH BAR
        ===================================================== */}

        <div className="max-w-md mx-auto mb-6 relative">

          <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
            <Search size={16} />
          </span>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            placeholder="Search garments, shirts, dresses..."
            className="
              w-full
              bg-white
              border
              border-neutral-300
              pl-11
              pr-10
              py-3
              text-xs
              tracking-wider
              uppercase
              focus:outline-none
              focus:border-neutral-900
              transition
              shadow-sm
              rounded-none
            "
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* =====================================================
            SIZE FILTER + SORT
        ===================================================== */}

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">

          {/* Size Filter */}

          <div className="flex items-center gap-2 flex-wrap justify-center">

            <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mr-2">
              Filter Size:
            </span>

            {['', 'S', 'M', 'L', 'XL'].map((size) => (
              <button
                key={size || 'all'}
                onClick={() => setSelectedSize(size)}
                className={`
                  px-3.5
                  py-1.5
                  text-[10px]
                  uppercase
                  tracking-widest
                  transition-all
                  border
                  ${
                    selectedSize === size
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-900'
                  }
                `}
              >
                {size === '' ? 'All Sizes' : size}
              </button>
            ))}
          </div>

          {/* Sorting */}

          <div className="flex items-center gap-2">

            <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
              Sort By:
            </span>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="
                bg-white
                border
                border-neutral-300
                px-3
                py-1.5
                text-[10px]
                uppercase
                tracking-widest
                text-neutral-800
                focus:outline-none
                focus:border-neutral-900
                transition
                shadow-sm
                cursor-pointer
              "
            >
              <option value="default">
                Featured / Default
              </option>

              <option value="low-high">
                Price: Low to High
              </option>

              <option value="high-low">
                Price: High to Low
              </option>

              <option value="newest">
                Newest Arrivals
              </option>
            </select>
          </div>
        </div>

        {/* =====================================================
            GENDER TABS
        ===================================================== */}

        <div className="
          flex
          justify-start
          sm:justify-center
          items-center
          gap-4
          sm:gap-8
          mb-8
          sm:mb-12
          border-b
          border-neutral-200
          pb-3
          sm:pb-4
          overflow-x-auto
          scrollbar-none
          -mx-4
          px-4
          sm:mx-0
          sm:px-0
        ">

          {['all', 'women', 'men', 'kids', 'ethnic'].map(
            (gender) => (
              <button
                key={gender}
                onClick={() =>
                  handleGenderChange(gender)
                }
                className={`
                  text-[11px]
                  sm:text-xs
                  uppercase
                  tracking-[0.18em]
                  sm:tracking-[0.2em]
                  font-semibold
                  transition-all
                  pb-1
                  whitespace-nowrap
                  shrink-0
                  ${
                    currentGender === gender &&
                    !currentCategory &&
                    !currentCollection
                      ? 'text-black border-b-2 border-black'
                      : 'text-neutral-400 hover:text-black'
                  }
                `}
              >
                {gender}
              </button>
            )
          )}
        </div>

        {/* =====================================================
            ACTIVE FILTER INFO
        ===================================================== */}

        {(currentCollection ||
          currentCategory ||
          currentGender !== 'all' ||
          searchQuery ||
          selectedSize) && (
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">

            <div className="flex flex-wrap gap-2">

              {currentCollection && (
                <span className="px-3 py-1.5 bg-neutral-900 text-white text-[9px] uppercase tracking-widest">
                  {activeCollection?.title}
                </span>
              )}

              {currentCategory && (
                <span className="px-3 py-1.5 bg-white border border-neutral-300 text-neutral-700 text-[9px] uppercase tracking-widest">
                  {currentCategory}
                </span>
              )}

              {currentGender !== 'all' && (
                <span className="px-3 py-1.5 bg-white border border-neutral-300 text-neutral-700 text-[9px] uppercase tracking-widest">
                  {currentGender}
                </span>
              )}

              {selectedSize && (
                <span className="px-3 py-1.5 bg-white border border-neutral-300 text-neutral-700 text-[9px] uppercase tracking-widest">
                  Size {selectedSize}
                </span>
              )}

              {searchQuery && (
                <span className="px-3 py-1.5 bg-white border border-neutral-300 text-neutral-700 text-[9px] uppercase tracking-widest">
                  Search: {searchQuery}
                </span>
              )}
            </div>

            <span className="text-[10px] uppercase tracking-widest text-neutral-400">
              {filteredProducts.length}{' '}
              {filteredProducts.length === 1
                ? 'Piece'
                : 'Pieces'}
            </span>
          </div>
        )}

        {/* =====================================================
            PRODUCT GRID
        ===================================================== */}

        {loading ? (
          <div className="text-center py-16 sm:py-20 font-serif text-neutral-500 uppercase tracking-widest text-xs">
            Refining Garments...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 sm:py-20">

            <p className="font-serif text-neutral-500 text-sm sm:text-base mb-4">
              No clothing pieces found in this collection.
            </p>

            {currentCollection && (
              <button
                onClick={clearCollection}
                className="
                  inline-flex
                  items-center
                  gap-2
                  bg-neutral-900
                  text-white
                  px-5
                  py-3
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  font-bold
                  hover:bg-black
                  transition
                "
              >
                Explore All Collection
                <ArrowRight size={13} />
              </button>
            )}
          </div>
        ) : (
          <div className="
            grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-3
            sm:gap-6
            md:gap-8
          ">

            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() =>
                  navigate(`/product/${product.id}`)
                }
                className="
                  group
                  cursor-pointer
                  flex
                  flex-col
                  relative
                "
              >

                {/* =================================================
                    PRODUCT IMAGE
                ================================================= */}

                <div className="
                  relative
                  aspect-[3/4]
                  overflow-hidden
                  bg-neutral-100
                  mb-2.5
                  sm:mb-4
                ">

                  <img
                    src={getImageUrl(product)}
                    alt={product.name || 'Garment'}
                    className="
                      w-full
                      h-full
                      object-cover
                      object-top
                      group-hover:scale-105
                      transition
                      duration-700
                      ease-out
                    "
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        'https://placehold.co/600x800?text=Image+Unavailable';
                    }}
                  />

                  {/* Wishlist */}

                  <button
                    onClick={(e) =>
                      handleWishlistToggle(
                        e,
                        product.id
                      )
                    }
                    className="
                      absolute
                      top-2
                      right-2
                      sm:top-3
                      sm:right-3
                      p-2
                      sm:p-2.5
                      bg-white/85
                      backdrop-blur
                      rounded-full
                      shadow-sm
                      hover:scale-110
                      active:scale-95
                      transition
                      duration-300
                      z-20
                      text-neutral-800
                    "
                    title={
                      wishlistMap[product.id]
                        ? 'Remove from Wishlist'
                        : 'Add to Wishlist'
                    }
                    aria-label={
                      wishlistMap[product.id]
                        ? 'Remove from Wishlist'
                        : 'Add to Wishlist'
                    }
                  >
                    <Heart
                      size={15}
                      className={
                        wishlistMap[product.id]
                          ? 'fill-red-600 text-red-600'
                          : 'text-neutral-800'
                      }
                    />
                  </button>

                  {/* Desktop View Piece */}

                  <div className="
                    absolute
                    inset-x-0
                    bottom-0
                    p-2
                    sm:p-3
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-300
                    bg-gradient-to-t
                    from-black/50
                    to-transparent
                    hidden
                    sm:block
                  ">
                    <span className="
                      block
                      w-full
                      py-2
                      sm:py-2.5
                      bg-white
                      text-black
                      text-center
                      text-[9px]
                      sm:text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                    ">
                      View Piece
                    </span>
                  </div>
                </div>

                {/* =================================================
                    PRODUCT INFO
                ================================================= */}

                <div className="
                  flex
                  flex-col
                  sm:flex-row
                  justify-between
                  items-start
                  gap-1
                  sm:gap-2
                ">

                  <div className="min-w-0 flex-1">

                    <h3 className="
                      font-serif
                      text-xs
                      sm:text-sm
                      text-neutral-900
                      truncate
                    ">
                      {product.name || 'Garment'}
                    </h3>

                    <p className="
                      text-[9px]
                      sm:text-[10px]
                      uppercase
                      tracking-widest
                      text-neutral-400
                      mt-0.5
                      sm:mt-1
                      truncate
                    ">
                      {product.category_name ||
                        product.category?.name ||
                        'Haute Couture'}
                    </p>

                  </div>

                  <span className="
                    text-xs
                    sm:text-sm
                    font-serif
                    text-neutral-900
                    font-medium
                    shrink-0
                  ">
                    ₹
                    {Number(
                      product.price || 0
                    ).toLocaleString('en-IN')}
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