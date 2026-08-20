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








import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Heart, 
  Share2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Check
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

  // Accordion Toggles
  const [openSection, setOpenSection] = useState('details');

  // Helper function to dynamically construct absolute Image URLs
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://placehold.co/800x1000?text=Luxury+Collection";
    if (typeof imagePath === 'string' && (imagePath.startsWith("http://") || imagePath.startsWith("https://"))) {
      return imagePath;
    }
    return `http://127.0.0.1:8000${imagePath}`;
  };

  useEffect(() => {
    setLoading(true);

    // Fetch Product Data
    API.get(`products/${id}/`)
      .then((res) => {
        setProduct(res.data);

        // Initial Main Image Setup
        if (res.data.image) {
          setSelectedImage(getImageUrl(res.data.image));
        } else if (res.data.images && res.data.images.length > 0) {
          setSelectedImage(getImageUrl(res.data.images[0].image));
        }

        // Set default size & color options
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

    // Check if item exists in user's Wishlist
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

  // Wishlist Handler
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

  const toggleAccordion = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] p-4 text-center">
        <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-serif uppercase tracking-[0.3em] text-xs text-neutral-600">Curating Luxury Piece...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] p-4 text-center">
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

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 pt-4 sm:pt-6 pb-16 sm:pb-20 font-sans selection:bg-neutral-900 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Luxury Breadcrumb */}
        <nav className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-400 mb-6 sm:mb-10 flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span className="cursor-pointer hover:text-neutral-900 transition" onClick={() => navigate('/')}>Home</span>
          <span>/</span>
          <span className="cursor-pointer hover:text-neutral-900 transition" onClick={() => navigate('/shop')}>Boutique</span>
          <span>/</span>
          <span className="text-neutral-900 font-semibold tracking-[0.2em] truncate max-w-[150px] sm:max-w-none">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Gallery View */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 sm:gap-6">
            
            {/* Thumbnails list */}
            {((product.image) || (product.images && product.images.length > 0)) && (
              <div className="flex md:flex-col gap-3 sm:gap-4 overflow-x-auto md:overflow-y-auto max-h-[680px] scrollbar-none pb-2 md:pb-0">
                {product.image && (
                  <div 
                    onClick={() => setSelectedImage(getImageUrl(product.image))}
                    className={`w-16 h-20 sm:w-18 sm:h-24 flex-shrink-0 cursor-pointer overflow-hidden border transition-all duration-300 ${
                      selectedImage === getImageUrl(product.image) 
                        ? 'border-neutral-900 opacity-100 ring-1 ring-neutral-900' 
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={getImageUrl(product.image)} alt="Main Thumbnail" className="w-full h-full object-cover" />
                  </div>
                )}

                {product.images && product.images.map((imgObj) => {
                  const galleryUrl = getImageUrl(imgObj.image);
                  return (
                    <div
                      key={imgObj.id}
                      onClick={() => setSelectedImage(galleryUrl)}
                      className={`w-16 h-20 sm:w-18 sm:h-24 flex-shrink-0 cursor-pointer overflow-hidden border transition-all duration-300 ${
                        selectedImage === galleryUrl 
                          ? 'border-neutral-900 opacity-100 ring-1 ring-neutral-900' 
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={galleryUrl} alt={imgObj.alt_text || "Gallery Thumbnail"} className="w-full h-full object-cover" />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Main Featured Image Display */}
            <div className="flex-1 aspect-[3/4] bg-neutral-200 overflow-hidden relative group shadow-sm">
              <img
                src={selectedImage || getImageUrl(product.image)}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                onError={(e) => { e.target.src = "https://placehold.co/800x1000?text=Haute+Couture"; }}
              />
              
              {/* Badge */}
              {product.is_featured && (
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 text-[8px] sm:text-[9px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold text-neutral-800 flex items-center gap-1.5 border border-neutral-200/50">
                  <Sparkles size={11} className="text-amber-700 shrink-0" /> Limited Edition
                </div>
              )}

              {/* Wishlist Floating Button */}
              <button 
                onClick={handleWishlistToggle}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-neutral-800 hover:bg-white transition duration-300 shadow-sm"
              >
                <Heart size={18} className={wishlistId ? "fill-red-700 text-red-700" : "text-neutral-800"} />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Product Details (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 flex flex-col">
            
            {/* Category */}
            <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-500 font-semibold mb-2 sm:mb-3">
              {product.category_name || 'Haute Couture'}
            </span>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-neutral-900 tracking-tight leading-tight mb-3 sm:mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-3 sm:gap-4 mb-5 sm:mb-6 border-b border-neutral-200/80 pb-5 sm:pb-6">
              <span className="text-xl sm:text-2xl font-serif text-neutral-900">
                ₹{Number(product.price).toLocaleString()}
              </span>
              {product.original_price && (
                <span className="text-xs sm:text-sm text-neutral-400 line-through font-light">
                  ₹{Number(product.original_price).toLocaleString()}
                </span>
              )}
              <span className="ml-auto text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-emerald-800 bg-emerald-50 px-2 sm:px-2.5 py-1 border border-emerald-200 shrink-0">
                In Stock & Ready to Ship
              </span>
            </div>

            {/* Short Description */}
            <p className="text-xs text-neutral-600 leading-relaxed font-light mb-6 sm:mb-8">
              {product.description || "Crafted from fine textiles, designed to offer an exquisite silhouette with supreme comfort and unmatched elegance for elevated occasions."}
            </p>

            {/* Color Swatches */}
            {colors.length > 0 && (
              <div className="mb-5 sm:mb-6">
                <div className="flex justify-between items-center mb-2.5 sm:mb-3">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-800">
                    Shade: <span className="font-normal text-neutral-500">{selectedColor}</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3.5 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-light uppercase tracking-widest transition-all duration-200 border ${
                        selectedColor === c 
                          ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm' 
                          : 'border-neutral-300 text-neutral-700 bg-transparent hover:border-neutral-900'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {sizes.length > 0 && (
              <div className="mb-6 sm:mb-8">
                <div className="flex justify-between items-center mb-2.5 sm:mb-3">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-800">
                    Select Size
                  </span>
                  <button className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] underline text-neutral-500 hover:text-neutral-900 transition">
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2.5 sm:py-3 text-[11px] sm:text-xs font-medium transition-all duration-200 border ${
                        selectedSize === s 
                          ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm' 
                          : 'border-neutral-200/90 bg-white text-neutral-800 hover:border-neutral-900'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Notification Alert */}
            {addedNotice && (
              <div className="mb-4 p-3 sm:p-3.5 bg-neutral-900 text-white text-[10px] sm:text-xs tracking-[0.2em] uppercase text-center font-medium flex items-center justify-center gap-2 animate-fadeIn">
                <Check size={15} className="text-emerald-400 shrink-0" /> Added to your Bag
              </div>
            )}

            {/* Main Action Buttons */}
            <div className="flex gap-2.5 sm:gap-3 mb-6 sm:mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-neutral-900 text-white py-3.5 sm:py-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-neutral-800 active:scale-[0.99] transition duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                <ShoppingBag size={16} /> Add to Bag
              </button>
              
              <button 
                className="w-12 sm:w-14 border border-neutral-300 flex items-center justify-center text-neutral-700 hover:border-neutral-900 transition shrink-0"
                title="Share Item"
                onClick={() => navigator.clipboard.writeText(window.location.href)}
              >
                <Share2 size={18} />
              </button>
            </div>

            {/* Luxury Accordion Section */}
            <div className="border-t border-neutral-200 divide-y divide-neutral-200 text-xs">
              
              {/* Accordion 1: Details */}
              <div className="py-3.5 sm:py-4">
                <button 
                  onClick={() => toggleAccordion('details')}
                  className="w-full flex justify-between items-center text-left font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-neutral-900 text-[11px] sm:text-xs"
                >
                  <span>Composition & Atelier Details</span>
                  {openSection === 'details' ? <ChevronUp size={16} className="shrink-0" /> : <ChevronDown size={16} className="shrink-0" />}
                </button>
                {openSection === 'details' && (
                  <p className="mt-2.5 sm:mt-3 text-neutral-600 leading-relaxed font-light pl-0.5 text-xs">
                    Hand-crafted with luxury tailored perfection. Designed for optimum durability and movement. Features custom tonal stitching and signature modern elegance.
                  </p>
                )}
              </div>

              {/* Accordion 2: Care */}
              <div className="py-3.5 sm:py-4">
                <button 
                  onClick={() => toggleAccordion('care')}
                  className="w-full flex justify-between items-center text-left font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-neutral-900 text-[11px] sm:text-xs"
                >
                  <span>Fabric & Care Instructions</span>
                  {openSection === 'care' ? <ChevronUp size={16} className="shrink-0" /> : <ChevronDown size={16} className="shrink-0" />}
                </button>
                {openSection === 'care' && (
                  <p className="mt-2.5 sm:mt-3 text-neutral-600 leading-relaxed font-light pl-0.5 text-xs">
                    {product.fabric_care || "Dry clean only. Preserve in a cool, dark wardrobe with padded garment hangers to retain pristine luxury structure."}
                  </p>
                )}
              </div>

              {/* Accordion 3: Shipping */}
              <div className="py-3.5 sm:py-4">
                <button 
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex justify-between items-center text-left font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-neutral-900 text-[11px] sm:text-xs"
                >
                  <span>Delivery & Returns</span>
                  {openSection === 'shipping' ? <ChevronUp size={16} className="shrink-0" /> : <ChevronDown size={16} className="shrink-0" />}
                </button>
                {openSection === 'shipping' && (
                  <p className="mt-2.5 sm:mt-3 text-neutral-600 leading-relaxed font-light pl-0.5 text-xs">
                    Complimentary express shipping across all regional codes. Enjoy 14-day hassle-free door-step returns and size exchanges.
                  </p>
                )}
              </div>

            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center pt-6 sm:pt-8 mt-2 border-t border-neutral-200 text-[9px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-neutral-600">
              <div className="flex flex-col items-center gap-1.5"><Truck size={18} className="text-neutral-800 shrink-0" /> Free Delivery</div>
              <div className="flex flex-col items-center gap-1.5"><RefreshCw size={18} className="text-neutral-800 shrink-0" /> 14 Days Return</div>
              <div className="flex flex-col items-center gap-1.5"><ShieldCheck size={18} className="text-neutral-800 shrink-0" /> Authentic Item</div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}