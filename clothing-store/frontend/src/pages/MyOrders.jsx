// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Package, Clock, CheckCircle2, Truck, ArrowRight } from 'lucide-react';
// import API from '../services/api';

// export default function MyOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return "https://placehold.co/400x500?text=Garment";
//     if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
//     return `http://127.0.0.1:8000${imagePath}`;
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
//       default:
//         return (
//           <span className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 sm:px-3 py-1 border border-amber-200">
//             <Clock size={12} className="shrink-0" /> Processing
//           </span>
//         );
//     }
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
//           {orders.map((order) => (
//             <div key={order.id} className="bg-white border border-neutral-200/80 shadow-sm overflow-hidden">
              
//               {/* Order Card Header */}
//               <div className="bg-neutral-50 p-4 sm:p-6 border-b border-neutral-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
//                 <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-6 text-neutral-600 w-full sm:w-auto">
//                   <div>
//                     <span className="block text-[10px] uppercase tracking-wider text-neutral-400">Order Reference</span>
//                     <span className="font-mono font-medium text-neutral-900">#{order.id}</span>
//                   </div>
//                   <div>
//                     <span className="block text-[10px] uppercase tracking-wider text-neutral-400">Date Placed</span>
//                     <span className="text-neutral-900">
//                       {order.created_at ? new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recently'}
//                     </span>
//                   </div>
//                   <div className="col-span-2 sm:col-span-1">
//                     <span className="block text-[10px] uppercase tracking-wider text-neutral-400">Total Amount</span>
//                     <span className="font-serif font-bold text-neutral-900">
//                       ₹{Number(order.total_amount || order.total_price || 0).toLocaleString()}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="self-start sm:self-auto">
//                   {getStatusBadge(order.status)}
//                 </div>
//               </div>

//               {/* Items List */}
//               <div className="p-4 sm:p-6 divide-y divide-neutral-100">
//                 {(order.items || []).map((item, index) => {
//                   const product = item.product_details || item.product || {};
//                   const productName = product.name || item.product_name || item.name || 'Garment Item';
//                   const productImage = product.image || item.product_image || item.image;

//                   return (
//                     <div key={index} className="py-3.5 sm:py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-3 sm:gap-4">
//                       <div className="flex items-center gap-3 sm:gap-4 min-w-0">
//                         <img
//                           src={getImageUrl(productImage)}
//                           alt={productName}
//                           className="w-14 h-18 sm:w-16 sm:h-20 object-cover bg-neutral-100 shrink-0"
//                           onError={(e) => { e.target.src = "https://placehold.co/400x500?text=Garment"; }}
//                         />
//                         <div className="min-w-0">
//                           <h4 className="font-serif text-xs sm:text-sm font-medium text-neutral-900 truncate">
//                             {productName}
//                           </h4>
//                           <div className="mt-1 space-y-0.5 text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-wider">
//                             {item.size && <p>Size: <span className="text-neutral-800">{item.size}</span></p>}
//                             <p>Quantity: <span className="text-neutral-800">{item.quantity}</span></p>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="text-right shrink-0">
//                         <span className="font-serif text-xs sm:text-sm font-semibold text-neutral-900">
//                           ₹{Number((item.price || product.price || 0) * (item.quantity || 1)).toLocaleString()}
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }












import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Clock, CheckCircle2, Truck, ArrowRight, ShieldCheck } from 'lucide-react';
import API from '../services/api';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://placehold.co/400x500?text=Garment";
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
    return `https://clothing-backend-gynt.onrender.com${imagePath}`;
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }

    API.get('orders/')
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
        setLoading(false);
      });
  }, [navigate]);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return (
          <span className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 sm:px-3 py-1 border border-emerald-200">
            <CheckCircle2 size={12} className="shrink-0" /> Delivered
          </span>
        );
      case 'shipped':
        return (
          <span className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 sm:px-3 py-1 border border-blue-200">
            <Truck size={12} className="shrink-0" /> Shipped
          </span>
        );
      case 'processing':
        return (
          <span className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 sm:px-3 py-1 border border-purple-200">
            <Package size={12} className="shrink-0" /> Processing
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 sm:px-3 py-1 border border-amber-200">
            <Clock size={12} className="shrink-0" /> Pending
          </span>
        );
    }
  };

  // Timeline Step Helper Index
  const getStepIndex = (status) => {
    const steps = ['Pending', 'Processing', 'Shipped', 'Delivered'];
    const current = steps.findIndex(s => s.toLowerCase() === (status || 'pending').toLowerCase());
    return current !== -1 ? current : 0;
  };

  if (loading) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen flex justify-center items-center text-xs font-serif uppercase tracking-widest text-neutral-500 p-4">
        Fetching Your Orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-[#FAF8F5] min-h-[75vh] flex flex-col justify-center items-center px-4 sm:px-6 py-12 sm:py-20 text-center text-neutral-900">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-5 sm:mb-6 text-neutral-400">
          <Package size={28} strokeWidth={1.5} />
        </div>
        <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold mb-2 block">
          Purchase History
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif mb-3 tracking-tight">No Orders Placed Yet</h2>
        <p className="text-xs font-light text-neutral-500 max-w-sm mb-6 sm:mb-8 leading-relaxed">
          When you purchase garments from our collection, your order details will appear here.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-neutral-900 text-white px-6 sm:px-8 py-3.5 sm:py-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] hover:bg-black transition-all shadow-md flex items-center gap-3 group"
        >
          Explore Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-8 sm:py-12 md:py-16 selection:bg-neutral-900 selection:text-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl">
        
        {/* Header */}
        <div className="mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-neutral-200 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-0">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold block mb-1">
              Account Overview
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight">My Orders</h1>
          </div>
          <span className="text-[11px] sm:text-xs uppercase tracking-widest text-neutral-500">
            {orders.length} {orders.length === 1 ? 'Order' : 'Orders'} Total
          </span>
        </div>

        {/* Order Cards */}
        <div className="space-y-6 sm:space-y-8">
          {orders.map((order) => {
            const currentStepIdx = getStepIndex(order.status);
            const steps = ['Pending', 'Processing', 'Shipped', 'Delivered'];

            return (
              <div key={order.id} className="bg-white border border-neutral-200/80 shadow-sm overflow-hidden rounded-xl">
                
                {/* Order Card Header */}
                <div className="bg-neutral-50 p-4 sm:p-6 border-b border-neutral-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-6 text-neutral-600 w-full sm:w-auto">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-neutral-400">Order Reference</span>
                      <span className="font-mono font-medium text-neutral-900">#{order.id}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-neutral-400">Date Placed</span>
                      <span className="text-neutral-900">
                        {order.created_at ? new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recently'}
                      </span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="block text-[10px] uppercase tracking-wider text-neutral-400">Total Amount</span>
                      <span className="font-serif font-bold text-neutral-900">
                        ₹{Number(order.total_amount || order.total_price || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="self-start sm:self-auto">
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                {/* Items List */}
                <div className="p-4 sm:p-6 divide-y divide-neutral-100">
                  {(order.items || []).map((item, index) => {
                    const product = item.product_details || item.product || {};
                    const productName = product.name || item.product_name || item.name || 'Garment Item';
                    const productImage = product.image || item.product_image || item.image;

                    return (
                      <div key={index} className="py-3.5 sm:py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-3 sm:gap-4">
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                          <img
                            src={getImageUrl(productImage)}
                            alt={productName}
                            className="w-14 h-18 sm:w-16 sm:h-20 object-cover bg-neutral-100 shrink-0 rounded-md"
                            onError={(e) => { e.target.src = "https://placehold.co/400x500?text=Garment"; }}
                          />
                          <div className="min-w-0">
                            <h4 className="font-serif text-xs sm:text-sm font-medium text-neutral-900 truncate">
                              {productName}
                            </h4>
                            <div className="mt-1 space-y-0.5 text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-wider">
                              {item.size && <p>Size: <span className="text-neutral-800">{item.size}</span></p>}
                              <p>Quantity: <span className="text-neutral-800">{item.quantity}</span></p>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-serif text-xs sm:text-sm font-semibold text-neutral-900">
                            ₹{Number((item.price || product.price || 0) * (item.quantity || 1)).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ================= ORDER TRACKING TIMELINE ================= */}
                <div className="bg-[#FAF8F5]/60 p-5 sm:p-6 border-t border-neutral-200/60">
                  <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-500 mb-5">
                    Order Tracking Timeline
                  </p>

                  <div className="relative flex items-center justify-between max-w-2xl mx-auto px-2">
                    {/* Background Progress Line */}
                    <div className="absolute left-6 right-6 top-4 h-[2px] bg-neutral-200 -z-0" />

                    {steps.map((step, idx) => {
                      const isCompleted = idx <= currentStepIdx;
                      const isCurrent = idx === currentStepIdx;

                      return (
                        <div key={step} className="flex flex-col items-center relative z-10">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                            isCompleted 
                              ? 'bg-neutral-900 text-white ring-4 ring-neutral-900/10' 
                              : 'bg-white text-neutral-400 border border-neutral-300'
                          }`}>
                            {idx + 1}
                          </div>
                          <span className={`text-[10px] uppercase tracking-wider mt-2.5 font-medium ${
                            isCurrent ? 'text-neutral-900 font-bold underline underline-offset-4' : 
                            isCompleted ? 'text-neutral-800 font-semibold' : 'text-neutral-400'
                          }`}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
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