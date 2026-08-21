import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is the estimated delivery time for orders?",
      answer: "Orders are meticulously processed and dispatched within 24-48 hours. Express global delivery typically takes 3 to 5 business days depending on your location."
    },
    {
      question: "Are alterations available for bespoke garments?",
      answer: "Yes, we offer complimentary initial alterations for custom tailoring orders. Please reach out to our concierge support within 7 days of receiving your piece."
    },
    {
      question: "What is your return and exchange policy?",
      answer: "We accept returns and exchanges on unworn, unwashed items with original tags attached within 14 days of delivery. Custom-tailored pieces are final sale."
    },
    {
      question: "How do I care for delicate silk and embroidered fabrics?",
      answer: "We strictly recommend professional dry cleaning only for our haute couture pieces to preserve the integrity of fine textiles and detailed hand-embroidery."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit cards, debit cards, UPI, net banking, and secure digital wallets through our encrypted payment gateway."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-12 px-6 sm:px-8 md:px-12 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 font-bold mb-2 block">
            Client Assistance
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <div className="w-12 h-[1px] bg-neutral-400 mx-auto mt-4 mb-4"></div>
          <p className="text-xs sm:text-sm font-light text-neutral-600 leading-relaxed">
            Find answers to common inquiries regarding our shipping policies, garment care, orders, and tailoring services.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white border border-neutral-200/80 shadow-sm rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none group"
              >
                <span className="font-serif text-base sm:text-lg text-neutral-900 group-hover:text-amber-800 transition-colors">
                  {faq.question}
                </span>
                <ChevronDown 
                  size={18} 
                  className={`text-neutral-500 shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-neutral-900' : ''}`} 
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed border-t border-neutral-100 mt-2 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support Note */}
        <div className="mt-16 text-center bg-white border border-neutral-200/80 p-8 rounded-2xl shadow-sm">
          <Sparkles size={20} className="mx-auto text-amber-700 mb-3" />
          <h3 className="font-serif text-lg text-neutral-900 mb-2">Have additional questions?</h3>
          <p className="text-xs text-neutral-500 font-light mb-4">Our concierge support team is always available to assist you.</p>
          <a 
            href="/contact" 
            className="inline-block bg-neutral-900 text-white px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-black transition"
          >
            Contact Concierge
          </a>
        </div>

      </div>
    </div>
  );
}