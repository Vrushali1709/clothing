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











// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Heart,
//   ArrowRight,
//   ShieldCheck,
//   RefreshCw,
//   Award,
//   Sparkles,
//   Star,
//   Check,
//   Mail,
//   ChevronDown,
//   Truck,
//   Gift,
//   Camera,
// } from 'lucide-react';

// import API, {
//   addToWishlist,
//   removeFromWishlist,
//   getWishlist,
// } from '../services/api';

// export default function Home() {
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [wishlistMap, setWishlistMap] = useState({});
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [openFaq, setOpenFaq] = useState(null);

//   const GOLD = '#C8A882';
//   const CREAM = '#FAF8F5';
//   const DARK = '#171717';

//   /* -------------------------------------------------------
//      HERO SLIDES
//   ------------------------------------------------------- */

//   const heroSlides = [
//     {
//       subtitle: 'THE HAUTE COUTURE EDIT',
//       title: 'Timeless Elegance\nModern Silhouettes',
//       description:
//         'Discover meticulously crafted pieces designed for the discerning wardrobe.',
//       image:
//         'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1800&auto=format&fit=crop',
//       btnText: 'EXPLORE COLLECTION',
//       link: '/shop',
//     },
//     {
//       subtitle: "SEASONAL DROPS • AW '26",
//       title: 'Refined Luxury\nUncompromised Quality',
//       description:
//         'Immerse yourself in exceptional textiles and bespoke tailoring.',
//       image:
//         'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1800&auto=format&fit=crop',
//       btnText: 'SHOP NEW ARRIVALS',
//       link: '/new-arrivals',
//     },
//     {
//       subtitle: 'BESPOKE ARTISTRY',
//       title: 'Grace Redefined\nEvery Single Day',
//       description:
//         'Elevate your personal style with pieces curated for pure sophistication.',
//       image:
//         'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1800&auto=format&fit=crop',
//       btnText: 'VIEW LOOKBOOK',
//       link: '/shop',
//     },
//   ];

//   /* -------------------------------------------------------
//      MARQUEE
//   ------------------------------------------------------- */

//   const marqueeItems = [
//     'COMPLIMENTARY EXPRESS SHIPPING ABOVE ₹999',
//     '100% AUTHENTIC LUXURY GARMENTS',
//     '14-DAY EFFORTLESS RETURNS',
//     'DEDICATED ATELIER CONCIERGE',
//   ];

//   /* -------------------------------------------------------
//      CATEGORIES
//   ------------------------------------------------------- */

//   const categoriesList = [
//     {
//       name: 'Shirts',
//       img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=500',
//       slug: 'shirts',
//     },
//     {
//       name: 'T-Shirts',
//       img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=500',
//       slug: 't-shirts',
//     },
//     {
//       name: 'Jeans',
//       img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=500',
//       slug: 'jeans',
//     },
//     {
//       name: 'Dresses',
//       img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=500',
//       slug: 'dresses',
//     },
//     {
//       name: 'Kurtas',
//       img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=500',
//       slug: 'kurtas',
//     },
//     {
//       name: 'Jackets',
//       img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=500',
//       slug: 'jackets',
//     },
//     {
//       name: 'Accessories',
//       img: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=500',
//       slug: 'accessories',
//     },
//   ];

//   /* -------------------------------------------------------
//      COLLECTIONS
//   ------------------------------------------------------- */

//   const collections = [
//     {
//       title: 'The Monochrome Edit',
//       subtitle: 'Minimal • Refined • Timeless',
//       image:
//         'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200',
//       link: '/shop?collection=monochrome',
//     },
//     {
//       title: 'Weekend Essentials',
//       subtitle: 'Effortless Everyday Luxury',
//       image:
//         'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200',
//       link: '/shop?collection=weekend',
//     },
//     {
//       title: 'Occasion Edit',
//       subtitle: 'Made For Your Moments',
//       image:
//         'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1200',
//       link: '/shop?collection=occasion',
//     },
//   ];

//   /* -------------------------------------------------------
//      FAQ
//   ------------------------------------------------------- */

//   const faqs = [
//     {
//       question: 'What is your return policy?',
//       answer:
//         'We offer a 14-day return and exchange window on eligible products. Items should be unused and returned with their original packaging and tags.',
//     },
//     {
//       question: 'How long does delivery take?',
//       answer:
//         'Orders are generally delivered within 3–7 business days depending on your location. Express delivery may be available for selected pin codes.',
//     },
//     {
//       question: 'How can I find my correct size?',
//       answer:
//         'Every eligible product includes a detailed size guide. We recommend checking the measurements before placing your order.',
//     },
//     {
//       question: 'Do you offer Cash on Delivery?',
//       answer:
//         'Cash on Delivery can be available for selected locations and order values. Availability is shown during checkout.',
//     },
//   ];

//   /* -------------------------------------------------------
//      HERO AUTO SLIDER
//   ------------------------------------------------------- */

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
//     }, 5000);

//     return () => clearInterval(timer);
//   }, [heroSlides.length]);

//   /* -------------------------------------------------------
//      IMAGE URL
//   ------------------------------------------------------- */

//   const getImageUrl = (product) => {
//     let imagePath = product?.image;

//     if (!imagePath && product?.images?.length > 0) {
//       imagePath = product.images[0]?.image || product.images[0];
//     }

//     if (!imagePath) {
//       return 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800';
//     }

//     if (
//       typeof imagePath === 'string' &&
//       (imagePath.startsWith('http://') ||
//         imagePath.startsWith('https://'))
//     ) {
//       return imagePath;
//     }

//     const cleanPath =
//       typeof imagePath === 'string' && imagePath.startsWith('/')
//         ? imagePath
//         : `/${imagePath}`;

//     return `https://clothing-backend-gynt.onrender.com${cleanPath}`;
//   };

//   /* -------------------------------------------------------
//      LOAD PRODUCTS + WISHLIST
//   ------------------------------------------------------- */

//   useEffect(() => {
//     API.get('products/')
//       .then((res) => {
//         const data = Array.isArray(res.data)
//           ? res.data
//           : res.data.results || [];

//         setProducts(data);
//       })
//       .catch((err) => console.error('Products:', err));

//     const token = localStorage.getItem('access_token');

//     if (token) {
//       getWishlist()
//         .then((res) => {
//           const list = Array.isArray(res.data)
//             ? res.data
//             : res.data.results || [];

//           const map = {};

//           list.forEach((item) => {
//             map[item.product] = item.id;
//           });

//           setWishlistMap(map);
//         })
//         .catch((err) => console.error('Wishlist:', err));
//     }
//   }, []);

//   /* -------------------------------------------------------
//      WISHLIST
//   ------------------------------------------------------- */

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

//         setWishlistMap((prev) => ({
//           ...prev,
//           [productId]: res.data.id,
//         }));
//       }
//     } catch (err) {
//       console.error('Wishlist error:', err);
//     }
//   };

//   /* -------------------------------------------------------
//      PRODUCT CARD
//   ------------------------------------------------------- */

//   const ProductCard = ({ product }) => (
//     <div
//       onClick={() => navigate(`/product/${product.id}`)}
//       className="group cursor-pointer flex flex-col bg-white border border-neutral-200/80 shadow-sm hover:shadow-xl transition-all duration-500 rounded-xl overflow-hidden"
//       onMouseEnter={(e) => {
//         e.currentTarget.style.borderColor = GOLD;
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.borderColor = '';
//       }}
//     >
//       <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
//         <img
//           src={getImageUrl(product)}
//           alt={product.name}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//           onError={(e) => {
//             e.target.src =
//               'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800';
//           }}
//         />

//         {/* Wishlist */}
//         <button
//           onClick={(e) => handleWishlistToggle(e, product.id)}
//           className="absolute top-3 right-3 w-9 h-9 bg-white/95 backdrop-blur rounded-full flex items-center justify-center text-neutral-700 hover:scale-110 transition-transform shadow-md"
//         >
//           <Heart
//             size={15}
//             className={
//               wishlistMap[product.id]
//                 ? 'fill-red-500 text-red-500'
//                 : 'text-neutral-600'
//             }
//           />
//         </button>

//         {/* New Badge */}
//         <span
//           className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 text-[8px] uppercase tracking-[0.2em] font-bold"
//           style={{ color: DARK }}
//         >
//           New
//         </span>
//       </div>

//       <div className="p-4">
//         <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-1">
//           Atelier Collection
//         </p>

//         <h4 className="text-xs sm:text-sm font-medium text-neutral-800 truncate">
//           {product.name}
//         </h4>

//         <div className="flex items-center justify-between mt-2">
//           <p
//             className="text-sm font-serif font-bold"
//             style={{ color: '#8A6D46' }}
//           >
//             ₹{Number(product.price).toLocaleString('en-IN')}
//           </p>

//           <div className="flex items-center gap-1 text-[9px] text-neutral-500">
//             <Star size={10} fill={GOLD} style={{ color: GOLD }} />
//             4.8
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   /* -------------------------------------------------------
//      PRODUCTS
//   ------------------------------------------------------- */

//   const trendingProducts = products.slice(0, 5);
//   const newProducts = products.slice(5, 10);
//   const bestProducts = products.slice(10, 15);

//   return (
//     <div className="bg-[#FAF8F5] text-neutral-900 font-sans antialiased selection:bg-neutral-900 selection:text-white overflow-hidden">

//       {/* =====================================================
//           1. HERO
//       ===================================================== */}

//       <section className="relative w-full h-[82vh] min-h-[560px] max-h-[780px] bg-[#E8DFD5] flex items-center overflow-hidden">
//         {heroSlides.map((slide, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 w-full h-full flex items-center transition-opacity duration-1000 ${
//               index === currentSlide
//                 ? 'opacity-100 z-10'
//                 : 'opacity-0 z-0 pointer-events-none'
//             }`}
//           >
//             <img
//               src={slide.image}
//               alt={slide.title}
//               className="absolute inset-0 w-full h-full object-cover object-center scale-105"
//             />

//             <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

//             <div className="relative z-10 px-6 sm:px-12 md:px-20 lg:px-28 max-w-3xl text-white">
//               <div className="flex items-center gap-2 mb-5">
//                 <Sparkles size={14} style={{ color: GOLD }} />

//                 <span
//                   className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] font-medium"
//                   style={{ color: '#E7D3B8' }}
//                 >
//                   {slide.subtitle}
//                 </span>
//               </div>

//               <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light leading-[1.05] mb-6 tracking-tight whitespace-pre-line">
//                 {slide.title}
//               </h1>

//               <p className="text-xs sm:text-sm font-light leading-relaxed text-neutral-200 mb-8 max-w-md">
//                 {slide.description}
//               </p>

//               <button
//                 onClick={() => navigate(slide.link)}
//                 className="bg-white text-neutral-900 px-8 sm:px-10 py-4 text-[9px] uppercase tracking-[0.3em] font-semibold shadow-xl hover:bg-[#C8A882] transition-colors"
//               >
//                 {slide.btnText}
//               </button>
//             </div>
//           </div>
//         ))}

//         {/* Slider navigation */}
//         <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 text-white z-20">
//           {heroSlides.map((_, idx) => (
//             <React.Fragment key={idx}>
//               <span
//                 onClick={() => setCurrentSlide(idx)}
//                 className="text-xs font-serif tracking-widest cursor-pointer"
//                 style={
//                   idx === currentSlide
//                     ? {
//                         fontWeight: 700,
//                         color: GOLD,
//                         borderBottom: `1px solid ${GOLD}`,
//                         paddingBottom: '4px',
//                       }
//                     : {
//                         color: 'rgba(255,255,255,0.4)',
//                       }
//                 }
//               >
//                 0{idx + 1}
//               </span>

//               {idx < heroSlides.length - 1 && (
//                 <div className="w-[1px] h-6 bg-white/20" />
//               )}
//             </React.Fragment>
//           ))}
//         </div>
//       </section>

//       {/* =====================================================
//           2. MARQUEE
//       ===================================================== */}

//       <div className="w-full bg-neutral-900 overflow-hidden py-3">
//         <div className="flex whitespace-nowrap animate-[marquee_28s_linear_infinite]">
//           {[...marqueeItems, ...marqueeItems, ...marqueeItems].map(
//             (item, idx) => (
//               <span
//                 key={idx}
//                 className="flex items-center text-white/90 mx-6"
//               >
//                 <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em]">
//                   {item}
//                 </span>

//                 <span className="mx-6" style={{ color: GOLD }}>
//                   ✦
//                 </span>
//               </span>
//             )
//           )}
//         </div>
//       </div>

//       {/* =====================================================
//           3. GENDER EDIT
//       ===================================================== */}

//       <section className="px-5 sm:px-8 md:px-14 lg:px-20 pt-12 max-w-[1550px] mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//           {[
//             {
//               name: 'MEN',
//               sub: 'Tailored Excellence',
//               image:
//                 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=500',
//               link: '/shop?gender=men',
//             },
//             {
//               name: 'WOMEN',
//               sub: 'Haute Couture',
//               image:
//                 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500',
//               link: '/shop?gender=women',
//             },
//             {
//               name: 'KIDS',
//               sub: 'Little Luxury',
//               image:
//                 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=500',
//               link: '/shop?gender=kids',
//             },
//           ].map((item) => (
//             <div
//               key={item.name}
//               onClick={() => navigate(item.link)}
//               className="bg-white p-5 sm:p-7 flex items-center justify-between cursor-pointer group border border-neutral-200 rounded-xl shadow-sm hover:shadow-xl transition-all"
//             >
//               <div>
//                 <span className="text-[9px] tracking-[0.3em] text-neutral-400 uppercase font-bold">
//                   ATELIER EDIT
//                 </span>

//                 <h3 className="font-serif text-2xl mt-1">
//                   {item.name}
//                 </h3>

//                 <p className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">
//                   {item.sub}
//                 </p>

//                 <span
//                   className="text-[9px] uppercase font-bold tracking-widest flex items-center gap-2 mt-5 group-hover:translate-x-2 transition-transform"
//                   style={{ color: GOLD }}
//                 >
//                   Discover
//                   <ArrowRight size={13} />
//                 </span>
//               </div>

//               <div className="w-24 h-32 sm:w-28 sm:h-36 rounded-lg overflow-hidden">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* =====================================================
//           4. CATEGORY
//       ===================================================== */}

//       <section className="px-5 sm:px-8 md:px-14 lg:px-20 mt-20 max-w-[1550px] mx-auto">
//         <div className="text-center mb-10">
//           <span className="text-[9px] uppercase tracking-[0.35em] text-neutral-400 font-bold">
//             EXPLORE THE BOUTIQUE
//           </span>

//           <h2 className="text-3xl sm:text-4xl font-serif mt-2">
//             Shop By Category
//           </h2>

//           <div
//             className="w-10 h-[1px] mx-auto mt-4"
//             style={{ backgroundColor: GOLD }}
//           />
//         </div>

//         <div className="flex gap-7 sm:gap-10 overflow-x-auto scrollbar-none pb-4 justify-start md:justify-center">
//           {categoriesList.map((cat) => (
//             <div
//               key={cat.slug}
//               onClick={() => navigate(`/shop?category=${cat.slug}`)}
//               className="flex flex-col items-center gap-3 cursor-pointer group shrink-0"
//             >
//               <div
//                 className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 border"
//                 style={{ borderColor: '#E5DDD0' }}
//               >
//                 <img
//                   src={cat.img}
//                   alt={cat.name}
//                   className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
//                 />
//               </div>

//               <span className="text-[10px] sm:text-[11px] font-medium tracking-widest uppercase">
//                 {cat.name}
//               </span>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* =====================================================
//           5. TRENDING
//       ===================================================== */}

//       <section className="px-5 sm:px-8 md:px-14 lg:px-20 mt-20 max-w-[1550px] mx-auto">
//         <div className="flex items-end justify-between border-b border-neutral-200 pb-5 mb-8">
//           <div>
//             <span className="text-[9px] uppercase tracking-[0.35em] text-neutral-400 font-bold">
//               CURATED FAVORITES
//             </span>

//             <h2 className="text-3xl font-serif mt-2">
//               Trending Pieces
//             </h2>
//           </div>

//           <button
//             onClick={() => navigate('/shop')}
//             className="hidden sm:block text-[9px] uppercase tracking-[0.25em] font-bold hover:text-[#C8A882]"
//           >
//             View Collection →
//           </button>
//         </div>

//         {trendingProducts.length > 0 ? (
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
//             {trendingProducts.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         ) : (
//           <div className="py-20 text-center text-neutral-400 text-sm">
//             Products coming soon.
//           </div>
//         )}
//       </section>

//       {/* =====================================================
//           6. NEW ARRIVALS BANNER
//       ===================================================== */}

//       <section className="mt-24 relative overflow-hidden bg-[#E8DFD5]">
//         <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
//           <div className="relative min-h-[380px]">
//             <img
//               src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1400"
//               alt="New Arrivals"
//               className="absolute inset-0 w-full h-full object-cover"
//             />

//             <div className="absolute inset-0 bg-black/20" />
//           </div>

//           <div className="flex items-center p-8 sm:p-14 lg:p-20">
//             <div className="max-w-lg">
//               <span
//                 className="text-[9px] uppercase tracking-[0.4em] font-bold"
//                 style={{ color: '#8A6D46' }}
//               >
//                 JUST LANDED
//               </span>

//               <h2 className="text-4xl sm:text-5xl font-serif leading-tight mt-3 mb-5">
//                 The New
//                 <br />
//                 Arrivals Edit
//               </h2>

//               <p className="text-sm text-neutral-600 leading-relaxed font-light mb-8">
//                 Discover the latest expressions of contemporary luxury,
//                 thoughtfully selected for the modern wardrobe.
//               </p>

//               <button
//                 onClick={() => navigate('/new-arrivals')}
//                 className="bg-neutral-900 text-white px-8 py-4 text-[9px] uppercase tracking-[0.3em] font-semibold hover:bg-[#C8A882] transition-colors"
//               >
//                 Shop New Arrivals
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* =====================================================
//           7. NEW ARRIVAL PRODUCTS
//       ===================================================== */}

//       {newProducts.length > 0 && (
//         <section className="px-5 sm:px-8 md:px-14 lg:px-20 mt-20 max-w-[1550px] mx-auto">
//           <div className="text-center mb-10">
//             <span className="text-[9px] uppercase tracking-[0.35em] text-neutral-400 font-bold">
//               FRESH FROM THE ATELIER
//             </span>

//             <h2 className="text-3xl sm:text-4xl font-serif mt-2">
//               New Arrivals
//             </h2>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
//             {newProducts.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </section>
//       )}

//       {/* =====================================================
//           8. OFFER / SALE
//       ===================================================== */}

//       <section className="px-5 sm:px-8 md:px-14 lg:px-20 mt-24">
//         <div className="max-w-[1550px] mx-auto bg-neutral-900 text-white relative overflow-hidden">
//           <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full border border-white/10" />
//           <div className="absolute -right-5 -bottom-32 w-96 h-96 rounded-full border border-white/10" />

//           <div className="relative z-10 text-center py-14 sm:py-20 px-5">
//             <Sparkles
//               size={18}
//               className="mx-auto mb-5"
//               style={{ color: GOLD }}
//             />

//             <span
//               className="text-[9px] uppercase tracking-[0.4em]"
//               style={{ color: '#D9C3A5' }}
//             >
//               PRIVATE ATELIER OFFER
//             </span>

//             <h2 className="text-3xl sm:text-5xl font-serif mt-3">
//               Enjoy 20% Off Your First Order
//             </h2>

//             <p className="text-xs text-neutral-400 mt-4 max-w-md mx-auto">
//               Join our private list and receive exclusive access to new
//               collections, private sales and atelier stories.
//             </p>

//             <button
//               onClick={() => navigate('/shop')}
//               className="mt-8 px-9 py-4 bg-white text-neutral-900 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-[#C8A882] transition-colors"
//             >
//               Shop The Edit
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* =====================================================
//           9. COLLECTIONS
//       ===================================================== */}

//       <section className="px-5 sm:px-8 md:px-14 lg:px-20 mt-24 max-w-[1550px] mx-auto">
//         <div className="text-center mb-10">
//           <span className="text-[9px] uppercase tracking-[0.35em] text-neutral-400 font-bold">
//             CURATED STORIES
//           </span>

//           <h2 className="text-3xl sm:text-4xl font-serif mt-2">
//             Shop By Collection
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//           {collections.map((collection) => (
//             <div
//               key={collection.title}
//               onClick={() => navigate(collection.link)}
//               className="relative h-[430px] overflow-hidden cursor-pointer group"
//             >
//               <img
//                 src={collection.image}
//                 alt={collection.title}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
//               />

//               <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

//               <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
//                 <span className="text-[8px] uppercase tracking-[0.3em] text-white/70">
//                   THE EDIT
//                 </span>

//                 <h3 className="text-2xl font-serif mt-1">
//                   {collection.title}
//                 </h3>

//                 <p className="text-[10px] uppercase tracking-wider text-white/70 mt-1">
//                   {collection.subtitle}
//                 </p>

//                 <span
//                   className="inline-flex items-center gap-2 mt-5 text-[9px] uppercase tracking-[0.25em] font-bold"
//                   style={{ color: '#E7D3B8' }}
//                 >
//                   Explore
//                   <ArrowRight size={13} />
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* =====================================================
//           10. BEST SELLERS
//       ===================================================== */}

//       {bestProducts.length > 0 && (
//         <section className="px-5 sm:px-8 md:px-14 lg:px-20 mt-24 max-w-[1550px] mx-auto">
//           <div className="flex items-end justify-between border-b border-neutral-200 pb-5 mb-8">
//             <div>
//               <span className="text-[9px] uppercase tracking-[0.35em] text-neutral-400 font-bold">
//                 MOST LOVED
//               </span>

//               <h2 className="text-3xl font-serif mt-2">
//                 Best Sellers
//               </h2>
//             </div>

//             <button
//               onClick={() => navigate('/shop?sort=best-selling')}
//               className="hidden sm:block text-[9px] uppercase tracking-[0.25em] font-bold hover:text-[#C8A882]"
//             >
//               Shop Best Sellers →
//             </button>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
//             {bestProducts.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </section>
//       )}

//       {/* =====================================================
//           11. EDITORIAL BRAND STORY
//       ===================================================== */}

//       <section className="mt-24 bg-[#EBE5DC] border-y border-neutral-200">
//         <div className="grid grid-cols-1 md:grid-cols-2">
//           <div className="h-[380px] sm:h-[500px] overflow-hidden">
//             <img
//               src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1400"
//               alt="Atelier"
//               className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
//             />
//           </div>

//           <div className="flex items-center p-8 sm:p-14 lg:p-20">
//             <div className="max-w-xl">
//               <span className="text-[9px] uppercase tracking-[0.4em] text-neutral-500 font-bold">
//                 THE ATELIER PHILOSOPHY
//               </span>

//               <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-3 mb-5 leading-tight">
//                 Crafted For
//                 <br />
//                 Enduring Elegance
//               </h2>

//               <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed mb-7">
//                 Every garment we create is an ode to refined luxury, using
//                 carefully selected fabrics and uncompromising attention to
//                 detail.
//               </p>

//               <div className="space-y-3 mb-8">
//                 {[
//                   'Premium fabric selection',
//                   'Thoughtful craftsmanship',
//                   'Timeless silhouettes',
//                 ].map((item) => (
//                   <div
//                     key={item}
//                     className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-neutral-700"
//                   >
//                     <Check size={13} style={{ color: GOLD }} />
//                     {item}
//                   </div>
//                 ))}
//               </div>

//               <button
//                 onClick={() => navigate('/about')}
//                 className="bg-neutral-900 text-white px-8 py-4 text-[9px] uppercase tracking-[0.3em] font-semibold hover:bg-[#C8A882] transition-colors"
//               >
//                 Discover Our Story
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* =====================================================
//           12. WHY CHOOSE US
//       ===================================================== */}

//       <section className="px-5 sm:px-8 md:px-14 lg:px-20 mt-20 max-w-[1550px] mx-auto">
//         <div className="text-center mb-10">
//           <span className="text-[9px] uppercase tracking-[0.35em] text-neutral-400 font-bold">
//             THE ATELIER PROMISE
//           </span>

//           <h2 className="text-3xl font-serif mt-2">
//             Why Choose Us
//           </h2>
//         </div>

//         <div className="grid grid-cols-2 lg:grid-cols-4 border-y border-neutral-200">
//           {[
//             {
//               icon: Award,
//               title: 'Exquisite Quality',
//               text: 'Premium materials',
//             },
//             {
//               icon: Truck,
//               title: 'Express Delivery',
//               text: 'Fast & secure shipping',
//             },
//             {
//               icon: RefreshCw,
//               title: 'Easy Returns',
//               text: '14-day returns',
//             },
//             {
//               icon: ShieldCheck,
//               title: 'Secure Checkout',
//               text: 'Protected payments',
//             },
//           ].map((item) => {
//             const Icon = item.icon;

//             return (
//               <div
//                 key={item.title}
//                 className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r last:border-r-0 border-neutral-200 text-center sm:text-left"
//               >
//                 <div
//                   className="w-11 h-11 rounded-full bg-neutral-100 flex items-center justify-center shrink-0"
//                   style={{ color: DARK }}
//                 >
//                   <Icon size={18} strokeWidth={1.5} />
//                 </div>

//                 <div>
//                   <h4 className="text-[10px] font-bold uppercase tracking-widest">
//                     {item.title}
//                   </h4>

//                   <p className="text-[10px] text-neutral-500 mt-1">
//                     {item.text}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       {/* =====================================================
//           13. TESTIMONIALS
//       ===================================================== */}

//       <section className="mt-24 bg-[#F1ECE5] py-20 px-5">
//         <div className="max-w-[1100px] mx-auto text-center">
//           <span className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 font-bold">
//             CUSTOMER STORIES
//           </span>

//           <h2 className="text-3xl sm:text-4xl font-serif mt-2 mb-12">
//             Loved By Our Community
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[
//               {
//                 name: 'Aarav Mehta',
//                 text: 'Beautiful quality and excellent finishing. The shirt looks even better in person.',
//               },
//               {
//                 name: 'Riya Shah',
//                 text: 'The entire shopping experience feels premium. Packaging and quality were exceptional.',
//               },
//               {
//                 name: 'Kabir Patel',
//                 text: 'The fit is perfect and delivery was much faster than expected. Will definitely shop again.',
//               },
//             ].map((review) => (
//               <div
//                 key={review.name}
//                 className="bg-white p-7 sm:p-9 shadow-sm"
//               >
//                 <div className="flex justify-center gap-1 mb-5">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <Star
//                       key={star}
//                       size={12}
//                       fill={GOLD}
//                       style={{ color: GOLD }}
//                     />
//                   ))}
//                 </div>

//                 <p className="text-sm font-serif leading-relaxed text-neutral-700">
//                   “{review.text}”
//                 </p>

//                 <p className="text-[9px] uppercase tracking-[0.25em] font-bold mt-6">
//                   {review.name}
//                 </p>

//                 <p className="text-[8px] uppercase tracking-widest text-neutral-400 mt-1">
//                   Verified Customer
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* =====================================================
//           14. FAQ
//       ===================================================== */}

//       <section className="px-5 sm:px-8 md:px-14 lg:px-20 mt-24 max-w-[950px] mx-auto">
//         <div className="text-center mb-10">
//           <span className="text-[9px] uppercase tracking-[0.35em] text-neutral-400 font-bold">
//             NEED TO KNOW
//           </span>

//           <h2 className="text-3xl sm:text-4xl font-serif mt-2">
//             Frequently Asked Questions
//           </h2>
//         </div>

//         <div className="border-t border-neutral-200">
//           {faqs.map((faq, index) => (
//             <div key={faq.question} className="border-b border-neutral-200">
//               <button
//                 onClick={() =>
//                   setOpenFaq(openFaq === index ? null : index)
//                 }
//                 className="w-full flex items-center justify-between py-5 text-left"
//               >
//                 <span className="text-xs sm:text-sm font-medium">
//                   {faq.question}
//                 </span>

//                 <ChevronDown
//                   size={17}
//                   className={`transition-transform ${
//                     openFaq === index ? 'rotate-180' : ''
//                   }`}
//                   style={{ color: GOLD }}
//                 />
//               </button>

//               {openFaq === index && (
//                 <div className="pb-5 pr-8">
//                   <p className="text-xs text-neutral-500 leading-relaxed">
//                     {faq.answer}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* =====================================================
//           15. NEWSLETTER
//       ===================================================== */}

//       <section className="px-5 sm:px-8 md:px-14 lg:px-20 mt-24">
//         <div className="max-w-[1550px] mx-auto bg-neutral-900 text-white py-14 sm:py-20 px-6 text-center">
//           <Mail
//             size={22}
//             className="mx-auto mb-5"
//             style={{ color: GOLD }}
//           />

//           <span className="text-[9px] uppercase tracking-[0.4em] text-neutral-400">
//             PRIVATE ACCESS
//           </span>

//           <h2 className="text-3xl sm:text-4xl font-serif mt-2">
//             Join The Atelier
//           </h2>

//           <p className="text-xs text-neutral-400 max-w-md mx-auto mt-4 leading-relaxed">
//             Be the first to discover new collections, exclusive offers and
//             private events.
//           </p>

//           <div className="flex flex-col sm:flex-row max-w-lg mx-auto mt-8 gap-2">
//             <input
//               type="email"
//               placeholder="Your email address"
//               className="flex-1 bg-white text-neutral-900 px-5 py-4 text-xs outline-none"
//             />

//             <button className="px-7 py-4 bg-[#C8A882] text-neutral-900 text-[9px] uppercase tracking-[0.25em] font-bold hover:bg-white transition-colors">
//               Subscribe
//             </button>
//           </div>

//           <p className="text-[8px] text-neutral-500 mt-4">
//             By subscribing, you agree to receive our latest updates.
//           </p>
//         </div>
//       </section>

//       {/* =====================================================
//           16. INSTAGRAM
//       ===================================================== */}

//       <section className="mt-24">
//         <div className="text-center px-5 mb-10">
//          <Camera
//   size={18}
//   className="mx-auto mb-3"
//   style={{ color: GOLD }}
// />

//           <span className="text-[9px] uppercase tracking-[0.35em] text-neutral-400 font-bold">
//             FOLLOW THE ATELIER
//           </span>

//           <h2 className="text-3xl font-serif mt-2">
//             @yourbrand
//           </h2>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
//           {[
//             'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600',
//             'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600',
//             'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600',
//             'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600',
//             'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600',
//             'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=600',
//           ].map((image, index) => (
//             <div
//               key={index}
//               className="aspect-square overflow-hidden group cursor-pointer"
//             >
//               <img
//                 src={image}
//                 alt={`Instagram ${index + 1}`}
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//               />
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* =====================================================
//           17. FINAL CTA
//       ===================================================== */}

//       <section className="px-5 py-24 text-center">
//         <Gift
//           size={22}
//           className="mx-auto mb-5"
//           style={{ color: GOLD }}
//         />

//         <span className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 font-bold">
//           YOUR NEXT FAVORITE PIECE
//         </span>

//         <h2 className="text-3xl sm:text-5xl font-serif mt-3">
//           Discover Your Signature Style
//         </h2>

//         <button
//           onClick={() => navigate('/shop')}
//           className="mt-8 bg-neutral-900 text-white px-9 py-4 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-[#C8A882] transition-colors"
//         >
//           Explore Collection
//         </button>
//       </section>

//       {/* =====================================================
//           MARQUEE CSS
//       ===================================================== */}

//       <style>{`
//         @keyframes marquee {
//           0% {
//             transform: translateX(0);
//           }

//           100% {
//             transform: translateX(-33.333%);
//           }
//         }

//         .animate-\\[marquee_28s_linear_infinite\\] {
//           animation: marquee 28s linear infinite;
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .animate-\\[marquee_28s_linear_infinite\\] {
//             animation: none;
//           }
//         }

//         .scrollbar-none::-webkit-scrollbar {
//           display: none;
//         }

//         .scrollbar-none {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </div>
//   );
// }










import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Award,
  Sparkles,
  Star,
  Check,
  Mail,
  ChevronDown,
  Truck,
  Gift,
  Camera,
} from 'lucide-react';

import API, {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from '../services/api';

export default function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [wishlistMap, setWishlistMap] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const GOLD = '#C8A882';
  const DARK = '#171717';

  /* -------------------------------------------------------
     HERO SLIDES
  ------------------------------------------------------- */

  const heroSlides = [
    {
      title: 'Timeless Elegance\nModern Silhouettes',
      description:
        'Discover meticulously crafted pieces designed for the discerning wardrobe.',
      image:
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1800&auto=format&fit=crop',
      btnText: 'Explore Collection',
      link: '/shop',
    },
    {
      title: 'Refined Luxury\nUncompromised Quality',
      description:
        'Immerse yourself in exceptional textiles and bespoke tailoring.',
      image:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1800&auto=format&fit=crop',
      btnText: 'Shop New Arrivals',
      link: '/new-arrivals',
    },
    {
      title: 'Grace Redefined\nEvery Single Day',
      description:
        'Elevate your personal style with pieces curated for pure sophistication.',
      image:
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1800&auto=format&fit=crop',
      btnText: 'View Lookbook',
      link: '/shop',
    },
  ];

  /* -------------------------------------------------------
     CATEGORIES
  ------------------------------------------------------- */

  const categoriesList = [
    {
      name: 'Shirts',
      img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=500',
      slug: 'shirts',
    },
    {
      name: 'T-Shirts',
      img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=500',
      slug: 't-shirts',
    },
    {
      name: 'Jeans',
      img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=500',
      slug: 'jeans',
    },
    {
      name: 'Dresses',
      img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=500',
      slug: 'dresses',
    },
    {
      name: 'Kurtas',
      img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=500',
      slug: 'kurtas',
    },
    {
      name: 'Jackets',
      img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=500',
      slug: 'jackets',
    },
    {
      name: 'Accessories',
      img: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=500',
      slug: 'accessories',
    },
  ];

  /* -------------------------------------------------------
     COLLECTIONS
  ------------------------------------------------------- */

  const collections = [
    {
      title: 'The Monochrome Edit',
      subtitle: 'Minimal • Refined • Timeless',
      image:
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200',
      link: '/shop?collection=monochrome',
    },
    {
      title: 'Weekend Essentials',
      subtitle: 'Effortless Everyday Luxury',
      image:
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200',
      link: '/shop?collection=weekend',
    },
    {
      title: 'Occasion Edit',
      subtitle: 'Made For Your Moments',
      image:
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1200',
      link: '/shop?collection=occasion',
    },
  ];

  /* -------------------------------------------------------
     FAQ
  ------------------------------------------------------- */

  const faqs = [
    {
      question: 'What is your return policy?',
      answer:
        'We offer a 14-day return and exchange window on eligible products. Items should be unused and returned with their original packaging and tags.',
    },
    {
      question: 'How long does delivery take?',
      answer:
        'Orders are generally delivered within 3–7 business days depending on your location. Express delivery may be available for selected pin codes.',
    },
    {
      question: 'How can I find my correct size?',
      answer:
        'Every eligible product includes a detailed size guide. We recommend checking the measurements before placing your order.',
    },
    {
      question: 'Do you offer Cash on Delivery?',
      answer:
        'Cash on Delivery can be available for selected locations and order values. Availability is shown during checkout.',
    },
  ];

  /* -------------------------------------------------------
     HERO AUTO SLIDER
  ------------------------------------------------------- */

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  /* -------------------------------------------------------
     IMAGE URL
  ------------------------------------------------------- */

  const getImageUrl = (product) => {
    let imagePath = product?.image;

    if (!imagePath && product?.images?.length > 0) {
      imagePath = product.images[0]?.image || product.images[0];
    }

    if (!imagePath) {
      return 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800';
    }

    if (
      typeof imagePath === 'string' &&
      (imagePath.startsWith('http://') ||
        imagePath.startsWith('https://'))
    ) {
      return imagePath;
    }

    const cleanPath =
      typeof imagePath === 'string' && imagePath.startsWith('/')
        ? imagePath
        : `/${imagePath}`;

    return `https://clothing-backend-gynt.onrender.com${cleanPath}`;
  };

  /* -------------------------------------------------------
     LOAD PRODUCTS + WISHLIST
  ------------------------------------------------------- */

  useEffect(() => {
    API.get('products/')
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];

        setProducts(data);
      })
      .catch((err) => console.error('Products:', err));

    const token = localStorage.getItem('access_token');

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
        .catch((err) => console.error('Wishlist:', err));
    }
  }, []);

  /* -------------------------------------------------------
     WISHLIST
  ------------------------------------------------------- */

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
      console.error('Wishlist error:', err);
    }
  };

  /* -------------------------------------------------------
     PRODUCT CARD
  ------------------------------------------------------- */

  const ProductCard = ({ product }) => (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer flex flex-col bg-white border border-neutral-200/80 shadow-sm hover:shadow-xl transition-all duration-500 rounded-xl overflow-hidden"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = GOLD;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '';
      }}
    >
      <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
        <img
          src={getImageUrl(product)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            e.target.src =
              'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800';
          }}
        />

        {/* Wishlist */}
        <button
          onClick={(e) => handleWishlistToggle(e, product.id)}
          className="absolute top-3 right-3 w-9 h-9 bg-white/95 backdrop-blur rounded-full flex items-center justify-center text-neutral-700 hover:scale-110 transition-transform shadow-md"
        >
          <Heart
            size={15}
            className={
              wishlistMap[product.id]
                ? 'fill-red-500 text-red-500'
                : 'text-neutral-600'
            }
          />
        </button>

        {/* New Badge */}
        <span
          className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 text-[9px] uppercase tracking-wider font-bold"
          style={{ color: DARK }}
        >
          New
        </span>
      </div>

      <div className="p-4">
        <h4 className="text-xs sm:text-sm font-medium text-neutral-800 truncate">
          {product.name}
        </h4>

        <div className="flex items-center justify-between mt-2">
          <p
            className="text-sm font-serif font-bold"
            style={{ color: '#8A6D46' }}
          >
            ₹{Number(product.price).toLocaleString('en-IN')}
          </p>

          <div className="flex items-center gap-1 text-[10px] text-neutral-500">
            <Star size={11} fill={GOLD} style={{ color: GOLD }} />
            4.8
          </div>
        </div>
      </div>
    </div>
  );

  /* -------------------------------------------------------
     PRODUCTS SLICES
  ------------------------------------------------------- */

  const trendingProducts = products.slice(0, 4);
  const bestProducts = products.slice(4, 8);

  return (
    <div className="bg-[#FAF8F5] text-neutral-900 font-sans antialiased selection:bg-neutral-900 selection:text-white overflow-hidden">

      {/* =====================================================
          1. HERO SECTION
      ===================================================== */}

      <section className="relative w-full h-[85vh] min-h-[580px] max-h-[800px] bg-[#E8DFD5] flex items-center overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full flex items-center transition-opacity duration-1000 ${
              index === currentSlide
                ? 'opacity-100 z-10'
                : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

            <div className="relative z-10 px-6 sm:px-12 md:px-20 lg:px-28 max-w-3xl text-white">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light leading-[1.05] mb-6 tracking-tight whitespace-pre-line">
                {slide.title}
              </h1>

              <p className="text-xs sm:text-sm font-light leading-relaxed text-neutral-200 mb-8 max-w-md">
                {slide.description}
              </p>

              <button
                onClick={() => navigate(slide.link)}
                className="bg-white text-neutral-900 px-8 sm:px-10 py-4 text-[10px] uppercase tracking-[0.25em] font-medium shadow-xl hover:bg-[#C8A882] hover:text-white transition-all"
              >
                {slide.btnText}
              </button>
            </div>
          </div>
        ))}

        {/* Slider navigation */}
        <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 text-white z-20">
          {heroSlides.map((_, idx) => (
            <React.Fragment key={idx}>
              <span
                onClick={() => setCurrentSlide(idx)}
                className="text-xs font-serif tracking-widest cursor-pointer transition-all"
                style={
                  idx === currentSlide
                    ? {
                        fontWeight: 700,
                        color: GOLD,
                        borderBottom: `1px solid ${GOLD}`,
                        paddingBottom: '4px',
                      }
                    : {
                        color: 'rgba(255,255,255,0.4)',
                      }
                }
              >
                0{idx + 1}
              </span>

              {idx < heroSlides.length - 1 && (
                <div className="w-[1px] h-6 bg-white/20" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* =====================================================
          2. CLEAN ANNOUNCEMENT BAR (Replaced Marquee)
      ===================================================== */}

      <div className="w-full bg-neutral-900 text-white py-3 px-4 text-center">
        <p className="text-[10px] sm:text-xs tracking-[0.2em] font-light text-neutral-300">
          Complimentary express shipping on all orders above ₹999 <span className="mx-3 text-[#C8A882]">✦</span> 14-day effortless returns
        </p>
      </div>

      {/* =====================================================
          3. CATEGORIES GRID
      ===================================================== */}

      <section className="px-5 sm:px-8 md:px-14 lg:px-20 py-16 max-w-[1550px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif">
            Shop By Category
          </h2>
          <div className="w-10 h-[1px] mx-auto mt-4" style={{ backgroundColor: GOLD }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6">
          {categoriesList.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => navigate(`/shop?category=${cat.slug}`)}
              className="flex flex-col items-center gap-3 cursor-pointer group"
            >
              <div
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden p-1 border shadow-sm transition-all group-hover:shadow-md"
                style={{ borderColor: '#E5DDD0' }}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <span className="text-xs font-medium tracking-widest uppercase mt-1">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          4. TRENDING PIECES (Asymmetric / Clean Grid)
      ===================================================== */}

      <section className="px-5 sm:px-8 md:px-14 lg:px-20 py-12 max-w-[1550px] mx-auto">
        <div className="flex items-end justify-between border-b border-neutral-200 pb-5 mb-10">
          <div>
            <h2 className="text-3xl font-serif">Trending Pieces</h2>
          </div>

          <button
            onClick={() => navigate('/shop')}
            className="hidden sm:block text-[10px] uppercase tracking-[0.2em] font-bold hover:text-[#C8A882] transition-colors"
          >
            View All Collection →
          </button>
        </div>

        {trendingProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-neutral-400 text-sm">
            Products loading...
          </div>
        )}
      </section>

      {/* =====================================================
          5. EDITORIAL BRAND STORY (Split Banner)
      ===================================================== */}

      <section className="my-20 bg-[#EBE5DC] border-y border-neutral-200">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-[400px] sm:h-[550px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1400"
              alt="Atelier Philosophy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>

          <div className="flex items-center p-8 sm:p-14 lg:p-20">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-6 leading-tight">
                Crafted For <br /> Enduring Elegance
              </h2>

              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed mb-8">
                Every garment we create is an ode to refined luxury, using carefully selected fabrics and uncompromising attention to detail to match your distinctive lifestyle.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  'Premium fabric selection',
                  'Thoughtful craftsmanship',
                  'Timeless silhouettes',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-xs uppercase tracking-wider text-neutral-700 font-medium"
                  >
                    <Check size={14} style={{ color: GOLD }} />
                    {item}
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/about')}
                className="bg-neutral-900 text-white px-8 py-4 text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-[#C8A882] transition-colors"
              >
                Discover Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          6. COLLECTIONS EDIT
      ===================================================== */}

      <section className="px-5 sm:px-8 md:px-14 lg:px-20 py-12 max-w-[1550px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif">
            Curated Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <div
              key={collection.title}
              onClick={() => navigate(collection.link)}
              className="relative h-[450px] overflow-hidden cursor-pointer group rounded-xl"
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl font-serif mb-1">
                  {collection.title}
                </h3>
                <p className="text-xs uppercase tracking-wider text-white/70 mb-4">
                  {collection.subtitle}
                </p>
                <span
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold"
                  style={{ color: '#E7D3B8' }}
                >
                  Explore Edit <ArrowRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          7. BEST SELLERS
      ===================================================== */}

      {bestProducts.length > 0 && (
        <section className="px-5 sm:px-8 md:px-14 lg:px-20 py-16 max-w-[1550px] mx-auto">
          <div className="flex items-end justify-between border-b border-neutral-200 pb-5 mb-10">
            <div>
              <h2 className="text-3xl font-serif">Most Loved Best Sellers</h2>
            </div>

            <button
              onClick={() => navigate('/shop')}
              className="hidden sm:block text-[10px] uppercase tracking-[0.2em] font-bold hover:text-[#C8A882] transition-colors"
            >
              Shop All →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* =====================================================
          8. TESTIMONIALS
      ===================================================== */}

      <section className="my-20 bg-[#F1ECE5] py-20 px-5">
        <div className="max-w-[1100px] mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif mb-12">
            Loved By Our Community
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Aarav Mehta',
                text: 'Beautiful quality and excellent finishing. The shirt looks even better in person.',
              },
              {
                name: 'Riya Shah',
                text: 'The entire shopping experience feels premium. Packaging and quality were exceptional.',
              },
              {
                name: 'Kabir Patel',
                text: 'The fit is perfect and delivery was much faster than expected. Will definitely shop again.',
              },
            ].map((review) => (
              <div
                key={review.name}
                className="bg-white p-8 shadow-sm rounded-xl text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        fill={GOLD}
                        style={{ color: GOLD }}
                      />
                    ))}
                  </div>
                  <p className="text-sm font-serif leading-relaxed text-neutral-700">
                    “{review.text}”
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100">
                  <p className="text-xs uppercase tracking-widest font-bold text-neutral-900">
                    {review.name}
                  </p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">Verified Customer</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          9. FAQ SECTION
      ===================================================== */}

      <section className="px-5 sm:px-8 md:px-14 lg:px-20 py-16 max-w-[950px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="border-t border-neutral-200">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="border-b border-neutral-200">
              <button
                onClick={() =>
                  setOpenFaq(openFaq === index ? null : index)
                }
                className="w-full flex items-center justify-between py-6 text-left"
              >
                <span className="text-sm font-medium">
                  {faq.question}
                </span>

                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                  style={{ color: GOLD }}
                />
              </button>

              {openFaq === index && (
                <div className="pb-6 pr-8">
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-light">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          10. NEWSLETTER SIGNUP
      ===================================================== */}

      <section className="px-5 sm:px-8 md:px-14 lg:px-20 py-16">
        <div className="max-w-[1550px] mx-auto bg-neutral-900 text-white py-16 px-6 text-center rounded-2xl">
          <Mail
            size={24}
            className="mx-auto mb-4"
            style={{ color: GOLD }}
          />

          <h2 className="text-3xl sm:text-4xl font-serif mb-3">
            Join The Atelier Private List
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto mb-8 font-light leading-relaxed">
            Be the first to discover new collections, private sales, and exclusive seasonal edits.
          </p>

          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white/10 border border-white/20 text-white px-5 py-4 text-xs outline-none focus:border-[#C8A882] rounded-lg"
            />

            <button className="px-8 py-4 bg-[#C8A882] text-neutral-900 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors rounded-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}





