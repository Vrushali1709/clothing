// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Package, Clock, CheckCircle2, Truck, ArrowRight, ShieldCheck } from 'lucide-react';
// import API from '../services/api';

// export default function MyOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return "https://placehold.co/400x500?text=Garment";
//     if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
//     return `https://clothing-backend-gynt.onrender.com${imagePath}`;
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('access_token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     API.get('orders/')
//       .then((res) => {
//         const data = Array.isArray(res.data) ? res.data : res.data.results || [];
//         setOrders(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error fetching orders:', err);
//         setLoading(false);
//       });
//   }, [navigate]);

//   const getStatusBadge = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'delivered':
//         return (
//           <span className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 sm:px-3 py-1 border border-emerald-200">
//             <CheckCircle2 size={12} className="shrink-0" /> Delivered
//           </span>
//         );
//       case 'shipped':
//         return (
//           <span className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 sm:px-3 py-1 border border-blue-200">
//             <Truck size={12} className="shrink-0" /> Shipped
//           </span>
//         );
//       case 'processing':
//         return (
//           <span className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 sm:px-3 py-1 border border-purple-200">
//             <Package size={12} className="shrink-0" /> Processing
//           </span>
//         );
//       default:
//         return (
//           <span className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 sm:px-3 py-1 border border-amber-200">
//             <Clock size={12} className="shrink-0" /> Pending
//           </span>
//         );
//     }
//   };

//   // Timeline Step Helper Index
//   const getStepIndex = (status) => {
//     const steps = ['Pending', 'Processing', 'Shipped', 'Delivered'];
//     const current = steps.findIndex(s => s.toLowerCase() === (status || 'pending').toLowerCase());
//     return current !== -1 ? current : 0;
//   };

//   if (loading) {
//     return (
//       <div className="bg-[#FAF8F5] min-h-screen flex justify-center items-center text-xs font-serif uppercase tracking-widest text-neutral-500 p-4">
//         Fetching Your Orders...
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="bg-[#FAF8F5] min-h-[75vh] flex flex-col justify-center items-center px-4 sm:px-6 py-12 sm:py-20 text-center text-neutral-900">
//         <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-5 sm:mb-6 text-neutral-400">
//           <Package size={28} strokeWidth={1.5} />
//         </div>
//         <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold mb-2 block">
//           Purchase History
//         </span>
//         <h2 className="text-2xl sm:text-3xl font-serif mb-3 tracking-tight">No Orders Placed Yet</h2>
//         <p className="text-xs font-light text-neutral-500 max-w-sm mb-6 sm:mb-8 leading-relaxed">
//           When you purchase garments from our collection, your order details will appear here.
//         </p>
//         <button
//           onClick={() => navigate('/shop')}
//           className="bg-neutral-900 text-white px-6 sm:px-8 py-3.5 sm:py-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] hover:bg-black transition-all shadow-md flex items-center gap-3 group"
//         >
//           Explore Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-8 sm:py-12 md:py-16 selection:bg-neutral-900 selection:text-white">
//       <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl">
        
//         {/* Header */}
//         <div className="mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-neutral-200 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-0">
//           <div>
//             <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block mb-1">
//               Account Overview
//             </span>
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight">My Orders</h1>
//           </div>
//           <span className="text-[11px] sm:text-xs uppercase tracking-widest text-neutral-500">
//             {orders.length} {orders.length === 1 ? 'Order' : 'Orders'} Total
//           </span>
//         </div>

//         {/* Order Cards */}
//         <div className="space-y-6 sm:space-y-8">
//           {orders.map((order) => {
//             const currentStepIdx = getStepIndex(order.status);
//             const steps = ['Pending', 'Processing', 'Shipped', 'Delivered'];

//             return (
//               <div key={order.id} className="bg-white border border-neutral-200/80 shadow-sm overflow-hidden rounded-xl">
                
//                 {/* Order Card Header */}
//                 <div className="bg-neutral-50 p-4 sm:p-6 border-b border-neutral-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
//                   <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-6 text-neutral-600 w-full sm:w-auto">
//                     <div>
//                       <span className="block text-[10px] uppercase tracking-wider text-neutral-400">Order Reference</span>
//                       <span className="font-mono font-medium text-neutral-900">#{order.id}</span>
//                     </div>
//                     <div>
//                       <span className="block text-[10px] uppercase tracking-wider text-neutral-400">Date Placed</span>
//                       <span className="text-neutral-900">
//                         {order.created_at ? new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recently'}
//                       </span>
//                     </div>
//                     <div className="col-span-2 sm:col-span-1">
//                       <span className="block text-[10px] uppercase tracking-wider text-neutral-400">Total Amount</span>
//                       <span className="font-serif font-bold text-neutral-900">
//                         ₹{Number(order.total_amount || order.total_price || 0).toLocaleString()}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="self-start sm:self-auto">
//                     {getStatusBadge(order.status)}
//                   </div>
//                 </div>

//                 {/* Items List */}
//                 <div className="p-4 sm:p-6 divide-y divide-neutral-100">
//                   {(order.items || []).map((item, index) => {
//                     const product = item.product_details || item.product || {};
//                     const productName = product.name || item.product_name || item.name || 'Garment Item';
//                     const productImage = product.image || item.product_image || item.image;

//                     return (
//                       <div key={index} className="py-3.5 sm:py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-3 sm:gap-4">
//                         <div className="flex items-center gap-3 sm:gap-4 min-w-0">
//                           <img
//                             src={getImageUrl(productImage)}
//                             alt={productName}
//                             className="w-14 h-18 sm:w-16 sm:h-20 object-cover bg-neutral-100 shrink-0 rounded-md"
//                             onError={(e) => { e.target.src = "https://placehold.co/400x500?text=Garment"; }}
//                           />
//                           <div className="min-w-0">
//                             <h4 className="font-serif text-xs sm:text-sm font-medium text-neutral-900 truncate">
//                               {productName}
//                             </h4>
//                             <div className="mt-1 space-y-0.5 text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-wider">
//                               {item.size && <p>Size: <span className="text-neutral-800">{item.size}</span></p>}
//                               <p>Quantity: <span className="text-neutral-800">{item.quantity}</span></p>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="text-right shrink-0">
//                           <span className="font-serif text-xs sm:text-sm font-semibold text-neutral-900">
//                             ₹{Number((item.price || product.price || 0) * (item.quantity || 1)).toLocaleString()}
//                           </span>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {/* ================= ORDER TRACKING TIMELINE ================= */}
//                 <div className="bg-[#FAF8F5]/60 p-5 sm:p-6 border-t border-neutral-200/60">
//                   <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-500 mb-5">
//                     Order Tracking Timeline
//                   </p>

//                   <div className="relative flex items-center justify-between max-w-2xl mx-auto px-2">
//                     {/* Background Progress Line */}
//                     <div className="absolute left-6 right-6 top-4 h-[2px] bg-neutral-200 -z-0" />

//                     {steps.map((step, idx) => {
//                       const isCompleted = idx <= currentStepIdx;
//                       const isCurrent = idx === currentStepIdx;

//                       return (
//                         <div key={step} className="flex flex-col items-center relative z-10">
//                           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
//                             isCompleted 
//                               ? 'bg-neutral-900 text-white ring-4 ring-neutral-900/10' 
//                               : 'bg-white text-neutral-400 border border-neutral-300'
//                           }`}>
//                             {idx + 1}
//                           </div>
//                           <span className={`text-[10px] uppercase tracking-wider mt-2.5 font-medium ${
//                             isCurrent ? 'text-neutral-900 font-bold underline underline-offset-4' : 
//                             isCompleted ? 'text-neutral-800 font-semibold' : 'text-neutral-400'
//                           }`}>
//                             {step}
//                           </span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>

//               </div>
//             );
//           })}
//         </div>

//       </div>
//     </div>
//   );
// }













// import React, { useEffect, useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Package,
//   Clock,
//   CheckCircle2,
//   Truck,
//   ArrowRight,
//   RefreshCw,
//   ShoppingBag,
//   ChevronDown,
//   ChevronUp,
//   MapPin,
//   CreditCard,
//   XCircle,
//   RotateCcw
// } from 'lucide-react';
// import API from '../services/api';

// export default function MyOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [expandedOrder, setExpandedOrder] = useState(null);

//   const navigate = useNavigate();

//   // ============================================================
//   // IMAGE HELPER
//   // ============================================================

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) {
//       return 'https://placehold.co/400x500?text=Garment';
//     }

//     if (typeof imagePath === 'object' && imagePath !== null) {
//       imagePath =
//         imagePath.url ||
//         imagePath.image ||
//         imagePath.file ||
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

//     const cleanPath = imagePath.startsWith('/')
//       ? imagePath
//       : `/${imagePath}`;

//     return `https://clothing-backend-gynt.onrender.com${cleanPath}`;
//   };

//   // ============================================================
//   // FETCH ORDERS
//   // ============================================================

//   const fetchOrders = useCallback(async (showRefresh = false) => {
//     try {
//       if (showRefresh) {
//         setRefreshing(true);
//       } else {
//         setLoading(true);
//       }

//       const token = localStorage.getItem('access_token');

//       if (!token) {
//         navigate('/login');
//         return;
//       }

//       const res = await API.get('orders/', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       const data = Array.isArray(res.data)
//         ? res.data
//         : res.data?.results || [];

//       setOrders(data);
//     } catch (err) {
//       console.error('Error fetching orders:', err);

//       if (err?.response?.status === 401) {
//         localStorage.removeItem('access_token');
//         navigate('/login');
//       }
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, [navigate]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   // ============================================================
//   // STATUS
//   // ============================================================

//   const normalizeStatus = (status) => {
//     const value = String(status || 'pending').toLowerCase();

//     if (value.includes('cancel')) return 'cancelled';
//     if (value.includes('return')) return 'returned';
//     if (value.includes('deliver')) return 'delivered';
//     if (value.includes('ship')) return 'shipped';
//     if (value.includes('process')) return 'processing';

//     return 'pending';
//   };

//   const getStatusBadge = (status) => {
//     const normalized = normalizeStatus(status);

//     switch (normalized) {
//       case 'delivered':
//         return (
//           <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 sm:px-3 py-1.5 border border-emerald-200 rounded-full">
//             <CheckCircle2 size={12} />
//             Delivered
//           </span>
//         );

//       case 'shipped':
//         return (
//           <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 sm:px-3 py-1.5 border border-blue-200 rounded-full">
//             <Truck size={12} />
//             Shipped
//           </span>
//         );

//       case 'processing':
//         return (
//           <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 sm:px-3 py-1.5 border border-purple-200 rounded-full">
//             <Package size={12} />
//             Processing
//           </span>
//         );

//       case 'cancelled':
//         return (
//           <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2.5 sm:px-3 py-1.5 border border-red-200 rounded-full">
//             <XCircle size={12} />
//             Cancelled
//           </span>
//         );

//       case 'returned':
//         return (
//           <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-50 px-2.5 sm:px-3 py-1.5 border border-orange-200 rounded-full">
//             <RotateCcw size={12} />
//             Returned
//           </span>
//         );

//       default:
//         return (
//           <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 sm:px-3 py-1.5 border border-amber-200 rounded-full">
//             <Clock size={12} />
//             Pending
//           </span>
//         );
//     }
//   };

//   // ============================================================
//   // TIMELINE
//   // ============================================================

//   const getStepIndex = (status) => {
//     const normalized = normalizeStatus(status);

//     const steps = [
//       'pending',
//       'processing',
//       'shipped',
//       'delivered'
//     ];

//     const index = steps.indexOf(normalized);

//     return index === -1 ? 0 : index;
//   };

//   // ============================================================
//   // TOGGLE ORDER DETAILS
//   // ============================================================

//   const toggleOrder = (orderId) => {
//     setExpandedOrder((prev) =>
//       prev === orderId ? null : orderId
//     );
//   };

//   // ============================================================
//   // CANCEL ORDER
//   // ============================================================

//   const handleCancelOrder = async (order) => {
//     const normalized = normalizeStatus(order.status);

//     if (
//       normalized !== 'pending' &&
//       normalized !== 'processing'
//     ) {
//       alert('This order can no longer be cancelled.');
//       return;
//     }

//     const confirmed = window.confirm(
//       `Are you sure you want to cancel Order #${order.id}?`
//     );

//     if (!confirmed) return;

//     try {
//       await API.patch(`orders/${order.id}/`, {
//         status: 'Cancelled'
//       });

//       alert('Order cancelled successfully.');

//       fetchOrders(true);
//     } catch (err) {
//       console.error('Cancel order error:', err);

//       alert(
//         err?.response?.data?.detail ||
//         err?.response?.data?.error ||
//         'Unable to cancel this order.'
//       );
//     }
//   };

//   // ============================================================
//   // RETURN ORDER
//   // ============================================================

//   const handleReturnOrder = async (order) => {
//     if (normalizeStatus(order.status) !== 'delivered') {
//       alert('Only delivered orders can be returned.');
//       return;
//     }

//     const confirmed = window.confirm(
//       `Request return for Order #${order.id}?`
//     );

//     if (!confirmed) return;

//     try {
//       await API.patch(`orders/${order.id}/`, {
//         status: 'Return Requested'
//       });

//       alert('Return request submitted successfully.');

//       fetchOrders(true);
//     } catch (err) {
//       console.error('Return order error:', err);

//       alert(
//         err?.response?.data?.detail ||
//         err?.response?.data?.error ||
//         'Unable to submit return request.'
//       );
//     }
//   };

//   // ============================================================
//   // LOADING
//   // ============================================================

//   if (loading) {
//     return (
//       <div className="bg-[#FAF8F5] min-h-screen flex justify-center items-center">
//         <div className="text-center">
//           <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />

//           <p className="text-[10px] font-serif uppercase tracking-[0.3em] text-neutral-500">
//             Fetching Your Orders...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // ============================================================
//   // EMPTY
//   // ============================================================

//   if (orders.length === 0) {
//     return (
//       <div className="bg-[#FAF8F5] min-h-[75vh] flex flex-col justify-center items-center px-4 text-center text-neutral-900">

//         <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-6 text-neutral-400">
//           <ShoppingBag size={28} strokeWidth={1.5} />
//         </div>

//         <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold mb-2">
//           Purchase History
//         </span>

//         <h2 className="text-2xl sm:text-3xl font-serif mb-3">
//           No Orders Placed Yet
//         </h2>

//         <p className="text-xs font-light text-neutral-500 max-w-sm mb-8 leading-relaxed">
//           When you purchase garments from our collection,
//           your order details will appear here.
//         </p>

//         <button
//           onClick={() => navigate('/shop')}
//           className="bg-neutral-900 text-white px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.25em] hover:bg-black transition flex items-center gap-3"
//         >
//           Explore Collection
//           <ArrowRight size={14} />
//         </button>
//       </div>
//     );
//   }

//   // ============================================================
//   // MAIN UI
//   // ============================================================

//   return (
//     <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-8 sm:py-12 md:py-16">

//       <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl">

//         {/* HEADER */}

//         <div className="mb-8 sm:mb-10 pb-5 border-b border-neutral-200 flex flex-col sm:flex-row justify-between sm:items-end gap-4">

//           <div>
//             <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block mb-1">
//               Account Overview
//             </span>

//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif">
//               My Orders
//             </h1>
//           </div>

//           <div className="flex items-center gap-4">

//             <span className="text-[11px] uppercase tracking-widest text-neutral-500">
//               {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
//             </span>

//             <button
//               onClick={() => fetchOrders(true)}
//               disabled={refreshing}
//               className="p-2.5 border border-neutral-200 bg-white hover:border-neutral-900 transition"
//               title="Refresh orders"
//             >
//               <RefreshCw
//                 size={15}
//                 className={refreshing ? 'animate-spin' : ''}
//               />
//             </button>

//           </div>
//         </div>

//         {/* ORDERS */}

//         <div className="space-y-6">

//           {orders.map((order) => {

//             const normalizedStatus = normalizeStatus(order.status);
//             const currentStepIdx = getStepIndex(order.status);

//             const steps = [
//               'Pending',
//               'Processing',
//               'Shipped',
//               'Delivered'
//             ];

//             const isExpanded = expandedOrder === order.id;

//             const total =
//               Number(
//                 order.total_amount ??
//                 order.total_price ??
//                 0
//               );

//             return (
//               <div
//                 key={order.id}
//                 className="bg-white border border-neutral-200/80 shadow-sm overflow-hidden rounded-2xl"
//               >

//                 {/* ORDER HEADER */}

//                 <div className="bg-neutral-50 p-4 sm:p-6 border-b border-neutral-200/60">

//                   <div className="flex flex-col sm:flex-row justify-between gap-4">

//                     <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-5 sm:gap-8">

//                       <div>
//                         <span className="block text-[9px] uppercase tracking-wider text-neutral-400 mb-1">
//                           Order Reference
//                         </span>

//                         <span className="font-mono text-xs font-semibold">
//                           #{order.id}
//                         </span>
//                       </div>

//                       <div>
//                         <span className="block text-[9px] uppercase tracking-wider text-neutral-400 mb-1">
//                           Date Placed
//                         </span>

//                         <span className="text-xs">
//                           {order.created_at
//                             ? new Date(order.created_at).toLocaleDateString(
//                                 'en-IN',
//                                 {
//                                   day: 'numeric',
//                                   month: 'short',
//                                   year: 'numeric'
//                                 }
//                               )
//                             : 'Recently'}
//                         </span>
//                       </div>

//                       <div>
//                         <span className="block text-[9px] uppercase tracking-wider text-neutral-400 mb-1">
//                           Total Amount
//                         </span>

//                         <span className="font-serif font-bold text-sm">
//                           ₹{total.toLocaleString('en-IN')}
//                         </span>
//                       </div>

//                     </div>

//                     <div>
//                       {getStatusBadge(order.status)}
//                     </div>

//                   </div>
//                 </div>

//                 {/* ITEMS */}

//                 <div className="p-4 sm:p-6 divide-y divide-neutral-100">

//                   {(order.items || []).map((item, index) => {

//                     const product =
//                       item.product_details ||
//                       item.product ||
//                       {};

//                     const productName =
//                       product.name ||
//                       item.product_name ||
//                       item.name ||
//                       'Garment Item';

//                     const productImage =
//                       product.image ||
//                       item.product_image ||
//                       item.image;

//                     const itemPrice =
//                       Number(
//                         item.price ??
//                         product.price ??
//                         0
//                       );

//                     const quantity =
//                       Number(item.quantity || 1);

//                     return (
//                       <div
//                         key={index}
//                         className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
//                       >

//                         <div className="flex items-center gap-3 sm:gap-4 min-w-0">

//                           <img
//                             src={getImageUrl(productImage)}
//                             alt={productName}
//                             className="w-14 h-18 sm:w-16 sm:h-20 object-cover bg-neutral-100 shrink-0 rounded-md"
//                             onError={(e) => {
//                               e.currentTarget.onerror = null;
//                               e.currentTarget.src =
//                                 'https://placehold.co/400x500?text=Garment';
//                             }}
//                           />

//                           <div className="min-w-0">

//                             <h4 className="font-serif text-xs sm:text-sm font-medium truncate">
//                               {productName}
//                             </h4>

//                             <div className="mt-1 space-y-0.5 text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-wider">

//                               {item.size && (
//                                 <p>
//                                   Size:{' '}
//                                   <span className="text-neutral-800">
//                                     {item.size}
//                                   </span>
//                                 </p>
//                               )}

//                               {item.color && (
//                                 <p>
//                                   Color:{' '}
//                                   <span className="text-neutral-800">
//                                     {item.color}
//                                   </span>
//                                 </p>
//                               )}

//                               <p>
//                                 Quantity:{' '}
//                                 <span className="text-neutral-800">
//                                   {quantity}
//                                 </span>
//                               </p>

//                             </div>

//                           </div>

//                         </div>

//                         <div className="text-right shrink-0">

//                           <span className="font-serif text-xs sm:text-sm font-semibold">
//                             ₹{(itemPrice * quantity).toLocaleString('en-IN')}
//                           </span>

//                         </div>

//                       </div>
//                     );
//                   })}

//                 </div>

//                 {/* TRACKING */}

//                 {normalizedStatus !== 'cancelled' &&
//                   normalizedStatus !== 'returned' && (
//                     <div className="bg-[#FAF8F5]/70 p-5 sm:p-6 border-t border-neutral-200/60">

//                       <div className="flex justify-between items-center mb-6">

//                         <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-500">
//                           Order Tracking
//                         </p>

//                         <span className="text-[9px] uppercase tracking-wider text-neutral-400">
//                           {order.status || 'Pending'}
//                         </span>

//                       </div>

//                       <div className="relative flex items-center justify-between max-w-2xl mx-auto px-1 sm:px-3">

//                         <div className="absolute left-5 right-5 sm:left-7 sm:right-7 top-4 h-[2px] bg-neutral-200" />

//                         <div
//                           className="absolute left-5 sm:left-7 top-4 h-[2px] bg-neutral-900 transition-all duration-500"
//                           style={{
//                             width: `${(currentStepIdx / 3) * 100}%`,
//                             maxWidth: 'calc(100% - 40px)'
//                           }}
//                         />

//                         {steps.map((step, idx) => {

//                           const isCompleted =
//                             idx <= currentStepIdx;

//                           const isCurrent =
//                             idx === currentStepIdx;

//                           return (
//                             <div
//                               key={step}
//                               className="flex flex-col items-center relative z-10"
//                             >

//                               <div
//                                 className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition ${
//                                   isCompleted
//                                     ? 'bg-neutral-900 text-white'
//                                     : 'bg-white text-neutral-400 border border-neutral-300'
//                                 }`}
//                               >
//                                 {idx + 1}
//                               </div>

//                               <span
//                                 className={`text-[8px] sm:text-[10px] uppercase tracking-wider mt-2.5 text-center ${
//                                   isCurrent
//                                     ? 'text-neutral-900 font-bold'
//                                     : isCompleted
//                                     ? 'text-neutral-700'
//                                     : 'text-neutral-400'
//                                 }`}
//                               >
//                                 {step}
//                               </span>

//                             </div>
//                           );
//                         })}

//                       </div>

//                     </div>
//                   )}

//                 {/* DELIVERY INFO */}

//                 {isExpanded && (
//                   <div className="border-t border-neutral-200/60 bg-white p-5 sm:p-6">

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

//                       <div>

//                         <div className="flex items-center gap-2 mb-3">
//                           <MapPin size={15} />
//                           <h3 className="text-xs uppercase tracking-widest font-bold">
//                             Delivery Address
//                           </h3>
//                         </div>

//                         <p className="text-xs text-neutral-600 leading-relaxed">
//                           {order.shipping_address ||
//                             order.address ||
//                             'Shipping address unavailable'}
//                         </p>

//                         {order.city && (
//                           <p className="text-xs text-neutral-600 mt-1">
//                             {order.city}
//                             {order.pincode
//                               ? ` - ${order.pincode}`
//                               : ''}
//                           </p>
//                         )}

//                       </div>

//                       <div>

//                         <div className="flex items-center gap-2 mb-3">
//                           <CreditCard size={15} />
//                           <h3 className="text-xs uppercase tracking-widest font-bold">
//                             Payment
//                           </h3>
//                         </div>

//                         <p className="text-xs text-neutral-600">
//                           Method:{' '}
//                           <span className="font-semibold text-neutral-900">
//                             {order.payment_method || 'COD'}
//                           </span>
//                         </p>

//                         <p className="text-xs text-neutral-600 mt-1">
//                           Payment Status:{' '}
//                           <span className="font-semibold text-neutral-900">
//                             {order.is_paid
//                               ? 'Paid'
//                               : 'Pending'}
//                           </span>
//                         </p>

//                       </div>

//                     </div>

//                   </div>
//                 )}

//                 {/* ACTIONS */}

//                 <div className="p-4 sm:p-5 border-t border-neutral-100 flex flex-col sm:flex-row justify-between gap-3">

//                   <button
//                     onClick={() => toggleOrder(order.id)}
//                     className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-600 hover:text-neutral-900 flex items-center justify-center sm:justify-start gap-2"
//                   >
//                     {isExpanded ? (
//                       <>
//                         Hide Details
//                         <ChevronUp size={14} />
//                       </>
//                     ) : (
//                       <>
//                         View Order Details
//                         <ChevronDown size={14} />
//                       </>
//                     )}
//                   </button>

//                   <div className="flex flex-col sm:flex-row gap-2">

//                     {(normalizedStatus === 'pending' ||
//                       normalizedStatus === 'processing') && (
//                       <button
//                         onClick={() => handleCancelOrder(order)}
//                         className="px-4 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 text-[9px] uppercase tracking-widest font-semibold transition"
//                       >
//                         Cancel Order
//                       </button>
//                     )}

//                     {normalizedStatus === 'delivered' && (
//                       <button
//                         onClick={() => handleReturnOrder(order)}
//                         className="px-4 py-2.5 border border-neutral-300 hover:border-neutral-900 text-[9px] uppercase tracking-widest font-semibold transition flex items-center justify-center gap-2"
//                       >
//                         <RotateCcw size={13} />
//                         Request Return
//                       </button>
//                     )}

//                   </div>

//                 </div>

//               </div>
//             );
//           })}

//         </div>

//       </div>
//     </div>
//   );
// }










import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  RefreshCw,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  MapPin,
  CreditCard,
  XCircle,
  RotateCcw
} from 'lucide-react';
import API from '../services/api';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const navigate = useNavigate();

  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return 'https://placehold.co/400x500?text=Garment';
    }

    if (typeof imagePath === 'object' && imagePath !== null) {
      imagePath =
        imagePath.url ||
        imagePath.image ||
        imagePath.file ||
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

    const cleanPath = imagePath.startsWith('/')
      ? imagePath
      : `/${imagePath}`;

    return `https://clothing-backend-gynt.onrender.com${cleanPath}`;
  };

  const fetchOrders = useCallback(async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const token = localStorage.getItem('access_token');

      if (!token) {
        navigate('/login');
        return;
      }

      const res = await API.get('orders/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.results || [];

      setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);

      if (err?.response?.status === 401) {
        localStorage.removeItem('access_token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const normalizeStatus = (status) => {
    const value = String(status || 'pending').toLowerCase();

    if (value.includes('cancel')) return 'cancelled';
    if (value.includes('return')) return 'returned';
    if (value.includes('deliver')) return 'delivered';
    if (value.includes('ship')) return 'shipped';
    if (value.includes('process')) return 'processing';

    return 'pending';
  };

  const getStatusBadge = (status) => {
    const normalized = normalizeStatus(status);

    switch (normalized) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1.5 border border-emerald-200 rounded-full">
            <CheckCircle2 size={12} />
            Delivered
          </span>
        );

      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1.5 border border-blue-200 rounded-full">
            <Truck size={12} />
            Shipped
          </span>
        );

      case 'processing':
        return (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1.5 border border-purple-200 rounded-full">
            <Package size={12} />
            Processing
          </span>
        );

      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-50 px-3 py-1.5 border border-red-200 rounded-full">
            <XCircle size={12} />
            Cancelled
          </span>
        );

      case 'returned':
        return (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-50 px-3 py-1.5 border border-orange-200 rounded-full">
            <RotateCcw size={12} />
            Returned
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1.5 border border-amber-200 rounded-full">
            <Clock size={12} />
            Pending
          </span>
        );
    }
  };

  const getStepIndex = (status) => {
    const normalized = normalizeStatus(status);
    const steps = ['pending', 'processing', 'shipped', 'delivered'];
    const index = steps.indexOf(normalized);
    return index === -1 ? 0 : index;
  };

  const toggleOrder = (orderId) => {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId));
  };

  const handleCancelOrder = async (order) => {
    const normalized = normalizeStatus(order.status);

    if (normalized !== 'pending' && normalized !== 'processing') {
      alert('This order can no longer be cancelled.');
      return;
    }

    const confirmed = window.confirm(`Are you sure you want to cancel Order #${order.id}?`);
    if (!confirmed) return;

    try {
      await API.patch(`orders/${order.id}/`, { status: 'Cancelled' });
      alert('Order cancelled successfully.');
      fetchOrders(true);
    } catch (err) {
      console.error('Cancel order error:', err);
      alert(err?.response?.data?.detail || 'Unable to cancel this order.');
    }
  };

  const handleReturnOrder = async (order) => {
    if (normalizeStatus(order.status) !== 'delivered') {
      alert('Only delivered orders can be returned.');
      return;
    }

    const confirmed = window.confirm(`Request return for Order #${order.id}?`);
    if (!confirmed) return;

    try {
      await API.patch(`orders/${order.id}/`, { status: 'Return Requested' });
      alert('Return request submitted successfully.');
      fetchOrders(true);
    } catch (err) {
      console.error('Return order error:', err);
      alert(err?.response?.data?.detail || 'Unable to submit return request.');
    }
  };

  if (loading) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs uppercase tracking-widest text-neutral-500 font-serif">
            Loading Orders...
          </p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-[#FAF8F5] min-h-[75vh] flex flex-col justify-center items-center px-4 text-center text-neutral-900 py-20">
        <div className="w-16 h-16 rounded-full bg-white border border-neutral-200 flex items-center justify-center mb-6 text-neutral-400 shadow-sm">
          <ShoppingBag size={28} strokeWidth={1.5} />
        </div>

        <h2 className="text-3xl font-serif mb-3">
          No Orders Placed Yet
        </h2>

        <p className="text-xs font-light text-neutral-500 max-w-sm mb-8 leading-relaxed">
          When you purchase garments from our collection, your order details will appear here.
        </p>

        <button
          onClick={() => navigate('/shop')}
          className="bg-neutral-900 text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition rounded-xl shadow-md flex items-center gap-2 group"
        >
          Explore Collection
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-10 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl">

        {/* HEADER */}
        <div className="mb-8 pb-6 border-b border-neutral-200 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif tracking-tight">
              My Orders
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium">
              {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
            </span>

            <button
              onClick={() => fetchOrders(true)}
              disabled={refreshing}
              className="p-2.5 border border-neutral-200 bg-white rounded-xl hover:border-neutral-900 transition shadow-sm"
              title="Refresh orders"
            >
              <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* ORDERS LIST */}
        <div className="space-y-6">
          {orders.map((order) => {
            const normalizedStatus = normalizeStatus(order.status);
            const currentStepIdx = getStepIndex(order.status);
            const steps = ['Pending', 'Processing', 'Shipped', 'Delivered'];
            const isExpanded = expandedOrder === order.id;
            const total = Number(order.total_amount ?? order.total_price ?? 0);

            return (
              <div
                key={order.id}
                className="bg-white border border-neutral-200/80 shadow-sm overflow-hidden rounded-2xl"
              >
                {/* ORDER HEADER */}
                <div className="bg-neutral-50 p-5 sm:p-6 border-b border-neutral-200/60">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-10">
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-bold">
                          Order Reference
                        </span>
                        <span className="font-mono text-xs font-semibold text-neutral-900">
                          #{order.id}
                        </span>
                      </div>

                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-bold">
                          Date Placed
                        </span>
                        <span className="text-xs text-neutral-700">
                          {order.created_at
                            ? new Date(order.created_at).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })
                            : 'Recently'}
                        </span>
                      </div>

                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-bold">
                          Total Amount
                        </span>
                        <span className="font-serif font-bold text-sm text-neutral-900">
                          ₹{total.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <div>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                </div>

                {/* ITEMS */}
                <div className="p-5 sm:p-6 divide-y divide-neutral-100">
                  {(order.items || []).map((item, index) => {
                    const product = item.product_details || item.product || {};
                    const productName = product.name || item.product_name || item.name || 'Garment Item';
                    const productImage = product.image || item.product_image || item.image;
                    const itemPrice = Number(item.price ?? product.price ?? 0);
                    const quantity = Number(item.quantity || 1);

                    return (
                      <div key={index} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          <img
                            src={getImageUrl(productImage)}
                            alt={productName}
                            className="w-14 h-18 sm:w-16 sm:h-20 object-cover bg-neutral-100 shrink-0 rounded-lg border border-neutral-200"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = 'https://placehold.co/400x500?text=Garment';
                            }}
                          />

                          <div className="min-w-0">
                            <h4 className="font-serif text-xs sm:text-sm font-medium truncate text-neutral-900">
                              {productName}
                            </h4>
                            <div className="mt-1 space-y-0.5 text-[10px] text-neutral-500 uppercase tracking-wider">
                              {item.size && <p>Size: <span className="text-neutral-800">{item.size}</span></p>}
                              {item.color && <p>Color: <span className="text-neutral-800">{item.color}</span></p>}
                              <p>Quantity: <span className="text-neutral-800">{quantity}</span></p>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-serif text-xs sm:text-sm font-semibold text-neutral-900">
                            ₹{(itemPrice * quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* TRACKING */}
                {normalizedStatus !== 'cancelled' && normalizedStatus !== 'returned' && (
                  <div className="bg-neutral-50/70 p-6 border-t border-neutral-200/60">
                    <div className="flex justify-between items-center mb-6">
                      <p className="text-xs uppercase tracking-wider font-bold text-neutral-700">
                        Order Tracking
                      </p>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">
                        {order.status || 'Pending'}
                      </span>
                    </div>

                    <div className="relative flex items-center justify-between max-w-2xl mx-auto px-2">
                      <div className="absolute left-6 right-6 top-4 h-[2px] bg-neutral-200" />
                      <div
                        className="absolute left-6 top-4 h-[2px] bg-neutral-900 transition-all duration-500"
                        style={{
                          width: `${(currentStepIdx / 3) * 100}%`,
                          maxWidth: 'calc(100% - 48px)'
                        }}
                      />

                      {steps.map((step, idx) => {
                        const isCompleted = idx <= currentStepIdx;
                        const isCurrent = idx === currentStepIdx;

                        return (
                          <div key={step} className="flex flex-col items-center relative z-10">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition ${
                                isCompleted
                                  ? 'bg-neutral-900 text-white'
                                  : 'bg-white text-neutral-400 border border-neutral-300'
                              }`}
                            >
                              {idx + 1}
                            </div>
                            <span
                              className={`text-[10px] uppercase tracking-wider mt-2.5 text-center ${
                                isCurrent
                                  ? 'text-neutral-900 font-bold'
                                  : isCompleted
                                  ? 'text-neutral-700 font-medium'
                                  : 'text-neutral-400'
                              }`}
                            >
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* EXPANDED DETAILS */}
                {isExpanded && (
                  <div className="border-t border-neutral-200/60 bg-white p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin size={15} className="text-neutral-700" />
                          <h3 className="text-xs uppercase tracking-wider font-bold text-neutral-800">
                            Delivery Address
                          </h3>
                        </div>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {order.shipping_address || order.address || 'Shipping address unavailable'}
                        </p>
                        {order.city && (
                          <p className="text-xs text-neutral-600 mt-1">
                            {order.city} {order.pincode ? `- ${order.pincode}` : ''}
                          </p>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard size={15} className="text-neutral-700" />
                          <h3 className="text-xs uppercase tracking-wider font-bold text-neutral-800">
                            Payment Details
                          </h3>
                        </div>
                        <p className="text-xs text-neutral-600">
                          Method: <span className="font-semibold text-neutral-900">{order.payment_method || 'COD'}</span>
                        </p>
                        <p className="text-xs text-neutral-600 mt-1">
                          Payment Status: <span className="font-semibold text-neutral-900">{order.is_paid ? 'Paid' : 'Pending'}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ACTIONS */}
                <div className="p-5 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <button
                    onClick={() => toggleOrder(order.id)}
                    className="text-xs uppercase tracking-wider font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-2"
                  >
                    {isExpanded ? (
                      <>Hide Details <ChevronUp size={14} /></>
                    ) : (
                      <>View Order Details <ChevronDown size={14} /></>
                    )}
                  </button>

                  <div className="flex gap-2 w-full sm:w-auto justify-end">
                    {(normalizedStatus === 'pending' || normalizedStatus === 'processing') && (
                      <button
                        onClick={() => handleCancelOrder(order)}
                        className="px-4 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 text-xs uppercase tracking-wider font-semibold transition rounded-xl"
                      >
                        Cancel Order
                      </button>
                    )}

                    {normalizedStatus === 'delivered' && (
                      <button
                        onClick={() => handleReturnOrder(order)}
                        className="px-4 py-2.5 border border-neutral-300 hover:border-neutral-900 text-xs uppercase tracking-wider font-semibold transition rounded-xl flex items-center gap-2"
                      >
                        <RotateCcw size={13} /> Request Return
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}