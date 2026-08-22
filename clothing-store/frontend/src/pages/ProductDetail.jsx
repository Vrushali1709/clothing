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







// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { 
//   ShoppingBag, 
//   ShieldCheck, 
//   Truck, 
//   RefreshCw, 
//   Heart, 
//   Share2, 
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
//   const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false); // 👈 Size Guide Modal State

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

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5EFEB] p-4 text-center">
//         <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mb-4"></div>
//         <p className="font-serif uppercase tracking-[0.3em] text-xs text-neutral-600">Curating Luxury Piece...</p>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5EFEB] p-4 text-center">
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

//   // Helper for color circles styling
//   const getColorHex = (colorName) => {
//     const name = colorName.toLowerCase();
//     if (name.includes('black')) return '#1a1a1a';
//     if (name.includes('white')) return '#f4f4f4';
//     if (name.includes('beige') || name.includes('cream') || name.includes('nude')) return '#d8c2a3';
//     if (name.includes('green')) return '#7a8b79';
//     if (name.includes('blue')) return '#6b829c';
//     if (name.includes('red')) return '#a84c4c';
//     if (name.includes('brown')) return '#8c6752';
//     return '#c5b5a4';
//   };

//   return (
//     <div className="bg-[#F5EFEB] min-h-screen text-[#2C241D] py-12 px-4 sm:px-8 lg:px-16 font-sans relative">
//       <div className="max-w-[1350px] mx-auto bg-[#FAF7F2] rounded-[2.5rem] shadow-xl border border-[#EBE3D5] p-8 sm:p-12 lg:p-16 relative">
        
//         {/* Breadcrumb */}
//         <nav className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 mb-10 flex items-center gap-2">
//           <span className="cursor-pointer hover:text-neutral-900" onClick={() => navigate('/')}>Home</span>
//           <span>/</span>
//           <span className="cursor-pointer hover:text-neutral-900" onClick={() => navigate('/shop')}>Dresses</span>
//           <span>/</span>
//           <span className="text-neutral-800 font-medium">{product.category_name || 'Daily Wear'}</span>
//         </nav>

//         {/* 3-Column Layout: Left Gallery | Center Info | Right Image Showcase */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
//           {/* 1. LEFT COLUMN: Gallery Cards Stack */}
//           <div className="lg:col-span-3 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
//             {product.image && (
//               <div 
//                 onClick={() => setSelectedImage(getImageUrl(product.image))}
//                 className={`bg-white p-3 rounded-2xl cursor-pointer border transition-all shadow-sm ${
//                   selectedImage === getImageUrl(product.image) ? 'border-neutral-900 ring-2 ring-neutral-900/10 shadow-md' : 'border-[#E8DFD1] opacity-75 hover:opacity-100'
//                 }`}
//               >
//                 <img src={getImageUrl(product.image)} alt="Thumb" className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl mx-auto mb-2" />
//                 <span className="text-[11px] font-serif font-semibold block text-center text-neutral-800">₹{Number(product.price).toLocaleString('en-IN')}</span>
//               </div>
//             )}

//             {product.images && product.images.map((imgObj) => {
//               const galleryUrl = getImageUrl(imgObj.image);
//               return (
//                 <div
//                   key={imgObj.id}
//                   onClick={() => setSelectedImage(galleryUrl)}
//                   className={`bg-white p-3 rounded-2xl cursor-pointer border transition-all shadow-sm ${
//                     selectedImage === galleryUrl ? 'border-neutral-900 ring-2 ring-neutral-900/10 shadow-md' : 'border-[#E8DFD1] opacity-75 hover:opacity-100'
//                   }`}
//                 >
//                   <img src={galleryUrl} alt="Thumb" className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl mx-auto mb-2" />
//                   <span className="text-[11px] font-serif font-semibold block text-center text-neutral-800">₹{Number(product.price).toLocaleString('en-IN')}</span>
//                 </div>
//               );
//             })}
//           </div>

//           {/* 2. CENTER COLUMN: Details, Color, Size, and CTA */}
//           <div className="lg:col-span-5 flex flex-col justify-center lg:px-4">
            
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2C241D] leading-[1.15] mb-3">
//               {product.name}
//             </h1>

//             <div className="text-2xl sm:text-3xl font-serif text-[#2C241D] mb-4">
//               ₹{Number(product.price).toLocaleString('en-IN')}
//             </div>

//             <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed mb-8 max-w-md">
//               {product.description || "Lightweight and elegant piece crafted with precision, perfect for sunny days and graceful occasions."}
//             </p>

//             {/* Color Selector */}
//             {colors.length > 0 && (
//               <div className="mb-6">
//                 <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-600 block mb-2.5">Color</label>
//                 <div className="flex items-center gap-3">
//                   {colors.map((c) => (
//                     <button
//                       key={c}
//                       onClick={() => setSelectedColor(c)}
//                       style={{ backgroundColor: getColorHex(c) }}
//                       className={`w-8 h-8 rounded-full border-2 transition-all shadow-sm ${
//                         selectedColor === c ? 'border-neutral-900 scale-110 ring-2 ring-neutral-900/20' : 'border-white hover:scale-105'
//                       }`}
//                       title={c}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Size Selector with Size Guide Trigger */}
//             {sizes.length > 0 && (
//               <div className="mb-8">
//                 <div className="flex justify-between items-center mb-2.5">
//                   <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-600">Size</label>
//                   <button 
//                     onClick={() => setIsSizeGuideOpen(true)}
//                     className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-500 underline hover:text-neutral-900 transition"
//                   >
//                     Size Guide
//                   </button>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   {sizes.map((s) => (
//                     <button
//                       key={s}
//                       onClick={() => setSelectedSize(s)}
//                       className={`w-11 h-11 rounded-full text-xs font-medium transition-all flex items-center justify-center border ${
//                         selectedSize === s 
//                           ? 'bg-[#C8A882] border-[#C8A882] text-white shadow-md' 
//                           : 'bg-white border-[#E5DDD0] text-neutral-800 hover:border-neutral-900'
//                       }`}
//                     >
//                       {s}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Notification alert */}
//             {addedNotice && (
//               <div className="mb-4 p-3 bg-neutral-900 text-white text-xs tracking-widest uppercase text-center font-medium rounded-xl flex items-center justify-center gap-2">
//                 <Check size={14} className="text-emerald-400" /> Added to your Bag
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={handleAddToCart}
//                 className="flex-1 bg-[#C8A882] hover:bg-[#B89872] text-white py-4 px-8 text-xs font-semibold uppercase tracking-[0.25em] rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
//               >
//                 <ShoppingBag size={16} /> Add to Cart
//               </button>

//               <button
//                 onClick={handleWishlistToggle}
//                 className="w-14 h-14 bg-white border border-[#E5DDD0] hover:border-neutral-900 rounded-2xl flex items-center justify-center text-neutral-800 shadow-sm transition-all"
//                 title="Wishlist"
//               >
//                 <Heart size={20} className={wishlistId ? "fill-red-600 text-red-600" : "text-neutral-700"} />
//               </button>
//             </div>

//           </div>

//           {/* 3. RIGHT COLUMN: Main Product Showcase with Soft Backdrop */}
//           <div className="lg:col-span-4 relative flex items-center justify-center min-h-[450px]">
//             <div className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] bg-[#EFE6D8] rounded-full blur-3xl opacity-70 z-0" />
            
//             <img
//               src={selectedImage || getImageUrl(product.image)}
//               alt={product.name}
//               className="relative z-10 w-full max-h-[500px] object-cover object-top rounded-[2rem] shadow-2xl hover:scale-105 transition-transform duration-700"
//               onError={(e) => { e.target.src = "https://placehold.co/800x1000?text=Haute+Couture"; }}
//             />
//           </div>

//         </div>

//         {/* Bottom Trust Badges */}
//         <div className="mt-16 pt-8 border-t border-[#EBE3D5] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
//           <div className="flex items-center justify-center gap-3 bg-white/60 p-4 rounded-2xl border border-[#EFE8DC]">
//             <Sparkles size={18} className="text-[#C8A882] shrink-0" />
//             <div className="text-left">
//               <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900">Light & Breathable</h4>
//               <p className="text-[10px] text-neutral-500">Comfort all day</p>
//             </div>
//           </div>
//           <div className="flex items-center justify-center gap-3 bg-white/60 p-4 rounded-2xl border border-[#EFE8DC]">
//             <ShieldCheck size={18} className="text-[#C8A882] shrink-0" />
//             <div className="text-left">
//               <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900">Quality You Trust</h4>
//               <p className="text-[10px] text-neutral-500">Premium materials</p>
//             </div>
//           </div>
//           <div className="flex items-center justify-center gap-3 bg-white/60 p-4 rounded-2xl border border-[#EFE8DC]">
//             <Truck size={18} className="text-[#C8A882] shrink-0" />
//             <div className="text-left">
//               <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900">Free Shipping</h4>
//               <p className="text-[10px] text-neutral-500">On orders over ₹999</p>
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* Size Guide Modal Popup */}
//       {isSizeGuideOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//           <div className="bg-[#FAF7F2] border border-[#EBE3D5] max-w-md w-full p-6 sm:p-8 relative shadow-2xl rounded-3xl">
//             <button 
//               onClick={() => setIsSizeGuideOpen(false)}
//               className="absolute top-5 right-6 text-neutral-500 hover:text-black text-xs uppercase tracking-widest font-bold"
//             >
//               ✕ Close
//             </button>
            
//             <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold block mb-1">Atelier Measurements</span>
//             <h3 className="font-serif text-2xl text-neutral-900 mb-6">Size Guide (Inches)</h3>

//             <div className="overflow-x-auto">
//               <table className="w-full text-left text-xs mb-6 border-collapse">
//                 <thead>
//                   <tr className="border-b border-neutral-300 text-neutral-500 uppercase tracking-widest text-[9px]">
//                     <th className="py-2.5">Size</th>
//                     <th className="py-2.5">Chest</th>
//                     <th className="py-2.5">Waist</th>
//                     <th className="py-2.5">Length</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-neutral-200 text-neutral-800">
//                   <tr>
//                     <td className="py-2.5 font-bold">S</td>
//                     <td className="py-2.5">36-38"</td>
//                     <td className="py-2.5">30-32"</td>
//                     <td className="py-2.5">40"</td>
//                   </tr>
//                   <tr>
//                     <td className="py-2.5 font-bold">M</td>
//                     <td className="py-2.5">38-40"</td>
//                     <td className="py-2.5">32-34"</td>
//                     <td className="py-2.5">41"</td>
//                   </tr>
//                   <tr>
//                     <td className="py-2.5 font-bold">L</td>
//                     <td className="py-2.5">40-42"</td>
//                     <td className="py-2.5">34-36"</td>
//                     <td className="py-2.5">42"</td>
//                   </tr>
//                   <tr>
//                     <td className="py-2.5 font-bold">XL</td>
//                     <td className="py-2.5">42-44"</td>
//                     <td className="py-2.5">36-38"</td>
//                     <td className="py-2.5">43"</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//             <p className="text-[10px] text-neutral-500 font-light leading-relaxed">
//               * Measurements are given in inches. For custom tailoring inquiries, please contact our concierge support.
//             </p>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }








import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  Heart,
  Sparkles,
  Check,
  Star,
  Share2,
  Minus,
  Plus,
  X,
  RefreshCw,
  ChevronDown,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import API, {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from '../services/api';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productError, setProductError] = useState('');

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const [quantity, setQuantity] = useState(1);

  const [addedNotice, setAddedNotice] = useState('');
  const [wishlistId, setWishlistId] = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  const [shareMessage, setShareMessage] = useState('');

  // --------------------------------------------------
  // IMAGE URL
  // --------------------------------------------------

  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return 'https://placehold.co/800x1000?text=Luxury+Collection';
    }

    if (
      typeof imagePath === 'string' &&
      (imagePath.startsWith('http://') ||
        imagePath.startsWith('https://'))
    ) {
      return imagePath;
    }

    return `https://clothing-backend-gynt.onrender.com${imagePath}`;
  };

  // --------------------------------------------------
  // FETCH PRODUCT
  // --------------------------------------------------

  const fetchProduct = async () => {
    setLoading(true);
    setProductError('');

    try {
      const res = await API.get(`products/${id}/`);
      const data = res.data;

      setProduct(data);

      // Main image
      if (data.image) {
        setSelectedImage(getImageUrl(data.image));
      } else if (data.images && data.images.length > 0) {
        setSelectedImage(getImageUrl(data.images[0].image));
      } else {
        setSelectedImage(getImageUrl(null));
      }

      // Sizes
      const sizesArr = data.sizes
        ? data.sizes
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

      // Colors
      const colorsArr = data.colors
        ? data.colors
            .split(',')
            .map((c) => c.trim())
            .filter(Boolean)
        : [];

      if (sizesArr.length > 0) {
        setSelectedSize(sizesArr[0]);
      } else {
        setSelectedSize('');
      }

      if (colorsArr.length > 0) {
        setSelectedColor(colorsArr[0]);
      } else {
        setSelectedColor('');
      }

      setQuantity(1);
    } catch (err) {
      console.error('Error fetching product:', err);

      setProductError(
        err?.response?.data?.detail ||
          'Unable to load this product. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // FETCH REVIEWS
  // --------------------------------------------------

  const fetchReviews = async () => {
    setReviewsLoading(true);

    try {
      const res = await API.get(`reviews/?product=${id}`);

      const list = Array.isArray(res.data)
        ? res.data
        : res.data?.results || [];

      setReviews(list);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  // --------------------------------------------------
  // FETCH WISHLIST
  // --------------------------------------------------

  const fetchWishlistStatus = async () => {
    const token = localStorage.getItem('access_token');

    if (!token) return;

    try {
      const res = await getWishlist();

      const list = Array.isArray(res.data)
        ? res.data
        : res.data?.results || [];

      const found = list.find((item) => {
        const productId =
          typeof item.product === 'object'
            ? item.product?.id
            : item.product;

        return String(productId) === String(id);
      });

      if (found) {
        setWishlistId(found.id);
      } else {
        setWishlistId(null);
      }
    } catch (err) {
      console.error('Wishlist fetch error:', err);
    }
  };

  // --------------------------------------------------
  // INITIAL LOAD
  // --------------------------------------------------

  useEffect(() => {
    fetchProduct();
    fetchReviews();
    fetchWishlistStatus();
  }, [id]);

  // --------------------------------------------------
  // ESCAPE SIZE GUIDE
  // --------------------------------------------------

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsSizeGuideOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // --------------------------------------------------
  // PRODUCT DATA
  // --------------------------------------------------

  const sizes = product?.sizes
    ? product.sizes
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const colors = product?.colors
    ? product.colors
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean)
    : [];

  const galleryImages = useMemo(() => {
    if (!product) return [];

    const images = [];

    if (product.image) {
      images.push({
        id: 'primary',
        url: getImageUrl(product.image),
      });
    }

    if (Array.isArray(product.images)) {
      product.images.forEach((img) => {
        if (img?.image) {
          images.push({
            id: img.id || img.image,
            url: getImageUrl(img.image),
          });
        }
      });
    }

    return images;
  }, [product]);

  // --------------------------------------------------
  // STOCK
  // --------------------------------------------------

  const stock = Number(
    product?.stock ??
      product?.inventory ??
      product?.quantity_available ??
      999
  );

  const hasStockField =
    product &&
    (
      product.stock !== undefined ||
      product.inventory !== undefined ||
      product.quantity_available !== undefined
    );

  const isOutOfStock = hasStockField && stock <= 0;
  const isLowStock = hasStockField && stock > 0 && stock <= 5;

  // --------------------------------------------------
  // COLOR HEX
  // --------------------------------------------------

  const getColorHex = (colorName) => {
    const name = colorName.toLowerCase();

    if (name.includes('black')) return '#1a1a1a';
    if (name.includes('white')) return '#f4f4f4';
    if (
      name.includes('beige') ||
      name.includes('cream') ||
      name.includes('nude')
    ) {
      return '#d8c2a3';
    }
    if (name.includes('green')) return '#7a8b79';
    if (name.includes('blue')) return '#6b829c';
    if (name.includes('red')) return '#a84c4c';
    if (name.includes('pink')) return '#d69ca8';
    if (name.includes('yellow')) return '#d8bc70';
    if (name.includes('purple')) return '#89729c';
    if (name.includes('orange')) return '#c77d45';
    if (name.includes('brown')) return '#8c6752';
    if (name.includes('grey') || name.includes('gray')) return '#8a8a8a';

    return '#c5b5a4';
  };

  // --------------------------------------------------
  // RATING
  // --------------------------------------------------

  const averageRating =
    reviews.length > 0
      ? reviews.reduce(
          (total, review) => total + Number(review.rating || 0),
          0
        ) / reviews.length
      : 0;

  const avgRating = averageRating.toFixed(1);

  const ratingBreakdown = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter(
      (review) => Number(review.rating) === rating
    ).length;

    const percentage =
      reviews.length > 0 ? (count / reviews.length) * 100 : 0;

    return {
      rating,
      count,
      percentage,
    };
  });

  // --------------------------------------------------
  // VALIDATE PRODUCT OPTIONS
  // --------------------------------------------------

  const validateSelection = () => {
    if (isOutOfStock) {
      showNotice('This product is currently sold out.');
      return false;
    }

    if (sizes.length > 0 && !selectedSize) {
      showNotice('Please select a size.');
      return false;
    }

    if (colors.length > 0 && !selectedColor) {
      showNotice('Please select a color.');
      return false;
    }

    return true;
  };

  // --------------------------------------------------
  // NOTICE
  // --------------------------------------------------

  const showNotice = (message) => {
    setAddedNotice(message);

    setTimeout(() => {
      setAddedNotice('');
    }, 3500);
  };

  // --------------------------------------------------
  // ADD TO CART
  // --------------------------------------------------

  const handleAddToCart = () => {
    if (!validateSelection()) return;

    try {
      addToCart(
        product,
        selectedSize,
        selectedColor,
        quantity
      );

      showNotice(
        `${quantity} item${quantity > 1 ? 's' : ''} added to your bag.`
      );
    } catch (err) {
      console.error('Add to cart failed:', err);
      showNotice('Unable to add this item to cart.');
    }
  };

  // --------------------------------------------------
  // BUY NOW
  // --------------------------------------------------

  const handleBuyNow = () => {
    if (!validateSelection()) return;

    try {
      addToCart(
        product,
        selectedSize,
        selectedColor,
        quantity
      );

      navigate('/checkout');
    } catch (err) {
      console.error('Buy now failed:', err);
      showNotice('Unable to proceed to checkout.');
    }
  };

  // --------------------------------------------------
  // WISHLIST
  // --------------------------------------------------

  const handleWishlistToggle = async () => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      navigate('/login');
      return;
    }

    if (wishlistLoading) return;

    setWishlistLoading(true);

    try {
      if (wishlistId) {
        await removeFromWishlist(wishlistId);
        setWishlistId(null);

        showNotice('Removed from your wishlist.');
      } else {
        const res = await addToWishlist(id);

        setWishlistId(res?.data?.id || null);

        showNotice('Added to your wishlist.');
      }
    } catch (err) {
      console.error('Wishlist operation failed:', err);

      const message =
        err?.response?.data?.detail ||
        'Unable to update wishlist. Please try again.';

      showNotice(message);
    } finally {
      setWishlistLoading(false);
    }
  };

  // --------------------------------------------------
  // SHARE PRODUCT
  // --------------------------------------------------

  const handleShare = async () => {
    if (!product) return;

    const shareData = {
      title: product.name,
      text: `Check out ${product.name}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);

        setShareMessage('Product link copied!');

        setTimeout(() => {
          setShareMessage('');
        }, 2500);
      }
    } catch (err) {
      // User cancelled native share
      console.log('Share cancelled.');
    }
  };

  // --------------------------------------------------
  // REVIEW SUBMIT
  // --------------------------------------------------

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access_token');

    if (!token) {
      navigate('/login');
      return;
    }

    if (!newReview.comment.trim()) {
      setReviewError('Please write your review.');
      return;
    }

    if (newReview.comment.trim().length < 5) {
      setReviewError(
        'Please write at least 5 characters in your review.'
      );
      return;
    }

    setReviewSubmitting(true);
    setReviewError('');
    setReviewSubmitted(false);

    try {
      const res = await API.post('reviews/', {
        product: id,
        rating: Number(newReview.rating),
        comment: newReview.comment.trim(),
      });

      setReviews((previous) => [res.data, ...previous]);

      setNewReview({
        rating: 5,
        comment: '',
      });

      setReviewSubmitted(true);

      setTimeout(() => {
        setReviewSubmitted(false);
      }, 4000);
    } catch (err) {
      console.error('Failed to post review:', err);

      setReviewError(
        err?.response?.data?.detail ||
          err?.response?.data?.message ||
          'Failed to submit review. Please try again.'
      );
    } finally {
      setReviewSubmitting(false);
    }
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5EFEB] p-4 text-center">
        <div className="w-10 h-10 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mb-5" />

        <p className="font-serif uppercase tracking-[0.3em] text-xs text-neutral-600">
          Curating Luxury Piece...
        </p>
      </div>
    );
  }

  // --------------------------------------------------
  // ERROR
  // --------------------------------------------------

  if (productError || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5EFEB] p-6 text-center">
        <div className="max-w-md bg-[#FAF7F2] border border-[#EBE3D5] rounded-3xl p-10 shadow-xl">
          <p className="font-serif text-2xl text-neutral-900 mb-3">
            Product Unavailable
          </p>

          <p className="text-xs text-neutral-500 leading-relaxed mb-7">
            {productError ||
              'We could not find this masterpiece.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={fetchProduct}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 text-white text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-black transition"
            >
              <RefreshCw size={14} />
              Try Again
            </button>

            <button
              onClick={() => navigate('/shop')}
              className="px-6 py-3 border border-neutral-300 text-neutral-800 text-[10px] uppercase tracking-[0.2em] rounded-xl hover:border-neutral-900 transition"
            >
              Return to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5EFEB] min-h-screen text-[#2C241D] py-6 sm:py-10 px-3 sm:px-6 lg:px-12 font-sans relative">
      <div className="max-w-[1400px] mx-auto bg-[#FAF7F2] rounded-[2rem] sm:rounded-[2.5rem] shadow-xl border border-[#EBE3D5] p-5 sm:p-8 lg:p-14 relative overflow-hidden">

        {/* ============================================
            BREADCRUMB
        ============================================ */}

        <nav className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-8 sm:mb-10 flex items-center gap-2 flex-wrap">
          <button
            onClick={() => navigate('/')}
            className="hover:text-neutral-900 transition"
          >
            Home
          </button>

          <span>/</span>

          <button
            onClick={() => navigate('/shop')}
            className="hover:text-neutral-900 transition"
          >
            Shop
          </button>

          <span>/</span>

          <span className="text-neutral-800 font-medium">
            {product.category_name || 'Collection'}
          </span>
        </nav>

        {/* ============================================
            PRODUCT MAIN SECTION
        ============================================ */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* ==========================================
              GALLERY
          ========================================== */}

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-[90px_1fr] gap-4 lg:gap-6">

            {/* Thumbnails */}

            <div className="order-2 sm:order-1 flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
              {galleryImages.length > 0 ? (
                galleryImages.map((image) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() =>
                      setSelectedImage(image.url)
                    }
                    className={`shrink-0 bg-white p-2 rounded-xl border transition-all ${
                      selectedImage === image.url
                        ? 'border-neutral-900 ring-2 ring-neutral-900/10'
                        : 'border-[#E8DFD1] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={product.name}
                      className="w-16 h-20 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://placehold.co/200x250?text=Image';
                      }}
                    />
                  </button>
                ))
              ) : (
                <div className="bg-white p-2 rounded-xl border border-[#E8DFD1]">
                  <img
                    src={getImageUrl(null)}
                    alt="Product"
                    className="w-16 h-20 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Main Image */}

            <div className="order-1 sm:order-2 relative flex items-center justify-center min-h-[420px] sm:min-h-[550px]">
              <div className="absolute w-[260px] h-[260px] sm:w-[450px] sm:h-[450px] bg-[#EFE6D8] rounded-full blur-3xl opacity-70" />

              <div className="relative z-10 w-full">
                <img
                  src={
                    selectedImage ||
                    getImageUrl(product.image)
                  }
                  alt={product.name}
                  className="w-full max-h-[650px] object-cover object-top rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://placehold.co/800x1000?text=Haute+Couture';
                  }}
                />

                {/* Wishlist */}

                <button
                  onClick={handleWishlistToggle}
                  disabled={wishlistLoading}
                  className="absolute top-4 right-4 w-12 h-12 bg-white/95 backdrop-blur border border-[#E5DDD0] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition disabled:opacity-50"
                  title="Wishlist"
                >
                  <Heart
                    size={20}
                    className={
                      wishlistId
                        ? 'fill-red-600 text-red-600'
                        : 'text-neutral-700'
                    }
                  />
                </button>

                {/* Share */}

                <button
                  onClick={handleShare}
                  className="absolute top-[4.5rem] right-4 w-12 h-12 bg-white/95 backdrop-blur border border-[#E5DDD0] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition"
                  title="Share Product"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* ==========================================
              PRODUCT INFO
          ========================================== */}

          <div className="lg:col-span-5 flex flex-col justify-center">

            {/* Category */}

            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B09270] font-bold mb-3">
              {product.category_name || 'Premium Collection'}
            </span>

            {/* Title */}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2C241D] leading-[1.1] mb-4">
              {product.name}
            </h1>

            {/* Rating */}

            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-amber-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={15}
                    className={
                      star <= Math.round(averageRating)
                        ? 'fill-amber-500 text-amber-500'
                        : 'text-neutral-300'
                    }
                  />
                ))}
              </div>

              <span className="text-xs font-semibold text-neutral-700">
                {avgRating}
              </span>

              <span className="text-xs text-neutral-400">
                ({reviews.length} Reviews)
              </span>
            </div>

            {/* Price */}

            <div className="flex items-end gap-3 mb-5">
              <span className="text-3xl sm:text-4xl font-serif text-[#2C241D]">
                ₹{Number(product.price || 0).toLocaleString('en-IN')}
              </span>

              {product.compare_at_price &&
                Number(product.compare_at_price) >
                  Number(product.price) && (
                  <span className="text-sm text-neutral-400 line-through mb-1">
                    ₹
                    {Number(
                      product.compare_at_price
                    ).toLocaleString('en-IN')}
                  </span>
                )}
            </div>

            {/* Stock */}

            <div className="flex items-center gap-3 mb-5">
              {isOutOfStock ? (
                <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-red-700 bg-red-50 px-3 py-2 rounded-full">
                  Sold Out
                </span>
              ) : (
                <>
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-full">
                    <Check size={12} />
                    In Stock
                  </span>

                  {isLowStock && (
                    <span className="text-[10px] uppercase tracking-widest text-red-600 font-semibold">
                      Only {stock} left
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Description */}

            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-7 mb-7 max-w-xl">
              {product.description ||
                'Lightweight and elegant piece crafted with precision, perfect for graceful occasions and everyday luxury.'}
            </p>

            {/* Color */}

            {colors.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-600">
                    Color
                  </label>

                  <span className="text-[10px] text-neutral-500">
                    {selectedColor}
                  </span>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() =>
                        setSelectedColor(color)
                      }
                      style={{
                        backgroundColor: getColorHex(color),
                      }}
                      className={`w-9 h-9 rounded-full border-2 transition-all shadow-sm ${
                        selectedColor === color
                          ? 'border-neutral-900 scale-110 ring-2 ring-neutral-900/20'
                          : 'border-white hover:scale-105'
                      }`}
                      title={color}
                      aria-label={`Select ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size */}

            {sizes.length > 0 && (
              <div className="mb-7">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-600">
                    Size
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      setIsSizeGuideOpen(true)
                    }
                    className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-500 underline underline-offset-4 hover:text-neutral-900 transition"
                  >
                    Size Guide
                  </button>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[46px] h-11 px-3 rounded-full text-xs font-medium transition-all flex items-center justify-center border ${
                        selectedSize === size
                          ? 'bg-[#C8A882] border-[#C8A882] text-white shadow-md'
                          : 'bg-white border-[#E5DDD0] text-neutral-800 hover:border-neutral-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Notice */}

            {addedNotice && (
              <div className="mb-4 p-3 bg-neutral-900 text-white text-[10px] tracking-[0.15em] uppercase text-center font-medium rounded-xl flex items-center justify-center gap-2">
                <Check
                  size={14}
                  className="text-emerald-400"
                />
                {addedNotice}
              </div>
            )}

            {shareMessage && (
              <div className="mb-4 p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] uppercase tracking-wider text-center rounded-xl">
                {shareMessage}
              </div>
            )}

            {/* Quantity + Buttons */}

            <div className="space-y-3">

              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#E5DDD0] rounded-2xl bg-white h-14">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(
                        Math.max(1, quantity - 1)
                      )
                    }
                    disabled={quantity <= 1}
                    className="w-12 h-full flex items-center justify-center hover:bg-neutral-50 disabled:opacity-30 transition"
                  >
                    <Minus size={15} />
                  </button>

                  <span className="w-10 text-center text-sm font-semibold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(
                        hasStockField
                          ? Math.min(quantity + 1, stock)
                          : quantity + 1
                      )
                    }
                    disabled={
                      hasStockField &&
                      quantity >= stock
                    }
                    className="w-12 h-full flex items-center justify-center hover:bg-neutral-50 disabled:opacity-30 transition"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                <span className="text-[10px] uppercase tracking-widest text-neutral-400">
                  Quantity
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="bg-[#C8A882] hover:bg-[#B89872] disabled:bg-neutral-300 disabled:cursor-not-allowed text-white py-4 px-5 text-[10px] font-semibold uppercase tracking-[0.2em] rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} />
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className="bg-neutral-900 hover:bg-black disabled:bg-neutral-300 disabled:cursor-not-allowed text-white py-4 px-5 text-[10px] font-semibold uppercase tracking-[0.2em] rounded-2xl shadow-lg transition-all"
                >
                  Buy Now
                </button>

              </div>

            </div>

            {/* Mini Benefits */}

            <div className="mt-7 pt-6 border-t border-[#EBE3D5] grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Truck
                  size={18}
                  className="text-[#C8A882]"
                />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider">
                    Fast Delivery
                  </p>
                  <p className="text-[9px] text-neutral-500">
                    Across India
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck
                  size={18}
                  className="text-[#C8A882]"
                />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider">
                    Secure Payment
                  </p>
                  <p className="text-[9px] text-neutral-500">
                    100% Protected
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ============================================
            PRODUCT DETAILS
        ============================================ */}

        <div className="mt-16 pt-10 border-t border-[#EBE3D5]">

          <div className="mb-7">
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold block mb-1">
              The Details
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900">
              Product Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <details className="group bg-white border border-[#EFE8DC] rounded-2xl p-5">
              <summary className="cursor-pointer list-none flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                Product Details

                <ChevronDown
                  size={16}
                  className="group-open:rotate-180 transition-transform"
                />
              </summary>

              <div className="mt-5 text-xs text-neutral-600 leading-7 space-y-1">
                <p>
                  <strong>Category:</strong>{' '}
                  {product.category_name ||
                    'Premium Collection'}
                </p>

                <p>
                  <strong>Material:</strong>{' '}
                  {product.material ||
                    'Premium Fabric'}
                </p>

                <p>
                  <strong>Fit:</strong>{' '}
                  {product.fit || 'Regular Fit'}
                </p>

                {product.brand && (
                  <p>
                    <strong>Brand:</strong>{' '}
                    {product.brand}
                  </p>
                )}
              </div>
            </details>

            <details className="group bg-white border border-[#EFE8DC] rounded-2xl p-5">
              <summary className="cursor-pointer list-none flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                Shipping & Returns

                <ChevronDown
                  size={16}
                  className="group-open:rotate-180 transition-transform"
                />
              </summary>

              <div className="mt-5 text-xs text-neutral-600 leading-7">
                <p>
                  Free shipping on orders over ₹999.
                </p>

                <p>
                  Delivery available across India.
                </p>

                <p>
                  Easy returns according to our return policy.
                </p>
              </div>
            </details>

            <details className="group bg-white border border-[#EFE8DC] rounded-2xl p-5">
              <summary className="cursor-pointer list-none flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                Care Instructions

                <ChevronDown
                  size={16}
                  className="group-open:rotate-180 transition-transform"
                />
              </summary>

              <div className="mt-5 text-xs text-neutral-600 leading-7">
                <p>
                  {product.care_instructions ||
                    'Gentle wash and dry in shade. Follow the garment care label for best results.'}
                </p>
              </div>
            </details>

          </div>
        </div>

        {/* ============================================
            REVIEWS
        ============================================ */}

        <div className="mt-16 pt-12 border-t border-[#EBE3D5]">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

            {/* REVIEW SUMMARY */}

            <div className="lg:col-span-4">

              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold block mb-1">
                Client Feedback
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 mb-6">
                Ratings & Reviews
              </h3>

              <div className="bg-white border border-[#EFE8DC] rounded-3xl p-6 shadow-sm">

                <div className="text-center mb-6">
                  <div className="text-4xl font-serif text-neutral-900">
                    {avgRating}
                  </div>

                  <div className="flex justify-center text-amber-500 my-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={
                          star <= Math.round(averageRating)
                            ? 'fill-amber-500'
                            : 'text-neutral-300'
                        }
                      />
                    ))}
                  </div>

                  <p className="text-[10px] uppercase tracking-widest text-neutral-400">
                    {reviews.length} Client Reviews
                  </p>
                </div>

                <div className="space-y-3">
                  {ratingBreakdown.map((item) => (
                    <div
                      key={item.rating}
                      className="flex items-center gap-3"
                    >
                      <span className="text-[10px] w-5 text-neutral-600">
                        {item.rating}
                      </span>

                      <Star
                        size={11}
                        className="fill-amber-500 text-amber-500"
                      />

                      <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#C8A882] rounded-full transition-all"
                          style={{
                            width: `${item.percentage}%`,
                          }}
                        />
                      </div>

                      <span className="text-[9px] text-neutral-400 w-5 text-right">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* REVIEW LIST */}

            <div className="lg:col-span-8">

              {reviewsLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="w-7 h-7 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : reviews.length === 0 ? (
                <div className="bg-white border border-[#EFE8DC] rounded-3xl p-8 text-center">
                  <Star
                    size={25}
                    className="mx-auto text-[#C8A882] mb-3"
                  />

                  <p className="font-serif text-lg text-neutral-800 mb-2">
                    No reviews yet
                  </p>

                  <p className="text-xs text-neutral-500">
                    Be the first client to share your experience.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white/80 border border-[#EFE8DC] p-5 sm:p-6 rounded-2xl shadow-sm"
                    >
                      <div className="flex justify-between items-start gap-4 mb-3">

                        <div>
                          <h4 className="font-serif text-sm font-semibold text-neutral-900">
                            {review.user_name ||
                              review.username ||
                              'Verified Client'}
                          </h4>

                          <div className="flex text-amber-500 mt-1">
                            {[1, 2, 3, 4, 5].map(
                              (star) => (
                                <Star
                                  key={star}
                                  size={12}
                                  className={
                                    star <=
                                    Number(review.rating)
                                      ? 'fill-amber-500'
                                      : 'text-neutral-300'
                                  }
                                />
                              )
                            )}
                          </div>
                        </div>

                        {review.created_at && (
                          <span className="text-[9px] text-neutral-400 tracking-wider whitespace-nowrap">
                            {new Date(
                              review.created_at
                            ).toLocaleDateString('en-IN')}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-neutral-600 font-light leading-6">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>

        {/* ============================================
            WRITE REVIEW
        ============================================ */}

        <div className="mt-12">

          <div className="max-w-2xl mx-auto bg-white border border-[#EFE8DC] p-6 sm:p-8 rounded-3xl shadow-sm">

            <div className="text-center mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold block mb-1">
                Share Your Experience
              </span>

              <h3 className="font-serif text-2xl text-neutral-900">
                Write a Review
              </h3>
            </div>

            {reviewSubmitted && (
              <div className="mb-5 p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs tracking-wider text-center rounded-xl">
                Thank you! Your review has been saved.
              </div>
            )}

            {reviewError && (
              <div className="mb-5 p-3 bg-red-50 text-red-800 border border-red-200 text-xs tracking-wider text-center rounded-xl">
                {reviewError}
              </div>
            )}

            <form
              onSubmit={handleReviewSubmit}
              className="space-y-5"
            >

              {/* Rating */}

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-semibold mb-2">
                  Rating
                </label>

                <select
                  value={newReview.rating}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      rating: Number(e.target.value),
                    })
                  }
                  className="w-full bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl p-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                >
                  <option value={5}>
                    ★★★★★ — Exceptional
                  </option>

                  <option value={4}>
                    ★★★★☆ — Excellent
                  </option>

                  <option value={3}>
                    ★★★☆☆ — Good
                  </option>

                  <option value={2}>
                    ★★☆☆☆ — Fair
                  </option>

                  <option value={1}>
                    ★☆☆☆☆ — Poor
                  </option>
                </select>
              </div>

              {/* Comment */}

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-semibold mb-2">
                  Your Review
                </label>

                <textarea
                  rows="5"
                  required
                  maxLength={1000}
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      comment: e.target.value,
                    })
                  }
                  placeholder="Describe the fabric quality, fitting, comfort and your overall experience..."
                  className="w-full bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl p-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 resize-none"
                />

                <div className="text-right text-[9px] text-neutral-400 mt-1">
                  {newReview.comment.length}/1000
                </div>
              </div>

              <button
                type="submit"
                disabled={reviewSubmitting}
                className="w-full bg-neutral-900 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white py-4 text-[10px] font-semibold uppercase tracking-[0.25em] hover:bg-black transition rounded-xl shadow-md"
              >
                {reviewSubmitting
                  ? 'Submitting Review...'
                  : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>

        {/* ============================================
            TRUST BADGES
        ============================================ */}

        <div className="mt-16 pt-8 border-t border-[#EBE3D5] grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div className="flex items-center justify-center gap-3 bg-white/60 p-5 rounded-2xl border border-[#EFE8DC]">
            <Sparkles
              size={20}
              className="text-[#C8A882] shrink-0"
            />

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-900">
                Light & Breathable
              </h4>

              <p className="text-[10px] text-neutral-500 mt-1">
                Comfort all day
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 bg-white/60 p-5 rounded-2xl border border-[#EFE8DC]">
            <ShieldCheck
              size={20}
              className="text-[#C8A882] shrink-0"
            />

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-900">
                Quality You Trust
              </h4>

              <p className="text-[10px] text-neutral-500 mt-1">
                Premium materials
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 bg-white/60 p-5 rounded-2xl border border-[#EFE8DC]">
            <Truck
              size={20}
              className="text-[#C8A882] shrink-0"
            />

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-900">
                Free Shipping
              </h4>

              <p className="text-[10px] text-neutral-500 mt-1">
                On orders over ₹999
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* ==============================================
          SIZE GUIDE MODAL
      ============================================== */}

      {isSizeGuideOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setIsSizeGuideOpen(false);
            }
          }}
        >
          <div className="bg-[#FAF7F2] border border-[#EBE3D5] max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl rounded-3xl">

            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white border border-[#E5DDD0] flex items-center justify-center text-neutral-500 hover:text-black transition"
              aria-label="Close size guide"
            >
              <X size={16} />
            </button>

            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold block mb-1">
              Atelier Measurements
            </span>

            <h3 className="font-serif text-2xl text-neutral-900 mb-6 pr-10">
              Size Guide
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs mb-6 border-collapse">

                <thead>
                  <tr className="border-b border-neutral-300 text-neutral-500 uppercase tracking-widest text-[9px]">
                    <th className="py-3">
                      Size
                    </th>

                    <th className="py-3">
                      Chest
                    </th>

                    <th className="py-3">
                      Waist
                    </th>

                    <th className="py-3">
                      Length
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-neutral-200 text-neutral-800">

                  <tr>
                    <td className="py-3 font-bold">
                      S
                    </td>
                    <td className="py-3">
                      36-38"
                    </td>
                    <td className="py-3">
                      30-32"
                    </td>
                    <td className="py-3">
                      40"
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 font-bold">
                      M
                    </td>
                    <td className="py-3">
                      38-40"
                    </td>
                    <td className="py-3">
                      32-34"
                    </td>
                    <td className="py-3">
                      41"
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 font-bold">
                      L
                    </td>
                    <td className="py-3">
                      40-42"
                    </td>
                    <td className="py-3">
                      34-36"
                    </td>
                    <td className="py-3">
                      42"
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 font-bold">
                      XL
                    </td>
                    <td className="py-3">
                      42-44"
                    </td>
                    <td className="py-3">
                      36-38"
                    </td>
                    <td className="py-3">
                      43"
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            <p className="text-[10px] text-neutral-500 font-light leading-relaxed">
              * Measurements are given in inches. For custom
              tailoring inquiries, please contact our concierge
              support.
            </p>

          </div>
        </div>
      )}

    </div>
  );
}