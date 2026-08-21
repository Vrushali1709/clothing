import React from 'react';
import { ShieldCheck, FileText, Scale } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-12 px-6 sm:px-8 md:px-12 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 font-bold mb-2 block">
            Legal Agreement
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight mb-4">
            Terms of Service
          </h1>
          <div className="w-12 h-[1px] bg-neutral-400 mx-auto mt-4 mb-4"></div>
          <p className="text-xs sm:text-sm font-light text-neutral-600 leading-relaxed">
            Please review these terms and conditions carefully before utilizing our boutique services and purchasing atelier pieces.
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-10">
          
          <div className="bg-white border border-neutral-200/80 p-8 sm:p-10 shadow-sm rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-900">
                <FileText size={20} />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-900">1. Overview & Acceptance</h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              By accessing this website and purchasing our products, you agree to be bound by these Terms of Service. If you do not agree to all terms stated here, you may not access our store or utilize our services.
            </p>
          </div>

          <div className="bg-white border border-neutral-200/80 p-8 sm:p-10 shadow-sm rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-900">
                <Scale size={20} />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-900">2. Products & Pricing</h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              <p>
                All descriptions of garments, pricing, and availability are subject to change at any time without notice, at our sole discretion.
              </p>
              <p>
                We reserve the right to limit the quantities of any products or services that we offer. Prices for our pieces are quoted in Indian Rupees (INR) unless specified otherwise.
              </p>
            </div>
          </div>

          <div className="bg-white border border-neutral-200/80 p-8 sm:p-10 shadow-sm rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-900">
                <ShieldCheck size={20} />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-900">3. User Accounts & Security</h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}