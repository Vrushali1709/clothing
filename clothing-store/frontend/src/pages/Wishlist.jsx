// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Heart, Trash2, ArrowRight } from 'lucide-react';
// import API, { getWishlist, removeFromWishlist } from '../services/api';

// export default function Wishlist() {
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Smart Image Helper (તમામ પ્રકારની Image Key ને ઓટોમેટિક હેન્ડલ કરશે)
//   const getImageUrl = (product) => {
//     if (!product) return "https://placehold.co/600x800?text=Luxury+Garment";

//     // 1. અલગ-અલગ જગ્યાએથી ઈમેજ પાથ શોધો
//     let imagePath =
//       product.image ||
//       product.image_url ||
//       product.product_image ||
//       (Array.isArray(product.images) && product.images[0]?.image) ||
//       (Array.isArray(product.images) && product.images[0]) ||
//       product.product?.image;

//     // 2. જો ઈમેજ ઓબ્જેક્ટ હોય
//     if (typeof imagePath === 'object' && imagePath !== null) {
//       imagePath = imagePath.url || imagePath.file || '';
//     }

//     // 3. જો ઈમેજ ન મળે
//     if (!imagePath || typeof imagePath !== 'string') {
//       return "https://placehold.co/600x800?text=Luxury+Garment";
//     }

//     // 4. જો પૂર્ણ URL ઓલરેડી હોય
//     if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
//       return imagePath;
//     }

//     // 5. Backend Base URL સાથે જોડો
//     const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
//     return `http://127.0.0.1:8000${cleanPath}`;
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('access_token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     // Wishlist અને Products બંને Fetch કરીને Data Merge કરીએ છીએ
//     Promise.all([
//       getWishlist(),
//       API.get('products/')
//     ])
//       .then(([wishlistRes, productsRes]) => {
//         const rawWishlist = Array.isArray(wishlistRes.data) ? wishlistRes.data : wishlistRes.data.results || [];
//         const rawProducts = Array.isArray(productsRes.data) ? productsRes.data : productsRes.data.results || [];

//         // Fast Lookup માટે Products Map
//         const productsMap = {};
//         rawProducts.forEach(p => {
//           productsMap[p.id] = p;
//         });

//         // Wishlist items ને સાચા પ્રોડક્ટ ડેટા સાથે લિંક કરીએ છીએ
//         const formattedWishlist = rawWishlist.map(item => {
//           const pId = typeof item.product === 'object' ? item.product.id : item.product;
//           const productData = (typeof item.product === 'object' && item.product !== null) 
//             ? item.product 
//             : (productsMap[pId] || item.product_details || {});

//           return {
//             wishlistId: item.id,
//             product: {
//               ...productData,
//               id: pId,
//               name: productData.name || `Garment #${pId}`,
//               price: productData.price || 0,
//               category_name: productData.category_name || 'Haute Couture'
//             }
//           };
//         });

//         setWishlistItems(formattedWishlist);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, [navigate]);

//   const handleRemove = async (wishlistId) => {
//     try {
//       await removeFromWishlist(wishlistId);
//       setWishlistItems((prev) => prev.filter((item) => item.wishlistId !== wishlistId));
//     } catch (err) {
//       console.error(err);
//       alert('Failed to remove item from wishlist.');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="bg-[#FAF8F5] min-h-screen flex justify-center items-center text-xs font-serif uppercase tracking-widest text-neutral-500 p-4 text-center">
//         Fetching Saved Garments...
//       </div>
//     );
//   }

//   if (wishlistItems.length === 0) {
//     return (
//       <div className="bg-[#FAF8F5] min-h-[75vh] flex flex-col justify-center items-center px-4 sm:px-6 py-12 sm:py-20 text-center text-neutral-900">
//         <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4 sm:mb-6 text-neutral-400">
//           <Heart size={24} className="sm:hidden" strokeWidth={1.5} />
//           <Heart size={28} className="hidden sm:block" strokeWidth={1.5} />
//         </div>
//         <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-neutral-400 font-bold mb-2 block">
//           Personal Favorites
//         </span>
//         <h2 className="text-2xl sm:text-3xl font-serif mb-3 tracking-tight">Your Wishlist is Empty</h2>
//         <p className="text-xs font-light text-neutral-500 max-w-sm mb-6 sm:mb-8 leading-relaxed px-2">
//           Explore our collection and save your favorite garments for later.
//         </p>
//         <button
//           onClick={() => navigate('/shop')}
//           className="bg-neutral-900 text-white px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-black active:scale-[0.98] transition-all shadow-md flex items-center gap-2.5 sm:gap-3 group"
//         >
//           Explore Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-8 sm:py-12 md:py-16">
//       <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
//         {/* Page Header */}
//         <div className="mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
//           <div>
//             <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-neutral-400 font-bold block mb-1">
//               Curated Favorites
//             </span>
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight">Saved Wishlist</h1>
//           </div>
//           <span className="text-[11px] sm:text-xs uppercase tracking-widest text-neutral-500">
//             {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'} Reserved
//           </span>
//         </div>

//         {/* Wishlist Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
//           {wishlistItems.map((item) => (
//             <div key={item.wishlistId} className="bg-white border border-neutral-200/80 group flex flex-col justify-between shadow-sm hover:shadow-md transition">
//               <div>
//                 <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
//                   <img
//                     src={getImageUrl(item.product)}
//                     alt={item.product.name}
//                     className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-700 ease-out"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = "https://placehold.co/600x800?text=Garment";
//                     }}
//                   />
//                   <button
//                     onClick={() => handleRemove(item.wishlistId)}
//                     className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-white/90 backdrop-blur rounded-full shadow-sm hover:bg-red-50 text-neutral-600 hover:text-red-600 active:scale-95 transition"
//                     title="Remove"
//                   >
//                     <Trash2 size={14} className="sm:hidden" strokeWidth={1.5} />
//                     <Trash2 size={15} className="hidden sm:block" strokeWidth={1.5} />
//                   </button>
//                 </div>

//                 <div className="p-3 sm:p-4">
//                   <h3 className="font-serif text-xs sm:text-sm font-medium text-neutral-900 truncate">{item.product.name}</h3>
//                   <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400 mt-0.5 sm:mt-1 truncate">{item.product.category_name}</p>
//                   <p className="font-serif text-xs sm:text-sm font-semibold text-neutral-900 mt-1.5 sm:mt-2">₹{Number(item.product.price).toLocaleString('en-IN')}</p>
//                 </div>
//               </div>

//               <div className="p-3 sm:p-4 pt-0">
//                 <button
//                   onClick={() => navigate(`/product/${item.product.id}`)}
//                   className="w-full bg-neutral-900 text-white py-2.5 sm:py-3 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] hover:bg-black active:scale-[0.98] transition"
//                 >
//                   View Piece
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }







// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Heart,
//   Trash2,
//   ArrowRight,
//   ShoppingBag,
//   Eye,
//   Check,
//   Loader2
// } from 'lucide-react';

// import { useCart } from '../context/CartContext';
// import API, {
//   getWishlist,
//   removeFromWishlist
// } from '../services/api';

// export default function Wishlist() {
//   const navigate = useNavigate();
//   const { addToCart } = useCart();

//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Track individual item actions
//   const [actionLoading, setActionLoading] = useState({});
//   const [addedItem, setAddedItem] = useState(null);

//   // ============================================================
//   // IMAGE URL HELPER
//   // ============================================================

//   const getImageUrl = (product) => {
//     if (!product) {
//       return 'https://placehold.co/600x800?text=Luxury+Garment';
//     }

//     let imagePath =
//       product.image ||
//       product.image_url ||
//       product.product_image ||
//       product.thumbnail ||
//       (Array.isArray(product.images) && product.images[0]?.image) ||
//       (Array.isArray(product.images) && product.images[0]?.image_url) ||
//       (Array.isArray(product.images) && product.images[0]) ||
//       product.product?.image;

//     // Handle image object
//     if (typeof imagePath === 'object' && imagePath !== null) {
//       imagePath =
//         imagePath.url ||
//         imagePath.file ||
//         imagePath.image ||
//         '';
//     }

//     if (!imagePath || typeof imagePath !== 'string') {
//       return 'https://placehold.co/600x800?text=Luxury+Garment';
//     }

//     // Full URL
//     if (
//       imagePath.startsWith('http://') ||
//       imagePath.startsWith('https://')
//     ) {
//       return imagePath;
//     }

//     // Use API base URL instead of hardcoded localhost
//     const baseURL =
//       API?.defaults?.baseURL ||
//       'https://clothing-backend-gynt.onrender.com/api/';

//     const cleanBaseURL = baseURL.replace(/\/api\/?$/, '');
//     const cleanPath = imagePath.startsWith('/')
//       ? imagePath
//       : `/${imagePath}`;

//     return `${cleanBaseURL}${cleanPath}`;
//   };

//   // ============================================================
//   // NORMALIZE API RESPONSE
//   // ============================================================

//   const getListFromResponse = (response) => {
//     if (Array.isArray(response?.data)) {
//       return response.data;
//     }

//     if (Array.isArray(response?.data?.results)) {
//       return response.data.results;
//     }

//     return [];
//   };

//   // ============================================================
//   // FETCH WISHLIST
//   // ============================================================

//   useEffect(() => {
//     const token = localStorage.getItem('access_token');

//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     let isMounted = true;

//     const fetchWishlist = async () => {
//       try {
//         setLoading(true);
//         setError('');

//         const [wishlistRes, productsRes] = await Promise.all([
//           getWishlist(),
//           API.get('products/')
//         ]);

//         if (!isMounted) return;

//         const rawWishlist = getListFromResponse(wishlistRes);
//         const rawProducts = getListFromResponse(productsRes);

//         // Product lookup map
//         const productsMap = {};

//         rawProducts.forEach((product) => {
//           if (product?.id !== undefined) {
//             productsMap[String(product.id)] = product;
//           }
//         });

//         const formattedWishlist = rawWishlist
//           .map((item) => {
//             const productId =
//               typeof item.product === 'object' && item.product !== null
//                 ? item.product.id
//                 : item.product;

//             const productData =
//               typeof item.product === 'object' &&
//               item.product !== null
//                 ? item.product
//                 : productsMap[String(productId)] ||
//                   item.product_details ||
//                   {};

//             return {
//               wishlistId: item.id,

//               product: {
//                 ...productData,

//                 id: productId,

//                 name:
//                   productData.name ||
//                   `Garment #${productId}`,

//                 price:
//                   productData.price !== undefined
//                     ? productData.price
//                     : 0,

//                 category_name:
//                   productData.category_name ||
//                   productData.category?.name ||
//                   'Haute Couture',

//                 stock:
//                   productData.stock ??
//                   productData.quantity ??
//                   null,

//                 sizes:
//                   productData.sizes || '',

//                 colors:
//                   productData.colors || ''
//               }
//             };
//           })
//           .filter((item) => item.product.id);

//         setWishlistItems(formattedWishlist);
//       } catch (err) {
//         console.error('Wishlist fetch error:', err);

//         if (isMounted) {
//           setError(
//             'Unable to load your wishlist. Please try again.'
//           );
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchWishlist();

//     return () => {
//       isMounted = false;
//     };
//   }, [navigate]);

//   // ============================================================
//   // REMOVE FROM WISHLIST
//   // ============================================================

//   const handleRemove = async (wishlistId) => {
//     if (!wishlistId) return;

//     try {
//       setActionLoading((prev) => ({
//         ...prev,
//         [`remove-${wishlistId}`]: true
//       }));

//       await removeFromWishlist(wishlistId);

//       setWishlistItems((prev) =>
//         prev.filter(
//           (item) => item.wishlistId !== wishlistId
//         )
//       );
//     } catch (err) {
//       console.error('Remove wishlist error:', err);

//       alert(
//         err?.response?.data?.detail ||
//         'Failed to remove item from wishlist.'
//       );
//     } finally {
//       setActionLoading((prev) => ({
//         ...prev,
//         [`remove-${wishlistId}`]: false
//       }));
//     }
//   };

//   // ============================================================
//   // MOVE TO CART
//   // ============================================================

//   const handleMoveToCart = async (item) => {
//     if (!item?.product) return;

//     const product = item.product;
//     const wishlistId = item.wishlistId;

//     try {
//       setActionLoading((prev) => ({
//         ...prev,
//         [`cart-${wishlistId}`]: true
//       }));

//       // Default size/color if backend has them
//       const sizes = product.sizes
//         ? product.sizes
//             .split(',')
//             .map((s) => s.trim())
//             .filter(Boolean)
//         : [];

//       const colors = product.colors
//         ? product.colors
//             .split(',')
//             .map((c) => c.trim())
//             .filter(Boolean)
//         : [];

//       const selectedSize = sizes[0] || '';
//       const selectedColor = colors[0] || '';

//       addToCart(
//         product,
//         selectedSize,
//         selectedColor
//       );

//       // Remove from wishlist after adding to cart
//       await removeFromWishlist(wishlistId);

//       setWishlistItems((prev) =>
//         prev.filter(
//           (wishlistItem) =>
//             wishlistItem.wishlistId !== wishlistId
//         )
//       );

//       setAddedItem(wishlistId);

//       setTimeout(() => {
//         setAddedItem(null);
//       }, 2500);
//     } catch (err) {
//       console.error('Move to cart error:', err);

//       alert(
//         'Unable to move this item to your cart. Please try again.'
//       );
//     } finally {
//       setActionLoading((prev) => ({
//         ...prev,
//         [`cart-${wishlistId}`]: false
//       }));
//     }
//   };

//   // ============================================================
//   // VIEW PRODUCT
//   // ============================================================

//   const handleViewProduct = (productId) => {
//     if (!productId) return;

//     navigate(`/product/${productId}`);
//   };

//   // ============================================================
//   // LOADING
//   // ============================================================

//   if (loading) {
//     return (
//       <div className="bg-[#FAF8F5] min-h-screen flex flex-col justify-center items-center text-center px-4">
//         <div className="w-9 h-9 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mb-5" />

//         <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-serif">
//           Fetching Saved Garments...
//         </span>
//       </div>
//     );
//   }

//   // ============================================================
//   // ERROR
//   // ============================================================

//   if (error && wishlistItems.length === 0) {
//     return (
//       <div className="bg-[#FAF8F5] min-h-[75vh] flex flex-col justify-center items-center px-4 text-center">
//         <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-5">
//           <Heart
//             size={25}
//             className="text-red-400"
//             strokeWidth={1.5}
//           />
//         </div>

//         <h2 className="text-2xl font-serif mb-3">
//           Something Went Wrong
//         </h2>

//         <p className="text-xs text-neutral-500 max-w-sm mb-7">
//           {error}
//         </p>

//         <button
//           onClick={() => window.location.reload()}
//           className="bg-neutral-900 text-white px-7 py-3.5 text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-black transition"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   // ============================================================
//   // EMPTY WISHLIST
//   // ============================================================

//   if (wishlistItems.length === 0) {
//     return (
//       <div className="bg-[#FAF8F5] min-h-[75vh] flex flex-col justify-center items-center px-4 sm:px-6 py-12 sm:py-20 text-center text-neutral-900">
//         <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-5 sm:mb-6 text-neutral-400">
//           <Heart
//             size={26}
//             className="sm:hidden"
//             strokeWidth={1.5}
//           />

//           <Heart
//             size={29}
//             className="hidden sm:block"
//             strokeWidth={1.5}
//           />
//         </div>

//         <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-neutral-400 font-bold mb-2 block">
//           Personal Favorites
//         </span>

//         <h2 className="text-2xl sm:text-3xl font-serif mb-3 tracking-tight">
//           Your Wishlist is Empty
//         </h2>

//         <p className="text-xs font-light text-neutral-500 max-w-sm mb-7 sm:mb-8 leading-relaxed">
//           Explore our collection and save your favorite garments
//           for later.
//         </p>

//         <button
//           onClick={() => navigate('/shop')}
//           className="bg-neutral-900 text-white px-6 sm:px-8 py-3.5 sm:py-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-black active:scale-[0.98] transition-all shadow-md flex items-center gap-3 group"
//         >
//           Explore Collection

//           <ArrowRight
//             size={14}
//             className="group-hover:translate-x-1 transition-transform"
//           />
//         </button>
//       </div>
//     );
//   }

//   // ============================================================
//   // MAIN UI
//   // ============================================================

//   return (
//     <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-8 sm:py-12 md:py-16">
//       <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">

//         {/* ======================================================
//             HEADER
//         ====================================================== */}

//         <div className="mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
//           <div>
//             <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-neutral-400 font-bold block mb-1">
//               Curated Favorites
//             </span>

//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight">
//               Saved Wishlist
//             </h1>
//           </div>

//           <span className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500">
//             {wishlistItems.length}{' '}
//             {wishlistItems.length === 1
//               ? 'Item'
//               : 'Items'}{' '}
//             Saved
//           </span>
//         </div>

//         {/* ======================================================
//             SUCCESS MESSAGE
//         ====================================================== */}

//         {addedItem && (
//           <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider font-semibold">
//             <Check size={15} />
//             Item moved to your shopping bag
//           </div>
//         )}

//         {/* ======================================================
//             WISHLIST GRID
//         ====================================================== */}

//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
//           {wishlistItems.map((item) => {
//             const product = item.product;

//             const removeLoading =
//               actionLoading[`remove-${item.wishlistId}`];

//             const cartLoading =
//               actionLoading[`cart-${item.wishlistId}`];

//             return (
//               <div
//                 key={item.wishlistId}
//                 className="bg-white border border-neutral-200/80 group flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
//               >
//                 {/* ==================================================
//                     IMAGE
//                 ================================================== */}

//                 <div>
//                   <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">

//                     <img
//                       src={getImageUrl(product)}
//                       alt={product.name}
//                       className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-700 ease-out"
//                       onError={(e) => {
//                         e.currentTarget.onerror = null;
//                         e.currentTarget.src =
//                           'https://placehold.co/600x800?text=Garment';
//                       }}
//                     />

//                     {/* Top Overlay */}
//                     <div className="absolute inset-x-0 top-0 p-2.5 sm:p-3 flex justify-between items-start">
                      
//                       {/* Category */}
//                       <span className="bg-white/90 backdrop-blur px-2 py-1 text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold text-neutral-600">
//                         {product.category_name}
//                       </span>

//                       {/* Remove */}
//                       <button
//                         onClick={() =>
//                           handleRemove(item.wishlistId)
//                         }
//                         disabled={removeLoading}
//                         className="p-1.5 sm:p-2 bg-white/95 backdrop-blur rounded-full shadow-sm hover:bg-red-50 text-neutral-600 hover:text-red-600 active:scale-95 transition disabled:opacity-50"
//                         title="Remove from wishlist"
//                       >
//                         {removeLoading ? (
//                           <Loader2
//                             size={14}
//                             className="animate-spin"
//                           />
//                         ) : (
//                           <Trash2
//                             size={14}
//                             strokeWidth={1.5}
//                           />
//                         )}
//                       </button>
//                     </div>

//                     {/* Quick View */}
//                     <button
//                       onClick={() =>
//                         handleViewProduct(product.id)
//                       }
//                       className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur text-neutral-900 px-3 sm:px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 text-[8px] sm:text-[9px] uppercase tracking-widest font-semibold shadow-md"
//                     >
//                       <Eye size={13} />
//                       Quick View
//                     </button>
//                   </div>

//                   {/* ==================================================
//                       PRODUCT INFO
//                   ================================================== */}

//                   <div className="p-3 sm:p-4">
//                     <h3 className="font-serif text-xs sm:text-sm font-medium text-neutral-900 truncate">
//                       {product.name}
//                     </h3>

//                     <p className="text-[8px] sm:text-[10px] uppercase tracking-widest text-neutral-400 mt-1 truncate">
//                       {product.category_name}
//                     </p>

//                     <div className="flex items-center justify-between mt-1.5 sm:mt-2">
//                       <p className="font-serif text-xs sm:text-sm font-semibold text-neutral-900">
//                         ₹
//                         {Number(
//                           product.price
//                         ).toLocaleString('en-IN')}
//                       </p>

//                       {product.stock !== null &&
//                         product.stock !== undefined && (
//                           <span
//                             className={`text-[8px] uppercase tracking-wider font-semibold ${
//                               Number(product.stock) > 0
//                                 ? 'text-emerald-700'
//                                 : 'text-red-600'
//                             }`}
//                           >
//                             {Number(product.stock) > 0
//                               ? 'In Stock'
//                               : 'Sold Out'}
//                           </span>
//                         )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* ==================================================
//                     ACTIONS
//                 ================================================== */}

//                 <div className="p-3 sm:p-4 pt-0 space-y-2">

//                   {/* Move To Cart */}
//                   <button
//                     onClick={() =>
//                       handleMoveToCart(item)
//                     }
//                     disabled={cartLoading}
//                     className="w-full bg-neutral-900 text-white py-2.5 sm:py-3 text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:bg-black active:scale-[0.98] transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
//                   >
//                     {cartLoading ? (
//                       <>
//                         <Loader2
//                           size={13}
//                           className="animate-spin"
//                         />
//                         Adding...
//                       </>
//                     ) : (
//                       <>
//                         <ShoppingBag size={13} />
//                         Move to Bag
//                       </>
//                     )}
//                   </button>

//                   {/* View Piece */}
//                   <button
//                     onClick={() =>
//                       handleViewProduct(product.id)
//                     }
//                     className="w-full border border-neutral-200 text-neutral-800 py-2.5 sm:py-3 text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:border-neutral-900 hover:bg-neutral-50 active:scale-[0.98] transition flex items-center justify-center gap-2"
//                   >
//                     <Eye size={13} />
//                     View Piece
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* ======================================================
//             BOTTOM CTA
//         ====================================================== */}

//         <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div className="text-center sm:text-left">
//             <p className="font-serif text-base sm:text-lg">
//               Looking for something else?
//             </p>

//             <p className="text-[10px] sm:text-xs text-neutral-500 mt-1">
//               Discover more pieces from our latest collection.
//             </p>
//           </div>

//           <button
//             onClick={() => navigate('/shop')}
//             className="bg-white border border-neutral-300 text-neutral-900 px-5 sm:px-7 py-3 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-semibold hover:border-neutral-900 transition flex items-center gap-2 group"
//           >
//             Continue Shopping

//             <ArrowRight
//               size={14}
//               className="group-hover:translate-x-1 transition-transform"
//             />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }








import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Eye,
  Check,
  Loader2
} from 'lucide-react';

import { useCart } from '../context/CartContext';
import API, {
  getWishlist,
  removeFromWishlist
} from '../services/api';

export default function Wishlist() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [actionLoading, setActionLoading] = useState({});
  const [addedItem, setAddedItem] = useState(null);

  // -----------------------------------------------------------
  // IMAGE URL HELPER
  // -----------------------------------------------------------

  const getImageUrl = (product) => {
    if (!product) {
      return 'https://placehold.co/600x800?text=Luxury+Garment';
    }

    let imagePath =
      product.image ||
      product.image_url ||
      product.product_image ||
      product.thumbnail ||
      (Array.isArray(product.images) && product.images[0]?.image) ||
      (Array.isArray(product.images) && product.images[0]?.image_url) ||
      (Array.isArray(product.images) && product.images[0]) ||
      product.product?.image;

    if (typeof imagePath === 'object' && imagePath !== null) {
      imagePath =
        imagePath.url ||
        imagePath.file ||
        imagePath.image ||
        '';
    }

    if (!imagePath || typeof imagePath !== 'string') {
      return 'https://placehold.co/600x800?text=Luxury+Garment';
    }

    if (
      imagePath.startsWith('http://') ||
      imagePath.startsWith('https://')
    ) {
      return imagePath;
    }

    const baseURL =
      API?.defaults?.baseURL ||
      'https://clothing-backend-gynt.onrender.com/api/';

    const cleanBaseURL = baseURL.replace(/\/api\/?$/, '');
    const cleanPath = imagePath.startsWith('/')
      ? imagePath
      : `/${imagePath}`;

    return `${cleanBaseURL}${cleanPath}`;
  };

  const getListFromResponse = (response) => {
    if (Array.isArray(response?.data)) {
      return response.data;
    }

    if (Array.isArray(response?.data?.results)) {
      return response.data.results;
    }

    return [];
  };

  // -----------------------------------------------------------
  // FETCH WISHLIST
  // -----------------------------------------------------------

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      navigate('/login');
      return;
    }

    let isMounted = true;

    const fetchWishlist = async () => {
      try {
        setLoading(true);
        setError('');

        const [wishlistRes, productsRes] = await Promise.all([
          getWishlist(),
          API.get('products/')
        ]);

        if (!isMounted) return;

        const rawWishlist = getListFromResponse(wishlistRes);
        const rawProducts = getListFromResponse(productsRes);

        const productsMap = {};

        rawProducts.forEach((product) => {
          if (product?.id !== undefined) {
            productsMap[String(product.id)] = product;
          }
        });

        const formattedWishlist = rawWishlist
          .map((item) => {
            const productId =
              typeof item.product === 'object' && item.product !== null
                ? item.product.id
                : item.product;

            const productData =
              typeof item.product === 'object' &&
              item.product !== null
                ? item.product
                : productsMap[String(productId)] ||
                  item.product_details ||
                  {};

            return {
              wishlistId: item.id,
              product: {
                ...productData,
                id: productId,
                name:
                  productData.name ||
                  `Garment #${productId}`,
                price:
                  productData.price !== undefined
                    ? productData.price
                    : 0,
                category_name:
                  productData.category_name ||
                  productData.category?.name ||
                  'Haute Couture',
                stock:
                  productData.stock ??
                  productData.quantity ??
                  null,
                sizes: productData.sizes || '',
                colors: productData.colors || ''
              }
            };
          })
          .filter((item) => item.product.id);

        setWishlistItems(formattedWishlist);
      } catch (err) {
        console.error('Wishlist fetch error:', err);

        if (isMounted) {
          setError(
            'Unable to load your wishlist. Please try again.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchWishlist();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  // -----------------------------------------------------------
  // REMOVE FROM WISHLIST
  // -----------------------------------------------------------

  const handleRemove = async (wishlistId) => {
    if (!wishlistId) return;

    try {
      setActionLoading((prev) => ({
        ...prev,
        [`remove-${wishlistId}`]: true
      }));

      await removeFromWishlist(wishlistId);

      setWishlistItems((prev) =>
        prev.filter(
          (item) => item.wishlistId !== wishlistId
        )
      );
    } catch (err) {
      console.error('Remove wishlist error:', err);
      alert(
        err?.response?.data?.detail ||
        'Failed to remove item from wishlist.'
      );
    } finally {
      setActionLoading((prev) => ({
        ...prev,
        [`remove-${wishlistId}`]: false
      }));
    }
  };

  // -----------------------------------------------------------
  // MOVE TO CART
  // -----------------------------------------------------------

  const handleMoveToCart = async (item) => {
    if (!item?.product) return;

    const product = item.product;
    const wishlistId = item.wishlistId;

    try {
      setActionLoading((prev) => ({
        ...prev,
        [`cart-${wishlistId}`]: true
      }));

      const sizes = product.sizes
        ? product.sizes
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

      const colors = product.colors
        ? product.colors
            .split(',')
            .map((c) => c.trim())
            .filter(Boolean)
        : [];

      const selectedSize = sizes[0] || '';
      const selectedColor = colors[0] || '';

      addToCart(
        product,
        selectedSize,
        selectedColor
      );

      await removeFromWishlist(wishlistId);

      setWishlistItems((prev) =>
        prev.filter(
          (wishlistItem) =>
            wishlistItem.wishlistId !== wishlistId
        )
      );

      setAddedItem(wishlistId);

      setTimeout(() => {
        setAddedItem(null);
      }, 2500);
    } catch (err) {
      console.error('Move to cart error:', err);
      alert('Unable to move this item to your cart. Please try again.');
    } finally {
      setActionLoading((prev) => ({
        ...prev,
        [`cart-${wishlistId}`]: false
      }));
    }
  };

  const handleViewProduct = (productId) => {
    if (!productId) return;
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen flex flex-col justify-center items-center text-center px-4">
        <div className="w-9 h-9 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mb-5" />
        <span className="text-xs uppercase tracking-widest text-neutral-500 font-serif">
          Loading Wishlist...
        </span>
      </div>
    );
  }

  if (error && wishlistItems.length === 0) {
    return (
      <div className="bg-[#FAF8F5] min-h-[75vh] flex flex-col justify-center items-center px-4 text-center">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-5">
          <Heart size={24} className="text-red-400" strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-serif mb-3">Something Went Wrong</h2>
        <p className="text-xs text-neutral-500 max-w-sm mb-7">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-neutral-900 text-white px-7 py-3.5 text-xs uppercase tracking-wider font-semibold hover:bg-black transition rounded-xl"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="bg-[#FAF8F5] min-h-[75vh] flex flex-col justify-center items-center px-4 py-16 text-center text-neutral-900">
        <div className="w-16 h-16 rounded-full bg-white border border-neutral-200 flex items-center justify-center mb-6 shadow-sm text-neutral-400">
          <Heart size={28} strokeWidth={1.5} />
        </div>

        <h2 className="text-3xl font-serif mb-3 tracking-tight">
          Your Wishlist is Empty
        </h2>

        <p className="text-xs font-light text-neutral-500 max-w-sm mb-8 leading-relaxed">
          Explore our collection and save your favorite garments for later.
        </p>

        <button
          onClick={() => navigate('/shop')}
          className="bg-neutral-900 text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition shadow-md flex items-center gap-2 group rounded-xl"
        >
          Explore Collection
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-10 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 pb-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif tracking-tight">
              My Wishlist
            </h1>
          </div>
          <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'} Saved
          </span>
        </div>

        {/* SUCCESS MESSAGE */}
        {addedItem && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-semibold">
            <Check size={16} /> Item moved to your shopping bag
          </div>
        )}

        {/* WISHLIST GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {wishlistItems.map((item) => {
            const product = item.product;
            const removeLoading = actionLoading[`remove-${item.wishlistId}`];
            const cartLoading = actionLoading[`cart-${item.wishlistId}`];

            return (
              <div
                key={item.wishlistId}
                className="bg-white border border-neutral-200/80 group flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-500 rounded-xl overflow-hidden"
              >
                <div>
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                    <img
                      src={getImageUrl(product)}
                      alt={product.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-700 ease-out"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          'https://placehold.co/600x800?text=Garment';
                      }}
                    />

                    {/* Top Overlay Actions */}
                    <div className="absolute inset-x-0 top-0 p-3 flex justify-between items-start">
                      <span className="bg-white/90 backdrop-blur px-2.5 py-1 text-[9px] uppercase tracking-wider font-semibold text-neutral-600 rounded-md">
                        {product.category_name}
                      </span>

                      <button
                        onClick={() => handleRemove(item.wishlistId)}
                        disabled={removeLoading}
                        className="p-2 bg-white/95 backdrop-blur rounded-full shadow-sm hover:bg-red-50 text-neutral-600 hover:text-red-600 transition disabled:opacity-50"
                        title="Remove from wishlist"
                      >
                        {removeLoading ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} strokeWidth={1.5} />
                        )}
                      </button>
                    </div>

                    <button
                      onClick={() => handleViewProduct(product.id)}
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur text-neutral-900 px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold shadow-md rounded-lg"
                    >
                      <Eye size={13} /> Quick View
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="font-serif text-sm font-medium text-neutral-900 truncate">
                      {product.name}
                    </h3>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1 truncate">
                      {product.category_name}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <p className="font-serif text-sm font-bold text-[#8A6D46]">
                        ₹{Number(product.price).toLocaleString('en-IN')}
                      </p>

                      {product.stock !== null && product.stock !== undefined && (
                        <span
                          className={`text-[9px] uppercase tracking-wider font-semibold ${
                            Number(product.stock) > 0
                              ? 'text-emerald-700'
                              : 'text-red-600'
                          }`}
                        >
                          {Number(product.stock) > 0 ? 'In Stock' : 'Sold Out'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 space-y-2">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    disabled={cartLoading}
                    className="w-full bg-neutral-900 text-white py-3 text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-black transition flex items-center justify-center gap-2 disabled:opacity-60 rounded-xl"
                  >
                    {cartLoading ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} /> Move to Bag
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleViewProduct(product.id)}
                    className="w-full border border-neutral-200 text-neutral-800 py-3 text-[10px] font-bold uppercase tracking-[0.15em] hover:border-neutral-900 hover:bg-neutral-50 transition flex items-center justify-center gap-2 rounded-xl"
                  >
                    <Eye size={14} /> View Piece
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-14 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-serif text-lg text-neutral-900">
              Looking for something else?
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">
              Discover more pieces from our latest collection.
            </p>
          </div>

          <button
            onClick={() => navigate('/shop')}
            className="bg-white border border-neutral-300 text-neutral-900 px-7 py-3.5 text-xs uppercase tracking-widest font-bold hover:border-neutral-900 transition flex items-center gap-2 rounded-xl group"
          >
            Continue Shopping
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}