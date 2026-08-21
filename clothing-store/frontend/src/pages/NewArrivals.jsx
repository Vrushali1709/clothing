import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import API, { getWishlist, addToWishlist, removeFromWishlist } from '../services/api';

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [wishlistMap, setWishlistMap] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    API.get('products/')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        // Sort by ID descending so newest added products appear first
        const sortedNew = data.sort((a, b) => b.id - a.id);
        setProducts(sortedNew);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

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
        await removeFromWishlist(wishlistMap[productId]);
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
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-10 sm:py-16 px-4 sm:px-8 md:px-12 font-sans">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-semibold mb-2 block">
            Fresh From The Atelier
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-neutral-900 tracking-tight">
            New Arrivals
          </h1>
          <div className="w-12 h-[1px] bg-neutral-400 mx-auto mt-4"></div>
        </div>

        {/* Grid Display */}
        {loading ? (
          <div className="text-center py-20 font-serif text-neutral-500 uppercase tracking-widest text-xs">
            Curating Latest Pieces...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 font-serif text-neutral-500 text-sm">
            No new arrivals found at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {products.map(product => (
              <div 
                key={product.id} 
                onClick={() => navigate(`/product/${product.id}`)}
                className="group cursor-pointer flex flex-col relative"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-3 sm:mb-4">
                  <img 
                    src={getImageUrl(product)} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-700 ease-out" 
                    onError={(e) => { e.target.src = "https://placehold.co/600x800?text=Image+Unavailable"; }}
                  />

                  <button 
                    onClick={(e) => handleWishlistToggle(e, product.id)}
                    className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-2 sm:p-2.5 bg-white/80 backdrop-blur rounded-full shadow-sm hover:scale-110 active:scale-95 transition duration-300 z-20 text-neutral-800"
                    title={wishlistMap[product.id] ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    <Heart 
                      size={15} 
                      className={wishlistMap[product.id] ? "fill-red-600 text-red-600" : "text-neutral-800"} 
                    />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent hidden sm:block">
                    <span className="block w-full py-2.5 bg-white text-black text-center text-[10px] font-bold uppercase tracking-[0.2em]">
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
                    ₹{Number(product.price).toLocaleString('en-IN')}
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