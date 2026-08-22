// import React, { useState } from 'react';
// import { addToWishlist, removeFromWishlist } from '../services/api';

// const ProductCard = ({ product }) => {
//   const [isInWishlist, setIsInWishlist] = useState(false);
//   const [wishlistId, setWishlistId] = useState(null);

//   const handleWishlistToggle = async () => {
//     try {
//       if (isInWishlist) {
//         await removeFromWishlist(wishlistId);
//         setIsInWishlist(false);
//         setWishlistId(null);
//         alert('Wishlist માંથી રિમૂવ થઈ ગયું!');
//       } else {
//         const response = await addToWishlist(product.id);
//         setIsInWishlist(true);
//         setWishlistId(response.data.id);
//         alert('Wishlist માં એડ થઈ ગયું!');
//       }
//     } catch (error) {
//       console.error('Error updating wishlist:', error);
//       alert('મહેરબાની કરીને પહેલા લોગઈન કરો.');
//     }
//   };

//   return (
//     <div className="border p-4 rounded-lg shadow-sm">
//       <h3 className="font-bold">{product.name}</h3>
//       <p className="text-neutral-600">₹{product.price}</p>
      
//       <button 
//         onClick={handleWishlistToggle}
//         className="mt-3 px-3 py-1 text-sm border border-black rounded"
//       >
//         {isInWishlist ? '❤️ Wishlisted' : '🤍 Add to Wishlist'}
//       </button>
//     </div>
//   );
// };

// export default ProductCard;









import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { addToWishlist, removeFromWishlist } from '../services/api';

const ProductCard = ({ product, initialWishlistId = null }) => {
  const navigate = useNavigate();
  const [wishlistId, setWishlistId] = useState(initialWishlistId);
  const [loading, setLoading] = useState(false);

  const isInWishlist = Boolean(wishlistId);

  const getImageUrl = (prod) => {
    if (!prod) return 'https://placehold.co/600x800?text=Garment';
    let imagePath = prod.image || prod.image_url || prod.product_image;
    if (Array.isArray(prod.images) && prod.images.length > 0) {
      imagePath = prod.images[0]?.image || prod.images[0];
    }
    if (!imagePath) return 'https://placehold.co/600x800?text=Garment';
    if (typeof imagePath === 'string' && (imagePath.startsWith('http://') || imagePath.startsWith('https://'))) {
      return imagePath;
    }
    return `https://clothing-backend-gynt.onrender.com${imagePath}`;
  };

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem('access_token');

    if (!token) {
      navigate('/login');
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      if (isInWishlist) {
        await removeFromWishlist(wishlistId);
        setWishlistId(null);
      } else {
        const response = await addToWishlist(product.id);
        setWishlistId(response.data.id);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer flex flex-col bg-white border border-neutral-200/80 shadow-sm hover:shadow-xl transition-all duration-500 rounded-xl overflow-hidden"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        <img
          src={getImageUrl(product)}
          alt={product.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-700 ease-out"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://placehold.co/600x800?text=Unavailable';
          }}
        />

        <button
          onClick={handleWishlistToggle}
          disabled={loading}
          className="absolute top-3 right-3 p-2.5 bg-white/95 backdrop-blur rounded-full shadow-md hover:scale-110 active:scale-95 transition duration-300 z-20 text-neutral-800 disabled:opacity-50"
          title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            size={15}
            className={isInWishlist ? 'fill-red-600 text-red-600' : 'text-neutral-700'}
          />
        </button>

        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent hidden sm:block">
          <span className="block w-full py-2.5 bg-white text-black text-center text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg">
            View Piece
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1 truncate">
            {product.category_name || product.category?.name || 'Haute Couture'}
          </p>
          <h3 className="font-serif text-xs sm:text-sm font-medium text-neutral-900 truncate">
            {product.name}
          </h3>
        </div>

        <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <span className="font-serif text-xs sm:text-sm font-bold text-[#8A6D46]">
            ₹{Number(product.price || 0).toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400 group-hover:text-neutral-900 transition">
            View →
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;