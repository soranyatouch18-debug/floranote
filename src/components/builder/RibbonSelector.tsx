import React from 'react';
import { useFlorist } from '../../context/FloristContext';
import { RIBBON_OPTIONS } from '../../data/flowers';
import { Bookmark, Check } from 'lucide-react';

export const RibbonSelector: React.FC = () => {
  const { selectedRibbon, setRibbon } = useFlorist();

  return (
    <div className="bg-cream-50 rounded-2xl p-5 border border-cream-300 shadow-soft space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-deepBrown-500 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-dustyPink-500" />
            <span>4. Waist Ribbon & Material Finish</span>
          </h3>
          <p className="text-xs text-deepBrown-400">
            Hand-tied around the bouquet's waist to cinch stems in natural grace.
          </p>
        </div>
        <span className="text-xs text-dustyPink-600 font-semibold bg-dustyPink-50 px-2 py-0.5 rounded-full border border-dustyPink-200">
          9 Color Options
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {RIBBON_OPTIONS.map(rib => {
          const isSelected = selectedRibbon.id === rib.id;

          return (
            <button
              key={rib.id}
              onClick={() => setRibbon(rib)}
              className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 relative ${
                isSelected
                  ? 'border-dustyPink-500 bg-cream-100 shadow-xs ring-1 ring-dustyPink-400'
                  : 'border-cream-300 bg-cream-50/70 hover:bg-cream-100'
              }`}
            >
              <div
                className="w-9 h-9 rounded-xl border border-cream-300 shadow-xs shrink-0 flex items-center justify-center"
                style={{ backgroundColor: rib.colorHex }}
              >
                {isSelected && (
                  <Check
                    className={`w-4 h-4 ${
                      rib.colorHex === '#453A38' || rib.colorHex === '#6B1D2F'
                        ? 'text-cream-100'
                        : 'text-deepBrown-600'
                    }`}
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-deepBrown-500 truncate">
                  {rib.name}
                </div>
                <div className="text-[10px] text-deepBrown-400">
                  {rib.material} • <span className="font-semibold text-dustyPink-600">${rib.price.toFixed(2)}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
