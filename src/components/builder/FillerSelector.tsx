import React from 'react';
import { useFlorist } from '../../context/FloristContext';
import { GREENERY_OPTIONS } from '../../data/flowers';
import { Plus, Minus, Leaf, Sparkles } from 'lucide-react';

export const FillerSelector: React.FC = () => {
  const { selectedGreenery, updateGreeneryQuantity } = useFlorist();

  return (
    <div className="bg-cream-50 rounded-2xl p-5 border border-cream-300 shadow-soft space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-deepBrown-500 flex items-center gap-2">
            <Leaf className="w-4 h-4 text-sage-600" />
            <span>2. Decorative Greenery & Foliage</span>
          </h3>
          <p className="text-xs text-deepBrown-400">
            Select natural foliage stems to add botanical volume and organic framing to your bouquet.
          </p>
        </div>
        <span className="text-[10px] text-sage-600 bg-sage-50 px-2.5 py-1 rounded-full border border-sage-200 font-medium">
          Fresh Cut Greenery
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {GREENERY_OPTIONS.map(g => {
          const current = selectedGreenery.find(sg => sg.greenery.id === g.id);
          const qty = current ? current.quantity : 0;
          const isSelected = qty > 0;

          return (
            <div
              key={g.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-cream-100 border-sage-500 shadow-xs ring-1 ring-sage-400'
                  : 'bg-cream-50/80 border-cream-200 hover:border-cream-300'
              }`}
            >
              {/* Header Info (No reference picture) */}
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-sage-600 block">
                      {g.botanicalName}
                    </span>
                    <h4 className="font-serif text-base font-bold text-deepBrown-500 leading-tight">
                      {g.name}
                    </h4>
                  </div>
                  <span className="text-xs font-semibold text-deepBrown-500 bg-cream-200/70 px-2.5 py-1 rounded-lg border border-cream-300 shrink-0">
                    ${g.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-xs text-deepBrown-400 leading-relaxed font-light">
                  {g.visualDescription}
                </p>
              </div>

              {/* Symbolism & Stepper Controls */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-cream-200">
                <div className="text-[11px] text-sage-600 flex items-center gap-1 font-medium">
                  <Sparkles className="w-3 h-3 text-sage-500" />
                  <span>{g.symbolism.split(',')[0]}</span>
                </div>

                <div className="flex items-center gap-2 bg-cream-200/80 rounded-xl p-1 border border-cream-300">
                  <button
                    onClick={() => updateGreeneryQuantity(g.id, -1)}
                    disabled={qty === 0}
                    className="w-7 h-7 rounded-lg bg-cream-100 hover:bg-cream-50 disabled:opacity-30 text-deepBrown-500 flex items-center justify-center transition-colors"
                    title="Decrease stems"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-serif font-bold text-sm w-5 text-center text-deepBrown-500">
                    {qty}
                  </span>
                  <button
                    onClick={() => updateGreeneryQuantity(g.id, 1)}
                    className="w-7 h-7 rounded-lg bg-cream-100 hover:bg-cream-50 text-deepBrown-500 flex items-center justify-center transition-colors"
                    title="Add stems"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
