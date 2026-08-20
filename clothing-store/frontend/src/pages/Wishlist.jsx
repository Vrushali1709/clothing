import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import API, { getWishlist, removeFromWishlist } from '../services/api';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Smart Image Helper (તમામ પ્રકારની Image Key ને ઓટોમેટિક હેન્ડલ કરશે)
  const getImageUrl = (product) => {
    if (!product) return "https://placehold.co/600x800?text=Luxury+Garment";

    // 1. અલગ-અલગ જગ્યાએથી ઈમેજ પાથ શોધો
    let imagePath =
      product.image ||
      product.image_url ||
      product.product_image ||
      (Array.isArray(product.images) && product.images[0]?.image) ||
      (Array.isArray(product.images) && product.images[0]) ||
      product.product?.image;

    // 2. જો ઈમેજ ઓબ્જેક્ટ હોય
    if (typeof imagePath === 'object' && imagePath !== null) {
      imagePath = imagePath.url || imagePath.file || '';
    }

    // 3. જો ઈમેજ ન મળે
    if (!imagePath || typeof imagePath !== 'string') {
      return "https://placehold.co/600x800?text=Luxury+Garment";
    }

    // 4. જો પૂર્ણ URL ઓલરેડી હોય
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }

    // 5. Backend Base URL સાથે જોડો
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `http://127.0.0.1:8000${cleanPath}`;
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Wishlist અને Products બંને Fetch કરીને Data Merge કરીએ છીએ
    Promise.all([
      getWishlist(),
      API.get('products/')
    ])
      .then(([wishlistRes, productsRes]) => {
        const rawWishlist = Array.isArray(wishlistRes.data) ? wishlistRes.data : wishlistRes.data.results || [];
        const rawProducts = Array.isArray(productsRes.data) ? productsRes.data : productsRes.data.results || [];

        // Fast Lookup માટે Products Map
        const productsMap = {};
        rawProducts.forEach(p => {
          productsMap[p.id] = p;
        });

        // Wishlist items ને સાચા પ્રોડક્ટ ડેટા સાથે લિંક કરીએ છીએ
        const formattedWishlist = rawWishlist.map(item => {
          const pId = typeof item.product === 'object' ? item.product.id : item.product;
          const productData = (typeof item.product === 'object' && item.product !== null) 
            ? item.product 
            : (productsMap[pId] || item.product_details || {});

          return {
            wishlistId: item.id,
            product: {
              ...productData,
              id: pId,
              name: productData.name || `Garment #${pId}`,
              price: productData.price || 0,
              category_name: productData.category_name || 'Haute Couture'
            }
          };
        });

        setWishlistItems(formattedWishlist);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [navigate]);

  const handleRemove = async (wishlistId) => {
    try {
      await removeFromWishlist(wishlistId);
      setWishlistItems((prev) => prev.filter((item) => item.wishlistId !== wishlistId));
    } catch (err) {
      console.error(err);
      alert('Failed to remove item from wishlist.');
    }
  };

  if (loading) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen flex justify-center items-center text-xs font-serif uppercase tracking-widest text-neutral-500 p-4 text-center">
        Fetching Saved Garments...
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="bg-[#FAF8F5] min-h-[75vh] flex flex-col justify-center items-center px-4 sm:px-6 py-12 sm:py-20 text-center text-neutral-900">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4 sm:mb-6 text-neutral-400">
          <Heart size={24} className="sm:hidden" strokeWidth={1.5} />
          <Heart size={28} className="hidden sm:block" strokeWidth={1.5} />
        </div>
        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-neutral-400 font-bold mb-2 block">
          Personal Favorites
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif mb-3 tracking-tight">Your Wishlist is Empty</h2>
        <p className="text-xs font-light text-neutral-500 max-w-sm mb-6 sm:mb-8 leading-relaxed px-2">
          Explore our collection and save your favorite garments for later.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-neutral-900 text-white px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-black active:scale-[0.98] transition-all shadow-md flex items-center gap-2.5 sm:gap-3 group"
        >
          Explore Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        {/* Page Header */}
        <div className="mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
          <div>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-neutral-400 font-bold block mb-1">
              Curated Favorites
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight">Saved Wishlist</h1>
          </div>
          <span className="text-[11px] sm:text-xs uppercase tracking-widest text-neutral-500">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'} Reserved
          </span>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
          {wishlistItems.map((item) => (
            <div key={item.wishlistId} className="bg-white border border-neutral-200/80 group flex flex-col justify-between shadow-sm hover:shadow-md transition">
              <div>
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                  <img
                    src={getImageUrl(item.product)}
                    alt={item.product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-700 ease-out"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/600x800?text=Garment";
                    }}
                  />
                  <button
                    onClick={() => handleRemove(item.wishlistId)}
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-white/90 backdrop-blur rounded-full shadow-sm hover:bg-red-50 text-neutral-600 hover:text-red-600 active:scale-95 transition"
                    title="Remove"
                  >
                    <Trash2 size={14} className="sm:hidden" strokeWidth={1.5} />
                    <Trash2 size={15} className="hidden sm:block" strokeWidth={1.5} />
                  </button>
                </div>

                <div className="p-3 sm:p-4">
                  <h3 className="font-serif text-xs sm:text-sm font-medium text-neutral-900 truncate">{item.product.name}</h3>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400 mt-0.5 sm:mt-1 truncate">{item.product.category_name}</p>
                  <p className="font-serif text-xs sm:text-sm font-semibold text-neutral-900 mt-1.5 sm:mt-2">₹{Number(item.product.price).toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="p-3 sm:p-4 pt-0">
                <button
                  onClick={() => navigate(`/product/${item.product.id}`)}
                  className="w-full bg-neutral-900 text-white py-2.5 sm:py-3 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] hover:bg-black active:scale-[0.98] transition"
                >
                  View Piece
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}