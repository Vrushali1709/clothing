import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Lock, CreditCard } from 'lucide-react';
import API from '../services/api';

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
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('Razorpay');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://placehold.co/400x500?text=Garment";
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
    return `http://127.0.0.1:8000${imagePath}`;
  };

  const saveOrderToDatabase = async (isPaid = false, paymentRef = 'COD') => {
    const token = localStorage.getItem('access_token');
    const orderData = {
      full_name: shippingAddress.full_name,
      email: shippingAddress.email,
      phone: shippingAddress.phone,
      shipping_address: `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.pincode}`,
      city: shippingAddress.city,
      pincode: shippingAddress.pincode,
      total_price: totalPrice,
      payment_method: paymentRef,
      is_paid: isPaid,
      items: cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
        size: item.selectedSize || 'M',
        color: item.selectedColor || 'Default'
      }))
    };

    await API.post('orders/', orderData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert('Order Placed Successfully!');
    if (typeof clearCart === 'function') clearCart();
    navigate('/my-orders');
  };

  const handleRazorpayPayment = async () => {
    const token = localStorage.getItem('access_token');
    
    const res = await API.post('create-razorpay-order/', 
      { amount: totalPrice },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    const { order_id, amount, currency, key } = res.data;

    const options = {
      key: key,
      amount: amount,
      currency: currency,
      name: "Clothing Store",
      description: "Purchase Payment",
      order_id: order_id,
      handler: async function (response) {
        try {
          await saveOrderToDatabase(true, 'Razorpay');
        } catch (err) {
          alert('Payment succeeded but order saving failed. Contact support.');
        }
      },
      prefill: {
        name: shippingAddress.full_name,
        email: shippingAddress.email,
        contact: shippingAddress.phone,
      },
      theme: { color: "#000000" }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      alert('Your cart is empty.');
      navigate('/shop');
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('Session expired. Please log in again.');
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      if (paymentMethod === 'Razorpay') {
        await handleRazorpayPayment();
      } else {
        await saveOrderToDatabase(false, 'COD');
      }
    } catch (error) {
      console.error('Order Error:', error.response?.data || error);
      const detail = error.response?.data ? JSON.stringify(error.response.data) : error.message;
      alert('Order Error: ' + detail);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-center p-4 sm:p-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif mb-4">Your Bag is Empty</h2>
          <button 
            onClick={() => navigate('/shop')} 
            className="bg-neutral-900 text-white px-6 py-3 text-[10px] sm:text-xs uppercase font-bold tracking-widest hover:bg-black transition"
          >
            Explore Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-8 sm:py-12 md:py-16 selection:bg-neutral-900 selection:text-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        
        {/* Header */}
        <div className="mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-neutral-200">
          <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block mb-1">
            Finalize Purchase
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight">Checkout</h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Shipping Form & Payment Selection */}
          <div className="lg:col-span-7 bg-white border border-neutral-200/80 p-5 sm:p-8 shadow-sm">
            <h2 className="font-serif text-lg sm:text-xl text-neutral-900 mb-4 sm:mb-6 pb-3 border-b border-neutral-100 flex items-center gap-2">
              <Lock size={18} className="text-neutral-500 shrink-0" /> Shipping Details
            </h2>

            <div className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  required
                  value={shippingAddress.full_name}
                  onChange={handleInputChange}
                  placeholder="e.g. Maharshi Patel"
                  className="w-full bg-neutral-50 border border-neutral-200 p-3 sm:p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={shippingAddress.email}
                    onChange={handleInputChange}
                    placeholder="maharshi@example.com"
                    className="w-full bg-neutral-50 border border-neutral-200 p-3 sm:p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-neutral-50 border border-neutral-200 p-3 sm:p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
                  Delivery Address
                </label>
                <textarea
                  name="address"
                  rows="3"
                  required
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                  placeholder="Street name, house/apartment number"
                  className="w-full bg-neutral-50 border border-neutral-200 p-3 sm:p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    placeholder="Ahmedabad"
                    className="w-full bg-neutral-50 border border-neutral-200 p-3 sm:p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={shippingAddress.state}
                    onChange={handleInputChange}
                    placeholder="Gujarat"
                    className="w-full bg-neutral-50 border border-neutral-200 p-3 sm:p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1.5 font-semibold">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={shippingAddress.pincode}
                    onChange={handleInputChange}
                    placeholder="380001"
                    className="w-full bg-neutral-50 border border-neutral-200 p-3 sm:p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Option */}
            <h2 className="font-serif text-lg sm:text-xl text-neutral-900 mt-8 mb-4 pb-3 border-b border-neutral-100 flex items-center gap-2">
              <CreditCard size={18} className="text-neutral-500 shrink-0" /> Payment Method
            </h2>
            <div className="space-y-3">
              <label className={`flex items-center justify-between p-3.5 sm:p-4 border cursor-pointer transition ${paymentMethod === 'Razorpay' ? 'border-black bg-neutral-50' : 'border-neutral-200'}`}>
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="payment_method" 
                    checked={paymentMethod === 'Razorpay'} 
                    onChange={() => setPaymentMethod('Razorpay')} 
                    className="accent-black shrink-0"
                  />
                  <span className="text-[11px] sm:text-xs uppercase tracking-wider font-bold">Online Payment (Razorpay)</span>
                </div>
                <span className="text-[9px] sm:text-[10px] bg-black text-white px-2 py-0.5 font-semibold uppercase shrink-0">Recommended</span>
              </label>

              <label className={`flex items-center gap-3 p-3.5 sm:p-4 border cursor-pointer transition ${paymentMethod === 'COD' ? 'border-black bg-neutral-50' : 'border-neutral-200'}`}>
                <input 
                  type="radio" 
                  name="payment_method" 
                  checked={paymentMethod === 'COD'} 
                  onChange={() => setPaymentMethod('COD')} 
                  className="accent-black shrink-0"
                />
                <span className="text-[11px] sm:text-xs uppercase tracking-wider font-bold">Cash On Delivery (COD)</span>
              </label>
            </div>
          </div>

          {/* Order Summary & Payment Button */}
          <div className="lg:col-span-5 bg-white border border-neutral-200/80 p-5 sm:p-8 shadow-sm lg:sticky lg:top-8">
            <h2 className="font-serif text-lg sm:text-xl text-neutral-900 mb-4 sm:mb-6 pb-3 border-b border-neutral-200 tracking-tight">
              Order Items ({cart.length})
            </h2>

            {/* Cart Preview List */}
            <div className="space-y-3 sm:space-y-4 max-h-56 sm:max-h-64 overflow-y-auto pr-1 sm:pr-2 mb-4 sm:mb-6 border-b border-neutral-100 pb-4">
              {cart.map((item) => (
                <div key={item.cartId} className="flex gap-3 sm:gap-4 items-center">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className="w-12 h-16 sm:w-14 sm:h-18 object-cover bg-neutral-100 shrink-0"
                  />
                  <div className="flex-1 text-xs min-w-0">
                    <h4 className="font-serif font-medium text-neutral-900 truncate">{item.name}</h4>
                    <p className="text-[10px] text-neutral-500 mt-0.5">Qty: {item.quantity} | Size: {item.selectedSize || 'M'}</p>
                  </div>
                  <span className="font-serif text-xs font-semibold shrink-0">
                    ₹{Number(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-2.5 sm:space-y-3 text-xs border-b border-neutral-200 pb-4 mb-6">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-serif font-medium text-neutral-900">₹{Number(totalPrice).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Shipping</span>
                <span className="text-emerald-700 font-semibold uppercase text-[10px]">Free</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 text-sm">
                <span className="font-serif font-semibold">Total Payable</span>
                <span className="font-serif text-lg sm:text-xl font-bold text-neutral-900">₹{Number(totalPrice).toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-neutral-900 text-white py-3.5 sm:py-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-black transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CreditCard size={15} />
              {loading ? 'Processing Order...' : paymentMethod === 'Razorpay' ? 'Pay & Place Order' : 'Place COD Order'}
              <ArrowRight size={14} />
            </button>

            <div className="mt-5 sm:mt-6 flex items-center justify-center gap-2 text-neutral-500 text-[10px] sm:text-[11px]">
              <ShieldCheck size={16} className="shrink-0" /> 256-Bit Encrypted Secure Payment
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}