import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Award } from 'lucide-react';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-12 px-6 sm:px-8 md:px-12 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 font-bold mb-2 block">
            The House of Atelier
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight mb-4">
            Our Brand Story
          </h1>
          <div className="w-12 h-[1px] bg-neutral-400 mx-auto mt-4"></div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-serif tracking-tight leading-snug">
              Redefining Elegance Through Timeless Craftsmanship
            </h2>
            <p className="text-xs sm:text-sm font-light text-neutral-600 leading-relaxed">
              Founded with a singular vision to blend contemporary silhouettes with traditional tailoring excellence, our atelier crafts garments designed for the modern wardrobe. Every piece reflects an uncompromised dedication to quality textiles and bespoke aesthetics.
            </p>
            <p className="text-xs sm:text-sm font-light text-neutral-600 leading-relaxed">
              From hand-picked breathable fabrics to meticulous stitching, our creations celebrate individuality, sophistication, and enduring style.
            </p>
          </div>

          <div className="aspect-[4/5] bg-neutral-200 overflow-hidden rounded-2xl shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000" 
              alt="Atelier Craftsmanship" 
              className="w-full h-full object-cover object-top"
              onError={(e) => { e.target.src = "https://placehold.co/800x1000?text=Luxury+Craft"; }}
            />
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-12 border-y border-neutral-200 mb-20">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto border border-neutral-200 shadow-sm text-neutral-800">
              <Sparkles size={20} />
            </div>
            <h3 className="font-serif text-lg tracking-wide">Exquisite Textiles</h3>
            <p className="text-xs font-light text-neutral-500 leading-relaxed">
              Sourced from the finest mills worldwide to ensure absolute comfort, durability, and grace.
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto border border-neutral-200 shadow-sm text-neutral-800">
              <Award size={20} />
            </div>
            <h3 className="font-serif text-lg tracking-wide">Tailored Precision</h3>
            <p className="text-xs font-light text-neutral-500 leading-relaxed">
              Designed with bespoke precision to offer an immaculate silhouette for every individual.
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto border border-neutral-200 shadow-sm text-neutral-800">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-serif text-lg tracking-wide">Sustainable Ethics</h3>
            <p className="text-xs font-light text-neutral-500 leading-relaxed">
              Committed to responsible production practices and ethical fashion standards.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white border border-neutral-200/80 p-12 rounded-3xl shadow-sm">
          <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-bold mb-2 block">
            Discover The Collection
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif mb-4 tracking-tight">
            Elevate Your Personal Wardrobe
          </h2>
          <p className="text-xs sm:text-sm font-light text-neutral-600 max-w-md mx-auto mb-8 leading-relaxed">
            Explore our curated selection of haute couture and modern daily wear.
          </p>
          <button 
            onClick={() => navigate('/shop')}
            className="bg-neutral-900 text-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] hover:bg-black transition shadow-md inline-flex items-center gap-3 group"
          >
            Explore Boutique <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}