import React from 'react';
import { QUANTITY_SYMBOLISM } from '../../data/meanings';
import { X, Sparkles, Heart } from 'lucide-react';

interface QuantityGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuantityGuideModal: React.FC<QuantityGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deepBrown-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-cream-100 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden border border-cream-300 shadow-elevated flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-cream-300 flex items-center justify-between bg-cream-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-dustyPink-100 border border-dustyPink-300 flex items-center justify-center text-dustyPink-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-deepBrown-500">
                The Language of Stem Quantities
              </h3>
              <p className="text-xs text-sage-600">
                In classical floriography, even the number of stems whispers a distinct emotion.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-cream-200 hover:bg-cream-300 flex items-center justify-center text-deepBrown-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {QUANTITY_SYMBOLISM.map(item => (
            <div
              key={item.count}
              className="bg-cream-50 rounded-2xl p-4 border border-cream-200/90 hover:border-dustyPink-300 transition-colors shadow-xs"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-dustyPink-100 text-deepBrown-500 font-serif font-bold text-base flex items-center justify-center shrink-0">
                    {item.count}
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-deepBrown-500">
                      {item.label}
                    </h4>
                    <p className="text-xs font-semibold text-dustyPink-600 mt-0.5">
                      "{item.symbolism}"
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-deepBrown-400 mt-2.5 leading-relaxed pl-13">
                {item.sentiment}
              </p>

              <div className="mt-3 pt-2.5 border-t border-cream-200/60 flex items-center gap-1.5 text-[11px] text-sage-600 font-medium">
                <Heart className="w-3.5 h-3.5 text-dustyPink-400" />
                <span>Best for: {item.recommendedFor}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-cream-50 border-t border-cream-300 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-deepBrown-500 hover:bg-deepBrown-600 text-cream-100 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Got It, Thanks
          </button>
        </div>
      </div>
    </div>
  );
};
