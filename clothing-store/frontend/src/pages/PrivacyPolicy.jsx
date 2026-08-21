import React from 'react';
import { Lock, Eye, Database } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-12 px-6 sm:px-8 md:px-12 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 font-bold mb-2 block">
            Data Protection
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight mb-4">
            Privacy Policy
          </h1>
          <div className="w-12 h-[1px] bg-neutral-400 mx-auto mt-4 mb-4"></div>
          <p className="text-xs sm:text-sm font-light text-neutral-600 leading-relaxed">
            We value your trust. This policy outlines how we collect, safeguard, and respect your personal information.
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-10">
          
          <div className="bg-white border border-neutral-200/80 p-8 sm:p-10 shadow-sm rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-900">
                <Database size={20} />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-900">1. Information We Collect</h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              When you visit our store or create an account, we collect personal details such as your name, email address, shipping address, and phone number to fulfill your bespoke orders and provide exceptional concierge support.
            </p>
          </div>

          <div className="bg-white border border-neutral-200/80 p-8 sm:p-10 shadow-sm rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-900">
                <Eye size={20} />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-900">2. Usage of Information</h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              Your data is utilized solely to process transactions, manage your wishlist, optimize our website performance, and communicate exclusive updates or seasonal drops if you have subscribed to our inner circle.
            </p>
          </div>

          <div className="bg-white border border-neutral-200/80 p-8 sm:p-10 shadow-sm rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-900">
                <Lock size={20} />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-900">3. Data Security & Encryption</h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              We implement robust security protocols and encrypted payment gateways to ensure your sensitive data remains completely private and secure against unauthorized access.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}