// import React from 'react';
// import { useCart } from '../context/CartContext';
// import { useNavigate } from 'react-router-dom';
// import { Trash2, ArrowRight, ShieldCheck, Truck, ShoppingBag } from 'lucide-react';

// export default function Cart() {
//   const { cart, removeFromCart, totalPrice } = useCart();
//   const navigate = useNavigate();

//   // Smart & Safe Image Helper (તમામ પ્રકારના backend response ને હેન્ડલ કરશે)
//   const getImageUrl = (item) => {
//     if (!item) return "https://placehold.co/400x500?text=Luxury+Garment";

//     // 1. અલગ-અલગ શક્તિમાન કી-નેમ્સ (Keys) માંથી ઈમેજ શોધો
//     let imagePath =
//       item.image ||
//       item.image_url ||
//       item.product_image ||
//       (Array.isArray(item.images) && item.images[0]?.image) ||
//       (Array.isArray(item.images) && item.images[0]) ||
//       item.product?.image;

//     // 2. જો ઈમેજ ઓબ્જેક્ટ ફોર્મમાં આવે
//     if (typeof imagePath === 'object' && imagePath !== null) {
//       imagePath = imagePath.url || imagePath.file || '';
//     }

//     // 3. જો ઈમેજ નથી મળી
//     if (!imagePath || typeof imagePath !== 'string') {
//       return "https://placehold.co/400x500?text=Luxury+Garment";
//     }

//     // 4. જો પૂર્ણ URL ઓલરેડી હોય
//     if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
//       return imagePath;
//     }

//     // 5. Django URL સેટઅપ (સ્લેશ `/` ના લોચા વગર)
//     const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
//     return `http://127.0.0.1:8000${cleanPath}`;
//   };

//   // Empty Cart View
//   if (cart.length === 0) {
//     return (
//       <div className="bg-[#FAF8F5] min-h-[75vh] flex flex-col justify-center items-center px-4 sm:px-6 py-16 sm:py-20 text-center text-neutral-900">
//         <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-6 text-neutral-400">
//           <ShoppingBag size={24} strokeWidth={1.5} className="sm:w-7 sm:h-7" />
//         </div>
//         <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold mb-2 block">
//           Your Selection
//         </span>
//         <h2 className="text-2xl sm:text-3xl font-serif mb-3 tracking-tight">Your Shopping Bag is Empty</h2>
//         <p className="text-xs font-light text-neutral-500 max-w-sm mb-8 leading-relaxed">
//           Explore our latest haute couture pieces and elevate your personal wardrobe today.
//         </p>
//         <button 
//           onClick={() => navigate('/shop')}
//           className="bg-neutral-900 text-white px-6 sm:px-8 py-3.5 sm:py-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-black transition-all shadow-md flex items-center gap-3 group"
//         >
//           Explore Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-8 sm:py-12 md:py-16 selection:bg-neutral-900 selection:text-white">
//       <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        
//         {/* Header */}
//         <div className="mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
//           <div>
//             <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block mb-1">
//               Curated Selection
//             </span>
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight">Shopping Bag</h1>
//           </div>
//           <span className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500">
//             {cart.length} {cart.length === 1 ? 'Item' : 'Items'} Reserved
//           </span>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
//           {/* Cart Items List */}
//           <div className="lg:col-span-7 space-y-4 sm:space-y-6">
//             {cart.map(item => (
//               <div 
//                 key={item.cartId} 
//                 className="bg-white border border-neutral-200/80 p-3.5 sm:p-4 md:p-6 flex gap-3.5 sm:gap-6 items-start sm:items-center shadow-sm hover:shadow-md transition duration-300"
//               >
//                 {/* Garment Image Box */}
//                 <div className="w-20 h-28 sm:w-24 sm:h-32 md:w-28 md:h-36 bg-neutral-100 flex-shrink-0 overflow-hidden relative border border-neutral-100">
//                   <img 
//                     src={getImageUrl(item)} 
//                     alt={item.name} 
//                     className="w-full h-full object-cover object-top"
//                     onError={(e) => { 
//                       e.target.onerror = null;
//                       e.target.src = "https://placehold.co/400x500?text=Unavailable"; 
//                     }}
//                   />
//                 </div>

//                 {/* Details */}
//                 <div className="flex-1 flex flex-col justify-between h-full py-0.5 sm:py-1 min-w-0">
//                   <div>
//                     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2">
//                       <h3 className="font-serif text-sm sm:text-base md:text-lg text-neutral-900 font-medium truncate">
//                         {item.name}
//                       </h3>
//                       <p className="font-serif text-sm sm:text-base font-semibold text-neutral-900 whitespace-nowrap">
//                         ₹{Number(item.price * item.quantity).toLocaleString('en-IN')}
//                       </p>
//                     </div>

//                     {/* Meta Specs */}
//                     <div className="mt-1.5 sm:mt-2 space-y-0.5 sm:space-y-1 text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
//                       {item.selectedSize && <p>Size: <span className="text-neutral-900">{item.selectedSize}</span></p>}
//                       {item.selectedColor && <p>Color: <span className="text-neutral-900">{item.selectedColor}</span></p>}
//                       <p>Quantity: <span className="text-neutral-900">{item.quantity}</span></p>
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-neutral-100 flex justify-between items-center">
//                     <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-emerald-700 font-semibold">
//                       In Stock & Ready
//                     </span>
//                     <button 
//                       onClick={() => removeFromCart(item.cartId)}
//                       className="text-neutral-400 hover:text-red-600 transition flex items-center gap-1 sm:gap-1.5 text-xs font-light"
//                       title="Remove Item"
//                     >
//                       <Trash2 size={14} strokeWidth={1.5} className="sm:w-4 sm:h-4" />
//                       <span className="text-[9px] sm:text-[10px] uppercase tracking-widest">Remove</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Order Summary Sidebar */}
//           <div className="lg:col-span-5 bg-white border border-neutral-200/80 p-5 sm:p-8 shadow-sm lg:sticky lg:top-8">
//             <h2 className="font-serif text-lg sm:text-xl text-neutral-900 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-neutral-200 tracking-tight">
//               Order Summary
//             </h2>

//             <div className="space-y-3 sm:space-y-4 text-xs tracking-wide">
//               <div className="flex justify-between text-neutral-600">
//                 <span>Subtotal</span>
//                 <span className="font-serif text-xs sm:text-sm font-medium text-neutral-900">
//                   ₹{Number(totalPrice).toLocaleString('en-IN')}
//                 </span>
//               </div>

//               <div className="flex justify-between text-neutral-600">
//                 <span>Express Shipping</span>
//                 <span className="text-emerald-700 font-semibold uppercase tracking-wider text-[9px] sm:text-[10px]">
//                   Complimentary
//                 </span>
//               </div>

//               <div className="flex justify-between text-neutral-600">
//                 <span>Estimated Taxes</span>
//                 <span className="text-neutral-400">Included</span>
//               </div>

//               <div className="pt-3 sm:pt-4 border-t border-neutral-200 flex justify-between items-baseline">
//                 <span className="font-serif text-sm sm:text-base text-neutral-900 font-semibold">Total</span>
//                 <span className="font-serif text-xl sm:text-2xl text-neutral-900 font-bold">
//                   ₹{Number(totalPrice).toLocaleString('en-IN')}
//                 </span>
//               </div>
//             </div>

//             {/* Checkout Button */}
//             <button 
//               onClick={() => navigate('/checkout')}
//               className="w-full mt-6 sm:mt-8 bg-neutral-900 text-white py-3.5 sm:py-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-black transition shadow-lg flex items-center justify-center gap-2 group"
//             >
//               Proceed to Checkout 
//               <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
//             </button>

//             {/* Luxury Assurance Badges */}
//             <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-neutral-100 space-y-2.5 sm:space-y-3">
//               <div className="flex items-center gap-2.5 sm:gap-3 text-neutral-600">
//                 <Truck size={15} strokeWidth={1.5} className="text-neutral-800 shrink-0" />
//                 <span className="text-[10px] sm:text-[11px] tracking-wide">Complimentary express global delivery</span>
//               </div>
//               <div className="flex items-center gap-2.5 sm:gap-3 text-neutral-600">
//                 <ShieldCheck size={15} strokeWidth={1.5} className="text-neutral-800 shrink-0" />
//                 <span className="text-[10px] sm:text-[11px] tracking-wide">Guaranteed 100% authentic luxury garments</span>
//               </div>
//             </div>

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }











import React, { useMemo, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import {
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  ShoppingBag,
  Plus,
  Minus,
  Tag,
  Lock,
  Heart,
  X,
  CheckCircle2,
} from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 999;

export default function Cart() {
  const {
    cart,
    removeFromCart,
    totalPrice,
    updateQuantity,
  } = useCart();

  const navigate = useNavigate();

  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // ---------------------------------------------------------
  // IMAGE HELPER
  // ---------------------------------------------------------
  const getImageUrl = (item) => {
    if (!item) {
      return 'https://placehold.co/400x500?text=Luxury+Garment';
    }

    let imagePath =
      item.image ||
      item.image_url ||
      item.product_image ||
      (Array.isArray(item.images) && item.images[0]?.image) ||
      (Array.isArray(item.images) && item.images[0]) ||
      item.product?.image;

    if (typeof imagePath === 'object' && imagePath !== null) {
      imagePath =
        imagePath.url ||
        imagePath.file ||
        imagePath.image ||
        '';
    }

    if (!imagePath || typeof imagePath !== 'string') {
      return 'https://placehold.co/400x500?text=Luxury+Garment';
    }

    if (
      imagePath.startsWith('http://') ||
      imagePath.startsWith('https://')
    ) {
      return imagePath;
    }

    const cleanPath = imagePath.startsWith('/')
      ? imagePath
      : `/${imagePath}`;

    const backendUrl =
      import.meta.env.VITE_API_BASE_URL ||
      'http://127.0.0.1:8000';

    return `${backendUrl.replace(/\/$/, '')}${cleanPath}`;
  };

  // ---------------------------------------------------------
  // QUANTITY HANDLER
  // ---------------------------------------------------------
  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;

    if (typeof updateQuantity === 'function') {
      updateQuantity(item.cartId, newQuantity);
    }
  };

  // ---------------------------------------------------------
  // COUPON
  // ---------------------------------------------------------
  const calculateDiscount = () => {
    if (appliedCoupon === 'WELCOME10') {
      return Math.round(Number(totalPrice) * 0.10);
    }

    if (appliedCoupon === 'LUXURY15') {
      return Math.round(Number(totalPrice) * 0.15);
    }

    return 0;
  };

  const discount = calculateDiscount();

  const shipping =
    Number(totalPrice) >= FREE_SHIPPING_THRESHOLD ? 0 : 99;

  const finalTotal =
    Math.max(
      0,
      Number(totalPrice) - discount + shipping
    );

  const shippingProgress = Math.min(
    100,
    (Number(totalPrice) / FREE_SHIPPING_THRESHOLD) * 100
  );

  const amountForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - Number(totalPrice)
  );

  const handleApplyCoupon = async () => {
    const code = coupon.trim().toUpperCase();

    setCouponError('');
    setCouponMessage('');

    if (!code) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    setIsApplyingCoupon(true);

    await new Promise((resolve) => setTimeout(resolve, 400));

    if (code === 'WELCOME10') {
      setAppliedCoupon(code);
      setCouponMessage('10% discount applied successfully.');
    } else if (code === 'LUXURY15' && Number(totalPrice) >= 2000) {
      setAppliedCoupon(code);
      setCouponMessage('15% luxury discount applied.');
    } else if (code === 'LUXURY15') {
      setCouponError(
        'LUXURY15 is available on orders above ₹2,000.'
      );
      setAppliedCoupon('');
    } else {
      setCouponError(
        'Invalid coupon code. Try WELCOME10.'
      );
      setAppliedCoupon('');
    }

    setIsApplyingCoupon(false);
  };

  const removeCoupon = () => {
    setAppliedCoupon('');
    setCoupon('');
    setCouponError('');
    setCouponMessage('');
  };

  // ---------------------------------------------------------
  // CHECKOUT
  // ---------------------------------------------------------
  const handleCheckout = () => {
    if (!cart.length) return;

    navigate('/checkout', {
      state: {
        subtotal: Number(totalPrice),
        discount,
        shipping,
        total: finalTotal,
        coupon: appliedCoupon,
      },
    });
  };

  // ---------------------------------------------------------
  // EMPTY CART
  // ---------------------------------------------------------
  if (cart.length === 0) {
    return (
      <div className="bg-[#FAF8F5] min-h-[80vh] flex flex-col justify-center items-center px-4 py-16 text-center text-neutral-900">

        <div className="w-20 h-20 rounded-full bg-white border border-neutral-200 flex items-center justify-center mb-7 shadow-sm">
          <ShoppingBag
            size={30}
            strokeWidth={1.3}
            className="text-neutral-400"
          />
        </div>

        <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold mb-2">
          Your Selection
        </span>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-3">
          Your Shopping Bag is Empty
        </h2>

        <p className="text-xs sm:text-sm font-light text-neutral-500 max-w-md mb-8 leading-relaxed">
          Discover our curated collection of refined pieces
          designed to elevate your everyday wardrobe.
        </p>

        <button
          onClick={() => navigate('/shop')}
          className="bg-neutral-900 text-white px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.25em] hover:bg-black transition-all shadow-lg flex items-center gap-3 group"
        >
          Explore Collection

          <ArrowRight
            size={15}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-8 sm:py-12 md:py-16">

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-7xl">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="mb-7 sm:mb-10 pb-5 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-end justify-between gap-3">

          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block mb-1">
              Curated Selection
            </span>

            <h1 className="text-3xl sm:text-4xl font-serif tracking-tight">
              Shopping Bag
            </h1>
          </div>

          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500">
            {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        {/* =====================================================
            FREE SHIPPING MESSAGE
        ====================================================== */}
        <div className="mb-7 bg-white border border-neutral-200 p-4 sm:p-5">

          {amountForFreeShipping > 0 ? (
            <div>
              <div className="flex justify-between items-center gap-4 mb-3">

                <p className="text-[10px] sm:text-xs uppercase tracking-wider text-neutral-600">
                  Add{' '}
                  <span className="font-bold text-neutral-900">
                    ₹{amountForFreeShipping.toLocaleString('en-IN')}
                  </span>{' '}
                  more for complimentary shipping
                </p>

                <Truck
                  size={17}
                  className="text-neutral-800 shrink-0"
                />
              </div>

              <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-neutral-900 transition-all duration-500"
                  style={{
                    width: `${shippingProgress}%`,
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-emerald-700">

              <CheckCircle2 size={18} />

              <p className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold">
                Congratulations! You qualify for complimentary shipping.
              </p>
            </div>
          )}
        </div>

        {/* =====================================================
            MAIN GRID
        ====================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* ===================================================
              CART ITEMS
          ==================================================== */}
          <div className="lg:col-span-7 space-y-4">

            {cart.map((item) => (

              <div
                key={item.cartId}
                className="bg-white border border-neutral-200 p-3 sm:p-5 shadow-sm hover:shadow-md transition-all"
              >

                <div className="flex gap-4 sm:gap-6">

                  {/* IMAGE */}
                  <div className="w-24 h-32 sm:w-32 sm:h-40 bg-neutral-100 shrink-0 overflow-hidden relative">

                    <img
                      src={getImageUrl(item)}
                      alt={item.name || 'Product'}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          'https://placehold.co/400x500?text=Unavailable';
                      }}
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="flex-1 min-w-0">

                    <div className="flex justify-between items-start gap-3">

                      <div className="min-w-0">

                        <h3 className="font-serif text-base sm:text-lg text-neutral-900 truncate">
                          {item.name}
                        </h3>

                        {item.category_name && (
                          <p className="text-[9px] uppercase tracking-widest text-neutral-400 mt-1">
                            {item.category_name}
                          </p>
                        )}

                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-neutral-400 hover:text-red-600 transition shrink-0"
                        title="Remove item"
                      >
                        <X size={17} />
                      </button>
                    </div>

                    {/* SPECS */}
                    <div className="mt-3 space-y-1 text-[10px] uppercase tracking-wider text-neutral-500">

                      {item.selectedSize && (
                        <p>
                          Size:{' '}
                          <span className="text-neutral-900 font-semibold">
                            {item.selectedSize}
                          </span>
                        </p>
                      )}

                      {item.selectedColor && (
                        <p>
                          Color:{' '}
                          <span className="text-neutral-900 font-semibold">
                            {item.selectedColor}
                          </span>
                        </p>
                      )}

                    </div>

                    {/* PRICE */}
                    <div className="mt-3">

                      <span className="font-serif text-base sm:text-lg font-semibold">
                        ₹
                        {Number(
                          item.price * item.quantity
                        ).toLocaleString('en-IN')}
                      </span>

                      {item.quantity > 1 && (
                        <span className="ml-2 text-[10px] text-neutral-400">
                          ₹
                          {Number(item.price).toLocaleString('en-IN')}
                          {' '}each
                        </span>
                      )}
                    </div>

                    {/* BOTTOM ACTIONS */}
                    <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">

                      {/* QUANTITY */}
                      <div className="flex items-center border border-neutral-200 bg-[#FAF8F5]">

                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityChange(
                              item,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Minus size={13} />
                        </button>

                        <span className="w-8 text-center text-xs font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityChange(
                              item,
                              item.quantity + 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black"
                        >
                          <Plus size={13} />
                        </button>

                      </div>

                      {/* STOCK */}
                      <span className="hidden sm:flex items-center gap-1 text-[9px] uppercase tracking-widest text-emerald-700 font-semibold">
                        <CheckCircle2 size={12} />
                        In Stock
                      </span>

                      {/* REMOVE */}
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-[9px] uppercase tracking-widest text-neutral-400 hover:text-red-600 transition flex items-center gap-1"
                      >
                        <Trash2 size={13} />
                        Remove
                      </button>

                    </div>

                  </div>
                </div>
              </div>
            ))}

            {/* CONTINUE SHOPPING */}
            <button
              onClick={() => navigate('/shop')}
              className="mt-3 text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-600 hover:text-black flex items-center gap-2"
            >
              <ArrowLeft size={14} />
              Continue Shopping
            </button>

          </div>

          {/* ===================================================
              ORDER SUMMARY
          ==================================================== */}
          <div className="lg:col-span-5">

            <div className="bg-white border border-neutral-200 p-5 sm:p-7 lg:sticky lg:top-24 shadow-sm">

              <h2 className="font-serif text-xl text-neutral-900 pb-4 border-b border-neutral-200">
                Order Summary
              </h2>

              {/* SUBTOTAL */}
              <div className="space-y-4 mt-5 text-xs">

                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>

                  <span className="font-serif font-medium text-neutral-900">
                    ₹
                    {Number(totalPrice).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* DISCOUNT */}
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">

                    <span>
                      Discount
                      {appliedCoupon && (
                        <span className="ml-1 text-[9px] uppercase">
                          ({appliedCoupon})
                        </span>
                      )}
                    </span>

                    <span>
                      -₹
                      {discount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                {/* SHIPPING */}
                <div className="flex justify-between text-neutral-600">

                  <span>Shipping</span>

                  {shipping === 0 ? (
                    <span className="text-emerald-700 font-semibold uppercase text-[9px] tracking-wider">
                      Complimentary
                    </span>
                  ) : (
                    <span className="font-medium text-neutral-900">
                      ₹99
                    </span>
                  )}

                </div>

              </div>

              {/* COUPON */}
              <div className="mt-6 pt-5 border-t border-neutral-100">

                <div className="flex items-center gap-2 mb-3">

                  <Tag size={15} className="text-neutral-500" />

                  <span className="text-[10px] uppercase tracking-widest font-semibold text-neutral-700">
                    Promo Code
                  </span>

                </div>

                {!appliedCoupon ? (
                  <div className="flex gap-2">

                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) =>
                        setCoupon(e.target.value.toUpperCase())
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleApplyCoupon();
                        }
                      }}
                      placeholder="ENTER CODE"
                      className="flex-1 min-w-0 bg-[#FAF8F5] border border-neutral-200 px-3 py-3 text-[10px] uppercase tracking-wider outline-none focus:border-neutral-900"
                    />

                    <button
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon}
                      className="px-4 bg-neutral-900 text-white text-[9px] uppercase tracking-widest font-semibold hover:bg-black disabled:opacity-50 transition"
                    >
                      {isApplyingCoupon ? '...' : 'Apply'}
                    </button>

                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-3">

                    <div className="flex items-center gap-2">

                      <CheckCircle2
                        size={14}
                        className="text-emerald-700"
                      />

                      <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-semibold">
                        {appliedCoupon}
                      </span>

                    </div>

                    <button
                      onClick={removeCoupon}
                      className="text-[9px] uppercase tracking-widest text-neutral-500 hover:text-red-600"
                    >
                      Remove
                    </button>

                  </div>
                )}

                {couponError && (
                  <p className="mt-2 text-[10px] text-red-600">
                    {couponError}
                  </p>
                )}

                {couponMessage && appliedCoupon && (
                  <p className="mt-2 text-[10px] text-emerald-700">
                    {couponMessage}
                  </p>
                )}

                <p className="mt-2 text-[9px] text-neutral-400">
                  Try WELCOME10 for 10% off.
                </p>

              </div>

              {/* TOTAL */}
              <div className="mt-6 pt-5 border-t border-neutral-200">

                <div className="flex justify-between items-end">

                  <div>
                    <p className="font-serif text-base font-semibold">
                      Total
                    </p>

                    <p className="text-[9px] text-neutral-400 uppercase tracking-wider mt-1">
                      Inclusive of applicable taxes
                    </p>
                  </div>

                  <span className="font-serif text-2xl font-bold">
                    ₹
                    {finalTotal.toLocaleString('en-IN')}
                  </span>

                </div>
              </div>

              {/* CHECKOUT */}
              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-neutral-900 text-white py-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] hover:bg-black transition shadow-lg flex items-center justify-center gap-2 group"
              >
                Proceed to Checkout

                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              {/* SECURE CHECKOUT */}
              <div className="flex items-center justify-center gap-2 mt-4 text-[9px] uppercase tracking-widest text-neutral-400">
                <Lock size={12} />
                Secure Checkout
              </div>

              {/* TRUST */}
              <div className="mt-6 pt-5 border-t border-neutral-100 space-y-4">

                <div className="flex items-center gap-3 text-neutral-600">

                  <Truck
                    size={17}
                    strokeWidth={1.5}
                    className="text-neutral-800 shrink-0"
                  />

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-900">
                      Fast Delivery
                    </p>

                    <p className="text-[9px] text-neutral-500 mt-0.5">
                      Complimentary shipping above ₹999
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3 text-neutral-600">

                  <ShieldCheck
                    size={17}
                    strokeWidth={1.5}
                    className="text-neutral-800 shrink-0"
                  />

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-900">
                      Secure & Authentic
                    </p>

                    <p className="text-[9px] text-neutral-500 mt-0.5">
                      100% authentic products
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3 text-neutral-600">

                  <Heart
                    size={17}
                    strokeWidth={1.5}
                    className="text-neutral-800 shrink-0"
                  />

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-900">
                      Curated For You
                    </p>

                    <p className="text-[9px] text-neutral-500 mt-0.5">
                      Premium pieces, carefully selected
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}