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


















import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight, ShieldCheck, RefreshCw, Headphones, Award } from 'lucide-react';
import API, { addToWishlist, removeFromWishlist, getWishlist } from '../services/api';

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [wishlistMap, setWishlistMap] = useState({});

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
    return `http://127.0.0.1:8000${cleanPath}`;
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
    <div className="bg-[#FAF8F5] text-[#1A1A1A] font-sans antialiased selection:bg-neutral-900 selection:text-white">

      {/* 1. EXACT MATCH HERO SECTION */}
      <section className="p-4 sm:p-6 md:p-8 max-w-[1400px] mx-auto">
        <div className="relative rounded-[2rem] overflow-hidden min-h-[520px] md:min-h-[600px] bg-[#E8DFD5] flex items-center">
          
          {/* Background Image with Proper Lighting */}
          <img
            src="https://plus.unsplash.com/premium_photo-1740354613210-c474b08f022c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Fashion Model"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Left Shadow Overlay for Typography Contrast */}
          <div className="absolute inset-y-0 left-0 w-full md:w-1/2 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none" />

          {/* Left Text Content */}
          <div className="relative z-10 pl-8 sm:pl-12 md:pl-16 max-w-lg text-white">
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium opacity-90 block mb-6">
              NEW COLLECTION
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal leading-[1.1] mb-6 tracking-tight">
              Dress <br />
              Better. Live <br />
              Better.
            </h1>

            <p className="text-xs sm:text-sm font-light leading-relaxed opacity-80 mb-8 max-w-xs">
              Timeless styles. Premium fabrics. <br />
              Made for every you.
            </p>

            <button
              onClick={() => navigate('/shop')}
              className="bg-[#1C1C1C] text-white px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] font-semibold rounded-md hover:bg-black transition-all"
            >
              SHOP NEW ARRIVALS
            </button>
          </div>

          {/* Right Floating Indicator Numbers (01 - 02 - 03) */}
          <div className="absolute right-8 sm:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-6 text-white z-10">
            <span className="text-xs font-serif font-bold tracking-widest text-white border-b border-white/60 pb-1 cursor-pointer">01</span>
            <div className="w-[1px] h-8 bg-white/30" />
            <span className="text-xs font-serif font-normal tracking-widest text-white/60 hover:text-white cursor-pointer transition-colors">02</span>
            <div className="w-[1px] h-8 bg-white/30" />
            <span className="text-xs font-serif font-normal tracking-widest text-white/60 hover:text-white cursor-pointer transition-colors">03</span>
          </div>

        </div>
      </section>

      {/* 2. GENDER CARDS */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          
          <div 
            onClick={() => navigate('/shop?gender=men')}
            className="bg-[#EFECE6] rounded-2xl p-6 flex items-center justify-between cursor-pointer group hover:shadow-md transition-all"
          >
            <div>
              <h3 className="font-serif text-lg tracking-wider text-neutral-900">MEN</h3>
              <p className="text-[11px] text-neutral-500 font-medium my-1">UP TO 40% OFF</p>
              <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-800 flex items-center gap-1.5 mt-4 group-hover:translate-x-1 transition-transform">
                SHOP NOW <ArrowRight size={12} />
              </span>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=300" 
              alt="Men" 
              className="w-24 h-32 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div 
            onClick={() => navigate('/shop?gender=women')}
            className="bg-[#F5EFEA] rounded-2xl p-6 flex items-center justify-between cursor-pointer group hover:shadow-md transition-all"
          >
            <div>
              <h3 className="font-serif text-lg tracking-wider text-neutral-900">WOMEN</h3>
              <p className="text-[11px] text-neutral-500 font-medium my-1">UP TO 40% OFF</p>
              <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-800 flex items-center gap-1.5 mt-4 group-hover:translate-x-1 transition-transform">
                SHOP NOW <ArrowRight size={12} />
              </span>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300" 
              alt="Women" 
              className="w-24 h-32 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div 
            onClick={() => navigate('/shop?gender=kids')}
            className="bg-[#EDEBE8] rounded-2xl p-6 flex items-center justify-between cursor-pointer group hover:shadow-md transition-all"
          >
            <div>
              <h3 className="font-serif text-lg tracking-wider text-neutral-900">KIDS</h3>
              <p className="text-[11px] text-neutral-500 font-medium my-1">UP TO 40% OFF</p>
              <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-800 flex items-center gap-1.5 mt-4 group-hover:translate-x-1 transition-transform">
                SHOP NOW <ArrowRight size={12} />
              </span>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=300" 
              alt="Kids" 
              className="w-24 h-32 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
          </div>

        </div>
      </section>

      {/* 3. CATEGORIES */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-10">
        <div className="text-center mb-8">
          <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-bold block mb-1">
            TOP CATEGORIES
          </span>
          <h2 className="text-2xl font-serif text-neutral-900">Shop By Category</h2>
        </div>

        <div className="flex items-center justify-start sm:justify-center gap-6 sm:gap-8 overflow-x-auto pb-4 scrollbar-none">
          {categoriesList.map((cat, idx) => (
            <div 
              key={idx}
              onClick={() => navigate(`/shop?category=${cat.slug}`)}
              className="flex flex-col items-center gap-2.5 cursor-pointer group shrink-0"
            >
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden bg-neutral-200 border border-neutral-300/80 p-0.5 group-hover:border-neutral-800 transition-colors">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-xs font-medium text-neutral-700 group-hover:text-black">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BEST SELLERS */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-8">
        <div className="text-center mb-8">
          <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-bold block mb-1">
            BEST SELLERS
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {products.slice(0, 5).map((product) => (
            <div 
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[3/4] bg-[#EAE6DF] rounded-xl overflow-hidden mb-3">
                <img 
                  src={getImageUrl(product)} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800"; }}
                />

                <button
                  onClick={(e) => handleWishlistToggle(e, product.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full text-neutral-700 hover:scale-110 transition-transform shadow-sm"
                >
                  <Heart 
                    size={14} 
                    className={wishlistMap[product.id] ? "fill-red-500 text-red-500" : "text-neutral-600"} 
                  />
                </button>
              </div>

              <h4 className="text-xs font-medium text-neutral-800 truncate">{product.name}</h4>
              <p className="text-xs font-serif font-bold text-neutral-900 mt-1">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button 
            onClick={() => navigate('/shop')}
            className="border border-neutral-900 text-neutral-900 px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-neutral-900 hover:text-white transition-colors rounded-lg"
          >
            VIEW ALL PRODUCTS
          </button>
        </div>
      </section>

      {/* 5. PROMOTIONAL BANNER */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-8">
        <div className="bg-[#EBE5DC] rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="h-[260px] sm:h-[340px] w-full">
            <img 
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000" 
              alt="Wardrobe" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 sm:p-12">
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold block mb-2">
              NEW SEASON, NEW YOU.
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900 mb-3">
              Refresh Your <br /> Wardrobe
            </h2>
            <p className="text-xs text-neutral-600 font-light mb-6 max-w-xs leading-relaxed">
              Explore the latest styles curated for the season.
            </p>
            <button 
              onClick={() => navigate('/shop')}
              className="bg-[#1C1C1C] text-white px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-medium rounded-lg hover:bg-black transition-colors"
            >
              EXPLORE COLLECTION
            </button>
          </div>
        </div>
      </section>

      {/* 6. TRUST BADGES */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-t border-b border-neutral-200 py-8">
          <div className="flex flex-col items-center">
            <Award size={22} className="text-neutral-700 mb-2 stroke-1" />
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-900">PREMIUM QUALITY</h4>
            <p className="text-[10px] text-neutral-500 mt-1">Finest fabrics, crafted for comfort</p>
          </div>
          <div className="flex flex-col items-center">
            <RefreshCw size={22} className="text-neutral-700 mb-2 stroke-1" />
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-900">EASY RETURNS</h4>
            <p className="text-[10px] text-neutral-500 mt-1">Simple returns within 7 days</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck size={22} className="text-neutral-700 mb-2 stroke-1" />
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-900">SECURE PAYMENTS</h4>
            <p className="text-[10px] text-neutral-500 mt-1">100% secure payment gateway</p>
          </div>
          <div className="flex flex-col items-center">
            <Headphones size={22} className="text-neutral-700 mb-2 stroke-1" />
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-900">CUSTOMER SUPPORT</h4>
            <p className="text-[10px] text-neutral-500 mt-1">We're here to help you anytime</p>
          </div>
        </div>
      </section>

    </div>
  );
}