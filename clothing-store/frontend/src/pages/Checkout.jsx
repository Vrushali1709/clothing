// import React, { useState } from 'react';
// import { useCart } from '../context/CartContext';
// import { useNavigate } from 'react-router-dom';
// import { ShieldCheck, ArrowRight, Lock, CreditCard } from 'lucide-react';
// import API from '../services/api';

// export default function Checkout() {
//   const { cart, totalPrice, clearCart } = useCart();
//   const navigate = useNavigate();

//   const [shippingAddress, setShippingAddress] = useState({
//     full_name: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: '',
//   });

//   const [paymentMethod, setPaymentMethod] = useState('Razorpay');
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
//   };

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return "https://placehold.co/400x500?text=Garment";
//     if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
//     return `http://127.0.0.1:8000${imagePath}`;
//   };

//   const saveOrderToDatabase = async (isPaid = false, paymentRef = 'COD') => {
//     const token = localStorage.getItem('access_token');
//     const orderData = {
//       full_name: shippingAddress.full_name,
//       email: shippingAddress.email,
//       phone: shippingAddress.phone,
//       shipping_address: `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.pincode}`,
//       city: shippingAddress.city,
//       pincode: shippingAddress.pincode,
//       total_price: totalPrice,
//       payment_method: paymentRef,
//       is_paid: isPaid,
//       items: cart.map(item => ({
//         product_id: item.id,
//         quantity: item.quantity,
//         price: item.price,
//         size: item.selectedSize || 'M',
//         color: item.selectedColor || 'Default'
//       }))
//     };

//     await API.post('orders/', orderData, {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     alert('Order Placed Successfully!');
//     if (typeof clearCart === 'function') clearCart();
//     navigate('/my-orders');
//   };

//   const handleRazorpayPayment = async () => {
//     const token = localStorage.getItem('access_token');
    
//     const res = await API.post('create-razorpay-order/', 
//       { amount: totalPrice },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
    
//     const { order_id, amount, currency, key } = res.data;

//     const options = {
//       key: key,
//       amount: amount,
//       currency: currency,
//       name: "Clothing Store",
//       description: "Purchase Payment",
//       order_id: order_id,
//       handler: async function (response) {
//         try {
//           await saveOrderToDatabase(true, 'Razorpay');
//         } catch (err) {
//           alert('Payment succeeded but order saving failed. Contact support.');
//         }
//       },
//       prefill: {
//         name: shippingAddress.full_name,
//         email: shippingAddress.email,
//         contact: shippingAddress.phone,
//       },
//       theme: { color: "#000000" }
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();
    
//     if (cart.length === 0) {
//       alert('Your cart is empty.');
//       navigate('/shop');
//       return;
//     }

//     const token = localStorage.getItem('access_token');
//     if (!token) {
//       alert('Session expired. Please log in again.');
//       navigate('/login');
//       return;
//     }

//     setLoading(true);

//     try {
//       if (paymentMethod === 'Razorpay') {
//         await handleRazorpayPayment();
//       } else {
//         await saveOrderToDatabase(false, 'COD');
//       }
//     } catch (error) {
//       console.error('Order Error:', error.response?.data || error);
//       const detail = error.response?.data ? JSON.stringify(error.response.data) : error.message;
//       alert('Order Error: ' + detail);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (cart.length === 0 && !loading) {
//     return (
//       <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-center p-4 sm:p-6">
//         <div>
//           <h2 className="text-xl sm:text-2xl font-serif mb-4">Your Bag is Empty</h2>
//           <button 
//             onClick={() => navigate('/shop')} 
//             className="bg-neutral-900 text-white px-6 py-3 text-[10px] sm:text-xs uppercase font-bold tracking-widest hover:bg-black transition"
//           >
//             Explore Collection
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-8 sm:py-12 md:py-16 selection:bg-neutral-900 selection:text-white">
//       <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        
//         {/* Header */}
//         <div className="mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-neutral-200">
//           <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block mb-1">
//             Finalize Purchase
//           </span>
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight">Checkout</h1>
//         </div>

//         <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
//           {/* Shipping Form & Payment Selection */}
//           <div className="lg:col-span-7 bg-white border border-neutral-200/80 p-5 sm:p-8 shadow-sm">
//             <h2 className="font-serif text-lg sm:text-xl text-neutral-900 mb-4 sm:mb-6 pb-3 border-b border-neutral-100 flex items-center gap-2">
//               <Lock size={18} className="text-neutral-500 shrink-0" /> Shipping Details
//             </h2>

//             <div className="space-y-4 sm:space-y-5">
//               <div>
//                 <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="full_name"
//                   required
//                   value={shippingAddress.full_name}
//                   onChange={handleInputChange}
//                   placeholder="e.g. Maharshi Patel"
//                   className="w-full bg-neutral-50 border border-neutral-200 p-3 sm:p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition"
//                 />
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     required
//                     value={shippingAddress.email}
//                     onChange={handleInputChange}
//                     placeholder="maharshi@example.com"
//                     className="w-full bg-neutral-50 border border-neutral-200 p-3 sm:p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     required
//                     value={shippingAddress.phone}
//                     onChange={handleInputChange}
//                     placeholder="+91 98765 43210"
//                     className="w-full bg-neutral-50 border border-neutral-200 p-3 sm:p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
//                   Delivery Address
//                 </label>
//                 <textarea
//                   name="address"
//                   rows="3"
//                   required
//                   value={shippingAddress.address}
//                   onChange={handleInputChange}
//                   placeholder="Street name, house/apartment number"
//                   className="w-full bg-neutral-50 border border-neutral-200 p-3 sm:p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition resize-none"
//                 ></textarea>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
//                     City
//                   </label>
//                   <input
//                     type="text"
//                     name="city"
//                     required
//                     value={shippingAddress.city}
//                     onChange={handleInputChange}
//                     placeholder="Ahmedabad"
//                     className="w-full bg-neutral-50 border border-neutral-200 p-3 sm:p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
//                     State
//                   </label>
//                   <input
//                     type="text"
//                     name="state"
//                     required
//                     value={shippingAddress.state}
//                     onChange={handleInputChange}
//                     placeholder="Gujarat"
//                     className="w-full bg-neutral-50 border border-neutral-200 p-3 sm:p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
//                     Pincode
//                   </label>
//                   <input
//                     type="text"
//                     name="pincode"
//                     required
//                     value={shippingAddress.pincode}
//                     onChange={handleInputChange}
//                     placeholder="380001"
//                     className="w-full bg-neutral-50 border border-neutral-200 p-3 sm:p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Payment Method Option */}
//             <h2 className="font-serif text-lg sm:text-xl text-neutral-900 mt-8 mb-4 pb-3 border-b border-neutral-100 flex items-center gap-2">
//               <CreditCard size={18} className="text-neutral-500 shrink-0" /> Payment Method
//             </h2>
//             <div className="space-y-3">
//               <label className={`flex items-center justify-between p-3.5 sm:p-4 border cursor-pointer transition ${paymentMethod === 'Razorpay' ? 'border-black bg-neutral-50' : 'border-neutral-200'}`}>
//                 <div className="flex items-center gap-3">
//                   <input 
//                     type="radio" 
//                     name="payment_method" 
//                     checked={paymentMethod === 'Razorpay'} 
//                     onChange={() => setPaymentMethod('Razorpay')} 
//                     className="accent-black shrink-0"
//                   />
//                   <span className="text-[11px] sm:text-xs uppercase tracking-wider font-bold">Online Payment (Razorpay)</span>
//                 </div>
//                 <span className="text-[9px] sm:text-[10px] bg-black text-white px-2 py-0.5 font-semibold uppercase shrink-0">Recommended</span>
//               </label>

//               <label className={`flex items-center gap-3 p-3.5 sm:p-4 border cursor-pointer transition ${paymentMethod === 'COD' ? 'border-black bg-neutral-50' : 'border-neutral-200'}`}>
//                 <input 
//                   type="radio" 
//                   name="payment_method" 
//                   checked={paymentMethod === 'COD'} 
//                   onChange={() => setPaymentMethod('COD')} 
//                   className="accent-black shrink-0"
//                 />
//                 <span className="text-[11px] sm:text-xs uppercase tracking-wider font-bold">Cash On Delivery (COD)</span>
//               </label>
//             </div>
//           </div>

//           {/* Order Summary & Payment Button */}
//           <div className="lg:col-span-5 bg-white border border-neutral-200/80 p-5 sm:p-8 shadow-sm lg:sticky lg:top-8">
//             <h2 className="font-serif text-lg sm:text-xl text-neutral-900 mb-4 sm:mb-6 pb-3 border-b border-neutral-200 tracking-tight">
//               Order Items ({cart.length})
//             </h2>

//             {/* Cart Preview List */}
//             <div className="space-y-3 sm:space-y-4 max-h-56 sm:max-h-64 overflow-y-auto pr-1 sm:pr-2 mb-4 sm:mb-6 border-b border-neutral-100 pb-4">
//               {cart.map((item) => (
//                 <div key={item.cartId} className="flex gap-3 sm:gap-4 items-center">
//                   <img
//                     src={getImageUrl(item.image)}
//                     alt={item.name}
//                     className="w-12 h-16 sm:w-14 sm:h-18 object-cover bg-neutral-100 shrink-0"
//                   />
//                   <div className="flex-1 text-xs min-w-0">
//                     <h4 className="font-serif font-medium text-neutral-900 truncate">{item.name}</h4>
//                     <p className="text-[10px] text-neutral-500 mt-0.5">Qty: {item.quantity} | Size: {item.selectedSize || 'M'}</p>
//                   </div>
//                   <span className="font-serif text-xs font-semibold shrink-0">
//                     ₹{Number(item.price * item.quantity).toLocaleString()}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             {/* Pricing Breakdown */}
//             <div className="space-y-2.5 sm:space-y-3 text-xs border-b border-neutral-200 pb-4 mb-6">
//               <div className="flex justify-between text-neutral-600">
//                 <span>Subtotal</span>
//                 <span className="font-serif font-medium text-neutral-900">₹{Number(totalPrice).toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between text-neutral-600">
//                 <span>Shipping</span>
//                 <span className="text-emerald-700 font-semibold uppercase text-[10px]">Free</span>
//               </div>
//               <div className="flex justify-between items-baseline pt-2 text-sm">
//                 <span className="font-serif font-semibold">Total Payable</span>
//                 <span className="font-serif text-lg sm:text-xl font-bold text-neutral-900">₹{Number(totalPrice).toLocaleString()}</span>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-neutral-900 text-white py-3.5 sm:py-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-black transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
//             >
//               <CreditCard size={15} />
//               {loading ? 'Processing Order...' : paymentMethod === 'Razorpay' ? 'Pay & Place Order' : 'Place COD Order'}
//               <ArrowRight size={14} />
//             </button>

//             <div className="mt-5 sm:mt-6 flex items-center justify-center gap-2 text-neutral-500 text-[10px] sm:text-[11px]">
//               <ShieldCheck size={16} className="shrink-0" /> 256-Bit Encrypted Secure Payment
//             </div>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }









// import React, { useState } from 'react';
// import { useCart } from '../context/CartContext';
// import { useNavigate } from 'react-router-dom';
// import {
//   ShieldCheck,
//   ArrowRight,
//   Lock,
//   CreditCard
// } from 'lucide-react';
// import API from '../services/api';

// export default function Checkout() {
//   const { cart, totalPrice, clearCart } = useCart();
//   const navigate = useNavigate();

//   const [shippingAddress, setShippingAddress] = useState({
//     full_name: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: ''
//   });

//   const [paymentMethod, setPaymentMethod] = useState('COD');
//   const [loading, setLoading] = useState(false);

//   // ============================================================
//   // INPUT CHANGE
//   // ============================================================

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setShippingAddress((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // ============================================================
//   // IMAGE URL
//   // ============================================================

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) {
//       return 'https://placehold.co/400x500?text=Garment';
//     }

//     if (
//       imagePath.startsWith('http://') ||
//       imagePath.startsWith('https://')
//     ) {
//       return imagePath;
//     }

//     const baseURL =
//       API?.defaults?.baseURL ||
//       'https://clothing-backend-gynt.onrender.com/api/';

//     const cleanBaseURL = baseURL.replace(/\/api\/?$/, '');

//     return `${cleanBaseURL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
//   };

//   // ============================================================
//   // SAVE ORDER TO DATABASE
//   // ============================================================

//   const saveOrderToDatabase = async (
//     isPaid = false,
//     paymentRef = 'COD'
//   ) => {
//     const token = localStorage.getItem('access_token');

//     if (!token) {
//       throw new Error('Authentication token not found. Please login again.');
//     }

//     const orderData = {
//       full_name: shippingAddress.full_name,
//       email: shippingAddress.email,
//       phone: shippingAddress.phone,
//       shipping_address:
//         `${shippingAddress.address}, ` +
//         `${shippingAddress.city}, ` +
//         `${shippingAddress.state} - ` +
//         `${shippingAddress.pincode}`,
//       city: shippingAddress.city,
//       pincode: shippingAddress.pincode,
//       total_price: Number(totalPrice),
//       payment_method: paymentRef,
//       is_paid: isPaid,
//       items: cart.map((item) => ({
//         product_id: item.id || item.product,
//         quantity: item.quantity,
//         price: Number(item.price),
//         size: item.selectedSize || 'M',
//         color: item.selectedColor || 'Default'
//       }))
//     };

//     const response = await API.post(
//       'orders/',
//       orderData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );

//     alert('Order Placed Successfully!');

//     if (typeof clearCart === 'function') {
//       clearCart();
//     }

//     navigate('/my-orders');
//   };

//   // ============================================================
//   // PLACE ORDER HANDLER
//   // ============================================================

//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();

//     // Basic shipping validation
//     const requiredFields = [
//       'full_name',
//       'email',
//       'phone',
//       'address',
//       'city',
//       'state',
//       'pincode'
//     ];

//     const missingField = requiredFields.find(
//       (field) => !shippingAddress[field]?.trim()
//     );

//     if (missingField) {
//       alert('Please fill all shipping details.');
//       return;
//     }

//     setLoading(true);

//     try {
//       if (paymentMethod === 'Razorpay') {
//         // Fallback to COD or standard save if razorpay is bypassed
//         await saveOrderToDatabase(true, 'Razorpay');
//       } else {
//         await saveOrderToDatabase(false, 'COD');
//       }
//     } catch (error) {
//       console.error('Order Error:', error);
//       const errorMessage =
//         error?.message ||
//         error?.response?.data?.error ||
//         error?.response?.data?.detail ||
//         'Something went wrong while placing the order.';

//       alert(`Order Error: ${errorMessage}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================================================
//   // EMPTY CART
//   // ============================================================

//   if (cart.length === 0 && !loading) {
//     return (
//       <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-center p-4 sm:p-6">
//         <div>
//           <h2 className="text-xl sm:text-2xl font-serif mb-4">
//             Your Bag is Empty
//           </h2>
//           <button
//             onClick={() => navigate('/shop')}
//             className="bg-neutral-900 text-white px-6 py-3 text-[10px] sm:text-xs uppercase font-bold tracking-widest hover:bg-black transition"
//           >
//             Explore Collection
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ============================================================
//   // UI
//   // ============================================================

//   return (
//     <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-8 sm:py-12 md:py-16">
//       <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        
//         {/* Header */}
//         <div className="mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-neutral-200">
//           <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block mb-1">
//             Finalize Purchase
//           </span>
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight">
//             Checkout
//           </h1>
//         </div>

//         <form
//           onSubmit={handlePlaceOrder}
//           className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
//         >
//           {/* SHIPPING DETAILS */}
//           <div className="lg:col-span-7 bg-white border border-neutral-200/80 p-5 sm:p-8 shadow-sm">
//             <h2 className="font-serif text-lg sm:text-xl text-neutral-900 mb-4 sm:mb-6 pb-3 border-b border-neutral-100 flex items-center gap-2">
//               <Lock size={18} className="text-neutral-500" />
//               Shipping Details
//             </h2>

//             <div className="space-y-4 sm:space-y-5">
//               <div>
//                 <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="full_name"
//                   required
//                   value={shippingAddress.full_name}
//                   onChange={handleInputChange}
//                   placeholder="Enter your full name"
//                   className="w-full bg-neutral-50 border border-neutral-200 p-3 sm:p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition"
//                 />
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     required
//                     value={shippingAddress.email}
//                     onChange={handleInputChange}
//                     placeholder="example@gmail.com"
//                     className="w-full bg-neutral-50 border border-neutral-200 p-3 sm:p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     required
//                     value={shippingAddress.phone}
//                     onChange={handleInputChange}
//                     placeholder="+91 98765 43210"
//                     className="w-full bg-neutral-50 border border-neutral-200 p-3 sm:p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
//                   Delivery Address
//                 </label>
//                 <textarea
//                   name="address"
//                   rows="3"
//                   required
//                   value={shippingAddress.address}
//                   onChange={handleInputChange}
//                   placeholder="Street name, house/apartment number"
//                   className="w-full bg-neutral-50 border border-neutral-200 p-3 sm:p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition resize-none"
//                 />
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
//                     City
//                   </label>
//                   <input
//                     type="text"
//                     name="city"
//                     required
//                     value={shippingAddress.city}
//                     onChange={handleInputChange}
//                     placeholder="Ahmedabad"
//                     className="w-full bg-neutral-50 border border-neutral-200 p-3 sm:p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
//                     State
//                   </label>
//                   <input
//                     type="text"
//                     name="state"
//                     required
//                     value={shippingAddress.state}
//                     onChange={handleInputChange}
//                     placeholder="Gujarat"
//                     className="w-full bg-neutral-50 border border-neutral-200 p-3 sm:p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
//                     Pincode
//                   </label>
//                   <input
//                     type="text"
//                     name="pincode"
//                     required
//                     value={shippingAddress.pincode}
//                     onChange={handleInputChange}
//                     placeholder="380001"
//                     className="w-full bg-neutral-50 border border-neutral-200 p-3 sm:p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Payment Method */}
//             <h2 className="font-serif text-lg sm:text-xl text-neutral-900 mt-8 mb-4 pb-3 border-b border-neutral-100 flex items-center gap-2">
//               <CreditCard size={18} className="text-neutral-500" />
//               Payment Method
//             </h2>

//             <div className="space-y-3">
//               <label
//                 className={`flex items-center justify-between p-3.5 sm:p-4 border cursor-pointer transition ${
//                   paymentMethod === 'Razorpay'
//                     ? 'border-black bg-neutral-50'
//                     : 'border-neutral-200'
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <input
//                     type="radio"
//                     name="payment_method"
//                     checked={paymentMethod === 'Razorpay'}
//                     onChange={() => setPaymentMethod('Razorpay')}
//                     className="accent-black"
//                   />
//                   <span className="text-[11px] sm:text-xs uppercase tracking-wider font-bold">
//                     Online Payment (Razorpay)
//                   </span>
//                 </div>
//                 <span className="text-[9px] sm:text-[10px] bg-black text-white px-2 py-0.5 font-semibold uppercase">
//                   Recommended
//                 </span>
//               </label>

//               <label
//                 className={`flex items-center gap-3 p-3.5 sm:p-4 border cursor-pointer transition ${
//                   paymentMethod === 'COD'
//                     ? 'border-black bg-neutral-50'
//                     : 'border-neutral-200'
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="payment_method"
//                   checked={paymentMethod === 'COD'}
//                   onChange={() => setPaymentMethod('COD')}
//                   className="accent-black"
//                 />
//                 <span className="text-[11px] sm:text-xs uppercase tracking-wider font-bold">
//                   Cash On Delivery (COD)
//                 </span>
//               </label>
//             </div>
//           </div>

//           {/* ORDER SUMMARY */}
//           <div className="lg:col-span-5 bg-white border border-neutral-200/80 p-5 sm:p-8 shadow-sm lg:sticky lg:top-8">
//             <h2 className="font-serif text-lg sm:text-xl text-neutral-900 mb-4 sm:mb-6 pb-3 border-b border-neutral-200">
//               Order Items ({cart.length})
//             </h2>

//             <div className="space-y-3 sm:space-y-4 max-h-56 sm:max-h-64 overflow-y-auto pr-1 sm:pr-2 mb-4 sm:mb-6 border-b border-neutral-100 pb-4">
//               {cart.map((item) => (
//                 <div
//                   key={item.cartId || item.id}
//                   className="flex gap-3 sm:gap-4 items-center"
//                 >
//                   <img
//                     src={getImageUrl(item.image)}
//                     alt={item.name}
//                     className="w-12 h-16 sm:w-14 sm:h-18 object-cover bg-neutral-100 shrink-0"
//                     onError={(e) => {
//                       e.currentTarget.src =
//                         'https://placehold.co/400x500?text=Garment';
//                     }}
//                   />
//                   <div className="flex-1 text-xs min-w-0">
//                     <h4 className="font-serif font-medium text-neutral-900 truncate">
//                       {item.name}
//                     </h4>
//                     <p className="text-[10px] text-neutral-500 mt-0.5">
//                       Qty: {item.quantity} | Size: {item.selectedSize || 'M'}
//                     </p>
//                   </div>
//                   <span className="font-serif text-xs font-semibold shrink-0">
//                     ₹{Number(item.price * item.quantity).toLocaleString()}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             <div className="space-y-2.5 sm:space-y-3 text-xs border-b border-neutral-200 pb-4 mb-6">
//               <div className="flex justify-between text-neutral-600">
//                 <span>Subtotal</span>
//                 <span className="font-serif font-medium text-neutral-900">
//                   ₹{Number(totalPrice).toLocaleString()}
//                 </span>
//               </div>
//               <div className="flex justify-between text-neutral-600">
//                 <span>Shipping</span>
//                 <span className="text-emerald-700 font-semibold uppercase text-[10px]">
//                   Free
//                 </span>
//               </div>
//               <div className="flex justify-between items-baseline pt-2 text-sm">
//                 <span className="font-serif font-semibold">Total Payable</span>
//                 <span className="font-serif text-lg sm:text-xl font-bold text-neutral-900">
//                   ₹{Number(totalPrice).toLocaleString()}
//                 </span>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-neutral-900 text-white py-3.5 sm:py-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-black transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <CreditCard size={15} />
//               {loading ? 'Processing Order...' : 'Place Order'}
//               <ArrowRight size={14} />
//             </button>

//             <div className="mt-5 sm:mt-6 flex items-center justify-center gap-2 text-neutral-500 text-[10px] sm:text-[11px]">
//               <ShieldCheck size={16} />
//               256-Bit Encrypted Secure Payment
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }






// import React, { useMemo, useState } from 'react';
// import { useCart } from '../context/CartContext';
// import { useNavigate } from 'react-router-dom';
// import {
//   ShieldCheck,
//   ArrowRight,
//   Lock,
//   CreditCard,
//   Truck,
//   MapPin,
//   User,
//   Mail,
//   Phone,
//   CheckCircle2,
//   AlertCircle,
//   ChevronLeft,
//   ShoppingBag
// } from 'lucide-react';
// import API from '../services/api';

// const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || '';

// export default function Checkout() {
//   const { cart, totalPrice, clearCart } = useCart();
//   const navigate = useNavigate();

//   const [shippingAddress, setShippingAddress] = useState({
//     full_name: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: ''
//   });

//   const [paymentMethod, setPaymentMethod] = useState('COD');

//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   // ============================================================
//   // HELPERS
//   // ============================================================

//   const formatPrice = (value) => {
//     return Number(value || 0).toLocaleString('en-IN');
//   };

//   const getImageUrl = (item) => {
//     if (!item) {
//       return 'https://placehold.co/400x500?text=Garment';
//     }

//     let imagePath =
//       item.image ||
//       item.image_url ||
//       item.product_image ||
//       item.product?.image ||
//       (Array.isArray(item.images) && item.images[0]?.image) ||
//       (Array.isArray(item.images) && item.images[0]);

//     if (typeof imagePath === 'object' && imagePath !== null) {
//       imagePath =
//         imagePath.url ||
//         imagePath.file ||
//         imagePath.image ||
//         '';
//     }

//     if (!imagePath || typeof imagePath !== 'string') {
//       return 'https://placehold.co/400x500?text=Garment';
//     }

//     if (
//       imagePath.startsWith('http://') ||
//       imagePath.startsWith('https://')
//     ) {
//       return imagePath;
//     }

//     const baseURL =
//       API?.defaults?.baseURL ||
//       'https://clothing-backend-gynt.onrender.com/api/';

//     const cleanBaseURL = baseURL.replace(/\/api\/?$/, '');

//     return `${cleanBaseURL}${
//       imagePath.startsWith('/') ? '' : '/'
//     }${imagePath}`;
//   };

//   // ============================================================
//   // TOTALS
//   // ============================================================

//   const subtotal = useMemo(() => {
//     return Number(totalPrice || 0);
//   }, [totalPrice]);

//   // Free shipping
//   const shippingCharge = 0;

//   const grandTotal = subtotal + shippingCharge;

//   // ============================================================
//   // INPUT CHANGE
//   // ============================================================

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     let updatedValue = value;

//     // Phone - only numbers and +
//     if (name === 'phone') {
//       updatedValue = value.replace(/[^\d+]/g, '').slice(0, 13);
//     }

//     // Pincode - only 6 digits
//     if (name === 'pincode') {
//       updatedValue = value.replace(/\D/g, '').slice(0, 6);
//     }

//     setShippingAddress((prev) => ({
//       ...prev,
//       [name]: updatedValue
//     }));

//     setErrorMessage('');
//   };

//   // ============================================================
//   // VALIDATION
//   // ============================================================

//   const validateForm = () => {
//     const {
//       full_name,
//       email,
//       phone,
//       address,
//       city,
//       state,
//       pincode
//     } = shippingAddress;

//     if (!full_name.trim()) {
//       return 'Please enter your full name.';
//     }

//     if (!email.trim()) {
//       return 'Please enter your email address.';
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(email)) {
//       return 'Please enter a valid email address.';
//     }

//     const cleanPhone = phone.replace(/\D/g, '');

//     if (cleanPhone.length !== 10) {
//       return 'Please enter a valid 10-digit phone number.';
//     }

//     if (!address.trim()) {
//       return 'Please enter your complete delivery address.';
//     }

//     if (!city.trim()) {
//       return 'Please enter your city.';
//     }

//     if (!state.trim()) {
//       return 'Please enter your state.';
//     }

//     if (!/^\d{6}$/.test(pincode)) {
//       return 'Please enter a valid 6-digit pincode.';
//     }

//     if (!cart.length) {
//       return 'Your shopping bag is empty.';
//     }

//     return '';
//   };

//   // ============================================================
//   // BUILD ORDER DATA
//   // ============================================================

//   const buildOrderData = (paymentRef, isPaid = false) => {
//     return {
//       full_name: shippingAddress.full_name.trim(),
//       email: shippingAddress.email.trim(),
//       phone: shippingAddress.phone.replace(/\D/g, ''),

//       shipping_address:
//         `${shippingAddress.address.trim()}, ` +
//         `${shippingAddress.city.trim()}, ` +
//         `${shippingAddress.state.trim()} - ` +
//         `${shippingAddress.pincode.trim()}`,

//       city: shippingAddress.city.trim(),
//       pincode: shippingAddress.pincode.trim(),

//       total_price: Number(grandTotal),

//       payment_method: paymentRef,

//       is_paid: isPaid,

//       items: cart.map((item) => ({
//         product_id: item.id || item.product,
//         quantity: Number(item.quantity || 1),
//         price: Number(item.price || 0),
//         size: item.selectedSize || 'M',
//         color: item.selectedColor || 'Default'
//       }))
//     };
//   };

//   // ============================================================
//   // SAVE COD ORDER
//   // ============================================================

//   const saveCODOrder = async () => {
//     const token = localStorage.getItem('access_token');

//     if (!token) {
//       throw new Error('Please login before placing your order.');
//     }

//     const orderData = buildOrderData('COD', false);

//     const response = await API.post(
//       'orders/',
//       orderData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );

//     return response;
//   };

//   // ============================================================
//   // RAZORPAY SCRIPT
//   // ============================================================

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       if (window.Razorpay) {
//         resolve(true);
//         return;
//       }

//       const existingScript = document.querySelector(
//         'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
//       );

//       if (existingScript) {
//         existingScript.onload = () => resolve(true);
//         existingScript.onerror = () => resolve(false);
//         return;
//       }

//       const script = document.createElement('script');

//       script.src =
//         'https://checkout.razorpay.com/v1/checkout.js';

//       script.async = true;

//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);

//       document.body.appendChild(script);
//     });
//   };

//   // ============================================================
//   // RAZORPAY PAYMENT
//   // ============================================================

//   const handleRazorpayPayment = async () => {
//     if (!RAZORPAY_KEY_ID) {
//       throw new Error(
//         'Razorpay is not configured. Please add VITE_RAZORPAY_KEY_ID to your environment variables.'
//       );
//     }

//     const loaded = await loadRazorpayScript();

//     if (!loaded || !window.Razorpay) {
//       throw new Error(
//         'Unable to load Razorpay. Please check your internet connection and try again.'
//       );
//     }

//     /*
//       IMPORTANT:

//       Production flow should be:

//       1. Frontend calls backend
//          POST /orders/create-payment/

//       2. Backend creates Razorpay Order

//       3. Backend returns razorpay_order_id

//       4. Frontend opens Razorpay checkout

//       5. Razorpay returns payment_id / order_id / signature

//       6. Frontend sends these to backend

//       7. Backend verifies signature

//       8. Backend marks order as paid

//       The example below keeps the frontend integration-ready.
//     */

//     const token = localStorage.getItem('access_token');

//     if (!token) {
//       throw new Error('Please login before making payment.');
//     }

//     // Try backend Razorpay order creation.
//     let paymentOrder;

//     try {
//       const response = await API.post(
//         'payments/create-order/',
//         {
//           amount: Number(grandTotal),
//           currency: 'INR'
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       paymentOrder = response.data;
//     } catch (error) {
//       console.error(
//         'Razorpay order creation failed:',
//         error
//       );

//       throw new Error(
//         error?.response?.data?.detail ||
//         error?.response?.data?.error ||
//         'Unable to initialize online payment. Please try again.'
//       );
//     }

//     return new Promise((resolve, reject) => {
//       const options = {
//         key: RAZORPAY_KEY_ID,

//         amount:
//           paymentOrder.amount ||
//           Number(grandTotal) * 100,

//         currency:
//           paymentOrder.currency || 'INR',

//         name: 'CLOTHING',

//         description: 'Luxury Fashion Order',

//         order_id: paymentOrder.id,

//         prefill: {
//           name: shippingAddress.full_name,
//           email: shippingAddress.email,
//           contact: shippingAddress.phone
//         },

//         notes: {
//           city: shippingAddress.city,
//           pincode: shippingAddress.pincode
//         },

//         theme: {
//           color: '#171717'
//         },

//         handler: async function (paymentResponse) {
//           try {
//             /*
//               Verify payment on backend.
//             */

//             const verifyResponse = await API.post(
//               'payments/verify/',
//               {
//                 razorpay_order_id:
//                   paymentResponse.razorpay_order_id,

//                 razorpay_payment_id:
//                   paymentResponse.razorpay_payment_id,

//                 razorpay_signature:
//                   paymentResponse.razorpay_signature,

//                 shipping_address: shippingAddress,

//                 items: cart.map((item) => ({
//                   product_id:
//                     item.id || item.product,

//                   quantity:
//                     Number(item.quantity || 1),

//                   price:
//                     Number(item.price || 0),

//                   size:
//                     item.selectedSize || 'M',

//                   color:
//                     item.selectedColor || 'Default'
//                 })),

//                 total_price: Number(grandTotal)
//               },
//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`
//                 }
//               }
//             );

//             resolve(verifyResponse);
//           } catch (error) {
//             reject(
//               new Error(
//                 error?.response?.data?.detail ||
//                 error?.response?.data?.error ||
//                 'Payment verification failed.'
//               )
//             );
//           }
//         },

//         modal: {
//           ondismiss: function () {
//             reject(
//               new Error('Payment was cancelled.')
//             );
//           }
//         }
//       };

//       const razorpay = new window.Razorpay(options);

//       razorpay.on(
//         'payment.failed',
//         function (response) {
//           console.error(
//             'Razorpay payment failed:',
//             response
//           );

//           reject(
//             new Error(
//               response?.error?.description ||
//               'Payment failed. Please try again.'
//             )
//           );
//         }
//       );

//       razorpay.open();
//     });
//   };

//   // ============================================================
//   // PLACE ORDER
//   // ============================================================

//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();

//     if (loading) return;

//     setErrorMessage('');
//     setSuccessMessage('');

//     const validationError = validateForm();

//     if (validationError) {
//       setErrorMessage(validationError);
//       window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//       });
//       return;
//     }

//     const token = localStorage.getItem('access_token');

//     if (!token) {
//       setErrorMessage(
//         'Your session has expired. Please login again.'
//       );

//       setTimeout(() => {
//         navigate('/login');
//       }, 1200);

//       return;
//     }

//     setLoading(true);

//     try {
//       if (paymentMethod === 'Razorpay') {
//         await handleRazorpayPayment();

//         setSuccessMessage(
//           'Payment successful! Your order has been placed.'
//         );
//       } else {
//         await saveCODOrder();

//         setSuccessMessage(
//           'Your COD order has been placed successfully.'
//         );
//       }

//       if (typeof clearCart === 'function') {
//         clearCart();
//       }

//       setTimeout(() => {
//         navigate('/my-orders');
//       }, 1200);
//     } catch (error) {
//       console.error('Checkout Error:', error);

//       const message =
//         error?.response?.data?.detail ||
//         error?.response?.data?.error ||
//         error?.message ||
//         'Something went wrong while placing your order.';

//       setErrorMessage(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================================================
//   // EMPTY CART
//   // ============================================================

//   if (cart.length === 0 && !loading) {
//     return (
//       <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-center p-6">
//         <div className="max-w-sm">
//           <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-neutral-100 flex items-center justify-center">
//             <ShoppingBag
//               size={26}
//               className="text-neutral-500"
//               strokeWidth={1.5}
//             />
//           </div>

//           <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold">
//             Your Selection
//           </span>

//           <h2 className="text-2xl font-serif mt-2 mb-3">
//             Your Bag is Empty
//           </h2>

//           <p className="text-xs text-neutral-500 leading-relaxed mb-7">
//             Discover our curated collection and find something
//             beautiful for your wardrobe.
//           </p>

//           <button
//             onClick={() => navigate('/shop')}
//             className="bg-neutral-900 text-white px-7 py-3.5 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-black transition flex items-center gap-2 mx-auto"
//           >
//             Explore Collection
//             <ArrowRight size={14} />
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ============================================================
//   // UI
//   // ============================================================

//   return (
//     <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-8 sm:py-12 md:py-16">
//       <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">

//         {/* HEADER */}
//         <div className="mb-6 sm:mb-10 pb-5 border-b border-neutral-200">

//           <button
//             type="button"
//             onClick={() => navigate('/cart')}
//             className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition mb-5"
//           >
//             <ChevronLeft size={14} />
//             Back to Bag
//           </button>

//           <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block mb-1">
//             Finalize Purchase
//           </span>

//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight">
//             Checkout
//           </h1>
//         </div>

//         {/* ERROR */}
//         {errorMessage && (
//           <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start gap-3">
//             <AlertCircle
//               size={17}
//               className="shrink-0 mt-0.5"
//             />

//             <p className="text-xs leading-relaxed">
//               {errorMessage}
//             </p>
//           </div>
//         )}

//         {/* SUCCESS */}
//         {successMessage && (
//           <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg flex items-start gap-3">
//             <CheckCircle2
//               size={17}
//               className="shrink-0 mt-0.5"
//             />

//             <p className="text-xs leading-relaxed">
//               {successMessage}
//             </p>
//           </div>
//         )}

//         <form
//           onSubmit={handlePlaceOrder}
//           className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
//         >

//           {/* ====================================================
//               SHIPPING DETAILS
//           ==================================================== */}

//           <div className="lg:col-span-7 bg-white border border-neutral-200/80 p-5 sm:p-8 shadow-sm">

//             <div className="flex items-start gap-3 mb-6 pb-4 border-b border-neutral-100">
//               <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center">
//                 <MapPin
//                   size={17}
//                   className="text-neutral-700"
//                 />
//               </div>

//               <div>
//                 <h2 className="font-serif text-lg sm:text-xl">
//                   Shipping Details
//                 </h2>

//                 <p className="text-[10px] text-neutral-400 mt-1 uppercase tracking-wider">
//                   Where should we deliver your order?
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-5">

//               {/* FULL NAME */}
//               <div>
//                 <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
//                   <User size={12} />
//                   Full Name
//                 </label>

//                 <input
//                   type="text"
//                   name="full_name"
//                   required
//                   autoComplete="name"
//                   value={shippingAddress.full_name}
//                   onChange={handleInputChange}
//                   placeholder="Enter your full name"
//                   className="checkout-input"
//                 />
//               </div>

//               {/* EMAIL + PHONE */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

//                 <div>
//                   <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
//                     <Mail size={12} />
//                     Email Address
//                   </label>

//                   <input
//                     type="email"
//                     name="email"
//                     required
//                     autoComplete="email"
//                     value={shippingAddress.email}
//                     onChange={handleInputChange}
//                     placeholder="example@gmail.com"
//                     className="checkout-input"
//                   />
//                 </div>

//                 <div>
//                   <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
//                     <Phone size={12} />
//                     Phone Number
//                   </label>

//                   <input
//                     type="tel"
//                     name="phone"
//                     required
//                     autoComplete="tel"
//                     value={shippingAddress.phone}
//                     onChange={handleInputChange}
//                     placeholder="9876543210"
//                     maxLength={13}
//                     className="checkout-input"
//                   />

//                   <p className="text-[9px] text-neutral-400 mt-1">
//                     Enter your 10-digit mobile number
//                   </p>
//                 </div>

//               </div>

//               {/* ADDRESS */}
//               <div>
//                 <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
//                   <MapPin size={12} />
//                   Delivery Address
//                 </label>

//                 <textarea
//                   name="address"
//                   rows="3"
//                   required
//                   autoComplete="street-address"
//                   value={shippingAddress.address}
//                   onChange={handleInputChange}
//                   placeholder="House / Flat No., Street, Area"
//                   className="checkout-input resize-none"
//                 />
//               </div>

//               {/* CITY STATE PINCODE */}
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

//                 <div>
//                   <label className="checkout-label">
//                     City
//                   </label>

//                   <input
//                     type="text"
//                     name="city"
//                     required
//                     autoComplete="address-level2"
//                     value={shippingAddress.city}
//                     onChange={handleInputChange}
//                     placeholder="Ahmedabad"
//                     className="checkout-input"
//                   />
//                 </div>

//                 <div>
//                   <label className="checkout-label">
//                     State
//                   </label>

//                   <input
//                     type="text"
//                     name="state"
//                     required
//                     autoComplete="address-level1"
//                     value={shippingAddress.state}
//                     onChange={handleInputChange}
//                     placeholder="Gujarat"
//                     className="checkout-input"
//                   />
//                 </div>

//                 <div>
//                   <label className="checkout-label">
//                     Pincode
//                   </label>

//                   <input
//                     type="text"
//                     name="pincode"
//                     required
//                     inputMode="numeric"
//                     autoComplete="postal-code"
//                     value={shippingAddress.pincode}
//                     onChange={handleInputChange}
//                     placeholder="380001"
//                     maxLength={6}
//                     className="checkout-input"
//                   />
//                 </div>

//               </div>
//             </div>

//             {/* =================================================
//                 PAYMENT METHOD
//             ================================================= */}

//             <div className="mt-10">

//               <div className="flex items-start gap-3 mb-5 pb-4 border-b border-neutral-100">

//                 <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center">
//                   <CreditCard
//                     size={17}
//                     className="text-neutral-700"
//                   />
//                 </div>

//                 <div>
//                   <h2 className="font-serif text-lg sm:text-xl">
//                     Payment Method
//                   </h2>

//                   <p className="text-[10px] text-neutral-400 mt-1 uppercase tracking-wider">
//                     Select your preferred payment option
//                   </p>
//                 </div>

//               </div>

//               <div className="space-y-3">

//                 {/* RAZORPAY */}
//                 <label
//                   className={`block p-4 border cursor-pointer transition-all rounded-lg ${
//                     paymentMethod === 'Razorpay'
//                       ? 'border-neutral-900 bg-neutral-50 shadow-sm'
//                       : 'border-neutral-200 hover:border-neutral-400'
//                   }`}
//                 >

//                   <div className="flex items-center justify-between gap-3">

//                     <div className="flex items-center gap-3">

//                       <input
//                         type="radio"
//                         name="payment_method"
//                         checked={
//                           paymentMethod === 'Razorpay'
//                         }
//                         onChange={() =>
//                           setPaymentMethod('Razorpay')
//                         }
//                         className="accent-black"
//                       />

//                       <div>
//                         <p className="text-[11px] sm:text-xs uppercase tracking-wider font-bold">
//                           Online Payment
//                         </p>

//                         <p className="text-[10px] text-neutral-400 mt-1">
//                           UPI, Cards & Net Banking
//                         </p>
//                       </div>

//                     </div>

//                     <span className="text-[8px] sm:text-[9px] bg-neutral-900 text-white px-2 py-1 font-semibold uppercase tracking-wider">
//                       Recommended
//                     </span>

//                   </div>

//                 </label>

//                 {/* COD */}
//                 <label
//                   className={`block p-4 border cursor-pointer transition-all rounded-lg ${
//                     paymentMethod === 'COD'
//                       ? 'border-neutral-900 bg-neutral-50 shadow-sm'
//                       : 'border-neutral-200 hover:border-neutral-400'
//                   }`}
//                 >

//                   <div className="flex items-center gap-3">

//                     <input
//                       type="radio"
//                       name="payment_method"
//                       checked={
//                         paymentMethod === 'COD'
//                       }
//                       onChange={() =>
//                         setPaymentMethod('COD')
//                       }
//                       className="accent-black"
//                     />

//                     <div>
//                       <p className="text-[11px] sm:text-xs uppercase tracking-wider font-bold">
//                         Cash On Delivery
//                       </p>

//                       <p className="text-[10px] text-neutral-400 mt-1">
//                         Pay when your order arrives
//                       </p>
//                     </div>

//                   </div>

//                 </label>

//               </div>
//             </div>

//             {/* SECURITY */}
//             <div className="mt-8 pt-5 border-t border-neutral-100 flex items-start gap-3">

//               <ShieldCheck
//                 size={18}
//                 className="text-emerald-700 shrink-0"
//               />

//               <div>
//                 <p className="text-[10px] uppercase tracking-wider font-bold text-neutral-800">
//                   Secure Checkout
//                 </p>

//                 <p className="text-[10px] text-neutral-400 mt-1 leading-relaxed">
//                   Your personal information is protected and
//                   securely processed.
//                 </p>
//               </div>

//             </div>

//           </div>

//           {/* ====================================================
//               ORDER SUMMARY
//           ==================================================== */}

//           <div className="lg:col-span-5 bg-white border border-neutral-200/80 p-5 sm:p-8 shadow-sm lg:sticky lg:top-8">

//             <div className="flex items-center justify-between mb-5 pb-4 border-b border-neutral-200">

//               <div>
//                 <h2 className="font-serif text-lg sm:text-xl">
//                   Order Summary
//                 </h2>

//                 <p className="text-[9px] text-neutral-400 uppercase tracking-wider mt-1">
//                   {cart.length}{' '}
//                   {cart.length === 1
//                     ? 'Item'
//                     : 'Items'}
//                 </p>
//               </div>

//               <ShoppingBag
//                 size={19}
//                 className="text-neutral-500"
//               />

//             </div>

//             {/* ITEMS */}
//             <div className="space-y-4 max-h-72 overflow-y-auto pr-1 mb-6">

//               {cart.map((item) => (

//                 <div
//                   key={item.cartId || item.id}
//                   className="flex gap-3 sm:gap-4 items-center"
//                 >

//                   <div className="relative shrink-0">

//                     <img
//                       src={getImageUrl(item)}
//                       alt={item.name}
//                       className="w-14 h-18 sm:w-16 sm:h-20 object-cover bg-neutral-100 border border-neutral-100"
//                       onError={(e) => {
//                         e.currentTarget.onerror = null;

//                         e.currentTarget.src =
//                           'https://placehold.co/400x500?text=Garment';
//                       }}
//                     />

//                     <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[9px] font-bold">
//                       {item.quantity}
//                     </span>

//                   </div>

//                   <div className="flex-1 min-w-0">

//                     <h4 className="font-serif text-sm font-medium text-neutral-900 truncate">
//                       {item.name}
//                     </h4>

//                     <div className="flex flex-wrap gap-x-2 mt-1 text-[9px] text-neutral-500 uppercase tracking-wider">

//                       {item.selectedSize && (
//                         <span>
//                           Size: {item.selectedSize}
//                         </span>
//                       )}

//                       {item.selectedColor && (
//                         <span>
//                           Color: {item.selectedColor}
//                         </span>
//                       )}

//                     </div>

//                   </div>

//                   <span className="font-serif text-xs sm:text-sm font-semibold shrink-0">
//                     ₹
//                     {formatPrice(
//                       Number(item.price) *
//                         Number(item.quantity || 1)
//                     )}
//                   </span>

//                 </div>

//               ))}

//             </div>

//             {/* PRICE */}
//             <div className="space-y-3 border-t border-neutral-200 pt-5">

//               <div className="flex justify-between text-xs text-neutral-600">
//                 <span>Subtotal</span>

//                 <span className="font-serif text-neutral-900">
//                   ₹{formatPrice(subtotal)}
//                 </span>
//               </div>

//               <div className="flex justify-between text-xs text-neutral-600">
//                 <span>Shipping</span>

//                 <span className="text-emerald-700 font-semibold uppercase text-[9px] tracking-wider">
//                   Free
//                 </span>
//               </div>

//               <div className="flex justify-between text-xs text-neutral-600">
//                 <span>Taxes</span>

//                 <span className="text-neutral-400">
//                   Included
//                 </span>
//               </div>

//             </div>

//             {/* TOTAL */}
//             <div className="border-t border-neutral-200 mt-5 pt-5 flex justify-between items-baseline">

//               <div>
//                 <span className="font-serif text-sm sm:text-base font-semibold">
//                   Total Payable
//                 </span>

//                 <p className="text-[9px] text-neutral-400 mt-1 uppercase tracking-wider">
//                   Inclusive of taxes
//                 </p>
//               </div>

//               <span className="font-serif text-xl sm:text-2xl font-bold">
//                 ₹{formatPrice(grandTotal)}
//               </span>

//             </div>

//             {/* PLACE ORDER */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full mt-7 bg-neutral-900 text-white py-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] hover:bg-black transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
//             >

//               {loading ? (
//                 <>
//                   <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />

//                   {paymentMethod === 'Razorpay'
//                     ? 'Opening Payment...'
//                     : 'Placing Order...'}
//                 </>
//               ) : (
//                 <>
//                   {paymentMethod === 'Razorpay'
//                     ? 'Pay Securely'
//                     : 'Place COD Order'}

//                   <ArrowRight size={14} />
//                 </>
//               )}

//             </button>

//             {/* DELIVERY */}
//             <div className="mt-6 pt-5 border-t border-neutral-100 space-y-3">

//               <div className="flex items-center gap-3 text-neutral-600">

//                 <Truck
//                   size={16}
//                   className="text-neutral-800 shrink-0"
//                 />

//                 <span className="text-[10px] tracking-wide">
//                   Complimentary delivery on your order
//                 </span>

//               </div>

//               <div className="flex items-center gap-3 text-neutral-600">

//                 <ShieldCheck
//                   size={16}
//                   className="text-neutral-800 shrink-0"
//                 />

//                 <span className="text-[10px] tracking-wide">
//                   Authentic quality guaranteed
//                 </span>

//               </div>

//               <div className="flex items-center gap-3 text-neutral-600">

//                 <Lock
//                   size={16}
//                   className="text-neutral-800 shrink-0"
//                 />

//                 <span className="text-[10px] tracking-wide">
//                   Secure checkout & protected information
//                 </span>

//               </div>

//             </div>

//           </div>

//         </form>
//       </div>

//       {/* ========================================================
//           LOCAL STYLES
//       ======================================================== */}

//       <style>{`
//         .checkout-input {
//           width: 100%;
//           background: #fafafa;
//           border: 1px solid #e5e5e5;
//           padding: 0.8rem 0.9rem;
//           font-size: 0.75rem;
//           color: #171717;
//           outline: none;
//           transition: all 0.2s ease;
//           border-radius: 0.25rem;
//         }

//         .checkout-input::placeholder {
//           color: #a3a3a3;
//         }

//         .checkout-input:focus {
//           background: #fff;
//           border-color: #171717;
//           box-shadow: 0 0 0 1px rgba(23,23,23,0.05);
//         }

//         .checkout-label {
//           display: block;
//           font-size: 10px;
//           text-transform: uppercase;
//           letter-spacing: 0.12em;
//           color: #737373;
//           margin-bottom: 0.375rem;
//           font-weight: 600;
//         }

//         @media (max-width: 640px) {
//           .checkout-input {
//             padding: 0.75rem;
//             font-size: 0.72rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }












import React, { useMemo, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowRight,
  Lock,
  CreditCard,
  Truck,
  MapPin,
  User,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ShoppingBag
} from 'lucide-react';
import API from '../services/api';

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || '';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const formatPrice = (value) => {
    return Number(value || 0).toLocaleString('en-IN');
  };

  const getImageUrl = (item) => {
    if (!item) {
      return 'https://placehold.co/400x500?text=Garment';
    }

    let imagePath =
      item.image ||
      item.image_url ||
      item.product_image ||
      item.product?.image ||
      (Array.isArray(item.images) && item.images[0]?.image) ||
      (Array.isArray(item.images) && item.images[0]);

    if (typeof imagePath === 'object' && imagePath !== null) {
      imagePath =
        imagePath.url ||
        imagePath.file ||
        imagePath.image ||
        '';
    }

    if (!imagePath || typeof imagePath !== 'string') {
      return 'https://placehold.co/400x500?text=Garment';
    }

    if (
      imagePath.startsWith('http://') ||
      imagePath.startsWith('https://')
    ) {
      return imagePath;
    }

    const baseURL =
      API?.defaults?.baseURL ||
      'https://clothing-backend-gynt.onrender.com/api/';

    const cleanBaseURL = baseURL.replace(/\/api\/?$/, '');

    return `${cleanBaseURL}${
      imagePath.startsWith('/') ? '' : '/'
    }${imagePath}`;
  };

  const subtotal = useMemo(() => {
    return Number(totalPrice || 0);
  }, [totalPrice]);

  const shippingCharge = 0;
  const grandTotal = subtotal + shippingCharge;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === 'phone') {
      updatedValue = value.replace(/[^\d+]/g, '').slice(0, 13);
    }

    if (name === 'pincode') {
      updatedValue = value.replace(/\D/g, '').slice(0, 6);
    }

    setShippingAddress((prev) => ({
      ...prev,
      [name]: updatedValue
    }));

    setErrorMessage('');
  };

  const validateForm = () => {
    const {
      full_name,
      email,
      phone,
      address,
      city,
      state,
      pincode
    } = shippingAddress;

    if (!full_name.trim()) return 'Please enter your full name.';
    if (!email.trim()) return 'Please enter your email address.';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address.';

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) return 'Please enter a valid 10-digit phone number.';

    if (!address.trim()) return 'Please enter your complete delivery address.';
    if (!city.trim()) return 'Please enter your city.';
    if (!state.trim()) return 'Please enter your state.';
    if (!/^\d{6}$/.test(pincode)) return 'Please enter a valid 6-digit pincode.';
    if (!cart.length) return 'Your shopping bag is empty.';

    return '';
  };

  const buildOrderData = (paymentRef, isPaid = false) => {
    return {
      full_name: shippingAddress.full_name.trim(),
      email: shippingAddress.email.trim(),
      phone: shippingAddress.phone.replace(/\D/g, ''),
      shipping_address:
        `${shippingAddress.address.trim()}, ` +
        `${shippingAddress.city.trim()}, ` +
        `${shippingAddress.state.trim()} - ` +
        `${shippingAddress.pincode.trim()}`,
      city: shippingAddress.city.trim(),
      pincode: shippingAddress.pincode.trim(),
      total_price: Number(grandTotal),
      payment_method: paymentRef,
      is_paid: isPaid,
      items: cart.map((item) => ({
        product_id: item.id || item.product,
        quantity: Number(item.quantity || 1),
        price: Number(item.price || 0),
        size: item.selectedSize || 'M',
        color: item.selectedColor || 'Default'
      }))
    };
  };

  const saveCODOrder = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('Please login before placing your order.');

    const orderData = buildOrderData('COD', false);
    const response = await API.post('orders/', orderData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );

      if (existingScript) {
        existingScript.onload = () => resolve(true);
        existingScript.onerror = () => resolve(false);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    if (!RAZORPAY_KEY_ID) {
      throw new Error('Razorpay is not configured. Please add VITE_RAZORPAY_KEY_ID.');
    }

    const loaded = await loadRazorpayScript();
    if (!loaded || !window.Razorpay) {
      throw new Error('Unable to load Razorpay. Please check your internet connection.');
    }

    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('Please login before making payment.');

    let paymentOrder;
    try {
      const response = await API.post(
        'payments/create-order/',
        { amount: Number(grandTotal), currency: 'INR' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      paymentOrder = response.data;
    } catch (error) {
      throw new Error(
        error?.response?.data?.detail ||
        error?.response?.data?.error ||
        'Unable to initialize online payment.'
      );
    }

    return new Promise((resolve, reject) => {
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: paymentOrder.amount || Number(grandTotal) * 100,
        currency: paymentOrder.currency || 'INR',
        name: 'CLOTHING',
        description: 'Luxury Fashion Order',
        order_id: paymentOrder.id,
        prefill: {
          name: shippingAddress.full_name,
          email: shippingAddress.email,
          contact: shippingAddress.phone
        },
        notes: {
          city: shippingAddress.city,
          pincode: shippingAddress.pincode
        },
        theme: { color: '#171717' },
        handler: async function (paymentResponse) {
          try {
            const verifyResponse = await API.post(
              'payments/verify/',
              {
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                shipping_address: shippingAddress,
                items: cart.map((item) => ({
                  product_id: item.id || item.product,
                  quantity: Number(item.quantity || 1),
                  price: Number(item.price || 0),
                  size: item.selectedSize || 'M',
                  color: item.selectedColor || 'Default'
                })),
                total_price: Number(grandTotal)
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            resolve(verifyResponse);
          } catch (error) {
            reject(new Error('Payment verification failed.'));
          }
        },
        modal: {
          ondismiss: function () {
            reject(new Error('Payment was cancelled.'));
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response) {
        reject(new Error(response?.error?.description || 'Payment failed.'));
      });
      razorpay.open();
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (loading) return;

    setErrorMessage('');
    setSuccessMessage('');

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      setErrorMessage('Your session has expired. Please login again.');
      setTimeout(() => navigate('/login'), 1200);
      return;
    }

    setLoading(true);

    try {
      if (paymentMethod === 'Razorpay') {
        await handleRazorpayPayment();
        setSuccessMessage('Payment successful! Your order has been placed.');
      } else {
        await saveCODOrder();
        setSuccessMessage('Your COD order has been placed successfully.');
      }

      if (typeof clearCart === 'function') clearCart();

      setTimeout(() => {
        navigate('/my-orders');
      }, 1200);
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.detail ||
        error?.response?.data?.error ||
        error?.message ||
        'Something went wrong while placing your order.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-center p-6">
        <div className="max-w-sm">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-sm">
            <ShoppingBag size={26} className="text-neutral-400" strokeWidth={1.5} />
          </div>

          <h2 className="text-2xl font-serif mb-3">Your Bag is Empty</h2>
          <p className="text-xs text-neutral-500 leading-relaxed mb-7">
            Discover our curated collection and find something beautiful for your wardrobe.
          </p>

          <button
            onClick={() => navigate('/shop')}
            className="bg-neutral-900 text-white px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition rounded-xl flex items-center gap-2 mx-auto"
          >
            Explore Collection <ArrowRight size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-10 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 pb-6 border-b border-neutral-200">
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-900 transition mb-4 font-medium"
          >
            <ChevronLeft size={15} /> Back to Bag
          </button>

          <h1 className="text-3xl sm:text-4xl font-serif tracking-tight">
            Checkout
          </h1>
        </div>

        {errorMessage && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl flex items-start gap-3 text-xs">
            <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-600" />
            <p className="leading-relaxed">{errorMessage}</p>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-start gap-3 text-xs">
            <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-emerald-600" />
            <p className="leading-relaxed">{successMessage}</p>
          </div>
        )}

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >

          {/* SHIPPING DETAILS */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 p-6 sm:p-8 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100">
              <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center">
                <MapPin size={17} className="text-neutral-700" />
              </div>
              <div>
                <h2 className="font-serif text-lg sm:text-xl">Shipping Details</h2>
                <p className="text-xs text-neutral-400 mt-0.5">Where should we deliver your order?</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-neutral-600 mb-2 font-bold">
                  <User size={13} /> Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  required
                  autoComplete="name"
                  value={shippingAddress.full_name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="checkout-input"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-neutral-600 mb-2 font-bold">
                    <Mail size={13} /> Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    value={shippingAddress.email}
                    onChange={handleInputChange}
                    placeholder="example@gmail.com"
                    className="checkout-input"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-neutral-600 mb-2 font-bold">
                    <Phone size={13} /> Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    autoComplete="tel"
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    placeholder="9876543210"
                    maxLength={13}
                    className="checkout-input"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-neutral-600 mb-2 font-bold">
                  <MapPin size={13} /> Delivery Address
                </label>
                <textarea
                  name="address"
                  rows="3"
                  required
                  autoComplete="street-address"
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                  placeholder="House / Flat No., Street, Area"
                  className="checkout-input resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="checkout-label">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    autoComplete="address-level2"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    placeholder="Ahmedabad"
                    className="checkout-input"
                  />
                </div>

                <div>
                  <label className="checkout-label">State</label>
                  <input
                    type="text"
                    name="state"
                    required
                    autoComplete="address-level1"
                    value={shippingAddress.state}
                    onChange={handleInputChange}
                    placeholder="Gujarat"
                    className="checkout-input"
                  />
                </div>

                <div>
                  <label className="checkout-label">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    inputMode="numeric"
                    autoComplete="postal-code"
                    value={shippingAddress.pincode}
                    onChange={handleInputChange}
                    placeholder="380001"
                    maxLength={6}
                    className="checkout-input"
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-neutral-100">
                <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center">
                  <CreditCard size={17} className="text-neutral-700" />
                </div>
                <div>
                  <h2 className="font-serif text-lg sm:text-xl">Payment Method</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">Select your preferred payment option</p>
                </div>
              </div>

              <div className="space-y-3">
                <label
                  className={`block p-4 border cursor-pointer transition-all rounded-xl ${
                    paymentMethod === 'Razorpay'
                      ? 'border-neutral-900 bg-neutral-50 shadow-sm'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment_method"
                        checked={paymentMethod === 'Razorpay'}
                        onChange={() => setPaymentMethod('Razorpay')}
                        className="accent-black"
                      />
                      <div>
                        <p className="text-xs uppercase tracking-wider font-bold">Online Payment</p>
                        <p className="text-[10px] text-neutral-400 mt-0.5">UPI, Cards & Net Banking</p>
                      </div>
                    </div>
                    <span className="text-[9px] bg-neutral-900 text-white px-2 py-0.5 font-bold uppercase tracking-wider rounded">
                      Recommended
                    </span>
                  </div>
                </label>

                <label
                  className={`block p-4 border cursor-pointer transition-all rounded-xl ${
                    paymentMethod === 'COD'
                      ? 'border-neutral-900 bg-neutral-50 shadow-sm'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="accent-black"
                    />
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold">Cash On Delivery</p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">Pay when your order arrives</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:col-span-5 bg-white border border-neutral-200 p-6 sm:p-8 rounded-2xl shadow-sm lg:sticky lg:top-10">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-neutral-200">
              <div>
                <h2 className="font-serif text-lg sm:text-xl">Order Summary</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
                </p>
              </div>
              <ShoppingBag size={18} className="text-neutral-500" />
            </div>

            <div className="space-y-4 max-h-72 overflow-y-auto pr-1 mb-6">
              {cart.map((item) => (
                <div key={item.cartId || item.id} className="flex gap-4 items-center">
                  <div className="relative shrink-0">
                    <img
                      src={getImageUrl(item)}
                      alt={item.name}
                      className="w-14 h-18 object-cover bg-neutral-100 rounded-lg border border-neutral-200"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://placehold.co/400x500?text=Garment';
                      }}
                    />
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-medium text-neutral-900 truncate">
                      {item.name}
                    </h4>
                    <div className="flex flex-wrap gap-x-3 mt-1 text-[10px] text-neutral-500 uppercase tracking-wider">
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                    </div>
                  </div>

                  <span className="font-serif text-sm font-semibold shrink-0">
                    ₹{formatPrice(Number(item.price) * Number(item.quantity || 1))}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-neutral-200 pt-5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-serif text-neutral-900">₹{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-emerald-700 font-semibold uppercase text-[10px] tracking-wider">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span className="text-neutral-400">Included</span>
              </div>
            </div>

            <div className="border-t border-neutral-200 mt-5 pt-5 flex justify-between items-baseline">
              <div>
                <span className="font-serif text-base font-semibold">Total Payable</span>
                <p className="text-[10px] text-neutral-400 mt-0.5 uppercase tracking-wider">Inclusive of taxes</p>
              </div>
              <span className="font-serif text-2xl font-bold">₹{formatPrice(grandTotal)}</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-7 bg-neutral-900 text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {paymentMethod === 'Razorpay' ? 'Opening Payment...' : 'Placing Order...'}
                </>
              ) : (
                <>
                  {paymentMethod === 'Razorpay' ? 'Pay Securely' : 'Place COD Order'}
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      <style>{`
        .checkout-input {
          width: 100%;
          background: #fafafa;
          border: 1px solid #e5e5e5;
          padding: 0.85rem 1rem;
          font-size: 0.75rem;
          color: #171717;
          outline: none;
          transition: all 0.2s ease;
          border-radius: 0.75rem;
        }

        .checkout-input::placeholder {
          color: #a3a3a3;
        }

        .checkout-input:focus {
          background: #fff;
          border-color: #171717;
          box-shadow: 0 0 0 1px rgba(23,23,23,0.05);
        }

        .checkout-label {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #525252;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}