import React, { useState } from 'react';
import { addToWishlist, removeFromWishlist } from '../services/api';

const ProductCard = ({ product }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);

  const handleWishlistToggle = async () => {
    try {
      if (isInWishlist) {
        await removeFromWishlist(wishlistId);
        setIsInWishlist(false);
        setWishlistId(null);
        alert('Wishlist માંથી રિમૂવ થઈ ગયું!');
      } else {
        const response = await addToWishlist(product.id);
        setIsInWishlist(true);
        setWishlistId(response.data.id);
        alert('Wishlist માં એડ થઈ ગયું!');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      alert('મહેરબાની કરીને પહેલા લોગઈન કરો.');
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <h3 className="font-bold">{product.name}</h3>
      <p className="text-neutral-600">₹{product.price}</p>
      
      <button 
        onClick={handleWishlistToggle}
        className="mt-3 px-3 py-1 text-sm border border-black rounded"
      >
        {isInWishlist ? '❤️ Wishlisted' : '🤍 Add to Wishlist'}
      </button>
    </div>
  );
};

export default ProductCard;