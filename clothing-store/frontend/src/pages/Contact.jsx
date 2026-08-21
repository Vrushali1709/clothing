import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Sparkles } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Tame ahiya backend API call pan integrate kari shako cho
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-12 px-6 sm:px-8 md:px-12 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 font-bold mb-2 block">
            Atelier Concierge
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight mb-4">
            Get in Touch
          </h1>
          <div className="w-12 h-[1px] bg-neutral-400 mx-auto mt-4 mb-4"></div>
          <p className="text-xs sm:text-sm font-light text-neutral-600 leading-relaxed">
            For bespoke tailoring inquiries, styling assistance, or client support, our concierge team is at your disposal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Contact Information */}
          <div className="md:col-span-5 bg-white border border-neutral-200/80 p-8 sm:p-10 shadow-sm space-y-8">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block mb-1">Direct Line</span>
              <h3 className="font-serif text-xl text-neutral-900">Client Support</h3>
            </div>

            <div className="space-y-6 text-xs text-neutral-600">
              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-neutral-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900 font-semibold mb-0.5 uppercase tracking-wider text-[10px]">Atelier Flagship</strong>
                  <p className="font-light leading-relaxed">12 Luxury Avenue, Fashion District, Ahmedabad, Gujarat</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone size={18} className="text-neutral-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900 font-semibold mb-0.5 uppercase tracking-wider text-[10px]">Telephone</strong>
                  <p className="font-light">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail size={18} className="text-neutral-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900 font-semibold mb-0.5 uppercase tracking-wider text-[10px]">Email Concierge</strong>
                  <p className="font-light">concierge@clothingweb.com</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-100 flex items-center gap-3 text-neutral-500 text-[11px]">
              <Sparkles size={16} className="text-amber-700 shrink-0" />
              <span>Available Monday to Saturday, 10 AM – 7 PM IST</span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7 bg-white border border-neutral-200/80 p-8 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <Sparkles size={24} />
                </div>
                <h3 className="font-serif text-2xl text-neutral-900">Message Received</h3>
                <p className="text-xs text-neutral-600 max-w-sm mx-auto font-light leading-relaxed">
                  Thank you for reaching out. Our concierge team will review your inquiry and respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 bg-neutral-900 text-white px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-black transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block mb-1">Inquiry Form</span>
                  <h3 className="font-serif text-xl text-neutral-900 mb-6">Send a Message</h3>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-semibold">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vrushali Panchal"
                    className="w-full bg-neutral-50 border border-neutral-200 p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="vrushali@example.com"
                    className="w-full bg-neutral-50 border border-neutral-200 p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-semibold">
                    Message / Custom Request
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your styling inquiry or assistance required..."
                    className="w-full bg-neutral-50 border border-neutral-200 p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-neutral-900 text-white py-4 text-xs font-semibold uppercase tracking-[0.25em] hover:bg-black transition shadow-md flex items-center justify-center gap-2"
                >
                  <Send size={15} /> Dispatch Message
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}