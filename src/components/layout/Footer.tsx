import React from 'react';
import { useFlorist } from '../../context/FloristContext';
import { Flower2, Heart, MapPin, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentTab } = useFlorist();

  return (
    <footer className="bg-cream-100 border-t border-cream-300 mt-20 pb-20 md:pb-12 text-deepBrown-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-dustyPink-200 flex items-center justify-center text-dustyPink-600">
                <Flower2 className="w-4 h-4" />
              </div>
              <span className="font-serif text-xl font-bold text-deepBrown-500">Flora Note</span>
            </div>
            <p className="text-xs text-deepBrown-400 leading-relaxed max-w-sm">
              A contemplative online floral studio in Phnom Penh. Thoughtfully customize bouquets, discover deep floriography, and compose personal greeting cards.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-sage-600 font-medium">
              <MapPin className="w-3.5 h-3.5" />
              <span>Delivering across all Khans in Phnom Penh</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-deepBrown-400">Navigation</h4>
            <ul className="space-y-1.5 text-sm">
              <li>
                <button onClick={() => setCurrentTab('home')} className="hover:text-dustyPink-500 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('catalog')} className="hover:text-dustyPink-500 transition-colors">
                  Meaning
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('builder')} className="hover:text-dustyPink-500 transition-colors">
                  Custom Bouquet Builder
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('card')} className="hover:text-dustyPink-500 transition-colors">
                  Greeting Card Studio
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('review')} className="hover:text-dustyPink-500 transition-colors">
                  Delivery & Review
                </button>
              </li>
            </ul>
          </div>

          {/* Theoretical Floriography Quote */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-deepBrown-400">Philosophy of Floriography</h4>
            <blockquote className="italic text-xs font-serif text-deepBrown-400 border-l-2 border-dustyPink-300 pl-3 py-1 leading-relaxed">
              “Every blossom is a conscious act of emotional truth. Flowers communicate when spoken language feels too blunt or fragile to carry the weight of human feeling.”
            </blockquote>
            <div className="pt-2 flex items-center gap-1 text-[11px] text-sage-600">
              <Sparkles className="w-3 h-3 text-dustyPink-400" />
              <span>Flora Note • Version 1.0</span>
            </div>
          </div>
        </div>

        <div className="border-t border-cream-300/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-deepBrown-400">
          <p>© 2026 Flora Note Studio. Mindful Floriography & Custom Bouquets.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Crafted with <Heart className="w-3.5 h-3.5 text-dustyPink-500 fill-dustyPink-500" /> for flower lovers & meaningful moments.
          </p>
        </div>
      </div>
    </footer>
  );
};
