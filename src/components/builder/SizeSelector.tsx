import React from 'react';
import { useFlorist } from '../../context/FloristContext';
import { BOUQUET_SIZES } from '../../data/flowers';
import { BouquetSizeOption } from '../../types';
import { Maximize2, Check, Sparkles } from 'lucide-react';

export const SizeSelector: React.FC = () => {
  const { bouquetSize, setBouquetSize } = useFlorist();

  return (
    <div className="bg-cream-50 rounded-2xl p-5 sm:p-6 border border-cream-300 shadow-soft space-y-4">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cream-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-dustyPink-100 flex items-center justify-center text-dustyPink-600">
            <Maximize2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-deepBrown-500">
              1. Choose Bouquet Size
            </h2>
            <p className="text-xs text-deepBrown-400">
              Scale your bouquet proportions, wrapping presence, and floral volume
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cream-100 border border-dustyPink-300 text-deepBrown-500 text-xs self-start sm:self-auto font-medium">
          <Sparkles className="w-3.5 h-3.5 text-dustyPink-500" />
          <span>Active: <strong className="text-dustyPink-600">{bouquetSize.name}</strong> ({bouquetSize.dimensions})</span>
        </div>
      </div>

      {/* 3 Size Option Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {BOUQUET_SIZES.map((size: BouquetSizeOption) => {
          const isSelected = bouquetSize.id === size.id;

          return (
            <button
              key={size.id}
              onClick={() => setBouquetSize(size)}
              type="button"
              className={`relative rounded-xl p-4 text-left transition-all border flex flex-col justify-between ${
                isSelected
                  ? 'bg-cream-100/90 border-dustyPink-400 ring-2 ring-dustyPink-400/30 shadow-sm'
                  : 'bg-cream-50 hover:bg-cream-100/60 border-cream-200 hover:border-cream-300'
              }`}
            >
              {/* Top Row: Name, Badge & Checkmark */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif text-base font-bold text-deepBrown-500">
                    {size.name}
                  </span>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-dustyPink-500 text-cream-50 flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                <div className="text-[11px] font-medium text-dustyPink-600 mb-1.5">
                  {size.tagline}
                </div>

                <p className="text-[11px] text-deepBrown-400 font-light leading-snug line-clamp-2 mb-3">
                  {size.description}
                </p>
              </div>

              {/* Bottom Specs */}
              <div className="pt-2.5 border-t border-cream-200/80 space-y-1.5 text-[10px]">
                <div className="flex justify-between text-deepBrown-400">
                  <span>Dimensions:</span>
                  <span className="font-semibold text-deepBrown-500">{size.dimensions}</span>
                </div>
                <div className="flex justify-between text-deepBrown-400">
                  <span>Capacity:</span>
                  <span className="font-medium text-sage-600">{size.recommendedStems}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
