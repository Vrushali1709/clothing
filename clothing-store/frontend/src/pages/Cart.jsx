import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShieldCheck, Truck, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  // Smart & Safe Image Helper (તમામ પ્રકારના backend response ને હેન્ડલ કરશે)
  const getImageUrl = (item) => {
    if (!item) return "https://placehold.co/400x500?text=Luxury+Garment";

    // 1. અલગ-અલગ શક્તિમાન કી-નેમ્સ (Keys) માંથી ઈમેજ શોધો
    let imagePath =
      item.image ||
      item.image_url ||
      item.product_image ||
      (Array.isArray(item.images) && item.images[0]?.image) ||
      (Array.isArray(item.images) && item.images[0]) ||
      item.product?.image;

    // 2. જો ઈમેજ ઓબ્જેક્ટ ફોર્મમાં આવે
    if (typeof imagePath === 'object' && imagePath !== null) {
      imagePath = imagePath.url || imagePath.file || '';
    }

    // 3. જો ઈમેજ નથી મળી
    if (!imagePath || typeof imagePath !== 'string') {
      return "https://placehold.co/400x500?text=Luxury+Garment";
    }

    // 4. જો પૂર્ણ URL ઓલરેડી હોય
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }

    // 5. Django URL સેટઅપ (સ્લેશ `/` ના લોચા વગર)
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `http://127.0.0.1:8000${cleanPath}`;
  };

  // Empty Cart View
  if (cart.length === 0) {
    return (
      <div className="bg-[#FAF8F5] min-h-[75vh] flex flex-col justify-center items-center px-4 sm:px-6 py-16 sm:py-20 text-center text-neutral-900">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-6 text-neutral-400">
          <ShoppingBag size={24} strokeWidth={1.5} className="sm:w-7 sm:h-7" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold mb-2 block">
          Your Selection
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif mb-3 tracking-tight">Your Shopping Bag is Empty</h2>
        <p className="text-xs font-light text-neutral-500 max-w-sm mb-8 leading-relaxed">
          Explore our latest haute couture pieces and elevate your personal wardrobe today.
        </p>
        <button 
          onClick={() => navigate('/shop')}
          className="bg-neutral-900 text-white px-6 sm:px-8 py-3.5 sm:py-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-black transition-all shadow-md flex items-center gap-3 group"
        >
          Explore Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-8 sm:py-12 md:py-16 selection:bg-neutral-900 selection:text-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        
        {/* Header */}
        <div className="mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block mb-1">
              Curated Selection
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight">Shopping Bag</h1>
          </div>
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500">
            {cart.length} {cart.length === 1 ? 'Item' : 'Items'} Reserved
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            {cart.map(item => (
              <div 
                key={item.cartId} 
                className="bg-white border border-neutral-200/80 p-3.5 sm:p-4 md:p-6 flex gap-3.5 sm:gap-6 items-start sm:items-center shadow-sm hover:shadow-md transition duration-300"
              >
                {/* Garment Image Box */}
                <div className="w-20 h-28 sm:w-24 sm:h-32 md:w-28 md:h-36 bg-neutral-100 flex-shrink-0 overflow-hidden relative border border-neutral-100">
                  <img 
                    src={getImageUrl(item)} 
                    alt={item.name} 
                    className="w-full h-full object-cover object-top"
                    onError={(e) => { 
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/400x500?text=Unavailable"; 
                    }}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between h-full py-0.5 sm:py-1 min-w-0">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2">
                      <h3 className="font-serif text-sm sm:text-base md:text-lg text-neutral-900 font-medium truncate">
                        {item.name}
                      </h3>
                      <p className="font-serif text-sm sm:text-base font-semibold text-neutral-900 whitespace-nowrap">
                        ₹{Number(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>

                    {/* Meta Specs */}
                    <div className="mt-1.5 sm:mt-2 space-y-0.5 sm:space-y-1 text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
                      {item.selectedSize && <p>Size: <span className="text-neutral-900">{item.selectedSize}</span></p>}
                      {item.selectedColor && <p>Color: <span className="text-neutral-900">{item.selectedColor}</span></p>}
                      <p>Quantity: <span className="text-neutral-900">{item.quantity}</span></p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-neutral-100 flex justify-between items-center">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-emerald-700 font-semibold">
                      In Stock & Ready
                    </span>
                    <button 
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-neutral-400 hover:text-red-600 transition flex items-center gap-1 sm:gap-1.5 text-xs font-light"
                      title="Remove Item"
                    >
                      <Trash2 size={14} strokeWidth={1.5} className="sm:w-4 sm:h-4" />
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-widest">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5 bg-white border border-neutral-200/80 p-5 sm:p-8 shadow-sm lg:sticky lg:top-8">
            <h2 className="font-serif text-lg sm:text-xl text-neutral-900 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-neutral-200 tracking-tight">
              Order Summary
            </h2>

            <div className="space-y-3 sm:space-y-4 text-xs tracking-wide">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-serif text-xs sm:text-sm font-medium text-neutral-900">
                  ₹{Number(totalPrice).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between text-neutral-600">
                <span>Express Shipping</span>
                <span className="text-emerald-700 font-semibold uppercase tracking-wider text-[9px] sm:text-[10px]">
                  Complimentary
                </span>
              </div>

              <div className="flex justify-between text-neutral-600">
                <span>Estimated Taxes</span>
                <span className="text-neutral-400">Included</span>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-neutral-200 flex justify-between items-baseline">
                <span className="font-serif text-sm sm:text-base text-neutral-900 font-semibold">Total</span>
                <span className="font-serif text-xl sm:text-2xl text-neutral-900 font-bold">
                  ₹{Number(totalPrice).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full mt-6 sm:mt-8 bg-neutral-900 text-white py-3.5 sm:py-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-black transition shadow-lg flex items-center justify-center gap-2 group"
            >
              Proceed to Checkout 
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Luxury Assurance Badges */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-neutral-100 space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-2.5 sm:gap-3 text-neutral-600">
                <Truck size={15} strokeWidth={1.5} className="text-neutral-800 shrink-0" />
                <span className="text-[10px] sm:text-[11px] tracking-wide">Complimentary express global delivery</span>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 text-neutral-600">
                <ShieldCheck size={15} strokeWidth={1.5} className="text-neutral-800 shrink-0" />
                <span className="text-[10px] sm:text-[11px] tracking-wide">Guaranteed 100% authentic luxury garments</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}