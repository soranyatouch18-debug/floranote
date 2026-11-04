import React, { useState } from 'react';
import { useFlorist } from '../../context/FloristContext';
import { WRAPPING_OPTIONS, WRAPPING_STYLES } from '../../data/flowers';
import { Layers, Check, Sparkles } from 'lucide-react';
import { PaperCategory } from '../../types';

export const WrapperSelector: React.FC = () => {
  const { wrappingStyle, setWrappingStyle, selectedWrappings, toggleWrapping } = useFlorist();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Papers' },
    { id: 'glossy', label: 'Glossy & Frosted' },
    { id: 'khaki', label: 'Khaki & Kraft' },
    { id: 'matte-korean', label: 'Matte Korean' },
    { id: 'linen', label: 'Linen & Fabric' },
    { id: 'pearl-metallic', label: 'Pearl & Shimmer' },
  ];

  const filteredPapers = activeCategory === 'all'
    ? WRAPPING_OPTIONS
    : WRAPPING_OPTIONS.filter(w => w.category === activeCategory);

  return (
    <div className="bg-cream-50 rounded-2xl p-5 border border-cream-300 shadow-soft space-y-6">
      {/* 1. Wrapping Silhouette & Folding Style */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-serif text-lg font-bold text-deepBrown-500 flex items-center gap-2">
            <Layers className="w-4 h-4 text-dustyPink-500" />
            <span>3. Wrapping Style & Folding Silhouette</span>
          </h3>
          <span className="text-[10px] text-sage-600 bg-sage-50 px-2 py-0.5 rounded-full border border-sage-200">
            Artisan Hand-Fold
          </span>
        </div>
        <p className="text-xs text-deepBrown-400 mb-3">
          Select the structural silhouette how our florists will fold and pleat your bouquet.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {WRAPPING_STYLES.map(st => {
            const isSelected = wrappingStyle.id === st.id;
            return (
              <button
                key={st.id}
                onClick={() => setWrappingStyle(st)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-dustyPink-500 bg-cream-100 shadow-xs ring-1 ring-dustyPink-400'
                    : 'border-cream-300 bg-cream-50/70 hover:bg-cream-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-deepBrown-500">{st.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-dustyPink-600" />}
                </div>
                <p className="text-[10px] text-deepBrown-400 leading-snug">
                  {st.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Choose Wrapping Papers (Multi-select allowed) */}
      <div className="pt-4 border-t border-cream-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div>
            <h4 className="font-serif text-base font-bold text-deepBrown-500 flex items-center gap-1.5">
              <span>Wrapping Papers (Select 1 or More for Layers)</span>
            </h4>
            <p className="text-xs text-deepBrown-400">
              Combine an inner wrap with an outer accent paper for depth and texture.
            </p>
          </div>

          <div className="text-[11px] text-dustyPink-600 font-semibold bg-dustyPink-50 px-2.5 py-1 rounded-lg border border-dustyPink-200 shrink-0">
            {selectedWrappings.length} {selectedWrappings.length === 1 ? 'Paper' : 'Papers'} Selected
          </div>
        </div>

        {/* Paper Category Pills (Glossy, Khaki, Matte, etc.) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none my-2">
          {categories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-xl text-xs font-medium shrink-0 transition-all ${
                  isActive
                    ? 'bg-deepBrown-500 text-cream-100 shadow-xs'
                    : 'bg-cream-200/60 text-deepBrown-500 hover:bg-cream-300/60'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Papers Grid with Color Swatches */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
          {filteredPapers.map(wrap => {
            const isSelected = selectedWrappings.some(w => w.id === wrap.id);
            const selectionIndex = selectedWrappings.findIndex(w => w.id === wrap.id);

            return (
              <button
                key={wrap.id}
                onClick={() => toggleWrapping(wrap)}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 relative ${
                  isSelected
                    ? 'border-dustyPink-500 bg-cream-100 shadow-xs ring-1 ring-dustyPink-400'
                    : 'border-cream-300 bg-cream-50/70 hover:bg-cream-100'
                }`}
              >
                {/* Color Swatch & Selection Badge */}
                <div
                  className="w-10 h-10 rounded-xl border border-cream-300 shadow-xs shrink-0 flex items-center justify-center relative"
                  style={{ backgroundColor: wrap.colorHex }}
                >
                  {isSelected && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-dustyPink-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center shadow-xs">
                      {selectionIndex + 1}
                    </span>
                  )}
                  {isSelected && (
                    <Check
                      className={`w-4 h-4 ${
                        wrap.colorHex === '#453A38' || wrap.colorHex === '#3D3432'
                          ? 'text-cream-100'
                          : 'text-deepBrown-600'
                      }`}
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-deepBrown-500 truncate">
                      {wrap.name}
                    </span>
                    <span className="text-xs font-semibold text-dustyPink-600 shrink-0 ml-1">
                      ${wrap.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-[10px] text-deepBrown-400 line-clamp-1">
                    {wrap.colorName} • {wrap.categoryLabel}
                  </div>
                  <div className="text-[9px] text-deepBrown-400/80 line-clamp-1 italic">
                    {wrap.finish}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
