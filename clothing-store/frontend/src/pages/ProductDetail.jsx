// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { 
//   ShoppingBag, 
//   ShieldCheck, 
//   Truck, 
//   RefreshCw, 
//   Heart, 
//   Share2, 
//   ChevronDown, 
//   ChevronUp, 
//   Sparkles,
//   Check
// } from 'lucide-react';
// import { useCart } from '../context/CartContext';
// import API from '../services/api';

// export default function ProductDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { addToCart } = useCart();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [selectedColor, setSelectedColor] = useState('');
//   const [selectedImage, setSelectedImage] = useState('');
//   const [addedNotice, setAddedNotice] = useState(false);
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   // Accordion Toggles
//   const [openSection, setOpenSection] = useState('details'); // 'details' | 'care' | 'shipping'

//   // Helper function to dynamically construct absolute Image URLs
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return "https://via.placeholder.com/800x1000?text=Luxury+Collection";
//     if (imagePath.startsWith("http")) return imagePath;
//     return `http://127.0.0.1:8000${imagePath}`;
//   };

//   useEffect(() => {
//     API.get(`products/${id}/`)
//       .then((res) => {
//         setProduct(res.data);
        
//         if (res.data.image) {
//           setSelectedImage(getImageUrl(res.data.image));
//         }

//         const sizesArr = res.data.sizes ? res.data.sizes.split(',').map(s => s.trim()) : [];
//         const colorsArr = res.data.colors ? res.data.colors.split(',').map(c => c.trim()) : [];
//         if (sizesArr.length > 0) setSelectedSize(sizesArr[0]);
//         if (colorsArr.length > 0) setSelectedColor(colorsArr[0]);

//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] p-4 text-center">
//         <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mb-4"></div>
//         <p className="font-serif uppercase tracking-[0.3em] text-xs text-neutral-600">Curating Luxury Piece...</p>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] p-4 text-center">
//         <p className="font-serif text-xl text-neutral-800 mb-4">Masterpiece Not Found.</p>
//         <button 
//           onClick={() => navigate('/shop')}
//           className="text-xs uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-neutral-600 transition"
//         >
//           Return to Atelier
//         </button>
//       </div>
//     );
//   }

//   const sizes = product.sizes ? product.sizes.split(',').map((s) => s.trim()) : [];
//   const colors = product.colors ? product.colors.split(',').map((c) => c.trim()) : [];

//   const handleAddToCart = () => {
//     addToCart(product, selectedSize, selectedColor);
//     setAddedNotice(true);
//     setTimeout(() => setAddedNotice(false), 3500);
//   };

//   const toggleAccordion = (section) => {
//     setOpenSection(openSection === section ? null : section);
//   };

//   return (
//     <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 pt-4 sm:pt-6 pb-16 sm:pb-20 font-sans selection:bg-neutral-900 selection:text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
//         {/* Luxury Breadcrumb */}
//         <nav className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-400 mb-6 sm:mb-10 flex items-center gap-1.5 sm:gap-2 flex-wrap">
//           <span className="cursor-pointer hover:text-neutral-900 transition" onClick={() => navigate('/')}>Home</span>
//           <span>/</span>
//           <span className="cursor-pointer hover:text-neutral-900 transition" onClick={() => navigate('/shop')}>Boutique</span>
//           <span>/</span>
//           <span className="text-neutral-900 font-semibold tracking-[0.2em] truncate max-w-[150px] sm:max-w-none">{product.name}</span>
//         </nav>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
//           {/* LEFT COLUMN: Gallery View */}
//           <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 sm:gap-6">
            
//             {/* Thumbnails list */}
//             {product.images && product.images.length > 0 && (
//               <div className="flex md:flex-col gap-3 sm:gap-4 overflow-x-auto md:overflow-y-auto max-h-[680px] scrollbar-none pb-2 md:pb-0">
//                 <div 
//                   onClick={() => setSelectedImage(getImageUrl(product.image))}
//                   className={`w-16 h-20 sm:w-18 sm:h-24 flex-shrink-0 cursor-pointer overflow-hidden border transition-all duration-300 ${
//                     selectedImage === getImageUrl(product.image) 
//                       ? 'border-neutral-900 opacity-100 ring-1 ring-neutral-900' 
//                       : 'border-transparent opacity-60 hover:opacity-100'
//                   }`}
//                 >
//                   <img src={getImageUrl(product.image)} alt="Thumbnail" className="w-full h-full object-cover" />
//                 </div>

//                 {product.images.map((imgObj) => {
//                   const galleryUrl = getImageUrl(imgObj.image);
//                   return (
//                     <div
//                       key={imgObj.id}
//                       onClick={() => setSelectedImage(galleryUrl)}
//                       className={`w-16 h-20 sm:w-18 sm:h-24 flex-shrink-0 cursor-pointer overflow-hidden border transition-all duration-300 ${
//                         selectedImage === galleryUrl 
//                           ? 'border-neutral-900 opacity-100 ring-1 ring-neutral-900' 
//                           : 'border-transparent opacity-60 hover:opacity-100'
//                       }`}
//                     >
//                       <img src={galleryUrl} alt="Gallery Thumbnail" className="w-full h-full object-cover" />
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             {/* Main Featured Image Display */}
//             <div className="flex-1 aspect-[3/4] bg-neutral-200 overflow-hidden relative group shadow-sm">
//               <img
//                 src={selectedImage || getImageUrl(product.image)}
//                 alt={product.name}
//                 className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
//               />
              
//               {/* Badge */}
//               <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 text-[8px] sm:text-[9px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold text-neutral-800 flex items-center gap-1.5 border border-neutral-200/50">
//                 <Sparkles size={11} className="text-amber-700 shrink-0" /> Limited Edition
//               </div>

//               {/* Wishlist Floating Button */}
//               <button 
//                 onClick={() => setIsWishlisted(!isWishlisted)}
//                 className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-neutral-800 hover:bg-white transition duration-300 shadow-sm"
//               >
//                 <Heart size={18} className={isWishlisted ? "fill-red-700 text-red-700" : "text-neutral-800"} />
//               </button>
//             </div>
//           </div>

//           {/* RIGHT COLUMN: Product Details (Sticky) */}
//           <div className="lg:col-span-5 lg:sticky lg:top-8 flex flex-col">
            
//             {/* Category / Sub-heading */}
//             <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-500 font-semibold mb-2 sm:mb-3">
//               {product.category_name || 'Haute Couture'}
//             </span>

//             {/* Title */}
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-neutral-900 tracking-tight leading-tight mb-3 sm:mb-4">
//               {product.name}
//             </h1>

//             {/* Price */}
//             <div className="flex flex-wrap items-baseline gap-3 sm:gap-4 mb-5 sm:mb-6 border-b border-neutral-200/80 pb-5 sm:pb-6">
//               <span className="text-xl sm:text-2xl font-serif text-neutral-900">
//                 ₹{Number(product.price).toLocaleString()}
//               </span>
//               {product.original_price && (
//                 <span className="text-xs sm:text-sm text-neutral-400 line-through font-light">
//                   ₹{Number(product.original_price).toLocaleString()}
//                 </span>
//               )}
//               <span className="ml-auto text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-emerald-800 bg-emerald-50 px-2 sm:px-2.5 py-1 border border-emerald-200 shrink-0">
//                 In Stock & Ready to Ship
//               </span>
//             </div>

//             {/* Short Description */}
//             <p className="text-xs text-neutral-600 leading-relaxed font-light mb-6 sm:mb-8">
//               {product.description || "Crafted from fine textiles, designed to offer an exquisite silhouette with supreme comfort and unmatched elegance for elevated occasions."}
//             </p>

//             {/* Color Swatches */}
//             {colors.length > 0 && (
//               <div className="mb-5 sm:mb-6">
//                 <div className="flex justify-between items-center mb-2.5 sm:mb-3">
//                   <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-800">
//                     Shade: <span className="font-normal text-neutral-500">{selectedColor}</span>
//                   </span>
//                 </div>
//                 <div className="flex flex-wrap gap-2 sm:gap-2.5">
//                   {colors.map((c) => (
//                     <button
//                       key={c}
//                       onClick={() => setSelectedColor(c)}
//                       className={`px-3.5 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-light uppercase tracking-widest transition-all duration-200 border ${
//                         selectedColor === c 
//                           ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm' 
//                           : 'border-neutral-300 text-neutral-700 bg-transparent hover:border-neutral-900'
//                       }`}
//                     >
//                       {c}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Size Selector */}
//             {sizes.length > 0 && (
//               <div className="mb-6 sm:mb-8">
//                 <div className="flex justify-between items-center mb-2.5 sm:mb-3">
//                   <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-800">
//                     Select Size
//                   </span>
//                   <button className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] underline text-neutral-500 hover:text-neutral-900 transition">
//                     Size Guide
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
//                   {sizes.map((s) => (
//                     <button
//                       key={s}
//                       onClick={() => setSelectedSize(s)}
//                       className={`py-2.5 sm:py-3 text-[11px] sm:text-xs font-medium transition-all duration-200 border ${
//                         selectedSize === s 
//                           ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm' 
//                           : 'border-neutral-200/90 bg-white text-neutral-800 hover:border-neutral-900'
//                       }`}
//                     >
//                       {s}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Notification Alert */}
//             {addedNotice && (
//               <div className="mb-4 p-3 sm:p-3.5 bg-neutral-900 text-white text-[10px] sm:text-xs tracking-[0.2em] uppercase text-center font-medium flex items-center justify-center gap-2 animate-fadeIn">
//                 <Check size={15} className="text-emerald-400 shrink-0" /> Added to your Bag
//               </div>
//             )}

//             {/* Main Action Buttons */}
//             <div className="flex gap-2.5 sm:gap-3 mb-6 sm:mb-8">
//               <button
//                 onClick={handleAddToCart}
//                 className="flex-1 bg-neutral-900 text-white py-3.5 sm:py-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-neutral-800 active:scale-[0.99] transition duration-200 flex items-center justify-center gap-2 shadow-sm"
//               >
//                 <ShoppingBag size={16} /> Add to Bag
//               </button>
              
//               <button 
//                 className="w-12 sm:w-14 border border-neutral-300 flex items-center justify-center text-neutral-700 hover:border-neutral-900 transition shrink-0"
//                 title="Share Item"
//                 onClick={() => navigator.clipboard.writeText(window.location.href)}
//               >
//                 <Share2 size={18} />
//               </button>
//             </div>

//             {/* Luxury Accordion Section */}
//             <div className="border-t border-neutral-200 divide-y divide-neutral-200 text-xs">
              
//               {/* Accordion 1: Details */}
//               <div className="py-3.5 sm:py-4">
//                 <button 
//                   onClick={() => toggleAccordion('details')}
//                   className="w-full flex justify-between items-center text-left font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-neutral-900 text-[11px] sm:text-xs"
//                 >
//                   <span>Composition & Atelier Details</span>
//                   {openSection === 'details' ? <ChevronUp size={16} className="shrink-0" /> : <ChevronDown size={16} className="shrink-0" />}
//                 </button>
//                 {openSection === 'details' && (
//                   <p className="mt-2.5 sm:mt-3 text-neutral-600 leading-relaxed font-light pl-0.5 text-xs">
//                     Hand-crafted with luxury tailored perfection. Designed for optimum durability and movement. Features custom tonal stitching and signature modern elegance.
//                   </p>
//                 )}
//               </div>

//               {/* Accordion 2: Care */}
//               <div className="py-3.5 sm:py-4">
//                 <button 
//                   onClick={() => toggleAccordion('care')}
//                   className="w-full flex justify-between items-center text-left font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-neutral-900 text-[11px] sm:text-xs"
//                 >
//                   <span>Fabric & Care Instructions</span>
//                   {openSection === 'care' ? <ChevronUp size={16} className="shrink-0" /> : <ChevronDown size={16} className="shrink-0" />}
//                 </button>
//                 {openSection === 'care' && (
//                   <p className="mt-2.5 sm:mt-3 text-neutral-600 leading-relaxed font-light pl-0.5 text-xs">
//                     {product.fabric_care || "Dry clean only. Preserve in a cool, dark wardrobe with padded garment hangers to retain pristine luxury structure."}
//                   </p>
//                 )}
//               </div>

//               {/* Accordion 3: Shipping */}
//               <div className="py-3.5 sm:py-4">
//                 <button 
//                   onClick={() => toggleAccordion('shipping')}
//                   className="w-full flex justify-between items-center text-left font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-neutral-900 text-[11px] sm:text-xs"
//                 >
//                   <span>Delivery & Returns</span>
//                   {openSection === 'shipping' ? <ChevronUp size={16} className="shrink-0" /> : <ChevronDown size={16} className="shrink-0" />}
//                 </button>
//                 {openSection === 'shipping' && (
//                   <p className="mt-2.5 sm:mt-3 text-neutral-600 leading-relaxed font-light pl-0.5 text-xs">
//                     Complimentary express shipping across all regional codes. Enjoy 14-day hassle-free door-step returns and size exchanges.
//                   </p>
//                 )}
//               </div>

//             </div>

//             {/* Trust Badges Bar */}
//             <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center pt-6 sm:pt-8 mt-2 border-t border-neutral-200 text-[9px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-neutral-600">
//               <div className="flex flex-col items-center gap-1.5"><Truck size={18} className="text-neutral-800 shrink-0" /> Free Delivery</div>
//               <div className="flex flex-col items-center gap-1.5"><RefreshCw size={18} className="text-neutral-800 shrink-0" /> 14 Days Return</div>
//               <div className="flex flex-col items-center gap-1.5"><ShieldCheck size={18} className="text-neutral-800 shrink-0" /> Authentic Item</div>
//             </div>

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }







// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { 
//   ShoppingBag, 
//   ShieldCheck, 
//   Truck, 
//   RefreshCw, 
//   Heart, 
//   Share2, 
//   ChevronDown, 
//   ChevronUp, 
//   Sparkles,
//   Check
// } from 'lucide-react';
// import { useCart } from '../context/CartContext';
// import API, { getWishlist, addToWishlist, removeFromWishlist } from '../services/api';

// export default function ProductDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { addToCart } = useCart();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [selectedColor, setSelectedColor] = useState('');
//   const [selectedImage, setSelectedImage] = useState('');
//   const [addedNotice, setAddedNotice] = useState(false);
//   const [wishlistId, setWishlistId] = useState(null);

//   // Accordion Toggles
//   const [openSection, setOpenSection] = useState('details');

//   // Helper function to dynamically construct absolute Image URLs
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return "https://placehold.co/800x1000?text=Luxury+Collection";
//     if (typeof imagePath === 'string' && (imagePath.startsWith("http://") || imagePath.startsWith("https://"))) {
//       return imagePath;
//     }
//     return `https://clothing-backend-gynt.onrender.com${imagePath}`;
//   };

//   useEffect(() => {
//     setLoading(true);

//     // Fetch Product Data
//     API.get(`products/${id}/`)
//       .then((res) => {
//         setProduct(res.data);

//         // Initial Main Image Setup
//         if (res.data.image) {
//           setSelectedImage(getImageUrl(res.data.image));
//         } else if (res.data.images && res.data.images.length > 0) {
//           setSelectedImage(getImageUrl(res.data.images[0].image));
//         }

//         // Set default size & color options
//         const sizesArr = res.data.sizes ? res.data.sizes.split(',').map(s => s.trim()) : [];
//         const colorsArr = res.data.colors ? res.data.colors.split(',').map(c => c.trim()) : [];
//         if (sizesArr.length > 0) setSelectedSize(sizesArr[0]);
//         if (colorsArr.length > 0) setSelectedColor(colorsArr[0]);

//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching product:", err);
//         setLoading(false);
//       });

//     // Check if item exists in user's Wishlist
//     const token = localStorage.getItem('access_token');
//     if (token) {
//       getWishlist()
//         .then((res) => {
//           const list = Array.isArray(res.data) ? res.data : res.data.results || [];
//           const found = list.find((item) => {
//             const pId = typeof item.product === 'object' ? item.product.id : item.product;
//             return String(pId) === String(id);
//           });
//           if (found) {
//             setWishlistId(found.id);
//           }
//         })
//         .catch((err) => console.error("Wishlist fetch error:", err));
//     }
//   }, [id]);

//   // Wishlist Handler
//   const handleWishlistToggle = async () => {
//     const token = localStorage.getItem('access_token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     try {
//       if (wishlistId) {
//         await removeFromWishlist(wishlistId);
//         setWishlistId(null);
//       } else {
//         const res = await addToWishlist(id);
//         setWishlistId(res.data.id);
//       }
//     } catch (err) {
//       console.error("Wishlist operation failed:", err);
//     }
//   };

//   const handleAddToCart = () => {
//     addToCart(product, selectedSize, selectedColor);
//     setAddedNotice(true);
//     setTimeout(() => setAddedNotice(false), 3500);
//   };

//   const toggleAccordion = (section) => {
//     setOpenSection(openSection === section ? null : section);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] p-4 text-center">
//         <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mb-4"></div>
//         <p className="font-serif uppercase tracking-[0.3em] text-xs text-neutral-600">Curating Luxury Piece...</p>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] p-4 text-center">
//         <p className="font-serif text-xl text-neutral-800 mb-4">Masterpiece Not Found.</p>
//         <button 
//           onClick={() => navigate('/shop')}
//           className="text-xs uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-neutral-600 transition"
//         >
//           Return to Atelier
//         </button>
//       </div>
//     );
//   }

//   const sizes = product.sizes ? product.sizes.split(',').map((s) => s.trim()) : [];
//   const colors = product.colors ? product.colors.split(',').map((c) => c.trim()) : [];

//   return (
//     <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 pt-8 sm:pt-12 pb-20 font-sans selection:bg-neutral-900 selection:text-white">
//       <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12">
        
//         {/* Luxury Breadcrumb with proper top margin */}
//         <nav className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-400 mb-8 sm:mb-12 flex items-center gap-2 flex-wrap">
//           <span className="cursor-pointer hover:text-neutral-900 transition" onClick={() => navigate('/')}>Home</span>
//           <span>/</span>
//           <span className="cursor-pointer hover:text-neutral-900 transition" onClick={() => navigate('/shop')}>Boutique</span>
//           <span>/</span>
//           <span className="text-neutral-900 font-semibold tracking-[0.2em] truncate max-w-[200px] sm:max-w-none">{product.name}</span>
//         </nav>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
//           {/* LEFT COLUMN: Gallery View */}
//           <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-5">
            
//             {/* Thumbnails list */}
//             {((product.image) || (product.images && product.images.length > 0)) && (
//               <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto max-h-[680px] scrollbar-none pb-2 md:pb-0">
//                 {product.image && (
//                   <div 
//                     onClick={() => setSelectedImage(getImageUrl(product.image))}
//                     className={`w-18 h-24 sm:w-20 sm:h-28 flex-shrink-0 cursor-pointer overflow-hidden border transition-all duration-300 shadow-sm ${
//                       selectedImage === getImageUrl(product.image) 
//                         ? 'border-neutral-900 opacity-100 ring-1 ring-neutral-900' 
//                         : 'border-transparent opacity-60 hover:opacity-100'
//                     }`}
//                   >
//                     <img src={getImageUrl(product.image)} alt="Main Thumbnail" className="w-full h-full object-cover" />
//                   </div>
//                 )}

//                 {product.images && product.images.map((imgObj) => {
//                   const galleryUrl = getImageUrl(imgObj.image);
//                   return (
//                     <div
//                       key={imgObj.id}
//                       onClick={() => setSelectedImage(galleryUrl)}
//                       className={`w-18 h-24 sm:w-20 sm:h-28 flex-shrink-0 cursor-pointer overflow-hidden border transition-all duration-300 shadow-sm ${
//                         selectedImage === galleryUrl 
//                           ? 'border-neutral-900 opacity-100 ring-1 ring-neutral-900' 
//                           : 'border-transparent opacity-60 hover:opacity-100'
//                       }`}
//                     >
//                       <img src={galleryUrl} alt={imgObj.alt_text || "Gallery Thumbnail"} className="w-full h-full object-cover" />
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             {/* Main Featured Image Display */}
//             <div className="flex-1 aspect-[3/4] bg-neutral-200 overflow-hidden relative group shadow-md border border-neutral-200/80">
//               <img
//                 src={selectedImage || getImageUrl(product.image)}
//                 alt={product.name}
//                 className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
//                 onError={(e) => { e.target.src = "https://placehold.co/800x1000?text=Haute+Couture"; }}
//               />
              
//               {/* Badge */}
//               {product.is_featured && (
//                 <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 text-[9px] uppercase tracking-[0.3em] font-semibold text-neutral-800 flex items-center gap-1.5 border border-neutral-200 shadow-sm">
//                   <Sparkles size={11} className="text-amber-700 shrink-0" /> Limited Edition
//                 </div>
//               )}

//               {/* Wishlist Floating Button */}
//               <button 
//                 onClick={handleWishlistToggle}
//                 className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-800 hover:bg-white transition duration-300 shadow-md"
//               >
//                 <Heart size={18} className={wishlistId ? "fill-red-700 text-red-700" : "text-neutral-800"} />
//               </button>
//             </div>
//           </div>

//           {/* RIGHT COLUMN: Product Details (Sticky) */}
//           <div className="lg:col-span-5 lg:sticky lg:top-10 flex flex-col">
            
//             {/* Category */}
//             <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-500 font-semibold mb-3">
//               {product.category_name || 'Haute Couture'}
//             </span>

//             {/* Title */}
//             <h1 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight leading-tight mb-4">
//               {product.name}
//             </h1>

//             {/* Price */}
//             <div className="flex flex-wrap items-baseline gap-4 mb-6 border-b border-neutral-200 pb-6">
//               <span className="text-2xl font-serif text-neutral-900">
//                 ₹{Number(product.price).toLocaleString('en-IN')}
//               </span>
//               {product.original_price && (
//                 <span className="text-sm text-neutral-400 line-through font-light">
//                   ₹{Number(product.original_price).toLocaleString('en-IN')}
//                 </span>
//               )}
//               <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-emerald-800 bg-emerald-50 px-3 py-1 border border-emerald-200 shrink-0 font-medium">
//                 In Stock & Ready
//               </span>
//             </div>

//             {/* Short Description */}
//             <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light mb-8">
//               {product.description || "Crafted from fine textiles, designed to offer an exquisite silhouette with supreme comfort and unmatched elegance for elevated occasions."}
//             </p>

//             {/* Color Swatches */}
//             {colors.length > 0 && (
//               <div className="mb-6">
//                 <div className="flex justify-between items-center mb-3">
//                   <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-800">
//                     Shade: <span className="font-normal text-neutral-500">{selectedColor}</span>
//                   </span>
//                 </div>
//                 <div className="flex flex-wrap gap-3">
//                   {colors.map((c) => (
//                     <button
//                       key={c}
//                       onClick={() => setSelectedColor(c)}
//                       className={`px-4 py-2.5 text-xs font-light uppercase tracking-widest transition-all duration-200 border ${
//                         selectedColor === c 
//                           ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm' 
//                           : 'border-neutral-300 text-neutral-700 bg-white hover:border-neutral-900'
//                       }`}
//                     >
//                       {c}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Size Selector */}
//             {sizes.length > 0 && (
//               <div className="mb-8">
//                 <div className="flex justify-between items-center mb-3">
//                   <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-800">
//                     Select Size
//                   </span>
//                   <button className="text-[10px] uppercase tracking-[0.2em] underline text-neutral-500 hover:text-neutral-900 transition">
//                     Size Guide
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-4 gap-3">
//                   {sizes.map((s) => (
//                     <button
//                       key={s}
//                       onClick={() => setSelectedSize(s)}
//                       className={`py-3 text-xs font-medium transition-all duration-200 border ${
//                         selectedSize === s 
//                           ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm' 
//                           : 'border-neutral-300 bg-white text-neutral-800 hover:border-neutral-900'
//                       }`}
//                     >
//                       {s}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Notification Alert */}
//             {addedNotice && (
//               <div className="mb-5 p-3.5 bg-neutral-900 text-white text-xs tracking-[0.2em] uppercase text-center font-medium flex items-center justify-center gap-2 shadow-md">
//                 <Check size={16} className="text-emerald-400 shrink-0" /> Added to your Bag
//               </div>
//             )}

//             {/* Main Action Buttons */}
//             <div className="flex gap-3 mb-8">
//               <button
//                 onClick={handleAddToCart}
//                 className="flex-1 bg-neutral-900 text-white py-4 text-xs font-semibold uppercase tracking-[0.25em] hover:bg-black active:scale-[0.99] transition duration-200 flex items-center justify-center gap-2.5 shadow-md"
//               >
//                 <ShoppingBag size={16} /> Add to Bag
//               </button>
              
//               <button 
//                 className="w-14 border border-neutral-300 bg-white flex items-center justify-center text-neutral-700 hover:border-neutral-900 transition shrink-0 shadow-sm"
//                 title="Share Item"
//                 onClick={() => navigator.clipboard.writeText(window.location.href)}
//               >
//                 <Share2 size={18} />
//               </button>
//             </div>

//             {/* Luxury Accordion Section */}
//             <div className="border-t border-neutral-200 divide-y divide-neutral-200 text-xs">
              
//               {/* Accordion 1: Details */}
//               <div className="py-4">
//                 <button 
//                   onClick={() => toggleAccordion('details')}
//                   className="w-full flex justify-between items-center text-left font-semibold uppercase tracking-[0.2em] text-neutral-900 text-xs"
//                 >
//                   <span>Composition & Atelier Details</span>
//                   {openSection === 'details' ? <ChevronUp size={16} className="shrink-0" /> : <ChevronDown size={16} className="shrink-0" />}
//                 </button>
//                 {openSection === 'details' && (
//                   <p className="mt-3 text-neutral-600 leading-relaxed font-light text-xs">
//                     Hand-crafted with luxury tailored perfection. Designed for optimum durability and movement. Features custom tonal stitching and signature modern elegance.
//                   </p>
//                 )}
//               </div>

//               {/* Accordion 2: Care */}
//               <div className="py-4">
//                 <button 
//                   onClick={() => toggleAccordion('care')}
//                   className="w-full flex justify-between items-center text-left font-semibold uppercase tracking-[0.2em] text-neutral-900 text-xs"
//                 >
//                   <span>Fabric & Care Instructions</span>
//                   {openSection === 'care' ? <ChevronUp size={16} className="shrink-0" /> : <ChevronDown size={16} className="shrink-0" />}
//                 </button>
//                 {openSection === 'care' && (
//                   <p className="mt-3 text-neutral-600 leading-relaxed font-light text-xs">
//                     {product.fabric_care || "Dry clean only. Preserve in a cool, dark wardrobe with padded garment hangers to retain pristine luxury structure."}
//                   </p>
//                 )}
//               </div>

//               {/* Accordion 3: Shipping */}
//               <div className="py-4">
//                 <button 
//                   onClick={() => toggleAccordion('shipping')}
//                   className="w-full flex justify-between items-center text-left font-semibold uppercase tracking-[0.2em] text-neutral-900 text-xs"
//                 >
//                   <span>Delivery & Returns</span>
//                   {openSection === 'shipping' ? <ChevronUp size={16} className="shrink-0" /> : <ChevronDown size={16} className="shrink-0" />}
//                 </button>
//                 {openSection === 'shipping' && (
//                   <p className="mt-3 text-neutral-600 leading-relaxed font-light text-xs">
//                     Complimentary express shipping across all regional codes. Enjoy 14-day hassle-free door-step returns and size exchanges.
//                   </p>
//                 )}
//               </div>

//             </div>

//             {/* Trust Badges Bar */}
//             <div className="grid grid-cols-3 gap-2 text-center pt-8 mt-4 border-t border-neutral-200 text-[10px] uppercase tracking-[0.15em] text-neutral-600 font-medium">
//               <div className="flex flex-col items-center gap-1.5"><Truck size={18} className="text-neutral-800 shrink-0" /> Free Delivery</div>
//               <div className="flex flex-col items-center gap-1.5"><RefreshCw size={18} className="text-neutral-800 shrink-0" /> 14 Days Return</div>
//               <div className="flex flex-col items-center gap-1.5"><ShieldCheck size={18} className="text-neutral-800 shrink-0" /> Authentic Item</div>
//             </div>

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }






import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Heart, 
  Sparkles,
  Check,
  Star
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import API, { getWishlist, addToWishlist, removeFromWishlist } from '../services/api';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [addedNotice, setAddedNotice] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Reviews State
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Vrushali P.', rating: 5, date: 'May 12, 2026', comment: 'Absolute masterpiece! The fabric quality and embroidery are stunning.' },
    { id: 2, name: 'Aarav M.', rating: 4, date: 'April 28, 2026', comment: 'Great fitting and premium texture. Worth the luxury price.' }
  ]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://placehold.co/800x1000?text=Luxury+Collection";
    if (typeof imagePath === 'string' && (imagePath.startsWith("http://") || imagePath.startsWith("https://"))) {
      return imagePath;
    }
    return `https://clothing-backend-gynt.onrender.com${imagePath}`;
  };

  useEffect(() => {
    setLoading(true);

    API.get(`products/${id}/`)
      .then((res) => {
        setProduct(res.data);

        if (res.data.image) {
          setSelectedImage(getImageUrl(res.data.image));
        } else if (res.data.images && res.data.images.length > 0) {
          setSelectedImage(getImageUrl(res.data.images[0].image));
        }

        const sizesArr = res.data.sizes ? res.data.sizes.split(',').map(s => s.trim()) : [];
        const colorsArr = res.data.colors ? res.data.colors.split(',').map(c => c.trim()) : [];
        if (sizesArr.length > 0) setSelectedSize(sizesArr[0]);
        if (colorsArr.length > 0) setSelectedColor(colorsArr[0]);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });

    const token = localStorage.getItem('access_token');
    if (token) {
      getWishlist()
        .then((res) => {
          const list = Array.isArray(res.data) ? res.data : res.data.results || [];
          const found = list.find((item) => {
            const pId = typeof item.product === 'object' ? item.product.id : item.product;
            return String(pId) === String(id);
          });
          if (found) {
            setWishlistId(found.id);
          }
        })
        .catch((err) => console.error("Wishlist fetch error:", err));
    }
  }, [id]);

  const handleWishlistToggle = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      if (wishlistId) {
        await removeFromWishlist(wishlistId);
        setWishlistId(null);
      } else {
        const res = await addToWishlist(id);
        setWishlistId(res.data.id);
      }
    } catch (err) {
      console.error("Wishlist operation failed:", err);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3500);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const reviewObj = {
      id: Date.now(),
      name: newReview.name,
      rating: Number(newReview.rating),
      date: 'Today',
      comment: newReview.comment
    };

    setReviews([reviewObj, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '' });
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5EFEB] p-4 text-center">
        <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-serif uppercase tracking-[0.3em] text-xs text-neutral-600">Curating Luxury Piece...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5EFEB] p-4 text-center">
        <p className="font-serif text-xl text-neutral-800 mb-4">Masterpiece Not Found.</p>
        <button 
          onClick={() => navigate('/shop')}
          className="text-xs uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-neutral-600 transition"
        >
          Return to Atelier
        </button>
      </div>
    );
  }

  const sizes = product.sizes ? product.sizes.split(',').map((s) => s.trim()) : [];
  const colors = product.colors ? product.colors.split(',').map((c) => c.trim()) : [];

  const getColorHex = (colorName) => {
    const name = colorName.toLowerCase();
    if (name.includes('black')) return '#1a1a1a';
    if (name.includes('white')) return '#f4f4f4';
    if (name.includes('beige') || name.includes('cream') || name.includes('nude')) return '#d8c2a3';
    if (name.includes('green')) return '#7a8b79';
    if (name.includes('blue')) return '#6b829c';
    if (name.includes('red')) return '#a84c4c';
    if (name.includes('brown')) return '#8c6752';
    return '#c5b5a4';
  };

  // Average Rating Calculation
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="bg-[#F5EFEB] min-h-screen text-[#2C241D] py-12 px-4 sm:px-8 lg:px-16 font-sans relative">
      <div className="max-w-[1350px] mx-auto bg-[#FAF7F2] rounded-[2.5rem] shadow-xl border border-[#EBE3D5] p-8 sm:p-12 lg:p-16 relative">
        
        {/* Breadcrumb */}
        <nav className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 mb-10 flex items-center gap-2">
          <span className="cursor-pointer hover:text-neutral-900" onClick={() => navigate('/')}>Home</span>
          <span>/</span>
          <span className="cursor-pointer hover:text-neutral-900" onClick={() => navigate('/shop')}>Shop</span>
          <span>/</span>
          <span className="text-neutral-800 font-medium">{product.category_name || 'Haute Couture'}</span>
        </nav>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Gallery Stack */}
          <div className="lg:col-span-3 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {product.image && (
              <div 
                onClick={() => setSelectedImage(getImageUrl(product.image))}
                className={`bg-white p-3 rounded-2xl cursor-pointer border transition-all shadow-sm ${
                  selectedImage === getImageUrl(product.image) ? 'border-neutral-900 ring-2 ring-neutral-900/10 shadow-md' : 'border-[#E8DFD1] opacity-75 hover:opacity-100'
                }`}
              >
                <img src={getImageUrl(product.image)} alt="Thumb" className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl mx-auto mb-2" />
                <span className="text-[11px] font-serif font-semibold block text-center text-neutral-800">₹{Number(product.price).toLocaleString('en-IN')}</span>
              </div>
            )}

            {product.images && product.images.map((imgObj) => {
              const galleryUrl = getImageUrl(imgObj.image);
              return (
                <div
                  key={imgObj.id}
                  onClick={() => setSelectedImage(galleryUrl)}
                  className={`bg-white p-3 rounded-2xl cursor-pointer border transition-all shadow-sm ${
                    selectedImage === galleryUrl ? 'border-neutral-900 ring-2 ring-neutral-900/10 shadow-md' : 'border-[#E8DFD1] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={galleryUrl} alt="Thumb" className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl mx-auto mb-2" />
                  <span className="text-[11px] font-serif font-semibold block text-center text-neutral-800">₹{Number(product.price).toLocaleString('en-IN')}</span>
                </div>
              );
            })}
          </div>

          {/* Center Info */}
          <div className="lg:col-span-5 flex flex-col justify-center lg:px-4">
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2C241D] leading-[1.15] mb-3">
              {product.name}
            </h1>

            {/* Rating Stars Summary Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(avgRating) ? "fill-amber-500" : "text-neutral-300"} />
                ))}
              </div>
              <span className="text-xs font-semibold text-neutral-700">{avgRating}</span>
              <span className="text-xs text-neutral-400">({reviews.length} Client Reviews)</span>
            </div>

            <div className="text-2xl sm:text-3xl font-serif text-[#2C241D] mb-4">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed mb-8 max-w-md">
              {product.description || "Lightweight and elegant piece crafted with precision, perfect for sunny days and graceful occasions."}
            </p>

            {/* Color Selector */}
            {colors.length > 0 && (
              <div className="mb-6">
                <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-600 block mb-2.5">Color</label>
                <div className="flex items-center gap-3">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      style={{ backgroundColor: getColorHex(c) }}
                      className={`w-8 h-8 rounded-full border-2 transition-all shadow-sm ${
                        selectedColor === c ? 'border-neutral-900 scale-110 ring-2 ring-neutral-900/20' : 'border-white hover:scale-105'
                      }`}
                      title={c}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {sizes.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-600">Size</label>
                  <button 
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-500 underline hover:text-neutral-900 transition"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-11 h-11 rounded-full text-xs font-medium transition-all flex items-center justify-center border ${
                        selectedSize === s 
                          ? 'bg-[#C8A882] border-[#C8A882] text-white shadow-md' 
                          : 'bg-white border-[#E5DDD0] text-neutral-800 hover:border-neutral-900'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {addedNotice && (
              <div className="mb-4 p-3 bg-neutral-900 text-white text-xs tracking-widest uppercase text-center font-medium rounded-xl flex items-center justify-center gap-2">
                <Check size={14} className="text-emerald-400" /> Added to your Bag
              </div>
            )}

            <div className="flex items-center gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#C8A882] hover:bg-[#B89872] text-white py-4 px-8 text-xs font-semibold uppercase tracking-[0.25em] rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} /> Add to Cart
              </button>

              <button
                onClick={handleWishlistToggle}
                className="w-14 h-14 bg-white border border-[#E5DDD0] hover:border-neutral-900 rounded-2xl flex items-center justify-center text-neutral-800 shadow-sm transition-all"
                title="Wishlist"
              >
                <Heart size={20} className={wishlistId ? "fill-red-600 text-red-600" : "text-neutral-700"} />
              </button>
            </div>

          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-4 relative flex items-center justify-center min-h-[450px]">
            <div className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] bg-[#EFE6D8] rounded-full blur-3xl opacity-70 z-0" />
            <img
              src={selectedImage || getImageUrl(product.image)}
              alt={product.name}
              className="relative z-10 w-full max-h-[500px] object-cover object-top rounded-[2rem] shadow-2xl hover:scale-105 transition-transform duration-700"
              onError={(e) => { e.target.src = "https://placehold.co/800x1000?text=Haute+Couture"; }}
            />
          </div>

        </div>

        {/* ================= REVIEWS & RATINGS SECTION ================= */}
        <div className="mt-20 pt-12 border-t border-[#EBE3D5]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Review List & Average Summary */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold block mb-1">Client Feedback</span>
                <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900">Ratings & Reviews</h3>
              </div>

              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-white/80 border border-[#EFE8DC] p-6 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-serif text-sm font-semibold text-neutral-900">{rev.name}</h4>
                        <div className="flex text-amber-500 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className={i < rev.rating ? "fill-amber-500" : "text-neutral-300"} />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-neutral-400 tracking-wider">{rev.date}</span>
                    </div>
                    <p className="text-xs text-neutral-600 font-light leading-relaxed mt-2">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Write a Review Form */}
            <div className="lg:col-span-5 bg-white border border-[#EFE8DC] p-8 rounded-3xl shadow-sm">
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold block mb-1">Share Your Experience</span>
              <h3 className="font-serif text-xl text-neutral-900 mb-6">Write a Review</h3>

              {reviewSubmitted && (
                <div className="mb-4 p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs tracking-wider text-center font-medium rounded-xl">
                  Thank you! Your review has been added successfully.
                </div>
              )}

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-semibold mb-1.5">Your Name</label>
                  <input 
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="e.g. Vrushali"
                    className="w-full bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl p-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-semibold mb-1.5">Rating (1 to 5 Stars)</label>
                  <select 
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl p-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                  >
                    <option value={5}>★★★★★ (5 Stars - Exceptional)</option>
                    <option value={4}>★★★★☆ (4 Stars - Excellent)</option>
                    <option value={3}>★★★☆☆ (3 Stars - Good)</option>
                    <option value={2}>★★☆☆☆ (2 Stars - Fair)</option>
                    <option value={1}>★☆☆☆☆ (1 Star - Poor)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-semibold mb-1.5">Your Review Comment</label>
                  <textarea 
                    rows="3"
                    required
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Describe the fabric quality, fitting, and your overall experience..."
                    className="w-full bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl p-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-neutral-900 text-white py-3.5 text-[10px] font-semibold uppercase tracking-[0.25em] hover:bg-black transition rounded-xl shadow-md"
                >
                  Submit Review
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Bottom Trust Badges */}
        <div className="mt-16 pt-8 border-t border-[#EBE3D5] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-3 bg-white/60 p-4 rounded-2xl border border-[#EFE8DC]">
            <Sparkles size={18} className="text-[#C8A882] shrink-0" />
            <div className="text-left">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900">Light & Breathable</h4>
              <p className="text-[10px] text-neutral-500">Comfort all day</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 bg-white/60 p-4 rounded-2xl border border-[#EFE8DC]">
            <ShieldCheck size={18} className="text-[#C8A882] shrink-0" />
            <div className="text-left">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900">Quality You Trust</h4>
              <p className="text-[10px] text-neutral-500">Premium materials</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 bg-white/60 p-4 rounded-2xl border border-[#EFE8DC]">
            <Truck size={18} className="text-[#C8A882] shrink-0" />
            <div className="text-left">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900">Free Shipping</h4>
              <p className="text-[10px] text-neutral-500">On orders over ₹999</p>
            </div>
          </div>
        </div>

      </div>

      {/* Size Guide Modal Popup */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#FAF7F2] border border-[#EBE3D5] max-w-md w-full p-6 sm:p-8 relative shadow-2xl rounded-3xl">
            <button 
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-5 right-6 text-neutral-500 hover:text-black text-xs uppercase tracking-widest font-bold"
            >
              ✕ Close
            </button>
            
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold block mb-1">Atelier Measurements</span>
            <h3 className="font-serif text-2xl text-neutral-900 mb-6">Size Guide (Inches)</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs mb-6 border-collapse">
                <thead>
                  <tr className="border-b border-neutral-300 text-neutral-500 uppercase tracking-widest text-[9px]">
                    <th className="py-2.5">Size</th>
                    <th className="py-2.5">Chest</th>
                    <th className="py-2.5">Waist</th>
                    <th className="py-2.5">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-neutral-800">
                  <tr>
                    <td className="py-2.5 font-bold">S</td>
                    <td className="py-2.5">36-38"</td>
                    <td className="py-2.5">30-32"</td>
                    <td className="py-2.5">40"</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold">M</td>
                    <td className="py-2.5">38-40"</td>
                    <td className="py-2.5">32-34"</td>
                    <td className="py-2.5">41"</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold">L</td>
                    <td className="py-2.5">40-42"</td>
                    <td className="py-2.5">34-36"</td>
                    <td className="py-2.5">42"</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold">XL</td>
                    <td className="py-2.5">42-44"</td>
                    <td className="py-2.5">36-38"</td>
                    <td className="py-2.5">43"</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[10px] text-neutral-500 font-light leading-relaxed">
              * Measurements are given in inches. For custom tailoring inquiries, please contact our concierge support.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}