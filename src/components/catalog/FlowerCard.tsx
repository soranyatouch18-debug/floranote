import React, { useState } from 'react';
import { Flower } from '../../types';
import { useFlorist } from '../../context/FloristContext';
import { Sparkles, BookOpen, Plus, Check } from 'lucide-react';

interface FlowerCardProps {
  flower: Flower;
  onOpenDetails: (flower: Flower, initialColor?: string) => void;
}

export const FlowerCard: React.FC<FlowerCardProps> = ({ flower, onOpenDetails }) => {
  const { addFlowerStem } = useFlorist();
  const [selectedColorName, setSelectedColorName] = useState<string>(flower.colors[0]?.name || '');

  const activeColor = flower.colors.find(c => c.name === selectedColorName) || flower.colors[0];
  const displayImage = activeColor?.image || flower.image;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addFlowerStem(flower, activeColor.name, 2);
  };

  return (
    <div
      onClick={() => onOpenDetails(flower, activeColor.name)}
      className="bg-cream-50 rounded-2xl border border-cream-300 overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col cursor-pointer group hover:border-dustyPink-300"
    >
      {/* Flower Image Container with clean warm cream frame for transparent PNG */}
      <div className="relative aspect-[4/3] w-full bg-cream-100 flex items-center justify-center p-4 border-b border-cream-200/80 group-hover:bg-cream-50 transition-colors">
        <img
          src={displayImage}
          alt={`${flower.name} in ${activeColor.name}`}
          className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />

        {/* Price Tag */}
        <div className="absolute top-3 right-3 bg-cream-50/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-cream-300 text-xs font-bold text-deepBrown-500 shadow-xs">
          ${flower.pricePerStem.toFixed(2)} <span className="text-[10px] font-normal text-deepBrown-400">/ {flower.unit || 'stem'}</span>
        </div>

        {/* Botanical Tag */}
        <div className="absolute bottom-2 left-3 bg-cream-50/90 backdrop-blur-sm px-2 py-0.5 rounded-md border border-cream-200 text-[10px] text-deepBrown-400 font-serif italic">
          {flower.botanicalName}
        </div>
      </div>

      {/* Card Body - Focused on Deep Meaning & Symbolism */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Flower Name */}
          <div className="flex items-start justify-between gap-1 mb-1.5">
            <h3 className="font-serif text-lg font-bold text-deepBrown-500 leading-tight group-hover:text-dustyPink-600 transition-colors">
              {flower.name}
            </h3>
          </div>

          {/* Color Variations Swatches */}
          <div className="mb-2.5 flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-medium text-deepBrown-400">Color:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {flower.colors.map(col => {
                const isSelected = activeColor.name === col.name;
                return (
                  <button
                    key={col.name}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedColorName(col.name);
                    }}
                    className={`w-4 h-4 rounded-full border transition-all relative ${
                      isSelected
                        ? 'ring-2 ring-dustyPink-500 scale-125 border-cream-50 z-10'
                        : 'border-cream-300 hover:scale-110 opacity-75 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={`${col.name}${col.symbolism ? ` • ${col.symbolism}` : ''}`}
                  />
                );
              })}
            </div>
            <span className="text-[10px] font-semibold text-dustyPink-600 ml-auto truncate max-w-[120px]">
              {activeColor.name}
            </span>
          </div>

          {/* Meaning Callout from Document */}
          <div className="p-2.5 rounded-xl bg-cream-100/90 border border-dustyPink-200/70 text-xs font-serif italic text-dustyPink-600 font-medium mb-2 leading-snug">
            "{flower.primaryMeaning}"
          </div>

          {/* Theoretical Philosophy Snippet */}
          <p className="text-xs text-deepBrown-400 line-clamp-2 leading-relaxed font-light">
            {flower.theoreticalPhilosophy}
          </p>
        </div>

        {/* Subconscious Resonance */}
        <div className="pt-2 border-t border-cream-200">
          <div className="text-[10px] text-sage-600 font-medium italic line-clamp-1">
            🌱 {flower.psychologicalResonance}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(flower, activeColor.name);
            }}
            className="w-full py-2 px-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-deepBrown-500 text-xs font-semibold transition-colors flex items-center justify-center gap-1"
          >
            <BookOpen className="w-3.5 h-3.5 text-deepBrown-400" />
            <span>Meaning</span>
          </button>

          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full py-2 px-2 rounded-xl bg-dustyPink-300 hover:bg-dustyPink-400 text-deepBrown-500 text-xs font-semibold transition-colors flex items-center justify-center gap-1 shadow-xs"
            title={`Add ${flower.name} (${activeColor.name}) to bouquet`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add ({activeColor.name.split(' ')[0]})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
