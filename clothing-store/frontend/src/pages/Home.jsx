// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Heart, ArrowRight } from 'lucide-react';
// import API, { addToWishlist, removeFromWishlist, getWishlist } from '../services/api';

// export default function Home() {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [wishlistMap, setWishlistMap] = useState({}); // { productId: wishlistId }

//   // UPDATED: ઈમેજ ઓબ્જેક્ટ અથવા એરે માટે ફ્લેક્સિબલ પાથ હેન્ડલર
//   const getImageUrl = (product) => {
//     let imagePath = product?.image;

//     // જો ડાયરેક્ટ product.image ન હોય અને product.images (array) માં હોય
//     if (!imagePath && product?.images && product.images.length > 0) {
//       imagePath = product.images[0]?.image || product.images[0];
//     }

//     if (!imagePath) return "https://placehold.co/600x800?text=Luxury+Garment";

//     if (typeof imagePath === 'string' && (imagePath.startsWith('http://') || imagePath.startsWith('https://'))) {
//       return imagePath;
//     }

//     return `http://127.0.0.1:8000${imagePath}`;
//   };

//   useEffect(() => {
//     // 1. Fetch Featured Products
//     API.get('products/')
//       .then(res => {
//         const data = Array.isArray(res.data) ? res.data : res.data.results || [];
//         setProducts(data);
//       })
//       .catch(err => console.error(err));

//     // 2. Fetch User Wishlist (Using access_token)
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
//   }, []);

//   // Handle Wishlist Click
//   const handleWishlistToggle = async (e, productId) => {
//     e.stopPropagation(); // Prevents card click navigation
//     const token = localStorage.getItem('access_token');
//     if (!token) {
//       alert('Please login to add items to your wishlist.');
//       navigate('/login');
//       return;
//     }

//     try {
//       if (wishlistMap[productId]) {
//         // Remove from Wishlist
//         const wishlistId = wishlistMap[productId];
//         await removeFromWishlist(wishlistId);
//         setWishlistMap(prev => {
//           const newMap = { ...prev };
//           delete newMap[productId];
//           return newMap;
//         });
//       } else {
//         // Add to Wishlist
//         const res = await addToWishlist(productId);
//         setWishlistMap(prev => ({ ...prev, [productId]: res.data.id }));
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Failed to update wishlist. Please try again.');
//     }
//   };

//   const categories = [
//     { title: 'WOMEN COLLECTION', gender: 'women', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800' },
//     { title: 'MEN EDIT', gender: 'men', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800' },
//     { title: 'ETHNIC COUTURE', gender: 'ethnic', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800' },
//     { title: 'KIDS LUXURY', gender: 'kids', img: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800' }
//   ];

//   return (
//     <div className="bg-[#FAF8F5] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      
//       {/* Hero Banner */}
//       <section className="relative min-h-[75vh] md:h-[85vh] bg-[#F3EFEA] flex items-center px-6 sm:px-10 md:px-20 py-12 md:py-0 overflow-hidden">
//         <div className="max-w-2xl z-10">
//           <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-neutral-500 font-semibold mb-3 block">
//             Autumn / Winter 2026 High Fashion
//           </span>
//           <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif text-neutral-900 leading-tight mb-4 sm:mb-6 tracking-tight">
//             TIMELESS ELEGANCE. <br />
//             <span className="italic font-light text-neutral-600">Redefined.</span>
//           </h1>
//           <p className="text-neutral-600 text-xs sm:text-sm mb-6 sm:mb-8 font-light tracking-wide max-w-md leading-relaxed">
//             Discover exquisite craftsmanship and contemporary trends tailored for your statement luxury wardrobe.
//           </p>
//           <button 
//             onClick={() => navigate('/shop')}
//             className="bg-neutral-900 text-white px-6 sm:px-8 py-3.5 sm:py-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-black transition shadow-lg flex items-center gap-3 group"
//           >
//             Explore All Collections <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
//           </button>
//         </div>

//         <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
//           <img 
//             src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200" 
//             alt="Luxury Clothing" 
//             className="w-full h-full object-cover object-top"
//             onError={(e) => { e.target.src = "https://placehold.co/1200x1600?text=Luxury+Fashion"; }}
//           />
//         </div>
//       </section>

//       {/* Categories */}
//       <section className="container mx-auto px-4 sm:px-6 py-12 md:py-20">
//         <div className="text-center mb-8 md:mb-12">
//           <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold block mb-2">Curated Categories</span>
//           <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900">Choose Your Wardrobe</h2>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//           {categories.map((cat, idx) => (
//             <div 
//               key={idx} 
//               onClick={() => navigate(`/shop?gender=${cat.gender}`)}
//               className="group relative h-[320px] sm:h-[400px] lg:h-[450px] overflow-hidden cursor-pointer shadow-sm bg-neutral-200 flex items-end p-5 sm:p-6"
//             >
//               <img 
//                 src={cat.img} 
//                 alt={cat.title} 
//                 className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition duration-700 ease-out" 
//                 onError={(e) => { e.target.src = "https://placehold.co/800x1000?text=Collection"; }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
//               <div className="relative z-10 text-white">
//                 <h3 className="font-serif text-base sm:text-lg tracking-widest uppercase mb-1">{cat.title}</h3>
//                 <span className="text-[10px] uppercase tracking-[0.2em] underline font-bold text-neutral-300 group-hover:text-white flex items-center gap-1">
//                   Shop Now →
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="bg-white py-12 md:py-20 border-t border-neutral-200">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 md:mb-12">
//             <div>
//               <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold block mb-1">New Arrivals</span>
//               <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900">Featured Garments</h2>
//             </div>
//             <button 
//               onClick={() => navigate('/shop')}
//               className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] underline underline-offset-8 text-neutral-800 hover:text-black"
//             >
//               View Full Gallery →
//             </button>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
//             {products.slice(0, 8).map(product => (
//               <div 
//                 key={product.id} 
//                 onClick={() => navigate(`/product/${product.id}`)}
//                 className="group cursor-pointer flex flex-col relative"
//               >
//                 <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-3 sm:mb-4">
//                   {/* UPDATED: Calling getImageUrl with full product object */}
//                   <img 
//                     src={getImageUrl(product)} 
//                     alt={product.name} 
//                     className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-700 ease-out" 
//                     onError={(e) => { e.target.src = "https://placehold.co/600x800?text=Piece+Unavailable"; }}
//                   />

//                   {/* Wishlist Heart Button */}
//                   <button 
//                     onClick={(e) => handleWishlistToggle(e, product.id)}
//                     className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-2 sm:p-2.5 bg-white/80 backdrop-blur rounded-full shadow-sm hover:scale-110 transition duration-300 z-20 text-neutral-800"
//                     title={wishlistMap[product.id] ? "Remove from Wishlist" : "Add to Wishlist"}
//                   >
//                     <Heart 
//                       size={14} 
//                       className={`sm:w-4 sm:h-4 ${wishlistMap[product.id] ? "fill-red-600 text-red-600" : "text-neutral-800"}`} 
//                     />
//                   </button>

//                   <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent hidden sm:block">
//                     <span className="block w-full py-2.5 bg-white text-black text-center text-[10px] font-bold uppercase tracking-[0.2em]">
//                       View Piece
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
//                   <div>
//                     <h3 className="font-serif text-xs sm:text-sm text-neutral-900 line-clamp-1">{product.name}</h3>
//                     <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400 mt-0.5 sm:mt-1">{product.category_name || 'Haute Couture'}</p>
//                   </div>
//                   <span className="text-xs sm:text-sm font-serif font-medium text-neutral-900">₹{Number(product.price).toLocaleString()}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// }














// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Heart, ArrowRight, ShieldCheck, RefreshCw, Headphones, Award } from 'lucide-react';
// import API, { addToWishlist, removeFromWishlist, getWishlist } from '../services/api';

// export default function Home() {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [wishlistMap, setWishlistMap] = useState({});
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Hero Slider Data (Offer, Clothing, New Collection)
//   const heroSlides = [
//     {
//       subtitle: "SPECIAL OFFER • UP TO 40% OFF",
//       title: "Season's Best\nStyles & Trends",
//       description: "Upgrade your wardrobe with our exclusive collection. Limited time offers available.",
//       image: "https://plus.unsplash.com/premium_photo-1740354613210-c474b08f022c?q=80&w=1170&auto=format&fit=crop",
//       btnText: "SHOP OFFERS",
//       link: "/shop"
//     },
//     {
//       subtitle: "NEW COLLECTION",
//       title: "Dress\nBetter. Live\nBetter.",
//       description: "Timeless styles. Premium fabrics. Made for every you.",
//       image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000&auto=format&fit=crop",
//       btnText: "SHOP NEW ARRIVALS",
//       link: "/shop"
//     },
//     {
//       subtitle: "EXCLUSIVE WARDROBE",
//       title: "Elegance\nRedefined Everyday",
//       description: "Discover curated outfits designed to give you both comfort and class.",
//       image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
//       btnText: "EXPLORE COLLECTION",
//       link: "/shop"
//     }
//   ];

//   // Auto Scroll Effect for Hero Section (Changes every 4 seconds)
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
//     }, 4000);
//     return () => clearInterval(timer);
//   }, [heroSlides.length]);

//   const getImageUrl = (product) => {
//     let imagePath = product?.image;
//     if (!imagePath && product?.images && product.images.length > 0) {
//       imagePath = product.images[0]?.image || product.images[0];
//     }
//     if (!imagePath) return "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800";

//     if (typeof imagePath === 'string' && (imagePath.startsWith('http://') || imagePath.startsWith('https://'))) {
//       return imagePath;
//     }

//     const cleanPath = typeof imagePath === 'string' && imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
//     return `https://clothing-backend-gynt.onrender.com${cleanPath}`;
//   };

//   useEffect(() => {
//     API.get('products/')
//       .then(res => {
//         const data = Array.isArray(res.data) ? res.data : res.data.results || [];
//         setProducts(data);
//       })
//       .catch(err => console.error(err));

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
//   }, []);

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
//     }
//   };

//   const categoriesList = [
//     { name: 'Shirts', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=400', slug: 'shirts' },
//     { name: 'T-Shirts', img: 'https://i.pinimg.com/736x/69/28/58/6928580f902f47636c98947dd63a3ec5.jpg', slug: 't-shirts' },
//     { name: 'Jeans', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=400', slug: 'jeans' },
//     { name: 'Dresses', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400', slug: 'dresses' },
//     { name: 'Kurtas', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400', slug: 'kurtas' },
//     { name: 'Jackets', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400', slug: 'jackets' },
//     { name: 'Accessories', img: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=400', slug: 'accessories' },
//   ];

//   return (
//     <div className="bg-[#FAF8F5] text-[#1A1A1A] font-sans antialiased selection:bg-neutral-900 selection:text-white pb-20">

//       {/* 1. FULL WIDTH LUXURY HERO SLIDER */}
//       <section className="relative w-full h-[85vh] min-h-[550px] max-h-[750px] bg-[#E8DFD5] flex items-center">
//         {heroSlides.map((slide, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 w-full h-full flex items-center transition-opacity duration-1000 ease-in-out ${
//               index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
//             }`}
//           >
//             <img
//               src={slide.image}
//               alt="Hero Slide"
//               className="absolute inset-0 w-full h-full object-cover object-center"
//             />
//             <div className="absolute inset-0 w-full md:w-2/3 bg-gradient-to-r from-black/75 via-black/35 to-transparent pointer-events-none" />

//             <div className="relative z-10 px-8 sm:px-16 md:px-24 max-w-2xl text-white">
//               <span className="text-[11px] uppercase tracking-[0.35em] font-medium opacity-90 block mb-4">
//                 {slide.subtitle}
//               </span>

//               <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal leading-[1.08] mb-6 tracking-tight whitespace-pre-line">
//                 {slide.title}
//               </h1>

//               <p className="text-xs sm:text-sm font-light leading-relaxed opacity-85 mb-8 max-w-md">
//                 {slide.description}
//               </p>

//               <button
//                 onClick={() => navigate(slide.link)}
//                 className="bg-white text-neutral-900 px-8 py-4 text-[11px] uppercase tracking-[0.25em] font-semibold rounded-none hover:bg-neutral-900 hover:text-white transition-all shadow-lg"
//               >
//                 {slide.btnText}
//               </button>
//             </div>
//           </div>
//         ))}

//         {/* Floating Slide Indicators */}
//         <div className="absolute right-8 sm:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 text-white z-20">
//           {heroSlides.map((_, idx) => (
//             <React.Fragment key={idx}>
//               <span 
//                 onClick={() => setCurrentSlide(idx)}
//                 className={`text-xs font-serif tracking-widest cursor-pointer transition-all ${
//                   idx === currentSlide ? 'font-bold border-b border-white pb-1 text-white' : 'font-normal text-white/50 hover:text-white'
//                 }`}
//               >
//                 0{idx + 1}
//               </span>
//               {idx < heroSlides.length - 1 && <div className="w-[1px] h-6 bg-white/30" />}
//             </React.Fragment>
//           ))}
//         </div>
//       </section>

//       {/* 2. GENDER CARDS (Edge-to-edge fluid grid layout) */}
//       <section className="w-full px-6 sm:px-10 md:px-16 mt-16 max-w-[1600px] mx-auto">
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
//           <div 
//             onClick={() => navigate('/shop?gender=men')}
//             className="bg-[#F0ECE4] p-8 sm:p-10 flex items-center justify-between cursor-pointer group hover:bg-[#EAE4DC] transition-all border border-neutral-200/80 shadow-sm"
//           >
//             <div>
//               <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-semibold">COLLECTION</span>
//               <h3 className="font-serif text-2xl tracking-wide text-neutral-900 mt-1">MEN</h3>
//               <p className="text-[11px] text-neutral-600 font-medium my-1">UP TO 40% OFF</p>
//               <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-900 flex items-center gap-2 mt-5 group-hover:translate-x-1.5 transition-transform">
//                 EXPLORE <ArrowRight size={13} />
//               </span>
//             </div>
//             <img 
//               src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=300" 
//               alt="Men" 
//               className="w-28 h-36 object-cover group-hover:scale-105 transition-transform duration-500 shadow-md"
//             />
//           </div>

//           <div 
//             onClick={() => navigate('/shop?gender=women')}
//             className="bg-[#F5EFEA] p-8 sm:p-10 flex items-center justify-between cursor-pointer group hover:bg-[#EFE8E1] transition-all border border-neutral-200/80 shadow-sm"
//           >
//             <div>
//               <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-semibold">COLLECTION</span>
//               <h3 className="font-serif text-2xl tracking-wide text-neutral-900 mt-1">WOMEN</h3>
//               <p className="text-[11px] text-neutral-600 font-medium my-1">UP TO 40% OFF</p>
//               <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-900 flex items-center gap-2 mt-5 group-hover:translate-x-1.5 transition-transform">
//                 EXPLORE <ArrowRight size={13} />
//               </span>
//             </div>
//             <img 
//               src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300" 
//               alt="Women" 
//               className="w-28 h-36 object-cover group-hover:scale-105 transition-transform duration-500 shadow-md"
//             />
//           </div>

//           <div 
//             onClick={() => navigate('/shop?gender=kids')}
//             className="bg-[#EFEBE6] p-8 sm:p-10 flex items-center justify-between cursor-pointer group hover:bg-[#E8E3DD] transition-all border border-neutral-200/80 shadow-sm"
//           >
//             <div>
//               <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-semibold">COLLECTION</span>
//               <h3 className="font-serif text-2xl tracking-wide text-neutral-900 mt-1">KIDS</h3>
//               <p className="text-[11px] text-neutral-600 font-medium my-1">UP TO 40% OFF</p>
//               <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-900 flex items-center gap-2 mt-5 group-hover:translate-x-1.5 transition-transform">
//                 EXPLORE <ArrowRight size={13} />
//               </span>
//             </div>
//             <img 
//               src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=300" 
//               alt="Kids" 
//               className="w-28 h-36 object-cover group-hover:scale-105 transition-transform duration-500 shadow-md"
//             />
//           </div>

//         </div>
//       </section>

//       {/* 3. CATEGORIES */}
//       <section className="w-full px-6 sm:px-10 md:px-16 mt-24 max-w-[1600px] mx-auto">
//         <div className="text-center mb-10">
//           <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold block mb-2">
//             CURATED SELECTION
//           </span>
//           <h2 className="text-3xl sm:text-4xl font-serif text-neutral-900 tracking-tight">Shop By Category</h2>
//         </div>

//         <div className="flex items-center justify-start sm:justify-center gap-8 sm:gap-12 overflow-x-auto pb-4 scrollbar-none">
//           {categoriesList.map((cat, idx) => (
//             <div 
//               key={idx}
//               onClick={() => navigate(`/shop?category=${cat.slug}`)}
//               className="flex flex-col items-center gap-3 cursor-pointer group shrink-0"
//             >
//               <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-neutral-200 border-2 border-neutral-300 p-1 group-hover:border-neutral-900 transition-all shadow-sm">
//                 <img src={cat.img} alt={cat.name} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500" />
//               </div>
//               <span className="text-xs font-medium tracking-wide text-neutral-800 group-hover:text-black">
//                 {cat.name}
//               </span>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 4. BEST SELLERS */}
//       <section className="w-full px-6 sm:px-10 md:px-16 mt-24 max-w-[1600px] mx-auto">
//         <div className="text-center mb-10">
//           <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold block mb-2">
//             MOST POPULAR
//           </span>
//           <h2 className="text-3xl sm:text-4xl font-serif text-neutral-900 tracking-tight">Trending Now</h2>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
//           {products.slice(0, 5).map((product) => (
//             <div 
//               key={product.id}
//               onClick={() => navigate(`/product/${product.id}`)}
//               className="group cursor-pointer flex flex-col bg-white p-3.5 border border-neutral-200/80 shadow-sm hover:shadow-lg transition-all"
//             >
//               <div className="relative aspect-[3/4] bg-[#EAE6DF] overflow-hidden mb-4">
//                 <img 
//                   src={getImageUrl(product)} 
//                   alt={product.name} 
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                   onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800"; }}
//                 />

//                 <button
//                   onClick={(e) => handleWishlistToggle(e, product.id)}
//                   className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur rounded-full text-neutral-700 hover:scale-110 transition-transform shadow-md"
//                 >
//                   <Heart 
//                     size={15} 
//                     className={wishlistMap[product.id] ? "fill-red-500 text-red-500" : "text-neutral-600"} 
//                   />
//                 </button>
//               </div>

//               <h4 className="text-xs font-medium text-neutral-800 truncate px-1">{product.name}</h4>
//               <p className="text-xs font-serif font-bold text-neutral-900 mt-1.5 px-1">
//                 ₹{Number(product.price).toLocaleString('en-IN')}
//               </p>
//             </div>
//           ))}
//         </div>

//         <div className="text-center mt-14">
//           <button 
//             onClick={() => navigate('/shop')}
//             className="border-2 border-neutral-900 text-neutral-900 px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-neutral-900 hover:text-white transition-all rounded-none"
//           >
//             VIEW ALL PRODUCTS
//           </button>
//         </div>
//       </section>

//       {/* 5. FULL WIDTH PROMOTIONAL BANNER */}
//       <section className="w-full mt-28 bg-[#EBE5DC] border-y border-neutral-200">
//         <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full">
//           <div className="h-[350px] sm:h-[450px] w-full">
//             <img 
//               src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000" 
//               alt="Wardrobe" 
//               className="w-full h-full object-cover"
//             />
//           </div>

//           <div className="p-12 sm:p-20 lg:p-28">
//             <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-500 font-bold block mb-3">
//               NEW SEASON, NEW YOU
//             </span>
//             <h2 className="text-3xl sm:text-5xl font-serif text-neutral-900 mb-5 leading-tight">
//               Refresh Your <br /> Wardrobe
//             </h2>
//             <p className="text-xs sm:text-sm text-neutral-600 font-light mb-10 max-w-md leading-relaxed">
//               Explore the latest styles curated for the season with absolute elegance and high-end craftsmanship.
//             </p>
//             <button 
//               onClick={() => navigate('/shop')}
//               className="bg-[#1C1C1C] text-white px-9 py-4 text-[11px] uppercase tracking-[0.25em] font-medium rounded-none hover:bg-black transition-all"
//             >
//               EXPLORE COLLECTION
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* 6. TRUST BADGES */}
//       <section className="w-full px-6 sm:px-10 md:px-16 mt-24 max-w-[1600px] mx-auto">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-t border-b border-neutral-200/80 py-12">
//           <div className="flex flex-col items-center">
//             <Award size={26} className="text-neutral-800 mb-3 stroke-1" />
//             <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900">PREMIUM QUALITY</h4>
//             <p className="text-[11px] text-neutral-500 mt-1">Finest fabrics, crafted for comfort</p>
//           </div>
//           <div className="flex flex-col items-center">
//             <RefreshCw size={26} className="text-neutral-800 mb-3 stroke-1" />
//             <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900">EASY RETURNS</h4>
//             <p className="text-[11px] text-neutral-500 mt-1">Simple returns within 7 days</p>
//           </div>
//           <div className="flex flex-col items-center">
//             <ShieldCheck size={26} className="text-neutral-800 mb-3 stroke-1" />
//             <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900">SECURE PAYMENTS</h4>
//             <p className="text-[11px] text-neutral-500 mt-1">100% secure payment gateway</p>
//           </div>
//           <div className="flex flex-col items-center">
//             <Headphones size={26} className="text-neutral-800 mb-3 stroke-1" />
//             <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900">CUSTOMER SUPPORT</h4>
//             <p className="text-[11px] text-neutral-500 mt-1">We're here to help you anytime</p>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// }














import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight, ShieldCheck, RefreshCw, Headphones, Award, Sparkles } from 'lucide-react';
import API, { addToWishlist, removeFromWishlist, getWishlist } from '../services/api';

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [wishlistMap, setWishlistMap] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero Slider Data (High-end Atelier Vibe)
  const heroSlides = [
    {
      subtitle: "THE HAUTE COUTURE EDIT",
      title: "Timeless Elegance\nModern Silhouettes",
      description: "Discover meticulously crafted pieces designed for the discerning wardrobe.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop",
      btnText: "EXPLORE COLLECTION",
      link: "/shop"
    },
    {
      subtitle: "SEASONAL DROPS • AW '26",
      title: "Refined Luxury\nUncompromised Quality",
      description: "Immerse yourself in exceptional textiles and bespoke tailoring.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400&auto=format&fit=crop",
      btnText: "SHOP NEW ARRIVALS",
      link: "/new-arrivals"
    },
    {
      subtitle: "BESPOKE ARTISTRY",
      title: "Grace Redefined\nEvery Single Day",
      description: "Elevate your personal style with pieces curated for pure sophistication.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop",
      btnText: "VIEW LOOKBOOK",
      link: "/shop"
    }
  ];

  // Auto Scroll Effect for Hero Section (Changes every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const getImageUrl = (product) => {
    let imagePath = product?.image;
    if (!imagePath && product?.images && product.images.length > 0) {
      imagePath = product.images[0]?.image || product.images[0];
    }
    if (!imagePath) return "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800";

    if (typeof imagePath === 'string' && (imagePath.startsWith('http://') || imagePath.startsWith('https://'))) {
      return imagePath;
    }

    const cleanPath = typeof imagePath === 'string' && imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `https://clothing-backend-gynt.onrender.com${cleanPath}`;
  };

  useEffect(() => {
    API.get('products/')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        setProducts(data);
      })
      .catch(err => console.error(err));

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
  }, []);

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
    }
  };

  const categoriesList = [
    { name: 'Shirts', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=400', slug: 'shirts' },
    { name: 'T-Shirts', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400', slug: 't-shirts' },
    { name: 'Jeans', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=400', slug: 'jeans' },
    { name: 'Dresses', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400', slug: 'dresses' },
    { name: 'Kurtas', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400', slug: 'kurtas' },
    { name: 'Jackets', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400', slug: 'jackets' },
    { name: 'Accessories', img: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=400', slug: 'accessories' },
  ];

  return (
    <div className="bg-[#FAF8F5] text-neutral-900 font-sans antialiased selection:bg-neutral-900 selection:text-white pb-12">

      {/* 1. LUXURY HERO SLIDER */}
      <section className="relative w-full h-[85vh] min-h-[550px] max-h-[750px] bg-[#E8DFD5] flex items-center overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full flex items-center transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt="Hero Slide"
              className="absolute inset-0 w-full h-full object-cover object-center scale-105"
            />
            {/* Elegant Gradient Overlay */}
            <div className="absolute inset-0 w-full md:w-3/5 bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none" />

            <div className="relative z-10 px-8 sm:px-16 md:px-24 max-w-2xl text-white">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-amber-200" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-amber-100 block">
                  {slide.subtitle}
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light leading-[1.1] mb-6 tracking-tight whitespace-pre-line">
                {slide.title}
              </h1>

              <p className="text-xs sm:text-sm font-light leading-relaxed text-neutral-200 mb-8 max-w-md">
                {slide.description}
              </p>

              <button
                onClick={() => navigate(slide.link)}
                className="bg-white text-neutral-900 px-9 py-4 text-[10px] uppercase tracking-[0.3em] font-semibold hover:bg-neutral-900 hover:text-white transition-all duration-300 shadow-xl"
              >
                {slide.btnText}
              </button>
            </div>
          </div>
        ))}

        {/* Floating Slide Indicators */}
        <div className="absolute right-8 sm:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 text-white z-20">
          {heroSlides.map((_, idx) => (
            <React.Fragment key={idx}>
              <span 
                onClick={() => setCurrentSlide(idx)}
                className={`text-xs font-serif tracking-widest cursor-pointer transition-all ${
                  idx === currentSlide ? 'font-bold border-b border-white pb-1 text-white scale-110' : 'font-normal text-white/40 hover:text-white'
                }`}
              >
                0{idx + 1}
              </span>
              {idx < heroSlides.length - 1 && <div className="w-[1px] h-6 bg-white/20" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* 2. EDITORIAL GENDER CARDS */}
      <section className="w-full px-6 sm:px-10 md:px-16 -mt-14 relative z-20 max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          <div 
            onClick={() => navigate('/shop?gender=men')}
            className="bg-white/95 backdrop-blur-md p-6 sm:p-8 flex items-center justify-between cursor-pointer group hover:bg-white transition-all duration-500 border border-neutral-200/80 shadow-md rounded-xl overflow-hidden"
          >
            <div>
              <span className="text-[9px] tracking-[0.3em] text-neutral-400 uppercase font-bold block mb-1">ATELIER EDIT</span>
              <h3 className="font-serif text-xl tracking-tight text-neutral-900">MEN</h3>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium mt-0.5">Tailored Excellence</p>
              <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-900 flex items-center gap-2 mt-4 group-hover:translate-x-2 transition-transform">
                Discover <ArrowRight size={13} />
              </span>
            </div>
            <div className="w-24 h-32 bg-neutral-100 rounded-lg overflow-hidden shrink-0 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=300" 
                alt="Men" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>

          <div 
            onClick={() => navigate('/shop?gender=women')}
            className="bg-white/95 backdrop-blur-md p-6 sm:p-8 flex items-center justify-between cursor-pointer group hover:bg-white transition-all duration-500 border border-neutral-200/80 shadow-md rounded-xl overflow-hidden"
          >
            <div>
              <span className="text-[9px] tracking-[0.3em] text-neutral-400 uppercase font-bold block mb-1">ATELIER EDIT</span>
              <h3 className="font-serif text-xl tracking-tight text-neutral-900">WOMEN</h3>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium mt-0.5">Haute Couture</p>
              <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-900 flex items-center gap-2 mt-4 group-hover:translate-x-2 transition-transform">
                Discover <ArrowRight size={13} />
              </span>
            </div>
            <div className="w-24 h-32 bg-neutral-100 rounded-lg overflow-hidden shrink-0 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300" 
                alt="Women" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>

          <div 
            onClick={() => navigate('/shop?gender=kids')}
            className="bg-white/95 backdrop-blur-md p-6 sm:p-8 flex items-center justify-between cursor-pointer group hover:bg-white transition-all duration-500 border border-neutral-200/80 shadow-md rounded-xl overflow-hidden"
          >
            <div>
              <span className="text-[9px] tracking-[0.3em] text-neutral-400 uppercase font-bold block mb-1">ATELIER EDIT</span>
              <h3 className="font-serif text-xl tracking-tight text-neutral-900">KIDS</h3>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium mt-0.5">Little Luxury</p>
              <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-900 flex items-center gap-2 mt-4 group-hover:translate-x-2 transition-transform">
                Discover <ArrowRight size={13} />
              </span>
            </div>
            <div className="w-24 h-32 bg-neutral-100 rounded-lg overflow-hidden shrink-0 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=300" 
                alt="Kids" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. CURATED CATEGORIES */}
      <section className="w-full px-6 sm:px-10 md:px-16 mt-16 max-w-[1500px] mx-auto">
        <div className="text-center mb-8">
          <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block mb-1.5">
            EXPLORE THE BOUTIQUE
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900 tracking-tight">Shop By Category</h2>
          <div className="w-10 h-[1px] bg-neutral-400 mx-auto mt-3"></div>
        </div>

        <div className="flex items-center justify-start sm:justify-center gap-6 sm:gap-12 overflow-x-auto pb-3 scrollbar-none">
          {categoriesList.map((cat, idx) => (
            <div 
              key={idx}
              onClick={() => navigate(`/shop?category=${cat.slug}`)}
              className="flex flex-col items-center gap-2.5 cursor-pointer group shrink-0"
            >
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-neutral-200 border border-neutral-300 p-1 group-hover:border-neutral-900 transition-all shadow-sm">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700" />
              </div>
              <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-800 group-hover:text-black">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TRENDING PIECES */}
      <section className="w-full px-6 sm:px-10 md:px-16 mt-16 max-w-[1500px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-neutral-200 pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block mb-1.5">
              CURATED FAVORITES
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900 tracking-tight">Trending Pieces</h2>
          </div>
          <button 
            onClick={() => navigate('/shop')}
            className="mt-2 sm:mt-0 text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-900 underline underline-offset-8 hover:text-neutral-600 transition"
          >
            View Entire Collection →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {products.slice(0, 5).map((product) => (
            <div 
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="group cursor-pointer flex flex-col bg-white p-3 border border-neutral-200/80 shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden"
            >
              <div className="relative aspect-[3/4] bg-neutral-100 rounded-lg overflow-hidden mb-3">
                <img 
                  src={getImageUrl(product)} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800"; }}
                />

                <button
                  onClick={(e) => handleWishlistToggle(e, product.id)}
                  className="absolute top-2.5 right-2.5 p-2 bg-white/90 backdrop-blur rounded-full text-neutral-700 hover:scale-110 transition-transform shadow-md"
                >
                  <Heart 
                    size={14} 
                    className={wishlistMap[product.id] ? "fill-red-500 text-red-500" : "text-neutral-600"} 
                  />
                </button>
              </div>

              <h4 className="text-xs font-medium text-neutral-800 truncate px-0.5">{product.name}</h4>
              <p className="text-xs font-serif font-bold text-neutral-900 mt-1 px-0.5">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FULL WIDTH EDITORIAL BANNER */}
      <section className="w-full mt-16 bg-[#EBE5DC] border-y border-neutral-200">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full">
          <div className="h-[320px] sm:h-[420px] w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200" 
              alt="Wardrobe" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>

          <div className="p-8 sm:p-14 lg:p-20">
            <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-bold block mb-2">
              THE ATELIER PHILOSOPHY
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 mb-4 leading-tight">
              Crafted For <br /> Enduring Elegance
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-light mb-8 max-w-md leading-relaxed">
              Every garment we create is an ode to refined luxury, using sustainably sourced natural fabrics and uncompromising attention to detail.
            </p>
            <button 
              onClick={() => navigate('/about')}
              className="bg-neutral-900 text-white px-8 py-3.5 text-[10px] uppercase tracking-[0.3em] font-semibold hover:bg-black transition-all shadow-md"
            >
              Discover Our Story
            </button>
          </div>
        </div>
      </section>

      {/* 6. COMPACT LUXURY TRUST BADGES */}
      <section className="w-full px-6 sm:px-10 md:px-16 mt-16 max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-t border-b border-neutral-200">
          
          <div className="flex items-center gap-3.5 p-3 group">
            <div className="w-10 h-10 rounded-full bg-neutral-200/60 flex items-center justify-center shrink-0 text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
              <Award size={18} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900">Exquisite Quality</h4>
              <p className="text-[10px] text-neutral-500 font-light mt-0.5">Finest global textiles</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 group">
            <div className="w-10 h-10 rounded-full bg-neutral-200/60 flex items-center justify-center shrink-0 text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
              <RefreshCw size={18} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900">Easy Returns</h4>
              <p className="text-[10px] text-neutral-500 font-light mt-0.5">14-day hassle-free exchange</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 group">
            <div className="w-10 h-10 rounded-full bg-neutral-200/60 flex items-center justify-center shrink-0 text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
              <ShieldCheck size={18} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900">Secure Checkout</h4>
              <p className="text-[10px] text-neutral-500 font-light mt-0.5">100% encrypted gateway</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 group">
            <div className="w-10 h-10 rounded-full bg-neutral-200/60 flex items-center justify-center shrink-0 text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
              <Headphones size= {18} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900">Atelier Support</h4>
              <p className="text-[10px] text-neutral-500 font-light mt-0.5">Dedicated concierge desk</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}