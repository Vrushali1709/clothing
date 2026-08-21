import React from 'react';
import { Truck, RefreshCw, ShieldCheck, Clock } from 'lucide-react';

export default function ShippingPolicy() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-12 px-6 sm:px-8 md:px-12 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 font-bold mb-2 block">
            Atelier Guidelines
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight mb-4">
            Shipping & Returns
          </h1>
          <div className="w-12 h-[1px] bg-neutral-400 mx-auto mt-4 mb-4"></div>
          <p className="text-xs sm:text-sm font-light text-neutral-600 leading-relaxed">
            Detailed information regarding our global delivery standards, dispatch times, and hassle-free exchange protocols.
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-10">
          
          {/* Shipping Section */}
          <div className="bg-white border border-neutral-200/80 p-8 sm:p-10 shadow-sm rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-900">
                <Truck size={20} />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-900">Shipping & Delivery</h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              <p>
                Every piece in our collection is carefully packed in signature atelier packaging to ensure it reaches you in immaculate condition.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-neutral-900 font-semibold">Order Processing:</strong> Orders are processed and dispatched within 24–48 business hours.</li>
                <li><strong className="text-neutral-900 font-semibold">Standard & Express Delivery:</strong> Domestic delivery takes 3 to 5 business days. Express options are available at checkout.</li>
                <li><strong className="text-neutral-900 font-semibold">Complimentary Shipping:</strong> We offer free standard shipping on all prepaid orders above ₹999.</li>
              </ul>
            </div>
          </div>

          {/* Returns & Exchanges Section */}
          <div className="bg-white border border-neutral-200/80 p-8 sm:p-10 shadow-sm rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-900">
                <RefreshCw size={20} />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-900">Returns & Exchanges</h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              <p>
                We want you to adore your purchase. If you require a different size or wish to exchange a piece, our concierge team is happy to assist.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-neutral-900 font-semibold">Return Window:</strong> Returns and exchanges are accepted within 14 days of delivery.</li>
                <li><strong className="text-neutral-900 font-semibold">Condition of Items:</strong> Garments must be unworn, unwashed, with all original atelier tags intact.</li>
                <li><strong className="text-neutral-900 font-semibold">Custom Orders:</strong> Bespoke or custom-tailored garments are final sale and cannot be returned unless faulted.</li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}