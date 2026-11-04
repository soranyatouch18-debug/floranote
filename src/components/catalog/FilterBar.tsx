import React from 'react';
import { Search, Sparkles, BookOpen } from 'lucide-react';
import { INTENTION_CATEGORIES } from '../../data/meanings';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  selectedColor: string;
  setSelectedColor: (c: string) => void;
  onOpenQuantityGuide: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedColor,
  setSelectedColor,
  onOpenQuantityGuide,
}) => {
  const colorSwatches = [
    { label: 'All', hex: '' },
    { label: 'Pink', hex: '#E8B7BD' },
    { label: 'Red', hex: '#8B1E2F' },
    { label: 'White', hex: '#F9F8F6' },
    { label: 'Yellow', hex: '#F4B41A' },
    { label: 'Violet', hex: '#87749D' },
    { label: 'Blue', hex: '#7EA2C6' },
  ];

  return (
    <div className="space-y-4 mb-8 bg-cream-50 p-5 rounded-2xl border border-cream-300 shadow-soft">
      {/* Top Row: Search Input + Quantity Guide Modal Trigger */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-deepBrown-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search flower by name, feeling, or occasion (e.g., 'gratitude', 'rose', 'apology')..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-100 border border-cream-300 text-deepBrown-500 placeholder-deepBrown-400/70 text-sm focus:outline-none focus:border-dustyPink-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-deepBrown-400 hover:text-deepBrown-600"
            >
              Clear
            </button>
          )}
        </div>

        <button
          onClick={onOpenQuantityGuide}
          className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-dustyPink-100 border border-dustyPink-300 text-deepBrown-500 hover:bg-dustyPink-200 text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
        >
          <BookOpen className="w-4 h-4 text-dustyPink-600" />
          <span>Quantity Symbolism Guide</span>
        </button>
      </div>

      {/* Middle Row: Intention Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-semibold text-deepBrown-400 shrink-0 mr-1">
          Intention:
        </span>
        {INTENTION_CATEGORIES.map(cat => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-all ${
                isActive
                  ? 'bg-deepBrown-500 text-cream-100 shadow-xs'
                  : 'bg-cream-200/70 text-deepBrown-500/80 hover:bg-cream-300/60'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Bottom Row: Color Swatches Filter */}
      <div className="flex items-center gap-2 pt-2 border-t border-cream-200">
        <span className="text-xs font-semibold text-deepBrown-400 shrink-0 mr-2">
          Color Filter:
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {colorSwatches.map(c => {
            const isSelected = selectedColor === c.label;
            return (
              <button
                key={c.label}
                onClick={() => setSelectedColor(c.label)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-all ${
                  isSelected
                    ? 'bg-dustyPink-200 border border-dustyPink-400 font-semibold text-deepBrown-600'
                    : 'bg-cream-200/50 hover:bg-cream-200 border border-cream-300 text-deepBrown-400'
                }`}
              >
                {c.hex && (
                  <span
                    className="w-3 h-3 rounded-full border border-cream-300 shadow-xs inline-block"
                    style={{ backgroundColor: c.hex }}
                  />
                )}
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
