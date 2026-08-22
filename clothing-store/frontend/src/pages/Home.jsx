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














// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Heart, ArrowRight, ShieldCheck, RefreshCw, Headphones, Award, Sparkles } from 'lucide-react';
// import API, { addToWishlist, removeFromWishlist, getWishlist } from '../services/api';

// export default function Home() {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [wishlistMap, setWishlistMap] = useState({});
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Hero Slider Data (High-end Atelier Vibe)
//   const heroSlides = [
//     {
//       subtitle: "THE HAUTE COUTURE EDIT",
//       title: "Timeless Elegance\nModern Silhouettes",
//       description: "Discover meticulously crafted pieces designed for the discerning wardrobe.",
//       image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop",
//       btnText: "EXPLORE COLLECTION",
//       link: "/shop"
//     },
//     {
//       subtitle: "SEASONAL DROPS • AW '26",
//       title: "Refined Luxury\nUncompromised Quality",
//       description: "Immerse yourself in exceptional textiles and bespoke tailoring.",
//       image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400&auto=format&fit=crop",
//       btnText: "SHOP NEW ARRIVALS",
//       link: "/new-arrivals"
//     },
//     {
//       subtitle: "BESPOKE ARTISTRY",
//       title: "Grace Redefined\nEvery Single Day",
//       description: "Elevate your personal style with pieces curated for pure sophistication.",
//       image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop",
//       btnText: "VIEW LOOKBOOK",
//       link: "/shop"
//     }
//   ];

//   // Auto Scroll Effect for Hero Section (Changes every 5 seconds)
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
//     }, 5000);
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
//     { name: 'T-Shirts', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400', slug: 't-shirts' },
//     { name: 'Jeans', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=400', slug: 'jeans' },
//     { name: 'Dresses', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400', slug: 'dresses' },
//     { name: 'Kurtas', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400', slug: 'kurtas' },
//     { name: 'Jackets', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400', slug: 'jackets' },
//     { name: 'Accessories', img: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=400', slug: 'accessories' },
//   ];

//   return (
//     <div className="bg-[#FAF8F5] text-neutral-900 font-sans antialiased selection:bg-neutral-900 selection:text-white pb-12">

//       {/* 1. LUXURY HERO SLIDER */}
//       <section className="relative w-full h-[85vh] min-h-[550px] max-h-[750px] bg-[#E8DFD5] flex items-center overflow-hidden">
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
//               className="absolute inset-0 w-full h-full object-cover object-center scale-105"
//             />
//             {/* Elegant Gradient Overlay */}
//             <div className="absolute inset-0 w-full md:w-3/5 bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none" />

//             <div className="relative z-10 px-8 sm:px-16 md:px-24 max-w-2xl text-white">
//               <div className="flex items-center gap-2 mb-4">
//                 <Sparkles size={14} className="text-amber-200" />
//                 <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-amber-100 block">
//                   {slide.subtitle}
//                 </span>
//               </div>

//               <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light leading-[1.1] mb-6 tracking-tight whitespace-pre-line">
//                 {slide.title}
//               </h1>

//               <p className="text-xs sm:text-sm font-light leading-relaxed text-neutral-200 mb-8 max-w-md">
//                 {slide.description}
//               </p>

//               <button
//                 onClick={() => navigate(slide.link)}
//                 className="bg-white text-neutral-900 px-9 py-4 text-[10px] uppercase tracking-[0.3em] font-semibold hover:bg-neutral-900 hover:text-white transition-all duration-300 shadow-xl"
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
//                   idx === currentSlide ? 'font-bold border-b border-white pb-1 text-white scale-110' : 'font-normal text-white/40 hover:text-white'
//                 }`}
//               >
//                 0{idx + 1}
//               </span>
//               {idx < heroSlides.length - 1 && <div className="w-[1px] h-6 bg-white/20" />}
//             </React.Fragment>
//           ))}
//         </div>
//       </section>

//       {/* 2. EDITORIAL GENDER CARDS */}
//       <section className="w-full px-6 sm:px-10 md:px-16 -mt-14 relative z-20 max-w-[1500px] mx-auto">
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
//           <div 
//             onClick={() => navigate('/shop?gender=men')}
//             className="bg-white/95 backdrop-blur-md p-6 sm:p-8 flex items-center justify-between cursor-pointer group hover:bg-white transition-all duration-500 border border-neutral-200/80 shadow-md rounded-xl overflow-hidden"
//           >
//             <div>
//               <span className="text-[9px] tracking-[0.3em] text-neutral-400 uppercase font-bold block mb-1">ATELIER EDIT</span>
//               <h3 className="font-serif text-xl tracking-tight text-neutral-900">MEN</h3>
//               <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium mt-0.5">Tailored Excellence</p>
//               <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-900 flex items-center gap-2 mt-4 group-hover:translate-x-2 transition-transform">
//                 Discover <ArrowRight size={13} />
//               </span>
//             </div>
//             <div className="w-24 h-32 bg-neutral-100 rounded-lg overflow-hidden shrink-0 shadow-sm">
//               <img 
//                 src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=300" 
//                 alt="Men" 
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//               />
//             </div>
//           </div>

//           <div 
//             onClick={() => navigate('/shop?gender=women')}
//             className="bg-white/95 backdrop-blur-md p-6 sm:p-8 flex items-center justify-between cursor-pointer group hover:bg-white transition-all duration-500 border border-neutral-200/80 shadow-md rounded-xl overflow-hidden"
//           >
//             <div>
//               <span className="text-[9px] tracking-[0.3em] text-neutral-400 uppercase font-bold block mb-1">ATELIER EDIT</span>
//               <h3 className="font-serif text-xl tracking-tight text-neutral-900">WOMEN</h3>
//               <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium mt-0.5">Haute Couture</p>
//               <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-900 flex items-center gap-2 mt-4 group-hover:translate-x-2 transition-transform">
//                 Discover <ArrowRight size={13} />
//               </span>
//             </div>
//             <div className="w-24 h-32 bg-neutral-100 rounded-lg overflow-hidden shrink-0 shadow-sm">
//               <img 
//                 src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300" 
//                 alt="Women" 
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//               />
//             </div>
//           </div>

//           <div 
//             onClick={() => navigate('/shop?gender=kids')}
//             className="bg-white/95 backdrop-blur-md p-6 sm:p-8 flex items-center justify-between cursor-pointer group hover:bg-white transition-all duration-500 border border-neutral-200/80 shadow-md rounded-xl overflow-hidden"
//           >
//             <div>
//               <span className="text-[9px] tracking-[0.3em] text-neutral-400 uppercase font-bold block mb-1">ATELIER EDIT</span>
//               <h3 className="font-serif text-xl tracking-tight text-neutral-900">KIDS</h3>
//               <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium mt-0.5">Little Luxury</p>
//               <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-900 flex items-center gap-2 mt-4 group-hover:translate-x-2 transition-transform">
//                 Discover <ArrowRight size={13} />
//               </span>
//             </div>
//             <div className="w-24 h-32 bg-neutral-100 rounded-lg overflow-hidden shrink-0 shadow-sm">
//               <img 
//                 src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=300" 
//                 alt="Kids" 
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//               />
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* 3. CURATED CATEGORIES */}
//       <section className="w-full px-6 sm:px-10 md:px-16 mt-16 max-w-[1500px] mx-auto">
//         <div className="text-center mb-8">
//           <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block mb-1.5">
//             EXPLORE THE BOUTIQUE
//           </span>
//           <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900 tracking-tight">Shop By Category</h2>
//           <div className="w-10 h-[1px] bg-neutral-400 mx-auto mt-3"></div>
//         </div>

//         <div className="flex items-center justify-start sm:justify-center gap-6 sm:gap-12 overflow-x-auto pb-3 scrollbar-none">
//           {categoriesList.map((cat, idx) => (
//             <div 
//               key={idx}
//               onClick={() => navigate(`/shop?category=${cat.slug}`)}
//               className="flex flex-col items-center gap-2.5 cursor-pointer group shrink-0"
//             >
//               <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-neutral-200 border border-neutral-300 p-1 group-hover:border-neutral-900 transition-all shadow-sm">
//                 <img src={cat.img} alt={cat.name} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700" />
//               </div>
//               <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-800 group-hover:text-black">
//                 {cat.name}
//               </span>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 4. TRENDING PIECES */}
//       <section className="w-full px-6 sm:px-10 md:px-16 mt-16 max-w-[1500px] mx-auto">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-neutral-200 pb-4">
//           <div>
//             <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block mb-1.5">
//               CURATED FAVORITES
//             </span>
//             <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900 tracking-tight">Trending Pieces</h2>
//           </div>
//           <button 
//             onClick={() => navigate('/shop')}
//             className="mt-2 sm:mt-0 text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-900 underline underline-offset-8 hover:text-neutral-600 transition"
//           >
//             View Entire Collection →
//           </button>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
//           {products.slice(0, 5).map((product) => (
//             <div 
//               key={product.id}
//               onClick={() => navigate(`/product/${product.id}`)}
//               className="group cursor-pointer flex flex-col bg-white p-3 border border-neutral-200/80 shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden"
//             >
//               <div className="relative aspect-[3/4] bg-neutral-100 rounded-lg overflow-hidden mb-3">
//                 <img 
//                   src={getImageUrl(product)} 
//                   alt={product.name} 
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                   onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800"; }}
//                 />

//                 <button
//                   onClick={(e) => handleWishlistToggle(e, product.id)}
//                   className="absolute top-2.5 right-2.5 p-2 bg-white/90 backdrop-blur rounded-full text-neutral-700 hover:scale-110 transition-transform shadow-md"
//                 >
//                   <Heart 
//                     size={14} 
//                     className={wishlistMap[product.id] ? "fill-red-500 text-red-500" : "text-neutral-600"} 
//                   />
//                 </button>
//               </div>

//               <h4 className="text-xs font-medium text-neutral-800 truncate px-0.5">{product.name}</h4>
//               <p className="text-xs font-serif font-bold text-neutral-900 mt-1 px-0.5">
//                 ₹{Number(product.price).toLocaleString('en-IN')}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 5. FULL WIDTH EDITORIAL BANNER */}
//       <section className="w-full mt-16 bg-[#EBE5DC] border-y border-neutral-200">
//         <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full">
//           <div className="h-[320px] sm:h-[420px] w-full overflow-hidden">
//             <img 
//               src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200" 
//               alt="Wardrobe" 
//               className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
//             />
//           </div>

//           <div className="p-8 sm:p-14 lg:p-20">
//             <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-bold block mb-2">
//               THE ATELIER PHILOSOPHY
//             </span>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 mb-4 leading-tight">
//               Crafted For <br /> Enduring Elegance
//             </h2>
//             <p className="text-xs sm:text-sm text-neutral-600 font-light mb-8 max-w-md leading-relaxed">
//               Every garment we create is an ode to refined luxury, using sustainably sourced natural fabrics and uncompromising attention to detail.
//             </p>
//             <button 
//               onClick={() => navigate('/about')}
//               className="bg-neutral-900 text-white px-8 py-3.5 text-[10px] uppercase tracking-[0.3em] font-semibold hover:bg-black transition-all shadow-md"
//             >
//               Discover Our Story
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* 6. COMPACT LUXURY TRUST BADGES */}
//       <section className="w-full px-6 sm:px-10 md:px-16 mt-16 max-w-[1500px] mx-auto">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-t border-b border-neutral-200">
          
//           <div className="flex items-center gap-3.5 p-3 group">
//             <div className="w-10 h-10 rounded-full bg-neutral-200/60 flex items-center justify-center shrink-0 text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
//               <Award size={18} strokeWidth={1.5} />
//             </div>
//             <div>
//               <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900">Exquisite Quality</h4>
//               <p className="text-[10px] text-neutral-500 font-light mt-0.5">Finest global textiles</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3.5 p-3 group">
//             <div className="w-10 h-10 rounded-full bg-neutral-200/60 flex items-center justify-center shrink-0 text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
//               <RefreshCw size={18} strokeWidth={1.5} />
//             </div>
//             <div>
//               <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900">Easy Returns</h4>
//               <p className="text-[10px] text-neutral-500 font-light mt-0.5">14-day hassle-free exchange</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3.5 p-3 group">
//             <div className="w-10 h-10 rounded-full bg-neutral-200/60 flex items-center justify-center shrink-0 text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
//               <ShieldCheck size={18} strokeWidth={1.5} />
//             </div>
//             <div>
//               <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900">Secure Checkout</h4>
//               <p className="text-[10px] text-neutral-500 font-light mt-0.5">100% encrypted gateway</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3.5 p-3 group">
//             <div className="w-10 h-10 rounded-full bg-neutral-200/60 flex items-center justify-center shrink-0 text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
//               <Headphones size= {18} strokeWidth={1.5} />
//             </div>
//             <div>
//               <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900">Atelier Support</h4>
//               <p className="text-[10px] text-neutral-500 font-light mt-0.5">Dedicated concierge desk</p>
//             </div>
//           </div>

//         </div>
//       </section>

//     </div>
//   );
// }






// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Heart, ArrowRight, ShieldCheck, RefreshCw, Headphones, Award, Sparkles } from 'lucide-react';
// import API, { addToWishlist, removeFromWishlist, getWishlist } from '../services/api';

// export default function Home() {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [wishlistMap, setWishlistMap] = useState({});
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Brand accent used consistently across the site — matches ProductDetail's gold (#C8A882)
//   const GOLD = '#C8A882';

//   const heroSlides = [
//     {
//       subtitle: 'THE HAUTE COUTURE EDIT',
//       title: 'Timeless Elegance\nModern Silhouettes',
//       description: 'Discover meticulously crafted pieces designed for the discerning wardrobe.',
//       image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop',
//       btnText: 'EXPLORE COLLECTION',
//       link: '/shop',
//     },
//     {
//       subtitle: "SEASONAL DROPS • AW '26",
//       title: 'Refined Luxury\nUncompromised Quality',
//       description: 'Immerse yourself in exceptional textiles and bespoke tailoring.',
//       image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400&auto=format&fit=crop',
//       btnText: 'SHOP NEW ARRIVALS',
//       link: '/new-arrivals',
//     },
//     {
//       subtitle: 'BESPOKE ARTISTRY',
//       title: 'Grace Redefined\nEvery Single Day',
//       description: 'Elevate your personal style with pieces curated for pure sophistication.',
//       image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop',
//       btnText: 'VIEW LOOKBOOK',
//       link: '/shop',
//     },
//   ];

//   const marqueeItems = [
//     'COMPLIMENTARY EXPRESS SHIPPING ABOVE ₹999',
//     '100% AUTHENTIC LUXURY GARMENTS',
//     '14-DAY EFFORTLESS RETURNS',
//     'DEDICATED ATELIER CONCIERGE',
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [heroSlides.length]);

//   const getImageUrl = (product) => {
//     let imagePath = product?.image;
//     if (!imagePath && product?.images && product.images.length > 0) {
//       imagePath = product.images[0]?.image || product.images[0];
//     }
//     if (!imagePath) return 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800';

//     if (typeof imagePath === 'string' && (imagePath.startsWith('http://') || imagePath.startsWith('https://'))) {
//       return imagePath;
//     }

//     const cleanPath = typeof imagePath === 'string' && imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
//     return `https://clothing-backend-gynt.onrender.com${cleanPath}`;
//   };

//   useEffect(() => {
//     API.get('products/')
//       .then((res) => {
//         const data = Array.isArray(res.data) ? res.data : res.data.results || [];
//         setProducts(data);
//       })
//       .catch((err) => console.error(err));

//     const token = localStorage.getItem('access_token');
//     if (token) {
//       getWishlist()
//         .then((res) => {
//           const list = Array.isArray(res.data) ? res.data : res.data.results || [];
//           const map = {};
//           list.forEach((item) => {
//             map[item.product] = item.id;
//           });
//           setWishlistMap(map);
//         })
//         .catch((err) => console.error(err));
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
//         setWishlistMap((prev) => {
//           const newMap = { ...prev };
//           delete newMap[productId];
//           return newMap;
//         });
//       } else {
//         const res = await addToWishlist(productId);
//         setWishlistMap((prev) => ({ ...prev, [productId]: res.data.id }));
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const categoriesList = [
//     { name: 'Shirts', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=400', slug: 'shirts' },
//     { name: 'T-Shirts', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400', slug: 't-shirts' },
//     { name: 'Jeans', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=400', slug: 'jeans' },
//     { name: 'Dresses', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400', slug: 'dresses' },
//     { name: 'Kurtas', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400', slug: 'kurtas' },
//     { name: 'Jackets', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400', slug: 'jackets' },
//     { name: 'Accessories', img: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=400', slug: 'accessories' },
//   ];

//   return (
//     <div className="bg-[#FAF8F5] text-neutral-900 font-sans antialiased selection:bg-neutral-900 selection:text-white pb-12">

//       {/* 1. LUXURY HERO SLIDER */}
//       <section className="relative w-full h-[85vh] min-h-[550px] max-h-[750px] bg-[#E8DFD5] flex items-center overflow-hidden">
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
//               className="absolute inset-0 w-full h-full object-cover object-center scale-105"
//             />
//             <div className="absolute inset-0 w-full md:w-3/5 bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none" />

//             <div className="relative z-10 px-8 sm:px-16 md:px-24 max-w-2xl text-white">
//               <div className="flex items-center gap-2 mb-4">
//                 <Sparkles size={14} style={{ color: GOLD }} />
//                 <span className="text-[10px] uppercase tracking-[0.4em] font-medium block" style={{ color: '#E7D3B8' }}>
//                   {slide.subtitle}
//                 </span>
//               </div>

//               <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light leading-[1.1] mb-6 tracking-tight whitespace-pre-line">
//                 {slide.title}
//               </h1>

//               <p className="text-xs sm:text-sm font-light leading-relaxed text-neutral-200 mb-8 max-w-md">
//                 {slide.description}
//               </p>

//               <button
//                 onClick={() => navigate(slide.link)}
//                 className="relative bg-white text-neutral-900 px-9 py-4 text-[10px] uppercase tracking-[0.3em] font-semibold transition-all duration-300 shadow-xl group/btn overflow-hidden"
//               >
//                 <span className="relative z-10 group-hover/btn:text-neutral-900 transition-colors duration-300">
//                   {slide.btnText}
//                 </span>
//                 <span
//                   className="absolute inset-0 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"
//                   style={{ backgroundColor: GOLD }}
//                 />
//               </button>
//             </div>
//           </div>
//         ))}

//         <div className="absolute right-8 sm:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 text-white z-20">
//           {heroSlides.map((_, idx) => (
//             <React.Fragment key={idx}>
//               <span
//                 onClick={() => setCurrentSlide(idx)}
//                 className="text-xs font-serif tracking-widest cursor-pointer transition-all"
//                 style={
//                   idx === currentSlide
//                     ? { fontWeight: 700, color: GOLD, borderBottom: `1px solid ${GOLD}`, paddingBottom: '4px', transform: 'scale(1.1)' }
//                     : { fontWeight: 400, color: 'rgba(255,255,255,0.4)' }
//                 }
//               >
//                 0{idx + 1}
//               </span>
//               {idx < heroSlides.length - 1 && <div className="w-[1px] h-6 bg-white/20" />}
//             </React.Fragment>
//           ))}
//         </div>
//       </section>

//       {/* SIGNATURE ELEMENT: Scrolling Atelier Assurance Marquee */}
//       <div className="w-full bg-neutral-900 overflow-hidden py-3 relative z-30">
//         <div className="flex whitespace-nowrap animate-[marquee_28s_linear_infinite]">
//           {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
//             <span key={idx} className="flex items-center text-white/90 mx-6">
//               <span className="text-[10px] uppercase tracking-[0.3em] font-medium">{item}</span>
//               <span className="mx-6 text-sm" style={{ color: GOLD }}>✦</span>
//             </span>
//           ))}
//         </div>
//         <style>{`
//           @keyframes marquee {
//             0% { transform: translateX(0); }
//             100% { transform: translateX(-33.333%); }
//           }
//           @media (prefers-reduced-motion: reduce) {
//             .animate-\\[marquee_28s_linear_infinite\\] { animation: none; }
//           }
//         `}</style>
//       </div>

//       {/* 2. EDITORIAL GENDER CARDS */}
//       <section className="w-full px-6 sm:px-10 md:px-16 mt-10 relative z-20 max-w-[1500px] mx-auto">
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

//           <div
//             onClick={() => navigate('/shop?gender=men')}
//             className="bg-white/95 backdrop-blur-md p-6 sm:p-8 flex items-center justify-between cursor-pointer group hover:bg-white transition-all duration-500 border border-neutral-200/80 shadow-md hover:shadow-xl rounded-xl overflow-hidden"
//             onMouseEnter={(e) => (e.currentTarget.style.borderColor = GOLD)}
//             onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
//           >
//             <div>
//               <span className="text-[9px] tracking-[0.3em] text-neutral-400 uppercase font-bold block mb-1">ATELIER EDIT</span>
//               <h3 className="font-serif text-xl tracking-tight text-neutral-900">MEN</h3>
//               <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium mt-0.5">Tailored Excellence</p>
//               <span className="text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 mt-4 group-hover:translate-x-2 transition-transform" style={{ color: GOLD }}>
//                 Discover <ArrowRight size={13} />
//               </span>
//             </div>
//             <div className="w-24 h-32 bg-neutral-100 rounded-lg overflow-hidden shrink-0 shadow-sm">
//               <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=300" alt="Men" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
//             </div>
//           </div>

//           <div
//             onClick={() => navigate('/shop?gender=women')}
//             className="bg-white/95 backdrop-blur-md p-6 sm:p-8 flex items-center justify-between cursor-pointer group hover:bg-white transition-all duration-500 border border-neutral-200/80 shadow-md hover:shadow-xl rounded-xl overflow-hidden"
//             onMouseEnter={(e) => (e.currentTarget.style.borderColor = GOLD)}
//             onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
//           >
//             <div>
//               <span className="text-[9px] tracking-[0.3em] text-neutral-400 uppercase font-bold block mb-1">ATELIER EDIT</span>
//               <h3 className="font-serif text-xl tracking-tight text-neutral-900">WOMEN</h3>
//               <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium mt-0.5">Haute Couture</p>
//               <span className="text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 mt-4 group-hover:translate-x-2 transition-transform" style={{ color: GOLD }}>
//                 Discover <ArrowRight size={13} />
//               </span>
//             </div>
//             <div className="w-24 h-32 bg-neutral-100 rounded-lg overflow-hidden shrink-0 shadow-sm">
//               <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300" alt="Women" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
//             </div>
//           </div>

//           <div
//             onClick={() => navigate('/shop?gender=kids')}
//             className="bg-white/95 backdrop-blur-md p-6 sm:p-8 flex items-center justify-between cursor-pointer group hover:bg-white transition-all duration-500 border border-neutral-200/80 shadow-md hover:shadow-xl rounded-xl overflow-hidden"
//             onMouseEnter={(e) => (e.currentTarget.style.borderColor = GOLD)}
//             onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
//           >
//             <div>
//               <span className="text-[9px] tracking-[0.3em] text-neutral-400 uppercase font-bold block mb-1">ATELIER EDIT</span>
//               <h3 className="font-serif text-xl tracking-tight text-neutral-900">KIDS</h3>
//               <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium mt-0.5">Little Luxury</p>
//               <span className="text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 mt-4 group-hover:translate-x-2 transition-transform" style={{ color: GOLD }}>
//                 Discover <ArrowRight size={13} />
//               </span>
//             </div>
//             <div className="w-24 h-32 bg-neutral-100 rounded-lg overflow-hidden shrink-0 shadow-sm">
//               <img src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=300" alt="Kids" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
//             </div>
//           </div>

//         </div>
//       </section>


//             {/* 3. CURATED CATEGORIES */}
//       <section className="w-full px-6 sm:px-10 md:px-16 mt-16 max-w-[1500px] mx-auto">
//         <div className="text-center mb-8">
//           <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block mb-1.5">
//             EXPLORE THE BOUTIQUE
//           </span>
//           <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900 tracking-tight">Shop By Category</h2>
//           <div className="w-10 h-[1px] mx-auto mt-3" style={{ backgroundColor: GOLD }}></div>
//         </div>

//         <div className="flex items-center justify-start sm:justify-center gap-6 sm:gap-12 overflow-x-auto pb-3 scrollbar-none">
//           {categoriesList.map((cat, idx) => (
//             <div
//               key={idx}
//               onClick={() => navigate(`/shop?category=${cat.slug}`)}
//               className="flex flex-col items-center gap-2.5 cursor-pointer group shrink-0"
//             >
//               <div
//                 className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-neutral-200 border p-1 transition-all shadow-sm"
//                 style={{ borderColor: '#E5DDD0' }}
//                 onMouseEnter={(e) => (e.currentTarget.style.borderColor = GOLD)}
//                 onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#E5DDD0')}
//               >
//                 <img src={cat.img} alt={cat.name} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700" />
//               </div>
//               <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-800 group-hover:text-black">
//                 {cat.name}
//               </span>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 4. TRENDING PIECES */}
//       <section className="w-full px-6 sm:px-10 md:px-16 mt-16 max-w-[1500px] mx-auto">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-neutral-200 pb-4">
//           <div>
//             <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block mb-1.5">
//               CURATED FAVORITES
//             </span>
//             <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900 tracking-tight">Trending Pieces</h2>
//           </div>
//           <button
//             onClick={() => navigate('/shop')}
//             className="mt-2 sm:mt-0 text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-900 underline underline-offset-8 transition"
//             onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
//             onMouseLeave={(e) => (e.currentTarget.style.color = '')}
//           >
//             View Entire Collection →
//           </button>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
//           {products.slice(0, 5).map((product) => (
//             <div
//               key={product.id}
//               onClick={() => navigate(`/product/${product.id}`)}
//               className="group cursor-pointer flex flex-col bg-white p-3 border border-neutral-200/80 shadow-sm hover:shadow-lg transition-all rounded-xl overflow-hidden"
//               onMouseEnter={(e) => (e.currentTarget.style.borderColor = GOLD)}
//               onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
//             >
//               <div className="relative aspect-[3/4] bg-neutral-100 rounded-lg overflow-hidden mb-3">
//                 <img
//                   src={getImageUrl(product)}
//                   alt={product.name}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                   onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800'; }}
//                 />

//                 <button
//                   onClick={(e) => handleWishlistToggle(e, product.id)}
//                   className="absolute top-2.5 right-2.5 p-2 bg-white/90 backdrop-blur rounded-full text-neutral-700 hover:scale-110 transition-transform shadow-md"
//                 >
//                   <Heart
//                     size={14}
//                     className={wishlistMap[product.id] ? 'fill-red-500 text-red-500' : 'text-neutral-600'}
//                   />
//                 </button>
//               </div>

//               <h4 className="text-xs font-medium text-neutral-800 truncate px-0.5">{product.name}</h4>
//               <p className="text-xs font-serif font-bold mt-1 px-0.5" style={{ color: '#8A6D46' }}>
//                 ₹{Number(product.price).toLocaleString('en-IN')}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 5. FULL WIDTH EDITORIAL BANNER */}
//       <section className="w-full mt-16 bg-[#EBE5DC] border-y border-neutral-200">
//         <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full">
//           <div className="h-[320px] sm:h-[420px] w-full overflow-hidden">
//             <img
//               src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200"
//               alt="Wardrobe"
//               className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
//             />
//           </div>

//           <div className="p-8 sm:p-14 lg:p-20">
//             <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-bold block mb-2">
//               THE ATELIER PHILOSOPHY
//             </span>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 mb-4 leading-tight">
//               Crafted For <br /> Enduring Elegance
//             </h2>
//             <p className="text-xs sm:text-sm text-neutral-600 font-light mb-8 max-w-md leading-relaxed">
//               Every garment we create is an ode to refined luxury, using sustainably sourced natural fabrics and uncompromising attention to detail.
//             </p>
//             <button
//               onClick={() => navigate('/about')}
//               className="relative text-white px-8 py-3.5 text-[10px] uppercase tracking-[0.3em] font-semibold transition-all shadow-md overflow-hidden group/story"
//               style={{ backgroundColor: '#1a1a1a' }}
//             >
//               <span className="relative z-10">Discover Our Story</span>
//               <span
//                 className="absolute inset-0 translate-y-full group-hover/story:translate-y-0 transition-transform duration-300 ease-out"
//                 style={{ backgroundColor: GOLD }}
//               />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* 6. COMPACT LUXURY TRUST BADGES */}
//       <section className="w-full px-6 sm:px-10 md:px-16 mt-16 max-w-[1500px] mx-auto">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-t border-b border-neutral-200">

//           <div className="flex items-center gap-3.5 p-3 group">
//             <div
//               className="w-10 h-10 rounded-full bg-neutral-200/60 flex items-center justify-center shrink-0 text-neutral-900 transition-colors duration-300"
//               onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = GOLD; e.currentTarget.style.color = '#fff'; }}
//               onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = ''; }}
//             >
//               <Award size={18} strokeWidth={1.5} />
//             </div>
//             <div>
//               <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900">Exquisite Quality</h4>
//               <p className="text-[10px] text-neutral-500 font-light mt-0.5">Finest global textiles</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3.5 p-3 group">
//             <div
//               className="w-10 h-10 rounded-full bg-neutral-200/60 flex items-center justify-center shrink-0 text-neutral-900 transition-colors duration-300"
//               onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = GOLD; e.currentTarget.style.color = '#fff'; }}
//               onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = ''; }}
//             >
//               <RefreshCw size={18} strokeWidth={1.5} />
//             </div>
//             <div>
//               <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900">Easy Returns</h4>
//               <p className="text-[10px] text-neutral-500 font-light mt-0.5">14-day hassle-free exchange</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3.5 p-3 group">
//             <div
//               className="w-10 h-10 rounded-full bg-neutral-200/60 flex items-center justify-center shrink-0 text-neutral-900 transition-colors duration-300"
//               onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = GOLD; e.currentTarget.style.color = '#fff'; }}
//               onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = ''; }}
//             >
//               <ShieldCheck size={18} strokeWidth={1.5} />
//             </div>
//             <div>
//               <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900">Secure Checkout</h4>
//               <p className="text-[10px] text-neutral-500 font-light mt-0.5">100% encrypted gateway</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3.5 p-3 group">
//             <div
//               className="w-10 h-10 rounded-full bg-neutral-200/60 flex items-center justify-center shrink-0 text-neutral-900 transition-colors duration-300"
//               onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = GOLD; e.currentTarget.style.color = '#fff'; }}
//               onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = ''; }}
//             >
//               <Headphones size={18} strokeWidth={1.5} />
//             </div>
//             <div>
//               <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900">Atelier Support</h4>
//               <p className="text-[10px] text-neutral-500 font-light mt-0.5">Dedicated concierge desk</p>
//             </div>
//           </div>

//         </div>
//       </section>

//     </div>
//   );
// }











import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Headphones,
  Truck,
  ShoppingBag,
  Sparkles,
  Search,
  UserRound,
  ChevronRight,
} from "lucide-react";

import API, {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../services/api";

export default function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [wishlistMap, setWishlistMap] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

  const GOLD = "#C8A882";

  /* =========================================================
     HERO SLIDES
     ========================================================= */

  const heroSlides = [
    {
      subtitle: "NEW COLLECTION",
      title: "Timeless Style.\nUnmatched Elegance.",
      description:
        "Discover our latest collection, crafted for the modern wardrobe.",
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1800&auto=format&fit=crop",
      btnText: "SHOP NOW",
      secondaryText: "EXPLORE COLLECTION",
      link: "/shop",
    },
    {
      subtitle: "SEASONAL DROPS • AW '26",
      title: "Refined Luxury.\nUncompromised Quality.",
      description:
        "Immerse yourself in exceptional textiles and timeless silhouettes.",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1800&auto=format&fit=crop",
      btnText: "SHOP NEW ARRIVALS",
      secondaryText: "VIEW COLLECTION",
      link: "/new-arrivals",
    },
    {
      subtitle: "BESPOKE ARTISTRY",
      title: "Grace Redefined.\nEvery Single Day.",
      description:
        "Elevate your personal style with pieces curated for pure sophistication.",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1800&auto=format&fit=crop",
      btnText: "EXPLORE",
      secondaryText: "VIEW LOOKBOOK",
      link: "/shop",
    },
  ];

  /* =========================================================
     MARQUEE
     ========================================================= */

  const marqueeItems = [
    "FREE SHIPPING ON ORDERS OVER ₹999",
    "100% AUTHENTIC LUXURY GARMENTS",
    "14-DAY EASY RETURNS",
    "SECURE PAYMENT",
    "DEDICATED ATELIER CONCIERGE",
  ];

  /* =========================================================
     HERO AUTO SLIDER
     ========================================================= */

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  /* =========================================================
     EXISTING BACKEND IMAGE HANDLER
     ========================================================= */

  const getImageUrl = (product) => {
    let imagePath = product?.image;

    if (!imagePath && product?.images && product.images.length > 0) {
      imagePath = product.images[0]?.image || product.images[0];
    }

    if (!imagePath) {
      return "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800";
    }

    if (
      typeof imagePath === "string" &&
      (imagePath.startsWith("http://") ||
        imagePath.startsWith("https://"))
    ) {
      return imagePath;
    }

    const cleanPath =
      typeof imagePath === "string" && imagePath.startsWith("/")
        ? imagePath
        : `/${imagePath}`;

    return `https://clothing-backend-gynt.onrender.com${cleanPath}`;
  };

  /* =========================================================
     EXISTING PRODUCT API
     ========================================================= */

  useEffect(() => {
    API.get("products/")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];

        setProducts(data);
      })
      .catch((err) => {
        console.error(err);
      });

    /* EXISTING WISHLIST API */
    const token = localStorage.getItem("access_token");

    if (token) {
      getWishlist()
        .then((res) => {
          const list = Array.isArray(res.data)
            ? res.data
            : res.data.results || [];

          const map = {};

          list.forEach((item) => {
            map[item.product] = item.id;
          });

          setWishlistMap(map);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  /* =========================================================
     EXISTING WISHLIST FUNCTIONALITY
     ========================================================= */

  const handleWishlistToggle = async (e, productId) => {
    e.stopPropagation();

    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("Please login to add items to your wishlist.");
      navigate("/login");
      return;
    }

    try {
      if (wishlistMap[productId]) {
        const wishlistId = wishlistMap[productId];

        await removeFromWishlist(wishlistId);

        setWishlistMap((prev) => {
          const newMap = { ...prev };
          delete newMap[productId];
          return newMap;
        });
      } else {
        const res = await addToWishlist(productId);

        setWishlistMap((prev) => ({
          ...prev,
          [productId]: res.data.id,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* =========================================================
     CATEGORIES
     ========================================================= */

  const categoriesList = [
    {
      name: "Shirts",
      img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=500",
      slug: "shirts",
    },
    {
      name: "T-Shirts",
      img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=500",
      slug: "t-shirts",
    },
    {
      name: "Jeans",
      img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=500",
      slug: "jeans",
    },
    {
      name: "Dresses",
      img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=500",
      slug: "dresses",
    },
    {
      name: "Kurtas",
      img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=500",
      slug: "kurtas",
    },
    {
      name: "Jackets",
      img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=500",
      slug: "jackets",
    },
    {
      name: "Accessories",
      img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=500",
      slug: "accessories",
    },
    {
      name: "Kids",
      img: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=500",
      slug: "kids",
    },
  ];

  /* =========================================================
     GENDER / COLLECTION CARDS
     ========================================================= */

  const genderCards = [
    {
      name: "MEN",
      subtitle: "Tailored Excellence",
      image:
        "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600",
      gender: "men",
    },
    {
      name: "WOMEN",
      subtitle: "Haute Couture",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600",
      gender: "women",
    },
    {
      name: "KIDS",
      subtitle: "Little Luxury",
      image:
        "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=600",
      gender: "kids",
    },
    {
      name: "ACCESSORIES",
      subtitle: "Finishing Touches",
      image:
        "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=600",
      gender: "accessories",
    },
    {
      name: "FOOTWEAR",
      subtitle: "Walk In Luxury",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600",
      gender: "footwear",
    },
  ];

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 font-sans antialiased overflow-hidden">
      {/* =====================================================
          TOP SHIPPING BAR
      ===================================================== */}

      <div className="h-9 bg-[#090909] text-white flex items-center justify-center">
        <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase">
          Free Shipping On Orders Over ₹999
        </p>
      </div>

      {/* =====================================================
          LUXURY NAVBAR
      ===================================================== */}

      <header className="absolute top-9 left-0 right-0 z-50">
        <div className="border-b border-white/10 bg-black/20 backdrop-blur-md">
          <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-14 h-[72px] flex items-center justify-between">
            {/* LOGO */}

            <button
              onClick={() => navigate("/")}
              className="text-left group"
            >
              <div
                className="font-serif text-[28px] sm:text-[32px] tracking-[0.08em] leading-none"
                style={{ color: GOLD }}
              >
                LUXORA
              </div>

              <div className="text-[7px] sm:text-[8px] text-white/70 tracking-[0.45em] ml-1 mt-1">
                CLOTHING CO.
              </div>
            </button>

            {/* DESKTOP NAV */}

            <nav className="hidden lg:flex items-center gap-8">
              {[
                ["HOME", "/"],
                ["SHOP", "/shop"],
                ["COLLECTIONS", "/shop"],
                ["NEW ARRIVALS", "/new-arrivals"],
                ["ABOUT", "/about"],
                ["CONTACT", "/contact"],
              ].map(([label, path], index) => (
                <button
                  key={label}
                  onClick={() => navigate(path)}
                  className={`relative text-[10px] tracking-[0.18em] text-white transition-all duration-300 ${
                    index === 0 ? "font-medium" : "text-white/80"
                  }`}
                >
                  {label}

                  {index === 0 && (
                    <span
                      className="absolute left-0 right-0 -bottom-7 h-[1px]"
                      style={{ backgroundColor: GOLD }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* NAV ACTIONS */}

            <div className="flex items-center gap-4 sm:gap-5 text-white">
              <button
                onClick={() => navigate("/shop")}
                className="hover:opacity-70 transition"
                aria-label="Search"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>

              <button
                onClick={() => navigate("/login")}
                className="hover:opacity-70 transition"
                aria-label="Account"
              >
                <UserRound size={18} strokeWidth={1.5} />
              </button>

              <button
                onClick={() => navigate("/wishlist")}
                className="hover:opacity-70 transition"
                aria-label="Wishlist"
              >
                <Heart size={19} strokeWidth={1.5} />
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="relative flex items-center justify-center w-8 h-8 rounded-full"
                style={{ backgroundColor: GOLD }}
                aria-label="Cart"
              >
                <ShoppingBag size={14} className="text-black" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative h-[620px] sm:h-[700px] lg:h-[760px] w-full overflow-hidden bg-black">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.image}
              alt="Luxury collection"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* DARK OVERLAY */}

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />

            <div className="absolute inset-0 bg-black/10" />

            {/* HERO CONTENT */}

            <div className="relative z-20 h-full max-w-[1500px] mx-auto px-7 sm:px-14 lg:px-24 flex items-center">
              <div className="max-w-[680px] text-white mt-16">
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles size={13} style={{ color: GOLD }} />

                  <span
                    className="text-[10px] uppercase tracking-[0.35em]"
                    style={{ color: "#E7D3B8" }}
                  >
                    {slide.subtitle}
                  </span>
                </div>

                <h1 className="font-serif font-light text-5xl sm:text-6xl lg:text-[76px] leading-[1.03] tracking-tight whitespace-pre-line mb-7">
                  {slide.title}
                </h1>

                <p className="text-sm sm:text-[15px] text-white/75 font-light leading-7 max-w-[420px] mb-9">
                  {slide.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate(slide.link)}
                    className="px-8 py-4 text-[10px] tracking-[0.25em] uppercase font-semibold text-black transition-all duration-300 hover:brightness-110"
                    style={{ backgroundColor: GOLD }}
                  >
                    {slide.btnText}
                  </button>

                  <button
                    onClick={() => navigate(slide.link)}
                    className="px-8 py-4 border border-white/70 text-white text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-white hover:text-black transition-all duration-300"
                  >
                    {slide.secondaryText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* SLIDE INDICATORS */}

        <div className="absolute right-7 sm:right-12 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-4">
          {heroSlides.map((_, index) => (
            <React.Fragment key={index}>
              <button
                onClick={() => setCurrentSlide(index)}
                className="text-[11px] tracking-widest transition-all"
                style={
                  index === currentSlide
                    ? {
                        color: GOLD,
                        fontWeight: 700,
                      }
                    : {
                        color: "rgba(255,255,255,0.45)",
                      }
                }
              >
                0{index + 1}
              </button>

              {index !== heroSlides.length - 1 && (
                <span className="w-[1px] h-7 bg-white/20" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* =====================================================
          MARQUEE
      ===================================================== */}

      <div className="w-full bg-[#111111] overflow-hidden py-3">
        <div className="flex whitespace-nowrap animate-[luxMarquee_30s_linear_infinite]">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <div
              key={index}
              className="flex items-center shrink-0 mx-8"
            >
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-white/85">
                {item}
              </span>

              <span
                className="mx-8"
                style={{ color: GOLD }}
              >
                ✦
              </span>
            </div>
          ))}
        </div>

        <style>
          {`
            @keyframes luxMarquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
          `}
        </style>
      </div>

      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <section className="bg-white border-b border-neutral-200">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Truck,
              title: "Free Shipping",
              text: "On orders over ₹999",
            },
            {
              icon: RefreshCw,
              title: "Easy Returns",
              text: "14-day return policy",
            },
            {
              icon: ShieldCheck,
              title: "Secure Payment",
              text: "100% secure checkout",
            },
            {
              icon: Headphones,
              title: "24/7 Support",
              text: "We're here to help",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="flex items-center justify-center gap-3 py-7 px-4 border-b lg:border-b-0 lg:border-r last:border-r-0 border-neutral-100"
              >
                <Icon
                  size={22}
                  strokeWidth={1.3}
                  style={{ color: GOLD }}
                />

                <div>
                  <h4 className="text-[11px] font-semibold">
                    {item.title}
                  </h4>

                  <p className="text-[9px] text-neutral-500 mt-1">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          MEN / WOMEN / KIDS / ACCESSORIES / FOOTWEAR
      ===================================================== */}

      <section className="max-w-[1450px] mx-auto px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {genderCards.map((card) => (
            <button
              key={card.name}
              onClick={() =>
                navigate(`/shop?gender=${card.gender}`)
              }
              className="relative group overflow-hidden h-[260px] sm:h-[340px] lg:h-[360px] text-left"
            >
              <img
                src={card.image}
                alt={card.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

              <div className="absolute bottom-6 left-5 sm:left-6 text-white">
                <p className="text-[9px] tracking-[0.25em] uppercase text-white/70 mb-2">
                  ATELIER EDIT
                </p>

                <h3 className="text-lg sm:text-xl tracking-[0.08em] font-medium">
                  {card.name}
                </h3>

                <p className="text-[9px] uppercase tracking-[0.18em] mt-2 text-white/80">
                  {card.subtitle}
                </p>

                <div className="flex items-center gap-2 mt-4 text-[9px] uppercase tracking-[0.2em]">
                  Shop Now
                  <ArrowRight
                    size={12}
                    className="transition-transform group-hover:translate-x-2"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* =====================================================
          SHOP BY CATEGORY
      ===================================================== */}

      <section className="max-w-[1450px] mx-auto px-5 sm:px-8 lg:px-10 mt-16">
        <div className="text-center mb-9">
          <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-400">
            Explore The Boutique
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl mt-2">
            Shop By Category
          </h2>

          <div
            className="w-10 h-[1px] mx-auto mt-4"
            style={{ backgroundColor: GOLD }}
          />
        </div>

        <div className="flex gap-7 sm:gap-12 overflow-x-auto pb-5 justify-start lg:justify-center scrollbar-none">
          {categoriesList.map((category) => (
            <button
              key={category.slug}
              onClick={() =>
                navigate(`/shop?category=${category.slug}`)
              }
              className="group shrink-0 flex flex-col items-center"
            >
              <div
                className="w-[82px] h-[82px] sm:w-[105px] sm:h-[105px] rounded-full p-[3px] border transition-all duration-500"
                style={{ borderColor: "#DED4C7" }}
              >
                <img
                  src={category.img}
                  alt={category.name}
                  className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <span className="mt-3 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* =====================================================
          TRENDING / NEW ARRIVALS
      ===================================================== */}

      <section className="max-w-[1450px] mx-auto px-5 sm:px-8 lg:px-10 mt-16">
        <div className="flex items-end justify-between border-b border-neutral-200 pb-5 mb-7">
          <div>
            <p className="text-[9px] uppercase tracking-[0.35em] text-neutral-400 mb-2">
              New Arrivals
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl">
              Shop The Latest
            </h2>
          </div>

          <button
            onClick={() => navigate("/shop")}
            className="hidden sm:flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] font-semibold hover:opacity-60 transition"
          >
            View All
            <ChevronRight size={13} />
          </button>
        </div>

        {/* PRODUCTS FROM BACKEND */}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {products.slice(0, 5).map((product) => (
            <div
              key={product.id}
              onClick={() =>
                navigate(`/product/${product.id}`)
              }
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] bg-[#F2F0ED] overflow-hidden">
                <img
                  src={getImageUrl(product)}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800";
                  }}
                />

                {/* WISHLIST */}

                <button
                  onClick={(e) =>
                    handleWishlistToggle(e, product.id)
                  }
                  className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Wishlist"
                >
                  <Heart
                    size={15}
                    strokeWidth={1.5}
                    className={
                      wishlistMap[product.id]
                        ? "fill-red-500 text-red-500"
                        : "text-neutral-700"
                    }
                  />
                </button>
              </div>

              <div className="pt-3">
                <h4 className="text-[11px] sm:text-xs font-medium truncate">
                  {product.name}
                </h4>

                <p
                  className="text-[11px] sm:text-xs font-serif font-semibold mt-1"
                  style={{ color: "#8A6D46" }}
                >
                  ₹
                  {Number(product.price).toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/shop")}
          className="sm:hidden mt-7 w-full border border-neutral-300 py-3 text-[9px] uppercase tracking-[0.25em]"
        >
          View All Products
        </button>
      </section>

      {/* =====================================================
          EDITORIAL BANNER
      ===================================================== */}

      <section className="max-w-[1450px] mx-auto px-5 sm:px-8 lg:px-10 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-[#171513] overflow-hidden">
          <div className="min-h-[320px] sm:min-h-[430px]">
            <img
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200"
              alt="Luxury wardrobe"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>

          <div className="flex items-center px-8 sm:px-14 lg:px-20 py-12 sm:py-16 text-white">
            <div>
              <p
                className="text-[9px] uppercase tracking-[0.4em] mb-4"
                style={{ color: GOLD }}
              >
                SPRING / SUMMER 2026
              </p>

              <h2 className="font-serif text-4xl sm:text-5xl leading-tight">
                Elevate Your
                <br />
                Wardrobe
              </h2>

              <p className="text-xs text-white/60 leading-6 mt-5 max-w-sm">
                Refined silhouettes, premium fabrics, and timeless
                designs curated for the modern wardrobe.
              </p>

              <button
                onClick={() => navigate("/shop")}
                className="mt-7 px-7 py-3.5 text-[9px] uppercase tracking-[0.25em] font-semibold text-black"
                style={{ backgroundColor: GOLD }}
              >
                Explore Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRESS / BRAND SECTION
      ===================================================== */}

      <section className="mt-16 border-y border-neutral-200 bg-white">
        <div className="max-w-[1250px] mx-auto px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-7 items-center text-center">
            {[
              "GQ",
              "Esquire",
              "VOGUE",
              "Men's Health",
              "HYPEBEAST",
            ].map((brand) => (
              <span
                key={brand}
                className="font-serif text-xl sm:text-2xl text-neutral-400"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="bg-[#FAF8F5] py-16 text-center px-6">
        <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-400">
          The Luxora Experience
        </p>

        <h2 className="font-serif text-3xl sm:text-4xl mt-3">
          Luxury Made Personal
        </h2>

        <p className="max-w-md mx-auto text-xs text-neutral-500 leading-6 mt-4">
          Discover thoughtfully designed pieces created to remain
          timeless beyond the season.
        </p>

        <button
          onClick={() => navigate("/shop")}
          className="mt-7 px-8 py-4 bg-[#111111] text-white text-[9px] uppercase tracking-[0.3em] hover:bg-[#C8A882] hover:text-black transition-all duration-300"
        >
          Shop The Collection
        </button>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-[#101010] text-white">
        <div className="max-w-[1450px] mx-auto px-6 sm:px-10 lg:px-14 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* BRAND */}

            <div className="lg:col-span-2">
              <div
                className="font-serif text-3xl tracking-[0.08em]"
                style={{ color: GOLD }}
              >
                LUXORA
              </div>

              <p className="text-[7px] tracking-[0.45em] text-white/50 ml-1 mt-1">
                CLOTHING CO.
              </p>

              <p className="text-xs text-white/50 leading-6 max-w-sm mt-6">
                Luxora is a premium clothing brand dedicated to
                timeless style, exceptional quality, and modern
                elegance.
              </p>

              <div className="flex gap-4 mt-7">
                {["f", "◎", "𝕏", "p"].map((icon, index) => (
                  <button
                    key={index}
                    className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-xs text-white/70 hover:border-white hover:text-white transition"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* SHOP */}

            <div>
              <h4 className="text-[10px] tracking-[0.25em] uppercase mb-5">
                Shop
              </h4>

              <div className="space-y-3">
                {[
                  ["All Products", "/shop"],
                  ["New Arrivals", "/new-arrivals"],
                  ["Men", "/shop?gender=men"],
                  ["Women", "/shop?gender=women"],
                  ["Kids", "/shop?gender=kids"],
                  ["Accessories", "/shop?category=accessories"],
                ].map(([label, path]) => (
                  <button
                    key={label}
                    onClick={() => navigate(path)}
                    className="block text-left text-[10px] text-white/50 hover:text-white transition"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* COMPANY */}

            <div>
              <h4 className="text-[10px] tracking-[0.25em] uppercase mb-5">
                Company
              </h4>

              <div className="space-y-3">
                {[
                  ["About Us", "/about"],
                  ["Our Story", "/about"],
                  ["Sustainability", "/about"],
                  ["Contact", "/contact"],
                ].map(([label, path]) => (
                  <button
                    key={label}
                    onClick={() => navigate(path)}
                    className="block text-left text-[10px] text-white/50 hover:text-white transition"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* CUSTOMER CARE */}

            <div>
              <h4 className="text-[10px] tracking-[0.25em] uppercase mb-5">
                Customer Care
              </h4>

              <div className="space-y-3">
                <button
                  onClick={() => navigate("/contact")}
                  className="block text-[10px] text-white/50 hover:text-white transition"
                >
                  Contact Us
                </button>

                <button className="block text-[10px] text-white/50 hover:text-white transition">
                  Shipping & Delivery
                </button>

                <button className="block text-[10px] text-white/50 hover:text-white transition">
                  Returns & Exchanges
                </button>

                <button className="block text-[10px] text-white/50 hover:text-white transition">
                  FAQ
                </button>
              </div>
            </div>
          </div>

          {/* NEWSLETTER */}

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col lg:flex-row justify-between gap-8">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.25em]">
                Join The Atelier
              </h4>

              <p className="text-[10px] text-white/40 mt-2">
                Subscribe for new arrivals and exclusive offers.
              </p>
            </div>

            <div className="flex w-full lg:w-[380px]">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent border border-white/20 px-4 py-3 text-[10px] outline-none placeholder:text-white/30"
              />

              <button
                className="w-12 flex items-center justify-center"
                style={{ backgroundColor: GOLD }}
              >
                <ArrowRight size={15} className="text-black" />
              </button>
            </div>
          </div>

          {/* COPYRIGHT */}

          <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row justify-between gap-4">
            <p className="text-[9px] text-white/35">
              © 2026 Luxora Clothing Co. All rights reserved.
            </p>

            <div className="flex gap-5 text-[9px] text-white/40">
              <span>VISA</span>
              <span>MASTERCARD</span>
              <span>PayPal</span>
              <span>Apple Pay</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}