// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { CheckCircle } from 'lucide-react';

// export default function OrderSuccess() {
//   const navigate = useNavigate();

//   return (
//     <div className="container mx-auto px-4 py-12 sm:py-20 text-center max-w-lg min-h-[75vh] flex flex-col justify-center items-center">
//       <div className="flex justify-center mb-4 sm:mb-6">
//         <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-600 shrink-0" />
//       </div>
      
//       <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-900 tracking-tight">
//         Thank You For Your Order!
//       </h2>
      
//       <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-md leading-relaxed">
//         Your order has been successfully placed. We will notify you once it ships.
//       </p>
      
//       <button 
//         onClick={() => navigate('/shop')}
//         className="w-full sm:w-auto bg-black text-white px-8 py-3.5 sm:py-3 rounded-lg font-bold hover:bg-gray-800 active:scale-[0.99] transition duration-150 text-sm sm:text-base shadow-sm"
//       >
//         Continue Shopping
//       </button>
//     </div>
//   );
// }




import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Package } from 'lucide-react';

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FAF8F5] min-h-[80vh] flex flex-col justify-center items-center px-4 sm:px-6 py-16 sm:py-24 text-center text-neutral-900 selection:bg-neutral-900 selection:text-white">
      
      {/* Success Icon */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-6 text-emerald-700 shadow-sm">
        <CheckCircle2 size={36} strokeWidth={1.5} />
      </div>

      <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold mb-2 block">
        Atelier Confirmation
      </span>

      <h1 className="text-3xl sm:text-4xl font-serif mb-4 tracking-tight">
        Order Placed Successfully
      </h1>

      <p className="text-xs sm:text-sm font-light text-neutral-600 max-w-md mb-10 leading-relaxed">
        Thank you for choosing our haute couture collection. Your order has been securely registered and is being prepared with absolute precision.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-md justify-center">
        <button 
          onClick={() => navigate('/my-orders')}
          className="bg-white border border-neutral-300 text-neutral-900 px-6 py-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] hover:border-neutral-900 transition shadow-sm flex items-center justify-center gap-2"
        >
          <Package size={15} /> View My Orders
        </button>

        <button 
          onClick={() => navigate('/shop')}
          className="bg-neutral-900 text-white px-6 py-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] hover:bg-black transition shadow-lg flex items-center justify-center gap-2 group"
        >
          Continue Shopping <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}