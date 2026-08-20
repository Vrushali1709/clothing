import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12 sm:py-20 text-center max-w-lg min-h-[75vh] flex flex-col justify-center items-center">
      <div className="flex justify-center mb-4 sm:mb-6">
        <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-600 shrink-0" />
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-900 tracking-tight">
        Thank You For Your Order!
      </h2>
      
      <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-md leading-relaxed">
        Your order has been successfully placed. We will notify you once it ships.
      </p>
      
      <button 
        onClick={() => navigate('/shop')}
        className="w-full sm:w-auto bg-black text-white px-8 py-3.5 sm:py-3 rounded-lg font-bold hover:bg-gray-800 active:scale-[0.99] transition duration-150 text-sm sm:text-base shadow-sm"
      >
        Continue Shopping
      </button>
    </div>
  );
}